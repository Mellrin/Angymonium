import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplexityLevelComponent } from './complexity-level.component';

describe('ComplexityLevelComponent', () => {
  let component: ComplexityLevelComponent;
  let fixture: ComponentFixture<ComplexityLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComplexityLevelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplexityLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
