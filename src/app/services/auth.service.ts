import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../classes/user';
import { Alert } from '../classes/alert';
import { AlertService } from './alert.service';
import { Observable } from 'rxjs-compat/Observable';
import { AlertType } from './../enums/alert-type.enum';
import 'rxjs-compat/add/observable/of';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public currentUser: Observable<User | null>;

  constructor(
    private router: Router,
    private alertService: AlertService
  ) {
    // Todo
    this.currentUser = Observable.of(null);
  }

  public login(email: string, password: string): Observable<boolean> {
    // Todo
    return Observable.of(true);
  }

  public register(email: string, password: string): Observable<boolean> {
    // Todo
    return Observable.of(true);
  }

  public logout(): void {
    // todo
    this.router.navigate(['/login']);
    this.alertService.alerts.next(new Alert('Signed out'));
  }
}
