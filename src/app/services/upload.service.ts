import { Injectable } from '@angular/core';
// import { AngularFire2 } from 'angularfire2';
import { AngularFireDatabase } from 'angularFire2/database';
import {AngularFireStorage } from 'angularfire2/storage'
@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(
 //   private af: AngularFire2,
    private db: AngularFireDatabase,
    private storage: AngularFireStorage
  ) {}

  public saveImage(image: File) {
    this.storage.upload('/', image);
  }
}
