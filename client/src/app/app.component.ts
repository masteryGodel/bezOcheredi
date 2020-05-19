import { Component, OnInit, OnChanges } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { TranslateService } from '@ngx-translate/core';


export interface Card {
  title: string
  category: string
  description: string
}


interface User {
  username?: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  cards: Card[] = [
    {title: 'Company 1', category: 'Category 1', description: 'Description 1'},
    {title: 'Company 2', category: 'Category 2', description: 'Description 2'},
    {title: 'Company 3', category: 'Category 3', description: 'Description 3'}
  ]

  users: User[] = [];
  constructor(private apollo: Apollo, public translate: TranslateService) {}

  ngOnInit() {
    this.apollo
      .watchQuery({
        query: gql`
          {
            users {
              username
            }
          }
        `,
      })
      .valueChanges.subscribe((result) => {
        // @ts-ignore
        this.users = result.data && result.data.users;
      });
  }
}
