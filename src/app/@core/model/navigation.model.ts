export class NavigationModel {
    public navigation: any[];
    constructor() {
      this.navigation = [
        {
          id: 'dashboard',
          title: 'Dashboard',
          type: 'item',
          icon: 'bx bx-home-circle',
          url: '/dashboard'
        },
        // {
        //     id: 'retribusi',
        //     title: 'Retribusi',
        //     type: 'item',
        //     icon: 'bx bx-wallet',
        //     url: '/retribusi'
        // },
        // {
        //     id: 'pajakDaerah',
        //     title: 'Pajak Daerah',
        //     type: 'item',
        //     icon: 'bx bx-dollar',
        //     url: '/pajak-daerah'
        // },
        // {
        //     id: 'pbb',
        //     title: 'PBB',
        //     type: 'item',
        //     icon: 'bx bx-buildings',
        //     url: '/pbb'
        // },
        // {
        //     id: 'bphtb',
        //     title: 'BPHTB',
        //     type: 'item',
        //     icon: 'bx bx-map-alt',
        //     url: '/bphtb'
        // },
        {
          id: 'lokasi',
          title: 'Lokasi',
          type: 'item',
          icon: 'bx bx-location-plus',
          url: '/lokasi'
        },
        {
            id: 'hari-libur',
            title: 'Hari Libur',
            type: 'item',
            icon: 'bx bx-calendar',
            url: '/hari-libur'
        },
        {
            id: 'wisata',
            title: 'Wisata',
            type: 'item',
            icon: 'bx bx-map-alt',
            url: '/wisata'
        },
        {
            id: 'transaksi',
            title: 'Transaksi',
            type: 'item',
            icon: 'bx bx-money',
            url: '/transaksi'
        },
        {
          id: 'kepegawaian',
          title: 'Kepegawaian',
          type: 'group',
          icon: 'bx bx-user-pin',
          url: '/kepegawaian',
          children: [
            {
              id: 'petugas',
              title: 'Petugas',
              type: 'item',
              icon: 'bx bx-user',
              url: '/petugas'
            },
            {
              id: 'izinPetugas',
              title: 'Izin Petugas',
              type: 'item',
              icon: 'bx bx-user',
              url: '/izin-petugas'
            },
            {
              id: 'shiftTugas',
              title: 'Shift Tugas',
              type: 'item',
              icon: 'bx bx-user',
              url: '/shift-tugas'
            }
          ]
        },
        {
          id: 'master-data',
          title: 'Master Data',
          type: 'group',
          icon: 'bx bx-data',
          url: '/master-data',
          children: [
            {
              id: 'kendaraan',
              title: 'Kendaraan',
              type: 'item',
              icon: 'bx bx-user',
              url: '/kendaraan'
            },
            {
              id: 'acara',
              title: 'Acara',
              type: 'item',
              icon: 'bx bx-user',
              url: '/acara'
            },
            {
              id: 'rekan-dukungan',
              title: 'Rekan Dukungan',
              type: 'item',
              icon: 'bx bx-user',
              url: '/rekan-dukungan'
            },
            {
              id: 'jenis-pembayaraan',
              title: 'Jenis Pembayaran',
              type: 'item',
              icon: 'bx bx-user',
              url: '/jenis-pembayaran'
            }
          ]
        },
        {
          id: 'userManagement',
          title: 'Manajemen Pengguna',
          type: 'group',
          icon: 'bx bx-user',
          url: '/user-management',
          children: [
            {
              id: 'user',
              title: 'Pengguna',
              type: 'item',
              icon: 'bx bx-user',
              url: '/user'
            },
            {
              id: 'role',
              title: 'Hak Akses',
              type: 'item',
              icon: 'bx bx-user',
              url: '/role'
            },
            {
              id: 'menu',
              title: 'Menu',
              type: 'item',
              icon: 'bx bx-user',
              url: '/menu'
            }
          ]
        }
      ];
    }
}
