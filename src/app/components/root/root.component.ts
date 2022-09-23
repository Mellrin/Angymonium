import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/services/modal.service';
import { ThemeService } from 'src/app/services/theme.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.less'],
  providers: [ModalService],
})
export class RootComponent implements OnInit {
  user: string = '';
  themeIcon!: string;
  nativeElement;
 
  constructor(
    private router: Router,
    private userServce: UserService,
    private elRef: ElementRef,
    private themeService: ThemeService,
    private renderer: Renderer2,
  ) {
    this.setThemeClass()

    this.userServce.currentUser$.subscribe(user => {
      this.user = user.username as string
    })

    this.nativeElement = this.elRef.nativeElement;
  }

  ngOnInit() { }

  logout(event: Event) {
    event?.preventDefault();
    this.userServce.logout()
    this.router.navigate(['/user/signin']);
  }

  toggleTheme(event: Event) {
    event?.preventDefault();
    this.renderer.removeClass(document.documentElement, this.themeService.getTheme());
    this.themeService.toggleTheme();
    this.setThemeClass()
  }

  setThemeClass() {
    this.themeIcon = this.themeService.getIcon();
    this.renderer.addClass(document.documentElement, this.themeService.getTheme());
  }
}
