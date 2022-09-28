import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';
import { customQuest } from 'src/app/models/quest.model';
import { AbstractQuestService } from 'src/app/services/abstract-quest.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.less'],
})
export class LandingComponent implements OnInit {
  quests$!: Observable<customQuest[]>
  refreshToken$ = new BehaviorSubject<boolean>(true);

  constructor(
    private questService: AbstractQuestService
  ) { }


  ngOnInit() {
    this.quests$ = this.refreshToken$.pipe(
      switchMap(_ => this.questService.getQuests().pipe(tap(el => console.warn(el)))),
    );
  }

}
