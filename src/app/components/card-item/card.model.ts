export class Card {
  private id: string;
  private name: string;
  private email: string;
  private phone: string;
  private imageLocation: string;

  constructor(id: string, name: string, email: string, phone: string, imageLocation: string) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.imageLocation = imageLocation; // This is the card image which generated the business card
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

  public getPhome() {
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
