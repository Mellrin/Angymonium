import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  form = {
    form_name: 'Sign in',
    form_fields: [{ field: 'username' }, { field: 'password' }],
    description_heading: "Don't have an account yet?",
    description_text: 'Enter your personal info to keep connection with us.',
    description_btn: { text: 'Sign up', route: '/user/signup' },
  }

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(){
    console.warn('in')
  }

}
