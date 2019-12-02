import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AngularFirestore } from 'angularfire2/firestore';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interfaces/user';
import { AngularFirestoreDocument } from '@angular/fire/firestore';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  public profileForm: FormGroup;
  public currentUser: any = null;
  public user: User;
  private subscriptions: Subscription[] = [];

  constructor(
    public auth: AuthService,
    public route: ActivatedRoute,
    private db: AngularFirestore ) { }

  ngOnInit() {
    this.subscriptions.push(
      this.auth.currentUser.subscribe( user => {
        this.currentUser = user;
      })
    );
    this.subscriptions.push(
      this.route.paramMap.subscribe( params => {
        const userId = params.get('userId');
        const userRef: AngularFirestoreDocument<User> = this.db.doc(`users/${userId}`);
        userRef.valueChanges().subscribe(user => this.user = user);
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
