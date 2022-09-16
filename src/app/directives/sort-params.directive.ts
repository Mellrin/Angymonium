import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appSortParams]'
})
export class SortParamsDirective {
  @Output() param: EventEmitter<any> = new EventEmitter();

  constructor(private element: ElementRef) { }

  @HostListener('click') onClickIcon() {
    this.selectSort(this.element.nativeElement.id)
  }

  selectSort(id: any) {
    switch (id) {
      case 'usernameAsc':
        this.param.emit({ dir: 'asc', col: 'username', typ: 'string' })
        break;
      case 'emailAsc':
        this.param.emit({ dir: 'asc', col: 'email', typ: 'string' })
        break;
      case 'roleAsc':
        this.param.emit({ dir: 'asc', col: 'role', typ: 'string' })
        break;
      case 'registrationDateAsc':
        this.param.emit({ dir: 'asc', col: 'registrationDate', typ: 'timestamp' })
        break;

      case 'usernameDesc':
        this.param.emit({ dir: 'desc', col: 'username', typ: 'string' })
        break;
      case 'emailDesc':
        this.param.emit({ dir: 'desc', col: 'email', typ: 'string' })
        break;
      case 'roleDesc':
        this.param.emit({ dir: 'desc', col: 'role', typ: 'string' })
        break;
      case 'registrationDateDesc':
        this.param.emit({ dir: 'desc', col: 'registrationDate', typ: 'timestamp' })
        break;
    }
  }
}
