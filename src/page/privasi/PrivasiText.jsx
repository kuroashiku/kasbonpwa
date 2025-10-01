import { Fragment, useCallback, useContext, useEffect, useRef, useState } from "react";
import { getShift, checkIn, checkOut } from "../../api/Shift";
import { AppContext } from "../../AppContext";
import { Button, IconButton, List, ListItem, Navbar, Typography, Textarea } from "@material-tailwind/react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { ShiftListModel } from "../../model/shift";
import { useNavigate, useLocation } from "react-router-dom";
import LoadingOverlay from "../../lib/LoadingOverlay";
import { topic } from "../../constant/appTopics";
import InputMoney from "../../lib/InputMoney";
import { formatThousandSeparator } from "../../util/formatter";
import { dictionary } from "../../constant/appDictionary";
export default function PrivasiText() {
  const navigate = useNavigate();
  const { removeCookies, setPrivacy, setCookies} = useContext(AppContext);
  const Line = () => (
      <hr
          style={{
              color: "black",
              backgroundColor: "black",
              height: 2
          }}
      />
  );
  useEffect(() => {
    setCookies("lok_id", 0, {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 60)
    });
  }, []);
  function back() {
    window.location.href = "/";
    removeCookies("lok_id");
		removeCookies("com_id");
		removeCookies("kas_id");
		removeCookies("kas_nama");
		removeCookies("max_draft");
		removeCookies("scan_mode");
		removeCookies("max_piutang");
		removeCookies("auto_logout");
		removeCookies("lok_type");
		removeCookies("dp_0");
		removeCookies("time_now");
		removeCookies("resto_type");
		removeCookies("role_read");
		removeCookies("role_create");
		removeCookies("role_update");
		removeCookies("role_delete");
		removeCookies("role_dst");
		removeCookies("qris");
		removeCookies("role_nama");
		removeCookies("split_bill");
		removeCookies("join_bill");
		removeCookies("lok_id");
  }
  return (
    <Fragment>{
      
      <div className="WordSection1" style={{padding:"7px", textAlign:"justify"}}>
        <Button
          className={`bg-blue-500 mt-3 py-2 px-4 mb-5 h-[42px] text-sm text-black`}
          onClick={() => back()}
        >
          Back to Login
        </Button>
        <p className="MsoNormal" style={{
          marginTop:"0cm",
          marginRight:"0cm",
          marginBottom:"8.0px",
          marginLeft:"0cm",
          lineHeight:"115%",
          fontSize:"18px",
          fontFamily:"Calibri"}}>
          <b>Kebijakan Privasi</b>
        </p>
        <p className="MsoNormal" style={{
          marginTop:"0cm",
          marginRight:"0cm",
          marginBottom:"8.0px",
          marginLeft:"0cm",
          lineHeight:"115%",
          fontSize:"18px",
          fontFamily:"Calibri"}}>
          <b>kasbon.reendoo.com</b>
        </p>
        <p className="MsoNormal" style={{
          marginTop:"0cm",
          marginRight:"0cm",
          marginBottom:"8.0px",
          marginLeft:"0cm",
          lineHeight:"115%",
          fontSize:"18px",
          fontFamily:"Calibri"}}>
          <b>Versi: 1.0 | Tanggal Berlaku: 02 Juli 2025</b>
        </p>
        <p className="MsoNormal" style={{
          marginTop:"0cm",
          marginRight:"0cm",
          marginBottom:"8.0px",
          marginLeft:"0cm",
          lineHeight:"115%",
          fontSize:"18px",
          fontFamily:"Calibri"}}>PT ReenDoo Profeta Nusantara ("kami") menghargai dan melindungi privasi setiap pengguna aplikasi <b>kasbon.reendoo.com</b> ("Aplikasi"). Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, menyimpan, dan melindungi data pribadi Anda saat menggunakan layanan ini. </p>
        <div className="MsoNormal" style={{
          marginTop:"0cm",
          marginRight:"0cm",
          marginBottom:"8.0px",
          marginLeft:"0cm",
          lineHeight:"115%",
          fontSize:"18px",
          fontFamily:"Calibri",textAlign:"center"}} align="center">
          < Line/>
        </div>
        <div>

          <p className="MsoNormal" style={{
          marginTop:"0cm",
          marginRight:"0cm",
          marginBottom:"8.0px",
          marginLeft:"0cm",
          lineHeight:"115%",
          fontSize:"18px",
          fontFamily:"Calibri"}}>
            <b>1. Jenis Informasi yang Dikumpulkan</b>
          </p>
          <p className="MsoNormal" style={{
          marginTop:"0cm",
          marginRight:"0cm",
          marginBottom:"8.0px",
          marginLeft:"0cm",
          lineHeight:"115%",
          fontSize:"18px",
          fontFamily:"Calibri"}}>Kami dapat mengumpulkan informasi berikut:</p>
          <ul style={{marginTop:"0px"}} >
            <li className="MsoNormal" style={{
          marginTop:"0cm",
          marginRight:"0cm",
          marginBottom:"8.0px",
          marginLeft:"1cm",
          lineHeight:"115%",
          fontSize:"18px",
          fontFamily:"Calibri"}}>
              <b>Informasi Pengguna</b>: Nama, alamat email, nomor telepon, jabatan, dan departemen (jika diperlukan oleh sistem).
            </li>
            <li className="MsoNormal" style={{
          marginTop:"0cm",
          marginRight:"0cm",
          marginBottom:"8.0px",
          marginLeft:"1cm",
          lineHeight:"115%",
          fontSize:"18px",
          fontFamily:"Calibri"}}>
              <b>Informasi Transaksi</b>: Data KasBON, riwayat transaksi, nominal, dan tanggal.
            </li>
            <li className="MsoNormal" style={{
          marginTop:"0cm",
          marginRight:"0cm",
          marginBottom:"8.0px",
          marginLeft:"1cm",
          lineHeight:"115%",
          fontSize:"18px",
          fontFamily:"Calibri"}}>
              <b>Informasi Lokasi</b>: Jika diaktifkan, kami dapat mengakses lokasi perangkat untuk kebutuhan pelacakan penggunaan internal.
            </li>
            <li className="MsoNormal" style={{
          marginTop:"0cm",
          marginRight:"0cm",
          marginBottom:"8.0px",
          marginLeft:"1cm",
          lineHeight:"115%",
          fontSize:"18px",
          fontFamily:"Calibri"}}>
              <b>Informasi Teknis</b>: Alamat IP, jenis perangkat, sistem operasi, dan data penggunaan aplikasi.
            </li>
          </ul>
          <div className="MsoNormal" style={{
          marginTop:"0cm",
          marginRight:"0cm",
          marginBottom:"8.0px",
          marginLeft:"0cm",
          lineHeight:"115%",
          fontSize:"18px",
          fontFamily:"Calibri",textAlign:"center"}} align="center">
            <hr size="2" width="100%" align="center"/>
          </div>
        </div>
        <p className="MsoNormal" style={{
          marginTop:"0cm",
          marginRight:"0cm",
          marginBottom:"8.0px",
          marginLeft:"0cm",
          lineHeight:"115%",
          fontSize:"18px",
          fontFamily:"Calibri"}}>
            < Line/>
          <b>2. Tujuan Penggunaan Data</b>
        </p>
        <p className="MsoNormal" style={{
          marginTop:"0cm",
          marginRight:"0cm",
          marginBottom:"8.0px",
          marginLeft:"0cm",
          lineHeight:"115%",
          fontSize:"18px",
          fontFamily:"Calibri"}}>Data yang dikumpulkan digunakan untuk:</p>
        <ul style={{marginTop:"0px"}} type="disc">
          <li className="MsoNormal" style={{
          marginTop:"0cm",
          marginRight:"0cm",
          marginBottom:"8.0px",
          marginLeft:"1cm",
          lineHeight:"115%",
          fontSize:"18px",
          fontFamily:"Calibri"}}>Menyediakan dan meningkatkan layanan aplikasi KasBON;</li>
          <li className="MsoNormal" style={{
          marginTop:"0cm",
          marginRight:"0cm",
          marginBottom:"8.0px",
          marginLeft:"1cm",
          lineHeight:"115%",
          fontSize:"18px",
          fontFamily:"Calibri"}}>Memverifikasi identitas pengguna;</li>
          <li className="MsoNormal" style={{
          marginTop:"0cm",
          marginRight:"0cm",
          marginBottom:"8.0px",
          marginLeft:"1cm",
          lineHeight:"115%",
          fontSize:"18px",
          fontFamily:"Calibri"}}>Menampilkan data transaksi KasBON secara personal;</li>
          <li className="MsoNormal" style={{
          marginTop:"0cm",
          marginRight:"0cm",
          marginBottom:"8.0px",
          marginLeft:"1cm",
          lineHeight:"115%",
          fontSize:"18px",
          fontFamily:"Calibri"}}>Keperluan audit dan pelaporan keuangan internal;</li>
          <li className="MsoNormal" style={{
          marginTop:"0cm",
          marginRight:"0cm",
          marginBottom:"8.0px",
          marginLeft:"1cm",
          lineHeight:"115%",
          fontSize:"18px",
          fontFamily:"Calibri"}}>Kepatuhan terhadap peraturan perusahaan dan hukum yang berlaku.</li>
        </ul>
        <div className="MsoNormal" style={{
          marginTop:"0cm",
          marginRight:"0cm",
          marginBottom:"8.0px",
          marginLeft:"0cm",
          lineHeight:"115%",
          fontSize:"18px",
          fontFamily:"Calibri",textAlign:"center"}} align="center">
          <hr size="2" width="100%" align="center"/>
        </div>
        <p className="MsoNormal" style={{
          marginTop:"0cm",
          marginRight:"0cm",
          marginBottom:"8.0px",
          marginLeft:"0cm",
          lineHeight:"115%",
          fontSize:"18px",
          fontFamily:"Calibri"}}>
             < Line/>
          <b>3. Penyimpanan dan Keamanan Data</b>
        </p>
        <ul style={{marginTop:"0px"}} type="disc">
          <li className="MsoNormal" style={{
          marginTop:"0cm",
          marginRight:"0cm",
          marginBottom:"8.0px",
          marginLeft:"1cm",
          lineHeight:"115%",
          fontSize:"18px",
          fontFamily:"Calibri"}}>Data Anda disimpan di server yang aman di bawah pengelolaan internal PT ReenDoo Profeta Nusantara.</li>
          <li className="MsoNormal" style={{
          marginTop:"0cm",
          marginRight:"0cm",
          marginBottom:"8.0px",
          marginLeft:"1cm",
          lineHeight:"115%",
          fontSize:"18px",
          fontFamily:"Calibri"}}>Kami menggunakan enkripsi, pembatasan akses, dan kontrol keamanan lainnya untuk menjaga kerahasiaan dan integritas data.</li>
          <li className="MsoNormal" style={{
          marginTop:"0cm",
          marginRight:"0cm",
          marginBottom:"8.0px",
          marginLeft:"1cm",
          lineHeight:"115%",
          fontSize:"18px",
          fontFamily:"Calibri"}}>Data hanya diakses oleh pihak yang berwenang di lingkungan perusahaan.</li>
        </ul>
        <div className="MsoNormal" style={{
          marginTop:"0cm",
          marginRight:"0cm",
          marginBottom:"8.0px",
          marginLeft:"0cm",
          lineHeight:"115%",
          fontSize:"18px",
          fontFamily:"Calibri",textAlign:"center"}} align="center" >
          <hr size="2" width="100%" align="center"/>
        </div>
        <p className="MsoNormal" style={{
          marginTop:"0cm",
          marginRight:"0cm",
          marginBottom:"8.0px",
          marginLeft:"0cm",
          lineHeight:"115%",
          fontSize:"18px",
          fontFamily:"Calibri"}}>
             < Line/>
          <b>4. Pembagian Data kepada Pihak Ketiga</b>
        </p>
        <p className="MsoNormal" style={{
          marginTop:"0cm",
          marginRight:"0cm",
          marginBottom:"8.0px",
          marginLeft:"0cm",
          lineHeight:"115%",
          fontSize:"18px",
          fontFamily:"Calibri"}}>Kami <b>tidak membagikan</b> data pengguna kepada pihak ketiga, kecuali: </p>
        <ul style={{marginTop:"0px"}} type="disc">
          <li className="MsoNormal" style={{
          marginTop:"0cm",
          marginRight:"0cm",
          marginBottom:"8.0px",
          marginLeft:"1cm",
          lineHeight:"115%",
          fontSize:"18px",
          fontFamily:"Calibri"}}>Dengan izin pengguna secara tertulis;</li>
          <li className="MsoNormal" style={{
          marginTop:"0cm",
          marginRight:"0cm",
          marginBottom:"8.0px",
          marginLeft:"1cm",
          lineHeight:"115%",
          fontSize:"18px",
          fontFamily:"Calibri"}}>Diperlukan oleh hukum atau perintah pengadilan;</li>
          <li className="MsoNormal" style={{
          marginTop:"0cm",
          marginRight:"0cm",
          marginBottom:"8.0px",
          marginLeft:"1cm",
          lineHeight:"115%",
          fontSize:"18px",
          fontFamily:"Calibri"}}>Dalam konteks integrasi sistem internal perusahaan (misalnya akuntansi dan HRD) di bawah pengawasan yang sah.</li>
        </ul>
        <div className="MsoNormal" style={{
          marginTop:"0cm",
          marginRight:"0cm",
          marginBottom:"8.0px",
          marginLeft:"0cm",
          lineHeight:"115%",
          fontSize:"18px",
          fontFamily:"Calibri",textAlign:"center"}} align="center" >
          <hr size="2" width="100%" align="center"/>
        </div>
        <p className="MsoNormal" style={{
          marginTop:"0cm",
          marginRight:"0cm",
          marginBottom:"8.0px",
          marginLeft:"0cm",
          lineHeight:"115%",
          fontSize:"18px",
          fontFamily:"Calibri"}}>
             < Line/>
          <b>5. Hak Pengguna</b>
        </p>
        <p className="MsoNormal" style={{
          marginTop:"0cm",
          marginRight:"0cm",
          marginBottom:"8.0px",
          marginLeft:"0cm",
          lineHeight:"115%",
          fontSize:"18px",
          fontFamily:"Calibri"}}>Pengguna memiliki hak untuk:</p>
        <ul style={{marginTop:"0px"}} type="disc">
          <li className="MsoNormal" style={{
          marginTop:"0cm",
          marginRight:"0cm",
          marginBottom:"8.0px",
          marginLeft:"1cm",
          lineHeight:"115%",
          fontSize:"18px",
          fontFamily:"Calibri"}}>Mengakses dan memperbarui informasi pribadinya;</li>
          <li className="MsoNormal" style={{
          marginTop:"0cm",
          marginRight:"0cm",
          marginBottom:"8.0px",
          marginLeft:"1cm",
          lineHeight:"115%",
          fontSize:"18px",
          fontFamily:"Calibri"}}>Menghapus akun jika tidak lagi menggunakan aplikasi (dengan prosedur sesuai kebijakan internal);</li>
          <li className="MsoNormal" style={{
          marginTop:"0cm",
          marginRight:"0cm",
          marginBottom:"8.0px",
          marginLeft:"1cm",
          lineHeight:"115%",
          fontSize:"18px",
          fontFamily:"Calibri"}}>Mengajukan pertanyaan atau keluhan terkait data melalui kontak resmi kami.</li>
        </ul>
        <div className="MsoNormal" style={{
          marginTop:"0cm",
          marginRight:"0cm",
          marginBottom:"8.0px",
          marginLeft:"0cm",
          lineHeight:"115%",
          fontSize:"18px",
          fontFamily:"Calibri",textAlign:"center"}} align="center" >
          <hr size="2" width="100%" align="center"/>
        </div>
        <p className="MsoNormal" style={{
          marginTop:"0cm",
          marginRight:"0cm",
          marginBottom:"8.0px",
          marginLeft:"0cm",
          lineHeight:"115%",
          fontSize:"18px",
          fontFamily:"Calibri"}}>
             < Line/>
          <b>6. Perubahan Kebijakan</b>
        </p>
        <p className="MsoNormal" style={{
          marginTop:"0cm",
          marginRight:"0cm",
          marginBottom:"8.0px",
          marginLeft:"0cm",
          lineHeight:"115%",
          fontSize:"18px",
          fontFamily:"Calibri"}}>Kebijakan ini dapat diperbarui sewaktu-waktu. Setiap perubahan akan diumumkan melalui aplikasi atau email terdaftar pengguna.</p>
        <div className="MsoNormal" style={{
          marginTop:"0cm",
          marginRight:"0cm",
          marginBottom:"8.0px",
          marginLeft:"0cm",
          lineHeight:"115%",
          fontSize:"18px",
          fontFamily:"Calibri",textAlign:"center"}} align="center" >
          <hr size="2" width="100%" align="center"/>
        </div>
        <p className="MsoNormal" style={{
          marginTop:"0cm",
          marginRight:"0cm",
          marginBottom:"8.0px",
          marginLeft:"0cm",
          lineHeight:"115%",
          fontSize:"18px",
          fontFamily:"Calibri"}}>
             < Line/>
          <b>7. Kontak Kami</b>
        </p>
        <p className="MsoNormal" style={{
          marginTop:"0cm",
          marginRight:"0cm",
          marginBottom:"8.0px",
          marginLeft:"0cm",
          lineHeight:"115%",
          fontSize:"18px",
          fontFamily:"Calibri"}}>Jika ada pertanyaan terkait kebijakan privasi ini, silakan hubungi:</p>
        <p className="MsoNormal" style={{
          marginTop:"0cm",
          marginRight:"0cm",
          marginBottom:"8.0px",
          marginLeft:"0cm",
          lineHeight:"115%",
          fontSize:"18px",
          fontFamily:"Calibri"}}><b>PT ReenDoo Profeta Nusantara</b></p>
        <p className="MsoNormal" style={{
          marginTop:"0cm",
          marginRight:"0cm",
          marginBottom:"8.0px",
          marginLeft:"0cm",
          lineHeight:"115%",
          fontSize:"18px",
          fontFamily:"Calibri"}}>
          Email: marketing@reendoo.com
        </p>
        <p className="MsoNormal" style={{
          marginTop:"0cm",
          marginRight:"0cm",
          marginBottom:"8.0px",
          marginLeft:"0cm",
          lineHeight:"115%",
          fontSize:"18px",
          fontFamily:"Calibri"}}>
          Alamat: <a href="https://goo.gl/maps/kUr8qVGGy3a88ePk6" target="_blank">Lytech Industrial Park, Block C3, N0.5-6, Belian, Batam Kota, Batam - Indonesia, 29464</a>
        </p>
        <p className="MsoNormal" style={{
          marginTop:"0cm",
          marginRight:"0cm",
          marginBottom:"8.0px",
          marginLeft:"0cm",
          lineHeight:"115%",
          fontSize:"18px",
          fontFamily:"Calibri"}}>
          Website: <a href="https://kasbon.reendoo.com" target="_new">https://kasbon.reendoo.com</a>
        </p>
        <p className="MsoNormal" style={{
          marginTop:"0cm",
          marginRight:"0cm",
          marginBottom:"8.0px",
          marginLeft:"0cm",
          lineHeight:"115%",
          fontSize:"18px",
          fontFamily:"Calibri"}}>&nbsp;</p>
      </div>
      }
    </Fragment>
  );
}

