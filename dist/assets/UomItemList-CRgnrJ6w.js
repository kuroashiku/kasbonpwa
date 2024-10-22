import { r as reactExports, A as AppContext, j as jsxRuntimeExports, a as react, C as CubeIcon, I as IMAGEKIT_URL_ENDPOINT, e as dictionary, g as ItemListModel, o as ItemUomSchema, q as Cog6ToothIcon, u as useNavigate, T as TIME_SEARCH_DEBOUNCE, L as LoadingOverlay } from "./index-CGEICd-f.js";
import { S as SearchNavbar } from "./SearchNavbar-BwHVnItL.js";
import { F as FilterChips } from "./FilterChips-Bif-hhPS.js";
import { s as saveItem, g as getItems } from "./Item-Btr_yyWl.js";
import { u as useFormik, X as XMarkIcon, C as CheckIcon, g as getAllUoms } from "./formik.esm-CfDN0tJy.js";
import { I as InputMoney } from "./InputMoney-BaIGaJbE.js";
import { I as InputSimple } from "./InputSimple-DmjIpoRq.js";
import { l as lodashExports } from "./lodash-C34_XwDM.js";
import { I as ImageUpload } from "./ImageUpload-DcGRcGeO.js";
import { I as IKImage } from "./imagekitio-react.esm-Dkgu7ZiT.js";
import { T as TrashIcon } from "./TrashIcon-D-NGhcgm.js";
import { I as InfiniteScroll } from "./InfiniteScroll-CJQX2qNT.js";
import { S as SetItemUnit } from "./formatter-DQiSfF1K.js";
import { I as ItemFilter } from "./ItemFilter-BttIrnm6.js";
import { F as FilterItemModel } from "./filter-DY4hzksJ.js";
import { B as Bars3Icon } from "./Bars3Icon-BPkb_aHs.js";
import { A as AdjustmentsVerticalIcon } from "./AdjustmentsVerticalIcon-DBH-WKzU.js";
import "./hoist-non-react-statics.cjs-BxdQBvuA.js";
function UomItemEdit(props = { item: ItemListModel(), onClose: () => {
}, onSubmit: () => {
} }) {
  const { lang, currency, cookies } = reactExports.useContext(AppContext);
  const [loading, setLoading] = reactExports.useState(false);
  const [currentTab, setCurrentTab] = reactExports.useState("unit-1");
  const [services_1, setServices_1] = reactExports.useState([]);
  const [services_2, setServices_2] = reactExports.useState([]);
  const [services_3, setServices_3] = reactExports.useState([]);
  const formik = useFormik({
    initialValues: ItemListModel(),
    validationSchema: ItemUomSchema,
    onSubmit: async (_input) => {
      setLoading(true);
      _input.itm_service_level_satuan2 = JSON.stringify(services_2);
      _input.itm_service_level_satuan3 = JSON.stringify(services_3);
      if (_input.itm_id) {
        await saveItem(_input);
      }
      setLoading(false);
      props.onSubmit();
    }
  });
  reactExports.useEffect(() => {
    const { item } = props;
    if (cookies.lok_type == "laundry") {
      setServices_1(JSON.parse(item.itm_service_level_satuan1));
      setServices_2(item.itm_service_level_satuan2 ? JSON.parse(item.itm_service_level_satuan2) : []);
      setServices_3(item.itm_service_level_satuan3 ? JSON.parse(item.itm_service_level_satuan3) : []);
    }
    formik.setValues({
      ...item,
      itm_satuan1hpp: typeof item.itm_satuan1hpp == "number" ? item.itm_satuan1hpp : Number(item.itm_satuan1hpp),
      itm_satuan1hrg: typeof item.itm_satuan1hrg == "number" ? item.itm_satuan1hrg : Number(item.itm_satuan1hrg),
      itm_satuan2hpp: typeof item.itm_satuan2hpp == "number" ? item.itm_satuan2hpp : Number(item.itm_satuan2hpp),
      itm_satuan2hrg: typeof item.itm_satuan2hrg == "number" ? item.itm_satuan2hrg : Number(item.itm_satuan2hrg),
      itm_satuan3hpp: typeof item.itm_satuan3hpp == "number" ? item.itm_satuan3hpp : Number(item.itm_satuan3hpp),
      itm_satuan3hrg: typeof item.itm_satuan3hrg == "number" ? item.itm_satuan3hrg : Number(item.itm_satuan3hrg)
    });
  }, []);
  const handleCancleService = (service, indexservice, item) => {
    const temparray = services_1.filter(function(item2) {
      return item2.level !== service.level;
    });
    setServices(temparray);
  };
  const handleAddServices = (indextab) => {
    const _services = lodashExports.cloneDeep(indextab == 2 ? services_2 : services_3);
    _services.push({ level: "", hrg: 0 });
    indextab == 2 ? setServices_2(_services) : setServices_3(_services);
  };
  const handleChangeService = (evt, id, item, index, indextab) => {
    const _services = lodashExports.cloneDeep(indextab == 2 ? services_2 : services_3);
    if (id == "hrg")
      _services[index] = { level: item.level, hrg: evt.target.value };
    if (id == "level") {
      _services[index] = { level: evt.target.value, hrg: item.hrg };
    }
    indextab == 2 ? setServices_2(_services) : setServices_3(_services);
  };
  const { values, errors, touched } = formik;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-screen-adapt bg-teal-600 overflow-hidden relative", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { className: "pt-2 overflow-auto h-full", onSubmit: formik.handleSubmit, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(react.IconButton, { className: "float-right", variant: "text", size: "md", onClick: props.onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsx(XMarkIcon, { className: "h-6 w-6 stroke-2 text-white" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center py-4", children: [
        !values.itm_urlimage1 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-full p-4 bg-gray-100 mr-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CubeIcon, { className: "h-8 w-8" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-full overflow-hidden mr-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          IKImage,
          {
            urlEndpoint: IMAGEKIT_URL_ENDPOINT,
            path: values.itm_urlimage1,
            transformation: [{
              "height": "64",
              "width": "64"
            }],
            className: "object-cover h-full w-full",
            loading: "lazy"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "lead", color: "white", children: values.itm_nama }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "light-green", className: "font-normal", children: values.itm_kode })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-3 pt-3 pb-20 rounded-t-3xl bg-gray-50 min-h-screen", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Tabs, { value: currentTab, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(react.TabsHeader, { children: [
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
            /* @__PURE__ */ jsxRuntimeExports.jsxs(react.TabPanel, { value: "unit-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                ImageUpload,
                {
                  image: values.itm_urlimage1,
                  id: "upl-image1",
                  disabled: true,
                  widthClass: "w-img-upload"
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                InputSimple,
                {
                  value: values.itm_satuan1,
                  label: dictionary.stock.uom.unitName[lang],
                  disabled: true
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                InputSimple,
                {
                  value: 1,
                  label: dictionary.stock.uom.coef[lang],
                  disabled: true
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                InputMoney,
                {
                  label: dictionary.stock.uom.hpp[lang],
                  currency,
                  value: values.itm_satuan1hpp,
                  disabled: true
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                InputMoney,
                {
                  label: dictionary.stock.uom.price[lang],
                  currency,
                  value: values.itm_satuan1hrg,
                  disabled: true
                }
              ) }),
              cookies.lok_type == "laundry" ? services_1 == null ? void 0 : services_1.map((i, index) => {
                return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "setlevel-item flex flex-col gap-4 mb-4 p-3 pt-6 bg-blue-gray-50 rounded-md", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    InputMoney,
                    {
                      currency,
                      label: "Biaya",
                      onChange: (evt) => handleChangeService(evt, "hrg", i, index),
                      value: i.hrg,
                      disabled: true
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 justify-between items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    InputSimple,
                    {
                      value: i.level,
                      label: "Level",
                      onChange: (evt) => handleChangeService(evt, "level", i, index),
                      disabled: true
                    }
                  ) })
                ] });
              }) : null
            ] }, 1),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(react.TabPanel, { value: "unit-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                ImageUpload,
                {
                  image: values.itm_urlimage2,
                  onSuccess: (url) => formik.setFieldValue("itm_urlimage2", url),
                  onRemove: () => formik.setFieldValue("itm_urlimage2", null),
                  id: "upl-image2",
                  widthClass: "w-img-upload"
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                InputSimple,
                {
                  value: values.itm_satuan2,
                  label: dictionary.stock.uom.unitName[lang],
                  name: "itm_satuan2",
                  onChange: formik.handleChange,
                  error: errors.itm_satuan2
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                InputSimple,
                {
                  value: values.itm_satuan2of1,
                  label: dictionary.stock.uom.coef[lang],
                  name: "itm_satuan2of1",
                  onChange: formik.handleChange,
                  error: errors.itm_satuan2of1
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                InputMoney,
                {
                  label: dictionary.stock.uom.hpp[lang],
                  currency,
                  name: "itm_satuan2hpp",
                  value: values.itm_satuan2hpp,
                  onChange: formik.handleChange,
                  error: errors.itm_satuan2hpp
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                InputMoney,
                {
                  label: dictionary.stock.uom.price[lang],
                  currency,
                  name: "itm_satuan2hrg",
                  value: values.itm_satuan2hrg,
                  onChange: formik.handleChange,
                  error: errors.itm_satuan2hrg
                }
              ) }),
              cookies.lok_type == "laundry" ? services_2 == null ? void 0 : services_2.map((i, index) => {
                return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "setlevel-item flex flex-col gap-4 mb-4 p-3 pt-6 bg-blue-gray-50 rounded-md", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    InputMoney,
                    {
                      currency,
                      label: "Biaya",
                      onChange: (evt) => handleChangeService(evt, "hrg", i, index, 2),
                      value: i.hrg
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 justify-between items-center", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      InputSimple,
                      {
                        value: i.level,
                        label: "Level",
                        onChange: (evt) => handleChangeService(evt, "level", i, index, 2)
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      react.IconButton,
                      {
                        variant: "text",
                        className: "bg-orange-500 w-12 h-10",
                        onClick: () => handleCancleService(i, index, itemById),
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrashIcon, { className: "h-4 w-4 text-white" })
                      }
                    )
                  ] })
                ] });
              }) : null,
              cookies.lok_type == "laundry" ? /* @__PURE__ */ jsxRuntimeExports.jsx(react.Button, { variant: "gradient", color: "light-blue", onClick: () => handleAddServices(2), className: "w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Tambah Services" }) }) : null
            ] }, 2),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(react.TabPanel, { value: "unit-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                ImageUpload,
                {
                  image: values.itm_urlimage3,
                  onSuccess: (url) => formik.setFieldValue("itm_urlimage3", url),
                  onRemove: () => formik.setFieldValue("itm_urlimage3", null),
                  id: "upl-image3",
                  widthClass: "w-img-upload"
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                InputSimple,
                {
                  value: values.itm_satuan3,
                  label: dictionary.stock.uom.unitName[lang],
                  name: "itm_satuan3",
                  onChange: formik.handleChange,
                  error: errors.itm_satuan3
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                InputSimple,
                {
                  value: values.itm_satuan3of1,
                  label: dictionary.stock.uom.coef[lang],
                  name: "itm_satuan3of1",
                  onChange: formik.handleChange,
                  error: errors.itm_satuan3of1
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                InputMoney,
                {
                  label: dictionary.stock.uom.hpp[lang],
                  currency,
                  name: "itm_satuan3hpp",
                  value: values.itm_satuan3hpp,
                  onChange: formik.handleChange,
                  error: errors.itm_satuan3hpp
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                InputMoney,
                {
                  label: dictionary.stock.uom.price[lang],
                  currency,
                  name: "itm_satuan3hrg",
                  value: values.itm_satuan3hrg,
                  onChange: formik.handleChange,
                  error: errors.itm_satuan3hrg
                }
              ) }),
              cookies.lok_type == "laundry" ? services_3 == null ? void 0 : services_3.map((i, index) => {
                return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "setlevel-item flex flex-col gap-4 mb-4 p-3 pt-6 bg-blue-gray-50 rounded-md", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    InputMoney,
                    {
                      currency,
                      label: "Biaya",
                      onChange: (evt) => handleChangeService(evt, "hrg", i, index, 3),
                      value: i.hrg
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 justify-between items-center", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      InputSimple,
                      {
                        value: i.level,
                        label: "Level",
                        onChange: (evt) => handleChangeService(evt, "level", i, index, 3)
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      react.IconButton,
                      {
                        variant: "text",
                        className: "bg-orange-500 w-12 h-10",
                        onClick: () => handleCancleService(i, index, itemById),
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrashIcon, { className: "h-4 w-4 text-white" })
                      }
                    )
                  ] })
                ] });
              }) : null,
              cookies.lok_type == "laundry" ? /* @__PURE__ */ jsxRuntimeExports.jsx(react.Button, { variant: "gradient", color: "light-blue", onClick: () => handleAddServices(3), className: "w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Tambah Services" }) }) : null
            ] }, 3)
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed bottom-3 inset-x-4 z-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
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
        /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Button, { size: "sm", onClick: () => onSelect(i), color: "teal", fullWidth: true, variant: "gradient", className: "flex items-center px-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Cog6ToothIcon, { className: "h-6 w-6 mr-2" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs", children: dictionary.stock.uom.config[lang] })
        ] })
      ] })
    ] }, index);
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 p-2", children: infinite ? /* @__PURE__ */ jsxRuntimeExports.jsx(InfiniteScroll, { listItems, lastRowHandler: onLoad, heightClass: "h-[300px]" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Fragment, { children: listItems }) });
}
function UomItemList() {
  const { setMenuOpen, filters, setFilters, lang, rowsPerPage, cookies, semiDesktopMode } = reactExports.useContext(AppContext);
  const [listPadding, setListPadding] = reactExports.useState("20px");
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useState(false);
  useNavigate();
  const [keyword, setKeyword] = reactExports.useState("");
  const [items, setItems] = reactExports.useState([ItemListModel()]);
  const [selectedItem, setSelectedItem] = reactExports.useState(ItemListModel());
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
  }, [keyword, filters]);
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
        const { data, error } = await getItems({
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
      }, TIME_SEARCH_DEBOUNCE);
      return () => {
        clearTimeout(orderSearch);
      };
    } else if (!keyword) {
      const init = async () => {
        setLoading(true);
        const { data, error } = await getItems({
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
        const { data, error } = await getItems({
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
  const handleSelect = (item = ItemListModel()) => {
    cookies.role_update.length == 0 && cookies.role_dst.length == 0 ? setSelectedItem(item) : cookies.role_dst.findIndex((a) => a == "ALL") >= 0 ? setSelectedItem(item) : cookies.role_update.findIndex((a) => a == "CONV") >= 0 ? setSelectedItem(item) : null;
  };
  console.log(selectedItem);
  if (selectedItem && selectedItem.itm_id > 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      UomItemEdit,
      {
        item: selectedItem,
        onClose: () => setSelectedItem(null),
        onSubmit: () => setSubmitCount(submitCount + 1)
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
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-2 flex-grow", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SearchNavbar, { onSearch: setKeyword, label: "Satuan & Konversi" }) }),
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
  UomItemList as default
};
