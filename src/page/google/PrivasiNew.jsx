import { Fragment, useCallback, useContext, useEffect, useRef, useState } from "react";
import { getShift, checkIn, checkOut } from "../../api/Shift";
import { AppContext } from "../../AppContext";
import { Button, IconButton, List, ListItem, Navbar, Typography, Textarea } from "@material-tailwind/react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { ShiftListModel } from "../../model/shift";
import { useNavigate } from "react-router-dom";
import LoadingOverlay from "../../lib/LoadingOverlay";
import { topic } from "../../constant/appTopics";
import InputMoney from "../../lib/InputMoney";
import { formatThousandSeparator } from "../../util/formatter";
import { dictionary } from "../../constant/appDictionary";

export default function PrivasiNew() {

  return (
    <Fragment>{
      <div class="WordSection1">
        <p class="MsoNormal">
          <b>Kebijakan Privasi</b>
        </p>
        <p class="MsoNormal">
          <b>kasbon.reendoo.com</b>
        </p>
        <p class="MsoNormal">
          <b>Versi: 1.0 | Tanggal Berlaku: [tanggal saat ini]</b>
        </p>
        <p class="MsoNormal">PT ReenDoo Profeta Nusantara ("kami") menghargai dan melindungi privasi setiap pengguna aplikasi <b>kasbon.reendoo.com</b> ("Aplikasi"). Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, menyimpan, dan melindungi data pribadi Anda saat menggunakan layanan ini. </p>
        <div class="MsoNormal" align="center" style={{textAlign:"center"}}>
          <hr size="2" width="100%" align="center"/>
        </div>
        <p class="MsoNormal">
          <b>1. Jenis Informasi yang Dikumpulkan</b>
        </p>
        <p class="MsoNormal">Kami dapat mengumpulkan informasi berikut:</p>
        <ul style={{marginTop:"0px"}} type="disc">
          <li class="MsoNormal">
            <b>Informasi Pengguna</b>: Nama, alamat email, nomor telepon, jabatan, dan departemen (jika diperlukan oleh sistem).
          </li>
          <li class="MsoNormal">
            <b>Informasi Transaksi</b>: Data KasBON, riwayat transaksi, nominal, dan tanggal.
          </li>
          <li class="MsoNormal">
            <b>Informasi Lokasi</b>: Jika diaktifkan, kami dapat mengakses lokasi perangkat untuk kebutuhan pelacakan penggunaan internal.
          </li>
          <li class="MsoNormal">
            <b>Informasi Teknis</b>: Alamat IP, jenis perangkat, sistem operasi, dan data penggunaan aplikasi.
          </li>
        </ul>
        <div class="MsoNormal" align="center" style={{textAlign:"center"}}>
          <hr size="2" width="100%" align="center"/>
        </div>
        <p class="MsoNormal">
          <b>2. Tujuan Penggunaan Data</b>
        </p>
        <p class="MsoNormal">Data yang dikumpulkan digunakan untuk:</p>
        <ul style={{marginTop:"0px"}} type="disc">
          <li class="MsoNormal">Menyediakan dan meningkatkan layanan aplikasi KasBON;</li>
          <li class="MsoNormal">Memverifikasi identitas pengguna;</li>
          <li class="MsoNormal">Menampilkan data transaksi KasBON secara personal;</li>
          <li class="MsoNormal">Keperluan audit dan pelaporan keuangan internal;</li>
          <li class="MsoNormal">Kepatuhan terhadap peraturan perusahaan dan hukum yang berlaku.</li>
        </ul>
        <div class="MsoNormal" align="center" style={{textAlign:"center"}}>
          <hr size="2" width="100%" align="center"/>
        </div>
        <p class="MsoNormal">
          <b>3. Penyimpanan dan Keamanan Data</b>
        </p>
        <ul style={{marginTop:"0px"}} type="disc">
          <li class="MsoNormal">Data Anda disimpan di server yang aman di bawah pengelolaan internal PT ReenDoo Profeta Nusantara.</li>
          <li class="MsoNormal">Kami menggunakan enkripsi, pembatasan akses, dan kontrol keamanan lainnya untuk menjaga kerahasiaan dan integritas data.</li>
          <li class="MsoNormal">Data hanya diakses oleh pihak yang berwenang di lingkungan perusahaan.</li>
        </ul>
        <div class="MsoNormal" align="center" style={{textAlign:"center"}}>
          <hr size="2" width="100%" align="center"/>
        </div>
        <p class="MsoNormal">
          <b>4. Pembagian Data kepada Pihak Ketiga</b>
        </p>
        <p class="MsoNormal">Kami <b>tidak membagikan</b> data pengguna kepada pihak ketiga, kecuali: </p>
        <ul style={{marginTop:"0px"}} type="disc">
          <li class="MsoNormal">Dengan izin pengguna secara tertulis;</li>
          <li class="MsoNormal">Diperlukan oleh hukum atau perintah pengadilan;</li>
          <li class="MsoNormal">Dalam konteks integrasi sistem internal perusahaan (misalnya akuntansi dan HRD) di bawah pengawasan yang sah.</li>
        </ul>
        <div class="MsoNormal" align="center" style={{textAlign:"center"}}>
          <hr size="2" width="100%" align="center"/>
        </div>
        <p class="MsoNormal">
          <b>5. Hak Pengguna</b>
        </p>
        <p class="MsoNormal">Pengguna memiliki hak untuk:</p>
        <ul style={{marginTop:"0px"}} type="disc">
          <li class="MsoNormal">Mengakses dan memperbarui informasi pribadinya;</li>
          <li class="MsoNormal">Menghapus akun jika tidak lagi menggunakan aplikasi (dengan prosedur sesuai kebijakan internal);</li>
          <li class="MsoNormal">Mengajukan pertanyaan atau keluhan terkait data melalui kontak resmi kami.</li>
        </ul>
        <div class="MsoNormal" align="center" style={{textAlign:"center"}}>
          <hr size="2" width="100%" align="center"/>
        </div>
        <p class="MsoNormal">
          <b>6. Perubahan Kebijakan</b>
        </p>
        <p class="MsoNormal">Kebijakan ini dapat diperbarui sewaktu-waktu. Setiap perubahan akan diumumkan melalui aplikasi atau email terdaftar pengguna.</p>
        <div class="MsoNormal" align="center" style={{textAlign:"center"}}>
          <hr size="2" width="100%" align="center"/>
        </div>
        <p class="MsoNormal">
          <b>7. Kontak Kami</b>
        </p>
        <p class="MsoNormal">Jika ada pertanyaan terkait kebijakan privasi ini, silakan hubungi:</p>
        <p class="MsoNormal"><b>PT ReenDoo Profeta Nusantara</b></p>
        <p class="MsoNormal">
          Email: marketing@reendoo.com Alamat: <a href="https://goo.gl/maps/kUr8qVGGy3a88ePk6" target="_blank">Lytech Industrial Park, Block C3, N0.5-6, Belian, Batam Kota, Batam - Indonesia, 29464</a>
          Website: <a href="https://kasbon.reendoo.com" target="_new">https://kasbon.reendoo.com</a>
        </p>
        <p class="MsoNormal">&nbsp;</p>
      </div>
      }
    </Fragment>
  );
}

