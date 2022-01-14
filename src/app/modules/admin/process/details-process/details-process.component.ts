/* eslint-disable @typescript-eslint/no-shadow */
import { ProcesoSeleccionSubasta } from './../../../../core/interfaces/registroproveedores/subasta';
import { OnDestroy } from '@angular/core';
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @angular-eslint/no-host-metadata-property */
import { Data } from '@angular/router';
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ProveedorProcesoSeleccion } from 'app/core/interfaces/registroproveedores/proceso';
import { ProcessService } from 'app/core/services/internal/process/process.service';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { Subscription, interval, Observable } from 'rxjs';
import { DatePipe } from '@angular/common';
@Component({
    selector: 'app-details-process',
    templateUrl: './details-process.component.html',
    styleUrls: ['./details-process.component.scss'],
    providers: [DatePipe]
})
export class DetailsProcessComponent implements OnInit, OnDestroy {

    $Subasta: any;
    firstFormGroup: FormGroup;
    nombre: string;
    procnombre: string;
    procrubro: string;
    nnivel: string;
    procetapa: any;
    selectedFiles = new Array();
    tipodoc = new Array();
    tipomoneda = new Array();
    tiposubasta = new Array();
    file: any;
    fileName: any;
    fileArray: any;
    nameFile: any;
    selectedFile: any;
    bBuenaPro: boolean;

    nCodEstado: number;
    dataFinal: ProveedorProcesoSeleccion;
    dataSubasta: ProcesoSeleccionSubasta;
    public arrayBuffer: any;
    dataCalendario = [];
    datadocument = [];
    dataconsultas = [];
    dataconsultasgenerales = [];
    datadocumentProveedorProcesoSeleccion = [];

    listadocumentos = new Array();


    public dataSource3 = new MatTableDataSource<any>(this.datadocument);
    public dataSourceCalendario = new MatTableDataSource<any>(this.dataCalendario);
    public dataSourceConsultas = new MatTableDataSource<any>(this.dataconsultas);
    public dataSourceConsultasGenerales = new MatTableDataSource<any>(this.dataconsultasgenerales);

    public dataSource4 = new MatTableDataSource<any>(this.datadocumentProveedorProcesoSeleccion);
    public dataSource5 = new MatTableDataSource<any>(this.datadocumentProveedorProcesoSeleccion);
    public dataSource6 = new MatTableDataSource<any>(this.datadocumentProveedorProcesoSeleccion);

    public dataSourceBasesIntegradas = new MatTableDataSource<any>(this.datadocumentProveedorProcesoSeleccion);
    public displayedColumns3: string[] = ['tipodoc', 'descripcion', 'ver'];
    public displayedColumnsCalendario: string[] = ['id', 'nombreetapa', 'detalle', 'fechainicio', 'fechafin'];
    public displayedColumnsDocumentosAdjuntos: string[] = ['tipodoc', 'descripcion', 'ver', 'opciones'];
    public displayedColumnsConsultas: string[] = ['nro', 'tema', 'pregunta', 'opciones'];

    private id = 0;
    public bOcultar = true;

    private subscription: Subscription;

    public dateNow = new Date();
    public dDay = new Date('Jan 12 2022 20:00:00');
    milliSecondsInASecond = 1000;
    hoursInADay = 24;
    minutesInAnHour = 60;
    SecondsInAMinute  = 60;

    public timeDifference;
    public secondsToDday;
    public minutesToDday;
    public hoursToDday;
    public daysToDday;

    public fechaActual = 0;
    public nTiempoSubasta = 0;

    public tituloSubasta = '';

    public disableButton10 = false;
    constructor(
        private http: HttpClient,
        private route: ActivatedRoute,
        private procService: ProcessService,
        private _formBuilder: FormBuilder,
        private md: MatDialog,
        private _NgxSpinnerService: NgxSpinnerService,
        private _DatePipe: DatePipe

        ) {
            this.route.params.subscribe((res: any) => {
            this.id = res.id;
            });   this.obtenerMontoPostura();
    }

    async ngOnInit(): Promise<void> {
        this._NgxSpinnerService.show();
         this.bOcultar = true;
        this.firstFormGroup = this._formBuilder.group({
            nMontoCotizacion: [0],
            nCodMoneda: [1],
            cRespuesta: [],
            cObservacion: [],
            cApelacion: [],
            archivo: [],
            nTipoDocumento: [''],
            cDescripcionDoc: [''],
            cDescEstado: [],
            bContenido: [],
            cNro: [],
            cTema: [],
            cPregunta: [],
            cRespuestaConsulta: [],
            listadocumentos: [],
            nCodTipoSubasta: [],
            cDescMoneda: [],
            nValorTopeInicio: [],
            dFechaSubasta: [],
            dFechaCapacitacion: [],
            nValorInicial: [],
            nRangoIncremento: [],
            nTiempoEspera: [],
            nTiempoSubasta:[],
            nPostura:[]
        });


        this.nombre = sessionStorage.getItem('detailName');
        this.procnombre = sessionStorage.getItem('detailNameProcess');
        this.procrubro = sessionStorage.getItem('detailNameRubro');
        this.nnivel = sessionStorage.getItem('detailNameNivel');
        console.log(this.nombre);
        console.log(this.procnombre);
        console.log(this.procrubro);
        console.log(this.nnivel);
       await this.getListarTipoDocumentos();
       await this.getListarTipoMoneda();
       await this.getInfo();
       await this.getDocEtapa2();
       await this.getDocEtapa3();
       await this.getDocEtapa5();
       await this.getCargaProcesoSeleccionProveedor();
       await this.getListarTipoSubasta();
       await this.getCargaConfigSubasta();



        this._NgxSpinnerService.hide();
        this.bOcultar = false;

    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    obtenerMontoPostura() {
        this.procService.getSubasta((this.id).toString()).subscribe((data) => {
            this.$Subasta = data;
            console.log(data);
            this.firstFormGroup.controls['nPostura'].setValue(this.$Subasta.montoPostura);
        });
    }
    getInfo(): void {
        this.procService.listarEspecificacionesDocumentos(this.id).then((res: any) => {
            console.log(res);
            this.procetapa = res.Data.CalendarioProcesoSeleccion;
            this.dataSource3 = new MatTableDataSource(res.Data.DocumentosProcesoSeleccion);
            this.dataSourceCalendario = new MatTableDataSource(res.Data.CalendarioProcesoSeleccion);
            console.log(this.procetapa.length);
        });
    }
    async getDocEtapa2(): Promise<void> {
        await this.procService.listarEtapasDocumentos(this.id, 2).then((res: any) => {
            this.datadocumentProveedorProcesoSeleccion = res.Data;
        });
        this.dataSource4 = new MatTableDataSource(this.datadocumentProveedorProcesoSeleccion);
    }
    getDocEtapa3(): void {
        if (this.nnivel === '1') {
            this.procService.listarEtapasDocumentos(this.id, 3).then((res: any) => {
                this.dataSource5 = new MatTableDataSource(res.Data);
            });
        }
        if (this.nnivel === '2') {
            this.procService.listarEtapasDocumentos(this.id, 6).then((res: any) => {
                this.dataSource5 = new MatTableDataSource(res.Data);
            });

        }
    }
    getDocEtapa5(): void {
        this.procService.listarEtapasDocumentos(this.id, 5).then((res: any) => {
            console.log(res.Data);
            this.dataSourceBasesIntegradas = new MatTableDataSource(res.Data);
        });
    }
    getListarTipoDocumentos(): void {
        this.procService.listarTiposDocumentos().then((res) => {
            console.log(res, 'respuesta de listar los tipo doc');
            this.tipodoc = res.Data;
        });

    }

    getListarTipoMoneda(): void {
        this.procService.listarMoneda().then((res) => {
            console.log(res, 'respuesta de listar monedas');
            this.tipomoneda = res.Data;
        });

    }

    getListarTipoSubasta(): void {
        this.procService.listarTipoSubasta().then((res) => {
            console.log(res, 'respuesta de listar los tipo subasta');
            this.tiposubasta = res.Data;
        });

    }
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    descargar(file) {
        const blob = new Blob([file], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        window.open(url);
    }
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    async selectFiles(event: any) {
        console.log(event.target.files[0]);
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
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    agregardoc(form: FormGroup) {
        console.log(form, 'entrando');
        this.upLoad(form);
    }
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    public upLoad(form: FormGroup) {
        console.log('upload', form);
        new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log('cargando');
                resolve(true);
            }, 1000);
        }).then(() => {

            // eslint-disable-next-line @typescript-eslint/naming-convention
            const _FileReader = new FileReader();
            // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
            _FileReader.onloadstart = () => {
            };

            // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
            _FileReader.onprogress = () => {

            };

            // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
            _FileReader.onload = () => {

                try {
                    this.arrayBuffer = _FileReader.result;
                    this.fileArray = new Uint8Array(this.arrayBuffer);
                    console.log(this.fileArray);
                    this.firstFormGroup.controls['bContenido'].setValue(this.fileArray);
                    console.log(this.firstFormGroup.value);
                    this.datadocumentProveedorProcesoSeleccion.push(form.value);
                    console.log(form.value);
                    this.dataSource4 = new MatTableDataSource<any>(this.datadocumentProveedorProcesoSeleccion);
                    console.log(this.datadocumentProveedorProcesoSeleccion);

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


            // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
            _FileReader.onloadend = () => {
                console.log('termino de cargar');
            };

            _FileReader.readAsArrayBuffer(this.file);
        });



    }
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
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
                this.datadocumentProveedorProcesoSeleccion.splice(i, 1);
                this.dataSource4 = new MatTableDataSource<any>(this.datadocumentProveedorProcesoSeleccion);
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

    guardarRegistroProveedorProcesoSeleccion(codEtapa: number): void {
        this.dataFinal = {

            nProcesoSeleccionId: this.id,
            cNroRuc: sessionStorage.getItem('usuario'),
            nCodEtapa: codEtapa,
            nCodMoneda: this.firstFormGroup.value.nCodMoneda,
            nMontoPropuesto: this.firstFormGroup.value.nMontoCotizacion,
            cRespuesta: this.firstFormGroup.value.cRespuesta,
            cObservacion: this.firstFormGroup.value.cObservacion,
            cApelacion: this.firstFormGroup.value.cApelacion,
            documentos: this.datadocumentProveedorProcesoSeleccion,
            consultas: this.dataconsultas

        };
        console.log(this.dataFinal);

        this.procService.registrarProcesoSeleccionProveedor(this.dataFinal).then((res: any) => {
            console.log(res, 'respuesta de api');
            if (res.IsCorrect === true) {
                Swal.fire({
                    title: '¡Hecho!',
                    text: res.Message,
                    icon: 'success',
                    showCancelButton: false,
                    showConfirmButton: false,
                    timer: 3500
                });
                this.md.closeAll();
            }
            if (res.IsCorrect === false) {
                Swal.fire({
                    title: '¡Ha ocurrido un problema!',
                    text: res.Message,
                    icon: 'error',
                    showCancelButton: false,
                    showConfirmButton: false,
                    timer: 3500
                });
                this.md.closeAll();
            }
        });
    }

    guardarPosturaProveedorProcesoSeleccion(): void {
        this.dataSubasta = {

            nProcesoSeleccionId: this.id,
            cNroRuc: sessionStorage.getItem('usuario'),
            nCodTipoSubasta: this.firstFormGroup.value.nCodTipoSubasta,
            nPosturaSubasta: this.firstFormGroup.value.nPostura

        };
        console.log(this.dataSubasta);

        this.procService.posturaProcesoSeleccionProveedor(this.dataSubasta).then((res: any) => {
            console.log(res, 'respuesta de api');
            if (res.IsCorrect === true) {

                const data = {
                    estado: true,
                    estadoSubasta: 2,
                    montoPostura: this.firstFormGroup.value.nPostura
                };
                this.procService.actualizarSubasta(this.id.toString(),data).then(() => {

                });
                Swal.fire({
                    title: '¡Hecho!',
                    text: res.Message,
                    icon: 'success',
                    showCancelButton: false,
                    showConfirmButton: false,
                    timer: 3500
                });
                this.md.closeAll();
            }
            if (res.IsCorrect === false) {
                Swal.fire({
                    title: '¡Ha ocurrido un problema!',
                    text: res.Message,
                    icon: 'error',
                    showCancelButton: false,
                    showConfirmButton: false,
                    timer: 3500
                });
                this.md.closeAll();
            }
        });
    }


    async getCargaProcesoSeleccionProveedor(): Promise<void> {
        await this.procService.listarProcesoSeleccionProveedor(this.id, sessionStorage.getItem('usuario')).then((res: any) => {
            console.log(res);
            this.bBuenaPro = res.Data.bBuenaPro;
            this.nCodEstado = res.Data.nEstado;
            this.dataconsultas = res.Data.consultas;
            this.dataSourceConsultasGenerales = new MatTableDataSource(res.Data.consultasgenerales);
            this.firstFormGroup.controls['nMontoCotizacion'].setValue(res.Data.nMontoPropuesto);
            this.firstFormGroup.controls['nCodMoneda'].setValue(res.Data.nCodMoneda);
            this.firstFormGroup.controls['cApelacion'].setValue(res.Data.cApelacion);
            this.firstFormGroup.controls['cObservacion'].setValue(res.Data.cObservacion);
            this.firstFormGroup.controls['cDescEstado'].setValue(res.Data.cDescEstado);

        });
        this.dataSourceConsultas = new MatTableDataSource(this.dataconsultas);
    }

    async getCargaConfigSubasta(): Promise<void> {
        await this.procService.listarConfigSubasta(this.id).then((res: any) => {

            res.Data.dFechaSubasta = '2022-01-13T00:00:00';
            res.Data.dHoraSubasta = '1900-01-01T20:55:00';
            console.log(res);
            if(res.Data.nCodTipoSubasta === 1){ // SUBASTA SOBRE CERRADO

                this.fechaActual = new Date(res.Data.dFechaHoraActual).getTime();

                const fecha = new Date(res.Data.dFechaSubasta).getTime() / 1000;

                const hora = new Date(res.Data.dHoraSubasta).getHours() * 3600;

                const minuto = new Date(res.Data.dHoraSubasta).getMinutes() * 60;

                const segundos = new Date(res.Data.dHoraSubasta).getSeconds();

                const fechaInicioSubasta = (fecha + hora + minuto + segundos) * 1000 ;

                // const fechaInicioSubasta = new Date().getTime() + 10000;

                const fechaFinSubasta = fechaInicioSubasta + (res.Data.nTiempoSubasta * 60) * 1000;

                // const fechaFinSubasta = fechaInicioSubasta + (0.10 * 60) * 1000;|

                if(this.fechaActual < fechaInicioSubasta){
                    this.nTiempoSubasta = 0;
                    this.tituloSubasta = 'La Subasta Comenzara en:';
                    this.subscription = interval(1000)
                    .subscribe((x) => { this.getTimeDifference(fechaInicioSubasta,fechaFinSubasta,this.nTiempoSubasta);});
                }else if (this.fechaActual >= fechaInicioSubasta && this.fechaActual <= fechaFinSubasta){
                    this.nTiempoSubasta = 1;
                    this.tituloSubasta = 'La Subasta Terminara en:';
                    this.subscription = interval(1000)
                    .subscribe((x) => { this.getTimeDifference(fechaInicioSubasta,fechaFinSubasta,this.nTiempoSubasta);});
                }else {
                    this.nTiempoSubasta = 2;
                    this.tituloSubasta = 'La Subasta Termino';
                    this.subscription.unsubscribe();
                    this.firstFormGroup.disable();
                    this.disableButton10 = true;
                }
            }else  if(res.Data.nCodTipoSubasta === 2){ // SUBASTA INGLES



            }else  if(res.Data.nCodTipoSubasta === 3){  // SUBASTA HOLANDESA

                if(res.Data.nEstadoSubasta === 1){ //SUBASTA ACTIVA

                    const numeroTramas = (res.Data.nValorTopeInicio - res.Data.nValorInicial) / res.Data.nRangoIncremento;
                    console.log(numeroTramas);
                    const tiempoSubasta = (res.Data.nTiempoEspera *  numeroTramas);

                    const configuracionSubastaHolandesa = [];


                    for (let i = 0; i < numeroTramas; i++) {

                        const fecha = new Date(res.Data.dFechaSubasta).getTime() / 1000;

                        const hora = new Date(res.Data.dHoraSubasta).getHours() * 3600;

                        const minuto = new Date(res.Data.dHoraSubasta).getMinutes() * 60;

                        const segundos = new Date(res.Data.dHoraSubasta).getSeconds();

                        const fechaInicioSubasta = ((fecha + hora + minuto + segundos) * 1000) + (i * 60 * res.Data.nTiempoEspera * 1000) + 1000;

                        const fechaFinSubasta = ((fecha + hora + minuto + segundos) * 1000) + (i * 60 * res.Data.nTiempoEspera * 1000) +  ( 60 * res.Data.nTiempoEspera * 1000);

                        configuracionSubastaHolandesa.push({
                            fechaInicioSubasta:fechaInicioSubasta,
                            fechaFinSubasta:fechaFinSubasta,
                            montoPostura:  res.Data.nValorInicial + ((i +1) * res.Data.nRangoIncremento)
                        });

                     }

                     console.log(configuracionSubastaHolandesa);


                    this.fechaActual = new Date(res.Data.dFechaHoraActual).getTime();

                    const fecha = new Date(res.Data.dFechaSubasta).getTime() / 1000;

                    const hora = new Date(res.Data.dHoraSubasta).getHours() * 3600;

                    const minuto = new Date(res.Data.dHoraSubasta).getMinutes() * 60;

                    const segundos = new Date(res.Data.dHoraSubasta).getSeconds();

                    const fechaInicioSubasta = (fecha + hora + minuto + segundos) * 1000 ;

                    const fechaFinSubasta = fechaInicioSubasta + (tiempoSubasta * 60) * 1000;

                    // const fechaInicioSubasta = new Date().getTime() + 10000;

                    // const fechaFinSubasta = fechaInicioSubasta + (0.10 * 60) * 1000;

                    if(this.fechaActual < fechaInicioSubasta){
                        this.nTiempoSubasta = 0;
                        this.tituloSubasta = 'La Subasta Comenzara en:';
                        this.subscription = interval(1000)
                        .subscribe((x) => { this.getTimeDifferenceSubastaHolandesa(fechaInicioSubasta,fechaFinSubasta,this.nTiempoSubasta,configuracionSubastaHolandesa);});
                    }
                    else if (this.fechaActual >= fechaInicioSubasta && this.fechaActual <= fechaFinSubasta){
                        this.nTiempoSubasta = 1;
                        this.tituloSubasta = 'La Subasta Terminara en:';
                        this.subscription = interval(1000)
                        .subscribe((x) => { this.getTimeDifferenceSubastaHolandesa(fechaInicioSubasta,fechaFinSubasta,this.nTiempoSubasta,configuracionSubastaHolandesa);});
                    }
                    else {
                        this.nTiempoSubasta = 2;
                        this.tituloSubasta = 'La Subasta Termino';
                        // this.subscription.unsubscribe();
                        this.firstFormGroup.disable();
                        this.disableButton10 = true;
                    }

                }else if(res.Data.nEstadoSubasta === 2){
                    this.nTiempoSubasta = 2;
                    this.tituloSubasta = 'La Subasta Termino';
                    // this.subscription.unsubscribe();
                    this.firstFormGroup.disable();

                }else if(res.Data.nEstadoSubasta === 3){
                    this.nTiempoSubasta = 2;
                    this.tituloSubasta = 'La Subasta Termino';
                    // this.subscription.unsubscribe();
                    this.firstFormGroup.disable();

                }


            }

            this.firstFormGroup.controls['nCodTipoSubasta'].setValue(res.Data.nCodTipoSubasta);
            this.firstFormGroup.controls['cDescMoneda'].setValue(res.Data.cDescMoneda);
            this.firstFormGroup.controls['nValorTopeInicio'].setValue(res.Data.nValorTopeInicio);
            this.firstFormGroup.controls['dFechaSubasta'].setValue(res.Data.dFechaSubasta);
            this.firstFormGroup.controls['dFechaCapacitacion'].setValue(res.Data.dFechaCapacitacion);
            this.firstFormGroup.controls['nValorInicial'].setValue(res.Data.nValorInicial);
            this.firstFormGroup.controls['nRangoIncremento'].setValue(res.Data.nRangoIncremento);
            this.firstFormGroup.controls['nTiempoEspera'].setValue(res.Data.nTiempoEspera);
            this.firstFormGroup.controls['nTiempoSubasta'].setValue(res.Data.nTiempoSubasta);
            this.firstFormGroup.controls['cTema'].setValue(res.Data.dHoraSubasta);

        });
    }

    addConsultas(form: FormGroup): void {
        console.log(form);
        const cNumero = this.dataconsultas.length;
        console.log(cNumero, 'numero de tabla');

        const body: any = {
            cNro: cNumero + 1,
            cTema: form.value.cTema,
            cPregunta: form.value.cPregunta,
        };
        const array = [];
        this.dataconsultas.push(body);
        array.push(body);
        console.log(body);
        this.dataSourceConsultas = new MatTableDataSource<any>(this.dataconsultas);
    }
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    deleteconsulta(i: number) {
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
                this.dataconsultas.splice(i, 1);
                this.dataSourceConsultas = new MatTableDataSource<any>(this.dataconsultas);
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

    selectRow(data: any): void {
        this.firstFormGroup.controls['cTema'].setValue(data.cTema);
        this.firstFormGroup.controls['cPregunta'].setValue(data.cPregunta);
        this.firstFormGroup.controls['cRespuestaConsulta'].setValue(data.cRespuesta);

    }

    // private getTimeDifference() {
    //     this.timeDifference = this.dDay.getTime() - new  Date().getTime();
    //     console.log(this.dDay.getTime() - new  Date().getTime());
    //     this.allocateTimeUnits(this.timeDifference);
    // }

    private getTimeDifference(fechaInicioSubasta: any, fechaFinSubasta: any, nTiempoSubasta: number ) {

        if(this.nTiempoSubasta === 0) {

            if(this.fechaActual >= fechaInicioSubasta && this.fechaActual <= fechaFinSubasta){
                this.nTiempoSubasta = 1;
                this.tituloSubasta = 'La Subasta Terminara en:';
            }else {

                this.timeDifference = fechaInicioSubasta - this.fechaActual;
                this.allocateTimeUnits(this.timeDifference);
                this.fechaActual = this.fechaActual + 1000;
            }

        }else if(this.nTiempoSubasta === 1) {
            if(this.fechaActual > fechaFinSubasta){
                this.nTiempoSubasta = 2;
                this.tituloSubasta = 'La Subasta Termino';
                this.subscription.unsubscribe();
                this.firstFormGroup.disable();
                this.disableButton10 = true;
            }else {

                this.timeDifference = fechaFinSubasta - this.fechaActual;
                this.allocateTimeUnits(this.timeDifference);
                this.fechaActual = this.fechaActual + 1000;
            }
        }

    }
    private getTimeDifferenceSubastaHolandesa(fechaInicioSubasta: any, fechaFinSubasta: any, nTiempoSubasta: number, configuracionSubastaHolandesa: any ) {

        if(this.nTiempoSubasta === 0) {

            if(this.fechaActual >= fechaInicioSubasta && this.fechaActual <= fechaFinSubasta){
                this.nTiempoSubasta = 1;
                this.tituloSubasta = 'La Subasta Terminara en:';
            }else {

                this.timeDifference = fechaInicioSubasta - this.fechaActual;
                this.allocateTimeUnits(this.timeDifference);
                this.fechaActual = this.fechaActual + 1000;
            }

        }else if(this.nTiempoSubasta === 1) {
            if(this.fechaActual >= fechaFinSubasta){
                this.nTiempoSubasta = 2;
                this.tituloSubasta = 'La Subasta Termino';
                this.subscription.unsubscribe();
                this.firstFormGroup.disable();
                this.disableButton10 = true;
            }else {

                for (let i = 0; i <= configuracionSubastaHolandesa.length - 1; i++) {

                    if(this.fechaActual >= configuracionSubastaHolandesa[i].fechaInicioSubasta && this.fechaActual <= configuracionSubastaHolandesa[i].fechaFinSubasta){
                        console.log(i);
                        this.timeDifference = configuracionSubastaHolandesa[i].fechaFinSubasta - this.fechaActual;
                        this.allocateTimeUnits(this.timeDifference);
                        this.firstFormGroup.controls['nPostura'].setValue(configuracionSubastaHolandesa[i].montoPostura);
                        console.log(this.fechaActual);
                        break;
                    }
                }

                this.fechaActual = this.fechaActual + 1000;
            }
        }

    }
  private allocateTimeUnits(timeDifference) {
        this.secondsToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond) % this.SecondsInAMinute);
        this.minutesToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour) % this.SecondsInAMinute);
        this.hoursToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour * this.SecondsInAMinute) % this.hoursInADay);
        this.daysToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour * this.SecondsInAMinute * this.hoursInADay));
  }

}

