export interface ProveedorCotizacion {
    nCotizacionRequerimientoCompraId: number;
    nCodMoneda: number;
    cNroRuc: string;
    nCotizacion: number;
    cComentario: string;
    cRespuesta: string;
    cObservacion: string;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    documentos: DocumentosSustento[];

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
