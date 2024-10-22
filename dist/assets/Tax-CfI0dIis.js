import { y as httpPost, z as API_HOST } from "./index-CGEICd-f.js";
const GetTaxReqBody = () => ({
  lok_id: 0
});
const TaxListModel = () => ({
  paj_value: "",
  paj_lok_id: 0,
  paj_id: 0,
  paj_nama: "",
  paj_status: ""
});
const getTax = (body = GetTaxReqBody()) => {
  return httpPost(`${API_HOST}/pajak/read`, body);
};
const saveTax = (body = GetTaxReqBody()) => {
  return httpPost(`${API_HOST}/pajak/save`, body);
};
const deleteTax = (body = GetTaxReqBody()) => {
  return httpPost(`${API_HOST}/pajak/delete`, body);
};
export {
  TaxListModel as T,
  deleteTax as d,
  getTax as g,
  saveTax as s
};
