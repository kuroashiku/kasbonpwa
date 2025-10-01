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

export const readCompany = (body=GetItemsReqBody()) => {
    return httpPost(`${API_HOST}/userman/read_company`, body);
};

export const readLokasi = (body=GetItemsReqBody()) => {
    return httpPost(`${API_HOST}/userman/read_lokasi`, body);
};

export const saveCompany = (body=GetItemsReqBody()) => {
    return httpPost(`${API_HOST}/userman/save_company`, body);
};

export const saveLokasi = (body=GetItemsReqBody()) => {
    return httpPost(`${API_HOST}/userman/save_lokasi`, body);
};

export const saveKasir = (body=GetItemsReqBody()) => {
    return httpPost(`${API_HOST}/userman/save_kasir`, body);
};

export const setOtp = (body=GetItemsReqBody()) => {
    return httpPost(`${API_HOST}/userman/sign_in`, body);
};

export const verify = (body=GetItemsReqBody()) => {
    return httpPost(`${API_HOST}/userman/verify`, body);
};
