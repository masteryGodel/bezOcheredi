import { ApiService } from './../../services/api.service';
import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { EmailValidator } from '../../validators/email-correct.validator';
import { Subscription } from 'rxjs';


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
  public isRegistered = true;

  constructor(
    private router: Router,
    public translate: TranslateService,
    private authService: AuthService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.createFormsField();
    this.createFormGroup();
    this.onCheckboxChanges();
  }
  submit() {
    if (!this.isRegistered) {
      this.apiService.register(this.login.value, this.password.value)
      .subscribe(
        (result: UserData) => {
          const id = result.id;
          const token = result.token;
          this.authService.saveUserData(id, token);
          this.router.navigate(['/']);
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      this.apiService.login(this.login.value, this.password.value)
        .subscribe(
          (result: UserData) => {
            const id = result.id;
            const token = result.token;
            this.authService.saveUserData(id, token);
            this.router.navigate(['/']);
          },
          (error) => {
            console.log(error);
          }
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
    this.checkbox = new FormControl('', []);
  }
  private createFormGroup() {
    this.userForm = new FormGroup({
      login: this.login,
      password: this.password,
    });
  }

  onCheckboxChanges() {
    this.checkboxSubscription$ = this.checkbox.valueChanges.subscribe(
      (data) => {
        this.isRegistered = !data;
      }
    );
  }

  ngOnDestroy() {
    if (this.checkboxSubscription$) {
      this.checkboxSubscription$.unsubscribe();
    }
  }
}
