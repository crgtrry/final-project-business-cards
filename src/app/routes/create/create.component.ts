import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { NgbModule, ModalDismissReasons, NgbModalOptions, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
// import { UploadImageComponent } from '../../components/upload-image/upload-image.component';
import { WebcamModalComponent } from '../../components/webcam-modal/webcam-modal.component';
import { HttpParams } from '@angular/common/http';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  public createForm: FormGroup;
  public uploadForm: FormGroup;
  private modalOptions: NgbModalOptions;

  private subscriptions: Subscription[] = [];

  constructor(private fb: FormBuilder,
              private auth: AuthService,
              private router: Router,
              private modalService: NgbModal ) {
    console.log(`PARAMS: ${HttpParams.toString()}`)
    this.generateForm();
    this.modalOptions = {
      backdrop:'static',
      backdropClass:'customBackdrop'
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

  private submit() {}

  ngOnInit() {
  }

}
