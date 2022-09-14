import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, catchError, noop, Observable, of, switchMap, tap } from 'rxjs';
import { userItem } from 'src/app/pipes/sort-by-pipe.pipe';
import { ModalService } from 'src/app/services/modal.service';
import { UserService } from 'src/app/services/user.service';
import { ModalComponent } from '../helper/modal/modal.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.less']
})
export class UserListComponent implements OnInit {
  @ViewChild('updateUserRole', { static: false }) updateUserRole!: TemplateRef<any>;

  userList$!: Observable<userItem[]>;
  roles$!: Observable<any[]>;
  refreshUsers$ = new BehaviorSubject<boolean>(true);

  user: { username: string, role: { title: string, _id: string } } = {
    username: '', role: { title: '', _id: '' }
  };

  searchTerm: string = '';
  direction: string = 'asc';
  column: keyof userItem = 'role';
  type: string = 'string';

  config: Array<{ width: string, type?: string, colname: keyof userItem }> = [
    { colname: 'username', width: '120px' },
    { colname: 'email', width: '160px' },
    { colname: 'role', type: 'role', width: '80px' },
    { colname: 'registrationDate', type: 'datetime', width: '160px' }
  ];

  constructor(
    private userServce: UserService,
    private modalService: ModalService
  ) { }

  ngOnInit() {
    this.userList$ = this.refreshUsers$.pipe(
      switchMap(_ => this.userServce.getAllUsers().pipe()),
    );

    this.roles$ = this.userServce.getAllRoles();
  }

  updatePrivileges(col: any) {
    this.user.username = col.username
    this.user.role = col.role
    this.modalService.open(ModalComponent, 'Update User Role', this.updateUserRole);
  }

  update() {
    this.userServce.updateUser(this.user)
      .pipe(
        catchError(e => of(e)),
        tap(_ => (this.refreshUsers$.next(true), this.modalService.close()))
      )
      .subscribe(noop)
  }

  onSubmit(item: any) {
    this.user.role = item;
  }

  setSortParams(param: any) {
    this.direction = param.dir;
    this.column = param.col;
    this.type = param.typ;
  }

}
