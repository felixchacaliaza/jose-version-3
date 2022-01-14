export interface ProveedorProcesoSeleccion {
    nProcesoSeleccionId: number;
    nCodMoneda: number;
    nCodEtapa: number;
    cNroRuc: string;
    nMontoPropuesto: number;
    cApelacion: string;
    cRespuesta: string;
    cObservacion: string;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    documentos: DocumentosSustento[];

    consultas: Consultas[];

}
export interface DocumentosSustento {

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
export interface Consultas{
cTema: string;
cPregunta: string;
cRespuesta: string;
}
