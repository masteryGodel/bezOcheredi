import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompaniesPageComponent } from './companies-page.component';



@NgModule({
  declarations: [CompaniesPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      component: CompaniesPageComponent
    }])
  ]
})
export class CompaniesPageModule { }
