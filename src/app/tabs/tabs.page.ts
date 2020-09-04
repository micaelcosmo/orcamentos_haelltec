import {Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage  implements OnInit {

  orcamento: FormGroup;
  public total = '0';

  constructor( private formBuilder: FormBuilder ) {}

  ngOnInit(){
    this.orcamento = this.formBuilder.group({
      notebooks: ['', Validators.required],
      desktops: ['', Validators.required],
      velocidade: ['', Validators.required],
      cobertura: ['', Validators.required],
    });
  }

  calcular(form){
    const roteadores = this.calcularRoteadores(form.value);
    const desktops = this.calcularDesktops(form.value);
    const notebooks = this.calcularNotebooks(form.value);

    this.total = (roteadores + desktops + notebooks).toFixed(2);
  }

  calcularRoteadores(orcamento: any) {
    let result = 1;

    if (orcamento.velocidade <= 300){
      result = 699.90;
    } else {
      result = 779.90;
    }

    const quantidadeDeRoteadores = this.obterQuantidadeDeRoteadores(orcamento.cobertura);
    return result * quantidadeDeRoteadores;

  }

  private obterQuantidadeDeRoteadores(cobertura: number) {
    return Math.ceil(cobertura / 300);
  }

  private calcularDesktops(orcamento: any) {
    let result = 1;

    if (orcamento.velocidade <= 300){
      result = 189.90;
    } else {
      result = 219.90;
    }

    return (result + this.calcularTaxaInstalacao()) * orcamento.desktops;
  }

  private calcularNotebooks(form: any) {
    const result = 259.90 + this.calcularTaxaInstalacao();
    return result * form.notebooks;
  }

  private calcularTaxaInstalacao(){
    return 99.9;
  }
}
