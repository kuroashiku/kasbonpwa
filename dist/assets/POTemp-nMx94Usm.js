import { r as reactExports, A as AppContext, j as jsxRuntimeExports, a as react, g as ItemListModel, T as TIME_SEARCH_DEBOUNCE, L as LoadingOverlay, H as TruckIcon, e as dictionary, c as convertItemListToCheckout, w as getSupplier } from "./index-CGEICd-f.js";
import { S as SearchNavbar } from "./SearchNavbar-BwHVnItL.js";
import { F as FilterChips } from "./FilterChips-Bif-hhPS.js";
import { f as formatThousandSeparator, e as formatRangeDate, d as formatDate, b as formatSentenceCase, S as SetItemUnit } from "./formatter-DQiSfF1K.js";
import { P as POListModel, s as savePo, g as getPo, d as deletePo, a as PlusIcon, b as approvePo } from "./Inventory-De_z4uIO.js";
import { g as getItems } from "./Item-Btr_yyWl.js";
import { I as InfiniteScroll } from "./InfiniteScroll-CJQX2qNT.js";
import { I as InformationCircleIcon } from "./InformationCircleIcon-JoODmDxJ.js";
import { T as TrashIcon } from "./TrashIcon-B8m1vLES.js";
import { D as DayPicker } from "./index.esm-DzNpyuue.js";
import { l as lodashExports } from "./lodash-C34_XwDM.js";
import { F as FilterItemModel } from "./filter-DY4hzksJ.js";
import { A as AdjustmentsVerticalIcon } from "./AdjustmentsVerticalIcon-DBH-WKzU.js";
import { I as InputMoney } from "./InputMoney-BaIGaJbE.js";
import { B as Bars3Icon } from "./Bars3Icon-BPkb_aHs.js";
import { P as PlusCircleIcon } from "./PlusCircleIcon-CFdoe21X.js";
function HandThumbUpIcon({
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
    d: "M2.09 15a1 1 0 0 0 1-1V8a1 1 0 1 0-2 0v6a1 1 0 0 0 1 1ZM5.765 13H4.09V8c.663 0 1.218-.466 1.556-1.037a4.02 4.02 0 0 1 1.358-1.377c.478-.292.907-.706.989-1.26V4.32a9.03 9.03 0 0 0 0-2.642c-.028-.194.048-.394.224-.479A2 2 0 0 1 11.09 3c0 .812-.08 1.605-.235 2.371a.521.521 0 0 0 .502.629h1.733c1.104 0 2.01.898 1.901 1.997a19.831 19.831 0 0 1-1.081 4.788c-.27.747-.998 1.215-1.793 1.215H9.414c-.215 0-.428-.035-.632-.103l-2.384-.794A2.002 2.002 0 0 0 5.765 13Z"
  }));
}
const ForwardRef = reactExports.forwardRef(HandThumbUpIcon);
const HandThumbUpIcon$1 = ForwardRef;
function POScroll({
  po = [POListModel()],
  onOpen = () => {
  },
  onRemove = () => {
  },
  onLoad = () => {
  },
  onApprove = () => {
  },
  // onPrint = () => {},
  infinite = false
}) {
  const { currency } = reactExports.useContext(AppContext);
  const listItems = po.map((i, index) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(react.ListItem, { ripple: false, className: "flex flex-col gap-1 px-0 relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-[90%] flex flex-col gap-1 pr-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-[90%] whitespace-nowrap overflow-hidden text-ellipsis font-semibold", children: i.po_nomor }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `w-max whitespace-nowrap overflow-hidden text-ellipsis py-[2px] px-2 text-[12px] font-semibold rounded-md ${i.po_tgapprove ? "bg-green-100" : "bg-orange-100"}`,
            children: i.po_tgapprove ? "Sudah Di Approve" : "Belum Di Approve"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-[12px]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-max py-[2px] px-2 font-semibold bg-blue-100 rounded-md", children: i.po_total > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            currency,
            " ",
            formatThousandSeparator(parseFloat(i.po_total))
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            currency,
            " -"
          ] }) }),
          i.not_dicicil == 1 && i.piutlunas == 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-max py-[2px] px-2 font-semibold bg-orange-100 rounded-md", children: "Belum Lunas" }) : i.not_dicicil == 1 && i.piutlunas == 1 ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-max py-[2px] px-2 font-semibold bg-lime-200 rounded-md", children: "Lunas" }) : ""
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "action-area flex items-center absolute top-1 right-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.IconButton, { variant: "text", color: "blue-gray", onClick: () => onOpen(i), children: /* @__PURE__ */ jsxRuntimeExports.jsx(InformationCircleIcon, { className: "h-7 w-7 text-light-blue-500" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          react.IconButton,
          {
            disabled: i.po_tgapprove ? true : false,
            variant: "text",
            color: "blue-gray",
            onClick: () => onApprove(i, index),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(HandThumbUpIcon$1, { className: "h-6 w-6 text-green-500" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          react.IconButton,
          {
            disabled: i.po_tgapprove ? true : false,
            variant: "text",
            color: "blue-gray",
            onClick: () => onRemove(i),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrashIcon, { className: "h-6 w-6 text-red-500" })
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
function POFilter({ open = false, onClose = () => {
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
function POItemScroll({
  item = [ItemListModel()],
  setItem = () => {
  },
  onLoad = () => {
  },
  // onPrint = () => {},
  infinite = false
}) {
  const { currency } = reactExports.useContext(AppContext);
  const listItems = item.map((i, index) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(react.ListItem, { className: "", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full pr-2", onClick: () => setItem(i, index), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "gray", className: "font-normal", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("b", { children: [
          formatSentenceCase(i.itm_nama),
          " /",
          formatSentenceCase(i.satuan0)
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Typography, { color: "gray", className: "font-normal", children: [
          currency,
          " ",
          formatThousandSeparator(i.satuan0hpp)
        ] })
      ] })
    ] }) }, index);
  });
  if (infinite) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(InfiniteScroll, { listItems, lastRowHandler: onLoad, heightClass: "h-[50px]" });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Fragment, { children: listItems });
}
function POTemp() {
  const { setMenuOpen, filters, setFilters, lang, cookies, rowsPerPage, currency } = reactExports.useContext(AppContext);
  const [listPadding, setListPadding] = reactExports.useState("20px");
  const [loading, setLoading] = reactExports.useState(true);
  const [keyword, setKeyword] = reactExports.useState("");
  const [keywordItem, setKeywordItem] = reactExports.useState("");
  const [purchaseorders, setPurchaseorders] = reactExports.useState([POListModel]);
  const [suppliers, setSuppliers] = reactExports.useState([]);
  const [openFilter, setOpenFilter] = reactExports.useState(false);
  const [newOpen, setNewOpen] = reactExports.useState(false);
  const [page, setPage] = reactExports.useState(1);
  const [pageItem, setPageItem] = reactExports.useState(1);
  const navbarRef = reactExports.useRef();
  const [calendar, setCalendar] = reactExports.useState(false);
  const calendarRef = reactExports.useRef(null);
  const [open, setOpen] = reactExports.useState(false);
  const [refreshflag, setRefreshflag] = reactExports.useState(false);
  const [poitemlist, setPoitemlist] = reactExports.useState([]);
  const [poById, setPoById] = reactExports.useState([POListModel]);
  const [poSuppNama, setPoSuppNama] = reactExports.useState("");
  const [itemlist, setItemlist] = reactExports.useState([]);
  const [poFlag, setPoFlag] = reactExports.useState(true);
  const [openItem, setOpenItem] = reactExports.useState(false);
  const [openSupp, setOpenSupp] = reactExports.useState(false);
  const [openInput, setOpenInput] = reactExports.useState(false);
  const [poItemById, setPoItemById] = reactExports.useState({});
  const [qty, setQty] = reactExports.useState(1);
  const [qtyTemp, setQtyTemp] = reactExports.useState(1);
  const handleFilter = (searchKey) => {
    setKeyword(searchKey);
  };
  const handleFilterItem = (searchKey) => {
    setKeywordItem(searchKey);
  };
  const openDrawerRight = () => setOpenFilter(true);
  const handleResponse = ({ data, error }) => {
    if (error) {
      alert("Terjadi Kesalahan");
    } else {
      setPurchaseorders(data);
    }
  };
  const handleInput = reactExports.useCallback(
    (input) => {
      setQty(Number(input.qty));
      setOpenInput(true);
      setPoItemById(input);
      setQtyTemp(Number(input.qty));
    },
    [poitemlist, qty]
  );
  const handleCloseQty = reactExports.useCallback(() => {
    setOpenInput(false);
    if (qty == 0) {
      alert("Kuantiti tidak boleh 0");
      const _poitemlist = [...poitemlist];
      _poitemlist.map((_item) => {
        if (_item.itm_id === poItemById.itm_id && _item.konvidx === poItemById.konvidx) {
          _item.qty = qtyTemp;
          _item.total = parseFloat(poItemById.satuan0hpp) * qtyTemp;
        }
      });
    }
  }, [qty, qtyTemp, poitemlist, poItemById]);
  function handleChangeQty(evt) {
    console.log(poItemById);
    setQty(evt.target.value);
    const _poitemlist = [...poitemlist];
    _poitemlist.map((_item) => {
      if (_item.itm_id === poItemById.itm_id && _item.konvidx === poItemById.konvidx) {
        _item.qty = evt.target.value;
        _item.total = parseFloat(poItemById.satuan0hpp) * evt.target.value;
      }
    });
    setPoitemlist(_poitemlist);
  }
  const handleAdd = () => {
    setPoitemlist([]);
    setPoFlag(false);
    setPoById({
      po_sup_id: "",
      po_total: 0,
      po_kas_id: cookies.kas_id,
      po_lok_id: cookies.lok_id,
      po_catatan: "",
      po_status: "OPEN",
      po_id: 0,
      tgapprove: null
    });
    setOpen(!open);
  };
  const setSupp = (supp) => {
    const _poById = lodashExports.cloneDeep(poById);
    setPoSuppNama(supp.sup_nama);
    _poById.po_sup_id = supp.sup_id;
    _poById.sup_id = supp.sup_id;
    setPoById(_poById);
    setOpenSupp(false);
  };
  function handleOpen(item, index) {
    console.log(item);
    setPoSuppNama(item.sup_nama);
    item.poitems.map((_poitem) => {
      _poitem.itm_id = _poitem.poi_itm_id;
      _poitem.satuan0 = _poitem.poi_satuan0;
      _poitem.satuan0hpp = parseFloat(_poitem.poi_satuan0hpp);
      _poitem.satuan0hrg = parseFloat(_poitem.poi_satuan0hrg);
      _poitem.satuan0of1 = parseFloat(_poitem.poi_satuan0of1);
      _poitem.satuan1 = _poitem.poi_satuan1;
      _poitem.satuan1hpp = parseFloat(_poitem.poi_satuan1hpp);
      _poitem.satuan1hrg = parseFloat(_poitem.poi_satuan1hrg);
      _poitem.total = parseFloat(_poitem.poi_total);
    });
    setPoitemlist(item.poitems);
    console.log(item);
    setPoById(item);
    setPoFlag(false);
  }
  function handleApprove(item, index) {
    console.log(item);
    const init = async () => {
      await approvePo({
        po_id: item.po_id
      });
      setRefreshflag(!refreshflag);
    };
    init();
  }
  function setItem(item, index) {
    let foundItem = false;
    console.log(item);
    const _poItemList = poitemlist.map((_item) => {
      if (_item.itm_id === item.itm_id && _item.konvidx === item.konvidx) {
        _item.total = _item.qty * parseFloat(_item.satuan0hpp);
        _item.po_id = poById.po_id;
        foundItem = true;
      }
      return _item;
    });
    if (!foundItem) {
      item.qty = 1;
      item.po_id = poById.po_id;
      item.total = parseFloat(item.satuan0hpp);
      _poItemList.push(item);
    }
    setPoitemlist(_poItemList);
    setOpenItem(false);
  }
  const saveData = reactExports.useCallback(async () => {
    console.log(poitemlist);
    setLoading(true);
    let totalPrice = 0;
    poitemlist.forEach((item) => {
      const price = item.satuan0hpp;
      totalPrice += item.qty * price;
    });
    console.log(totalPrice);
    const _poById = lodashExports.cloneDeep(poById);
    _poById.po_total = totalPrice;
    _poById.rows = poitemlist;
    _poById.po_kas_id = cookies.kas_id;
    _poById.po_lok_id = cookies.lok_id;
    _poById.po_status = "OPEN";
    console.log(_poById);
    const { data, error } = await savePo(_poById);
    if (error) {
      alert(error.message);
      console.log(error.message);
    } else {
      setPoFlag(true);
      console.log(data);
      setLoading(false);
      setRefreshflag(!refreshflag);
    }
  }, [poById, poitemlist]);
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
        const { data, error } = await getPo({
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
        setPurchaseorders([]);
        setLoading(true);
        setPage(1);
        const { data, error } = await getPo({
          lok_id: cookies.lok_id,
          page: 1,
          rows: rowsPerPage,
          loaditems: "yes",
          orifields: "yes",
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
      setItemlist(convertItemListToCheckout(data));
    }
  };
  reactExports.useEffect(() => {
    const initsupp = async () => {
      setSuppliers([]);
      setPage(1);
      const { data, error } = await getSupplier({
        com_id: cookies.com_id
      });
      if (!error) {
        setSuppliers(data);
      }
    };
    initsupp();
    if (keywordItem && keywordItem.length > 1) {
      const orderSearch = setTimeout(async () => {
        setPage(1);
        setLoading(true);
        const { data, error } = await getItems({
          lok_id: cookies.lok_id,
          key_val: keywordItem,
          page: 1,
          rows: rowsPerPage,
          buyable: "true"
        });
        handleResponseItem({ data, error });
        setLoading(false);
      }, TIME_SEARCH_DEBOUNCE);
      return () => {
        clearTimeout(orderSearch);
      };
    } else if (!keywordItem) {
      const init = async () => {
        setItemlist([]);
        setLoading(true);
        setPageItem(1);
        const { data, error } = await getItems({
          lok_id: cookies.lok_id,
          page: 1,
          rows: rowsPerPage,
          buyable: "true"
        });
        handleResponseItem({ data, error });
        setLoading(false);
      };
      init();
    }
  }, [keywordItem, filters]);
  reactExports.useEffect(() => {
    if (purchaseorders[0] && purchaseorders[0].po_id && !filters[0]) {
      const init = async () => {
        const { data, error } = await getPo({
          lok_id: cookies.lok_id,
          page,
          rows: rowsPerPage,
          orifields: "yes",
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
      const _po = data;
      setPurchaseorders([...purchaseorders, ..._po]);
    }
  };
  reactExports.useEffect(() => {
    if (itemlist[0] && itemlist[0].id && !filters[0]) {
      const init = async () => {
        const { data, error } = await getItems({
          lok_id: cookies.lok_id,
          page: pageItem,
          rows: rowsPerPage,
          loaditems: "yes",
          buyable: "true"
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
      const _item = convertItemListToCheckout(data);
      setItemlist([...itemlist, ..._item]);
    }
  };
  function handleNewOpen(item) {
    setPoById(item);
    cookies.role_delete.length == 0 && cookies.role_dst.length == 0 ? setNewOpen(!newOpen) : cookies.role_dst.findIndex((a) => a == "ALL") >= 0 ? setNewOpen(!newOpen) : cookies.role_delete.findIndex((a) => a == "TRANS") >= 0 ? setNewOpen(!newOpen) : setNewOpen(false);
  }
  function handleOpenItem(item) {
    setOpenItem(true);
  }
  function handleOpenSupplier(item) {
    setOpenSupp(true);
  }
  const handleDelete = reactExports.useCallback(
    async (item) => {
      console.log(poById);
      const { data, error } = await deletePo({
        po_id: poById.po_id
      });
      if (data) {
        setLoading(true);
        setNewOpen(false);
        setPoById({});
        setRefreshflag(!refreshflag);
        setLoading(false);
      }
    },
    [poById]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(reactExports.Fragment, { children: [
    !loading ? null : /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingOverlay, { white: true }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-screen-adapt bg-gray-50 overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `top-0 inset-x-0 fixed ${poFlag ? "bg-gradient-to-b from-gray-50" : ""} h-20` }),
      poFlag ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 top-0 inset-x-0 fixed z-10 mx-auto desktop:max-w-[60%]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        react.Navbar,
        {
          ref: navbarRef,
          className: `pt-2 px-2 ${!filters.length ? "pb-6" : "pb-4"} relative`,
          blurred: false,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.IconButton, { variant: "text", size: "md", onClick: () => setMenuOpen(true), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bars3Icon, { className: "h-6 w-6 stroke-2" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-2 flex-grow", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SearchNavbar, { onSearch: handleFilter, value: keyword, label: "No. Purchase Order" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.IconButton, { size: "md", variant: "text", onClick: openDrawerRight, children: /* @__PURE__ */ jsxRuntimeExports.jsx(AdjustmentsVerticalIcon, { className: "h-6 w-6 stroke-2" }) })
            ] }),
            !filters.length ? /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "gray", className: "absolute right-14 bottom-1 text-xs italic", children: "Semua Nomor PO" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-2 pt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FilterChips, { filters, onSetFilters: setFilters }) })
          ]
        }
      ) }) : null,
      poFlag ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pb-20 overflow-auto h-full", style: { paddingTop: listPadding }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.List, { className: "divide-y divide-dashed divide-gray-400", children: !purchaseorders.length && !loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto py-20", children: "PO Kosong" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          POScroll,
          {
            po: purchaseorders,
            onRemove: handleNewOpen,
            onOpen: handleOpen,
            onApprove: handleApprove,
            onLoad: () => setPage(page + 1),
            infinite: !keyword
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed bottom-4 right-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.IconButton, { variant: "filled", color: "teal", className: "rounded-full", size: "lg", onClick: handleAdd, children: /* @__PURE__ */ jsxRuntimeExports.jsx(PlusCircleIcon, { className: "h-8 w-8 text-black-500" }) }) })
      ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `p-4 text-lg font-semibold border-b-2 ${!poById.sup_id ? "text-gray-500" : "text-blue-gray-700"}`,
            children: !poById.sup_id ? "Supplier Kosong" : poSuppNama
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.List, { className: "divide-y divide-dashed divide-gray-400 h-[100dvh]", children: poitemlist == null ? void 0 : poitemlist.map((i, index) => {
          return /* @__PURE__ */ jsxRuntimeExports.jsx(react.ListItem, { className: "", onClick: () => poById.po_tgapprove ? null : handleInput(i), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full grid grid-cols-3 mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1 col-span-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-[100%] whitespace-nowrap overflow-hidden text-ellipsis font-semibold", children: i.itm_nama }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1 items-start", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-max py-[2px] px-2 text-[12px] font-semibold bg-orange-100 rounded-md", children: parseFloat(i.qty) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-max py-[2px] px-2 text-[12px] font-semibold bg-blue-100 rounded-md", children: [
                  "/ ",
                  SetItemUnit(i.satuan0.toUpperCase())
                ] })
              ] }),
              i.satuan0hpp && /* @__PURE__ */ jsxRuntimeExports.jsxs(
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
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-1 justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              react.Typography,
              {
                color: "gray",
                className: "w-max py-[2px] px-2 text-[15px] font-semibold bg-purple-100 rounded-md ",
                children: [
                  currency,
                  " ",
                  formatThousandSeparator(parseFloat(i.total))
                ]
              }
            ) })
          ] }) }, index);
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed bottom-[136px] right-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          react.IconButton,
          {
            disabled: poById.po_tgapprove ? true : false,
            variant: "filled",
            color: "teal",
            className: "rounded-full",
            onClick: handleOpenSupplier,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(TruckIcon, { className: "h-6 w-6 text-black-500" })
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed bottom-[85px] right-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          react.IconButton,
          {
            disabled: poById.po_tgapprove ? true : false,
            variant: "filled",
            color: "teal",
            className: "rounded-full",
            onClick: handleOpenItem,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(PlusIcon, { className: "h-6 w-6 text-black-500" })
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed flex bottom-0 w-full justify-end p-4 font-semibold border-t-2 mx-auto desktop:max-w-[60%]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Button, { variant: "gradient", color: "blue-gray", onClick: () => setPoFlag(true), className: "w-full mr-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Kembali" }) }),
          poById.po_tgapprove ? null : /* @__PURE__ */ jsxRuntimeExports.jsx(
            react.Button,
            {
              variant: "gradient",
              color: "green",
              onClick: saveData,
              disabled: poitemlist.length > 0 && poById.sup_id ? false : true,
              className: "w-full",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Simpan" })
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Dialog, { open: newOpen, handler: handleNewOpen, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.DialogBody, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center my-6", children: [
          "Item ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: poById.po_nomor }),
          " akan dihapus. Apakah anda yakin?"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(react.DialogFooter, { className: "flex gap-3 justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Button, { variant: "gradient", color: "blue-gray", onClick: () => setNewOpen(false), className: "w-full flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Batal" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Button, { variant: "gradient", color: "red", onClick: handleDelete, className: "w-full flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Hapus" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Dialog, { open: openItem, handler: handleOpenItem, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.DialogHeader, { className: "text-lg text-blue-gray-700", children: "Tambah Item Ke PO" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(react.DialogBody, { className: "max-h-[70vh] p-0 overflow-y-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "search-bar w-[90%] mx-auto mt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SearchNavbar, { onSearch: handleFilterItem, value: keywordItem, label: "Cari Item" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-h-[60vh] px-2 overflow-y-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.List, { className: "divide-y divide-dashed divide-gray-400", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            POItemScroll,
            {
              item: itemlist,
              setItem,
              onLoad: () => setPageItem(pageItem + 1),
              infinite: !keywordItem
            }
          ) }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.DialogFooter, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Button, { variant: "gradient", color: "blue-gray", onClick: () => setOpenItem(false), className: "mr-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Cancel" }) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Dialog, { open: openSupp, handler: handleOpenSupplier, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.DialogHeader, { className: "text-lg text-blue-gray-700", children: "Tambah Supplier Ke PO" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.DialogBody, { className: "max-h-[70vh] p-0 overflow-y-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.List, { className: "divide-y divide-dashed divide-gray-400", children: suppliers == null ? void 0 : suppliers.map((i, index) => {
          return /* @__PURE__ */ jsxRuntimeExports.jsx(react.ListItem, { className: "", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full pr-2", onClick: () => setSupp(i), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "gray", className: "font-normal", children: /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: formatSentenceCase(i.sup_nama) }) }) })
          ] }) }, index);
        }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.DialogFooter, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Button, { variant: "gradient", color: "blue-gray", onClick: () => setOpenSupp(false), className: "mr-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Kembali" }) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Dialog, { open: openInput, handler: handleInput, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.DialogHeader, { className: "text-xl", children: dictionary.cashier.pos.inputHeader[lang] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(react.DialogBody, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            InputMoney,
            {
              variant: "outlined",
              align: "text-left",
              type: "number",
              label: "Qty",
              value: qty,
              onChange: handleChangeQty
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Button, { className: "mb-4 mr-2", variant: "gradient", color: "blue-gray", onClick: handleCloseQty, children: "Kembali" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        POFilter,
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
  POTemp as default
};
