import { GetItemsReqBody, ItemListModel } from "../model/item";
import { httpPost, API_HOST } from "./Global";

export const RESPONSE_OK = 200;
export const RESPONSE_NOK = 500;
export const IS_DEMO = true;

export const getItems = (body=GetItemsReqBody()) => {
    return httpPost(`${API_HOST}/item/read`, body);
};

export const getProjects = (body) => {
    return httpPost(`${API_HOST}/projects`, body);
};


export const getItemsnew = (body=GetItemsReqBody()) => {
    return httpPost(`${API_HOST}/item/readnew`, body);
};
export const getItemsBom = (body=GetItemsReqBody()) => {
    return httpPost(`${API_HOST}/item/readforbom`, body);
};
export const saveItem = (body=ItemListModel()) => {
    return httpPost(`${API_HOST}/item/save`, body);
};
export const importItem = (body=ItemListModel()) => {
    return httpPost(`${API_HOST}/item/import`, body);
};
export const deleteItem = (body=GetItemsReqBody()) => {
    return httpPost(`${API_HOST}/item/update_delete`, body);
};
export const imageAuth = (body=GetItemsReqBody()) => {
    return httpPost(`${API_HOST}/images/auth`, body);
};
export const categoriesItem = (body=GetItemsReqBody()) => {
    return httpPost(`${API_HOST}/item/readcategories`, body);
};
export const getBoms = (body=GetItemsReqBody()) => {
    return httpPost(`${API_HOST}/bom/read`, body);
};
export const addBom = (body=GetItemsReqBody()) => {
    return httpPost(`${API_HOST}/bom/add`, body);
};
export const saveBom = (body=ItemListModel()) => {
    return httpPost(`${API_HOST}/bom/savenew`, body);
};
export const deleteBom = (body=GetItemsReqBody()) => {
    return httpPost(`${API_HOST}/bom/delete`, body);
};
export const checkCode = (body=GetItemsReqBody()) => {
    return httpPost(`${API_HOST}/item/check_code`, body);
};
export const saveRak = (body=ItemListModel()) => {
    return httpPost(`${API_HOST}/rak/save`, body);
};
export const deleteRak = (body=GetItemsReqBody()) => {
    return httpPost(`${API_HOST}/rak/delete`, body);
};
export const getRak = (body=GetItemsReqBody()) => {
    return httpPost(`${API_HOST}/rak/read`, body);
};

