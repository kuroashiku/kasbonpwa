import { Fragment, useCallback, useContext, useEffect, useRef, useState } from "react";
import { getItems, saveItem, deleteItem, categoriesItem, getBoms, saveBom, deleteBom, getRak, saveRak, deleteRak, getItemsBom } from "../../api/Item";
import { AppContext } from "../../AppContext";
import { Button, Checkbox, Dialog, DialogHeader, DialogBody, DialogFooter, IconButton, Input, List, ListItem, Navbar, Option, Switch, Select, Spinner, Typography, } from "@material-tailwind/react"; 
import SearchNavbar from "../../lib/SearchNavbar"; 
<<<<<<< HEAD
import { AdjustmentsVerticalIcon, Bars3Icon, TrashIcon, PlusIcon, PlusCircleIcon, PrinterIcon, InboxStackIcon, PencilIcon } from "@heroicons/react/24/outline";
=======
import { AdjustmentsVerticalIcon, Bars3Icon, TrashIcon, PlusIcon, PlusCircleIcon, PrinterIcon, InboxStackIcon } from "@heroicons/react/24/outline";
>>>>>>> parent of 290da7b... Post POS new scroll
import FilterChips from "../../lib/FilterChips";
import { ItemListModel } from "../../model/item";
import { dictionary } from "../../constant/appDictionary";
import { formatSentenceCase } from "../../util/formatter";
import LoadingOverlay from "../../lib/LoadingOverlay";
import { TIME_SEARCH_DEBOUNCE } from "../../constant/appCommon";
import ItemScrollSm from "./ItemScrollSm";
import ItemScrollMd from "./ItemScrollMd";
import InputSimple from "../../lib/InputSimple";
import InputMoney from "../../lib/InputMoney";
import ImageUpload from "../../lib/ImageUpload";
import ItemFilter from "./ItemFilter";
import { cloneDeep } from "lodash";
import { FilterItemModel } from "../../model/filter";
import BOMItemScroll from "./BOMItemScroll";
import { convertItemListToCheckout } from "../../model/item";
import { formatThousandSeparator } from "../../util/formatter";
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
export default function ItemList() {
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
  const [modeProduk, setModeProduk] = useState(false);
  const [pakaistok, setPakaistok] = useState([
    { pak_id: 1, pak_nama: "Pakai Stok", pak_value: 1 },
    { pak_id: 2, pak_nama: "Tidak Pakai Stok", pak_value: 0 },
  ]);
  const [pakaistoknew, setpakaistoknew] = useState(null);
  const handleFilter = (searchKey) => {
    setKeyword(searchKey);
  };
  const openDrawerRight = () => setOpenFilter(true);
  const handleFilterItem = (searchKey) => {
    setKeywordItem(searchKey);
  };
  const contentRef = useRef(null);
  const [itemid,setItemid] = useState(-1); 
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
        const { data, error } = await getItems({
          lok_id: cookies.lok_id,
          key_val: keyword,
          page: page,
          rows: rowsPerPage,
          ...filterProps,
        });
        if (page <= 1) handleResponse({ data, error });
        else handleAppendResponse({ data, error });
        setLoading(false);
      }, TIME_SEARCH_DEBOUNCE);
      return () => {
        clearTimeout(orderSearch);
      };
    } else if (!keyword) {
      const init = async () => {
        // setItems([]);
        setLoading(true);
        // setPage(1);
        const { data, error } = await getItems({
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
      // data.map((i, index) => {
      //   i.itm_satuan1hpp=i.bom_id_pembentuk>0?i.totalbom:i.itm_satuan1hpp;
      // });
      console.log(data);
      setNewItems(data);
      setItems(data);
    }
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
        const { data, error } = await getItems({
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
      "itm_pakaistok1": value,
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
    setItemById({
      itm_id: -1,
      itm_gallery: 1,
      itm_stok: 0,
      itm_lok_id: cookies.lok_id,
      itm_satuan1hrg: 0,
      itm_satuan1hpp: 0,
    });
    if (
      !arrImport[1].itm_nama ||
      !arrImport[1].itm_kode ||
      !arrImport[1].itm_satuan1 ||
      !arrImport[1].itm_satuan1hpp ||
      !arrImport[1].itm_satuan1hrg
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
        (item.itm_buyable = 1),
        (item.itm_urlimage1 = ""),
        (item.itm_stokaman = 0),
        (item.itm_tgstokopnam = "0000-00-00 00:00:00"),
        (item.itm_durasi= 0),
        (item.itm_satuandurasi= ""),
        (item.totalsatuan=[]);
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

    const { data, error } = await getItems({ lok_id: cookies.lok_id });
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
    setClearFilter(true);
  }, []);

  function handleEdit(item) {
    setReadonly(false);
    cookies.role_update.length == 0 && cookies.role_dst.length == 0
      ? setOpen(!open)
      : cookies.role_dst.findIndex((a) => a == "ALL") >= 0
      ? setOpen(!open)
      : cookies.role_update.findIndex((a) => a == "ITM") >= 0
      ? setOpen(!open)
      : setOpen(false);
    setItemById(item);
    settxtTitle("Edit Item");
    setMode(2);
    setSwitchValueCategory(false);
    setServices(JSON.parse(item.itm_service_level_satuan1));
    setCheckedSellable(item.itm_sellable == null ? false : item.itm_sellable);
    setCheckedBuyable(item.itm_buyable == null ? false : item.itm_buyable);
    setCategorySelect(item.itm_kategori == null || item.itm_kategori == "" ? "TANPA KATEGORI" : item.itm_kategori);
  }

  const printCode = useCallback(async () => {
    let _newcodeItems=cloneDeep(newcodeItems)
    let _newfiltercodeItems = _newcodeItems.filter(function (object) {
      return object.itm_nama !== "";
    });
    var _cleancode = _newfiltercodeItems.filter((arr, index, self) =>
      index === self.findIndex((t) => (t.kode === arr.kode && t.itm_nama === arr.itm_nama)))
    if(printerState==1){
      if(_cleancode.length>=1){
        const printerProcess=()=>{
            const encoder = new ThermalPrinterEncoder({ 
                language: 'esc-pos'
            });
            let result = encoder.initialize();
            _cleancode.map((i, index) => {
                result = result
                .align("center")
                .bold(true)
                .line(i.itm_nama)
                .bold(false)
                .line(currency+" "+formatThousandSeparator(parseFloat(i.satuan1hrg))+' / '+i.satuan1);
                if(!qrcodebarcode)
                  result=result
                  .qrcode(i.kode);
                else
                  result=result
                  .newline()
                  .barcode(i.kode, 'code128', 60);
                result=result
                .newline()
                .line("==============================")
                .align("center");
            });
            result = result.encode();
            print(result);
        }
        if(!cookies.always_print){
            if(printerReady)
                printerProcess();
            else{
                handleOpenPrint();
                initPrinterBT();
                setPrinterReady(true);
            }
        }
        else{
            printerProcess();
        }
      }
      else{
        alert("Belum ada data yang dicheck")
      }
    }
    else{
      alert("Printer thermal belum terkonek, ulangi koneksi!")
      setOpenPrinter(true);
      setOpenPrint(false);
    }
  },[newcodeItems,qrcodebarcode,printerState]);
  function handleOpen(item, index) {
    setReadonly(true);
    setOpen(!open);
    setItemById(item);
    settxtTitle("Detail Item");
    setMode(1);
    setSwitchValueCategory(false);
    setCategorySelect(item.itm_kategori);
  }

  function handleOpenBom(item, index) {}

  function handleBom(item, index) {
    setOpenBom(true);
    setBomList([]);
    setItemById(item);
    const initbomread = async () => {
      setPageItem(1);
      const { data, error } = await getBoms({
        itm_id: item.itm_id,
      });
      if (data.length > 0) {
        data.map((_item) => {
          _item.itm_id_bahan = _item.bom_itm_id_bahan;
          _item.qty = _item.bom_qty;
          _item.satuan0 = _item.bom_itm_satuan;
          _item.satuan0hpp = parseFloat(_item.bom_itm_satuanhpp);
          _item.satuan0of1 = parseFloat(_item.bom_itm_satuanof1);
          _item.total = parseFloat(_item.bom_hpp);
        });
        setBomList(data);
      }
    };
    initbomread();
  }

  function handleOpenItemBom(item, index) {
    const init = async () => {
      setBomItems([]);
      setLoading(true);
      setPageItem(1);
      const { data, error } = await getItemsBom({
        lok_id: cookies.lok_id,
        page: 1,
        rows: rowsPerPage,
        itm_id:itemById.itm_id
      });
      handleResponseItem({ data, error });
      setLoading(false);
    };
    init();
    setOpenBomAdd(true);
  }

  function handleNewOpen(id) {
    cookies.role_delete.length == 0 && cookies.role_dst.length == 0
      ? setNewOpen(!newOpen)
      : cookies.role_dst.findIndex((a) => a == "ALL") >= 0
      ? setNewOpen(!newOpen)
      : cookies.role_delete.findIndex((a) => a == "ITM") >= 0
      ? setNewOpen(!newOpen)
      : setNewOpen(false);
      console.log(id);
    setItemid(id);
  }

  function handleAdd() {
    setItemById(ItemListModel());
    setReadonly(false);
    settxtTitle(dictionary.universal.add[lang]+" Item");
    setMode(3);
    setOpen(true);
    setCheckedSellable(parseInt(ItemListModel().itm_sellable) == 1 ? true : false);
    setCheckedBuyable(parseInt(ItemListModel().itm_buyable) == 1 ? true : false);
    cookies.role_create.length == 0 && cookies.role_dst.length == 0
      ? setOpen(!open)
      : cookies.role_dst.findIndex((a) => a == "ALL") >= 0
      ? setOpen(!open)
      : cookies.role_create.findIndex((a) => a == "ITM") >= 0
      ? setOpen(!open)
      : setOpen(false);
    setServices([]);
  }

  function handleOpenPrint() {
    const init = async () => {
      const { data, error } = await getItems({
        lok_id: cookies.lok_id,
      });
      if (error) {
        alert(dictionary.universal.erroroccured[lang]);
      } else {
        setfullItems(convertItemListToCheckout(data));
        setOpenPrint(true);
        setOpenPrinter(false);
      }
    };
    init();
  }

  const handleDelete = useCallback(async () => {
    const uniqueNames = [];
    const _itemCheckId = [...itemCheckId];
    let temparray = [];
    // _itemCheckId.map((i, index) => {
    //   if (uniqueNames.includes(i) == false) {
    //     uniqueNames.push(i);
    //     // temparray = items.filter(function(item) {
    //     //     return item.itm_id !== i;
    //     // });
    //   }
    // });
    // await Promise.all(
    //   uniqueNames.map((i) => {
      console.log(itemid);
        deleteItem({ itm_id: itemid });
    //   })
    // );

    setItemCheckId([]);
    setItemCheckName([]);
    setLoading(true);
    const { data, error } = await getItems({ lok_id: cookies.lok_id });
    if (error) {
      alert(dictionary.universal.notfound[lang]);
    } else {
      setItems(data);
      setNewOpen(false);
    }
    setLoading(false);
  }, [itemid]);



  const handleSetImage = (url) => {
    setItemById({
      ...itemById,
      itm_urlimage1: url,
    });
  };
  const handleChange = (evt, id) => {
    let value = evt.target.value;
    if (id == "itm_satuan1" || id == "itm_satuan2" || id == "itm_satuan3") {
      //if (evt.target.value.match(/[a-z]/gi).length <= 0 || evt.target.value=="") value = evt.target.value.replace(/[0-9]/g, "");
      
      var regex = /^[a-zA-Z]+$/;
      if (regex.test(value) !== true)
      value = value.replace(/[^a-zA-Z]+/, '');
      //[a-z]/gi
    }
    setItemById({
      ...itemById,
      //[id]: evt.target.value,
      [id]: value,
    });
  };

  const handleCheckChange = useCallback(
    (item = ItemListModel()) => {
      const oldArray = [...itemCheckId];
      const indexOfId = oldArray.indexOf(item.itm_id);
      const newOldArray = [...itemCheckName];
      if (indexOfId >= 0) {
        oldArray.splice(indexOfId, 1);
        newOldArray.splice(indexOfId, 1);
        setItemCheckId(oldArray);
        setItemCheckName(newOldArray);
      } else {
        setItemCheckId([...oldArray, item.itm_id]);
        setItemCheckName([...newOldArray, formatSentenceCase(item.itm_nama)]);
      }
    },
    [itemCheckId]
  );

  const handleCheckPrintChange = useCallback(
    (item = ItemListModel()) => {
      const oldArray = [...itemPrintId];
      const indexOfId = oldArray.indexOf(item.itm_id);
      setCheckedAllPrint(false)
      const newOldArray = [...itemPrintId];
      const codeoldArray = [...newcodeItems];
      const codeindexOfId = codeoldArray.indexOf(item);
      const codenewOldArray = [...newcodeItems];
      if (indexOfId >= 0) {
        oldArray.splice(indexOfId, 1);
        newOldArray.splice(indexOfId, 1);
        setItemPrintId(oldArray);
        codeoldArray.splice(codeindexOfId, 1);
        setNewcodeItems(codeoldArray);
      } else {
        setItemPrintId([...oldArray, item.itm_id]);
        setNewcodeItems([...codeoldArray, item]);
      }
    },
    [itemPrintId,newcodeItems,checkedAllPrint]
  );

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
      return object.key === "category";
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
        _item.total = _item.qty * parseFloat(_item.itm_satuan1hpp);
        foundItem = true;
      }
      return _item;
    });
    if (!foundItem) {
      item.qty = 1;
      item.bom_id = -1;
      item.bom_itm_id_bahan = item.itm_id;
      item.total = parseFloat(item.itm_satuan1hpp);
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
    itemById.itm_id = mode == 3 ? -1 : itemById.itm_id;
    if (itemById.itm_nama == "") alert("Nama item tidak boleh kosong");
    else if (itemById.itm_kode == "") alert("Kode item tidak boleh kosong");
    else if (itemById.itm_satuan1 == "") alert("Satuan item tidak boleh kosong");
    else {
      const { data, error } = await saveItem(itemById);
      if (error) {
        alert("Gagal menyimpan");
      } else {
        setLoading(true);
        setOpen(false);
        setItems([]);
        setMode(0);
        const { data: itemData, error } = await getItems({
          lok_id: cookies.lok_id,
        });
        if (error) {
          alert(error.message);
        } else {
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
          setItems(itemData);
          setfullItems(itemData);
          setNewItems(itemData);
          localStorage.removeItem("pos_item");
        }
        setLoading(false);
      }
    }
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
        const { data, error } = await getItemsBom({
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
        const { data, error } = await getItemsBom({
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
      setBomItems(data);
    }
  };

  useEffect(() => {
    if (bomItems[0] && bomItems[0].itm_id && !filters[0]) {
      const init = async () => {
        const { data, error } = await getItemsBom({
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
      _bomList[bomindex].total = _bomList[bomindex].itm_satuan1hpp * qty;
      _bomList[bomindex].bom_hpp = _bomList[bomindex].itm_satuan1hpp * qty;
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
          size={`${desktopMode ? "" : "xxl"}`}
        >
          <DialogHeader className="border-b-2 text-lg">{txtTitle}</DialogHeader>
          <DialogBody>
            <div className="max-h-[70vh] overflow-y-auto">
              <div className="mb-6">
                <ImageUpload
                  image={itemById.itm_urlimage1}
                  onSuccess={handleSetImage}
                  onRemove={() => handleSetImage(null)}
                  id="upl-image"
                  disabled={readonly}
                />
              </div>
              <div className="mb-4">
                <InputSimple
                  value={itemById.itm_kode}
                  label={dictionary.dialog.item.code[lang]}
                  onChange={(evt) => handleChange(evt, "itm_kode")}
                  disabled={readonly}
                />
              </div>
              <div className="mb-4">
                <InputSimple
                  value={itemById.itm_nama}
                  label={dictionary.dialog.item.name[lang]}
                  onChange={(evt) => handleChange(evt, "itm_nama")}
                  disabled={readonly}
                />
              </div>
              
                <div className="grid grid-cols-2 mb-4">
                  <div className="">
                    {switchValueCategory ? (
                      <InputSimple
                        value={switchValueCategory ? null : itemById.itm_kategori}
                        label={dictionary.dialog.item.categories[lang]}
                        onChange={(evt) => handleChange(evt, "itm_kategori")}
                      />
                    ) : (
                      <div>
                        {
                          <Select
                            id="category"
                            value={`${categorySelect || "TANPA KATEGORI"}`}
                            onChange={setCategorySelect}
                            color="teal"
                            label={dictionary.dialog.item.categories[lang]}
                            disabled={readonly}
                          >
                            {categories.map((p) => (
                              <Option value={p.itm_kategori} key={p.itm_kategori}>
                                {p.itm_kategori}
                              </Option>
                            ))}
                          </Select>
                        }
                      </div>
                    )}
                  </div>
                  <div className="">
                    <div className="text-xs ml-2 text-center">{dictionary.dialog.item.newcategories[lang]}</div>
                    <div className="flex justify-center">
                      <Switch
                        color="teal"
                        disabled={readonly}
                        onChange={() => setSwitchValueCategory(!switchValueCategory)}
                      />
                    </div>
                  </div>
                </div>
              
              <div className="mb-4">
                <InputSimple
                  value={itemById.itm_satuan1}
                  label={dictionary.dialog.item.unit[lang]}
                  onChange={(evt) => handleChange(evt, "itm_satuan1")}
                  disabled={readonly}
                />
              </div>
              {/* <div className="buysell-area flex gap-3 justify-between items-center mb-4">
                <div
                  className={`w-full flex items-center justify-between gap-2 px-3 py-1 bg-blue-gray-50 rounded-lg cursor-pointer ${
                    checkedSellable ? "bg-light-blue-100" : ""
                  }`}
                  onClick={() => !readonly && onCheckable(itemById, "sellable")}
                >
                  <span>Sellable</span>
                  <CheckCircleIcon className={`w-8  ${checkedSellable ? "text-blue-500" : "text-gray-300"}`} />
                </div>

                <div
                  className={`w-full flex items-center justify-between gap-2 px-3 py-1 bg-blue-gray-50 rounded-lg cursor-pointer ${
                    checkedBuyable ? "bg-light-green-100" : ""
                  }`}
                  onClick={() => !readonly && onCheckable(itemById, "buyable")}
                >
                  <span>Buyable</span>
                  <CheckCircleIcon className={`w-8  ${checkedBuyable ? "text-green-500" : "text-gray-300"}`} />
                </div>
              </div> */}
              {/* <div className="mb-6">
                    <Select
                      className="h-10 bg-teal-50"
                      name="itm_pakaistok"
                      value={parseInt(itemById.itm_pakaistok1)}
                      onChange={handlePakaiStok}
                      label={dictionary.universal.usestock[lang]}
                    >
                      {pakaistok.map((p) => (
                        <Option value={p.pak_value} key={p.pak_id}>
                          {p.pak_nama}
                        </Option>
                      ))}
                    </Select>
              </div>
              {itemById.itm_pakaistok1==1?
                <div className="">
                    
                    <div className="mb-6">
                      <InputMoney
                        label={dictionary.stock.uom.stock[lang]}
                        onChange={(evt) => handleChange(evt, "itm_stok")}
                        value={itemById.itm_stok}
                      />

                    </div>
                </div>:null
              } */}
              {/* {cookies.lok_type == "laundry" ? null : ( */}
              {services.length<=0?
              <div>
              <div className="mb-6">
                <InputMoney
                  currency={currency}
                  disabled={itemById.bom_id_pembentuk>0?true:readonly}
                  label={"Harga"}
                  onChange={(evt) => handleChange(evt, "itm_satuan1hpp")}
                  value={itemById.itm_satuan1hpp}
                />
              </div>
              {/* <div className="mt-6 mb-4">
                <InputMoney
                  currency={currency}
                  disabled={readonly}
                  label={cookies.lok_type == "laundry" ? dictionary.dialog.item.serviceprice[lang] : dictionary.dialog.item.sellingprice[lang]}
                  onChange={(evt) => handleChange(evt, "itm_satuan1hrg")}
                  value={itemById.itm_satuan1hrg}
                />
              </div> */}
              </div>:null
              }
              
              {cookies.lok_type == "laundry"
                ? services?.map((i, index) => {
                    return (
                      <div className="setlevel-item flex flex-col gap-4 mb-4 p-3 pt-6 bg-blue-gray-50 rounded-md">
                        <InputMoney
                          currency={currency}
                          disabled={readonly}
                          label={dictionary.dialog.item.cost[lang]}
                          onChange={(evt) => handleChangeService(evt, "hrg", i, index)}
                          value={i.hrg}
                        />
                        <div className="flex gap-2 justify-between items-center">
                          <InputSimple
                            value={i.level}
                            label={dictionary.dialog.item.level[lang]}
                            onChange={(evt) => handleChangeService(evt, "level", i, index)}
                            disabled={readonly}
                          />
                          <IconButton
                            variant="text"
                            className="bg-orange-500 w-12 h-10"
                            onClick={() => handleCancleService(i, index, itemById)}
                          >
                            <TrashIcon className="h-4 w-4 text-white" />
                          </IconButton>
                        </div>
                      </div>
                    );
                  })
                : null}
              {cookies.lok_type == "laundry" ? (
                <Button variant="gradient" color="light-blue" onClick={() => handleAddServices()} className="w-full">
                  <span>Tambah Services</span>
                </Button>
              ) : null}
            </div>
          </DialogBody>

          <DialogFooter className="flex gap-3 justify-between">
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
          </DialogFooter>
        </Dialog>

        <Dialog open={newOpen} handler={handleNewOpen}>
          <DialogBody>
            <div className="text-center my-6">
              Item {dictionary.universal.withname[lang]} <span className="font-semibold">{itemCheckName.toString()}</span> {dictionary.universal.deleteMessage[lang]}
            </div>
          </DialogBody>

          <DialogFooter className="flex gap-3 justify-between">
            <Button variant="gradient" color="blue-gray" onClick={() => setNewOpen(false)} className="w-full flex-1">
              <span>{dictionary.universal.cancel[lang]}</span>
            </Button>
            <Button variant="gradient" color="red" onClick={handleDelete} className="w-full flex-1">
              <span>{dictionary.universal.delete[lang]}</span>
            </Button>
          </DialogFooter>
        </Dialog>

        <Dialog open={openBomAdd} handler={handleOpenBom}>
          <DialogHeader className="text-lg text-blue-gray-700">{dictionary.dialogheader.additemtobom[lang]}</DialogHeader>
          <DialogBody className="p-0">
            <div className="search-bar w-[90%] mx-auto mt-1">
              <SearchNavbar onSearch={handleFilterItem} value={keywordItem} label={dictionary.search.itembom[lang]} />
            </div>

            <div className="max-h-[60vh] overflow-y-auto">
              <List className="divide-y divide-dashed divide-gray-400">
                <BOMItemScroll
                  item={bomItems}
                  setItem={setItem}
                  onLoad={() => setPageItem(pageItem + 1)}
                  infinite={!keywordItem}
                  // onPrint={handlePrint}
                />
              </List>
            </div>
          </DialogBody>
          <DialogFooter>
            <Button variant="gradient" color="red" onClick={() => setOpenBomAdd(false)} className="mr-1">
              <span>{dictionary.universal.cancel[lang]}</span>
            </Button>
          </DialogFooter>
        </Dialog>

        <Dialog open={openImport} handler={() => setOpenImport(false)}>
          <DialogHeader className="text-lg pb-0">Import Excel</DialogHeader>
          <DialogBody className="text-sm">
            <div className="content overflow-y-auto"></div>
            <div className="mb-4">
              Sesuaikan kolom Excel dengan gambar yang diberikan. Jika terdapat lebih dari satu satuan, isi kolom dengan
              'Satuan 2', 'Satuan 3', dan seterusnya.
            </div>
            <div className="mb-1 overflow-x-auto">
              <img src={panduanxls} alt="panduan" className="max-w-none p-1 rounded-md bg-blue-gray-200" />
            </div>
            <div className="mb-3 text-center text-xs">Panduan penggunaan dalam format Excel</div>

            <div className="flex items-center text-left text-xs">
              <Checkbox
                size={4}
                color="teal"
                checked={checkedImport}
                onChange={() => setCheckedImport(!checkedImport)}
              />
              <span onClick={() => setCheckedImport(!checkedImport)}>Update stok jika kode item yang sama</span>
            </div>
            <div className={`${checkedImport ? "block" : "hidden"} mb-4 text-xs p-2 bg-yellow-100 rounded-md`}>
              Harap perhatikan Kode Item pada sheet Anda. Kode Item yang sudah ada dalam sistem / database akan dianggap
              sebagai pembaruan stok. Hanya kode baru yang akan ditambahkan sebagai item baru.
            </div>

            <div className="action-area flex flex-col gap-2">
              <input type="file" id="selectedFile" onChange={handleFileUpload} className="hidden" />
              <div className="flex gap-2 justify-between">
                <Button
                  className="w-[60%] px-1"
                  variant="gradient"
                  color="brown"
                  onClick={() => document.getElementById("selectedFile").click()}
                >
                  Import File Excel
                </Button>
                <Button
                  variant="gradient"
                  color={dataxls ? "teal" : "blue-gray"}
                  onClick={handleImport}
                  className={`w-[40%] px-1 ${dataxls ? "pointer-events-auto" : "pointer-events-none"}`}
                >
                  {dictionary.universal.apply[lang]}
                </Button>
              </div>
              <div className="flex gap-2 justify-between">
              <Button variant="gradient" color={"purple"} onClick={handleDownload} className="w-full px-1">
                Download Template
              </Button>
              <Button onClick={() => setOpenImport(false)} className="w-[50%] px-1 text-blue-gray-700 bg-blue-gray-100">
                {dictionary.universal.cancel[lang]}
              </Button>
              </div>
            </div>
          </DialogBody>
        </Dialog>
        <Dialog
          open={openPrinter}
          handler={() => setOpenPrinter(false)}
          size="sm"
        >
          <DialogHeader>Setup Printer</DialogHeader>
          <DialogBody>
            {!printerLoading ? (
              <div className="mb-3">Printer belum diset-up. Set-up printer sekarang?</div>
            ) : (
              <span className="flex items-center mx-auto">
                <span>Melakukan set-up printer</span>
                <Spinner className="h-5 w-5 ml-3" color="teal" />
              </span>
            )}
            <Button className="mb-2" fullWidth variant="gradient" color="teal" onClick={()=>{handleOpenPrint();initPrinterBT()}}>
              Ya, via Bluetooth
            </Button>
            <Button className="mb-2" fullWidth variant="gradient" color="teal" onClick={initPrinterUSB}>
              Ya, via USB
            </Button>
            <Button
              className="mb-2"
              fullWidth
              variant="outlined"
              color="teal"
              onClick={() => {handleOpenPrint()}}
            >
              Nanti saja
            </Button>
          </DialogBody>
        </Dialog>
        <Dialog open={openPrint} handler={() => setOpenPrint(true)} size="lg">
          <DialogHeader>{dictionary.dialogheader.printthesticker[lang]}</DialogHeader>
          <DialogBody>
            {
              <div className="max-h-[60vh] overflow-y-auto">
                <div ref={contentRef}>
                  <div className="grid grid-cols-3 bg-gray-200">
                    {fullitems.length>1?fullitems.map((i, index) => {
                      return (
                        <div
                          key={"i" + index}
                          className={`${
                            !qrcodebarcode ? "h-52" : "h-32"
                          }  text-xs text-center bg-white border rounded-lg border-gray-500 `}
                        >
                          <div className={`relative flex ${i.itm_satuandurasi=="true"?"hidden":""}`}>
                            <div className="absolute">
                              {/* <Checkbox size={4} color="teal" checked={itemPrintId.forEach((value, key) => i.itm_id.includes(value))} onChange={()=>handleCheckPrintChange(i)}/> */}
                              <Checkbox size={4} color="teal" checked={itemPrintId.includes(i.itm_id)} onChange={()=>handleCheckPrintChange(i)}/>
                            </div>
                            {/* (itemCheckId.map((i, index) => i.itm_id)).includes(i.itm_id) */}
                            
                          </div>
                          <div className="pt-8">{i.itm_nama}</div>
                          <div>
                            {currency} {formatThousandSeparator(parseFloat(i.satuan1hrg))} / {i.satuan1}
                          </div>
                          <div className="flex justify-evenly">
                            {!qrcodebarcode ? (
                              <div className="pt-2">
                                <QRCode
                                  size={100}
                                  //style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                                  value={i.kode}
                                  viewBox={`0 0 256 256`}
                                />
                              </div>
                            ) : (
                              <div className="">
                                <Barcode width="1" height="30" fontSize="10" value={i.kode} format="CODE39" />
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    }):null}
                  </div>
                </div>
              </div>
            }
          </DialogBody>
          <DialogFooter>
            <div className="m-2">
              <div className="text-xs text-gray-700 text-center mb-[2px]">Pilih Semua</div>
              <div className="flex justify-center">
                <Switch color="light-blue" checked={checkedAllPrint} onChange={handleCheckAll} />
                {/* <Checkbox size={4} color="teal" checked={checkedAllPrint} onChange={handleCheckAll}/> */}
              </div>
            </div>
            <div className="m-2">
              <div className="text-xs text-gray-700 text-center mb-[2px]">QrCode/BarCode</div>
              <div className="flex justify-center">
                <Switch color="light-blue" onChange={() => setQrcodebarcode(!qrcodebarcode)} />
              </div>
            </div>
            {/* <Button variant="gradient" color="green" onClick={handleCheckPrint} className="w-1/3 m-2">
              Refresh
            </Button> */}
            <Button variant="gradient" color="green" 
              onClick={
                printCode
                // handleCheckPrint(); 
                // setTimeout(() => {
                //   printBill();
                // }, 1000);
              } className="w-1/3 m-2">
              Cetak
            </Button>
            <Button variant="gradient" color="red" onClick={() => setOpenPrint(false)} className="w-1/3 m-2">
              Kembali
            </Button>
          </DialogFooter>
        </Dialog>
        <Dialog
          open={openRak}
          handler={() => setOpenRak(false)}
          size="lg"
        >
          <DialogHeader>{dictionary.dialogheader.shelf[lang]}</DialogHeader>
          <DialogBody>
          <List className="divide-y divide-dashed divide-gray-400 h-[100dvh]">
            { 
              rakitems?.map((ii, indexi) => {
              return (
                <ListItem key={indexi} className="">
                  {ii?ii.rak_nama:""}
                </ListItem>
              );
              
            })}
          </List>
          </DialogBody>
        </Dialog>
        <ItemFilter
          open={openFilter}
          onClose={() => setOpenFilter(false)}
          onCheck={handleCheckFilter}
          onClear={() => setClearFilter(!clearFilter)}
          checkedIds={filters.map((i, index) => i.value)}
          categories={categoriesFilter}
        />

        {openBom ? (
          <div>
            <div className="flex items-center shrink-0 p-4 text-blue-gray-900 antialiased font-sans text-2xl font-semibold leading-snug border-b-2">
              BOM {`(${itemById.itm_nama})`}
            </div>
            <List className="divide-y divide-dashed divide-gray-400 h-[100dvh]">
              {bomList?.map((i, index) => {
                return (
                  <ListItem key={index} className="">
                    <div
                      className={`flex items-center justify-center gap-2 mb-2 w-full ${
                        i.bom_id ? "grid-cols-5" : "grid-cols-4"
                      }`}
                    >
                      <div className="w-full item-detail" onClick={() => handleInput(i)}>
                        <div className="w-full whitespace-nowrap overflow-hidden text-ellipsis font-semibold">
                          {i.itm_nama}
                        </div>
                        <div className="flex gap-1 my-1 items-start">
                          <div className="w-max py-[2px] px-2 text-[12px] font-semibold bg-orange-100 rounded-md">
                            {parseFloat(i.qty)}
                          </div>
                          <div className="w-max py-[2px] px-2 text-[12px] font-semibold bg-blue-100 rounded-md">
                            {i.itm_satuan1.toUpperCase()}
                          </div>
                        </div>
                        <Typography
                          color="gray"
                          className="w-max py-[2px] px-2 text-[15px] font-semibold bg-purple-50 rounded-md"
                        >
                          {currency} {formatThousandSeparator(parseFloat(i.itm_satuanhpp1))} / {i.itm_satuan1.toUpperCase()}
                        </Typography>
                      </div>

                      <div className="total-cost" onClick={() => handleInput(i)}>
                        <Typography
                          color="gray"
                          className="w-max py-[2px] px-2 text-[15px] font-semibold bg-green-100 rounded-md "
                        >
                          {currency} {formatThousandSeparator(i.total)}
                        </Typography>
                      </div>
                      {i.bom_id ? (
                        <IconButton variant="text" color="blue-gray" onClick={() => handleDeleteBom(i)}>
                          <TrashIcon className="h-6 w-6 text-red-500" />
                        </IconButton>
                      ) : null}
                    </div>
                  </ListItem>
                );
              })}
            </List>
            <div className="fixed bottom-28 right-4">
              <IconButton variant="filled" color="teal" className="rounded-full" size="lg" onClick={handleOpenItemBom}>
                <PlusCircleIcon className="h-8 w-8 text-black-500" />
              </IconButton>
            </div>
            <div className="fixed flex bottom-0 w-full justify-end p-4 font-semibold border-t-2 mx-auto desktop:max-w-[60%]">
              <Button
                variant="gradient"
                color="blue-gray"
                onClick={() => {
                  setOpenBom(false);
                }}
                className="w-full mr-1"
              >
                Kembali
              </Button>

              <Button variant="gradient" color="green" onClick={saveDataBom} className="w-full">
                {dictionary.universal.save[lang]}
              </Button>
            </div>
          </div>
        ) : (
          <div className="pb-32 overflow-auto h-full" style={{ paddingTop: listPadding }}>
            <div className="min-h-screen">
              
              {!items.length && !loading ? (
                <div className="mx-auto py-20 w-fit">{dictionary.stock.item.noItems[lang]}</div>
              ) : semiDesktopMode ? (
                <div>
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
                  <ItemScrollMd
                    items={items}
                    onCheck={handleCheckChange}
                    checkedIds={itemCheckId}
                    onOpen={handleOpen}
                    onEdit={handleEdit}
                    onLoad={() => setPage(page + 1)}
                    infinite={!keyword}
                    onBom={handleBom}
                  />
                </div>
              ) : (
                <div>
                  {/* <div className="w-full flex gap-3 text-xs text-gray-700 px-[5%]">
                    <div className="flex gap-1">
                      <div className="w-max py-2 px-2 text-[12px] font-semibold bg-orange-100 rounded-sm"></div>
                      <div>Kode Item1</div>
                    </div>
                    <div className="flex gap-1">
                      <div className="w-max py-2 px-2 text-[12px] font-semibold bg-green-100 rounded-sm"></div>
                      <div>Stok</div>
                    </div>
                    <div className="flex gap-1">
                      <div className="w-max py-2 px-2 text-[12px] font-semibold bg-blue-100 rounded-sm"></div>
                      <div>Satuan</div>
                    </div>
                  </div> */}

                  {/* <List className="divide-y divide-dashed divide-gray-400">
                    <ItemScrollSm
                      items={items}
                      onCheck={handleCheckChange}
                      checkedIds={itemCheckId}
                      onOpen={handleOpen}
                      onEdit={handleEdit}
                      onLoad={() => setPage(page + 1)}
                      infinite={!keyword}
                      onBom={handleBom}
                    />
                  </List> */}
<div>
      <h2>Daftar Produk</h2>
{items.map((item) => (
  <div 
    key={item.itm_kode} 
    style={{
      border: "1px solid #ccc",
      padding: "10px",
      margin: "10px 0",
      display: "flex",               // <-- buat sejajar
      justifyContent: "space-between", // <-- pisahkan kiri-kanan
      alignItems: "center"
    }}
  >
    {/* Bagian info proyek */}
    <div>
      <h3>{item.itm_nama}</h3>
      <p><strong>Kode:</strong> {item.itm_kode}</p>
      <p><strong>Kategori:</strong> {item.itm_kategori}</p>
      <p><strong>Nama:</strong> {item.itm_nama}</p>
      <p><strong>Harga:</strong> {item.itm_satuan1hpp}</p>
    </div>

    {/* Tombol hapus di kanan */}
          <div>
          <IconButton
                variant="filled"
                color="blue-gray"
                // className={
                //   itemCheckId.length > 0 ? "rounded-full pointer-events-auto" : "rounded-full pointer-events-none"
                // }
                size="lg"
                onClick={()=>handleEdit(item)}
              >
                <PencilIcon className="h-8 w-8 text-black-500" />
              </IconButton>&nbsp;
          <IconButton
                variant="filled"
                color="blue-gray"
                size="lg"
                onClick={()=>handleNewOpen(item.itm_id)}
              >
                <TrashIcon className="h-8 w-8 text-black-500" />
              </IconButton>
          </div>
      </div>
  ))}
    </div>                

                </div>
              )}
            </div>
            <div className="fixed bottom-52 right-4">
              <IconButton
                variant="filled"
                color="teal"
                className="rounded-full"
                size="lg"
                onClick={() => printerState==1?handleOpenPrint():setOpenPrinter(true)}
              >
                <PrinterIcon className="h-8 w-8 text-black-500" />
              </IconButton>
            </div>
            <div className="fixed bottom-36 right-4">
              <IconButton variant="filled" color="teal" className="rounded-full" size="lg">
                {/* <input type="file" id="selectedFile" style={{display:"none"}} onChange={handleFileUpload}/> */}
                <img
                  src={excellogo}
                  alt="pdf"
                  className="max-w-[24px] h-8 w-8 text-white-500"
                  onClick={() => setOpenImport(true)}
                />
              </IconButton>
            </div>
            <div className="fixed bottom-20 right-4">
              <IconButton variant="filled" color="teal" className="rounded-full" size="lg" onClick={() => handleAdd()}>
                <PlusIcon className="h-8 w-8 text-black-500" />
              </IconButton>
            </div>
            <div className="fixed bottom-4 right-4">
              <IconButton
                variant="filled"
                color={itemCheckId.length > 0 ? "red" : "blue-gray"}
                className={
                  itemCheckId.length > 0 ? "rounded-full pointer-events-auto" : "rounded-full pointer-events-none"
                }
                size="lg"
                onClick={handleNewOpen}
              >
                <TrashIcon className="h-8 w-8 text-black-500" />
              </IconButton>
            </div>
          </div>
        )}

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
                  <SearchNavbar onSearch={handleFilter} value={keyword} label={dictionary.search.item[lang]} />
                </div>
                <IconButton size="md" variant="text" onClick={handleRak}>
                  <div className="justify-items-center lowercase">
                    <InboxStackIcon className="h-6 w-6 stroke-2" />
                    <div style={{ fontSize: "10px", padding: "0px" }}>Rak</div>
                  </div>
                </IconButton>
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
