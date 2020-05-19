import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmailValidator } from './../../validators/email-correct.validator';

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

  constructor(public translate: TranslateService) { }

  ngOnInit(): void {
    this.createFormsField();
    this.createFormGroup();
  }
  submit() {
    console.log(this.userForm);
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
