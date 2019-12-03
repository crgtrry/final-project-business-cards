import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AuthService } from './../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModule, ModalDismissReasons, NgbModalOptions, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
// import { UploadImageComponent } from '../../components/upload-image/upload-image.component';
import { WebcamModalComponent } from '../../components/webcam-modal/webcam-modal.component';
import { Card } from '../../interfaces/card';
import { HttpParams } from '@angular/common/http';
import { stringify } from 'querystring';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  public createForm: FormGroup;
  public uploadForm: FormGroup;
  private modalOptions: NgbModalOptions;

  public theData: Subscription;
  public text: string;
  public id: string;
  public noFill: boolean; //if no data provided then, empty fill.

  private subscriptions: Subscription[] = [];

  constructor(private fb: FormBuilder,
              private auth: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              private modalService: NgbModal ) {
    this.generateForm();
    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop'
    }
  }

  private generateForm(): void {
    this.createForm = this.fb.group( {
      name: ['', [Validators.required]],
      phone: ['', []],
      email: ['', [Validators.required,  Validators.email]]
    });
    this.uploadForm = this.fb.group({
      file: ['', [Validators.required]]
    })
  }

  open() {
    const modalRef = this.modalService.open(WebcamModalComponent);
  }
  public upload() {}

  private add(name: string, phone: string, email: string) {
    const ownerId = '';
    this.auth.addCard( {name, phone, email, ownerId} );
    this.router.navigate([`dashboard`]);
  }

  ngOnInit() {
    this.theData = this.route.params.subscribe( params => {
      this.noFill = false;
      this.text = params["text"] ? params["text"]: null; // if not empty, filling fields from provided text string vi google vision
      if (!this.text) {
        this.id = params["id"] ? params["id"] : null; // if not empty, filling fields from database
      } else {
        this.noFill = true;
      }
    })
  }

}
