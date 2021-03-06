// Some help from the following sites:
//   https://x-team.com/blog/webcam-image-capture-angular/
//
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import {WebcamImage} from 'ngx-webcam';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-webcam-modal',
  templateUrl: './webcam-modal.component.html',
  styleUrls: ['./webcam-modal.component.scss']
})

export class WebcamModalComponent {

  public webcamImage: WebcamImage = null;
  cloudResponse: Subscription;
  constructor(
    public router: Router,
    private http: HttpClient
  ) {}
  handleImage(webcamImage: WebcamImage) {
    this.webcamImage = webcamImage;
  }

  public process() {

    const base64Image = this.webcamImage.imageAsBase64;

    this.cloudResponse = this.http.post(
      `https://vision.googleapis.com/v1/images:annotate?key=${environment.cloudvisionConfig.apiKey}`,
      {
        "requests": [
          {
            "image": {
              "content": base64Image
            },
            "features": [
              {
                "type": "TEXT_DETECTION"
              }
            ]
          }
        ]
      },
      { }
    ).subscribe(resp => {
      //let text: string;
      const r = resp['responses'][0].fullTextAnnotation;
      if (!r) {
        // alert('No text identified.');
      } else {
        console.log(`RETURNED TEXT: ${r.text}`);
        this.router.navigate([`add/${r.text}`]); // process text returned from cloud vision
      }
    });
  }
}
