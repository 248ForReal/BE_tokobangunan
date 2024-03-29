# Backend TOKO BANGUNAN

**Catatan:** Harap memberi tahu saya sebelum melakukan push.

## API SPEC



### ADMIN

## users

 `api/v1/users`

- `GET /users`
  - Deskripsi: Mendapatkan daftar pengguna.
- `GET /users/:id`
  - Deskripsi: Mendapatkan informasi tentang pengguna dengan ID tertentu.
- `POST /users`
  - Deskripsi: Membuat pengguna baru.
- `PATCH /users/:id`
  - Deskripsi: Memperbarui informasi pengguna dengan ID tertentu.
- `DELETE /users/:id`
  - Deskripsi: Menghapus pengguna dengan ID tertentu.

## barang
 
`api/v1/barang`

- `GET /barang`
  - Deskripsi: Mendapatkan daftar barang.
- `GET /barang/:id`
  - Deskripsi: Mendapatkan informasi tentang barang dengan ID tertentu.
- `POST /barang`
  - Deskripsi: Membuat barang baru.
- `PATCH /barang/:id`
  - Deskripsi: Memperbarui informasi barang dengan ID tertentu.
- `DELETE /barang/:id`
  - Deskripsi: Menghapus barang dengan ID tertentu.


## kategori

 `api/v1/kategori`

- `GET /kategori`
  - Deskripsi: Mendapatkan daftar Kategori barang.
- `GET /kategori/:id`
  - Deskripsi: Mendapatkan informasi tentang kategori barang dengan ID tertentu.
- `POST /kategori`
  - Deskripsi: Membuat kategori barang baru.
- `PATCH /kategori/:id`
  - Deskripsi: Memperbarui informasi kategori barang dengan ID tertentu.
- `DELETE /kategori/:id`
  - Deskripsi: Menghapus kategori barang dengan ID tertentu.

## Transaksi

 `api/v1/transaction`

- `POST /transaction/jual`
  - Deskripsi: Memmbuat transaksi di kasir ketika penjualan barang.
  - Contoh inputan :
          {
            "total_belanja": 80700,
            "jumlah_dibayarkan": 100000,
            "kembalian": 19300,
            "items": [
                {
                    "id": 6,
                    "nama_barang": "Plat Panasonic 1L",
                    "quantity": 1,
                    "harga_modal": 9000,
                    "harga_per_barang": 11700,
                    "total_harga": 11700
                },
                {
                    "id": 9,
                    "nama_barang": "Kran Angsa CAB",
                    "quantity": 1,
                    "harga_modal": 30000,
                    "harga_per_barang": 39000,
                    "total_harga": 39000
                }
            ]
        }
  
  wajib di bawa harga_modal agar dapat menghitung jumlah seluruh modal per transsaksi
  
  -Output :
                {
            "message": "Transaksi berhasil",
            "transaction": {
                "id_transaksi": "T2024-02-23001",
                "total_belanja": 80700,
                "jumlah_dibayarkan": 100000,
                "kembalian": 19300,
                "items": [
                    {
                        "jumlah_modal_keseluruhan": 39000
                    },
                    {
                        "id": 6,
                        "nama_barang": "Plat Panasonic 1L",
                        "quantity": 1,
                        "harga_modal": 9000,
                        "harga_per_barang": 11700,
                        "total_harga": 11700,
                        "jumlah_modal": 9000
                    },
                    {
                        "id": 9,
                        "nama_barang": "Kran Angsa CAB",
                        "quantity": 1,
                        "harga_modal": 30000,
                        "harga_per_barang": 39000,
                        "total_harga": 39000,
                        "jumlah_modal": 30000
                    }
                ],
                "nama_admin": "admin"
            },
            "kembalian": 19300
        }

- `POST /transaction/beli`
  - Deskripsi: Membuat transaksi pembelian stok barang maka dari itu saat membuat harap tidak perlu input stok barang.
  
  - Inputan:
              {
              "total_belanja": 216000,
              "jumlah_dibayarkan": 250000,
              "kembalian": 34000,
              "items": [
                  { "id": 6,
                  "quantity": 4, 
                  "harga_modal": 9000,
                  "nama_barang": "Plat Panasonic 1L", 
                  "total_harga": 36000 
                  },
                  { "id": 9,
                  "quantity": 6, 
                  "harga_modal": 30000, 
                  "nama_barang": "Kran Angsa CAB",
                  "total_harga": 180000 
                  }
              ]
          }

  - output :
        {
          "message": "Transaksi berhasil",
          "transaction": {
              "total_belanja": 216000,
              "jumlah_dibayarkan": 250000,
              "kembalian": 34000,
              "items": [
                  {
                      "id": 6,
                      "quantity": 4,
                      "harga_modal": 9000,
                      "nama_barang": "Plat Panasonic 1L",
                      "total_harga": 36000
                  },
                  {
                      "id": 9,
                      "quantity": 6,
                      "harga_modal": 30000,
                      "nama_barang": "Kran Angsa CAB",
                      "total_harga": 180000
                  }
              ],
              "nama_admin": "admin"
          },
          "kembalian": 34000
      }


## LAPORAN PENJUALAN dan PEMBELIAN

 `api/v1/penjualan`

- `GET /penjualan`
  - Deskripsi: Mendapatkan daftar seluruh transaksi.
- `GET /penjualan/:id`
  - Deskripsi: Mendapatkan informasi tentang transaksi penjualan barang dengan ID tertentu.
- `GET /penjualan/hari`
  - Deskripsi: Mendapatkan informasi tentang transaksi penjualan barang dengan di Hari itu.
- `GET /penjualan/minggu`
  - Deskripsi: Mendapatkan informasi tentang transaksi penjualan barang dengan di Minggu itu.
- `GET /penjualan/bulan`
  - Deskripsi: Mendapatkan informasi tentang transaksi penjualan barang dengan di Bulan itu.

- `OUTPUT YANG DIDAPATKAN JIKA GET PENJUALAN HARI ,MINGGU ,BULAN`
          `{
              "message": "Data transaksi hari ini",
              "totalTransaksi": 1,
              "totalDibayarkan": 80700,
              "totalItemTerjual": 2,
              "totalModal": 39000,
              "keuntunganHarian": 41700,
              "persentaseKeuntungan": "1.07",
              "transaksiHariIni": [
                  {
                      "id": 7,
                      "id_transaksi": "T2024-02-23001",
                      "total_belanja": 80700,
                      "jumlah_dibayarkan": 100000,
                      "kembalian": 19300,
                      "items": [
                          {
                              "jumlah_modal_keseluruhan": 39000
                          },
                          {
                              "id": 6,
                              "quantity": 1,
                              "harga_modal": 9000,
                              "nama_barang": "Plat Panasonic 1L",
                              "total_harga": 11700,
                              "jumlah_modal": 9000,
                              "harga_per_barang": 11700
                          },
                          {
                              "id": 9,
                              "quantity": 1,
                              "harga_modal": 30000,
                              "nama_barang": "Kran Angsa CAB",
                              "total_harga": 39000,
                              "jumlah_modal": 30000,
                              "harga_per_barang": 39000
                          }
                      ],
                      "nama_admin": "admin",
                      "createdAt": "2024-02-23T08:53:17.000Z",
                      "updatedAt": "2024-02-23T08:53:17.000Z"
                  }
              ]
          }

      `NOTE : ini inputan nya ngasal bukan berarti bodoh matematika`

  
- `POST /penjualan/laporan`
  - Deskripsi: Mengambil transaksi yang nanti nya jadi execl req tanggal berapa sampai tanggal berapa.
  - inputan :
              {
                "startDate": "2024-02-20",
                "endDate": "2024-02-23"
              }




   `api/v1/pembelian`

- `GET /pembelian`
  - Deskripsi: Mendapatkan daftar seluruh transaksi.
- `GET /pembelian/:id`
  - Deskripsi: Mendapatkan informasi tentang transaksi pembelian barang dengan ID tertentu.
- `GET /pembelian/detail/hari`
  - Deskripsi: Mendapatkan informasi tentang transaksi pembelian barang dengan di Hari itu.
- `GET /pembelian/detail/hari`
  - Deskripsi: Mendapatkan informasi tentang transaksi pembelian barang dengan di Minggu itu.
- `GET /pembelian/detail/hari`
  - Deskripsi: Mendapatkan informasi tentang transaksi pembelian barang dengan di Bulan itu.


- `OUTPUT YANG DIDAPATKAN JIKA GET PEMBELIAN HARI ,MINGGU ,BULAN`

          {
              "message": "Data pembelian hari ini",
              "totalHarian": 716000,
              "jumlahTransaksi": 2,
              "transaksiHarian": [
                  {
                      "id": 9,
                      "total_belanja": 216000,
                      "kembalian": 34000,
                      "items": [
                          {
                              "id": 6,
                              "quantity": 4,
                              "harga_modal": 9000,
                              "nama_barang": "Plat Panasonic 1L",
                              "total_harga": 36000
                          },
                          {
                              "id": 9,
                              "quantity": 6,
                              "harga_modal": 30000,
                              "nama_barang": "Kran Angsa CAB",
                              "total_harga": 180000
                          }
                      ],
                      "nama_admin": "admin",
                      "createdAt": "2024-02-23T09:00:56.000Z",
                      "updatedAt": "2024-02-23T09:00:56.000Z"
                  },
                  {
                      "id": 8,
                      "total_belanja": 500000,
                      "kembalian": 100000,
                      "items": [
                          {
                              "id": 6,
                              "quantity": 4,
                              "harga_modal": 9000,
                              "nama_barang": "Plat Panasonic 1L",
                              "total_harga": 36000
                          },
                          {
                              "id": 9,
                              "quantity": 6,
                              "harga_modal": 30000,
                              "nama_barang": "Kran Angsa CAB",
                              "total_harga": 180000
                          }
                      ],
                      "nama_admin": "admin",
                      "createdAt": "2024-02-23T06:49:32.000Z",
                      "updatedAt": "2024-02-23T06:49:32.000Z"
                  }
              ]
          }

- `POST /pembelian/detail/laporan`    
  - Deskripsi: Mengambil transaksi yang nanti nya jadi execl req tanggal berapa sampai tanggal berapa.
  - inputan :
              {
                "startDate": "2024-02-20",
                "endDate": "2024-02-23"
              }


- `PUT /penjualan/return/:id` 
  - Deskripsi: pengembalian barang atau bisa juga edit transaksi bisa ngilangin ngurangin nambahin (barang).
  - inputan :
          {
            "total_belanja": 101400,
            "jumlah_dibayarkan": 105000,
            "kembalian": 3600,
            "items": [
                {
                    "id": 6,
                    "nama_barang": "Plat Panasonic 1L",
                    "quantity": 2,
                    "harga_modal": 9000,
                    "harga_per_barang": 11700,
                    "total_harga": 11700
                },
                {
                    "id": 9,
                    "nama_barang": "Kran Angsa CAB",
                    "quantity": 2,
                    "harga_modal": 30000,
                    "harga_per_barang": 39000,
                    "total_harga": 39000
                }
            ]
        }

  - Output :
        {
    "message": "Transaksi berhasil diperbarui",
    "transaction": {
        "id": 7,
        "id_transaksi": "T2024-02-23001",
        "total_belanja": 101400,
        "jumlah_dibayarkan": 105000,
        "kembalian": 3600,
        "items": [
            {
                "jumlah_modal_keseluruhan": 78000
            },
            {
                "id": 6,
                "nama_barang": "Plat Panasonic 1L",
                "quantity": 2,
                "harga_modal": 9000,
                "harga_per_barang": 11700,
                "total_harga": 11700,
                "jumlah_modal": 18000
            },
            {
                "id": 9,
                "nama_barang": "Kran Angsa CAB",
                "quantity": 2,
                "harga_modal": 30000,
                "harga_per_barang": 39000,
                "total_harga": 39000,
                "jumlah_modal": 60000
            }
        ],
        "nama_admin": "admin",
        "createdAt": "2024-02-23T08:53:17.000Z",
        "updatedAt": "2024-02-23T09:35:16.641Z"
    }
}
  


 `DELETE /refund/:id`
  - Deskripsi: Menghapus transaksi dan mengembalikan barang ke stok dengan ID tertentu.


### KASIR

## Transaksi

 `api/v1/transaction`

- `POST /transaction/jual`
  - Deskripsi: Memmbuat transaksi di kasir ketika penjualan barang.
  - Contoh inputan :
          {
            "total_belanja": 80700,
            "jumlah_dibayarkan": 100000,
            "kembalian": 19300,
            "items": [
                {
                    "id": 6,
                    "nama_barang": "Plat Panasonic 1L",
                    "quantity": 1,
                    "harga_modal": 9000,
                    "harga_per_barang": 11700,
                    "total_harga": 11700
                },
                {
                    "id": 9,
                    "nama_barang": "Kran Angsa CAB",
                    "quantity": 1,
                    "harga_modal": 30000,
                    "harga_per_barang": 39000,
                    "total_harga": 39000
                }
            ]
        }
  
  wajib di bawa harga_modal agar dapat menghitung jumlah seluruh modal per transsaksi
  
  -Output :
                {
            "message": "Transaksi berhasil",
            "transaction": {
                "id_transaksi": "T2024-02-23001",
                "total_belanja": 80700,
                "jumlah_dibayarkan": 100000,
                "kembalian": 19300,
                "items": [
                    {
                        "jumlah_modal_keseluruhan": 39000
                    },
                    {
                        "id": 6,
                        "nama_barang": "Plat Panasonic 1L",
                        "quantity": 1,
                        "harga_modal": 9000,
                        "harga_per_barang": 11700,
                        "total_harga": 11700,
                        "jumlah_modal": 9000
                    },
                    {
                        "id": 9,
                        "nama_barang": "Kran Angsa CAB",
                        "quantity": 1,
                        "harga_modal": 30000,
                        "harga_per_barang": 39000,
                        "total_harga": 39000,
                        "jumlah_modal": 30000
                    }
                ],
                "nama_admin": "admin"
            },
            "kembalian": 19300
        }



### AUTH

- `GET /me`
  - Deskripsi: Mendapatkan informasi tentang pengguna yang saat ini sedang masuk.
- `POST /signin`
  - Deskripsi: Masuk ke sistem.
- `DELETE /signout`
  - Deskripsi: Keluar dari sistem.
