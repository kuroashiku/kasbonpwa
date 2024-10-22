import { Fragment, useCallback, useContext, useEffect, useRef, useState } from "react";
import { getSupplier, saveSupplier, deleteSupplier } from "../../api/Supplier";
import { getBestselling, getGrossProfit, getNetProfit, getOmzet, getOmzetHarian } from "../../api/Laporan";
import { AppContext } from "../../AppContext";
import { Button, Card, Dialog, DialogHeader, DialogBody, DialogFooter, IconButton, List, ListItem, ListItemSuffix,
  Navbar, Typography, Textarea,} from "@material-tailwind/react";
import SearchNavbar from "../../lib/SearchNavbar";
import { Bars3Icon, PlusCircleIcon, AdjustmentsVerticalIcon  } from "@heroicons/react/24/outline";
import { HomeIcon, PencilSquareIcon, PhoneIcon } from "@heroicons/react/24/solid";
import { SupplierListModel } from "../../model/supplier";
import { dictionary } from "../../constant/appDictionary";
import { useNavigate } from "react-router-dom";
import LoadingOverlay from "../../lib/LoadingOverlay";
import { topic } from "../../constant/appTopics";
import { TIME_SEARCH_DEBOUNCE } from "../../constant/appCommon";
import InputSimple from "../../lib/InputSimple";
import { formatThousandSeparator } from "../../util/formatter";
import TransactionFilter from "../transaction/TransactionFilter";
import FilterChips from "../../lib/FilterChips";

export default function LaporanList() {
  const { setMenuOpen, filters, currency, setFilters, lang, dataLogin, cookies } = useContext(AppContext);
  const [listPadding, setListPadding] = useState("20px");
  const [loading, setLoading] = useState(true);
  const [suppliers, setSuppliers] = useState([SupplierListModel()]);
  const [itemDisplay, setItemDisplay] = useState(SupplierListModel());
  const navbarRef = useRef();
  const [open, setOpen] = useState(false);
  const [newOpen, setNewOpen] = useState(false);
  const [readonly, setReadonly] = useState(false);
  const [supplierById, setSupplierById] = useState({});
  const [supplierId, setSupplierId] = useState(-1);
  const [txtTitle, settxtTitle] = useState("");
  const [mode, setMode] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [dataReport, setDataReport] = useState([]);
  const [selectReport, setSelectReport] = useState("");
  const navigate = useNavigate();
  const [openFilter, setOpenFilter] = useState(false);

  const handleFilter = (searchKey) => {
    setKeyword(searchKey);
  };

  const openDrawerRight = () => setOpenFilter(true);

  function handleOpen(item, setedit, index) {
    //setitmindex(index)
    if (setedit == true) {
      setReadonly(false);
      cookies.role_update.length == 0 && cookies.role_dst.length == 0
        ? setOpen(!open)
        : cookies.role_dst.findIndex((a) => a == "ALL") >= 0
        ? setOpen(!open)
        : cookies.role_update.findIndex((a) => a == "SUPP") >= 0
        ? setOpen(!open)
        : setOpen(false);
      setSupplierById(item);
      settxtTitle("Ubah Supplier");
      setMode(2);
    } else {
      setReadonly(true);
      setOpen(!open);
      setSupplierById(item);
      settxtTitle("Detail Supplier");
      setMode(1);
    }
  }
  const [inner,setInner] = useState(false); //using react hooks for cleaner code, you can use class based states also
  useEffect(() => {
    setTimeout(() => setInner(true),2500); //same as the logic in the fiddle shared
  },[]) // same as ComponentDidMount in class based component
  const handleBestSelling = useCallback(async () => {
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
      }
      else{
        var dateParseMax=new Date(_dateFilter.value);
        var dateIsoParseMax=(dateParseMax.toISOString()).substring(0, 10)
        var dateIsoParseMaxSplit=dateIsoParseMax.split("-");

        var dateParseMin=new Date(_dateFilter.value);
        var dateIsoParseMin=(dateParseMin.toISOString()).substring(0, 10)
        var dateIsoParseMinSplit=dateIsoParseMin.split("-");
      }
    }
    else{
      var dateParseMax=new Date();
      var dateIsoParseMax=(dateParseMax.toISOString()).substring(0, 10)
      var dateIsoParseMaxSplit=dateIsoParseMax.split("-");

      var dateParseMin=new Date();
      var dateIsoParseMin=(dateParseMin.toISOString()).substring(0, 10)
      var dateIsoParseMinSplit=dateIsoParseMin.split("-");
    }
    
    const { content, content_data, error } = await getBestselling({
      lok_id:cookies.lok_id,
      command:'bestselling*'+dateIsoParseMinSplit[2]+'-'+dateIsoParseMinSplit[1]+'-'+dateIsoParseMinSplit[0]+'*'+dateIsoParseMaxSplit[2]+'-'+dateIsoParseMaxSplit[1]+'-'+dateIsoParseMaxSplit[0]
    });
    if (error) {
      alert("Data tidak ditemukan");
    } else {
      setOpen(true);
      setDataReport(content_data);
      setSelectReport('bestselling');
      
      var parent = document.getElementById('ids');
      parent.insertAdjacentHTML('beforeend', '<div id="ids2"></div>');
      document.getElementById("ids2").innerHTML = "";
      var parent2 = document.getElementById('ids2');
      parent2.insertAdjacentHTML('beforeend', content);
    }
  }, [filters]);
  const handleBestValue = useCallback(async () => {
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
      }
      else{
        var dateParseMax=new Date(_dateFilter.value);
        var dateIsoParseMax=(dateParseMax.toISOString()).substring(0, 10)
        var dateIsoParseMaxSplit=dateIsoParseMax.split("-");

        var dateParseMin=new Date(_dateFilter.value);
        var dateIsoParseMin=(dateParseMin.toISOString()).substring(0, 10)
        var dateIsoParseMinSplit=dateIsoParseMin.split("-");
      }
    }
    else{
      var dateParseMax=new Date();
      var dateIsoParseMax=(dateParseMax.toISOString()).substring(0, 10)
      var dateIsoParseMaxSplit=dateIsoParseMax.split("-");

      var dateParseMin=new Date();
      var dateIsoParseMin=(dateParseMin.toISOString()).substring(0, 10)
      var dateIsoParseMinSplit=dateIsoParseMin.split("-");
    }
    const { content, content_data, error } = await getBestselling({
      lok_id:cookies.lok_id,
      command:'bestvalue*'+dateIsoParseMinSplit[2]+'-'+dateIsoParseMinSplit[1]+'-'+dateIsoParseMinSplit[0]+'*'+dateIsoParseMaxSplit[2]+'-'+dateIsoParseMaxSplit[1]+'-'+dateIsoParseMaxSplit[0]
    });
    if (error) {
      alert("Data tidak ditemukan");
    } else {
      setOpen(true);
      setDataReport(content_data);
      setSelectReport('bestvalue');

      var parent = document.getElementById('ids');
      parent.insertAdjacentHTML('beforeend', '<div id="ids2"></div>');
      document.getElementById("ids2").innerHTML = "";
      var parent2 = document.getElementById('ids2');
      parent2.insertAdjacentHTML('beforeend', content);
    }
  }, [filters]);
  const handleGrossProfit = useCallback(async () => {
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
      }
      else{
        var dateParseMax=new Date(_dateFilter.value);
        var dateIsoParseMax=(dateParseMax.toISOString()).substring(0, 10)
        var dateIsoParseMaxSplit=dateIsoParseMax.split("-");

        var dateParseMin=new Date(_dateFilter.value);
        var dateIsoParseMin=(dateParseMin.toISOString()).substring(0, 10)
        var dateIsoParseMinSplit=dateIsoParseMin.split("-");
      }
    }
    else{
      var dateParseMax=new Date();
      var dateIsoParseMax=(dateParseMax.toISOString()).substring(0, 10)
      var dateIsoParseMaxSplit=dateIsoParseMax.split("-");

      var dateParseMin=new Date();
      var dateIsoParseMin=(dateParseMin.toISOString()).substring(0, 10)
      var dateIsoParseMinSplit=dateIsoParseMin.split("-");
    }
    const { content, content_data, error } = await getGrossProfit({
      lok_id:cookies.lok_id,
      command:'grossprofit*'+dateIsoParseMinSplit[2]+'-'+dateIsoParseMinSplit[1]+'-'+dateIsoParseMinSplit[0]+'*'+dateIsoParseMaxSplit[2]+'-'+dateIsoParseMaxSplit[1]+'-'+dateIsoParseMaxSplit[0]
    });
    if (error) {
      alert("Data tidak ditemukan");
    } else {
      // setLoading(true);
      setOpen(true);
      setDataReport(content_data);
      setSelectReport('grossprofit');

      var parent = document.getElementById('ids');
      parent.insertAdjacentHTML('beforeend', '<div id="ids2"></div>');
      document.getElementById("ids2").innerHTML = "";
      var parent2 = document.getElementById('ids2');
      parent2.insertAdjacentHTML('beforeend', content);
    }
  }, [filters]);
  const handleNetProfit = useCallback(async () => {
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
      }
      else{
        var dateParseMax=new Date(_dateFilter.value);
        var dateIsoParseMax=(dateParseMax.toISOString()).substring(0, 10)
        var dateIsoParseMaxSplit=dateIsoParseMax.split("-");

        var dateParseMin=new Date(_dateFilter.value);
        var dateIsoParseMin=(dateParseMin.toISOString()).substring(0, 10)
        var dateIsoParseMinSplit=dateIsoParseMin.split("-");
      }
    }
    else{
      var dateParseMax=new Date();
      var dateIsoParseMax=(dateParseMax.toISOString()).substring(0, 10)
      var dateIsoParseMaxSplit=dateIsoParseMax.split("-");

      var dateParseMin=new Date();
      var dateIsoParseMin=(dateParseMin.toISOString()).substring(0, 10)
      var dateIsoParseMinSplit=dateIsoParseMin.split("-");
    }
    const { content, content_data, error } = await getNetProfit({
      lok_id:cookies.lok_id,
      command:'netprofit*'+dateIsoParseMinSplit[2]+'-'+dateIsoParseMinSplit[1]+'-'+dateIsoParseMinSplit[0]+'*'+dateIsoParseMaxSplit[2]+'-'+dateIsoParseMaxSplit[1]+'-'+dateIsoParseMaxSplit[0]
    });
    if (error) {
      alert("Data tidak ditemukan");
    } else {
      setOpen(true);
      setDataReport(content_data);
      setSelectReport('netprofit');

      var parent = document.getElementById('ids');
      parent.insertAdjacentHTML('beforeend', '<div id="ids2"></div>');
      document.getElementById("ids2").innerHTML = "";
      var parent2 = document.getElementById('ids2');
      parent2.insertAdjacentHTML('beforeend', content);
    }
  }, [filters]);
  const handleOmzet = useCallback(async () => {
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
      }
      else{
        var dateParseMax=new Date(_dateFilter.value);
        var dateIsoParseMax=(dateParseMax.toISOString()).substring(0, 10)
        var dateIsoParseMaxSplit=dateIsoParseMax.split("-");

        var dateParseMin=new Date(_dateFilter.value);
        var dateIsoParseMin=(dateParseMin.toISOString()).substring(0, 10)
        var dateIsoParseMinSplit=dateIsoParseMin.split("-");
      }
    }
    else{
      var dateParseMax=new Date();
      var dateIsoParseMax=(dateParseMax.toISOString()).substring(0, 10)
      var dateIsoParseMaxSplit=dateIsoParseMax.split("-");

      var dateParseMin=new Date();
      var dateIsoParseMin=(dateParseMin.toISOString()).substring(0, 10)
      var dateIsoParseMinSplit=dateIsoParseMin.split("-");
    }
    const { content, content_data, error } = await getOmzet({
      lok_id:cookies.lok_id,
      command:'omzet*'+dateIsoParseMinSplit[2]+'-'+dateIsoParseMinSplit[1]+'-'+dateIsoParseMinSplit[0]+'*'+dateIsoParseMaxSplit[2]+'-'+dateIsoParseMaxSplit[1]+'-'+dateIsoParseMaxSplit[0]
    });
    if (error) {
      alert("Data tidak ditemukan");
    } else {
      setOpen(true);
      setDataReport(content_data);
      setSelectReport('omzet');

      var parent = document.getElementById('ids');
      parent.insertAdjacentHTML('beforeend', '<div id="ids2"></div>');
      document.getElementById("ids2").innerHTML = "";
      var parent2 = document.getElementById('ids2');
      parent2.insertAdjacentHTML('beforeend', content);
    }
  }, [filters]);
  const handleOmzetHarian = useCallback(async () => {
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
      }
      else{
        var dateParseMax=new Date(_dateFilter.value);
        var dateIsoParseMax=(dateParseMax.toISOString()).substring(0, 10)
        var dateIsoParseMaxSplit=dateIsoParseMax.split("-");

        var dateParseMin=new Date(_dateFilter.value);
        var dateIsoParseMin=(dateParseMin.toISOString()).substring(0, 10)
        var dateIsoParseMinSplit=dateIsoParseMin.split("-");
      }
    }
    else{
      var dateParseMax=new Date();
      var dateIsoParseMax=(dateParseMax.toISOString()).substring(0, 10)
      var dateIsoParseMaxSplit=dateIsoParseMax.split("-");

      var dateParseMin=new Date();
      var dateIsoParseMin=(dateParseMin.toISOString()).substring(0, 10)
      var dateIsoParseMinSplit=dateIsoParseMin.split("-");
    }
    const { content, content_data, error } = await getOmzetHarian({
      lok_id:cookies.lok_id,
      command:'omzetharian*'+dateIsoParseMinSplit[2]+'-'+dateIsoParseMinSplit[1]+'-'+dateIsoParseMinSplit[0]+'*'+dateIsoParseMaxSplit[2]+'-'+dateIsoParseMaxSplit[1]+'-'+dateIsoParseMaxSplit[0]
    });
    if (error) {
      alert("Data tidak ditemukan");
    } else {
      setOpen(true);
      setDataReport(content_data);
      setSelectReport('omzetharian');

      var parent = document.getElementById('ids');
      parent.insertAdjacentHTML('beforeend', '<div id="ids2"></div>');
      document.getElementById("ids2").innerHTML = "";
      var parent2 = document.getElementById('ids2');
      parent2.insertAdjacentHTML('beforeend', content);
    }
  }, [filters]);

  const handlePrint = useCallback(async () => {
    var contents = document.getElementById("ids").innerHTML;
    var frame1 = document.createElement('iframe');
    frame1.name = "frame1";
    frame1.style.position = "absolute";
    frame1.style.top = "-1000000px";
    document.body.appendChild(frame1);
    var frameDoc = frame1.contentWindow ? frame1.contentWindow : frame1.contentDocument.document ? frame1.contentDocument.document : frame1.contentDocument;
    var styleorientasi = ''
    // if(orientasi!='portrait')
    // styleorientasi = '<style type="text/css" media="print">@page { size: landscape; } body {-webkit-print-color-adjust: exact;}</style>'

    frameDoc.document.open();
    frameDoc.document.write('<html><head>'+styleorientasi+'<title>Laporan</title>');
    frameDoc.document.write('</head><body>');
    frameDoc.document.write(contents);
    frameDoc.document.write('</body></html>');
    frameDoc.document.close();
    setTimeout(function () {
        window.frames["frame1"].focus();
        window.frames["frame1"].print();
        document.body.removeChild(frame1);
    }, 500);
  }, []);

  useEffect(() => {
    if (!cookies.lok_id) {
      navigate(topic.login.route);
    }
    const handleResponse = ({ data, error }) => {
      if (error) {
        alert("Data tidak ditemukan");
      } else {
        setSuppliers(data);
      }
    };
    const init = async () => {
      if (keyword && keyword.length > 1) {
        const orderSearch = setTimeout(async () => {
          setLoading(true);
          const { data, error } = await getSupplier({ com_id: cookies.com_id, key_val: keyword });
          handleResponse({ data, error });
          setLoading(false);
        }, TIME_SEARCH_DEBOUNCE);
        return () => {
          clearTimeout(orderSearch);
        };
      } else if (!keyword) {
        setLoading(true);
        setSuppliers([]);
        const { data, error } = await getSupplier({ com_id: cookies.com_id });
        handleResponse({ data, error });
        setLoading(false);
      }
    };
    init();
  }, [keyword]);

  useEffect(() => {
    setListPadding(`${navbarRef.current.offsetHeight + 20}px`);
  }, [filters]);


  const TableView = () => {
    
    if (selectReport=="grossprofit") {
      return (
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              <th><Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">No</Typography></th>
              <th><Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">Tanggal</Typography></th>
              <th><Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">Income</Typography></th>
              <th><Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">Outcome</Typography></th>
              <th><Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">Gross Profit</Typography></th>
            </tr>
          </thead>
          <tbody>
          {dataReport?.map((i, index) => {
            return(
              <tr>
                <td><Typography variant="small" color="blue-gray" className="font-normal">{index+1}</Typography></td>
                <td><Typography variant="small" color="blue-gray" className="font-normal">{i.tanggal}</Typography></td>
                <td><Typography variant="small" color="blue-gray" className="font-normal">{i.income==0?"0":currency+" "+formatThousandSeparator(parseFloat(i.income))}</Typography></td>
                <td><Typography variant="small" color="blue-gray" className="font-normal">{i.outcome==0?"0":currency+" "+formatThousandSeparator(parseFloat(i.outcome))}</Typography></td>
                <td><Typography variant="small" color="blue-gray" className="font-normal">{i.grossprofit==0?"0":currency+" "+formatThousandSeparator(parseFloat(i.grossprofit))}</Typography></td>
              </tr>
            )
          })}
          </tbody>
        </table>
      );
    }
    else if (selectReport=="netprofit") {
      return (
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              <th><Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">No</Typography></th>
              <th><Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">Tanggal</Typography></th>
              <th><Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">Income</Typography></th>
              <th><Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">RcvOutcome</Typography></th>
              <th><Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">OprOutcome</Typography></th>
              <th><Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">Net Profit</Typography></th>
            </tr>
          </thead>
          <tbody>
          {dataReport?.map((i, index) => {
            return(
              <tr>
                <td><Typography variant="small" color="blue-gray" className="font-normal">{index+1}</Typography></td>
                <td><Typography variant="small" color="blue-gray" className="font-normal">{i.tanggal}</Typography></td>
                <td><Typography variant="small" color="blue-gray" className="font-normal">{i.income==0?"0":currency+" "+formatThousandSeparator(parseFloat(i.income))}</Typography></td>
                <td><Typography variant="small" color="blue-gray" className="font-normal">{i.rcvoutcome==0?"0":currency+" "+formatThousandSeparator(parseFloat(i.rcvoutcome))}</Typography></td>
                <td><Typography variant="small" color="blue-gray" className="font-normal">{i.oproutcome==0?"0":currency+" "+formatThousandSeparator(parseFloat(i.oproutcome))}</Typography></td>
                <td><Typography variant="small" color="blue-gray" className="font-normal">{i.netprofit==0?"0":currency+" "+formatThousandSeparator(parseFloat(i.netprofit))}</Typography></td>
              </tr>
            )
          })}
          </tbody>
        </table>
      );
    }
    else if (selectReport=="bestselling"||selectReport=="bestvalue") {
      return (
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              <th><Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">No</Typography></th>
              <th><Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">Kode</Typography></th>
              <th><Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">Nama Item</Typography></th>
              <th><Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">Total Qty</Typography></th>
              <th><Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">Satuan</Typography></th>
              <th><Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">Total Price</Typography></th>
            </tr>
          </thead>
          <tbody>
          {dataReport?.map((i, index) => {
            return(
              <tr>
                <td><Typography variant="small" color="blue-gray" className="font-normal">{index+1}</Typography></td>
                <td><Typography variant="small" color="blue-gray" className="font-normal">{i.itm_kode}</Typography></td>
                <td><Typography variant="small" color="blue-gray" className="font-normal">{i.itm_nama}</Typography></td>
                <td><Typography variant="small" color="blue-gray" className="font-normal">{parseInt(i.totqty)}</Typography></td>
                <td><Typography variant="small" color="blue-gray" className="font-normal">{i.itm_satuan1}</Typography></td>
                <td><Typography variant="small" color="blue-gray" className="font-normal">{i.totnilai==0?"0":currency+" "+formatThousandSeparator(parseFloat(i.totnilai))}</Typography></td>
              </tr>
            )
          })}
          </tbody>
        </table>
      );
    }
    else if (selectReport=="omzet") {
      return (
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              <th><Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">No</Typography></th>
              <th><Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">Nomor Nota</Typography></th>
              <th><Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">Item</Typography></th>
              <th><Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">Jumlah</Typography></th>
              <th><Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">Harga</Typography></th>
            </tr>
          </thead>
          <tbody>
          {dataReport?.map((i, index) => {
            return(
              <tr>
                <td><Typography variant="small" color="blue-gray" className="font-normal">{index+1}</Typography></td>
                <td><Typography variant="small" color="blue-gray" className="font-normal">{i.not_nomor}</Typography></td>
                <td><Typography variant="small" color="blue-gray" className="font-normal">{i.itm_nama}</Typography></td>
                <td><Typography variant="small" color="blue-gray" className="font-normal">{i.nit_qty}</Typography></td>
                <td><Typography variant="small" color="blue-gray" className="font-normal">{i.nit_total==0?"0":currency+" "+formatThousandSeparator(parseFloat(i.nit_total))}</Typography></td>
              </tr>
            )
          })}
          </tbody>
        </table>
      );
    }
    else if (selectReport=="omzetharian") {
      return (
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              <th><Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">No</Typography></th>
              <th><Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">Check In</Typography></th>
              <th><Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">Check Out</Typography></th>
              <th><Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">Nama Kasir</Typography></th>
              <th><Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">Modal Awal</Typography></th>
              <th><Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">Modal Akhir</Typography></th>
              <th><Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">Omzet</Typography></th>
            </tr>
          </thead>
          <tbody>
          {dataReport?.map((i, index) => {
            return(
              <tr>
                <td><Typography variant="small" color="blue-gray" className="font-normal">{index+1}</Typography></td>
                <td><Typography variant="small" color="blue-gray" className="font-normal">{i.mod_checkin}</Typography></td>
                <td><Typography variant="small" color="blue-gray" className="font-normal">{i.mod_checkout}</Typography></td>
                <td><Typography variant="small" color="blue-gray" className="font-normal">{i.kas_nama}</Typography></td>
                <td><Typography variant="small" color="blue-gray" className="font-normal">{i.mod_awal==0?"0":currency+" "+formatThousandSeparator(parseFloat(i.mod_awal))}</Typography></td>
                <td><Typography variant="small" color="blue-gray" className="font-normal">{i.mod_akhir==0?"0":currency+" "+formatThousandSeparator(parseFloat(i.mod_akhir))}</Typography></td>
                <td><Typography variant="small" color="blue-gray" className="font-normal">{i.omzet==0?"0":currency+" "+formatThousandSeparator(parseFloat(i.omzet))}</Typography></td>
              </tr>
            )
          })}
          </tbody>
        </table>
      );
    }
  };

  return (
    <Fragment>
      {!loading ? null : <LoadingOverlay white />}
      <div className="h-screen-adapt bg-gray-50 overflow-hidden relative">
        {/* <div className="top-0 inset-x-0 fixed bg-gradient-to-b from-gray-50 h-20" /> */}
        <div className="p-2 top-0 inset-x-0 fixed z-50 mx-auto desktop:max-w-[60%]">
        <Navbar ref={navbarRef} className={`pt-2 px-2 ${!filters.length ? "pb-6" : "pb-4"} relative`} blurred={false}>
            <div className="flex items-center">
              <IconButton variant="text" size="md" onClick={() => setMenuOpen(true)}>
                <Bars3Icon className="h-6 w-6 stroke-2" />
              </IconButton>
              <div className="mx-2 flex-grow">
                <SearchNavbar onSearch={handleFilter} value={keyword} label="Cari Laporan" />
              </div>
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
            <ListItem className="flex items-center justify-between px-[3px]">
              <div className="w-[90%] pr-2 flex-1" onClick={() => handleBestSelling()}>
                <div className="info flex flex-col gap-2">
                  <Typography variant="small" color="gray" className="text-[14px] font-medium">
                    <b>Best Selling</b>
                  </Typography>
                </div>
              </div>
            </ListItem>
            <ListItem className="flex items-center justify-between px-[3px]">
              <div className="w-[90%] pr-2 flex-1" onClick={() => handleBestValue()}>
                <div className="info flex flex-col gap-2">
                  <Typography variant="small" color="gray" className="text-[14px] font-medium">
                    <b>Best Value</b>
                  </Typography>
                </div>
              </div>
            </ListItem>
            <ListItem className="flex items-center justify-between px-[3px]">
              <div className="w-[90%] pr-2 flex-1" onClick={() => handleGrossProfit()}>
                <div className="info flex flex-col gap-2">
                  <Typography variant="small" color="gray" className="text-[14px] font-medium">
                    <b>Gross Profit</b>
                  </Typography>
                </div>
              </div>
            </ListItem>
            <ListItem className="flex items-center justify-between px-[3px]">
              <div className="w-[90%] pr-2 flex-1" onClick={() => handleNetProfit()}>
                <div className="info flex flex-col gap-2">
                  <Typography variant="small" color="gray" className="text-[14px] font-medium">
                    <b>Net Profit</b>
                  </Typography>
                </div>
              </div>
            </ListItem>
            <ListItem className="flex items-center justify-between px-[3px]">
              <div className="w-[90%] pr-2 flex-1" onClick={() => handleOmzet()}>
                <div className="info flex flex-col gap-2">
                  <Typography variant="small" color="gray" className="text-[14px] font-medium">
                    <b>Omzet</b>
                  </Typography>
                </div>
              </div>
            </ListItem>
            <ListItem className="flex items-center justify-between px-[3px]">
              <div className="w-[90%] pr-2 flex-1" onClick={() => handleOmzetHarian()}>
                <div className="info flex flex-col gap-2">
                  <Typography variant="small" color="gray" className="text-[14px] font-medium">
                    <b>Omzet Harian</b>
                  </Typography>
                </div>
              </div>
            </ListItem>
          </List>
          {/* <div className="fixed bottom-4 right-4">
            <IconButton variant="filled" color="teal" className="rounded-full" size="lg" onClick={() => handleAdd()}>
              <PlusCircleIcon className="h-8 w-8 text-black-500" />
            </IconButton>
          </div> */}
        </div>

        {/* <Dialog open={open} handler={handleOpen}>
          <DialogHeader className="text-lg text-blue-gray-700">Preview</DialogHeader>
          <DialogBody className="p-0">
            <div className="search-bar w-[90%] mx-auto mt-1">
              <SearchNavbar onSearch={handleFilterItem} value={keywordItem} label="Cari Penerimaan" />
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
        </Dialog> */}

        <Dialog open={open} handler={handleOpen}>
          <DialogHeader className="text-[20px] text-[#606060]">Preview</DialogHeader>
          <DialogBody className="max-h-[60vh] overflow-y-auto">
            <List>
              <ListItem className="">
                {TableView()}
              </ListItem>
            </List>
          </DialogBody>
          <DialogFooter className="flex gap-3 justify-between">
            <Button variant="gradient" color="blue-gray" onClick={() => setOpen(false)} className="w-full flex-1">
              Kembali
            </Button>
            <Button
              variant="gradient"
              color={"green"}
              onClick={() => handlePrint()}
              className="w-full flex-1"
            >
              <span>{"Cetak"}</span>
            </Button>
          </DialogFooter>
        </Dialog>
        <TransactionFilter
          open={openFilter}
          onClose={() => setOpenFilter(false)}
          onApply={(newFilter) => {
            setFilters(newFilter);
            setOpenFilter(false);
          }}
        />
        <div id="ids"></div>
      </div>
      
    </Fragment>
  );
}
