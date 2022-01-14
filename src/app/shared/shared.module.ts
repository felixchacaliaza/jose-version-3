import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxCaptchaModule } from 'ngx-captcha';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgxCaptchaModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgxCaptchaModule
    ]
})
export class SharedModule
{
}
