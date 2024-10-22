import { Fragment, useCallback, useContext, useEffect, useRef, useState } from "react";
import { getSupplier, saveSupplier, deleteSupplier } from "../../api/Supplier";
import { getShift, checkIn, checkOut, isCheckIn } from "../../api/Shift";
import { AppContext } from "../../AppContext";
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter, IconButton, Input, List,
  ListItem, ListItemSuffix, Navbar, Typography, Textarea,} from "@material-tailwind/react";
import SearchNavbar from "../../lib/SearchNavbar";
import { Bars3Icon, PlusCircleIcon } from "@heroicons/react/24/outline";
import { HomeIcon, PencilSquareIcon, PhoneIcon } from "@heroicons/react/24/solid";
import { SupplierListModel } from "../../model/supplier";
import { ShiftListModel } from "../../model/shift";
import { dictionary } from "../../constant/appDictionary";
import { useNavigate } from "react-router-dom";
import LoadingOverlay from "../../lib/LoadingOverlay";
import { topic } from "../../constant/appTopics";
import { TIME_SEARCH_DEBOUNCE } from "../../constant/appCommon";
import InputSimple from "../../lib/InputSimple";
import InputMoney from "../../lib/InputMoney";
import { formatThousandSeparator } from "../../util/formatter";
export default function ShiftList() {
  const { setMenuOpen, filters, currency, setFilters, lang, dataLogin, cookies } = useContext(AppContext);
  const [listPadding, setListPadding] = useState("20px");
  const [loading, setLoading] = useState(true);
  const [shift, setShift] = useState([ShiftListModel()]);
  const [itemDisplay, setItemDisplay] = useState(SupplierListModel());
  const navbarRef = useRef();
  const [open, setOpen] = useState(false);
  const [newOpen, setNewOpen] = useState(false);
  const [readonly, setReadonly] = useState(false);
  const [shiftById, setShiftById] = useState({});
  const [shiftId, setShiftId] = useState(-1);
  const [txtTitle, settxtTitle] = useState("");
  const [mode, setMode] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [modalAwal, setModalAwal] = useState(0);
  const [modalAkhir, setModalAkhir] = useState(0);
  const [lastshift, setLastShift] = useState({});
  const navigate = useNavigate();

  const handleFilter = (searchKey) => {
    setKeyword(searchKey);
  };

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
      setShiftById(item);
      settxtTitle("Ubah Supplier");
      setMode(2);
    } else {
      setReadonly(true);
      setOpen(!open);
      setShiftById(item);
      settxtTitle("Detail Supplier");
      setMode(1);
    }
  }
  function handleNewOpen(id) {
    cookies.role_delete.length == 0 && cookies.role_dst.length == 0
      ? setNewOpen(!newOpen)
      : cookies.role_dst.findIndex((a) => a == "ALL") >= 0
      ? setNewOpen(!newOpen)
      : cookies.role_delete.findIndex((a) => a == "SUPP") >= 0
      ? setNewOpen(!newOpen)
      : setNewOpen(false);
    setShiftId(id);
  }

  function handleChange(evt) {
    const value = evt.target.type === "checkbox" ? evt.target.checked : evt.target.value;
    setShiftById({
      ...shiftById,
      [evt.target.name]: value,
    });
  }

  const handleChangeModal = (evt, id) => {
    if(id=='mod_awal')
      setModalAwal(evt.target.value)
    else
      setModalAkhir(evt.target.value)

  };

  const handleCheckIn = useCallback(async () => {
    setItemDisplay(null);
    const { data, error } = await checkIn({ kas_id: cookies.kas_id, mod_awal: modalAwal });
    if (error) {
      alert("Data tidak ditemukan");
    } else {
      setLoading(true);
      setModalAwal(0);
      setShift([]);
      setLastShift({});
      setShiftId(-1);
      const { data, error } = await getShift({ kas_id: cookies.kas_id });
      if (error) {
        alert("Data tidak ditemukan");
      } else {
        setShift(data);
        setLastShift(data[0])
      }
      setLoading(false);
    }
  }, [modalAwal]);

  const handleCheckOut = useCallback(async () => {
    setItemDisplay(null);
    const { data, error } = await checkOut({ kas_id: cookies.kas_id, mod_akhir: modalAkhir  });
    if (error) {
      alert("Data tidak ditemukan");
    } else {
      setLoading(true);
      setModalAkhir(0);
      setShift([]);
      setLastShift({});
      setShiftId(-1);
      const { data, error } = await getShift({ kas_id: cookies.kas_id });
      if (error) {
        alert("Data tidak ditemukan");
      } else {
        setShift(data);
        setLastShift(data[0])
      }
      setLoading(false);
    }
  }, [modalAwal, modalAkhir]);

  useEffect(() => {
    if (!cookies.lok_id) {
      navigate(topic.login.route);
    }
    const handleResponse = ({ data, error }) => {
      console.log(data)
      if (error) {
        alert("Data tidak ditemukan");
      } else {
        setShift(data);
        setLastShift(data[0])
      }
    };
    const init = async () => {
        setLoading(true);
        setShift([]);
        const { data, error } = await getShift({ kas_id: cookies.kas_id });
        handleResponse({ data, error });
        setLoading(false);
    };
    init();
    }, []);

  useEffect(() => {
    if (navbarRef.current) {
      setListPadding(`${navbarRef.current.offsetHeight + 20}px`);
    }
  }, [shift, navbarRef]);

  return (
    <Fragment>
      {!loading ? null : <LoadingOverlay white />}
      <div className="h-screen-adapt bg-gray-50 overflow-hidden relative">
        {/* <div className="top-0 inset-x-0 fixed bg-gradient-to-b from-gray-50 h-20" /> */}
        <div className="p-2 top-0 inset-x-0 fixed z-50 mx-auto desktop:max-w-[60%]">
          <Navbar ref={navbarRef} className={`pt-2 px-2 py-2 relative`} blurred={false}>
            <div className="flex items-center">
              <IconButton variant="text" size="md" onClick={() => setMenuOpen(true)}>
                <Bars3Icon className="h-6 w-6 stroke-2" />
              </IconButton>
            </div>
          </Navbar>
        </div>
        <div className="p-5 mt-5 overflow-auto h-full" style={{ paddingTop: listPadding }}>
          <div className="grid grid-cols-2 mb-4">
            <div className="mx-2">
              <InputMoney value={modalAwal} label="Modal Awal" onChange={(evt) => handleChangeModal(evt, "mod_awal")}></InputMoney>
            </div>
            <div className="mx-2">
              <Button variant="gradient" color="light-blue" onClick={() => handleCheckIn()} disabled={lastshift?(lastshift.mod_status=='CHECKEDIN'?true:false):false}>
                Check In
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-2 mb-4">
            <div className="mx-2">
              <InputMoney value={modalAkhir} label="Modal Akhir" onChange={(evt) => handleChangeModal(evt, "mod_akhir")}></InputMoney>
            </div>
            <div className="mx-2">
              <Button variant="gradient" color="light-blue" onClick={() => handleCheckOut()} disabled={lastshift?(lastshift.mod_status=='CHECKEDOUT'?true:false):false}>
                Check Out
              </Button>
            </div>
          </div>
          <div className="info flex-col grid grid-cols-2">

            <Typography variant="small" color="gray" className="text-[14px] font-medium text-center border-2 border-teal-500">
              Check In
            </Typography>
            <Typography variant="small" color="gray" className="text-[14px] font-medium text-center pr-4 border-r-2 border-t-2 border-b-2 border-teal-500">
              Check Out
            </Typography>
          </div>
          <span></span>
          <List className="divide-y divide-dashed divide-gray-400 border-r-2 border-b-2 border-l-2 border-teal-500">
            {shift.map((i, index) => {
              return (
                <ListItem key={index} className="flex items-center justify-between px-[3px] ">
                  <div className="w-[90%] pr-2 flex-1" onClick={() => handleOpen(i, false, index)}>
                    <div className="info flex-col gap-2 grid grid-cols-2">
                      <Typography variant="small" color="gray" className="text-[14px] font-medium text-center">
                      <div className="w-full flex flex-col gap-[5px]" >
                        <div className="w-[90%] pl-7 whitespace-nowrap overflow-hidden text-ellipsis font-semibold">{i.mod_checkin}</div>
                        <div className="flex items-center gap-1 text-sm justify-center">
                          <div className="w-max py-[2px] px-2 font-semibold bg-green-100 rounded-md">
                            {currency} {formatThousandSeparator(parseFloat(i.mod_awal))}
                          </div>
                        </div>
                      </div>
                      </Typography>
                      <Typography variant="small" color="gray" className="text-[14px] font-medium text-center">
                      <div className="w-full flex flex-col gap-[5px]" >
                        <div className="w-[90%] pl-7 whitespace-nowrap overflow-hidden text-ellipsis font-semibold">{i.mod_checkout}</div>
                        <div className="flex items-center gap-1 text-sm justify-center">
                          {
                            i.mod_akhir?
                            <div className="w-max py-[2px] px-2 font-semibold bg-green-100 rounded-md">
                              {currency} {formatThousandSeparator(parseFloat(i.mod_akhir))}
                            </div>:null
                          }
                        </div>
                      </div>
                      </Typography>
                    </div>
                  </div>
                </ListItem>
              );
            })}
          </List>
        </div>

        {/* <Dialog open={open} handler={handleOpen}>
          <DialogHeader className="text-[20px] text-[#606060]">{txtTitle}</DialogHeader>
          <DialogBody>
            <div className="mb-4">
              <InputSimple
                value={shiftById.sup_nama}
                label="Nama"
                name="sup_nama"
                onChange={handleChange}
                disabled={readonly}
                maxlength={30}
              />
            </div>
            <div className="mb-4">
              <InputSimple
                value={shiftById.sup_wa}
                label="Nomor WA"
                name="sup_wa"
                onChange={handleChange}
                disabled={readonly}
                maxlength={16}
              />
            </div>
            <div className="mb-4">
              <Textarea
                value={shiftById.sup_alamat}
                label="Alamat"
                name="sup_alamat"
                onChange={handleChange}
                disabled={readonly}
              />
            </div>
          </DialogBody>
          <DialogFooter className="flex gap-3 justify-between">
            <Button variant="gradient" color="blue-gray" onClick={() => setOpen(false)} className="w-full flex-1">
              Batal
            </Button>
            <Button
              variant="gradient"
              color={mode <= 1 ? "orange" : "green"}
              onClick={mode <= 1 ? () => handleNewOpen(shiftById.sup_id) : saveData}
              className="w-full flex-1"
            >
              <span>{mode <= 1 ? "Hapus" : "Confirm"}</span>
            </Button>
          </DialogFooter>
        </Dialog>

        <Dialog open={newOpen} handler={handleNewOpen}>
          <DialogBody>
            <div className="text-center my-6">
              Supplier <span className="font-semibold">{shiftById.sup_nama}</span> akan dihapus. Apakah anda yakin?
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
        </Dialog> */}
      </div>
    </Fragment>
  );
}
