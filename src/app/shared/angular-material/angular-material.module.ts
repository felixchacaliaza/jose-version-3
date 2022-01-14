//#region Angular
import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
//#endregion

//#region Angular Material
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatTabsModule} from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatStepperModule} from '@angular/material/stepper';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatBadgeModule} from '@angular/material/badge';
import {MatListModule} from '@angular/material/list';
import {MatChipsModule} from '@angular/material/chips';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatRippleModule} from '@angular/material/core';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatTreeModule} from '@angular/material/tree';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDividerModule} from '@angular/material/divider';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [],
  imports: [

  ],
  exports:
  [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatGridListModule,
    MatFormFieldModule,
    MatDialogModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatStepperModule,
    MatTooltipModule,
    MatBadgeModule,
    MatListModule,
    MatChipsModule,
    MatRippleModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatSlideToggleModule,
    MatTreeModule,
    MatCheckboxModule,
    MatDividerModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatButtonToggleModule,
    MatMenuModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class AngularMaterialModule { }
