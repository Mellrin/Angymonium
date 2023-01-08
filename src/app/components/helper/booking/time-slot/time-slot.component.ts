import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalService } from 'src/app/services/modal.service';
import { ModalComponent } from '../../modal/modal.component';

@Component({
  selector: 'app-time-slot',
  templateUrl: './time-slot.component.html',
  styleUrls: ['./time-slot.component.less']
})
export class TimeSlotComponent implements OnInit {
  @ViewChild('bookQuest', { static: false }) bookQuest!: TemplateRef<HTMLAllCollection>;
  @Input() slot!: Date;
  @Input() booked!: boolean | any;
  @Output() onSubmitEvent = new EventEmitter<Date>();

  private _statusClass: string = ''

  questFormGroup: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required]),
    comment: new FormControl(null)
  });

  set getClassName(name: string) {
    this._statusClass = name
  }

  get getClass() {
    return this._statusClass
  }

  constructor(
    private modalService: ModalService,
  ) {}

  ngOnInit(): void {
    this.setClass()
  }

  
  ngOnChanges(changes: SimpleChanges) {
    this.setClass()
  }

  setClass(){
    switch(true){
      case !!this.booked:
        this.getClassName = 'price-booked'
        break;
      case this.slot.getHours() === 10:
        this.getClassName = 'price-1'
        break;
      case this.slot.getDay() === 0 || this.slot.getDay() === 6:
        this.getClassName = 'price-2'
        break;
      default:
        this.getClassName = 'price-3'
    }
  }

  onClick() {
    this.modalService.open(ModalComponent, 'Book a Quest', this.bookQuest);
  }

  onSubmit() {
    this.modalService.close()
    this.onSubmitEvent.emit(this.slot);
  }
}
