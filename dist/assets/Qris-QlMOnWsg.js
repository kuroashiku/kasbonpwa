import { r as reactExports, A as AppContext, j as jsxRuntimeExports, a as react } from "./index-CGEICd-f.js";
import { I as ImageUpload } from "./ImageUpload-DcGRcGeO.js";
import { u as updateLokasi } from "./Login-BX-Mfbo_.js";
import { B as Bars3Icon } from "./Bars3Icon-BPkb_aHs.js";
import "./imagekitio-react.esm-Dkgu7ZiT.js";
function Qris() {
  const { setMenuOpen, lang, cookies, setCookies } = reactExports.useContext(AppContext);
  const [image, setImage] = reactExports.useState("");
  const navbarRef = reactExports.useRef();
  const onError = () => {
    alert("Gagal Mengupload QRIS");
  };
  const onRemove = () => {
    setImage("");
  };
  const onSuccess = (url) => {
    const save = async () => {
      const { data, error } = await updateLokasi({ lok_prop: "lok_qris", lok_value: url, lok_id: cookies.lok_id });
      if (error) {
        alert("Data tidak ditemukan");
      } else {
        setCookies("qris", data);
      }
    };
    save();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-screen-adapt bg-gray-50 overflow-hidden relative", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "top-0 inset-x-0 fixed bg-gradient-to-b from-gray-50 h-20" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 top-0 inset-x-0 fixed z-50 mx-auto desktop:max-w-[60%]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Navbar, { ref: navbarRef, className: `pt-2 px-2 py-2 relative`, blurred: false, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(react.IconButton, { variant: "text", size: "md", onClick: () => setMenuOpen(true), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bars3Icon, { className: "h-6 w-6 stroke-2" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-2 flex-grow text-black font-semibold", children: "QRIS Saya" })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      ImageUpload,
      {
        image: cookies.qris,
        id: "upl-qris",
        widthClass: "w-img-upload",
        onSuccess,
        onRemove,
        onError
      }
    ) })
  ] });
}
export {
  Qris as default
};
