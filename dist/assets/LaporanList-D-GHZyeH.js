import { y as httpPost, z as API_HOST, r as reactExports, A as AppContext, S as SupplierListModel, u as useNavigate, t as topic, j as jsxRuntimeExports, L as LoadingOverlay, a as react, w as getSupplier, T as TIME_SEARCH_DEBOUNCE } from "./index-CGEICd-f.js";
import { G as GetStokOpnameReqBody } from "./stokopname-cwVxhHmp.js";
import { S as SearchNavbar } from "./SearchNavbar-BwHVnItL.js";
import { f as formatThousandSeparator } from "./formatter-DQiSfF1K.js";
import { T as TransactionFilter } from "./TransactionFilter-Cd1-pMJ4.js";
import { F as FilterChips } from "./FilterChips-Bif-hhPS.js";
import { B as Bars3Icon } from "./Bars3Icon-BPkb_aHs.js";
import { A as AdjustmentsVerticalIcon } from "./AdjustmentsVerticalIcon-DBH-WKzU.js";
import "./index.esm-DzNpyuue.js";
import "./filter-DY4hzksJ.js";
import "./lodash-C34_XwDM.js";
const getBestselling = (body = GetStokOpnameReqBody()) => {
  return httpPost(`${API_HOST}/tambahan/bestselling`, body);
};
const getGrossProfit = (body = GetStokOpnameReqBody()) => {
  return httpPost(`${API_HOST}/tambahan/grossprofit`, body);
};
const getNetProfit = (body = GetStokOpnameReqBody()) => {
  return httpPost(`${API_HOST}/tambahan/netprofit`, body);
};
const getOmzet = (body = GetStokOpnameReqBody()) => {
  return httpPost(`${API_HOST}/tambahan/omzet`, body);
};
const getOmzetHarian = (body = GetStokOpnameReqBody()) => {
  return httpPost(`${API_HOST}/tambahan/omzetharian`, body);
};
function LaporanList() {
  const { setMenuOpen, filters, currency, setFilters, lang, dataLogin, cookies } = reactExports.useContext(AppContext);
  const [listPadding, setListPadding] = reactExports.useState("20px");
  const [loading, setLoading] = reactExports.useState(true);
  const [suppliers, setSuppliers] = reactExports.useState([SupplierListModel()]);
  const [itemDisplay, setItemDisplay] = reactExports.useState(SupplierListModel());
  const navbarRef = reactExports.useRef();
  const [open, setOpen] = reactExports.useState(false);
  reactExports.useState(false);
  const [readonly, setReadonly] = reactExports.useState(false);
  const [supplierById, setSupplierById] = reactExports.useState({});
  reactExports.useState(-1);
  const [txtTitle, settxtTitle] = reactExports.useState("");
  const [mode, setMode] = reactExports.useState(0);
  const [keyword, setKeyword] = reactExports.useState("");
  reactExports.useState([]);
  const [dataReport, setDataReport] = reactExports.useState([]);
  const [selectReport, setSelectReport] = reactExports.useState("");
  const navigate = useNavigate();
  const [openFilter, setOpenFilter] = reactExports.useState(false);
  const handleFilter = (searchKey) => {
    setKeyword(searchKey);
  };
  const openDrawerRight = () => setOpenFilter(true);
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
  const [inner, setInner] = reactExports.useState(false);
  reactExports.useEffect(() => {
    setTimeout(() => setInner(true), 2500);
  }, []);
  const handleBestSelling = reactExports.useCallback(async () => {
    setItemDisplay(null);
    const _dateFilter = filters.find((f) => f.key === "date");
    if (_dateFilter) {
      if (_dateFilter.valueMax) {
        var dateParseMax = new Date(_dateFilter.valueMax);
        var dateIsoParseMax = dateParseMax.toISOString().substring(0, 10);
        var dateIsoParseMaxSplit = dateIsoParseMax.split("-");
        var dateParseMin = new Date(_dateFilter.valueMin);
        var dateIsoParseMin = dateParseMin.toISOString().substring(0, 10);
        var dateIsoParseMinSplit = dateIsoParseMin.split("-");
      } else {
        var dateParseMax = new Date(_dateFilter.value);
        var dateIsoParseMax = dateParseMax.toISOString().substring(0, 10);
        var dateIsoParseMaxSplit = dateIsoParseMax.split("-");
        var dateParseMin = new Date(_dateFilter.value);
        var dateIsoParseMin = dateParseMin.toISOString().substring(0, 10);
        var dateIsoParseMinSplit = dateIsoParseMin.split("-");
      }
    } else {
      var dateParseMax = /* @__PURE__ */ new Date();
      var dateIsoParseMax = dateParseMax.toISOString().substring(0, 10);
      var dateIsoParseMaxSplit = dateIsoParseMax.split("-");
      var dateParseMin = /* @__PURE__ */ new Date();
      var dateIsoParseMin = dateParseMin.toISOString().substring(0, 10);
      var dateIsoParseMinSplit = dateIsoParseMin.split("-");
    }
    const { content, content_data, error } = await getBestselling({
      lok_id: cookies.lok_id,
      command: "bestselling*" + dateIsoParseMinSplit[2] + "-" + dateIsoParseMinSplit[1] + "-" + dateIsoParseMinSplit[0] + "*" + dateIsoParseMaxSplit[2] + "-" + dateIsoParseMaxSplit[1] + "-" + dateIsoParseMaxSplit[0]
    });
    if (error) {
      alert("Data tidak ditemukan");
    } else {
      setOpen(true);
      setDataReport(content_data);
      setSelectReport("bestselling");
      var parent = document.getElementById("ids");
      parent.insertAdjacentHTML("beforeend", '<div id="ids2"></div>');
      document.getElementById("ids2").innerHTML = "";
      var parent2 = document.getElementById("ids2");
      parent2.insertAdjacentHTML("beforeend", content);
    }
  }, [filters]);
  const handleBestValue = reactExports.useCallback(async () => {
    setItemDisplay(null);
    const _dateFilter = filters.find((f) => f.key === "date");
    if (_dateFilter) {
      if (_dateFilter.valueMax) {
        var dateParseMax = new Date(_dateFilter.valueMax);
        var dateIsoParseMax = dateParseMax.toISOString().substring(0, 10);
        var dateIsoParseMaxSplit = dateIsoParseMax.split("-");
        var dateParseMin = new Date(_dateFilter.valueMin);
        var dateIsoParseMin = dateParseMin.toISOString().substring(0, 10);
        var dateIsoParseMinSplit = dateIsoParseMin.split("-");
      } else {
        var dateParseMax = new Date(_dateFilter.value);
        var dateIsoParseMax = dateParseMax.toISOString().substring(0, 10);
        var dateIsoParseMaxSplit = dateIsoParseMax.split("-");
        var dateParseMin = new Date(_dateFilter.value);
        var dateIsoParseMin = dateParseMin.toISOString().substring(0, 10);
        var dateIsoParseMinSplit = dateIsoParseMin.split("-");
      }
    } else {
      var dateParseMax = /* @__PURE__ */ new Date();
      var dateIsoParseMax = dateParseMax.toISOString().substring(0, 10);
      var dateIsoParseMaxSplit = dateIsoParseMax.split("-");
      var dateParseMin = /* @__PURE__ */ new Date();
      var dateIsoParseMin = dateParseMin.toISOString().substring(0, 10);
      var dateIsoParseMinSplit = dateIsoParseMin.split("-");
    }
    const { content, content_data, error } = await getBestselling({
      lok_id: cookies.lok_id,
      command: "bestvalue*" + dateIsoParseMinSplit[2] + "-" + dateIsoParseMinSplit[1] + "-" + dateIsoParseMinSplit[0] + "*" + dateIsoParseMaxSplit[2] + "-" + dateIsoParseMaxSplit[1] + "-" + dateIsoParseMaxSplit[0]
    });
    if (error) {
      alert("Data tidak ditemukan");
    } else {
      setOpen(true);
      setDataReport(content_data);
      setSelectReport("bestvalue");
      var parent = document.getElementById("ids");
      parent.insertAdjacentHTML("beforeend", '<div id="ids2"></div>');
      document.getElementById("ids2").innerHTML = "";
      var parent2 = document.getElementById("ids2");
      parent2.insertAdjacentHTML("beforeend", content);
    }
  }, [filters]);
  const handleGrossProfit = reactExports.useCallback(async () => {
    setItemDisplay(null);
    const _dateFilter = filters.find((f) => f.key === "date");
    if (_dateFilter) {
      if (_dateFilter.valueMax) {
        var dateParseMax = new Date(_dateFilter.valueMax);
        var dateIsoParseMax = dateParseMax.toISOString().substring(0, 10);
        var dateIsoParseMaxSplit = dateIsoParseMax.split("-");
        var dateParseMin = new Date(_dateFilter.valueMin);
        var dateIsoParseMin = dateParseMin.toISOString().substring(0, 10);
        var dateIsoParseMinSplit = dateIsoParseMin.split("-");
      } else {
        var dateParseMax = new Date(_dateFilter.value);
        var dateIsoParseMax = dateParseMax.toISOString().substring(0, 10);
        var dateIsoParseMaxSplit = dateIsoParseMax.split("-");
        var dateParseMin = new Date(_dateFilter.value);
        var dateIsoParseMin = dateParseMin.toISOString().substring(0, 10);
        var dateIsoParseMinSplit = dateIsoParseMin.split("-");
      }
    } else {
      var dateParseMax = /* @__PURE__ */ new Date();
      var dateIsoParseMax = dateParseMax.toISOString().substring(0, 10);
      var dateIsoParseMaxSplit = dateIsoParseMax.split("-");
      var dateParseMin = /* @__PURE__ */ new Date();
      var dateIsoParseMin = dateParseMin.toISOString().substring(0, 10);
      var dateIsoParseMinSplit = dateIsoParseMin.split("-");
    }
    const { content, content_data, error } = await getGrossProfit({
      lok_id: cookies.lok_id,
      command: "grossprofit*" + dateIsoParseMinSplit[2] + "-" + dateIsoParseMinSplit[1] + "-" + dateIsoParseMinSplit[0] + "*" + dateIsoParseMaxSplit[2] + "-" + dateIsoParseMaxSplit[1] + "-" + dateIsoParseMaxSplit[0]
    });
    if (error) {
      alert("Data tidak ditemukan");
    } else {
      setOpen(true);
      setDataReport(content_data);
      setSelectReport("grossprofit");
      var parent = document.getElementById("ids");
      parent.insertAdjacentHTML("beforeend", '<div id="ids2"></div>');
      document.getElementById("ids2").innerHTML = "";
      var parent2 = document.getElementById("ids2");
      parent2.insertAdjacentHTML("beforeend", content);
    }
  }, [filters]);
  const handleNetProfit = reactExports.useCallback(async () => {
    setItemDisplay(null);
    const _dateFilter = filters.find((f) => f.key === "date");
    if (_dateFilter) {
      if (_dateFilter.valueMax) {
        var dateParseMax = new Date(_dateFilter.valueMax);
        var dateIsoParseMax = dateParseMax.toISOString().substring(0, 10);
        var dateIsoParseMaxSplit = dateIsoParseMax.split("-");
        var dateParseMin = new Date(_dateFilter.valueMin);
        var dateIsoParseMin = dateParseMin.toISOString().substring(0, 10);
        var dateIsoParseMinSplit = dateIsoParseMin.split("-");
      } else {
        var dateParseMax = new Date(_dateFilter.value);
        var dateIsoParseMax = dateParseMax.toISOString().substring(0, 10);
        var dateIsoParseMaxSplit = dateIsoParseMax.split("-");
        var dateParseMin = new Date(_dateFilter.value);
        var dateIsoParseMin = dateParseMin.toISOString().substring(0, 10);
        var dateIsoParseMinSplit = dateIsoParseMin.split("-");
      }
    } else {
      var dateParseMax = /* @__PURE__ */ new Date();
      var dateIsoParseMax = dateParseMax.toISOString().substring(0, 10);
      var dateIsoParseMaxSplit = dateIsoParseMax.split("-");
      var dateParseMin = /* @__PURE__ */ new Date();
      var dateIsoParseMin = dateParseMin.toISOString().substring(0, 10);
      var dateIsoParseMinSplit = dateIsoParseMin.split("-");
    }
    const { content, content_data, error } = await getNetProfit({
      lok_id: cookies.lok_id,
      command: "netprofit*" + dateIsoParseMinSplit[2] + "-" + dateIsoParseMinSplit[1] + "-" + dateIsoParseMinSplit[0] + "*" + dateIsoParseMaxSplit[2] + "-" + dateIsoParseMaxSplit[1] + "-" + dateIsoParseMaxSplit[0]
    });
    if (error) {
      alert("Data tidak ditemukan");
    } else {
      setOpen(true);
      setDataReport(content_data);
      setSelectReport("netprofit");
      var parent = document.getElementById("ids");
      parent.insertAdjacentHTML("beforeend", '<div id="ids2"></div>');
      document.getElementById("ids2").innerHTML = "";
      var parent2 = document.getElementById("ids2");
      parent2.insertAdjacentHTML("beforeend", content);
    }
  }, [filters]);
  const handleOmzet = reactExports.useCallback(async () => {
    setItemDisplay(null);
    const _dateFilter = filters.find((f) => f.key === "date");
    if (_dateFilter) {
      if (_dateFilter.valueMax) {
        var dateParseMax = new Date(_dateFilter.valueMax);
        var dateIsoParseMax = dateParseMax.toISOString().substring(0, 10);
        var dateIsoParseMaxSplit = dateIsoParseMax.split("-");
        var dateParseMin = new Date(_dateFilter.valueMin);
        var dateIsoParseMin = dateParseMin.toISOString().substring(0, 10);
        var dateIsoParseMinSplit = dateIsoParseMin.split("-");
      } else {
        var dateParseMax = new Date(_dateFilter.value);
        var dateIsoParseMax = dateParseMax.toISOString().substring(0, 10);
        var dateIsoParseMaxSplit = dateIsoParseMax.split("-");
        var dateParseMin = new Date(_dateFilter.value);
        var dateIsoParseMin = dateParseMin.toISOString().substring(0, 10);
        var dateIsoParseMinSplit = dateIsoParseMin.split("-");
      }
    } else {
      var dateParseMax = /* @__PURE__ */ new Date();
      var dateIsoParseMax = dateParseMax.toISOString().substring(0, 10);
      var dateIsoParseMaxSplit = dateIsoParseMax.split("-");
      var dateParseMin = /* @__PURE__ */ new Date();
      var dateIsoParseMin = dateParseMin.toISOString().substring(0, 10);
      var dateIsoParseMinSplit = dateIsoParseMin.split("-");
    }
    const { content, content_data, error } = await getOmzet({
      lok_id: cookies.lok_id,
      command: "omzet*" + dateIsoParseMinSplit[2] + "-" + dateIsoParseMinSplit[1] + "-" + dateIsoParseMinSplit[0] + "*" + dateIsoParseMaxSplit[2] + "-" + dateIsoParseMaxSplit[1] + "-" + dateIsoParseMaxSplit[0]
    });
    if (error) {
      alert("Data tidak ditemukan");
    } else {
      setOpen(true);
      setDataReport(content_data);
      setSelectReport("omzet");
      var parent = document.getElementById("ids");
      parent.insertAdjacentHTML("beforeend", '<div id="ids2"></div>');
      document.getElementById("ids2").innerHTML = "";
      var parent2 = document.getElementById("ids2");
      parent2.insertAdjacentHTML("beforeend", content);
    }
  }, [filters]);
  const handleOmzetHarian = reactExports.useCallback(async () => {
    setItemDisplay(null);
    const _dateFilter = filters.find((f) => f.key === "date");
    if (_dateFilter) {
      if (_dateFilter.valueMax) {
        var dateParseMax = new Date(_dateFilter.valueMax);
        var dateIsoParseMax = dateParseMax.toISOString().substring(0, 10);
        var dateIsoParseMaxSplit = dateIsoParseMax.split("-");
        var dateParseMin = new Date(_dateFilter.valueMin);
        var dateIsoParseMin = dateParseMin.toISOString().substring(0, 10);
        var dateIsoParseMinSplit = dateIsoParseMin.split("-");
      } else {
        var dateParseMax = new Date(_dateFilter.value);
        var dateIsoParseMax = dateParseMax.toISOString().substring(0, 10);
        var dateIsoParseMaxSplit = dateIsoParseMax.split("-");
        var dateParseMin = new Date(_dateFilter.value);
        var dateIsoParseMin = dateParseMin.toISOString().substring(0, 10);
        var dateIsoParseMinSplit = dateIsoParseMin.split("-");
      }
    } else {
      var dateParseMax = /* @__PURE__ */ new Date();
      var dateIsoParseMax = dateParseMax.toISOString().substring(0, 10);
      var dateIsoParseMaxSplit = dateIsoParseMax.split("-");
      var dateParseMin = /* @__PURE__ */ new Date();
      var dateIsoParseMin = dateParseMin.toISOString().substring(0, 10);
      var dateIsoParseMinSplit = dateIsoParseMin.split("-");
    }
    const { content, content_data, error } = await getOmzetHarian({
      lok_id: cookies.lok_id,
      command: "omzetharian*" + dateIsoParseMinSplit[2] + "-" + dateIsoParseMinSplit[1] + "-" + dateIsoParseMinSplit[0] + "*" + dateIsoParseMaxSplit[2] + "-" + dateIsoParseMaxSplit[1] + "-" + dateIsoParseMaxSplit[0]
    });
    if (error) {
      alert("Data tidak ditemukan");
    } else {
      setOpen(true);
      setDataReport(content_data);
      setSelectReport("omzetharian");
      var parent = document.getElementById("ids");
      parent.insertAdjacentHTML("beforeend", '<div id="ids2"></div>');
      document.getElementById("ids2").innerHTML = "";
      var parent2 = document.getElementById("ids2");
      parent2.insertAdjacentHTML("beforeend", content);
    }
  }, [filters]);
  const handlePrint = reactExports.useCallback(async () => {
    var contents = document.getElementById("ids").innerHTML;
    var frame1 = document.createElement("iframe");
    frame1.name = "frame1";
    frame1.style.position = "absolute";
    frame1.style.top = "-1000000px";
    document.body.appendChild(frame1);
    var frameDoc = frame1.contentWindow ? frame1.contentWindow : frame1.contentDocument.document ? frame1.contentDocument.document : frame1.contentDocument;
    var styleorientasi = "";
    frameDoc.document.open();
    frameDoc.document.write("<html><head>" + styleorientasi + "<title>Laporan</title>");
    frameDoc.document.write("</head><body>");
    frameDoc.document.write(contents);
    frameDoc.document.write("</body></html>");
    frameDoc.document.close();
    setTimeout(function() {
      window.frames["frame1"].focus();
      window.frames["frame1"].print();
      document.body.removeChild(frame1);
    }, 500);
  }, []);
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
    setListPadding(`${navbarRef.current.offsetHeight + 20}px`);
  }, [filters]);
  const TableView = () => {
    if (selectReport == "grossprofit") {
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full min-w-max table-auto text-left", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-normal leading-none opacity-70", children: "No" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-normal leading-none opacity-70", children: "Tanggal" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-normal leading-none opacity-70", children: "Income" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-normal leading-none opacity-70", children: "Outcome" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-normal leading-none opacity-70", children: "Gross Profit" }) })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: dataReport == null ? void 0 : dataReport.map((i, index) => {
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-normal", children: index + 1 }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-normal", children: i.tanggal }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-normal", children: i.income == 0 ? "0" : currency + " " + formatThousandSeparator(parseFloat(i.income)) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-normal", children: i.outcome == 0 ? "0" : currency + " " + formatThousandSeparator(parseFloat(i.outcome)) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-normal", children: i.grossprofit == 0 ? "0" : currency + " " + formatThousandSeparator(parseFloat(i.grossprofit)) }) })
          ] });
        }) })
      ] });
    } else if (selectReport == "netprofit") {
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full min-w-max table-auto text-left", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-normal leading-none opacity-70", children: "No" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-normal leading-none opacity-70", children: "Tanggal" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-normal leading-none opacity-70", children: "Income" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-normal leading-none opacity-70", children: "RcvOutcome" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-normal leading-none opacity-70", children: "OprOutcome" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-normal leading-none opacity-70", children: "Net Profit" }) })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: dataReport == null ? void 0 : dataReport.map((i, index) => {
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-normal", children: index + 1 }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-normal", children: i.tanggal }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-normal", children: i.income == 0 ? "0" : currency + " " + formatThousandSeparator(parseFloat(i.income)) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-normal", children: i.rcvoutcome == 0 ? "0" : currency + " " + formatThousandSeparator(parseFloat(i.rcvoutcome)) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-normal", children: i.oproutcome == 0 ? "0" : currency + " " + formatThousandSeparator(parseFloat(i.oproutcome)) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-normal", children: i.netprofit == 0 ? "0" : currency + " " + formatThousandSeparator(parseFloat(i.netprofit)) }) })
          ] });
        }) })
      ] });
    } else if (selectReport == "bestselling" || selectReport == "bestvalue") {
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full min-w-max table-auto text-left", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-normal leading-none opacity-70", children: "No" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-normal leading-none opacity-70", children: "Kode" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-normal leading-none opacity-70", children: "Nama Item" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-normal leading-none opacity-70", children: "Total Qty" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-normal leading-none opacity-70", children: "Satuan" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-normal leading-none opacity-70", children: "Total Price" }) })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: dataReport == null ? void 0 : dataReport.map((i, index) => {
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-normal", children: index + 1 }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-normal", children: i.itm_kode }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-normal", children: i.itm_nama }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-normal", children: parseInt(i.totqty) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-normal", children: i.itm_satuan1 }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-normal", children: i.totnilai == 0 ? "0" : currency + " " + formatThousandSeparator(parseFloat(i.totnilai)) }) })
          ] });
        }) })
      ] });
    } else if (selectReport == "omzet") {
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full min-w-max table-auto text-left", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-normal leading-none opacity-70", children: "No" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-normal leading-none opacity-70", children: "Nomor Nota" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-normal leading-none opacity-70", children: "Item" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-normal leading-none opacity-70", children: "Jumlah" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-normal leading-none opacity-70", children: "Harga" }) })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: dataReport == null ? void 0 : dataReport.map((i, index) => {
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-normal", children: index + 1 }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-normal", children: i.not_nomor }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-normal", children: i.itm_nama }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-normal", children: i.nit_qty }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-normal", children: i.nit_total == 0 ? "0" : currency + " " + formatThousandSeparator(parseFloat(i.nit_total)) }) })
          ] });
        }) })
      ] });
    } else if (selectReport == "omzetharian") {
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full min-w-max table-auto text-left", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-normal leading-none opacity-70", children: "No" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-normal leading-none opacity-70", children: "Check In" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-normal leading-none opacity-70", children: "Check Out" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-normal leading-none opacity-70", children: "Nama Kasir" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-normal leading-none opacity-70", children: "Modal Awal" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-normal leading-none opacity-70", children: "Modal Akhir" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-normal leading-none opacity-70", children: "Omzet" }) })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: dataReport == null ? void 0 : dataReport.map((i, index) => {
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-normal", children: index + 1 }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-normal", children: i.mod_checkin }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-normal", children: i.mod_checkout }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-normal", children: i.kas_nama }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-normal", children: i.mod_awal == 0 ? "0" : currency + " " + formatThousandSeparator(parseFloat(i.mod_awal)) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-normal", children: i.mod_akhir == 0 ? "0" : currency + " " + formatThousandSeparator(parseFloat(i.mod_akhir)) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-normal", children: i.omzet == 0 ? "0" : currency + " " + formatThousandSeparator(parseFloat(i.omzet)) }) })
          ] });
        }) })
      ] });
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(reactExports.Fragment, { children: [
    !loading ? null : /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingOverlay, { white: true }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-screen-adapt bg-gray-50 overflow-hidden relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 top-0 inset-x-0 fixed z-50 mx-auto desktop:max-w-[60%]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Navbar, { ref: navbarRef, className: `pt-2 px-2 ${!filters.length ? "pb-6" : "pb-4"} relative`, blurred: false, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.IconButton, { variant: "text", size: "md", onClick: () => setMenuOpen(true), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bars3Icon, { className: "h-6 w-6 stroke-2" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-2 flex-grow", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SearchNavbar, { onSearch: handleFilter, value: keyword, label: "Cari Laporan" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.IconButton, { size: "md", variant: "text", onClick: openDrawerRight, children: /* @__PURE__ */ jsxRuntimeExports.jsx(AdjustmentsVerticalIcon, { className: "h-6 w-6 stroke-2" }) })
        ] }),
        !filters.length ? /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "gray", className: "absolute right-14 bottom-1 text-xs italic", children: "Semua Laporan" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-2 pt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FilterChips, { filters, onSetFilters: setFilters }) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pb-20 overflow-auto h-full", style: { paddingTop: listPadding }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(react.List, { className: "divide-y divide-dashed divide-gray-400", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.ListItem, { className: "flex items-center justify-between px-[3px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-[90%] pr-2 flex-1", onClick: () => handleBestSelling(), children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "info flex flex-col gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "gray", className: "text-[14px] font-medium", children: /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: "Best Selling" }) }) }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.ListItem, { className: "flex items-center justify-between px-[3px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-[90%] pr-2 flex-1", onClick: () => handleBestValue(), children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "info flex flex-col gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "gray", className: "text-[14px] font-medium", children: /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: "Best Value" }) }) }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.ListItem, { className: "flex items-center justify-between px-[3px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-[90%] pr-2 flex-1", onClick: () => handleGrossProfit(), children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "info flex flex-col gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "gray", className: "text-[14px] font-medium", children: /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: "Gross Profit" }) }) }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.ListItem, { className: "flex items-center justify-between px-[3px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-[90%] pr-2 flex-1", onClick: () => handleNetProfit(), children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "info flex flex-col gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "gray", className: "text-[14px] font-medium", children: /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: "Net Profit" }) }) }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.ListItem, { className: "flex items-center justify-between px-[3px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-[90%] pr-2 flex-1", onClick: () => handleOmzet(), children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "info flex flex-col gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "gray", className: "text-[14px] font-medium", children: /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: "Omzet" }) }) }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.ListItem, { className: "flex items-center justify-between px-[3px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-[90%] pr-2 flex-1", onClick: () => handleOmzetHarian(), children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "info flex flex-col gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "gray", className: "text-[14px] font-medium", children: /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: "Omzet Harian" }) }) }) }) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Dialog, { open, handler: handleOpen, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.DialogHeader, { className: "text-[20px] text-[#606060]", children: "Preview" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.DialogBody, { className: "max-h-[60vh] overflow-y-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.List, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.ListItem, { className: "", children: TableView() }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(react.DialogFooter, { className: "flex gap-3 justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Button, { variant: "gradient", color: "blue-gray", onClick: () => setOpen(false), className: "w-full flex-1", children: "Kembali" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            react.Button,
            {
              variant: "gradient",
              color: "green",
              onClick: () => handlePrint(),
              className: "w-full flex-1",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Cetak" })
            }
          )
        ] })
      ] }),
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
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { id: "ids" })
    ] })
  ] });
}
export {
  LaporanList as default
};
