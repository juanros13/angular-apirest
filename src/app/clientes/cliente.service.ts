import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
//import { CLIENTES } from './clientes.json';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { DatePipe, formatDate } from '@angular/common';
import { Region } from './region';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private urlEndPoint: string = 'http://nucleo.pro:8082/api/clientes';



  // private httpHeaders = new HttpHeaders({ 'Content-type': 'application/json' });

  // private isNoAutorizado(e):boolean {
  //   if(e.status == 401 ){

  //     if(this.authService.isAuthenticated()){
  //       this.authService.logout();
  //     }
  //     this.router.navigate(["/auth/login"]);
  //     return true;
  //   }
  //   if(e.status == 403){
  //     Swal.fire('Acceso denegado', `Hola ${ this.authService.usuario.username } no tienes acceso a este recurso`, 'warning');
  //     this.router.navigate(["/clientes"]);
  //     return true;
  //   }
  //   return false;
    
  // }

  constructor(private http: HttpClient, private router: Router) {}

  // private agregarAuthorizationHeader(){
  //   let token = this.authService.token;
  //   if(token != null){
  //     return this.httpHeaders.append('Authorization','Bearer ' + token)
  //   }else{
  //     return this.httpHeaders;
  //   }
  // }

  getRegiones(): Observable<Region[]>{
    //return this.http.get<Region[]>(this.urlEndPoint + '/regiones', {headers: this.agregarAuthorizationHeader()}).pipe(
    // return this.http.get<Region[]>(this.urlEndPoint + '/regiones').pipe(
    //   catchError(e =>{
    //     this.isNoAutorizado(e);
    //     return throwError(e);
    //   })
    // );
    return this.http.get<Region[]>(this.urlEndPoint + '/regiones');
  }

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
      .post(this.urlEndPoint, cliente)
      .pipe(
        map((response: any) => response.cliente as Cliente),
        catchError((e) => {

          // if(this.isNoAutorizado(e)){
          //   return throwError(e);
          // }
          if (e.status == 400) {
            return throwError(e);
          }
          if(e.error.mensaje) {
            console.log(e.error.mensaje);
          }
          this.router.navigate(['/clientes']);
          console.error(e.error.mensaje);
          return throwError(e);
        })
      );
  }

  getCliente(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
      catchError((e) => {
        
        // if(this.isNoAutorizado(e)){
        //   return throwError(e);
        // }
        if (e.status != 401 && e.error.mensaje) {
          this.router.navigate(['/clientes']);
          console.log(e.error.mensaje);
        }
        console.error(e.error.mensaje);
        return throwError(e);
      })
    );
  }
  update(cliente: Cliente): Observable<any> {
    return this.http
      .put<any>(`${this.urlEndPoint}/${cliente.id}`, cliente)
      .pipe(
        catchError((e) => {
          
          // if(this.isNoAutorizado(e)){
          //   return throwError(e);
          // }
          if (e.status == 400) {
            return throwError(e);
          }
          if(e.error.mensaje) {
            console.log(e.error.mensaje);
          }
          this.router.navigate(['/clientes']);
          console.error(e.error.mensaje);
          return throwError(e);
        })
      );
  }
  delete(id: number): Observable<Cliente> {
    return this.http
      .delete<Cliente>(`${this.urlEndPoint}/${id}`)
      .pipe(
        catchError((e) => {
          
          // if(this.isNoAutorizado(e)){
          //   return throwError(e);
          // }
          if (e.status == 400) {
            return throwError(e);
          }
          if(e.error.mensaje) {
            console.log(e.error.mensaje);
          }
          this.router.navigate(['/clientes']);
          console.error(e.error.mensaje);
          return throwError(e);
        })
      );
  }
  subirFoto(archivo: File, id): Observable<HttpEvent<{}>> {
    let formData = new FormData();
    formData.append('archivo', archivo);
    formData.append('id', id);
    // let httpHeaders = new HttpHeaders();
    // let token = this.authService.token;
    // if(token != null){
    //   httpHeaders = httpHeaders.append('Authorization', 'Bearer ' + token);
    // }
    const req = new HttpRequest('POST', `${this.urlEndPoint}/upload`, formData,  {
      reportProgress: true,
      //headers: httpHeaders
    });
    return this.http.request(req);
  }
}
