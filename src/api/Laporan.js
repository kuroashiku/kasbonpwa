import { GetStokOpnameReqBody } from "../model/stokopname";
import { httpPost, API_HOST } from "./Global";

export const RESPONSE_OK = 200;
export const RESPONSE_NOK = 500;
export const IS_DEMO = true;

export const getBestselling = (body=GetStokOpnameReqBody()) => {
    return httpPost(`${API_HOST}/tambahan/bestselling`, body);
};

export const getGrossProfit = (body=GetStokOpnameReqBody()) => {
    return httpPost(`${API_HOST}/tambahan/grossprofit`, body);
};

export const getNetProfit = (body=GetStokOpnameReqBody()) => {
    return httpPost(`${API_HOST}/tambahan/netprofit`, body);
};

export const getOmzet = (body=GetStokOpnameReqBody()) => {
    return httpPost(`${API_HOST}/tambahan/omzet`, body);
};

export const getOmzetHarian = (body=GetStokOpnameReqBody()) => {
    return httpPost(`${API_HOST}/tambahan/omzetharian`, body);
};
