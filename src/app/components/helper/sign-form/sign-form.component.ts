import { Component, ElementRef, EventEmitter, HostBinding, Input, Output, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-sign-form',
  templateUrl: './sign-form.component.html',
  styleUrls: ['./sign-form.component.less'],
  animations: [
    trigger(
      'inOutAnimation',
      [
        transition(
          ':enter',
          [
            style({ transform: '{{easeTime}}' }),
            animate('.3s ease-out',
              style({ transform: 'none' }))
          ], { params: { easeTime: 'translateX(10px)' } }
        ),
        transition(
          ':leave',
          [
            style({ transform: 'none' }),
            animate('.3s ease-in',
              style({ transform: '{{easeTime}}' }))
          ]
        )
      ]
    )
  ]
})
export class SignFormComponent {
  trigger: any;
  @HostBinding('@inOutAnimation') get fn() {
    return {
      value: this.trigger,
      params: {
        easeTime: this.reverse ? 'translateX(-5px)' : 'translateX(5px)'
      }
    }
  }

  @ViewChild('submit', { static: true }) button!: ElementRef;

  @HostBinding('class.reverse') @Input() reverse: boolean = false;

  @Output() onSubmitEvent = new EventEmitter<any>();

  @Input() form = {
    form_name: '',
    form_group: new FormGroup({}),
    description_heading: '',
    description_text: '',
    description_btn: { text: '', route: '' }
  }

  constructor() { }

  onSubmit() {
    this.onSubmitEvent.emit();
  }

  getButton() {
    return this.button.nativeElement
  }

  getErrorMsg(x: any) {
    //console.warn(x.errors)
    if (x.errors?.backendError) {
      return x.errors.backendError
    }
    if (x.errors?.required) {
      return 'field is required'
    }
    if (x.errors?.minlength) {
      return `type at least ${x.errors.minlength.requiredLength} characters`
    }

    if (x.errors?.mismatch) {
      return 'Password and Confirm Password must be match.'
    }

    if (x.errors?.pattern) {
      return `wrong pattern`
    }
    return 'error msg'
  }

  keepOrder = (a: any, b: any) => a

}
