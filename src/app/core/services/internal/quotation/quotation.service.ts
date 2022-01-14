/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProveedorCotizacion } from 'app/core/interfaces/registroproveedores/cotizacion';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuotationService {
  apiUrl = environment.url;
  urlListQuotation = '/Admin/ListarCotizacionRequerimientoCompra?Etapa';
  urlListCotizacionProveedor = '/Admin/ListarCotizacionProveedor?nCotizacionRequerimientoCompraId';
  urlConstante = 'Proveedor/ListarConstante?';
  urlListEspecificacionDocumentos = '/Admin/ListarCotizacionEspecificacionesDocumentos?';
  urlListarEtapas = '/Admin/ListarEtapaCotizacionGeneral';
  urlRegistraMontoCotizacion ='/Admin/InsertaMontoCotizacionProveedor';
  // eslint-disable-next-line @typescript-eslint/naming-convention
  TipoMoneda='1011';
  constructor(private http: HttpClient) { }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  async listarPermisos(codEtapa: number,ruc: string) {

    // eslint-disable-next-line max-len
    const newLocal = sessionStorage.getItem('token');
    //################################## DEFINIMOS LOS HEADERS-API REST ##############################
    const headers =  new HttpHeaders({
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'Access-Control-Allow-Origin': '*',
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'Authorization': newLocal
      });
      //################################ GOLPEAMOS LA API - GET ####################################
      return this.http.get<any>(`${this.apiUrl}${this.urlListQuotation}=${codEtapa}&Ruc=${ruc}`, { headers }).toPromise()
      //################################## OBTENEMOS UNA RESPUESTA CORRECTA ##############################
      .then((res: any) => {
      console.log(res);
      return res;
      })
      //################################## OBTENEMOS UN ERROR ##############################
      .catch((error) => {
      console.log(error);
      return error;
      });
  }

   listarEspecificacionesDocumentos(nCodigo: number){

    // eslint-disable-next-line max-len
    const newLocal = sessionStorage.getItem('token');
    //################################## DEFINIMOS LOS HEADERS-API REST ##############################
    const headers =  new HttpHeaders({
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'Access-Control-Allow-Origin': '*',
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'Authorization': newLocal
      });
      //################################ GOLPEAMOS LA API - GET ####################################
      return this.http.get<any>(`${this.apiUrl}${this.urlListEspecificacionDocumentos}nCotizacionRequerimientoCompraId=${nCodigo}`, { headers }).toPromise()
      //################################## OBTENEMOS UNA RESPUESTA CORRECTA ##############################
      .then((res: any) => {
      console.log(res);
      return res;
      })
      //################################## OBTENEMOS UN ERROR ##############################
      .catch((error) => {
      console.log(error);
      return error;
      });
  }
  async listarMoneda() {

    const newLocal = sessionStorage.getItem('token');
    //################################## DEFINIMOS LOS HEADERS-API REST ##############################
      const headers =  new HttpHeaders({
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'Access-Control-Allow-Origin': '*',
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'Authorization': newLocal

      });
      //################################ GOLPEAMOS LA API - GET ####################################
      return this.http.get<any>(`${this.apiUrl}${this.urlConstante}codigoconstante=${this.TipoMoneda}&valor=-1`,{headers}).toPromise()
        //################################## OBTENEMOS UNA RESPUESTA CORRECTA ##############################
        .then((res: any) => {
          console.log(res);
          return res;
        })
        //################################## OBTENEMOS UN ERROR ##############################
        .catch((error) => {
          console.log(error);
          return error;
        });
  }

  async listarEtapas() {

    const newLocal = sessionStorage.getItem('token');
    //################################## DEFINIMOS LOS HEADERS-API REST ##############################
      const headers =  new HttpHeaders({
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'Access-Control-Allow-Origin': '*',
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'Authorization': newLocal

      });
      //################################ GOLPEAMOS LA API - GET ####################################
      return this.http.get<any>(`${this.apiUrl}${this.urlListarEtapas}`,{headers}).toPromise()
        //################################## OBTENEMOS UNA RESPUESTA CORRECTA ##############################
        .then((res: any) => {
          console.log(res);
          return res;
        })
        //################################## OBTENEMOS UN ERROR ##############################
        .catch((error) => {
          console.log(error);
          return error;
        });
  }

  async  registrarMontoCotizacion(data: ProveedorCotizacion){

    const newLocal = sessionStorage.getItem('token');
    //################################## DEFINIMOS LOS HEADERS-API REST ##############################
    const headers =  new HttpHeaders({
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'Access-Control-Allow-Origin': '*',
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'Authorization': newLocal
    });
    //################################ GOLPEAMOS LA API - GET ####################################
    return this.http.post<any>(`${this.apiUrl}${this.urlRegistraMontoCotizacion}`,{
    nCotizacionRequerimientoCompraId: data.nCotizacionRequerimientoCompraId,
    cNroRuc: data.cNroRuc,
    nCotizacion: data.nCotizacion,
    nCodMoneda:data.nCodMoneda,
    cComentario: data.cComentario,
    cObservacion:data.cObservacion,
    cRespuesta: data.cRespuesta
      },{headers}).toPromise()
      //################################## OBTENEMOS UNA RESPUESTA CORRECTA ##############################
      .then((res: any) => {
        console.log(res);
        return res;
      })
      //################################## OBTENEMOS UN ERROR ##############################
      .catch((error) => {
        console.log(error);
        return error;
      });
}
async listarCotizacionProveedor(codCotizacion: number,ruc: string) {

    // eslint-disable-next-line max-len
    const newLocal = sessionStorage.getItem('token');
    //################################## DEFINIMOS LOS HEADERS-API REST ##############################
    const headers =  new HttpHeaders({
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'Access-Control-Allow-Origin': '*',
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'Authorization': newLocal
      });
      //################################ GOLPEAMOS LA API - GET ####################################
      return this.http.get<any>(`${this.apiUrl}${this.urlListCotizacionProveedor}=${codCotizacion}&NroRuc=${ruc}`, { headers }).toPromise()
      //################################## OBTENEMOS UNA RESPUESTA CORRECTA ##############################
      .then((res: any) => {
      console.log(res);
      return res;
      })
      //################################## OBTENEMOS UN ERROR ##############################
      .catch((error) => {
      console.log(error);
      return error;
      });
  }
}
