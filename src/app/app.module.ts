import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NumberOnlyDirective } from './@core/directive/number-only.directive';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './auth-component/auth.interceptors';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import localeId from '@angular/common/locales/id'; 
import { registerLocaleData } from '@angular/common';
import { LoadingService } from './services/loading/loading.service';
import { LoadingInterceptor } from './@core/helper/interceptors/loading.interceptor';
import { MatNativeDateModule } from '@angular/material/core';
registerLocaleData(localeId, 'id'); 
@NgModule({
  declarations: [
    AppComponent,
    NumberOnlyDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    NgxSpinnerModule
  ],
  exports: [
    BrowserModule,
    HttpClientModule,
    NgxSpinnerModule
  ],
  providers: [
    LoadingService,
    {
      provide : HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi   : true
    },
    { provide: LOCALE_ID, useValue: 'id-ID' },
    {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
