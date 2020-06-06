import { AuthService } from './services/auth.service';
import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { distinctUntilChanged } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';



export interface Card {
  title: string;
  category: string;
  description: string;
}


interface User {
  username?: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
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

  ngOnDestroy(): void {
    for (const sub of this.subscriptions) {
      if (sub && sub.unsubscribe) {
        sub.unsubscribe();
      }
    }
  }
}
