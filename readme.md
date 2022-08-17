## Database
nama Database : gr8stayDB

## Routes


| Method | Route                   | Description                                                                      |
| :----- | :---------              | :------------------------------------------------------------------------------- |
| GET    | /                       | Menampilkan landing page                                                         |
| GET    | /signin                 | Menampilkan halaman login                                                        |
| POST   | /signin                 | Melakukan login                                                                  |
| GET    | /register               | Menampilkan form untuk registrasi                                                |
| POST   | /register               | Menambahkan data user ke database                                                |
| GET    | /hotels                 | Menampilkan seluruh hotel yang ada di database                                   |
| GET    | /hotels/:IdHotel/book   | Menampilkan detail hotel berdasarkan id dan form untuk data guest                |
| POST   | /hotels/:IdHotel/book   | Menambahkan hotel ke orders                                                      |