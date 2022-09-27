import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, catchError, noop, Observable, of, switchMap, tap } from 'rxjs';
import { customQuest } from 'src/app/models/quest.model';
import { AbstractQuestService } from 'src/app/services/abstract-quest.service';
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
  quests$!: Observable<customQuest[]>
  refreshToken$ = new BehaviorSubject<boolean>(true);

  constructor(
    private modalService: ModalService,
    private questService: AbstractQuestService,
  ) {
    this.questFormGroup = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required])
    });
  }

  ngOnInit() {
    this.quests$ = this.refreshToken$.pipe(
      switchMap(_ => this.questService.getQuests().pipe()),
    );
  }

  openModal() {
    this.questFormGroup.reset()
    this.modalService.open(ModalComponent, 'Create Quest', this.createQuest);
  }

  create() {
    console.warn(this.questFormGroup)
 
    if (Object.values(this.questFormGroup.controls).every(val => !val.errors)) {
      this.questService.addQuest(this.questFormGroup.value)
        .pipe(
          catchError(e => of(e)),
          tap(_ => (this.refreshToken$.next(true), this.modalService.close()))
        )
        .subscribe(noop)
    }

  }
}
