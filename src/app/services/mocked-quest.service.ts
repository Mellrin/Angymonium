import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { customQuest } from '../models/quest.model';
import { AbstractQuestService } from './abstract-quest.service';

@Injectable({
  providedIn: 'root'
})
export class MockedQuestService implements AbstractQuestService {
  private readonly lists: customQuest[];
  private obj1 = <customQuest>{ id: 1, title: 'Crazy train', status: 'draft', description: 'lorem ipsum...', rating: 5, complexity: 2, banner: 'https://static.tildacdn.com/tild3838-3031-4230-b739-653439663337/DJI_0129-min.jpg', host: 'John Dou' };
  private obj2 = <customQuest>{ id: 2, title: 'Old factory', status: 'active', description: 'lorem ipsum...', rating: 5, complexity: 3, banner: 'https://media.istockphoto.com/photos/old-industrial-complex-picture-id157585400', host: 'John Dou' };

  constructor() {
    this.lists = new Array<customQuest>();

    this.lists.push(this.obj1, this.obj2);
  }

  public getQuests(): Observable<customQuest[]> {
    return of([...this.lists])
  }
  public getQuestById(id: number): Observable<any> {
    return of(this.lists.find(x => x.id == id));
  };

  public addQuest(quest: customQuest): Observable<any> {
    return of(this.lists.push(quest))
  }
}
