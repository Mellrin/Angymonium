import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';

export interface ROLE {
  title: string,
  _id: string
}

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.less']
})
export class DropdownComponent implements OnInit {
  @Input() defaultItem: ROLE | undefined;
  selectedRole: ROLE | undefined

  @Input() list!: any[];
  dropdownOpen: boolean = false;

  @Output() onSubmitEvent = new EventEmitter<any>();

  @HostListener("click")
  clicked() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  @HostListener("document:click", ['$event'])
  clickedOut(event: Event) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.dropdownOpen = false;
    }
  }

  constructor(private eRef: ElementRef) { }

  ngOnInit() { }

  onSubmit(item: ROLE) {
    this.selectedRole = item;
    this.onSubmitEvent.emit(item);
  }
}
