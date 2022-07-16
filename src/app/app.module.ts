import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ROUTING } from './app.routing';
import { RootComponent } from './components/root/root.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { LandingComponent } from './components/landing/landing.component';
import { SignFormComponent } from './components/helper/sign-form/sign-form.component';

@NgModule({
  declarations: [
    RootComponent,
    LoginComponent,
    SignupComponent,
    LandingComponent,
    SignFormComponent
  ],
  imports: [
    BrowserModule,
    ROUTING
  ],
  providers: [],
  bootstrap: [RootComponent]
})
export class AppModule { }
