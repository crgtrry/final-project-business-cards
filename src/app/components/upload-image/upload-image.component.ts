import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UploadService } from '../../services/upload.service';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss']
})
export class UploadImageComponent implements OnInit {

  uploadForm: FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private upload: UploadService) {
      this.createForm();
    }

    // public uploader: FileUploader = new FileUploader({ url: URL, itemAlias: 'image ', imagesOnly: true})
  ngOnInit() {

  }

  submitForm() {

  }

  private createForm() {
    this.uploadForm = this.fb.group({
      file: File
    });
  }
}
