import { Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';

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
    form_fields: [{ field: '' }],
    description_heading: '',
    description_text: '',
    description_btn: { text: '', route: '' }
  }

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.onSubmitEvent.emit();
  }
}
