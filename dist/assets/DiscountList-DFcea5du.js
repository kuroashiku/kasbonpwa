import { r as reactExports, A as AppContext, u as useNavigate, t as topic, j as jsxRuntimeExports, L as LoadingOverlay, a as react, T as TIME_SEARCH_DEBOUNCE } from "./index-CGEICd-f.js";
import { D as DiscountListModel, d as deleteDiscount, g as getDiscount, s as saveDiscount } from "./Discount-jk2bDf3z.js";
import "./lodash-C34_XwDM.js";
import { b as formatSentenceCase } from "./formatter-DQiSfF1K.js";
import { I as InputSimple } from "./InputSimple-DmjIpoRq.js";
import { I as InputNumber } from "./InputNumber-BTyAPkzT.js";
import { B as Bars3Icon } from "./Bars3Icon-BPkb_aHs.js";
import { P as PencilSquareIcon } from "./PencilSquareIcon-BJtlfiFf.js";
import { P as PlusCircleIcon } from "./PlusCircleIcon-CFdoe21X.js";
function discountList() {
  const { setMenuOpen, filters, currency, setFilters, lang, dataLogin, cookies } = reactExports.useContext(AppContext);
  const [listPadding, setListPadding] = reactExports.useState("20px");
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useState(false);
  const [discounts, setDiscounts] = reactExports.useState([DiscountListModel()]);
  const [discountsGlobal, setDiscountsGlobal] = reactExports.useState([DiscountListModel()]);
  const [itemDisplay, setItemDisplay] = reactExports.useState(DiscountListModel());
  const navbarRef = reactExports.useRef();
  const [open, setOpen] = reactExports.useState(false);
  const [newOpen, setNewOpen] = reactExports.useState(false);
  const [readonly, setReadonly] = reactExports.useState(false);
  const [itmindex, setitmindex] = reactExports.useState(-1);
  const [discountById, setDiscountById] = reactExports.useState({});
  const [discountId, setDiscountId] = reactExports.useState(-1);
  reactExports.useState({});
  reactExports.useState(-1);
  const [txtTitle, settxtTitle] = reactExports.useState("");
  const [mode, setMode] = reactExports.useState(0);
  const [keyword, setKeyword] = reactExports.useState("");
  reactExports.useState("peritem");
  const navigate = useNavigate();
  function handleOpen(item, setedit, index) {
    setitmindex(index);
    setMode(setedit);
    if (setedit == 1) {
      setReadonly(true);
      setDiscountById(item);
      settxtTitle("Detail Diskon");
      setOpen(!open);
    } else if (setedit == 2) {
      setReadonly(false);
      setDiscountById(item);
      settxtTitle("Edit Diskon");
      cookies.role_update.length == 0 && cookies.role_dst.length == 0 ? setOpen(!open) : cookies.role_dst.findIndex((a) => a == "ALL") >= 0 ? setOpen(!open) : cookies.role_update.findIndex((a) => a == "DIS") >= 0 ? setOpen(!open) : setOpen(false);
    } else if (setedit == 3) {
      setDiscountById({ dis_lok_id: cookies.lok_id, dis_id: -1 });
      setReadonly(false);
      settxtTitle("Tambah Diskon");
      cookies.role_create.length == 0 && cookies.role_dst.length == 0 ? setOpen(!open) : cookies.role_dst.findIndex((a) => a == "ALL") >= 0 ? setOpen(!open) : cookies.role_create.findIndex((a) => a == "DIS") >= 0 ? setOpen(!open) : setOpen(false);
    } else if (setedit == 4) {
      setReadonly(true);
      setDiscountById(item);
      settxtTitle("Detail Diskon Global");
      setOpen(!open);
    } else if (setedit == 5) {
      setReadonly(false);
      setDiscountById(item);
      settxtTitle("Edit Diskon Global");
      cookies.role_update.length == 0 && cookies.role_dst.length == 0 ? setOpen(!open) : cookies.role_dst.findIndex((a) => a == "ALL") >= 0 ? setOpen(!open) : cookies.role_update.findIndex((a) => a == "DIS") >= 0 ? setOpen(!open) : setOpen(false);
    } else if (setedit == 6) {
      setDiscountById({ dis_lok_id: cookies.lok_id, dis_id: -1, dis_global: "true" });
      setReadonly(false);
      settxtTitle("Tambah Diskon GLobal");
      cookies.role_create.length == 0 && cookies.role_dst.length == 0 ? setOpen(!open) : cookies.role_dst.findIndex((a) => a == "ALL") >= 0 ? setOpen(!open) : cookies.role_create.findIndex((a) => a == "DIS") >= 0 ? setOpen(!open) : setOpen(false);
    }
  }
  function handleNewOpen(id) {
    cookies.role_delete.length == 0 && cookies.role_dst.length == 0 ? setNewOpen(!newOpen) : cookies.role_dst.findIndex((a) => a == "ALL") >= 0 ? setNewOpen(!newOpen) : cookies.role_delete.findIndex((a) => a == "DIS") >= 0 ? setNewOpen(!newOpen) : setOpen(false);
    setDiscountId(id);
  }
  const handleChange = (evt, id) => {
    setDiscountById({
      ...discountById,
      [id]: evt.target.value
    });
  };
  const handleDelete = reactExports.useCallback(async () => {
    setItemDisplay(null);
    const { data, error } = await deleteDiscount({ dis_id: discountId });
    if (error) {
      alert("Data tidak ditemukan");
    } else {
      setLoading(true);
      setDiscounts([]);
      setDiscountId(-1);
      const { data: data2, error: error2 } = await getDiscount({ lok_id: cookies.lok_id });
      if (error2) {
        alert("Data tidak ditemukan");
      } else {
        setDiscounts(data2);
        setNewOpen(false);
        setOpen(false);
      }
      setLoading(false);
    }
  }, [discountId]);
  const saveData = reactExports.useCallback(async () => {
    setItemDisplay(null);
    const { data, error } = await saveDiscount(discountById);
    if (error) {
      alert("Data tidak ditemukan");
    } else {
      setLoading(true);
      setOpen(false);
      mode <= 3 ? setDiscounts([]) : setDiscountsGlobal([]);
      const { data: data2, error: error2 } = await getDiscount({ lok_id: cookies.lok_id, dis_global: mode <= 3 ? null : "true" });
      if (error2) {
        alert("Data tidak ditemukan");
      } else {
        mode <= 3 ? setDiscounts(data2) : setDiscountsGlobal(data2);
      }
      setLoading(false);
    }
  }, [discountById]);
  reactExports.useEffect(() => {
    if (!cookies.lok_id) {
      navigate(topic.login.route);
    }
    const handleResponse = ({ data, error }) => {
      if (error) {
        alert("Data tidak ditemukan");
      } else {
        setDiscounts(data);
      }
    };
    const handleResponseGlobal = ({ data, error }) => {
      if (error) {
        alert("Data tidak ditemukan");
      } else {
        setDiscountsGlobal(data);
      }
    };
    const init2 = async () => {
      if (keyword && keyword.length > 1) {
        const orderSearch = setTimeout(async () => {
          setLoading(true);
          const { data, error } = await getDiscount({ lok_id: cookies.lok_id, key_val: keyword, dis_global: "true" });
          handleResponseGlobal({ data, error });
          setLoading(false);
        }, TIME_SEARCH_DEBOUNCE);
        return () => {
          clearTimeout(orderSearch);
        };
      } else if (!keyword) {
        setLoading(true);
        setDiscountsGlobal([]);
        const { data, error } = await getDiscount({ lok_id: cookies.lok_id, dis_global: "true" });
        console.log(data);
        handleResponseGlobal({ data, error });
        setLoading(false);
      }
    };
    init2();
    const init = async () => {
      if (keyword && keyword.length > 1) {
        const orderSearch = setTimeout(async () => {
          setLoading(true);
          const { data, error } = await getDiscount({ lok_id: cookies.lok_id, key_val: keyword, dis_global: null });
          handleResponse({ data, error });
          setLoading(false);
        }, TIME_SEARCH_DEBOUNCE);
        return () => {
          clearTimeout(orderSearch);
        };
      } else if (!keyword) {
        setLoading(true);
        setDiscounts([]);
        const { data, error } = await getDiscount({ lok_id: cookies.lok_id, dis_global: null });
        console.log(data);
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
  }, [discounts, navbarRef]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(reactExports.Fragment, { children: [
    !loading ? null : /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingOverlay, { white: true }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-screen-adapt bg-gray-50 overflow-hidden relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 top-0 inset-x-0 fixed z-50 mx-auto desktop:max-w-[60%]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Navbar, { ref: navbarRef, className: `pt-2 px-2 py-2 relative`, blurred: false, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.IconButton, { variant: "text", size: "md", onClick: () => setMenuOpen(true), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bars3Icon, { className: "h-6 w-6 stroke-2" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-base font-semibold text-[#606060]", children: "Diskon" })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Tabs, { id: "custom-animation", value: "peritem", className: "px-2", style: { paddingTop: listPadding }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(react.TabsHeader, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Tab, { value: "peritem", children: "Per Item" }, 1),
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Tab, { value: "global", children: "Global" }, 2)
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          react.TabsBody,
          {
            animate: {
              initial: { y: 250 },
              mount: { y: 0 },
              unmount: { y: 250 }
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(react.TabPanel, { value: "peritem", className: "p-0 min-h-screen", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(react.List, { className: "divide-y divide-dashed divide-gray-400", children: discounts == null ? void 0 : discounts.map((i, index) => {
                  return /* @__PURE__ */ jsxRuntimeExports.jsxs(react.ListItem, { className: "", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full pr-2", onClick: () => handleOpen(i, 1, index), children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", {}),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "gray", className: "font-normal", children: /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: formatSentenceCase(i.dis_nama) }) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { color: "gray", className: "font-normal", children: `${i.dis_value}%` })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(react.ListItemSuffix, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.IconButton, { variant: "text", color: "blue-gray", onClick: () => handleOpen(i, 2, index), children: /* @__PURE__ */ jsxRuntimeExports.jsx(PencilSquareIcon, { className: "h-6 w-6 text-black-500" }) }) })
                  ] }, index);
                }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed bottom-4 right-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  react.IconButton,
                  {
                    variant: "filled",
                    color: "teal",
                    className: "rounded-full",
                    size: "lg",
                    onClick: () => handleOpen({}, 3, -1),
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(PlusCircleIcon, { className: "h-8 w-8 text-black-500" })
                  }
                ) })
              ] }, 1),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(react.TabPanel, { value: "global", className: "p-0 min-h-screen", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(react.List, { className: "divide-y divide-dashed divide-gray-400", children: discountsGlobal == null ? void 0 : discountsGlobal.map((i, index) => {
                  return /* @__PURE__ */ jsxRuntimeExports.jsxs(react.ListItem, { className: "", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full pr-2", onClick: () => handleOpen(i, 4, index), children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", {}),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "gray", className: "font-normal", children: /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: formatSentenceCase(i.dis_nama) }) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { color: "gray", className: "font-normal", children: `${i.dis_value}%` })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(react.ListItemSuffix, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.IconButton, { variant: "text", color: "blue-gray", onClick: () => handleOpen(i, 5, index), children: /* @__PURE__ */ jsxRuntimeExports.jsx(PencilSquareIcon, { className: "h-6 w-6 text-black-500" }) }) })
                  ] }, index);
                }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed bottom-4 right-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  react.IconButton,
                  {
                    variant: "filled",
                    color: "teal",
                    className: "rounded-full",
                    size: "lg",
                    onClick: () => handleOpen({}, 6, -1),
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(PlusCircleIcon, { className: "h-8 w-8 text-black-500" })
                  }
                ) })
              ] }, 2)
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Dialog, { open, handler: handleOpen, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.DialogHeader, { children: txtTitle }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(react.DialogBody, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            InputSimple,
            {
              value: discountById.dis_nama,
              label: "Nama Diskon",
              onChange: (evt) => handleChange(evt, "dis_nama"),
              disabled: readonly
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            InputNumber,
            {
              value: discountById.dis_value,
              label: "Nilai Diskon",
              onChange: (evt) => handleChange(evt, "dis_value"),
              disabled: readonly,
              icon: "%"
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(react.DialogFooter, { className: "flex gap-3 justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Button, { variant: "gradient", color: "blue-gray", onClick: () => setOpen(false), className: "w-full flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: mode == 1 || mode == 4 ? "Kembali" : "Batal" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            react.Button,
            {
              variant: "gradient",
              color: mode == 1 ? "red" : "green",
              onClick: mode == 1 ? () => handleNewOpen(discountById.dis_id) : saveData,
              className: "w-full flex-1",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: mode == 1 || mode == 4 ? "Hapus" : "Konfirmasi" })
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Dialog, { open: newOpen, handler: handleNewOpen, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.DialogBody, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center my-6", children: [
          "Diskon ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: discountById.dis_nama }),
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
  discountList as default
};
