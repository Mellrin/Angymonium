import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
})
export class SignupComponent implements OnInit {
  form = {
    form_name: 'Sign up',
    form_fields: [{ field: 'username' }, { field: 'password' }],
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
