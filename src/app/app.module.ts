import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ROUTING } from './app.routing';
import { RootComponent } from './components/root/root.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { LandingComponent } from './components/landing/landing.component';
import { SignFormComponent } from './components/helper/sign-form/sign-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserListComponent } from './components/user-list/user-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PlaceholderPipe } from './pipes/placeholder.pipe';
import { ModalComponent } from './components/helper/modal/modal.component';
import { SortByRolePipe } from './pipes/sort-by-pipe.pipe';
import { WorkspaceComponent } from './components/workspace/workspace.component';
import { DropdownComponent } from './components/helper/dropdown/dropdown.component';
import { SvgIconComponent } from './components/helper/svg-icon/svg-icon.component';
import { SafeHTMLPipe } from './pipes/safe-html.pipe';
import { ComplexityLevelComponent } from './components/helper/complexity-level/complexity-level.component';
import { SortParamsDirective } from './directives/sort-params.directive';
@NgModule({
  declarations: [
    RootComponent,
    LoginComponent,
    SignupComponent,
    LandingComponent,
    SignFormComponent,
    UserListComponent,
    PlaceholderPipe,
    ModalComponent,
    SortByRolePipe,
    WorkspaceComponent,
    DropdownComponent,
    SvgIconComponent,
    SafeHTMLPipe,
    ComplexityLevelComponent,
    SortParamsDirective
  ],
  imports: [
    BrowserModule,
    ROUTING,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [RootComponent]
})
export class AppModule { }
