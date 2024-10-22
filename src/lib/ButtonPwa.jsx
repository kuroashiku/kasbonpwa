import React, { useEffect, useState } from "react";
import { Button, Dialog, DialogBody, DialogHeader, DialogFooter, IconButton, List, ListItem, Navbar,
  Typography, Input, Spinner,} from "@material-tailwind/react";

const InstallPWA = () => {
  const [supportsPWA, setSupportsPWA] = useState(false);
  const [promptInstall, setPromptInstall] = useState(null);
  const [open, setOpen] = useState(true);
  useEffect(() => {
    const handler = e => {
      e.preventDefault();
      setSupportsPWA(true);
      setPromptInstall(e);
    };
    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("transitionend", handler);
  }, []);

  const onClick = evt => {
    evt.preventDefault();
    if (!promptInstall) {
      return;
    }
    promptInstall.prompt();
  };
  if (!supportsPWA) {
    return null;
  }
  return (
    // <button
    //   className="link-button fixed top-24 left-4 p-4 bg-gray-500"
    //   id="setup_button"
    //   aria-label="Install app"
    //   title="Install app"
    //   onClick={onClick}
    // >
    //   Install
    // </button>
    <Dialog
        open={open}
        handler={() => setOpen(false)}
        size="sm"
      >
        <DialogHeader>Install PWA</DialogHeader>
        <DialogBody>
          
          <div className="mb-3">Terdeteksi device yang support PWA</div>
          
          <Button className="mb-2" fullWidth variant="gradient" color="teal" onClick={onClick}>
            Install PWA
          </Button>
          <Button className="mb-2" fullWidth variant="gradient" color="teal" onClick={() => setOpen(false)}>
            Lanjutkan ke aplikasi
          </Button>
        </DialogBody>
      </Dialog>
  );
};

export default InstallPWA;