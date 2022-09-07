import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.less']
})
export class ModalComponent {
  display$: Observable<'open' | 'close'> = of('close');
  test: string = ''

  constructor(
    public modalService: ModalService
  ) { }

  ngOnInit() {
    this.display$ = this.modalService.watch();
  }

  close() {
    this.modalService.close();
  }

}
