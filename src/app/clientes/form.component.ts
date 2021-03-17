import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
  public cliente:Cliente = new Cliente();
  public titulo:string = "Crear cliente"
  public errores: string[]; 

  constructor(
      private clienteService: ClienteService, 
      private router: Router,
      private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.cargarCliente();
  }

  cargarCliente(): void{
    this.activatedRoute.params.subscribe(params =>{
      let id = params['id']
      if(id){
        this.clienteService.getCliente(id).subscribe((cliente) => this.cliente = cliente)
      }
    })
  }

  create(): void{
    // console.log('clicked');
    // console.log(this.cliente);
    this.clienteService.create(this.cliente).subscribe(cliente => {
        this.router.navigate(['/clientes'])
        Swal.fire('Nuevo cliente', `El cliente ${ cliente.nombre } ha sido creado con exito! `, 'success');
      },err =>{
        this.errores = err.error.errors as string[];
        console.error('Codigo de error desde el backend: ', err.status);
        console.error(err.error.errors);
      }
    )
  }

  update(): void{
    this.clienteService.update(this.cliente)
      .subscribe( response => {
        this.router.navigate(['/clientes'])
        Swal.fire('Cliente actualizado', `${ response.mensaje } - ${ response.cliente.nombre }`, 'success')
      },err =>{
        this.errores = err.error.errors as string[];
        console.error('Codigo de error desde el backend: ', err.status);
        console.error(err.error.errors);
      }
    )
  }
}
