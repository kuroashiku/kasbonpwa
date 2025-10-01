import { Button, Dialog, DialogHeader, DialogBody, DialogFooter, IconButton, List, ListItem,
  ListItemPrefix, ListItemSuffix, Navbar, Option, Switch, Select as SelectTailwind, Typography} from "@material-tailwind/react";
import { useCallback, useContext, useState, useRef, useEffect } from "react";
import { ArrowRightIcon, ChevronLeftIcon, CubeIcon, MinusCircleIcon, ArchiveBoxIcon, FolderMinusIcon, PlusCircleIcon
} from "@heroicons/react/24/outline";
import { AppContext } from "../../AppContext";
import { ItemCheckoutModel } from "../../model/item";
import { draftPos, deleteDraftPos } from "../../api/Pos";
import { formatThousandSeparator, SetItemUnit } from "../../util/formatter";
import { getMatchUnitAndPrice } from "../../util/itemConversion";
import { dictionary } from "../../constant/appDictionary";
import { topic } from "../../constant/appTopics";
import { useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie";
import { IKImage } from "imagekitio-react";
import { IMAGEKIT_URL_ENDPOINT } from "../../constant/appCommon";
import InputNumber from "../../lib/InputNumber";
import InputSimple from "../../lib/InputSimple";
import { getDiscount } from "../../api/Discount";
import { getTax } from "../../api/Tax";
import { getTable, saveTable, deleteTable } from "../../api/Table";
import { getCustomers, saveCustomer } from "../../api/Customer";
import { set } from "date-fns/fp/set";
import Select  from 'react-select';
import makeAnimated from 'react-select/animated';
import { cloneDeep, filter } from "lodash";
export default function POSCheckoutLaundry() {
  const { currency, itemsCheckout, setItemsCheckout, lang, setMoney, setTotalPay, totalPay, pajakGlobal,
    setPajakGlobal, diskonGlobal, setDiskonGlobal, catatanGlobal, setCatatanGlobal, tableGlobal,
    setTableGlobal, cookies, customerGlobal, setCustomerGlobal,semiDesktopMode,pajakGlobalJSON,
    setPajakGlobalJSON, totalPrice, setTotalPrice} = useContext(AppContext);
  const navigate = useNavigate();
  const [readonly, setReadonly] = useState(false);
  const [diskon, setDiskon] = useState(0);
  const [checkoutById, setCheckoutById] = useState({});
  const [checkoutServisById, setCheckoutServisById] = useState({});
  const [diskons, setDiskons] = useState({});
  const [diskonsGlobal, setDiskonsGlobal] = useState({});
  const [taxs, setTaxs] = useState([]);
  const [tables, setTables] = useState({});
  const [isNominal, setIsNominal] = useState(false);
  const [isNominalGlobal, setIsNominalGlobal] = useState(false);
  const [diskonSelect, setDiskonSelect] = useState("");
  const [open, setOpen] = useState(false);
  const [switchValue, setSwitchValue] = useState(false);
  const [switchValueGlobal, setSwitchValueGlobal] = useState(false);
  const [switchValueCustomer, setSwitchValueCustomer] = useState(false);
  const [pajakGlobalId, setPajakGlobalId] = useState("");
  const [totalQty, setTotalQty] = useState(0);
  const [customers, setCustomers] = useState([]);
  const [customerNew, setCustomerNew] = useState("");
  const [tmpHeight, setTmpHeight] = useState(false);
  const [reset, setReset] = useState(false);
  const [disGlobalId, setDisGlobalId] = useState("");
  const [cusGlobalId, setCusGlobalId] = useState("");
  const animatedComponents = makeAnimated();
  const [selectedOption, setSelectedOption] = useState(null);
  function handleOpen(item) {
    setOpen(!open);
    setDiskonSelect(item.diskon==0?"":item.diskon)
  }

  // const takeItem = useCallback(
  //   (item = ItemCheckoutModel()) => {
  //     let foundItem = false;
  //     let _itemsCheckout = itemsCheckout.map((_item) => {
  //       if (_item.itm_id === item.itm_id && _item.konvidx === item.konvidx) {
  //         _item.qty =
  //           Number(_item.pakaistok) == 1
  //             ? Number(_item.stok) - _item.qty > 0
  //               ? _item.qty + 1
  //               : _item.qty
  //             : _item.qty + 1;
  //         foundItem = true;
  //       }
  //       return _item;
  //     });
  //     if (!foundItem) {
  //       item.qty = 1;
  //       _itemsCheckout.push(item);
  //     }
  //     initItems({
  //       pajakGlobal:pajakGlobal,
  //       diskonGlobal:diskonGlobal,
  //       itemsCheckout: _itemsCheckout,
  //     });
  //   },
  //   [itemsCheckout]
  // );
  const takeItem = useCallback(
    (item = ItemCheckoutModel(), service_item) => {
      let foundItem = false;
      let qty_service = 0;
      let _itemsCheckout = itemsCheckout.map((__item) => {
        __item.qty_service = 0;
        __item.service_level_satuan0.map((_item) => {
          if (
            __item.itm_id === item.itm_id &&
            __item.satuan0 === item.satuan0 &&
            _item.service_id === service_item.service_id
          ) {
            _item.service_qty = parseFloat(_item.service_qty) + 1;
          }
          __item.qty_service = __item.qty_service + parseFloat(_item.service_qty);
        });
        __item.service_level_satuan0_str = JSON.stringify(__item.service_level_satuan0);
        return __item;
      });
      initItems({
        pajakGlobal:pajakGlobal,
        diskonGlobal:diskonGlobal,
        itemsCheckout: _itemsCheckout,
      });
    },
    [itemsCheckout]
  );

  const cancelItem = useCallback(
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
        pajakGlobal:pajakGlobal,
        diskonGlobal:diskonGlobal,
        itemsCheckout: _itemsCheckout,
      });
    },
    [itemsCheckout]
  );

  const cancelPajak = (() => {
    setPajakGlobal(0);
    setPajakGlobalId("");
    const initpajak = async () => {
      setTaxs([]);
      const { data, error } = await getTax({
        lok_id: cookies.lok_id,
      });
      if (data.length >= 1) {
        setTaxs(data);
      }
    };
    initpajak();
  });

  const initItems = useCallback(
    //({ diskon = 0, diskonSelect = "", isNominal = false, itemsCheckout = [], diskonGlobal=0, pajakGlobal=0, pajakGlobalJSON={} }) => {
      ({ itemsCheckout = [], diskonGlobal=0, pajakGlobal=0 }) => {
      let _totalQty = 0;
      let _totalPrice = 0;
      // itemsCheckout.forEach((item) => {
      //   //_totalPrice += item.qty * item.total;
      //   _totalPrice += item.qty * item.satuan0hrg * (1 - Number(item.diskon) / 100);
      //   item.total = item.qty * item.satuan0hrg * (1 - Number(item.diskon) / 100);
      //   _totalQty += item.qty;
      // });
      itemsCheckout.forEach((item) => {
        item.service_level_satuan0.forEach((newitem) => {
          _totalPrice += newitem.service_qty * newitem.service_hrg * (1 - Number(newitem.service_diskon) / 100);
          newitem.service_total = newitem.service_qty * newitem.service_hrg * (1 - Number(newitem.service_diskon)/ 100);
          _totalQty += parseFloat(newitem.service_qty);
        });
      });
      setTotalPrice(_totalPrice);
      setTotalQty(_totalQty);
      setItemsCheckout(itemsCheckout);
      //setPajakGlobalId(pajakGlobalJSON)
      
      const _totalAllPrice =
        //_totalPrice * (1 - parseInt(diskonGlobal) / 100) + _totalPrice * (parseInt(pajakGlobal) / 100);
        _totalPrice * (1 - parseInt(diskonGlobal==""?0:diskonGlobal) / 100) + ((_totalPrice * (1 - parseInt(diskonGlobal==""?0:diskonGlobal) / 100)) * (parseInt(pajakGlobal) / 100));
      setTotalPay(_totalAllPrice);
    },
    //[checkoutById, diskon, diskonSelect, diskonGlobal, pajakGlobal, pajakGlobalJSON]
    [checkoutById, diskonGlobal, pajakGlobal]
  );

  useEffect(() => {
    let _isNominal = false;
    const initdiskon = async () => {
      setDiskons([]);
      const { data, error } = await getDiscount({
        lok_id: cookies.lok_id,
        dis_global: "all",
      });
      if (data.length >= 1) {
        let cekDiskonGlobal = data.filter(function (object) {
          return object.dis_global === "true";
        });
        let cekDiskonGlobalNew = data.filter(function (object) {
          return object.dis_global !== "true";
        });
        if (cekDiskonGlobal.length>0) {
          setSwitchValueGlobal(true);
          setDiskonsGlobal(cekDiskonGlobal);
          setDiskonGlobal('');
        }
        else{
          setDiskonGlobal(0);
        }
        if (cekDiskonGlobalNew.length>0) {
          _isNominal = true;
          setDiskons(cekDiskonGlobalNew);
          setSwitchValue(true);
        }
        else{
          setIsNominal(true)
        }
      }
      else{
        setDiskonGlobal(0);
      }
    };
    const initpajak = async () => {
      setTaxs([]);
      const { data, error } = await getTax({
        lok_id: cookies.lok_id,
      });
      if (data) {
        setTaxs(data);
      }
    };
    const inittable = async () => {
      setTables([]);
      const { data, error } = await getTable({
        lok_id: cookies.lok_id,
        //mej_status: 'Kosong'
      });
      if (data) {
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
      itemsCheckout,
    });
    if(pajakGlobalJSON.paj_id){
      setPajakGlobalId(pajakGlobalJSON.paj_id)
    }
    
  }, [reset]);

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
      diskonGlobal: diskonGlobal,
      pajakGlobal:pajakGlobal,
      itemsCheckout: _itemsCheckout,
    });
  };

  const handleDiskonSelect = (value) => {
    // const diskonVal = value;
    // setDiskon(diskonVal);
    // let _itemsCheckout = itemsCheckout.map((_item) => {
    //   if (_item.itm_id === checkoutById.itm_id && _item.konvidx === checkoutById.konvidx) {
    //       _item.diskon = Number(diskonVal);
    //   }
    //   return _item;
    // });
    const _diskons = cloneDeep(diskons);
    let getValue = _diskons.filter(function (object) {
      return object.dis_id === parseInt(value);
    });
    setDiskon(getValue[0].dis_value);
    let _itemsCheckout = itemsCheckout.map((_item) => {
      _item.service_level_satuan0.map((__item,index) => {
        if (_item.itm_id === checkoutById.itm_id && _item.satuan0 === checkoutById.satuan0 && __item.service_id === checkoutServisById.service_id) {
            __item.service_diskon = Number(getValue[0].dis_value);
        }
      })
      // if (_item.itm_id === checkoutById.itm_id && _item.satuan0 === checkoutById.satuan0) {
      //     _item.diskon = Number(getValue[0].dis_value);
      // }
      return _item;
    });
    console.log(_itemsCheckout)
    // initItems({
    //   diskonGlobal: getValue[0].paj_value,
    //   pajakGlobal: pajakGlobal,
    //   pajakGlobalJSON:getValue[0],
    //   itemsCheckout: itemsCheckout,
    // });
    initItems({
      diskonGlobal: diskonGlobal,
      pajakGlobal:pajakGlobal,
      itemsCheckout: _itemsCheckout,
    });
  };

  const handleClear = () => {
    setPajakGlobal(0);
    setPajakGlobalId("");
    setCustomerGlobal("");
    setDiskonGlobal("");
    setTableGlobal("");
    setPajakGlobalJSON([]);
    setCatatanGlobal("");
    setReset(!reset);
  };

  const handlePajakGlobal = (value) => {
    let getValue = taxs.filter(function (object) {
      return object.paj_id === parseInt(value);
    });
    setPajakGlobal(getValue[0].paj_value);
    setPajakGlobalJSON(getValue[0]);
    initItems({
      diskonGlobal: diskonGlobal,
      pajakGlobal: getValue[0].paj_value,
      pajakGlobalJSON:getValue[0],
      itemsCheckout: itemsCheckout,
    });
  };
  const handleDiskonGlobalInput = (value) => {
    setDiskonGlobal(value.target.value);
    // const _diskons = cloneDeep(diskonsGlobal);
    // let getValue = _diskons.filter(function (object) {
    //   return object.dis_id === value;
    // });
    // setDiskonGlobal(getValue[0].dis_value);
    // //setPajakGlobalJSON(getValue[0]);
    initItems({
      diskonGlobal: value.target.value,
      pajakGlobal: pajakGlobal,
      //pajakGlobalJSON:getValue[0],
      itemsCheckout: itemsCheckout,
    });
  };
  const handleDiskonGlobal = (value) => {
    const _diskons = cloneDeep(diskonsGlobal);
    let getValue = _diskons.filter(function (object) {
      return object.dis_id === parseInt(value);
    });
    setDiskonGlobal(getValue[0].dis_value);
    //setPajakGlobalJSON(getValue[0]);
    initItems({
      diskonGlobal: getValue[0].dis_value,
      pajakGlobal: pajakGlobal,
      //pajakGlobalJSON:getValue[0],
      itemsCheckout: itemsCheckout,
    });
  };
  const handleCustomer = (value) => {
    const _customer = cloneDeep(customers);
    let getValue = _customer.filter(function (object) {
      return object.cus_id === parseInt(value);
    });
    setCustomerGlobal(getValue[0].cus_id);
    //setPajakGlobalJSON(getValue[0]);
    initItems({
      diskonGlobal: diskonGlobal,
      pajakGlobal: pajakGlobal,
      //pajakGlobalJSON:getValue[0],
      itemsCheckout: itemsCheckout,
    });
  };

  // const handleDiskonGlobal = (evt) => {
  //   setDiskonGlobal(evt.target.value);
  //   initItems({
  //     pajakGlobal:pajakGlobal,
  //     diskonGlobal: evt.target.value,
  //     itemsCheckout: itemsCheckout,
  //   });
  // };

  const handleCatatanGlobal = (evt) => {
    setCatatanGlobal(evt.target.value);
  };

  const handleDraft = useCallback(async () => {
    let filterProps = {};
    const _newitemsCheckout = cloneDeep(itemsCheckout);
    const _itemsCheckout = _newitemsCheckout.map((_item) => {
      _item.service_level_satuan0=JSON.stringify(_item.service_level_satuan0);
      _item.service_level=JSON.stringify(_item.service_level);
      return _item;
    });
    if (tableGlobal != ""&&cookies.lok_type=="resto"&&parseInt(cookies.resto_type)==2) {
      filterProps = {
        mej_id_new: parseInt(tableGlobal),
        resto_type: parseInt(cookies.resto_type),
        lok_type: cookies.lok_type,
      };
    }
    else if(tableGlobal != ""&&cookies.lok_type=="resto"&&parseInt(cookies.resto_type)==1)
      alert("Mode 'Resto Bayar Langsung', status meja tidak akan berubah saat draft. Switch ke mode 'Resto Bayar Setelah Makan' untuk melanjutkan")
    if (customerNew != "") {
      const initcustomer = async () => {
        const { data, error } = await saveCustomer({
          cus_id: -1,
          cus_com_id: cookies.com_id,
          cus_nama: customerNew,
          cus_wa: "",
        });
        if (!error) {
          setCustomerGlobal(data.cus_id);
        }
      };
      initcustomer();
    }
    if (itemsCheckout[0].dot_id != 0) {
      const init = async () => {
        const { data, error } = await deleteDraftPos({ dot_id: parseInt(itemsCheckout[0].dot_id) });
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
      diskon: diskonGlobal==""?0:diskonGlobal,
      disnom: 0,
      mej_id: tableGlobal == "" ? 0 : parseInt(tableGlobal),
      pajak: pajakGlobal,
      pajak_json:JSON.stringify(pajakGlobalJSON),
      ...filterProps,
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
  }, [itemsCheckout, tableGlobal, customerGlobal,pajakGlobal,diskonGlobal,pajakGlobalJSON]);

  const handletes = (value, item, index, indexi) => {
      const _itemsCheckout = cloneDeep(itemsCheckout);
      setSelectedOption(value)
      let _service_level = item.service_level.filter(function (object) {
        return object.level === value.level;
      });
      _itemsCheckout[index].service_level_satuan0[indexi].service_hrg = value.hrg;
      _itemsCheckout[index].service_level_satuan0[indexi].service_nama = value.level;
      _itemsCheckout[index].service_level_satuan0[indexi].service_total =
        _itemsCheckout[index].service_level_satuan0[indexi].service_hrg *
        _itemsCheckout[index].service_level_satuan0[indexi].service_qty;
      _itemsCheckout[index].service_level_satuan0_str = JSON.stringify(_itemsCheckout[index].service_level_satuan0);
      
      console.log(_itemsCheckout);
      initItems({
        pajakGlobal:pajakGlobal,
        diskonGlobal: diskonGlobal,
        itemsCheckout: _itemsCheckout,
      });
    };

  const handleCustomerNew = (evt) => {
    setCustomerNew(evt.target.value);
  };
  const addItem = useCallback(
      (item = ItemCheckoutModel(), index) => {
        const _itemsCheckout = cloneDeep(itemsCheckout);
        const level = item.service_level_satuan0;
        console.log(itemsCheckout)
        level.push(
          JSON.parse(
            '{"service_id":"' +
              (item.service_level_satuan0.length + 1) +
              '","service_itm_id":"' +
              item.itm_id +
              '","service_nama":"' +
              (item.service_level&&item.service_level.length>0 ? item.service_level[0].level : "") +
              '","service_qty":"1","service_diskon":"0","service_hrg":"' +
              (item.service_level&&item.service_level.length>0 ? item.service_level[0].hrg : item.satuan0) +
              '","service_total":"' +
              (item.service_level&&item.service_level.length>0 ? item.service_level[0].hrg * item.qty : item.satuan0hrg * item.qty) +
              '"}'
          )
        );
        _itemsCheckout[index].service_level_satuan0 = level;
        _itemsCheckout[index].qty_service = _itemsCheckout[index].qty_service + 1;
        _itemsCheckout[index].service_level_satuan0_str = JSON.stringify(_itemsCheckout[index].service_level_satuan0);
        initItems({
          itemsCheckout: _itemsCheckout,
        });
      },
      [itemsCheckout]
    );
  const handleCalculator = useCallback(() => {
    console.log(itemsCheckout)
    if (customerNew != "") {
      const initcustomer = async () => {
        const { data, error } = await saveCustomer({
          cus_id: -1,
          cus_com_id: cookies.com_id,
          cus_nama: customerNew,
          cus_wa: "",
        });
        if (!error) {
          setCustomerGlobal(data.cus_id);
        }
      };
      initcustomer();
    }
    if(diskonGlobal=='')
      setDiskonGlobal(0);
    if(switchValueCustomer&&customerNew == ""){
      alert('Mode kustomer baru sedang aktif, mohon lengkapi nama pelanggan atau nonaktifkan mode')
    }
    else{
    cookies.role_update.length==0&&cookies.role_dst.length==0?navigate(topic.cashier.calculator.route):(
      (cookies.role_dst.findIndex(a=>a=='ALL')>=0?
      navigate(topic.cashier.calculator.route):(cookies.role_update.findIndex(a=>a=='POS')>= 0?
      navigate(topic.cashier.calculator.route):null))
    )
    }
    
  }, [customerNew,itemsCheckout,diskonGlobal,switchValueCustomer]);

  if (!itemsCheckout || !itemsCheckout[0]) {
    return (
      <div className="h-screen-adapt flex flex-col justify-center">
        <div className="mx-auto mb-6">{dictionary.cashier.checkout.noItems[lang]}</div>
        <div className="mx-auto">
          <Button color="teal" size="lg" onClick={() => navigate(topic.cashier.route)}>
            {dictionary.cashier.checkout.back[lang]}
          </Button>
        </div>
      </div>
    );
  }

  const ActionButton = () => {
    return (
      <div
        className={`action-area flex gap-2 ${
          semiDesktopMode 
            ? "fixed bottom-3 inset-x-4 max-w-[50%] mx-auto" 
            : "w-full my-6"
        }`}
        >
        <Button
          size="lg"
          variant="outlined"
          color="green"
          className="relative bg-white w-[20%] max-w-[60px]"
          onClick={() => handleDraft()}
        >
          <span className="absolute text-[10px] top-[0%] left-1/2 -translate-x-1/2">Draft</span>
          <span className="absolute left-1/2 top-[85%] -translate-x-1/2 -translate-y-[85%] transition-colors">
            <ArchiveBoxIcon className="w-7 h-7" />
          </span>
        </Button>
        <Button
          size="lg"
          variant="outlined"
          color="red"
          className="relative bg-white w-[20%] max-w-[60px]"
          onClick={() => handleClear()}
        >
          <span className="absolute text-[10px] top-[0%] left-1/2 -translate-x-1/2">Clear</span>
          <span className="absolute left-1/2 top-[85%] -translate-x-1/2 -translate-y-[85%] transition-colors">
            <FolderMinusIcon className="w-7 h-7" />
          </span>
        </Button>
        <Button
          size="lg"
          variant="gradient"
          color="green"
          className="group w-full relative flex items-center gap-3 overflow-hidden pr-[60px] pl-3 mx-auto"
          onClick={handleCalculator}
        >
          <span className="flex-grow text-left">{totalQty} item</span>
          <span>
            <div className="text-sm text-right">
              {currency} {formatThousandSeparator(totalPrice)}
              {/* {currency} {formatThousandSeparator(totalPrice + totalPrice * (parseInt(pajakGlobal) / 100))} */}
            </div>
            <div style={{fontSize:11}}>
            
              {/* {Number(diskonGlobal) <= 0
                ? ""
                : ` (Disc ${Number(diskonGlobal)}% : ${currency} ${formatThousandSeparator(
                    totalPrice * (1 - parseInt(diskonGlobal) / 100) + totalPrice * (parseInt(pajakGlobal) / 100)
                  )})`} */}
              {Number(diskonGlobal) <= 0
              ? ""
              : ` (Disc ${Number(diskonGlobal)}% : ${currency} ${formatThousandSeparator(
                  totalPrice * (1 - parseInt(diskonGlobal) / 100)
                )})`}
            </div>
            <div style={{fontSize:11}}>
              {/* {Number(diskonGlobal) <= 0
                ? ""
                : ` (Disc ${Number(diskonGlobal)}% : ${currency} ${formatThousandSeparator(
                    totalPrice * (1 - parseInt(diskonGlobal) / 100) + totalPrice * (parseInt(pajakGlobal) / 100)
                  )})`} */}
              {Number(pajakGlobal) <= 0
              ? ""
              : `(+${pajakGlobalJSON?.paj_nama ?? ""} ${Number(pajakGlobal)}% : ${currency} ${formatThousandSeparator(totalPay)})`}
            </div>
          </span>
          <span className="absolute right-0 grid h-full w-12 place-items-center bg-green-500 transition-colors group-hover:bg-green-600">
            <ArrowRightIcon className="w-5 h-5" />
          </span>
          {/* <span className="absolute right-0 grid h-full w-12 place-items-center bg-teal-500 transition-colors group-hover:bg-teal-600">
            <ArrowRightIcon className="w-5 h-5" />
          </span> */}
        </Button>
      </div>
    );
  };
  let newindex = 0;
  return (
    <div className="h-screen-adapt bg-gray-50 overflow-hidden relative">
      <div className="p-2 top-0 inset-x-0 fixed z-10 mx-auto desktop:max-w-[60%]">
        <div className="top-0 inset-x-0 fixed bg-gradient-to-b from-gray-50 h-20" />
        <Navbar className="px-2 py-3 relative" blurred={false}>
          <div className="flex items-center">
            <IconButton variant="text" size="md" onClick={() => navigate(topic.cashier.route)}>
              <ChevronLeftIcon className="h-6 w-6 stroke-2" />
            </IconButton>
            <div className="mx-2 flex-grow">
              <Typography color="gray" variant="h5">
                {dictionary.cashier.checkout.title[lang]}
              </Typography>
            </div>
          </div>
        </Navbar>
      </div>

      <div className="h-full mx-auto px-2 py-20 overflow-y-auto">
        <List
          className={`item-list ${
            tmpHeight ? "" : "mobile:max-h-[350px] overflow-y-auto"
          } lg:h-full lg:overflow-y-auto divide-y divide-dashed divide-gray-400`}
        >
          {itemsCheckout.map((i, index) => {
            return (
              <div key={`checkout-${i.service_itm_id || index}`}>
                {i.service_level_satuan0.map((ii, indexi) => {
                  const image = i.itm_urlimage0;
                  const unit = i.satuan0;
                  const price = ii.service_hrg;
                  const pricecut = ii.service_hrg * (1 - parseInt(ii.service_diskon) / 100);

                  return (
                    <div className="min-h-[88px] lg:min-h-[80px] bg-light-blue-50" key={`${index}-${indexi}`}>
                      <ListItem>
                        <ListItemPrefix className="mr-2">
                          <div className="rounded-full bg-gray-50 w-12 h-12 overflow-hidden">
                            {!image ? (
                              <CubeIcon className="h-7 w-7 mx-auto my-2.5" />
                            ) : (
                              <IKImage
                                urlEndpoint={IMAGEKIT_URL_ENDPOINT}
                                path={image}
                                transformation={[
                                  {
                                    height: "100",
                                    width: "100",
                                  },
                                ]}
                                className="object-contain"
                                loading="lazy"
                              />
                            )}
                          </div>
                        </ListItemPrefix>

                        <div
                          className="w-[100%] flex flex-col gap-1"
                          onClick={() => takeItem(i, ii)}
                          onContextMenu={() => {
                            // setOpen(true);
                            handleOpen(i)
                            setCheckoutById(i);
                            setCheckoutServisById(ii);
                          }}
                          // onContextMenu={(evt)=>{
                          //     evt.preventDefault();
                          //     handleCollapse(i);
                          // }}
                        >
                          <div className="w-[90%] text-[14px] whitespace-nowrap overflow-hidden text-ellipsis font-semibold">
                            {i.itm_nama}
                          </div>

                          <div className="flex items-center gap-1">
                            <div className="w-max py-[2px] px-2 text-[12px] font-semibold bg-yellow-100 rounded-md">
                              {i.kode}
                            </div>
                            <div className="w-max py-[2px] px-2 text-[12px] font-semibold bg-purple-50 rounded-md">
                              {SetItemUnit(unit.toUpperCase())}
                            </div>
                          </div>

                          <div className="w-max py-[2px] px-2 text-[12px] font-semibold bg-green-100 rounded-md">
                            <div className="text-right">
                              {`${ii.service_qty}x`}{" "}
                              {formatThousandSeparator(price)}
                            </div>
                            <div className="text-xs">
                              {Number(ii.service_diskon) <= 0
                                ? ""
                                : ` (Disc ${Number(ii.service_diskon)}% : ${currency} ${formatThousandSeparator(pricecut)}) `}
                            </div>
                          </div>
                        </div>
                        <ListItemSuffix>
                          <IconButton
                            variant="text"
                            //className="w-8 h-8 bg-green-300 focus:bg-green-300 hover:bg-green-300 active:bg-green-300"
                            onClick={() => addItem(i, index)}
                          >
                            <PlusCircleIcon className="h-6 w-6 text-green-500" />
                          </IconButton>
                          <IconButton variant="text" color="blue-gray" onClick={() => cancelItem(i)}>
                            <MinusCircleIcon className="h-6 w-6 text-red-500" />
                          </IconButton>
                        </ListItemSuffix>
                      </ListItem>
                      {i.service_level[0] ? (
                        <div
                          className={`px-3 pb-3`}
                          //style={{ top: checkHeight[newindex] + "px", left: checkWidth + "px" }}
                        >
                          <Select
                            menuPortalTarget={document.body} 
                            menuPosition="fixed"
                            styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                            value={{level:ii.service_nama,hrg:ii.service_hrg}}
                            onChange={(value) => {
                              handletes(value, i, index, indexi);
                            }}
                            options={i.service_level}
                            getOptionLabel={(funCodes) => funCodes.level}
                            getOptionValue={(funCodes) => funCodes.level}
                          />
                        </div>
                      ) : null}
                      
                    </div>
                  );
                })}
                
              </div>
            );
          })}

          {pajakGlobal == 0 ? null : (
            <ListItem className="">
              <div className="grid grid-cols-2 gap-2 p-1 w-full">
                <div className="col-span-2 text-">
                  <b>{pajakGlobalJSON.paj_nama}</b>
                </div>
                <div className="">{`${pajakGlobal}%`}</div>
                <div className="text-right">{formatThousandSeparator(((totalPrice * (1 - parseInt(diskonGlobal==""?0:diskonGlobal) / 100)) * (parseInt(pajakGlobal) / 100)))}</div>
              </div>
              <ListItemSuffix>
                <IconButton variant="text" color="blue-gray" onClick={cancelPajak}>
                  <MinusCircleIcon className="h-6 w-6 text-red-500" />
                </IconButton>
              </ListItemSuffix>
            </ListItem>
          )}
        </List>

        <div
          className={`show-all ${
            itemsCheckout.length < 4 && "hidden"
          } w-[95%] lg:hidden mx-auto my-2 py-1 px-3 rounded-bl-xl rounded-br-xl bg-light-blue-50 text-gray-700 font-semibold text-center text-sm`}
          onClick={() => setTmpHeight(!tmpHeight)}
        >
          {tmpHeight ? "sembunyikan ..." : "tampilkan semua ..."}
        </div>

        <div className="input-area flex flex-col gap-3 p-2">
          <div className="Input-Item Pajak">
            {!taxs.length ? (
              <InputNumber label={dictionary.setting.tax.sidebar[lang]} disabled={true} />
            ) : (
              <SelectTailwind
                className="h-10 min-w-[200px]"
                value={`${pajakGlobalId}`}
                onChange={handlePajakGlobal}
                color="teal"
                label={dictionary.setting.tax.sidebar[lang]}
              >
                {taxs.map((p) => (
                  <Option value={String(p.paj_id)} key={p.paj_id}>
                    {p.paj_nama}
                  </Option>
                ))}
              </SelectTailwind>
            )}
          </div>

          <div className="Input-Item Catatan">
            <InputSimple
              value={catatanGlobal}
              label={dictionary.stock.uom.note[lang]}
              onChange={(evt) => {
                evt.preventDefault();
                handleCatatanGlobal(evt);
              }}
            />
          </div>

          <div className="flex gap-2 items-center justify-between">
            <div className="Input-Item Diskon-Global w-[80%] lg:w-[80%]">
              {!isNominalGlobal ? (
                <InputNumber
                  value={diskonGlobal}
                  label={dictionary.setting.discountglobal.sidebar[lang]}
                  onChange={(evt) => {
                    evt.preventDefault();
                    handleDiskonGlobalInput(evt);
                  }}
                  icon="%"
                />
              ) : (
                <>
                  {!diskonsGlobal.length ? (
                    <InputNumber label={dictionary.setting.discountglobal.sidebar[lang]} disabled={true} />
                  ) : (
                    <SelectTailwind
                      className="h-10"
                      id="customer"
                      value={`${disGlobalId}`}
                      onChange={handleDiskonGlobal}
                      color="teal"
                      label={dictionary.choose.discount[lang]}
                    >
                      {diskonsGlobal.map((p) => (
                        <Option value={String(p.dis_id)} key={p.dis_id}>
                          {p.dis_nama}
                        </Option>
                      ))}
                    </SelectTailwind>
                  )}
                </>
              )}
            </div>

            <div className="Input-Item Mode-Persentase h-[40px] w-[30%] lg:w-[20%] pr-2">
              <div className="text-[10px] text-gray-700 text-end mb-[2px]">{dictionary.universal.percent[lang]} (%)</div>
              <div className="flex justify-end">
                {!switchValueGlobal ? (
                  <Switch value={false} color="light-blue" defaultChecked disabled={true} />
                ) : (
                  <Switch color="light-blue" onChange={() => setIsNominalGlobal(!isNominalGlobal)} />
                )}
              </div>
            </div>
          </div>

          <div className="flex gap-2 items-center justify-between">
            <div className="Input-Item Customer-Name w-[80%] lg:w-[80%]">
              {switchValueCustomer ? (
                <InputSimple
                  value={customerNew}
                  label={dictionary.new.customer[lang]}
                  onChange={(evt) => {
                    evt.preventDefault();
                    handleCustomerNew(evt);
                  }}
                />
              ) : (
                <>
                  {!customers.length ? (
                    <InputNumber label={dictionary.customer.sidebar[lang]} disabled={true} />
                  ) : (
                    <SelectTailwind
                      id="customer"
                      value={`${cusGlobalId}`}
                      onChange={handleCustomer}
                      color="teal"
                      label={dictionary.choose.customer[lang]}
                    >
                      {customers.map((p) => (
                        <Option value={String(p.cus_id)} key={p.cus_id}>
                          {p.cus_nama}
                        </Option>
                      ))}
                    </SelectTailwind>
                  )}
                </>
              )}
            </div>

            <div className="Input-Item Customer-Mode h-[40px] w-[30%] lg:w-[20%] pr-2">
              <div className="text-[10px] text-gray-700 text-end mb-[2px]">{dictionary.new.new[lang]}</div>
              <div className="flex justify-end">
                <Switch color="light-blue" onChange={() => setSwitchValueCustomer(!switchValueCustomer)} />
              </div>
            </div>
          </div>

          {cookies.lok_type == "resto" && (
            <div className="Input-Item Meja">
              {!tables.length ? (
                <InputNumber label={dictionary.table.sidebar[lang]} disabled={true} />
              ) : (
                <SelectTailwind
                  className="h-10"
                  id="table"
                  value={`${tableGlobal}`}
                  onChange={setTableGlobal}
                  color="teal"
                  label={dictionary.table.sidebar[lang]}
                >
                  {tables.map((p) => (
                    <Option
                      disabled={p.mej_status == "Terisi" ? true : false}
                      value={p.mej_id}
                      key={p.mej_id}
                    >{`${p.mej_nama}`}</Option>
                  ))}
                </SelectTailwind>
              )}
            </div>
          )}

          <ActionButton mobile={false} />
        </div>
      </div>

      <Dialog open={open} handler={handleOpen} size="md">
        <DialogHeader className="border-b-2">{dictionary.setting.discount.sidebar[lang]}</DialogHeader>
        <DialogBody className="overflow-auto pb-10">
          <div className="grid grid-cols-5 gap-6 p-2 h-32">
            <div className="col-span-3">
              {isNominal ? (
                <InputNumber
                  value={diskon}
                  label={dictionary.setting.discount.sidebar[lang]}
                  onChange={(evt) => {
                    evt.preventDefault();
                    handleDiskonInput(evt);
                  }}
                  disabled={readonly}
                  icon="%"
                />
              ) : (
                <div>
                  {!diskons.length ? (
                    <InputNumber label={dictionary.setting.discount.sidebar[lang]} disabled={true} />
                  ) : (
                    <SelectTailwind
                      className="h-10"
                      id="diskon"
                      value={`${diskonSelect}`}
                      onChange={handleDiskonSelect}
                      color="teal"
                      label={dictionary.setting.discount.sidebar[lang]}
                    >
                      {diskons.map((p) => (
                        <Option value={String(p.dis_id)} key={p.dis_id}>
                          {p.dis_nama}
                        </Option>
                      ))}
                    </SelectTailwind>
                  )}
                </div>
              )}
            </div>
            <div className="col-span-2">
              <div className="text-xs ml-2 text-center">{dictionary.universal.percentagemode[lang]}</div>
              <div className="flex justify-center">
                {!switchValue ? (
                  <Switch color="teal" defaultChecked disabled={true} />
                ) : (
                  <Switch color="teal" onChange={() => setIsNominal(!isNominal)} />
                )}
              </div>
            </div>
          </div>
        </DialogBody>
        <DialogFooter className="border-t-2">
          <Button variant="gradient" color="red" onClick={() => setOpen(false)} className="mr-1">
            <span>{dictionary.universal.back[lang]}</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}
