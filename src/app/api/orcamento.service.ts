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


  public enviarEmail(orcamento): Observable<Orcamento> {
    console.log('enviei o email ', orcamento);
    return this.http.post<Orcamento>(this.url, orcamento, OrcamentoService.getOptions())
        .pipe(
            tap(
                _ => console.log(`atualizado orcamento`),
                catchError(this.handleError)
        ));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
          `Backend returned code ${error.status}, ` +
          `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
        'Something bad happened; please try again later.');
  }
}
