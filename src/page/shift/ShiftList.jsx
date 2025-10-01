import { Fragment, useCallback, useContext, useEffect, useRef, useState } from "react";
import { getShift, checkIn, checkOut } from "../../api/Shift";
import { AppContext } from "../../AppContext";
import { Button, IconButton, List, ListItem, Navbar, Typography, Textarea } from "@material-tailwind/react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { ShiftListModel } from "../../model/shift";
import { useNavigate } from "react-router-dom";
import LoadingOverlay from "../../lib/LoadingOverlay";
import { topic } from "../../constant/appTopics";
import InputMoney from "../../lib/InputMoney";
import { formatThousandSeparator } from "../../util/formatter";
import { dictionary } from "../../constant/appDictionary";

export default function ShiftList() {
  const { setMenuOpen, currency, cookies, lang } = useContext(AppContext);
  const [listPadding, setListPadding] = useState("20px");
  const [loading, setLoading] = useState(true);
  const [shift, setShift] = useState([ShiftListModel()]);
  const navbarRef = useRef();
  const [open, setOpen] = useState(false);
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
      settxtTitle(dictionary.universal.change[lang]+" Shift");
      setMode(2);
    } else {
      setReadonly(true);
      setOpen(!open);
      setShiftById(item);
      settxtTitle("Detail Shift");
      setMode(1);
    }
  }

  const handleChangeModal = (evt, id) => {
    if (id == "mod_awal") setModalAwal(evt.target.value);
    else setModalAkhir(evt.target.value);
  };

  const handleCheckIn = useCallback(async () => {
    const { data, error } = await checkIn({ kas_id: cookies.kas_id, mod_awal: modalAwal });
    if (error) {
      alert(dictionary.universal.notfound[lang]);
    } else {
      setLoading(true);
      setModalAwal(0);
      setShift([]);
      setLastShift({});
      setShiftId(-1);
      const { data, error } = await getShift({ kas_id: cookies.kas_id });
      if (error) {
        alert(dictionary.universal.notfound[lang]);
      } else {
        setShift(data);
        setLastShift(data[0]);
      }
      setLoading(false);
    }
  }, [modalAwal]);

  const handleCheckOut = useCallback(async () => {
    const { data, error } = await checkOut({ kas_id: cookies.kas_id, mod_akhir: modalAkhir });
    if (error) {
      alert(dictionary.universal.notfound[lang]);
    } else {
      setLoading(true);
      setModalAkhir(0);
      setShift([]);
      setLastShift({});
      setShiftId(-1);
      const { data, error } = await getShift({ kas_id: cookies.kas_id });
      if (error) {
        alert(dictionary.universal.notfound[lang]);
      } else {
        setShift(data);
        setLastShift(data[0]);
      }
      setLoading(false);
    }
  }, [modalAwal, modalAkhir]);

  useEffect(() => {
    if (!cookies.lok_id) {
      navigate(topic.login.route);
    }
    const handleResponse = ({ data, error }) => {
      console.log(data);
      if (error) {
        alert(dictionary.universal.notfound[lang]);
      } else {
        setShift(data);
        console.log(data)
        setLastShift(data[0]);
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
        <div className="p-2 top-0 inset-x-0 fixed z-50 mx-auto desktop:max-w-[60%]">
          <Navbar ref={navbarRef} className={`pt-2 px-2 py-2 relative`} blurred={false}>
            <div className="flex items-center">
              <IconButton variant="text" size="md" onClick={() => setMenuOpen(true)}>
                <div className="justify-items-center lowercase">
                  <Bars3Icon className="h-6 w-6 stroke-2" />
                  <div style={{ fontSize: "8px", padding: "0px" }}>Menu</div>
                </div>
              </IconButton>
            </div>
          </Navbar>
        </div>

        <div className="p-5 mt-5 overflow-auto h-full" style={{ paddingTop: listPadding }}>
          <div className="action-area">
            <div className="flex gap-2 mb-4">
              <InputMoney
                value={modalAwal}
                label={dictionary.universal.startingcapital[lang]}
                onChange={(evt) => handleChangeModal(evt, "mod_awal")}
                className="w-[70%]"
              ></InputMoney>
              <Button
                variant="gradient"
                color="light-blue"
                onClick={() => handleCheckIn()}
                disabled={lastshift ? (lastshift.mod_status == "CHECKEDIN" ? true : false) : false}
                className="min-w-[100px] text-[11px] p-0"
              >
                Check In
              </Button>
            </div>
            <div className="flex gap-2 mb-4">
              <InputMoney
                value={modalAkhir}
                label={dictionary.universal.finalcapital[lang]}
                onChange={(evt) => handleChangeModal(evt, "mod_akhir")}
              ></InputMoney>
              <Button
                variant="gradient"
                color="deep-orange"
                onClick={() => handleCheckOut()}
                disabled={lastshift ? (lastshift.mod_status == "CHECKEDOUT" ? true : false) : false}
                className="min-w-[100px] text-[11px] p-0"
              >
                Check Out
              </Button>
            </div>
          </div>

          <div className="info-area">
            <div className="info flex">
              <Typography
                variant="small"
                color="gray"
                className="flex-1 text-[12px] font-semibold uppercase text-center p-2 bg-green-100"
              >
                Check In
              </Typography>
              <Typography
                variant="small"
                color="gray"
                className="flex-1 text-[12px] font-semibold uppercase text-center p-2 bg-orange-100"
              >
                Check Out
              </Typography>
            </div>
            <List className="divide-y divide-dashed divide-gray-400">
              {shift.map((i, index) => {
                return (
                  <ListItem key={index} className="flex items-center justify-between px-[3px] ">
                    <div className="w-[90%] pr-2 flex-1" onClick={() => handleOpen(i, false, index)}>
                      <div className="info flex-col gap-2 grid grid-cols-2">
                        <Typography variant="small" color="gray" className="text-[14px] font-medium text-center">
                          <div className="w-full flex flex-col gap-[5px]">
                            <div className="w-[90%] pl-7 whitespace-nowrap overflow-hidden text-ellipsis font-semibold">
                              {i.mod_checkin}
                            </div>
                            <div className="flex items-center gap-1 text-sm justify-center">
                              <div className="w-max py-[2px] px-2 font-semibold bg-green-100 rounded-md">
                                {currency} {parseInt(i.mod_awal)==0?"0":formatThousandSeparator(parseFloat(i.mod_awal))}
                              </div>
                            </div>
                          </div>
                        </Typography>
                        <Typography variant="small" color="gray" className="text-[14px] font-medium text-center">
                          <div className="w-full flex flex-col gap-[5px]">
                            <div className="w-[90%] pl-7 whitespace-nowrap overflow-hidden text-ellipsis font-semibold">
                              {i.mod_checkout}
                            </div>
                            <div className="flex items-center gap-1 text-sm justify-center">
                              {i.mod_akhir ? (
                                <div className="w-max py-[2px] px-2 font-semibold bg-green-100 rounded-md">
                                  {currency} {parseInt(i.mod_akhir)==0?"0":formatThousandSeparator(parseFloat(i.mod_akhir))}
                                </div>
                              ) : null}
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
        </div>
      </div>
    </Fragment>
  );
}
