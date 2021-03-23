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
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DetallesComponent } from './clientes/detalles/detalles.component';
import { LoginComponent } from './auth/login/login.component';
import { TokenInterceptor } from './auth/interceptors/token.interceptor';
import { AuthInterceptor } from './auth/interceptors/auth.interceptor';
import { DetalleFacturaComponent } from './facturas/detalle-factura.component';
import { FacturasComponent } from './facturas/facturas.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';




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
    DetalleFacturaComponent,
    FacturasComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDatepickerModule, 
    MatMomentDateModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule
  ],
  providers: [
    ClienteService,
    { provide: LOCALE_ID, useValue: 'es-MX' },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
