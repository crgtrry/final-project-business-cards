import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AuthService } from './../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

  public registerForm: FormGroup;
  private subscriptions: Subscription[] = [];

  constructor(private fb: FormBuilder,
              private auth: AuthService,
              private router: Router ) {
    this.createForm();
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub=>sub.unsubscribe());
  }

  private createForm(): void {
    this.registerForm = this.fb.group( {
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  public submit(): void {
    if (this.registerForm.valid) {
      const { email, password } = this.registerForm.value;
      this.subscriptions.push(
        this.auth.register(email, password).subscribe(success => {
          if (success) {
            this.router.navigate(['/dashboard']);
          }
      })
      )
    }
    const {email, password} = this.registerForm.value;
    console.log(`Email: ${email}, Password: ${password}`);
  }
}
