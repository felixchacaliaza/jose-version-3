import { AngularMaterialModule } from './../../../shared/angular-material/angular-material.module';
import { NgModule } from '@angular/core';
import { SettingsComponent } from './settings.component';
import { AccountComponent } from './account/account.component';
import { SecurityComponent } from './security/security.component';
import { FuseAlertModule } from '@fuse/components/alert';
import { SharedModule } from 'app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { settingsRoutes } from './settings.routing';




@NgModule({
  declarations: [
    SettingsComponent,
    AccountComponent,
    SecurityComponent
  ],
  imports: [
    RouterModule.forChild(settingsRoutes),
    AngularMaterialModule,
    FuseAlertModule,
    SharedModule
  ]
})
export class SettingsModule { }
