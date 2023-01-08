import { Injectable } from '@angular/core';
import { forwardRef } from "@angular/core";
import { Observable } from 'rxjs';
import { IQuest } from '../models/quest.model';
import { MockedQuestService } from './mocked-quest.service';

// @Injectable({
//   providedIn: "root",
//   useClass: forwardRef(() => MockedQuestService)
// })
export abstract class AbstractQuestService {
  public abstract getQuests(): Observable<IQuest[]>;
  public abstract getOwnerQuests(): Observable<IQuest[]>;
  public abstract getQuestById(id: number): Observable<IQuest>;
  public abstract addQuest(quest: IQuest): Observable<IQuest>;
  public abstract bookQuest(id: number, timeslot: Date): Observable<IQuest>;
}
