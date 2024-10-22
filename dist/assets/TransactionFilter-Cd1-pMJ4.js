import { r as reactExports, A as AppContext, j as jsxRuntimeExports, a as react } from "./index-CGEICd-f.js";
import { e as formatRangeDate, d as formatDate } from "./formatter-DQiSfF1K.js";
import { D as DayPicker } from "./index.esm-DzNpyuue.js";
import { l as lodashExports } from "./lodash-C34_XwDM.js";
import { F as FilterItemModel } from "./filter-DY4hzksJ.js";
import { A as AdjustmentsVerticalIcon } from "./AdjustmentsVerticalIcon-DBH-WKzU.js";
function TransactionFilter({ open = false, onClose = () => {
}, onApply = () => {
} }) {
  const { filters } = reactExports.useContext(AppContext);
  const [showCalendar, setShowCalendar] = reactExports.useState(false);
  const [isDateRange, setIsDateRange] = reactExports.useState(false);
  const [filtersTemp, setFiltersTemp] = reactExports.useState([]);
  const calendarRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false);
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [calendarRef]);
  reactExports.useEffect(() => {
    setFiltersTemp(filters);
  }, [filters]);
  const onDateRangeChange = reactExports.useCallback(
    (dateRange = { from: 0, to: 0 }) => {
      const _filters = lodashExports.cloneDeep(filtersTemp);
      const dateIndex = _filters.findIndex((f) => f.key === "date");
      if (dateRange.from || dateRange.to) {
        const newFilter = FilterItemModel();
        newFilter.key = "date";
        newFilter.valueMin = dateRange.from;
        newFilter.valueMax = dateRange.to;
        if (dateIndex >= 0) {
          _filters[dateIndex] = newFilter;
        } else {
          _filters.push(newFilter);
        }
      } else {
        if (dateIndex >= 0) {
          _filters.splice(dateIndex, 1);
        }
      }
      setFiltersTemp(_filters);
    },
    [filtersTemp]
  );
  const onDateChange = reactExports.useCallback(
    (date = /* @__PURE__ */ new Date()) => {
      const _filters = lodashExports.cloneDeep(filtersTemp);
      const dateIndex = _filters.findIndex((f) => f.key === "date");
      if (date) {
        const newFilter = FilterItemModel();
        newFilter.key = "date";
        newFilter.value = date;
        if (dateIndex >= 0) {
          _filters[dateIndex] = newFilter;
        } else {
          _filters.push(newFilter);
        }
      } else {
        if (dateIndex >= 0) {
          _filters.splice(dateIndex, 1);
        }
      }
      setFiltersTemp(_filters);
    },
    [filtersTemp]
  );
  const dateFilter = filtersTemp.find((f) => f.key === "date");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Drawer, { placement: "right", open, onClose, className: "p-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-6 flex items-center justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h5", color: "blue-gray", children: "Filter" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-5 gap-6 p-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-3 w-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        react.Input,
        {
          color: "teal",
          label: "Pilih Tanggal",
          onChange: () => {
          },
          onClick: () => setShowCalendar(true),
          value: !dateFilter ? "" : isDateRange ? formatRangeDate(dateFilter.valueMin, dateFilter.valueMax) : formatDate(dateFilter.value)
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs ml-2", children: "Dengan Range" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Switch, { color: "teal", onChange: () => setIsDateRange(!isDateRange) }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(react.Collapse, { open: showCalendar, children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Card, { className: "mx-auto w-5/6", ref: calendarRef, children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.CardBody, { className: "!p-0 ", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { transform: "scale(0.8) translate(-40px, -10px)" }, children: isDateRange ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      DayPicker,
      {
        mode: "range",
        selected: dateFilter ? { from: dateFilter.valueMin, to: dateFilter.valueMax } : {},
        onSelect: (range) => onDateRangeChange(range ?? {}),
        captionLayout: "dropdown",
        fromYear: 2010,
        toYear: (/* @__PURE__ */ new Date()).getFullYear()
      }
    ) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      DayPicker,
      {
        mode: "single",
        selected: dateFilter ? dateFilter.value : null,
        onSelect: onDateChange,
        captionLayout: "dropdown",
        fromYear: 2010,
        toYear: (/* @__PURE__ */ new Date()).getFullYear()
      }
    ) }) }) }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      react.Button,
      {
        color: "teal",
        className: "flex items-center justify-center w-full mt-5",
        onClick: () => onApply(filtersTemp),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AdjustmentsVerticalIcon, { className: "w-5 h-5 mr-2" }),
          "Terapkan Filter"
        ]
      }
    )
  ] });
}
export {
  TransactionFilter as T
};
