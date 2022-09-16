import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { ModalService } from 'src/app/services/modal.service';
import { ModalComponent } from '../helper/modal/modal.component';
import { getErrorMsg } from '../helper/sign-form/sign-form.component';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.less']
})
export class WorkspaceComponent implements OnInit {
  @ViewChild('createQuest', { static: false }) createQuest!: TemplateRef<any>;
  errorMessage: any = getErrorMsg

  questFormGroup: FormGroup;
  quests$: Observable<any[]> = of([
    { title: 'Crazy train', status: 'draft', description: 'lorem ipsum...', rating: 5, complexity: 2, location: '', banner: 'https://static.tildacdn.com/tild3838-3031-4230-b739-653439663337/DJI_0129-min.jpg', host: 'John Dou', eventTime: [{ time: '2022-09-02T19:41:31.986+00:00', booked: true }, { time: '2022-09-02T17:41:31.986+00:00', booked: false }] },
    { title: 'Old factory', status: 'active', description: 'lorem ipsum...', rating: 5, complexity: 3, location: '', banner: 'https://media.istockphoto.com/photos/old-industrial-complex-picture-id157585400' }
  ])

  constructor(
    private modalService: ModalService
  ) {
    this.questFormGroup = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required])
    });
  }

  ngOnInit() { }

  openModal() {
    this.questFormGroup.reset()
    this.modalService.open(ModalComponent, 'Create Quest', this.createQuest);
  }

  create() {

  }
}
