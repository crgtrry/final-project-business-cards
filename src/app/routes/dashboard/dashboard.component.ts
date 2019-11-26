import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public cards = [
    {
      name: 'George Jungle',
      business: 'American Express',
      address: {
        street: '1234 Winding Way Dr.',
        suite: '100',
        city: 'Chicago',
        state: 'IL',
        zip: '60606'
      }
    },
    {
      name: 'Jane Jungle',
      business: 'Bank of America',
      address: {
        street: '1234 Jackson Ave.',
        suite: '400',
        city: 'Chicago',
        state: 'IL',
        zip: '60602'
      }
    },
    {
      name: 'Jane Doe',
      business: 'Morningstar Inc.',
      address: {
        street: '22 Washington Ave.',
        suite: '',
        city: 'Chicago',
        state: 'IL',
        zip: '60602'
      }
    },
    {
      name: 'John Doe',
      business: 'Walgreens',
      address: {
        street: '100 State St.',
        suite: '100',
        city: 'Chicago',
        state: 'IL',
        zip: '60602'
      }
    }
  ];
  constructor() { }

  ngOnInit() {
  }

}
