import { ROLES } from 'src/enums/roles';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';
import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute} from '@angular/router';
import { EmailValidator } from './../../validators/email-correct.validator';

const mutateRegister = gql`
  mutation ($username: String!, $password: String!, $role: Int!) {
    register(username: $username, password: $password, role: $role ) {
      username
      role
      token
    }
  }
`;
const mutateLogin = gql`
  mutation ($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      username
      role
      token
    }
  }
`;

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss']
})
export class AuthFormComponent implements OnInit {
  public login: FormControl;
  public password: FormControl;
  public userForm: FormGroup;
  public hide = true;
  public currentRoute;

  constructor(private apollo: Apollo, public translate: TranslateService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.currentRoute = this.route.snapshot.url.join('');
    this.createFormsField();
    this.createFormGroup();
  }
  submit() {
    if (this.currentRoute === 'register') {
      this.apollo.mutate({
        mutation: mutateRegister,
        variables: {
          username: this.login.value,
          password: this.password.value,
          role: ROLES.CLIENT
        }
      }).subscribe(item => console.log(item), error => console.log(error));
    }
    else {
      this.apollo.mutate({
        mutation: mutateLogin,
        variables: {
          username: this.login.value,
          password: this.password.value,
          role: ROLES.CLIENT
        }
      }).subscribe(item => console.log(item), error => console.log(error));
    }

  }

  private createFormsField() {
    this.login = new FormControl('', [Validators.required, EmailValidator.emailValidator]);
    this.password = new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(32)]);
  }
  private createFormGroup() {
    this.userForm = new FormGroup({
      login: this.login,
      password: this.password
    });

  }
}
