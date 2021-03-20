import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public authService:AuthService, private router:Router) { }

  ngOnInit(): void {
  }

  logout():void {
    Swal.fire('Logout', `${ this.authService.usuario.username }, he cerrado sesión con exito`, 'success');
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

}
