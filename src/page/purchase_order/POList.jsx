import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
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
import { deleteTransaction } from "../../api/Transaction";
import { getPo, savePo, approvePo } from "../../api/Inventory";
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

export default function POList() {
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
  const [transById, setTransById] = useState({});
  const navbarRef = useRef();
  const [calendar, setCalendar] = useState(false);
  const calendarRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [refreshflag, setRefreshflag] = useState(false);
  const [poitemlist, setPoitemlist] = useState([]);
  const [poById, setPoById] = useState([POListModel]);
  const [poitemflag, setPoitemflag] = useState(true);
  const [poSuppNama, setPoSuppNama] = useState("");
  const [posuppflag, setPosuppflag] = useState(true);
  const [itemlist, setItemlist] = useState([]);
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

  const handleAddItem = () => {
    setPoitemflag(false);
  };

  const handleSupplier = () => {
    setPosuppflag(false);
  };

  const handleAdd = () => {
    setPoitemlist([]);
    setPoitemflag(true);
    setPoById({
      po_sup_id: "",
      po_total: 0,
      po_kas_id: cookies.kas_id,
      po_lok_id: cookies.lok_id,
      po_catatan: "",
      po_status: "OPEN",
      po_id: 0,
    });
    setOpen(!open);
  };
  const setSupp = (supp) => {
    const _poById = cloneDeep(poById);
    setPoSuppNama(supp.sup_nama);
    _poById.po_sup_id = supp.sup_id;
    setPoById(_poById);
    setPosuppflag(true);
  };

  function handleOpen(item, index) {
    item.poitems.map((_poitem) => {
      _poitem.total = parseFloat(_poitem.total);
      _poitem.satuan1hrg = parseFloat(_poitem.satuan1hrg);
      _poitem.satuan2hrg = parseFloat(_poitem.satuan2hrg);
      _poitem.satuan3hrg = parseFloat(_poitem.satuan3hrg);
    });
    setPoitemlist(item.poitems);
    setPoById(item);
    setPoitemflag(true);
    setOpen(!open);
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
    const _poItemList = poitemlist.map((_item) => {
      let _item_temp = _item;
      if (_item.itm_id === item.itm_id && _item.konvidx === item.konvidx) {
        _item.qty = _item.qty + 1;
        _item.total = _item.qty * parseFloat(_item.satuan0hrg);
        _item.po_id = poById.po_id;
        foundItem = true;
      }
      return _item;
    });
    if (!foundItem) {
      item.qty = 1;
      item.po_id = poById.po_id;
      item.total = parseFloat(item.satuan0hrg);
      _poItemList.push(item);
    }
    setPoitemlist(_poItemList);
    setPoitemflag(true);
  }

  const saveData = useCallback(async () => {
    console.log(poitemlist);
    setLoading(true);
    let totalPrice = 0;
    poitemlist.forEach((item) => {
      const price = item.satuan0hrg;
      totalPrice += item.qty * price;
    });
    const _poById = cloneDeep(poById);
    _poById.po_total = totalPrice;
    _poById.rows = poitemlist;
    console.log(_poById);
    const { data, error } = await savePo(_poById);
    //setPayLoading(false);
    if (error) {
      alert(error.message);
      console.log(error.message);
    } else {
      setOpen(false);
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
    setListPadding(`${navbarRef.current.offsetHeight + 20}px`);
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
      setItemlist([...itemlist, ..._item]);
    }
  };

  function handleNewOpen(item) {
    setTransById(item);
    cookies.role_delete.length == 0 && cookies.role_dst.length == 0
      ? setNewOpen(!newOpen)
      : cookies.role_dst.findIndex((a) => a == "ALL") >= 0
      ? setNewOpen(!newOpen)
      : cookies.role_delete.findIndex((a) => a == "TRANS") >= 0
      ? setNewOpen(!newOpen)
      : setNewOpen(false);
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

  const handleDelete = useCallback(async () => {
    const { data, error } = await deleteTransaction({
      not_id: transById.id,
      log_reason: "",
      kas_id: cookies.kas_id,
    });
    if (error) {
      alert("Data tidak ditemukan");
    } else {
      setLoading(true);
      setNewOpen(false);
      setTransById({});
      setPage(1);
      const init = async () => {
        const { data, error } = await getPo({
          lok_id: cookies.lok_id,
          page: 1,
          rows: rowsPerPage,
          loaditems: "yes",
        });
        handleResponse({ data, error });
      };
      init();
      setLoading(false);
    }
  }, [transById]);

  return (
    <Fragment>
      {!loading ? null : <LoadingOverlay white />}
      <div className="h-screen-adapt bg-gray-50 overflow-hidden">
        <div className="top-0 inset-x-0 fixed bg-gradient-to-b from-gray-50 h-20" />
        <div className="p-2 top-0 inset-x-0 fixed z-10 mx-auto desktop:max-w-[60%]">
          <Navbar ref={navbarRef} className={`pt-2 px-2 ${!filters.length ? "pb-6" : "pb-4"} relative`} blurred={false}>
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

        <Dialog open={open} handler={handleOpen} size="xxl">
          <DialogHeader className="border-b-2">
            PO {poById.po_sup_id == "" ? "(Supplier Kosong)" : `(${poSuppNama})`}
          </DialogHeader>

          <DialogBody className="overflow-auto pb-10">
            {poitemflag & posuppflag ? (
              <div>
                <List className="divide-y divide-dashed divide-gray-400 h-[100dvh]">
                  {poitemlist?.map((i, index) => {
                    return (
                      <ListItem key={index} className="">
                        <div className="grid grid-cols-3 mb-2 w-[100%]">
                          <div className=" flex flex-col gap-1 col-span-2">
                            <div className="w-[100%] whitespace-nowrap overflow-hidden text-ellipsis font-semibold">
                              {i.itm_nama}
                            </div>
                            <div className="flex gap-1 items-start">
                              <div className="w-max py-[2px] px-2 text-[12px] font-semibold bg-orange-100 rounded-md">
                                {i.qty}
                              </div>
                              <div className="w-max py-[2px] px-2 text-[12px] font-semibold bg-blue-100 rounded-md">
                                / {SetItemUnit(i.satuan0.toUpperCase())}
                              </div>
                            </div>
                            <Typography
                              color="gray"
                              className="w-max py-[2px] px-2 text-[15px] font-semibold bg-green-100 rounded-md"
                            >
                              {currency}{" "}
                              {formatThousandSeparator(
                                i.satuan0 == i.satuan1
                                  ? i.satuan1hrg
                                  : i.satuan0 == i.satuan2
                                  ? i.satuan2hrg
                                  : i.satuan3hrg
                              )}
                            </Typography>
                          </div>

                          <div className="w-[100%] flex flex-col gap-1 justify-center">
                            <Typography
                              color="gray"
                              className="w-max py-[2px] px-2 text-[15px] font-semibold bg-green-100 rounded-md "
                            >
                              {currency} {formatThousandSeparator(i.total)}
                            </Typography>
                          </div>
                        </div>
                      </ListItem>
                    );
                  })}
                </List>
                <div className="fixed bottom-36 right-4">
                  <IconButton variant="filled" color="teal" className="rounded-full" size="lg" onClick={handleSupplier}>
                    <TruckIcon className="h-8 w-8 text-black-500" />
                  </IconButton>
                </div>
                <div className="fixed bottom-28 right-4">
                  <IconButton variant="filled" color="teal" className="rounded-full" size="lg" onClick={handleAddItem}>
                    <PlusCircleIcon className="h-8 w-8 text-black-500" />
                  </IconButton>
                </div>
              </div>
            ) : !poitemflag & posuppflag ? (
              <div>
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
                      <SearchNavbar
                        onSearch={handleFilterItem}
                        value={keywordItem}
                        label="Cari Item"
                      />
                    </div>
                  </div>
                </Navbar>
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
            ) : (
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
            )}
          </DialogBody>

          <DialogFooter className="border-t-2">
            <Button
              variant="gradient"
              color="red"
              onClick={() => {
                poitemflag ? setOpen(false) : setPoitemflag(true);
              }}
              className="mr-1"
            >
              <span>Back</span>
            </Button>
            <Button className="block" variant="gradient" color="green" onClick={saveData}>
              <span>Confirm</span>
            </Button>
          </DialogFooter>
        </Dialog>

        <Dialog open={newOpen} handler={handleNewOpen}>
          <DialogHeader>Konfirmasi Penghapusan Data</DialogHeader>
          <DialogBody>
            <div className="my-16 mx-5 text-justify">
              Apakah anda yakin untuk menghapus transaksi bernomor {transById.nomor} ?
            </div>
          </DialogBody>
          <DialogFooter>
            <Button variant="gradient" color="red" onClick={() => setNewOpen(false)} className="mr-1">
              <span>Cancel</span>
            </Button>
            <Button variant="gradient" color="teal" onClick={handleDelete}>
              <span>Confirm</span>
            </Button>
          </DialogFooter>
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
