import { Component, OnDestroy, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription, catchError, of } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [':host {align-self: center; margin: auto; flex: 1;}']
})
export class LoginComponent implements OnDestroy {
  form = {
    form_name: 'Sign in',
    form_group: new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    }),
    description_heading: "Don't have an account yet?",
    description_btn: { text: 'Sign up', route: '/user/signup' },
  }

  subscription: Subscription = new Subscription;

  constructor(
    private userService: UserService,
    private router: Router,
  ) { }

  onSubmit() {
    if (this.form.form_group.valid) {
      this.subscription = this.userService.submitLogin(this.form.form_group.value)
        .pipe(catchError(e => of(e)))
        .subscribe((res) => {
          if (res?.error) {
            this.form.form_group.controls[`${res?.error.field}`].setErrors({ backendError: res?.error.error });
            return
          }

          this.userService.currentUser$.next(res);
          this.router.navigate(['/home']);
        })
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

}
