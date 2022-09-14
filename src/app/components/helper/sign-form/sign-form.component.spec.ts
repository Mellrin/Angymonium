import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AppRoutes } from 'src/app/app.routing';
import { PlaceholderPipe } from 'src/app/pipes/placeholder.pipe';


import { SignFormComponent } from './sign-form.component';

describe('SignFormComponent', () => {
  let component: SignFormComponent;
  let fixture: ComponentFixture<SignFormComponent>;
  let router: Router;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignFormComponent, PlaceholderPipe],
      imports: [FormsModule, ReactiveFormsModule, BrowserAnimationsModule, RouterTestingModule.withRoutes(AppRoutes)],
    })
      .compileComponents();
    router = TestBed.inject(Router);
    router.initialNavigation
  });

  beforeEach(() => {
    let emailPattern: string = "^\\w+([-+.']\\w+)*@\\w+([-.]\\w+)*\\.\\w{2,}([-.]\\w+)*$";
    fixture = TestBed.createComponent(SignFormComponent);
    component = fixture.componentInstance;
    component.form = {
      form_name: 'Random form name',
      form_group: new FormGroup({
        email: new FormControl('', [Validators.required, Validators.pattern(emailPattern)]),
        username: new FormControl('', [Validators.required, Validators.minLength(6)]),
      }),
      description_heading: "Some test description",
      description_btn: { text: 'Test button', route: '/user/signup' },
    };
    fixture.detectChanges();
  });

  // it('should not render reverse class by default', () => {
  //   expect(fixture.nativeElement.classList.contains('reverse')).toBeFalse();
  // });

  // it('should render reverse class', () => {
  //   component.reverse = true;
  //   fixture.detectChanges();
  //   expect(fixture.nativeElement.classList.contains('reverse')).toBeTrue();
  // });

  it('should render form name in a h2 tag', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h2').textContent).toContain('Random form name');
  });

  it('should render error message when form is not valid', fakeAsync(async () => {
    let button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges()

    let errorEmailField: HTMLDivElement = fixture.debugElement.nativeElement.querySelector('[data-testid="email"] .form__field--error');
    expect(errorEmailField.innerText).toContain('field is required');

    let errorUsernameField: HTMLDivElement = fixture.debugElement.nativeElement.querySelector('[data-testid="username"] .form__field--error');
    expect(errorUsernameField.innerText).toContain('field is required');

    fixture.whenStable().then(() => {
      let inputUsername: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('[data-testid="username"] .form-control');
      inputUsername.value = 'user';
      inputUsername.dispatchEvent(new Event('input'))

      let inputEmail: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('[data-testid="email"] .form-control');
      inputEmail.value = 'email@';
      inputEmail.dispatchEvent(new Event('input'))

      fixture.detectChanges()

      fixture.whenStable().then(() => {
        expect(errorEmailField.innerText).toContain('wrong pattern');

        let requiredLength = component.form.form_group.get('username')?.errors?.['minlength']['requiredLength']
        expect(errorUsernameField.innerText).toContain(`type at least ${requiredLength} characters`);
      })

    })
  }));

  it('should render all of controls with placeholders', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelectorAll('.form-control').length).toBe(Object.keys(component.form.form_group.controls).length);
    let inputUsername: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('[data-testid="username"] .form-control');
    let inputEmail: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('[data-testid="email"] .form-control');
    expect(inputUsername.getAttribute('placeholder')).toContain('Username');
    expect(inputEmail.getAttribute('placeholder')).toContain('Email');
  });


  it('should render all of description text', () => {
    const description = fixture.debugElement.nativeElement.querySelector('div.description');
    const h3 = description.querySelector('h3');
    const p = description.querySelector('p');

    expect(description).toBeTruthy();
    expect(h3.getAttribute('class')).toContain('form__heading')
    expect(h3.textContent).toContain('Some test description');
    expect(p.textContent).toContain('test text');
  });

  it('should navigate to another route', fakeAsync(async () => {
    let link = fixture.debugElement.nativeElement.querySelector('[data-testid="link"]');
    link.click()
    tick(100)
    fixture.detectChanges();
    expect(router.url).toEqual('/user/signup');
  }));
});
