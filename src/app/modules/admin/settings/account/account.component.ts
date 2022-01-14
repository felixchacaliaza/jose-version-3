/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { RegistroService } from 'app/core/services/registro/registro.service';
import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  encapsulation  : ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountComponent implements OnInit
{
    accountForm: FormGroup;
    isLinear = false;
    tipodocumentos = new Array();
    pais= new Array();
    departamentonacimiento=new Array();
    provincianacimiento= new Array();
    distritonacimiento=new Array();
    departamentos=new Array();
    provincias=new Array();
    distritos=new Array();
    vias= new Array();
    zonas=new Array();
    tipozonas=new Array();
    interior= new Array();
    bloque = new Array();
    ocupaciones = new Array();
    actividadeconomica=new Array();
    rubros= new Array();

    /**
     * Constructor
     */
    constructor(
        private _formBuilder: FormBuilder,
        private registerService: RegistroService
    )
    {
        this.accountForm = this._formBuilder.group({
            name    : ['70325963'],
            username: ['brianh'],
            title   : ['Senior Frontend Developer'],
            company : ['YXZ Software'],
            about   : ['Hey! This is Brian; husband, father and gamer. I\'m mostly passionate about bleeding edge tech and chocolate! 🍫'],
            email   : ['hughes.brian@mail.com', Validators.email],
            phone   : ['121-490-33-12'],
            country : ['usa'],
            language: ['english']
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Create the form

        this.getTipoDocumento();
        this.getPaisNacimiento();
        this.getDepartamentoNacimiento();
        this.getDepartamento();
        this.getOcupacion();
        this.getActividadEconomica();
        this.getRubro();
        this.getVia();
        this.getTipoZona();
        this.getTipoInterior();
        this.getBloque();
    }
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    getTipoDocumento() {
        this.registerService.listarTipoDocumento().then((res) => {
            console.log(res, 'respuesta de listar el tipo de documentos');
            this.tipodocumentos = res.Data;
        });
    }
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    getPaisNacimiento() {
        this.registerService.listarPais().then((res) => {
            console.log(res, 'respuesta de listar pais de nacimiento');
            this.pais = res.Data;
        });
    }
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    getDepartamentoNacimiento() {
        this.registerService.listarDepartamentos().then((res) => {
            console.log(res, 'respuesta de listar departamentos');
            this.departamentonacimiento = res.Data;
        });
    }
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    getProvinciaNacimiento(codigo: string) {
        this.registerService.listarProvincias(codigo).then((res) => {
            console.log(res, 'respuesta de listar provincias');
            this.provincianacimiento = res.Data;
        });
    }
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    getDistritoNacimiento(codigo: string) {
        this.registerService.listarDistritos(codigo).then((res) => {
            console.log(res, 'respuesta de listar distritos');
            this.distritonacimiento = res.Data;
        });
    }
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    listarProvinciasNacimiento(cUbigeo: string) {
        console.log(cUbigeo, 'codigo');
        const data = cUbigeo.substring(1, 3);
        console.log(data, 'substring');
        this.getProvinciaNacimiento(data);

    }
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    listarDistritosNacimiento(cUbigeo: string) {
        console.log(cUbigeo, 'codigo');
        const data = cUbigeo.substring(1, 5);
        console.log(data, 'substring');
        this.getDistritoNacimiento(data);
    }
    getOcupacion() {
        this.registerService.listarOcupaciones().then((res) => {
            console.log(res, 'respuesta de listar ocupaciones');
            this.ocupaciones = res.Data;
        });
    }
    getActividadEconomica() {
        this.registerService.listarActividadEconomica().then((res) => {
            console.log(res, 'respuesta de listar actividades economicas');
            this.actividadeconomica = res.Data;
        });
    }
    getRubro(){
        this.registerService.listarRubros().then((res)=> {
            console.log(res, 'respuesta de listar rubros');
            this.rubros = res.Data;
        });
    }
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    getDepartamento() {
        this.registerService.listarDepartamentos().then((res) => {
            console.log(res, 'respuesta de listar departamentos');
            this.departamentos = res.Data;
        });
    }
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    getProvincia(codigo: string) {
        this.registerService.listarProvincias(codigo).then((res) => {
            console.log(res, 'respuesta de listar provincias');
            this.provincias = res.Data;
        });
    }
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    getDistrito(codigo: string) {
        this.registerService.listarDistritos(codigo).then((res) => {
            console.log(res, 'respuesta de listar distritos');
            this.distritos = res.Data;
        });
    }
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    getZona(codigo: string) {
        this.registerService.listarzonas(codigo).then((res) => {
            console.log(res, 'respuesta de listar zonas');
            this.zonas = res.Data;
        });
    }
    listarProvincias(cUbigeo: string) {
        console.log(cUbigeo, 'codigo');
        const data = cUbigeo.substring(1, 3);
        console.log(data, 'substring');
        this.getProvincia(data);

    }
    listarDistritos(cUbigeo: string) {
        console.log(cUbigeo, 'codigo');
        const data = cUbigeo.substring(1, 5);
        console.log(data, 'substring');
        this.getDistrito(data);
    }
    listarZonas(cUbigeo: string) {
        console.log(cUbigeo, 'codigo');
        const data = cUbigeo.substring(1, 7);
        console.log(data, 'substring');
        this.getZona(data);
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



}
