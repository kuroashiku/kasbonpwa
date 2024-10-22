import { r as reactExports, j as jsxRuntimeExports, a as react } from "./index-CGEICd-f.js";
function MagnifyingGlassIcon({
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
    d: "m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
  }));
}
const ForwardRef = reactExports.forwardRef(MagnifyingGlassIcon);
const MagnifyingGlassIcon$1 = ForwardRef;
function SearchNavbar({
  label,
  onSearch,
  value,
  onKeyDown,
  scanflag = 0
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex w-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      react.Input,
      {
        color: "teal",
        label,
        className: "pr-20",
        value,
        onChange: (e) => onSearch(e.target.value),
        onKeyDown: (e) => scanflag == 0 ? null : onKeyDown(e),
        containerProps: {
          className: "min-w-0"
        }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(react.IconButton, { className: "!absolute right-1 top-1 !rounded shadow-none", size: "sm", type: "button", color: "white", onClick: () => onSearch(value), children: /* @__PURE__ */ jsxRuntimeExports.jsx(MagnifyingGlassIcon$1, { className: "h-6 w-6" }) })
  ] });
}
export {
  SearchNavbar as S
};
