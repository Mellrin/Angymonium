import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core/';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { LandingComponent } from './components/landing/landing.component';

export const AppRoutes: Routes = [
  { path: 'user/signin', component: LoginComponent },
  { path: 'user/signup', component: SignupComponent },
	{ path: '**', component: LandingComponent},
];

export const ROUTING: ModuleWithProviders<any> = RouterModule.forRoot(AppRoutes);