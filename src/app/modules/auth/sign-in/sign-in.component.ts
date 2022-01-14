import { ProveedorLogin } from './../../../core/interfaces/registroproveedores/registro';
import { PopUpVerificacionComponent } from './../../../components/pop-up-verificacion/pop-up-verificacion.component';
import { PopUpPreRegistroComponent } from './../../../components/pop-up-pre-registro/pop-up-pre-registro.component';
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Data } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { MatDialog } from '@angular/material/dialog';
import { RegistroService } from 'app/core/services/registro/registro.service';
import Swal from 'sweetalert2';


@Component({
    selector: 'auth-sign-in',
    templateUrl: './sign-in.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class AuthSignInComponent implements OnInit {
    @ViewChild('signInNgForm') signInNgForm: NgForm;

    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: ''
    };
    signInForm: FormGroup;
    showAlert: boolean = false;
    datalogin: ProveedorLogin;
    indicador: number;
    token: any;

    constructor(
        private _FaormBuilder: FormBuilder,
        public _MatDialog: MatDialog,
        private registerService: RegistroService,
        private router: Router
    ) {
    }

    async ngOnInit(): Promise<void> {

        this.signInForm = this._FaormBuilder.group({
            // tipoDocumento: ['01', [Validators.required]],
            cUsuario: [null, [Validators.required, Validators.minLength(11), Validators.maxLength(20)]],
            password: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]]
        });
    }


    public openPopUpPreRegistro() {

        const dialogRef = this._MatDialog.open(PopUpPreRegistroComponent, {
            width: 'auto',
            closeOnNavigation: true,
            disableClose: true,
            data: 'hola'

        });
        dialogRef.afterClosed().subscribe((result) => {
        });

    }

    signIn() {
        if (this.signInForm.valid) {
            this.datalogin = {
                cUsuario: this.signInForm.value.cUsuario,
                cContraseña: this.signInForm.value.password,
                nIndicador: 0
            };
            console.log(this.datalogin);

            this.registerService.ValidarLogin(this.datalogin).then((res: any) => {
                console.log(res, 'respuesta de api');
                this.indicador = res.Estado;
                this.token = res.Token;
                console.log(this.indicador);
                if (this.indicador === 1) {
                    const dialogRef = this._MatDialog.open(PopUpVerificacionComponent, {
                        width: 'auto',
                        closeOnNavigation: true,
                        disableClose: true,
                        data: this.signInForm.value.cUsuario
                    });
                }
                else if (this.indicador === 2) {
                    Swal.fire({
                        icon: 'info',
                        text: 'Usuario y Contraseña invalidos, Ingrese sus datos correctamente',
                        showConfirmButton: true,
                    });
                }
                else if (this.indicador === 0) {
                    sessionStorage.clear();
                    sessionStorage.setItem('usuario', this.signInForm.value.cUsuario);
                    sessionStorage.setItem('token', this.token);
                    this.router.navigate(['/datos']);
                }
            });
        }
    }

}
