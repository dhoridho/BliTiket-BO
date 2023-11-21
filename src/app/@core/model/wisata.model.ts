import { LokasiDto } from "./lokasi.model";

export class WisataModel{
    id: number;
    nama_tempat_wisata: string;
    id_lokasi:number;
    lokasi?: LokasiDto;
    nama_lokasi:string;
    description: string;
    active: number;
}