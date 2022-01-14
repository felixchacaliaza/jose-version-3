import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsProcessComponent } from './details-process.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from 'app/shared/angular-material/angular-material.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CountdownModule } from 'ngx-countdown';

const routes: Routes = [
    { path:'', component: DetailsProcessComponent}
];
@NgModule({
  declarations: [
    DetailsProcessComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    NgxSpinnerModule,
    CountdownModule,
    RouterModule.forChild(routes)
  ]

})
export class DetailsProcessModule { }
