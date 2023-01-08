import { Component, ElementRef, Input, TemplateRef } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.less']
})
export class ModalComponent {
  @Input('title') title: string = '';
  @Input() currentTemplate!: TemplateRef<HTMLAllCollection>;

  constructor(
    public modalService: ModalService,
    private eRef: ElementRef
  ) { }

  ngOnInit() {}

  close() {
    this.modalService.close();
  }

  handleClick(event: Event) {
    if ((event.target as HTMLElement).tagName === 'section'.toUpperCase() && this.eRef.nativeElement.contains(event.target)) {
      this.modalService.close();
    }
  }

}
