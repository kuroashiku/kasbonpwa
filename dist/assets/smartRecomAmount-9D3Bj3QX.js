import { r as reactExports } from "./index-CGEICd-f.js";
function BackspaceIcon({
  title,
  titleId,
  ...props
}, svgRef) {
  return /* @__PURE__ */ reactExports.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: svgRef,
    "aria-labelledby": titleId
  }, props), title ? /* @__PURE__ */ reactExports.createElement("title", {
    id: titleId
  }, title) : null, /* @__PURE__ */ reactExports.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M12 9.75 14.25 12m0 0 2.25 2.25M14.25 12l2.25-2.25M14.25 12 12 14.25m-2.58 4.92-6.374-6.375a1.125 1.125 0 0 1 0-1.59L9.42 4.83c.21-.211.497-.33.795-.33H19.5a2.25 2.25 0 0 1 2.25 2.25v10.5a2.25 2.25 0 0 1-2.25 2.25h-9.284c-.298 0-.585-.119-.795-.33Z"
  }));
}
const ForwardRef$1 = reactExports.forwardRef(BackspaceIcon);
const BackspaceIcon$1 = ForwardRef$1;
function CheckBadgeIcon({
  title,
  titleId,
  ...props
}, svgRef) {
  return /* @__PURE__ */ reactExports.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: svgRef,
    "aria-labelledby": titleId
  }, props), title ? /* @__PURE__ */ reactExports.createElement("title", {
    id: titleId
  }, title) : null, /* @__PURE__ */ reactExports.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
  }));
}
const ForwardRef = reactExports.forwardRef(CheckBadgeIcon);
const CheckBadgeIcon$1 = ForwardRef;
const moneyList = [
  { value: 5e3, neighbor: [1e4, 2e4] },
  { value: 1e4, neighbor: [2e4, 5e4] },
  { value: 15e3, neighbor: [2e4, 5e4] },
  { value: 2e4, neighbor: [5e4, 1e5] },
  { value: 25e3, neighbor: [5e4, 1e5] },
  { value: 3e4, neighbor: [5e4, 1e5] },
  { value: 35e3, neighbor: [5e4, 1e5] },
  { value: 4e4, neighbor: [5e4, 1e5] },
  { value: 45e3, neighbor: [5e4, 1e5] },
  { value: 5e4, neighbor: [1e5] },
  { value: 1e5, neighbor: [] }
  // {value: 120000, neighbor: [150000, 200000]},
  // {value: 150000, neighbor: [200000]},
  // {value: 170000, neighbor: [200000]},
  // {value: 200000, neighbor: []},
];
const getAmountRecommendations = (totalPrice = 0) => {
  const maxMoney = moneyList[moneyList.length - 1].value;
  let remaining = 0;
  let priceAnalize = totalPrice;
  let maxMoneyCount = 0;
  if (totalPrice > maxMoney) {
    remaining = totalPrice % maxMoney;
    maxMoneyCount = Math.floor(totalPrice / maxMoney);
    priceAnalize = remaining;
  }
  for (let i = 0; i < moneyList.length; i++) {
    if (moneyList[i].value > priceAnalize) {
      const maxMoneyValue = maxMoneyCount * maxMoney;
      const recomList = [moneyList[i].value, ...moneyList[i].neighbor];
      return recomList.map((r) => r + maxMoneyValue);
    }
  }
  return [];
};
export {
  BackspaceIcon$1 as B,
  CheckBadgeIcon$1 as C,
  getAmountRecommendations as g
};
