import { ItemCheckoutModel } from "./item";

export const InvoicePOS =()=> ({
    lokasi:"Kasbon Shop",
    alamatLokasi:"",
    footer1:"Terimakasih atas kunjungannya",
    footer2:"",
    itemCheckout: [ItemCheckoutModel()],
    money: 0,
    totalPay: 0,
    subtotalPay: 0,
    cashback: 0,
    discount: 0,
    tax:0,
    note:"",
    isPiutang:false
});