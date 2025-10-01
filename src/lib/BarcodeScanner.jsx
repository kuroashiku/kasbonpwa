import React, { useEffect } from 'react';
import { Html5Qrcode } from "html5-qrcode";

const BarcodeScanner = (props = {
  result: () => {},
}) => {
  useEffect(() => {
    const startScanning = async () => {
      const html5QrCode = new Html5Qrcode("reader");
      const config = { fps: 10, qrbox: 250 };

      try {
        const cameras = await Html5Qrcode.getCameras();
        if (cameras && cameras.length) {
          // Pilih kamera belakang jika tersedia
          const backCamera = cameras.find((camera) =>
            camera.label.toLowerCase().includes("back")
          ) || cameras[0];

          // Memulai pemindaian QR Code
          html5QrCode.start(
            backCamera.id,
            config,
            (decodedText, decodedResult) => {
              props.result(decodedText)
              // console.log(`Kode terdeteksi: ${decodedText}`);
              // alert(`Kode terdeteksi: ${decodedText}`);
              html5QrCode.clear();  // Berhenti setelah kode terdeteksi
            },
            // (error) => {
            //   console.warn(`Kesalahan: ${error}`);
            // }
          );
        } else {
          console.error("Kamera tidak ditemukan!");
        }
      } catch (err) {
        console.error("Gagal mengakses kamera:", err);
      }

      // Membersihkan scanner saat komponen di-unmount
      return () => {
        html5QrCode.stop().then(() => {
          console.log("Pemindaian dihentikan.");
        }).catch((err) => {
          console.error("Gagal menghentikan pemindaian:", err);
        });
      };
    };

    startScanning();
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>QR Code Scanner</h1>
      <div id="reader" style={{ width: "100%", maxWidth: "500px", margin: "auto" }}></div>
    </div>
  );
};

export default BarcodeScanner;