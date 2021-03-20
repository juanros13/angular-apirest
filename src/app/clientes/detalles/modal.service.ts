import { EventEmitter, Injectable } from '@angular/core';
import { Cliente } from '../cliente';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  modal: boolean = false;
  _notificarUpload = new EventEmitter<any>();

  constructor() { }

  get notificarUpload(): EventEmitter<any> {
    return this._notificarUpload;
  }

  abrirModal(){
    this.modal = true;
  }
  cerrarModal(){
    this.modal = false;
  }
  
}
