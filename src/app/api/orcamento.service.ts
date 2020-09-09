import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrcamentoService {

  constructor() { }

  public enviarEmail(orcamento){
    console.log('enviei o email ' + orcamento.email);

    // injetar modulo http pra chamada rest
    // criar a API em PYTHON para receber a chamada do email
    //
  }
}
