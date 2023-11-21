export class JenisPendapatanModel {
    id: number;
    id_tempat_wisata: number;
    amount: number;
    jenis_pendapatan: {
            id: number,
            name: string;
            amount: any;
    };
    type: any;
}