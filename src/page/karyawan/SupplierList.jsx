import { Fragment, useCallback, useContext, useEffect, useRef, useState } from "react";
import { getSupplier, saveSupplier, deleteSupplier } from "../../api/Supplier";
import { getKaryawan, saveKaryawan, deleteKaryawan } from "../../api/Karyawan";
import { AppContext } from "../../AppContext";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  IconButton,
  Select,
  Option,
  List,
  ListItem,
  ListItemSuffix,
  Navbar,
  Typography,
  Textarea,
} from "@material-tailwind/react";
import SearchNavbar from "../../lib/SearchNavbar";
import { Bars3Icon, PlusCircleIcon } from "@heroicons/react/24/outline";
import { HomeIcon, PencilSquareIcon, PhoneIcon,TrashIcon,PencilIcon } from "@heroicons/react/24/solid";
import { SupplierListModel } from "../../model/supplier";
import { dictionary } from "../../constant/appDictionary";
import { useNavigate } from "react-router-dom";
import { DayPicker } from 'react-day-picker';
import LoadingOverlay from "../../lib/LoadingOverlay";
import { topic } from "../../constant/appTopics";
import { TIME_SEARCH_DEBOUNCE } from "../../constant/appCommon";
import InputSimple from "../../lib/InputSimple";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";
import { database } from '../../lib/FirebaseConfig';
import { ref, onValue, push } from "firebase/database";
// import { database } from "./firebase";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

export default function SupplierList() {
  const { setMenuOpen, filters, currency, setFilters, lang, dataLogin, cookies } = useContext(AppContext);
  const [listPadding, setListPadding] = useState("20px");
  const [loading, setLoading] = useState(true);
  const [suppliers, setSuppliers] = useState([SupplierListModel()]);
  const [itemDisplay, setItemDisplay] = useState(SupplierListModel());
  const navbarRef = useRef();
  const [dateAwal, setDateAwal] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [awalklik,setAwalklik] = useState(false);
  const [open, setOpen] = useState(false);
  const [newOpen, setNewOpen] = useState(false);
  const [readonly, setReadonly] = useState(false);
  const [supplierById, setSupplierById] = useState({});
  const [supplierId, setSupplierId] = useState(-1);
  const [txtTitle, settxtTitle] = useState("");
  const [mode, setMode] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const handleFilter = (searchKey) => {
    setKeyword(searchKey);
  };
  // const firebaseConfig = {
  //   apiKey: "AIzaSyB7I2kk2qDH1dTSiXJSDd8sNCuJ28HOvw0",
  //   authDomain: "kasbon-3afd3.firebaseapp.com",
  //   databaseURL: "https://kasbon-3afd3-default-rtdb.asia-southeast1.firebasedatabase.app",
  //   projectId: "kasbon-3afd3",
  //   storageBucket: "kasbon-3afd3.firebasestorage.app",
  //   messagingSenderId: "163834327347",
  //   appId: "1:163834327347:web:cfdbb347cdacf9a28e8e46",
  //   measurementId: "G-QVFMZLZQ16"
  // };
  // const app = initializeApp(firebaseConfig);
  // const database = getDatabase(app);
  // Initialize Firebase
  // const app = initializeApp(firebaseConfig);
  // const analytics = getAnalytics(app);
  // const db = getFirestore(app);
  // useEffect(() => {
  //   const usersRef = ref(database, "users"); // reference to the "users" node

  //   const unsubscribe = onValue(usersRef, (snapshot) => {
  //     const data = snapshot.val();
  //     if (data) {
  //       const usersArray = Object.entries(data).map(([key, value]) => ({
  //         id: key,
  //         ...value,
  //       }));
  //       alert(usersArray);
  //       setUsers(usersArray);
  //     } else {
  //       setUsers([]);
  //     }
  //   });

    // Cleanup the listener
  //   return () => unsubscribe();
  // }, []);

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
      settxtTitle("Edit Karyawan");
      setMode(2);
    } else {
      setReadonly(true);
      setOpen(!open);
      setSupplierById(item);
      settxtTitle("Detail Karyawan");
      setMode(1);
    }
  }
  function handleNewOpen(id) {
    console.log(id);
    // cookies.role_delete.length == 0 && cookies.role_dst.length == 0
    //   ? setNewOpen(!newOpen)
    //   : cookies.role_dst.findIndex((a) => a == "ALL") >= 0
    //   ? setNewOpen(!newOpen)
    //   : cookies.role_delete.findIndex((a) => a == "SUPP") >= 0
    //   ? setNewOpen(!newOpen)
    //   : setNewOpen(false);
    setSupplierId(id);
    setNewOpen(true);

  }

  function handleEdit(item) {
    setSupplierById(item);

    setReadonly(false);
    setMode(2);
    setOpen(true);
  }

  const onDateChange = useCallback(
      (date = new Date()) => {
        const formatted = date.toLocaleDateString('en-CA'); // format YYYY-MM-DD versi lokal
        setDateAwal(formatted);
      setSupplierById((prev) => ({
          ...prev,
          tanggal_masuk: formatted,
        }));
      setOpenDate(false);
      },
      [dateAwal]
    );

  function handleAdd() {
    setSupplierById({ karyawan_id : -1 });
    setReadonly(false);
    settxtTitle("Tambah Karyawan");
    setMode(3);
    setOpen(true);
    // cookies.role_create.length == 0 && cookies.role_dst.length == 0
    //   ? setOpen(!open)
    //   : cookies.role_dst.findIndex((a) => a == "ALL") >= 0
    //   ? setOpen(!open)
    //   : cookies.role_create.findIndex((a) => a == "SUPP") >= 0
    //   ? setOpen(!open)
    //   : setOpen(false);
  }

  function handleChange(evt) {
    const value = evt.target.value;
    setSupplierById({
      ...supplierById,
      [evt.target.name]: value,
    });
  }

  const handleDelete = useCallback(async () => {
    setItemDisplay(null);
    console.log(supplierId);
    // return;
    const { data, error } = await deleteKaryawan({ karyawan_id: supplierId });
    if (error) {
      alert(dictionary.universal.notfound[lang]);
    } else {
      setLoading(true);
      setNewOpen(false);
      setSuppliers([]);
      setSupplierId(-1);
      const { data, error } = await getKaryawan({ com_id: cookies.com_id });
      if (error) {
        alert(dictionary.universal.notfound[lang]);
      } else {
        setSuppliers(data);
      }
      setLoading(false);
    }
  }, [supplierId]);

  const saveData = useCallback(async () => {
    setItemDisplay(null);
    const { data, error } = await saveKaryawan(supplierById);
    if (error) {
      alert(dictionary.universal.notfound[lang]);
    } else {
      setLoading(true);
      setOpen(false);
      setSuppliers([]);
      const { data, error } = await getKaryawan({ com_id: cookies.com_id });
      if (error) {
        alert(dictionary.universal.notfound[lang]);
      } else {
        setSuppliers(data);
      }
      setLoading(false);
    }
  }, [supplierById]);

  useEffect(() => {
    if (!cookies.lok_id) {
      navigate(topic.login.route);
    }
    const handleResponse = ({ data, error }) => {
      if (error) {
        alert(dictionary.universal.notfound[lang]);
      } else {
        console.log(data);
        setSuppliers(data);
      }
    };
    const init = async () => {
      if (keyword && keyword.length > 1) {
        const orderSearch = setTimeout(async () => {
          setLoading(true);
          const { data, error } = await getKaryawan({ });
          handleResponse({ data, error });
          setLoading(false);
        }, TIME_SEARCH_DEBOUNCE);
        return () => {
          clearTimeout(orderSearch);
        };
      } else if (!keyword) {
        setLoading(true);
        setSuppliers([]);
        const { data, error } = await getKaryawan({  });
        handleResponse({ data, error });
        setLoading(false);
      }
    };
    init();
  }, [keyword]);

  useEffect(() => {
    if (navbarRef.current) {
      setListPadding(`${navbarRef.current.offsetHeight + 20}px`);
    }
  }, [suppliers, navbarRef]);

  return (
    <Fragment>
      {!loading ? null : <LoadingOverlay white />}
      <div className="h-screen-adapt bg-gray-50 overflow-hidden relative">
        {/* <div className="top-0 inset-x-0 fixed bg-gradient-to-b from-gray-50 h-20" /> */}
        <div className="p-2 top-0 inset-x-0 fixed z-50 mx-auto desktop:max-w-[60%]">
          <Navbar ref={navbarRef} className={`pt-2 px-2 py-2 relative`} blurred={false}>
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
                <SearchNavbar onSearch={handleFilter} value={keyword} label={dictionary.search.supplier[lang]} />
              </div>
            </div>
          </Navbar>
        </div>

        <div className="pb-20 overflow-auto h-full" style={{ paddingTop: listPadding }}>
          {/* <List className="divide-y divide-dashed divide-gray-400">
            {suppliers.map((i, index) => {
              return (
                <ListItem key={index} className="flex items-center justify-between px-[3px]">
                  <div className="w-[90%] pr-2 flex-1" onClick={() => handleOpen(i, false, index)}>
                    <div className="info flex flex-col gap-2">
                      <Typography variant="small" color="gray" className="text-[14px] font-medium">
                        <b>{i.sup_nama}</b>
                      </Typography>
                      {i.sup_wa && (
                        <div className="w-max flex gap-1 items-center align-middle px-2 py-[2px] bg-[#cff1cf] rounded-md">
                          <PhoneIcon className="h-[12px] w-[12px]" />
                          <span className=" text-[13px] font-semibold">{i.sup_wa || ""}</span>
                        </div>
                      )}
                      {i.sup_alamat && (
                        <div className="w-max max-w-full flex gap-2 items-baseline align-middle px-2 py-1 bg-[#ddf5ff] rounded-md">
                          <HomeIcon className="h-[12px] min-w-[12px]" />
                          <span className="flex-5 text-[13px] font-semibold">{i.sup_alamat || ""}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <ListItemSuffix className="w-[10%]">
                    <IconButton variant="text" color="blue-gray" onClick={() => handleOpen(i, true, index)}>
                      <PencilSquareIcon className="h-5 w-5 text-blue-500" />
                    </IconButton>
                  </ListItemSuffix>
                </ListItem>
              );
            })}
          </List> */}
<div>
      <h2>Daftar Karyawan</h2>
{suppliers.map((item) => (
  <div 
    key={item.shareholder_id} 
    style={{
      border: "1px solid #ccc",
      padding: "10px",
      margin: "10px 0",
      display: "flex",               // <-- buat sejajar
      justifyContent: "space-between", // <-- pisahkan kiri-kanan
      alignItems: "center"
    }}
  >
    {/* Bagian info proyek */}
    <div>
      <h3>{item.nama_karyawan}</h3>
      <p><strong>Kode :</strong> {item.kode_karyawan}</p>
      <p><strong>Jabatan :</strong> {item.jabatan}</p>
      <p><strong>Gaji Pokok :</strong> {item.gaji_pokok}</p>
      <p><strong>Tunjangan :</strong> {item.tunjangan}</p>
      <p><strong>Status BPJS :</strong> {item.status_bpjs}</p>
      <p><strong>Status Kontrak :</strong> {item.status_kontrak}</p>
      <p><strong>Tanggal Masuk :</strong> {item.tanggal_masuk}</p>
    </div>

    {/* Tombol hapus di kanan */}
          <div>
          <IconButton
                variant="filled"
                color="blue-gray"
                // classNam={
                //   itemCheckId.length > 0 ? "rounded-full pointer-events-auto" : "rounded-full pointer-events-none"
                // }
                size="lg"
                onClick={()=>handleEdit(item)}
              >
                <PencilIcon className="h-8 w-8 text-black-500" />
              </IconButton>&nbsp;
          <IconButton
                variant="filled"
                color="blue-gray"
                // className={
                //   itemCheckId.length > 0 ? "rounded-full pointer-events-auto" : "rounded-full pointer-events-none"
                // }
                size="lg"
                onClick={()=>handleNewOpen(item.karyawan_id)}
              >
                <TrashIcon className="h-8 w-8 text-black-500" />
              </IconButton>
          </div>
      </div>
  ))}
    </div>                

          <div className="fixed bottom-4 right-4">
            <IconButton variant="filled" color="teal" className="rounded-full" size="lg" onClick={() => handleAdd()}>
              <PlusCircleIcon className="h-8 w-8 text-black-500" />
            </IconButton>
          </div>
        </div>

        <Dialog
          open={open}
          handler={handleOpen}
          dismiss={{
              enabled: false, // <-- cegah dialog tertutup otomatis
            }}

          >
          <DialogHeader className="text-[20px] text-[#606060]">{txtTitle}</DialogHeader>
          <DialogBody>
            <div className="mb-4">
              <InputSimple
                value={supplierById.nama_karyawan}
                label={"Nama Karyawan"}
                name="nama_karyawan"
                onChange={handleChange}
                disabled={readonly}
              />
            </div>
            <div className="mb-4">
              <InputSimple
                value={supplierById.kode_karyawan}
                label={"Kode Karyawan"}
                name="kode_karyawan"
                onChange={handleChange}
                disabled={readonly}
              />
            </div>
            <div className="mb-4">
              <div className="mb-4">
                    <Select
                      className="h-10 bg-teal-50"
                      name="jabatan"
                      value={supplierById.jabatan}
                      label={"Jabatan"}
                      onChange={(val) =>
                        setSupplierById({
                          ...supplierById,
                          jabatan: val
                        })
                      }                    
                    >
                        <Option value="Supervisor">Supervisor</Option>
                        <Option value="Pekerja">Pekerja</Option>
                        <Option value="Manajer">Manajer</Option>
                        <Option value="Admin">Admin</Option>
                    </Select>
              </div>
            </div>
            <div className="mb-4">
              <InputSimple
                value={supplierById.gaji_pokok}
                label={"Gaji Pokok"}
                name="gaji_pokok"
                onChange={handleChange}
                disabled={readonly}
              />
            </div>
            <div className="mb-4">
              <InputSimple
                value={supplierById.tunjangan}
                label={"Tunjangan"}
                name="tunjangan"
                onChange={handleChange}
                disabled={readonly}
              />
            </div>
            <div className="mb-4">
                <Select
                  className="h-10 bg-teal-50"
                  name="status_bpjs"
                  value={supplierById.status_bpjs}
                  label={"Status BPJS"}
                  onChange={(val) =>
                    setSupplierById({ ...supplierById, status_bpjs: val })
                  }                
                >
                    <Option value="Ya">Ya</Option>
                    <Option value="Tidak">Tidak</Option>
                  
                </Select>
            </div>
            <div className="mb-4">
                <Select
                  className="h-10 bg-teal-50"
                  name="status_kontrak"
                  value={supplierById.status_kontrak}
                  label={"Status Kontrak"}
                  onChange={(val) =>
                    setSupplierById({ ...supplierById, status_kontrak: val })
                  }                
                >
                    <Option value="Tetap">Tetap</Option>
                    <Option value="Kontrak">Kotrak</Option>
                    <Option value="Freelance">Freelance</Option>
                  
                </Select>
            </div>
            <div className="mb-4">
<Button
  disabled={readonly}
  variant="outlined"
  color="blue-gray"
  onClick={() => {
    setOpenDate(true);
  }}  
  className="w-full flex justify-between items-center text-left border border-blue-gray-200 rounded-lg py-2 px-3 normal-case"
>
  <span className={dateAwal ? "text-black" : "text-blue-gray-400"}>
    {dateAwal || "Pilih tanggal awal"}
  </span>
</Button></div>

          </DialogBody>
          <DialogFooter className="flex gap-3 justify-between">
            <Button variant="gradient" color="blue-gray" onClick={() => setOpen(false)} className="w-full flex-1">
              {dictionary.universal.cancel[lang]}
            </Button>
            <Button
              variant="gradient"
              color={mode <= 1 ? "orange" : "green"}
              onClick={mode <= 1 ? () => handleNewOpen(supplierById.sup_id) : saveData}
              className="w-full flex-1"
            >
              <span>{mode <= 1 ? dictionary.universal.delete[lang] : dictionary.universal.confirm[lang]}</span>
            </Button>
          </DialogFooter>
        </Dialog>

        <Dialog open={newOpen} handler={handleNewOpen}>
          <DialogBody>
            <div className="text-center my-6">
              Supplier {dictionary.universal.withname [lang]} <span className="font-semibold">{supplierById.sup_nama}</span> {dictionary.universal.deleteMessage[lang]}
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
        <Dialog open={openDate} handler={()=>setOpenDate(false)} size="xs" >
          <DialogBody>
            <DayPicker
              mode="single"
              // selected={dateFilter ? dateFilter.value : null}
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
