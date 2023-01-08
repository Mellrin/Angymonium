import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { IQuest } from 'src/app/models/quest.model';
import { AbstractQuestService } from 'src/app/services/abstract-quest.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.less'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class BookingComponent implements OnInit {
  viewDate: Date = new Date();
  arrMonth: Date[][] = Array.from({ length: this.daysInMonth }, () => Array.from({ length: 4 }));
  @Input() quest!: IQuest;

  constructor(
    private questService: AbstractQuestService
    ) { }

  ngOnInit() {
    this.initMonth()
  }

  get currentMonth(): string {
    return this.viewDate.toLocaleString('en-us', { month: 'long' })
  }

  get daysInMonth(): number {
    return new Date(this.viewDate.getFullYear(), this.viewDate.getMonth() + 1, 0).getDate()
  }

  get emptyDays(): number {
    const firstDay: Date = this.arrMonth[0][0]
    const numberOfEmptyDays =  (firstDay.getDay() === 0)? 6 : firstDay.getDay() - 1
    return numberOfEmptyDays
  }

  dayName(day: Date) {
    return day.toLocaleDateString('en-us', { weekday: 'long' });
  }

  initMonth() {
    this.arrMonth = this.arrMonth.map((el: Date[], i) => el.map((v: Date, j: number) =>  (new Date(this.viewDate.getFullYear(), this.viewDate.getMonth(), i + 1, 10 + j * 3)) ))
  }

  onBooking(slot: Date){
    this.questService.bookQuest(this.quest.id, slot)
      .subscribe();
  }

   getBookedSlots(slot: Date){
    const bookedSlots = this.quest.timeslots?.find((el: Date) => el.getTime() == slot.getTime())
    return bookedSlots
  }

}
