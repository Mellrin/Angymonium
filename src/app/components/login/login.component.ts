import { Component, ElementRef, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SignFormComponent } from '../helper/sign-form/sign-form.component';
import { fromEvent, Subscription, filter, switchMap } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements AfterViewInit, OnDestroy {
  form = {
    form_name: 'Sign in',
    form_group: new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    }),
    description_heading: "Don't have an account yet?",
    description_text: 'Enter your personal info to keep connection with us.',
    description_btn: { text: 'Sign up', route: '/user/signup' },
  }

  @ViewChild(SignFormComponent)
  child!: SignFormComponent;
  subscription: Subscription = new Subscription;

  constructor(
    private UserService: UserService,
    private router: Router,
  ) { }

  ngAfterViewInit() {
    this.subscription =
      fromEvent(this.child.getButton(), 'click')
        .pipe(
          filter(_ => Object.values(this.form.form_group.controls).every(val => !val.errors)),
          switchMap(_ => this.UserService.submitLogin({ username: this.form.form_group.get('username')?.value, password: this.form.form_group.get('password')?.value }))
        )
        .subscribe((res) => {
          // console.log(res)
          if (res.error) {
            this.form.form_group.controls[`${res?.field}`].setErrors({ backendError: res?.error });
            return
          }

          //this.UserService.currentUser$.next(res);
          this.router.navigate(['/home']);
        })
  }

  onSubmit() {
    console.warn('in')
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

}
