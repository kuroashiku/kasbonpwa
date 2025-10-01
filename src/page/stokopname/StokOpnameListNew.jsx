import { Fragment, useCallback, useContext, useEffect, useRef, useState } from "react";
import { getItems, saveItem, deleteItem, categoriesItem, getBoms, saveBom, deleteBom, getRak, saveRak, deleteRak } from "../../api/Item";
import { AppContext } from "../../AppContext";
import { Button, Tabs, TabsHeader, TabPanel, Tab, TabsBody, Dialog, DialogHeader, DialogBody, DialogFooter, IconButton, Input, List, ListItem, Navbar, Option, Switch, Select, Spinner, Typography, } from "@material-tailwind/react"; 
import SearchNavbar from "../../lib/SearchNavbar"; 
import { CubeIcon, AdjustmentsVerticalIcon, Bars3Icon,CheckIcon , TrashIcon, PlusIcon, PlusCircleIcon, PrinterIcon, InboxStackIcon, XMarkIcon  } from "@heroicons/react/24/outline";
import FilterChips from "../../lib/FilterChips";
import { ItemListModel } from "../../model/item";
import { dictionary } from "../../constant/appDictionary";
import { formatSentenceCase } from "../../util/formatter";
import LoadingOverlay from "../../lib/LoadingOverlay";
import { TIME_SEARCH_DEBOUNCE } from "../../constant/appCommon";
import StokOpnameScrollMd from "./StokOpnameScrollMd";
import StokOpnameScrollSm from "./StokOpnameScrollSm";
import InputSimple from "../../lib/InputSimple";
import InputMoney from "../../lib/InputMoney";
import InputNumber from "../../lib/InputNumber";
import ImageUpload from "../../lib/ImageUpload";
import ItemFilter from "../item/ItemFilter";
import { cloneDeep } from "lodash";
import { saveStokOpname, getStokOpname } from "../../api/StokOpname";
import { FilterItemModel } from "../../model/filter";
import { convertItemListToCheckout } from "../../model/item";
import { formatThousandSeparator } from "../../util/formatter";
import { IKImage } from "imagekitio-react";
import { IMAGEKIT_URL_ENDPOINT } from "../../constant/appCommon";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import * as XLSX from "xlsx";
import Barcode from "react-barcode";
import { useReactToPrint } from "react-to-print";
import excellogo from "../../assets/icons/excel-logo.png";
import panduanxls from "../../assets/image/Itemimport.png";
import InputDialog from "../../lib/InputDialog";
import QRCode from "react-qr-code";
import { DayPicker } from 'react-day-picker';
import ThermalPrinterEncoder from "thermal-printer-encoder";
import { format } from "date-fns";
import { PRINTER_STATE_NONE,PRINTER_STATE_SKIP } from "../../constant/appCommon";
export default function StokOpnameListNew() {
  const { setMenuOpen, filters, semiDesktopMode, initPrinterBT, desktopMode, setFilters, 
    lang, currency, cookies, rowsPerPage, printerState, setPrinterState, printerLoading,
    initPrinterUSB, print } =
    useContext(AppContext);
  const [listPadding, setListPadding] = useState("20px");
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([ItemListModel()]);
  const [rakitems, setRakitems] = useState([]);
  const [fullitems, setfullItems] = useState([ItemListModel()]);
  const [newItems, setNewItems] = useState([ItemListModel()]);
  const [newcodeItems, setNewcodeItems] = useState([ItemListModel()]);
  const [allItmId, setAllItmId] = useState([]);
  const [itemDisplay, setItemDisplay] = useState(ItemListModel());
  const navbarRef = useRef();
  const [open, setOpen] = useState(false);
  const [newOpen, setNewOpen] = useState(false);
  const [readonly, setReadonly] = useState(false);
  const [itemById, setItemById] = useState({});
  const [itemCheckId, setItemCheckId] = useState([]);
  const [itemPrintId, setItemPrintId] = useState([]);
  const [itemCheckName, setItemCheckName] = useState([]);
  const [txtTitle, settxtTitle] = useState("");
  const [mode, setMode] = useState(0);
  // const [bomread, setBomread] = useState(false)
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);
  const [openFilter, setOpenFilter] = useState(false);
  const [clearFilter, setClearFilter] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoriesFilter, setCategoriesFilter] = useState([]);
  const [switchValueCategory, setSwitchValueCategory] = useState(false);
  const [refreshKategori, setRefreshKategori] = useState(false);
  const [categorySelect, setCategorySelect] = useState("");
  const [openBom, setOpenBom] = useState(false);
  const [bomList, setBomList] = useState([]);
  const [bomById, setBomById] = useState({});
  const [openBomAdd, setOpenBomAdd] = useState(false);
  const [openImport, setOpenImport] = useState(false);
  const [openPrint, setOpenPrint] = useState(false);
  const [bomItems, setBomItems] = useState([ItemListModel()]);
  const [keywordItem, setKeywordItem] = useState("");
  const [bomItmNama, setBomItmNama] = useState("");
  const [pageItem, setPageItem] = useState(1);
  const [openInput, setOpenInput] = useState(false);
  const [qty, setQty] = useState(1);
  const [qtyTemp, setQtyTemp] = useState(1);
  const [refreshflag, setRefreshflag] = useState(false);
  const [services, setServices] = useState([]);
  const [checkcode, setCheckcode] = useState(0);
  const [checkedSellable, setCheckedSellable] = useState(false);
  const [checkedBuyable, setCheckedBuyable] = useState(false);
  const [checkedPakaistok, setCheckedPakaistok] = useState(false);
  const [dataxls, setDataxls] = useState(null);
  const [qrcodebarcode, setQrcodebarcode] = useState(false);
  const [checkedImport, setCheckedImport] = useState(true);
  const [checkedAllPrint, setCheckedAllPrint] = useState(false);
  const [printerReady, setPrinterReady] = useState(false);
  const [printFlag, setPrintFlag] = useState(false);
  const [openPrinter, setOpenPrinter] = useState(false);
  const [openRak, setOpenRak] = useState(false);
  const[currentTab, setCurrentTab] = useState("unit-1");
  const [services_1, setServices_1] = useState([]);
  const [services_2, setServices_2] = useState([]);
  const [services_3, setServices_3] = useState([]);
  const [activeTab, setActiveTab] = useState("unit-1");
  const [data, setData] = useState([]);
  const [pakaistok, setPakaistok] = useState([
    { pak_id: 1, pak_nama: "Pakai Stok", pak_value: 1 },
    { pak_id: 2, pak_nama: "Tidak Pakai Stok", pak_value: 0 },
  ]);
  const [selectedItem, setSelectedItem] = useState(ItemListModel());
  const [submitCount, setSubmitCount] = useState(0);
  const [closeDialog, setCloseDialog] = useState(false);
  const [pakaistoknew, setpakaistoknew] = useState(null);
  const handleFilter = (searchKey) => {
    setKeyword(searchKey);
  };
  const openDrawerRight = () => setOpenFilter(true);
  const handleFilterItem = (searchKey) => {
    setKeywordItem(searchKey);
  };
  const contentRef = useRef(null);
  //////////////////////////mulaikoding///////////////////
  
  const initData = useCallback(() => {
    const _categoryFilter = filters.find((f) => f.key === "category");
    const _categories = [];
    const _filters = cloneDeep(filters);
    let _newfilter = _filters.filter(function (object) {
      return object.key === "category";
    });
    let filterProps = {};
    let strcategory = "";
    _newfilter.map((i, index) => {
      strcategory =
        strcategory + (i.value == "TANPA KATEGORI" ? " itm_kategori IS NULL OR" : ' itm_kategori="' + i.value + '" OR');
    });
    if (_categoryFilter) {
      filterProps = {
        category: strcategory.slice(0, -2),
      };
    }
    if (keyword && keyword.length > 1) {
      const orderSearch = setTimeout(async () => {
        // setPage(1);
        setLoading(true);
        const { data, error } = await getStokOpname({
          lok_id: cookies.lok_id,
          key_val: keyword,
          page: page,
          rows: rowsPerPage,
          ...filterProps,
        });
        if (page <= 1) handleResponse({ data, error });
        else handleAppendResponse({ data, error });
        setLoading(false);
        console.log("ada keyword");
      }, TIME_SEARCH_DEBOUNCE);
      return () => {
        clearTimeout(orderSearch);
      };
    } else if (!keyword) {
      const init = async () => {
        // setItems([]);
        setLoading(true);
        // setPage(1);
        const { data, error } = await getStokOpname({
          lok_id: cookies.lok_id,
          page: page,
          rows: rowsPerPage,
          ...filterProps,
        });
        if (page <= 1) handleResponse({ data, error });
        else handleAppendResponse({ data, error });
        setLoading(false);
      };
      init();
    }
  }, [keyword, filters, page]);

  useEffect(() => {
    if (page > 1) initData();
  }, [page]);

  useEffect(() => {
    setItems([]);
    setPage(1);
    setTimeout(() => initData(), 100);
  }, [keyword, filters, refreshflag]);

  const handleResponse = ({ data, error }) => {
    if (error) {
      alert(dictionary.universal.erroroccured[lang]);
    } else {
      setNewItems(data);
      setItems(data);
      data.map((i, index) => {
        let strnew=JSON.stringify(i);
      });
    }
  };
  const handleChange = (evt, id) => {
    let value = evt.target.value;
    // if (id == "itm_satuan1" || id == "itm_satuan2" || id == "itm_satuan3") {
    //   //if (evt.target.value.match(/[a-z]/gi).length <= 0 || evt.target.value=="") value = evt.target.value.replace(/[0-9]/g, "");
      
    //   var regex = /^[a-zA-Z]+$/;
    //   if (regex.test(value) !== true)
    //   value = value.replace(/[^a-zA-Z]+/, '');
    //   //[a-z]/gi
    // }
    var splitid=id.split('_')
    if(splitid[1]=='qty')
    setItemById({
      ...itemById,
      ['itm_stok_satuan'+splitid[3]]: value,
      [id]: value,
    });
    else
    setItemById({
      ...itemById,
      //[id]: evt.target.value,
      [id]: value,
    });
  };
  const setStok = useCallback(
      (e) => {
        let number=e.target.name.substr(e.target.name.length - 1)
        itemById['itm_stok_satuan'+number]=e.target.value;
        itemById['sop_qty_satuan'+number]=e.target.value;
        setItemById({
           ...itemById,
        });
      },
      [itemById]
    );
const handleSelect = (item = ItemListModel()) => {
    setCloseDialog(false);
    setOpen(true);
    setActiveTab("unit-1");
    setItemById(item);
    console.log(item)
    cookies.role_update.length == 0 && cookies.role_dst.length == 0
      ? setSelectedItem(item)
      : cookies.role_dst.findIndex((a) => a == "ALL") >= 0
      ? setSelectedItem(item)
      : cookies.role_update.findIndex((a) => a == "CONV") >= 0
      ? setSelectedItem(item)
      : null;
    let dataarr=[];
    item.totalsatuan.map((_item,key) => {
        dataarr.push({"label":"Satuan "+(key+1),"value":"unit-"+(key+1),"id":key})
    });
    //dataarr.push({"label":"Satuan "+(item.totalsatuan.length+1),"value":"unit-"+(item.totalsatuan.length+1),"id":item.totalsatuan.length})
    setData(dataarr);
  };
  const handleAppendResponse = ({ data, error }) => {
    if (error) {
      alert(dictionary.universal.erroroccured[lang]);
    } else {
      setItems([...items, ...data]);
    }
  };

  useEffect(() => {
    //dihandle jika sebelumnya items sudah ada di list
    if (items[0] && items[0].itm_id && !filters[0]) {
      const init = async () => {
        const { data, error } = await getStokOpname({
          lok_id: cookies.lok_id,
          page: page,
          rows: rowsPerPage,
        });
        handleAppendResponse({ data, error });
      };
      init();
    }
  }, [page, filters]);

  const handlePakaiStok = useCallback(
    (value) => {
    setItemById({
      ...itemById,
      //[id]: evt.target.value,
      "itm_pakaistok": value,
    });
    setpakaistoknew(value)
    },
    [itemById]
  );
  const handlePrint = useReactToPrint({ contentRef });
  const handleCheckPrint = useCallback(() => {
    const printClone = cloneDeep(itemPrintId);
    const _items = cloneDeep(items);
    let newitem=[];
    _items.map((i, index) => {
      if (printClone.includes(i.itm_id) == true) {
        newitem.push(i)
        // temparray = items.filter(function(item) {
        //     return item.itm_id !== i;
        // });
      }
    });
    let uniqueArray = newitem.filter(function(item, pos) {
        return newitem.indexOf(item) == pos;
    })
    setfullItems(uniqueArray);
    setNewItems(uniqueArray);
  },[itemPrintId, items]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    setDataxls([]);
    reader.onload = (event) => {
      const workbook = XLSX.read(event.target.result, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const sheetData = XLSX.utils.sheet_to_json(sheet);
      setDataxls(sheetData);
    };

    reader.readAsArrayBuffer(file);
    setOpenImport(true);
  };

  const handleImport = useCallback(async () => {
    let strImport = JSON.stringify(dataxls);
    let strRepair = strImport
      .replaceAll("Nama", "itm_nama")
      .replaceAll("Kode", "itm_kode")
      .replaceAll('"Satuan 1"', '"itm_satuan1"')
      .replaceAll("Harga Awal Satuan 1", "itm_satuan1hpp")
      .replaceAll("Harga Jual Satuan 1", "itm_satuan1hrg")
      .replaceAll('"Satuan 2"', '"itm_satuan2"')
      .replaceAll("Harga Awal Satuan 2", "itm_satuan2hpp")
      .replaceAll("Harga Jual Satuan 2", "itm_satuan2hrg")
      .replaceAll('"Satuan 3"', '"itm_satuan3"')
      .replaceAll("Harga Awal Satuan 3", "itm_satuan3hpp")
      .replaceAll("Harga Jual Satuan 3", "itm_satuan3hrg")
      .replaceAll("Stok Satuan 1", "itm_stok")
      .replaceAll("Stok Satuan 2", "itm_stok_satuan2")
      .replaceAll("Stok Satuan 3", "itm_stok_satuan3");

    let arrImport = JSON.parse(strRepair);
    console.log(arrImport)
    setItemById({
      itm_id: -1,
      itm_gallery: 1,
      itm_stok: 0,
      itm_lok_id: cookies.lok_id,
      itm_satuan1hrg: 0,
      itm_satuan1hpp: 0,
    });
    if (
      !arrImport[0].itm_nama ||
      !arrImport[0].itm_kode ||
      !arrImport[0].itm_satuan1 ||
      !arrImport[0].itm_satuan1hpp ||
      !arrImport[0].itm_satuan1hrg
    ) {
      alert("Nama Kolom Header tidak sesuai format");
      setCheckcode(1);
    }
    arrImport.forEach((item, index) => {
      (item.itm_id = -1),
        (item.itm_gallery = 1),
        (item.itm_lok_id = cookies.lok_id),
        (item.itm_pakaistok = item.itm_stok>0?1:0),
        (item.itm_sellable = 1),
        (item.itm_import = checkedImport ? checkedImport : null),
        (item.itm_buyable = 1);
    });
    setLoading(true);
    let tasks = [];
    let k = 0;
    if (checkcode == 0) {
      for (let i = 0; i < arrImport.length; i++) {
        const { data, error } = await saveItem(arrImport[i]);
        if (error) {
          setOpenImport(false);
          setDataxls(null);
        } else {
          setOpenImport(false);
          setCheckcode(0);
          setDataxls(null);
        }
      }
    }

    const { data, error } = await getStokOpname({ lok_id: cookies.lok_id });
    if (error) {
      alert(error.message);
    } else {
      setItems(data);
    }

    setLoading(false);
  }, [dataxls, checkcode, checkedImport]);


  
  useEffect(() => {
    if(printerLoading)
      setOpenPrint(true);
  }, [printerLoading]);
  useEffect(() => {
    const _itm_kategori = cloneDeep(itemById);
    _itm_kategori.itm_kategori = categorySelect == "TANPA KATEGORI" ? null : categorySelect;
    setItemById(_itm_kategori);
  }, [categorySelect]);

  useEffect(() => {
    const init = async () => {
      setCategories([]);
      const { data, error } = await categoriesItem({
        lok_id: cookies.lok_id,
        all: "all",
      });
      if (!error) {
        setCategories(data);
      }
    };
    init();
    const initfilter = async () => {
      setCategoriesFilter([]);
      const { data, error } = await categoriesItem({
        lok_id: cookies.lok_id,
      });
      if (!error) {
        setCategoriesFilter(data);
      }
    };
    initfilter();
  }, []);

  function handleOpen(item, index) {
    setReadonly(true);
    setOpen(!open);
    setItemById(item);
    settxtTitle("Detail Item");
    setMode(1);
    setSwitchValueCategory(false);
    setCategorySelect(item.itm_kategori);
  }
  const handleCheckFilter = useCallback(
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

  useEffect(() => {
    const _filters = cloneDeep(filters);
    let _newfilter = _filters.filter(function (object) {
      return object.key !== "category";
    });
    setFilters(_newfilter);
  }, [clearFilter]);

  const setFilterChips = (filterChips) => {
    setPage(1);
    setItems([]);
    setFilters(filterChips);
  };

  const handleCheckAll = useCallback(async () => {
    
    if(!checkedAllPrint){
      let _items=cloneDeep(fullitems);
      let newid=[];
      _items.map((i, index) => {
        newid.push(i.itm_id)
      });
      setItemPrintId(newid);
      setNewcodeItems(_items);
    }
    else{
      setItemPrintId([]);
      setNewcodeItems([]);
    }
    setCheckedAllPrint(!checkedAllPrint)
    // let checkall = cloneDeep(allItmId)
    // const oldArray = [...checkall];
    // // const indexOfId = oldArray.indexOf(item.itm_id);
    // // const newOldArray = [...itemPrintId];
    // setCheckedAllPrint(!checkedAllPrint)
    // if(!checkedAllPrint)
    //   setItemPrintId([...oldArray]);
    // else
    //   setItemPrintId([]);
  }, [checkedAllPrint, allItmId, fullitems]);

  function setItem(item, index) {
    let foundItem = false;
    const _bomList = bomList.map((_item) => {
      let _item_temp = _item;
      if (_item.itm_id === item.itm_id && _item.konvidx === item.konvidx) {
        _item.total = _item.qty * parseFloat(_item.satuan0hpp);
        foundItem = true;
      }
      return _item;
    });
    if (!foundItem) {
      item.qty = 1;
      item.bom_id = -1;
      item.bom_itm_id_bahan = item.itm_id;
      item.total = parseFloat(item.satuan0hpp);
      _bomList.push(item);
    }
    setBomList(_bomList);
    setOpenBomAdd(false);
  }

  const saveData = useCallback(async () => {
    setItemDisplay(null);
    itemById.itm_service_level_satuan1 = JSON.stringify(services);
    itemById.itm_sellable = checkedSellable == "" ? null : checkedSellable;
    itemById.itm_buyable = checkedBuyable == "" ? null : checkedBuyable;
    itemById.itm_lok_id = cookies.lok_id;
    itemById.sop_itm_id = mode == 3 ? -1 : itemById.itm_id;
    itemById.sop_lok_id = cookies.lok_id;
    itemById.sop_qty_satuan1 = itemById.sop_qty_satuan1?itemById.sop_qty_satuan1:0;
    itemById.sop_ket_satuan1 = itemById.sop_ket_satuan1?itemById.sop_ket_satuan1:"";
    console.log(itemById)
    let check=false;
    let i=1;
    let arr=[];
    while (check==false) {
        if(!itemById['itm_satuan'+i]){
            check=true;
        }
        else{
            arr.push(itemById['itm_satuan'+i]);
        }
        i=i+1;
    }
    itemById.totalsatuan=arr
    itemById.itm_service_level_satuan2=JSON.stringify(services_2)
    itemById.itm_service_level_satuan3=JSON.stringify(services_3)
    // if (itemById.itm_nama == "") alert("Nama item tidak boleh kosong");
    // else if (itemById.itm_kode == "") alert("Kode item tidak boleh kosong");
    // else if (itemById.itm_satuan1 == "") alert("Satuan item tidak boleh kosong");
    // else {
      const { data, error } = await saveStokOpname(itemById);
      if (error) {
        alert("Gagal menyimpan");
      } else {
        setLoading(true);
        setOpen(false);
        setItems([]);
        setMode(0);
        const { data: itemData, error } = await getStokOpname({
          lok_id: cookies.lok_id,
        });
        if (error) {
          alert(error.message);
        } else {
          setCategories([]);
          const { data, error } = await categoriesItem({
            lok_id: cookies.lok_id,
            all: "all",
          });
          if (!error) {
            setCategoriesFilter(data);
            setServices([]);
          }
          setItems(itemData);
          setfullItems(itemData);
          setNewItems(itemData);
          localStorage.removeItem("pos_item");
        }
        setLoading(false);
      }
    // }
  }, [itemById, services, checkedSellable, checkedBuyable, categoriesFilter, mode]);

  const saveDataBom = useCallback(async () => {
    const _bomList = cloneDeep(bomList);
    _bomList.map((_item) => {
      _item.bom_itm_id = itemById.itm_id;
      _item.bom_qty = _item.qty;
      _item.bom_itm_satuan = _item.satuan0;
      _item.bom_itm_satuanhpp = _item.satuan0hpp;
      _item.bom_itm_satuanof1 = _item.satuan0of1;
      _item.bom_hpp = _item.total;
    });
    setItemDisplay(null);

    let tasks = [];
    let k = 0;
    for (let i = 0; i < _bomList.length; i++) {
      const delay = 1500 * i;
      tasks.push(
        new Promise(async function (resolve) {
          await new Promise((res) => setTimeout(res, delay));
          let result = await new Promise((r) => {
            saveBom(_bomList[k]);
            // if(_bomList[k].bom_id)
            // saveBom(_bomList[k]);
            // else
            // addBom(_bomList[k]);
            r(delay);
          });
          resolve(result);
          k++;
        })
      );
    }
    setLoading(true);
    Promise.all(tasks).then((results) => {
      setRefreshflag(!refreshflag);
      setOpenBom(false);
      setLoading(false);
    });
  }, [bomList]);

  useEffect(() => {
    if (keywordItem && keywordItem.length > 1) {
      const orderSearch = setTimeout(async () => {
        setPage(1);
        setLoading(true);
        const { data, error } = await getStokOpname({
          lok_id: cookies.lok_id,
          key_val: keywordItem,
          page: 1,
          rows: rowsPerPage,
        });
        handleResponseItem({ data, error });
        setLoading(false);
      }, TIME_SEARCH_DEBOUNCE);
      return () => {
        clearTimeout(orderSearch);
      };
    } else if (!keywordItem) {
      const init = async () => {
        setBomItems([]);
        setLoading(true);
        setPageItem(1);
        const { data, error } = await getStokOpname({
          lok_id: cookies.lok_id,
          page: 1,
          rows: rowsPerPage,
        });
        handleResponseItem({ data, error });
        setLoading(false);
      };
      init();
    }
  }, [keywordItem, filters]);

  //in case of user scrolling
  const handleResponseItem = ({ data, error }) => {
    if (error) {
      alert(dictionary.universal.notfound[lang]);
    } else {
      setBomItems(convertItemListToCheckout(data));
    }
  };

  useEffect(() => {
    if (bomItems[0] && bomItems[0].itm_id && !filters[0]) {
      const init = async () => {
        const { data, error } = await getStokOpname({
          lok_id: cookies.lok_id,
          page: pageItem,
          rows: rowsPerPage,
          loaditems: "yes",
        });
        handleAppendResponseItem({ data, error });
      };
      init();
    }
  }, [pageItem, filters]);

  const handleAppendResponseItem = ({ data, error }) => {
    if (error) {
      alert(dictionary.universal.erroroccured[lang]);
    } else {
      const _item = data;
      setBomItems([...bomItems, ..._item]);
    }
  };

  const handleDownload = () => {
    var table_elt = document.getElementById("my-table-id");

    // Extract Data (create a workbook object from the table)
    var workbook = XLSX.utils.table_to_book(table_elt);
    var ws = workbook.Sheets["Sheet1"];
    XLSX.utils.sheet_add_aoa(ws, [["Nama"]], { origin: "A1" });
    XLSX.utils.sheet_add_aoa(ws, [["Kode"]], { origin: "B1" });
    XLSX.utils.sheet_add_aoa(ws, [["Satuan 1"]], { origin: "C1" });
    XLSX.utils.sheet_add_aoa(ws, [["Harga Awal Satuan 1"]], { origin: "D1" });
    XLSX.utils.sheet_add_aoa(ws, [["Harga Jual Satuan 1"]], { origin: "E1" });
    XLSX.utils.sheet_add_aoa(ws, [["Stok Satuan 1"]], { origin: "F1" });
    XLSX.utils.sheet_add_aoa(ws, [["Satuan 2"]], { origin: "G1" });
    XLSX.utils.sheet_add_aoa(ws, [["Harga Awal Satuan 2"]], { origin: "H1" });
    XLSX.utils.sheet_add_aoa(ws, [["Harga Jual Satuan 2"]], { origin: "I1" });
    XLSX.utils.sheet_add_aoa(ws, [["Stok Satuan 2"]], { origin: "J1" });
    XLSX.utils.sheet_add_aoa(ws, [["Satuan 3"]], { origin: "K1" });
    XLSX.utils.sheet_add_aoa(ws, [["Harga Awal Satuan 3"]], { origin: "L1" });
    XLSX.utils.sheet_add_aoa(ws, [["Harga Jual Satuan 3"]], { origin: "M1" });
    XLSX.utils.sheet_add_aoa(ws, [["Stok Satuan 3"]], { origin: "N1" });
    // Package and Release Data (`writeFile` tries to write and save an XLSB file)
    XLSX.writeFile(workbook, "Template_kasbon.xlsx");
  };

  useEffect(() => {
    if (navbarRef.current) setListPadding(`${navbarRef.current.offsetHeight + 20}px`);
  }, [filters]);

  const handleInput = useCallback(
    (input) => {
      setQty(Number(input.qty));
      setOpenInput(true);
      setBomById(input);
      setQtyTemp(Number(input.qty));
    },
    [bomList, qty]
  );

  const handleDeleteBom = useCallback(
    async (item) => {
      const { data, error } = await deleteBom({
        bom_id: item.bom_id,
      });
      const _bomList = cloneDeep(bomList);
      const deletedBom = _bomList.filter(function (_item) {
        return _item.bom_id !== item.bom_id;
      });
      setBomList(deletedBom);
    },
    [bomList, bomById]
  );

  const handleRak = useCallback(
    async (item) => {
      const { data, error } = await getRak({
        lok_id: cookies.lok_id,
      });
      if(data){
        const result = Object.groupBy(data, ({ itm_rak_id_satuan1 }) => itm_rak_id_satuan1);
        let newarr=[];
        let i=0;
        result.undefined.map((i, index) => {
          let newstr=[];
          const foo = {};
          i.map((ii, indexi) => {
            
            foo["itm_nama" + i] = ii.itm_nama;
            newstr.push(ii?ii.itm_nama:null);
          });
          i=i+1;
          newarr.push(newstr);
        });
        console.log(result.undefined)
        console.log(foo)
        setRakitems(result.undefined)
        setOpenRak(true);
      }
    },
    []
  );

  const handleChangeQty = (evt, id) => {
    const _bomList = cloneDeep(bomList);
    setQty(evt.target.value);
  };

  const handleCloseQty = useCallback(() => {
    setOpenInput(false);
    if (qty > 0) {
      const _bomList = cloneDeep(bomList);
      const bomindex = _bomList.findIndex((a) => a.bom_itm_id_bahan == bomById.bom_itm_id_bahan);
      _bomList[bomindex].bom_qty = qty;
      _bomList[bomindex].qty = qty;
      _bomList[bomindex].total = _bomList[bomindex].satuan0hpp * qty;
      _bomList[bomindex].bom_hpp = _bomList[bomindex].satuan0hpp * qty;
      setBomList(_bomList);
    } else alert("Kuantiti tidak boleh 0 atau kurang");
  }, [qty, qtyTemp, bomList, bomById]);

  const handleCancelInput = useCallback(() => {
    const _bomList = cloneDeep(bomList);
    const bomindex = _bomList.findIndex((a) => a.itm_id_bahan == bomById.itm_id_bahan);
    _bomList[bomindex].bom_qty = qtyTemp;
    _bomList[bomindex].qty = qtyTemp;
    _bomList[bomindex].total = _bomList[bomindex].satuan0hpp * qtyTemp;
    _bomList[bomindex].bom_hpp = _bomList[bomindex].satuan0hpp * qtyTemp;
    setBomList(_bomList);
    setOpenInput(false);
  }, [qtyTemp]);

  const handleCancleService = (service, indexservice, item) => {
    const temparray = services.filter(function (item) {
      return item.level !== service.level;
    });
    setServices(temparray);
  };

  const handleAddServices = () => {
    const _services = cloneDeep(services);
    _services.push({ level: "", hrg: 0 });
    setServices(_services);
  };

  const handleChangeService = (evt, id, item, index) => {
    const _services = cloneDeep(services);
    // setServicesById({
    //   ..._services[index],
    //   [id]: evt.target.value
    // });
    // _services[index]=servicesById;
    if (id == "hrg") _services[index] = { level: item.level, hrg: evt.target.value };
    if (id == "level") {
      _services[index] = { level: evt.target.value, hrg: item.hrg };
    }
    setServices(_services);
  };

  const onCheckable = useCallback(
    (item, prop) => {
      // if(item.itm_sellable==null)
      //     item.itm_sellable=true
      // else
      //     item.itm_sellable=!item.itm_sellable
      if (prop == "sellable") setCheckedSellable(!checkedSellable);
      if (prop == "buyable") setCheckedBuyable(!checkedBuyable);
      if (prop == "pakaistok") setCheckedPakaistok(!checkedPakaistok);
      setItemById(item);
    },
    [checkedSellable, checkedBuyable,checkedPakaistok]
  );

  return (
    <Fragment>
      <table id="my-table-id"></table>
      {!loading ? null : <LoadingOverlay white />}
      <div className="h-screen-adapt bg-gray-50 overflow-hidden relative">
        <InputDialog
          open={openInput}
          handleInput={handleInput}
          handleClose={() => setOpenInput(false)}
          handleAccept={handleCloseQty}
          handleChange={(evt) => handleChangeQty(evt, bomById.itm_id_bahan)}
          qty={qty}
        />
        <Dialog
          open={open}
          handler={handleOpen}
          dismiss={{ outsidePress: () => setOpen(false) }}
          size="xxl"
        >
          <DialogHeader className="border-b-2 text-lg">{txtTitle}</DialogHeader>
          <DialogBody>
            <div className="h-screen-adapt bg-teal-600 overflow-hidden relative">
                <div className="pt-2 overflow-auto h-full" >
                    <div className="px-2">
                        <IconButton className="float-right" variant="text" size="md" onClick={()=>setOpen(false)} >
                            <XMarkIcon className="h-6 w-6 stroke-2 text-white" />
                        </IconButton>
                        <div className="flex items-center py-4">
                            {
                                !itemById.itm_urlimage1?
                                <div className="rounded-full p-4 bg-gray-100 mr-3">
                                    <CubeIcon className="h-8 w-8"/>
                                </div>:
                                <div className="rounded-full overflow-hidden mr-3">
                                    <IKImage
                                        urlEndpoint={IMAGEKIT_URL_ENDPOINT}
                                        path={itemById.itm_urlimage1}
                                        transformation={[{
                                            "height": "64",
                                            "width": "64"
                                        }]}
                                        className="object-cover h-full w-full"
                                        loading="lazy"
                                    />
                                </div>
                            }
                            <div>
                                <Typography variant="lead" color="white">{itemById.itm_nama?? ""}</Typography>
                                <Typography variant="small" color="light-green" className="font-normal">
                                    {itemById.itm_kode?? ""}
                                </Typography>
                            </div>
                        </div>
                    </div>
                    <div className="px-3 pt-3 pb-20 rounded-t-3xl bg-gray-50 min-h-screen">
                        <Tabs value={activeTab}>
                            <TabsHeader
                                className="rounded-none border-b border-blue-gray-50 bg-transparent p-0"
                                indicatorProps={{
                                className:
                                    "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
                                }}
                            >
                                {data.map(({ label, value }) => (
                                <Tab
                                    key={value}
                                    value={value}
                                    onClick={() => setActiveTab(value)}
                                    className={activeTab === value ? "text-gray-900" : ""}
                                >
                                    {label}
                                </Tab>
                                ))}
                            </TabsHeader>
                            <TabsBody>
                              {data.map(({ value, id }) => (
                              <TabPanel key={value} value={value}>
                                  <div className="mb-10">
                                  <Select
                                    placement="bottom-start"
                                    className="h-10 bg-teal-50"
                                    name="itm_pakaistok"
                                    value={pakaistoknew}
                                    onChange={handlePakaiStok}
                                    label={dictionary.universal.usestock[lang]}
                                  >
                                    {pakaistok.map((p) => (
                                      <Option value={String(p.pak_value)} key={p.pak_id}>
                                        {p.pak_nama}
                                      </Option>
                                    ))}
                                  </Select>
                                  </div>
                                  <div className="mb-10">
                                      <InputSimple value={itemById['itm_satuan'+(id+1)]}
                                          label={dictionary.stock.uom.unitName[lang]}
                                          disabled
                                      />
                                  </div>
                                  <div className="mb-10">
                                      <InputSimple value={1}
                                          label={dictionary.stock.uom.coef[lang]}
                                          disabled
                                      />
                                  </div>
                                  <div className="mb-10">
                                      <InputMoney value={itemById['itm_stok_satuan'+(id+1)]?itemById['itm_stok_satuan'+(id+1)]:0}
                                          currency={currency}
                                          label={dictionary.stock.uom.stock[lang]}
                                          disabled
                                      />
                                  </div>
                                  <div className="mb-10">
                                      <InputMoney value={itemById['sop_qty_satuan'+(id+1)]?itemById['sop_qty_satuan'+(id+1)]:0}
                                          label={dictionary.stock.uom.stock[lang]}
                                          name={`sop_qty_satuan_${id+1}`}
                                          onChange={setStok}
                                      />
                                  </div>
                                  <div className="mb-10">
                                      <InputSimple value={itemById['sop_ket_satuan'+(id+1)]}
                                          label={dictionary.stock.uom.note[lang]}
                                          name={`sop_ket_satuan_${id+1}`}
                                          onChange={(evt) => handleChange(evt, 'sop_ket_satuan'+(id+1))}
                                      />
                                  </div>
                              </TabPanel>
                              ))}
                          </TabsBody>
                        </Tabs>
                    </div>
                    <div className="fixed bottom-3 inset-x-4 z-20">
                        <Button
                            size="lg"
                            variant="gradient"
                            color="teal"
                            className="group w-full relative flex items-center gap-3 overflow-hidden pr-[72px] mx-auto desktop:max-w-[60%]"
                            type="submit"
                            disabled={loading}
                            onClick={saveData}
                        >
                            <span className="flex-grow text-left">
                                {dictionary.stock.uom.save[lang]}
                            </span>
                            <span className="absolute right-0 grid h-full w-12 place-items-center bg-teal-500 transition-colors group-hover:bg-teal-600">
                                {
                                    loading? <Spinner className="w-5 h-5" color="white"/>:
                                    <CheckIcon className="w-5 h-5"/>
                                }
                            </span>
                        </Button>
                    </div>
                </div>
            </div>
          </DialogBody>

          {/* <DialogFooter className="flex gap-3 justify-between">
            <Button onClick={() => setOpen(false)} className="w-full flex-1 bg-blue-gray-100 text-blue-gray-700">
              <span>{mode <= 1 ? "Kembali" : dictionary.universal.cancel[lang]}</span>
            </Button>
            <Button
              className={mode <= 1 ? "hidden" : "block w-full flex-1"}
              variant="gradient"
              color="green"
              onClick={saveData}
            >
              <span>{dictionary.universal.save[lang]}</span>
            </Button>
          </DialogFooter> */}
        </Dialog>
        <ItemFilter
          open={openFilter}
          onClose={() => setOpenFilter(false)}
          onCheck={handleCheckFilter}
          onClear={() => setClearFilter(!clearFilter)}
          checkedIds={filters.map((i, index) => i.value)}
          refresh={refreshKategori}
          categories={categoriesFilter}
        />
        <div className="pb-32 overflow-auto h-full" style={{ paddingTop: listPadding }}>
          <div className="min-h-screen">
            <div className="w-full flex gap-3 text-xs text-gray-700 px-[5%]">
              <div className="flex gap-1">
                <div className="w-max py-2 px-2 text-[12px] font-semibold bg-orange-100 rounded-sm"></div>
                <div>Kode Item</div>
              </div>
              <div className="flex gap-1">
                <div className="w-max py-2 px-2 text-[12px] font-semibold bg-purple-100 rounded-sm"></div>
                <div>Stok</div>
              </div>
              <div className="flex gap-1">
                <div className="w-max py-2 px-2 text-[12px] font-semibold bg-blue-100 rounded-sm"></div>
                <div>Satuan</div>
              </div>
            </div>
            {!items.length && !loading ? (
                        <div className="mx-auto py-20 w-fit">{dictionary.stock.item.noItems[lang]}</div>
              ) : semiDesktopMode ? (
                <StokOpnameScrollMd
                  onSelect={handleSelect}
                  items={items}
                  onLoad={() => setPage(page + 1)}
                  infinite={!keyword}
                />
              ) : (
                <List className="divide-y divide-dashed divide-gray-400">
                  <StokOpnameScrollSm
                    onSelect={handleSelect}
                    items={items}
                    onLoad={() => setPage(page + 1)}
                    infinite={!keyword}
                  />
                </List>
              )}
          
          
          </div>
        </div>
        {openBom ? null : (
          <div className="p-2 top-0 inset-x-0 fixed z-50 mx-auto desktop:max-w-[60%]">
            <Navbar
              ref={navbarRef}
              className={`pt-2 px-2 ${!filters.length ? "pb-6" : "pb-4"} relative`}
              blurred={false}
            >
              <div className="flex items-center">
                <IconButton variant="text" size="md" onClick={() => setMenuOpen(true)}>
                  <div className="justify-items-center lowercase">
                    <Bars3Icon className="h-6 w-6 stroke-2" />
                    <div style={{ fontSize: "10px", padding: "0px" }}>Menu</div>
                  </div>
                </IconButton>
                <div className="mx-2 flex-grow">
                  <SearchNavbar onSearch={handleFilter} value={keyword} label={dictionary.search.stockopname[lang]} />
                </div>
                <IconButton size="md" variant="text" onClick={openDrawerRight}>
                  <div className="justify-items-center lowercase">
                    <AdjustmentsVerticalIcon className="h-6 w-6 stroke-2" />
                    <div style={{ fontSize: "10px", padding: "0px" }}>Filter</div>
                  </div>
                </IconButton>
              </div>
              {!filters.length ? (
                <Typography variant="small" color="gray" className="absolute right-14 bottom-1 text-xs italic">
                  {dictionary.filter.itemCategory.all[lang]}
                </Typography>
              ) : (
                <div className="px-2 pt-4">
                  <FilterChips filters={filters} onSetFilters={setFilterChips} />
                </div>
              )}
            </Navbar>
          </div>
        )}
        <div className={`top-0 inset-x-0 fixed  ${!openBom ? "bg-gradient-to-b from-gray-50" : ""} h-20`} />
      </div>
    </Fragment>
  );
}
