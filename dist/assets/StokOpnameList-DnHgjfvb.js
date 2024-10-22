import { y as httpPost, z as API_HOST, r as reactExports, A as AppContext, j as jsxRuntimeExports, a as react, e as dictionary, C as CubeIcon, I as IMAGEKIT_URL_ENDPOINT, g as ItemListModel, T as TIME_SEARCH_DEBOUNCE, L as LoadingOverlay } from "./index-CGEICd-f.js";
import { S as SearchNavbar } from "./SearchNavbar-BwHVnItL.js";
import { F as FilterChips } from "./FilterChips-Bif-hhPS.js";
import { G as GetStokOpnameReqBody, S as StokOpnameListModel, a as StokOpnameSchema } from "./stokopname-cwVxhHmp.js";
import { u as useFormik, X as XMarkIcon, C as CheckIcon, g as getAllUoms } from "./formik.esm-CfDN0tJy.js";
import { I as InputSimple } from "./InputSimple-DmjIpoRq.js";
import { I as InputNumber } from "./InputNumber-BTyAPkzT.js";
import { l as lodashExports } from "./lodash-C34_XwDM.js";
import { I as IKImage } from "./imagekitio-react.esm-Dkgu7ZiT.js";
import { I as InfiniteScroll } from "./InfiniteScroll-CJQX2qNT.js";
import { S as SetItemUnit } from "./formatter-DQiSfF1K.js";
import { I as ItemFilter } from "./ItemFilter-BttIrnm6.js";
import { F as FilterItemModel } from "./filter-DY4hzksJ.js";
import { B as Bars3Icon } from "./Bars3Icon-BPkb_aHs.js";
import { A as AdjustmentsVerticalIcon } from "./AdjustmentsVerticalIcon-DBH-WKzU.js";
import "./hoist-non-react-statics.cjs-BxdQBvuA.js";
import "./Item-Btr_yyWl.js";
const getStokOpname = (body = GetStokOpnameReqBody()) => {
  return httpPost(`${API_HOST}/stokopname/read`, body);
};
const saveStokOpname = (body = GetStokOpnameReqBody()) => {
  return httpPost(`${API_HOST}/stokopname/save`, body);
};
function StokOpnameEdit(props = { item: StokOpnameListModel(), onClose: () => {
}, onSubmit: () => {
}, pakaistoklist: 0 }) {
  const { lang, currency } = reactExports.useContext(AppContext);
  const [loading, setLoading] = reactExports.useState(false);
  const [currentTab, setCurrentTab] = reactExports.useState("unit-1");
  const formik = useFormik({
    initialValues: StokOpnameListModel(),
    validationSchema: StokOpnameSchema,
    onSubmit: async (_input) => {
      setLoading(true);
      if (_input.itm_id) {
        await saveStokOpname(_input);
      }
      setLoading(false);
      props.onSubmit(_input);
    }
  });
  const [pakaistok, setPakaistok] = reactExports.useState([
    { pak_id: 1, pak_nama: "Pakai Stok", pak_value: 1 },
    { pak_id: 2, pak_nama: "Tidak Pakai Stok", pak_value: 0 }
  ]);
  const [pakaistoknew, setpakaistoknew] = reactExports.useState(null);
  reactExports.useEffect(() => {
    const { item } = props;
    formik.setValues({
      ...item,
      itm_stok: typeof item.itm_stok == "number" ? item.itm_stok : Number(item.itm_stok),
      itm_stok_satuan2: typeof item.itm_stok_satuan2 == "number" ? item.itm_stok_satuan2 : Number(item.itm_stok_satuan2),
      itm_stok_satuan3: typeof item.itm_stok_satuan3 == "number" ? item.itm_stok_satuan3 : Number(item.itm_stok_satuan3)
    });
    const { pakaistoklist } = props;
    setpakaistoknew(pakaistoklist);
    console.log(pakaistoklist);
  }, []);
  const handlePakaiStok = reactExports.useCallback(
    (value) => {
      formik.setValues({
        ...formik.values,
        itm_pakaistok: value == 0 ? 0 : 1
      });
    },
    [formik.values]
  );
  const setStok = reactExports.useCallback(
    (e) => {
      formik.setValues({
        ...formik.values,
        itm_stok: e.target.value,
        sop_qty_satuan_1: e.target.value
      });
    },
    [formik.values]
  );
  const setStokSatuan2 = reactExports.useCallback(
    (e) => {
      formik.setValues({
        ...formik.values,
        itm_stok_satuan2: e.target.value,
        sop_qty_satuan_2: e.target.value
      });
    },
    [formik.values]
  );
  const setStokSatuan3 = reactExports.useCallback(
    (e) => {
      formik.setValues({
        ...formik.values,
        itm_stok_satuan3: e.target.value,
        sop_qty_satuan_3: e.target.value
      });
    },
    [formik.values]
  );
  const { values, errors, touched } = formik;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-screen-adapt bg-slate-100 overflow-hidden relative", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { className: "pt-2 overflow-auto h-full", onSubmit: formik.handleSubmit, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "header px-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Typography, { variant: "lead", color: "black", children: [
          values.itm_nama,
          ` (${values.itm_kode})`
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.IconButton, { className: "float-right", variant: "text", size: "md", onClick: props.onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsx(XMarkIcon, { className: "h-6 w-6 stroke-2 text-black" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", className: "w-full font-normal mt-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        react.Select,
        {
          className: "h-10 bg-teal-50",
          Name: "itm_pakaistok",
          value: pakaistoknew,
          onChange: handlePakaiStok,
          label: "Pakai Stok",
          children: pakaistok.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: p.pak_value, children: p.pak_nama }, p.pak_id))
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "content px-3 pt-3 pb-20 rounded-t-3xl bg-gray-50 min-h-screen", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Tabs, { value: currentTab, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(react.TabsHeader, { className: "bg-teal-500", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Tab, { value: "unit-1", children: [
          dictionary.stock.uom.unitList[lang],
          " 1"
        ] }, 1),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Tab, { value: "unit-2", children: [
          dictionary.stock.uom.unitList[lang],
          " 2"
        ] }, 2),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Tab, { value: "unit-3", children: [
          dictionary.stock.uom.unitList[lang],
          " 3"
        ] }, 3)
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        react.TabsBody,
        {
          animate: {
            initial: { y: -250 },
            mount: { y: 0 },
            unmount: { y: -250 }
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(react.TabPanel, { value: "unit-1", className: "px-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(InputSimple, { value: values.itm_satuan1, label: dictionary.stock.uom.unitName[lang], disabled: true }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(InputSimple, { value: 1, label: dictionary.stock.uom.coef[lang], disabled: true }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(InputNumber, { value: parseFloat(values.itm_stok), label: dictionary.stock.uom.stock[lang], disabled: true }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                InputNumber,
                {
                  value: values.sop_qty_satuan_1,
                  label: dictionary.stock.uom.stockopname[lang],
                  name: "sop_qty_satuan_1",
                  onChange: setStok,
                  error: errors.sop_qty_satuan_1
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                InputSimple,
                {
                  value: values.sop_ket_satuan_1,
                  label: dictionary.stock.uom.note[lang],
                  name: "sop_ket_satuan_1",
                  onChange: formik.handleChange,
                  error: errors.sop_ket_satuan_1
                }
              ) })
            ] }, 1),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(react.TabPanel, { value: "unit-2", className: "px-0", disabled: true, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(InputSimple, { value: values.itm_satuan2, label: dictionary.stock.uom.unitName[lang], disabled: true }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(InputSimple, { value: values.itm_satuan2of1, label: dictionary.stock.uom.unitName[lang], disabled: true }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                InputNumber,
                {
                  value: parseFloat(values.itm_stok_satuan2),
                  label: dictionary.stock.uom.stock[lang],
                  disabled: true
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                InputNumber,
                {
                  value: values.sop_qty_satuan_2,
                  label: dictionary.stock.uom.stockopname[lang],
                  name: "sop_qty_satuan_2",
                  onChange: setStokSatuan2,
                  error: errors.sop_qty_satuan_2
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                InputSimple,
                {
                  value: values.sop_ket_satuan_2,
                  label: dictionary.stock.uom.note[lang],
                  name: "sop_ket_satuan_2",
                  onChange: formik.handleChange,
                  error: errors.sop_ket_satuan_2
                }
              ) })
            ] }, 2),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(react.TabPanel, { value: "unit-3", className: "px-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(InputSimple, { value: values.itm_satuan3, label: dictionary.stock.uom.unitName[lang], disabled: true }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(InputSimple, { value: values.itm_satuan3of1, label: dictionary.stock.uom.coef[lang], disabled: true }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                InputNumber,
                {
                  value: parseFloat(values.itm_stok_satuan3),
                  label: dictionary.stock.uom.stock[lang],
                  disabled: true
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                InputNumber,
                {
                  value: values.sop_qty_satuan_3,
                  label: dictionary.stock.uom.stockopname[lang],
                  name: "sop_qty_satuan_3",
                  onChange: setStokSatuan3,
                  error: errors.sop_qty_satuan_3
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                InputSimple,
                {
                  value: values.sop_ket_satuan_3,
                  label: dictionary.stock.uom.note[lang],
                  name: "sop_ket_satuan_3",
                  onChange: formik.handleChange,
                  error: errors.sop_ket_satuan_3
                }
              ) })
            ] }, 3)
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "action-area fixed bottom-3 inset-x-4 z-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      react.Button,
      {
        size: "lg",
        variant: "gradient",
        color: "teal",
        className: "group w-full relative flex items-center gap-3 overflow-hidden pr-[72px] mx-auto desktop:max-w-[60%]",
        type: "submit",
        disabled: loading,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-grow text-left", children: dictionary.stock.uom.save[lang] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute right-0 grid h-full w-12 place-items-center bg-teal-500 transition-colors group-hover:bg-teal-600", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(react.Spinner, { className: "w-5 h-5", color: "white" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CheckIcon, { className: "w-5 h-5" }) })
        ]
      }
    ) })
  ] }) });
}
function UOMItemScrollSm({
  items = [ItemListModel()],
  onSelect = () => {
  },
  onLoad = () => {
  },
  infinite = false
}) {
  const listItems = items.map((i, index) => {
    const uoms = getAllUoms(i);
    const image = i.itm_urlimage1;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(react.ListItem, { className: "", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(react.ListItemPrefix, { className: "mr-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-full bg-gray-50 w-12 h-12 overflow-hidden", children: !image ? /* @__PURE__ */ jsxRuntimeExports.jsx(CubeIcon, { className: "h-7 w-7 mx-auto my-2.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
        IKImage,
        {
          urlEndpoint: IMAGEKIT_URL_ENDPOINT,
          path: image,
          transformation: [
            {
              height: "100",
              width: "100"
            }
          ],
          className: "object-contain",
          loading: "lazy"
        }
      ) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full flex flex-col gap-[5px]", onClick: () => onSelect(i), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-[90%] whitespace-nowrap overflow-hidden text-ellipsis font-semibold", children: i.itm_nama }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-max py-[2px] px-2 text-[12px] font-semibold bg-orange-100 rounded-md", children: i.itm_kode }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1", children: uoms.length > 0 && uoms.map((uom, i2) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-max py-[2px] px-2 text-[12px] font-semibold bg-blue-100 rounded-md", children: SetItemUnit(uom.toUpperCase()) }, i2)) })
      ] })
    ] }, index);
  });
  if (infinite) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(InfiniteScroll, { listItems, lastRowHandler: onLoad, heightClass: "h-[90px]" });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Fragment, { children: listItems });
}
function UomItemScrollMd({
  items = [ItemListModel()],
  onSelect = () => {
  },
  onLoad = () => {
  },
  infinite = false
}) {
  const { lang } = reactExports.useContext(AppContext);
  const listItems = items.map((i, index) => {
    const uoms = getAllUoms(i);
    const image = i.itm_urlimage1;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Card, { className: "max-w-[24rem] overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        react.CardHeader,
        {
          shadow: false,
          floated: false,
          className: "m-0 rounded-none bg-gray-200 h-36",
          children: !image ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CubeIcon, { className: "h-14 w-14 m-auto" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
            IKImage,
            {
              urlEndpoint: IMAGEKIT_URL_ENDPOINT,
              path: image,
              transformation: [{
                "height": "230",
                "width": "300"
              }],
              className: "object-cover h-full w-full",
              loading: "lazy"
            }
          )
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(react.CardBody, { className: "p-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: i.itm_nama }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Typography, { variant: "small", color: "gray", children: [
          "#",
          i.itm_kode
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Typography, { color: "gray", className: "font-normal", children: [
          dictionary.stock.uom.unitList[lang],
          ": ",
          uoms.join(", ")
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.Button, { size: "sm", onClick: () => onSelect(i), color: "teal", fullWidth: true, variant: "gradient", className: "flex items-center px-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs", children: dictionary.stock.uom.stockopnamesetting[lang] }) })
      ] })
    ] }, index);
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 p-2", children: infinite ? /* @__PURE__ */ jsxRuntimeExports.jsx(InfiniteScroll, { listItems, lastRowHandler: onLoad, heightClass: "h-[300px]" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Fragment, { children: listItems }) });
}
function StokOpnameList() {
  const { setMenuOpen, filters, setFilters, lang, rowsPerPage, cookies, semiDesktopMode } = reactExports.useContext(AppContext);
  const [listPadding, setListPadding] = reactExports.useState("20px");
  const [loading, setLoading] = reactExports.useState(true);
  const [keyword, setKeyword] = reactExports.useState("");
  const [items, setItems] = reactExports.useState([StokOpnameListModel()]);
  const [selectedItem, setSelectedItem] = reactExports.useState(StokOpnameListModel());
  const [submitCount, setSubmitCount] = reactExports.useState(0);
  const navbarRef = reactExports.useRef();
  const [page, setPage] = reactExports.useState(1);
  const [openFilter, setOpenFilter] = reactExports.useState(false);
  const [clearFilter, setClearFilter] = reactExports.useState(false);
  const openDrawerRight = () => setOpenFilter(true);
  reactExports.useEffect(() => {
    setItems([]);
    setPage(1);
    setTimeout(() => initData(), 100);
  }, [keyword, filters, submitCount]);
  reactExports.useEffect(() => {
    if (page > 1)
      initData();
  }, [page]);
  const handleResponse = ({ data, error }) => {
    if (error) {
      alert("Terjadi Kesalahan");
    } else {
      setItems(data);
    }
  };
  const handleAppendResponse = ({ data, error }) => {
    if (error) {
      alert("Terjadi Kesalahan");
    } else {
      setItems([...items, ...data]);
    }
  };
  const handleCheckFilter = reactExports.useCallback(
    (item) => {
      setPage(1);
      setItems([]);
      const oldArray = [...filters];
      const indexOfId = oldArray.findIndex((a) => a.value == item);
      if (indexOfId >= 0) {
        oldArray.splice(indexOfId, 1);
        setFilters(oldArray);
      } else {
        const newFilter = FilterItemModel();
        newFilter.key = "category";
        newFilter.value = item;
        setFilters([...oldArray, newFilter]);
      }
    },
    [filters]
  );
  reactExports.useEffect(() => {
    const _filters = lodashExports.cloneDeep(filters);
    let _newfilter = _filters.filter(function(object) {
      return object.key !== "category";
    });
    setFilters(_newfilter);
  }, [clearFilter]);
  const setFilterChips = (filterChips) => {
    setPage(1);
    setItems([]);
    setFilters(filterChips);
  };
  const initData = reactExports.useCallback(() => {
    const _categoryFilter = filters.find((f) => f.key === "category");
    const _filters = lodashExports.cloneDeep(filters);
    let _newfilter = _filters.filter(function(object) {
      return object.key === "category";
    });
    let filterProps = {};
    let strcategory = "";
    _newfilter.map((i, index) => {
      strcategory = strcategory + (i.value == "TANPA KATEGORI" ? " itm_kategori IS NULL OR" : ' itm_kategori="' + i.value + '" OR');
    });
    if (_categoryFilter) {
      filterProps = {
        category: strcategory.slice(0, -2)
      };
    }
    if (keyword && keyword.length > 1) {
      const orderSearch = setTimeout(async () => {
        setLoading(true);
        const { data, error } = await getStokOpname({
          lok_id: cookies.lok_id,
          key_val: keyword,
          page,
          rows: rowsPerPage,
          ...filterProps
        });
        if (page <= 1)
          handleResponse({ data, error });
        else
          handleAppendResponse({ data, error });
        setLoading(false);
        console.log("ada keyword");
      }, TIME_SEARCH_DEBOUNCE);
      return () => {
        clearTimeout(orderSearch);
      };
    } else if (!keyword) {
      const init = async () => {
        setLoading(true);
        const { data, error } = await getStokOpname({
          lok_id: cookies.lok_id,
          page,
          rows: rowsPerPage,
          ...filterProps
        });
        if (page <= 1)
          handleResponse({ data, error });
        else
          handleAppendResponse({ data, error });
        setLoading(false);
      };
      init();
    }
  }, [keyword, filters, page, submitCount]);
  reactExports.useEffect(() => {
    if (items[0] && items[0].itm_id && !filters[0]) {
      const init = async () => {
        const { data, error } = await getStokOpname({
          lok_id: cookies.lok_id,
          page,
          rows: rowsPerPage
        });
        handleAppendResponse({ data, error });
      };
      init();
    }
  }, [page, filters]);
  reactExports.useEffect(() => {
    if (navbarRef.current) {
      setListPadding(`${navbarRef.current.offsetHeight + 20}px`);
    }
  }, [items, navbarRef]);
  const handleSelect = (item = StokOpnameListModel()) => {
    item.sop_itm_id = item.itm_id;
    item.sop_lok_id = cookies.lok_id;
    item.sop_id = -1;
    cookies.role_update.length == 0 && cookies.role_dst.length == 0 ? setSelectedItem(item) : cookies.role_dst.findIndex((a) => a == "ALL") >= 0 ? setSelectedItem(item) : cookies.role_update.findIndex((a) => a == "SOP") >= 0 ? setSelectedItem(item) : null;
    setSubmitCount(submitCount + 1);
  };
  if (selectedItem && selectedItem.itm_id > 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      StokOpnameEdit,
      {
        item: selectedItem,
        onClose: () => setSelectedItem(null),
        onSubmit: (input) => {
          setSubmitCount(submitCount + 1);
          setSelectedItem(input);
        },
        pakaistoklist: selectedItem.itm_pakaistok ? parseInt(selectedItem.itm_pakaistok) : 0
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(reactExports.Fragment, { children: [
    !loading ? null : /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingOverlay, { white: true }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-screen-adapt bg-gray-50 overflow-hidden relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pb-20 overflow-auto h-full", style: { paddingTop: listPadding }, children: !items.length && !loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto py-20 w-fit", children: dictionary.stock.item.noItems[lang] }) : semiDesktopMode ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        UomItemScrollMd,
        {
          onSelect: handleSelect,
          items,
          onLoad: () => setPage(page + 1),
          infinite: !keyword
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx(react.List, { className: "divide-y divide-dashed divide-gray-400", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        UOMItemScrollSm,
        {
          onSelect: handleSelect,
          items,
          onLoad: () => setPage(page + 1),
          infinite: !keyword
        }
      ) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "top-0 inset-x-0 fixed bg-gradient-to-b from-gray-50 h-20" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 top-0 inset-x-0 fixed z-50 mx-auto desktop:max-w-[60%]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Navbar, { ref: navbarRef, className: `pt-2 px-2 ${!filters.length ? "pb-6" : "pb-4"} relative`, blurred: false, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.IconButton, { variant: "text", size: "md", onClick: () => setMenuOpen(true), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bars3Icon, { className: "h-6 w-6 stroke-2" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-2 flex-grow", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SearchNavbar, { onSearch: setKeyword, label: "Stock Opname" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.IconButton, { size: "md", variant: "text", onClick: openDrawerRight, children: /* @__PURE__ */ jsxRuntimeExports.jsx(AdjustmentsVerticalIcon, { className: "h-6 w-6 stroke-2" }) })
        ] }),
        !filters.length ? /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "gray", className: "absolute right-14 bottom-1 text-xs italic", children: "Semua Kategori" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-2 pt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FilterChips, { filters, onSetFilters: setFilterChips }) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ItemFilter,
      {
        open: openFilter,
        onClose: () => setOpenFilter(false),
        onCheck: handleCheckFilter,
        onClear: () => setClearFilter(!clearFilter),
        checkedIds: filters.map((i, index) => i.value)
      }
    )
  ] });
}
export {
  StokOpnameList as default
};
