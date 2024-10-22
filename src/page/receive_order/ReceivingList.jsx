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
import { AdjustmentsVerticalIcon, Bars3Icon } from "@heroicons/react/24/outline";
import FilterChips from "../../lib/FilterChips";
import { AppContext } from "../../AppContext";
import { dictionary } from "../../constant/appDictionary";
import { SetItemUnit } from "../../util/formatter";
import { deleteTransaction } from "../../api/Transaction";
import { getPo, getRcv, payRcv, saveRcv } from "../../api/Inventory";
import { POListModel, RcvListModel } from "../../model/inventory";
import LoadingOverlay from "../../lib/LoadingOverlay";
import ReceivingScroll from "./ReceivingScroll";
import POScroll from "./POScroll";
import { TIME_SEARCH_DEBOUNCE } from "../../constant/appCommon";
import ReceivingFilter from "./ReceivingFilter";
import { cloneDeep } from "lodash";
import { formatDate, formatRangeDate } from "../../util/formatter";
import { formatThousandSeparator } from "../../util/formatter";
import { PlusIcon } from "@heroicons/react/16/solid";

export default function ReceivingList() {
  const { setMenuOpen, filters, setFilters, lang, cookies, rowsPerPage, currency } = useContext(AppContext);
  const [listPadding, setListPadding] = useState("20px");
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState("");
  const [keywordItem, setKeywordItem] = useState("");
  const [purchaseorders, setPurchaseorders] = useState([POListModel]);
  const [receivings, setReceivings] = useState([RcvListModel]);
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
  const [rcvpolist, setRcvpolist] = useState([]);
  const [rcvById, setRcvById] = useState([POListModel]);
  const [poitemflag, setPoitemflag] = useState(true);
  const [posuppflag, setPosuppflag] = useState(true);
  const [polist, setPolist] = useState([]);

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
      setReceivings(data);
    }
  };

  const handleAddItem = () => {
    setPoitemflag(false);
  };

  const handleSupplier = () => {
    setPosuppflag(false);
  };

  const handleAdd = () => {
    setRcvpolist([]);
    setPoitemflag(true);
    setRcvById({
      rcv_po_id: "",
      rcv_total: 0,
      rcv_diskon: 0,
      rcv_kas_id: cookies.kas_id,
      rcv_lok_id: cookies.lok_id,
      rcv_catatan: "",
      rcv_status: "OPEN",
      rcv_id: 0,
      po_nomor: "",
      sup_nama: "",
    });
    setOpen(!open);
  };

  function handleOpen(item, index) {
    console.log(item);
    setRcvpolist(item.rcvitems);
    setRcvById(item);
    setPoitemflag(true);
    setOpen(!open);
  }

  function handlePay(item, index) {
    console.log(item);
    // setTransIndex(index);
    // setTransById(item);
    const init = async () => {
      const { data, error } = await payRcv({
        rcv_id: item.rcv_id,
      });
      setRefreshflag(!refreshflag);
    };
    init();
  }

  function setPO(item, index) {
    console.log(item);
    const _rcvById = cloneDeep(rcvById);
    _rcvById.po_nomor = item.nomor;
    _rcvById.rcv_po_id = item.po_id;
    _rcvById.sup_nama = item.sup_nama;
    item.poitems.map((_poitem) => {
      _poitem.satuan0hrg =
        _poitem.satuan0 == _poitem.satuan1
          ? _poitem.satuan1hrg
          : _poitem.satuan0 == _poitem.satuan2
          ? _poitem.satuan2hrg
          : _poitem.satuan3hrg;
      _poitem.satuan0hpp =
        _poitem.satuan0 == _poitem.satuan1
          ? _poitem.satuan1hpp
          : _poitem.satuan0 == _poitem.satuan2
          ? _poitem.satuan2hpp
          : _poitem.satuan3hpp;
    });
    setRcvpolist(item.poitems);
    setRcvById(_rcvById);
    setPoitemflag(true);
    // let foundItem = false;
    // const _rcvpolist = rcvpolist.map((_item) => {
    // 	let _item_temp=_item;
    // 	if (_item.itm_id === item.itm_id && _item.konvidx === item.konvidx) {
    // 		_item.qty=_item.qty+1;
    // 		_item.total = _item.qty * parseFloat(_item.satuan0hrg);
    // 		_item.po_id=rcvById.po_id;
    // 		foundItem = true;
    // 	}
    // 	return _item;
    // });
    // if (!foundItem) {
    // 	item.qty = 1;
    // 	item.po_id=rcvById.po_id;
    // 	item.total = parseFloat(item.satuan0hrg);
    // 	_rcvpolist.push(item);
    // }
    // setRcvpolist(_rcvpolist)
    // setPoitemflag(true)
  }

  const saveData = useCallback(async () => {
    console.log(rcvById);
    // console.log(rcvpolist)
    setLoading(true);
    let totalPrice = 0;
    rcvpolist.forEach((item) => {
      const price = item.satuan0hrg;
      totalPrice += item.qty * price;
    });
    const _rcvById = cloneDeep(rcvById);
    _rcvById.rcv_total = totalPrice;
    _rcvById.rows = rcvpolist;
    console.log(_rcvById);
    console.log(_rcvById);
    const { data, error } = await saveRcv(_rcvById);
    //setPayLoading(false);
    if (error) {
      alert(error.message);
    } else {
      setOpen(false);
      console.log(data);
      setLoading(false);
      setRefreshflag(!refreshflag);
    }
  }, [rcvById, rcvpolist]);

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
        const { data, error } = await getRcv({
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
        setReceivings([]);
        setLoading(true);
        setPage(1);
        const { data, error } = await getRcv({
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
      setPolist(data);
    }
  };

  useEffect(() => {
    if (keywordItem && keywordItem.length > 1) {
      const orderSearch = setTimeout(async () => {
        setPage(1);
        setLoading(true);
        const { data, error } = await getPo({
          lok_id: cookies.lok_id,
          q: keywordItem,
          page: 1,
          rows: rowsPerPage,
          loaditems: "yes",
        });
        handleResponseItem({ data, error });
        setLoading(false);
      }, TIME_SEARCH_DEBOUNCE);
      return () => {
        clearTimeout(orderSearch);
      };
    } else if (!keywordItem) {
      const init = async () => {
        setPurchaseorders([]);
        setLoading(true);
        setPageItem(1);
        const { data, error } = await getPo({
          lok_id: cookies.lok_id,
          page: 1,
          rows: rowsPerPage,
          loaditems: "yes",
        });
        handleResponseItem({ data, error });
        setLoading(false);
      };
      init();
    }
  }, [keywordItem, filters]);

  //in case of user scrolling
  useEffect(() => {
    if (receivings[0] && receivings[0].po_id && !filters[0]) {
      const init = async () => {
        const { data, error } = await getRcv({
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
      const _rcv = data;
      setReceivings([...receivings, ..._rcv]);
    }
  };

  useEffect(() => {
    if (polist[0] && polist[0].id && !filters[0]) {
      const init = async () => {
        const { data, error } = await getPo({
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
      const _po = data;
      setPolist([...polist, ..._po]);
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
                <SearchNavbar onSearch={handleFilter} value={keyword} label={dictionary.transaction.search[lang]} />
              </div>
              <IconButton size="md" variant="text" onClick={openDrawerRight}>
                <AdjustmentsVerticalIcon className="h-6 w-6 stroke-2" />
              </IconButton>
            </div>
            {!filters.length ? (
              <Typography variant="small" color="gray" className="absolute right-14 bottom-1 text-xs italic">
                Semua Transaksi
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
              {!receivings.length && !loading ? (
                <div className="mx-auto py-20">{dictionary.transaction.noItems[lang]}</div>
              ) : (
                <ReceivingScroll
                  rcv={receivings}
                  onOpen={handleOpen}
                  onPay={handlePay}
                  onLoad={() => setPage(page + 1)}
                  infinite={!keyword}
                  // onPrint={handlePrint}
                />
              )}
            </List>
            <div className="fixed bottom-4 right-4">
              <IconButton variant="filled" color="teal" className="rounded-full" size="lg" onClick={handleAdd}>
                <PlusIcon className="h-8 w-8 text-black-500" />
              </IconButton>
            </div>
          </div>
        </div>

        <Dialog open={open} handler={handleOpen} size="xxl">
          <DialogHeader className="border-b-2 block">
            <div className="w-full">{rcvById.po_nomor ? `RCV (${rcvById.po_nomor})` : "PO Kosong"}</div>
            <div className="w-full">{rcvById.sup_nama != "" ? `${rcvById.sup_nama}` : "Supplier Kosong"}</div>
          </DialogHeader>
          <DialogBody className="overflow-auto pb-10">
            {poitemflag ? (
              <div>
                <List className="divide-y divide-dashed divide-gray-400 h-[100dvh]">
                  {rcvpolist?.map((i, index) => {
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
                              {currency} {formatThousandSeparator(parseFLoat(i.satuan0hpp))}
                            </Typography>
                          </div>

                          <div className="w-[100%] flex flex-col gap-1 justify-center">
                            <Typography
                              color="gray"
                              className="w-max py-[2px] px-2 text-[15px] font-semibold bg-green-100 rounded-md "
                            >
                              {currency} {formatThousandSeparator(parseFloat(i.total))}
                            </Typography>
                          </div>
                        </div>
                      </ListItem>
                    );
                  })}
                </List>
                {rcvpolist.length == 0 ? (
                  <div className="fixed bottom-28 right-4">
                    <IconButton
                      variant="filled"
                      color="teal"
                      className="rounded-full"
                      size="lg"
                      onClick={handleAddItem}
                    >
                      <PlusIcon className="h-8 w-8 text-black-500" />
                    </IconButton>
                  </div>
                ) : null}
              </div>
            ) : (
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
                        label={dictionary.transaction.search[lang]}
                      />
                    </div>
                  </div>
                </Navbar>
                <List className="divide-y divide-dashed divide-gray-400">
                  <POScroll
                    po={polist}
                    setPO={setPO}
                    onLoad={() => setPageItem(pageItem + 1)}
                    infinite={!keyword}
                    // onPrint={handlePrint}
                  />
                </List>
              </div>
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
        <ReceivingFilter
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
