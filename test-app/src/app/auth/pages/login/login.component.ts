import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  errores: string[] = [];
  showPassword = false;

  constructor(
    private authSvc: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(
          new RegExp(/[a-z0-9._%+-]+\@[a-z0-9.-]+\.[a-z]{2,3}$/, 'i')
        ),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  // Getters
  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  // Toggle input type for password
  getInputType() {
    if (this.showPassword) {
      return 'text';
    }

    return 'password';
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  // Login with credentials
  validateLogin() {
    const { email, password } = this.loginForm.value;

    this.authSvc.login({ email, password }).subscribe(
      (resp) => {
        if (resp) {
          this.router.navigateByUrl('/');
        }
      },
      (error) => {
        console.log(error);
        this.loginForm.reset();
      }
    );
  }
}
