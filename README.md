# Panduan Penggunaan Aplikasi dengan Snack Expo dan Expo Lokal menggunakan EAS

Dokumentasi ini menjelaskan cara menggunakan aplikasi menggunakan **Snack Expo (online)** dan **Expo lokal dengan EAS (Expo Application Services)**. Kami akan membahas langkah-langkah penggunaan masing-masing metode, kelebihan dan kekurangan, serta referensi yang diperlukan.

## 1. Penggunaan Snack Expo (Online)

**Snack Expo** adalah platform berbasis web yang memungkinkan Anda untuk membuat, menguji, dan membagikan aplikasi Expo secara langsung melalui browser tanpa memerlukan setup lokal. Snack sangat cocok untuk prototyping dan pengembangan aplikasi dengan cepat.

### Langkah-langkah Penggunaan Snack Expo

1. **Akses Snack Expo**  
   - Kunjungi [Snack Expo](https://snack.expo.dev/).
   - Login menggunakan akun Expo Anda (atau buat akun baru).

2. **Membuat Proyek Baru**  
   - Klik tombol **"Create a New Snack"** atau pilih template yang sudah disediakan.
   - Anda akan dibawa ke editor di mana Anda bisa mulai menulis kode aplikasi menggunakan **JavaScript/TypeScript** dan **React Native**.

3. **Penggunaan Komponen dan Fitur**  
   - Snack mendukung berbagai komponen dan fitur dari Expo seperti `expo-splash-screen`, `expo-camera`, dan lain-lain.
   - Hasil kode akan otomatis ditampilkan di panel **"Preview"** yang ada di sebelah kanan editor.

4. **Melihat Hasil di Perangkat atau Emulator**  
   - Anda dapat menguji aplikasi di perangkat Android/iOS atau emulator menggunakan aplikasi **Expo Go**.
   - Cukup pindai QR code yang muncul di panel **"Preview"** menggunakan Expo Go.

5. **Berbagi Proyek**  
   - Setelah selesai, Anda bisa membagikan proyek Snack Anda dengan URL unik yang diberikan oleh platform.
   - URL ini dapat dibagikan ke orang lain untuk melihat atau mengeditnya.

### Kelebihan dan Kekurangan Snack Expo

| **Kelebihan** | **Kekurangan** |
| --- | --- |
| Tidak perlu setup perangkat lokal. | Terbatas untuk aplikasi kecil atau prototipe. |
| Prototyping cepat dan mudah. | Tidak cocok untuk aplikasi yang memerlukan build kustom. |
| Pembagian proyek yang mudah dengan URL. | Beberapa pustaka atau fitur mungkin terbatas. |

---

## 2. Penggunaan Expo Lokal dengan EAS (Expo Application Services)

**Expo lokal** memungkinkan Anda untuk mengembangkan aplikasi secara lokal, sementara **EAS** (Expo Application Services) memungkinkan Anda untuk membangun dan mengelola aplikasi secara cloud, termasuk untuk produksi.

### Langkah-langkah Penggunaan Expo Lokal dengan EAS

1. **Instalasi Expo CLI**
   Pastikan Anda telah menginstal **Expo CLI** secara global di mesin lokal:
   ```bash
   npm install -g expo-cli
