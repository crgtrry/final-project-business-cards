import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AuthService } from './../../services/auth.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { ObjectUnsubscribedError } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];
  private returnUrl: string;
  public loginForm: FormGroup;

  constructor(private fb: FormBuilder,
              private auth: AuthService,
              private router: Router,
              private route: ActivatedRoute ) {
    this.createForm();
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub=>sub.unsubscribe());
  }

  private createForm(): void {
    this.loginForm = this.fb.group( {
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  public submit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.subscriptions.push(
        this.auth.login(email, password).subscribe(
          success => {
            if (success) {
              console.log (`successful Login: ${email}: ${password}`);
            //  this.router.navigateByUrl('dashboard');
              this.router.navigate([`dashboard`]);
            }
          }
        )
      );
    }
    // const {email, password} = this.loginForm.value;
    // console.log(`Email: ${email}, Password: ${password}`);
  }
}
