import { Apollo } from 'apollo-angular';
import { TranslateService } from '@ngx-translate/core';
import gql from 'graphql-tag';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { ROLES } from 'src/enums/roles';
import { EmailValidator } from '../../validators/email-correct.validator';
import { Subscription } from 'rxjs';
import { pluck } from 'rxjs/operators';

const mutateRegister = gql`
  mutation($username: String!, $password: String!, $role: Int!) {
    register(username: $username, password: $password, role: $role) {
      id
      username
      role
      token

    }
  }
`;
const mutateLogin = gql`
  mutation($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      username
      role
      token
    }
  }
`;
export interface UserData {
  id: string;
  role: number;
  token: string;
  username: string;
}


@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss'],
})
export class AuthPageComponent implements OnInit, OnDestroy {
  public login: FormControl;
  public password: FormControl;
  public checkbox: FormControl;
  public userForm: FormGroup;
  private checkboxSubscription$: Subscription;
  public hide = true;
  public currentRoute;
  public isRegistered = true;

  constructor(
    private router: Router,
    private apollo: Apollo,
    public translate: TranslateService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.createFormsField();
    this.createFormGroup();
    this.onCheckboxChanges();
  }
  submit() {
    if (!this.isRegistered) {
      this.apollo
        .mutate({
          mutation: mutateRegister,
          variables: {
            username: this.login.value,
            password: this.password.value,
            role: ROLES.CLIENT,
          },
        })
        .pipe(
          pluck('data', 'register')
        )
        .subscribe((result: UserData) => {
          const id = result.id;
          const token = result.token;
          this.authService.saveUserData(id, token);
          this.router.navigate(['/']);
        }, (error) => { console.log(error); }
        );
    } else {
      this.apollo
        .mutate({
          mutation: mutateLogin,
          variables: {
            username: this.login.value,
            password: this.password.value,
            role: ROLES.CLIENT,
          },
        })
        .pipe(
          pluck('data', 'login')
        )
        .subscribe(
          (result: UserData) => {
            const id = result.id;
            const token = result.token;
            this.authService.saveUserData(id, token);
            this.router.navigate(['/']);
          }, (error) => { console.log(error); }
        );
    }
  }

  private createFormsField() {
    this.login = new FormControl('', [
      Validators.required,
      EmailValidator.emailValidator,
    ]);
    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(32),
    ]);
    this.checkbox = new FormControl('', [
    ]);
  }
  private createFormGroup() {
    this.userForm = new FormGroup({
      login: this.login,
      password: this.password,
    });
  }

  onCheckboxChanges() {
    this.checkboxSubscription$ = this.checkbox.valueChanges.subscribe(data => {
    this.isRegistered = !data
    });
  }

  ngOnDestroy() {
    if (this.checkboxSubscription$) { this.checkboxSubscription$.unsubscribe(); }
  }
}
