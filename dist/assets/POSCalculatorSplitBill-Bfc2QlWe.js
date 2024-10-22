import { u as useNavigate, r as reactExports, A as AppContext, p as paymentModes, t as topic, e as dictionary, j as jsxRuntimeExports, a as react } from "./index-CGEICd-f.js";
import { f as formatThousandSeparator, a as formatBackToNumber } from "./formatter-DQiSfF1K.js";
import { g as getAmountRecommendations, C as CheckBadgeIcon, B as BackspaceIcon } from "./smartRecomAmount-9D3Bj3QX.js";
import { F as FilterItemModel } from "./filter-DY4hzksJ.js";
import { b as bayarPos, d as deleteDraftPos } from "./Pos-68rCAtrO.js";
import "./thermal-printer-encoder.esm-Df5pJIWs.js";
import { P as POSSuccessSplitBill } from "./POSSuccessSplitBill-ChdoF55f.js";
import { D as DayPicker } from "./index.esm-DzNpyuue.js";
import { l as lodashExports } from "./lodash-C34_XwDM.js";
import { C as ChevronLeftIcon } from "./ChevronLeftIcon-jbeLmLzz.js";
function POSCalculatorSplitBill() {
  const navigate = useNavigate();
  const {
    totalPay,
    setTotalPay,
    itemsCheckout,
    money,
    setMoney,
    currency,
    lang,
    defaultPayment,
    cookies,
    pajakGlobal,
    diskonGlobal,
    tableGlobal,
    catatanGlobal,
    customerGlobal,
    setCustomerGlobal,
    setDiskonGlobal,
    setTableGlobal,
    setPajakGlobal,
    itemsCheckoutBill,
    totalPaySplitBill,
    moneySplitBill,
    setMoneySplitBill,
    bill
  } = reactExports.useContext(AppContext);
  const [customerId, setCustomerId] = reactExports.useState("");
  const [moneyFormat, setMoneyFormat] = reactExports.useState("0");
  const [totalPayFormat, setTotalPayFormat] = reactExports.useState("0");
  const [paymentMode, setPaymentMode] = reactExports.useState(defaultPayment);
  const [recommendations, setRecommendations] = reactExports.useState([]);
  const [success, setSuccess] = reactExports.useState(false);
  const [payLoading, setPayLoading] = reactExports.useState(false);
  const [kasid, setKasid] = reactExports.useState(1);
  const [kasnama, setKasnama] = reactExports.useState("Admin");
  const [showCalendar, setShowCalendar] = reactExports.useState(false);
  const [modePiutang, setModePiutang] = reactExports.useState(false);
  const calendarRef = reactExports.useRef(null);
  const [piutangOpen, setPiutangOpen] = reactExports.useState(false);
  const [piutangDate, setPiutangDate] = reactExports.useState(null);
  const [dateFilter, setDateFilter] = reactExports.useState(null);
  const [paymentModesNew, setPaymentModesNew] = reactExports.useState(paymentModes);
  reactExports.useState(["Bill-1", "Bill-2", "Bill-3", "Bill-4", "Bill-5"]);
  const [splitCount, setSplitCount] = reactExports.useState(0);
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
    if (itemsCheckout.length <= 0) {
      navigate(topic.cashier.route);
    }
    setTotalPayFormat(formatThousandSeparator(totalPaySplitBill[splitCount]));
    const options = getAmountRecommendations(totalPaySplitBill[splitCount]);
    setRecommendations(options);
    setPiutangDate(null);
  }, [splitCount]);
  reactExports.useEffect(() => {
    if (paymentMode == "CIL") {
      setModePiutang(true);
    } else
      setModePiutang(false);
  }, [paymentMode]);
  const onAppend = (numberStr) => {
    const newStr = formatThousandSeparator(`${moneyFormat}${numberStr}`);
    const number = formatBackToNumber(newStr);
    setMoneyFormat(newStr);
    setMoney(number);
  };
  const onClear = () => {
    setMoneyFormat("0");
    setMoney(0);
  };
  const diff = money - totalPaySplitBill[splitCount];
  const moneyBack = diff > 0 ? diff : 0;
  const setPay = reactExports.useCallback(async () => {
    let filterProps = {};
    setPayLoading(true);
    if (tableGlobal != "") {
      filterProps = {
        mej_id: parseInt(tableGlobal),
        resto_type: parseInt(cookies.resto_type),
        lok_type: cookies.lok_type
      };
    }
    const _moneySplit = [...moneySplitBill];
    setMoneySplitBill([..._moneySplit, money]);
    console.log([..._moneySplit, money]);
    const { data, error } = await bayarPos({
      //rows: itemsCheckout
      //total: totalPay,
      rows: itemsCheckoutBill[splitCount],
      total: totalPaySplitBill[splitCount],
      kas_id: kasid,
      kas_nama: kasnama,
      dibayar: money,
      kembalian: paymentMode == "CIL" ? diff : moneyBack,
      cus_id: customerGlobal,
      lok_id: cookies.lok_id,
      catatan: catatanGlobal,
      diskon: diskonGlobal,
      disnom: 0,
      carabayar: paymentMode,
      sft_id: 0,
      dicicil: paymentMode == "CIL" ? 1 : 0,
      pajak: pajakGlobal,
      jatuhtempo: piutangDate,
      not_status: bill[splitCount],
      ...filterProps
    });
    setPayLoading(false);
    if (error) {
      alert(dictionary.cashier.calculator.failed[lang]);
    } else {
      setTableGlobal("");
      setCustomerGlobal("");
      if (itemsCheckout[0].dot_id != 0) {
        const init = async () => {
          await deleteDraftPos({ dot_id: parseInt(itemsCheckout[0].dot_id) });
        };
        init();
      }
      if (itemsCheckoutBill[splitCount + 1]) {
        setMoneyFormat("0");
        setMoney(0);
        setSplitCount(splitCount + 1);
      } else {
        let totalmoney = 0;
        let totalpay = 0;
        moneySplitBill.map((i, index) => {
          if (index >= totalPaySplitBill.length)
            totalmoney = totalmoney + parseFloat(i);
        });
        totalPaySplitBill.map((j) => {
          totalpay = totalpay + parseFloat(j);
        });
        setTotalPay(totalpay);
        setMoney(totalmoney);
        setSuccess(true);
      }
    }
  }, [itemsCheckout, totalPay, money, paymentMode, customerId, piutangDate, itemsCheckoutBill, splitCount, moneySplitBill]);
  const onBackspace = () => {
    const newStr = formatThousandSeparator(moneyFormat.slice(0, -1));
    const number = formatBackToNumber(newStr);
    setMoneyFormat(newStr ? newStr : "0");
    setMoney(number ? number : 0);
  };
  const onExact = (pay) => {
    setMoneyFormat(formatThousandSeparator(pay));
    setMoney(pay);
  };
  function formatDate(date) {
    let datePart = [date.getFullYear(), date.getMonth() + 1, date.getDate()].map((n, i) => n.toString().padStart(i === 0 ? 4 : 2, "0")).join("-");
    return datePart;
  }
  const onDateChange = reactExports.useCallback(
    (date = /* @__PURE__ */ new Date()) => {
      setPiutangDate(formatDate(date));
      const newFilter = FilterItemModel();
      newFilter.key = "date";
      newFilter.value = date;
      setDateFilter(newFilter);
      setPiutangOpen(false);
      const _paymentModesNew = lodashExports.cloneDeep(paymentModesNew);
      const indexOfId = _paymentModesNew.findIndex((a) => a.code == "CIL");
      _paymentModesNew[indexOfId].desc = "Piutang deadline " + formatDate(date);
      setPaymentModesNew(_paymentModesNew);
      setModePiutang(true);
    },
    [piutangDate, modePiutang]
  );
  if (success) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(POSSuccessSplitBill, { paymentMode });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-screen-adapt flex flex-col gap-4 bg-gray-50 overflow-auto p-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "value-area", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "header px-2 pb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center pb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { onClick: () => navigate(topic.cashier.route), children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeftIcon, { className: "h-6 w-6 stroke-2" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-grow ml-3 pl-2 border-l", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { color: "gray", variant: "h5", children: dictionary.cashier.calculator.totalPay[lang] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { color: "teal", variant: "h5", className: "lg:text-[36px]", children: `${currency} ${totalPayFormat}` })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            react.Select,
            {
              id: "payment",
              value: paymentMode,
              onChange: setPaymentMode,
              size: "lg",
              color: "teal",
              label: dictionary.cashier.calculator.payWith[lang],
              children: paymentModesNew.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: p.code, children: p.desc }, p.code))
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            react.Input,
            {
              color: "teal",
              value: bill[splitCount],
              label: "Info Split Bill",
              disabled: true
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Dialog, { open: piutangOpen, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(react.DialogHeader, { children: "Tanggal Jatuh Tempo Piutang" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(react.DialogBody, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Card, { className: "my-0 mx-auto w-8/12", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.CardBody, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              DayPicker,
              {
                mode: "single",
                selected: dateFilter ? dateFilter.value : null,
                onSelect: onDateChange,
                captionLayout: "dropdown",
                fromYear: 2010,
                toYear: (/* @__PURE__ */ new Date()).getFullYear()
              }
            ) }) }) })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-3 pl-2 pr-1 flex", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-grow pr-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", children: dictionary.cashier.calculator.money[lang] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 flex justify-between border-b-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h4", children: currency }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h4", children: moneyFormat })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", children: dictionary.cashier.calculator.moneyBack[lang] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between border-b-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { children: currency }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { children: formatThousandSeparator(moneyBack) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          react.Button,
          {
            className: "px-2",
            color: "teal",
            disabled: !money || money < totalPaySplitBill[splitCount] && !modePiutang || money >= totalPaySplitBill[splitCount] && modePiutang,
            onClick: () => setPay(),
            children: payLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(react.Spinner, { className: "h-14 w-14 text-white", color: "light-green" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CheckBadgeIcon, { className: "h-14 w-14" })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-4 gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(react.Button, { className: "min-h-12", variant: "outlined", color: "teal", onClick: () => onAppend(7), children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h3", children: "7" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(react.Button, { className: "min-h-12", variant: "outlined", color: "teal", onClick: () => onAppend(8), children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h3", children: "8" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(react.Button, { className: "min-h-12", variant: "outlined", color: "teal", onClick: () => onAppend(9), children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h3", children: "9" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(react.Button, { className: "min-h-12", variant: "outlined", color: "teal", onClick: onClear, children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h3", children: "C" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(react.Button, { className: "min-h-12", variant: "outlined", color: "teal", onClick: () => onAppend(4), children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h3", children: "4" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(react.Button, { className: "min-h-12", variant: "outlined", color: "teal", onClick: () => onAppend(5), children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h3", children: "5" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(react.Button, { className: "min-h-12", variant: "outlined", color: "teal", onClick: () => onAppend(6), children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h3", children: "6" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(react.Button, { className: "min-h-12 p-0", variant: "outlined", color: "teal", onClick: onBackspace, children: /* @__PURE__ */ jsxRuntimeExports.jsx(BackspaceIcon, { className: "h-10 w-10 stroke-2 mx-auto" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(react.Button, { className: "min-h-12", variant: "outlined", color: "teal", onClick: () => onAppend(1), children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h3", children: "1" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(react.Button, { className: "min-h-12", variant: "outlined", color: "teal", onClick: () => onAppend(2), children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h3", children: "2" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(react.Button, { className: "min-h-12", variant: "outlined", color: "teal", onClick: () => onAppend(3), children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h3", children: "3" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(react.Button, { className: "row-span-2 p-0", variant: "outlined", color: "teal", onClick: () => onExact(totalPaySplitBill[splitCount]), children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h5", children: dictionary.cashier.calculator.exactMoney[lang] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(react.Button, { className: "min-h-12 p-0", variant: "outlined", color: "teal", onClick: () => onAppend("00"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h3", children: "00" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(react.Button, { className: "min-h-12", variant: "outlined", color: "teal", onClick: () => onAppend(0), children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h3", children: "0" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(react.Button, { className: "min-h-12 p-0", variant: "outlined", color: "teal", onClick: () => onAppend("000"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h4", children: "000" }) }),
      recommendations.map((r, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        react.Button,
        {
          className: "min-h-12 p-0 col-span-2",
          variant: "outlined",
          color: "teal",
          onClick: () => onExact(r),
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h4", children: formatThousandSeparator(r) })
        },
        idx
      ))
    ] })
  ] });
}
export {
  POSCalculatorSplitBill as default
};
