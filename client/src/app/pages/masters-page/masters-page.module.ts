import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MastersPageComponent } from './masters-page.component';



@NgModule({
  declarations: [MastersPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      component: MastersPageComponent
    }])
  ]
})
export class MastersPageModule { }
