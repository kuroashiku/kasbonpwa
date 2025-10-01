import { Button, Dialog, DialogHeader, DialogBody, DialogFooter, List, IconButton, Navbar, Typography,
} from "@material-tailwind/react";
import { Fragment, useContext, useEffect, useRef, useState, useCallback } from "react";
import SearchNavbar from "../../lib/SearchNavbar";
import { AdjustmentsVerticalIcon, Bars3Icon, DocumentIcon, CubeIcon, PlusIcon, TrashIcon, PrinterIcon } from "@heroicons/react/24/outline";
import FilterChips from "../../lib/FilterChips";
import { AppContext } from "../../AppContext";
import { dictionary } from "../../constant/appDictionary";
import { getTransaction, deleteTransaction, getCredit, saveCredit } from "../../api/Transaction";
import { TransactionListModel, CreditListModel } from "../../model/transaction";
import LoadingOverlay from "../../lib/LoadingOverlay";
import TransactionScroll from "./TransactionScroll";
import { TIME_SEARCH_DEBOUNCE } from "../../constant/appCommon";
import TransactionFilter from "./TransactionFilter";
import { cloneDeep } from "lodash";
import { formatDate, formatRangeDate, formatThousandSeparator } from "../../util/formatter";
import InputMoney from "../../lib/InputMoney";
import POSSuccess from "../pos/POSSuccess";
import POSSuccessSplitBill from "../pos/POSSuccessSplitBill";
import { FilterItemModel } from "../../model/filter";
import { BuildingLibraryIcon } from "@heroicons/react/24/solid";

export default function Transaction() {
  const { setMenuOpen, filters, setFilters, lang, cookies, rowsPerPage, currency, setItemsCheckout,
    setNotaItemsCheckout, setMoney, setTotalPay, setNotaItemsCheckoutSplitBill} = useContext(AppContext);
  const [listPadding, setListPadding] = useState("20px");
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState("");
  const [transactions, setTransactions] = useState([TransactionListModel]);
  const [credits, setCredits] = useState([CreditListModel]);
  const [openFilter, setOpenFilter] = useState(false);
  const [newOpen, setNewOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [transById, setTransById] = useState({});
  const [transIndex, setTransIndex] = useState(-1);
  const navbarRef = useRef();
  const [calendar, setCalendar] = useState(false);
  const calendarRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [bunga, setBunga] = useState(0); 
  const [cicil, setCicil] = useState(0);
  const [success, setSuccess] = useState(false);
  const [successJoin, setSuccessJoin] = useState(false);
  const [refreshflag, setRefreshflag] = useState(false);
  const [totalnota, setTotalnota] = useState(0);
  const [totalitem, setTotalitem] = useState(0);
  const [totalnominal, setTotalnominal] = useState(0);
  const [transCheckId, setTransCheckId] = useState([]);
  const [transCheckNmr, setTransCheckNmr] = useState([]);
  //const [payLoading, setPayLoading] = useState(false);

  useEffect(() => {
    const _dateFilter = filters.find((f) => f.key === "date");
    
    let filterProps1 = {};
    let filterProps2 = {};
    let filterProps3 = {};
    
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
    let _newfilter = filters.filter(function (object) {
      return object.key === "category";
    });
    _newfilter.forEach((_item, index) => {
      console.log(_item)
      if(_item.value=="Cicilan lunas")
        filterProps.cicilanlunas = "cicilanlunas";
      if(_item.value=="Cicilan belum lunas")
        filterProps.cicilanbelumlunas = "cicilanbelumlunas";
      if(_item.value=="Tidak pernah mencicil"){

        filterProps.tidakpernahmencicil = "tidakpernahmencicil";
      }
    });
    
    if (keyword && keyword.length > 1) {
      const orderSearch = setTimeout(async () => {
        setTransactions([]);
        setPage(1);
        setLoading(true);
        const { data, error } = await getTransaction({
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
        setTransactions([]);
        setLoading(true);
        setPage(1);
        const { data, error } = await getTransaction({
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

  const initData = useCallback(() => {
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
    let _newfilter = filters.filter(function (object) {
      return object.key === "category";
    });
    _newfilter.forEach((_item, index) => {
      if(_item.value=="Cicilan lunas")
        filterProps.cicilanlunas = "cicilanlunas";
      if(_item.value=="Cicilan belum lunas")
        filterProps.cicilanbelumlunas = "cicilanbelumlunas";
      if(_item.value=="Tidak pernah mencicil")
        filterProps.tidakpernahmencicil = "tidakpernahmencicil";
    });
    if (keyword && keyword.length > 0) {
      const orderSearch = setTimeout(async () => {
        // setPage(1);
        setLoading(true);
        const { data, error } = await getTransaction({
          lok_id: cookies.lok_id,
          q: keyword,
          page: 1,
          rows: rowsPerPage,
          loaditems: "yes",
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
        if (page <= 1){
          // if (localStorage.getItem("transaksi_1")) {
          //   const _transactions=JSON.parse(localStorage.getItem("transaksi_1")).value;
          //   setTransactions(_transactions);
          //   let titem = 0;
          //   let ttotal = 0;
          //   _transactions?.map((i, index) => {
          //     i.notaitems.map((ii, indexi) => {
          //       if (cookies.lok_type != "laundry") {
          //         titem = titem + parseFloat(ii.qty);
          //         ttotal = ttotal + parseFloat(ii.total);
          //       }
          //       if (cookies.lok_type == "laundry") {
          //         ii.service_level_satuan0 = ii.service_level_satuan0?JSON.parse(ii.nit_service_level_satuan0):[];
          //         ii.service_level_satuan0.map((iii, indexii) => {
          //           titem = titem + parseFloat(iii.service_qty);
          //           ttotal = ttotal + parseFloat(iii.service_total);
          //         });
          //       }
          //     });
          //   });
            
          //   setTotalnota(_transactions.length);
          //   setTotalitem(titem);
          //   setTotalnominal(ttotal);
          // }
          //else{
            const { data, error } = await getTransaction({
              lok_id: cookies.lok_id,
              page: 1,
              rows: rowsPerPage,
              loaditems: "yes",
              ...filterProps,
            });
            if(!error)
              //alert('Transaksi ke-1 keatas belum sempat tersimpan di lokal')
            //else
            handleResponse({ data, error });
          //}
        }
        else{
          // if (localStorage.getItem("transaksi_"+page)) {
          //   const _transactions=JSON.parse(localStorage.getItem("transaksi_"+page)).value;
          //   setTransactions([...transactions, ..._transactions]);
          // }
          // else{
            const { data, error } = await getTransaction({
              lok_id: cookies.lok_id,
              page: page,
              rows: rowsPerPage,
              loaditems: "yes",
              ...filterProps,
            });
            if(!error)
              //alert('Transaksi ke-'+(page*20)+' keatas belum sempat tersimpan di lokal')
            //else
            handleAppendResponse({ data, error });
          // }
        }
        setLoading(false);
      };
      init();
    }
  }, [keyword, filters, page]);
  useEffect(() => {
    setTransactions([]);
    setPage(1);
    initData();
  }, [keyword, filters]);

  useEffect(() => {
    if (page > 1) initData();
    else{
      const _filters = cloneDeep(filters);
      let __filter = _filters.filter(function (object) {
        return object.key === "date";
      });
      setFilters(__filter)
    }
  }, [page]);
  
  const handleResponse = ({ data, error }) => {
    if (error) {
      alert(dictionary.universal.erroroccured[lang]);
    } else {
      setPage(1)
      
      let titem = 0;
      let ttotal = 0;
      data.map((i, index) => {
        i.notaitems.map((ii, indexi) => {
          if (cookies.lok_type != "laundry") {
            titem = titem + parseFloat(ii.qty);
            ttotal = ttotal + parseFloat(ii.total);
          }
          if (cookies.lok_type == "laundry") {
            ii.service_level_satuan0 = ii.service_level_satuan0?JSON.parse(ii.nit_service_level_satuan0):[];
            ii.service_level_satuan0.map((iii, indexii) => {
              titem = titem + parseFloat(iii.service_qty);
              ttotal = ttotal + parseFloat(iii.service_total);
            });
          }
        });
      });
      console.log(data)
      console.log(cookies.lok_type)
      setTransactions(data);
      setTotalnota(data.length);
      setTotalitem(titem);
      setTotalnominal(ttotal);
      // localStorage.setItem(
      //   "transaksi_1",
      //   JSON.stringify({
      //     key: "transaksi",
      //     value: data,
      //   })
      // );
    }
  };

  const handleAppendResponse = ({ data, error }) => {
    if (error) {
      alert(dictionary.universal.erroroccured[lang]);
    } else {
      const _transactions = data;
      setTransactions([...transactions, ..._transactions]);
      // localStorage.setItem(
      //   "transaksi_"+page,
      //   JSON.stringify({
      //     key: "transaksi",
      //     value: data,
      //   })
      // );
    }
  };
  
  // const handleResponse = ({ data, error }) => {
  //   if (error) {
  //     alert(dictionary.universal.erroroccured[lang]);
  //   } else {
  //     let tnota = 0;
  //     let titem = 0;
  //     let ttotal = 0;
  //     data.map((i, index) => {
  //       i.notaitems.map((ii, indexi) => {
  //         if (cookies.lok_type != "laundry") {
  //           titem = titem + parseFloat(ii.qty);
  //           ttotal = ttotal + parseFloat(ii.total);
  //         }
  //         if (cookies.lok_type == "laundry") {
  //           ii.service_level_satuan0 = ii.service_level_satuan0?JSON.parse(ii.nit_service_level_satuan0):[];
  //           ii.service_level_satuan0.map((iii, indexii) => {
  //             titem = titem + parseFloat(iii.service_qty);
  //             ttotal = ttotal + parseFloat(iii.service_total);
  //           });
  //         }
  //       });
  //     });
  //     setTransactions(data);
  //     setTotalnota(data.length);
  //     setTotalitem(titem);
  //     setTotalnominal(ttotal);
  //   }
  // };

  // const handleAppendResponse = ({ data, error }) => {
  //   if (error) {
  //     alert(dictionary.universal.erroroccured[lang]);
  //   } else {
  //     const _transactions = data;
  //     setTransactions([...transactions, ..._transactions]);
  //   }
  // };

  const handleFilter = (searchKey) => {
    setKeyword(searchKey);
  };

  const openDrawerRight = () => setOpenFilter(true);
  // const closeDrawerRight = () => setOpenFilter(false);

  function handleOpen(item, index) {
    setTransIndex(index);
    setTransById(item);
    const init = async () => {
      setCredits([]);
      const { data, error } = await getCredit({
        not_id: item.not_id,
        lok_id: cookies.lok_id,
      });
      if (data.length > 0) {
        data[0].cil_cicilan = 0;
        data[0].cil_tagihan = data[0].cil_sisa;
        data[0].cil_kekurangan = data[0].cil_sisa;
        data[0].cil_bunga = 0;
        // data[0].cil_tagihan=data[0].cil_tagihan-data[0].cil_cicilan;
        // data[0].cil_kekurangan=0;
        setCredits(data[0]);
      } else {
        setCredits({
          cil_kekurangan: Math.abs(item.kembalian),
          cil_bunga: 0,
          cil_tagihan: Math.abs(item.kembalian),
          cil_cicilan: 0,
          cil_sisa: 0,
          cil_carabayar: "KAS",
        });
      }
      cookies.role_update.length == 0 && cookies.role_dst.length == 0
        ? setOpen(!open)
        : cookies.role_dst.findIndex((a) => a == "ALL") >= 0
        ? setOpen(!open)
        : cookies.role_update.findIndex((a) => a == "TRANS") >= 0
        ? setOpen(!open)
        : setOpen(false);
    };
    init();
  }

  const saveData = useCallback(async () => {
    ///setPayLoading(true);
    credits.cil_id = -1;
    credits.cil_not_id = transById.not_id;
    credits.cil_carabayar = "KAS";
    const { data, error } = await saveCredit(credits);
    //setPayLoading(false);
    if (error) {
      alert(dictionary.cashier.calculator.failed[lang]);
    } else {
      setOpen(false);
      const _transactions = cloneDeep(transactions);
      if (parseInt(data[0].cil_sisa) == 0) {
        _transactions[transIndex].piutlunas = 1;
        setTransactions(_transactions);
        
        
      }
      setRefreshflag(!refreshflag);
    }
  }, [transById, credits,refreshflag]);

  const handleChange = (evt, id) => {
    setCredits({
      ...credits,
      [id]: evt.target.value,
    });
    if (id == "cil_bunga") setBunga(evt.target.value);
    if (id == "cil_cicilan") setCicil(evt.target.value);
  };

  useEffect(() => {
    const newcredits = cloneDeep(credits);
    newcredits.cil_tagihan = newcredits.cil_kekurangan * (1 + parseInt(newcredits.cil_bunga) / 100);
    newcredits.cil_sisa =
      parseFloat(newcredits.cil_tagihan) - parseFloat(cicil) < 0
        ? 0
        : parseFloat(parseFloat(newcredits.cil_tagihan) - parseFloat(cicil));
    setCredits(newcredits);
  }, [BuildingLibraryIcon]);

  useEffect(() => {
    const newcredits = cloneDeep(credits);
    newcredits.cil_sisa =
      parseFloat(newcredits.cil_tagihan) - parseFloat(cicil) < 0
        ? 0
        : parseFloat(parseFloat(newcredits.cil_tagihan) - parseFloat(cicil));
    setCredits(newcredits);
  }, [cicil]);

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

  

  //in case of user scrolling
  useEffect(() => {
    if (transactions[0] && transactions[0].id && !filters[0]) {
      const init = async () => {
        const { data, error } = await getTransaction({
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

  

  function handleNewOpen(item) {
    if(transCheckNmr.length>1){
      let str=transCheckNmr.join(", ");
      item.nomor=str;
    }
    setTransById(item);
    cookies.role_delete.length == 0 && cookies.role_dst.length == 0
      ? setNewOpen(!newOpen)
      : cookies.role_dst.findIndex((a) => a == "ALL") >= 0
      ? setNewOpen(!newOpen)
      : cookies.role_delete.findIndex((a) => a == "TRANS") >= 0
      ? setNewOpen(!newOpen)
      : setNewOpen(false);
  }

  function handlePrint(item) {
    localStorage.setItem("checkout-prev", "/transaction");
    setSuccess(true);
    setItemsCheckout([]);
    item.dibayar = parseFloat(item.dibayar);
    item.total = parseFloat(item.total);
    item.notaitems.map((ii, indexi) => {
      ii.satuan0hrg = parseFloat(ii.satuan0hrg);
      ii.total = parseFloat(ii.total);
    });
    setNotaItemsCheckout(item);
    setTotalPay(0);
    setMoney(0);
  }
function handlePrintSplitBill(item) {
    localStorage.setItem("checkout-prev", "/transaction");
    setSuccess(true);
    setItemsCheckout([]);
    item.dibayar = parseFloat(item.dibayar);
    item.total = parseFloat(item.total);
    item.notaitems.map((ii, indexi) => {
      ii.satuan0hrg = parseFloat(ii.satuan0hrg);
      ii.total = parseFloat(ii.total);
    });
    setNotaItemsCheckout(item);
    setTotalPay(0);
    setMoney(0);
  }
  const handleDelete = useCallback(async () => {
    if(transCheckId.length>1){
      let tasks = [];
      let k=0;
      for (let i = 0; i < transCheckId.length; i++) {
        const delay = 1500 * i;
        tasks.push(new Promise(async function(resolve) {
          await new Promise(res => setTimeout(res, delay));
          let result = await new Promise(r => {
            deleteTransaction({kas_id:cookies.kas_id, not_id:transCheckId[k]});
            r(delay);
          });
          resolve(result);
          k++
        }));
      }
      Promise.all(tasks).then(results => {
        setTransCheckId([])
        setTransCheckNmr([])
        setRefreshflag(!refreshflag);
        setNewOpen(false);
      });
    }
    else{
      const { data, error } = await deleteTransaction({
        not_id: transById.id,
        log_reason: "",
        kas_id: cookies.kas_id,
      });
      if (error) {
        alert(dictionary.universal.notfound[lang]);
      } else {
        setLoading(true);
        setNewOpen(false);
        setRefreshflag(!refreshflag);
        setLoading(false);
      }
    }
  }, [transById,transCheckId]);

  const handleCheckChange = useCallback(
    (item) => {
      const oldArray = [...transCheckId];
      const indexOfId = oldArray.indexOf(item.id);
      const oldArrayNmr = [...transCheckNmr];
      const indexOfIdNmr = oldArrayNmr.indexOf(item.nomor);
      if (indexOfId >= 0) {
        oldArray.splice(indexOfId, 1);
        setTransCheckId(oldArray);
        oldArrayNmr.splice(indexOfNmr, 1);
        setTransCheckNmr(oldArrayNmr);
      } else {
        setTransCheckId([...oldArray, item.id]);
        setTransCheckNmr([...oldArrayNmr, item.nomor]);
      }
    },[transCheckId, transCheckNmr]
  );

  if (success) {
    return <POSSuccess exit={() => setSuccess(false)} />;
  }
  if (successJoin) {
    return <POSSuccessSplitBill exit={() => setSuccessJoin(false)} />;
  }

  return (
    <Fragment>
      {!loading ? null : <LoadingOverlay white />}
      <div className="h-screen-adapt bg-gray-50 overflow-hidden">
        <div className="top-0 inset-x-0 fixed bg-gradient-to-b from-gray-50 h-20" />
        <div className="p-2 top-0 inset-x-0 fixed z-10 mx-auto desktop:max-w-[60%]">
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
                <SearchNavbar onSearch={handleFilter} value={keyword} label={dictionary.search.transaction[lang]} />
              </div>
              <IconButton size="md" variant="text" onClick={openDrawerRight}>
                <div className="justify-items-center lowercase">
                  <AdjustmentsVerticalIcon className="h-6 w-6 stroke-2" />
                  <div style={{fontSize:"10px",padding:"0px"}}>
                    Filter
                  </div>
                </div>
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
              {!transactions.length && !loading ? (
                <div className="mx-auto py-20">{dictionary.transaction.noItems[lang]}</div>
              ) : (
                <>
                  <div className="head-content flex gap-3 items-center mb-4 w-[97%] mx-auto">
                    <div className="nota flex gap-[2px] items-center">
                      <DocumentIcon className="w-6 h-6" />
                      <span className="text-sm font-semibold bg-[#d8bfd8] px-2 rounded-tr-lg rounded-br-lg">{totalnota}</span>
                    </div>
                    <div className="item flex gap-[2px] items-center">
                      <CubeIcon className="w-6 h-6" />
                      <span className="text-sm font-semibold bg-[#b0e0e6] px-2 rounded-tr-lg rounded-br-lg">{totalitem}</span>
                    </div>
                    <div className="nominal flex gap-1 items-center">
                      <span className="text-sm font-semibold bg-[#ffd700] px-2 rounded-lg">
                        Rp {formatThousandSeparator(totalnominal)}
                      </span>
                    </div>
                  </div>

                  <TransactionScroll
                    transactions={transactions}
                    onRemove={handleNewOpen}
                    onOpen={handleOpen}
                    onLoad={() => setPage(page + 1)}
                    infinite={!keyword}
                    onPrint={handlePrint}
                    checkedIds={transCheckId}
                    onCheck={handleCheckChange}
                  />
                </>
              )}
            </List>
          </div>
        </div>

        <Dialog open={open} handler={handleOpen} size="xxl">
          <DialogHeader className="border-b-2">{dictionary.transaction.sidebar[lang]}</DialogHeader>
          <DialogBody className="overflow-auto pb-10">
            <div className="mb-4">
              <InputMoney
                currency={currency}
                disabled={true}
                label={dictionary.dialog.transaction.bill[lang]}
                onChange={(evt) => handleChange(evt, "cil_tagihan")}
                value={credits.cil_tagihan}
              />
            </div>
            <div className="mb-4">
              <InputMoney
                currency={currency}
                disabled={true}
                label={dictionary.dialog.transaction.remainingcost[lang]}
                onChange={(evt)=>handleChange(evt, "cil_sisa")}
                value={parseFloat(credits.cil_sisa)}
              />
            </div>
            <div className="mb-4">
              <InputMoney
                currency={currency}
                //disabled={readonly}
                label={dictionary.dialog.transaction.installment[lang]}
                onChange={(evt) => handleChange(evt, "cil_cicilan")}
                value={credits.cil_cicilan}
              />
            </div>
            <div className="mb-4">
              <InputMoney
                //disabled={readonly}
                label={dictionary.dialog.transaction.interest[lang]}
                onChange={(evt) => handleChange(evt, "cil_bunga")}
                value={credits.cil_bunga}
                icon="%"
                max={100}
              />
            </div>
          </DialogBody>
          <DialogFooter className="border-t-2">
            <Button variant="gradient" color="red" onClick={() => setOpen(false)} className="mr-1">
              <span>{dictionary.universal.back[lang]}</span>
            </Button>
            <Button className="block" variant="gradient" color="green" onClick={saveData}>
              <span>{dictionary.universal.confirm[lang]}</span>
            </Button>
          </DialogFooter>
        </Dialog>

        <Dialog open={newOpen} handler={handleNewOpen}>
          <DialogBody>
            <div className="text-center my-6">
              {dictionary.transaction.sidebar[lang]} {dictionary.universal.withnumber[lang]}<span className="font-semibold">{transById.nomor}</span> {dictionary.universal.deleteMessage[lang]}
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
        <div className="fixed bottom-20 right-4">
          <IconButton 
            variant="filled" 
            color={transCheckId.length > 0 ? "teal" : "blue-gray"} 
            className={
              transCheckId.length > 0 ? "rounded-full pointer-events-auto" : "rounded-full pointer-events-none"
            } 
            size="lg" 
            onClick={() => handleAdd()}>
            <PrinterIcon className="h-8 w-8 text-black-500" />
          </IconButton>
        </div>
        <div className="fixed bottom-4 right-4">
          <IconButton
            variant="filled"
            color={transCheckId.length > 0 ? "red" : "blue-gray"}
            className={
              transCheckId.length > 0 ? "rounded-full pointer-events-auto" : "rounded-full pointer-events-none"
            }
            size="lg"
            onClick={handleNewOpen}
          >
            <TrashIcon className="h-8 w-8 text-black-500" />
          </IconButton>
        </div>
        <TransactionFilter
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
