import { Fragment, useCallback, useContext, useEffect, useRef, useState } from "react";
import { getAddbudget, saveAddbudget, deleteAddbudget } from "../../api/AddBudget";
import { AppContext } from "../../AppContext";
import {
  Button,
  Card,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  IconButton,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Navbar,
  Spinner,
  Switch,
  Select,
  Option,
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
  Typography,
} from "@material-tailwind/react";
import SearchNavbar from "../../lib/SearchNavbar";
import { AdjustmentsVerticalIcon, Bars3Icon, PlusCircleIcon } from "@heroicons/react/24/outline";
import FilterChips from "../../lib/FilterChips";
import { AddbudgetListModel } from "../../model/addbudget";
import { dictionary } from "../../constant/appDictionary";
import { formatSentenceCase } from "../../util/formatter";
import { useNavigate } from "react-router-dom";
import LoadingOverlay from "../../lib/LoadingOverlay";
import { topic } from "../../constant/appTopics";
import { TIME_SEARCH_DEBOUNCE } from "../../constant/appCommon";
import InputSimple from "../../lib/InputSimple";
import InputNumber from "../../lib/InputNumber";
import { PencilSquareIcon } from "@heroicons/react/16/solid";
import { formatDate, formatRangeDate, formatThousandSeparator } from "../../util/formatter";
import { DayPicker } from 'react-day-picker';
import { format } from "date-fns";
import { cloneDeep } from "lodash";
export default function AddBudget() {
  const { setMenuOpen, filters, currency, setFilters, lang, dataLogin, cookies } = useContext(AppContext);
  const [listPadding, setListPadding] = useState("20px");
  const [loading, setLoading] = useState(true);
  const [filterOpen, setFilterOpen] = useState(false);
  const [addbudgetsIncome, setAddbudgetsIncome] = useState([AddbudgetListModel()]);
  const [addbudgetsOutcome, setAddbudgetsOutcome] = useState([AddbudgetListModel()]);
  const [itemDisplay, setItemDisplay] = useState(AddbudgetListModel());
  const navbarRef = useRef();
  const [open, setOpen] = useState(false);
  const [newOpen, setNewOpen] = useState(false);
  const [openDate, setOpenDate] = useState(false);
  const [readonly, setReadonly] = useState(false);
  const [isIncomeOutcome, setIsIncomeOutcome] = useState(false);
  const [itmindex, setitmindex] = useState(-1);
  const [addbudgetById, setAddbudgetById] = useState({});
  const [addBudgetId, setaddBudgetId] = useState(-1);
  const [txtTitle, settxtTitle] = useState("");
  const [mode, setMode] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [currentTab, setCurrentTab] = useState("peritem");
  const [month, setMonth] = useState(0);
  const [year, setYear] = useState(0);
  const [date, setDate] = useState("");
  const [dateName, setDateName] = useState("");
  const navigate = useNavigate();
  const [dateFilter, setDateFilter] = useState(null);
  const [kategoriIncome, setKategoriIncome] = useState([]);
  const [kategoriOutcome, setKategoriOutcome] = useState([]);
  const [incomeSelect, setIncomeSelect] = useState("");
  const [outcomeSelect, setOutcomeSelect] = useState("");
  const [modeIon, setModeIon] = useState("outcome");
  const handleFilter = (searchKey) => {
    setKeyword(searchKey);
  };
  const handleOutcome = (value) => {
    let addbudget=cloneDeep(addbudgetById)
    addbudget.bel_kategori=value;
    addbudget.bel_type='outcome';
    setAddbudgetById(addbudget);
    setModeIon('outcome');
    // const diskonVal = value;
  };
  const handleIncome = (value) => {
    let addbudget=cloneDeep(addbudgetById)
    addbudget.bel_kategori=value;
    addbudget.bel_type='income';
    setAddbudgetById(addbudget);
    setModeIon('income');
    // const diskonVal = value;
  };
  function newFormatDate(date) {
		let datePart = [date.getFullYear(), date.getMonth() + 1, date.getDate()]
			.map((n, i) => n.toString().padStart(i === 0 ? 4 : 2, "0"))
			.join("-");
		return datePart;
	}

  const onDateChange = useCallback(
      (date = new Date()) => {
        let addbudget=cloneDeep(addbudgetById)
        addbudget.bel_tanggal=newFormatDate(date);
        setDateName(formatDate(date))
        const newFilter = [];
        newFilter.key = "date";
        newFilter.value = date;
        setAddbudgetById(addbudget);
        setDateFilter(newFilter);
        setOpenDate(false);
      },
      [addbudgetById]
      //piutangDate, modePiutang
    );
  
  function handleOpen(item, setedit, index) {
    setitmindex(index);
    setMode(setedit);

    if (setedit == 1) {
      setReadonly(true);
      setAddbudgetById(item);
      settxtTitle("Detail Budget");
      setOpen(!open);
    } else if (setedit == 2) {
      setReadonly(false);
      setAddbudgetById(item);
      settxtTitle("Edit Budget");
      cookies.role_update.length == 0 && cookies.role_dst.length == 0
        ? setOpen(!open)
        : cookies.role_dst.findIndex((a) => a == "ALL") >= 0
        ? setOpen(!open)
        : cookies.role_update.findIndex((a) => a == "DIS") >= 0
        ? setOpen(!open)
        : setOpen(false);
    } else if (setedit == 3) {
      setAddbudgetById({ bel_lok_id: cookies.lok_id, bel_id: 0, bel_tanggal:newFormatDate(date) });
      setReadonly(false);
      settxtTitle(dictionary.universal.add[lang]+" Budget");
      cookies.role_create.length == 0 && cookies.role_dst.length == 0
        ? setOpen(!open)
        : cookies.role_dst.findIndex((a) => a == "ALL") >= 0
        ? setOpen(!open)
        : cookies.role_create.findIndex((a) => a == "DIS") >= 0
        ? setOpen(!open)
        : setOpen(false);
    } else if (setedit == 4) {
      setReadonly(true);
      setAddbudgetById(item);
      settxtTitle("Detail "+dictionary.universal.globalbudget[lang]);
      setOpen(!open);
    } else if (setedit == 5) {
      setReadonly(false);
      setAddbudgetById(item);
      settxtTitle("Edit "+dictionary.universal.globalbudget[lang]);
      cookies.role_update.length == 0 && cookies.role_dst.length == 0
        ? setOpen(!open)
        : cookies.role_dst.findIndex((a) => a == "ALL") >= 0
        ? setOpen(!open)
        : cookies.role_update.findIndex((a) => a == "DIS") >= 0
        ? setOpen(!open)
        : setOpen(false);
    } else if (setedit == 6) {
      setAddbudgetById({ bel_lok_id: cookies.lok_id, bel_id: -1, bel_deskripsi: "", bel_jumlah: 0,bel_type: "outcome",bel_kategori: "Tidak diketahui" });
      setReadonly(false);
      settxtTitle(dictionary.universal.add[lang]+" "+dictionary.universal.globalbudget[lang]);
      cookies.role_create.length == 0 && cookies.role_dst.length == 0
        ? setOpen(!open)
        : cookies.role_dst.findIndex((a) => a == "ALL") >= 0
        ? setOpen(!open)
        : cookies.role_create.findIndex((a) => a == "DIS") >= 0
        ? setOpen(!open)
        : setOpen(false);
    }
  }

  function handleNewOpen(id) {
    cookies.role_delete.length == 0 && cookies.role_dst.length == 0
      ? setNewOpen(!newOpen)
      : cookies.role_dst.findIndex((a) => a == "ALL") >= 0
      ? setNewOpen(!newOpen)
      : cookies.role_delete.findIndex((a) => a == "DIS") >= 0
      ? setNewOpen(!newOpen)
      : setOpen(false);
    setaddBudgetId(id);
  }

  const handleChange = (evt, id) => {
    setAddbudgetById({
      ...addbudgetById,
      [id]: evt.target.value,
    });
  };

  const handleDelete = useCallback(async () => {
    setItemDisplay(null);
    const { data, error } = await deleteAddbudget({ bel_id: addBudgetId });
    if (error) {
      alert(dictionary.universal.notfound[lang]);
    } else {
      setLoading(true);
      setAddbudgetsIncome([]);
      setaddBudgetId(-1);
      const { data, error } = await getAddbudget({ lok_id: cookies.lok_id });
      if (error) {
        alert(dictionary.universal.notfound[lang]);
      } else {
        setAddbudgetsIncome(data);
        setNewOpen(false);
        setOpen(false);
      }
      setLoading(false);
    }
  }, [addBudgetId]);

  const saveData = useCallback(async () => {
    setItemDisplay(null);
    isIncomeOutcome?(addbudgetById.bel_type="income"):(addbudgetById.bel_type="outcome")
    addbudgetById.bel_kategori=null;
    const { data, error } = await saveAddbudget(addbudgetById);
    if (error) {
      alert(dictionary.universal.notfound[lang]);
    } else {
      setLoading(true);
      setOpen(false);
      setAddbudgetsIncome([]);
      const { data, error } = await getAddbudget({ lok_id: cookies.lok_id, thn: year, bln:month });
      if (error) {
        alert(dictionary.universal.notfound[lang]);
      } else {
        let _income = data.filter(function (object) {
          return object.bel_type === "income";
        });
        let _outcome = data.filter(function (object) {
          return object.bel_type === "outcome";
        });
        setAddbudgetsIncome(_income);
        setAddbudgetsOutcome(_outcome);
      }
      setLoading(false);
    }
  }, [addbudgetById,year,month]);

  useEffect(() => {
    if (!cookies.lok_id) {
      navigate(topic.login.route);
    }
    if(year!=0){
      const handleResponse = ({ data, error }) => {
        if (error) {
          alert(dictionary.universal.notfound[lang]);
        } else {
          let _income = data.filter(function (object) {
            return object.bel_type === "income";
          });
          let _outcome = data.filter(function (object) {
            return object.bel_type === "outcome";
          });
          setAddbudgetsIncome(_income);
          setAddbudgetsOutcome(_outcome);
        }
      };
      const init = async () => {
        if (keyword && keyword.length > 1) {
          const orderSearch = setTimeout(async () => {
            setLoading(true);
            const { data, error } = await getAddbudget({ lok_id: cookies.lok_id, key_val: keyword, thn: year, bln:month });
            handleResponse({ data, error });
            setLoading(false);
          }, TIME_SEARCH_DEBOUNCE);
          return () => {
            clearTimeout(orderSearch);
          };
        } else if (!keyword) {
          setLoading(true);
          setAddbudgetsIncome([]);
          setAddbudgetsIncome([]);
          const { data, error } = await getAddbudget({ lok_id: cookies.lok_id, thn: year, bln:month });
          handleResponse({ data, error });
          setLoading(false);
        }
      };
      init();
    }
  }, [keyword, year, month]);

  useEffect(() => {
    const tanggal = new Date();
    let bulan = tanggal.getMonth();
    let year = tanggal.getFullYear();
    setMonth(bulan+1);
    setYear(year);
    setDate(tanggal);
    setDateName(formatDate(tanggal));
    let _incomeoutcome=cloneDeep(cookies.income_outcome);
    if(_incomeoutcome){
      let str=JSON.stringify(_incomeoutcome);
      let arrstr=JSON.parse(str)
      let _income = arrstr.filter(function (object) {
        return object.ion_type === "income";
      });
      let _outcome = arrstr.filter(function (object) {
        return object.ion_type === "outcome";
      });
      setKategoriIncome(_income);
      setKategoriOutcome(_outcome);
    }
    else{
      setKategoriIncome([]);
      setKategoriOutcome([]);
    }
    
  }, []);
  
  useEffect(() => {
    if (navbarRef.current) {
      setListPadding(`${navbarRef.current.offsetHeight + 20}px`);
    }
  }, [addbudgetsIncome, addbudgetsOutcome , navbarRef]);
  return (
    <Fragment>
      {!loading ? null : <LoadingOverlay white />}
      <div className="h-screen-adapt bg-gray-50 overflow-hidden relative">
        <div className="p-2 top-0 inset-x-0 fixed z-50 mx-auto desktop:max-w-[60%]">
          <Navbar ref={navbarRef} className={`pt-2 px-2 py-2 relative`} blurred={false}>
            <div className="flex gap-3 items-center">
              <IconButton variant="text" size="md" onClick={() => setMenuOpen(true)}>
                <div className="justify-items-center lowercase">
                  <Bars3Icon className="h-6 w-6 stroke-2" />
                  <div style={{fontSize:"10px",padding:"0px"}}>
                    Menu
                  </div>
                </div>
              </IconButton>
              <div className="text-base font-semibold text-[#606060]">Budget</div>
            </div>
          </Navbar>
        </div>

        <Tabs id="custom-animation" value="outcome" className="px-2" style={{ paddingTop: listPadding }}>
          <TabsHeader>
            {/* {data.map(({ label, value }) => (
                    <Tab key={value} value={value}>
                        {label}
                    </Tab>
                    ))} */}
            <Tab key={1} value="outcome">
              Outcome
            </Tab>
            <Tab key={2} value="income">
              Income
            </Tab>
          </TabsHeader>
          <TabsBody
            animate={{
              initial: { y: 250 },
              mount: { y: 0 },
              unmount: { y: 250 },
            }}
          >
            <TabPanel key={1} value="outcome" className="p-0 min-h-screen">
              <List className="divide-y divide-dashed divide-gray-400">
                {addbudgetsOutcome?.map((i, index) => {
                  return (
                    <ListItem key={index} className="">
                      <div className="w-full pr-2" onClick={() => handleOpen(i, 1, index)}>
                        <div></div>
                        <div className="flex items-center justify-between">
                          <Typography variant="small" color="gray" className="font-normal">
                            <b>{formatDate(i.bel_tanggal)}</b>
                          </Typography>
                          <div className="w-1/2">

                          <Typography variant="small" color="gray" className="font-normal">
                            <b>{formatSentenceCase(i.bel_deskripsi)}</b>
                          </Typography>
                          </div>
                          <Typography color="gray" className="font-normal">
                            {`${formatThousandSeparator(parseFloat(i.bel_jumlah))}`}
                          </Typography>
                        </div>
                      </div>
                      <ListItemSuffix>
                        <IconButton variant="text" color="blue-gray" onClick={() => handleOpen(i, 2, index)}>
                          <PencilSquareIcon className="h-6 w-6 text-black-500" />
                        </IconButton>
                      </ListItemSuffix>
                    </ListItem>
                  );
                })}
              </List>
              <div className="fixed bottom-4 right-4">
                <IconButton
                  variant="filled"
                  color="teal"
                  className="rounded-full"
                  size="lg"
                  onClick={() => handleOpen({}, 3, -1)}
                >
                  <PlusCircleIcon className="h-8 w-8 text-black-500" />
                </IconButton>
              </div>
            </TabPanel>
            <TabPanel key={2} value="income" className="p-0 min-h-screen">
              <List className="divide-y divide-dashed divide-gray-400">
                {addbudgetsIncome?.map((i, index) => {
                  return (
                    <ListItem key={index} className="">
                      <div className="w-full pr-2" onClick={() => handleOpen(i, 4, index)}>
                        <div className="flex items-center justify-between">
                          <Typography variant="small" color="gray" className="font-normal">
                            <b>{formatDate(i.bel_tanggal)}</b>
                          </Typography>
                          <div className="w-1/2">

                          <Typography variant="small" color="gray" className="font-normal">
                            <b>{formatSentenceCase(i.bel_deskripsi)}</b>
                          </Typography>
                          </div>
                          <Typography color="gray" className="font-normal">
                            {`${formatThousandSeparator(parseFloat(i.bel_jumlah))}`}
                          </Typography>
                        </div>
                      </div>
                      <ListItemSuffix>
                        <IconButton variant="text" color="blue-gray" onClick={() => handleOpen(i, 5, index)}>
                          <PencilSquareIcon className="h-6 w-6 text-black-500" />
                        </IconButton>
                      </ListItemSuffix>
                    </ListItem>
                  );
                })}
              </List>
              <div className="fixed bottom-4 right-4">
                <IconButton
                  variant="filled"
                  color="teal"
                  className="rounded-full"
                  size="lg"
                  onClick={() => handleOpen({}, 6, -1)}
                >
                  <PlusCircleIcon className="h-8 w-8 text-black-500" />
                </IconButton>
              </div>
            </TabPanel>
            {/* {data.map(({ value, desc }) => (
              <TabPanel key={value} value={value}>
                {desc}
              </TabPanel>
            ))} */}
          </TabsBody>
        </Tabs>

        <Dialog open={open} handler={handleOpen}>
          <DialogHeader>{txtTitle} {!isIncomeOutcome?"Outcome":"Income"}</DialogHeader>
          <DialogBody>
            <div className="mb-4">
              <Button disabled={readonly} variant="outlined" color="blue-gray" onClick={() => setOpenDate(true)} className="w-full flex-1 text-left">
                <span >{dateName}</span>
              </Button>
            </div>
            <div className="flex gap-2 items-center justify-between">
              <div className="mb-4 w-[80%]">
                {!isIncomeOutcome?
                <Select
                  className="h-10"
                  id="outcome"
                  value={`${outcomeSelect}`}
                  onChange={handleOutcome}
                  color="teal"
                  label={dictionary.dialog.add_budget.outcome[lang]}
                >
                  {kategoriOutcome.map((p) => (
                    <Option value={p.ion_nama} key={p.ion_id}>
                      {p.ion_nama}
                    </Option>
                  ))}
                </Select>:
                <Select
                  className="h-10"
                  id="income"
                  value={`${incomeSelect}`}
                  onChange={handleIncome}
                  color="teal"
                  label={dictionary.dialog.add_budget.income[lang]}
                >
                  {kategoriIncome.map((p) => (
                    <Option value={p.ion_nama} key={p.ion_id}>
                      {p.ion_nama}
                    </Option>
                  ))}
                </Select>
                
                }
                
              </div>
              <div className="mb-4 w-[20%]">
                <div className="text-[12px] text-gray-700 text-end mb-[2px]">Outcome/Income</div>
                <div className="flex justify-center">
                  <Switch color="light-blue" onChange={() => setIsIncomeOutcome(!isIncomeOutcome)} />
                </div>
              </div>
            </div>
            <div className="mb-4">
              <InputSimple
                value={addbudgetById.bel_deskripsi}
                label={dictionary.dialog.add_budget.name[lang]}
                onChange={(evt) => handleChange(evt, "bel_deskripsi")}
                disabled={readonly}
              />
            </div>
            <div className="mb-4">
              <InputNumber
                value={addbudgetById.bel_jumlah}
                label={dictionary.dialog.add_budget.value[lang]}
                onChange={(evt) => handleChange(evt, "bel_jumlah")}
                disabled={readonly}
              />
            </div>
          </DialogBody>
          <DialogFooter className="flex gap-3 justify-between">
            <Button variant="gradient" color="blue-gray" onClick={() => setOpen(false)} className="w-full flex-1">
              <span>{mode == 1 || mode == 4 ? dictionary.universal.back[lang] : dictionary.universal.cancel[lang]}</span>
            </Button>
            <Button
              variant="gradient"
              color={mode == 1 ? "red" : "green"}
              onClick={mode == 1 ? () => handleNewOpen(addbudgetById.bel_id) : saveData}
              className="w-full flex-1"
            >
              <span>{mode == 1 || mode == 4 ? dictionary.universal.delete[lang] : dictionary.universal.confirm[lang]}</span>
            </Button>
          </DialogFooter>
        </Dialog>

        <Dialog open={newOpen} handler={handleNewOpen}>
          <DialogBody>
            <div className="text-center my-6">
              Budget {dictionary.universal.withname[lang]}<span className="font-semibold">{addbudgetById.bel_deskripsi}</span> {dictionary.universal.deleteMessage[lang]}
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
        <Dialog open={openDate} handler={()=>setOpenDate(false)} size="xs">
          <DialogBody>
            <DayPicker
              mode="single"
              selected={dateFilter ? dateFilter.value : null}
              onSelect={onDateChange}
              captionLayout="dropdown"
              fromYear={2010}
              toYear={new Date().getFullYear()}
            />
          </DialogBody>
        </Dialog>
      </div>
    </Fragment>
  );
}
