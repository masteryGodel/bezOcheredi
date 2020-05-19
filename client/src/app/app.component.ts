import { Component, OnInit, OnChanges } from '@angular/core';
import { Apollo } from 'apollo-angular';
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
  constructor(private apollo: Apollo, public translate: TranslateService) {}

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
  }
}
