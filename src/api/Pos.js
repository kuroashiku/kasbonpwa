import { GetItemsReqBody, ItemListModel } from "../model/item";
import { httpPost, API_HOST } from "./Global";

export const RESPONSE_OK = 200;
export const RESPONSE_NOK = 500;
export const IS_DEMO = true;

export const bayarPos = (body=GetItemsReqBody()) => {
    return httpPost(`${API_HOST}/nota/save`, body);
};

export const draftPos = (body=GetItemsReqBody()) => {
    return httpPost(`${API_HOST}/draftnota/save`, body);
};

export const readDraftPos = (body=GetItemsReqBody()) => {
    return httpPost(`${API_HOST}/draftnota/read`, body);
};

export const deleteDraftPos = (body=GetItemsReqBody()) => {
    return httpPost(`${API_HOST}/draftnota/delete`, body);
};

