import { Injectable, ResolvedReflectiveFactory } from '@angular/core';
import { Router } from '@angular/router';
import { SelectControlValueAccessor } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { User } from './../classes/user';
import { Alert } from '../classes/alert';
import { AlertService } from './alert.service';
import { Observable } from 'rxjs-compat/Observable';
import { AlertType } from './../enums/alert-type.enum';
import 'rxjs-compat/add/operator/switchMap';
import 'rxjs-compat/add/observable/of';
import { from } from 'rxjs';
import { Card } from '../interfaces/card';
import { map } from 'rxjs/operators';
import { TabHeadingDirective } from 'ngx-bootstrap';
import { AngularFireDatabase } from 'angularFire2/database';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public currentUser: Observable<firebase.User>;
  private userDetails: firebase.User = null;
  private cardsDb: AngularFirestoreCollection<Card>;
  private usersDb: AngularFirestoreCollection<User>;

  constructor(
    private router: Router,
    private alertService: AlertService,
    private fireAuth: AngularFireAuth,
    private fireDb: AngularFirestore
  ) {
    this.currentUser = fireAuth.authState;
    this.currentUser.subscribe(
      (user) => {
        if (user) {
          this.userDetails = user;
          console.log(`User Details: ${this.userDetails}`);
        } else {
          this.userDetails = null;
        }
      }
    );
    this.cardsDb = fireDb.collection<Card>('card');
    this.usersDb = fireDb.collection<User>('user');
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
              const u = {
                uid: user.user.uid,
                email: user.user.email,
              };
              this.usersDb.doc(u.uid).set(u);
              return true;
            }).catch((err) => false));
  }

  public addCard(card: Card) {
    // card.id = this.fireDb.createId();
    console.log(card);
    card.ownerId = this.userDetails.uid;
    this.cardsDb.doc(this.fireDb.createId()).set(card);
  }

  public updateCard(id: string, card: Card) {
    this.cardsDb.doc(id).update(card);
  }

  public deleteCard(id: string, card: Card) {
    this.cardsDb.doc(id).delete();
  }

  public getCards() {
    let cardsList: Card[];
    this.fireDb.collection<Card>(`an-angular-project/${this.userDetails.uid}/card`).snapshotChanges()
    .pipe(map(changes => changes.map(card => ({id: card.payload.doc.id, ...card.payload.doc.data()})
    ))).subscribe(card => {cardsList = card; });
    return cardsList;
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
