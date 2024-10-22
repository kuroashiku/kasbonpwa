import { r as reactExports, A as AppContext, j as jsxRuntimeExports, a as react, T as TIME_SEARCH_DEBOUNCE, e as dictionary, L as LoadingOverlay, C as CubeIcon } from "./index-CGEICd-f.js";
import { S as SearchNavbar } from "./SearchNavbar-BwHVnItL.js";
import { F as FilterChips } from "./FilterChips-Bif-hhPS.js";
import { T as TransactionListModel, C as CreditListModel, g as getTransaction, s as saveCredit, d as deleteTransaction, a as getCredit } from "./Transaction-DU-UTb94.js";
import { f as formatThousandSeparator, d as formatDate, e as formatRangeDate } from "./formatter-DQiSfF1K.js";
import { I as InfiniteScroll } from "./InfiniteScroll-CJQX2qNT.js";
import { I as InformationCircleIcon } from "./InformationCircleIcon-JoODmDxJ.js";
import { T as TrashIcon } from "./TrashIcon-B8m1vLES.js";
import { T as TransactionFilter } from "./TransactionFilter-Cd1-pMJ4.js";
import { l as lodashExports } from "./lodash-C34_XwDM.js";
import { I as InputMoney } from "./InputMoney-BaIGaJbE.js";
import { P as POSSuccess } from "./POSSuccess-rNvbPxQE.js";
import { P as POSSuccessSplitBill, D as DocumentIcon, a as PrinterIcon$2 } from "./POSSuccessSplitBill-ChdoF55f.js";
import { B as Bars3Icon } from "./Bars3Icon-BPkb_aHs.js";
import { A as AdjustmentsVerticalIcon } from "./AdjustmentsVerticalIcon-DBH-WKzU.js";
import { T as TrashIcon$1 } from "./TrashIcon-D-NGhcgm.js";
import "./filter-DY4hzksJ.js";
import "./index.esm-DzNpyuue.js";
import "./thermal-printer-encoder.esm-Df5pJIWs.js";
function BanknotesIcon({
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
    d: "M1 3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V3Zm9 3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm-6.25-.75a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5ZM11.5 6A.75.75 0 1 1 13 6a.75.75 0 0 1-1.5 0Z",
    clipRule: "evenodd"
  }), /* @__PURE__ */ reactExports.createElement("path", {
    d: "M13 11.75a.75.75 0 0 0-1.5 0v.179c0 .15-.138.28-.306.255A65.277 65.277 0 0 0 1.75 11.5a.75.75 0 0 0 0 1.5c3.135 0 6.215.228 9.227.668A1.764 1.764 0 0 0 13 11.928v-.178Z"
  }));
}
const ForwardRef$1 = reactExports.forwardRef(BanknotesIcon);
const BanknotesIcon$1 = ForwardRef$1;
function PrinterIcon({
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
    d: "M4 5a2 2 0 0 0-2 2v3a2 2 0 0 0 1.51 1.94l-.315 1.896A1 1 0 0 0 4.18 15h7.639a1 1 0 0 0 .986-1.164l-.316-1.897A2 2 0 0 0 14 10V7a2 2 0 0 0-2-2V2a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v3Zm1.5 0V2.5h5V5h-5Zm5.23 5.5H5.27l-.5 3h6.459l-.5-3Z",
    clipRule: "evenodd"
  }));
}
const ForwardRef = reactExports.forwardRef(PrinterIcon);
const PrinterIcon$1 = ForwardRef;
function TransactionScroll({
  transactions = [TransactionListModel()],
  checkedIds = () => {
  },
  onCheck = () => {
  },
  onRemove = () => {
  },
  onLoad = () => {
  },
  onOpen = () => {
  },
  onPrint = () => {
  },
  infinite = false
}) {
  const { currency, cookies } = reactExports.useContext(AppContext);
  const listItems = transactions.map((i, index) => {
    const namacustomerdraft = i.cus_nama ? i.cus_nama : "Tanpa Nama";
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(react.ListItem, { className: "px-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(react.ListItemPrefix, { className: "mr-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Checkbox, { color: "teal", onChange: () => onCheck(i), checked: checkedIds.includes(i.id) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full flex flex-col gap-[5px]", onClick: () => onOpen(i, index), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-[90%] whitespace-nowrap overflow-hidden text-ellipsis font-semibold", children: i.nomor }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-max py-[2px] px-2 text-[12px] font-semibold bg-blue-100 rounded-md", children: namacustomerdraft }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-max py-[2px] px-2 font-semibold bg-green-100 rounded-md", children: [
            currency,
            " ",
            formatThousandSeparator(parseFloat(i.total))
          ] }),
          i.not_dicicil == 1 && i.piutlunas == 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-max py-[2px] px-2 font-semibold bg-orange-100 rounded-md", children: "Belum Lunas" }) : i.not_dicicil == 1 && i.piutlunas == 1 ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-max py-[2px] px-2 font-semibold bg-lime-200 rounded-md", children: "Lunas" }) : ""
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(react.ListItemSuffix, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Popover, { placement: "bottom-start", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.PopoverHandler, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.IconButton, { variant: "text", color: "blue-gray", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          InformationCircleIcon,
          {
            className: `${i.not_status ? "text-light-green-500" : "text-light-blue-500"} h-7 w-7`
          }
        ) }) }),
        !i.notaitems ? null : /* @__PURE__ */ jsxRuntimeExports.jsx(react.PopoverContent, { className: "w-11/12 max-w-[700px]", children: i.notaitems.map((ii, indexi) => {
          return cookies.lok_type == "laundry" ? ii.service_level_satuan0.map((iii, indexii) => {
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full", children: [
                " ",
                ii.itm_nama,
                " ",
                iii.service_nama ? "(" : "",
                iii.service_nama,
                iii.service_nama ? ")" : ""
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "!h-fit flex items-center justify-between mb-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Typography, { variant: "small", color: "gray", className: "font-normal", children: [
                  `${iii.service_qty} `,
                  ii.satuan0
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Typography, { color: "gray", className: "font-normal", variant: "small", children: [
                  currency,
                  " ",
                  formatThousandSeparator(parseFloat(iii.service_total))
                ] })
              ] })
            ] }, indexi + indexii);
          }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full", children: [
              " ",
              ii.itm_nama,
              " "
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "!h-fit flex items-center justify-between mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Typography, { variant: "small", color: "gray", className: "font-normal", children: [
                `${ii.qty} `,
                ii.satuan0
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Typography, { color: "gray", className: "font-normal", variant: "small", children: [
                currency,
                " ",
                formatThousandSeparator(parseFloat(ii.total))
              ] })
            ] })
          ] }, indexi);
        }) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(react.ListItemSuffix, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        react.IconButton,
        {
          disabled: i.not_dicicil == 1 && i.piutlunas == 0 ? false : true,
          variant: "text",
          color: "blue-gray",
          onClick: () => onOpen(i, index),
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(BanknotesIcon$1, { className: "h-6 w-6 text-purple-500" })
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(react.ListItemSuffix, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.IconButton, { variant: "text", color: "blue-gray", onClick: () => onPrint(i, index), children: /* @__PURE__ */ jsxRuntimeExports.jsx(PrinterIcon$1, { className: "h-6 w-6 text-purple-500" }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(react.ListItemSuffix, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.IconButton, { variant: "text", color: "blue-gray", onClick: () => onRemove(i), children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrashIcon, { className: "h-6 w-6 text-red-500" }) }) })
    ] }, index);
  });
  if (infinite) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(InfiniteScroll, { listItems, lastRowHandler: onLoad, heightClass: "h-[100px]" });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Fragment, { children: listItems });
}
function Transaction() {
  const {
    setMenuOpen,
    filters,
    setFilters,
    lang,
    cookies,
    rowsPerPage,
    currency,
    setItemsCheckout,
    setNotaItemsCheckout,
    setMoney,
    setTotalPay,
    setNotaItemsCheckoutSplitBill
  } = reactExports.useContext(AppContext);
  const [listPadding, setListPadding] = reactExports.useState("20px");
  const [loading, setLoading] = reactExports.useState(true);
  const [keyword, setKeyword] = reactExports.useState("");
  const [transactions, setTransactions] = reactExports.useState([TransactionListModel]);
  const [credits, setCredits] = reactExports.useState([CreditListModel]);
  const [openFilter, setOpenFilter] = reactExports.useState(false);
  const [newOpen, setNewOpen] = reactExports.useState(false);
  const [page, setPage] = reactExports.useState(1);
  const [transById, setTransById] = reactExports.useState({});
  const [transIndex, setTransIndex] = reactExports.useState(-1);
  const navbarRef = reactExports.useRef();
  const [calendar, setCalendar] = reactExports.useState(false);
  const calendarRef = reactExports.useRef(null);
  const [open, setOpen] = reactExports.useState(false);
  const [bunga, setBunga] = reactExports.useState(0);
  const [cicil, setCicil] = reactExports.useState(0);
  const [success, setSuccess] = reactExports.useState(false);
  const [successJoin, setSuccessJoin] = reactExports.useState(false);
  const [refreshflag, setRefreshflag] = reactExports.useState(false);
  const [totalnota, setTotalnota] = reactExports.useState(0);
  const [totalitem, setTotalitem] = reactExports.useState(0);
  const [totalnominal, setTotalnominal] = reactExports.useState(0);
  const [transCheckId, setTransCheckId] = reactExports.useState([]);
  const initData = reactExports.useCallback(() => {
    const _dateFilter = filters.find((f) => f.key === "date");
    let filterProps = {};
    if (_dateFilter) {
      if (_dateFilter.value) {
        const datepart = formatDate(_dateFilter.value, true).split("-");
        filterProps = {
          har: Number(datepart[0]),
          bln: Number(datepart[1]),
          thn: Number(datepart[2])
        };
      } else {
        const datepart = formatRangeDate(_dateFilter.valueMin, _dateFilter.valueMax, true).split("/");
        if (datepart[1]) {
          filterProps = {
            datepast: datepart[0],
            datenow: datepart[1]
          };
        } else {
          filterProps = {
            datepast: datepart[0] + " 00:00:00",
            datenow: datepart[0] + " 23:59:59"
          };
        }
      }
    }
    if (keyword && keyword.length > 0) {
      const orderSearch = setTimeout(async () => {
        setLoading(true);
        const { data, error } = await getTransaction({
          lok_id: cookies.lok_id,
          q: keyword,
          page: 1,
          rows: rowsPerPage,
          loaditems: "yes",
          ...filterProps
        });
        if (page <= 1)
          handleResponse({ data, error });
        else
          handleAppendResponse({ data, error });
        setLoading(false);
      }, TIME_SEARCH_DEBOUNCE);
      return () => {
        clearTimeout(orderSearch);
      };
    } else if (!keyword) {
      const init = async () => {
        setLoading(true);
        if (page <= 1) {
          if (localStorage.getItem("transaksi_1")) {
            const _transactions = JSON.parse(localStorage.getItem("transaksi_1")).value;
            setTransactions(_transactions);
            let titem = 0;
            let ttotal = 0;
            _transactions == null ? void 0 : _transactions.map((i, index) => {
              i.notaitems.map((ii, indexi) => {
                if (cookies.lok_type != "laundry") {
                  titem = titem + parseFloat(ii.qty);
                  ttotal = ttotal + parseFloat(ii.total);
                }
                if (cookies.lok_type == "laundry") {
                  ii.service_level_satuan0 = ii.service_level_satuan0 ? JSON.parse(ii.nit_service_level_satuan0) : [];
                  ii.service_level_satuan0.map((iii, indexii) => {
                    titem = titem + parseFloat(iii.service_qty);
                    ttotal = ttotal + parseFloat(iii.service_total);
                  });
                }
              });
            });
            setTotalnota(_transactions.length);
            setTotalitem(titem);
            setTotalnominal(ttotal);
          } else {
            const { data, error } = await getTransaction({
              lok_id: cookies.lok_id,
              page: 1,
              rows: rowsPerPage,
              loaditems: "yes",
              ...filterProps
            });
            if (error)
              alert("Transaksi ke-1 keatas belum sempat tersimpan di lokal");
            else
              handleResponse({ data, error });
          }
        } else {
          if (localStorage.getItem("transaksi_" + page)) {
            const _transactions = JSON.parse(localStorage.getItem("transaksi_" + page)).value;
            setTransactions([...transactions, ..._transactions]);
          } else {
            const { data, error } = await getTransaction({
              lok_id: cookies.lok_id,
              page,
              rows: rowsPerPage,
              loaditems: "yes",
              ...filterProps
            });
            if (error)
              alert("Transaksi ke-" + page * 20 + " keatas belum sempat tersimpan di lokal");
            else
              handleAppendResponse({ data, error });
          }
        }
        setLoading(false);
      };
      init();
    }
  }, [keyword, filters, page]);
  reactExports.useEffect(() => {
    setTransactions([]);
    setPage(1);
    initData();
  }, [keyword, filters]);
  reactExports.useEffect(() => {
    if (page > 1)
      initData();
  }, [page]);
  const handleResponse = ({ data, error }) => {
    console.log("aaaaaaaa");
    if (error) {
      alert("Terjadi Kesalahan");
    } else {
      setTransactions(data);
      let titem = 0;
      let ttotal = 0;
      data.map((i, index) => {
        i.notaitems.map((ii, indexi) => {
          if (cookies.lok_type != "laundry") {
            titem = titem + parseFloat(ii.qty);
            ttotal = ttotal + parseFloat(ii.total);
          }
          if (cookies.lok_type == "laundry") {
            ii.service_level_satuan0 = ii.service_level_satuan0 ? JSON.parse(ii.nit_service_level_satuan0) : [];
            ii.service_level_satuan0.map((iii, indexii) => {
              titem = titem + parseFloat(iii.service_qty);
              ttotal = ttotal + parseFloat(iii.service_total);
            });
          }
        });
      });
      setTotalnota(data.length);
      setTotalitem(titem);
      setTotalnominal(ttotal);
      localStorage.setItem(
        "transaksi_1",
        JSON.stringify({
          key: "transaksi",
          value: data
        })
      );
    }
  };
  const handleAppendResponse = ({ data, error }) => {
    if (error) {
      alert("Terjadi Kesalahan");
    } else {
      const _transactions = data;
      setTransactions([...transactions, ..._transactions]);
      localStorage.setItem(
        "transaksi_" + page,
        JSON.stringify({
          key: "transaksi",
          value: data
        })
      );
    }
  };
  const handleFilter = (searchKey) => {
    setKeyword(searchKey);
  };
  const openDrawerRight = () => setOpenFilter(true);
  function handleOpen(item, index) {
    setTransIndex(index);
    setTransById(item);
    const init = async () => {
      setCredits([]);
      const { data, error } = await getCredit({
        not_id: item.not_id,
        lok_id: cookies.lok_id
      });
      if (data.length > 0) {
        data[0].cil_cicilan = 0;
        data[0].cil_tagihan = data[0].cil_sisa;
        data[0].cil_kekurangan = data[0].cil_sisa;
        data[0].cil_bunga = 0;
        setCredits(data[0]);
      } else {
        setCredits({
          cil_kekurangan: Math.abs(item.kembalian),
          cil_bunga: 0,
          cil_tagihan: Math.abs(item.kembalian),
          cil_cicilan: 0,
          cil_sisa: 0,
          cil_carabayar: "KAS"
        });
      }
      cookies.role_update.length == 0 && cookies.role_dst.length == 0 ? setOpen(!open) : cookies.role_dst.findIndex((a) => a == "ALL") >= 0 ? setOpen(!open) : cookies.role_update.findIndex((a) => a == "TRANS") >= 0 ? setOpen(!open) : setOpen(false);
    };
    init();
  }
  const saveData = reactExports.useCallback(async () => {
    credits.cil_id = -1;
    credits.cil_not_id = transById.not_id;
    credits.cil_carabayar = "KAS";
    const { data, error } = await saveCredit(credits);
    if (error) {
      alert(dictionary.cashier.calculator.failed[lang]);
    } else {
      setOpen(false);
      const _transactions = lodashExports.cloneDeep(transactions);
      console.log(_transactions[transIndex]);
      console.log(data);
      if (parseInt(data[0].cil_sisa) == 0) {
        _transactions[transIndex].piutlunas = 1;
        setTransactions(_transactions);
      }
    }
  }, [transById, credits]);
  const handleChange = (evt, id) => {
    setCredits({
      ...credits,
      [id]: evt.target.value
    });
    if (id == "cil_bunga")
      setBunga(evt.target.value);
    if (id == "cil_cicilan")
      setCicil(evt.target.value);
  };
  reactExports.useEffect(() => {
    const newcredits = lodashExports.cloneDeep(credits);
    newcredits.cil_tagihan = newcredits.cil_kekurangan * (1 + parseInt(newcredits.cil_bunga) / 100);
    newcredits.cil_sisa = parseFloat(newcredits.cil_tagihan) - parseFloat(cicil) < 0 ? 0 : parseFloat(parseFloat(newcredits.cil_tagihan) - parseFloat(cicil));
    setCredits(newcredits);
  }, [bunga]);
  reactExports.useEffect(() => {
    const newcredits = lodashExports.cloneDeep(credits);
    newcredits.cil_sisa = parseFloat(newcredits.cil_tagihan) - parseFloat(cicil) < 0 ? 0 : parseFloat(parseFloat(newcredits.cil_tagihan) - parseFloat(cicil));
    setCredits(newcredits);
  }, [cicil]);
  reactExports.useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setCalendar(false);
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [calendarRef]);
  reactExports.useEffect(() => {
    setListPadding(`${navbarRef.current.offsetHeight + 20}px`);
  }, [filters]);
  reactExports.useEffect(() => {
    if (transactions[0] && transactions[0].id && !filters[0]) {
      const init = async () => {
        const { data, error } = await getTransaction({
          lok_id: cookies.lok_id,
          page,
          rows: rowsPerPage,
          loaditems: "yes"
        });
        handleAppendResponse({ data, error });
      };
      init();
    }
  }, [page, filters]);
  function handleNewOpen(item) {
    setTransById(item);
    cookies.role_delete.length == 0 && cookies.role_dst.length == 0 ? setNewOpen(!newOpen) : cookies.role_dst.findIndex((a) => a == "ALL") >= 0 ? setNewOpen(!newOpen) : cookies.role_delete.findIndex((a) => a == "TRANS") >= 0 ? setNewOpen(!newOpen) : setNewOpen(false);
  }
  function handlePrint(item) {
    localStorage.setItem("checkout-prev", "/transaction");
    setSuccess(true);
    setItemsCheckout([]);
    item.dibayar = parseFloat(item.dibayar);
    item.total = parseFloat(item.total);
    item.notaitems.map((ii, indexi) => {
      ii.satuan0hrg = parseFloat(ii.satuan0hrg);
      ii.total = parseFloat(ii.total);
    });
    setNotaItemsCheckout(item);
    setTotalPay(0);
    setMoney(0);
    console.log(item);
  }
  const handleDelete = reactExports.useCallback(async () => {
    const { data, error } = await deleteTransaction({
      not_id: transById.id,
      log_reason: "",
      kas_id: cookies.kas_id
    });
    if (error) {
      alert("Data tidak ditemukan");
    } else {
      setLoading(true);
      setNewOpen(false);
      setRefreshflag(!refreshflag);
      setLoading(false);
    }
  }, [transById]);
  const handleCheckChange = reactExports.useCallback(
    (item) => {
      const oldArray = [...transCheckId];
      const indexOfId = oldArray.indexOf(item.id);
      if (indexOfId >= 0) {
        oldArray.splice(indexOfId, 1);
        setTransCheckId(oldArray);
      } else {
        setTransCheckId([...oldArray, item.id]);
      }
    },
    [transCheckId]
  );
  if (success) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(POSSuccess, { exit: () => setSuccess(false) });
  }
  if (successJoin) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(POSSuccessSplitBill, { exit: () => setSuccessJoin(false) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(reactExports.Fragment, { children: [
    !loading ? null : /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingOverlay, { white: true }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-screen-adapt bg-gray-50 overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "top-0 inset-x-0 fixed bg-gradient-to-b from-gray-50 h-20" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 top-0 inset-x-0 fixed z-10 mx-auto desktop:max-w-[60%]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Navbar, { ref: navbarRef, className: `pt-2 px-2 ${!filters.length ? "pb-6" : "pb-4"} relative`, blurred: false, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.IconButton, { variant: "text", size: "md", onClick: () => setMenuOpen(true), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bars3Icon, { className: "h-6 w-6 stroke-2" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-2 flex-grow", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SearchNavbar, { onSearch: handleFilter, value: keyword, label: "No. Transaksi" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.IconButton, { size: "md", variant: "text", onClick: openDrawerRight, children: /* @__PURE__ */ jsxRuntimeExports.jsx(AdjustmentsVerticalIcon, { className: "h-6 w-6 stroke-2" }) })
        ] }),
        !filters.length ? /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "gray", className: "absolute right-14 bottom-1 text-xs italic", children: "Semua Transaksi" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-2 pt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FilterChips, { filters, onSetFilters: setFilters }) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pb-20 overflow-auto h-full", style: { paddingTop: listPadding }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.List, { className: "divide-y divide-dashed divide-gray-400", children: !transactions.length && !loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto py-20", children: dictionary.transaction.noItems[lang] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "head-content flex gap-3 items-center mb-4 w-[97%] mx-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "nota flex gap-[2px] items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(DocumentIcon, { className: "w-7 h-7" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold bg-[#d8bfd8] px-2 rounded-tr-lg rounded-br-lg", children: totalnota })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "item flex gap-[2px] items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CubeIcon, { className: "w-7 h-7" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold bg-[#b0e0e6] px-2 rounded-tr-lg rounded-br-lg", children: totalitem })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "nominal flex gap-1 items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold bg-[#ffd700] px-2 rounded-lg", children: [
            "Rp ",
            formatThousandSeparator(totalnominal)
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          TransactionScroll,
          {
            transactions,
            onRemove: handleNewOpen,
            onOpen: handleOpen,
            onLoad: () => setPage(page + 1),
            infinite: !keyword,
            onPrint: handlePrint,
            checkedIds: transCheckId,
            onCheck: handleCheckChange
          }
        )
      ] }) }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Dialog, { open, handler: handleOpen, size: "xxl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.DialogHeader, { className: "border-b-2", children: "Transaksi" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(react.DialogBody, { className: "overflow-auto pb-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            InputMoney,
            {
              currency,
              disabled: true,
              label: "Tagihan",
              onChange: (evt) => handleChange(evt, "cil_tagihan"),
              value: credits.cil_tagihan
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            InputMoney,
            {
              currency,
              disabled: true,
              label: "Sisa",
              value: parseFloat(credits.cil_sisa)
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            InputMoney,
            {
              currency,
              label: "Cicilan",
              onChange: (evt) => handleChange(evt, "cil_cicilan"),
              value: credits.cil_cicilan
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            InputMoney,
            {
              label: "Bunga",
              onChange: (evt) => handleChange(evt, "cil_bunga"),
              value: credits.cil_bunga,
              icon: "%",
              max: 100
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(react.DialogFooter, { className: "border-t-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Button, { variant: "gradient", color: "red", onClick: () => setOpen(false), className: "mr-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Back" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Button, { className: "block", variant: "gradient", color: "green", onClick: saveData, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Confirm" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Dialog, { open: newOpen, handler: handleNewOpen, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.DialogBody, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center my-6", children: [
          "Transaksi ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: transById.nomor }),
          " akan dihapus. Apakah anda yakin?"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(react.DialogFooter, { className: "flex gap-3 justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Button, { variant: "gradient", color: "blue-gray", onClick: () => setNewOpen(false), className: "w-full flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Batal" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Button, { variant: "gradient", color: "red", onClick: handleDelete, className: "w-full flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Hapus" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed bottom-20 right-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        react.IconButton,
        {
          variant: "filled",
          color: transCheckId.length > 0 ? "teal" : "blue-gray",
          className: transCheckId.length > 0 ? "rounded-full pointer-events-auto" : "rounded-full pointer-events-none",
          size: "lg",
          onClick: () => handleAdd(),
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(PrinterIcon$2, { className: "h-8 w-8 text-black-500" })
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed bottom-4 right-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        react.IconButton,
        {
          variant: "filled",
          color: transCheckId.length > 0 ? "red" : "blue-gray",
          className: transCheckId.length > 0 ? "rounded-full pointer-events-auto" : "rounded-full pointer-events-none",
          size: "lg",
          onClick: handleNewOpen,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrashIcon$1, { className: "h-8 w-8 text-black-500" })
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        TransactionFilter,
        {
          open: openFilter,
          onClose: () => setOpenFilter(false),
          onApply: (newFilter) => {
            setFilters(newFilter);
            setOpenFilter(false);
          }
        }
      )
    ] })
  ] });
}
export {
  Transaction as default
};
