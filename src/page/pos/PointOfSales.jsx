import {
  Button,
  Dialog,
  DialogBody,
  DialogHeader,
  DialogFooter,
  IconButton,
  List,
  ListItem,
  Navbar,
  Typography,
  Input,
  Spinner,
} from "@material-tailwind/react";
import { Fragment, useCallback, useContext, useEffect, useRef, useState } from "react";
import SearchNavbar from "../../lib/SearchNavbar";
import { Bars3Icon, ShoppingCartIcon, BookmarkIcon, AdjustmentsVerticalIcon } from "@heroicons/react/24/outline";
import FilterChips from "../../lib/FilterChips";
import { AppContext } from "../../AppContext";
import { getItems } from "../../api/Item";
import { getGeneralSetting, addGeneralSetting } from "../../api/GeneralSetting";
import { config } from "../../api/Login";
import { readDraftPos } from "../../api/Pos";
import { ItemCheckoutModel, convertItemListToCheckout, convertDraftListToCheckout } from "../../model/item";
import { formatThousandSeparator } from "../../util/formatter";
import { dictionary } from "../../constant/appDictionary";
import { useNavigate } from "react-router-dom";
import { topic } from "../../constant/appTopics";
import { PRINTER_STATE_NONE, PRINTER_STATE_SKIP, TIME_SEARCH_DEBOUNCE } from "../../constant/appCommon";
import LoadingOverlay from "../../lib/LoadingOverlay";
import POSItemScrollSm from "./POSItemScrollSm";
import POSItemScrollMd from "./POSItemScrollMd";
import ItemFilter from "../item/ItemFilter";
import { cloneDeep } from "lodash";
import { FilterItemModel } from "../../model/filter";

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
  const [allItemsCount, setAllItemsCount] = useState(0);
  const initData = useCallback(() => {
    console.log(cookies);
    const _categoryFilter = filters.find((f) => f.key === "category");
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
    if (keyword && keyword.length > 0) {
      const orderSearch = setTimeout(async () => {
        // setPage(1);
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
        clearTimeout(orderSearch);
      };
    } else if (!keyword) {
      const init = async () => {
        setLoading(true);
        if (page <= 1) {
          if (localStorage.getItem("pos_item_1")) {
            const _items = JSON.parse(localStorage.getItem("pos_item_1")).value;
            setItems(_items);
          } else {
            const { data, error } = await getItems({
              lok_id: cookies.lok_id,
              page: page,
              rows: rowsPerPage,
              sellable: "true",
              ...filterProps,
            });
            if (error) alert("Item ke-1 keatas belum sempat tersimpan di lokal");
            else handleResponse({ data, error });
          }
        } else {
          if (localStorage.getItem("pos_item_" + page)) {
            const _items = JSON.parse(localStorage.getItem("pos_item_" + page)).value;
            setItems([...items, ..._items]);
          } else {
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
      };
      init();
    }
  }, [keyword, filters, page, keydown]);

  useEffect(() => {
    const initconfig = async () => {
      const { data, error } = await config({
        kas_id: cookies.kas_id,
        lok_id: cookies.lok_id,
      });
      if (data) {
        console.log(cookies);
        //if(!cookies.scan_mode){
        setCookies("nama_lokasi", data.nama);
        setCookies("alamat_lokasi", data.alamat);
        setCookies("footer1", data.footer1);
        setCookies("footer2", data.footer2);
        setCookies("telpon", data.telpon);
        setCookies("paket", data.paket);
        setCookies("qris", data.qris);
        //}
      }
    };
    initconfig();
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

  useEffect(() => {
    setItems([]);
    setPage(1);
    initData();
  }, [keyword, filters, keydown]);

  useEffect(() => {
    if (page > 1) initData();
  }, [page]);

  const handleSearchEnter = (event) => {
    if (event.keyCode == 13) {
      setKeydown(event);
    }
  };

  const handleResponse = ({ data, error }) => {
    if (error) {
      alert("Terjadi Kesalahan");
    } else {
      setItems([]);
      const _items = convertItemListToCheckout(data);
      setItems(_items);
      setItemsCount(_items.length);
      if (keydown.keyCode == 13) {
        if (_items[0]) {
          setItemScan(_items[0]);
        }
        setKeydown({});
        setKeyword("");
      }
      localStorage.setItem(
        "pos_item_1",
        JSON.stringify({
          key: "pos_item",
          value: convertItemListToCheckout(data),
        })
      );
    }
  };

  const handleAppendResponse = ({ data, error }) => {
    if (error) {
      alert("Terjadi Kesalahan");
    } else {
      const _items = convertItemListToCheckout(data);
      setItems([...items, ..._items]);
      localStorage.setItem(
        "pos_item_" + page,
        JSON.stringify({
          key: "pos_item",
          value: convertItemListToCheckout(data),
        })
      );
    }
  };
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
      const _items = convertDraftListToCheckout(item.notaitems);

      if (_items.length > 0) _items[0].dot_id = item.dot_id;
      // {Number(i.pakaistok)==0?false:(Number(i.stok)>0?false:true)}
      _items.forEach((_item, index) => {
        if (
          items.find((itm) => {
            if (
              (itm.itm_id == _item.itm_id && parseFloat(itm.stok) > 0 && parseInt(itm.pakaistok) > 0) ||
              (itm.itm_id == _item.itm_id && parseFloat(itm.pakaistok) <= 0)
            ) {
              return true;
            }
            return false;
          })
        ) {
          checkOutDraftItem.push(_item);
        }
      });
      console.log(checkOutDraftItem);
      setItemsCheckout(checkOutDraftItem);
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
      // 		alert("Data tidak ditemukan");
      // 	} else {
      // 		setDraftOpen(false);
      // 	}
      // };
      // init();
    },
    [items]
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
        alert("Data tidak ditemukan");
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
        <POSItemScrollMd
          items={items}
          itemsCheckout={itemsCheckout}
          onAdd={takeItem}
          onRemove={cancelItem}
          onOption={setContextMenuItem}
          onHold={handleInput}
          onLoad={() => setPage(page + 1)}
          infinite={!keyword}
        />
      );
    } else {
      return (
        <List className="divide-y divide-dashed divide-gray-400">
          <POSItemScrollSm
            items={items}
            itemsCheckout={itemsCheckout}
            onAdd={takeItem}
            onRemove={cancelItem}
            onOption={setContextMenuItem}
            onHold={(evt) => handleInput(evt)}
            onLoad={() => setPage(page + 1)}
            infinite={!keyword}
          />
        </List>
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
                <Bars3Icon className="h-6 w-6 stroke-2" />
              </IconButton>
              <div className="mx-2 flex-grow">
                <SearchNavbar
                  onSearch={setKeyword}
                  onKeyDown={handleSearchEnter}
                  value={keyword}
                  label={"Cari Barang (Kasir)"}
                />
              </div>
              <IconButton size="md" variant="text" onClick={openDrawerRight}>
                <AdjustmentsVerticalIcon className="h-6 w-6 stroke-2" />
              </IconButton>
              <IconButton size="md" variant="text" onClick={() => handleDraft()}>
                <BookmarkIcon className="h-6 w-6 stroke-2" />
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
        <div className="pb-20 overflow-auto h-full" style={{ paddingTop: listPadding }}>
          <div className="min-h-screen">
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
                cookies.lok_type == "laundry"
                  ? navigate(topic.cashier.checkout_laundry.route)
                  : cookies.split_bill
                  ? navigate(topic.cashier.checkout_splitbill.route)
                  : navigate(topic.cashier.checkout.route)
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
        <DialogHeader>Draft Pesanan {cookies.max_draft ? `Batasan ${cookies.max_draft} Pesanan` : null}</DialogHeader>
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
                    label="Cari Meja/Item/Kustomer"
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
                                  {Number(ii.qty)}
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
            <span>Back</span>
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
            Batal
          </Button>
          <Button variant="gradient" color="teal" onClick={() => handleAcceptInput()} className="mb-4">
            Terapkan
          </Button>
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
            <div className="mb-3">Printer belum diset-up. Set-up printer sekarang?</div>
          ) : (
            <span className="flex items-center mx-auto">
              <span>Melakukan set-up printer</span>
              <Spinner className="h-5 w-5 ml-3" color="teal" />
            </span>
          )}
          <Button className="mb-2" fullWidth variant="gradient" color="teal" onClick={initPrinterBT}>
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
            onClick={() => setPrinterState(PRINTER_STATE_SKIP)}
          >
            Nanti saja
          </Button>
        </DialogBody>
      </Dialog>
      <ItemFilter
        open={openFilter}
        onClose={() => setOpenFilter(false)}
        onCheck={handleCheckFilter}
        onClear={() => setClearFilter(!clearFilter)}
        checkedIds={filters?.map((i, index) => i.value)}
        categories={categories}
      />
    </Fragment>
  );
}
