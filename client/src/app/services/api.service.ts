import { ROLES } from './../../enums/roles';
import { pluck } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private apollo: Apollo) {}
  mutateRegister = gql`
    mutation($username: String!, $password: String!, $role: Int!) {
      register(username: $username, password: $password, role: $role) {
        id
        username
        role
        token
      }
    }
  `;
  mutateLogin = gql`
    mutation($username: String!, $password: String!) {
      login(username: $username, password: $password) {
        id
        username
        role
        token
      }
    }
  `;

  public register(username: string, password: string) {
    return this.apollo
      .mutate({
        mutation: gql`
          mutation($username: String!, $password: String!, $role: Int!) {
            register(username: $username, password: $password, role: $role) {
              id
              username
              role
              token
            }
          }
        `,
        variables: {
          username,
          password,
          role: ROLES.CLIENT,
        },
      })
      .pipe(pluck('data', 'register'));
  }
  public login(username: string, password: string) {
    return this.apollo
      .mutate({
        mutation: gql`
        mutation($username: String!, $password: String!) {
          login(username: $username, password: $password) {
            id
            username
            role
            token
          }
        }
      `,
        variables: {
          username,
          password,
        },
      })
      .pipe(pluck('data', 'login'));
  }
}
