import { ApiService } from './../../services/api.service';
import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {UserData} from '../../types';
import { AuthService } from '../../services/auth.service';
import { EmailValidator } from '../../validators/email-correct.validator';
import { Subscription } from 'rxjs';


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
  public hide = true;
  public isRegistered = true;
  private checkboxSubscription$: Subscription;

  constructor(
    public translate: TranslateService,
    private router: Router,
    private authService: AuthService,
    private apiService: ApiService
  ) {}

  public ngOnInit(): void {
    this.createFormsField();
    this.createFormGroup();
    this.onCheckboxChanges();
  }
  public submit(): void {
    if (!this.isRegistered) {
      this.apiService.register(this.login.value, this.password.value)
      .subscribe(
        (result: UserData) => {
          const {id, token} = result;
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

  public onCheckboxChanges(): void {
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
