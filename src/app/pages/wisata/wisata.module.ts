import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WisataRoutingModule } from './wisata-routing.module';
import { WisataComponent } from './wisata.component';
import { ActionComponent } from './action/action.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditorWisataComponent } from './editor-wisata/editor-wisata.component';
import {MatTabsModule} from '@angular/material/tabs';
import { TarifParkirComponent } from './editor-wisata/tarif-parkir/tarif-parkir.component';
import { TarifTiketComponent } from './editor-wisata/tarif-tiket/tarif-tiket.component';
import { ToiletComponent } from './editor-wisata/toilet/toilet.component';
import { ActionComponentTarifParkir } from './editor-wisata/tarif-parkir/action/action.component';
import { UploadImageComponent } from './upload-image/upload-image.component';
import { ActionUploadComponent } from './upload-image/action-upload/action-upload.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule } from '@angular/material/paginator';
import { Select2Module } from 'ng-select2-component';
import { JenisPendapatanComponent } from './editor-wisata/jenis-pendapatan/jenis-pendapatan.component';
import { ActionPendapatanComponent } from './editor-wisata/jenis-pendapatan/action-pendapatan/action-pendapatan.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    WisataComponent,
    ActionComponent,
    EditorWisataComponent,
    TarifParkirComponent,
    TarifTiketComponent,
    ToiletComponent,
    ActionComponentTarifParkir,
    UploadImageComponent,
    ActionUploadComponent,
    JenisPendapatanComponent,
    ActionPendapatanComponent
  ],
  imports: [
    CommonModule,
    WisataRoutingModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatTooltipModule,
    MatPaginatorModule,
    Select2Module,
    NgbModule
  ]
})
export class WisataModule { }
