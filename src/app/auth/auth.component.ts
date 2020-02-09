import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  constructor(private authService: AuthService, private router: Router) {}
  isLoggedIn = true;
  isLoading = false;
  error: string = null;
  onSwitchMode() {
    this.isLoggedIn = !this.isLoggedIn;
  }
  onSubmit(form: NgForm) {
    console.log(form.value);
    this.isLoading = true;
    const email = form.value.email;
    const password = form.value.password;
    let authObs: Observable<AuthResponseData>;
    if (!form.valid) {
      return;
    }
    if (this.isLoggedIn) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signup(email, password);
    }
    authObs.subscribe(
      response => {
        this.isLoading = false;
        this.router.navigate(['./recipes']);
      },
      errorMessage => {
        this.error = errorMessage;
        this.isLoading = false;
      }
    );
    form.reset();
  }
}
