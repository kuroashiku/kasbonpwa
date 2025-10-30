// import { GetShareholderReqBody } from "../model/Shareholder";
import { httpPost, API_HOST } from "./Global";

export const RESPONSE_OK = 200;
export const RESPONSE_NOK = 500;
export const IS_DEMO = true;

export const getShareholder = (body) => {
    return httpPost(`${API_HOST}/shareholder`, body);
};

export const saveShareholder = (body) => {
    return httpPost(`${API_HOST}/shareholder/save`, body);
};

export const deleteShareholder = (body) => {
    return httpPost(`${API_HOST}/shareholder/delete`, body);
};

export const getCountShareholder = (body) => {
    return httpPost(`${API_HOST}/shareholder/read_count`, body);
};
