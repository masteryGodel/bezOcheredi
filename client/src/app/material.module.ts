import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';
@NgModule({
  imports: [MatButtonModule, MatInputModule, MatIconModule, MatFormFieldModule],
  exports: [MatButtonModule, MatInputModule, MatIconModule, MatFormFieldModule],
})
export class MaterialModule {}
