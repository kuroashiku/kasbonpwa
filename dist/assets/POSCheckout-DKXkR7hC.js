import { r as reactExports, A as AppContext, u as useNavigate, b as ItemCheckoutModel, t as topic, j as jsxRuntimeExports, e as dictionary, a as react, C as CubeIcon, I as IMAGEKIT_URL_ENDPOINT, k as getCustomers, s as saveCustomer } from "./index-CGEICd-f.js";
import { a as draftPos, d as deleteDraftPos } from "./Pos-68rCAtrO.js";
import { S as SetItemUnit, f as formatThousandSeparator } from "./formatter-DQiSfF1K.js";
import { I as IKImage } from "./imagekitio-react.esm-Dkgu7ZiT.js";
import { I as InputNumber } from "./InputNumber-BTyAPkzT.js";
import { I as InputSimple } from "./InputSimple-DmjIpoRq.js";
import { g as getDiscount } from "./Discount-jk2bDf3z.js";
import { g as getTax } from "./Tax-CfI0dIis.js";
import { g as getTable } from "./Table-HzM5Y3VM.js";
import { l as lodashExports } from "./lodash-C34_XwDM.js";
import { C as ChevronLeftIcon } from "./ChevronLeftIcon-jbeLmLzz.js";
import { M as MinusCircleIcon } from "./MinusCircleIcon-CG9aRspX.js";
import { A as ArchiveBoxIcon, a as ArrowRightIcon } from "./ArrowRightIcon-Dk3fU68k.js";
function POSCheckout() {
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
    semiDesktopMode,
    pajakGlobalJSON,
    setPajakGlobalJSON,
    totalPrice,
    setTotalPrice
  } = reactExports.useContext(AppContext);
  const navigate = useNavigate();
  const [readonly, setReadonly] = reactExports.useState(false);
  const [diskon, setDiskon] = reactExports.useState(0);
  const [checkoutById, setCheckoutById] = reactExports.useState({});
  const [diskons, setDiskons] = reactExports.useState({});
  const [diskonsGlobal, setDiskonsGlobal] = reactExports.useState({});
  const [taxs, setTaxs] = reactExports.useState([]);
  const [tables, setTables] = reactExports.useState({});
  const [isNominal, setIsNominal] = reactExports.useState(false);
  const [isNominalGlobal, setIsNominalGlobal] = reactExports.useState(false);
  const [diskonSelect, setDiskonSelect] = reactExports.useState("");
  const [open, setOpen] = reactExports.useState(false);
  const [switchValue, setSwitchValue] = reactExports.useState(false);
  const [switchValueGlobal, setSwitchValueGlobal] = reactExports.useState(false);
  const [switchValueCustomer, setSwitchValueCustomer] = reactExports.useState(false);
  const [pajakGlobalId, setPajakGlobalId] = reactExports.useState("");
  const [totalQty, setTotalQty] = reactExports.useState(0);
  const [customers, setCustomers] = reactExports.useState([]);
  const [customerNew, setCustomerNew] = reactExports.useState("");
  const [tmpHeight, setTmpHeight] = reactExports.useState(false);
  function handleOpen(item) {
    setOpen(!open);
    setDiskonSelect(item.diskon == 0 ? "" : item.diskon);
  }
  const takeItem = reactExports.useCallback(
    (item = ItemCheckoutModel()) => {
      let foundItem = false;
      let _itemsCheckout = itemsCheckout.map((_item) => {
        if (_item.itm_id === item.itm_id && _item.konvidx === item.konvidx) {
          _item.qty = Number(_item.pakaistok) == 1 ? Number(_item.stok) - _item.qty > 0 ? _item.qty + 1 : _item.qty : _item.qty + 1;
          foundItem = true;
        }
        return _item;
      });
      if (!foundItem) {
        item.qty = 1;
        _itemsCheckout.push(item);
      }
      initItems({
        pajakGlobal,
        diskonGlobal,
        itemsCheckout: _itemsCheckout
      });
    },
    [itemsCheckout]
  );
  const cancelItem = reactExports.useCallback(
    (item = ItemCheckoutModel()) => {
      let indexToRemove = -1;
      let _itemsCheckout = itemsCheckout.map((_item, index) => {
        if (_item.itm_id === item.itm_id && _item.konvidx === item.konvidx) {
          if (_item.qty > 1) {
            _item.qty--;
          } else {
            indexToRemove = index;
          }
        }
        return _item;
      });
      if (indexToRemove >= 0) {
        _itemsCheckout.splice(indexToRemove, 1);
      }
      initItems({
        diskon,
        diskonSelect,
        isNominal,
        pajakGlobal,
        diskonGlobal,
        itemsCheckout: _itemsCheckout
      });
    },
    [itemsCheckout]
  );
  const cancelPajak = reactExports.useCallback(() => {
    setPajakGlobal(0);
  }, [pajakGlobal]);
  const initItems = reactExports.useCallback(
    //({ diskon = 0, diskonSelect = "", isNominal = false, itemsCheckout = [], diskonGlobal=0, pajakGlobal=0, pajakGlobalJSON={} }) => {
    ({ itemsCheckout: itemsCheckout2 = [], diskonGlobal: diskonGlobal2 = 0, pajakGlobal: pajakGlobal2 = 0 }) => {
      console.log(pajakGlobal2);
      console.log(diskonGlobal2);
      let _totalQty = 0;
      let _totalPrice = 0;
      itemsCheckout2.forEach((item) => {
        _totalPrice += item.qty * item.satuan0hrg * (1 - Number(item.diskon) / 100);
        item.total = item.qty * item.satuan0hrg * (1 - Number(item.diskon) / 100);
        _totalQty += item.qty;
      });
      setTotalPrice(_totalPrice);
      setTotalQty(_totalQty);
      setItemsCheckout(itemsCheckout2);
      const _totalAllPrice = (
        //_totalPrice * (1 - parseInt(diskonGlobal) / 100) + _totalPrice * (parseInt(pajakGlobal) / 100);
        _totalPrice * (1 - parseInt(diskonGlobal2 == "" ? 0 : diskonGlobal2) / 100) + _totalPrice * (1 - parseInt(diskonGlobal2 == "" ? 0 : diskonGlobal2) / 100) * (parseInt(pajakGlobal2) / 100)
      );
      setTotalPay(_totalAllPrice);
    },
    //[checkoutById, diskon, diskonSelect, diskonGlobal, pajakGlobal, pajakGlobalJSON]
    [checkoutById, diskonGlobal, pajakGlobal]
  );
  reactExports.useEffect(() => {
    let _isNominal = false;
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
        console.log(cekDiskonGlobal);
        console.log(cekDiskonGlobalNew);
        if (cekDiskonGlobal.length > 0) {
          setSwitchValueGlobal(true);
          setDiskonsGlobal(cekDiskonGlobal);
        }
        if (cekDiskonGlobalNew.length > 0) {
          _isNominal = true;
          setDiskons(cekDiskonGlobalNew);
          setSwitchValue(true);
        } else {
          setIsNominal(true);
        }
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
      if (!error) {
        setCustomers(data);
      }
    };
    initcustomer();
    initdiskon();
    initpajak();
    inittable();
    setIsNominal(_isNominal);
    initItems({
      pajakGlobal,
      diskonGlobal,
      itemsCheckout
    });
    if (pajakGlobalJSON.paj_id) {
      setPajakGlobalId(pajakGlobalJSON.paj_id);
    }
    setDiskonGlobal("");
  }, []);
  const handleDiskonInput = (evt) => {
    const diskonVal = evt.target.value;
    setDiskon(diskonVal);
    let _itemsCheckout = itemsCheckout.map((_item) => {
      if (_item.itm_id === checkoutById.itm_id && _item.konvidx === checkoutById.konvidx) {
        _item.diskon = Number(diskonVal);
      }
      return _item;
    });
    initItems({
      diskonGlobal,
      pajakGlobal,
      itemsCheckout: _itemsCheckout
    });
  };
  const handleDiskonSelect = (value) => {
    const diskonVal = value;
    setDiskon(diskonVal);
    let _itemsCheckout = itemsCheckout.map((_item) => {
      if (_item.itm_id === checkoutById.itm_id && _item.konvidx === checkoutById.konvidx) {
        _item.diskon = Number(diskonVal);
      }
      return _item;
    });
    initItems({
      diskonGlobal,
      pajakGlobal,
      itemsCheckout: _itemsCheckout
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
  const handleDiskonGlobal = (evt) => {
    setDiskonGlobal(evt.target.value);
    initItems({
      pajakGlobal,
      diskonGlobal: evt.target.value,
      itemsCheckout
    });
  };
  const handleCatatanGlobal = (evt) => {
    setCatatanGlobal(evt.target.value);
  };
  const handleDraft = reactExports.useCallback(async () => {
    let filterProps = {};
    const _newitemsCheckout = lodashExports.cloneDeep(itemsCheckout);
    const _itemsCheckout = _newitemsCheckout.map((_item) => {
      _item.service_level_satuan0 = JSON.stringify(_item.service_level_satuan0);
      return _item;
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
      diskon: diskonGlobal == "" ? 0 : diskonGlobal,
      disnom: 0,
      mej_id: tableGlobal == "" ? 0 : parseInt(tableGlobal),
      pajak: pajakGlobal,
      pajak_json: JSON.stringify(pajakGlobalJSON),
      ...filterProps
    });
    if (error) {
      alert("Gagal simpan draft");
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
    if (diskonGlobal == "")
      setDiskonGlobal(0);
    cookies.role_update.length == 0 && cookies.role_dst.length == 0 ? navigate(topic.cashier.calculator.route) : cookies.role_dst.findIndex((a) => a == "ALL") >= 0 ? navigate(topic.cashier.calculator.route) : cookies.role_update.findIndex((a) => a == "POS") >= 0 ? navigate(topic.cashier.calculator.route) : null;
    console.log(totalPay);
  }, [customerNew, itemsCheckout, diskonGlobal]);
  if (!itemsCheckout || !itemsCheckout[0]) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-screen-adapt flex flex-col justify-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto mb-6", children: dictionary.cashier.checkout.noItems[lang] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Button, { color: "teal", size: "lg", onClick: () => navigate(topic.cashier.route), children: dictionary.cashier.checkout.back[lang] }) })
    ] });
  }
  const ActionButton = () => {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: `action-area ${semiDesktopMode ? "fixed bottom-3 inset-x-4 max-w-[50%]" : "w-full my-6"} flex gap-2 mx-auto`,
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
              className: "group w-full relative flex items-center gap-3 overflow-hidden pr-[60px] pl-3 mx-auto",
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-screen-adapt bg-gray-50 overflow-hidden relative", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-2 top-0 inset-x-0 fixed z-10 mx-auto desktop:max-w-[60%]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "top-0 inset-x-0 fixed bg-gradient-to-b from-gray-50 h-20" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(react.Navbar, { className: "px-2 py-3 relative", blurred: false, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.IconButton, { variant: "text", size: "md", onClick: () => navigate(topic.cashier.route), children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeftIcon, { className: "h-6 w-6 stroke-2" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-2 flex-grow", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { color: "gray", variant: "h5", children: dictionary.cashier.checkout.title[lang] }) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-full mx-auto px-2 py-20 overflow-hidden overflow-y-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        react.List,
        {
          className: `item-list ${tmpHeight ? "" : "mobile:max-h-[350px] overflow-y-auto"} lg:h-full lg:overflow-y-auto divide-y divide-dashed divide-gray-400`,
          children: [
            itemsCheckout.map((i, index) => {
              const unit = i.satuan0;
              const price = i.satuan0hrg;
              const pricecut = i.satuan0hrg * (1 - parseInt(i.diskon) / 100);
              const image = i.itm_urlimage0;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(react.ListItem, { className: "min-h-[88px] lg:min-h-[80px] bg-light-blue-50", children: [
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
                    onClick: () => takeItem(i),
                    onContextMenu: () => {
                      handleOpen(i);
                      setCheckoutById(i);
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-[90%] text-[14px] whitespace-nowrap overflow-hidden text-ellipsis font-semibold", children: i.itm_nama }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-max py-[2px] px-2 text-[12px] font-semibold bg-yellow-100 rounded-md", children: i.kode }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-max py-[2px] px-2 text-[12px] font-semibold bg-purple-50 rounded-md", children: SetItemUnit(unit.toUpperCase()) })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-max py-[2px] px-2 text-[12px] font-semibold bg-green-100 rounded-md", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
                          `${i.qty}x`,
                          " ",
                          formatThousandSeparator(price)
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs", children: Number(i.diskon) <= 0 ? "" : ` (Disc ${Number(i.diskon)}% : ${currency} ${formatThousandSeparator(pricecut)}) ` })
                      ] })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(react.ListItemSuffix, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.IconButton, { variant: "text", color: "blue-gray", onClick: () => cancelItem(i), children: /* @__PURE__ */ jsxRuntimeExports.jsx(MinusCircleIcon, { className: "h-6 w-6 text-red-500" }) }) })
              ] }, index);
            }),
            pajakGlobal == 0 ? null : /* @__PURE__ */ jsxRuntimeExports.jsxs(react.ListItem, { className: "", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2 p-1 w-full", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-2 text-", children: /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: pajakGlobalJSON.paj_nama }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "", children: `${pajakGlobal}%` }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-right", children: formatThousandSeparator(totalPrice * (1 - parseInt(diskonGlobal == "" ? 0 : diskonGlobal) / 100) * (parseInt(pajakGlobal) / 100)) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.ListItemSuffix, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.IconButton, { variant: "text", color: "blue-gray", onClick: cancelPajak, children: /* @__PURE__ */ jsxRuntimeExports.jsx(MinusCircleIcon, { className: "h-6 w-6 text-red-500" }) }) })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: `show-all ${itemsCheckout.length < 4 && "hidden"} w-[95%] lg:hidden mx-auto my-2 py-1 px-3 rounded-bl-xl rounded-br-xl bg-light-blue-50 text-gray-700 font-semibold text-center text-sm`,
          onClick: () => setTmpHeight(!tmpHeight),
          children: tmpHeight ? "sembunyikan ..." : "tampilkan semua ..."
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "input-area flex flex-col gap-3 p-2", children: [
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
      ] })
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
            disabled: readonly,
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
  POSCheckout as default
};
