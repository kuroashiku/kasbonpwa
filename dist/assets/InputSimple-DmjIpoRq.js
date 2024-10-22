import { j as jsxRuntimeExports, r as reactExports, a as react } from "./index-CGEICd-f.js";
function InputSimple({
  value,
  label,
  name,
  onChange,
  error,
  disabled,
  autoFocus = false,
  maxlength = 100
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(reactExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      react.Input,
      {
        color: error ? "red" : "teal",
        value,
        label,
        name,
        onChange,
        disabled,
        autoFocus,
        maxLength: maxlength
      }
    ),
    !error ? null : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-red-600 text-right", children: error })
  ] });
}
export {
  InputSimple as I
};
