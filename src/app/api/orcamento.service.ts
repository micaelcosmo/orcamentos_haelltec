import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Orcamento } from '../model/orcamento';
import {catchError, tap} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class OrcamentoService {

  constructor(private http: HttpClient) { }
  url = 'https://lz8t36rcha.execute-api.sa-east-1.amazonaws.com/api/orcamento';

  private static getOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + btoa('SUBSTITUIR_API_KEY:SUUBSTITUIR_API_VALUE'),
      })
    };
  }


  public enviarEmail(orcamento): Observable<any> {
    return this.http.post<Orcamento>(this.url, orcamento, OrcamentoService.getOptions())
        .pipe(
            tap(
                _ => console.log(`orcamento solicitado`),
                _ => console.error('Ocorreu algum erro')
        ));
  }

  private handleError(error: HttpErrorResponse) {
    return error;
  }
}
