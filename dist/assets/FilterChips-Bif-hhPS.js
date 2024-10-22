import { j as jsxRuntimeExports, a as react } from "./index-CGEICd-f.js";
import { l as lodashExports } from "./lodash-C34_XwDM.js";
import { f as format, a as FilterModel } from "./filter-DY4hzksJ.js";
function FilterChips({
  filters = FilterModel(),
  onSetFilters = (filter) => {
  }
}) {
  const onRemove = (index) => {
    const newFilters = lodashExports.cloneDeep(filters);
    newFilters.splice(index, 1);
    onSetFilters(newFilters);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center flex-wrap gap-2", children: filters.map((f, index) => {
    if (!f.key) {
      return /* @__PURE__ */ jsxRuntimeExports.jsx("div", {});
    }
    let chipText = "";
    if (f.key === "date") {
      if (f.value) {
        chipText = `${f.key}: ${format(f.value, "dd MMM yyyy")}`;
      } else if (f.valueMin && f.valueMax) {
        chipText = `${f.key}: ${format(f.valueMin, "dd MMM yyyy")} - ${format(f.valueMax, "dd MMM yyyy")}`;
      } else if (f.valueMin && !f.valueMax) {
        chipText = `${f.key}: ${format(f.valueMin, "dd MMM yyyy")}`;
      }
    } else if (f.key === "search") {
      if (f.value) {
        chipText = `Ditemukan ${f.value} item`;
      } else {
        chipText = `Tidak ditemukan item`;
      }
    } else {
      if (f.value) {
        chipText = `${f.key}: ${f.value}`;
      } else if (f.valueMax || f.valueMin) {
        chipText = `${f.key}: ${f.valueMin} - ${f.valueMax}`;
      } else {
        chipText = f.key;
      }
    }
    if (f.key === "search") {
      return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        react.Chip,
        {
          className: "bg-gray-100",
          open: true,
          animate: {
            mount: { y: 0 },
            unmount: { y: -50 }
          },
          value: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: !f.value ? "red" : "teal", className: "capitalize", children: chipText })
        }
      ) }, `fchips-${index}`);
    } else {
      return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        react.Chip,
        {
          color: "teal",
          open: true,
          animate: {
            mount: { y: 0 },
            unmount: { y: -50 }
          },
          value: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", className: "capitalize", children: chipText }),
          onClose: () => onRemove(index)
        }
      ) }, `fchips-${index}`);
    }
  }) });
}
export {
  FilterChips as F
};
