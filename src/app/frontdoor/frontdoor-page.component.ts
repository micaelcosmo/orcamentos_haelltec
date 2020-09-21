import {Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {OrcamentoService} from '../api/orcamento.service';
import {AlertController} from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'frontdoor-page.component.html',
  styleUrls: ['frontdoor-page.component.scss']
})
export class FrontdoorPage  implements OnInit {

  constructor( private formBuilder: FormBuilder, private orcamentoService: OrcamentoService, private alertController: AlertController) {}

  orcamento: FormGroup;
  public total = '0';
  public emailToggle = false;

  private static obterQuantidadeDeRoteadores(cobertura: number) {
    return Math.ceil(cobertura / 300);
  }

  private static calcularTaxaInstalacao(){
    return 99.9;
  }

  private static calcularDesktops(orcamento: any) {
    let result: number;

    if (orcamento.velocidade <= 300){
      result = 189.90;
    } else {
      result = 219.90;
    }

    return (result + FrontdoorPage.calcularTaxaInstalacao()) * orcamento.desktops;
  }

  private static calcularNotebooks(form: any) {
    const result = 259.90 + FrontdoorPage.calcularTaxaInstalacao();
    return result * form.notebooks;
  }

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
    const desktops = FrontdoorPage.calcularDesktops(form.value);
    const notebooks = FrontdoorPage.calcularNotebooks(form.value);

    this.total = (roteadores + desktops + notebooks).toFixed(2);
    this.emailToggle = true;
  }

  enviar(orcamento: any){
    this.orcamentoService.enviarEmail(orcamento.value).subscribe(response => {
      if (response.ResponseMetadata.HTTPStatusCode === 200){
        this.mostrarConfimacaoUsuario();
      }
    }, error => {
      this.mostrarNegativaUsuario();
    });
  }

  calcularRoteadores(orcamento: any) {
    let result: number;

    if (orcamento.velocidade <= 300){
      result = 699.90;
    } else {
      result = 779.90;
    }

    const quantidadeDeRoteadores = FrontdoorPage.obterQuantidadeDeRoteadores(orcamento.cobertura);
    return result * quantidadeDeRoteadores;

  }

  validarSomenteNumero(event){
    const charCode = event.key;
    const digitosPermitidos = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'Backspace', 'Delete'];
    return digitosPermitidos.indexOf(charCode) > -1;
  }

  private async mostrarConfimacaoUsuario() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'PARABÉNS',
      subHeader: 'Orçamento solicitado com sucesso!',
      message: 'Em breve um dos nossos consultores entrará em contato.',
    });
    await alert.present();
  }

  private async mostrarNegativaUsuario() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Ah não!',
      subHeader: 'Sua solicitação não pode ser completada!',
      message: 'Por favor revise as informações e tente novamente.',
    });
    await alert.present();
  }
}
