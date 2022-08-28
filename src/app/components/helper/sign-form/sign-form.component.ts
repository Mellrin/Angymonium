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
            style({ transform: '{{easeTime}}', opacity: 0 }),
            animate('.3s ease-out',
              style({ transform: 'none', opacity: 1 }))
          ], { params: { easeTime: 'translateX(10px)' } }
        ),
        transition(
          ':leave',
          [
            style({ transform: 'none', opacity: 1 }),
            animate('.3s ease-in',
              style({ transform: '{{easeTime}}', opacity: 0 }))
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
    return 'error msg'
  }

}
