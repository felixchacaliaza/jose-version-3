
import { QuotationComponent } from './quotation.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AngularMaterialModule } from 'app/shared/angular-material/angular-material.module';
import { NgxSpinnerModule } from 'ngx-spinner';

const routes: Routes = [
    { path:'', component: QuotationComponent}
];

@NgModule({
  declarations: [
    QuotationComponent
],
  imports: [
    CommonModule,
    AngularMaterialModule,
    NgxSpinnerModule,
    RouterModule.forChild(routes)
  ]
})
export class QuotationModule { }
