import { GetTransactionReqBody } from "../model/transaction";
import { httpPost, API_HOST } from "./Global";

export const RESPONSE_OK = 200;
export const RESPONSE_NOK = 500;
export const IS_DEMO = true;

export const getTransaction = (body = GetTransactionReqBody()) => {
    return httpPost(`${API_HOST}/nota/read`, body);
};

export const deleteTransaction = (body = GetTransactionReqBody()) => {
    return httpPost(`${API_HOST}/nota/delete_new`, body);
};

export const getStatistic = (body = GetTransactionReqBody()) => {
    return httpPost(`${API_HOST}/tambahan/grafikbayarnota`, body);
};

export const getCredit = (body = GetTransactionReqBody()) => {
    return httpPost(`${API_HOST}/piutang/read`, body);
};

export const saveCredit = (body = GetTransactionReqBody()) => {
    return httpPost(`${API_HOST}/piutang/save`, body);
};