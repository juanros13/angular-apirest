import '@angular/common/locales/global/es-MX';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppComponent } from './app.component';
import { ClientesComponent } from './clientes/clientes.component';
import { ClienteService } from './clientes/cliente.service';
import { FormComponent } from './clientes/form.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { PaginatorComponent } from './shared/paginator/paginator.component';
import { DirectivaComponent } from './directiva/directiva.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { DetallesComponent } from './clientes/detalles/detalles.component';
import { LoginComponent } from './auth/login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    ClientesComponent,
    HeaderComponent,
    FooterComponent,
    DirectivaComponent,
    FormComponent,
    PaginatorComponent,
    DetallesComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDatepickerModule, 
    MatMomentDateModule
  ],
  providers: [
    ClienteService,
    {provide: LOCALE_ID, useValue: 'es-MX' },
    MatDatepickerModule,
    MatMomentDateModule  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
