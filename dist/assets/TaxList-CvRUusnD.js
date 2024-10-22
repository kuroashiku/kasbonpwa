import { r as reactExports, A as AppContext, u as useNavigate, t as topic, j as jsxRuntimeExports, L as LoadingOverlay, a as react, T as TIME_SEARCH_DEBOUNCE } from "./index-CGEICd-f.js";
import { T as TaxListModel, d as deleteTax, g as getTax, s as saveTax } from "./Tax-CfI0dIis.js";
import { I as InputSimple } from "./InputSimple-DmjIpoRq.js";
import { I as InputNumber } from "./InputNumber-BTyAPkzT.js";
import { B as Bars3Icon } from "./Bars3Icon-BPkb_aHs.js";
import { P as PencilSquareIcon } from "./PencilSquareIcon-BJtlfiFf.js";
import { P as PlusCircleIcon } from "./PlusCircleIcon-CFdoe21X.js";
import "./formatter-DQiSfF1K.js";
function TaxList() {
  const { setMenuOpen, cookies } = reactExports.useContext(AppContext);
  const [listPadding, setListPadding] = reactExports.useState("20px");
  const [loading, setLoading] = reactExports.useState(true);
  const [taxs, setTaxs] = reactExports.useState([TaxListModel()]);
  const [itemDisplay, setItemDisplay] = reactExports.useState(TaxListModel());
  const navbarRef = reactExports.useRef();
  const [open, setOpen] = reactExports.useState(false);
  const [newOpen, setNewOpen] = reactExports.useState(false);
  const [readonly, setReadonly] = reactExports.useState(false);
  const [itmindex, setitmindex] = reactExports.useState(-1);
  const [taxById, setTaxById] = reactExports.useState({});
  const [taxId, setTaxId] = reactExports.useState(-1);
  const [txtTitle, settxtTitle] = reactExports.useState("");
  const [mode, setMode] = reactExports.useState(0);
  const [keyword, setKeyword] = reactExports.useState("");
  const navigate = useNavigate();
  function handleOpen(item, setedit, index) {
    setitmindex(index);
    if (setedit == true) {
      setReadonly(false);
      cookies.role_update.length == 0 && cookies.role_dst.length == 0 ? setOpen(!open) : cookies.role_dst.findIndex((a) => a == "ALL") >= 0 ? setOpen(!open) : cookies.role_update.findIndex((a) => a == "TAX") >= 0 ? setOpen(!open) : setOpen(false);
      setTaxById(item);
      settxtTitle("Edit Pajak");
      setMode(2);
    } else {
      setReadonly(true);
      setOpen(!open);
      setTaxById(item);
      settxtTitle("Detail Pajak");
      setMode(1);
    }
  }
  function handleNewOpen(id) {
    cookies.role_delete.length == 0 && cookies.role_dst.length == 0 ? setNewOpen(!newOpen) : cookies.role_dst.findIndex((a) => a == "ALL") >= 0 ? setNewOpen(!newOpen) : cookies.role_delete.findIndex((a) => a == "TAX") >= 0 ? setNewOpen(!newOpen) : setNewOpen(false);
    setTaxId(id);
  }
  function handleAdd() {
    setTaxById({ paj_lok_id: cookies.lok_id, paj_id: -1 });
    setReadonly(false);
    settxtTitle("Tambah Pajak");
    setMode(3);
    cookies.role_create.length == 0 && cookies.role_dst.length == 0 ? setOpen(!open) : cookies.role_dst.findIndex((a) => a == "ALL") >= 0 ? setOpen(!open) : cookies.role_create.findIndex((a) => a == "TAX") >= 0 ? setOpen(!open) : setOpen(false);
  }
  const handleChange = (evt, id) => {
    setTaxById({
      ...taxById,
      [id]: evt.target.value
    });
  };
  const handleDelete = reactExports.useCallback(async () => {
    setItemDisplay(null);
    const { data, error } = await deleteTax({ paj_id: taxId });
    if (error) {
      alert("Data tidak ditemukan");
    } else {
      setLoading(true);
      setNewOpen(false);
      setTaxs([]);
      setTaxId(-1);
      const { data: data2, error: error2 } = await getTax({ lok_id: cookies.lok_id });
      if (error2) {
        alert("Data tidak ditemukan");
      } else {
        setTaxs(data2);
      }
      setLoading(false);
    }
  }, [taxId]);
  const saveData = reactExports.useCallback(async () => {
    setItemDisplay(null);
    const { data, error } = await saveTax(taxById);
    if (error) {
      alert("Data tidak ditemukan");
    } else {
      setLoading(true);
      setOpen(false);
      setTaxs([]);
      const { data: data2, error: error2 } = await getTax({ lok_id: cookies.lok_id });
      if (error2) {
        alert("Data tidak ditemukan");
      } else {
        setTaxs(data2);
      }
      setLoading(false);
    }
  }, [taxById]);
  reactExports.useEffect(() => {
    if (!cookies.lok_id) {
      navigate(topic.login.route);
    }
    const handleResponse = ({ data, error }) => {
      if (error) {
        alert("Data tidak ditemukan");
      } else {
        setTaxs(data);
      }
    };
    const init = async () => {
      if (keyword && keyword.length > 1) {
        const orderSearch = setTimeout(async () => {
          setLoading(true);
          const { data, error } = await getTax({ lok_id: cookies.lok_id, key_val: keyword });
          handleResponse({ data, error });
          setLoading(false);
        }, TIME_SEARCH_DEBOUNCE);
        return () => {
          clearTimeout(orderSearch);
        };
      } else if (!keyword) {
        setLoading(true);
        setTaxs([]);
        const { data, error } = await getTax({ lok_id: cookies.lok_id });
        handleResponse({ data, error });
        setLoading(false);
      }
    };
    init();
  }, [keyword]);
  reactExports.useEffect(() => {
    if (navbarRef.current) {
      setListPadding(`${navbarRef.current.offsetHeight + 20}px`);
    }
  }, [taxs, navbarRef]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(reactExports.Fragment, { children: [
    !loading ? null : /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingOverlay, { white: true }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-screen-adapt bg-gray-50 overflow-hidden relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "top-0 inset-x-0 fixed bg-gradient-to-b from-gray-50 h-20" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 top-0 inset-x-0 fixed z-50 mx-auto desktop:max-w-[60%]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Navbar, { ref: navbarRef, className: `pt-2 px-2 py-2 relative`, blurred: false, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.IconButton, { variant: "text", size: "md", onClick: () => setMenuOpen(true), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bars3Icon, { className: "h-6 w-6 stroke-2" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-base font-semibold text-[#606060]", children: "Pajak" })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pb-20 overflow-auto h-full", style: { paddingTop: listPadding }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.List, { className: "min-h-screen divide-y divide-dashed divide-gray-400", children: taxs.map((i, index) => {
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(react.ListItem, { className: "", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full pr-2", onClick: () => handleOpen(i, false, index), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", {}),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "gray", className: "font-normal", children: /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: i.paj_nama }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { color: "gray", className: "font-normal", children: `${i.paj_value}%` })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(react.ListItemSuffix, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.IconButton, { variant: "text", color: "blue-gray", onClick: () => handleOpen(i, true, index), children: /* @__PURE__ */ jsxRuntimeExports.jsx(PencilSquareIcon, { className: "h-6 w-6 text-black-500" }) }) })
          ] }, index);
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed bottom-4 right-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.IconButton, { variant: "filled", color: "teal", className: "rounded-full", size: "lg", onClick: () => handleAdd(), children: /* @__PURE__ */ jsxRuntimeExports.jsx(PlusCircleIcon, { className: "h-8 w-8 text-black-500" }) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Dialog, { open, handler: handleOpen, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.DialogHeader, { children: txtTitle }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(react.DialogBody, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            InputSimple,
            {
              value: taxById.paj_nama,
              label: "Nama Pajak",
              onChange: (evt) => handleChange(evt, "paj_nama"),
              disabled: readonly
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            InputNumber,
            {
              value: taxById.paj_value,
              label: "Nilai Pajak",
              onChange: (evt) => handleChange(evt, "paj_value"),
              disabled: readonly,
              icon: "%"
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(react.DialogFooter, { className: "flex gap-3 justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Button, { variant: "gradient", color: "blue-gray", onClick: () => setOpen(false), className: "w-full flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Batal" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            react.Button,
            {
              variant: "gradient",
              color: mode <= 1 ? "red" : "green",
              onClick: mode <= 1 ? () => handleNewOpen(taxById.paj_id) : saveData,
              className: "w-full flex-1",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: mode <= 1 ? "Hapus" : "Konfirmasi" })
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Dialog, { open: newOpen, handler: handleNewOpen, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.DialogBody, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center my-6", children: [
          "Pajak ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: taxById.paj_nama }),
          " akan dihapus. Apakah anda yakin?"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(react.DialogFooter, { className: "flex gap-3 justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Button, { variant: "gradient", color: "blue-gray", onClick: () => setNewOpen(false), className: "w-full flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Batal" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Button, { variant: "gradient", color: "red", onClick: handleDelete, className: "w-full flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Hapus" }) })
        ] })
      ] })
    ] })
  ] });
}
export {
  TaxList as default
};
