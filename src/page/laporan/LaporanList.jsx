import { Fragment, useCallback, useContext, useEffect, useRef, useState } from "react";
import { getBestselling, getGrossProfit, getNetProfit, getOmzet, getOmzetHarian } from "../../api/Laporan";
import { categoriesItem} from "../../api/Item";
import { AppContext } from "../../AppContext";
import { Button, Card, Dialog, DialogHeader, DialogBody, DialogFooter, IconButton, List, ListItem, ListItemSuffix,
  Navbar, Typography, Select,Option} from "@material-tailwind/react";
import SearchNavbar from "../../lib/SearchNavbar";
import { Bars3Icon, PlusCircleIcon, AdjustmentsVerticalIcon, LanguageIcon, BuildingLibraryIcon  } from "@heroicons/react/24/outline";
import { HomeIcon, PencilSquareIcon, PhoneIcon } from "@heroicons/react/24/solid";
import { dictionary } from "../../constant/appDictionary";
import { useNavigate } from "react-router-dom";
import LoadingOverlay from "../../lib/LoadingOverlay";
import { topic } from "../../constant/appTopics";
import { TIME_SEARCH_DEBOUNCE } from "../../constant/appCommon";
import InputSimple from "../../lib/InputSimple";
import { formatThousandSeparator } from "../../util/formatter";
import LaporanFilter from "./LaporanFilter";
import TransactionMonthFilter from "../transaction/TransactionMonthFilter";
import FilterChips from "../../lib/FilterChips";
import { useReactToPrint } from "react-to-print";
import { getLokcom } from "../../api/Login";
import * as XLSX from "xlsx";
import { cloneDeep } from "lodash";
export default function LaporanList() {
  const { setMenuOpen, filters, currency, setFilters, lang, dataLogin, cookies } = useContext(AppContext);
  const [listPadding, setListPadding] = useState("20px");
  const [itemDisplay, setItemDisplay] = useState();
  const navbarRef = useRef();
  const [open, setOpen] = useState(false);
  const [newOpen, setNewOpen] = useState(false);
  const [readonly, setReadonly] = useState(false);
  const [txtTitle, settxtTitle] = useState("");
  const [mode, setMode] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [dataReport, setDataReport] = useState([]);
  const [selectReport, setSelectReport] = useState("");
  const navigate = useNavigate();
  const [openFilter, setOpenFilter] = useState(false);
  const [consolemode, setConsolemode] = useState(false);
  const contentRef = useRef(null);
  const handlePrintNew = useReactToPrint({ contentRef });
  const handleFilter = (searchKey) => {
    setKeyword(searchKey);
  };
  const [lokcom, setLokcom] = useState([]);
  const [lokcomValue, setLokcomValue] = useState('');
  const [lokcomid, setLokcomid] = useState([]);
  const [lokcomname, setLokcomname] = useState([]);
  const [laporanNow, setLaporanNow] = useState('');
  const [consoleexcel, setConsoleexcel] = useState([]);
  const [max, setMax] = useState("");
  const [min, setMin] = useState("");
  const [categoriesFilter, setCategoriesFilter] = useState([]);
  const openDrawerRight = () => setOpenFilter(true);
  const handleLokcomSelect = useCallback(async (value) => {
    setLokcomValue(value);
    const _dateFilter = filters.find((f) => f.key === "date");
    if(_dateFilter){
      if(_dateFilter.valueMax){
        var dateParseMax=new Date(_dateFilter.valueMax);
        var dateIsoParseMax=(dateParseMax.toISOString()).substring(0, 10)
        var dateIsoParseMaxSplit=dateIsoParseMax.split("-");

        var dateParseMin=new Date(_dateFilter.valueMin);
        var dateIsoParseMin=(dateParseMin.toISOString()).substring(0, 10)
        var dateIsoParseMinSplit=dateIsoParseMin.split("-");
        setMin(dateFormatter.format(dateParseMin))
        setMax(dateFormatter.format(dateParseMax))
      }
      else{
        var dateParseMax=new Date(_dateFilter.value);
        var dateIsoParseMax=(dateParseMax.toISOString()).substring(0, 10)
        var dateIsoParseMaxSplit=dateIsoParseMax.split("-");

        var dateParseMin=new Date(_dateFilter.value);
        var dateIsoParseMin=(dateParseMin.toISOString()).substring(0, 10)
        var dateIsoParseMinSplit=dateIsoParseMin.split("-");
        setMin(dateFormatter.format(dateParseMin))
        setMax(dateFormatter.format(dateParseMax))
      }
    }
    else{
      var dateParseMax=new Date();
      var dateIsoParseMax=(dateParseMax.toISOString()).substring(0, 10)
      var dateIsoParseMaxSplit=dateIsoParseMax.split("-");

      var dateParseMin=new Date();
      var dateIsoParseMin=(dateParseMin.toISOString()).substring(0, 10)
      var dateIsoParseMinSplit=dateIsoParseMin.split("-");
        setMin(dateFormatter.format(dateParseMin))
        setMax(dateFormatter.format(dateParseMax))
    }
    if(laporanNow=='bestselling'){
      const { content, content_data, error } = await getBestselling({
        lok_id:value,
        command:'bestselling*'+dateIsoParseMinSplit[2]+'-'+dateIsoParseMinSplit[1]+'-'+dateIsoParseMinSplit[0]+'*'+dateIsoParseMaxSplit[2]+'-'+dateIsoParseMaxSplit[1]+'-'+dateIsoParseMaxSplit[0]
      });
      if (error) {
        alert(dictionary.universal.notfound[lang]);
      } else {
        setDataReport(content_data);
        setSelectReport('bestselling');
        settxtTitle('Penjualan Terbaik');
      }
    }
    else if(laporanNow=='bestvalue'){
      const { content, content_data, error } = await getBestselling({
        lok_id:value,
        command:'bestvalue*'+dateIsoParseMinSplit[2]+'-'+dateIsoParseMinSplit[1]+'-'+dateIsoParseMinSplit[0]+'*'+dateIsoParseMaxSplit[2]+'-'+dateIsoParseMaxSplit[1]+'-'+dateIsoParseMaxSplit[0]
      });
      if (error) {
        alert(dictionary.universal.notfound[lang]);
      } else {
        setOpen(true);
        setDataReport(content_data);
        setSelectReport('bestvalue');
        settxtTitle('Penjualan Terbanyak');
      }
    }
    else if(laporanNow=='gross'){
      const { content, content_data, error } = await getGrossProfit({
        lok_id:value,
        command:'grossprofit*'+dateIsoParseMinSplit[2]+'-'+dateIsoParseMinSplit[1]+'-'+dateIsoParseMinSplit[0]+'*'+dateIsoParseMaxSplit[2]+'-'+dateIsoParseMaxSplit[1]+'-'+dateIsoParseMaxSplit[0]
      });
      if (error) {
        alert(dictionary.universal.notfound[lang]);
      } else {
        // setLoading(true);
        setOpen(true);
        setDataReport(content_data);
        setSelectReport('grossprofit');
        settxtTitle('Laba Kotor');
      }
    }
    else if(laporanNow=='net'){
      const { content, content_data, error } = await getNetProfit({
        lok_id:value,
        command:'netprofit*'+dateIsoParseMinSplit[2]+'-'+dateIsoParseMinSplit[1]+'-'+dateIsoParseMinSplit[0]+'*'+dateIsoParseMaxSplit[2]+'-'+dateIsoParseMaxSplit[1]+'-'+dateIsoParseMaxSplit[0]
      });
      if (error) {
        alert(dictionary.universal.notfound[lang]);
      } else {
        setOpen(true);
        setDataReport(content_data);
        setSelectReport('netprofit');
        settxtTitle('Laba Bersih');
      }
    }
    else if(laporanNow=='omzet'){
      const { content, content_data, error } = await getOmzet({
        lok_id:value,
        laundrymode:cookies.lok_type=="laundry"?1:null,
        command:'omzet*'+dateIsoParseMinSplit[2]+'-'+dateIsoParseMinSplit[1]+'-'+dateIsoParseMinSplit[0]+'*'+dateIsoParseMaxSplit[2]+'-'+dateIsoParseMaxSplit[1]+'-'+dateIsoParseMaxSplit[0]
      });
      if (error) {
        alert(dictionary.universal.notfound[lang]);
      } else {
        setOpen(true);
        setDataReport(content_data);
        setSelectReport('omzet');
  
      }
    }
    else if(laporanNow=='omzetharian'){
      const { content, content_data, error } = await getOmzetHarian({
        lok_id:value,
        command:'omzetharian*'+dateIsoParseMinSplit[2]+'-'+dateIsoParseMinSplit[1]+'-'+dateIsoParseMinSplit[0]+'*'+dateIsoParseMaxSplit[2]+'-'+dateIsoParseMaxSplit[1]+'-'+dateIsoParseMaxSplit[0]
      });
      if (error) {
        alert(dictionary.universal.notfound[lang]);
      } else {
        setOpen(true);
        setDataReport(content_data);
        setSelectReport('omzetharian');
        settxtTitle('Omzet');
      }
    }
  },[filters,lokcomValue,dataReport]);
  useEffect(() => {
    console.log(cookies)
    const initcomlok = async () => {
        const { data, error } = await getLokcom({ com_id: cookies.com_id });
        if (!error) {
          let dataname=[];
          let dataid=[];
          let newdata=[];
          data.map((_data,index) => {
            console.log(index)
            dataname.push(_data.lok_nama);
            dataid.push(_data.lok_id);
          });
          
          dataname = dataname.filter(function (value, index, array) { 
            return array.indexOf(value) === index;
          });
          dataid = dataid.filter(function (value, index, array) { 
            return array.indexOf(value) === index;
          });
          dataname.map((_data,index) => {
            newdata.push({"lokcomid":dataid[index],"lokcomvalue":_data})
          });
          console.log(newdata)
          setLokcomid(dataid);
          setLokcomname(dataname);
          setLokcom(newdata);
          setLokcomValue(cookies.lok_id)
        }
      };
    initcomlok();
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
  },[]) // same as ComponentDidMount in class based component
  const dateFormatter = new Intl.DateTimeFormat('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const handleBestSelling = useCallback(async () => {
    setLokcomValue(cookies.lok_id);
    setLaporanNow('bestselling');
    setItemDisplay(null);
    const _dateFilter = filters.find((f) => f.key === "date");
    if(_dateFilter){
      if(_dateFilter.valueMax){
        var dateParseMax=new Date(_dateFilter.valueMax);
        
        var dateIsoParseMax=(dateParseMax.toISOString()).substring(0, 10)
        var dateIsoParseMaxSplit=dateIsoParseMax.split("-");

        var dateParseMin=new Date(_dateFilter.valueMin);
        
        var dateIsoParseMin=(dateParseMin.toISOString()).substring(0, 10)
        var dateIsoParseMinSplit=dateIsoParseMin.split("-");
        setMin(dateFormatter.format(dateParseMin))
        setMax(dateFormatter.format(dateParseMax))
      }
      else{
        var dateParseMax=new Date(_dateFilter.value);
        
        var dateIsoParseMax=(dateParseMax.toISOString()).substring(0, 10)
        var dateIsoParseMaxSplit=dateIsoParseMax.split("-");

        var dateParseMin=new Date(_dateFilter.value);
         // + 1 day
        var dateIsoParseMin=(dateParseMin.toISOString()).substring(0, 10)
        var dateIsoParseMinSplit=dateIsoParseMin.split("-");
        setMin(dateFormatter.format(dateParseMin))
        setMax(dateFormatter.format(dateParseMax))
      }
    }
    else{
      var dateParseMax=new Date();
       // + 1 day in ms
      var dateIsoParseMax=(dateParseMax.toISOString()).substring(0, 10)
      var dateIsoParseMaxSplit=dateIsoParseMax.split("-");

      var dateParseMin=new Date();
       // + 1 day in ms
      var dateIsoParseMin=(dateParseMin.toISOString()).substring(0, 10)
      var dateIsoParseMinSplit=dateIsoParseMin.split("-");
        setMin(dateFormatter.format(dateParseMin))
        setMax(dateFormatter.format(dateParseMax))
    }
    
    const { content, content_data, error } = await getBestselling({
      lok_id:cookies.lok_id,
      com_id:consolemode?cookies.com_id:-1,
      command:'bestselling*'+dateIsoParseMinSplit[2]+'-'+dateIsoParseMinSplit[1]+'-'+dateIsoParseMinSplit[0]+'*'+dateIsoParseMaxSplit[2]+'-'+dateIsoParseMaxSplit[1]+'-'+dateIsoParseMaxSplit[0]
    });
    if (error) {
      alert(dictionary.universal.notfound[lang]);
    } else {
      if(consolemode){
        let arrnew=[];
        content_data.map((i,index) => {
          i.map((ii,indexi) => {
            arrnew.push(ii);
          });
          arrnew.push({});
        });
        setConsoleexcel(arrnew);
      }
      else
        setConsoleexcel(content_data);
      setOpen(true);
      setDataReport(content_data);
      setSelectReport('bestselling');
      settxtTitle('Penjualan Item Terbanyak');
    }
  }, [filters,consolemode]);
  const handleBestValue = useCallback(async () => {
    setLokcomValue(cookies.lok_id);
    setLaporanNow('bestvalue');
    setItemDisplay(null);
    const _dateFilter = filters.find((f) => f.key === "date");
    if(_dateFilter){
      if(_dateFilter.valueMax){
        var dateParseMax=new Date(_dateFilter.valueMax);
        
        var dateIsoParseMax=(dateParseMax.toISOString()).substring(0, 10)
        var dateIsoParseMaxSplit=dateIsoParseMax.split("-");

        var dateParseMin=new Date(_dateFilter.valueMin);
        
        var dateIsoParseMin=(dateParseMin.toISOString()).substring(0, 10)
        var dateIsoParseMinSplit=dateIsoParseMin.split("-");
        setMin(dateFormatter.format(dateParseMin))
        setMax(dateFormatter.format(dateParseMax))
      }
      else{
        var dateParseMax=new Date(_dateFilter.value);
        
        var dateIsoParseMax=(dateParseMax.toISOString()).substring(0, 10)
        var dateIsoParseMaxSplit=dateIsoParseMax.split("-");

        var dateParseMin=new Date(_dateFilter.value);
         // + 1 day
        var dateIsoParseMin=(dateParseMin.toISOString()).substring(0, 10)
        var dateIsoParseMinSplit=dateIsoParseMin.split("-");
        setMin(dateFormatter.format(dateParseMin))
        setMax(dateFormatter.format(dateParseMax))
      }
    }
    else{
      var dateParseMax=new Date();
       // + 1 day in ms
      var dateIsoParseMax=(dateParseMax.toISOString()).substring(0, 10)
      var dateIsoParseMaxSplit=dateIsoParseMax.split("-");

      var dateParseMin=new Date();
       // + 1 day in ms
      var dateIsoParseMin=(dateParseMin.toISOString()).substring(0, 10)
      var dateIsoParseMinSplit=dateIsoParseMin.split("-");
        setMin(dateFormatter.format(dateParseMin))
        setMax(dateFormatter.format(dateParseMax))
    }
    const { content, content_data, error } = await getBestselling({
      lok_id:cookies.lok_id,
      com_id:consolemode?cookies.com_id:-1,
      command:'bestvalue*'+dateIsoParseMinSplit[2]+'-'+dateIsoParseMinSplit[1]+'-'+dateIsoParseMinSplit[0]+'*'+dateIsoParseMaxSplit[2]+'-'+dateIsoParseMaxSplit[1]+'-'+dateIsoParseMaxSplit[0]
    });
    if (error) {
      alert(dictionary.universal.notfound[lang]);
    } else {
      if(consolemode){
        let arrnew=[];
        content_data.map((i,index) => {
          i.map((ii,indexi) => {
            arrnew.push(ii);
          });
          arrnew.push({});
        });
        setConsoleexcel(arrnew);
      }
      else
        setConsoleexcel(content_data);
      setOpen(true);
      setDataReport(content_data);
      setSelectReport('bestvalue');
      settxtTitle('Penjualan Terbaik');
    }
  }, [filters,consolemode]);
  const handleGrossProfit = useCallback(async () => {
    setLokcomValue(cookies.lok_id);
    setLaporanNow('gross');
    setItemDisplay(null);
    const _dateFilter = filters.find((f) => f.key === "date");
    if(_dateFilter){
      if(_dateFilter.valueMax){
        var dateParseMax=new Date(_dateFilter.valueMax);
        
        var dateIsoParseMax=(dateParseMax.toISOString()).substring(0, 10)
        var dateIsoParseMaxSplit=dateIsoParseMax.split("-");

        var dateParseMin=new Date(_dateFilter.valueMin);
        
        var dateIsoParseMin=(dateParseMin.toISOString()).substring(0, 10)
        var dateIsoParseMinSplit=dateIsoParseMin.split("-");
        setMin(dateFormatter.format(dateParseMin))
        setMax(dateFormatter.format(dateParseMax))
      }
      else{
        var dateParseMax=new Date(_dateFilter.value);
        
        var dateIsoParseMax=(dateParseMax.toISOString()).substring(0, 10)
        var dateIsoParseMaxSplit=dateIsoParseMax.split("-");

        var dateParseMin=new Date(_dateFilter.value);
         // + 1 day
        var dateIsoParseMin=(dateParseMin.toISOString()).substring(0, 10)
        var dateIsoParseMinSplit=dateIsoParseMin.split("-");
        setMin(dateFormatter.format(dateParseMin))
        setMax(dateFormatter.format(dateParseMax))
      }
    }
    else{
      var dateParseMax=new Date();
       // + 1 day in ms
      var dateIsoParseMax=(dateParseMax.toISOString()).substring(0, 10)
      var dateIsoParseMaxSplit=dateIsoParseMax.split("-");

      var dateParseMin=new Date();
       // + 1 day in ms
      var dateIsoParseMin=(dateParseMin.toISOString()).substring(0, 10)
      var dateIsoParseMinSplit=dateIsoParseMin.split("-");
        setMin(dateFormatter.format(dateParseMin))
        setMax(dateFormatter.format(dateParseMax))
    }
    const { content, content_data, error } = await getGrossProfit({
      lok_id:cookies.lok_id,
      com_id:consolemode?cookies.com_id:-1,
      command:'grossprofit*'+dateIsoParseMinSplit[2]+'-'+dateIsoParseMinSplit[1]+'-'+dateIsoParseMinSplit[0]+'*'+dateIsoParseMaxSplit[2]+'-'+dateIsoParseMaxSplit[1]+'-'+dateIsoParseMaxSplit[0]
    });
    if (error) {
      alert(dictionary.universal.notfound[lang]);
    } else {
      if(consolemode){
        let arrnew=[];
        content_data.map((i,index) => {
            
          i.map((ii,indexi) => {
            arrnew.push(ii);
          });
          arrnew.push({});
        });
        setConsoleexcel(arrnew);
      }
      else
        setConsoleexcel(content_data);
      setOpen(true);
      setDataReport(content_data);
      setSelectReport('grossprofit');
      settxtTitle('Laba Kotor');
    }
  }, [filters,consolemode]);
  const handleNetProfit = useCallback(async () => {
    setLokcomValue(cookies.lok_id);
    setLaporanNow('net');
    setItemDisplay(null);
    const _dateFilter = filters.find((f) => f.key === "date");
    if(_dateFilter){
      if(_dateFilter.valueMax){
        var dateParseMax=new Date(_dateFilter.valueMax);
        
        var dateIsoParseMax=(dateParseMax.toISOString()).substring(0, 10)
        var dateIsoParseMaxSplit=dateIsoParseMax.split("-");

        var dateParseMin=new Date(_dateFilter.valueMin);
        
        var dateIsoParseMin=(dateParseMin.toISOString()).substring(0, 10)
        var dateIsoParseMinSplit=dateIsoParseMin.split("-");
        setMin(dateFormatter.format(dateParseMin))
        setMax(dateFormatter.format(dateParseMax))
      }
      else{
        var dateParseMax=new Date(_dateFilter.value);
        
        var dateIsoParseMax=(dateParseMax.toISOString()).substring(0, 10)
        var dateIsoParseMaxSplit=dateIsoParseMax.split("-");

        var dateParseMin=new Date(_dateFilter.value);
         // + 1 day
        var dateIsoParseMin=(dateParseMin.toISOString()).substring(0, 10)
        var dateIsoParseMinSplit=dateIsoParseMin.split("-");
        setMin(dateFormatter.format(dateParseMin))
        setMax(dateFormatter.format(dateParseMax))
      }
    }
    else{
      var dateParseMax=new Date();
       // + 1 day in ms
      var dateIsoParseMax=(dateParseMax.toISOString()).substring(0, 10)
      var dateIsoParseMaxSplit=dateIsoParseMax.split("-");

      var dateParseMin=new Date();
       // + 1 day in ms
      var dateIsoParseMin=(dateParseMin.toISOString()).substring(0, 10)
      var dateIsoParseMinSplit=dateIsoParseMin.split("-");
        setMin(dateFormatter.format(dateParseMin))
        setMax(dateFormatter.format(dateParseMax))
    }
    const { content, content_data, error } = await getNetProfit({
      lok_id:cookies.lok_id,
      com_id:consolemode?cookies.com_id:-1,
      command:'netprofit*'+dateIsoParseMinSplit[2]+'-'+dateIsoParseMinSplit[1]+'-'+dateIsoParseMinSplit[0]+'*'+dateIsoParseMaxSplit[2]+'-'+dateIsoParseMaxSplit[1]+'-'+dateIsoParseMaxSplit[0]
    });
    if (error) {
      alert(dictionary.universal.notfound[lang]);
    } else {
      if(consolemode){
        let arrnew=[];
        content_data.map((i,index) => {
          i.map((ii,indexi) => {
            arrnew.push(ii);
          });
          arrnew.push({});
        });
        setConsoleexcel(arrnew);
      }
      else
        setConsoleexcel(content_data);
      setOpen(true);
      setDataReport(content_data);
      setSelectReport('netprofit');
      settxtTitle('Laba Bersih');
    }
  }, [filters,consolemode]);
  const handleOmzet = useCallback(async () => {
    setLokcomValue(cookies.lok_id);
    setLaporanNow('omzet');
    setItemDisplay(null);
    const _categoryFilter = filters.find((f) => f.key === "categoryitem");
      const _filters = cloneDeep(filters);
      let _newfilter = _filters.filter(function (object) {
        return object.key === "categoryitem";
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
    const _dateFilter = filters.find((f) => f.key === "date");
    if(_dateFilter){
      if(_dateFilter.valueMax){
        var dateParseMax=new Date(_dateFilter.valueMax);
        
        var dateIsoParseMax=(dateParseMax.toISOString()).substring(0, 10)
        var dateIsoParseMaxSplit=dateIsoParseMax.split("-");

        var dateParseMin=new Date(_dateFilter.valueMin);
        
        var dateIsoParseMin=(dateParseMin.toISOString()).substring(0, 10)
        var dateIsoParseMinSplit=dateIsoParseMin.split("-");
        setMin(dateFormatter.format(dateParseMin))
        setMax(dateFormatter.format(dateParseMax))
      }
      else{
        var dateParseMax=new Date(_dateFilter.value);
        
        var dateIsoParseMax=(dateParseMax.toISOString()).substring(0, 10)
        var dateIsoParseMaxSplit=dateIsoParseMax.split("-");

        var dateParseMin=new Date(_dateFilter.value);
         // + 1 day
        var dateIsoParseMin=(dateParseMin.toISOString()).substring(0, 10)
        var dateIsoParseMinSplit=dateIsoParseMin.split("-");
        setMin(dateFormatter.format(dateParseMin))
        setMax(dateFormatter.format(dateParseMax))
      }
    }
    else{
      var dateParseMax=new Date();
      console.log(dateParseMax)
       // + 1 day in ms
      console.log(dateParseMax)
      var dateIsoParseMax=(dateParseMax.toISOString()).substring(0, 10)
      var dateIsoParseMaxSplit=dateIsoParseMax.split("-");

      var dateParseMin=new Date();
       // + 1 day in ms
      var dateIsoParseMin=(dateParseMin.toISOString()).substring(0, 10)
      var dateIsoParseMinSplit=dateIsoParseMin.split("-");
      console.log(dateParseMax.toISOString())
        setMin(dateFormatter.format(dateParseMin))
        setMax(dateFormatter.format(dateParseMax))
    }
    const { content, content_data, error } = await getOmzet({
      lok_id:cookies.lok_id,
      laundrymode:cookies.lok_type=="laundry"?1:null,
      com_id:consolemode?cookies.com_id:-1,
      command:'omzet*'+dateIsoParseMinSplit[2]+'-'+dateIsoParseMinSplit[1]+'-'+dateIsoParseMinSplit[0]+'*'+dateIsoParseMaxSplit[2]+'-'+dateIsoParseMaxSplit[1]+'-'+dateIsoParseMaxSplit[0],
      ...filterProps,
    });
    if (error) {
      alert(dictionary.universal.notfound[lang]);
    } else {
      if(consolemode){
        let arrnew=[];
        content_data.map((i,index) => {
          i.map((ii,indexi) => {
            arrnew.push(ii);
          });
          arrnew.push({});
        });
        setConsoleexcel(arrnew);
      }
      else
      setConsoleexcel(content_data);
      setOpen(true);
      setDataReport(content_data);
      setSelectReport('omzet');
      settxtTitle('Omzet');

    }
  }, [filters,consolemode]);
  const handleOmzetHarian = useCallback(async () => {
    setLokcomValue(cookies.lok_id);
    setLaporanNow('omzetharian');
    setItemDisplay(null);
    const _dateFilter = filters.find((f) => f.key === "date");
    if(_dateFilter){
      if(_dateFilter.valueMax){
        var dateParseMax=new Date(_dateFilter.valueMax);
        var dateIsoParseMax=(dateParseMax.toISOString()).substring(0, 10)
        var dateIsoParseMaxSplit=dateIsoParseMax.split("-");

        var dateParseMin=new Date(_dateFilter.valueMin);
        var dateIsoParseMin=(dateParseMin.toISOString()).substring(0, 10)
        var dateIsoParseMinSplit=dateIsoParseMin.split("-");
        setMin(dateFormatter.format(dateParseMin))
        setMax(dateFormatter.format(dateParseMax))
      }
      else{
        var dateParseMax=new Date(_dateFilter.value);
        var dateIsoParseMax=(dateParseMax.toISOString()).substring(0, 10)
        var dateIsoParseMaxSplit=dateIsoParseMax.split("-");

        var dateParseMin=new Date(_dateFilter.value);
        var dateIsoParseMin=(dateParseMin.toISOString()).substring(0, 10)
        var dateIsoParseMinSplit=dateIsoParseMin.split("-");
        setMin(dateFormatter.format(dateParseMin))
        setMax(dateFormatter.format(dateParseMax))
      }
    }
    else{
      var dateParseMax=new Date();
      var dateIsoParseMax=(dateParseMax.toISOString()).substring(0, 10)
      var dateIsoParseMaxSplit=dateIsoParseMax.split("-");

      var dateParseMin=new Date();
      var dateIsoParseMin=(dateParseMin.toISOString()).substring(0, 10)
      var dateIsoParseMinSplit=dateIsoParseMin.split("-");
        setMin(dateFormatter.format(dateParseMin))
        setMax(dateFormatter.format(dateParseMax))
    }
    const { content, content_data, error } = await getOmzetHarian({
      lok_id:cookies.lok_id,
      com_id:consolemode?cookies.com_id:-1,
      command:'omzetharian*'+dateIsoParseMinSplit[2]+'-'+dateIsoParseMinSplit[1]+'-'+dateIsoParseMinSplit[0]+'*'+dateIsoParseMaxSplit[2]+'-'+dateIsoParseMaxSplit[1]+'-'+dateIsoParseMaxSplit[0]
    });
    if (error) {
      alert(dictionary.universal.notfound[lang]);
    } else {
      setConsoleexcel(content_data);
      setOpen(true);
      setDataReport(content_data);
      setSelectReport('omzetharian');
      settxtTitle('Omzet');
    }
  }, [filters,consolemode]);
  const handleDownload = () => {
    var filename = 'Laporan_Kasbon.xlsx';
    /* make the worksheet */
    const ws = XLSX.utils.json_to_sheet(consoleexcel, { origin: "A3" });

    // Tambahkan title di baris 1 kolom A
    XLSX.utils.sheet_add_aoa(ws, [["                                                                      Laporan "+(consolemode?"Konsolidasi ":"")+txtTitle]], { origin: "A1" });
    XLSX.utils.sheet_add_aoa(ws, [["                                                                      Tanggal "+min+" - "+max]], { origin: "A2" });
    let colcount= Object.keys(consoleexcel[0]).length;
    // Merge cell dari A1 sampai G1 (menyesuaikan jumlah kolom tabel)
    ws['!merges'] = [                                                                                                           
      { s: { r: 0, c: 0 }, e: { r: 0, c: colcount-1 } }   // merge A1..G1 (r=baris, c=kolom; 0-based)
    ];
    
    const header = Object.keys(consoleexcel[0]); // columns name

   var wscols = [];
    for (var i = 0; i < header.length; i++) {  // columns length added
      wscols.push({ wch: header[i].length+10 })
    }
  
    // if (!ws['!merges']) ws['!merges'] = [];
    // let colcount= Object.keys(consoleexcel[0]).length;
    // ws['!merges'].push({ s: { r: 0, c: 0 }, e: { r: 0, c: colcount-1 } });
    ws["!cols"] = wscols;
    /* add to workbook */
    var wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, filename);

    /* write workbook (use type 'binary') */
    XLSX.writeFile(wb, filename);
  };
  useEffect(() => {
    setListPadding(`${navbarRef.current.offsetHeight + 20}px`);
  }, [filters]);
  const sellinghead = ["No", "Kode", "Nama Item", "Qty", "Satuan", "Total Harga"];
  const grosshead = ["Lokasi","Bulan", "Income", "Outcome", "Gross Profit"];
  const nethead = ["No", "Tanggal", "Income", "RcvOutcome", "OprOutcome","Net Profit"];
  const omzethead = ["No", "Item", "Jumlah", "Total"];
  const omzethrhead = ["No", "Check In", "Check Out", "Nama Kasir", "Modal Awal", "Modal Akhir", "Omzet"];
  const TableView = () => {
    
    if (selectReport=="grossprofit") {
      return (
        <Card className="h-full w-full overflow-scroll">
          <div className="text-center font-bold text-lg">
            Laporan {txtTitle}
          </div>
          <div className="text-center font-semibold mb-5">
            Tanggal {min} - {max}
          </div>
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {grosshead.map((head) => (
                  <th
                    key={head}
                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
            {
              consolemode?
              dataReport.map((i, index) => {
                const isLast = index === dataReport.length - 1;
                const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
                return (
                  <tr key={index+1}>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {i[0].lokasi}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <table>
                        {
                          i.map((ii, indexi) => {
                            return(
                              <tr>
                                <td>
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal"
                                >
                                  {ii.tanggal}
                                </Typography>
                                </td>
                              </tr>
                            );
                          })
                        }
                        
                      </table>
                    </td>
                    <td className={classes}>
                      <table>
                        {
                          i.map((ii, indexi) => {
                            return(
                              <tr>
                                <td>
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal"
                                >
                                  {ii.income==0?"0":currency+" "+formatThousandSeparator(parseFloat(ii.income))}
                                </Typography>
                                </td>
                              </tr>
                            );
                          })
                        }
                        
                      </table>
                    </td>
                    <td className={classes}>
                      <table>
                        {
                          i.map((ii, indexi) => {
                            return(
                              <tr>
                                <td>
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal"
                                >
                                  {ii.outcome==0?"0":currency+" "+formatThousandSeparator(parseFloat(ii.outcome))}
                                </Typography>
                                </td>
                              </tr>
                            );
                          })
                        }
                        
                      </table>
                    </td>
                    <td className={classes}>
                      <table>
                        {
                          i.map((ii, indexi) => {
                            return(
                              <tr>
                                <td>
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal"
                                >
                                  {ii.income==0&&ii.outcome==0?"0":(currency+" "+formatThousandSeparator(parseFloat(ii.income)-parseFloat(ii.outcome)))}
                                </Typography>
                                </td>
                              </tr>
                            );
                          })
                        }
                        
                      </table>
                    </td>
                  </tr>
                );
              }):
              dataReport.map((i, index) => {
                const isLast = index === dataReport.length - 1;
                const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
                return (
                  <tr key={index+1}>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {index+1}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {i.tanggal}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {i.income==0?"0":currency+" "+formatThousandSeparator(parseFloat(i.income))}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {i.outcome==0?"0":currency+" "+formatThousandSeparator(parseFloat(i.outcome))}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {i.grossprofit==0?"0":currency+" "+formatThousandSeparator(parseFloat(i.grossprofit))}
                      </Typography>
                    </td>
                  </tr>
                );
              })
            }
              
            </tbody>
          </table>
        </Card>
      );
    }
    else if (selectReport=="netprofit") {
      return (
        <Card className="h-full w-full overflow-scroll">
          <div className="text-center font-bold text-lg">
            Laporan {txtTitle}
          </div>
          <div className="text-center font-semibold mb-5">
            Tanggal {min} - {max}
          </div>
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {nethead.map((head) => (
                  <th
                    key={head}
                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {consolemode?
              dataReport.map((i, index) => {
                const isLast = index === dataReport.length - 1;
                const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
                return (
                  <tr key={index+1}>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {i[0].lokasi}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <table>
                        {
                          i.map((ii, indexi) => {
                            return(
                              <tr>
                                <td>
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal"
                                >
                                  {ii.tanggal}
                                </Typography>
                                </td>
                              </tr>
                            );
                          })
                        }
                        
                      </table>
                    </td>
                    <td className={classes}>
                      <table>
                        {
                          i.map((ii, indexi) => {
                            return(
                              <tr>
                                <td>
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal"
                                >
                                  {ii.income==0?"0":currency+" "+formatThousandSeparator(parseFloat(ii.income))}
                                </Typography>
                                </td>
                              </tr>
                            );
                          })
                        }
                        
                      </table>
                    </td>
                    <td className={classes}>
                      <table>
                        {
                          i.map((ii, indexi) => {
                            return(
                              <tr>
                                <td>
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal"
                                >
                                  {ii.rcvoutcome==0?"0":currency+" "+formatThousandSeparator(parseFloat(ii.rcvoutcome))}
                                </Typography>
                                </td>
                              </tr>
                            );
                          })
                        }
                        
                      </table>
                    </td>
                    <td className={classes}>
                      <table>
                        {
                          i.map((ii, indexi) => {
                            return(
                              <tr>
                                <td>
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal"
                                >
                                  {ii.oproutcome==0?"0":currency+" "+formatThousandSeparator(parseFloat(ii.oproutcome))}
                                </Typography>
                                </td>
                              </tr>
                            );
                          })
                        }
                        
                      </table>
                    </td>
                    <td className={classes}>
                      <table>
                        {
                          i.map((ii, indexi) => {
                            return(
                              <tr>
                                <td>
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal"
                                >
                                  {ii.income==0&&ii.oproutcome==0&&ii.rcvoutcome==0?"0":(currency+" "+formatThousandSeparator(parseFloat(ii.income)-parseFloat(ii.rcvoutcome)+parseFloat(ii.oproutcome)))}
                                </Typography>
                                </td>
                              </tr>
                            );
                          })
                        }
                        
                      </table>
                    </td>
                  </tr>
                );
              }):dataReport.map((i, index) => {
                const isLast = index === dataReport.length - 1;
                const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
                return (
                  <tr key={index+1}>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {index+1}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {i.tanggal}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {i.income==0?"0":currency+" "+formatThousandSeparator(parseFloat(i.income))}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {i.rcvoutcome==0?"0":currency+" "+formatThousandSeparator(parseFloat(i.rcvoutcome))}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {i.oproutcome==0?"0":currency+" "+formatThousandSeparator(parseFloat(i.oproutcome))}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {i.netprofit==0?"0":currency+" "+formatThousandSeparator(parseFloat(i.netprofit))}
                      </Typography>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>
      );
    }
    else if (selectReport=="bestselling"||selectReport=="bestvalue") {
      return (
        <Card className="h-full w-full overflow-scroll">
          <div className="text-center font-bold text-lg">
            Laporan {txtTitle}
          </div>
          <div className="text-center font-semibold mb-5">
            Tanggal {min} - {max}
          </div>
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {sellinghead.map((head) => (
                  <th
                    key={head}
                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {consolemode?
              dataReport.map((i, index) => {
                const isLast = index === dataReport.length - 1;
                const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
                console.log(i)
                return (
                  i.length>0?<tr key={index+1}>
                    <td className={classes}>
                      <table>
                        {
                          i.map((ii, indexi) => {
                            if(indexi==0)
                            return(
                              <tr>
                                <td>
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal"
                                >
                                  {ii.lokasi}
                                </Typography>
                                </td>
                              </tr>
                            );
                          })
                        }
                        
                      </table>
                    </td>
                    <td className={classes}>
                      <table>
                        {
                          i.map((ii, indexi) => {
                            return(
                              <tr>
                                <td>
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal"
                                >
                                  {ii.itm_kode}
                                </Typography>
                                </td>
                              </tr>
                            );
                          })
                        }
                        
                      </table>
                    </td>
                    <td className={classes}>
                      <table>
                        {
                          i.map((ii, indexi) => {
                            return(
                              <tr>
                                <td>
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal"
                                >
                                  {ii.itm_nama}
                                </Typography>
                                </td>
                              </tr>
                            );
                          })
                        }
                        
                      </table>
                    </td>
                    <td className={classes}>
                      <table>
                        {
                          i.map((ii, indexi) => {
                            return(
                              <tr>
                                <td>
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal"
                                >
                                  {ii.totqty}
                                </Typography>
                                </td>
                              </tr>
                            );
                          })
                        }
                        
                      </table>
                    </td>
                    <td className={classes}>
                      <table>
                        {
                          i.map((ii, indexi) => {
                            return(
                              <tr>
                                <td>
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal"
                                >
                                  {ii.nit_satuan0}
                                </Typography>
                                </td>
                              </tr>
                            );
                          })
                        }
                        
                      </table>
                    </td>
                    <td className={classes}>
                      <table>
                        {
                          i.map((ii, indexi) => {
                            return(
                              <tr>
                                <td>
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal"
                                >
                                  {ii.totnilai==0?"0":(currency+" "+formatThousandSeparator(parseFloat(ii.totnilai)))}
                                </Typography>
                                </td>
                              </tr>
                            );
                          })
                        }
                        
                      </table>
                    </td>
                  </tr>:null
                  
                );
              }):dataReport.map((i, index) => {
                const isLast = index === dataReport.length - 1;
                const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
                return (
                  <tr key={index+1}>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {index+1}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {i.itm_kode}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {i.itm_nama}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {i.totqty}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {i.nit_satuan0}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {i.totnilai==0?"0":currency+" "+formatThousandSeparator(parseFloat(i.totnilai))}
                      </Typography>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>
      );
    }
    else if (selectReport=="omzet") {
      return (
        <Card className="h-full w-full overflow-scroll">
          <div className="text-center font-bold text-lg">
            Laporan {txtTitle}
          </div>
          <div className="text-center font-semibold mb-5">
            Tanggal {min} - {max}
          </div>
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {omzethead.map((head) => (
                  <th
                    key={head}
                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {consolemode?
              dataReport.map((i, index) => {
                const isLast = index === dataReport.length - 1;
                const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
                return (
                  <tr key={index+1}>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {i[0].lokasi}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <table>
                        {
                          i.map((ii, indexi) => {
                            if(ii.itm_nama!="")
                            return(
                              <tr>
                                <td>
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal"
                                >
                                  {ii.itm_nama}
                                </Typography>
                                </td>
                              </tr>
                            );
                          })
                        }
                        
                      </table>
                    </td>
                    <td className={classes}>
                      <table>
                        {
                          i.map((ii, indexi) => {
                            if(ii.itm_nama!="")
                            return(
                              <tr>
                                <td>
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal"
                                >
                                  {ii.totalqty}
                                </Typography>
                                </td>
                              </tr>
                            );
                          })
                        }
                        
                      </table>
                    </td>
                    <td className={classes}>
                      <table>
                        {
                          i.map((ii, indexi) => {
                            if(ii.itm_nama!="")
                            return(
                              <tr>
                                <td>
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal"
                                >
                                  {ii.totalhrg==0?"0":currency+" "+formatThousandSeparator(parseFloat(ii.totalhrg))}
                                </Typography>
                                </td>
                              </tr>
                            );
                          })
                        }
                        
                      </table>
                    </td>
                  </tr>
                );
              }):dataReport.map((i, index) => {
                const isLast = index === dataReport.length - 1;
                const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
                return (
                  <tr key={index+1}>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {index+1}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {i.itm_nama}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {i.totalqty}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {parseInt(i.totalhrg)==0?"0":currency+" "+formatThousandSeparator(parseFloat(i.totalhrg))}
                      </Typography>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>
      );
    }
    else if (selectReport=="omzetharian") {
      return (
        <Card className="h-full w-full overflow-scroll">
          <div className="text-center font-bold text-lg">
            Laporan {txtTitle}
          </div>
          <div className="text-center font-semibold mb-5">
            Tanggal {min} - {max}
          </div>
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {omzethrhead.map((head) => (
                  <th
                    key={head}
                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dataReport.map((i, index) => {
                const isLast = index === dataReport.length - 1;
                const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
                return (
                  <tr key={index+1}>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {index+1}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {i.mod_checkin}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {i.mod_checkout}
                      </Typography>
                    </td><td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {i.kas_nama}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {i.mod_awal==0?"0":currency+" "+formatThousandSeparator(parseFloat(i.mod_awal))}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {i.mod_akhir==0?"0":currency+" "+formatThousandSeparator(parseFloat(i.mod_akhir))}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {i.omzet==0?"0":currency+" "+formatThousandSeparator(parseFloat(i.omzet))}
                      </Typography>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>
      );
    }
  };

  return (
    <Fragment>
      <div className="h-screen-adapt bg-gray-50 overflow-hidden relative">
        {/* <div className="top-0 inset-x-0 fixed bg-gradient-to-b from-gray-50 h-20" /> */}
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
                {/* <SearchNavbar onSearch={handleFilter} value={keyword} label={dictionary.search.report[lang]} /> */}
              </div>
              <IconButton size="md" variant="text" onClick={()=>setConsolemode(!consolemode)} className={`${consolemode ? "bg-blue-300" : "bg-transparent"}`}>
                <BuildingLibraryIcon className="h-6 w-6 stroke-2" />
              </IconButton>
              <IconButton size="md" variant="text" onClick={openDrawerRight}>
                <AdjustmentsVerticalIcon className="h-6 w-6 stroke-2" />
              </IconButton>
            </div>

            {!filters.length ? (
              <Typography variant="small" color="gray" className="absolute right-14 bottom-1 text-xs italic">
                Semua Laporan
              </Typography>
            ) : (
              <div className="px-2 pt-4">
                <FilterChips filters={filters} onSetFilters={setFilters} />
              </div>
            )}
          </Navbar>
        </div>

        <div className="pb-20 overflow-auto h-full" style={{ paddingTop: listPadding }}>
          <List className="divide-y divide-dashed divide-gray-400">
            <ListItem className="flex items-center justify-between px-[3px]" onClick={() => handleBestSelling()}>
              <div className="w-[90%] pr-2 flex-1">
                <div className="info flex flex-col gap-2">
                  <Typography variant="small" color="gray" className="text-[14px] font-medium">
                    <b>Best Selling</b>
                  </Typography>
                </div>
              </div>
            </ListItem>
            <ListItem className="flex items-center justify-between px-[3px]" onClick={() => handleBestValue()}>
              <div className="w-[90%] pr-2 flex-1">
                <div className="info flex flex-col gap-2">
                  <Typography variant="small" color="gray" className="text-[14px] font-medium">
                    <b>Best Value</b>
                  </Typography>
                </div>
              </div>
            </ListItem>
            <ListItem className="flex items-center justify-between px-[3px]" onClick={() => handleGrossProfit()}>
              <div className="w-[90%] pr-2 flex-1">
                <div className="info flex flex-col gap-2">
                  <Typography variant="small" color="gray" className="text-[14px] font-medium">
                    <b>Gross Profit</b>
                  </Typography>
                </div>
              </div>
            </ListItem>
            <ListItem className="flex items-center justify-between px-[3px]" onClick={() => handleNetProfit()}>
              <div className="w-[90%] pr-2 flex-1">
                <div className="info flex flex-col gap-2">
                  <Typography variant="small" color="gray" className="text-[14px] font-medium">
                    <b>Net Profit</b>
                  </Typography>
                </div>
              </div>
            </ListItem>
            <ListItem className="flex items-center justify-between px-[3px]" onClick={() => handleOmzet()}>
              <div className="w-[90%] pr-2 flex-1">
                <div className="info flex flex-col gap-2">
                  <Typography variant="small" color="gray" className="text-[14px] font-medium">
                    <b>Omzet</b>
                  </Typography>
                </div>
              </div>
            </ListItem>
            {/* <ListItem className="flex items-center justify-between px-[3px]" onClick={() => {consolemode?alert("Belum support mode konsolidasi"):handleOmzetHarian()}}>
              <div className="w-[90%] pr-2 flex-1">
                <div className="info flex flex-col gap-2">
                  <Typography variant="small" color="gray" className="text-[14px] font-medium">
                    <b>Omzet kasir</b>
                  </Typography>
                </div>
              </div>
            </ListItem> */}
          </List>
          {/* <div className="fixed bottom-4 right-4">
            <IconButton variant="filled" color="teal" className="rounded-full" size="lg" onClick={() => handleAdd()}>
              <PlusCircleIcon className="h-8 w-8 text-black-500" />
            </IconButton>
          </div> */}
        </div>

        <Dialog open={open} handler={() => setOpen(false)} size="xl">
          <DialogHeader className="text-[20px] text-[#606060]">Preview</DialogHeader>
          <DialogBody>
            {
              <div className="max-h-[60vh] overflow-y-auto">
                <div ref={contentRef}>
                  {TableView()}
     
                </div>
              </div>
            }
          </DialogBody>
          {/* <DialogBody className="max-h-[60vh] overflow-y-auto">
            <List>
              <ListItem className="">
                {TableView()}
              </ListItem>
            </List>
          </DialogBody> */}
          <DialogFooter className="flex gap-3 justify-between">
            {/* {
              cookies.kas_owner? <Select
              id="lokcomcat"
              value={lokcomValue}
              onChange={handleLokcomSelect}
              color="teal"
              label={dictionary.universal.location[lang]}
            >
              {lokcom.map((p) => (
                <Option value={p.lokcomid} key={p.lokcomid}>
                  {p.lokcomvalue}
                </Option>
              ))}
            </Select>:null
            } */}
           
            <Button variant="gradient" color="blue-gray" onClick={() => setOpen(false)} className="w-full flex-1">
              Kembali
            </Button>
            <Button variant="gradient" color="blue" onClick={() => handleDownload()} className="w-full flex-1">
              Xls Downlaod
            </Button>
            <Button
              variant="gradient"
              color={"green"}
              onClick={() => handlePrintNew()}
              className="w-full flex-1"
            >
              <span>{"Cetak"}</span>
            </Button>
          </DialogFooter>
        </Dialog>
        {
          consolemode ? 
          <TransactionMonthFilter
            open={openFilter}
            onClose={() => setOpenFilter(false)}
            onApply={(newFilter) => {
              setFilters(newFilter);
              setOpenFilter(false);
            }}
          /> : 
          <LaporanFilter
            open={openFilter}
            onClose={() => setOpenFilter(false)}
            onApply={(newFilter) => {
              setFilters(newFilter);
              setOpenFilter(false);
            }}
            categories={categoriesFilter}
          />}
        
        
      </div>
      
    </Fragment>
  );
}
