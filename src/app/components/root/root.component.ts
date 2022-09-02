import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.less']
})
export class RootComponent implements OnInit {
  user: string = '';

  constructor(
    private router: Router,
    private userServce: UserService
  ) {
    this.userServce.currentUser$.subscribe(user => {
      this.user = user.username as string
    })

  }

  ngOnInit() { }

  logout() {
    event?.preventDefault();
    this.userServce.logout()
    this.router.navigate(['/user/signin']);
  }
}
