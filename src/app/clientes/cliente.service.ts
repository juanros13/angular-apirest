import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
//import { CLIENTES } from './clientes.json';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { DatePipe, formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private urlEndPoint: string = 'http://localhost:8080/api/clientes';

  private httpHeaders = new HttpHeaders({ 'Content-type': 'application/json' });

  constructor(private http: HttpClient, private router: Router) {}

  getClientes(page: number): Observable<Cliente[]> {
    //return of(CLIENTES);
    //return this.http.get<Cliente[]>(this.urlEndPoint);
    // return this.http.get(this.urlEndPoint).pipe(
    //     tap(response =>{
    //       let clientes = response as Cliente[];
    //       console.log('ClientesComponent: tap 1');
    //       clientes.forEach(cliente => {
    //         console.log(cliente.nombre);
    //       });
    //     }),
    //     map((response) => {
    //       let clientes = response as Cliente[];
    //       return clientes.map(cliente =>{
    //         cliente.nombre = cliente.nombre.toUpperCase();
    //         // cliente.createAt = formatDate(cliente.createAt, 'dd-MM-yyyy', 'en-US');
    //         let datePipe = new DatePipe('es-MX');
    //         //cliente.createAt = datePipe.transform(cliente.createAt, 'EEEE dd, MMMM yyyy')
    //         return cliente;
    //       });
    //     }),
    //     tap(response =>{
    //       console.log('ClientesComponent: tap 2');
    //       response.forEach(cliente => {
    //         console.log(cliente.nombre);
    //       });
    //     }),
    // )
    return this.http.get(this.urlEndPoint + '/page/' + page).pipe(
      tap((response: any) => {
        console.log('ClientesComponent: tap 1');
        (response.content as Cliente[]).forEach((cliente) => {
          console.log(cliente.nombre);
        });
      }),
      map((response: any) => {
        (response.content as Cliente[]).map((cliente) => {
          cliente.nombre = cliente.nombre.toUpperCase();
          // cliente.createAt = formatDate(cliente.createAt, 'dd-MM-yyyy', 'en-US');
          let datePipe = new DatePipe('es-MX');
          //cliente.createAt = datePipe.transform(cliente.createAt, 'EEEE dd, MMMM yyyy')
          return cliente;
        });
        return response;
      }),
      tap((response: any) => {
        console.log('ClientesComponent: tap 2');
        (response.content as Cliente[]).forEach((cliente) => {
          console.log(cliente.nombre);
        });
      })
    );
  }

  create(cliente: Cliente): Observable<Cliente> {
    //return this.http.post<Cliente>(this.urlEndPoint, cliente, {headers: this.httpHeaders})
    return this.http
      .post(this.urlEndPoint, cliente, { headers: this.httpHeaders })
      .pipe(
        map((response: any) => response.cliente as Cliente),
        catchError((e) => {
          if (e.status == 400) {
            return throwError(e);
          }
          this.router.navigate(['/clientes']);
          console.error(e.error.mensaje);
          Swal.fire(e.error.mensaje, e.error.error, 'error');
          return throwError(e);
        })
      );
  }

  getCliente(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
      catchError((e) => {
        if (e.status == 400) {
          return throwError(e);
        }
        this.router.navigate(['/clientes']);
        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }
  update(cliente: Cliente): Observable<any> {
    return this.http
      .put<any>(`${this.urlEndPoint}/${cliente.id}`, cliente, {
        headers: this.httpHeaders,
      })
      .pipe(
        catchError((e) => {
          this.router.navigate(['/clientes']);
          console.error(e.error.mensaje);
          Swal.fire(e.error.mensaje, e.error.error, 'error');
          return throwError(e);
        })
      );
  }
  delete(id: number): Observable<Cliente> {
    return this.http
      .delete<Cliente>(`${this.urlEndPoint}/${id}`, {
        headers: this.httpHeaders,
      })
      .pipe(
        catchError((e) => {
          this.router.navigate(['/clientes']);
          console.error(e.error.mensaje);
          Swal.fire(e.error.mensaje, e.error.error, 'error');
          return throwError(e);
        })
      );
  }
  subirFoto(archivo: File, id): Observable<HttpEvent<{}>> {
    let formData = new FormData();
    formData.append('archivo', archivo);
    formData.append('id', id);
    const req = new HttpRequest('POST', `${this.urlEndPoint}/upload`, formData,  {
      reportProgress: true
    });
    return this.http.request(req);
  }
}
