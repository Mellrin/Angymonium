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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private questService: AbstractQuestService
  ) { }

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.questService.getQuestById(this.id)
      .subscribe((res: customQuest) => this.quest = res);
  }
  goToAnchor1(){
    this.router.navigate(['/entity/', this.id], { fragment: 'feedback' });
  }

}
