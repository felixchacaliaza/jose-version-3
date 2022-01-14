import { SharedModule } from 'app/shared/shared.module';
import { AngularMaterialModule } from './../shared/angular-material/angular-material.module';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopUpPreRegistroComponent } from './pop-up-pre-registro/pop-up-pre-registro.component';
import { PopUpRegistroPersonaNaturalComponent } from './pop-up-registro-persona-natural/pop-up-registro-persona-natural.component';
import { PopUpRegistroPersonaJuridicaComponent } from './pop-up-registro-persona-juridica/pop-up-registro-persona-juridica.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DirectivesModule } from 'app/core/directives/directives.module';
import { PopUpVerificacionComponent } from './pop-up-verificacion/pop-up-verificacion.component';


@NgModule({
  declarations: [
    PopUpPreRegistroComponent,
    PopUpRegistroPersonaNaturalComponent,
    PopUpRegistroPersonaJuridicaComponent,
    PopUpVerificacionComponent
  ],
  imports: [
    SharedModule,
    AngularMaterialModule,
    DirectivesModule
  ],
  exports: [
    PopUpPreRegistroComponent,
    PopUpRegistroPersonaNaturalComponent,
    PopUpRegistroPersonaJuridicaComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ComponentsModule { }
