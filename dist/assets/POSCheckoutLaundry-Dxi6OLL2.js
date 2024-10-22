import { r as reactExports, A as AppContext, u as useNavigate, b as ItemCheckoutModel, t as topic, j as jsxRuntimeExports, e as dictionary, a as react, C as CubeIcon, I as IMAGEKIT_URL_ENDPOINT, k as getCustomers, s as saveCustomer } from "./index-CGEICd-f.js";
import { a as draftPos } from "./Pos-68rCAtrO.js";
import { S as SetItemUnit, f as formatThousandSeparator } from "./formatter-DQiSfF1K.js";
import { I as IKImage } from "./imagekitio-react.esm-Dkgu7ZiT.js";
import { I as InputNumber } from "./InputNumber-BTyAPkzT.js";
import { I as InputSimple } from "./InputSimple-DmjIpoRq.js";
import { g as getDiscount } from "./Discount-jk2bDf3z.js";
import { g as getTax } from "./Tax-CfI0dIis.js";
import { g as getTable } from "./Table-HzM5Y3VM.js";
import { l as lodashExports } from "./lodash-C34_XwDM.js";
import { C as ChevronLeftIcon } from "./ChevronLeftIcon-jbeLmLzz.js";
import { P as PlusIcon } from "./PlusIcon-BaeDzwA_.js";
import { M as MinusCircleIcon } from "./MinusCircleIcon-CG9aRspX.js";
import { A as ArchiveBoxIcon, a as ArrowRightIcon } from "./ArrowRightIcon-Dk3fU68k.js";
function MinusIcon({
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
    d: "M5 12h14"
  }));
}
const ForwardRef = reactExports.forwardRef(MinusIcon);
const MinusIcon$1 = ForwardRef;
function POSCheckoutLaundry() {
  const {
    currency,
    itemsCheckout,
    setItemsCheckout,
    lang,
    setMoney,
    setTotalPay,
    totalPay,
    pajakGlobal,
    setPajakGlobal,
    diskonGlobal,
    setDiskonGlobal,
    catatanGlobal,
    setCatatanGlobal,
    tableGlobal,
    setTableGlobal,
    cookies,
    customerGlobal,
    setCustomerGlobal,
    pajakGlobalJSON,
    setPajakGlobalJSON,
    totalPrice,
    setTotalPrice
  } = reactExports.useContext(AppContext);
  const navigate = useNavigate();
  reactExports.useRef(null);
  reactExports.useState(false);
  reactExports.useState(false);
  const [diskon, setDiskon] = reactExports.useState(0);
  const [checkoutById, setCheckoutById] = reactExports.useState({});
  const [diskons, setDiskons] = reactExports.useState({});
  const [diskonsGlobal, setDiskonsGlobal] = reactExports.useState({});
  const [taxs, setTaxs] = reactExports.useState([]);
  const [tables, setTables] = reactExports.useState({});
  const [isNominal, setIsNominal] = reactExports.useState(false);
  reactExports.useState(false);
  const [isNominalGlobal, setIsNominalGlobal] = reactExports.useState(false);
  const [diskonSelect, setDiskonSelect] = reactExports.useState("");
  const [open, setOpen] = reactExports.useState(false);
  const [switchValue, setSwitchValue] = reactExports.useState(false);
  const [switchValueGlobal, setSwitchValueGlobal] = reactExports.useState(false);
  const [switchValueCustomer, setSwitchValueCustomer] = reactExports.useState(false);
  const [pajakGlobalNama, setPajakGlobalNama] = reactExports.useState("");
  const [pajakGlobalId, setPajakGlobalId] = reactExports.useState("");
  const [totalQty, setTotalQty] = reactExports.useState(0);
  const [customers, setCustomers] = reactExports.useState([]);
  const [customerNew, setCustomerNew] = reactExports.useState("");
  reactExports.useState(false);
  const [checkHeight, setCheckHeight] = reactExports.useState([]);
  const [checkWidth, setCheckWidth] = reactExports.useState(0);
  const [itemsCheckoutIndex, setItemsCheckoutIndex] = reactExports.useState(-1);
  const [itemsCheckoutServiceIndex, setItemsCheckoutServiceIndex] = reactExports.useState(-1);
  const [count, setCount] = reactExports.useState(0);
  function handleOpen(item) {
    setOpen(!open);
    console.log(item);
    setDiskonSelect(item.service_diskon == 0 ? "" : item.service_diskon);
    setIsNominal(diskons.length > 0 ? false : true);
  }
  const takeItem = reactExports.useCallback(
    (item = ItemCheckoutModel(), service_item) => {
      let _itemsCheckout = itemsCheckout.map((__item) => {
        __item.qty_service = 0;
        __item.service_level_satuan0.map((_item) => {
          if (__item.itm_id === item.itm_id && __item.konvidx === item.konvidx && _item.service_id === service_item.service_id) {
            _item.service_qty = parseFloat(_item.service_qty) + 1;
          }
          __item.qty_service = __item.qty_service + parseFloat(_item.service_qty);
        });
        __item.service_level_satuan0_str = JSON.stringify(__item.service_level_satuan0);
        return __item;
      });
      initItems({
        itemsCheckout: _itemsCheckout
      });
    },
    [itemsCheckout]
  );
  const cancelItem = reactExports.useCallback(
    (item = ItemCheckoutModel(), service_item, service_index, item_index) => {
      let indexToRemoveService = -1;
      let _itemsCheckout = itemsCheckout.map((__item, __index) => {
        __item.service_level_satuan0.map((_item, _index) => {
          if (__item.itm_id === item.itm_id && __item.konvidx === item.konvidx && _item.service_id === service_item.service_id) {
            if (parseFloat(_item.service_qty) > 1) {
              _item.service_qty = parseFloat(_item.service_qty) - 1;
            } else {
              indexToRemoveService = service_index;
            }
          }
        });
        return __item;
      });
      if (indexToRemoveService >= 0) {
        _itemsCheckout[item_index].service_level_satuan0.splice(indexToRemoveService, 1);
      }
      if (_itemsCheckout[item_index].service_level_satuan0.length == 0)
        _itemsCheckout.splice(item_index, 1);
      _itemsCheckout[item_index].service_level_satuan0_str = JSON.stringify(
        _itemsCheckout[item_index].service_level_satuan0
      );
      initItems({
        itemsCheckout: _itemsCheckout
      });
    },
    [itemsCheckout]
  );
  const addItem = reactExports.useCallback(
    (item = ItemCheckoutModel(), index) => {
      const _itemsCheckout = lodashExports.cloneDeep(itemsCheckout);
      const level = item.service_level_satuan0;
      console.log(itemsCheckout);
      level.push(
        JSON.parse(
          '{"service_id":"' + (item.service_level_satuan0.length + 1) + '","service_itm_id":"' + item.itm_id + '","service_nama":"' + (item.service_level && item.service_level.length > 0 ? item.service_level[0].level : "") + '","service_qty":"1","service_diskon":"0","service_hrg":"' + (item.service_level && item.service_level.length > 0 ? item.service_level[0].hrg : item.satuan0) + '","service_total":"' + (item.service_level && item.service_level.length > 0 ? item.service_level[0].hrg * item.qty : item.satuan0hrg * item.qty) + '"}'
        )
      );
      _itemsCheckout[index].service_level_satuan0 = level;
      _itemsCheckout[index].qty_service = _itemsCheckout[index].qty_service + 1;
      _itemsCheckout[index].service_level_satuan0_str = JSON.stringify(_itemsCheckout[index].service_level_satuan0);
      initItems({
        itemsCheckout: _itemsCheckout
      });
    },
    [itemsCheckout]
  );
  const cancelPajak = reactExports.useCallback(() => {
    setPajakGlobal(0);
  }, [pajakGlobal]);
  const initItems = reactExports.useCallback(
    ({ itemsCheckout: itemsCheckout2 = [], diskonGlobal: diskonGlobal2 = 0, pajakGlobal: pajakGlobal2 = 0 }) => {
      let _totalQty = 0;
      let _totalPrice = 0;
      itemsCheckout2.forEach((item) => {
        item.service_level_satuan0.forEach((newitem) => {
          _totalPrice += newitem.service_qty * newitem.service_hrg * (1 - Number(newitem.service_diskon) / 100);
          newitem.service_total = newitem.service_qty * newitem.service_hrg * (1 - Number(newitem.service_diskon) / 100);
          _totalQty += parseFloat(newitem.service_qty);
        });
      });
      setTotalPrice(_totalPrice);
      setTotalQty(_totalQty);
      setItemsCheckout(itemsCheckout2);
      console.log(_totalPrice);
      const _totalAllPrice = _totalPrice * (1 - parseInt(diskonGlobal2 == "" ? 0 : diskonGlobal2) / 100) + _totalPrice * (1 - parseInt(diskonGlobal2 == "" ? 0 : diskonGlobal2) / 100) * (parseInt(pajakGlobal2) / 100);
      setTotalPay(_totalAllPrice);
      console.log(_totalAllPrice);
    },
    [checkoutById, diskonGlobal, pajakGlobal]
  );
  reactExports.useEffect(() => {
    const initdiskon = async () => {
      setDiskons([]);
      const { data, error } = await getDiscount({
        lok_id: cookies.lok_id,
        dis_global: "all"
      });
      if (data.length >= 1) {
        let cekDiskonGlobal = data.filter(function(object) {
          return object.dis_global === "true";
        });
        let cekDiskonGlobalNew = data.filter(function(object) {
          return object.dis_global !== "true";
        });
        if (cekDiskonGlobal) {
          setSwitchValueGlobal(true);
          setIsNominalGlobal(true);
          setDiskonsGlobal(cekDiskonGlobal);
        }
        if (cekDiskonGlobalNew) {
          setIsNominal(false);
          setDiskons(cekDiskonGlobalNew);
          setSwitchValue(true);
        }
      } else {
        setSwitchValue(false);
        setIsNominal(true);
      }
    };
    const initpajak = async () => {
      setTaxs([]);
      const { data, error } = await getTax({
        lok_id: cookies.lok_id
      });
      if (data.length >= 1) {
        setTaxs(data);
      }
    };
    const inittable = async () => {
      setTaxs([]);
      const { data, error } = await getTable({
        lok_id: cookies.lok_id
        //mej_status: 'Kosong'
      });
      if (data.length >= 1) {
        setTables(data);
      }
    };
    const initcustomer = async () => {
      const { data, error } = await getCustomers({ com_id: cookies.com_id });
      if (error) {
        alert("Data tidak ditemukan");
      } else {
        setCustomers(data);
      }
    };
    initcustomer();
    initdiskon();
    initpajak();
    inittable();
    initItems({
      pajakGlobal,
      diskonGlobal,
      itemsCheckout
    });
    if (pajakGlobalJSON.paj_id) {
      setPajakGlobalId(pajakGlobalJSON.paj_id);
    }
    const _itemsCheckout = lodashExports.cloneDeep(itemsCheckout);
    let newcount = 1;
    _itemsCheckout.forEach((item) => {
      item.service_level_satuan0.forEach((newitem) => {
        newitem.service_id = newcount;
        newcount++;
      });
    });
    setCount(newcount);
    setItemsCheckout(_itemsCheckout);
  }, []);
  const handleDiskonInput = (evt) => {
    const diskonVal = evt.target.value;
    setDiskon(diskonVal);
    const _itemsCheckout = lodashExports.cloneDeep(itemsCheckout);
    _itemsCheckout[itemsCheckoutIndex].service_level_satuan0[itemsCheckoutServiceIndex].service_diskon = evt.target.value;
    initItems({
      diskonGlobal,
      pajakGlobal,
      itemsCheckout: _itemsCheckout
    });
  };
  const handleDiskonSelect = (value) => {
    console.log(value);
    setDiskonSelect(value);
    const _itemsCheckout = lodashExports.cloneDeep(itemsCheckout);
    _itemsCheckout[itemsCheckoutIndex].service_level_satuan0[itemsCheckoutServiceIndex].service_diskon = value;
    initItems({
      diskonGlobal,
      pajakGlobal,
      itemsCheckout: _itemsCheckout
    });
  };
  const handleDiskonGlobal = (evt) => {
    setDiskonGlobal(evt.target.value);
    initItems({
      pajakGlobal,
      diskonGlobal: evt.target.value,
      itemsCheckout
    });
  };
  const handlePajakGlobal = (value) => {
    let getValue = taxs.filter(function(object) {
      return object.paj_id === value;
    });
    setPajakGlobal(getValue[0].paj_value);
    setPajakGlobalJSON(getValue[0]);
    initItems({
      diskonGlobal,
      pajakGlobal: getValue[0].paj_value,
      pajakGlobalJSON: getValue[0],
      itemsCheckout
    });
  };
  const handletes = (value, item, index, indexi) => {
    const _itemsCheckout = lodashExports.cloneDeep(itemsCheckout);
    let _service_level = item.service_level.filter(function(object) {
      return parseInt(object.hrg) === parseInt(value);
    });
    _itemsCheckout[index].service_level_satuan0[indexi].service_hrg = value;
    _itemsCheckout[index].service_level_satuan0[indexi].service_nama = _service_level[0].level;
    _itemsCheckout[index].service_level_satuan0[indexi].service_total = _itemsCheckout[index].service_level_satuan0[indexi].service_hrg * _itemsCheckout[index].service_level_satuan0[indexi].service_qty;
    _itemsCheckout[index].service_level_satuan0_str = JSON.stringify(_itemsCheckout[index].service_level_satuan0);
    initItems({
      itemsCheckout: _itemsCheckout
    });
  };
  const handleCatatanGlobal = (evt) => {
    setCatatanGlobal(evt.target.value);
  };
  reactExports.useEffect(() => {
    if (taxs.length) {
      const tax = taxs.find((_taxs) => {
        if (Number(_taxs.paj_id) === Number(pajakGlobalId)) {
          return true;
        }
        return false;
      });
      if (tax) {
        setPajakGlobalNama(tax.paj_nama);
        setPajakGlobal(tax.paj_value);
      }
    }
  }, [taxs, pajakGlobalId]);
  const handleDraft = reactExports.useCallback(async () => {
    let filterProps = {};
    const _itemsCheckout = lodashExports.cloneDeep(itemsCheckout);
    _itemsCheckout.forEach((item) => {
      item.service_level_satuan0 = JSON.stringify(item.service_level_satuan0);
      item.service_level = JSON.stringify(item.service_level);
    });
    if (tableGlobal != "") {
      filterProps = {
        mej_id_new: parseInt(tableGlobal),
        resto_type: parseInt(cookies.resto_type),
        lok_type: cookies.lok_type
      };
    }
    if (customerNew != "") {
      const initcustomer = async () => {
        const { data: data2, error: error2 } = await saveCustomer({
          cus_id: -1,
          cus_com_id: cookies.com_id,
          cus_nama: customerNew,
          cus_wa: ""
        });
        if (!error2) {
          setCustomerGlobal(data2.cus_id);
        }
      };
      initcustomer();
    }
    if (itemsCheckout[0].dot_id != 0) {
      const init = async () => {
        await deleteDraftPos({ dot_id: parseInt(itemsCheckout[0].dot_id) });
      };
      init();
    }
    const { data, error } = await draftPos({
      rows: _itemsCheckout,
      total: totalPay,
      kas_id: cookies.kas_id,
      kas_nama: cookies.kas_nama,
      lok_id: cookies.lok_id,
      cus_id: customerGlobal == "" ? 0 : parseInt(customerGlobal),
      cus_nama: "",
      catatan: catatanGlobal,
      diskon: diskonGlobal,
      disnom: 0,
      mej_id: tableGlobal == "" ? 0 : parseInt(tableGlobal),
      pajak: pajakGlobal,
      pajak_json: JSON.stringify(pajakGlobalJSON),
      ...filterProps
    });
    if (error) {
      alert("Gagal login");
    } else {
      navigate(topic.cashier.route);
      setItemsCheckout([]);
      setMoney(0);
      setTotalPay(0);
      setPajakGlobal(0);
      setDiskonGlobal(0);
      setTableGlobal("");
      setCustomerGlobal("");
    }
  }, [itemsCheckout, tableGlobal, customerGlobal, pajakGlobal, diskonGlobal, pajakGlobalJSON]);
  const handleCustomerNew = (evt) => {
    setCustomerNew(evt.target.value);
  };
  const handleCalculator = reactExports.useCallback(() => {
    if (customerNew != "") {
      const initcustomer = async () => {
        const { data, error } = await saveCustomer({
          cus_id: -1,
          cus_com_id: cookies.com_id,
          cus_nama: customerNew,
          cus_wa: ""
        });
        if (!error) {
          setCustomerGlobal(data.cus_id);
        }
      };
      initcustomer();
    }
    navigate(topic.cashier.calculator.route);
  }, [customerNew]);
  if (!itemsCheckout || !itemsCheckout[0]) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-screen-adapt flex flex-col justify-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto mb-6", children: dictionary.cashier.checkout.noItems[lang] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Button, { color: "teal", size: "lg", onClick: () => navigate(topic.cashier.route), children: dictionary.cashier.checkout.back[lang] }) })
    ] });
  }
  const ActionButton = ({ mobile }) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: `action-area ${mobile ? "lg:hidden fixed bottom-3 inset-x-4" : "mobile:hidden w-full mx-auto"} flex gap-2`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            react.Button,
            {
              size: "lg",
              variant: "outlined",
              color: "green",
              className: "relative bg-white w-[20%] max-w-[60px]",
              onClick: () => handleDraft(),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute text-[10px] top-[0%] left-1/2 -translate-x-1/2", children: "Draft" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-1/2 top-[85%] -translate-x-1/2 -translate-y-[85%] transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArchiveBoxIcon, { className: "w-7 h-7" }) })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            react.Button,
            {
              size: "lg",
              variant: "gradient",
              color: "green",
              className: "group w-full relative flex items-center gap-3 overflow-hidden pr-[60px] pl-3",
              onClick: handleCalculator,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex-grow text-left", children: [
                  totalQty,
                  " item"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-right", children: [
                    currency,
                    " ",
                    formatThousandSeparator(totalPrice)
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: 11 }, children: Number(diskonGlobal) <= 0 ? "" : ` (Disc ${Number(diskonGlobal)}% : ${currency} ${formatThousandSeparator(
                    totalPrice * (1 - parseInt(diskonGlobal) / 100)
                  )})` }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: 11 }, children: Number(pajakGlobal) <= 0 ? "" : `(+${pajakGlobalJSON.paj_nama} ${Number(pajakGlobal)}% : ${currency} ${formatThousandSeparator(
                    totalPay
                  )})` })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute right-0 grid h-full w-12 place-items-center bg-green-500 transition-colors group-hover:bg-green-600", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRightIcon, { className: "w-5 h-5" }) })
              ]
            }
          )
        ]
      }
    );
  };
  let newindex = 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-screen-adapt bg-gray-50 overflow-hidden relative", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-2 top-0 inset-x-0 fixed z-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "top-0 inset-x-0 fixed bg-gradient-to-b from-gray-50 h-20" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(react.Navbar, { className: "px-2 py-3 relative", blurred: false, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.IconButton, { variant: "text", size: "md", onClick: () => navigate(topic.cashier.route), children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeftIcon, { className: "h-6 w-6 stroke-2" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-2 flex-grow", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { color: "gray", variant: "h5", children: dictionary.cashier.checkout.title[lang] }) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-full mx-auto px-2 py-20 overflow-hidden overflow-y-auto lg:flex lg:gap-3 lg:justify-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        react.List,
        {
          className: `item-list relative lg:h-full lg:overflow-y-auto divide-y divide-dashed divide-gray-400 lg:w-[30%] lg:px-0`,
          children: [
            itemsCheckout.map((i, index) => {
              return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { id: "a" + index, children: i.service_level_satuan0.map((ii, indexi) => {
                const image = i.itm_urlimage0;
                const unit = i.satuan0;
                const price = ii.service_hrg;
                const pricecut = ii.service_hrg * (1 - parseInt(ii.service_diskon) / 100);
                return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    id: "a" + index + indexi,
                    className: "mb-2 flex flex-col gap-2 bg-light-blue-50 rounded-md",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden", children: newindex = newindex + 1 }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(react.ListItem, { className: "relative min-h-[88px] lg:min-h-[80px] overflow-x-hidden pb-3", children: [
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
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "div",
                          {
                            className: "w-[100%] flex flex-col gap-1",
                            onClick: () => takeItem(i, ii),
                            onContextMenu: () => {
                              handleOpen(ii);
                              setCheckoutById(ii);
                              setItemsCheckoutIndex(index);
                              setItemsCheckoutServiceIndex(indexi);
                              setDiskon(ii.service_diskon);
                            },
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-[90%] text-[14px] whitespace-nowrap overflow-hidden text-ellipsis font-semibold", children: i.itm_nama }),
                              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-max py-[2px] px-2 text-[12px] font-semibold bg-yellow-100 rounded-md", children: i.kode }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-max py-[2px] px-2 text-[12px] font-semibold bg-purple-50 rounded-md", children: SetItemUnit(unit.toUpperCase()) })
                              ] }),
                              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-max py-[2px] px-2 text-[12px] font-semibold bg-green-100 rounded-md", children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
                                  `${ii.service_qty}x`,
                                  " ",
                                  formatThousandSeparator(price)
                                ] }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs", children: Number(ii.service_diskon) <= 0 ? "" : ` (Disc ${Number(ii.service_diskon)}% : ${currency} ${formatThousandSeparator(pricecut)}) ` })
                              ] })
                            ]
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-2 right-2 flex flex-col gap-1", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            react.IconButton,
                            {
                              variant: "text",
                              className: "w-8 h-8 bg-green-300 focus:bg-green-300 hover:bg-green-300 active:bg-green-300",
                              onClick: () => addItem(i, index),
                              children: /* @__PURE__ */ jsxRuntimeExports.jsx(PlusIcon, { className: "h-4 w-4 text-white" })
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            react.IconButton,
                            {
                              variant: "text",
                              className: "w-8 h-8 bg-orange-500 focus:bg-orange-500 hover:bg-orange-500 active:bg-orange-500",
                              onClick: () => cancelItem(i, ii, indexi, index),
                              children: /* @__PURE__ */ jsxRuntimeExports.jsx(MinusIcon$1, { className: "h-4 w-4 text-white font-semibold" })
                            }
                          )
                        ] })
                      ] }),
                      i.service_level ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: `px-3 pb-3`,
                          style: { top: checkHeight[newindex] + "px", left: checkWidth + "px" },
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                            react.Select,
                            {
                              label: "Level",
                              value: `${ii.service_hrg}`,
                              onChange: (value) => {
                                handletes(value, i, index, indexi);
                              },
                              children: i.service_level.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: p.hrg, children: p.level }, p.level))
                            }
                          )
                        }
                      ) : null
                    ]
                  },
                  "a" + index + indexi
                );
              }) }, index);
            }),
            pajakGlobal == 0 ? null : /* @__PURE__ */ jsxRuntimeExports.jsxs(react.ListItem, { className: "", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2 p-1 w-full", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-2 text-", children: /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: pajakGlobalJSON.paj_nama }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "", children: `${pajakGlobal}%` }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-right", children: formatThousandSeparator(totalPrice * (1 - parseInt(diskonGlobal) / 100) * (parseInt(pajakGlobal) / 100)) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.ListItemSuffix, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.IconButton, { variant: "text", color: "blue-gray", onClick: cancelPajak, children: /* @__PURE__ */ jsxRuntimeExports.jsx(MinusCircleIcon, { className: "h-6 w-6 text-red-500" }) }) })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "input-area flex flex-col gap-3 p-2 lg:w-[40%]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "Input-Item Pajak", children: !taxs.length ? /* @__PURE__ */ jsxRuntimeExports.jsx(InputNumber, { label: "Pajak", disabled: true }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          react.Select,
          {
            className: "h-10 min-w-[200px]",
            value: `${pajakGlobalId}`,
            onChange: handlePajakGlobal,
            color: "teal",
            label: "Pajak",
            children: taxs.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: p.paj_id, children: p.paj_nama }, p.paj_id))
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "Input-Item Catatan", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          InputSimple,
          {
            value: catatanGlobal,
            label: "Catatan",
            onChange: (evt) => {
              evt.preventDefault();
              handleCatatanGlobal(evt);
            }
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "Input-Item Diskon-Global w-[80%] lg:w-[80%]", children: !isNominalGlobal ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            InputNumber,
            {
              value: diskonGlobal,
              label: "Diskon Global",
              onChange: (evt) => {
                evt.preventDefault();
                handleDiskonGlobal(evt);
              },
              icon: "%"
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: !diskonsGlobal.length ? /* @__PURE__ */ jsxRuntimeExports.jsx(InputNumber, { label: "Diskon Global", disabled: true }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
            react.Select,
            {
              className: "h-10",
              id: "customer",
              value: `${diskonGlobal}`,
              onChange: setDiskonGlobal,
              color: "teal",
              label: "Pilih Diskon",
              children: diskonsGlobal.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: p.dis_value, children: p.dis_nama }, p.dis_id))
            }
          ) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "Input-Item Mode-Persentase h-[40px] w-[30%] lg:w-[20%] pr-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-gray-700 text-end mb-[2px]", children: "Persen (%)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end", children: !switchValueGlobal ? /* @__PURE__ */ jsxRuntimeExports.jsx(react.Switch, { value: false, color: "light-blue", defaultChecked: true, disabled: true }) : /* @__PURE__ */ jsxRuntimeExports.jsx(react.Switch, { color: "light-blue", onChange: () => setIsNominalGlobal(!isNominalGlobal) }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "Input-Item Customer-Name w-[80%] lg:w-[80%]", children: switchValueCustomer ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            InputSimple,
            {
              value: customerNew,
              label: "Pelanggan Baru",
              onChange: (evt) => {
                evt.preventDefault();
                handleCustomerNew(evt);
              }
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: !customers.length ? /* @__PURE__ */ jsxRuntimeExports.jsx(InputNumber, { label: "Pelanggan", disabled: true }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
            react.Select,
            {
              id: "customer",
              value: `${customerGlobal}`,
              onChange: setCustomerGlobal,
              color: "teal",
              label: `Pilih ${dictionary.customer.sidebar[lang]}`,
              children: customers.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: p.cus_id, children: p.cus_nama }, p.cus_id))
            }
          ) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "Input-Item Customer-Mode h-[40px] w-[30%] lg:w-[20%] pr-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-gray-700 text-end mb-[2px]", children: "Baru" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Switch, { color: "light-blue", onChange: () => setSwitchValueCustomer(!switchValueCustomer) }) })
          ] })
        ] }),
        cookies.lok_type == "resto" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "Input-Item Meja", children: !tables.length ? /* @__PURE__ */ jsxRuntimeExports.jsx(InputNumber, { label: "Meja", disabled: true }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          react.Select,
          {
            className: "h-10",
            id: "table",
            value: `${tableGlobal}`,
            onChange: setTableGlobal,
            color: "teal",
            label: "Meja",
            children: tables.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              react.Option,
              {
                disabled: p.mej_status == "Terisi" ? true : false,
                value: p.mej_id,
                children: `${p.mej_nama}`
              },
              p.mej_id
            ))
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ActionButton, { mobile: false })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ActionButton, { mobile: true })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Dialog, { open, handler: handleOpen, size: "md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(react.DialogHeader, { className: "border-b-2", children: "DIskon" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(react.DialogBody, { className: "overflow-auto pb-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-5 gap-6 p-2 h-32", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-3", children: isNominal ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          InputNumber,
          {
            value: diskon,
            label: "Diskon",
            onChange: (evt) => {
              evt.preventDefault();
              handleDiskonInput(evt);
            },
            icon: "%"
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: !diskons.length ? /* @__PURE__ */ jsxRuntimeExports.jsx(InputNumber, { label: "Diskon", disabled: true }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          react.Select,
          {
            className: "h-10",
            id: "customer",
            value: `${diskonSelect}`,
            onChange: handleDiskonSelect,
            color: "teal",
            label: "Diskon",
            children: diskons.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: p.dis_value, children: p.dis_nama }, p.dis_id))
          }
        ) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs ml-2 text-center", children: "Mode Persentase" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center", children: !switchValue ? /* @__PURE__ */ jsxRuntimeExports.jsx(react.Switch, { color: "teal", defaultChecked: true, disabled: true }) : /* @__PURE__ */ jsxRuntimeExports.jsx(react.Switch, { color: "teal", onChange: () => setIsNominal(!isNominal) }) })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(react.DialogFooter, { className: "border-t-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Button, { variant: "gradient", color: "red", onClick: () => setOpen(false), className: "mr-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Back" }) }) })
    ] })
  ] });
}
export {
  POSCheckoutLaundry as default
};
