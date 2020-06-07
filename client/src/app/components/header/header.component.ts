import { distinctUntilChanged } from 'rxjs/operators';
import { AuthService } from './../../services/auth.service';
import { Apollo } from 'apollo-angular';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';


interface User {
  username?: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit, OnDestroy {
  users: User[] = [];
  subscriptions: Subscription[] = [];
  logged = false;
  constructor(private apollo: Apollo, public translate: TranslateService, private authService: AuthService) { }
  ngOnInit() {
    const isAuthenticatedSubscription = this.authService.isAuthenticated()
      .pipe(distinctUntilChanged())
      .subscribe(isAuthenticated => {
        this.logged = isAuthenticated;
      });

    this.subscriptions = [...this.subscriptions, isAuthenticatedSubscription];

    this.authService.autoLogin();
  }
  logout() {
    this.authService.logout();
  }
  changeLang() {
    this.translate.currentLang === 'en' ? this.translate.use('ru') : this.translate.use('en');
  }

  ngOnDestroy(): void {
    for (const sub of this.subscriptions) {
      if (sub && sub.unsubscribe) {
        sub.unsubscribe();
      }
    }
  }
}
