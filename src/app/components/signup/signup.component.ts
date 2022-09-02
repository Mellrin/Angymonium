import { Component, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SignFormComponent } from '../helper/sign-form/sign-form.component';
import { fromEvent, Subscription, filter, switchMap, catchError, of } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styles: [':host {align-self: center}']
})
export class SignupComponent implements AfterViewInit, OnDestroy {
  emailPattern: string = "^\\w+([-+.']\\w+)*@\\w+([-.]\\w+)*\\.\\w{2,}([-.]\\w+)*$";
  form = {
    form_name: 'Sign up',
    form_group: new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(2)]),
      email: new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required, ConfirmValidator('password')]),
    }),
    description_heading: "Already registered?",
    description_text: 'To keep connected with us login with your personal info',
    description_btn: { text: 'Sign in', route: '/user/signin' },
  }


  @ViewChild(SignFormComponent)
  child!: SignFormComponent;
  subscription: Subscription = new Subscription;

  constructor(
    private userService: UserService,
    private router: Router,
  ) { }

  ngAfterViewInit() {
    this.subscription =
      fromEvent(this.child.getButton(), 'click')
        .pipe(
          filter(_ => Object.values(this.form.form_group.controls).every(val => !val.errors)),
          switchMap(_ => this.userService.submitSignup({ email: this.form.form_group.get('email')?.value, username: this.form.form_group.get('username')?.value, password: this.form.form_group.get('password')?.value }).pipe(catchError(e => of(e))))
        )
        .subscribe((res) => {
          // console.log(res)
          if (res.error) {
            this.form.form_group.controls[`${res?.error.field}`].setErrors({ backendError: res?.error.error });
            return
          }

          this.userService.currentUser$.next(res);
          this.router.navigate(['/home']);
        })
  }

  onSubmit() {
    console.warn('up')
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

}

export function ConfirmValidator(confirmpassword: string) {
  return (control: FormControl): { [key: string]: boolean } | null => {
    if (!control || !control.parent) {
      return null;
    }
    if (control.value !== control.parent.get(confirmpassword)?.value) {
      return { 'mismatch': true };
    }
    return null;
  };
}
