import { GetShiftReqBody } from "../model/shift";
import { httpPost, API_HOST } from "./Global";

export const RESPONSE_OK = 200;
export const RESPONSE_NOK = 500;
export const IS_DEMO = true;

export const getShift = (body=GetShiftReqBody()) => {
    return httpPost(`${API_HOST}/shift/read`, body);
};

export const checkIn = (body=GetShiftReqBody()) => {
    return httpPost(`${API_HOST}/shift/checkin`, body);
};

export const checkOut = (body=GetShiftReqBody()) => {
    return httpPost(`${API_HOST}/shift/checkOut`, body);
};

export const isCheckIn = (body=GetShiftReqBody()) => {
    return httpPost(`${API_HOST}/shift/ischeckedin`, body);
};
