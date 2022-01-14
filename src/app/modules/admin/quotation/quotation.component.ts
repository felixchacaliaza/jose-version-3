import { Data, Router } from '@angular/router';
import { QuotationService } from './../../../core/services/internal/quotation/quotation.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quotation',
  templateUrl: './quotation.component.html',
  styleUrls: ['./quotation.component.scss']
})
export class QuotationComponent implements OnInit {

    data = new Array();
    process: any;
    etapas = new Array();
    codEtapa: number;
    ruc: string;

  constructor(private qtService: QuotationService, private router: Router) {
      this.data = [
          {name:'CÓDIGO'},
          {name:'COTIZACIÓN'},
          {name:'ETAPA'},
          {name:'FECHA'},
          {name:'RUBRO'}
        ];

  }

  ngOnInit(): void {
      this.getListarEtapas();
  }

  goto(quote: any): void{
    const ida = quote.cNroCotizacionRequerimientoCompra;
    console.log(ida);
    sessionStorage.setItem('detailName', ida );
    this.router.navigate([`convocatorias/${quote.nCotizacionRequerimientoCompraId}`]);
  }
  getCodEtapa(cod: any): void{
    this.codEtapa = cod;
    this.ruc = sessionStorage.getItem('usuario');
  }
  getListarEtapas(): void{
    this.qtService.listarEtapas().then((res)=> {
        console.log(res, 'respuesta de listar las etapas');
        this.etapas = res.Data;
    });
}

getQuotation(): void{
    this.qtService.listarPermisos(this.codEtapa,this.ruc).then((res: any)=>{
        this.process = res.Data;
      });
}
}
