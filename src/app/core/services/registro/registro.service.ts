import { ProveedorLogin } from './../../interfaces/registroproveedores/registro';
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProveedorGeneral } from 'app/core/interfaces/registroproveedores/registro';
import { environment } from 'environments/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

    apiUrl = environment.url;
    urlRoute = '/Proveedor/ListarUbigeo?cCodUbigeo=&pTipoFiltro=0';
    urlPais ='/Proveedor/ListarPais?cCodUbigeo=&pTipoFiltro=0';
    urlDepartamento = '/Proveedor/ListarDepartamento?cCodUbigeo=&pTipoFiltro=1';
    urlProvincias = '/Proveedor/ListarProvincia?';
    urlDistritos = '/Proveedor/ListarDistrito?';
    urlZonas = 'Proveedor/ListarZona?';
    urlRegistro = 'Proveedor/InsertaProveedor';
    urlValidaLogin='Proveedor/ValidaLogin';
    urlValidaCodVerificacion ='Proveedor/ValidaCodigoVerificacion';
    urlConstante = 'Proveedor/ListarConstante?';
    urlConstanteLogistica ='Proveedor/ListarConstanteLogistica?';
    urlActividadEconomica = 'Proveedor/ListarActividadEconomicas?';
    urlOcupaciones = 'Proveedor/ListarOcupacion';
    urlPermiso = '/Admin/';
    TipoVia='9306';
    TipoZona='9307';
    TipoDocumento='10080';
    MagnitudEmpresarial='1004';
    TipoPersonaJuridica='1002';
    Bloque = '99052';
    TipoInterior='99053';
    Rubro =108;
    PersonaVinculada=109;
    TiposDocumentosAdjuntos=110;
    constructor(private http: HttpClient) {}
    async listarUbigeo() {

      //################################## DEFINIMOS LOS HEADERS-API REST ##############################
        const headers =  new HttpHeaders({
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, OPTIONS'
        });
        //################################ GOLPEAMOS LA API - GET ####################################
        return this.http.get<any>(`${this.apiUrl}${this.urlRoute}`,{headers}).toPromise()
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
    async listarPais() {

        //################################## DEFINIMOS LOS HEADERS-API REST ##############################
          const headers =  new HttpHeaders({
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, OPTIONS'
          });
          //################################ GOLPEAMOS LA API - GET ####################################
          return this.http.get<any>(`${this.apiUrl}${this.urlPais}`,{headers}).toPromise()
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
    async listarDepartamentos(){

        //################################## DEFINIMOS LOS HEADERS-API REST ##############################
        const headers =  new HttpHeaders({
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, OPTIONS'
          });
          //################################ GOLPEAMOS LA API - GET ####################################
          return this.http.get<any>(`${this.apiUrl}${this.urlDepartamento}`,{headers}).toPromise()
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
    async listarProvincias(codepartamento: string){

        //################################## DEFINIMOS LOS HEADERS-API REST ##############################
        const headers =  new HttpHeaders({
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, OPTIONS'
          });
          //################################ GOLPEAMOS LA API - GET ####################################
          return this.http.get<any>(`${this.apiUrl}${this.urlProvincias}cCodUbigeo=${codepartamento}&pTipoFiltro=2`,{headers}).toPromise()
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
    async listarDistritos(codeprovincia: string){

                //################################## DEFINIMOS LOS HEADERS-API REST ##############################
                const headers =  new HttpHeaders({
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, OPTIONS'
                  });
                  //################################ GOLPEAMOS LA API - GET ####################################
                  return this.http.get<any>(`${this.apiUrl}${this.urlDistritos}cCodUbigeo=${codeprovincia}&pTipoFiltro=3`,{headers}).toPromise()
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
            async listarzonas(codedistrito: string){

                //################################## DEFINIMOS LOS HEADERS-API REST ##############################
                const headers =  new HttpHeaders({
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, OPTIONS'
                  });
                  //################################ GOLPEAMOS LA API - GET ####################################
                  return this.http.get<any>(`${this.apiUrl}${this.urlZonas}cCodUbigeo=${codedistrito}&pTipoFiltro=4`,{headers}).toPromise()
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
            async listarTipoVia() {

                //################################## DEFINIMOS LOS HEADERS-API REST ##############################
                  const headers =  new HttpHeaders({
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, OPTIONS'
                  });
                  //################################ GOLPEAMOS LA API - GET ####################################
                  return this.http.get<any>(`${this.apiUrl}${this.urlConstante}codigoconstante=${this.TipoVia}&valor=-1`,{headers}).toPromise()
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
              async listarTipoZona() {

                //################################## DEFINIMOS LOS HEADERS-API REST ##############################
                  const headers =  new HttpHeaders({
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, OPTIONS'
                  });
                  //################################ GOLPEAMOS LA API - GET ####################################
                  return this.http.get<any>(`${this.apiUrl}${this.urlConstante}codigoconstante=${this.TipoZona}&valor=-1`,{headers}).toPromise()
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
              async listarTipoDocumento() {

                //################################## DEFINIMOS LOS HEADERS-API REST ##############################
                  const headers =  new HttpHeaders({
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, OPTIONS'
                  });
                  //################################ GOLPEAMOS LA API - GET ####################################
                  return this.http.get<any>(`${this.apiUrl}${this.urlConstante}codigoconstante=${this.TipoDocumento}&valor=-1`,{headers}).toPromise()
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
              async listarMagnitudEmpresarial() {

                //################################## DEFINIMOS LOS HEADERS-API REST ##############################
                  const headers =  new HttpHeaders({
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, OPTIONS'
                  });
                  //################################ GOLPEAMOS LA API - GET ####################################
                  return this.http.get<any>(`${this.apiUrl}${this.urlConstante}codigoconstante=${this.MagnitudEmpresarial}&valor=-1`,{headers}).toPromise()
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
              async listarTipoPersonaJuridica() {

                //################################## DEFINIMOS LOS HEADERS-API REST ##############################
                  const headers =  new HttpHeaders({
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, OPTIONS'
                  });
                  //################################ GOLPEAMOS LA API - GET ####################################
                  return this.http.get<any>(`${this.apiUrl}${this.urlConstante}codigoconstante=${this.TipoPersonaJuridica}&valor=-1`,{headers}).toPromise()
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
              async listarActividadEconomica() {

                //################################## DEFINIMOS LOS HEADERS-API REST ##############################
                  const headers =  new HttpHeaders({
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, OPTIONS'
                  });
                  //################################ GOLPEAMOS LA API - GET ####################################
                  return this.http.get<any>(`${this.apiUrl}${this.urlActividadEconomica}descripcion=''&nivel=4`,{headers}).toPromise()
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

              async listarBloque() {

                //################################## DEFINIMOS LOS HEADERS-API REST ##############################
                  const headers =  new HttpHeaders({
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, OPTIONS'
                  });
                  //################################ GOLPEAMOS LA API - GET ####################################
                  return this.http.get<any>(`${this.apiUrl}${this.urlConstante}codigoconstante=${this.Bloque}&valor=-1`,{headers}).toPromise()
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

              async listarInterior() {

                //################################## DEFINIMOS LOS HEADERS-API REST ##############################
                  const headers =  new HttpHeaders({
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, OPTIONS'
                  });
                  //################################ GOLPEAMOS LA API - GET ####################################
                  return this.http.get<any>(`${this.apiUrl}${this.urlConstante}codigoconstante=${this.TipoInterior}&valor=-1`,{headers}).toPromise()
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

              async listarRubros() {

                //################################## DEFINIMOS LOS HEADERS-API REST ##############################
                  const headers =  new HttpHeaders({
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, OPTIONS'
                  });
                  //################################ GOLPEAMOS LA API - GET ####################################
                  return this.http.get<any>(`${this.apiUrl}${this.urlConstanteLogistica}codigoconstante=${this.Rubro}`,{headers}).toPromise()
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

              async listarTipoPersonaVinculada() {

                //################################## DEFINIMOS LOS HEADERS-API REST ##############################
                  const headers =  new HttpHeaders({
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, OPTIONS'
                  });
                  //################################ GOLPEAMOS LA API - GET ####################################
                  return this.http.get<any>(`${this.apiUrl}${this.urlConstanteLogistica}codigoconstante=${this.PersonaVinculada}`,{headers}).toPromise()
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

              async listarTipoDocumentoAdjunto() {

                //################################## DEFINIMOS LOS HEADERS-API REST ##############################
                  const headers =  new HttpHeaders({
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, OPTIONS'
                  });
                  //################################ GOLPEAMOS LA API - GET ####################################
                  return this.http.get<any>(`${this.apiUrl}${this.urlConstanteLogistica}codigoconstante=${this.TiposDocumentosAdjuntos}`,{headers}).toPromise()
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


             async  RegistrarProveedores(data: ProveedorGeneral){

                                  //################################## DEFINIMOS LOS HEADERS-API REST ##############################
                const headers =  new HttpHeaders({
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, OPTIONS'
                    });
                    //################################ GOLPEAMOS LA API - GET ####################################
                    return this.http.post<any>(`${this.apiUrl}${this.urlRegistro}`,{
                    nTipoProveedor: data.nTipoProveedor,
                    cNroRuc: data.cNroRuc,
                    dFechaInicioAct: data.dFechaInicioAct,
                    nCIIU: data.nCIIU,
                    cRubro: data.cRubro,
                    cTelefonoMovil: data.cTelefonoMovil,
                    cTelefonoFijo: data.cTelefonoFijo,

                    //Proveedor Juridico

                    cRazonSocial: data.cRazonSocial,
                    cNombreComercial: data.cNombreComercial,
                    nMagnitudEmp: data.nMagnitudEmp,
                    nTipoPersonaJuridica: data.nTipoPersonaJuridica,

                    //Proveedor Natural
                    nTipoDoc: data.nTipoDoc,
                    cNroDoc: data.cNroDoc,
                    nOcupacion: data.nOcupacion,
                    cApePaterno: data.cApePaterno,
                    cApeMaterno: data.cApeMaterno,
                    cNombres: data.cNombres,
                    nCodPaisNac : data.nCodPaisNac,
                    nCodDepNac: data.nCodDepNac,
                    nCodDistNac: data.nCodDistNac,
                    nCodProvNac: data.nCodProvNac,
                    cCorreo: data.cCorreo,
                    cLugarConstitucion : data.cLugarConstitucion,
                    dFechaNac: data.dFechaNac,

                    //Datos de Dirección del Proveedor
                    nCodDepartamento: data.nCodDepartamento,
                    nCodProvincia: data.nCodProvincia,
                    nCodDistrito: data.nCodDistrito,
                    nCodZona: data.nCodZona,
                    nCodTipoVia: data.nCodTipoVia,
                    cDescVia: data.cDescVia,
                    nCodTipoZona: data.nCodTipoZona,
                    cDescZona: data.cDescZona,
                    cMzna: data.cMzna,
                    cLote: data.cLote,
                    cEtapa: data.cEtapa,
                    cNro: data.cNro,
                    nTipoInterior: data.nTipoInterior,
                    cDescripcionInterior:data.cDescripcionInterior,
                    nTipoBloque:data.nTipoBloque,
                    cDescripcionBloque:data.cDescripcionBloque,
                    cReferencia: data.cReferencia,
                    Contactos: data.Contactos,
                    PersonasVinculadas: data.PersonasVinculadas,
                    Documentos: data.Documentos,
                    Login: data.Login
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
              async  ValidarLogin(data: ProveedorLogin){
                //################################## DEFINIMOS LOS HEADERS-API REST ##############################
                const headers =  new HttpHeaders({
                  'Access-Control-Allow-Origin': '*',
                  'Access-Control-Allow-Methods': 'GET, OPTIONS'
                });
                //################################ GOLPEAMOS LA API - POST ####################################
                return this.http.post<any>(`${this.apiUrl}${this.urlValidaLogin}`,{
                cUsuario: data.cUsuario,
                cContraseña:data.cContraseña,
                nIndicador:data.nIndicador
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
            async  ValidarCodigoVerificacion(Usuario: string , CodigoVerificacion: string){
            //################################## DEFINIMOS LOS HEADERS-API REST ##############################
            const headers =  new HttpHeaders({
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, OPTIONS'
            });
            //################################ GOLPEAMOS LA API - POST ####################################
            return this.http.post<any>(`${this.apiUrl}${this.urlValidaCodVerificacion}`,{
            cUsuario: Usuario,
            cCodigoVerificacion:CodigoVerificacion
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
            async listarOcupaciones(){

                //################################## DEFINIMOS LOS HEADERS-API REST ##############################
                const headers =  new HttpHeaders({
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, OPTIONS'
                });
                //################################ GOLPEAMOS LA API - GET ####################################
                return this.http.get<any>(`${this.apiUrl}${this.urlOcupaciones}`,{headers}).toPromise()
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

            async listarPermisos(usuario: string) {

                // eslint-disable-next-line max-len
                const newLocal = sessionStorage.getItem('token');
                //################################## DEFINIMOS LOS HEADERS-API REST ##############################
                const headers =  new HttpHeaders({
                    // eslint-disable-next-line @typescript-eslint/naming-convention
                    'Access-Control-Allow-Origin': '*',
                    // eslint-disable-next-line @typescript-eslint/naming-convention
                    'Access-Control-Allow-Methods': 'GET, OPTIONS',
                    'Authorization': newLocal
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
