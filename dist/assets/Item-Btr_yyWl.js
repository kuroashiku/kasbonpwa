import { y as httpPost, J as GetItemsReqBody, g as ItemListModel, z as API_HOST } from "./index-CGEICd-f.js";
const getItems = (body = GetItemsReqBody()) => {
  return httpPost(`${API_HOST}/item/read`, body);
};
const saveItem = (body = ItemListModel()) => {
  return httpPost(`${API_HOST}/item/save`, body);
};
const deleteItem = (body = GetItemsReqBody()) => {
  return httpPost(`${API_HOST}/item/update_delete`, body);
};
const categoriesItem = (body = GetItemsReqBody()) => {
  return httpPost(`${API_HOST}/item/readcategories`, body);
};
const getBoms = (body = GetItemsReqBody()) => {
  return httpPost(`${API_HOST}/bom/read`, body);
};
const saveBom = (body = ItemListModel()) => {
  return httpPost(`${API_HOST}/bom/savenew`, body);
};
const deleteBom = (body = GetItemsReqBody()) => {
  return httpPost(`${API_HOST}/bom/delete`, body);
};
export {
  saveBom as a,
  deleteBom as b,
  categoriesItem as c,
  deleteItem as d,
  getBoms as e,
  getItems as g,
  saveItem as s
};
