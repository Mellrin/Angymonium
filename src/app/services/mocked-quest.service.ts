import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Feedback, IFeedback, IQuest } from '../models/quest.model';
import { AbstractQuestService } from './abstract-quest.service';
import { UserService } from './user.service';

const lorem = `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nemo, facere! Quia quam, odit
quisquam, cumque eius quod repudiandae labore sint eligendi enim esse. Quis, at animi numquam sapiente
nobis iusto.`

@Injectable({
  providedIn: 'root'
})
export class MockedQuestService implements AbstractQuestService {
  private readonly lists: IQuest[];
  private readonly feedbacks: IFeedback[] = new Array<IFeedback>();
  private obj1 = <IQuest>{ id: 1, title: 'Crazy train', status: 'draft', description: lorem, complexity: 2, banner: 'https://static.tildacdn.com/tild3838-3031-4230-b739-653439663337/DJI_0129-min.jpg', host: 'admin', feedbacks: [], timeslots: []  };
  private obj2 = <IQuest>{ id: 2, title: 'Old factory', status: 'active', description: lorem, complexity: 3, banner: 'https://media.istockphoto.com/photos/old-industrial-complex-picture-id157585400', host: 'John Dou', feedbacks: this.feedbacks, timeslots: [ new Date(2023, 0, 13, 10)] };
  private fd1 = new Feedback('John Dou', 4, new Date("2020-05-12T23:50:21.817Z"), lorem)
  private fd2 = new Feedback('Jane Dou', 5, new Date("2020-05-12T23:50:21.817Z"), lorem)

  constructor(
    private userService: UserService,
    private router: Router,
  ) {
    this.lists = new Array<IQuest>();

    this.lists.push(this.obj1, this.obj2);
    this.feedbacks.push(this.fd1, this.fd2);
  }

  public getQuests(): Observable<IQuest[]> {
    return of([...this.lists])
  }

  public getOwnerQuests(): Observable<IQuest[]> {
    let user = this.userService.currentUser$.value;
    let ownerQuests = this.lists.filter(el => el.host == user.username)
    return of(ownerQuests)
  }

  public getQuestById(id: number): Observable<IQuest> {
    let user = this.userService.currentUser$.value;
    let quest = this.lists.find(x => x.id == id)
    return of( <IQuest>{...quest, isOwner: quest?.host == user.username});
  };

  public addQuest(quest: IQuest): Observable<IQuest> {
    let user = this.userService.currentUser$.value;
    let id = this.lists[this.lists.length - 1].id + 1;

    let newQuest = <IQuest>{ ...quest, status: 'draft', banner: 'http://placeimg.com/640/360/any', host: user.username, id };

    this.lists.push(newQuest)
    this.router.navigate(['/entity', id]);
    return of(newQuest)
  }

  public bookQuest(id: number, timeslot: Date): Observable<IQuest>  {
    const quest = this.lists.find(q => q.id === id)
    if(!quest){
      return of()
    }
    quest.timeslots?.push(timeslot)
    console.warn(quest)
    return of(quest)
  }
}
