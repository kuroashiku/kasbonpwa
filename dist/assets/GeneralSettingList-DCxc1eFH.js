import { y as httpPost, z as API_HOST, r as reactExports, A as AppContext, c as convertItemListToCheckout, j as jsxRuntimeExports, L as LoadingOverlay, a as react } from "./index-CGEICd-f.js";
import { l as lodashExports } from "./lodash-C34_XwDM.js";
import { g as getItems } from "./Item-Btr_yyWl.js";
import { g as getTransaction } from "./Transaction-DU-UTb94.js";
import { b as bayarPos } from "./Pos-68rCAtrO.js";
import { a as formatBackToNumber, f as formatThousandSeparator } from "./formatter-DQiSfF1K.js";
import { B as Bars3Icon } from "./Bars3Icon-BPkb_aHs.js";
const GetGeneralSettingReqBody = () => ({
  lok_id: 0
});
const saveGeneralSetting = (body = GetGeneralSettingReqBody()) => {
  return httpPost(`${API_HOST}/generalsetting/save`, body);
};
function GeneralSettingList() {
  const { setMenuOpen, currency, cookies, setCookies } = reactExports.useContext(AppContext);
  const [listPadding, setListPadding] = reactExports.useState("20px");
  const [loading, setLoading] = reactExports.useState(false);
  const [generalSettings, setGeneralSettings] = reactExports.useState([]);
  const [generalSettingsTemp, setGeneralSettingsTemp] = reactExports.useState([]);
  const [generalSettingContains, setGeneralSettingContains] = reactExports.useState([
    { gen_id: 1, gen_nama: "Maximum Draft", gen_value: cookies.max_draft, gen_prop: "gen_set_max_draft" },
    { gen_id: 2, gen_nama: "Auto Logout", gen_value: cookies.auto_logout, gen_prop: "gen_set_auto_logout" },
    { gen_id: 3, gen_nama: "Maximum Piutang", gen_value: cookies.max_piutang, gen_prop: "gen_set_max_piutang" },
    { gen_id: 4, gen_nama: "Tipe Bisnis", gen_value: cookies.lok_type, gen_prop: "gen_set_lok_type" },
    { gen_id: 5, gen_nama: "Tipe Resto", gen_value: cookies.resto_type, gen_prop: "gen_set_resto_type" },
    {
      gen_id: 6,
      gen_nama: "Mode Scan",
      gen_value: cookies.scan_mode == true ? "true" : cookies.scan_mode == false ? "false" : cookies.scan_mode,
      gen_prop: "gen_set_scan_mode"
    },
    {
      gen_id: 7,
      gen_nama: "Piutang",
      gen_value: cookies.dp_0 == true ? "true" : cookies.dp_0 == false ? "false" : cookies.dp_0,
      gen_prop: "gen_set_dp_0"
    },
    {
      gen_id: 8,
      gen_nama: "Split Bill",
      gen_value: cookies.split_bill == true ? "true" : cookies.split_bill == false ? "false" : cookies.split_bill,
      gen_prop: "gen_set_split_bill"
    },
    {
      gen_id: 9,
      gen_nama: "Join Bill",
      gen_value: cookies.join_bill == true ? "true" : cookies.join_bill == false ? "false" : cookies.join_bill,
      gen_prop: "gen_set_join_bill"
    },
    {
      gen_id: 10,
      gen_nama: "Always Print",
      gen_value: cookies.always_print == true ? "true" : cookies.always_print == false ? "false" : cookies.always_print,
      gen_prop: "gen_set_always_print"
    }
  ]);
  const navbarRef = reactExports.useRef();
  const [open, setOpen] = reactExports.useState(false);
  const [openNotif, setOpenNotif] = reactExports.useState(false);
  const [genIndex, setGenIndex] = reactExports.useState(-1);
  const [generalById, setGeneralById] = reactExports.useState({});
  const [truefalse, setTruefalse] = reactExports.useState(["true", "false"]);
  const [restoRetail, setRestoRetail] = reactExports.useState(["resto", "retail", "laundry"]);
  const [restoTypeRetail, setRestoTypeRetail] = reactExports.useState(["1", "2"]);
  const [mode, setMode] = reactExports.useState(0);
  const [keyword, setKeyword] = reactExports.useState("");
  const [generalSelect, setGeneralSelect] = reactExports.useState("");
  const [generalInput, setGeneralInput] = reactExports.useState(0);
  const [countnota, setCountnota] = reactExports.useState(0);
  function handleOpen(item, set, index) {
    setOpen(!open);
    setGeneralSettingsTemp(generalSettings);
    setGeneralById(item);
    setGenIndex(index);
    setGeneralSelect(item.gen_value);
    setGeneralInput(item.gen_value);
    if (item.gen_id > 3)
      setMode(2);
    else
      setMode(1);
  }
  const cancelData = reactExports.useCallback(async () => {
    setOpen(false);
    setGeneralSettings(generalSettingContains);
  }, [generalSettings]);
  function handleChange(evt, id) {
    setGeneralInput(formatBackToNumber(evt.target.value));
  }
  const saveData = reactExports.useCallback(async () => {
    const _newGeneralSettings = lodashExports.cloneDeep(generalSettings);
    _newGeneralSettings[genIndex].gen_value = generalInput;
    let _newerGeneralSettings = "";
    _newGeneralSettings.map((item, index) => {
      _newerGeneralSettings = _newerGeneralSettings + item.gen_value + ",";
    });
    console.log(_newGeneralSettings);
    let approve = true;
    if (_newGeneralSettings[7].gen_value == "true" && _newGeneralSettings[3].gen_value == "laundry") {
      alert("Fitur split bill belum tersedia untuk laundry");
      setOpen(false);
      approve = false;
    }
    if (_newGeneralSettings[7].gen_value == "true" && _newGeneralSettings[8].gen_value == "true") {
      alert("Fitur split bill tidak boleh aktif bersama join bill");
      setOpen(false);
      approve = false;
    }
    if (approve) {
      const { data, error } = await saveGeneralSetting({
        lok_id: cookies.lok_id,
        gen_id: cookies.gen_id,
        gen_prop: _newGeneralSettings[genIndex].gen_prop,
        gen_value: generalInput
      });
      if (error) {
        alert("Data tidak ditemukan");
      } else {
        setLoading(true);
        let splitgeneral = data.split("-");
        setCookies(splitgeneral[0].replace("gen_set_", ""), splitgeneral[1]);
        _newGeneralSettings[genIndex].gen_value = splitgeneral[1];
        setGeneralSettingContains(_newGeneralSettings);
        setOpen(false);
        setLoading(false);
      }
    }
  }, [generalById, generalSettings, generalInput]);
  const handleOffline = reactExports.useCallback(async () => {
    setLoading(true);
    const { data, error } = await getItems({
      lok_id: cookies.lok_id,
      sellable: "true"
    });
    if (error) {
      alert("Data tidak ditemukan");
    } else {
      let arrTotalItem = [];
      let arrItem = [];
      convertItemListToCheckout(data).map((item, index) => {
        if (index % 20 == 0 && index > 0) {
          arrTotalItem.push(arrItem);
          arrItem = [];
        }
        if (index == convertItemListToCheckout(data).length - 1) {
          arrTotalItem.push(arrItem);
          arrItem = [];
        }
        arrItem.push(item);
      });
      let count = 0;
      arrTotalItem.forEach((i) => {
        count++;
        console.log(i);
        localStorage.setItem(
          "pos_item_" + count,
          JSON.stringify({
            key: "pos_item",
            value: i
          })
        );
      });
      const init = async () => {
        const { data: data2, error: error2 } = await getTransaction({
          lok_id: cookies.lok_id,
          loaditems: "yes"
        });
        if (error2) {
          alert("Data tidak ditemukan");
        } else {
          let arrTotalNota = [];
          let arrNota = [];
          data2.map((item, index) => {
            if (index % 20 == 0 && index > 0) {
              arrTotalNota.push(arrNota);
              arrNota = [];
            }
            if (index == data2.length - 1) {
              arrTotalNota.push(arrNota);
              arrNota = [];
            }
            arrNota.push(item);
          });
          let countnota2 = 0;
          arrTotalNota.forEach((i) => {
            countnota2++;
            console.log(i);
            localStorage.setItem(
              "transaksi_" + countnota2,
              JSON.stringify({
                key: "transaksi",
                value: i
              })
            );
          });
          alert("Data item pos dan transaksi sudah tersimpan di lokal");
          setLoading(false);
        }
      };
      init();
    }
  }, [generalById, generalSettings, generalInput]);
  const handleOnline = reactExports.useCallback(async () => {
    if (!localStorage.getItem("pos_save"))
      alert("Tidak ada data nota yang bisa diupload");
    else {
      setOpenNotif(true);
      setCountnota(JSON.parse(JSON.parse(localStorage.getItem("pos_save")).value).length);
    }
    console.log(localStorage.getItem("pos_save"));
    console.log(JSON.parse(JSON.parse(localStorage.getItem("pos_save")).value));
  }, [generalById, generalSettings, generalInput]);
  const handleOnlineAccept = reactExports.useCallback(async () => {
    console.log(localStorage);
    console.log(JSON.parse(JSON.parse(localStorage.getItem("pos_save")).value)[0]);
    let tasks = [];
    let k = 0;
    const dataSave = lodashExports.cloneDeep(JSON.parse(JSON.parse(localStorage.getItem("pos_save")).value));
    for (let i = 0; i < dataSave.length; i++) {
      const delay = 1500 * i;
      tasks.push(new Promise(async function(resolve) {
        await new Promise((res) => setTimeout(res, delay));
        let result = await new Promise((r) => {
          bayarPos(dataSave[k]);
          r(delay);
        });
        resolve(result);
        k++;
      }));
    }
    setLoading(true);
    Promise.all(tasks).then((results) => {
      setLoading(false);
      setOpenNotif(false);
      localStorage.removeItem("pos_save");
    });
  }, [generalById, generalSettings, generalInput]);
  reactExports.useEffect(() => {
    if (keyword && keyword.length > 1) {
      const newFilters = lodashExports.cloneDeep(generalSettingContains);
      const _newfilter = newFilters.filter(function(object) {
        return object.gen_nama.toLowerCase().indexOf(keyword) !== -1;
      });
      setGeneralSettings(_newfilter);
    } else if (!keyword) {
      setGeneralSettings(generalSettingContains);
    }
  }, [keyword, cookies]);
  reactExports.useEffect(() => {
    if (navbarRef.current) {
      setListPadding(`${navbarRef.current.offsetHeight + 20}px`);
    }
  }, [generalSettings, navbarRef]);
  const CustomSelectOption = (option) => {
    if (generalById.gen_nama === "Mode Scan")
      return option === "true" ? "Pakai Scanner" : "Tidak Pakai Scanner";
    else if (generalById.gen_nama === "Tipe Bisnis")
      return option === "resto" ? "Resto" : option === "retail" ? "Retail" : "Laundry";
    else if (generalById.gen_nama === "Tipe Resto")
      return parseInt(option) === 1 ? "Resto Bayar Langsung" : "Resto Bayar Setelah Makan";
    else if (generalById.gen_nama === "Piutang" || generalById.gen_nama === "Split Bill" || generalById.gen_nama === "Join Bill" || generalById.gen_nama === "Always Print")
      return option === "true" ? "Aktif" : "Tidak Aktif";
    else
      return option;
  };
  const CustomList = (nama, value) => {
    if (nama === "Mode Scan")
      return value === "true" ? "Pakai Scanner" : "Tidak Pakai Scanner";
    else if (nama === "Tipe Bisnis")
      return value === "resto" ? "Resto" : value === "retail" ? "Retail" : "Laundry";
    else if (nama === "Tipe Resto")
      return parseInt(value) === 1 ? "Resto Bayar Langsung" : "Resto Bayar Setelah Makan";
    else if (nama === "Piutang" || nama === "Split Bill" || nama === "Join Bill" || nama === "Always Print")
      return value === "true" ? "Aktif" : "Tidak Aktif";
    else if (nama === "Auto Logout")
      return value + " Jam";
    else if (nama === "Maximum Piutang")
      return value == 0 ? currency + " 0" : currency + " " + formatThousandSeparator(value);
    else
      return value;
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(reactExports.Fragment, { children: [
    !loading ? null : /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingOverlay, { white: true }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-screen-adapt bg-gray-50 overflow-hidden relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "top-0 inset-x-0 fixed bg-gradient-to-b from-gray-50 h-20" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 top-0 inset-x-0 fixed z-50 mx-auto desktop:max-w-[60%]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Navbar, { ref: navbarRef, className: `pt-2 px-2 py-2 relative`, blurred: false, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.IconButton, { variant: "text", size: "md", onClick: () => setMenuOpen(true), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bars3Icon, { className: "h-6 w-6 stroke-2" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-base font-semibold text-[#606060]", children: "Pengaturan" })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pb-20 overflow-auto h-full", style: { paddingTop: listPadding }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(react.List, { className: "divide-y divide-dashed divide-gray-400", children: [
        generalSettings == null ? void 0 : generalSettings.map((i, index) => {
          return /* @__PURE__ */ jsxRuntimeExports.jsx(react.ListItem, { className: index == 4 && generalSettings[3].gen_value != "resto" ? "hidden" : "", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full pr-2", onClick: () => handleOpen(i, false, index), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", {}),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "gray", className: "font-normal", children: /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: i.gen_nama }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { color: "gray", className: "font-normal", children: CustomList(i.gen_nama, i.gen_value) })
            ] })
          ] }) }, index);
        }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.ListItem, { className: "", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full pr-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "gray", className: "font-normal", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Tooltip, { content: "Mengupload data nota yang tersimpan di lokal", placement: "right", className: "border border-teal-500 bg-white text-teal-500", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Button, { variant: "gradient", color: "green", onClick: handleOnline, className: "w-full flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Online Mode" }) }) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { color: "gray", className: "font-normal", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Tooltip, { content: "Mengupload pos item dan transaksi ke lokal", placement: "left", className: "border border-teal-500 bg-white text-teal-500", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Button, { variant: "gradient", color: "blue-gray", onClick: handleOffline, className: "w-full flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Offline Mode" }) }) }) })
          ] })
        ] }) }, "5a")
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Dialog, { open, dismiss: { outsidePress: cancelData }, handler: handleOpen, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.DialogHeader, { children: "Ubah Nilai Pengaturan" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.DialogBody, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4", children: mode == 1 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          react.Input,
          {
            value: generalInput,
            label: generalById.gen_nama,
            onChange: (evt) => {
              evt.preventDefault();
              handleChange(evt, generalById.gen_nama);
            }
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          react.Select,
          {
            id: "select_general",
            value: `${generalInput}`,
            onChange: setGeneralInput,
            color: "teal",
            label: generalById.gen_nama,
            children: generalById.gen_id == 4 ? restoRetail.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: p, children: CustomSelectOption(p) }, p)) : generalById.gen_id == 5 ? restoTypeRetail.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: p, children: CustomSelectOption(p) }, p)) : truefalse.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: p, children: CustomSelectOption(p) }, p))
          }
        ) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(react.DialogFooter, { className: "flex gap-3 justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Button, { variant: "gradient", color: "blue-gray", onClick: cancelData, className: "w-full flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Batal" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Button, { variant: "gradient", color: "green", onClick: saveData, className: "w-full flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Ubah" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Dialog, { open: openNotif, handler: handleOpen, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.DialogHeader, { children: "Ubah Nilai Pengaturan" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.DialogBody, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
          "Data yang tersimpan di lokal ada ",
          countnota,
          ". Proses untuk upload?"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(react.DialogFooter, { className: "flex gap-3 justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Button, { variant: "gradient", color: "blue-gray", onClick: () => {
            setOpenNotif(false);
          }, className: "w-full flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Batal" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Button, { variant: "gradient", color: "green", onClick: handleOnlineAccept, className: "w-full flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Setuju" }) })
        ] })
      ] })
    ] })
  ] });
}
export {
  GeneralSettingList as default
};
