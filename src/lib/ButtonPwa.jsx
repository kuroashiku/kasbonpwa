import React, { useEffect, useState } from "react";
import { Button, Dialog, DialogBody, DialogHeader } from "@material-tailwind/react";

const InstallPWA = () => {
  const [supportsPWA, setSupportsPWA] = useState(false);
  const [promptInstall, setPromptInstall] = useState(null);
  const [open, setOpen] = useState(true);
  const [isSafari, setIsSafari] = useState(false);

  useEffect(() => {
    // Deteksi Safari di iOS
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    const isSafariBrowser = /Safari/i.test(navigator.userAgent) && !/Chrome/i.test(navigator.userAgent);
    setIsSafari(isIOS && isSafariBrowser);

    // Event untuk Chrome dan browser berbasis Chromium lainnya
    const handler = (e) => {
      e.preventDefault();
      setSupportsPWA(true);
      setPromptInstall(e);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const onClick = (evt) => {
    evt.preventDefault();
    if (promptInstall) {
      promptInstall.prompt();
    }
  };

  if (!supportsPWA && !isSafari) {
    return null;
  }

  return (
    <Dialog open={open} handler={() => setOpen(false)} size="sm">
      <DialogHeader>Install PWA</DialogHeader>
      <DialogBody>
        {supportsPWA && (
          <>
            <div className="mb-3">Install App - Icon</div>
            <Button className="mb-2" fullWidth variant="gradient" color="teal" onClick={onClick}>
              Install As App/Icon
            </Button>
          </>
        )}
        {isSafari && (
          <>
            <div className="mb-3">
              Untuk menambahkan aplikasi ini ke layar utama Anda, tekan ikon Share (kotak dengan panah) di bawah, lalu
              pilih "Add to Home Screen".
            </div>
          </>
        )}
        <Button className="mb-2" fullWidth variant="gradient" color="teal" onClick={() => setOpen(false)}>
          No Install, login Web
        </Button>
      </DialogBody>
    </Dialog>
  );
};

export default InstallPWA;
