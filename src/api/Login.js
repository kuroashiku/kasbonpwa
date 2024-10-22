import { GetItemsReqBody, ItemListModel } from "../model/item";
import { httpPost, API_HOST } from "./Global";

export const RESPONSE_OK = 200;
export const RESPONSE_NOK = 500;
export const IS_DEMO = true;

export const login = (body=GetItemsReqBody()) => {
    return httpPost(`${API_HOST}/kasir/read`, body);
};

export const getRole = (body=GetItemsReqBody()) => {
    return httpPost(`${API_HOST}/userman/read_role`, body);
};

export const config = (body=GetItemsReqBody()) => {
    return httpPost(`${API_HOST}/config/read`, body);
};

export const getLokcom = (body=GetItemsReqBody()) => {
    return httpPost(`${API_HOST}/userman/read_lokcom`, body);
};

export const deleteRole = (body=GetItemsReqBody()) => {
    return httpPost(`${API_HOST}/userman/delete_role`, body);
};

export const saveRole = (body=GetItemsReqBody()) => {
    return httpPost(`${API_HOST}/userman/saverolenew`, body);
};

export const readRoleNew = (body=GetItemsReqBody()) => {
    return httpPost(`${API_HOST}/userman/read_role_new`, body);
};

export const addUser = (body=GetItemsReqBody()) => {
    return httpPost(`${API_HOST}/userman/adduser`, body);
};

export const saveUser = (body=GetItemsReqBody()) => {
    return httpPost(`${API_HOST}/userman/saveuser`, body);
};

export const savePassword = (body=GetItemsReqBody()) => {
    return httpPost(`${API_HOST}/userman/resetpassword`, body);
};

export const updateLokasi = (body=GetItemsReqBody()) => {
    return httpPost(`${API_HOST}/userman/update_lokasi`, body);
};

