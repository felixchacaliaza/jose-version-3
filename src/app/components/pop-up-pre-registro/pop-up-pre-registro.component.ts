import { PopUpRegistroPersonaNaturalComponent } from './../pop-up-registro-persona-natural/pop-up-registro-persona-natural.component';
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PopUpRegistroPersonaJuridicaComponent } from '../pop-up-registro-persona-juridica/pop-up-registro-persona-juridica.component';

@Component({
  selector: 'app-pop-up-pre-registro',
  templateUrl: './pop-up-pre-registro.component.html',
  styleUrls: ['./pop-up-pre-registro.component.scss']
})
export class PopUpPreRegistroComponent implements OnInit {
    public formPreRegistro: FormGroup;
  constructor(
    public _MatDialogRef: MatDialogRef<PopUpPreRegistroComponent>,
    private _FormBuilder: FormBuilder,
    public _MatDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {

     }

  ngOnInit(): void {
    this.formPreRegistro = this._FormBuilder.group({
        cTipoRegistro: [null, [Validators.required]],

    });

  }

  public cerrarModal() {
    this._MatDialogRef.close(false);
  }

  public validarPreregistro(x: any) {
    if (!this.formPreRegistro.invalid ) {
    console.log(this.formPreRegistro.value.cTipoRegistro);
    if (this.formPreRegistro.value.cTipoRegistro === '1') {
        this._MatDialogRef.close(false);

        const dialogRef = this._MatDialog.open(PopUpRegistroPersonaNaturalComponent, {
            width: 'auto',
            maxHeight: '90vh',
            closeOnNavigation: true,
            disableClose:true

        });
        dialogRef.afterClosed().subscribe((result) => {
        });
    }else {
        if (this.formPreRegistro.value.cTipoRegistro === '2') {
            this._MatDialogRef.close(false);

            const dialogRef = this._MatDialog.open(PopUpRegistroPersonaJuridicaComponent, {
                width: 'auto',
                maxHeight: '90vh',
                closeOnNavigation: true,
                disableClose:true
            });
            dialogRef.afterClosed().subscribe((result) => {
            });
        }
    }
    }
  }

}
