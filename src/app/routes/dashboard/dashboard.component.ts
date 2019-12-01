import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  public cards = [
    {
      id: '1',
      name: 'George Jungle',
      phone: '3121212120',
      email: 'gj@ae.com'
    },
    {
      id: '2',
      name: 'Jane Jungle',
      phone: '3121212121',
      email: 'jj@boa.com'
    },
    {
      id: '3',
      name: 'Jane Doe',
      phone: '3121212122',
      email: 'jd@morningstar.com'
    },
    {
      id: '4',
      name: 'John Doe',
      phone: '3121212123',
      email: 'jd@walgreens.com'
    }
  ];
  constructor() { }

  ngOnInit() {
  }

}
