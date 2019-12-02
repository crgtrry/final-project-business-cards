import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit, OnDestroy {

  private isLoggedIn: boolean = false;
  public currentUser: any = null;

  constructor(
    public auth: AuthService
  ) {
    this.currentUser = auth.currentUser;
  }
  ngOnInit() {
    console.log("RENDERING new nav bar");
    this.isLoggedIn = this.auth.isLoggedIn();
    this.auth.currentUser.subscribe( user => {
      this.currentUser = user;
    })
    console.log(`currentUser: ${this.currentUser.id}`);
  }

  ngOnDestroy() {
    this.isLoggedIn = false;
  }
//     if (this.auth.currentUser) {
// this.currentUser = this.auth.currentUser;
 //   }
    // this.auth.currentUser.subscribe(user => {
    //   this.currentUser = user;
    //   console.log(`CURRENT-USER: ${user.email}`);
    //   if (this.currentUser) {
    //     console.log("YES")
    //   }
    // });
  //}

}
