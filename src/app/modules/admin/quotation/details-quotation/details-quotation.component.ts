import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ProveedorProcesoSeleccion } from 'app/core/interfaces/registroproveedores/proceso';
import { ProcessService } from 'app/core/services/internal/process/process.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-details-quotation',
  templateUrl: './details-quotation.component.html',
  styleUrls: ['./details-quotation.component.scss']
})
export class DetailsQuotationComponent implements OnInit {

    firstFormGroup: FormGroup;
    nombre: string;
    procnombre: string;
    procrubro: string;
    nnivel: string;
    procetapa: any;
    selectedFiles = new Array();
    tipodoc = new Array();
    tipomoneda=new Array();
    tiposubasta=new Array();
    file: any;
    fileName: any;
    fileArray: any;
    nameFile: any;
    selectedFile: any;
    bBuenaPro: boolean;

    nCodEstado: number;
    dataFinal: ProveedorProcesoSeleccion;
    public arrayBuffer: any;
    dataCalendario=[];
    datadocument = [];
    dataconsultas = [];
    dataconsultasgenerales=[];
    datadocumentProveedorProcesoSeleccion = [];

    listadocumentos = new Array();


    public dataSource3 = new MatTableDataSource<any>(this.datadocument);
    public dataSourceCalendario = new MatTableDataSource<any>(this.dataCalendario);
    public dataSourceConsultas = new MatTableDataSource<any>(this.dataconsultas);
    public dataSourceConsultasGenerales = new MatTableDataSource<any>(this.dataconsultasgenerales);

    public dataSource4 = new MatTableDataSource<any>(this.datadocumentProveedorProcesoSeleccion);
    public dataSource5 = new MatTableDataSource<any>(this.datadocumentProveedorProcesoSeleccion);
    public dataSource6 = new MatTableDataSource<any>(this.datadocumentProveedorProcesoSeleccion);

    public dataSourceBasesIntegradas =new MatTableDataSource<any>(this.datadocumentProveedorProcesoSeleccion);
    public displayedColumns3: string[] = ['tipodoc','descripcion','ver'];
    public displayedColumnsCalendario: string[] = ['id','nombreetapa','detalle','fechainicio','fechafin'];
    public displayedColumnsDocumentosAdjuntos: string[] = ['tipodoc','descripcion','ver','opciones'];
    public displayedColumnsConsultas: string[] = ['nro','tema','pregunta','opciones'];

    private id = 0;

  constructor(private http: HttpClient, private route: ActivatedRoute,private procService: ProcessService,private _formBuilder: FormBuilder,private md: MatDialog, ) { }

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
        nMontoCotizacion : [0],
        nCodMoneda: [1],
        cRespuesta:[],
        cObservacion:[],
        cApelacion:[],
        archivo:[],
        nTipoDocumento: [''],
        cDescripcionDoc: [''],
        cDescEstado:[],
        bContenido: [],
        cNro: [],
        cTema: [],
        cPregunta: [],
        cRespuestaConsulta: [],
        listadocumentos : [],
        nCodTipoSubasta:[],
        cDescMoneda: [],
        nValorTopeInicio:[],
        dFechaSubasta:[],
        dFechaCapacitacion:[],
        nValorInicial:[],
        nRangoIncremento:[],
        nTiempoEspera:[]
    });
    this.route.params.subscribe((res: any)=>{
        this.id = res.id;
    });

    this.nombre = sessionStorage.getItem('detailName');
    this.procnombre = sessionStorage.getItem('detailNameProcess');
    this.procrubro=sessionStorage.getItem('detailNameRubro');
    this.nnivel = sessionStorage.getItem('detailNameNivel');
    console.log(this.nombre);
    console.log(this.procnombre);
    console.log(this.procrubro);
    console.log(this.nnivel);
    this.getListarTipoDocumentos();
    this.getListarTipoMoneda();
    this.getInfo();
    this.getDocEtapa2();
    this.getDocEtapa3();
    this.getDocEtapa5();
    this.getCargaProcesoSeleccionProveedor();
    this.getListarTipoSubasta();
    this.getCargaConfigSubasta();
  }
  getInfo(): void{
    this.procService.listarEspecificacionesDocumentos(this.id).then((res: any)=>{
        console.log(res);
        this.procetapa = res.Data.CalendarioProcesoSeleccion;
        this.dataSource3 = new MatTableDataSource(res.Data.DocumentosProcesoSeleccion);
        this.dataSourceCalendario = new MatTableDataSource(res.Data.CalendarioProcesoSeleccion);
        console.log(this.procetapa.length);
    });
}
async getDocEtapa2(): Promise<void>{
    await this.procService.listarEtapasDocumentos(this.id,2).then((res: any) =>{
        this.datadocumentProveedorProcesoSeleccion=res.Data;
    });
    this.dataSource4 = new MatTableDataSource(this.datadocumentProveedorProcesoSeleccion);
}
getDocEtapa3(): void{
if(this.nnivel==='1'){
    this.procService.listarEtapasDocumentos(this.id,3).then((res: any) =>{
        this.dataSource5 = new MatTableDataSource(res.Data);
    });
}
if(this.nnivel==='2')
{
    this.procService.listarEtapasDocumentos(this.id,6).then((res: any) =>{
        this.dataSource5 = new MatTableDataSource(res.Data);
    });

}
}
getDocEtapa5(): void{
    this.procService.listarEtapasDocumentos(this.id,5).then((res: any) =>{
        console.log(res.Data);
        this.dataSourceBasesIntegradas = new MatTableDataSource(res.Data);
    });
}
getListarTipoDocumentos(): void{
    this.procService.listarTiposDocumentos().then((res)=> {
        console.log(res, 'respuesta de listar los tipo doc');
        this.tipodoc = res.Data;
    });

}

getListarTipoMoneda(): void{
    this.procService.listarMoneda().then((res)=> {
        console.log(res, 'respuesta de listar monedas');
        this.tipomoneda = res.Data;
    });

}

getListarTipoSubasta(): void{
    this.procService.listarTipoSubasta().then((res)=> {
        console.log(res, 'respuesta de listar los tipo subasta');
        this.tiposubasta = res.Data;
    });

}
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
descargar(file) {
    const blob = new Blob([file], { type: 'application/pdf'});
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
  deletedocument(i: number){
    Swal.fire({
        title:'¡Cuidado!',
        text:'¿Esta seguro que desea  eliminar este registro?',
        icon: 'warning',
        showCancelButton:true,
        confirmButtonColor:'blue',
        cancelButtonColor:'red',
        confirmButtonText:'Si, eliminar',
        cancelButtonText:'No, cancelar',
    }).then((res)=>{
        if(res.isConfirmed){
            this.datadocumentProveedorProcesoSeleccion.splice(i,1);
            this.dataSource4 = new MatTableDataSource<any>(this.datadocumentProveedorProcesoSeleccion);
            Swal.fire({
                title:'¡Hecho!',
                text:'El registro fue eliminado con éxito',
                icon: 'success',
                showCancelButton:false,
                showConfirmButton:false,
                timer:1500
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
        nCodEtapa:codEtapa,
        nCodMoneda: this.firstFormGroup.value.nCodMoneda,
        nMontoPropuesto: this.firstFormGroup.value.nMontoCotizacion,
        cRespuesta:this.firstFormGroup.value.cRespuesta,
        cObservacion:this.firstFormGroup.value.cObservacion,
        cApelacion:this.firstFormGroup.value.cApelacion,
        documentos: this.datadocumentProveedorProcesoSeleccion,
        consultas:this.dataconsultas

    };
    console.log(this.dataFinal);

    this.procService.registrarProcesoSeleccionProveedor(this.dataFinal).then((res: any)=>{
        console.log(res,'respuesta de api');
        if(res.IsCorrect === true)
            {
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
            if(res.IsCorrect === false)
            {
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
    await this.procService.listarProcesoSeleccionProveedor(this.id,sessionStorage.getItem('usuario')).then((res: any)=>
    {
        console.log(res);
        this.bBuenaPro = res.Data.bBuenaPro;
        this.nCodEstado=res.Data.nEstado;
        this.dataconsultas =res.Data.consultas;
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
    await this.procService.listarConfigSubasta(this.id).then((res: any)=>
    {
        console.log(res);
        this.firstFormGroup.controls['nCodTipoSubasta'].setValue(res.Data.nCodTipoSubasta);
        this.firstFormGroup.controls['cDescMoneda'].setValue(res.Data.cDescMoneda);
        this.firstFormGroup.controls['nValorTopeInicio'].setValue(res.Data.nValorTopeInicio);
        this.firstFormGroup.controls['dFechaSubasta'].setValue(res.Data.dFechaSubasta);
        this.firstFormGroup.controls['dFechaCapacitacion'].setValue(res.Data.dFechaCapacitacion);
        this.firstFormGroup.controls['nValorInicial'].setValue(res.Data.nValorInicial);
        this.firstFormGroup.controls['nRangoIncremento'].setValue(res.Data.nRangoIncremento);
        this.firstFormGroup.controls['nTiempoEspera'].setValue(res.Data.nTiempoEspera);

    });
}

addConsultas(form: FormGroup): void{
    console.log(form);
    const cNumero = this.dataconsultas.length;
    console.log(cNumero, 'numero de tabla');

    const body: any = {
        cNro        :cNumero +1 ,
        cTema   : form.value.cTema,
        cPregunta   : form.value.cPregunta,
    };
    const array = [];
    this.dataconsultas.push(body);
     array.push(body);
    console.log(body);
    this.dataSourceConsultas = new MatTableDataSource<any>(this.dataconsultas);
}
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
deleteconsulta(i: number){
    Swal.fire({
        title:'¡Cuidado!',
        text:'¿Esta seguro que desea  eliminar este registro?',
        icon: 'warning',
        showCancelButton:true,
        confirmButtonColor:'blue',
        cancelButtonColor:'red',
        confirmButtonText:'Si, eliminar',
        cancelButtonText:'No, cancelar',
    }).then((res)=>{
        if(res.isConfirmed){
            this.dataconsultas.splice(i,1);
            this.dataSourceConsultas = new MatTableDataSource<any>(this.dataconsultas);
            Swal.fire({
                title:'¡Hecho!',
                text:'El registro fue eliminado con éxito',
                icon: 'success',
                showCancelButton:false,
                showConfirmButton:false,
                timer:1500
            });
        } else {
            return;
        }
    });
}

selectRow(data: any): void{
    this.firstFormGroup.controls['cTema'].setValue(data.cTema);
    this.firstFormGroup.controls['cPregunta'].setValue(data.cPregunta);
    this.firstFormGroup.controls['cRespuestaConsulta'].setValue(data.cRespuesta);

}
}
