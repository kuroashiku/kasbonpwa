import { y as httpPost, z as API_HOST, r as reactExports, A as AppContext, S as SupplierListModel, u as useNavigate, t as topic, j as jsxRuntimeExports, L as LoadingOverlay, a as react } from "./index-CGEICd-f.js";
import { I as InputMoney } from "./InputMoney-BaIGaJbE.js";
import { f as formatThousandSeparator } from "./formatter-DQiSfF1K.js";
import { B as Bars3Icon } from "./Bars3Icon-BPkb_aHs.js";
const GetShiftReqBody = () => ({
  kas_id: 0
});
const ShiftListModel = () => ({
  mod_id: 0,
  mod_kas_id: 0,
  mod_status: "",
  mod_awal: 0,
  mod_akhir: 0,
  mod_checkin: "",
  formattedcheckin: "",
  mod_checkout: ""
});
const getShift = (body = GetShiftReqBody()) => {
  return httpPost(`${API_HOST}/shift/read`, body);
};
const checkIn = (body = GetShiftReqBody()) => {
  return httpPost(`${API_HOST}/shift/checkin`, body);
};
const checkOut = (body = GetShiftReqBody()) => {
  return httpPost(`${API_HOST}/shift/checkOut`, body);
};
function ShiftList() {
  const { setMenuOpen, filters, currency, setFilters, lang, dataLogin, cookies } = reactExports.useContext(AppContext);
  const [listPadding, setListPadding] = reactExports.useState("20px");
  const [loading, setLoading] = reactExports.useState(true);
  const [shift, setShift] = reactExports.useState([ShiftListModel()]);
  const [itemDisplay, setItemDisplay] = reactExports.useState(SupplierListModel());
  const navbarRef = reactExports.useRef();
  const [open, setOpen] = reactExports.useState(false);
  reactExports.useState(false);
  const [readonly, setReadonly] = reactExports.useState(false);
  const [shiftById, setShiftById] = reactExports.useState({});
  const [shiftId, setShiftId] = reactExports.useState(-1);
  const [txtTitle, settxtTitle] = reactExports.useState("");
  const [mode, setMode] = reactExports.useState(0);
  reactExports.useState("");
  const [modalAwal, setModalAwal] = reactExports.useState(0);
  const [modalAkhir, setModalAkhir] = reactExports.useState(0);
  const [lastshift, setLastShift] = reactExports.useState({});
  const navigate = useNavigate();
  function handleOpen(item, setedit, index) {
    if (setedit == true) {
      setReadonly(false);
      cookies.role_update.length == 0 && cookies.role_dst.length == 0 ? setOpen(!open) : cookies.role_dst.findIndex((a) => a == "ALL") >= 0 ? setOpen(!open) : cookies.role_update.findIndex((a) => a == "SUPP") >= 0 ? setOpen(!open) : setOpen(false);
      setShiftById(item);
      settxtTitle("Ubah Supplier");
      setMode(2);
    } else {
      setReadonly(true);
      setOpen(!open);
      setShiftById(item);
      settxtTitle("Detail Supplier");
      setMode(1);
    }
  }
  const handleChangeModal = (evt, id) => {
    if (id == "mod_awal")
      setModalAwal(evt.target.value);
    else
      setModalAkhir(evt.target.value);
  };
  const handleCheckIn = reactExports.useCallback(async () => {
    setItemDisplay(null);
    const { data, error } = await checkIn({ kas_id: cookies.kas_id, mod_awal: modalAwal });
    if (error) {
      alert("Data tidak ditemukan");
    } else {
      setLoading(true);
      setModalAwal(0);
      setShift([]);
      setLastShift({});
      setShiftId(-1);
      const { data: data2, error: error2 } = await getShift({ kas_id: cookies.kas_id });
      if (error2) {
        alert("Data tidak ditemukan");
      } else {
        setShift(data2);
        setLastShift(data2[0]);
      }
      setLoading(false);
    }
  }, [modalAwal]);
  const handleCheckOut = reactExports.useCallback(async () => {
    setItemDisplay(null);
    const { data, error } = await checkOut({ kas_id: cookies.kas_id, mod_akhir: modalAkhir });
    if (error) {
      alert("Data tidak ditemukan");
    } else {
      setLoading(true);
      setModalAkhir(0);
      setShift([]);
      setLastShift({});
      setShiftId(-1);
      const { data: data2, error: error2 } = await getShift({ kas_id: cookies.kas_id });
      if (error2) {
        alert("Data tidak ditemukan");
      } else {
        setShift(data2);
        setLastShift(data2[0]);
      }
      setLoading(false);
    }
  }, [modalAwal, modalAkhir]);
  reactExports.useEffect(() => {
    if (!cookies.lok_id) {
      navigate(topic.login.route);
    }
    const handleResponse = ({ data, error }) => {
      console.log(data);
      if (error) {
        alert("Data tidak ditemukan");
      } else {
        setShift(data);
        setLastShift(data[0]);
      }
    };
    const init = async () => {
      setLoading(true);
      setShift([]);
      const { data, error } = await getShift({ kas_id: cookies.kas_id });
      handleResponse({ data, error });
      setLoading(false);
    };
    init();
  }, []);
  reactExports.useEffect(() => {
    if (navbarRef.current) {
      setListPadding(`${navbarRef.current.offsetHeight + 20}px`);
    }
  }, [shift, navbarRef]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(reactExports.Fragment, { children: [
    !loading ? null : /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingOverlay, { white: true }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-screen-adapt bg-gray-50 overflow-hidden relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 top-0 inset-x-0 fixed z-50 mx-auto desktop:max-w-[60%]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Navbar, { ref: navbarRef, className: `pt-2 px-2 py-2 relative`, blurred: false, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.IconButton, { variant: "text", size: "md", onClick: () => setMenuOpen(true), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bars3Icon, { className: "h-6 w-6 stroke-2" }) }) }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 mt-5 overflow-auto h-full", style: { paddingTop: listPadding }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(InputMoney, { value: modalAwal, label: "Modal Awal", onChange: (evt) => handleChangeModal(evt, "mod_awal") }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Button, { variant: "gradient", color: "light-blue", onClick: () => handleCheckIn(), disabled: lastshift ? lastshift.mod_status == "CHECKEDIN" ? true : false : false, children: "Check In" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(InputMoney, { value: modalAkhir, label: "Modal Akhir", onChange: (evt) => handleChangeModal(evt, "mod_akhir") }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Button, { variant: "gradient", color: "light-blue", onClick: () => handleCheckOut(), disabled: lastshift ? lastshift.mod_status == "CHECKEDOUT" ? true : false : false, children: "Check Out" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "info flex-col grid grid-cols-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "gray", className: "text-[14px] font-medium text-center border-2 border-teal-500", children: "Check In" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "gray", className: "text-[14px] font-medium text-center pr-4 border-r-2 border-t-2 border-b-2 border-teal-500", children: "Check Out" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.List, { className: "divide-y divide-dashed divide-gray-400 border-r-2 border-b-2 border-l-2 border-teal-500", children: shift.map((i, index) => {
          return /* @__PURE__ */ jsxRuntimeExports.jsx(react.ListItem, { className: "flex items-center justify-between px-[3px] ", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-[90%] pr-2 flex-1", onClick: () => handleOpen(i, false), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "info flex-col gap-2 grid grid-cols-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "gray", className: "text-[14px] font-medium text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full flex flex-col gap-[5px]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-[90%] pl-7 whitespace-nowrap overflow-hidden text-ellipsis font-semibold", children: i.mod_checkin }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1 text-sm justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-max py-[2px] px-2 font-semibold bg-green-100 rounded-md", children: [
                currency,
                " ",
                formatThousandSeparator(parseFloat(i.mod_awal))
              ] }) })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "gray", className: "text-[14px] font-medium text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full flex flex-col gap-[5px]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-[90%] pl-7 whitespace-nowrap overflow-hidden text-ellipsis font-semibold", children: i.mod_checkout }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1 text-sm justify-center", children: i.mod_akhir ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-max py-[2px] px-2 font-semibold bg-green-100 rounded-md", children: [
                currency,
                " ",
                formatThousandSeparator(parseFloat(i.mod_akhir))
              ] }) : null })
            ] }) })
          ] }) }) }, index);
        }) })
      ] })
    ] })
  ] });
}
export {
  ShiftList as default
};
