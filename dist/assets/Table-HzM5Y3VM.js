import { y as httpPost, z as API_HOST } from "./index-CGEICd-f.js";
const GetTableReqBody = () => ({
  lok_id: 0
});
const TableListModel = () => ({
  mej_kapasitas: "",
  mej_lok_id: 0,
  mej_id: 0,
  mej_nama: "",
  mej_status: ""
});
const getTable = (body = GetTableReqBody()) => {
  return httpPost(`${API_HOST}/meja/read`, body);
};
const saveTable = (body = GetTableReqBody()) => {
  return httpPost(`${API_HOST}/meja/save`, body);
};
const deleteTable = (body = GetTableReqBody()) => {
  return httpPost(`${API_HOST}/meja/delete`, body);
};
export {
  TableListModel as T,
  deleteTable as d,
  getTable as g,
  saveTable as s
};
