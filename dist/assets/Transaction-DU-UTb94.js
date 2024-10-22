import { y as httpPost, z as API_HOST } from "./index-CGEICd-f.js";
const GetTransactionReqBody = () => ({
  lok_id: 0
});
const TransactionListModel = () => ({
  id: "",
  nomor: "",
  tanggal: "",
  total: 0,
  dibayar: "",
  kembalian: "",
  kas_id: 0,
  kas_nama: "",
  cus_nama: "",
  sft_id: "",
  diskon: 0,
  disnom: "",
  catatan: "",
  not_dicicil: 0,
  jatuhtempo: "",
  carabayar: 0,
  not_status: "",
  piutlunas: ""
});
const CreditListModel = () => ({
  cil_id: "",
  cil_not_id: "",
  cil_tanggal: "",
  cil_kekurangan: 0,
  cil_bunga: 0,
  cil_tagihan: 0,
  cil_cicilan: 0,
  cil_sisa: 0,
  cil_carabayar: "",
  id: "",
  nomor: "",
  tanggal: "",
  total: 0,
  jatuhtempo: "",
  dp: 0,
  kurang: 0,
  cil_status: "Belum Lunas"
});
const getTransaction = (body = GetTransactionReqBody()) => {
  return httpPost(`${API_HOST}/nota/read`, body);
};
const deleteTransaction = (body = GetTransactionReqBody()) => {
  return httpPost(`${API_HOST}/nota/delete_new`, body);
};
const getStatistic = (body = GetTransactionReqBody()) => {
  return httpPost(`${API_HOST}/tambahan/grafikbayarnota`, body);
};
const getCredit = (body = GetTransactionReqBody()) => {
  return httpPost(`${API_HOST}/piutang/read`, body);
};
const saveCredit = (body = GetTransactionReqBody()) => {
  return httpPost(`${API_HOST}/piutang/save`, body);
};
export {
  CreditListModel as C,
  TransactionListModel as T,
  getCredit as a,
  getStatistic as b,
  deleteTransaction as d,
  getTransaction as g,
  saveCredit as s
};
