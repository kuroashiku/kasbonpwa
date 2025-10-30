import { GetItemsReqBody, ItemListModel } from "../model/item";
import { httpPost, API_HOST } from "./Global";

export const RESPONSE_OK = 200;
export const RESPONSE_NOK = 500;
export const IS_DEMO = true;

export const getItems = (body=GetItemsReqBody()) => {
    return httpPost(`${API_HOST}/item/read`, body);
};
export const saveProjects = (body) => {
    return httpPost(`${API_HOST}/projects/save`, body);
};

export const deleteProjects = (body) => {
    return httpPost(`${API_HOST}/projects/delete`, body);
};


export const getProjects = (body) => {
    return httpPost(`${API_HOST}/projects`, body);
};


export const deleteItem = (body=GetItemsReqBody()) => {
    return httpPost(`${API_HOST}/item/update_delete`, body);
};


