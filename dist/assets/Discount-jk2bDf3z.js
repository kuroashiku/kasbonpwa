import { y as httpPost, z as API_HOST } from "./index-CGEICd-f.js";
const GetDiscountReqBody = () => ({
  lok_id: 0
});
const DiscountListModel = () => ({
  dis_value: "",
  dis_nominal: "",
  dis_lok_id: 0,
  dis_id: 0,
  dis_nama: "",
  dis_status: ""
});
const getDiscount = (body = GetDiscountReqBody()) => {
  return httpPost(`${API_HOST}/diskon/read`, body);
};
const saveDiscount = (body = GetDiscountReqBody()) => {
  return httpPost(`${API_HOST}/diskon/save`, body);
};
const deleteDiscount = (body = GetDiscountReqBody()) => {
  return httpPost(`${API_HOST}/diskon/delete`, body);
};
export {
  DiscountListModel as D,
  deleteDiscount as d,
  getDiscount as g,
  saveDiscount as s
};
