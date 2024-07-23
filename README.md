# Open Space - Next.js & TypeScript

Open Space adalah aplikasi diskusi di mana pengguna dapat membuat dan membalas "talks". Aplikasi ini dibuat menggunakan Next.js dan TypeScript.

## Fitur

- Autentikasi pengguna (Registrasi, Login, dan Logout)
- Membuat, melihat, dan membalas "talks"
- Notifikasi keberhasilan tindakan
- Responsif dan mudah digunakan

## Teknologi yang Digunakan

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [React](https://reactjs.org/)
- [React Toastify](https://fkhadra.github.io/react-toastify/)
- [js-cookie](https://github.com/js-cookie/js-cookie)

## Instalasi

1. Clone repositori ini

   ```bash
   git clone https://github.com/username/open-space-next-ts.git

   cd open-space-next-ts
   ```

2. Install dependencies

   ```bash
   npm install --force
   ```

3. Menjalankan eslint

   ```bash
   npm run lint
   ```

4. Melakukan format pada kode menggunakan prettier

   ```bash
   npm run format
   ```

5. Buat file `.env` dan isi dengan konfigurasi berikut

   ```env
   NEXT_PUBLIC_API=https://openspace-api.netlify.app/v1
   ```

6. Jalankan aplikasi

   ```bash
   npm run dev
   ```

7. Buka [http://localhost:3000](http://localhost:3000) di browser

## Struktur Direktori

- `components`: Komponen yang digunakan di halaman
- `layouts`: Layout untuk tiap halaman
- `pages`: Halaman yang sesuai dengan routing Next.js
- `utils`: Fungsi untuk melakukan request API
- `styles`: File CSS untuk styling aplikasi

## Kontribusi

1. Fork repositori ini
2. Buat branch fitur baru (`git checkout -b feature-branch`)
3. Commit perubahan yang telah dilakukan (`git commit -am 'Add new feature'`)
4. Push ke branch tersebut (`git push origin feature-branch`)
5. Buat pull request

## Lisensi

Distributed under the MIT License. See `LICENSE` for more information.

## Deploy

Aplikasi ini dideploy menggunakan [Vercel](https://vercel.com). Untuk mempelajari lebih lanjut tentang deploy aplikasi Next.js ke Vercel, silakan baca [Dokumentasi Resmi](https://nextjs.org/docs/deployment).

---

Demo Aplikasi : [Open Space](https://open-space-next-ts.netlify.app/)
