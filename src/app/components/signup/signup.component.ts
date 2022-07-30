import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
})
export class SignupComponent implements OnInit {
  form = {
    form_name: 'Sign up',
    form_group: new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(3)]),
      password: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
    }),
    description_heading: "Already registered?",
    description_text: 'To keep connected with us login with your personal info',
    description_btn: { text: 'Sign in', route: '/user/signin' },
  }
  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.warn('up')
  }

}
