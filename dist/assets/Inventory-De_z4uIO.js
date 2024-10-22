import { r as reactExports, y as httpPost, z as API_HOST } from "./index-CGEICd-f.js";
function PlusIcon({
  title,
  titleId,
  ...props
}, svgRef) {
  return /* @__PURE__ */ reactExports.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 16 16",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: svgRef,
    "aria-labelledby": titleId
  }, props), title ? /* @__PURE__ */ reactExports.createElement("title", {
    id: titleId
  }, title) : null, /* @__PURE__ */ reactExports.createElement("path", {
    d: "M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z"
  }));
}
const ForwardRef = reactExports.forwardRef(PlusIcon);
const PlusIcon$1 = ForwardRef;
const GetInventoryReqBody = () => ({
  com_id: 0,
  lok_id: 0
});
const POListModel = () => ({
  po_sup_id: "",
  po_total: 0,
  po_kas_id: 0,
  po_lok_id: 0,
  po_catatan: "",
  po_status: "",
  po_id: 0,
  po_tgapprove: ""
});
const RcvListModel = () => ({
  rcv_po_id: "",
  rcv_total: 0,
  rcv_diskon: 0,
  rcv_kas_id: 0,
  rcv_lok_id: "",
  rcv_catatan: "",
  rcv_status: 0,
  rcv_id: 0
});
const getPo = (body = GetInventoryReqBody()) => {
  return httpPost(`${API_HOST}/po/read`, body);
};
const savePo = (body = GetInventoryReqBody()) => {
  return httpPost(`${API_HOST}/po/save`, body);
};
const approvePo = (body = GetInventoryReqBody()) => {
  return httpPost(`${API_HOST}/po/approve`, body);
};
const deletePo = (body = GetInventoryReqBody()) => {
  return httpPost(`${API_HOST}/po/delete`, body);
};
const getRcv = (body = GetInventoryReqBody()) => {
  return httpPost(`${API_HOST}/receive/read`, body);
};
const saveRcv = (body = GetInventoryReqBody()) => {
  return httpPost(`${API_HOST}/receive/save`, body);
};
const payRcv = (body = GetInventoryReqBody()) => {
  return httpPost(`${API_HOST}/receive/pay`, body);
};
export {
  POListModel as P,
  RcvListModel as R,
  PlusIcon$1 as a,
  approvePo as b,
  saveRcv as c,
  deletePo as d,
  getRcv as e,
  getPo as g,
  payRcv as p,
  savePo as s
};
