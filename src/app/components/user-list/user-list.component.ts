import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, catchError, noop, Observable, of, switchMap, tap } from 'rxjs';
import { ModalService } from 'src/app/services/modal.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.less']
})
export class UserListComponent implements OnInit {
  userList$!: Observable<any[]>;
  roles$!: Observable<any[]>;
  refreshUsers$ = new BehaviorSubject<boolean>(true);

  privilegeForm: FormGroup;

  config: Array<any> = [{ colname: 'username' }, { colname: 'email' }, { colname: 'role', type: 'role' }, { colname: 'registrationDate', type: 'datetime' }];

  constructor(
    private userServce: UserService,
    private modalService: ModalService
  ) {
    this.privilegeForm = new FormGroup({
      users: new FormControl(null, [Validators.required]),
      roles: new FormControl(null, [Validators.required])
    });
  }

  ngOnInit() {
    this.userList$ = this.refreshUsers$.pipe(
      switchMap(_ => this.userServce.getAllUsers().pipe()),
    );

    this.roles$ = this.userServce.getAllRoles();
  }

  updatePrivileges(col: any) {
    this.privilegeForm.get('users')?.setValue(col.username);
    this.privilegeForm.get('users')?.disable();
    this.privilegeForm.get('roles')?.setValue(col.role._id)
    this.modalService.open();
  }

  update() {
    let user = {
      username: '', role: {}
    };

    user.username = this.privilegeForm.controls['users'].value;
    user.role = this.privilegeForm.controls['roles'].value;

    this.userServce.updateUser(user)
      .pipe(
        catchError(e => of(e)),
        tap(_ => (this.refreshUsers$.next(true), this.modalService.close()))
      )
      .subscribe(noop)
  }
}
