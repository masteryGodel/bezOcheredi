import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './../../material.module';
import { RouterModule } from '@angular/router';
import { AuthPageComponent } from './auth-page.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({

  declarations: [AuthPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{path: '', component: AuthPageComponent}]),
    MaterialModule,
    ReactiveFormsModule,
    TranslateModule
  ]
})
export class AuthPageModule { }
