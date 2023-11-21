import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterDataRoutingModule } from './master-data-routing.module';
import { KendaraanComponent } from './kendaraan/kendaraan.component';
import { AcaraComponent } from './acara/acara.component';
import { RekanDukunganComponent } from './rekan-dukungan/rekan-dukungan.component';
import { ActionComponent } from './kendaraan/action/action.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActionComponentAcara } from './acara/action/action.component';
import { ActionComponentRekan } from './rekan-dukungan/action/action.component';
import { WisataMendatangComponent } from './wisata-mendatang/wisata-mendatang.component';
import { ActionMendatangComponent } from './wisata-mendatang/action-mendatang/action-mendatang.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ImagePreviewComponent } from './rekan-dukungan/image-preview/image-preview.component';
import { ImagePreviewAcaraComponent } from './acara/image-preview-acara/image-preview-acara.component';
import { ImagePreviewWisataComponent } from './wisata-mendatang/image-preview-wisata/image-preview-wisata.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { Select2Module } from 'ng-select2-component';
import { JenisPembayaranComponent } from './jenis-pembayaran/jenis-pembayaran.component';
import { ActionComponentPaymentMethod } from './jenis-pembayaran/action/action.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    KendaraanComponent,
    AcaraComponent,
    RekanDukunganComponent,
    ActionComponent,
    ActionComponentRekan,
    ActionComponentAcara,
    WisataMendatangComponent,
    ActionMendatangComponent,
    ImagePreviewComponent,
    ImagePreviewAcaraComponent,
    ImagePreviewWisataComponent,
    JenisPembayaranComponent,
    ActionComponentPaymentMethod
  ],
  imports: [
    CommonModule,
    MasterDataRoutingModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatTooltipModule,
    MatPaginatorModule,
    Select2Module,
    NgbModule
  ],
  exports:[
    FormsModule
  ]
})
export class MasterDataModule { }
