import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { RegistroService } from 'app/core/services/registro/registro.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pop-up-verificacion',
  templateUrl: './pop-up-verificacion.component.html',
  styleUrls: ['./pop-up-verificacion.component.scss']
})
export class PopUpVerificacionComponent implements OnInit {
indicador: number;
userId: string;
form: FormGroup;
codigo: string;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private registrar: RegistroService, private fb: FormBuilder  ,  private router: Router, private md: MatDialog) {
      console.log(data);
    this.userId = data;

    }

    // eslint-disable-next-line @typescript-eslint/member-ordering
  ngOnInit(): void {
    this.form = this.fb.group({
        code: null
    });
  }

  validar(form: FormGroup): void{
        console.log(form);
        this.registrar.ValidarCodigoVerificacion(this.userId, form.value.code).then((res: any)=>{
        console.log(res);
        console.log(res,'respuesta de api');
        this.indicador= res.Estado;
        if(this.indicador === 1){
            this.router.navigateByUrl('pages/settings');
            this.md.closeAll();
        }
        else if (this.indicador ===0)
        {
            Swal.fire({
                icon: 'info',
                text: 'Codigo de Verificación incorrecto, vuelva a intentarlo.',
                showConfirmButton: true,
            });
        }
    });
  }

}
