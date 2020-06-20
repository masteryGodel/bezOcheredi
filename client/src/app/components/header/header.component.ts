import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { AuthService } from './../../services/auth.service';
import { Apollo } from 'apollo-angular';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { SubscriptionDestroyer } from '../subscriptionDestroyer';

interface User {
  username?: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent extends SubscriptionDestroyer
  implements OnInit, OnDestroy {
  users: User[] = [];
  subscriptions: Subscription[] = [];
  public logged = false;
  constructor(
    private apollo: Apollo,
    public translate: TranslateService,
    private authService: AuthService
  ) {
    super();
  }
  ngOnInit() {
    this.authService
      .isAuthenticated()
      .pipe(distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe((isAuthenticated) => {
        this.logged = isAuthenticated;
      });
    this.authService.autoLogin();
  }

  public changeLang(): void {
    this.translate.currentLang === 'en'
      ? this.translate.use('ru')
      : this.translate.use('en');
  }

  public logout(): void {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }
}
