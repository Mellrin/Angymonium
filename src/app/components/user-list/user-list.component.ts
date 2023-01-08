import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, catchError, delay, noop, Observable, of, switchMap, tap } from 'rxjs';
import { userItem } from 'src/app/models/user.model';

import { ModalService } from 'src/app/services/modal.service';
import { UserService } from 'src/app/services/user.service';
import { ModalComponent } from '../helper/modal/modal.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.less']
})
export class UserListComponent implements OnInit {
  @ViewChild('updateUserRole', { static: false }) updateUserRole!: TemplateRef<HTMLAllCollection>;

  userList$!: Observable<userItem[]>;
  roles$!: Observable<userItem["role"][]>;
  refreshUsers$ = new BehaviorSubject<boolean>(true);

  selectedUser!: userItem;

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

  loading: boolean = true;

  constructor(
    private userServce: UserService,
    private modalService: ModalService
  ) { }

  ngOnInit() {
    this.userList$ = this.refreshUsers$.pipe(
      switchMap(_ => this.userServce.getAllUsers().pipe(tap(_ => this.loading = false),)),
    );

    this.roles$ = this.userServce.getAllRoles();
  }

  updatePrivileges(col: userItem) {
    this.selectedUser = col
    this.modalService.open(ModalComponent, 'Update User Role', this.updateUserRole);
  }

  update() {
    this.userServce.updateUser(this.selectedUser)
      .pipe(
        catchError(e => of(e)),
        tap(_ => (this.refreshUsers$.next(true), this.modalService.close()))
      )
      .subscribe(noop)
  }

  onSubmit(item: userItem['role']) {
    this.selectedUser.role = item;
  }

  setSortParams(param: {dir: string, col: keyof userItem, typ: string}) {
    this.direction = param.dir;
    this.column = param.col;
    this.type = param.typ;
  }

  openFilterDlg() {
    this.modalService.open(ModalComponent, 'Will be implemented soon', null);
  }

}
