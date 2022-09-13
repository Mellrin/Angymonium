import { Component, ElementRef, Input } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.less']
})
export class ModalComponent {
  display$: Observable<'open' | 'close'> = of('close');
  @Input() title: string = '';
  modalTitle: string = '';

  constructor(
    public modalService: ModalService,
    private eRef: ElementRef
  ) { }

  ngOnInit() {
    this.display$ = this.modalService.watch();
    this.modalTitle = this.title
  }

  close() {
    this.modalService.close();
  }

  handleClick(event: any) {
    if (event.target.tagName === 'section'.toUpperCase() && this.eRef.nativeElement.contains(event.target)) {
      this.modalService.close();
    }
  }

}
