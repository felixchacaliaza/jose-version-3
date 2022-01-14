export interface ProveedorGeneral {
//General
nTipoProveedor: number;
cNroRuc: string;
dFechaInicioAct: Date;
nCIIU: number;
cRubro: string;
cTelefonoMovil: string;
cTelefonoFijo: string;

//Proveedor Juridico

cRazonSocial: string;
cNombreComercial: string;
nMagnitudEmp: number;
nTipoPersonaJuridica: number;

//Proveedor Natural
nTipoDoc: number;
cNroDoc: string;
nOcupacion: number;
cApePaterno: string;
cApeMaterno: string;
cNombres: string;
nCodPaisNac: string;
nCodDepNac: string;
nCodDistNac: string;
nCodProvNac: string;
cCorreo: string;
cLugarConstitucion: string;
dFechaNac: Date;

//Datos de Dirección del Proveedor
nCodDepartamento: string;
nCodProvincia: string;
nCodDistrito: string;
nCodZona: string;
nCodTipoVia: number;
cDescVia: string;
nCodTipoZona: number;
cDescZona: string;
cMzna: string;
cLote: string;
cEtapa: string;
cNro: string;
nTipoInterior: number;
cDescripcionInterior: string;
nTipoBloque: number;
cDescripcionBloque: string;
cReferencia: string;
// eslint-disable-next-line @typescript-eslint/naming-convention
Contactos: ProveedorContactos[];
// eslint-disable-next-line @typescript-eslint/naming-convention
PersonasVinculadas: ProveedorPersonasVinculadas[];
// eslint-disable-next-line @typescript-eslint/naming-convention
Documentos: ProveedorDocumentos[];
// eslint-disable-next-line @typescript-eslint/naming-convention
Login: ProveedorLogin;
}
export interface ProveedorContactos {
nCodTipoDoc: number;
cNroDoc: string;
cCorreo: string;
cTelefono: string;
cApePaterno: string;
cApeMaterno: string;
cNombres: string;
}
export interface ProveedorPersonasVinculadas {
nCodTipo: number;
nCodTipoDoc: number;
cNroDoc: string;
cApePaterno: string;
cApeMaterno: string;
cNombres: string;
cDireccion: string;
bDDJJ: boolean;
}
export interface ProveedorDocumentos {

nTipoDocumento: number;
cRutaDocumento: string;
cDocumento: string;
bContenido: [];
cExtension: string;
cNombreDoc: string;
bEstado: string;
cDescripcionDoc: string;
cPersAdjunto: string;
cTipoDoc: string;
}
export interface ProveedorLogin {
cUsuario: string;
cContraseña: string;
nIndicador: number;
}

