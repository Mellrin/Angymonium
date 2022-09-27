import { Injectable } from '@angular/core';
import { forwardRef } from "@angular/core";
import { Observable } from 'rxjs';
import { customQuest } from '../models/quest.model';
import { MockedQuestService } from './mocked-quest.service';

@Injectable({
  providedIn: "root",
  useClass: forwardRef(() => MockedQuestService)
})
export abstract class AbstractQuestService {
  public abstract getQuests(): Observable<customQuest[]>;
  public abstract getQuestById(id: number): Observable<customQuest>;
  public abstract addQuest(quest: customQuest): Observable<customQuest>;
}
