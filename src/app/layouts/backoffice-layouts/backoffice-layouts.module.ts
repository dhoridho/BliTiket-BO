import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackofficeLayoutsComponent } from './backoffice-layouts.component';
import { BackofficeLayoutsRoutingModule } from './backoffice-layouts-routing.model';
import { HeaderComponent } from 'src/app/inheritComponent/header/header.component';
import { SidebarComponent } from 'src/app/inheritComponent/sidebar/sidebar.component';
import { MatTooltipModule } from '@angular/material/tooltip';



@NgModule({
  declarations: [
    BackofficeLayoutsComponent,
    HeaderComponent,
    SidebarComponent 
  ],
  imports: [
    BackofficeLayoutsRoutingModule,
    CommonModule,
    MatTooltipModule
  ]
})
export class BackofficeLayoutsModule { }
