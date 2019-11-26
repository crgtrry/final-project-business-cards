import { Injectable, ResolvedReflectiveFactory } from '@angular/core';
import { Router } from '@angular/router';
import { SelectControlValueAccessor } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { User } from './../classes/user';
import { Alert } from '../classes/alert';
import { AlertService } from './alert.service';
import { Observable } from 'rxjs-compat/Observable';
import { AlertType } from './../enums/alert-type.enum';
import 'rxjs-compat/add/operator/switchMap';
import 'rxjs-compat/add/observable/of';
import { from, of } from 'rxjs';
import { TabHeadingDirective } from 'ngx-bootstrap';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public currentUser: Observable<firebase.User>;
  private userDetails: firebase.User=null;

  constructor(
    private router: Router,
    private alertService: AlertService,
    private fireAuth: AngularFireAuth,
    private fireDb: AngularFirestore
  ) {
    this.currentUser = fireAuth.authState
    this.currentUser.subscribe(
      (user) => {
        if (user) {
          this.userDetails = user;
          console.log(`User Details: ${this.userDetails}`);
        } else {
          this.userDetails = null;
        }
      }
    )
  }

  public isLoggedIn(): boolean {
    if (this.userDetails == null) {
      console.log(`NOT Logged In`);
      return false;
    } else {
      console.log(`Is Logged In -- User Details: ${this.userDetails}`);
      return true;
    }
  }

  public login(email: string, password: string): Observable<boolean> {
    return from ( this.fireAuth.auth.signInWithEmailAndPassword(email, password)
        .then ((user) => true)
        .catch((err) => false)
    );
  }

  public register(email: string, password: string): Observable<boolean> {
    return  from (
      this.fireAuth.auth.createUserWithEmailAndPassword(email, password)
        .then((user) => {
              console.log(`USER ${user.user.email}`);
              const userRef: AngularFirestoreDocument<User> = this.fireDb.doc(`users/${user.user.uid}`);
              const ref = {
                uid: user.user.uid,
                email: user.user.email,
              };
              userRef.set(ref);
              return true;
            }).catch((err) => false));
  }

  public logout(): void {
    this.userDetails = null;
    console.log("USER DETAILS set to null")
    this.fireAuth.auth.signOut().then((res) => {
      this.router.navigate(['/login']);
      // this.alertService.alerts.next(new Alert('Signed out'));
    });
  }

}
