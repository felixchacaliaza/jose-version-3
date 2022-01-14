import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DigitEnerotNumberDirective } from './entero.directive';




@NgModule({
  declarations: [DigitEnerotNumberDirective],
  imports: [
    CommonModule
  ],
  exports: [
    DigitEnerotNumberDirective
  ]
})
export class DirectivesModule { }

