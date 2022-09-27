import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription, catchError, of } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styles: [':host {align-self: center; margin: auto; flex: 1;}']
})
export class SignupComponent implements OnDestroy {
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
    description_btn: { text: 'Sign in', route: '/user/signin' },
  }

  subscription: Subscription = new Subscription;

  constructor(
    private userService: UserService,
    private router: Router,
  ) { }

  onSubmit() {
    if (this.form.form_group.valid) {
      this.subscription = this.userService.submitSignup(this.form.form_group.value)
        .pipe(catchError(e => of(e)))
        .subscribe((res) => {
          if (res.error) {
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
