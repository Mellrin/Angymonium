import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core/';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { LandingComponent } from './components/landing/landing.component';

import { AuthGuard } from './authGuard';
import { UserListComponent } from './components/user-list/user-list.component';
import { WorkspaceComponent } from './components/workspace/workspace.component';

export const AppRoutes: Routes = [
  { path: 'user/signin', component: LoginComponent },
  { path: 'user/signup', component: SignupComponent },
  { path: 'user-list', component: UserListComponent, canActivate: [AuthGuard]},
	{ path: 'workspace', component: WorkspaceComponent, canActivate: [AuthGuard]},
  { path: '**', component: LandingComponent},
];

export const ROUTING: ModuleWithProviders<any> = RouterModule.forRoot(AppRoutes);