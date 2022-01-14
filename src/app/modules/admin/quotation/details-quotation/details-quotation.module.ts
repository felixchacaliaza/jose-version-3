import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsQuotationComponent } from './details-quotation.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from 'app/shared/angular-material/angular-material.module';
import { NgxSpinnerModule } from 'ngx-spinner';


const routes: Routes = [
    { path:'', component: DetailsQuotationComponent}
];
@NgModule({
  declarations: [
    DetailsQuotationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    RouterModule.forChild(routes)
  ]
})
export class DetailsQuotationModule { }
