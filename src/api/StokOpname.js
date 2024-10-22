import { GetStokOpnameReqBody } from "../model/stokopname";
import { httpPost, API_HOST } from "./Global";

export const RESPONSE_OK = 200;
export const RESPONSE_NOK = 500;
export const IS_DEMO = true;

export const getStokOpname = (body=GetStokOpnameReqBody()) => {
    return httpPost(`${API_HOST}/stokopname/read`, body);
};

export const saveStokOpname = (body=GetStokOpnameReqBody()) => {
    return httpPost(`${API_HOST}/stokopname/save`, body);
};

export const deleteStokOpname = (body=GetStokOpnameReqBody()) => {
    return httpPost(`${API_HOST}/stokopname/delete`, body);
};

