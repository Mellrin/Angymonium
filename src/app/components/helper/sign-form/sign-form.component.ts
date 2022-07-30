import { Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-sign-form',
  templateUrl: './sign-form.component.html',
  styleUrls: ['./sign-form.component.less']
})
export class SignFormComponent implements OnInit {
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

  ngOnInit(): void {
    console.warn(this.form.form_group)
  }
  onSubmit() {
    this.onSubmitEvent.emit();
    console.warn(this.form.form_group)
  }

  getErrorMsg(x: any) {
    //console.warn(x.errors)
    if (x.errors.required){
      return 'field is required'
    }
    if (x.errors.minlength){
      return `type at least ${x.errors.minlength.requiredLength} characters`
    }
    return 'error msg'
  }

}
