export class Card {
  private id: string;
  private name: string;
  private email: string;
  private phone: string;
  private imageLocation: string;

  constructor() {// This is the card image which generated the business card
    this.id = '';
    this.name = '';
    this.email = '';
    this.phone = '';
    this.imageLocation = '';
  }


  public getId() {
    return this.id;
  }

  public getName() {
    return this.name;
  }

  public setName(name: string) {
    this.name = name;
  }

  public getEmail() {
    return this.email;
  }

  public setEmail(email: string) {
    this.email = email;
  }

  public getPhone() {
    return this.phone;
  }

  public setPhone(phone: string) {
    this.phone = phone;
  }

  public getImageLocation() {
    return this.imageLocation;
  }
  public setImageLocation(imageLocation: string) {
    this.imageLocation = imageLocation;
  }
}
