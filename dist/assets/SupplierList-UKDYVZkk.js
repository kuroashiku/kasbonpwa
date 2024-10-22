import { r as reactExports, A as AppContext, S as SupplierListModel, u as useNavigate, v as deleteSupplier, w as getSupplier, x as saveSupplier, t as topic, j as jsxRuntimeExports, L as LoadingOverlay, a as react, T as TIME_SEARCH_DEBOUNCE } from "./index-CGEICd-f.js";
import { S as SearchNavbar } from "./SearchNavbar-BwHVnItL.js";
import { I as InputSimple } from "./InputSimple-DmjIpoRq.js";
import { B as Bars3Icon } from "./Bars3Icon-BPkb_aHs.js";
import { P as PhoneIcon, a as PencilSquareIcon } from "./PhoneIcon-BLQzN3AO.js";
import { P as PlusCircleIcon } from "./PlusCircleIcon-CFdoe21X.js";
function HomeIcon({
  title,
  titleId,
  ...props
}, svgRef) {
  return /* @__PURE__ */ reactExports.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: svgRef,
    "aria-labelledby": titleId
  }, props), title ? /* @__PURE__ */ reactExports.createElement("title", {
    id: titleId
  }, title) : null, /* @__PURE__ */ reactExports.createElement("path", {
    d: "M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z"
  }), /* @__PURE__ */ reactExports.createElement("path", {
    d: "m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z"
  }));
}
const ForwardRef = reactExports.forwardRef(HomeIcon);
const HomeIcon$1 = ForwardRef;
function SupplierList() {
  const { setMenuOpen, filters, currency, setFilters, lang, dataLogin, cookies } = reactExports.useContext(AppContext);
  const [listPadding, setListPadding] = reactExports.useState("20px");
  const [loading, setLoading] = reactExports.useState(true);
  const [suppliers, setSuppliers] = reactExports.useState([SupplierListModel()]);
  const [itemDisplay, setItemDisplay] = reactExports.useState(SupplierListModel());
  const navbarRef = reactExports.useRef();
  const [open, setOpen] = reactExports.useState(false);
  const [newOpen, setNewOpen] = reactExports.useState(false);
  const [readonly, setReadonly] = reactExports.useState(false);
  const [supplierById, setSupplierById] = reactExports.useState({});
  const [supplierId, setSupplierId] = reactExports.useState(-1);
  const [txtTitle, settxtTitle] = reactExports.useState("");
  const [mode, setMode] = reactExports.useState(0);
  const [keyword, setKeyword] = reactExports.useState("");
  const navigate = useNavigate();
  const handleFilter = (searchKey) => {
    setKeyword(searchKey);
  };
  function handleOpen(item, setedit, index) {
    if (setedit == true) {
      setReadonly(false);
      cookies.role_update.length == 0 && cookies.role_dst.length == 0 ? setOpen(!open) : cookies.role_dst.findIndex((a) => a == "ALL") >= 0 ? setOpen(!open) : cookies.role_update.findIndex((a) => a == "SUPP") >= 0 ? setOpen(!open) : setOpen(false);
      setSupplierById(item);
      settxtTitle("Ubah Supplier");
      setMode(2);
    } else {
      setReadonly(true);
      setOpen(!open);
      setSupplierById(item);
      settxtTitle("Detail Supplier");
      setMode(1);
    }
  }
  function handleNewOpen(id) {
    cookies.role_delete.length == 0 && cookies.role_dst.length == 0 ? setNewOpen(!newOpen) : cookies.role_dst.findIndex((a) => a == "ALL") >= 0 ? setNewOpen(!newOpen) : cookies.role_delete.findIndex((a) => a == "SUPP") >= 0 ? setNewOpen(!newOpen) : setNewOpen(false);
    setSupplierId(id);
  }
  function handleAdd() {
    setSupplierById({ sup_com_id: cookies.com_id, sup_id: -1 });
    setReadonly(false);
    settxtTitle("Tambah Supplier");
    setMode(3);
    cookies.role_create.length == 0 && cookies.role_dst.length == 0 ? setOpen(!open) : cookies.role_dst.findIndex((a) => a == "ALL") >= 0 ? setOpen(!open) : cookies.role_create.findIndex((a) => a == "SUPP") >= 0 ? setOpen(!open) : setOpen(false);
  }
  function handleChange(evt) {
    const value = evt.target.type === "checkbox" ? evt.target.checked : evt.target.value;
    setSupplierById({
      ...supplierById,
      [evt.target.name]: value
    });
  }
  const handleDelete = reactExports.useCallback(async () => {
    setItemDisplay(null);
    const { data, error } = await deleteSupplier({ sup_id: supplierId });
    if (error) {
      alert("Data tidak ditemukan");
    } else {
      setLoading(true);
      setNewOpen(false);
      setSuppliers([]);
      setSupplierId(-1);
      const { data: data2, error: error2 } = await getSupplier({ com_id: cookies.com_id });
      if (error2) {
        alert("Data tidak ditemukan");
      } else {
        setSuppliers(data2);
      }
      setLoading(false);
    }
  }, [supplierId]);
  const saveData = reactExports.useCallback(async () => {
    setItemDisplay(null);
    const { data, error } = await saveSupplier(supplierById);
    if (error) {
      alert("Data tidak ditemukan");
    } else {
      setLoading(true);
      setOpen(false);
      setSuppliers([]);
      const { data: data2, error: error2 } = await getSupplier({ com_id: cookies.com_id });
      if (error2) {
        alert("Data tidak ditemukan");
      } else {
        setSuppliers(data2);
      }
      setLoading(false);
    }
  }, [supplierById]);
  reactExports.useEffect(() => {
    if (!cookies.lok_id) {
      navigate(topic.login.route);
    }
    const handleResponse = ({ data, error }) => {
      if (error) {
        alert("Data tidak ditemukan");
      } else {
        setSuppliers(data);
      }
    };
    const init = async () => {
      if (keyword && keyword.length > 1) {
        const orderSearch = setTimeout(async () => {
          setLoading(true);
          const { data, error } = await getSupplier({ com_id: cookies.com_id, key_val: keyword });
          handleResponse({ data, error });
          setLoading(false);
        }, TIME_SEARCH_DEBOUNCE);
        return () => {
          clearTimeout(orderSearch);
        };
      } else if (!keyword) {
        setLoading(true);
        setSuppliers([]);
        const { data, error } = await getSupplier({ com_id: cookies.com_id });
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
  }, [suppliers, navbarRef]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(reactExports.Fragment, { children: [
    !loading ? null : /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingOverlay, { white: true }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-screen-adapt bg-gray-50 overflow-hidden relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 top-0 inset-x-0 fixed z-50 mx-auto desktop:max-w-[60%]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Navbar, { ref: navbarRef, className: `pt-2 px-2 py-2 relative`, blurred: false, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.IconButton, { variant: "text", size: "md", onClick: () => setMenuOpen(true), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bars3Icon, { className: "h-6 w-6 stroke-2" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-2 flex-grow", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SearchNavbar, { onSearch: handleFilter, value: keyword, label: "Supplier" }) })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pb-20 overflow-auto h-full", style: { paddingTop: listPadding }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.List, { className: "divide-y divide-dashed divide-gray-400", children: suppliers.map((i, index) => {
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(react.ListItem, { className: "flex items-center justify-between px-[3px]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-[90%] pr-2 flex-1", onClick: () => handleOpen(i, false), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "info flex flex-col gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "gray", className: "text-[14px] font-medium", children: /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: i.sup_nama }) }),
              i.sup_wa && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-max flex gap-1 items-center align-middle px-2 py-[2px] bg-[#cff1cf] rounded-md", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(PhoneIcon, { className: "h-[12px] w-[12px]" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: " text-[13px] font-semibold", children: i.sup_wa || "" })
              ] }),
              i.sup_alamat && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-max max-w-full flex gap-2 items-baseline align-middle px-2 py-1 bg-[#ddf5ff] rounded-md", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(HomeIcon$1, { className: "h-[12px] min-w-[12px]" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-5 text-[13px] font-semibold", children: i.sup_alamat || "" })
              ] })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(react.ListItemSuffix, { className: "w-[10%]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.IconButton, { variant: "text", color: "blue-gray", onClick: () => handleOpen(i, true), children: /* @__PURE__ */ jsxRuntimeExports.jsx(PencilSquareIcon, { className: "h-5 w-5 text-blue-500" }) }) })
          ] }, index);
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed bottom-4 right-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.IconButton, { variant: "filled", color: "teal", className: "rounded-full", size: "lg", onClick: () => handleAdd(), children: /* @__PURE__ */ jsxRuntimeExports.jsx(PlusCircleIcon, { className: "h-8 w-8 text-black-500" }) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Dialog, { open, handler: handleOpen, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.DialogHeader, { className: "text-[20px] text-[#606060]", children: txtTitle }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(react.DialogBody, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            InputSimple,
            {
              value: supplierById.sup_nama,
              label: "Nama",
              name: "sup_nama",
              onChange: handleChange,
              disabled: readonly,
              maxlength: 30
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            InputSimple,
            {
              value: supplierById.sup_wa,
              label: "Nomor WA",
              name: "sup_wa",
              onChange: handleChange,
              disabled: readonly,
              maxlength: 16
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            react.Textarea,
            {
              value: supplierById.sup_alamat,
              label: "Alamat",
              name: "sup_alamat",
              onChange: handleChange,
              disabled: readonly
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(react.DialogFooter, { className: "flex gap-3 justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Button, { variant: "gradient", color: "blue-gray", onClick: () => setOpen(false), className: "w-full flex-1", children: "Batal" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            react.Button,
            {
              variant: "gradient",
              color: mode <= 1 ? "orange" : "green",
              onClick: mode <= 1 ? () => handleNewOpen(supplierById.sup_id) : saveData,
              className: "w-full flex-1",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: mode <= 1 ? "Hapus" : "Confirm" })
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Dialog, { open: newOpen, handler: handleNewOpen, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.DialogBody, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center my-6", children: [
          "Supplier ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: supplierById.sup_nama }),
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
  SupplierList as default
};
