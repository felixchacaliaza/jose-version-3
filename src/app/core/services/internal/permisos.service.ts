/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PermisosService {
    apiUrl = environment.url;
    urlPermiso = '/Admin/';
    estado = 0;
  constructor(private http: HttpClient) { }
  async listarPermisos(usuario: string) {

    //################################## DEFINIMOS LOS HEADERS-API REST ##############################
    const headers =  new HttpHeaders({
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'Access-Control-Allow-Origin': '*',
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'Access-Control-Allow-Methods': 'GET, OPTIONS'
      });
      //################################ GOLPEAMOS LA API - GET ####################################
      return this.http.get<any>(`${this.apiUrl}${this.urlPermiso}ListarPermisos?Usuario=${usuario}`, { headers }).toPromise()
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
