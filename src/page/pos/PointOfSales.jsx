import { Button, Dialog, DialogBody, DialogHeader, DialogFooter,
  IconButton, List, ListItem, Navbar, Typography, Input, Spinner,
} from "@material-tailwind/react";
import { Fragment, useCallback, useContext, useEffect, useRef, useState } from "react";
import SearchNavbar from "../../lib/SearchNavbar";
import { Bars3Icon, ShoppingCartIcon, BookmarkIcon, AdjustmentsVerticalIcon, QrCodeIcon } from "@heroicons/react/24/outline";
import FilterChips from "../../lib/FilterChips";
import { AppContext } from "../../AppContext";
import { getItems, categoriesItem } from "../../api/Item";
import { getGeneralSetting, addGeneralSetting } from "../../api/GeneralSetting";
import { config } from "../../api/Login";
import { readDraftPos } from "../../api/Pos";
import { ItemCheckoutModel, convertItemListToCheckout, convertDraftListToCheckout, convertItemListToCheckoutNew } from "../../model/item";
import { formatThousandSeparator } from "../../util/formatter";
import { dictionary } from "../../constant/appDictionary";
import { useNavigate } from "react-router-dom";
import { topic } from "../../constant/appTopics";
import { PRINTER_STATE_NONE, PRINTER_STATE_SKIP, TIME_SEARCH_DEBOUNCE } from "../../constant/appCommon";
import LoadingOverlay from "../../lib/LoadingOverlay";
import POSItemScrollSm from "./POSItemScrollSm";
import POSItemScrollMd from "./POSItemScrollMd";
import POSItemScrollSmJasa from "./POSItemScrollSmJasa";
import POSItemScrollMdJasa from "./POSItemScrollMdJasa";
import ItemFilter from "../item/ItemFilter";
import { cloneDeep } from "lodash";
import { FilterItemModel } from "../../model/filter";
import BarcodeScanner from "../../lib/BarcodeScanner";

export default function PointOfSales() {
  const {
    initPrinterBT,
    initPrinterUSB,
    printerState,
    setPrinterState,
    printerLoading,
    setMenuOpen,
    filters,
    setFilters,
    currency,
    isMobile,
    itemsCheckout,
    setItemsCheckout,
    lang,
    cookies,
    semiDesktopMode,
    rowsPerPage,
    setCookies,
    setDiskonGlobal,
    setPajakGlobal,
    setPajakGlobalJSON,
    setCustomerGlobal,
    setTableGlobal,
    diskonGlobal,
    pajakGlobal,
    pajakGlobalJSON,
    removeCookies,
    privacy,
    setPrivacy
  } = useContext(AppContext);
  const [listPadding, setListPadding] = useState("20px");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [items, setItems] = useState([ItemCheckoutModel()]);
  const navbarRef = useRef();
  const [keyword, setKeyword] = useState("");
  const [keydown, setKeydown] = useState({});
  const [contextMenuItem, setContextMenuItem] = useState(null);
  const [draftItems, setDraftItems] = useState([]);
  const [draftOpen, setDraftOpen] = useState(false);
  const [inputOpen, setInputOpen] = useState(false);
  const [cartOptions, setCartOption] = useState(false);
  const [page, setPage] = useState(1);
  const [selectedItems, setSelectedItems] = useState([]);
  const [qty, setQty] = useState(1);
  const [diskon, setDiskon] = useState(0);
  const [itemScan, setItemScan] = useState({});
  const [openFilter, setOpenFilter] = useState(false);
  const [clearFilter, setClearFilter] = useState(false);
  const [keywordDraft, setKeywordDraft] = useState("");
  const [itemsCount, setItemsCount] = useState(0);
  const openDrawerRight = () => setOpenFilter(true);
  const [categories, setCategories] = useState([]);
  const [local, setLocal] = useState([]);
  const [totalitem, settotalitem] = useState(0);
  const [openScanner, setOpenScanner] = useState(false);
  const [keywordScanner, setKeywordScanner] = useState("");
  const [onfocus, setOnfocus] = useState(false);
  const [scanMode, setScanMode] = useState(1);
  ///////////////////////mulai koding////////////////////

  const initData = useCallback(() => {
    if(!cookies.time_now)
      navigate(topic.reLogin.route);
    const _categoryFilter = filters.find((f) => f.key === "category");
    const _filters = cloneDeep(filters);
    let _newfilter = _filters.filter(function (object) {
      return object.key === "category";
    });
    // let _filter = _filters.filter(function (object) {
    //   return object.key === "category"||object.key ==="search";
    // });
    // setFilters(_filter)
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
    // if(_filters.length>0){
    //   localStorage.removeItem('pos_item');
    // }
    // if(localStorage.getItem("pos_item")){
    //   JSON.parse(JSON.parse(localStorage.getItem("pos_item")).value)
    // }
    if (keyword && keyword.length > 0) {
      const orderSearch = setTimeout(async () => {
        // setPage(1);
        localStorage.removeItem("pos_item");
        setLoading(true);
        const { data, error } = await getItems({
          lok_id: cookies.lok_id,
          key_val: keyword,
          page: page,
          rows: rowsPerPage,
          sellable: "true",
          ...filterProps,
        });
        if (page <= 1) handleResponse({ data, error });
        else handleAppendResponse({ data, error });
        setLoading(false);
      }, TIME_SEARCH_DEBOUNCE);
      return () => {
        console.log(keyword)
        clearTimeout(orderSearch);
      };
    } else if (!keyword) {
      const init = async () => {
        setLoading(true);
          if (page <= 1) {
            if (localStorage.pos_item) {
              const _items = JSON.parse(localStorage.getItem("pos_item")).value;
              setItems(_items);
            }
            else{
              setItems([])
              const { data, error } = await getItems({
                lok_id: cookies.lok_id,
                page: page,
                rows: rowsPerPage,
                sellable: "true",
                ...filterProps,
              });
              if (error) alert(dictionary.universal.erroroccured[lang]);
              else handleResponse({ data, error });
            }
            // }
          } else {
            if (localStorage.pos_item&&JSON.parse(localStorage.pos_item).page<=page) {
              // const _items = JSON.parse(localStorage.getItem("pos_item")).value;
              // setItems(_items);
            // }
            // else{
              const { data, error } = await getItems({
                lok_id: cookies.lok_id,
                page: page,
                rows: rowsPerPage,
                sellable: "true",
                ...filterProps,
              });
              if (error) alert("Item ke-" + page * 20 + " keatas belum sempat tersimpan di lokal");
              else handleAppendResponse({ data, error });
            }
          }

        
        setLoading(false);
      }
      init();
    }
  }, [keyword, filters, page, keydown, local]);

  useEffect(() => {
    setItems([]);
    setPage(1);
    initData();
  }, [keyword, filters, keydown]);

  useEffect(() => {
    if (page > 1) initData();
    else{
      if(!filters)
      {
        const _filters = cloneDeep(filters);
        let __filter = _filters.filter(function (object) {
          return object.key === "category"||object.key ==="search";
        });
        setFilters(__filter)
      }
    }
  }, [page]);

  const handleResponse = ({ data, error }) => {
    if (error) {
      alert(dictionary.universal.erroroccured[lang]);
    } else {
      setItems([]);
      const _items = convertItemListToCheckoutNew(data);
      console.log(_items)
      //localStorage.removeItem("pos_item");
      if (!localStorage.pos_item&&keyword=='') {
        localStorage.setItem(
					"pos_item",
					JSON.stringify({
					value: _items,
					page: '1',
					})
			  );
      }
      setItems(_items);
      setItemsCount(_items.length);
      if (keydown.keyCode == 13) {
        if (_items[0]) {
          setItemScan(_items[0]);
        }
        setKeydown({});
        setKeyword("");
      }
    }
  };
  
  const handleAppendResponse = ({ data, error }) => {
    if (error) {
      alert(dictionary.universal.erroroccured[lang]);
    } else {
      const _itemclone = cloneDeep(JSON.parse(localStorage["pos_item"]).value);
      const _items = convertItemListToCheckoutNew(data);
      localStorage.setItem(
					"pos_item",
					JSON.stringify({
					value: [..._itemclone, ..._items],
					page: page,
					})
			);
      const totalpage=Math.floor(_itemclone.length/20)
      if(totalpage<=page)
      setItems([...items, ..._items]);
      // const _positem=JSON.parse(localStorage.getItem("pos_item")).value;
      // const _positemclone = cloneDeep(JSON.parse(_positem));
      // _positemclone.push(_items)
      // localStorage.setItem(
      //   "pos_item",
      //   JSON.stringify({
      //   key: "pos_item",
      //   value: JSON.stringify(_positemclone),
      //   })
      // );
    }
  };
  
  useEffect(() => {
    // const initconfig = async () => {
    //   const { data, error } = await config({
    //     kas_id: cookies.kas_id,
    //     lok_id: cookies.lok_id,
    //   });
    //   if (data) {
        
    //     //if(!cookies.scan_mode){
    //     setCookies("nama_lokasi", data.nama, {
    //       expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 60)
    //     });
    //     setCookies("alamat_lokasi", data.alamat, {
    //       expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 60)
    //     });
    //     setCookies("footer1", data.footer1, {
    //       expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 60)
    //     });
    //     setCookies("footer2", data.footer2, {
    //       expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 60)
    //     });
    //     setCookies("telpon", data.telpon, {
    //       expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 60)
    //     });
    //     setCookies("paket", data.paket, {
    //       expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 60)
    //     });
    //     setCookies("qris", data.qris, {
    //       expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 60)
    //     });
    //     //}
    //   }
    //   else{
    //     removeCookies("lok_id");
    //     removeCookies("role_dst");
    //     removeCookies("role_read");
    //     navigate(topic.login.route);
    //   }
    // };
    // initconfig();
    const initkategori = async () => {
      setCategories([]);
      const { data, error } = await categoriesItem({
        lok_id: cookies.lok_id,
      });
      if (!error) {
        setCategories(data);
      }
    };
    initkategori();
    if(privacy){
      navigate(topic.login.route);
    removeCookies("lok_id");
		removeCookies("com_id");
		removeCookies("kas_id");
		removeCookies("kas_nama");
		removeCookies("max_draft");
		removeCookies("scan_mode");
		removeCookies("max_piutang");
		removeCookies("auto_logout");
		removeCookies("lok_type");
		removeCookies("dp_0");
		removeCookies("time_now");
		removeCookies("resto_type");
		removeCookies("role_read");
		removeCookies("role_create");
		removeCookies("role_update");
		removeCookies("role_delete");
		removeCookies("role_dst");
		removeCookies("qris");
		removeCookies("role_nama");
		removeCookies("split_bill");
		removeCookies("join_bill");
		removeCookies("lok_id");
    setPrivacy(false)
    }
  }, []);

  useEffect(() => {
    const oldArray = [...filters];
    const indexOfId = oldArray.findIndex((a) => a.key == "search");
    if (!keyword) {
      if (indexOfId >= 0) {
        oldArray.splice(indexOfId, 1);
        setFilters([...oldArray]);
      } else {
        setFilters([...oldArray]);
      }
    } else {
      if (indexOfId >= 0) {
        oldArray.splice(indexOfId, 1);
        const newFilter = FilterItemModel();
        newFilter.key = "search";
        newFilter.value = items.length;
        setFilters([...oldArray, newFilter]);
      } else {
        const newFilter = FilterItemModel();
        newFilter.key = "search";
        newFilter.value = items.length;
        setFilters([...oldArray, newFilter]);
      }
    }
  }, [itemsCount, keyword]);

  const handleSearchEnter = useCallback(
    async (event) => {
      if (event.keyCode == 13) {
        const { data, error } = await getItems({
          lok_id: cookies.lok_id,
          key_val: keywordScanner,
        });
        if (data) {
          let foundItem = false;
          let item=data[0];
          const _itemsCheckout = itemsCheckout.map((_item) => {
            let _item_temp = _item;
            if (_item.itm_id === item.itm_id && _item.konvidx === item.konvidx) {
              _item.qty =
                cookies.lok_type !== "laundry"
                  ? Number(_item.pakaistok) == 1
                    ? Number(_item.stok) - _item.qty > 0
                      ? _item.qty + 1
                      : _item.qty
                    : _item.qty + 1
                  : _item.qty;
              _item.total = _item.qty * _item.satuan0hrg;
              _item.qty_service = 1;
              _item.dot_id = 0;
              _item.split_bill = "Bill-1";
              foundItem = true;
            }
            return _item;
          });
          if (!foundItem) {
            item.qty = 1;
            // item.service_level_satuan0 = JSON.parse(
            //   '[{"service_id":"1","service_itm_id":"' +
            //     item.itm_id +
            //     '","service_nama":"' +
            //     (item.service_level && item.service_level.length > 0 ? item.service_level[0].level : "") +
            //     '","service_qty":1,"service_diskon":0,"service_hrg":"' +
            //     (item.service_level && item.service_level.length > 0 ? item.service_level[0].hrg : item.satuan0hrg) +
            //     '","service_total":"' +
            //     (item.service_level && item.service_level.length > 0 ? item.service_level[0].hrg : item.satuan0hrg) +
            //     '"}]'
            // );
            // item.service_level=item.service_level.length>0?JSON.parse(item.service_level):'[]';
            item.satuan0 = item.itm_satuan1;
            item.satuan0hrg = parseFloat(item.itm_satuan1hrg);
            item.diskon=0;
            item.kode=item.itm_kode;
            item.total = item.itm_satuan1hrg;
            item.qty_service = 1;
            item.dot_id = 0;
            item.split_bill = "Bill-1";
            _itemsCheckout.push(item);
          }
          setItemsCheckout(_itemsCheckout);
          setKeywordScanner("")
          cookies.role_create.length == 0 && cookies.role_dst.length == 0
            ? setItemsCheckout(_itemsCheckout)
            : cookies.role_dst.findIndex((a) => a == "ALL") >= 0
            ? setItemsCheckout(_itemsCheckout)
            : cookies.role_create.findIndex((a) => a == "POS") >= 0
            ? setItemsCheckout(_itemsCheckout)
            : null;
        }
      }
    },[itemsCheckout,keywordScanner]
  );

  const handleScanMode = () => {
    setScanMode(scanMode==2?0:scanMode+1)
    if(scanMode==2)
      setOpenScanner(true)
  };

  const handleLocal = ({ data, error }) => {
    if (error) {
      alert(dictionary.universal.erroroccured[lang]);
    } else {
      setItems([]);
      setItems(_items);
    }
  };
  const handleCheckFilter = useCallback(
    (item) => {
      setPage(1);
      setItems([]);
      localStorage.removeItem("pos_item");
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
    [filters,local]
  );

  const clearFilters = useCallback(
    (item) => {
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

  // useEffect(() => {
  //   //dihandle jika sebelumnya items sudah ada di list
  //   if (items[0] && items[0].itm_id && !filters[0] && keydown.keyCode != 13) {
  //     const init = async () => {
  //       const { data, error } = await getItems({
  //         lok_id: cookies.lok_id,
  //         page: page,
  //         rows: rowsPerPage,
  //         sellable: "true",
  //       });
  //       handleAppendResponse({ data, error });
  //     };
  //     init();
  //   }
  // }, [page, filters]);

  useEffect(() => {
    if (navbarRef.current) {
      setListPadding(`${navbarRef.current.offsetHeight + 20}px`);
    }
  }, [items, navbarRef]);

  useEffect(() => {
    let foundItem = false;
    if (itemScan.itm_id) {
      const _itemsCheckout = itemsCheckout.map((_item) => {
        if (_item.itm_id === itemScan.itm_id && _item.konvidx === itemScan.konvidx) {
          _item.qty++;
          _item.total = _item.qty * _item.satuan0hrg;
          foundItem = true;
        }
        return _item;
      });
      if (!foundItem) {
        itemScan.qty = 1;
        itemScan.total = itemScan.satuan0hrg;
        _itemsCheckout.push(itemScan);
      }
      setItemsCheckout(_itemsCheckout);
    }
  }, [itemScan]);

  const takeItem = useCallback(
    (item = ItemCheckoutModel()) => {
      
      let foundItem = false;
      const _itemsCheckout = itemsCheckout.map((_item) => {
        let _item_temp = _item;
        if (_item.itm_id === item.itm_id && _item.satuan0 === item.satuan0) {
          _item.qty =
            cookies.lok_type !== "laundry"
              ? Number(_item.pakaistok) == 1
                ? Number(_item.stok) - _item.qty > 0
                  ? _item.qty + 1
                  : _item.qty
                : _item.qty + 1
              : _item.qty;
          _item.total = _item.qty * _item.satuan0hrg;
          _item.qty_service = 1;
          _item.dot_id = 0;
          _item.split_bill = "Bill-1";
          foundItem = true;
        }
        return _item;
      });
      console.log(_itemsCheckout)
      console.log(cookies.lok_type)
      if (!foundItem) {
        item.qty = 1;
        item.service_level_satuan0 = JSON.parse(
          '[{"service_id":"1","service_itm_id":"' +
            item.itm_id +
            '","service_nama":"' +
            (item.service_level && item.service_level.length > 0 ? item.service_level[0].level : "") +
            '","service_qty":1,"service_diskon":0,"service_hrg":"' +
            (item.service_level && item.service_level.length > 0 ? item.service_level[0].hrg : item.satuan0hrg) +
            '","service_total":"' +
            (item.service_level && item.service_level.length > 0 ? item.service_level[0].hrg : item.satuan0hrg) +
            '"}]'
        );
        // item.service_level=item.service_level.length>0?JSON.parse(item.service_level):'[]';
        item.total = item.satuan0hrg;
        item.qty_service = 1;
        item.dot_id = 0;
        item.split_bill = "Bill-1";
        _itemsCheckout.push(item);
      }
      setItemsCheckout(_itemsCheckout);
      cookies.role_create.length == 0 && cookies.role_dst.length == 0
        ? setItemsCheckout(_itemsCheckout)
        : cookies.role_dst.findIndex((a) => a == "ALL") >= 0
        ? setItemsCheckout(_itemsCheckout)
        : cookies.role_create.findIndex((a) => a == "POS") >= 0
        ? setItemsCheckout(_itemsCheckout)
        : null;
    },
    [itemsCheckout]
  );

  const takeDraft = useCallback(
    (item) => {
      setItemsCheckout([]);
      const checkOutDraftItem = [];
      localStorage.removeItem('pos_item');
      setItems([]);
      setPage(1);
      initData();
      // const _items_ori = cloneDeep(items);
      // console.log(_items_ori)
      const _items = convertDraftListToCheckout(item.notaitems);
      if (_items.length > 0) _items[0].dot_id = item.dot_id;
      // // {Number(i.pakaistok)==0?false:(Number(i.stok)>0?false:true)}
      // _items.forEach((_item, index) => {
      //   if (
      //     items.find((itm) => {
      //       if (
      //         (itm.itm_id == _item.itm_id && parseFloat(itm.stok) > 0 && parseInt(itm.pakaistok) > 0) ||
      //         (itm.itm_id == _item.itm_id && parseFloat(itm.pakaistok) <= 0)
      //       ) {
      //         return true;
      //       }
      //       return false;
      //     })
      //   ) {
      //     checkOutDraftItem.push(_item);
      //   }
      // });
      setItemsCheckout(_items);
      setCustomerGlobal(item.cus_id ? parseInt(item.cus_id) : "");
      setTableGlobal(item.mej_id ? parseInt(item.mej_id) : "");
      setDiskonGlobal(parseInt(item.diskon));
      setPajakGlobal(parseInt(item.pajak));
      setPajakGlobalJSON(JSON.parse(item.pajak_json));
      setDraftOpen(false);
      // const init = async () => {
      // 	setDraftItems([]);
      // 	const { data, error } = await deleteDraftPos({ dot_id: item.dot_id });
      // 	if (error) {
      // 		alert(dictionary.universal.notfound[lang]);
      // 	} else {
      // 		setDraftOpen(false);
      // 	}
      // };
      // init();
    },
    [items]
  );

  const handleResult = useCallback(
    async (item) => {
      const { data, error } = await getItems({
        lok_id: cookies.lok_id,
        key_val: item,
      });
      if (data) {
        let foundItem = false;
        let item=data[0];
        const _itemsCheckout = itemsCheckout.map((_item) => {
          let _item_temp = _item;
          if (_item.itm_id === item.itm_id && _item.konvidx === item.konvidx) {
            _item.qty =
              cookies.lok_type !== "laundry"
                ? Number(_item.pakaistok) == 1
                  ? Number(_item.stok) - _item.qty > 0
                    ? _item.qty + 1
                    : _item.qty
                  : _item.qty + 1
                : _item.qty;
            _item.total = _item.qty * _item.satuan0hrg;
            _item.qty_service = 1;
            _item.dot_id = 0;
            _item.split_bill = "Bill-1";
            foundItem = true;
          }
          return _item;
        });
        if (!foundItem) {
          item.qty = 1;
          // item.service_level_satuan0 = JSON.parse(
          //   '[{"service_id":"1","service_itm_id":"' +
          //     item.itm_id +
          //     '","service_nama":"' +
          //     (item.service_level && item.service_level.length > 0 ? item.service_level[0].level : "") +
          //     '","service_qty":1,"service_diskon":0,"service_hrg":"' +
          //     (item.service_level && item.service_level.length > 0 ? item.service_level[0].hrg : item.satuan0hrg) +
          //     '","service_total":"' +
          //     (item.service_level && item.service_level.length > 0 ? item.service_level[0].hrg : item.satuan0hrg) +
          //     '"}]'
          // );
          // item.service_level=item.service_level.length>0?JSON.parse(item.service_level):'[]';
          item.satuan0 = item.itm_satuan1;
          item.satuan0hrg = parseFloat(item.itm_satuan1hrg);
          item.diskon=0;
          item.kode=item.itm_kode;
          item.total = item.itm_satuan1hrg;
          item.qty_service = 1;
          item.dot_id = 0;
          item.split_bill = "Bill-1";
          _itemsCheckout.push(item);
        }
        setItemsCheckout(_itemsCheckout);
        setKeywordScanner("")
        cookies.role_create.length == 0 && cookies.role_dst.length == 0
          ? setItemsCheckout(_itemsCheckout)
          : cookies.role_dst.findIndex((a) => a == "ALL") >= 0
          ? setItemsCheckout(_itemsCheckout)
          : cookies.role_create.findIndex((a) => a == "POS") >= 0
          ? setItemsCheckout(_itemsCheckout)
          : null;
      }
      setOpenScanner(false)
    },
    [itemsCheckout]
  );

  const cancelItem = useCallback(
    (item = ItemCheckoutModel()) => {
      let indexToRemove = -1;
      const _itemsCheckout = itemsCheckout.map((_item, index) => {
        if (_item.itm_id === item.itm_id && _item.konvidx === item.konvidx) {
          if (_item.qty > 1) {
            _item.qty--;
            _item.total = _item.qty * _item.satuan0hrg;
          } else {
            indexToRemove = index;
          }
        }
        return _item;
      });
      if (indexToRemove >= 0) {
        _itemsCheckout.splice(indexToRemove, 1);
      }
      setItemsCheckout(_itemsCheckout);
    },
    [itemsCheckout]
  );

  const clearItem = useCallback(
    (item = ItemCheckoutModel()) => {
      if (!item.itm_id) {
        setItemsCheckout([]);
      } else {
        const _itemsCheckout = itemsCheckout.filter((_item) => {
          if (_item.itm_id === item.itm_id && _item.konvidx === item.konvidx) {
            return false;
          }
          return true;
        });
        setItemsCheckout(_itemsCheckout);
      }
      setContextMenuItem(null);
    },
    [itemsCheckout]
  );

  const handleDraft = useCallback((keyword) => {
    const handleResponse = ({ data, error }) => {
      if (error) {
        alert(dictionary.universal.notfound[lang]);
      } else {
        setDraftItems(data);
        setDraftOpen(true);
      }
    };
    if (keyword && keyword.length > 1) {
      const initkey = async () => {
        setLoading(true);
        setDraftItems([]);
        const { data, error } = await readDraftPos({ kas_id: cookies.kas_id, q: keyword });
        handleResponse({ data, error });
        setLoading(false);
      };
      initkey();
    } else if (!keyword) {
      const init = async () => {
        setLoading(true);
        setDraftItems([]);
        const { data, error } = await readDraftPos({ kas_id: cookies.kas_id });
        handleResponse({ data, error });
        setLoading(false);
      };
      init();
    }
  }, []);

  useEffect(() => {
    if (draftOpen) handleDraft(keywordDraft);
  }, [keywordDraft]);

  // useEffect(() => {
  //   if (openScanner) handleSearchEnter(keywordScanner);
  // }, [keywordScanner]);

  const readFullDraft = useCallback(
    (item) => {
      const _draftItems = [...draftItems];
      _draftItems.map((_item) => {
        if (_item.dot_id === item.dot_id) {
          item.status = "active";
        }
      });
      setDraftItems(_draftItems);
    },
    [draftItems]
  );

  function handleChangeQty(evt) {
    Number(selectedItems.pakaistok) == 1
      ? Number(selectedItems.stok) - evt.target.value >= 0
        ? setQty(evt.target.value)
        : null
      : setQty(evt.target.value);
  }

  const handleInput = useCallback(
    (input) => {
      setInputOpen(true);
      const _newitemCheckout = [...itemsCheckout];
      setQty(Number(1));
      _newitemCheckout.map((_item) => {
        if (_item.itm_id === input.itm_id && _item.konvidx === input.konvidx) {
          setQty(Number(_item.qty));
        }
      });
      setDiskon(0);
      setSelectedItems(input);
    },
    [itemsCheckout]
  );

  const handleAcceptInput = useCallback(() => {
    const _newitemCheckout = [...itemsCheckout];
    let foundItem = false;
    if (qty <= 0) {
      alert("Kuantiti tidak boleh 0");
    }
    let i = 0;
    itemsCheckout.map((_item, i) => {
      if (_item.itm_id === selectedItems.itm_id && _item.konvidx === selectedItems.konvidx) {
        foundItem = true;
        itemsCheckout[i].qty = qty <= 0 ? 1 : Number(qty);
        itemsCheckout[i].diskon = Number(diskon);
        itemsCheckout[i].total = itemsCheckout[i].satuan0hrg * Number(qty) * (1 - Number(diskon) / 100);
      }
      return _item;
    });
    if (!foundItem) {
      selectedItems.qty = Number(qty);
      selectedItems.diskon = Number(diskon);
      selectedItems.total = selectedItems.satuan0hrg * Number(qty) * (1 - Number(diskon) / 100);
      _newitemCheckout.push(selectedItems);
      setItemsCheckout(_newitemCheckout);
    }
    setInputOpen(false);
  }, [itemsCheckout, selectedItems, qty, diskon]);

  let totalPrice = 0;
  let totalQty = 0;

  itemsCheckout.forEach((item) => {
    if (cookies.lok_type == "laundry") {
      item.service_level_satuan0.forEach((newitem) => {
        totalPrice += parseFloat(newitem.service_qty) * parseFloat(newitem.service_hrg);
        totalQty += parseFloat(newitem.service_qty);
      });
      //totalPrice = totalPrice * (1 - parseInt(diskonGlobal) / 100) + totalPrice * (parseInt(pajakGlobal) / 100);
    } else {
      const price = item.satuan0hrg;
      totalPrice += item.qty * price;
      totalQty += item.qty;
    }
  });

  const ShowContent = () => {
    if (semiDesktopMode) {
      return (
        <div>
          <div className="w-full flex gap-3 text-xs text-gray-700 px-[2%]">
            <div className="flex gap-1">
              <div className="w-max py-2 px-2 text-[12px] font-semibold bg-orange-100 rounded-sm"></div>
              <div>{dictionary.dialog.item.code[lang]}</div>
            </div>
            <div className="flex gap-1">
              <div className="w-max py-2 px-2 text-[12px] font-semibold bg-green-100 rounded-sm"></div>
              <div>{dictionary.dialog.item.price[lang]}</div>
            </div>
            <div className="flex gap-1">
              <div className="w-max py-2 px-2 text-[12px] font-semibold bg-purple-100 rounded-sm"></div>
              <div>{dictionary.stock.uom.stock[lang]}</div>
            </div>
            <div className="flex gap-1">
              <div className="w-max py-2 px-2 text-[12px] font-semibold bg-blue-100 rounded-sm"></div>
              <div>{dictionary.dialog.item.unit[lang]}</div>
            </div>
          </div>
          {
            cookies.lok_type !== "laundry"?
            <POSItemScrollMd
              items={items}
              itemsCheckout={itemsCheckout}
              onAdd={takeItem}
              onRemove={cancelItem}
              onOption={setContextMenuItem}
              onHold={handleInput}
              onLoad={() => setPage(page + 1)}
              infinite={!keyword}
            />:
            <POSItemScrollMdJasa
              items={items}
              itemsCheckout={itemsCheckout}
              onAdd={takeItem}
              onRemove={cancelItem}
              onOption={setContextMenuItem}
              onHold={handleInput}
              onLoad={() => setPage(page + 1)}
              infinite={!keyword}
            />
          }
        </div>
      );
    } else {
      return (
        <div>
          <div className="w-full flex gap-3 text-xs text-gray-700 px-[2%]">
            <div className="flex gap-1">
              <div className="w-max py-2 px-2 text-[12px] font-semibold bg-orange-100 rounded-sm"></div>
              <div>{dictionary.dialog.item.code[lang]}</div>
            </div>
            <div className="flex gap-1">
              <div className="w-max py-2 px-2 text-[12px] font-semibold bg-green-100 rounded-sm"></div>
              <div>{dictionary.dialog.item.price[lang]}</div>
            </div>
            <div className="flex gap-1">
              <div className="w-max py-2 px-2 text-[12px] font-semibold bg-purple-100 rounded-sm"></div>
              <div>{dictionary.stock.uom.stock[lang]}</div>
            </div>
            <div className="flex gap-1">
              <div className="w-max py-2 px-2 text-[12px] font-semibold bg-blue-100 rounded-sm"></div>
              <div>{dictionary.dialog.item.unit[lang]}</div>
            </div>
          </div>
        
        <List className="divide-y divide-dashed divide-gray-400">
          {
            cookies.lok_type !== "laundry"?
            <POSItemScrollSm
              items={items}
              itemsCheckout={itemsCheckout}
              onAdd={takeItem}
              onRemove={cancelItem}
              onOption={setContextMenuItem}
              onHold={handleInput}
              onLoad={() => setPage(page + 1)}
              infinite={!keyword}
            />:
            <POSItemScrollSmJasa
              items={items}
              itemsCheckout={itemsCheckout}
              onAdd={takeItem}
              onRemove={cancelItem}
              onOption={setContextMenuItem}
              onHold={(evt) => handleInput(evt)}
              onLoad={() => setPage(page + 1)}
              infinite={!keyword}
            />
          }
        </List>
        </div>
      );
    }
  };

  return (
    <Fragment>
      {!loading ? null : <LoadingOverlay white />}
      <div className="h-screen-adapt bg-gray-50 overflow-hidden relative">
        <div className="top-0 inset-x-0 fixed bg-gradient-to-b from-gray-50 h-20 desktop:max-w-[60%] mx-auto" />
        <div className="p-2 top-0 inset-x-0 fixed z-50 mx-auto desktop:max-w-[60%]">
          <Navbar ref={navbarRef} className={`pt-2 px-2 ${!filters.length ? "pb-6" : "pb-4"} relative`} blurred={false}>
            <div className="flex items-center">
              <IconButton variant="text" size="md" onClick={() => setMenuOpen(true)}>
                <div className="justify-items-center lowercase">
                  <Bars3Icon className="h-6 w-6 stroke-2" />
                  <div style={{fontSize:"10px",padding:"0px"}}>
                    Menu
                  </div>
                </div>
              </IconButton>
              <div className="mx-2 flex-grow">
              
                <SearchNavbar
                  onSearch={setKeyword}
                  onKeyDown={handleSearchEnter}
                  value={keyword}
                  label={`${scanMode==1?dictionary.search.pos[lang]:(scanMode==2?dictionary.search.externalscan[lang]:dictionary.search.camerascan[lang])}`}
                />
              </div>
              <IconButton size="md" variant="text" onClick={handleScanMode}>
                <div className="justify-items-center lowercase">
                  <QrCodeIcon className={`"h-6 w-6 stroke-2" ${scanMode==1?"text-black":(scanMode==2?"text-green-500":"text-blue-500")}`} />
                  <div style={{fontSize:"10px",padding:"0px"}}>
                    Scan
                  </div>
                </div>
              </IconButton>
              <IconButton size="md" variant="text" onClick={openDrawerRight}>
                <div className="justify-items-center lowercase">
                  <AdjustmentsVerticalIcon className="h-6 w-6 stroke-2" />
                  <div style={{fontSize:"10px",padding:"0px"}}>
                    Filter
                  </div>
                </div>
              </IconButton>
              <IconButton size="md" variant="text" onClick={() => handleDraft()}>
                <div className="justify-items-center lowercase">
                  <BookmarkIcon className="h-6 w-6 stroke-2" />
                  <div style={{fontSize:"10px",padding:"0px"}}>
                    Draft
                  </div>
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
        <div className="pb-20 overflow-auto h-full" style={{ paddingTop: listPadding }}>
          <div className="min-h-screen">
          {
          scanMode==2?<input type={'text'} value={keywordScanner} autoFocus={true} onBlur={({ target }) => target.focus()} className="text-transparent caret-color: transparent border-2 bg-transparent border-transparent rounded-md w-1/2 focus:border-transparent focus:outline-none h-0 absolute" onKeyDown={handleSearchEnter}  onChange={(e)=>setKeywordScanner(e.target.value)}/>:null
          }
            {!items.length && !loading ? (
              <div className="mx-auto py-20 w-fit">{dictionary.cashier.pos.noItems[lang]}</div>
            ) : (
              ShowContent()
            )}
          </div>
        </div>
        {!itemsCheckout[0] ? null : (
          <div className="fixed bottom-3 inset-x-3 mx-auto desktop:max-w-[60%]">
            <Button
              size="lg"
              variant="gradient"
              color="green"
              className="group w-full relative flex items-center gap-3 overflow-hidden pr-[60px] pl-3 mx-auto desktop:max-w-[60%]"
              onClick={() =>
              {console.log(itemsCheckout)
                cookies.lok_type == "laundry"
                  ? navigate(topic.cashier.checkout_laundry.route)
                  : cookies.split_bill
                  ? navigate(topic.cashier.checkout_splitbill.route)
                  : navigate(topic.cashier.checkout.route)
                }
                
              }
              onContextMenu={(evt) => {
                evt.preventDefault();
                setCartOption(true);
              }}
            >
              <span className="flex-grow text-left mx-auto desktop:max-w-[60%]">
                {totalQty} {dictionary.cashier.pos.itemsSelected[lang]}
              </span>
              <span>
                {currency} {formatThousandSeparator(totalPrice)}
              </span>
              <span className="absolute right-0 grid h-full w-12 place-items-center bg-green-500 transition-colors group-hover:bg-green-600">
                <ShoppingCartIcon className="w-5 h-5" />
              </span>
            </Button>
          </div>
        )}
        
      </div>
      <Dialog open={contextMenuItem != null} handler={() => setContextMenuItem(null)}>
        <DialogHeader>{dictionary.cashier.pos.clearHeader[lang]}</DialogHeader>
        <DialogBody>
          <div className="m-16 text-center">{dictionary.cashier.pos.clear[lang]}</div>
          <Button className="mb-4 w-full" variant="outlined" color="teal" onClick={() => setContextMenuItem(null)}>
            {dictionary.common.cancel[lang]}
          </Button>
          <Button variant="gradient" color="teal" onClick={() => clearItem(contextMenuItem)} className="mb-4 w-full">
            {dictionary.cashier.pos.clearOne[lang]}
          </Button>
          <Button variant="gradient" color="teal" onClick={() => clearItem()} className="mb-4 w-full">
            {dictionary.cashier.pos.clearAll[lang]}
          </Button>
        </DialogBody>
      </Dialog>
      <Dialog open={draftOpen} handler={handleDraft} size="xxl" className="bg-white overflow-hidden">
        <DialogHeader>{dictionary.dialogheader.orderdraft[lang]} {cookies.max_draft ? dictionary.dialogheader.limitation[lang]+' '+cookies.max_draft+' '+dictionary.dialogheader.order[lang] : null}</DialogHeader>
        <DialogBody className="overflow-auto p-0">
          <div className="p-2 top-0 inset-x-0 fixed z-50">
            <Navbar
              ref={navbarRef}
              className={`pt-2 px-2 ${!filters.length ? "pb-6" : "pb-4"} relative`}
              blurred={false}
            >
              <div className="flex items-center">
                <div className="mx-2 flex-grow">
                  <SearchNavbar
                    onSearch={setKeywordDraft}
                    onKeyDown={handleSearchEnter}
                    value={keywordDraft}
                    label={dictionary.search.itemtablecustomer[lang]}
                  />
                </div>
              </div>
            </Navbar>
          </div>
          <List className="divide-y divide-dashed divide-gray-400">
            {!draftItems && !loading ? (
              <div className="mx-auto py-20">Draft Pesanan</div>
            ) : (
              draftItems?.map((i, index) => {
                const namacustomerdraft = i.cus_id ? i.cus_nama : "Tanpa Nama";
                const namatabledraft = i.mej_id ? "(" + i.mej_nama + ")" : "";
                let totalqty = 0;
                {
                  i.notaitems.map((ii, indexi) => {
                    totalqty = totalqty + Number(ii.qty);
                  });
                }
                return index < (cookies.max_draft != 0 ? Number(cookies.max_draft) : draftItems.length) ? (
                  <ListItem key={index} className="">
                    <div className="w-full pr-2" onClick={() => takeDraft(i)}>
                      <div className="flex items-center justify-between w-full">
                        <Typography variant="small" color="gray" className="font-normal">
                          <div>
                            <b>{namacustomerdraft}</b>
                            {` ${totalqty} Item`} {namatabledraft}
                          </div>
                        </Typography>
                        <Typography color="gray" className="font-normal">
                          {currency} {formatThousandSeparator(Number(i.total))}
                        </Typography>
                      </div>
                      <div className="flex flex-wrap">
                        {i.status
                          ? i.notaitems.map((ii, indexi) => {
                              return (
                                <div className="text-white bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:ring-teal-200 font-medium rounded-lg text-sm px-2 py-1 me-2 mb-2 dark:bg-teal-600 dark:hover:bg-teal-700 focus:outline-none dark:focus:ring-teal-800">
                                  {Number(ii.qty)}
                                  {`-${ii.itm_nama}`}
                                </div>
                              );
                            })
                          : i.notaitems.map((ii, indexi) => {
                              return indexi < 3 ? (
                                <div className="text-white bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:ring-teal-200 font-medium rounded-lg text-sm px-2 py-1 me-2 mb-2 dark:bg-teal-600 dark:hover:bg-teal-700 focus:outline-none dark:focus:ring-teal-800">
                                  {Number(ii.qty)}{ii.satuan0}
                                  {`-${ii.itm_nama}`}
                                </div>
                              ) : indexi == i.notaitems.length - 1 ? (
                                <div
                                  className="text-white bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:ring-teal-200 font-medium rounded-lg text-sm px-2 py-1 me-2 mb-2 dark:bg-teal-600 dark:hover:bg-teal-700 focus:outline-none dark:focus:ring-teal-800"
                                  onClick={() => readFullDraft(i)}
                                >
                                  {i.notaitems.length - 3}+ More
                                </div>
                              ) : (
                                <div></div>
                              );
                            })}
                      </div>
                    </div>
                  </ListItem>
                ) : null;
              })
            )}
          </List>
        </DialogBody>
        <DialogFooter>
          <Button variant="gradient" color="red" onClick={() => setDraftOpen(false)} className="mr-1">
            <span>{dictionary.universal.back[lang]}</span>
          </Button>
        </DialogFooter>
      </Dialog>
      <Dialog open={inputOpen} handler={handleInput}>
        <DialogHeader>{dictionary.cashier.pos.inputHeader[lang]}</DialogHeader>
        <DialogBody>
          <div className="mb-4">
            <Input type="number" label="Qty" value={qty} onChange={handleChangeQty}></Input>
          </div>
          <Button className="mb-4 mr-2" variant="gradient" color="red" onClick={() => setInputOpen(false)}>
            {dictionary.universal.cancel[lang]}
          </Button>
          <Button variant="gradient" color="teal" onClick={() => handleAcceptInput()} className="mb-4">
            {dictionary.universal.apply[lang]}
          </Button>
        </DialogBody>
      </Dialog>
      <Dialog open={openScanner} handler={() => setOpenScanner(false)} size="xl">
        <DialogHeader>Scanner</DialogHeader>
        <DialogBody>
          
          <BarcodeScanner 
          result={handleResult}
          />
        </DialogBody>
      </Dialog>
      <Dialog open={cartOptions} handler={() => setCartOption(false)}>
        <DialogHeader>{dictionary.cashier.pos.cartOptions[lang]}</DialogHeader>
        <DialogBody>
          <Button
            className="mb-4 w-full"
            variant="outlined"
            color="red"
            onClick={() => {
              clearItem();
              setCartOption(false);
            }}
          >
            {dictionary.cashier.pos.clearAll[lang]}
          </Button>
          <Button
            variant="gradient"
            color="teal"
            onClick={() => navigate(topic.cashier.checkout.route)}
            className="mb-4 w-full"
          >
            {dictionary.cashier.pos.checkout[lang]}
          </Button>
        </DialogBody>
      </Dialog>
      <Dialog
        open={cookies.always_print && printerState === PRINTER_STATE_NONE}
        handler={() => setPrinterState(PRINTER_STATE_SKIP)}
        size="sm"
      >
        <DialogHeader>Setup Printer</DialogHeader>
        <DialogBody>
          {!printerLoading ? (
            <div className="mb-3">{dictionary.dialog.bluetooth.setup[lang]}</div>
          ) : (
            <span className="flex items-center mx-auto">
              <span>{dictionary.dialog.bluetooth.performing[lang]}</span>
              <Spinner className="h-5 w-5 ml-3" color="teal" />
            </span>
          )}
          <Button className="mb-2" fullWidth variant="gradient" color="teal" onClick={initPrinterBT}>
            {dictionary.dialog.bluetooth.bluetooth[lang]}
          </Button>
          <Button className="mb-2" fullWidth variant="gradient" color="teal" onClick={initPrinterUSB}>
            {dictionary.dialog.bluetooth.usb[lang]}
          </Button>
          <Button
            className="mb-2"
            fullWidth
            variant="outlined"
            color="teal"
            onClick={() => setPrinterState(PRINTER_STATE_SKIP)}
          >
           {dictionary.dialog.bluetooth.later[lang]}
          </Button>
        </DialogBody>
      </Dialog>
      <ItemFilter
        open={openFilter}
        onClose={() => setOpenFilter(false)}
        onCheck={handleCheckFilter}
        onClear={clearFilters}
        checkedIds={filters?.map((i, index) => i.value)}
        categories={categories}
      />
    </Fragment>
  );
}
