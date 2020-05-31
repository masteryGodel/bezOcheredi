import { AuthService } from './services/auth.service';
import { Component, OnInit, OnChanges } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { distinctUntilChanged } from 'rxjs/operators';
import gql from 'graphql-tag';
import { TranslateService } from '@ngx-translate/core';


interface User {
  username?: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  users: User[] = [];
  logged: boolean = false;
  constructor(private apollo: Apollo, public translate: TranslateService, private authService: AuthService) {}

  ngOnInit() {
    // this.apollo
    //   .watchQuery({
    //     query: gql`
    //       {
    //         users {
    //           username
    //         }
    //       }
    //     `,
    //   })
    //   .valueChanges.subscribe((result) => {
    //     // @ts-ignore
    //     this.users = result.data && result.data.users;
    //   });
    this.authService.isAuthenticated
    .distinctUntilChanged() // Only emit when the current value is different than the last
    .subscribe(isAuthenticated => {
      debugger
      this.logged = isAuthenticated
    });
  }
}
