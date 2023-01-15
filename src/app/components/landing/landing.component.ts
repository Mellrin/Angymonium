import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';
import { IQuest } from 'src/app/models/quest.model';
import { AbstractQuestService } from 'src/app/services/abstract-quest.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.less'],
})
export class LandingComponent implements OnInit {
  quests$!: Observable<IQuest[]>
  refreshToken$ = new BehaviorSubject<boolean>(true);

  constructor(
    private questService: AbstractQuestService
  ) { }


  ngOnInit() {
    this.quests$ = this.refreshToken$.pipe(
      switchMap(_ => this.questService.getQuests()
        .pipe(
          tap(quests => quests?.map(quest => quest.rating = quest.feedbacks ? quest.feedbacks.reduce((prev, cur) => prev + cur.score, 0) / quest.feedbacks.length : null))
        )
      ),
    );
  }

}
