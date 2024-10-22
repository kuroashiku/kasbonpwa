import { j as jsxRuntimeExports, r as reactExports, a as react } from "./index-CGEICd-f.js";
import { a as formatBackToNumber } from "./formatter-DQiSfF1K.js";
function InputNumber(props = { value: "", label: "", name: "", onChange: () => {
}, currency: "", error: "", disabled: false, icon: "" }) {
  const handleChange = (e) => {
    e.target.value = formatBackToNumber(e.target.value);
    props.onChange(e);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(reactExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      react.Input,
      {
        color: props.error ? "red" : "teal",
        value: props.value || "",
        label: props.label,
        name: props.name,
        onChange: handleChange,
        disabled: props.disabled,
        icon: props.icon
      }
    ),
    !props.error ? null : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-red-600 text-right", children: props.error })
  ] });
}
export {
  InputNumber as I
};
