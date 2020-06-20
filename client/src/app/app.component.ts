import { AuthService } from './services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { SubscriptionDestroyer } from './components/subscriptionDestroyer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent extends SubscriptionDestroyer
  implements OnInit, OnDestroy {
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

  public logout(): void {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }
}
