import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Cliente } from './cliente';
// import { CLIENTES } from './clientes.json';
import { ClienteService } from './cliente.service';
import { ModalService } from './detalles/modal.service';
import { tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {


  clientes: Cliente[];
  paginador: any;
  clienteSeleccionado:Cliente;

  constructor(
    private clientesService:ClienteService, 
    private activatedRoute: ActivatedRoute, 
    private modalService: ModalService,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    
    this.activatedRoute.paramMap.subscribe(params =>{
      let page:number = +params.get('page');
      if(!page){
        page = 0;
      }
      this.clientesService.getClientes(page).pipe(
        tap((response: any) =>{
          console.log('ClientesComponent: tap 3');
          (response.content as Cliente[]).forEach(cliente =>{
            console.log(cliente.nombre)
          })
        })
      ).subscribe(response =>{
        this.clientes = response.content as Cliente[];
        this.paginador = response;
      });
    });
    this.modalService.notificarUpload.subscribe(cliente =>{
      this.clientes = this.clientes.map(clienteOriginal =>{
        if(clienteOriginal.id == cliente.id){
          clienteOriginal.foto = cliente.foto;
        }
        return clienteOriginal;
      })
    })
   
  }
  delete(cliente: Cliente):void {
    Swal.fire({
      title: 'Estas seguro?',
      text: `Seguro que deseas eliminar al cliente ${cliente.nombre} ${cliente.apellido}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminalo!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.clientesService.delete(cliente.id).subscribe(response => {
          this.clientes = this.clientes.filter(cli => cli !== cliente)
          Swal.fire(
            'Cliente eliminado!',
            `Cliente ${cliente.nombre}  eliminado con exito`,
            'success'
          )
        });
      }
    });
  }

  abrirModal(cliente:Cliente){
    this.clienteSeleccionado = cliente;
    this.modalService.abrirModal();
  }
}
