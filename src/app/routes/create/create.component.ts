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
  private modalOptions: NgbModalOptions;
  card: Card;

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
    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop'
    };
    this.generateForm();
  }

  private generateForm(): void {
    this.createForm = this.fb.group( {
      name: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required,  Validators.email]]
    });
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

  ngOnInit() {}
}
