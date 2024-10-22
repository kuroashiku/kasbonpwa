import { y as httpPost, J as GetItemsReqBody, z as API_HOST } from "./index-CGEICd-f.js";
const login = (body = GetItemsReqBody()) => {
  return httpPost(`${API_HOST}/kasir/read`, body);
};
const config = (body = GetItemsReqBody()) => {
  return httpPost(`${API_HOST}/config/read`, body);
};
const getLokcom = (body = GetItemsReqBody()) => {
  return httpPost(`${API_HOST}/userman/read_lokcom`, body);
};
const deleteRole = (body = GetItemsReqBody()) => {
  return httpPost(`${API_HOST}/userman/delete_role`, body);
};
const saveRole = (body = GetItemsReqBody()) => {
  return httpPost(`${API_HOST}/userman/saverolenew`, body);
};
const readRoleNew = (body = GetItemsReqBody()) => {
  return httpPost(`${API_HOST}/userman/read_role_new`, body);
};
const addUser = (body = GetItemsReqBody()) => {
  return httpPost(`${API_HOST}/userman/adduser`, body);
};
const saveUser = (body = GetItemsReqBody()) => {
  return httpPost(`${API_HOST}/userman/saveuser`, body);
};
const savePassword = (body = GetItemsReqBody()) => {
  return httpPost(`${API_HOST}/userman/resetpassword`, body);
};
const updateLokasi = (body = GetItemsReqBody()) => {
  return httpPost(`${API_HOST}/userman/update_lokasi`, body);
};
export {
  savePassword as a,
  saveUser as b,
  config as c,
  deleteRole as d,
  addUser as e,
  getLokcom as g,
  login as l,
  readRoleNew as r,
  saveRole as s,
  updateLokasi as u
};
