import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { NgModule } from '@angular/core';
@NgModule({
  imports: [MatButtonModule, MatInputModule, MatIconModule, MatFormFieldModule, MatCardModule, MatCheckboxModule],
  exports: [MatButtonModule, MatInputModule, MatIconModule, MatFormFieldModule, MatCardModule, MatCheckboxModule],
})
export class MaterialModule {}
