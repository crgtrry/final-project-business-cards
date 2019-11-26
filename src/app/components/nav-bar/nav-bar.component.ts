import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit, OnDestroy {

  private isLoggedIn: boolean = false;

  constructor(
    public auth: AuthService
  ) { 
  }
  ngOnInit() {
    console.log("RENDERING new nav bar")
    this.isLoggedIn = this.auth.isLoggedIn();
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
