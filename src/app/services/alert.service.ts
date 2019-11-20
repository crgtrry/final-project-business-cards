import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Alert } from './../classes/alert';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  public alerts: Subject<Alert> = new Subject();

  constructor() { }
}
