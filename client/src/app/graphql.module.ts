import { AUTH_TOKEN } from './services/constants';
import { NgModule } from '@angular/core';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { environment } from '../environments/environment';
import { HttpHeaders } from '@angular/common/http';

export function createApollo(httpLink: HttpLink) {
  const token = localStorage.getItem(AUTH_TOKEN);
  const authorization = token ? `Bearer ${token}` : '';
  const headers = new HttpHeaders().append('Authorization', authorization);
  return {
    link: httpLink.create({ uri: environment.baseUri, headers }),
    cache: new InMemoryCache(),
  };
}

@NgModule({
  exports: [ApolloModule, HttpLinkModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule { }
