import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DirectivaComponent } from './directiva/directiva.component';
import { ClientesComponent } from './clientes/clientes.component';
import { FormComponent } from './clientes/form.component';
import { DetallesComponent } from './clientes/detalles/detalles.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { RoleGuard } from './auth/guards/role.guard';

const routes: Routes = [
    { path: '', redirectTo: '/clientes', pathMatch: 'full'},
    { path: 'directivas', component: DirectivaComponent },
    { path: 'clientes', component: ClientesComponent },
    { path: 'clientes/page/:page', component: ClientesComponent },
    { path: 'clientes/form', component: FormComponent, canActivate:[AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'} },
    { path: 'clientes/form/:id', component: FormComponent, canActivate:[AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'}  },
    { path: 'auth/login', component: LoginComponent },
    //{ path: 'clientes/detalle/:id', component: DetallesComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
