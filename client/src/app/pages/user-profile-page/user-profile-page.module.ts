import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfilePageComponent } from './user-profile-page.component';



@NgModule({
  declarations: [UserProfilePageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      component: UserProfilePageComponent
    }])
  ]
})
export class UserProfilePageModule { }
