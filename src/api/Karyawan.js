// import { GetSupplierReqBody } from "../model/supplier";
import { httpPost, API_HOST } from "./Global";

export const RESPONSE_OK = 200;
export const RESPONSE_NOK = 500;
export const IS_DEMO = true;

export const getKaryawan = (body) => {
    return httpPost(`${API_HOST}/karyawan`, body);
};

export const saveKaryawan = (body) => {
    return httpPost(`${API_HOST}/karyawan/save`, body);
};

export const deleteKaryawan = (body) => {
    return httpPost(`${API_HOST}/karyawan/delete`, body);
};

export const getCountKaryawan = (body) => {
    return httpPost(`${API_HOST}/karyawan/read_count`, body);
};
