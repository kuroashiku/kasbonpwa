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
export default function TermOfService() {
  const navigate = useNavigate();
  const { removeCookies, setPrivacy} = useContext(AppContext);
  const Line = () => (
      <hr
          style={{
              color: "black",
              backgroundColor: "black",
              height: 2,
              marginTop:"5px",
              marginBottom:"5px"
          }}
      />
  );
  useEffect(() => {
    setPrivacy(true)
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
      <div style={{
          padding:"7px",
          marginTop:"0cm",
          marginRight:"0cm",
          marginBottom:"8.0px",
          marginLeft:"0cm",
          lineHeight:"115%",
          fontSize:"18px",
          fontFamily:"Calibri"}}>
            <Button
          className={`bg-blue-500 mt-3 py-2 px-4 mb-5 h-[42px] text-sm text-black`}
          onClick={() => back()}
        >
          Back to Login
        </Button>
        <p><b>Terms of Service - Kasbon Reendoo</b></p>

        <p>Selamat datang di Kasbon, software Point of Sale (POS) untuk usaha Anda. Dengan menggunakan aplikasi Kasbon, Anda setuju untuk mematuhi syarat dan ketentuan berikut:</p>
        <Line/>
        <p><b>1. Definisi</b></p>
        <p>Kasbon: Software POS yang kami sediakan untuk membantu pengelolaan transaksi, inventaris, dan laporan usaha Anda.</p>
        <p>Pengguna: Anda atau bisnis Anda yang memakai aplikasi Kasbon.</p>
        <Line/>
        <p><b>2. Akun Pengguna</b></p>
        <p>Anda wajib memberikan informasi yang akurat saat mendaftar.</p>

        <p>Anda bertanggung jawab menjaga kerahasiaan akun dan password Anda.</p>
        <Line/>
        <p><b>3. Penggunaan Layanan</b></p>
        <p>Anda hanya boleh menggunakan Kasbon untuk kegiatan yang sah sesuai hukum yang berlaku.</p>

        <p>Anda tidak boleh menggunakan layanan ini untuk penipuan atau aktivitas ilegal lainnya.</p>
        <Line/>
        <p><b>4. Hak Cipta & Kekayaan Intelektual</b></p>
        <p>Semua konten, kode, dan teknologi pada Kasbon adalah hak milik kami.</p>

        <p>Anda tidak diperbolehkan menyalin, memodifikasi, atau mendistribusikan layanan tanpa izin tertulis.</p>
        <Line/>
        <p><b>5. Pembayaran & Berlangganan</b></p>
        <p>Jika menggunakan versi berbayar, Anda wajib membayar biaya langganan sesuai paket yang dipilih.</p>

        <p>Kegagalan pembayaran dapat mengakibatkan penghentian akses ke layanan.</p>
        <Line/>
        <p><b>6. Privasi</b></p>
        <p>Data Anda akan kami kelola sesuai Kebijakan Privasi kami.</p>

        <p>Kami berkomitmen menjaga kerahasiaan data pengguna dan tidak akan menjual data kepada pihak ketiga tanpa izin.</p>
        <Line/>
        <p><b>7. Pembatasan Tanggung Jawab</b></p>
        <p>Kami tidak bertanggung jawab atas kerugian yang timbul akibat kesalahan penggunaan, kegagalan sistem, atau hal-hal di luar kendali kami.</p>

        <p>Layanan diberikan “apa adanya” tanpa jaminan apa pun.</p>
        <Line/>
        <p><b>8. Perubahan Syarat</b></p>
        <p>Kami dapat memperbarui syarat ini kapan saja.</p>

        <p>Perubahan akan diumumkan di website/aplikasi, dan penggunaan berkelanjutan berarti Anda menerima syarat yang telah diperbarui.</p>
        <Line/>
        <p><b>9. Hukum yang Berlaku</b></p>
        <p>Syarat ini diatur oleh hukum Negara Republik Indonesia.</p>
        <Line/>
        <p><b>10. Kontak</b></p>
        <p>Jika Anda memiliki pertanyaan, hubungi kami di admin@reendoo.net.</p>
      </div>
      }
    </Fragment>
  );
}

