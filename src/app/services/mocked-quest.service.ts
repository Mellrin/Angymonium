import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { customQuest } from '../models/quest.model';
import { AbstractQuestService } from './abstract-quest.service';
import { UserService } from './user.service';
const lorem = `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nemo, facere! Quia quam, odit
quisquam, cumque eius quod repudiandae labore sint eligendi enim esse. Quis, at animi numquam sapiente
nobis iusto.`

@Injectable({
  providedIn: 'root'
})
export class MockedQuestService implements AbstractQuestService {
  private readonly lists: customQuest[];
  private obj1 = <customQuest>{ id: 1, title: 'Crazy train', status: 'draft', description: lorem, rating: 5, complexity: 2, banner: 'https://static.tildacdn.com/tild3838-3031-4230-b739-653439663337/DJI_0129-min.jpg', host: 'John Dou' };
  private obj2 = <customQuest>{ id: 2, title: 'Old factory', status: 'active', description: lorem, rating: 5, complexity: 3, banner: 'https://media.istockphoto.com/photos/old-industrial-complex-picture-id157585400', host: 'John Dou' };

  constructor(
    private userService: UserService,
    private router: Router,
  ) {
    this.lists = new Array<customQuest>();

    this.lists.push(this.obj1, this.obj2);
  }

  public getQuests(): Observable<customQuest[]> {
    return of([...this.lists])
  }
  public getQuestById(id: number): Observable<customQuest> {
    return of(this.lists.find(x => x.id == id) || <customQuest>{});
  };

  public addQuest(quest: customQuest): Observable<customQuest> {
    let user = this.userService.currentUser$.value;
    let id = this.lists[this.lists.length - 1].id + 1;

    let newQuest = <customQuest>{ ...quest, status: 'draft', banner: 'http://placeimg.com/640/360/any', host: user.username, id };

    this.lists.push(newQuest)
    this.router.navigate(['/entity', id]);
    return of(newQuest)
  }
}
