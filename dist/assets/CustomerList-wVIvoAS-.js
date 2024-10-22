import { r as reactExports, A as AppContext, h as CustomerListModel, i as deleteCustomer, k as getCustomers, s as saveCustomer, j as jsxRuntimeExports, L as LoadingOverlay, a as react, T as TIME_SEARCH_DEBOUNCE } from "./index-CGEICd-f.js";
import { S as SearchNavbar } from "./SearchNavbar-BwHVnItL.js";
import { I as InputSimple } from "./InputSimple-DmjIpoRq.js";
import { B as Bars3Icon } from "./Bars3Icon-BPkb_aHs.js";
import { P as PhoneIcon, a as PencilSquareIcon } from "./PhoneIcon-BLQzN3AO.js";
import { P as PlusCircleIcon } from "./PlusCircleIcon-CFdoe21X.js";
function CustomerList() {
  const { setMenuOpen, lang, cookies } = reactExports.useContext(AppContext);
  const [listPadding, setListPadding] = reactExports.useState("20px");
  const [loading, setLoading] = reactExports.useState(true);
  const [customers, setCustomers] = reactExports.useState([CustomerListModel()]);
  const [itemDisplay, setItemDisplay] = reactExports.useState(CustomerListModel());
  const navbarRef = reactExports.useRef();
  const [open, setOpen] = reactExports.useState(false);
  const [newOpen, setNewOpen] = reactExports.useState(false);
  const [readonly, setReadonly] = reactExports.useState(false);
  const [customerById, setCustomerById] = reactExports.useState({});
  const [customerId, setCustomerId] = reactExports.useState(-1);
  const [txtTitle, settxtTitle] = reactExports.useState("");
  const [mode, setMode] = reactExports.useState(0);
  const [keyword, setKeyword] = reactExports.useState("");
  const handleFilter = (searchKey) => {
    setKeyword(searchKey);
  };
  function handleOpen(item, setedit, index) {
    if (setedit == true) {
      setReadonly(false);
      cookies.role_update.length == 0 && cookies.role_dst.length == 0 ? setOpen(!open) : cookies.role_dst.findIndex((a) => a == "ALL") >= 0 ? setOpen(!open) : cookies.role_update.findIndex((a) => a == "CUST") >= 0 ? setOpen(!open) : setOpen(false);
      setCustomerById(item);
      settxtTitle("Edit Customer");
      setMode(2);
    } else {
      setReadonly(true);
      setOpen(!open);
      setCustomerById(item);
      settxtTitle("Detail Customer");
      setMode(1);
    }
  }
  function handleNewOpen(id) {
    cookies.role_delete.length == 0 && cookies.role_dst.length == 0 ? setNewOpen(!newOpen) : cookies.role_dst.findIndex((a) => a == "ALL") >= 0 ? setNewOpen(!newOpen) : cookies.role_delete.findIndex((a) => a == "CUST") >= 0 ? setNewOpen(!newOpen) : setOpen(false);
    setCustomerId(id);
  }
  function handleAdd() {
    setCustomerById({ cus_com_id: cookies.com_id, cus_id: -1 });
    setReadonly(false);
    settxtTitle("Tambah Customer");
    setMode(3);
    cookies.role_create.length == 0 && cookies.role_dst.length == 0 ? setOpen(!open) : cookies.role_dst.findIndex((a) => a == "ALL") >= 0 ? setOpen(!open) : cookies.role_create.findIndex((a) => a == "CUST") >= 0 ? setOpen(!open) : setOpen(false);
  }
  function handleChange(evt) {
    const value = evt.target.type === "checkbox" ? evt.target.checked : evt.target.value;
    setCustomerById({
      ...customerById,
      [evt.target.name]: value
    });
  }
  const handleDelete = reactExports.useCallback(async () => {
    setItemDisplay(null);
    const { data, error } = await deleteCustomer({ cus_id: customerId });
    if (error) {
      alert("Data tidak ditemukan");
    } else {
      setLoading(true);
      setNewOpen(false);
      setCustomers([]);
      setCustomerId(-1);
      const { data: data2, error: error2 } = await getCustomers({ com_id: cookies.com_id });
      if (error2) {
        alert("Data tidak ditemukan");
      } else {
        setCustomers(data2);
      }
      setLoading(false);
    }
  }, [customerId]);
  const saveData = reactExports.useCallback(async () => {
    setItemDisplay(null);
    const { data, error } = await saveCustomer(customerById);
    if (error) {
      alert("Data tidak ditemukan");
    } else {
      setLoading(true);
      setOpen(false);
      setCustomers([]);
      const { data: data2, error: error2 } = await getCustomers({ com_id: cookies.com_id });
      if (error2) {
        alert("Data tidak ditemukan");
      } else {
        setCustomers(data2);
      }
      setLoading(false);
    }
  }, [customerById]);
  reactExports.useEffect(() => {
    const handleResponse = ({ data, error }) => {
      if (error) {
        alert("Data tidak ditemukan");
      } else {
        setCustomers(data);
      }
    };
    const init = async () => {
      if (keyword && keyword.length > 1) {
        const orderSearch = setTimeout(async () => {
          setLoading(true);
          const { data, error } = await getCustomers({ com_id: cookies.com_id, key_val: keyword });
          handleResponse({ data, error });
          setLoading(false);
        }, TIME_SEARCH_DEBOUNCE);
        return () => {
          clearTimeout(orderSearch);
        };
      } else if (!keyword) {
        setLoading(true);
        setCustomers([]);
        const { data, error } = await getCustomers({ com_id: cookies.com_id });
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
  }, [customers, navbarRef]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(reactExports.Fragment, { children: [
    !loading ? null : /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingOverlay, { white: true }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-screen-adapt bg-gray-50 overflow-hidden relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "top-0 inset-x-0 fixed bg-gradient-to-b from-gray-50 h-20" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 top-0 inset-x-0 fixed z-50 mx-auto desktop:max-w-[60%]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Navbar, { ref: navbarRef, className: `pt-2 px-2 py-2 relative`, blurred: false, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.IconButton, { variant: "text", size: "md", onClick: () => setMenuOpen(true), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bars3Icon, { className: "h-6 w-6 stroke-2" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-2 flex-grow", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SearchNavbar, { onSearch: handleFilter, value: keyword, label: "Pelanggan" }) })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pb-20 overflow-auto h-full", style: { paddingTop: listPadding }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.List, { className: "divide-y divide-dashed divide-gray-400", children: customers.map((i, index) => {
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(react.ListItem, { className: "flex items-center justify-between px-[3px]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full pr-2", onClick: () => handleOpen(i, false), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "info", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "gray", className: "text-[14px] font-medium mb-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: i.cus_nama }) }),
              i.cus_wa && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-max flex gap-1 items-center align-middle px-2 py-[2px] bg-[#cff1cf] rounded-md", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(PhoneIcon, { className: "h-[12px] w-[12px]" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: " text-[13px] font-semibold", children: i.cus_wa || "" })
              ] })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(react.ListItemSuffix, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.IconButton, { variant: "text", color: "blue-gray", onClick: () => handleOpen(i, true), children: /* @__PURE__ */ jsxRuntimeExports.jsx(PencilSquareIcon, { className: "h-5 w-5 text-blue-500" }) }) })
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
              value: customerById.cus_nama,
              label: "Nama",
              name: "cus_nama",
              onChange: handleChange,
              disabled: readonly,
              maxlength: 30
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            InputSimple,
            {
              value: customerById.cus_wa,
              label: "Nomor WA",
              name: "cus_wa",
              onChange: handleChange,
              disabled: readonly,
              maxlength: 16
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
              onClick: mode <= 1 ? () => handleNewOpen(customerById.cus_id) : saveData,
              className: "w-full flex-1",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: mode <= 1 ? "Delete" : "Confirm" })
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Dialog, { open: newOpen, handler: handleNewOpen, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.DialogBody, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center my-6", children: [
          "Customer ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: customerById.cus_nama }),
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
  CustomerList as default
};
