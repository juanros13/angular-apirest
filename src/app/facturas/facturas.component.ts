import { Component, OnInit } from '@angular/core';
import { Factura } from './models/factura';
import { ClienteService } from '../clientes/cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { startWith, map, flatMap, mergeMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FacturaService } from './services/factura.service';
import { Producto } from './models/producto';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ItemFactura } from './models/item-factura';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html'
})
export class FacturasComponent implements OnInit {

  titulo: string = 'Nueva factura';
  factura: Factura = new Factura();

  autocompleteControl = new FormControl();
  productos: string[] = ['Mesa', 'Silla', 'Mantel'];
  productosFiltrados: Observable<Producto[]>;
  

  constructor(
    private clienteService:ClienteService,
    private activatedRoute: ActivatedRoute,
    private facturaService:FacturaService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params =>{
      let clienteId = +params.get('clienteId');
      this.clienteService.getCliente(clienteId).subscribe(cliente =>{
        this.factura.cliente = cliente;
      });
      this.productosFiltrados = this.autocompleteControl.valueChanges
        .pipe(
          //startWith(''),
          map(value =>typeof value === 'string'?value:value.nombre),
          mergeMap(value => value? this._filter(value):[])
      );
    })
  }


  private _filter(value: string): Observable<Producto[]> {
    const filterValue = value.toLowerCase();

    //return this.productos.filter(option => option.toLowerCase().includes(filterValue));
    return this.facturaService.filtrarProductos(filterValue);
  }
  mostrarNombre(producto?: Producto):string | undefined{
      return producto?producto.nombre:undefined;
  }
  seleccionarProducto(event: MatAutocompleteSelectedEvent):void{
    let producto = event.option.value as Producto;
    console.log(producto);
    if(this.existeItem(producto.id)){
      this.incrementaCantidad(producto.id);
    }else{
      let nuevoItem = new ItemFactura();
      nuevoItem.producto = producto;
      this.factura.items.push(nuevoItem);
      
    }
    this.autocompleteControl.setValue('');
    event.option.focus();
    event.option.deselect();
  }
  actualizarCantidad(id:number, event:any):void{
    let cantidad:number = event.target.value as number;
    if(cantidad == 0){
      return this.eliminarFactura(id);
    }
    this.factura.items = this.factura.items.map( (item:ItemFactura) =>{
      if(item.producto.id === id){
        item.cantidad = cantidad;
      }
      return item;
    });
  }
  existeItem(id:number):boolean{
    let existe = false;
    this.factura.items.forEach((item:ItemFactura)=>{
      if(id === item.producto.id){
        existe = true;
      }
    });
    return existe;

  }
  incrementaCantidad(id:number):void{
    this.factura.items = this.factura.items.map( (item:ItemFactura) =>{
      if(item.producto.id === id){
        ++item.cantidad;
      }
      return item;
    })
  }
  eliminarFactura(id:number):void{
    this.factura.items = this.factura.items.filter((item: ItemFactura) => id !== item.producto.id)

  }
  create(facturaForm):void{
    if(this.factura.items.length == 0){
      this.autocompleteControl.setErrors({'invalid':true});
    }
    if(facturaForm.form.valid  && this.factura.items.length > 0){
      this.facturaService.create(this.factura).subscribe(factura =>{
        console.log(factura);
        Swal.fire(this.titulo, `Factura ${ factura.descripcion } creada con exito`, 'success');
        this.router.navigate(['/facturas', factura.id]);
      })
    }
  }
}
