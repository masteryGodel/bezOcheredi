import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page.component';



@NgModule({
  declarations: [MainPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      component: MainPageComponent
    }])
  ]
})
export class MainPageModule { }
