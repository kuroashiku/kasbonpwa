import { r as reactExports, b as ItemCheckoutModel, j as jsxRuntimeExports, u as useNavigate, A as AppContext, P as PRINTER_STATE_NONE } from "./index-CGEICd-f.js";
import { f as formatThousandSeparator, c as capitalizeWords } from "./formatter-DQiSfF1K.js";
import { E } from "./thermal-printer-encoder.esm-Df5pJIWs.js";
import { f as format } from "./filter-DY4hzksJ.js";
function ChevronLeftIcon({
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
    d: "M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z",
    clipRule: "evenodd"
  }));
}
const ForwardRef = reactExports.forwardRef(ChevronLeftIcon);
const ChevronLeftIcon$1 = ForwardRef;
const InvoicePOS = () => ({
  lokasi: "Kasbon Shop",
  alamatLokasi: "",
  footer1: "Terimakasih atas kunjungannya",
  footer2: "",
  itemCheckout: [ItemCheckoutModel()],
  money: 0,
  totalPay: 0,
  subtotalPay: 0,
  cashback: 0,
  discount: 0,
  tax: 0,
  note: "",
  isPiutang: false
});
function POSInvoice({ data = InvoicePOS() }) {
  const HeaderArea = () => {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "title-area text-center border-b-2 border-dotted border-gray-800 pb-2 mb-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "nama text-[13px] font-semibold", children: data.lokasi }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "alamat text-[11px] text-gray-700", children: data.alamatLokasi })
    ] });
  };
  const FooterArea = () => {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mt-4 leading-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[12px]", children: data.footer1 }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[9px] text-gray-700", children: [
        "*",
        data.footer2
      ] })
    ] });
  };
  console.log(data);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "my-4 p-3 text-black lg:w-[219px] max-w-[219px] pb-5 mx-auto border border-gray-800", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(HeaderArea, {}),
    console.log(data),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "struk-content my-6 text-xs", children: [
      !data.isLaundry ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs border-b-2 border-gray-800 my-2", children: data.itemCheckout.map((i, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-2", children: [
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
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "w-14", children: formatThousandSeparator(i.satuan0hrg) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "flex-grow text-right", children: formatThousandSeparator(i.qty * i.satuan0hrg) })
        ] }),
        !i.diskon || parseInt(i.diskon) <= 0 ? null : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-right", children: ` (Disc ${Number(i.diskon)}% : ${formatThousandSeparator(
          i.qty * (i.satuan0hrg * (1 - parseInt(i.diskon) / 100))
        )}) ` })
      ] }, index)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs border-b-2 border-gray-800 my-2", children: data.itemCheckout.map(
        (i, index) => i.service_level_satuan0.map((ii, indexi) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
            i.itm_nama,
            " ",
            ii.service_nama ? ii.service_nama : "",
            " / ",
            i.satuan0
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "w-10", children: [
              parseFloat(ii.service_qty),
              " x"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "w-14", children: !i.diskon || parseInt(i.diskon) <= 0 ? formatThousandSeparator(parseFloat(ii.service_hrg)) : formatThousandSeparator(parseFloat(ii.service_hrg) * (1 - parseInt(i.diskon) / 100)) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "flex-grow text-right", children: !i.diskon || parseInt(i.diskon) <= 0 ? formatThousandSeparator(parseFloat(ii.service_qty) * parseFloat(ii.service_hrg)) : formatThousandSeparator(
              parseFloat(ii.service_qty) * (parseFloat(ii.service_hrg) * (1 - parseInt(i.diskon) / 100))
            ) })
          ] }),
          !i.diskon || parseInt(i.diskon) <= 0 ? null : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-right", children: ` (Disc ${Number(i.diskon)}% : ${formatThousandSeparator(
            parseFloat(ii.service_qty) * parseFloat(ii.service_hrg)
          )}) ` })
        ] }, index + indexi))
      ) }),
      data.discount || data.tax ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Sub Total" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: formatThousandSeparator(data.subtotalPay) })
      ] }) : null,
      !data.totalTemp ? null : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Total After Join" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: formatThousandSeparator(data.totalTemp) })
      ] }),
      !data.discount ? null : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-grow text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-right", children: ` (Disc ${Number(data.discount)}% : ${formatThousandSeparator(
        parseFloat(data.subtotalPay) * (1 - parseInt(data.discount) / 100)
      )}) ` }) }),
      !data.tax ? null : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: `Pajak ${formatThousandSeparator(data.tax)}%` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: `${formatThousandSeparator(
          parseFloat(data.subtotalPay) * (1 - parseInt(data.discount) / 100) * (parseInt(data.tax) / 100)
        )}` })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Total" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: formatThousandSeparator(data.totalPay) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Bayar" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: formatThousandSeparator(data.money) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: !data.isPiutang ? "Kembali" : "Kurang" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: data.cashback ? formatThousandSeparator(data.cashback) : 0 })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FooterArea, {})
  ] });
}
const pdf = "/assets/pdf-BJQ4IRN2.png";
const printer = "/assets/printer-o5B2z6-f.png";
function POSSuccess({ exit }) {
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
    pajakGlobal,
    setPajakGlobal,
    diskonGlobal,
    setDiskonGlobal,
    pajakGlobalJSON,
    setPajakGlobalJSON,
    totalPayTemp,
    setTotalPayTemp,
    totalPrice
  } = reactExports.useContext(AppContext);
  const [moneyView, setMoneyView] = reactExports.useState(
    money > 0 && notaItemsCheckout.length == 0 ? money : notaItemsCheckout.dibayar
  );
  const [totalPayView, setTotalPayView] = reactExports.useState(
    totalPay > 0 && notaItemsCheckout.length == 0 ? totalPay : notaItemsCheckout.total
  );
  const [itemList, setItemList] = reactExports.useState(
    itemsCheckout.length > 0 && notaItemsCheckout.length == 0 ? itemsCheckout : notaItemsCheckout.notaitems
  );
  const [discountView, setDiscountView] = reactExports.useState(
    diskonGlobal >= 0 && notaItemsCheckout.length == 0 ? diskonGlobal : notaItemsCheckout.diskon
  );
  const [pajakView, setPajakView] = reactExports.useState(
    pajakGlobal >= 0 && notaItemsCheckout.length == 0 ? pajakGlobal : notaItemsCheckout.pajak
  );
  const [totalPayTempView] = reactExports.useState(totalPayTemp);
  const [subtotalPayView] = reactExports.useState(totalPrice);
  const cashback = moneyView - totalPayView;
  const invoiceData = {
    lokasi: (cookies == null ? void 0 : cookies.nama_lokasi) || "Kasbon Shop",
    alamatLokasi: (cookies == null ? void 0 : cookies.alamat_lokasi) || "",
    footer1: capitalizeWords(cookies == null ? void 0 : cookies.footer1) || "Terimakasih atas kunjungannya",
    footer2: `*${(cookies == null ? void 0 : cookies.footer2) || ""}`,
    itemCheckout: itemList,
    cashback: cashback < 0 ? cashback * -1 : cashback,
    money: moneyView,
    discount: discountView,
    note: "",
    totalPay: totalPayView,
    totalTemp: totalPayTempView,
    subtotalPay: subtotalPayView,
    tax: pajakView,
    isPiutang: cashback < 0,
    isLaundry: cookies.lok_type == "laundry"
  };
  const printBill = reactExports.useCallback(async () => {
    const printerProcess = () => {
      const encoder = new E({
        language: "esc-pos"
      });
      let result = encoder.initialize().rule({ style: "double" }).align("center").bold(true).line(invoiceData.lokasi).bold(false).line(invoiceData.alamatLokasi).line("==============================").align("left");
      !invoiceData.isLaundry ? invoiceData.itemCheckout.forEach((itm) => {
        result = result.line(`${itm.itm_nama} (per ${itm.satuan0})`).table(
          [
            { width: 5, align: "left" },
            { width: 10, align: "left" },
            { width: 15, align: "right" }
          ],
          [
            [
              `${itm.qty} x`,
              formatThousandSeparator(itm.qty * itm.satuan0hrg)
            ]
          ]
        );
        if (itm.diskon || parseInt(itm.diskon) > 0) {
          result = result.align("right").line(` (Disc ${Number(itm.diskon)}% : ${formatThousandSeparator(itm.qty * (itm.satuan0hrg * (1 - parseInt(itm.diskon) / 100)))}) `);
        }
      }) : invoiceData.itemCheckout.forEach((itm) => {
        itm.service_level_satuan0.forEach((itmservice) => {
          result = result.line(`${itm.itm_nama} (${itmservice.service_nama}) / ${itm.satuan0}`).table(
            [
              { width: 5, align: "left" },
              { width: 10, align: "left" },
              { width: 15, align: "right" }
            ],
            [
              [
                `${parseFloat(itmservice.service_qty)} x`,
                !itm.diskon || parseInt(itm.diskon) <= 0 ? formatThousandSeparator(parseFloat(itmservice.service_hrg)) : formatThousandSeparator(parseFloat(itmservice.service_hrg) / (1 - parseInt(itm.diskon) / 100)),
                !itm.diskon || parseInt(itm.diskon) <= 0 ? formatThousandSeparator(parseFloat(itmservice.service_qty) * parseFloat(itmservice.service_hrg)) : formatThousandSeparator(
                  parseFloat(itmservice.service_qty) * (parseFloat(itmservice.service_hrg) / (1 - parseInt(itm.diskon) / 100))
                )
              ]
            ]
          );
          if (!itm.diskon || parseInt(itm.diskon) <= 0) {
            result = result.align("right").line(
              ` (Disc ${Number(itm.diskon)}% : ${formatThousandSeparator(parseFloat(itmservice.service_hrg))}) `
            );
          }
        });
      });
      if (invoiceData.discount || invoiceData.tax) {
        result = result.line("------------------------------").bold(true).table(
          [
            { width: 5, align: "left" },
            { width: 25, align: "right" }
          ],
          [["SubTotal", formatThousandSeparator(invoiceData.subtotalPay)]]
        ).bold(false);
      } else {
        result = result.line("------------------------------").bold(true).table(
          [
            { width: 5, align: "left" },
            { width: 25, align: "right" }
          ],
          [["Total", formatThousandSeparator(invoiceData.totalPay)]]
        ).bold(false);
      }
      if (invoiceData.totalTemp) {
        result = result.line("------------------------------").bold(true).table(
          [
            { width: 5, align: "left" },
            { width: 25, align: "right" }
          ],
          [["Total After Join", formatThousandSeparator(invoiceData.totalTemp)]]
        ).bold(false);
      }
      if (invoiceData.discount) {
        result = result.align("right").line(` (Disc ${Number(invoiceData.discount)}% : ${formatThousandSeparator(invoiceData.subtotalPay * (1 - parseInt(invoiceData.discount) / 100))}) `);
      }
      if (invoiceData.tax) {
        result = result.newline().table(
          [
            { width: 5, align: "left" },
            { width: 25, align: "right" }
          ],
          [[`Pajak ${formatThousandSeparator(invoiceData.tax)}%`, `${formatThousandSeparator(invoiceData.subtotalPay * (1 - parseInt(invoiceData.discount) / 100) * (parseInt(invoiceData.tax) / 100))} %`]]
        );
      }
      if (invoiceData.discount || invoiceData.tax) {
        result = result.bold(true).table(
          [
            { width: 5, align: "left" },
            { width: 25, align: "right" }
          ],
          [["Total", formatThousandSeparator(invoiceData.totalPay)]]
        ).bold(false);
      }
      result = result.newline().table(
        [
          { width: 5, align: "left" },
          { width: 25, align: "right" }
        ],
        [["Bayar", formatThousandSeparator(invoiceData.money)]]
      );
      result = result.newline().table(
        [
          { width: 10, align: "left" },
          { width: 20, align: "right" }
        ],
        [
          [
            invoiceData.isPiutang ? "Kurang" : "Kembali",
            invoiceData.cashback ? formatThousandSeparator(invoiceData.cashback) : 0
          ]
        ]
      ).newline().align("center").bold(true).line(invoiceData.footer1).bold(false).line(invoiceData.footer2).newline().newline().encode();
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
    setTotalPayTemp(0);
    if (cookies.always_print && printerState > PRINTER_STATE_NONE) {
      printBill();
    }
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-gray-50 overflow-hidden relative p-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "header flex justify-between items-center gap-3 w-full max-w-screen-2xl rounded-xl py-4 shadow-md bg-white mb-6 pt-2 px-2 pb-4 relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "back text-black cursor-pointer",
          onClick: () => {
            if (localStorage.getItem("checkout-prev") === "/") {
              navigate(localStorage.getItem("checkout-prev"));
            } else {
              exit();
            }
          },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeftIcon$1, { className: "h-6 w-6" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-[20%] flex gap-3 justify-end mr-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pdf", onClick: () => window.print(), children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: pdf, alt: "pdf", className: "max-w-[24px]" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "print", onClick: printBill, children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: printer, alt: "print", className: "max-w-[24px]" }) })
      ] })
    ] }),
    localStorage.getItem("checkout-prev") === "/" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "info text-center font-semibold text-light-blue-800", children: "Pembayaran Berhasil!" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(POSInvoice, { data: invoiceData })
  ] });
}
export {
  ChevronLeftIcon$1 as C,
  POSSuccess as P,
  printer as a,
  pdf as p
};
