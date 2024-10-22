import { Fragment, useCallback, useContext, useEffect, useRef, useState } from "react";
import { getItems, saveItem, deleteItem, categoriesItem, getBoms, addBom, saveBom, deleteBom, checkCode } from "../../api/Item";
import { AppContext } from "../../AppContext";
import { Button, Checkbox, Dialog, DialogHeader, DialogBody, DialogFooter, IconButton, Input, List, ListItem,
  Navbar, Option, Switch, Select, Typography} from "@material-tailwind/react";
import SearchNavbar from "../../lib/SearchNavbar";
import { AdjustmentsVerticalIcon, Bars3Icon, TrashIcon, PlusIcon, PlusCircleIcon, ArrowUpTrayIcon } from "@heroicons/react/24/outline";
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
import * as XLSX from 'xlsx';
import excellogo from "../../assets/icons/excel-logo.png";
import panduanxls from "../../assets/image/Itemimport.png";
export default function ItemList() {
  const { setMenuOpen, filters, semiDesktopMode, desktopMode, setFilters, lang, currency, cookies, rowsPerPage } = useContext(AppContext);
  const [listPadding, setListPadding] = useState("20px");
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([ItemListModel()]);
  const [itemDisplay, setItemDisplay] = useState(ItemListModel());
  const navbarRef = useRef();
  const [open, setOpen] = useState(false);
  const [newOpen, setNewOpen] = useState(false);
  const [readonly, setReadonly] = useState(false);
  const [itmindex, setitmindex] = useState(-1);
  const [itemById, setItemById] = useState({});
  const [itemCheckId, setItemCheckId] = useState([]);
  const [categoryCheckKey, setCategoryCheckKey] = useState([]);
  const [categoryNewCheckKey, setCategoryNewCheckKey] = useState([]);
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
  const [dataxls, setDataxls] = useState(null);
  const handleFilter = (searchKey) => {
    setKeyword(searchKey);
  };
  const openDrawerRight = () => setOpenFilter(true);
  const handleFilterItem = (searchKey) => {
    setKeywordItem(searchKey);
  };
  useEffect(() => {
    setItems([]);
    setPage(1);
    setTimeout(() => initData(), 100);
  }, [keyword, filters, refreshflag]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    setDataxls([]);
    reader.onload = (event) => {
      const workbook = XLSX.read(event.target.result, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const sheetData = XLSX.utils.sheet_to_json(sheet);
      setDataxls(sheetData);
    };

    reader.readAsArrayBuffer(file);
    setOpenImport(true)
  };
  
  const handleImport = useCallback(async () => {
    let strImport=JSON.stringify(dataxls);
    let strRepair=strImport.replace('Nama', 'itm_nama').replace('Kode', 'itm_kode').replace('Satuan 1', 'itm_satuan1')
    .replace('Harga Awal Satuan 1', 'itm_satuan1hpp').replace('Harga Jual Satuan 1', 'itm_satuan1hrg')
    .replace('Satuan 2', 'itm_satuan2').replace('Harga Awal Satuan 2', 'itm_satuan2hpp')
    .replace('Harga Jual Satuan 2', 'itm_satuan2hrg').replace('Satuan 3', 'itm_satuan3')
    .replace('Harga Awal Satuan 3', 'itm_satuan3hpp').replace('Harga Jual Satuan 3', 'itm_satuan3hrg')
    let arrImport = JSON.parse(strRepair);
    setItemById({ itm_id: -1, itm_gallery: 1, itm_stok: 0, itm_lok_id: cookies.lok_id, itm_satuan1hrg: 0, itm_satuan1hpp: 0 });
    if(!arrImport[0].itm_nama||!arrImport[0].itm_kode||!arrImport[0].itm_satuan1||!arrImport[0].itm_satuan1hpp||!arrImport[0].itm_satuan1hrg)
    {
      alert('Nama Kolom Header tidak sesuai format')
      setCheckcode(1)
    }
    arrImport.forEach((item, index) => {
      item.itm_id= -1, 
      item.itm_gallery= 1, 
      item.itm_stok= 0, 
      item.itm_lok_id= cookies.lok_id,
      item.itm_pakaistok= 0,
      item.itm_sellable= 1,
      item.itm_buyable= 1
    });
    setLoading(true);
    let tasks = [];
    let k=0;
    if(checkcode==0){
      for (let i = 0; i < arrImport.length; i++) {
        const { data, error } = await saveItem(arrImport[i]);
        if (error) {
          alert(error.message);
          setOpenImport(false);
          setDataxls(null);
        } else {
          setOpenImport(false);
          setCheckcode(0)
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
  }, [dataxls,checkcode]);

  useEffect(() => {
    if (page > 1) initData();
  }, [page]);

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

  function handleEdit(item, index) {
    setitmindex(index);
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

  function handleOpen(item, index) {
    setitmindex(index);
    setReadonly(true);
    setOpen(!open);
    setItemById(item);
    settxtTitle("Detail Item");
    setMode(1);
    setSwitchValueCategory(false);
    setCategorySelect(item.itm_kategori);
  }

  function handleOpenBom(item, index) {
  }

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
    setOpenBomAdd(true);
  }

  function handleNewOpen(item, setedit, index) {
    cookies.role_delete.length == 0 && cookies.role_dst.length == 0
      ? setNewOpen(!newOpen)
      : cookies.role_dst.findIndex((a) => a == "ALL") >= 0
      ? setNewOpen(!newOpen)
      : cookies.role_delete.findIndex((a) => a == "ITM") >= 0
      ? setNewOpen(!newOpen)
      : setNewOpen(false);
  }

  function handleAdd() {
    setItemById(ItemListModel());
    setReadonly(false);
    settxtTitle("Tambah Item");
    setMode(3);
    setOpen(true);
    setCheckedSellable(parseInt(ItemListModel().itm_sellable)==1?true:false)
    setCheckedBuyable(parseInt(ItemListModel().itm_buyable)==1?true:false)
    cookies.role_create.length == 0 && cookies.role_dst.length == 0
      ? setOpen(!open)
      : cookies.role_dst.findIndex((a) => a == "ALL") >= 0
      ? setOpen(!open)
      : cookies.role_create.findIndex((a) => a == "ITM") >= 0
      ? setOpen(!open)
      : setOpen(false);
    setServices([]);
  }

  const handleDelete = useCallback(async () => {
    const uniqueNames = [];
    const _itemCheckId = [...itemCheckId];
    let temparray = [];
    _itemCheckId.map((i, index) => {
      if (uniqueNames.includes(i) == false) {
        uniqueNames.push(i);
        // temparray = items.filter(function(item) {
        //     return item.itm_id !== i;
        // });
      }
    });
    await Promise.all(
      uniqueNames.map((i) => {
        return deleteItem({ itm_id: i });
      })
    );

    setItemCheckId([]);
    setItemCheckName([]);
    setLoading(true);
    const { data, error } = await getItems({ lok_id: cookies.lok_id });
    if (error) {
      alert("Data tidak ditemukan");
    } else {
      setItems(data);
      setNewOpen(false);
    }
    setLoading(false);
  }, [itemCheckId, items]);

  const handleSetImage = (url) => {
    setItemById({
      ...itemById,
      itm_urlimage1: url,
    });
  };

  const handleChange = (evt, id) => {
    let value=evt.target.value
    if(id=="itm_satuan1"||id=="itm_satuan2"||id=="itm_satuan3"){
      value=(evt.target.value).replace(/[0-9]/g, '');
    }
    setItemById({
      ...itemById,
      [id]: evt.target.value,
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
    },[itemCheckId]
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
      return object.key !== "category";
    });
    setFilters(_newfilter);
  }, [clearFilter]);

  const setFilterChips = (filterChips) => {
    setPage(1);
    setItems([]);
    setFilters(filterChips);
  };

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
    if(itemById.itm_nama=="")
      alert("Nama item tidak boleh kosong");
    else if(itemById.itm_kode=="")
      alert("Kode item tidak boleh kosong");
    else if(itemById.itm_satuan1=="")
      alert("Satuan item tidak boleh kosong");
    else{
      const { data, error } = await saveItem(itemById);
      if (error) {
        alert("Gagal menyimpan");
      } else {
        setLoading(true);
        setOpen(false);
        setItems([]);
        const { data: itemData, error } = await getItems({
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
            setCategories(data);
            setServices([]);
            setRefreshKategori(refreshKategori);
          }
          setItems(itemData);
        }
        setLoading(false);
      }

    }
  }, [itemById, services, checkedSellable, checkedBuyable,refreshKategori]);

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
      setLoading(false);
    });
  }, [bomList]);

  useEffect(() => {
    if (keywordItem && keywordItem.length > 1) {
      const orderSearch = setTimeout(async () => {
        setPage(1);
        setLoading(true);
        const { data, error } = await getItems({
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
        const { data, error } = await getItems({
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
      alert("Data tidak ditemukan");
    } else {
      setBomItems(convertItemListToCheckout(data));
    }
  };

  useEffect(() => {
    if (bomItems[0] && bomItems[0].itm_id && !filters[0]) {
      const init = async () => {
        const { data, error } = await getItems({
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
      alert("Terjadi Kesalahan");
    } else {
      const _item = data;
      setBomItems([...bomItems, ..._item]);
    }
  };

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

  const handleDownload = () => {
    var table_elt = document.getElementById("my-table-id");

    // Extract Data (create a workbook object from the table)
    var workbook = XLSX.utils.table_to_book(table_elt);
    var ws = workbook.Sheets["Sheet1"];
    XLSX.utils.sheet_add_aoa(ws, [["Nama"]], {origin:"A1"});
    XLSX.utils.sheet_add_aoa(ws, [["Kode"]], {origin:"B1"});
    XLSX.utils.sheet_add_aoa(ws, [["Satuan 1"]], {origin:"C1"});
    XLSX.utils.sheet_add_aoa(ws, [["Harga Awal Satuan 1"]], {origin:"D1"});
    XLSX.utils.sheet_add_aoa(ws, [["Harga Jual Satuan 1"]], {origin:"E1"});
    XLSX.utils.sheet_add_aoa(ws, [["Satuan 2"]], {origin:"F1"});
    XLSX.utils.sheet_add_aoa(ws, [["Harga Awal Satuan 2"]], {origin:"G1"});
    XLSX.utils.sheet_add_aoa(ws, [["Harga Jual Satuan 2"]], {origin:"H1"});
    XLSX.utils.sheet_add_aoa(ws, [["Satuan 3"]], {origin:"I1"});
    XLSX.utils.sheet_add_aoa(ws, [["Harga Awal Satuan 3"]], {origin:"J1"});
    XLSX.utils.sheet_add_aoa(ws, [["Harga Jual Satuan 3"]], {origin:"K1"});
    
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

  const handleChangeQty = (evt, id) => {
    const _bomList = cloneDeep(bomList);
    setQty(evt.target.value);
    
    const bomindex = _bomList.findIndex((a) => a.bom_itm_id_bahan == bomById.bom_itm_id_bahan);
    _bomList[bomindex].bom_qty = evt.target.value;
    _bomList[bomindex].qty = evt.target.value;
    _bomList[bomindex].total = _bomList[bomindex].satuan0hpp * evt.target.value;
    _bomList[bomindex].bom_hpp = _bomList[bomindex].satuan0hpp * evt.target.value;
    setBomList(_bomList);
  };

  const handleCloseQty = useCallback(() => {
    setOpenInput(false)
    if(qty==0){
      alert("Kuantiti tidak boleh 0")
      const _bomList = cloneDeep(bomList);
      const bomindex = _bomList.findIndex((a) => a.bom_itm_id_bahan == bomById.bom_itm_id_bahan);
      _bomList[bomindex].bom_qty = qtyTemp;
      _bomList[bomindex].qty = qtyTemp;
      _bomList[bomindex].total = _bomList[bomindex].satuan0hpp * qtyTemp;
      _bomList[bomindex].bom_hpp = _bomList[bomindex].satuan0hpp * qtyTemp;
      setBomList(_bomList);
    }
  },
  [qty, qtyTemp, bomList, bomById]);

  const handleCancelInput = useCallback(() => {
    const _bomList = cloneDeep(bomList);
    const bomindex = _bomList.findIndex((a) => a.itm_id_bahan == bomById.itm_id_bahan);
    _bomList[bomindex].bom_qty = qtyTemp;
    _bomList[bomindex].qty = qtyTemp;
    _bomList[bomindex].total = _bomList[bomindex].satuan0hpp * qtyTemp;
    _bomList[bomindex].bom_hpp = _bomList[bomindex].satuan0hpp * qtyTemp;
    setBomList(_bomList);
    setOpenInput(false);
  },[qtyTemp]);

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
      setItemById(item);
    },
    [checkedSellable, checkedBuyable]
  );

  return (
    <Fragment>
      <table id="my-table-id"></table>
      {!loading ? null : <LoadingOverlay white />}
      <div className="h-screen-adapt bg-gray-50 overflow-hidden relative">
      <Dialog
        open={open}
        handler={handleOpen}
        dismiss={{ outsidePress: () => setOpen(false) }}
        size={`${desktopMode ? "" : "xxl"}`}
        >
          <DialogHeader className="border-b-2">{txtTitle}</DialogHeader>
          <DialogBody className={`overflow-auto pb-10`}>
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
                value={itemById.itm_nama}
                label="Nama Item"
                onChange={(evt) => handleChange(evt, "itm_nama")}
                disabled={readonly}
              />
            </div>

            {cookies.lok_type == "laundry" ? null : (
              <div className="grid grid-cols-2 mb-4">
                <div className="">
                  {switchValueCategory ? (
                    <InputSimple
                      value={switchValueCategory ? null : itemById.itm_kategori}
                      label="Kategori Baru"
                      onChange={(evt) => handleChange(evt, "itm_kategori")}
                    />
                  ) : (
                    <div>
                      {
                        // !categories.length?<InputSimple
                        // label="Kategori"
                        // disabled={true}
                        // />:
                        <Select
                          id="category"
                          value={`${categorySelect}`}
                          onChange={setCategorySelect}
                          color="teal"
                          label="Kategori"
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
                  <div className="text-xs ml-2 text-center">Kategori Baru</div>
                  <div className="flex justify-center">
                    <Switch
                      color="teal"
                      disabled={readonly}
                      onChange={() => setSwitchValueCategory(!switchValueCategory)}
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="mb-4">
              <InputSimple
                value={itemById.itm_kode}
                label="Kode Item"
                onChange={(evt) => handleChange(evt, "itm_kode")}
                disabled={readonly}
              />
            </div>
            <div className="mb-4">
              <InputSimple
                value={itemById.itm_satuan1}
                label="Satuan"
                onChange={(evt) => handleChange(evt, "itm_satuan1")}
                disabled={readonly}
              />
            </div>

            <div className="buysell-area flex gap-3 justify-between items-center mb-4">
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
            </div>

            {cookies.lok_type == "laundry" ? null : (
              <div className="mb-6">
                <InputMoney
                  currency={currency}
                  disabled={readonly}
                  label="Harga Awal"
                  onChange={(evt) => handleChange(evt, "itm_satuan1hpp")}
                  value={itemById.itm_satuan1hpp}
                />
              </div>
            )}

            <div className="mt-6 mb-4">
              <InputMoney
                currency={currency}
                disabled={readonly}
                label={cookies.lok_type == "laundry" ? "Harga Jasa Normal" : "Harga Jual"}
                onChange={(evt) => handleChange(evt, "itm_satuan1hrg")}
                value={itemById.itm_satuan1hrg}
              />
            </div>

            {
              // cookies.lok_type=="laundry"?
              // <div className="mb-6">
              // <InputSimple value={itemById.itm_service_level_satuan1}
              //     label="Level Laundry"
              //     onChange={(evt)=>handleChange(evt, "itm_service_level_satuan1")}
              //     disabled={readonly}
              // />
              // </div>:
              // null
            }

            {cookies.lok_type == "laundry"
              ? services?.map((i, index) => {
                  return (
                    <div className="setlevel-item flex flex-col gap-4 mb-4 p-3 pt-6 bg-blue-gray-50 rounded-md">
                      <InputMoney
                        currency={currency}
                        disabled={readonly}
                        label="Biaya"
                        onChange={(evt) => handleChangeService(evt, "hrg", i, index)}
                        value={i.hrg}
                      />
                      <div className="flex gap-2 justify-between items-center">
                        <InputSimple
                          value={i.level}
                          label="Level"
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
          </DialogBody>

          <DialogFooter className="flex gap-3 justify-between">
            <Button variant="gradient" color="blue-gray" onClick={() => setOpen(false)} className="w-full flex-1">
              <span>{mode <= 1 ? "Kembali" : "Batal"}</span>
            </Button>
            <Button
              className={mode <= 1 ? "hidden" : "block w-full flex-1"}
              variant="gradient"
              color="green"
              onClick={saveData}
            >
              <span>Confirm</span>
            </Button>
          </DialogFooter>
        </Dialog>

        <Dialog open={newOpen} handler={handleNewOpen}>
          <DialogBody>
            <div className="text-center my-6">
              Item <span className="font-semibold">{itemCheckName.toString()}</span> akan dihapus. Apakah anda yakin?
            </div>
          </DialogBody>

          <DialogFooter className="flex gap-3 justify-between">
            <Button variant="gradient" color="blue-gray" onClick={() => setNewOpen(false)} className="w-full flex-1">
              <span>Batal</span>
            </Button>
            <Button variant="gradient" color="red" onClick={handleDelete} className="w-full flex-1">
              <span>Hapus</span>
            </Button>
          </DialogFooter>
        </Dialog>

        <Dialog open={openBomAdd} handler={handleOpenBom}>
          <DialogHeader className="text-lg text-blue-gray-700">Tambah Item ke BOM</DialogHeader>
          <DialogBody className="p-0">
            <div className="search-bar w-[90%] mx-auto mt-1">
              <SearchNavbar onSearch={handleFilterItem} value={keywordItem} label="Cari Item" />
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
              <span>Cancel</span>
            </Button>
          </DialogFooter>
        </Dialog>

        <Dialog open={openInput} handler={handleInput}>
          <DialogHeader>{dictionary.cashier.pos.inputHeader[lang]}</DialogHeader>
          <DialogBody>
            <div className="mb-4">
              <Input
                type="number"
                label="Qty"
                value={qty}
                onChange={(evt) => handleChangeQty(evt, bomById.itm_id_bahan)}
              ></Input>
            </div>
            <Button className="mb-4 mr-2" variant="gradient" color="red" onClick={handleCloseQty}>
              Kembali
            </Button>
          </DialogBody>
        </Dialog>
        <Dialog open={openImport} handler={() => setOpenImport(false)}>
          <DialogHeader>Import Excel</DialogHeader>
          <DialogBody>
            <div className="mb-4">
              Sesuaikan kolom excel sesuai dengan gambar. Jika memiliki satuan lebih dari satu, bisa diisi satuan 2 dst
            </div>
            <div className="mb-4">
              <img src={panduanxls} alt="panduan" className="text-white-500" />
            </div>
            <input type="file" id="selectedFile" style={{display:"none"}} onChange={handleFileUpload}/>
            <Button className="mb-4 mr-2" variant="gradient" color="blue" onClick={() => document.getElementById('selectedFile').click()}>
              Import File Excel
            </Button>
            <Button variant="gradient" color={dataxls ? "teal" : "blue-gray"} onClick={handleImport} className={`mb-4 mr-2 ${
                  dataxls ? "pointer-events-auto" : "pointer-events-none"}
                `}>
              Terapkan
            </Button>
            <Button variant="gradient" color={"green"} onClick={handleDownload} className="mb-4 mr-2">
              Download Template
            </Button>
          </DialogBody>
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

        {openBom ? (
          <div>
            <div className="flex items-center shrink-0 p-4 text-blue-gray-900 antialiased font-sans text-2xl font-semibold leading-snug border-b-2">
              BOM {`(${itemById.itm_nama})`}
            </div>
            <List className="divide-y divide-dashed divide-gray-400 h-[100dvh]">
              {bomList?.map((i, index) => {
                return (
                  <ListItem key={index} className="">
                    <div className={`grid  mb-2 w-[100%] ${i.bom_id ? "grid-cols-5" : "grid-cols-4"}`}>
                      <div className=" flex flex-col gap-1 col-span-3" onClick={() => handleInput(i)}>
                        <div className="w-[100%] whitespace-nowrap overflow-hidden text-ellipsis font-semibold">
                          {i.itm_nama}
                        </div>
                        <div className="flex gap-1 items-start">
                          <div className="w-max py-[2px] px-2 text-[12px] font-semibold bg-orange-100 rounded-md">
                            {parseFloat(i.qty)}
                          </div>
                          <div className="w-max py-[2px] px-2 text-[12px] font-semibold bg-blue-100 rounded-md">
                            / {i.satuan0.toUpperCase()}
                          </div>
                        </div>
                        <Typography
                          color="gray"
                          className="w-max py-[2px] px-2 text-[15px] font-semibold bg-green-100 rounded-md"
                        >
                          {currency} {formatThousandSeparator(i.satuan0hpp)}
                        </Typography>
                      </div>

                      <div className="w-[100%] flex flex-col gap-1 justify-center" onClick={() => handleInput(i)}>
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
            <div className="fixed flex bottom-0 w-full justify-end shrink-0 p-4 text-blue-gray-900 antialiased font-sans text-2xl font-semibold leading-snug border-t-2">
              <Button
                variant="gradient"
                color="red"
                onClick={() => {
                  setOpenBom(false);
                }}
                className="mr-1"
              >
                <span>Kembali</span>
              </Button>

              <Button className="block" variant="gradient" color="green" onClick={saveDataBom}>
                <span>Simpan</span>
              </Button>
            </div>
          </div>
        ) : (
          <div className="pb-32 overflow-auto h-full" style={{ paddingTop: listPadding }}>
            <div className="min-h-screen">
              {!items.length && !loading ? (
                <div className="mx-auto py-20 w-fit">{dictionary.stock.item.noItems[lang]}</div>
              ) : semiDesktopMode ? (
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
              ) : (
                <div>
                  <div className="w-full flex justify-end gap-1 text-xs text-gray-700 px-2"> 
                    <div>Kode Item</div>
                    <div className="w-max py-2 px-2 text-[12px] font-semibold bg-orange-100 rounded-sm"></div>
                    <div>Stok</div>
                    <div className="w-max py-2 px-2 text-[12px] font-semibold bg-green-100 rounded-sm"></div>
                    <div>Satuan</div>
                    <div className="w-max py-2 px-2 text-[12px] font-semibold bg-blue-100 rounded-sm"></div>
                  </div>
                  <List className="divide-y divide-dashed divide-gray-400">
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
                  </List>
                </div>
              )}
            </div>
            <div className="fixed bottom-36 right-4">
              <IconButton variant="filled" color="teal" className="rounded-full" size="lg">
                {/* <input type="file" id="selectedFile" style={{display:"none"}} onChange={handleFileUpload}/> */}
                <img src={excellogo} alt="pdf" className="max-w-[24px] h-8 w-8 text-white-500" onClick={() => setOpenImport(true)}/>
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
                  <Bars3Icon className="h-6 w-6 stroke-2" />
                </IconButton>
                <div className="mx-2 flex-grow">
                  <SearchNavbar onSearch={handleFilter} value={keyword} label={"Cari Barang (Stok Item)"} />
                </div>
                <IconButton size="md" variant="text" onClick={openDrawerRight}>
                  <AdjustmentsVerticalIcon className="h-6 w-6 stroke-2" />
                </IconButton>
              </div>
              {!filters.length ? (
                <Typography variant="small" color="gray" className="absolute right-14 bottom-1 text-xs italic">
                  Semua Kategori
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
