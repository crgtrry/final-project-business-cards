import { AlertType } from './../enums/alert-type.enum';

export class Alert {
  text: string;
  type: AlertType;

  constructor(text: string, type = AlertType.Info, ) {
    this.text = text;
    this.type = type;
  }
}
