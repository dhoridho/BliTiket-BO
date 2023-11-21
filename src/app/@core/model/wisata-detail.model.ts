import { JenisPendapatanModel } from "./jenis-pendapatan.model";
import { LokasiModel } from "./lokasi.model";
import { TarifParkirModel } from "./tarif-parkir.model";
import { TarifTicketModel } from "./tarif-ticket.model";
import { ToiletModel } from "./toilet.model";

export class WisataDetailModel {
    id: number;
    nama_tempat_wisata: string;
    id_lokasi: number;
    created_at: string;
    updated_at: string;
    active: number;
    description: string;
    lokasi: LokasiModel;
    tarif_parkir: TarifParkirModel[] = [];
    hasil_pendapatan_usaha: JenisPendapatanModel[] = [];
    tarif_tiket: TarifTicketModel = new MockTarifTicket;
    toilet: ToiletModel;
}

export class MockTarifTicket {
    id = 0;
    id_tempat_wisata = 0;
    tarif_weekend = 0;
    tarif_weekday = 0;
    quota = 0;
}
export class MockToilet {
    id= 0;
    kode_toilet= '';
    id_tempat_wisata= 0;
    quota= 0;
    tarif= 0;
}


