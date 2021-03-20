import { Component, Input, OnInit } from '@angular/core';
import { Cliente } from '../cliente';
import { ClienteService } from '../cliente.service';
import { ModalService } from './modal.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpEventType } from '@angular/common/http';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css']
})
export class DetallesComponent implements OnInit {

  @Input() cliente: Cliente;
  titulo: string = "Detalle del cliente";
  public imagenSeleccionada: File;
  public progreso: number = 0;

  constructor(
    private clienteService : ClienteService, 
    private activatedRoute : ActivatedRoute, 
    public modalService : ModalService,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    // this.activatedRoute.paramMap.subscribe(param => {
    //   let id:number = +param.get('id');
    //   if(id){
    //     this.clienteService.getCliente(id).subscribe(cliente => {
    //       this.cliente = cliente;
    //     });
    //   }
    // });
  }

  public seleccionarFoto(event){
    this.imagenSeleccionada = event.target.files[0];
    this.progreso = 0;
    console.log(this.imagenSeleccionada);
    if(this.imagenSeleccionada.type.indexOf('image') < 0){
      Swal.fire('Error seleccionar imagen','Debe seleccionar una imagen', 'error');
      this.imagenSeleccionada = null;
    }

  }

  subirFoto(){
    if(!this.imagenSeleccionada){
      Swal.fire('Error upload','Debe seleccionar una foto', 'error');
    }else{
      this.clienteService.subirFoto(this.imagenSeleccionada, this.cliente.id)
        .subscribe(event => {
          if(event.type === HttpEventType.UploadProgress){
            this.progreso = Math.round(100 * event.loaded / event.total);
          }else if (event.type === HttpEventType.Response ){
            let response: any = event.body
            this.cliente = response.cliente as Cliente;
            this.modalService.notificarUpload.emit(this.cliente);
            Swal.fire('La foto se ha subio correctamente!', response.mensaje, 'success');
          }
        });
    }
  }
  cerarModal(){
    this.imagenSeleccionada = null;
    this.progreso = 0;
    this.modalService.cerrarModal();
  }
}
