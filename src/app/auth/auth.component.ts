import {
  Component,
  ComponentFactoryResolver,
  ViewChild,
  ComponentRef,
  OnDestroy
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnDestroy {
  constructor(
    private authService: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}
  isLoggedIn = true;
  isLoading = false;
  error: string = null;
  closeSub: Subscription;
  @ViewChild(PlaceholderDirective, { static: false }) alertHost: PlaceholderDirective;

  onSwitchMode() {
    this.isLoggedIn = !this.isLoggedIn;
  }
  onHandlerError() {
    this.error = null;
  }
  onSubmit(form: NgForm) {
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
        this.showErrorAlert(errorMessage);
        this.isLoading = false;
      }
    );
    form.reset();
  }
  private showErrorAlert(message: string) {
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();
    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);
    componentRef.instance.message = message;
    this.closeSub = componentRef.instance.closeAlert.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }
  ngOnDestroy() {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }
}
