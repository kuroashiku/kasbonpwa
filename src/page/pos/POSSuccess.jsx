import { useCallback, useContext, useEffect, useState } from "react";
import { AppContext } from "../../AppContext";
import { capitalizeWords, formatThousandSeparator } from "../../util/formatter";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import POSInvoice from "./POSInvoice";
import ThermalPrinterEncoder from "thermal-printer-encoder";
import { format } from "date-fns";
import { PRINTER_STATE_NONE } from "../../constant/appCommon";
import pdf from "../../assets/icons/pdf.png";
import printer from "../../assets/icons/printer.png";
import { getTransaction } from "../../api/Transaction";
export default function POSSuccess({ exit }) {
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
  } = useContext(AppContext);

  const [moneyView, setMoneyView] = useState(
    money > 0 && notaItemsCheckout.length == 0 ? money : notaItemsCheckout.dibayar
  );
  const [totalPayView, setTotalPayView] = useState(
    totalPay > 0 && notaItemsCheckout.length == 0 ? totalPay : notaItemsCheckout.total
  );
  const [itemList, setItemList] = useState(
    itemsCheckout.length > 0 && notaItemsCheckout.length == 0 ? itemsCheckout : notaItemsCheckout.notaitems
  );
  const [discountView, setDiscountView] = useState(
    diskonGlobal >= 0 && notaItemsCheckout.length == 0 ? diskonGlobal : notaItemsCheckout.diskon
  );
  const [pajakView, setPajakView] = useState(
    pajakGlobal >= 0 && notaItemsCheckout.length == 0 ? pajakGlobal : notaItemsCheckout.pajak
  );

  const [totalPayTempView] = useState(totalPayTemp);
  const [subtotalPayView] = useState(totalPrice);

  const cashback = moneyView - totalPayView;

  const invoiceData = {
    lokasi: cookies?.nama_lokasi || "Kasbon Shop",
    alamatLokasi: cookies?.alamat_lokasi || "",
    footer1: capitalizeWords(cookies?.footer1) || "Terimakasih atas kunjungannya",
    footer2: `*${cookies?.footer2 || ""}`,
    itemCheckout: itemList,
    cashback: cashback < 0 ? cashback * -1 : cashback,
    money: moneyView,
    discount: discountView,
    note: "",
    totalPay: totalPayView,
    totalTemp: totalPayTempView,
    subtotalPay:subtotalPayView,
    tax: pajakView,
    isPiutang: cashback < 0,
    isLaundry: cookies.lok_type == "laundry",
  };

  const printBill = useCallback(async () => {
    const printerProcess=()=>{
      const encoder = new ThermalPrinterEncoder({
        language: "esc-pos",
      });
      let result = encoder
        .initialize()
        .rule({ style: "double" })
        .align("center")
        .bold(true)
        .line(invoiceData.lokasi)
        .bold(false)
        .line(invoiceData.alamatLokasi)
        .line("==============================")
        .align("left");
      !invoiceData.isLaundry
        ? invoiceData.itemCheckout.forEach((itm) => {
            result = result.line(`${itm.itm_nama} (per ${itm.satuan0})`).table(
              [
                { width: 5, align: "left" },
                { width: 10, align: "left" },
                { width: 15, align: "right" },
              ],
              [
                [
                  `${itm.qty} x`,formatThousandSeparator(itm.qty * itm.satuan0hrg),
                ],
              ]
            );
            if (itm.diskon || parseInt(itm.diskon) > 0) {
              result = result
                .align("right")
                .line(` (Disc ${Number(itm.diskon)}% : ${formatThousandSeparator(itm.qty * (itm.satuan0hrg * (1 - parseInt(itm.diskon) / 100)))}) `);
            }
          })
        : invoiceData.itemCheckout.forEach((itm) => {
            itm.service_level_satuan0.forEach((itmservice) => {
              result = result.line(`${itm.itm_nama} (${itmservice.service_nama}) / ${itm.satuan0}`).table(
                [
                  { width: 5, align: "left" },
                  { width: 10, align: "left" },
                  { width: 15, align: "right" },
                ],
                [
                  [
                    `${parseFloat(itmservice.service_qty)} x`,
                    !itm.diskon || parseInt(itm.diskon) <= 0
                      ? formatThousandSeparator(parseFloat(itmservice.service_hrg))
                      : formatThousandSeparator(parseFloat(itmservice.service_hrg) / (1 - parseInt(itm.diskon) / 100)),
                    !itm.diskon || parseInt(itm.diskon) <= 0
                      ? formatThousandSeparator(parseFloat(itmservice.service_qty) * parseFloat(itmservice.service_hrg))
                      : formatThousandSeparator(
                          parseFloat(itmservice.service_qty) *
                            (parseFloat(itmservice.service_hrg) / (1 - parseInt(itm.diskon) / 100))
                        ),
                  ],
                ]
              );
              if (!itm.diskon || parseInt(itm.diskon) <= 0) {
                result = result
                  .align("right")
                  .line(
                    ` (Disc ${Number(itm.diskon)}% : ${formatThousandSeparator(parseFloat(itmservice.service_hrg))}) `
                  );
              }
            });
          });
      if (invoiceData.discount||invoiceData.tax) {
      result = result
        .line("------------------------------")
        .bold(true)
        .table(
          [
            { width: 5, align: "left" },
            { width: 25, align: "right" },
          ],
          [["SubTotal", formatThousandSeparator(invoiceData.subtotalPay)]]
        )
        .bold(false);
      }
      else{
        result = result
        .line("------------------------------")
        .bold(true)
        .table(
          [
            { width: 5, align: "left" },
            { width: 25, align: "right" },
          ],
          [["Total", formatThousandSeparator(invoiceData.totalPay)]]
        )
        .bold(false);
      }
      if (invoiceData.totalTemp) {
      result = result
        .line("------------------------------")
        .bold(true)
        .table(
          [
            { width: 5, align: "left" },
            { width: 25, align: "right" },
          ],
          [["Total After Join", formatThousandSeparator(invoiceData.totalTemp)]]
        )
        .bold(false);
      }
      if (invoiceData.discount) {
        result = result
                .align("right")
                .line(` (Disc ${Number(invoiceData.discount)}% : ${formatThousandSeparator(invoiceData.subtotalPay * (1 - parseInt(invoiceData.discount) / 100))}) `);
      }
      if (invoiceData.tax) {
        result = result.newline().table(
          [
            { width: 5, align: "left" },
            { width: 25, align: "right" },
          ],
          [[`Pajak ${formatThousandSeparator(invoiceData.tax)}%`, `${formatThousandSeparator(((invoiceData.subtotalPay * (1 - parseInt(invoiceData.discount) / 100)) * (parseInt(invoiceData.tax) / 100)))} %`]]
        );
      }
      if (invoiceData.discount||invoiceData.tax) {
        result = result
          .bold(true)
          .table(
            [
              { width: 5, align: "left" },
              { width: 25, align: "right" },
            ],
            [["Total", formatThousandSeparator(invoiceData.totalPay)]]
          )
          .bold(false);
      }
      result = result.newline().table(
        [
          { width: 5, align: "left" },
          { width: 25, align: "right" },
        ],
        [["Bayar", formatThousandSeparator(invoiceData.money)]]
      );
      result = result
        .newline()
        .table(
          [
            { width: 10, align: "left" },
            { width: 20, align: "right" },
          ],
          [
            [
              invoiceData.isPiutang ? "Kurang" : "Kembali",
              invoiceData.cashback ? formatThousandSeparator(invoiceData.cashback) : 0,
            ],
          ]
        )
        .newline()
        .align("center")
        .bold(true)
        .line(invoiceData.footer1)
        .bold(false)
        .line(invoiceData.footer2)
        .newline()
        .newline()
        .encode();
      print(result);
    }
    if(!cookies.always_print){
      if(printerReady)
          printerProcess();
      else{
          initPrinterBT();
          setPrinterReady(true);
      }
    }
    else{
      printerProcess();
    }
  }, [invoiceData]);

  useEffect(() => {
    document.title = `KB${cookies.lok_id}_${format(new Date(), "dd-MMM-yyyy-hh-mm-ss")}`;
    setItemsCheckout([]);
    setNotaItemsCheckout([]);
    setMoney(0);
    setTotalPay(0);
    setPajakGlobal(0);
    setDiskonGlobal(0);
    setTotalPayTemp(0);
    if(cookies.always_print&&printerState > PRINTER_STATE_NONE){
      printBill();
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 overflow-hidden relative p-2">
      <div className="header flex justify-between items-center gap-3 w-full max-w-screen-2xl rounded-xl py-4 shadow-md bg-white mb-6 pt-2 px-2 pb-4 relative">
        <div
          className="back text-black cursor-pointer"
          onClick={() => {
            if (localStorage.getItem("checkout-prev") === "/") {
              navigate(localStorage.getItem("checkout-prev"));
            } else {
              exit();
            }
          }}
        >
          <ChevronLeftIcon className="h-6 w-6" />
        </div>
        <div className="w-[20%] flex gap-3 justify-end mr-2">
          <div className="pdf" onClick={() => window.print()}>
            <img src={pdf} alt="pdf" className="max-w-[24px]" />
          </div>
          <div className="print" onClick={printBill}>
            <img src={printer} alt="print" className="max-w-[24px]" />
          </div>
        </div>
      </div>

      {localStorage.getItem("checkout-prev") === "/" && (
        <div className="info text-center font-semibold text-light-blue-800">Pembayaran Berhasil!</div>
      )}

      <POSInvoice data={invoiceData} />
    </div>
  );
}
