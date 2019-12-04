import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AuthService } from './../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Card } from '../../components/card-item/card.model';

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.scss']
})
export class AddCardComponent implements OnInit {

  public addForm: FormGroup;
  text: string;
  card: Card;
  params: Subscription;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.params = this.route.params.subscribe( params => {
      this.text = params['text'];
    });

    this.card = this.getDataFromText();
    this.addForm = this.fb.group({
        name: [this.card.getName()],
        phone: [this.card.getPhone()],
        email: [this.card.getEmail()]
    });
  }

  ngOnInit(): void {}

  private getDataFromDb() {
    return undefined;
  }
  private getEmailMatch() {
    return this.text.match(/\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+/);
  }

  private getPhoneMatch() {
    // try 1 xxx-xxx-xxxx or (xxx) xxx-xxxx
    let value = this.text.match(/[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}/);
    if (value) {
      return value;
    }

    // // try 2 xxxxxxxxxx
    // value = this.text.match('^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$');
    // if (value) {
    //   return value;
    // }

    // // try 3 xxxxxxxxxxx x-xxx-xxx-xxxx xxxxxxx
    // value = this.text.match('^(1?(-?\d{3})-?)?(\d{3})(-?\d{4})$');
    // if (value) {
    //   return value;
    // }

    // // try 4 (xxx)xxx-xxxx (xxx)xxx-xxxx xxx(xxx)xxx-xxxx xxxx
    // value = this.text.match('^[\\(]{0,1}([0-9]){3}[\\)]{0,1}[ ]?([^0-1]){1}' +
    // '([0-9]){2}[ ]?[-]?[ ]?([0-9]){4}[ ]*((x){0,1}([0-9]){1,5}){0,1}$');
    // if (value) {
    //   return value;
    // }

    // // try 5 1.xxx.xxx.xxxx 1-xxx-xxx-xxxx x-xxx-xxx-LLLL
    // value = this.text.match('^([0-1]([\s-./\\])?)?(\(?[2-9]\d{2}\)?|[2-9]\d{3})([\s-./\\])?(\d{3}([\s-./\\])?\d{4}|[a-zA-Z0-9]{7})$');
    // if (value) {
    //   return value;
    // }

    return undefined;
  }

private getNameMatch() {

  // try 1
  let value = this.text.match('(?<FirstName>[A-Z]\.?\w*\-?[A-Z]?\w*)\s?(?<MiddleName>[A-Z]\w' +
  '+|[A-Z]?\.?)\s(?<LastName>(?:[A-Z]\w{1,3}|St\.\s)?[A-Z]\w+\-?[A-Z]?\w*)(?:,\s|)(?<Suffix>Jr\.|Sr\.|IV|III|II|)');
  if (value) {
    return value;
  }

  // try 2
  // value = this.text.match('(?<LastName>[A-Z]\w+\-?[A-Z]?\w*),\s(?<Suffix>Jr\.|Sr\.|IV|III|II)?,?\s?' +
  // '(?<FirstName>[A-Z]\w*\-?[A-Z]?\w*\.?)\s?(?<MiddleName>[A-Z]?\w*\.?');
  // if (value) {
  //   return value;
  // }

  // // try 3
  // value = this.text.match('^(?n:(?<lastname>(St\.\ )?(?-i:[A-Z]\'?\w+?\-?)+)(?<suffix>\ ' +
  // '(?i:([JS]R)|((X(X{1,2})?)?((I((I{1,2})|V|X)?)|(V(I{0,3})))?)))?,((?<prefix>Dr|Prof|M(r?|(is)?)s)\ )?' +
  // '(?<firstname>(?-i:[A-Z]\'?(\w+?|\.)\ ??){1,2})?(\ (?<mname>(?-i:[A-Z])(\'?\w+?|\.))){0,2})$');
  // if (value) {
  //   return value;
  // }
  // return undefined;

}

getDataFromText() {
    let rtn: Card = new Card();

    // help from http://www.regexlib.com/Search.aspx?k=email&AspxAutoDetectCookieSupport=1
    const email = this.getEmailMatch();
    if (email && email.length > 0) {
      rtn.setEmail(email[0]);
    }

    const phone = this.getPhoneMatch();
    if (phone && phone.length > 0) {
      rtn.setPhone(phone[0]);
    }

    const name = this.getNameMatch();
    if (name && name.length > 0) {
      rtn.setName(name[0]);
    }

    return rtn;
  }

  private add(name: string, phone: string, email: string) {
    const ownerId = '';
    this.auth.addCard( {name, phone, email, ownerId} );
    this.router.navigate([`dashboard`]);
  }
}
