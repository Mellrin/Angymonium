import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import { IFeedback, IQuest } from 'src/app/models/quest.model';
import { AbstractQuestService } from 'src/app/services/abstract-quest.service';

@Component({
  selector: 'app-entity-details',
  templateUrl: './entity-details.component.html',
  styleUrls: ['./entity-details.component.less']
})
export class EntityDetailsComponent implements OnInit {
  quest!: IQuest;
  id!: number;
  _score!: IQuest["rating"];

  constructor(
    private route: ActivatedRoute,
    private questService: AbstractQuestService
  ) { }

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.questService.getQuestById(this.id)
    //.pipe(tap(el => console.warn(el)))
      .subscribe((res: IQuest) => {
        this.quest = res;
        this.currentScore = res?.feedbacks;

      });
  }

  get score(): IQuest["rating"] {
    return this._score
  }

  set currentScore(feedbacks: IFeedback[]) {
    this._score = feedbacks?.reduce((prev, cur) => prev + cur.score, 0) / feedbacks?.length || null
  }

  scrollToIdRef(e: Event, element: HTMLElement) {
    e.preventDefault()
    element.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
  }
}
