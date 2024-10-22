import { y as httpPost, J as GetItemsReqBody, z as API_HOST } from "./index-CGEICd-f.js";
const bayarPos = (body = GetItemsReqBody()) => {
  return httpPost(`${API_HOST}/nota/save`, body);
};
const draftPos = (body = GetItemsReqBody()) => {
  return httpPost(`${API_HOST}/draftnota/save`, body);
};
const readDraftPos = (body = GetItemsReqBody()) => {
  return httpPost(`${API_HOST}/draftnota/read`, body);
};
const deleteDraftPos = (body = GetItemsReqBody()) => {
  return httpPost(`${API_HOST}/draftnota/delete`, body);
};
export {
  draftPos as a,
  bayarPos as b,
  deleteDraftPos as d,
  readDraftPos as r
};
