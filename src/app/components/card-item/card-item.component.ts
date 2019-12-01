import { Component, OnInit, HostBinding, Input } from '@angular/core';
import { Card } from './card.model';
import { EmailValidator } from '@angular/forms';
import { parseHttpResponse } from 'selenium-webdriver/http';

@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.scss']
})
export class CardItemComponent implements OnInit {

  name: string;
  email: string;
  phone: string;

  @Input() card: Card;

  constructor() { }

  ngOnInit() {
  }

}
