import { Fragment, useCallback, useContext, useEffect, useRef, useState } from "react";
import { getSupplier, saveSupplier, deleteSupplier } from "../../api/Supplier";
import { AppContext } from "../../AppContext";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  IconButton,
  List,
  ListItem,
  ListItemSuffix,
  Navbar,
  Typography,
  Textarea,
} from "@material-tailwind/react";
import SearchNavbar from "../../lib/SearchNavbar";
import { Bars3Icon, PlusCircleIcon } from "@heroicons/react/24/outline";
import { HomeIcon, PencilSquareIcon, PhoneIcon } from "@heroicons/react/24/solid";
import { SupplierListModel } from "../../model/supplier";
import { dictionary } from "../../constant/appDictionary";
import { useNavigate } from "react-router-dom";
import LoadingOverlay from "../../lib/LoadingOverlay";
import { topic } from "../../constant/appTopics";
import { TIME_SEARCH_DEBOUNCE } from "../../constant/appCommon";
import InputSimple from "../../lib/InputSimple";

export default function SupplierList() {
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
  function handleNewOpen(id) {
    cookies.role_delete.length == 0 && cookies.role_dst.length == 0
      ? setNewOpen(!newOpen)
      : cookies.role_dst.findIndex((a) => a == "ALL") >= 0
      ? setNewOpen(!newOpen)
      : cookies.role_delete.findIndex((a) => a == "SUPP") >= 0
      ? setNewOpen(!newOpen)
      : setNewOpen(false);
    setSupplierId(id);
  }
  function handleAdd() {
    setSupplierById({ sup_com_id: cookies.com_id, sup_id: -1 });
    setReadonly(false);
    settxtTitle("Tambah Supplier");
    setMode(3);
    cookies.role_create.length == 0 && cookies.role_dst.length == 0
      ? setOpen(!open)
      : cookies.role_dst.findIndex((a) => a == "ALL") >= 0
      ? setOpen(!open)
      : cookies.role_create.findIndex((a) => a == "SUPP") >= 0
      ? setOpen(!open)
      : setOpen(false);
  }

  function handleChange(evt) {
    const value = evt.target.type === "checkbox" ? evt.target.checked : evt.target.value;
    setSupplierById({
      ...supplierById,
      [evt.target.name]: value,
    });
  }

  const handleDelete = useCallback(async () => {
    setItemDisplay(null);
    const { data, error } = await deleteSupplier({ sup_id: supplierId });
    if (error) {
      alert("Data tidak ditemukan");
    } else {
      setLoading(true);
      setNewOpen(false);
      setSuppliers([]);
      setSupplierId(-1);
      const { data, error } = await getSupplier({ com_id: cookies.com_id });
      if (error) {
        alert("Data tidak ditemukan");
      } else {
        setSuppliers(data);
      }
      setLoading(false);
    }
  }, [supplierId]);

  const saveData = useCallback(async () => {
    setItemDisplay(null);
    const { data, error } = await saveSupplier(supplierById);
    if (error) {
      alert("Data tidak ditemukan");
    } else {
      setLoading(true);
      setOpen(false);
      setSuppliers([]);
      const { data, error } = await getSupplier({ com_id: cookies.com_id });
      if (error) {
        alert("Data tidak ditemukan");
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
                <Bars3Icon className="h-6 w-6 stroke-2" />
              </IconButton>
              <div className="mx-2 flex-grow">
                <SearchNavbar onSearch={handleFilter} value={keyword} label={"Supplier"} />
              </div>
            </div>
          </Navbar>
        </div>

        <div className="pb-20 overflow-auto h-full" style={{ paddingTop: listPadding }}>
          <List className="divide-y divide-dashed divide-gray-400">
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
          </List>

          <div className="fixed bottom-4 right-4">
            <IconButton variant="filled" color="teal" className="rounded-full" size="lg" onClick={() => handleAdd()}>
              <PlusCircleIcon className="h-8 w-8 text-black-500" />
            </IconButton>
          </div>
        </div>

        <Dialog open={open} handler={handleOpen}>
          <DialogHeader className="text-[20px] text-[#606060]">{txtTitle}</DialogHeader>
          <DialogBody>
            <div className="mb-4">
              <InputSimple
                value={supplierById.sup_nama}
                label="Nama"
                name="sup_nama"
                onChange={handleChange}
                disabled={readonly}
                maxlength={30}
              />
            </div>
            <div className="mb-4">
              <InputSimple
                value={supplierById.sup_wa}
                label="Nomor WA"
                name="sup_wa"
                onChange={handleChange}
                disabled={readonly}
                maxlength={16}
              />
            </div>
            <div className="mb-4">
              <Textarea
                value={supplierById.sup_alamat}
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
              onClick={mode <= 1 ? () => handleNewOpen(supplierById.sup_id) : saveData}
              className="w-full flex-1"
            >
              <span>{mode <= 1 ? "Hapus" : "Confirm"}</span>
            </Button>
          </DialogFooter>
        </Dialog>

        <Dialog open={newOpen} handler={handleNewOpen}>
          <DialogBody>
            <div className="text-center my-6">
              Supplier <span className="font-semibold">{supplierById.sup_nama}</span> akan dihapus. Apakah anda yakin?
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
        </Dialog>
      </div>
    </Fragment>
  );
}
