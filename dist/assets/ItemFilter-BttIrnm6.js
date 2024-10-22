import { r as reactExports, A as AppContext, j as jsxRuntimeExports, a as react } from "./index-CGEICd-f.js";
import { c as categoriesItem } from "./Item-Btr_yyWl.js";
import { A as AdjustmentsVerticalIcon } from "./AdjustmentsVerticalIcon-DBH-WKzU.js";
function ItemFilter({
  open = false,
  onClose = () => {
  },
  onCheck = () => {
  },
  onClear = () => {
  },
  checkedIds = []
}) {
  const { filters, cookies } = reactExports.useContext(AppContext);
  const [categories, setCategories] = reactExports.useState([]);
  reactExports.useEffect(() => {
    const init = async () => {
      setCategories([]);
      const { data, error } = await categoriesItem({
        lok_id: cookies.lok_id
      });
      if (!error) {
        setCategories(data);
      }
    };
    init();
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Drawer, { placement: "right", open, onClose, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between p-3 border-b", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h5", color: "blue-gray", children: "Filter" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "blue-gray", children: "Kategori" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-item-filter", children: !categories ? /* @__PURE__ */ jsxRuntimeExports.jsx(react.Spinner, { className: "h-10 w-10 mx-auto pt-10", color: "teal" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full overflow-y-auto px-3", children: categories.map((i, index) => {
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 mb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            react.Checkbox,
            {
              size: 4,
              color: "teal",
              checked: checkedIds.includes(i.nama_ganjil),
              onChange: () => onCheck(i.nama_ganjil)
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs", children: i.nama_ganjil })
        ] }, "cgl" + index),
        i.nama_genap == "" ? null : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            react.Checkbox,
            {
              size: 4,
              color: "teal",
              checked: checkedIds.includes(i.nama_genap),
              onChange: () => onCheck(i.nama_genap)
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs", children: i.nama_genap })
        ] }, "cgp" + index)
      ] }, index);
    }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full flex flex-col gap-2 px-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Button, { color: "teal", className: "flex items-center justify-center w-full mt-5", onClick: () => onClose(), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AdjustmentsVerticalIcon, { className: "w-5 h-5 mr-2" }),
        "Terapkan Filter"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(react.Button, { variant: "gradient", color: "red", onClick: onClear, disabled: checkedIds.length <= 0, children: "Hapus Filter" })
    ] })
  ] });
}
export {
  ItemFilter as I
};
