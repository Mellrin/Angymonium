import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.less']
})
export class UserListComponent implements OnInit {
  userList: Array<any> | undefined;
  column: Array<string> = [];
  
  config: Array<any> = [{ colname: 'username' }, { colname: 'email' }, { colname: 'role' }, { colname: 'registrationDate', type: 'datetime' }];

  constructor(
    private userServce: UserService
  ) { }

  ngOnInit(): void {
    this.userServce.getAllUsers().subscribe((res: any) => {
      //console.warn(res);
      this.userList = res;
      this.column = Object.keys(res[0])
      //console.warn(Object.keys(res[0]))
    })
  }

}

