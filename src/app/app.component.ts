import { Component } from '@angular/core';
import { AlertService } from './services/alert.service';
import { Alert } from './classes/alert';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {
  title = 'businesscards';
  public alerts: Array<Alert> = [];

  constructor(private alertService: AlertService) {}

  ngOnInit() {
    this.alertService.alerts.subscribe(alert => {
      this.alerts.push(alert);
    })
  }

}
