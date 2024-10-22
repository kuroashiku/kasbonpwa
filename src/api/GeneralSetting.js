import { GetGeneralSettingReqBody } from "../model/generalsetting";
import { httpPost, API_HOST } from "./Global";

export const RESPONSE_OK = 200;
export const RESPONSE_NOK = 500;
export const IS_DEMO = true;

export const getGeneralSetting = (body=GetGeneralSettingReqBody()) => {
    return httpPost(`${API_HOST}/generalsetting/read`, body);
};

export const saveGeneralSetting = (body=GetGeneralSettingReqBody()) => {
    return httpPost(`${API_HOST}/generalsetting/save`, body);
};

export const addGeneralSetting = (body=GetGeneralSettingReqBody()) => {
    return httpPost(`${API_HOST}/generalsetting/add`, body);
};
