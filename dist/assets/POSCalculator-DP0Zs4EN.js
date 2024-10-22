import { j as jsxRuntimeExports, u as useNavigate, r as reactExports, A as AppContext, P as PRINTER_STATE_NONE, p as paymentModes, t as topic, e as dictionary, a as react } from "./index-CGEICd-f.js";
import { f as formatThousandSeparator, c as capitalizeWords, a as formatBackToNumber } from "./formatter-DQiSfF1K.js";
import { g as getAmountRecommendations, C as CheckBadgeIcon, B as BackspaceIcon } from "./smartRecomAmount-9D3Bj3QX.js";
import { f as format, F as FilterItemModel } from "./filter-DY4hzksJ.js";
import { b as bayarPos, d as deleteDraftPos } from "./Pos-68rCAtrO.js";
import { g as getTransaction } from "./Transaction-DU-UTb94.js";
import { C as ChevronLeftIcon, p as pdf, a as printer, P as POSSuccess } from "./POSSuccess-rNvbPxQE.js";
import { E } from "./thermal-printer-encoder.esm-Df5pJIWs.js";
import { D as DayPicker } from "./index.esm-DzNpyuue.js";
import { l as lodashExports } from "./lodash-C34_XwDM.js";
import "./imagekitio-react.esm-Dkgu7ZiT.js";
import { S as StateManagedSelect$1 } from "./react-select.esm-BtDncE64.js";
import { C as ChevronLeftIcon$1 } from "./ChevronLeftIcon-jbeLmLzz.js";
import "./hoist-non-react-statics.cjs-BxdQBvuA.js";
function POSInvoiceJoinBill({ data }) {
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
    data.itemBillCheckout.map((iii, indexii) => {
      let _totalPrice = 0;
      iii.notaitems.forEach((item) => {
        _totalPrice += parseFloat(item.nit_total);
      });
      const subTotal = _totalPrice;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "struk-content my-6 text-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs border-b-2 border-gray-800 my-2", children: iii.notaitems.map((i, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
            i.itm_nama,
            " (per ",
            i.nit_satuan0,
            ")"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "w-10", children: [
              parseFloat(i.nit_qty),
              " x"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "w-14", children: formatThousandSeparator(parseFloat(i.nit_satuan0hrg)) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "flex-grow text-right", children: formatThousandSeparator(parseFloat(i.nit_qty) * parseFloat(i.nit_satuan0hrg)) })
          ] }),
          parseFloat(i.nit_diskon) == 0 ? null : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-right", children: ` (Disc ${Number(i.nit_diskon)}% : ${formatThousandSeparator(
            parseFloat(i.nit_qty) * (parseFloat(i.nit_satuan0hrg) * (1 - parseInt(i.nit_diskon) / 100))
          )}) ` })
        ] }, index)) }),
        !parseFloat(iii.not_diskon) == 0 || !parseFloat(iii.not_pajak) == 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Sub Total" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: formatThousandSeparator(subTotal) })
        ] }) : null,
        data.totalTemp ? null : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Total After Join" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: formatThousandSeparator(data.totalTemp) })
        ] }),
        parseFloat(iii.not_diskon) == 0 ? null : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-grow text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-right", children: ` (Disc ${Number(iii.not_diskon)}% : ${formatThousandSeparator(
          parseFloat(subTotal) * (1 - parseInt(iii.not_diskon) / 100)
        )}) ` }) }),
        parseFloat(iii.not_pajak) == 0 ? null : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: `Pajak ${formatThousandSeparator(iii.not_pajak)}%` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: `${formatThousandSeparator(
            parseFloat(subTotal) * (1 - parseInt(iii.not_diskon) / 100) * (parseInt(iii.not_pajak) / 100)
          )}` })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Total" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: formatThousandSeparator(parseFloat(iii.not_total)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Bayar" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: formatThousandSeparator(parseFloat(iii.not_dibayar)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: iii.not_dicicil == "0" ? "Kembali" : "Kurang" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: iii.not_kembalian ? formatThousandSeparator(parseFloat(iii.not_kembalian)) : 0 })
        ] })
      ] });
    }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FooterArea, {})
  ] });
}
function POSSuccessJoinBill({ exit }) {
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
    totalPrice,
    itemsCheckoutBill,
    setItemsCheckoutBill
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
  const [itemBillView] = reactExports.useState(itemsCheckoutBill);
  const cashback = moneyView - totalPayView;
  const invoiceData = {
    lokasi: (cookies == null ? void 0 : cookies.nama_lokasi) || "Kasbon Shop",
    alamatLokasi: (cookies == null ? void 0 : cookies.alamat_lokasi) || "",
    footer1: capitalizeWords(cookies == null ? void 0 : cookies.footer1) || "Terimakasih atas kunjungannya",
    footer2: `*${(cookies == null ? void 0 : cookies.footer2) || ""}`,
    itemCheckout: itemList,
    itemBillCheckout: itemBillView,
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
  }, [itemsCheckoutBill]);
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
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeftIcon, { className: "h-6 w-6" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-[20%] flex gap-3 justify-end mr-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pdf", onClick: () => window.print(), children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: pdf, alt: "pdf", className: "max-w-[24px]" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "print", onClick: printBill, children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: printer, alt: "print", className: "max-w-[24px]" }) })
      ] })
    ] }),
    localStorage.getItem("checkout-prev") === "/" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "info text-center font-semibold text-light-blue-800", children: "Pembayaran Berhasil!" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(POSInvoiceJoinBill, { data: invoiceData })
  ] });
}
function POSCalculator() {
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
    setTotalPayTemp,
    totalPayTemp,
    setItemsCheckoutBill
  } = reactExports.useContext(AppContext);
  const [customerId, setCustomerId] = reactExports.useState("");
  const [moneyFormat, setMoneyFormat] = reactExports.useState("0");
  const [totalPayFormat, setTotalPayFormat] = reactExports.useState("0");
  const [paymentMode, setPaymentMode] = reactExports.useState(defaultPayment);
  const [recommendations, setRecommendations] = reactExports.useState([]);
  const [transaction, setTransaction] = reactExports.useState([]);
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
  const [qrisModal, setQrisModal] = reactExports.useState(false);
  const [imagesQris, setImagesQris] = reactExports.useState("");
  const [valueJoinNota, setValueJoinNota] = reactExports.useState([]);
  const [successJoin, setSuccessJoin] = reactExports.useState(false);
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
    if (cookies.join_bill) {
      const inittransaksi = async () => {
        const { data, error } = await getTransaction({
          lok_id: cookies.lok_id,
          orifields: "yes",
          loaditems: "yes"
        });
        if (error) {
          alert("Data tidak ditemukan");
        } else {
          setTransaction(data);
        }
      };
      inittransaksi();
    }
    if (itemsCheckout.length <= 0) {
      navigate(topic.cashier.route);
    }
    setTotalPayFormat(formatThousandSeparator(totalPay));
    const options = getAmountRecommendations(totalPay);
    setRecommendations(options);
    setPiutangDate(null);
    setImagesQris(cookies.qris);
  }, []);
  reactExports.useEffect(() => {
    if (paymentMode == "CIL") {
      setModePiutang(true);
    } else {
      if (paymentMode == "QRIS") {
        if (cookies.qris)
          setQrisModal(true);
        else {
          alert("Set menu QriS untuk menggunakan payment mode ini");
          setPaymentMode("KAS");
        }
      }
      setModePiutang(false);
    }
  }, [paymentMode]);
  const closeQrisModal = (isPaid) => {
    if (isPaid) {
      onExact(totalPay);
    } else {
      setPaymentMode(defaultPayment);
    }
    setQrisModal(false);
  };
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
  const diff = money - totalPay;
  const moneyBack = diff > 0 ? diff : 0;
  const setPay = reactExports.useCallback(async () => {
    console.log(pajakGlobal);
    console.log(diskonGlobal);
    let filterProps = {};
    setPayLoading(true);
    if (tableGlobal != "") {
      filterProps = {
        mej_id: parseInt(tableGlobal),
        resto_type: parseInt(cookies.resto_type),
        lok_type: cookies.lok_type
      };
    }
    let strvaluejoin = "";
    if (valueJoinNota.length > 0) {
      valueJoinNota.map((p) => strvaluejoin = strvaluejoin + p.nomor + ",");
    }
    const arraySend = {
      rows: itemsCheckout,
      total: totalPay,
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
      joinnota: valueJoinNota.length > 0 ? strvaluejoin : null,
      ...filterProps
    };
    const { data, error } = await bayarPos(arraySend);
    setPayLoading(false);
    if (error) {
      if (!error.message) {
        alert("Terdeteksi offline, disimpan dilokal");
        if (localStorage.getItem("pos_save")) {
          const _possave = JSON.parse(localStorage.getItem("pos_save")).value;
          const _possaveclone = lodashExports.cloneDeep(JSON.parse(_possave));
          _possaveclone.push(arraySend);
          localStorage.setItem(
            "pos_save",
            JSON.stringify({
              key: "pos_save",
              value: JSON.stringify(_possaveclone)
            })
          );
        } else {
          let arrLocal = [];
          arrLocal.push(arraySend);
          localStorage.setItem(
            "pos_save",
            JSON.stringify({
              key: "pos_save",
              value: JSON.stringify(arrLocal)
            })
          );
        }
      } else {
        alert(dictionary.cashier.calculator.failed[lang]);
      }
    } else {
      setTableGlobal("");
      setCustomerGlobal("");
      if (itemsCheckout[0].dot_id != 0) {
        const init = async () => {
          await deleteDraftPos({ dot_id: parseInt(itemsCheckout[0].dot_id) });
        };
        init();
      }
      if (valueJoinNota.length > 0) {
        valueJoinNota.map((p) => totalnew = totalnew + parseFloat(p.total));
        valueJoinNota.unshift(data);
        setTotalPayTemp(totalnew + parseFloat(totalPay));
        setSuccessJoin(true);
        setItemsCheckoutBill(valueJoinNota);
      } else
        setSuccess(true);
    }
  }, [itemsCheckout, totalPay, money, paymentMode, customerId, piutangDate, valueJoinNota, totalPayTemp, pajakGlobal, diskonGlobal]);
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
      console.log(formatDate(date));
      setPiutangDate(formatDate(date));
      const newFilter = FilterItemModel();
      newFilter.key = "date";
      newFilter.value = date;
      setDateFilter(newFilter);
      setPiutangOpen(false);
      const _paymentModesNew = lodashExports.cloneDeep(paymentModesNew);
      const indexOfId = _paymentModesNew.findIndex((a) => a.code == "CIL");
      _paymentModesNew[indexOfId].desc = "Piutang deadline " + formatDate(date);
      console.log(_paymentModesNew);
      setPaymentModesNew(_paymentModesNew);
      setModePiutang(true);
    },
    [piutangDate, modePiutang]
  );
  if (success) {
    localStorage.setItem("checkout-prev", "/");
    return /* @__PURE__ */ jsxRuntimeExports.jsx(POSSuccess, { paymentMode });
  }
  if (successJoin) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(POSSuccessJoinBill, { paymentMode });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-screen-adapt flex flex-col gap-4 bg-gray-50 overflow-auto p-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "value-area", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "header px-2 pb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center pb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { onClick: () => navigate(topic.cashier.route), children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeftIcon$1, { className: "h-6 w-6 stroke-2" }) }),
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
          cookies.join_bill ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              StateManagedSelect$1,
              {
                closeMenuOnSelect: false,
                isMulti: true,
                options: transaction,
                value: valueJoinNota,
                onChange: setValueJoinNota,
                getOptionLabel: (transaction2) => transaction2.not_nomor,
                getOptionValue: (transaction2) => transaction2.not_nomor
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute text-xs left-3 bg-gray-50 px-1", style: { top: "-7px" }, children: "List Nota For Join" })
          ] }) : null,
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
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Dialog, { open: qrisModal, handler: () => closeQrisModal(false), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(react.DialogHeader, { children: "Silahkan Scan QRIS" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(react.DialogBody, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: `https://ik.imagekit.io/3ec6wafmg/tr:h-400,w-600/${imagesQris}`, className: "w-full h-auto mb-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Button, { size: "sm", onClick: () => closeQrisModal(true), color: "teal", fullWidth: true, variant: "gradient", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { children: "Sudah Dibayar" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Button, { size: "sm", onClick: () => closeQrisModal(false), color: "teal", fullWidth: true, variant: "outlined", className: "mt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { children: "Batal" }) })
            ] })
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
            disabled: !money || money < totalPay && !modePiutang || money >= totalPay && modePiutang,
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
      /* @__PURE__ */ jsxRuntimeExports.jsx(react.Button, { className: "row-span-2 p-0", variant: "outlined", color: "teal", onClick: () => onExact(totalPay), children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h5", children: dictionary.cashier.calculator.exactMoney[lang] }) }),
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
  POSCalculator as default
};
