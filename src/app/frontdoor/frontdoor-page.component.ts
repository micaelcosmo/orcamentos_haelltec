import {Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {OrcamentoService} from '../api/orcamento.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'frontdoor-page.component.html',
  styleUrls: ['frontdoor-page.component.scss']
})
export class FrontdoorPage  implements OnInit {

  orcamento: FormGroup;
  public total = '0';
  public emailToggle = false;

  constructor( private formBuilder: FormBuilder, private orcamentoService: OrcamentoService) {}

  ngOnInit(){
    this.orcamento = this.formBuilder.group({
      notebooks: [0, Validators.required],
      desktops: [0, Validators.required],
      velocidade: [0, Validators.required],
      cobertura: [0, Validators.required],
      email: ['', Validators.email],

    });
  }

  calcular(form){
    const roteadores = this.calcularRoteadores(form.value);
    const desktops = this.calcularDesktops(form.value);
    const notebooks = this.calcularNotebooks(form.value);

    this.total = (roteadores + desktops + notebooks).toFixed(2);
    this.emailToggle = true;
  }

  enviar(orcamento: any){
    this.orcamentoService.enviarEmail(orcamento.value).subscribe(response => {
      console.log('comuniquei com backend?');
    });
    // TODO redirecionar o cliente pra outro lugar, ou dar algum feedback que o email enviou etc
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
