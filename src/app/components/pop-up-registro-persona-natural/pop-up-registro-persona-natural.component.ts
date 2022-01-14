import { Data } from '@angular/router';
/* eslint-disable @typescript-eslint/naming-convention */
import { ProveedorLogin } from './../../core/interfaces/registroproveedores/registro';
import { ProveedorGeneral } from 'app/core/interfaces/registroproveedores/registro';
import { environment } from 'environments/environment';
/* eslint-disable prefer-arrow/prefer-arrow-functions */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { CurrencyPipe, DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import Swal from 'sweetalert2';
import { RegistroService } from 'app/core/services/registro/registro.service';
import { MatDialog } from '@angular/material/dialog';
export const MY_FORMATS = {
    parse: {
        dateInput: 'LL',
    },
    display: {
        dateInput: 'DD/MM/YYYY',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY',
    },
};
@Component({
    selector: 'app-pop-up-registro-persona-natural',
    templateUrl: './pop-up-registro-persona-natural.component.html',
    styleUrls: ['./pop-up-registro-persona-natural.component.scss'],
    providers: [
        CurrencyPipe,
        DatePipe,
        {
            provide: DateAdapter,
            useClass: MomentDateAdapter,
            deps: [MAT_DATE_LOCALE]
        },
        { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
    ]
})
export class PopUpRegistroPersonaNaturalComponent implements OnInit {
    bExtranjero= false;
    longitudMinimaNumeroDocumento = 8;
    longitudMaximaNumeroDocumento = 8;
    longitudMinimaNumeroDocumento2 = 8;
    longitudMaximaNumeroDocumento2 = 8;
    longitudRuc = 11;
    longitudCelular = 9;
    @ViewChild(MatPaginator) paginador!: MatPaginator;
    data = [];
    data2 = [];
    datadocument = [];
    isLinear = false;
    firstFormGroup: FormGroup;
    thirdFormGroup: FormGroup;
    fourFormGroup: FormGroup;
    pais = new Array();
    departamentos = new Array();
    provincias = new Array();
    distritos = new Array();
    departamentonacimiento = new Array();
    provincianacimiento = new Array();
    distritonacimiento = new Array();
    zonas = new Array();
    vias = new Array();
    tipozonas = new Array();
    tipodocumentos = new Array();
    magnitudempresarial = new Array();
    tipopersonajuridica = new Array();
    bloque = new Array();
    interior = new Array();
    tipodocumentoadjunto = new Array();
    rubros = new Array();
    actividadeconomica = new Array();
    ocupaciones = new Array();
    selectedFiles = new Array();
    listadocumentos = new Array();
    listaProveedorDocumentos = new Array();
    listDocs = new Array();
    selectedFile: any;
    currentRuc: string = '';
    file: any;
    fileArray: any;
    public arrayBuffer: any;
    nameFile: any;
    bPass: boolean;
    bPass1: boolean;
    todayDate = new Date();
    displayedColumns3: string[] = ['tipodoc', 'descripcion', 'adjuntado', 'ver', 'opciones'];
    timeService: string = null;
    public dataSource = new MatTableDataSource<any>(this.data);
    public dataSource3 = new MatTableDataSource<any>(this.datadocument);
    siteKey = environment.recaptcha.website_key;
    fileName: any;
    dataFinal: ProveedorGeneral;
    constructor(private _formBuilder: FormBuilder, private _adapter: DateAdapter<any>, private registerService: RegistroService, private md: MatDialog) {

        this._adapter.setLocale('es');

    }

    ngOnInit(): void {

        this.firstFormGroup = this._formBuilder.group({
            firstCtrl: ['', Validators.required],
            cTipoDocumento: [1, Validators.required],
            cNroDNI: ['', [Validators.pattern('^[0-9]+'), Validators.required, Validators.maxLength(this.longitudMaximaNumeroDocumento), Validators.minLength(this.longitudMinimaNumeroDocumento)]],
            cRuc: ['10', Validators.required],
            dFechaEmision: [null, Validators.required],
            cApePaterno: ['', Validators.required],
            cApeMaterno: ['', Validators.required],
            cNombres: ['', Validators.required],
            cPaisNacimiento: ['04028'],
            cDepartamentoNacimiento: ['', Validators.required],
            cProvinciaNacimiento: ['', Validators.required],
            cDistritoNacimiento: ['', Validators.required],
            dFechaNacimiento: [null, Validators.required],
            cOcupacion: [''],
            cActividadEconomica: ['', Validators.required],
            cRubro: ['', Validators.required],
            nCelular: [''],
            nTelFijo: [''],
            cCorreo: ['', [Validators.required]],
            cDepartamento: ['', Validators.required],
            cProvincia: ['', Validators.required],
            cDistrito: ['', Validators.required],
            cZona: ['', Validators.required],
            cTipoVia: [''],
            cDescripcionVia: [''],
            cTipoZona: [''],
            cDescripcionZona: [''],
            cManzana: [''],
            cLote: [''],
            cEtapa: [''],
            cNro: [''],
            cTipoInterior: [''],
            cDescripcionInterior: [''],
            cTipoBloque: [''],
            cDescripcionBloque: [''],
            cLugarConstitucion:['04028',Validators.required]

        });

        this.thirdFormGroup = this._formBuilder.group({
            cTipoDoc: ['', [Validators.required]],
            cDescripcion: ['', [Validators.required]],
            archivo: ['', [Validators.required]],
            cAdjunto: [''],
            cPersAdjunto:['',[Validators.required]]

        });
        this.fourFormGroup = this._formBuilder.group({
            recaptcha: ['', [Validators.required]],
            cUsuario: ['', [Validators.required]],
            cContrasenia: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
            cConfirmaContrasenia: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
        });
        this.getUbigeo();
        this.getDepartamento();
        this.getVia();
        this.getTipoZona();
        this.getTipoDocumento();
        this.getMagnitudEmpresarial();
        this.getTipoPersonaJuridica();
        this.getActividadEconomica();
        this.getBloque();
        this.getTipoInterior();
        this.getTipoDocumentoAdjunto();
        this.getRubro();
        this.getOcupacion();
        this.getPaisNacimiento();
    }

    saveRuc(event: any) {
        this.currentRuc = event.value.cRuc;
        if (this.currentRuc.length >= 10) {
            this.fourFormGroup.controls['cUsuario'].setValue(this.currentRuc);
            this.thirdFormGroup.controls['cPersAdjunto'].setValue(this.currentRuc);
        }
        console.log(this.currentRuc, 'ruc actual');
    }

    getUbigeo() {
        this.registerService.listarUbigeo().then((res) => {
            console.log(res, 'respuesta de listar ubigeo');
        });
    }
    getPaisNacimiento() {
        this.registerService.listarPais().then((res) => {
            console.log(res, 'respuesta de listar pais de nacimiento');
            this.pais = res.Data;
        });
    }

    getDepartamento() {
        this.registerService.listarDepartamentos().then((res) => {
            console.log(res, 'respuesta de listar departamentos');
            this.departamentos = res.Data;
            this.departamentonacimiento= res.Data;
        });
    }

    getProvincia(codigo: string) {
        this.registerService.listarProvincias(codigo).then((res) => {
            console.log(res, 'respuesta de listar provincias');
            this.provincias = res.Data;
        });
    }

    getProvinciaNacimiento(codigo: string) {
        this.registerService.listarProvincias(codigo).then((res) => {
            console.log(res, 'respuesta de listar provincias nacimiento');
            this.provincianacimiento = res.Data;
        });
    }
    getDistrito(codigo: string) {
        this.registerService.listarDistritos(codigo).then((res) => {
            console.log(res, 'respuesta de listar distritos');
            this.distritos = res.Data;
        });
    }

    getDistritoNacimiento(codigo: string) {
        this.registerService.listarDistritos(codigo).then((res) => {
            console.log(res, 'respuesta de listar distritos');
            this.distritonacimiento = res.Data;
        });
    }

    getZona(codigo: string) {
        this.registerService.listarzonas(codigo).then((res) => {
            console.log(res, 'respuesta de listar zonas');
            this.zonas = res.Data;
        });
    }
    getVia() {
        this.registerService.listarTipoVia().then((res) => {
            console.log(res, 'respuesta de listar el tipo de vias');
            this.vias = res.Data;
        });
    }
    getTipoZona() {
        this.registerService.listarTipoZona().then((res) => {
            console.log(res, 'respuesta de listar el tipo de zona');
            this.tipozonas = res.Data;
        });
    }
    getTipoDocumento() {
        this.registerService.listarTipoDocumento().then((res) => {
            console.log(res, 'respuesta de listar el tipo de documentos');
            this.tipodocumentos = res.Data;
        });
    }
    getMagnitudEmpresarial() {
        this.registerService.listarMagnitudEmpresarial().then((res) => {
            console.log(res, 'respuesta de listar las magnitudes empresariales');
            this.magnitudempresarial = res.Data;
        });
    }
    getTipoPersonaJuridica() {
        this.registerService.listarTipoPersonaJuridica().then((res) => {
            console.log(res, 'respuesta de listar las los tipos de personas juridicas');
            this.tipopersonajuridica = res.Data;
        });
    }

    getBloque(){
        this.registerService.listarBloque().then((res)=> {
            console.log(res, 'respuesta de listar bloques');
            this.bloque = res.Data;
        });
    }
    getTipoInterior(){
        this.registerService.listarInterior().then((res)=> {
            console.log(res, 'respuesta de listar interiores');
            this.interior = res.Data;
        });
    }
    getTipoDocumentoAdjunto(){
        this.registerService.listarTipoDocumentoAdjunto().then((res)=> {
            console.log(res, 'respuesta de listar tipos de documentos adjuntos');
            this.tipodocumentoadjunto = res.Data;
        });
    }
    getRubro(){
        this.registerService.listarRubros().then((res)=> {
            console.log(res, 'respuesta de listar rubros');
            this.rubros = res.Data;
        });
    }

    getActividadEconomica() {
        this.registerService.listarActividadEconomica().then((res) => {
            console.log(res, 'respuesta de listar actividades economicas');
            this.actividadeconomica = res.Data;
        });
    }
    getOcupacion() {
        this.registerService.listarOcupaciones().then((res) => {
            console.log(res, 'respuesta de listar ocupaciones');
            this.ocupaciones = res.Data;
        });
    }

    listarProvincias(cUbigeo: string) {
        console.log(cUbigeo, 'codigo');
        const data = cUbigeo.substring(1, 3);
        console.log(data, 'substring');
        this.getProvincia(data);
        this.firstFormGroup.get('cProvincia').setValue('');
        this.firstFormGroup.get('cDistrito').setValue('');
        this.firstFormGroup.get('cZona').setValue('');

    }

    listarProvinciasNacimiento(cUbigeo: string) {
        console.log(cUbigeo, 'codigo');
        const data = cUbigeo.substring(1, 3);
        console.log(data, 'substring');
        this.getProvinciaNacimiento(data);
        this.firstFormGroup.get('cProvinciaNacimiento').setValue('');
        this.firstFormGroup.get('cDistritoNacimiento').setValue('');

    }

    listarDistritos(cUbigeo: string) {
        console.log(cUbigeo, 'codigo');
        const data = cUbigeo.substring(1, 5);
        console.log(data, 'substring');
        this.getDistrito(data);
        this.firstFormGroup.get('cDistrito').setValue('');
        this.firstFormGroup.get('cZona').setValue('');
    }

    listarDistritosNacimiento(cUbigeo: string) {
        console.log(cUbigeo, 'codigo');
        const data = cUbigeo.substring(1, 5);
        console.log(data, 'substring');
        this.getDistritoNacimiento(data);
        this.firstFormGroup.get('cDistritoNacimiento').setValue('');
    }

    listarZonas(cUbigeo: string) {
        console.log(cUbigeo, 'codigo');
        const data = cUbigeo.substring(1, 7);
        console.log(data, 'substring');
        this.getZona(data);
        this.firstFormGroup.get('cZona').setValue('');
    }
    setearExtrajero(){
        this.bExtranjero = !this.bExtranjero;
        if(!this.bExtranjero){
            this.longitudRuc = 11;
            this.longitudMinimaNumeroDocumento = 8;
            this.longitudMaximaNumeroDocumento = 8;
            this.firstFormGroup.get('cRuc').setValue('10');
            this.firstFormGroup.get('cTipoDocumento').setValue(1);
            this.firstFormGroup.get('cNroDNI').reset();
            this.firstFormGroup.get('cDepartamentoNacimiento').reset();
            this.firstFormGroup.get('cDepartamentoNacimiento').removeValidators(Validators.required);
            this.firstFormGroup.get('cProvinciaNacimiento').reset();
            this.firstFormGroup.get('cProvinciaNacimiento').removeValidators(Validators.required);
            this.firstFormGroup.get('cDistritoNacimiento').reset();
            this.firstFormGroup.get('cDistritoNacimiento').removeValidators(Validators.required);
            this.firstFormGroup.get('cDepartamento').reset();
            this.firstFormGroup.get('cDepartamento').removeValidators(Validators.required);
            this.firstFormGroup.get('cProvincia').reset();
            this.firstFormGroup.get('cProvincia').removeValidators(Validators.required);
            this.firstFormGroup.get('cDistrito').reset();
            this.firstFormGroup.get('cDistrito').removeValidators(Validators.required);
            this.firstFormGroup.get('cZona').reset();
            this.firstFormGroup.get('cZona').removeValidators(Validators.required);
            this.firstFormGroup.get('cPaisNacimiento').setValue('04028');
            this.firstFormGroup.get('cLugarConstitucion').setValue('04028');
        }else{
            this.longitudRuc = 20;
            this.firstFormGroup.get('cRuc').setValue('');
            this.firstFormGroup.get('cNroDNI').reset();
            this.firstFormGroup.get('cDepartamentoNacimiento').reset();
            this.firstFormGroup.get('cDepartamentoNacimiento').setValidators(Validators.required);
            this.firstFormGroup.get('cProvinciaNacimiento').reset();
            this.firstFormGroup.get('cProvinciaNacimiento').setValidators(Validators.required);
            this.firstFormGroup.get('cDistritoNacimiento').reset();
            this.firstFormGroup.get('cDistritoNacimiento').setValidators(Validators.required);
            this.firstFormGroup.get('cDepartamento').reset();
            this.firstFormGroup.get('cDepartamento').setValidators(Validators.required);
            this.firstFormGroup.get('cProvincia').reset();
            this.firstFormGroup.get('cProvincia').setValidators(Validators.required);
            this.firstFormGroup.get('cDistrito').reset();
            this.firstFormGroup.get('cDistrito').setValidators(Validators.required);
            this.firstFormGroup.get('cZona').reset();
            this.firstFormGroup.get('cZona').setValidators(Validators.required);
            this.firstFormGroup.get('cPaisNacimiento').setValue('04028');
            this.firstFormGroup.get('cLugarConstitucion').setValue('04028');

        }

    }

    seleccionarTipoDocumento(f) {
        this.firstFormGroup.get('cNroDNI').setValue('');
        this.firstFormGroup.controls['cNroDNI'].clearValidators();
        if(f === 1){
            this.longitudMinimaNumeroDocumento = 8;
            this.longitudMaximaNumeroDocumento = 8;
            this.firstFormGroup.controls['cNroDNI'].setValidators([Validators.required, Validators.minLength(this.longitudMinimaNumeroDocumento), Validators.maxLength(this.longitudMaximaNumeroDocumento)]);
            this.firstFormGroup.controls['cNroDNI'].updateValueAndValidity();
        }else if(f === 4 || f ===11 ) {
            this.longitudMinimaNumeroDocumento = 12;
            this.longitudMaximaNumeroDocumento = 12;
            this.firstFormGroup.controls['cNroDNI'].setValidators([Validators.required, Validators.minLength(this.longitudMinimaNumeroDocumento), Validators.maxLength(this.longitudMaximaNumeroDocumento)]);
            this.firstFormGroup.controls['cNroDNI'].updateValueAndValidity();
        }

    }

    resolveTipoDocumento(value: number): string {
        let result = '';
        this.tipodocumentos.forEach(function(element) {
            if (value === element.CodigoValor) {
                result = element.Descripcion;
            }
        });
        return result;
    }

    agregardoc(form: FormGroup) {
        console.log(form, 'entrando');
        this.upLoad(form);
    }


    public upLoad(form: FormGroup) {
        console.log('upload', form);
        new Promise((resolve, reject) => {
          setTimeout(() => {
            console.log('cargando');
            resolve(true);
          }, 1000);
        }).then(() => {

          const _FileReader = new FileReader();
          _FileReader.onloadstart = () => {
          };

          _FileReader.onprogress = () => {

          };

          _FileReader.onload = () => {

            try {
              this.arrayBuffer = _FileReader.result;
              this.fileArray = new Uint8Array(this.arrayBuffer);
              console.log(this.fileArray);
              this.thirdFormGroup.controls['cAdjunto'].setValue(this.fileArray);
              console.log(this.thirdFormGroup.value);
              this.listadocumentos.push(form.value);
              this.dataSource3 = new MatTableDataSource<any>(this.listadocumentos);
              console.log(this.listadocumentos);

            }
            catch (ex) {
              Swal.fire({
                title: '¡Error en el formato del archivo!',
                text: `el archivo contiene errores de estructura, porfavor revise el formato. ${ex}`,
                icon: 'error'
              }).then((result) => {

              });
            }

          };


          _FileReader.onloadend = () => {
            console.log('termino de cargar');
          };

          _FileReader.readAsArrayBuffer(this.file);
        });



      }

    deletedocument(i: number) {
        Swal.fire({
            title: '¡Cuidado!',
            text: '¿Esta seguro que desea  eliminar este registro?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'blue',
            cancelButtonColor: 'red',
            confirmButtonText: 'Si, eliminar',
            cancelButtonText: 'No, cancelar',
        }).then((res) => {
            if (res.isConfirmed) {
                this.listadocumentos.splice(i, 1);
                this.dataSource3 = new MatTableDataSource<any>(this.listadocumentos);
                Swal.fire({
                    title: '¡Hecho!',
                    text: 'El registro fue eliminado con éxito',
                    icon: 'success',
                    showCancelButton: false,
                    showConfirmButton: false,
                    timer: 1500
                });
            } else {
                return;
            }
        });
    }

    async selectFiles(event: any) {
        if (
            event.target.files[0].type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
            event.target.files[0].type === 'application/pdf'
        ) {
            if (event.target.files[0] != null) {
                this.selectedFiles.push(event.target.files[0].name);
                this.fileName = event.target.files[0].name;
                this.file = event.target.files[0];
                this.nameFile = this.file.name;
            };

            // alert('archivo correcto');
            /*        this.selectedFiles.push(event.target.files[0].name);
                      this.fileName = event.target.files[0].name;
                      const reader = new FileReader();
                      reader.readAsDataURL(event.target.files[0]);
                      const self = this;
                      reader.onload = function() {
                         self.file = reader.result;
                      };
                      reader.onerror = function(error) {
                        console.log('Error: ', error);
                      }; */

        } else {
            Swal.fire({
                icon: 'info',
                title: 'formato de archivo incorrecto, solo se puede aceptar documentos de tipo word y pdf',
                showConfirmButton: false,
                timer: 1000
            });
            //this.nuevoDocumento.archivo = '';
            this.selectedFile = null;
        }
    }

    descargar(file) {
        const blob = new Blob([file], { type: 'application/pdf'});
            const url = window.URL.createObjectURL(blob);
            window.open(url);
    }
    getDiffDate(datetime: any) {
        console.log(datetime);
        const date = new Date(`${datetime._i.year}/${datetime._i.month + 1}/${datetime._i.date}`);
        const date2 = new Date();
        const dif = Math.abs(date2.getTime() - date.getTime()) / 1000;
        const day = Math.floor(dif / 86400);
        let month = Math.floor(day / 30);
        const day2 = day % 30;

        if (month < 1) {
            this.timeService = `${day2} días`;
        }
        else
            if (month >= 1 && month <= 12) {
                this.timeService = `${month} meses y ${day2} días`;
            } else {
                const year = Math.floor(month / 12);
                month = month % 12;
                this.timeService = `${year} años, ${month} meses y ${day2} días`;
            }
        console.log(day2, 'dias');
        console.log(month, 'meses');
        console.log(dif, 'diferen');
    }

    validateStr(str: string) {
        if (str.length >= 8 && str.length <= 20) {
            let regex = new RegExp('[a-zA-Z]+');
            const regex1 = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
            if (regex1.test(str) === true) {
                return null;
            } else {
                if (regex.test(str) === true) {
                    regex = new RegExp('[0-9]+');
                    if (regex.test(str) === true) {
                        return true;
                    } else { return false; };
                } else { return false; };
            }
        } else {
            return false;
        }

    }

    validatePassword(form: FormGroup) {
        console.log(form.value);
        if (this.validateStr(form.value.cContrasenia)) {
            this.bPass = true;
            console.log('contraseña correcta');
        } else {
            this.bPass = false;
            console.log('contraseña incorrecta');
        }
    }
    selectRubro(rubro){
        const cRubro = JSON.stringify(rubro.toString());
        console.log(cRubro);
        this.firstFormGroup.controls['cRubro'].setValue(cRubro);
        console.log(this.firstFormGroup.value.cRubro,'form');
    }

    validatePassword1(form: FormGroup) {
        console.log(form.value);
        console.log(form.value.cConfirmaContrasenia.length);
        if (this.validateStr(form.value.cConfirmaContrasenia)) {
            this.bPass1 = true;
            console.log('contraseña correcta');
        } else {
            this.bPass1 = false;
            console.log('contraseña inccorrecta');
        }
    }

    async guardarFormulario() {
        this.dataFinal = {

            nTipoProveedor: 1,
            cNroRuc: this.firstFormGroup.value.cRuc,
            dFechaInicioAct: this.firstFormGroup.value.dFechaEmision,
            nCIIU: this.firstFormGroup.value.cActividadEconomica,
            cRubro: this.firstFormGroup.value.cRubro,
            cTelefonoMovil: this.firstFormGroup.value.nCelular,
            cTelefonoFijo: this.firstFormGroup.value.cTelFijo,

            //Proveedor Juridico

            cRazonSocial: '',
            cNombreComercial: '',
            nMagnitudEmp: 0,
            nTipoPersonaJuridica: 0,

            //Proveedor Natural
            nTipoDoc: this.firstFormGroup.value.cTipoDocumento,
            cNroDoc: this.firstFormGroup.value.cNroDNI,
            nOcupacion: this.firstFormGroup.value.cOcupacion,
            cApePaterno: this.firstFormGroup.value.cApePaterno,
            cApeMaterno: this.firstFormGroup.value.cApeMaterno,
            cNombres: this.firstFormGroup.value.cNombres,
            nCodPaisNac: this.firstFormGroup.value.cPaisNacimiento,
            nCodDepNac: this.firstFormGroup.value.cDepartamentoNacimiento,
            nCodDistNac: this.firstFormGroup.value.cDistritoNacimiento,
            nCodProvNac: this.firstFormGroup.value.cProvinciaNacimiento,
            cCorreo: this.firstFormGroup.value.cCorreo,
            cLugarConstitucion: this.firstFormGroup.value.cLugarConstitucion,
            dFechaNac: this.firstFormGroup.value.dFechaNacimiento,

            //Datos de Dirección del Proveedor
            nCodDepartamento: this.firstFormGroup.value.cDepartamento,
            nCodProvincia: this.firstFormGroup.value.cProvincia,
            nCodDistrito: this.firstFormGroup.value.cDistrito,
            nCodZona: this.firstFormGroup.value.cZona,
            nCodTipoVia: this.firstFormGroup.value.cTipoVia,
            cDescVia: this.firstFormGroup.value.cDescripcionVia,
            nCodTipoZona: this.firstFormGroup.value.cTipoZona,
            cDescZona: this.firstFormGroup.value.cDescripcionZona,
            cMzna: this.firstFormGroup.value.cManzana,
            cLote: this.firstFormGroup.value.cLote,
            cEtapa: this.firstFormGroup.value.cEtapa,
            cNro: this.firstFormGroup.value.cNro,
            nTipoInterior: this.firstFormGroup.value.cTipoInterior,
            cDescripcionInterior:this.firstFormGroup.value.cDescripcionInterior,
            nTipoBloque:this.firstFormGroup.value.cTipoBloque,
            cDescripcionBloque:this.firstFormGroup.value.cDescripcionBloque,
            cReferencia: '',
            Contactos: [],
            PersonasVinculadas: [],
            Documentos: [],
            Login: {
                cUsuario: this.fourFormGroup.value.cUsuario,
                cContraseña: this.fourFormGroup.value.cContrasenia,
                nIndicador: 0,
            }

        };
        console.log(this.dataFinal,'data enviada');
        await this.registerService.RegistrarProveedores(this.dataFinal).then((res: any)=>{
            console.log(res,'respuesta de api');
            if(res.IsCorrect === true)
            {
                Swal.fire({
                    title: '¡Hecho!',
                    text: 'Se registro correctamente',
                    icon: 'success',
                    showCancelButton: false,
                    showConfirmButton: false,
                    timer: 3500
                });
                this.md.closeAll();
            }
        });

        /* if (this.firstFormGroup.valid && this.thirdFormGroup.valid && this.fourFormGroup.valid) {
            if (this.fourFormGroup.value.cContrasenia === this.fourFormGroup.value.cConfirmaContrasenia) {

                /*   this.dataSource3.data.forEach(function(element) {
                      this.listaProveedorDocumentos.push(
                       /*    nTipoDocumento: element.;
                          cRutaDocumento: ;
                          cDocumento: string;
                          bContenido: [];
                          cExtension: string;
                          cNombreDoc: string;
                          bEstado: string;
                          cDescripcionDoc: string;
                          cPersAdjunto: string;
                          cTipoDoc: string; */
                      /*}); */

         /*    } else {
                Swal.fire({
                    title: 'Ocurrio un problema!',
                    text: 'La contraseña no coinciden.',
                    icon: 'info',
                    showCancelButton: false,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
/*         else {
            Swal.fire({
                title: 'Ocurrio un problema!',
                text: 'Verifica que todo los campos ingresados sean los correctos.',
                icon: 'info',
                showCancelButton: false,
                showConfirmButton: false,
                timer: 1500
            });
        } */
    }

}
