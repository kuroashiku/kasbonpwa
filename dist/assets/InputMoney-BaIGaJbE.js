import { j as jsxRuntimeExports, r as reactExports, a as react } from "./index-CGEICd-f.js";
import { f as formatThousandSeparator, a as formatBackToNumber } from "./formatter-DQiSfF1K.js";
function InputMoney(props = { value: "", label: "", variant: "static", align: "text-right", name: "", onChange: () => {
}, currency: "", error: "", disabled: false, icon: "", max: 0 }) {
  const handleChange = (e) => {
    if (props.max == 0)
      e.target.value = formatBackToNumber(e.target.value);
    else
      e.target.value = e.target.value > props.max ? props.max : formatBackToNumber(e.target.value);
    props.onChange(e);
  };
  const value = formatThousandSeparator(parseFloat(props.value));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(reactExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        react.Input,
        {
          color: props.error ? "red" : "teal",
          variant: props.variant,
          value: value ? value : 0,
          label: props.label,
          name: props.name,
          onChange: handleChange,
          className: props.align,
          disabled: props.disabled,
          icon: props.icon
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute bottom-1 left-2", children: props.currency })
    ] }),
    !props.error ? null : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-red-600 text-right", children: props.error })
  ] });
}
export {
  InputMoney as I
};
