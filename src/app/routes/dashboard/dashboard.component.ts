import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Card } from '../../interfaces/card';
import { map } from 'rxjs/operators';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  public cardCollection: AngularFirestoreCollection<Card>;
  public cards: Observable<Card[]>;

  constructor(
    public auth: AuthService,
    private fireDb: AngularFirestore) {
      this.cardCollection = fireDb.collection<Card>('card');
      this.cards = this.cardCollection.snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as Card;
          console.log(`DATA: ${data}`);
          const id = a.payload.doc.id;
          console.log(`ID: ${id}`);
          return {id, ...data};
        })));
    }

  ngOnInit() {
  }

}
