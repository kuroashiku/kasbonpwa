import { IMAGEKIT_URL_ENDPOINT } from "../constant/appCommon";

export const formatImgKitUrl = (filePath) => {
	return `${IMAGEKIT_URL_ENDPOINT}${filePath}`;
}

export const formatImgKitUrlThumb = (filePath) => {
	return `${IMAGEKIT_URL_ENDPOINT}/tr:n-ik_ml_thumbnail${filePath}`;
}