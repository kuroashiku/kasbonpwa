import { r as reactExports, A as AppContext, u as useNavigate, t as topic, j as jsxRuntimeExports, L as LoadingOverlay, a as react, T as TIME_SEARCH_DEBOUNCE } from "./index-CGEICd-f.js";
import { T as TableListModel, d as deleteTable, g as getTable, s as saveTable } from "./Table-HzM5Y3VM.js";
import { S as SearchNavbar } from "./SearchNavbar-BwHVnItL.js";
import { F as FilterChips } from "./FilterChips-Bif-hhPS.js";
import { I as InputSimple } from "./InputSimple-DmjIpoRq.js";
import { l as lodashExports } from "./lodash-C34_XwDM.js";
import { B as Bars3Icon } from "./Bars3Icon-BPkb_aHs.js";
import { A as AdjustmentsVerticalIcon } from "./AdjustmentsVerticalIcon-DBH-WKzU.js";
import { P as PencilSquareIcon } from "./PencilSquareIcon-BJtlfiFf.js";
import { P as PlusCircleIcon } from "./PlusCircleIcon-CFdoe21X.js";
import "./filter-DY4hzksJ.js";
function CheckCircleIcon({
  title,
  titleId,
  ...props
}, svgRef) {
  return /* @__PURE__ */ reactExports.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 16 16",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: svgRef,
    "aria-labelledby": titleId
  }, props), title ? /* @__PURE__ */ reactExports.createElement("title", {
    id: titleId
  }, title) : null, /* @__PURE__ */ reactExports.createElement("path", {
    fillRule: "evenodd",
    d: "M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14Zm3.844-8.791a.75.75 0 0 0-1.188-.918l-3.7 4.79-1.649-1.833a.75.75 0 1 0-1.114 1.004l2.25 2.5a.75.75 0 0 0 1.15-.043l4.25-5.5Z",
    clipRule: "evenodd"
  }));
}
const ForwardRef$1 = reactExports.forwardRef(CheckCircleIcon);
const CheckCircleIcon$1 = ForwardRef$1;
function XCircleIcon({
  title,
  titleId,
  ...props
}, svgRef) {
  return /* @__PURE__ */ reactExports.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 16 16",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: svgRef,
    "aria-labelledby": titleId
  }, props), title ? /* @__PURE__ */ reactExports.createElement("title", {
    id: titleId
  }, title) : null, /* @__PURE__ */ reactExports.createElement("path", {
    fillRule: "evenodd",
    d: "M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14Zm2.78-4.22a.75.75 0 0 1-1.06 0L8 9.06l-1.72 1.72a.75.75 0 1 1-1.06-1.06L6.94 8 5.22 6.28a.75.75 0 0 1 1.06-1.06L8 6.94l1.72-1.72a.75.75 0 1 1 1.06 1.06L9.06 8l1.72 1.72a.75.75 0 0 1 0 1.06Z",
    clipRule: "evenodd"
  }));
}
const ForwardRef = reactExports.forwardRef(XCircleIcon);
const XCircleIcon$1 = ForwardRef;
function tableList() {
  const { setMenuOpen, filters, setFilters, lang, cookies } = reactExports.useContext(AppContext);
  const [listPadding, setListPadding] = reactExports.useState("20px");
  const [loading, setLoading] = reactExports.useState(true);
  const [tables, setTables] = reactExports.useState([TableListModel()]);
  const [itemDisplay, setItemDisplay] = reactExports.useState(TableListModel());
  const navbarRef = reactExports.useRef();
  const [open, setOpen] = reactExports.useState(false);
  const [newOpen, setNewOpen] = reactExports.useState(false);
  const [readonly, setReadonly] = reactExports.useState(false);
  const [tableById, setTableById] = reactExports.useState({});
  const [tableId, setTableId] = reactExports.useState(-1);
  const [txtTitle, settxtTitle] = reactExports.useState("");
  const [mode, setMode] = reactExports.useState(0);
  const [keyword, setKeyword] = reactExports.useState("");
  const [statusSelect, setStatusSelect] = reactExports.useState("");
  const navigate = useNavigate();
  const handleFilter = (searchKey) => {
    setKeyword(searchKey);
  };
  reactExports.useEffect(() => {
    const _tablebyid = lodashExports.cloneDeep(tableById);
    _tablebyid.mej_status = statusSelect == "1" ? true : false;
    setTableById(_tablebyid);
  }, [statusSelect]);
  function handleOpen(item, setedit, index) {
    console.log(item);
    if (setedit == true) {
      setReadonly(false);
      cookies.role_update.length == 0 && cookies.role_dst.length == 0 ? setOpen(!open) : cookies.role_dst.findIndex((a) => a == "ALL") >= 0 ? setOpen(!open) : cookies.role_update.findIndex((a) => a == "TBL") >= 0 ? setOpen(!open) : setOpen(false);
      setTableById(item);
      setStatusSelect(item.mej_status ? "true" : "false");
      settxtTitle("Edit Meja");
      setMode(2);
    } else {
      setReadonly(true);
      setOpen(!open);
      setTableById(item);
      settxtTitle("Detail Meja");
      setMode(1);
    }
  }
  const handleUpdate = reactExports.useCallback(
    async (item) => {
      const _tables = lodashExports.cloneDeep(tables);
      const indexOfId = _tables.findIndex((obj) => obj.mej_id == item.mej_id);
      _tables[indexOfId].mej_status = !item.mej_status;
      let stringdata = JSON.stringify(_tables[indexOfId]).replaceAll("true", '"Terisi"').replaceAll("false", '"Kosong"');
      setTables(_tables);
      const init = async () => {
        const { data, error } = await saveTable(JSON.parse(stringdata));
        if (error) {
          alert("Data tidak ditemukan");
        } else {
          setLoading(true);
          setOpen(false);
          setTables([]);
          const { data: data2, error: error2 } = await getTable({ lok_id: cookies.lok_id });
          if (error2) {
            alert("Data tidak ditemukan");
          } else {
            let stringdata2 = JSON.stringify(data2).replaceAll('"Terisi"', "true").replaceAll('"Kosong"', "false");
            setTables(JSON.parse(stringdata2));
          }
          setLoading(false);
        }
      };
      init();
    },
    [tables]
  );
  function handleNewOpen(id) {
    cookies.role_delete.length == 0 && cookies.role_dst.length == 0 ? setNewOpen(!newOpen) : cookies.role_dst.findIndex((a) => a == "ALL") >= 0 ? setNewOpen(!newOpen) : cookies.role_delete.findIndex((a) => a == "TBL") >= 0 ? setNewOpen(!newOpen) : setNewOpen(false);
    setTableId(id);
  }
  function handleAdd() {
    setTableById({ mej_lok_id: cookies.lok_id, mej_id: -1 });
    setReadonly(false);
    settxtTitle("Tambah Pajak");
    setMode(3);
    cookies.role_create.length == 0 && cookies.role_dst.length == 0 ? setOpen(!open) : cookies.role_dst.findIndex((a) => a == "ALL") >= 0 ? setOpen(!open) : cookies.role_create.findIndex((a) => a == "TBL") >= 0 ? setOpen(!open) : setOpen(false);
  }
  function handleChange(evt) {
    const value = evt.target.type === "checkbox" ? evt.target.checked : evt.target.value;
    setTableById({
      ...tableById,
      [evt.target.name]: value
    });
  }
  const handleDelete = reactExports.useCallback(async () => {
    setItemDisplay(null);
    const { data, error } = await deleteTable({ mej_id: tableId });
    if (error) {
      alert("Data tidak ditemukan");
    } else {
      setLoading(true);
      setNewOpen(false);
      setTables([]);
      setTableId(-1);
      const { data: data2, error: error2 } = await getTable({ lok_id: cookies.lok_id });
      if (error2) {
        alert("Data tidak ditemukan");
      } else {
        setTables(data2);
      }
      setLoading(false);
    }
  }, [tableId]);
  const saveData = reactExports.useCallback(async () => {
    let stringdata = JSON.stringify(tableById).replaceAll("true", '"Terisi"').replaceAll("false", '"Kosong"');
    setItemDisplay(null);
    const { data, error } = await saveTable(JSON.parse(stringdata));
    if (error) {
      alert("Data tidak ditemukan");
    } else {
      setLoading(true);
      setOpen(false);
      setTables([]);
      const { data: data2, error: error2 } = await getTable({ lok_id: cookies.lok_id });
      if (error2) {
        alert("Data tidak ditemukan");
      } else {
        let stringdata2 = JSON.stringify(data2).replaceAll('"Terisi"', "true").replaceAll('"Kosong"', "false");
        setTables(JSON.parse(stringdata2));
      }
      setLoading(false);
    }
  }, [tableById]);
  reactExports.useEffect(() => {
    if (!cookies.lok_id) {
      navigate(topic.login.route);
    }
    const handleResponse = ({ data, error }) => {
      if (error) {
        alert("Data tidak ditemukan");
      } else {
        let stringdata = JSON.stringify(data).replaceAll('"Terisi"', "true").replaceAll('"Kosong"', "false");
        setTables(JSON.parse(stringdata));
      }
    };
    const init = async () => {
      if (keyword && keyword.length > 1) {
        const orderSearch = setTimeout(async () => {
          setLoading(true);
          const { data, error } = await getTable({ lok_id: cookies.lok_id, key_val: keyword });
          handleResponse({ data, error });
          setLoading(false);
        }, TIME_SEARCH_DEBOUNCE);
        return () => {
          clearTimeout(orderSearch);
        };
      } else if (!keyword) {
        setLoading(true);
        setTables([]);
        const { data, error } = await getTable({ lok_id: cookies.lok_id });
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
  }, [tables, navbarRef]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(reactExports.Fragment, { children: [
    !loading ? null : /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingOverlay, { white: true }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-screen-adapt bg-gray-50 overflow-hidden relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "top-0 inset-x-0 fixed bg-gradient-to-b from-gray-50 h-20" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 top-0 inset-x-0 fixed z-50 mx-auto desktop:max-w-[60%]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Navbar, { ref: navbarRef, className: `pt-2 px-2 ${!filters.length ? "pb-6" : "pb-4"} relative`, blurred: false, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.IconButton, { variant: "text", size: "md", onClick: () => setMenuOpen(true), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bars3Icon, { className: "h-6 w-6 stroke-2" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-2 flex-grow", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SearchNavbar, { onSearch: handleFilter, value: keyword, label: "Meja" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.IconButton, { size: "md", variant: "text", onClick: () => setFilters(true), children: /* @__PURE__ */ jsxRuntimeExports.jsx(AdjustmentsVerticalIcon, { className: "h-6 w-6 stroke-2" }) })
        ] }),
        !filters.length ? /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "gray", className: "absolute right-14 bottom-1 text-xs italic", children: "Semua Kategori" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-2 pt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FilterChips, { filters, onSetFilters: setFilters }) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pb-20 overflow-auto h-full", style: { paddingTop: listPadding }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.List, { className: "divide-y divide-dashed divide-gray-400", children: tables.map((i, index) => {
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(react.ListItem, { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full  flex flex-col gap-1", onClick: () => handleOpen(i, false), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-[90%] whitespace-nowrap overflow-hidden text-ellipsis font-semibold", children: i.mej_nama }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: `w-max py-[2px] px-2 text-[12px] font-semibold rounded-md ${i.mej_status ? "bg-orange-100" : "bg-green-100"}`,
                  children: i.mej_status ? "Terisi" : "Kosong"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-max py-[2px] px-2 text-[12px] font-semibold bg-blue-100 rounded-md", children: [
                i.mej_kapasitas,
                " orang"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "action-area flex items-center absolute top-1 right-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.IconButton, { variant: "text", color: "blue-gray", onClick: () => handleOpen(i, true), children: /* @__PURE__ */ jsxRuntimeExports.jsx(PencilSquareIcon, { className: "h-6 w-6 text-black-500" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.IconButton, { variant: "text", color: "blue-gray", onClick: () => handleUpdate(i, true, index), children: i.mej_status ? /* @__PURE__ */ jsxRuntimeExports.jsx(XCircleIcon$1, { className: "h-6 w-6 text-red-500" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CheckCircleIcon$1, { className: "h-6 w-6 text-green-500" }) })
            ] })
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
              value: tableById.mej_nama,
              label: "Nama",
              name: "mej_nama",
              onChange: handleChange,
              disabled: readonly
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            InputSimple,
            {
              value: tableById.mej_kapasitas,
              label: "Kapasitas",
              name: "mej_kapasitas",
              onChange: handleChange,
              disabled: readonly
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            react.Select,
            {
              id: "select_status",
              value: statusSelect,
              onChange: setStatusSelect,
              color: "teal",
              label: "Kategori",
              disabled: readonly,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "true", children: "Kosong" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "false", children: "Terisi" })
              ]
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(react.DialogFooter, { className: "flex gap-3 justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Button, { variant: "gradient", color: "blue-gray", onClick: () => setOpen(false), className: "w-full flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: mode <= 1 ? "Kembali" : "Batal" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            react.Button,
            {
              variant: "gradient",
              color: mode <= 1 ? "red" : "green",
              onClick: mode <= 1 ? () => handleNewOpen(tableById.mej_id) : saveData,
              className: "w-full flex-1",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: mode <= 1 ? "Hapus" : "Ubah" })
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Dialog, { open: newOpen, handler: handleNewOpen, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.DialogBody, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center my-6", children: [
          "Table ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: tableById.mej_nama }),
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
  tableList as default
};
