import { r as reactExports, j as jsxRuntimeExports, u as useNavigate, A as AppContext, p as paymentModes, P as PRINTER_STATE_NONE, a as react, e as dictionary, t as topic, K as CalculatorIcon } from "./index-CGEICd-f.js";
import { f as formatThousandSeparator, c as capitalizeWords } from "./formatter-DQiSfF1K.js";
import { f as format } from "./filter-DY4hzksJ.js";
import { E } from "./thermal-printer-encoder.esm-Df5pJIWs.js";
function CheckBadgeIcon({
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
    fillRule: "evenodd",
    d: "M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z",
    clipRule: "evenodd"
  }));
}
const ForwardRef$2 = reactExports.forwardRef(CheckBadgeIcon);
const CheckBadgeIcon$1 = ForwardRef$2;
function DocumentIcon({
  title,
  titleId,
  ...props
}, svgRef) {
  return /* @__PURE__ */ reactExports.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: svgRef,
    "aria-labelledby": titleId
  }, props), title ? /* @__PURE__ */ reactExports.createElement("title", {
    id: titleId
  }, title) : null, /* @__PURE__ */ reactExports.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
  }));
}
const ForwardRef$1 = reactExports.forwardRef(DocumentIcon);
const DocumentIcon$1 = ForwardRef$1;
function PrinterIcon({
  title,
  titleId,
  ...props
}, svgRef) {
  return /* @__PURE__ */ reactExports.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: svgRef,
    "aria-labelledby": titleId
  }, props), title ? /* @__PURE__ */ reactExports.createElement("title", {
    id: titleId
  }, title) : null, /* @__PURE__ */ reactExports.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m10.5 0a48.536 48.536 0 0 0-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5Zm-3 0h.008v.008H15V10.5Z"
  }));
}
const ForwardRef = reactExports.forwardRef(PrinterIcon);
const PrinterIcon$1 = ForwardRef;
function POSInvoiceSplitBill({ atribut, data, total, subtotal, money }) {
  const HeaderArea = () => {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "title-area text-center border-b-2 border-dotted border-gray-800 pb-2 mb-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "nama text-[13px] font-semibold", children: atribut.lokasi }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "alamat text-[11px] text-gray-700", children: atribut.alamatLokasi }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "tanggal text-[11px] text-gray-700", children: format(/* @__PURE__ */ new Date(), "dd-MMM-yyyy-hh-mm-ss") })
    ] });
  };
  const FooterArea = () => {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mt-4 leading-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[12px]", children: atribut.footer1 }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[9px] text-gray-700", children: [
        "*",
        atribut.footer2
      ] })
    ] });
  };
  console.log(atribut);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 p-3 text-black lg:w-[219px] max-w-[219px] pb-5 mx-auto border border-gray-800", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(HeaderArea, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "struk-content my-6 text-xs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs border-b-2 border-gray-800 my-2", children: data.map((i, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          i.itm_nama,
          " (per ",
          i.satuan0,
          ")"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "w-10", children: [
            i.qty,
            " x"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "w-14", children: !i.diskon || parseInt(i.diskon) <= 0 ? formatThousandSeparator(i.satuan0hrg) : formatThousandSeparator(i.satuan0hrg / (1 - parseInt(i.diskon) / 100)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "flex-grow text-right", children: !i.diskon || parseInt(i.diskon) <= 0 ? formatThousandSeparator(i.qty * i.satuan0hrg) : formatThousandSeparator(i.qty * (i.satuan0hrg / (1 - parseInt(i.diskon) / 100))) })
        ] }),
        !i.diskon || parseInt(i.diskon) <= 0 ? null : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-right", children: ` (Disc ${Number(i.diskon)}% : ${formatThousandSeparator(
          i.qty * i.satuan0hrg
        )}) ` })
      ] }, index)) }),
      atribut.discount || data.tax ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Sub Total" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: formatThousandSeparator(subtotal) })
      ] }) : null,
      !atribut.discount ? null : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-grow text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-right", children: ` (Disc ${Number(atribut.discount)}% : ${formatThousandSeparator(
        parseFloat(subtotal) * (1 - parseInt(atribut.discount) / 100)
      )}) ` }) }),
      !atribut.tax ? null : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: `Pajak ${formatThousandSeparator(atribut.tax)}%` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: `${formatThousandSeparator(
          parseFloat(subtotal) * (1 - parseInt(atribut.discount) / 100) * (parseInt(atribut.tax) / 100)
        )}` })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Total" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: formatThousandSeparator(total) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Bayar" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: formatThousandSeparator(money) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: !data.isPiutang ? "Kembali" : "Kurang" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: data.cashback ? formatThousandSeparator(data.cashback) : 0 })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FooterArea, {})
  ] });
}
function POSSuccessSplitBill({ paymentMode }) {
  const navigate = useNavigate();
  const {
    cookies,
    print,
    printerState,
    lang,
    currency,
    notaItemsCheckout,
    setNotaItemsCheckout,
    itemsCheckout,
    setItemsCheckout,
    money,
    setMoney,
    totalPay,
    setTotalPay,
    diskonGlobal,
    pajakGlobal,
    setPajakGlobal,
    setDiskonGlobal,
    itemsCheckoutBill,
    setItemsCheckoutBill,
    totalPaySplitBill,
    setTotalPaySplitBill,
    moneySplitBill,
    setMoneySplitBill,
    bill,
    setBill,
    initPrinterBT,
    setPajakGlobalJSON,
    setTotalPriceBill,
    totalPriceBill
  } = reactExports.useContext(AppContext);
  const [moneyView, setMoneyView] = reactExports.useState(money > 0 && notaItemsCheckout.length == 0 ? money : notaItemsCheckout.dibayar);
  const [totalPayView, setTotalPayView] = reactExports.useState(totalPay > 0 && notaItemsCheckout.length == 0 ? totalPay : notaItemsCheckout.total);
  const [itemList, setItemList] = reactExports.useState(itemsCheckout.length > 0 && notaItemsCheckout.length == 0 ? itemsCheckout : notaItemsCheckout.notaitems);
  const [discountView, setDiscountView] = reactExports.useState(diskonGlobal >= 0 && notaItemsCheckout.length == 0 ? diskonGlobal : notaItemsCheckout.diskon);
  const [pajakView, setPajakView] = reactExports.useState(pajakGlobal >= 0 && notaItemsCheckout.length == 0 ? pajakGlobal : notaItemsCheckout.pajak);
  const [itemBillList, setItemBillList] = reactExports.useState(itemsCheckoutBill.length > 0 && notaItemsCheckout.length == 0 ? itemsCheckoutBill : notaItemsCheckout.notaitems);
  const [moneyBillView, setMoneyBillView] = reactExports.useState(moneySplitBill.length > 0 && notaItemsCheckout.length == 0 ? moneySplitBill : notaItemsCheckout.dibayar);
  const [totalPriceBillView, setTotalPriceBillView] = reactExports.useState(totalPriceBill.length > 0 && notaItemsCheckout.length == 0 ? totalPriceBill : notaItemsCheckout.total);
  const [totalPayBillView, setTotalPayBillView] = reactExports.useState(totalPaySplitBill.length > 0 && notaItemsCheckout.length == 0 ? totalPaySplitBill : notaItemsCheckout.total);
  const paymentModeObj = paymentModes.find((p) => p.code === paymentMode);
  const cashback = moneyView - totalPayView;
  const [printerReady, setPrinterReady] = reactExports.useState(false);
  console.log(diskonGlobal > 0);
  const invoiceData = {
    lokasi: (cookies == null ? void 0 : cookies.nama_lokasi) || "Kasbon Shop",
    alamatLokasi: (cookies == null ? void 0 : cookies.alamat_lokasi) || "",
    footer1: capitalizeWords(cookies == null ? void 0 : cookies.footer1) || "Terimakasih atas kunjungannya",
    footer2: `*${(cookies == null ? void 0 : cookies.footer2) || ""}`,
    itemCheckout: itemList,
    itemCheckoutBill: itemBillList,
    moneySplitBill: moneyBillView,
    totalPaySplitBill: totalPayBillView,
    cashback: cashback < 0 ? cashback * -1 : cashback,
    money: moneyView,
    discount: discountView,
    note: "",
    totalPay: totalPayView,
    tax: pajakView,
    isPiutang: cashback < 0,
    isLaundry: cookies.lok_type == "laundry"
  };
  const printBill = reactExports.useCallback(async () => {
    const printerProcess = () => {
      const encoder = new E({
        language: "esc-pos"
      });
      let result = encoder.initialize();
      invoiceData.itemCheckoutBill.map((i, index) => {
        let cashbackBill = parseFloat(invoiceData.moneySplitBill[index]) - parseFloat(invoiceData.totalPaySplitBill[index]);
        let checkCashback = cashbackBill < 0 ? cashbackBill * -1 : cashbackBill;
        result = result.rule({ style: "double" }).align("center").bold(true).line(invoiceData.lokasi).bold(false).line(invoiceData.alamatLokasi).line("==============================").align("left");
        i.forEach((itm2) => {
          result = result.line(`${itm2.itm_nama} (per ${itm2.satuan0})`).table(
            [
              { width: 5, align: "left" },
              { width: 10, align: "left" },
              { width: 15, align: "right" }
            ],
            [
              [`${itm2.qty} x`, formatThousandSeparator(itm2.satuan0hrg), !itm2.diskon || parseInt(itm2.diskon) <= 0 ? formatThousandSeparator(itm2.qty * itm2.satuan0hrg) : formatThousandSeparator(itm2.qty * (itm2.satuan0hrg * (1 - parseInt(itm2.diskon) / 100)))]
            ]
          );
          if (parseInt(itm2.diskon) > 0) {
            result = result.align("right").line(` (Disc/Item ${Number(itm2.diskon)}% : ${formatThousandSeparator(itm2.satuan0hrg * (1 - parseInt(itm2.diskon) / 100))}) `);
          }
        });
        result = result.line("------------------------------").bold(true).table(
          [
            { width: 5, align: "left" },
            { width: 25, align: "right" }
          ],
          [
            ["Subtotal", formatThousandSeparator(itm.total)]
          ]
        ).bold(false);
        if (invoiceData.discount) {
          result = result.newline().table(
            [
              { width: 5, align: "left" },
              { width: 25, align: "right" }
            ],
            [
              [`Disc Total${parseFloat(invoiceData.discount)} %`, `$${formatThousandSeparator(itm.total * (1 - parseInt(itm.diskon) / 100))} %`]
            ]
          );
        }
        result = result.line("------------------------------").bold(true).table(
          [
            { width: 5, align: "left" },
            { width: 25, align: "right" }
          ],
          [
            ["Total", formatThousandSeparator(parseFloat(invoiceData.totalPaySplitBill[index]))]
          ]
        ).bold(false);
        if (invoiceData.discount) {
          result = result.newline().table(
            [
              { width: 5, align: "left" },
              { width: 25, align: "right" }
            ],
            [
              ["Diskon", `${formatThousandSeparator(invoiceData.discount)} %`]
            ]
          );
        }
        if (invoiceData.tax) {
          result = result.newline().table(
            [
              { width: 5, align: "left" },
              { width: 25, align: "right" }
            ],
            [
              ["Pajak", `${formatThousandSeparator(invoiceData.tax)} %`]
            ]
          );
        }
        result = result.newline().table(
          [
            { width: 5, align: "left" },
            { width: 25, align: "right" }
          ],
          [
            ["Bayar", formatThousandSeparator(parseFloat(invoiceData.moneySplitBill[index]))]
          ]
        );
        result = result.newline().table(
          [
            { width: 10, align: "left" },
            { width: 20, align: "right" }
          ],
          [
            [
              checkCashback < 0 ? "Kurang" : "Kembali",
              invoiceData.cashback ? formatThousandSeparator(checkCashback) : 0
            ]
          ]
        ).newline().align("center").bold(true).line(invoiceData.footer1).bold(false).line(invoiceData.footer2).newline().newline();
      });
      result = result.encode();
      print(result);
    };
    if (!cookies.always_print) {
      if (printerReady)
        printerProcess();
      else {
        initPrinterBT();
        setPrinterReady(true);
      }
    } else {
      printerProcess();
    }
  }, [invoiceData]);
  reactExports.useEffect(() => {
    document.title = `KB${cookies.lok_id}_${format(/* @__PURE__ */ new Date(), "dd-MMM-yyyy-hh-mm-ss")}`;
    setItemsCheckout([]);
    setNotaItemsCheckout([]);
    setMoney(0);
    setTotalPay(0);
    setPajakGlobal(0);
    setDiskonGlobal(0);
    setItemsCheckoutBill([]), setTotalPaySplitBill([]), setMoneySplitBill([]), setBill([]), setPajakGlobalJSON([]);
    if (cookies.always_print && printerState > PRINTER_STATE_NONE) {
      printBill();
    }
  }, []);
  const InvoiceArea = () => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: invoiceData.itemCheckoutBill.map((i, index) => {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        POSInvoiceSplitBill,
        {
          data: i,
          atribut: invoiceData,
          total: totalPayBillView[index],
          subtotal: totalPriceBillView[index],
          money: moneyBillView[index]
        }
      );
    }) });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-50 overflow-hidden relative p-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "no-print", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { className: "text-center my-3", variant: "h4", children: paymentModeObj ? paymentModeObj.desc : "" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Typography, { className: "text-center my-3", children: [
        dictionary.cashier.calculator.pay[lang],
        " ",
        currency,
        " ",
        formatThousandSeparator(totalPayView)
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Typography, { className: "text-center my-3", children: [
        dictionary.cashier.calculator.moneyBack[lang],
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        currency,
        " ",
        !cashback ? 0 : formatThousandSeparator(cashback)
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto w-fit mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CheckBadgeIcon$1, { className: "w-14 h-14 text-teal-600" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          react.Button,
          {
            size: "lg",
            variant: "outlined",
            color: "teal",
            className: "group w-full relative flex items-center gap-3 overflow-hidden pr-[72px] mb-4",
            onClick: () => window.print(),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-grow text-left", children: dictionary.cashier.calculator.pdf[lang] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute right-0 grid h-full w-12 place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DocumentIcon$1, { className: "w-5 h-5" }) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          react.Button,
          {
            size: "lg",
            variant: "outlined",
            color: "teal",
            className: "group w-full relative flex items-center gap-3 overflow-hidden pr-[72px] mb-4",
            onClick: printBill,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-grow text-left", children: dictionary.cashier.calculator.print[lang] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute right-0 grid h-full w-12 place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PrinterIcon$1, { className: "w-5 h-5" }) })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        react.Button,
        {
          size: "lg",
          variant: "outlined",
          color: "teal",
          className: "group w-full relative flex items-center gap-3 overflow-hidden pr-[72px]",
          onClick: () => navigate(topic.cashier.route),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-grow text-left", children: dictionary.cashier.calculator.newTrans[lang] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute right-0 grid h-full w-12 place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CalculatorIcon, { className: "w-5 h-5" }) })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(InvoiceArea, {})
  ] });
}
export {
  DocumentIcon$1 as D,
  POSSuccessSplitBill as P,
  PrinterIcon$1 as a
};
