import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HariLiburComponent } from './hari-libur.component';
import { HariLiburRouting } from './hari-libur-routing.module';
import { ActionComponent } from './action/action.component';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    HariLiburComponent,
    ActionComponent
  ],
  imports: [
    CommonModule,
    HariLiburRouting,
    MatDialogModule,
    FormsModule,
    MatTooltipModule,
    MatPaginatorModule,
    NgbModule
  ]
})
export class HariLiburModule { }
