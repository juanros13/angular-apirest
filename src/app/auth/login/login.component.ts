import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../auth.service';
import { Usuario } from '../usuario';


Router
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  titulo: String = 'Iniciar sesión';
  usuario:Usuario;

  constructor(
    private authService:AuthService, 
    private router: Router
  ) { 
    this.usuario = new Usuario();
  }

  ngOnInit(): void {
    if(this.authService.isAuthenticated()){
      Swal.fire('Login', `Hola ${ this.authService.usuario.username } ya estas autenticado`, 'info'); 
      this.router.navigate(['/clientes']);
    }
  }

  login():void {
    console.log(this.usuario);
    if(this.usuario.username == null || this.usuario.password == null){
      Swal.fire('Error Login', 'Username o password vacios', 'error'); 
      return;
    }
    this.authService.login(this.usuario).subscribe(response =>{
      // console.log(response);
      // let objetoPayload = JSON.parse(atob(response.access_token.split('.')[1]));


      this.authService.guardarUsuario(response.access_token);
      this.authService.guardarToken(response.access_token);

      let usuario = this.authService.usuario;

      //console.log(objetoPayload);
      this.router.navigate(['/clientes']);
      Swal.fire('Logn', `Hola ${ usuario.username }, has iniciado sesión con exito`, 'success');
    },err=>{
      if(err.status == 400){
        Swal.fire('Error Login', 'Username o password incorrectos', 'error'); 

      }
    });
  }

}
