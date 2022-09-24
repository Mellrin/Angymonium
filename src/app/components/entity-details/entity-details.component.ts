import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { customQuest } from 'src/app/models/quest.model';
import { AbstractQuestService } from 'src/app/services/abstract-quest.service';

@Component({
  selector: 'app-entity-details',
  templateUrl: './entity-details.component.html',
  styleUrls: ['./entity-details.component.less']
})
export class EntityDetailsComponent implements OnInit {
  quest!: customQuest;

  constructor(
    private route: ActivatedRoute,
    private questService: AbstractQuestService
  ) { }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.questService.getQuestById(id)
      .subscribe((res: customQuest) => this.quest = res);
  }

}
