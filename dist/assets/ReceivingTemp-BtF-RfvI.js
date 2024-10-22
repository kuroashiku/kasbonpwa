import { r as reactExports, A as AppContext, j as jsxRuntimeExports, a as react, T as TIME_SEARCH_DEBOUNCE, L as LoadingOverlay, e as dictionary } from "./index-CGEICd-f.js";
import { S as SearchNavbar } from "./SearchNavbar-BwHVnItL.js";
import { F as FilterChips } from "./FilterChips-Bif-hhPS.js";
import { f as formatThousandSeparator, e as formatRangeDate, d as formatDate, S as SetItemUnit } from "./formatter-DQiSfF1K.js";
import { d as deleteTransaction } from "./Transaction-DU-UTb94.js";
import { R as RcvListModel, P as POListModel, c as saveRcv, e as getRcv, g as getPo, a as PlusIcon, p as payRcv } from "./Inventory-De_z4uIO.js";
import { I as InfiniteScroll } from "./InfiniteScroll-CJQX2qNT.js";
import { I as InformationCircleIcon } from "./InformationCircleIcon-JoODmDxJ.js";
import { D as DayPicker } from "./index.esm-DzNpyuue.js";
import { l as lodashExports } from "./lodash-C34_XwDM.js";
import { F as FilterItemModel } from "./filter-DY4hzksJ.js";
import { A as AdjustmentsVerticalIcon } from "./AdjustmentsVerticalIcon-DBH-WKzU.js";
import { B as Bars3Icon } from "./Bars3Icon-BPkb_aHs.js";
function WalletIcon({
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
    d: "M2 3.5A1.5 1.5 0 0 1 3.5 2h9A1.5 1.5 0 0 1 14 3.5v.401a2.986 2.986 0 0 0-1.5-.401h-9c-.546 0-1.059.146-1.5.401V3.5ZM3.5 5A1.5 1.5 0 0 0 2 6.5v.401A2.986 2.986 0 0 1 3.5 6.5h9c.546 0 1.059.146 1.5.401V6.5A1.5 1.5 0 0 0 12.5 5h-9ZM8 10a2 2 0 0 0 1.938-1.505c.068-.268.286-.495.562-.495h2A1.5 1.5 0 0 1 14 9.5v3a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 12.5v-3A1.5 1.5 0 0 1 3.5 8h2c.276 0 .494.227.562.495A2 2 0 0 0 8 10Z"
  }));
}
const ForwardRef = reactExports.forwardRef(WalletIcon);
const WalletIcon$1 = ForwardRef;
function ReceivingScroll({
  rcv = [RcvListModel()],
  onOpen = () => {
  },
  onLoad = () => {
  },
  onPay = () => {
  },
  infinite = false
}) {
  const { currency } = reactExports.useContext(AppContext);
  const listItems = rcv.map((i, index) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(react.ListItem, { ripple: false, className: "flex flex-col gap-1 px-0 relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-[90%] flex flex-col gap-1 pr-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-[90%] whitespace-nowrap overflow-hidden text-ellipsis font-semibold", children: i.rcv_nomor }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `w-max whitespace-nowrap overflow-hidden text-ellipsis py-[2px] px-2 text-[12px] font-semibold rounded-md ${i.rcv_status == "PAID" ? "bg-green-100" : "bg-orange-100"}`,
            children: i.rcv_status == "PAID" ? "Sudah Lunas" : "Belum Lunas"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 text-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-max py-[2px] px-2 font-semibold bg-blue-100 rounded-md", children: i.rcv_total > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          currency,
          " ",
          formatThousandSeparator(parseFloat(i.rcv_total))
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          currency,
          " -"
        ] }) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "action-area flex items-center absolute top-1 right-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.IconButton, { variant: "text", color: "blue-gray", onClick: () => onOpen(i), children: /* @__PURE__ */ jsxRuntimeExports.jsx(InformationCircleIcon, { className: "h-7 w-7 text-light-blue-500" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          react.IconButton,
          {
            disabled: i.rcv_tglunas ? true : false,
            variant: "text",
            color: "blue-gray",
            onClick: () => onPay(i, index),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(WalletIcon$1, { className: "h-6 w-6 text-green-500" })
          }
        )
      ] })
    ] }, index);
  });
  if (infinite) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(InfiniteScroll, { listItems, lastRowHandler: onLoad, heightClass: "h-[100px]" });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Fragment, { children: listItems });
}
function POScroll({ po = [{}], setPO = () => {
}, onLoad = () => {
}, infinite = false }) {
  const listItems = po.map((i, index) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(react.ListItem, { className: " pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full", onClick: () => setPO(i, index), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col justify-between text-[15px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold", children: i.nomor }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: i.sup_nama })
    ] }) }) }, index);
  });
  if (infinite) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(InfiniteScroll, { listItems, lastRowHandler: onLoad, heightClass: "h-[50px]" });
  }
  return listItems;
}
function ReceivingFilter({ open = false, onClose = () => {
}, onApply = () => {
} }) {
  const { filters } = reactExports.useContext(AppContext);
  const [showCalendar, setShowCalendar] = reactExports.useState(false);
  const [isDateRange, setIsDateRange] = reactExports.useState(false);
  const [filtersTemp, setFiltersTemp] = reactExports.useState([]);
  const calendarRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false);
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [calendarRef]);
  reactExports.useEffect(() => {
    setFiltersTemp(filters);
  }, [filters]);
  const onDateRangeChange = reactExports.useCallback(
    (dateRange = { from: 0, to: 0 }) => {
      const _filters = lodashExports.cloneDeep(filtersTemp);
      const dateIndex = _filters.findIndex((f) => f.key === "date");
      if (dateRange.from || dateRange.to) {
        const newFilter = FilterItemModel();
        newFilter.key = "date";
        newFilter.valueMin = dateRange.from;
        newFilter.valueMax = dateRange.to;
        if (dateIndex >= 0) {
          _filters[dateIndex] = newFilter;
        } else {
          _filters.push(newFilter);
        }
      } else {
        if (dateIndex >= 0) {
          _filters.splice(dateIndex, 1);
        }
      }
      setFiltersTemp(_filters);
    },
    [filtersTemp]
  );
  const onDateChange = reactExports.useCallback(
    (date = /* @__PURE__ */ new Date()) => {
      const _filters = lodashExports.cloneDeep(filtersTemp);
      const dateIndex = _filters.findIndex((f) => f.key === "date");
      if (date) {
        const newFilter = FilterItemModel();
        newFilter.key = "date";
        newFilter.value = date;
        if (dateIndex >= 0) {
          _filters[dateIndex] = newFilter;
        } else {
          _filters.push(newFilter);
        }
      } else {
        if (dateIndex >= 0) {
          _filters.splice(dateIndex, 1);
        }
      }
      setFiltersTemp(_filters);
    },
    [filtersTemp]
  );
  const dateFilter = filtersTemp.find((f) => f.key === "date");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Drawer, { placement: "right", open, onClose, className: "p-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-6 flex items-center justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h5", color: "blue-gray", children: "Filter" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-5 gap-6 p-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-3 w-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        react.Input,
        {
          color: "teal",
          label: "Pilih Tanggal",
          onChange: () => {
          },
          onClick: () => setShowCalendar(true),
          value: !dateFilter ? "" : isDateRange ? formatRangeDate(dateFilter.valueMin, dateFilter.valueMax) : formatDate(dateFilter.value)
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs ml-2", children: "Dengan Range" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Switch, { color: "teal", onChange: () => setIsDateRange(!isDateRange) }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(react.Collapse, { open: showCalendar, children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Card, { className: "mx-auto w-5/6", ref: calendarRef, children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.CardBody, { className: "!p-0 ", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { transform: "scale(0.8) translate(-40px, -10px)" }, children: isDateRange ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      DayPicker,
      {
        mode: "range",
        selected: dateFilter ? { from: dateFilter.valueMin, to: dateFilter.valueMax } : {},
        onSelect: (range) => onDateRangeChange(range ?? {}),
        captionLayout: "dropdown",
        fromYear: 2010,
        toYear: (/* @__PURE__ */ new Date()).getFullYear()
      }
    ) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      DayPicker,
      {
        mode: "single",
        selected: dateFilter ? dateFilter.value : null,
        onSelect: onDateChange,
        captionLayout: "dropdown",
        fromYear: 2010,
        toYear: (/* @__PURE__ */ new Date()).getFullYear()
      }
    ) }) }) }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      react.Button,
      {
        color: "teal",
        className: "flex items-center justify-center w-full mt-5",
        onClick: () => onApply(filtersTemp),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AdjustmentsVerticalIcon, { className: "w-5 h-5 mr-2" }),
          "Terapkan Filter"
        ]
      }
    )
  ] });
}
function ReceivingList() {
  const { setMenuOpen, filters, setFilters, lang, cookies, rowsPerPage, currency } = reactExports.useContext(AppContext);
  const [listPadding, setListPadding] = reactExports.useState("20px");
  const [loading, setLoading] = reactExports.useState(true);
  const [keyword, setKeyword] = reactExports.useState("");
  const [keywordItem, setKeywordItem] = reactExports.useState("");
  reactExports.useState([POListModel]);
  const [receivings, setReceivings] = reactExports.useState([RcvListModel]);
  const [openFilter, setOpenFilter] = reactExports.useState(false);
  const [newOpen, setNewOpen] = reactExports.useState(false);
  const [page, setPage] = reactExports.useState(1);
  const [pageItem, setPageItem] = reactExports.useState(1);
  const [transById, setTransById] = reactExports.useState({});
  const navbarRef = reactExports.useRef();
  const [calendar, setCalendar] = reactExports.useState(false);
  const calendarRef = reactExports.useRef(null);
  const [open, setOpen] = reactExports.useState(false);
  const [refreshflag, setRefreshflag] = reactExports.useState(false);
  const [newRefreshflag, setNewRefreshflag] = reactExports.useState(false);
  const [rcvpolist, setRcvpolist] = reactExports.useState([]);
  const [rcvById, setRcvById] = reactExports.useState([RcvListModel]);
  reactExports.useState(true);
  reactExports.useState(true);
  const [polist, setPolist] = reactExports.useState([]);
  const [rcvFlag, setRcvFlag] = reactExports.useState(false);
  const [openInput, setOpenInput] = reactExports.useState(false);
  const [rcvItemById, setRcvItemById] = reactExports.useState({});
  const [qty, setQty] = reactExports.useState(1);
  const [qtyTemp, setQtyTemp] = reactExports.useState(1);
  const handleFilter = (searchKey) => {
    setKeyword(searchKey);
  };
  const handleFilterItem = (searchKey) => {
    setKeywordItem(searchKey);
  };
  const handleInput = reactExports.useCallback(
    (input) => {
      setQty(Number(input.qty));
      setOpenInput(true);
      setRcvItemById(input);
      setQtyTemp(input.qty);
    },
    [qty]
  );
  const handleCloseQty = reactExports.useCallback(() => {
    setOpenInput(false);
    if (qty == 0) {
      alert("Kuantiti tidak boleh 0");
      const _rcvpolist = [...rcvpolist];
      _rcvpolist.map((_item) => {
        if (_item.itm_id === rcvItemById.itm_id && _item.konvidx === rcvItemById.konvidx) {
          _item.qty = qtyTemp;
          _item.total = parseFloat(rcvItemById.satuan0hpp) * qtyTemp;
        }
      });
    }
    if (qty > qtyTemp) {
      alert("Kuantiti tidak boleh lebih dari yang terpesan");
      const _rcvpolist = [...rcvpolist];
      _rcvpolist.map((_item) => {
        if (_item.itm_id === rcvItemById.itm_id && _item.konvidx === rcvItemById.konvidx) {
          _item.qty = qtyTemp;
          _item.total = parseFloat(rcvItemById.satuan0hpp) * qtyTemp;
        }
      });
    }
  }, [qty, qtyTemp, rcvpolist, rcvItemById]);
  function handleChangeQty(evt) {
    setQty(evt.target.value);
    const _rcvpolist = [...rcvpolist];
    _rcvpolist.map((_item) => {
      if (_item.itm_id === rcvItemById.itm_id && _item.konvidx === rcvItemById.konvidx) {
        _item.qty = evt.target.value;
        _item.total = parseFloat(rcvItemById.satuan0hpp * evt.target.value);
      }
    });
    setRcvpolist(_rcvpolist);
  }
  const openDrawerRight = () => setOpenFilter(true);
  const handleResponse = ({ data, error }) => {
    if (error) {
      alert("Terjadi Kesalahan");
    } else {
      setReceivings(data);
    }
  };
  const handleAddItem = () => {
    setOpen(true);
  };
  const handleRcv = () => {
    setRcvpolist([]);
    setRcvFlag(true);
    setRcvById({
      rcv_po_id: "",
      rcv_total: 0,
      rcv_diskon: 0,
      rcv_kas_id: cookies.kas_id,
      rcv_lok_id: cookies.lok_id,
      rcv_catatan: "",
      rcv_status: "OPEN",
      rcv_id: 0,
      po_nomor: "",
      sup_nama: ""
    });
  };
  function handleEdit(item, index) {
    item.rcvitems.map((_rcvitem) => {
      _rcvitem.itm_id = _rcvitem.rcvi_itm_id;
      _rcvitem.satuan0 = _rcvitem.rcvi_satuan0;
      _rcvitem.satuan0hpp = parseFloat(_rcvitem.rcvi_satuan0hpp);
      _rcvitem.satuan0hrg = parseFloat(_rcvitem.rcvi_satuan0hrg);
      _rcvitem.satuan0of1 = parseFloat(_rcvitem.rcvi_satuan0of1);
      _rcvitem.satuan1 = _rcvitem.rcvi_satuan1;
      _rcvitem.satuan1hpp = parseFloat(_rcvitem.rcvi_satuan1hpp);
      _rcvitem.satuan1hrg = parseFloat(_rcvitem.rcvi_satuan1hrg);
      _rcvitem.total = parseFloat(_rcvitem.rcvi_total);
    });
    setRcvpolist(item.rcvitems);
    console.log(item);
    setRcvById(item);
    setRcvFlag(true);
  }
  function handlePay(item, index) {
    console.log(item);
    const init = async () => {
      await payRcv({
        rcv_id: item.rcv_id
      });
      setRefreshflag(!refreshflag);
    };
    init();
  }
  function setPO(item, index) {
    console.log(item);
    const _rcvById = lodashExports.cloneDeep(rcvById);
    _rcvById.po_nomor = item.nomor;
    _rcvById.rcv_po_id = item.po_id;
    _rcvById.sup_nama = item.sup_nama;
    item.poitems.map((_poitem) => {
      _poitem.satuan0hrg = _poitem.satuan0 == _poitem.satuan1 ? _poitem.satuan1hrg : _poitem.satuan0 == _poitem.satuan2 ? _poitem.satuan2hrg : _poitem.satuan3hrg;
      _poitem.satuan0hpp = _poitem.satuan0 == _poitem.satuan1 ? _poitem.satuan1hpp : _poitem.satuan0 == _poitem.satuan2 ? _poitem.satuan2hpp : _poitem.satuan3hpp;
      _poitem.satuan0of1 = _poitem.satuan0 == _poitem.satuan1 ? 1 : _poitem.satuan0 == _poitem.satuan2 ? _poitem.satuan2of1 : _poitem.satuan3of1;
    });
    setRcvpolist(item.poitems);
    setRcvById(_rcvById);
    setOpen(false);
  }
  const saveData = reactExports.useCallback(async () => {
    console.log(rcvById);
    setLoading(true);
    let totalPrice = 0;
    rcvpolist.forEach((item) => {
      const price = item.satuan0hpp;
      totalPrice += item.qty * price;
    });
    const _rcvById = lodashExports.cloneDeep(rcvById);
    _rcvById.rcv_total = totalPrice;
    _rcvById.rows = rcvpolist;
    console.log(_rcvById);
    console.log(_rcvById);
    const { data, error } = await saveRcv(_rcvById);
    if (error) {
      alert(error.message);
    } else {
      setRcvFlag(false);
      console.log(data);
      setLoading(false);
      setRefreshflag(!refreshflag);
      setNewRefreshflag(!newRefreshflag);
    }
  }, [rcvById, rcvpolist]);
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
    navbarRef.current ? setListPadding(`${navbarRef.current.offsetHeight + 20}px`) : null;
  }, [filters]);
  reactExports.useEffect(() => {
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
    if (keyword && keyword.length > 1) {
      const orderSearch = setTimeout(async () => {
        setPage(1);
        setLoading(true);
        const { data, error } = await getRcv({
          lok_id: cookies.lok_id,
          q: keyword,
          page: 1,
          rows: rowsPerPage,
          loaditems: "yes",
          orifields: "yes",
          ...filterProps
        });
        handleResponse({ data, error });
        setLoading(false);
      }, TIME_SEARCH_DEBOUNCE);
      return () => {
        clearTimeout(orderSearch);
      };
    } else if (!keyword) {
      const init = async () => {
        setReceivings([]);
        setLoading(true);
        setPage(1);
        const { data, error } = await getRcv({
          lok_id: cookies.lok_id,
          page: 1,
          rows: rowsPerPage,
          orifields: "yes",
          loaditems: "yes",
          ...filterProps
        });
        handleResponse({ data, error });
        setLoading(false);
      };
      init();
    }
  }, [keyword, filters, refreshflag]);
  const handleResponseItem = ({ data, error }) => {
    if (error) {
      alert("Data tidak ditemukan");
    } else {
      const temppo = data.filter(function(item) {
        return item.tgapprove !== null;
      });
      setPolist(temppo);
    }
  };
  reactExports.useEffect(() => {
    if (keywordItem && keywordItem.length > 1) {
      const orderSearch = setTimeout(async () => {
        setPage(1);
        setLoading(true);
        const { data, error } = await getPo({
          lok_id: cookies.lok_id,
          q: keywordItem,
          page: 1,
          rows: rowsPerPage,
          loaditems: "yes",
          status: "APPROVED",
          rcv: "true"
        });
        handleResponseItem({ data, error });
        setLoading(false);
      }, TIME_SEARCH_DEBOUNCE);
      return () => {
        clearTimeout(orderSearch);
      };
    } else if (!keywordItem) {
      const init = async () => {
        setPolist([]);
        setLoading(true);
        setPageItem(1);
        const { data, error } = await getPo({
          lok_id: cookies.lok_id,
          page: 1,
          rows: rowsPerPage,
          loaditems: "yes",
          status: "APPROVED",
          rcv: "true"
        });
        handleResponseItem({ data, error });
        setLoading(false);
      };
      init();
    }
  }, [keywordItem, filters, newRefreshflag]);
  reactExports.useEffect(() => {
    if (receivings[0] && receivings[0].po_id && !filters[0]) {
      const init = async () => {
        const { data, error } = await getRcv({
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
  const handleAppendResponse = ({ data, error }) => {
    if (error) {
      alert("Terjadi Kesalahan");
    } else {
      const _rcv = data;
      setReceivings([...receivings, ..._rcv]);
    }
  };
  reactExports.useEffect(() => {
    if (polist[0] && polist[0].id && !filters[0]) {
      const init = async () => {
        const { data, error } = await getPo({
          lok_id: cookies.lok_id,
          page: pageItem,
          rows: rowsPerPage,
          status: "APPROVED",
          rcv: "true",
          loaditems: "yes"
        });
        handleAppendResponseItem({ data, error });
      };
      init();
    }
  }, [pageItem, filters]);
  const handleAppendResponseItem = ({ data, error }) => {
    if (error) {
      alert("Terjadi Kesalahan");
    } else {
      const _po = data;
      setPolist([...polist, ..._po]);
    }
  };
  reactExports.useCallback(async () => {
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
      setTransById({});
      setPage(1);
      const init = async () => {
        const { data: data2, error: error2 } = await getPo({
          lok_id: cookies.lok_id,
          page: 1,
          status: "APPROVED",
          rows: rowsPerPage,
          loaditems: "yes"
        });
        handleResponse({ data: data2, error: error2 });
      };
      init();
      setLoading(false);
    }
  }, [transById]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(reactExports.Fragment, { children: [
    !loading ? null : /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingOverlay, { white: true }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-screen-adapt bg-gray-50 overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `top-0 inset-x-0 fixed ${!rcvFlag ? "bg-gradient-to-b from-gray-50" : ""} h-20` }),
      !rcvFlag && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 top-0 inset-x-0 fixed z-10 mx-auto desktop:max-w-[60%]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        react.Navbar,
        {
          ref: navbarRef,
          className: `pt-2 px-2 ${!filters.length ? "pb-6" : "pb-4"} relative`,
          blurred: false,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.IconButton, { variant: "text", size: "md", onClick: () => setMenuOpen(true), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bars3Icon, { className: "h-6 w-6 stroke-2" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-2 flex-grow", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SearchNavbar, { onSearch: handleFilter, value: keyword, label: "No. Receive Order" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.IconButton, { size: "md", variant: "text", onClick: openDrawerRight, children: /* @__PURE__ */ jsxRuntimeExports.jsx(AdjustmentsVerticalIcon, { className: "h-6 w-6 stroke-2" }) })
            ] }),
            !filters.length ? /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "gray", className: "absolute right-14 bottom-1 text-xs italic", children: "Semua Penerimaan" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-2 pt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FilterChips, { filters, onSetFilters: setFilters }) })
          ]
        }
      ) }),
      !rcvFlag ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pb-20 overflow-auto h-full", style: { paddingTop: listPadding }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.List, { className: "divide-y divide-dashed divide-gray-400", children: !receivings.length && !loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto py-20", children: "Receive Order Kosong" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          ReceivingScroll,
          {
            rcv: receivings,
            onOpen: handleEdit,
            onPay: handlePay,
            onLoad: () => setPage(page + 1),
            infinite: !keyword
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed bottom-4 right-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.IconButton, { variant: "filled", color: "teal", className: "rounded-full", size: "lg", onClick: handleRcv, children: /* @__PURE__ */ jsxRuntimeExports.jsx(PlusIcon, { className: "h-6 w-6 text-black-500" }) }) })
      ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col p-4 text-blue-gray-700 text-lg font-semibold border-b-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `w-full ${rcvById.po_nomor ? "" : "text-gray-400"}`, children: rcvById.po_nomor ? `PO (${rcvById.po_nomor})` : "PO Kosong" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `w-full ${rcvById.sup_nama ? "" : "text-gray-400"}`, children: rcvById.sup_nama ? `${rcvById.sup_nama}` : "Supplier Kosong" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.List, { className: "divide-y divide-dashed divide-gray-400 h-[100dvh]", children: rcvpolist == null ? void 0 : rcvpolist.map((i, index) => {
          return /* @__PURE__ */ jsxRuntimeExports.jsx(react.ListItem, { className: "", onClick: () => rcvById.rcv_status == "PAID" ? null : handleInput(i), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 mb-2 w-[100%]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: " flex flex-col gap-1 col-span-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-[100%] whitespace-nowrap overflow-hidden text-ellipsis font-semibold", children: i.itm_nama }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1 items-start", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-max py-[2px] px-2 text-[12px] font-semibold bg-orange-100 rounded-md", children: i.qty }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-max py-[2px] px-2 text-[12px] font-semibold bg-blue-100 rounded-md", children: [
                  "/ ",
                  SetItemUnit(i.satuan0.toUpperCase())
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                react.Typography,
                {
                  color: "gray",
                  className: "w-max py-[2px] px-2 text-[12px] font-semibold bg-green-100 rounded-md",
                  children: [
                    currency,
                    " ",
                    formatThousandSeparator(parseFloat(i.satuan0hpp))
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-[100%] flex flex-col gap-1 justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              react.Typography,
              {
                color: "gray",
                className: "w-max py-[2px] px-2 text-[15px] font-semibold bg-purple-50 rounded-md ",
                children: [
                  currency,
                  " ",
                  formatThousandSeparator(parseFloat(i.total))
                ]
              }
            ) })
          ] }) }, index);
        }) }),
        rcvpolist.length == 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed bottom-[85px] right-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.IconButton, { variant: "filled", color: "teal", className: "rounded-full", size: "lg", onClick: handleAddItem, children: /* @__PURE__ */ jsxRuntimeExports.jsx(PlusIcon, { className: "h-6 w-6 text-black-500" }) }) }) : null,
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed flex bottom-0 w-full justify-end p-4 font-semibold border-t-2 mx-auto desktop:max-w-[60%]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Button, { variant: "gradient", color: "blue-gray", onClick: () => setRcvFlag(false), className: "w-full mr-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Kembali" }) }),
          rcvById.rcv_status == "PAID" ? null : rcvpolist.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(react.Button, { variant: "gradient", color: "green", onClick: saveData, className: "w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Simpan" }) }) : null
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Dialog, { open, handler: handleAddItem, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.DialogHeader, { className: "text-lg text-blue-gray-700", children: "Tambah PO ke RCV" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(react.DialogBody, { className: "p-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "search-bar w-[90%] mx-auto mt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SearchNavbar, { onSearch: handleFilterItem, value: keywordItem, label: "No. Receive Order" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-h-[60vh] overflow-y-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.List, { className: "divide-y divide-dashed divide-gray-400", children: /* @__PURE__ */ jsxRuntimeExports.jsx(POScroll, { po: polist, setPO, onLoad: () => setPageItem(pageItem + 1), infinite: !keywordItem }) }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.DialogFooter, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Button, { variant: "gradient", color: "red", onClick: () => setOpen(false), className: "mr-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Cancel" }) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Dialog, { open: openInput, handler: handleCloseQty, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.DialogHeader, { className: "text-xl", children: dictionary.cashier.pos.inputHeader[lang] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(react.DialogBody, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Input, { type: "number", label: "Qty", value: qty, onChange: handleChangeQty }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Button, { className: "mb-4 mr-2", variant: "gradient", color: "blue-gray", onClick: handleCloseQty, children: "Kembali" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        ReceivingFilter,
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
  ReceivingList as default
};
