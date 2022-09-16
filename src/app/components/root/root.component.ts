import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/services/modal.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.less'],
  providers: [ModalService],
})
export class RootComponent implements OnInit {
  user: string = '';
  nativeElement;

  constructor(
    private router: Router,
    private userServce: UserService,
    private elRef: ElementRef
  ) {
    this.userServce.currentUser$.subscribe(user => {
      this.user = user.username as string
    })
    this.nativeElement = this.elRef.nativeElement;

  }

  ngOnInit() { }

  logout() {
    event?.preventDefault();
    this.userServce.logout()
    this.router.navigate(['/user/signin']);
  }
}
