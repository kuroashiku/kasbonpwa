import { r as reactExports, A as AppContext, j as jsxRuntimeExports, a as react, C as CubeIcon, I as IMAGEKIT_URL_ENDPOINT, b as ItemCheckoutModel, u as useNavigate, T as TIME_SEARCH_DEBOUNCE, c as convertItemListToCheckout, d as convertDraftListToCheckout, L as LoadingOverlay, e as dictionary, t as topic, P as PRINTER_STATE_NONE, f as PRINTER_STATE_SKIP } from "./index-CGEICd-f.js";
import { S as SearchNavbar } from "./SearchNavbar-BwHVnItL.js";
import { F as FilterChips } from "./FilterChips-Bif-hhPS.js";
import { g as getItems } from "./Item-Btr_yyWl.js";
import { c as config } from "./Login-BX-Mfbo_.js";
import { r as readDraftPos } from "./Pos-68rCAtrO.js";
import { S as SetItemUnit, f as formatThousandSeparator } from "./formatter-DQiSfF1K.js";
import { I as InfiniteScroll } from "./InfiniteScroll-CJQX2qNT.js";
import { I as IKImage } from "./imagekitio-react.esm-Dkgu7ZiT.js";
import { M as MinusCircleIcon } from "./MinusCircleIcon-CG9aRspX.js";
import { I as ItemFilter } from "./ItemFilter-BttIrnm6.js";
import { l as lodashExports } from "./lodash-C34_XwDM.js";
import { F as FilterItemModel } from "./filter-DY4hzksJ.js";
import { B as Bars3Icon } from "./Bars3Icon-BPkb_aHs.js";
import { A as AdjustmentsVerticalIcon } from "./AdjustmentsVerticalIcon-DBH-WKzU.js";
function BookmarkIcon({
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
    d: "M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
  }));
}
const ForwardRef$1 = reactExports.forwardRef(BookmarkIcon);
const BookmarkIcon$1 = ForwardRef$1;
function ShoppingCartIcon({
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
    d: "M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
  }));
}
const ForwardRef = reactExports.forwardRef(ShoppingCartIcon);
const ShoppingCartIcon$1 = ForwardRef;
function POSItemScrollSm({
  items = [ItemCheckoutModel()],
  itemsCheckout = [ItemCheckoutModel()],
  onAdd = () => {
  },
  onRemove = () => {
  },
  onHold = () => {
  },
  onOption = () => {
  },
  onLoad = () => {
  },
  infinite = false
}) {
  const { currency } = reactExports.useContext(AppContext);
  const listItems = items.map((i, index) => {
    const unit = i.satuan0;
    const price = i.service_level && i.service_level.length > 0 ? i.service_level[0].hrg : i.satuan0hrg;
    const image = i.itm_urlimage0;
    const selectedItem = itemsCheckout.find((ic) => ic.itm_id === i.itm_id && ic.konvidx === i.konvidx && ic.qty > 0);
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(react.ListItem, { className: "px-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(react.ListItemPrefix, { className: "mr-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-full bg-gray-50 w-12 h-12 overflow-hidden", children: !image ? /* @__PURE__ */ jsxRuntimeExports.jsx(CubeIcon, { className: "h-7 w-7 mx-auto my-2.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
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
          className: `${selectedItem ? "w-[60%]" : "w-[100%]"} flex flex-col gap-1 ${Number(i.pakaistok) == 0 ? false : Number(i.stok) > 0 ? false : "pointer-events-none opacity-50"}`,
          onClick: () => onAdd(i),
          onContextMenu: () => onHold(i),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-[90%] whitespace-nowrap overflow-hidden text-ellipsis font-semibold", children: [
              i.itm_nama,
              " ",
              Number(i.pakaistok) == 0 ? null : Number(i.stok) > 0 ? null : " (Habis)"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1 items-start", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-max py-[2px] px-2 text-[12px] font-semibold bg-orange-100 rounded-md", children: i.kode }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-max py-[2px] px-2 text-[12px] font-semibold bg-blue-100 rounded-md", children: [
                "/ ",
                SetItemUnit(unit.toUpperCase())
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Typography, { color: "gray", className: "w-max py-[2px] px-2 text-[15px] font-semibold bg-green-100 rounded-md", children: [
              selectedItem ? `${selectedItem.qty} x ` : "",
              " ",
              currency,
              " ",
              formatThousandSeparator(price)
            ] })
          ]
        }
      ),
      !selectedItem ? null : /* @__PURE__ */ jsxRuntimeExports.jsx(react.ListItemSuffix, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        react.IconButton,
        {
          variant: "text",
          color: "blue-gray",
          onClick: () => onRemove(i),
          onContextMenu: () => onOption(selectedItem),
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(MinusCircleIcon, { className: "h-8 w-8 text-red-500" })
        }
      ) })
    ] }, index);
  });
  if (infinite) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(InfiniteScroll, { listItems, lastRowHandler: onLoad, heightClass: "h-[90px]" });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Fragment, { children: listItems });
}
function POSItemScrollMd({
  items = [ItemCheckoutModel()],
  itemsCheckout = [ItemCheckoutModel()],
  onAdd = () => {
  },
  onRemove = () => {
  },
  onHold = () => {
  },
  onOption = () => {
  },
  onLoad = () => {
  },
  infinite = false
}) {
  const { currency, cookies } = reactExports.useContext(AppContext);
  const listItems = items.map((i, index) => {
    const unit = i.satuan0;
    const price = i.service_level && i.service_level.length > 0 ? i.service_level[0].hrg : i.satuan0hrg;
    const image = i.itm_urlimage0;
    const selectedItem = itemsCheckout.find((ic) => ic.itm_id === i.itm_id && ic.konvidx === i.konvidx && ic.qty > 0);
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Card, { className: `max-w-[24rem] overflow-hidden ${selectedItem ? "ring-2 ring-teal-500" : ""}`, children: [
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
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", className: "mb-1", children: i.itm_nama }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Typography, { variant: "small", color: "gray", className: "font-normal", children: [
          "#",
          i.kode
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Typography, { variant: "small", className: "float-left", children: [
            "per ",
            unit
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Typography, { variant: "h6", className: "text-right", children: [
            currency,
            " ",
            formatThousandSeparator(price)
          ] })
        ] }),
        selectedItem ? /* @__PURE__ */ jsxRuntimeExports.jsxs(react.ButtonGroup, { size: "sm", color: "teal", fullWidth: true, variant: "gradient", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Button, { onClick: () => onAdd(i), className: "p-2", onContextMenu: (evt) => {
            evt.preventDefault();
            onHold(i);
          }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Typography, { children: [
            "✕ ",
            cookies.lok_type !== "laundry" ? selectedItem.qty : selectedItem.qty_service
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            react.Button,
            {
              onClick: () => onRemove(i),
              className: "w-14 p-1",
              onContextMenu: (evt) => {
                evt.preventDefault();
                onOption(selectedItem);
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(MinusCircleIcon, { className: "h-8 w-8" })
            }
          )
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(react.Button, { size: "sm", onClick: () => onAdd(i), color: "teal", fullWidth: true, variant: "gradient", disabled: Number(i.pakaistok) == 0 ? false : Number(i.stok) > 0 ? false : true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { children: Number(i.pakaistok) == 0 ? "Pilih" : Number(i.stok) > 0 ? "Pilih" : "Habis" }) })
      ] })
    ] }, index);
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 p-2", children: infinite ? /* @__PURE__ */ jsxRuntimeExports.jsx(InfiniteScroll, { listItems, lastRowHandler: onLoad, heightClass: "h-[300px]" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Fragment, { children: listItems }) });
}
function PointOfSales() {
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
    pajakGlobalJSON
  } = reactExports.useContext(AppContext);
  const [listPadding, setListPadding] = reactExports.useState("20px");
  const [loading, setLoading] = reactExports.useState(true);
  const navigate = useNavigate();
  const [items, setItems] = reactExports.useState([ItemCheckoutModel()]);
  const navbarRef = reactExports.useRef();
  const [keyword, setKeyword] = reactExports.useState("");
  const [keydown, setKeydown] = reactExports.useState({});
  const [contextMenuItem, setContextMenuItem] = reactExports.useState(null);
  const [draftItems, setDraftItems] = reactExports.useState([]);
  const [draftOpen, setDraftOpen] = reactExports.useState(false);
  const [inputOpen, setInputOpen] = reactExports.useState(false);
  const [cartOptions, setCartOption] = reactExports.useState(false);
  const [page, setPage] = reactExports.useState(1);
  const [selectedItems, setSelectedItems] = reactExports.useState([]);
  const [qty, setQty] = reactExports.useState(1);
  const [diskon, setDiskon] = reactExports.useState(0);
  const [itemScan, setItemScan] = reactExports.useState({});
  const [openFilter, setOpenFilter] = reactExports.useState(false);
  const [clearFilter, setClearFilter] = reactExports.useState(false);
  const [keywordDraft, setKeywordDraft] = reactExports.useState("");
  const [itemsCount, setItemsCount] = reactExports.useState(0);
  const openDrawerRight = () => setOpenFilter(true);
  reactExports.useState([]);
  reactExports.useState(0);
  const initData = reactExports.useCallback(() => {
    console.log(cookies);
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
    if (keyword && keyword.length > 0) {
      const orderSearch = setTimeout(async () => {
        setLoading(true);
        const { data, error } = await getItems({
          lok_id: cookies.lok_id,
          key_val: keyword,
          page,
          rows: rowsPerPage,
          sellable: "true",
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
        if (page <= 1) {
          if (localStorage.getItem("pos_item_1")) {
            const _items = JSON.parse(localStorage.getItem("pos_item_1")).value;
            setItems(_items);
          } else {
            const { data, error } = await getItems({
              lok_id: cookies.lok_id,
              page,
              rows: rowsPerPage,
              sellable: "true",
              ...filterProps
            });
            if (error)
              alert("Item ke-1 keatas belum sempat tersimpan di lokal");
            else
              handleResponse({ data, error });
          }
        } else {
          if (localStorage.getItem("pos_item_" + page)) {
            const _items = JSON.parse(localStorage.getItem("pos_item_" + page)).value;
            setItems([...items, ..._items]);
          } else {
            const { data, error } = await getItems({
              lok_id: cookies.lok_id,
              page,
              rows: rowsPerPage,
              sellable: "true",
              ...filterProps
            });
            if (error)
              alert("Item ke-" + page * 20 + " keatas belum sempat tersimpan di lokal");
            else
              handleAppendResponse({ data, error });
          }
        }
        setLoading(false);
      };
      init();
    }
  }, [keyword, filters, page, keydown]);
  reactExports.useEffect(() => {
    const initconfig = async () => {
      const { data, error } = await config({
        kas_id: cookies.kas_id,
        lok_id: cookies.lok_id
      });
      if (data) {
        console.log(cookies);
        setCookies("nama_lokasi", data.nama);
        setCookies("alamat_lokasi", data.alamat);
        setCookies("footer1", data.footer1);
        setCookies("footer2", data.footer2);
        setCookies("telpon", data.telpon);
        setCookies("paket", data.paket);
        setCookies("qris", data.qris);
      }
    };
    initconfig();
  }, []);
  reactExports.useEffect(() => {
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
  reactExports.useEffect(() => {
    setItems([]);
    setPage(1);
    initData();
  }, [keyword, filters, keydown]);
  reactExports.useEffect(() => {
    if (page > 1)
      initData();
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
          value: convertItemListToCheckout(data)
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
          value: convertItemListToCheckout(data)
        })
      );
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
  reactExports.useEffect(() => {
    if (navbarRef.current) {
      setListPadding(`${navbarRef.current.offsetHeight + 20}px`);
    }
  }, [items, navbarRef]);
  reactExports.useEffect(() => {
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
  const takeItem = reactExports.useCallback(
    (item = ItemCheckoutModel()) => {
      let foundItem = false;
      const _itemsCheckout = itemsCheckout.map((_item) => {
        if (_item.itm_id === item.itm_id && _item.konvidx === item.konvidx) {
          _item.qty = cookies.lok_type !== "laundry" ? Number(_item.pakaistok) == 1 ? Number(_item.stok) - _item.qty > 0 ? _item.qty + 1 : _item.qty : _item.qty + 1 : _item.qty;
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
          '[{"service_id":"1","service_itm_id":"' + item.itm_id + '","service_nama":"' + (item.service_level && item.service_level.length > 0 ? item.service_level[0].level : "") + '","service_qty":1,"service_diskon":0,"service_hrg":"' + (item.service_level && item.service_level.length > 0 ? item.service_level[0].hrg : item.satuan0hrg) + '","service_total":"' + (item.service_level && item.service_level.length > 0 ? item.service_level[0].hrg : item.satuan0hrg) + '"}]'
        );
        item.total = item.satuan0hrg;
        item.qty_service = 1;
        item.dot_id = 0;
        item.split_bill = "Bill-1";
        _itemsCheckout.push(item);
      }
      setItemsCheckout(_itemsCheckout);
      cookies.role_create.length == 0 && cookies.role_dst.length == 0 ? setItemsCheckout(_itemsCheckout) : cookies.role_dst.findIndex((a) => a == "ALL") >= 0 ? setItemsCheckout(_itemsCheckout) : cookies.role_create.findIndex((a) => a == "POS") >= 0 ? setItemsCheckout(_itemsCheckout) : null;
    },
    [itemsCheckout]
  );
  const takeDraft = reactExports.useCallback(
    (item) => {
      setItemsCheckout([]);
      const checkOutDraftItem = [];
      const _items = convertDraftListToCheckout(item.notaitems);
      if (_items.length > 0)
        _items[0].dot_id = item.dot_id;
      _items.forEach((_item, index) => {
        if (items.find((itm) => {
          if (itm.itm_id == _item.itm_id && parseFloat(itm.stok) > 0 && parseInt(itm.pakaistok) > 0 || itm.itm_id == _item.itm_id && parseFloat(itm.pakaistok) <= 0) {
            return true;
          }
          return false;
        })) {
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
    },
    [items]
  );
  const cancelItem = reactExports.useCallback(
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
  const clearItem = reactExports.useCallback(
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
  const handleDraft = reactExports.useCallback((keyword2) => {
    const handleResponse2 = ({ data, error }) => {
      if (error) {
        alert("Data tidak ditemukan");
      } else {
        setDraftItems(data);
        setDraftOpen(true);
      }
    };
    if (keyword2 && keyword2.length > 1) {
      const initkey = async () => {
        setLoading(true);
        setDraftItems([]);
        const { data, error } = await readDraftPos({ kas_id: cookies.kas_id, q: keyword2 });
        handleResponse2({ data, error });
        setLoading(false);
      };
      initkey();
    } else if (!keyword2) {
      const init = async () => {
        setLoading(true);
        setDraftItems([]);
        const { data, error } = await readDraftPos({ kas_id: cookies.kas_id });
        handleResponse2({ data, error });
        setLoading(false);
      };
      init();
    }
  }, []);
  reactExports.useEffect(() => {
    if (draftOpen)
      handleDraft(keywordDraft);
  }, [keywordDraft]);
  const readFullDraft = reactExports.useCallback(
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
    Number(selectedItems.pakaistok) == 1 ? Number(selectedItems.stok) - evt.target.value >= 0 ? setQty(evt.target.value) : null : setQty(evt.target.value);
  }
  const handleInput = reactExports.useCallback(
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
  const handleAcceptInput = reactExports.useCallback(() => {
    const _newitemCheckout = [...itemsCheckout];
    let foundItem = false;
    if (qty <= 0) {
      alert("Kuantiti tidak boleh 0");
    }
    itemsCheckout.map((_item, i2) => {
      if (_item.itm_id === selectedItems.itm_id && _item.konvidx === selectedItems.konvidx) {
        foundItem = true;
        itemsCheckout[i2].qty = qty <= 0 ? 1 : Number(qty);
        itemsCheckout[i2].diskon = Number(diskon);
        itemsCheckout[i2].total = itemsCheckout[i2].satuan0hrg * Number(qty) * (1 - Number(diskon) / 100);
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
    } else {
      const price = item.satuan0hrg;
      totalPrice += item.qty * price;
      totalQty += item.qty;
    }
  });
  const ShowContent = () => {
    if (semiDesktopMode) {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        POSItemScrollMd,
        {
          items,
          itemsCheckout,
          onAdd: takeItem,
          onRemove: cancelItem,
          onOption: setContextMenuItem,
          onHold: handleInput,
          onLoad: () => setPage(page + 1),
          infinite: !keyword
        }
      );
    } else {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(react.List, { className: "divide-y divide-dashed divide-gray-400", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        POSItemScrollSm,
        {
          items,
          itemsCheckout,
          onAdd: takeItem,
          onRemove: cancelItem,
          onOption: setContextMenuItem,
          onHold: (evt) => handleInput(evt),
          onLoad: () => setPage(page + 1),
          infinite: !keyword
        }
      ) });
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(reactExports.Fragment, { children: [
    !loading ? null : /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingOverlay, { white: true }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-screen-adapt bg-gray-50 overflow-hidden relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "top-0 inset-x-0 fixed bg-gradient-to-b from-gray-50 h-20 desktop:max-w-[60%] mx-auto" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 top-0 inset-x-0 fixed z-50 mx-auto desktop:max-w-[60%]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Navbar, { ref: navbarRef, className: `pt-2 px-2 ${!filters.length ? "pb-6" : "pb-4"} relative`, blurred: false, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.IconButton, { variant: "text", size: "md", onClick: () => setMenuOpen(true), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bars3Icon, { className: "h-6 w-6 stroke-2" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-2 flex-grow", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            SearchNavbar,
            {
              onSearch: setKeyword,
              onKeyDown: handleSearchEnter,
              value: keyword,
              label: "Cari Barang (Kasir)"
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.IconButton, { size: "md", variant: "text", onClick: openDrawerRight, children: /* @__PURE__ */ jsxRuntimeExports.jsx(AdjustmentsVerticalIcon, { className: "h-6 w-6 stroke-2" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.IconButton, { size: "md", variant: "text", onClick: () => handleDraft(), children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookmarkIcon$1, { className: "h-6 w-6 stroke-2" }) })
        ] }),
        !filters.length ? /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "gray", className: "absolute right-14 bottom-1 text-xs italic", children: "Semua Kategori" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-2 pt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FilterChips, { filters, onSetFilters: setFilterChips }) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pb-20 overflow-auto h-full", style: { paddingTop: listPadding }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen", children: !items.length && !loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto py-20 w-fit", children: dictionary.cashier.pos.noItems[lang] }) : ShowContent() }) }),
      !itemsCheckout[0] ? null : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed bottom-3 inset-x-3 mx-auto desktop:max-w-[60%]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        react.Button,
        {
          size: "lg",
          variant: "gradient",
          color: "green",
          className: "group w-full relative flex items-center gap-3 overflow-hidden pr-[60px] pl-3 mx-auto desktop:max-w-[60%]",
          onClick: () => cookies.lok_type == "laundry" ? navigate(topic.cashier.checkout_laundry.route) : cookies.split_bill ? navigate(topic.cashier.checkout_splitbill.route) : navigate(topic.cashier.checkout.route),
          onContextMenu: (evt) => {
            evt.preventDefault();
            setCartOption(true);
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex-grow text-left mx-auto desktop:max-w-[60%]", children: [
              totalQty,
              " ",
              dictionary.cashier.pos.itemsSelected[lang]
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              currency,
              " ",
              formatThousandSeparator(totalPrice)
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute right-0 grid h-full w-12 place-items-center bg-green-500 transition-colors group-hover:bg-green-600", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCartIcon$1, { className: "w-5 h-5" }) })
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Dialog, { open: contextMenuItem != null, handler: () => setContextMenuItem(null), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(react.DialogHeader, { children: dictionary.cashier.pos.clearHeader[lang] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(react.DialogBody, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "m-16 text-center", children: dictionary.cashier.pos.clear[lang] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.Button, { className: "mb-4 w-full", variant: "outlined", color: "teal", onClick: () => setContextMenuItem(null), children: dictionary.common.cancel[lang] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.Button, { variant: "gradient", color: "teal", onClick: () => clearItem(contextMenuItem), className: "mb-4 w-full", children: dictionary.cashier.pos.clearOne[lang] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.Button, { variant: "gradient", color: "teal", onClick: () => clearItem(), className: "mb-4 w-full", children: dictionary.cashier.pos.clearAll[lang] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Dialog, { open: draftOpen, handler: handleDraft, size: "xxl", className: "bg-white overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(react.DialogHeader, { children: [
        "Draft Pesanan ",
        cookies.max_draft ? `Batasan ${cookies.max_draft} Pesanan` : null
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(react.DialogBody, { className: "overflow-auto p-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 top-0 inset-x-0 fixed z-50", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          react.Navbar,
          {
            ref: navbarRef,
            className: `pt-2 px-2 ${!filters.length ? "pb-6" : "pb-4"} relative`,
            blurred: false,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-2 flex-grow", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              SearchNavbar,
              {
                onSearch: setKeywordDraft,
                onKeyDown: handleSearchEnter,
                value: keywordDraft,
                label: "Cari Meja/Item/Kustomer"
              }
            ) }) })
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.List, { className: "divide-y divide-dashed divide-gray-400", children: !draftItems && !loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto py-20", children: "Draft Pesanan" }) : draftItems == null ? void 0 : draftItems.map((i, index) => {
          const namacustomerdraft = i.cus_id ? i.cus_nama : "Tanpa Nama";
          const namatabledraft = i.mej_id ? "(" + i.mej_nama + ")" : "";
          let totalqty = 0;
          {
            i.notaitems.map((ii, indexi) => {
              totalqty = totalqty + Number(ii.qty);
            });
          }
          return index < (cookies.max_draft != 0 ? Number(cookies.max_draft) : draftItems.length) ? /* @__PURE__ */ jsxRuntimeExports.jsx(react.ListItem, { className: "", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full pr-2", onClick: () => takeDraft(i), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between w-full", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "gray", className: "font-normal", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: namacustomerdraft }),
                ` ${totalqty} Item`,
                " ",
                namatabledraft
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Typography, { color: "gray", className: "font-normal", children: [
                currency,
                " ",
                formatThousandSeparator(Number(i.total))
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap", children: i.status ? i.notaitems.map((ii, indexi) => {
              return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-white bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:ring-teal-200 font-medium rounded-lg text-sm px-2 py-1 me-2 mb-2 dark:bg-teal-600 dark:hover:bg-teal-700 focus:outline-none dark:focus:ring-teal-800", children: [
                Number(ii.qty),
                `-${ii.itm_nama}`
              ] });
            }) : i.notaitems.map((ii, indexi) => {
              return indexi < 3 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-white bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:ring-teal-200 font-medium rounded-lg text-sm px-2 py-1 me-2 mb-2 dark:bg-teal-600 dark:hover:bg-teal-700 focus:outline-none dark:focus:ring-teal-800", children: [
                Number(ii.qty),
                `-${ii.itm_nama}`
              ] }) : indexi == i.notaitems.length - 1 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "text-white bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:ring-teal-200 font-medium rounded-lg text-sm px-2 py-1 me-2 mb-2 dark:bg-teal-600 dark:hover:bg-teal-700 focus:outline-none dark:focus:ring-teal-800",
                  onClick: () => readFullDraft(i),
                  children: [
                    i.notaitems.length - 3,
                    "+ More"
                  ]
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", {});
            }) })
          ] }) }, index) : null;
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(react.DialogFooter, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Button, { variant: "gradient", color: "red", onClick: () => setDraftOpen(false), className: "mr-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Back" }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Dialog, { open: inputOpen, handler: handleInput, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(react.DialogHeader, { children: dictionary.cashier.pos.inputHeader[lang] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(react.DialogBody, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Input, { type: "number", label: "Qty", value: qty, onChange: handleChangeQty }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.Button, { className: "mb-4 mr-2", variant: "gradient", color: "red", onClick: () => setInputOpen(false), children: "Batal" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.Button, { variant: "gradient", color: "teal", onClick: () => handleAcceptInput(), className: "mb-4", children: "Terapkan" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Dialog, { open: cartOptions, handler: () => setCartOption(false), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(react.DialogHeader, { children: dictionary.cashier.pos.cartOptions[lang] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(react.DialogBody, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          react.Button,
          {
            className: "mb-4 w-full",
            variant: "outlined",
            color: "red",
            onClick: () => {
              clearItem();
              setCartOption(false);
            },
            children: dictionary.cashier.pos.clearAll[lang]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          react.Button,
          {
            variant: "gradient",
            color: "teal",
            onClick: () => navigate(topic.cashier.checkout.route),
            className: "mb-4 w-full",
            children: dictionary.cashier.pos.checkout[lang]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      react.Dialog,
      {
        open: cookies.always_print && printerState === PRINTER_STATE_NONE,
        handler: () => setPrinterState(PRINTER_STATE_SKIP),
        size: "sm",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.DialogHeader, { children: "Setup Printer" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(react.DialogBody, { children: [
            !printerLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-3", children: "Printer belum diset-up. Set-up printer sekarang?" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center mx-auto", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Melakukan set-up printer" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Spinner, { className: "h-5 w-5 ml-3", color: "teal" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Button, { className: "mb-2", fullWidth: true, variant: "gradient", color: "teal", onClick: initPrinterBT, children: "Ya, via Bluetooth" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Button, { className: "mb-2", fullWidth: true, variant: "gradient", color: "teal", onClick: initPrinterUSB, children: "Ya, via USB" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              react.Button,
              {
                className: "mb-2",
                fullWidth: true,
                variant: "outlined",
                color: "teal",
                onClick: () => setPrinterState(PRINTER_STATE_SKIP),
                children: "Nanti saja"
              }
            )
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ItemFilter,
      {
        open: openFilter,
        onClose: () => setOpenFilter(false),
        onCheck: handleCheckFilter,
        onClear: () => setClearFilter(!clearFilter),
        checkedIds: filters == null ? void 0 : filters.map((i, index) => i.value)
      }
    )
  ] });
}
export {
  PointOfSales as default
};
