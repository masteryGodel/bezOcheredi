import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { AuthFormComponent } from './components/auth-form/auth-form.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [AppComponent, AuthFormComponent],
  imports: [BrowserModule, AppRoutingModule, GraphQLModule, HttpClientModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],

})
export class AppModule {}
