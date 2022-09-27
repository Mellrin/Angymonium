import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { customQuest } from 'src/app/models/quest.model';
import { AbstractQuestService } from 'src/app/services/abstract-quest.service';

@Component({
  selector: 'app-entity-details',
  templateUrl: './entity-details.component.html',
  styleUrls: ['./entity-details.component.less']
})
export class EntityDetailsComponent implements OnInit {
  quest!: customQuest;
  id!: number;
  date: Date = new Date("2020-05-12T23:50:21.817Z");

  constructor(
    private route: ActivatedRoute,
    private questService: AbstractQuestService
  ) { }

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.questService.getQuestById(this.id)
      .subscribe((res: customQuest) => this.quest = res);
  }
  scrollToIdRef(e: Event, element: any){
    e.preventDefault()
    element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }
}
