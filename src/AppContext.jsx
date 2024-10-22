import { createContext, useCallback, useEffect, useRef, useState } from "react";
import { paymentModes } from "./constant/appEnum";
import { ItemCheckoutModel } from "./model/item";
import { useCookies } from "react-cookie";
import { DEFAULT_ROW_PER_PAGE, PRINTER_STATE_BT, PRINTER_STATE_NONE, PRINTER_STATE_USB } from "./constant/appCommon";
import { connectPrinterBT, printBT } from "./util/printerBT";
import { connectPrinterUSB, printUSB } from "./util/printerUSB";

export const AppContext = createContext({
  search: "",
  setSearch: () => {},
  filters: [],
  setFilters: () => {},
  isMenuOpen: false,
  setMenuOpen: () => {},
  lang: "ID",
  setLanguage: () => {},
  totalPay: 0,
  setTotalPay: () => {},
  money: 0,
  setMoney: () => {},
  currency: "Rp",
  setCurrency: () => {},
  defaultPayment: paymentModes[0].code,
  setDefaultPayment: () => {},
  itemsCheckout: [ItemCheckoutModel()],
  setItemsCheckout: () => {},
  notaItemsCheckout: [ItemCheckoutModel()],
  setNotaItemsCheckout: () => {},
  dataLogin: [],
  setDataLogin: () => {},
  cookies: null,
  setCookies: () => {},
  removeCookies: () => {},
  countCustomer: 0,
  setCountCustomer: () => {},
  countSupplier: 0,
  setCountSupplier: () => {},
  rowsPerPage: DEFAULT_ROW_PER_PAGE,
  setRowsPerPage: () => {},
  isMobile: true,
  setMobile: () => {},
  desktopMode: false,
  setDesktopMode: () => {},
  semiDesktopMode: false,
  setSemiDesktopMode: () => {},
  diskonGlobal: "",
  setDiskonGlobal: () => {},
  pajakGlobal: "",
  setPajakGlobal: () => {},
  generalSetting: [],
  setGeneralSetting: () => {},
  catatanGlobal: "",
  setCatatanGlobal: () => {},
  printerState: PRINTER_STATE_NONE,
  setPrinterState: () => {},
  printerBT: null,
  initPrinterBT: () => {},
  printerUSB: null,
  initPrinterUSB: () => {},
  print: () => {},
  tableGlobal: "",
  setTableGlobal: () => {},
  customerGlobal: "",
  setCustomerGlobal: () => {},
  itemsCheckoutBill:[],
  setItemsCheckoutBill: ()=>{},
  totalPaySplitBill: [],
  setTotalPaySplitBill:()=>{},
  moneySplitBill: [],
  setMoneySplitBill: ()=>{},
  bill: [],
  setBill: ()=>{},
  notaItemsCheckoutBill:[],
  setNotaItemsCheckoutBill: ()=>{},
  pajakGlobalJSON: {},
  setPajakGlobalJSON: () => {},
  totalPrice: 0,
  setTotalPrice: () => {},
  totalPayTemp: 0,
  setTotalPayTemp: () => {},
  totalPriceBill: [],
  setTotalPriceBill: () => {},
});

export const AppProvider = ({ children = <div /> }) => {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState([]);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [lang, setLanguage] = useState("ID");
  const [totalPay, setTotalPay] = useState(23200);
  const [money, setMoney] = useState(0);
  const [currency, setCurrency] = useState("Rp");
  const [defaultPayment, setDefaultPayment] = useState(paymentModes[0].code);
  const [itemsCheckout, setItemsCheckout] = useState([]);
  const [notaItemsCheckout, setNotaItemsCheckout] = useState([]);
  const [dataLogin, setDataLogin] = useState([]);
  const [cookies, setCookies, removeCookies] = useCookies([
    "lok_id",
    "com_id",
    "kas_id",
    "kas_nama",
    "max_draft",
    "scan_mode",
    "max_piutang",
    "auto_logout",
    "lok_type",
    "dp_0",
    "time_now",
    "resto_type",
    "role_read",
    "role_create",
    "role_update",
    "role_delete",
    "role_dst",
    "qris",
    "role_nama",
    "split_bill",
    "join_bill"
  ]);
  const [countCustomer, setCountCustomer] = useState(0);
  const [countSupplier, setCountSupplier] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ROW_PER_PAGE);
  const [isMobile, setMobile] = useState(false);
  const [desktopMode, setDesktopMode] = useState(false);
  const [semiDesktopMode, setSemiDesktopMode] = useState(false);
  const [diskonGlobal, setDiskonGlobal] = useState('');
  const [pajakGlobal, setPajakGlobal] = useState(0);
  const [generalSetting, setGeneralSetting] = useState([
    { gen_id: 1, gen_nama: "Batas Draft", gen_value: "tidak_terbatas" },
    { gen_id: 2, gen_nama: "Maximum Piutang", gen_value: "20000" },
    { gen_id: 3, gen_nama: "Mode Scan", gen_value: "non_aktif" },
  ]);
  const [catatanGlobal, setCatatanGlobal] = useState("");
  const [printerLoading, setPrinterLoading] = useState(false);
  const [printerState, setPrinterState] = useState(PRINTER_STATE_NONE);
  const printerBT = useRef(null);
  const printerUSB = useRef(null);
  const [tableGlobal, setTableGlobal] = useState("");
  const [customerGlobal, setCustomerGlobal] = useState("");
  const [itemsCheckoutBill, setItemsCheckoutBill] = useState([]);
  const [notaItemsCheckoutBill, setNotaItemsCheckoutBill] = useState([]);
  const [totalPaySplitBill, setTotalPaySplitBill] = useState([]);
  const [moneySplitBill, setMoneySplitBill] = useState([]);
  const [bill, setBill] = useState([]);
  const [pajakGlobalJSON, setPajakGlobalJSON] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalPayTemp, setTotalPayTemp] = useState(0);
  const [totalPriceBill, setTotalPriceBill] = useState([]);
  useEffect(() => {
    // setMobile(!window.matchMedia("(min-width: 575px)").matches);
    // console.log(window.innerWidth, window.innerWidth > 1345);
    setMobile(window.innerWidth <= 720);
    setDesktopMode(window.innerWidth > 1345);
    setSemiDesktopMode(window.innerWidth > 720 && window.innerWidth <= 1345);
  }, []);

  const initPrinterUSB = useCallback(async () => {
    setPrinterLoading(true);
    printerUSB.current = await connectPrinterUSB();
    if (printerUSB.current) {
      setPrinterState(PRINTER_STATE_USB);
      alert("Printer Berhasil Dihubungkan");
    }
    setPrinterLoading(false);
  }, []);

  const initPrinterBT = useCallback(async () => {
    setPrinterLoading(true);
    printerBT.current = await connectPrinterBT();
    if (printerBT.current) {
      setPrinterState(PRINTER_STATE_BT);
      alert("Printer Berhasil Dihubungkan");
    }
    setPrinterLoading(false);
  }, []);

  const print = useCallback(
    async (data) => {
      if (printerState === PRINTER_STATE_BT) {
        if (!printerBT.current) {
          initPrinterBT();
        }
        printBT(printerBT.current, data);
      } else if (printerState === PRINTER_STATE_USB) {
        if (!printerUSB.current) {
          initPrinterUSB();
        }
        printUSB(printerUSB.current, data);
      } else {
        alert("Printer belum disambungkan");
      }
    },
    [printerBT, printerUSB, printerState]
  );

  return (
    <AppContext.Provider
      value={{
        search,
        setSearch,
        filters,
        setFilters,
        isMenuOpen,
        setMenuOpen,
        lang,
        setLanguage,
        totalPay,
        setTotalPay,
        money,
        setMoney,
        currency,
        setCurrency,
        defaultPayment,
        setDefaultPayment,
        itemsCheckout,
        setItemsCheckout,
        notaItemsCheckout,
        setNotaItemsCheckout,
        dataLogin,
        setDataLogin,
        cookies,
        setCookies,
        removeCookies,
        countCustomer,
        setCountCustomer,
        countSupplier,
        setCountSupplier,
        rowsPerPage,
        setRowsPerPage,
        isMobile,
        setMobile,
        desktopMode,
        setDesktopMode,
        semiDesktopMode,
        setSemiDesktopMode,
        diskonGlobal,
        setDiskonGlobal,
        pajakGlobal,
        setPajakGlobal,
        generalSetting,
        setGeneralSetting,
        catatanGlobal,
        setCatatanGlobal,
        printerBT,
        initPrinterBT,
        print,
        printerUSB,
        initPrinterUSB,
        printerLoading,
        tableGlobal,
        setTableGlobal,
        customerGlobal,
        setCustomerGlobal,
        printerState,
        setPrinterState,
        itemsCheckoutBill,
        setItemsCheckoutBill,
        totalPaySplitBill,
        setTotalPaySplitBill,
        moneySplitBill,
        setMoneySplitBill,
        bill,
        setBill,
        notaItemsCheckoutBill,
        setNotaItemsCheckoutBill,
        pajakGlobalJSON,
        setPajakGlobalJSON,
        totalPrice,
        setTotalPrice,
        totalPayTemp,
        setTotalPayTemp,
        totalPriceBill,
        setTotalPriceBill,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
