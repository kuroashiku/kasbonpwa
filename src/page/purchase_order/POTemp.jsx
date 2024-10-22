import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  List,
  ListItem,
  IconButton,
  Navbar,
  Typography,
} from "@material-tailwind/react";
import { Fragment, useContext, useEffect, useRef, useState, useCallback } from "react";
import SearchNavbar from "../../lib/SearchNavbar";
import { AdjustmentsVerticalIcon, Bars3Icon, PlusCircleIcon, TruckIcon } from "@heroicons/react/24/outline";
import FilterChips from "../../lib/FilterChips";
import { AppContext } from "../../AppContext";
import { dictionary } from "../../constant/appDictionary";
import { SetItemUnit } from "../../util/formatter";
import { getPo, savePo, approvePo, deletePo } from "../../api/Inventory";
import { getSupplier } from "../../api/Supplier";
import { getItems } from "../../api/Item";
import { POListModel } from "../../model/inventory";
import { convertItemListToCheckout } from "../../model/item";
import LoadingOverlay from "../../lib/LoadingOverlay";
import POScroll from "./POScroll";
import { TIME_SEARCH_DEBOUNCE } from "../../constant/appCommon";
import POFilter from "./POFilter";
import POItemScroll from "./POItemScroll";
import { cloneDeep } from "lodash";
import { formatDate, formatRangeDate } from "../../util/formatter";
import { formatSentenceCase, formatThousandSeparator } from "../../util/formatter";
import { PlusIcon } from "@heroicons/react/16/solid";
import InputSimple from "../../lib/InputSimple";
import InputMoney from "../../lib/InputMoney";

export default function POTemp() {
  const { setMenuOpen, filters, setFilters, lang, cookies, rowsPerPage, currency } = useContext(AppContext);
  const [listPadding, setListPadding] = useState("20px");
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState("");
  const [keywordItem, setKeywordItem] = useState("");
  const [purchaseorders, setPurchaseorders] = useState([POListModel]);
  const [suppliers, setSuppliers] = useState([]);
  const [openFilter, setOpenFilter] = useState(false);
  const [newOpen, setNewOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [pageItem, setPageItem] = useState(1);
  const navbarRef = useRef();
  const [calendar, setCalendar] = useState(false);
  const calendarRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [refreshflag, setRefreshflag] = useState(false);
  const [poitemlist, setPoitemlist] = useState([]);
  const [poById, setPoById] = useState([POListModel]);
  const [poSuppNama, setPoSuppNama] = useState("");
  const [itemlist, setItemlist] = useState([]);
  const [poFlag, setPoFlag] = useState(true);
  const [openItem, setOpenItem] = useState(false);
  const [openSupp, setOpenSupp] = useState(false);
  const [openInput, setOpenInput] = useState(false);
  const [poItemById, setPoItemById] = useState({});
  const [qty, setQty] = useState(1);
  const [qtyTemp, setQtyTemp] = useState(1);
  //const [payLoading, setPayLoading] = useState(false);

  const handleFilter = (searchKey) => {
    setKeyword(searchKey);
  };

  const handleFilterItem = (searchKey) => {
    setKeywordItem(searchKey);
  };

  const openDrawerRight = () => setOpenFilter(true);
  // const closeDrawerRight = () => setOpenFilter(false);

  const handleResponse = ({ data, error }) => {
    if (error) {
      alert("Terjadi Kesalahan");
    } else {
      setPurchaseorders(data);
    }
  };

  const handleInput = useCallback(
    (input) => {
      setQty(Number(input.qty));
      setOpenInput(true);
      setPoItemById(input);
      setQtyTemp(Number(input.qty));
    },
    [poitemlist, qty]
  );

  const handleCloseQty = useCallback(() => {
    setOpenInput(false);
    if (qty == 0) {
      alert("Kuantiti tidak boleh 0");
      const _poitemlist = [...poitemlist];
      _poitemlist.map((_item) => {
        if (_item.itm_id === poItemById.itm_id && _item.konvidx === poItemById.konvidx) {
          _item.qty = qtyTemp;
          _item.total = parseFloat(poItemById.satuan0hpp) * qtyTemp;
        }
      });
    }
  }, [qty, qtyTemp, poitemlist, poItemById]);

  function handleChangeQty(evt) {
    console.log(poItemById);
    setQty(evt.target.value);
    const _poitemlist = [...poitemlist];
    _poitemlist.map((_item) => {
      if (_item.itm_id === poItemById.itm_id && _item.konvidx === poItemById.konvidx) {
        _item.qty = evt.target.value;
        _item.total = parseFloat(poItemById.satuan0hpp) * evt.target.value;
      }
    });
    setPoitemlist(_poitemlist);
  }

  const handleAdd = () => {
    setPoitemlist([]);
    setPoFlag(false);
    setPoById({
      po_sup_id: "",
      po_total: 0,
      po_kas_id: cookies.kas_id,
      po_lok_id: cookies.lok_id,
      po_catatan: "",
      po_status: "OPEN",
      po_id: 0,
      tgapprove: null,
    });
    setOpen(!open);
  };

  const setSupp = (supp) => {
    const _poById = cloneDeep(poById);
    setPoSuppNama(supp.sup_nama);
    _poById.po_sup_id = supp.sup_id;
    _poById.sup_id = supp.sup_id;
    setPoById(_poById);
    setOpenSupp(false);
  };

  function handleOpen(item, index) {
    console.log(item);
    setPoSuppNama(item.sup_nama);
    item.poitems.map((_poitem) => {
      _poitem.itm_id = _poitem.poi_itm_id;
      _poitem.satuan0 = _poitem.poi_satuan0;
      _poitem.satuan0hpp = parseFloat(_poitem.poi_satuan0hpp);
      _poitem.satuan0hrg = parseFloat(_poitem.poi_satuan0hrg);
      _poitem.satuan0of1 = parseFloat(_poitem.poi_satuan0of1);
      _poitem.satuan1 = _poitem.poi_satuan1;
      _poitem.satuan1hpp = parseFloat(_poitem.poi_satuan1hpp);
      _poitem.satuan1hrg = parseFloat(_poitem.poi_satuan1hrg);
      _poitem.total = parseFloat(_poitem.poi_total);
    });
    setPoitemlist(item.poitems);
    console.log(item);
    setPoById(item);
    setPoFlag(false);
  }

  function handleApprove(item, index) {
    console.log(item);
    // setTransIndex(index);
    // setTransById(item);
    const init = async () => {
      const { data, error } = await approvePo({
        po_id: item.po_id,
      });
      setRefreshflag(!refreshflag);
    };
    init();
  }

  function setItem(item, index) {
    let foundItem = false;
    console.log(item);
    const _poItemList = poitemlist.map((_item) => {
      let _item_temp = _item;
      if (_item.itm_id === item.itm_id && _item.konvidx === item.konvidx) {
        _item.total = _item.qty * parseFloat(_item.satuan0hpp);
        _item.po_id = poById.po_id;
        foundItem = true;
      }
      return _item;
    });
    if (!foundItem) {
      item.qty = 1;
      item.po_id = poById.po_id;
      item.total = parseFloat(item.satuan0hpp);
      _poItemList.push(item);
    }
    setPoitemlist(_poItemList);
    setOpenItem(false);
    // setPoitemflag(true)
  }

  const saveData = useCallback(async () => {
    console.log(poitemlist);
    setLoading(true);
    let totalPrice = 0;
    poitemlist.forEach((item) => {
      const price = item.satuan0hpp;
      totalPrice += item.qty * price;
    });
    console.log(totalPrice);
    const _poById = cloneDeep(poById);
    _poById.po_total = totalPrice;
    _poById.rows = poitemlist;
    _poById.po_kas_id = cookies.kas_id;
    _poById.po_lok_id = cookies.lok_id;
    _poById.po_status = "OPEN";
    console.log(_poById);
    const { data, error } = await savePo(_poById);
    //setPayLoading(false);
    if (error) {
      alert(error.message);
      console.log(error.message);
    } else {
      setPoFlag(true);
      console.log(data);
      setLoading(false);
      setRefreshflag(!refreshflag);
    }
  }, [poById, poitemlist]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setCalendar(false);
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [calendarRef]);

  useEffect(() => {
    navbarRef.current ? setListPadding(`${navbarRef.current.offsetHeight + 20}px`) : null;
  }, [filters]);

  useEffect(() => {
    const _dateFilter = filters.find((f) => f.key === "date");
    let filterProps = {};
    if (_dateFilter) {
      if (_dateFilter.value) {
        //single date
        const datepart = formatDate(_dateFilter.value, true).split("-");
        filterProps = {
          har: Number(datepart[0]),
          bln: Number(datepart[1]),
          thn: Number(datepart[2]),
        };
      } else {
        //ranged date
        const datepart = formatRangeDate(_dateFilter.valueMin, _dateFilter.valueMax, true).split("/");
        if (datepart[1]) {
          filterProps = {
            datepast: datepart[0],
            datenow: datepart[1],
          };
        } else {
          filterProps = {
            datepast: datepart[0] + " 00:00:00",
            datenow: datepart[0] + " 23:59:59",
          };
        }
      }
    }
    if (keyword && keyword.length > 1) {
      const orderSearch = setTimeout(async () => {
        setPage(1);
        setLoading(true);
        const { data, error } = await getPo({
          lok_id: cookies.lok_id,
          q: keyword,
          page: 1,
          rows: rowsPerPage,
          loaditems: "yes",
          orifields: "yes",
          ...filterProps,
        });
        handleResponse({ data, error });
        setLoading(false);
      }, TIME_SEARCH_DEBOUNCE);
      return () => {
        clearTimeout(orderSearch);
      };
    } else if (!keyword) {
      const init = async () => {
        setPurchaseorders([]);
        setLoading(true);
        setPage(1);
        const { data, error } = await getPo({
          lok_id: cookies.lok_id,
          page: 1,
          rows: rowsPerPage,
          loaditems: "yes",
          orifields: "yes",
          ...filterProps,
        });
        handleResponse({ data, error });
        setLoading(false);
      };
      init();
    }
  }, [keyword, filters, refreshflag]);

  const handleResponseItem = ({ data, error }) => {
    if (error) {
      alert("Data tidak ditemukan");
    } else {
      setItemlist(convertItemListToCheckout(data));
    }
  };

  useEffect(() => {
    const initsupp = async () => {
      setSuppliers([]);
      setPage(1);
      const { data, error } = await getSupplier({
        com_id: cookies.com_id,
      });
      if (!error) {
        setSuppliers(data);
      }
    };
    initsupp();
    if (keywordItem && keywordItem.length > 1) {
      const orderSearch = setTimeout(async () => {
        setPage(1);
        setLoading(true);
        const { data, error } = await getItems({
          lok_id: cookies.lok_id,
          key_val: keywordItem,
          page: 1,
          rows: rowsPerPage,
          buyable: "true",
        });
        handleResponseItem({ data, error });
        setLoading(false);
      }, TIME_SEARCH_DEBOUNCE);
      return () => {
        clearTimeout(orderSearch);
      };
    } else if (!keywordItem) {
      const init = async () => {
        setItemlist([]);
        setLoading(true);
        setPageItem(1);
        const { data, error } = await getItems({
          lok_id: cookies.lok_id,
          page: 1,
          rows: rowsPerPage,
          buyable: "true",
        });
        handleResponseItem({ data, error });
        setLoading(false);
      };
      init();
    }
  }, [keywordItem, filters]);

  //in case of user scrolling
  useEffect(() => {
    if (purchaseorders[0] && purchaseorders[0].po_id && !filters[0]) {
      const init = async () => {
        const { data, error } = await getPo({
          lok_id: cookies.lok_id,
          page: page,
          rows: rowsPerPage,
          orifields: "yes",
          loaditems: "yes",
        });
        handleAppendResponse({ data, error });
      };
      init();
    }
  }, [page, filters]);

  const handleAppendResponse = ({ data, error }) => {
    if (error) {
      alert("Terjadi Kesalahan");
    } else {
      const _po = data;
      setPurchaseorders([...purchaseorders, ..._po]);
    }
  };

  useEffect(() => {
    if (itemlist[0] && itemlist[0].id && !filters[0]) {
      const init = async () => {
        const { data, error } = await getItems({
          lok_id: cookies.lok_id,
          page: pageItem,
          rows: rowsPerPage,
          loaditems: "yes",
          buyable: "true",
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
      const _item = convertItemListToCheckout(data);
      setItemlist([...itemlist, ..._item]);
    }
  };

  function handleNewOpen(item) {
    setPoById(item);
    cookies.role_delete.length == 0 && cookies.role_dst.length == 0
      ? setNewOpen(!newOpen)
      : cookies.role_dst.findIndex((a) => a == "ALL") >= 0
      ? setNewOpen(!newOpen)
      : cookies.role_delete.findIndex((a) => a == "TRANS") >= 0
      ? setNewOpen(!newOpen)
      : setNewOpen(false);
  }

  function handleOpenItem(item) {
    //setTransById(item);
    setOpenItem(true);
  }

  function handleOpenSupplier(item) {
    //setTransById(item);
    setOpenSupp(true);
  }

  // function handlePrint(item) {
  // 	setSuccess(true);
  // 	setItemsCheckout([]);
  // 	item.dibayar=parseFloat(item.dibayar)
  // 	item.total=parseFloat(item.total)
  // 	item.notaitems.map((ii, indexi) => {
  // 		ii.satuan0hrg=parseFloat(ii.satuan0hrg)
  // 		ii.total=parseFloat(ii.total)
  // 	})
  // 	setNotaItemsCheckout(item);
  // 	setTotalPay(0);
  // 	setMoney(0);
  // 	console.log(item)
  // }

  const handleDelete = useCallback(
    async (item) => {
      console.log(poById);
      const { data, error } = await deletePo({
        po_id: poById.po_id,
      });
      if (data) {
        setLoading(true);
        setNewOpen(false);
        setPoById({});
        setRefreshflag(!refreshflag);
        // setPage(1);
        // const init = async () => {
        // 	const { data, error } = await getPo({
        // 		lok_id: cookies.lok_id,
        // 		page: 1,
        // 		rows: rowsPerPage,
        // 		loaditems: "yes",
        // 	});
        // 	handleResponse({ data, error });
        // };
        // init();
        setLoading(false);
      }
    },
    [poById]
  );

  return (
    <Fragment>
      {!loading ? null : <LoadingOverlay white />}
      <div className="h-screen-adapt bg-gray-50 overflow-hidden">
        <div className={`top-0 inset-x-0 fixed ${poFlag ? "bg-gradient-to-b from-gray-50" : ""} h-20`} />

        {poFlag ? (
          <div className="p-2 top-0 inset-x-0 fixed z-10 mx-auto desktop:max-w-[60%]">
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
                  <SearchNavbar onSearch={handleFilter} value={keyword} label="No. Purchase Order" />
                </div>
                <IconButton size="md" variant="text" onClick={openDrawerRight}>
                  <AdjustmentsVerticalIcon className="h-6 w-6 stroke-2" />
                </IconButton>
              </div>
              {!filters.length ? (
                <Typography variant="small" color="gray" className="absolute right-14 bottom-1 text-xs italic">
                  Semua Nomor PO
                </Typography>
              ) : (
                <div className="px-2 pt-4">
                  <FilterChips filters={filters} onSetFilters={setFilters} />
                </div>
              )}
            </Navbar>
          </div>
        ) : null}

        {poFlag ? (
          <div className="pb-20 overflow-auto h-full" style={{ paddingTop: listPadding }}>
            <div className="min-h-screen">
              <List className="divide-y divide-dashed divide-gray-400">
                {!purchaseorders.length && !loading ? (
                  <div className="mx-auto py-20">PO Kosong</div>
                ) : (
                  <POScroll
                    po={purchaseorders}
                    onRemove={handleNewOpen}
                    onOpen={handleOpen}
                    onApprove={handleApprove}
                    onLoad={() => setPage(page + 1)}
                    infinite={!keyword}
                    // onPrint={handlePrint}
                  />
                )}
              </List>
              <div className="fixed bottom-4 right-4">
                <IconButton variant="filled" color="teal" className="rounded-full" size="lg" onClick={handleAdd}>
                  <PlusCircleIcon className="h-8 w-8 text-black-500" />
                </IconButton>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div
              className={`p-4 text-lg font-semibold border-b-2 ${
                !poById.sup_id ? "text-gray-500" : "text-blue-gray-700"
              }`}
            >
              {!poById.sup_id ? "Supplier Kosong" : poSuppNama}
            </div>

            <List className="divide-y divide-dashed divide-gray-400 h-[100dvh]">
              {poitemlist?.map((i, index) => {
                return (
                  <ListItem key={index} className="" onClick={() => (poById.po_tgapprove ? null : handleInput(i))}>
                    <div className="w-full grid grid-cols-3 mb-2">
                      <div className="flex flex-col gap-1 col-span-2">
                        <div className="w-[100%] whitespace-nowrap overflow-hidden text-ellipsis font-semibold">
                          {i.itm_nama}
                        </div>
                        <div className="flex gap-1 items-start">
                          <div className="w-max py-[2px] px-2 text-[12px] font-semibold bg-orange-100 rounded-md">
                            {parseFloat(i.qty)}
                          </div>
                          <div className="w-max py-[2px] px-2 text-[12px] font-semibold bg-blue-100 rounded-md">
                            / {SetItemUnit(i.satuan0.toUpperCase())}
                          </div>
                        </div>

                        {i.satuan0hpp && (
                          <Typography
                            color="gray"
                            className="w-max py-[2px] px-2 text-[12px] font-semibold bg-green-100 rounded-md"
                          >
                            {currency} {formatThousandSeparator(parseFloat(i.satuan0hpp))}
                          </Typography>
                        )}
                      </div>

                      <div className="flex flex-col gap-1 justify-center">
                        <Typography
                          color="gray"
                          className="w-max py-[2px] px-2 text-[15px] font-semibold bg-purple-100 rounded-md "
                        >
                          {currency} {formatThousandSeparator(parseFloat(i.total))}
                        </Typography>
                      </div>
                    </div>
                  </ListItem>
                );
              })}
            </List>

            <div className="fixed bottom-[136px] right-4">
              <IconButton
                disabled={poById.po_tgapprove ? true : false}
                variant="filled"
                color="teal"
                className="rounded-full"
                onClick={handleOpenSupplier}
              >
                <TruckIcon className="h-6 w-6 text-black-500" />
              </IconButton>
            </div>

            <div className="fixed bottom-[85px] right-4">
              <IconButton
                disabled={poById.po_tgapprove ? true : false}
                variant="filled"
                color="teal"
                className="rounded-full"
                onClick={handleOpenItem}
              >
                <PlusIcon className="h-6 w-6 text-black-500" />
              </IconButton>
            </div>

            <div className="fixed flex bottom-0 w-full justify-end p-4 font-semibold border-t-2 mx-auto desktop:max-w-[60%]">
              <Button variant="gradient" color="blue-gray" onClick={() => setPoFlag(true)} className="w-full mr-1">
                <span>Kembali</span>
              </Button>
              {poById.po_tgapprove ? null : (
                <Button
                  variant="gradient"
                  color="green"
                  onClick={saveData}
                  disabled={poitemlist.length > 0 && poById.sup_id ? false : true}
                  className="w-full"
                >
                  <span>Simpan</span>
                </Button>
              )}
            </div>
          </div>
        )}

        <Dialog open={newOpen} handler={handleNewOpen}>
          <DialogBody>
            <div className="text-center my-6">
              Item <span className="font-semibold">{poById.po_nomor}</span> akan dihapus. Apakah anda yakin?
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

        <Dialog open={openItem} handler={handleOpenItem}>
          <DialogHeader className="text-lg text-blue-gray-700">Tambah Item Ke PO</DialogHeader>
          <DialogBody className="max-h-[70vh] p-0 overflow-y-auto">
            <div className="search-bar w-[90%] mx-auto mt-1">
              <SearchNavbar onSearch={handleFilterItem} value={keywordItem} label="Cari Item" />
            </div>
            <div className="max-h-[60vh] px-2 overflow-y-auto">
              <List className="divide-y divide-dashed divide-gray-400">
                <POItemScroll
                  item={itemlist}
                  setItem={setItem}
                  onLoad={() => setPageItem(pageItem + 1)}
                  infinite={!keywordItem}
                  // onPrint={handlePrint}
                />
              </List>
            </div>
          </DialogBody>
          <DialogFooter>
            <Button variant="gradient" color="blue-gray" onClick={() => setOpenItem(false)} className="mr-1">
              <span>Cancel</span>
            </Button>
          </DialogFooter>
        </Dialog>

        <Dialog open={openSupp} handler={handleOpenSupplier}>
          <DialogHeader className="text-lg text-blue-gray-700">Tambah Supplier Ke PO</DialogHeader>
          <DialogBody className="max-h-[70vh] p-0 overflow-y-auto">
            <List className="divide-y divide-dashed divide-gray-400">
              {suppliers?.map((i, index) => {
                return (
                  <ListItem key={index} className="">
                    <div className="w-full pr-2" onClick={() => setSupp(i, index)}>
                      <div></div>
                      <div className="flex items-center justify-between">
                        <Typography variant="small" color="gray" className="font-normal">
                          <b>{formatSentenceCase(i.sup_nama)}</b>
                        </Typography>
                      </div>
                    </div>
                  </ListItem>
                );
              })}
            </List>
          </DialogBody>
          <DialogFooter>
            <Button variant="gradient" color="blue-gray" onClick={() => setOpenSupp(false)} className="mr-1">
              <span>Kembali</span>
            </Button>
          </DialogFooter>
        </Dialog>

        <Dialog open={openInput} handler={handleInput}>
          <DialogHeader className="text-xl">{dictionary.cashier.pos.inputHeader[lang]}</DialogHeader>
          <DialogBody>
            <div className="mb-4">
              <InputMoney
                variant="outlined"
                align="text-left"
                type="number"
                label="Qty"
                value={qty}
                onChange={handleChangeQty}
              ></InputMoney>
            </div>
            <Button className="mb-4 mr-2" variant="gradient" color="blue-gray" onClick={handleCloseQty}>
              Kembali
            </Button>
          </DialogBody>
        </Dialog>

        <POFilter
          open={openFilter}
          onClose={() => setOpenFilter(false)}
          onApply={(newFilter) => {
            setFilters(newFilter);
            setOpenFilter(false);
          }}
        />
      </div>
    </Fragment>
  );
}
