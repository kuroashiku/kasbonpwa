import { Button, Typography } from "@material-tailwind/react";
import { dictionary } from "../../constant/appDictionary";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../../AppContext";
import { capitalizeWords, formatThousandSeparator } from "../../util/formatter";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import { CalculatorIcon, DocumentIcon, PrinterIcon } from "@heroicons/react/24/outline";
import { paymentModes } from "../../constant/appEnum";
import { useNavigate } from "react-router-dom";
import { topic } from "../../constant/appTopics";
import POSInvoiceSplitBill from "./POSInvoiceSplitBill";
import ThermalPrinterEncoder from "thermal-printer-encoder";
import { format } from "date-fns";
import { PRINTER_STATE_NONE } from "../../constant/appCommon";

export default function POSSuccessSplitBill({paymentMode}){
    const navigate = useNavigate();
    const {cookies,print, printerState, lang, currency, notaItemsCheckout, setNotaItemsCheckout, 
        itemsCheckout, setItemsCheckout ,money, setMoney, totalPay, setTotalPay, diskonGlobal, 
        pajakGlobal, setPajakGlobal, setDiskonGlobal, itemsCheckoutBill, setItemsCheckoutBill,
        totalPaySplitBill, setTotalPaySplitBill, moneySplitBill, setMoneySplitBill, bill, setBill, 
        initPrinterBT, setPajakGlobalJSON, setTotalPriceBill, totalPriceBill
    } = useContext(AppContext);
    
    const [moneyView, setMoneyView] = useState(money>0&&notaItemsCheckout.length==0?money:notaItemsCheckout.dibayar);
    const [totalPayView, setTotalPayView] = useState(totalPay>0&&notaItemsCheckout.length==0?totalPay:notaItemsCheckout.total);
    const [itemList, setItemList] = useState(itemsCheckout.length>0&&notaItemsCheckout.length==0?itemsCheckout:notaItemsCheckout.notaitems);
    const [discountView, setDiscountView] = useState(diskonGlobal>=0&&notaItemsCheckout.length==0?diskonGlobal:notaItemsCheckout.diskon);
    const [pajakView, setPajakView] = useState(pajakGlobal>=0&&notaItemsCheckout.length==0?pajakGlobal:notaItemsCheckout.pajak);
    const [itemBillList, setItemBillList] = useState(itemsCheckoutBill.length>0&&notaItemsCheckout.length==0?itemsCheckoutBill:notaItemsCheckout.notaitems);
    const [moneyBillView, setMoneyBillView] = useState(moneySplitBill.length>0&&notaItemsCheckout.length==0?moneySplitBill:notaItemsCheckout.dibayar);
    const [totalPriceBillView, setTotalPriceBillView] = useState(totalPriceBill.length>0&&notaItemsCheckout.length==0?totalPriceBill:notaItemsCheckout.total);
    const [totalPayBillView, setTotalPayBillView] = useState(totalPaySplitBill.length>0&&notaItemsCheckout.length==0?totalPaySplitBill:notaItemsCheckout.total);
    const paymentModeObj = paymentModes.find(p=> p.code===paymentMode);
    const cashback = moneyView-totalPayView;
    const [printerReady, setPrinterReady] = useState(false);
    console.log(diskonGlobal>0)
    const invoiceData = {
        lokasi:cookies?.nama_lokasi || "Kasbon Shop",
        alamatLokasi:cookies?.alamat_lokasi || "",
        footer1:capitalizeWords(cookies?.footer1) || "Terimakasih atas kunjungannya",
        footer2:`*${cookies?.footer2 || ""}`,
        itemCheckout: itemList,
        itemCheckoutBill: itemBillList,
        moneySplitBill: moneyBillView,
        totalPaySplitBill: totalPayBillView,
        cashback: cashback < 0 ? cashback * (-1) : cashback,
        money: moneyView,
        discount:discountView,
        note: "",
        totalPay: totalPayView,
        tax: pajakView,
        isPiutang: cashback < 0,
        isLaundry: cookies.lok_type=="laundry"
    }

    const printBill = useCallback(async () => {
        const printerProcess=()=>{
            const encoder = new ThermalPrinterEncoder({ 
                language: 'esc-pos'
            });
            let result = encoder.initialize();
            invoiceData.itemCheckoutBill.map((i, index) => {
                let cashbackBill=parseFloat(invoiceData.moneySplitBill[index])-parseFloat(invoiceData.totalPaySplitBill[index]);
                let checkCashback=cashbackBill < 0 ? cashbackBill * (-1) : cashbackBill;
                result = result.rule({ style: 'double' })
                .align("center")
                .bold(true)
                .line(invoiceData.lokasi)
                .bold(false)
                .line(invoiceData.alamatLokasi)
                .line("==============================")
                .align("left")
                i.forEach(itm=>{
                    result = result.line(`${itm.itm_nama} (per ${itm.satuan0})`)
                    .table([
                            { width: 5, align: 'left' },
                            { width: 10, align: 'left' },
                            { width: 15, align: 'right' }
                        ], 
                        [
                            [ `${itm.qty} x`, formatThousandSeparator(itm.satuan0hrg), (!itm.diskon || parseInt(itm.diskon)<=0 ?formatThousandSeparator(itm.qty * itm.satuan0hrg):formatThousandSeparator(itm.qty * (itm.satuan0hrg * (1 - parseInt(itm.diskon) / 100))))]
                        ]
                    )
                    if(parseInt(itm.diskon)>0){
                        result = result.align('right')
                        .line(` (Disc/Item ${Number(itm.diskon)}% : ${formatThousandSeparator((itm.satuan0hrg * (1 - parseInt(itm.diskon) / 100)))}) `);
                    }
                })
                result = result.line("------------------------------")
                .bold(true)
                .table([
                        { width: 5, align: 'left' },
                        { width: 25, align: 'right' }
                    ], 
                    [
                        [ "Subtotal", formatThousandSeparator(itm.total)]
                    ]
                ).bold(false);
                if(invoiceData.discount){
                    result = result.newline().table([
                            { width: 5, align: 'left' },
                            { width: 25, align: 'right' }
                        ], 
                        [
                            [ `Disc Total${parseFloat(invoiceData.discount)} %`, `$${formatThousandSeparator((itm.total * (1 - parseInt(itm.diskon) / 100)))} %`]
                        ]
                    );
                }
                result = result.line("------------------------------")
                .bold(true)
                .table([
                        { width: 5, align: 'left' },
                        { width: 25, align: 'right' }
                    ], 
                    [
                        [ "Total", formatThousandSeparator(parseFloat(invoiceData.totalPaySplitBill[index]))]
                    ]
                ).bold(false);
                if(invoiceData.discount){
                    result = result.newline().table([
                            { width: 5, align: 'left' },
                            { width: 25, align: 'right' }
                        ], 
                        [
                            [ "Diskon", `${formatThousandSeparator(invoiceData.discount)} %`]
                        ]
                    );
                }
                if(invoiceData.tax){
                    result = result.newline().table([
                            { width: 5, align: 'left' },
                            { width: 25, align: 'right' }
                        ], 
                        [
                            [ "Pajak", `${formatThousandSeparator(invoiceData.tax)} %`]
                        ]
                    );
                }
                result = result.newline().table([
                        { width: 5, align: 'left' },
                        { width: 25, align: 'right' }
                    ], 
                    [
                        [ "Bayar", formatThousandSeparator(parseFloat(invoiceData.moneySplitBill[index]))]
                    ]
                );
                result = result.newline().table([
                        { width: 10, align: 'left' },
                        { width: 20, align: 'right' }
                    ], 
                    [
                        [ checkCashback<0 ? "Kurang":"Kembali", 
                            invoiceData.cashback?formatThousandSeparator(checkCashback):0]
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
            });
            result = result.encode();
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
        
    },[invoiceData]);

    useEffect(()=>{
        document.title = `KB${cookies.lok_id}_${format(new Date(), "dd-MMM-yyyy-hh-mm-ss")}`;
        setItemsCheckout([]);
        setNotaItemsCheckout([]);
        setMoney(0);
        setTotalPay(0);
        setPajakGlobal(0);
		setDiskonGlobal(0);
        setItemsCheckoutBill([]),
        setTotalPaySplitBill([]), 
        setMoneySplitBill([]), 
        setBill([]), 
        setPajakGlobalJSON([])
        if(cookies.always_print&&printerState > PRINTER_STATE_NONE){
            printBill();
        }
    },[]);
    const InvoiceArea =() => {
            return (
                <div>
                    {invoiceData.itemCheckoutBill.map((i, index) => {
                        return(
                            <POSInvoiceSplitBill
                            data={i}
                            atribut={invoiceData}
                            total={totalPayBillView[index]}
                            subtotal={totalPriceBillView[index]}
                            money={moneyBillView[index]}
                            /> 
                        )
                    })
                    }
                </div>
            )
	};
    return(
        <div className="bg-gray-50 overflow-hidden relative p-6">
            <div className="no-print">
                <Typography className="text-center my-3"variant="h4">
                    {paymentModeObj ? paymentModeObj.desc : ""}
                </Typography>
                <Typography className="text-center my-3">
                    {dictionary.cashier.calculator.pay[lang]} {currency} {formatThousandSeparator(totalPayView)}
                </Typography>
                <Typography className="text-center my-3">
                    {dictionary.cashier.calculator.moneyBack[lang]} <br/>{currency} {!cashback? 0:formatThousandSeparator(cashback)}
                </Typography>
                <div className="mx-auto w-fit mb-3">
                    <CheckBadgeIcon className="w-14 h-14 text-teal-600"/>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <Button
                        size="lg"
                        variant="outlined"
                        color="teal"
                        className="group w-full relative flex items-center gap-3 overflow-hidden pr-[72px] mb-4"
                        onClick={()=>window.print()}
                    >
                        <span className="flex-grow text-left">
                            {dictionary.cashier.calculator.pdf[lang]}
                        </span>
                        <span className="absolute right-0 grid h-full w-12 place-items-center">
                            <DocumentIcon className="w-5 h-5"/>
                        </span>
                    </Button>
                    <Button
                        size="lg"
                        variant="outlined"
                        color="teal"
                        className="group w-full relative flex items-center gap-3 overflow-hidden pr-[72px] mb-4"
                        onClick={printBill}
                    >
                        <span className="flex-grow text-left">
                            {dictionary.cashier.calculator.print[lang]}
                        </span>
                        <span className="absolute right-0 grid h-full w-12 place-items-center">
                            <PrinterIcon className="w-5 h-5"/>
                        </span>
                    </Button>
                </div>
                <Button
                    size="lg"
                    variant="outlined"
                    color="teal"
                    className="group w-full relative flex items-center gap-3 overflow-hidden pr-[72px]"
                    onClick={()=>navigate(topic.cashier.route)}
                >
                    <span className="flex-grow text-left">
                        {dictionary.cashier.calculator.newTrans[lang]}
                    </span>
                    <span className="absolute right-0 grid h-full w-12 place-items-center">
                        <CalculatorIcon className="w-5 h-5"/>
                    </span>
                </Button>
            </div>
            <InvoiceArea />
        </div>
    )
}