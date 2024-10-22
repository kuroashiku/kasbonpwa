import { Fragment, useCallback, useContext, useEffect, useRef, useState } from "react";
import { getTax, saveTax, deleteTax } from "../../api/Tax";
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
} from "@material-tailwind/react";
import { Bars3Icon, PlusCircleIcon } from "@heroicons/react/24/outline";
import { TaxListModel } from "../../model/tax";
import { useNavigate } from "react-router-dom";
import LoadingOverlay from "../../lib/LoadingOverlay";
import { topic } from "../../constant/appTopics";
import { TIME_SEARCH_DEBOUNCE } from "../../constant/appCommon";
import InputSimple from "../../lib/InputSimple";
import InputNumber from "../../lib/InputNumber";
import { PencilSquareIcon } from "@heroicons/react/16/solid";

export default function TaxList() {
  const { setMenuOpen, cookies } = useContext(AppContext);
  const [listPadding, setListPadding] = useState("20px");
  const [loading, setLoading] = useState(true);
  const [taxs, setTaxs] = useState([TaxListModel()]);
  const [itemDisplay, setItemDisplay] = useState(TaxListModel());
  const navbarRef = useRef();
  const [open, setOpen] = useState(false);
  const [newOpen, setNewOpen] = useState(false);
  const [readonly, setReadonly] = useState(false);
  const [itmindex, setitmindex] = useState(-1);
  const [taxById, setTaxById] = useState({});
  const [taxId, setTaxId] = useState(-1);
  const [txtTitle, settxtTitle] = useState("");
  const [mode, setMode] = useState(0);
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  function handleOpen(item, setedit, index) {
    setitmindex(index);
    if (setedit == true) {
      setReadonly(false);
      cookies.role_update.length == 0 && cookies.role_dst.length == 0
        ? setOpen(!open)
        : cookies.role_dst.findIndex((a) => a == "ALL") >= 0
        ? setOpen(!open)
        : cookies.role_update.findIndex((a) => a == "TAX") >= 0
        ? setOpen(!open)
        : setOpen(false);
      setTaxById(item);
      settxtTitle("Edit Pajak");
      setMode(2);
    } else {
      setReadonly(true);
      setOpen(!open);
      setTaxById(item);
      settxtTitle("Detail Pajak");
      setMode(1);
    }
  }

  function handleNewOpen(id) {
    cookies.role_delete.length == 0 && cookies.role_dst.length == 0
      ? setNewOpen(!newOpen)
      : cookies.role_dst.findIndex((a) => a == "ALL") >= 0
      ? setNewOpen(!newOpen)
      : cookies.role_delete.findIndex((a) => a == "TAX") >= 0
      ? setNewOpen(!newOpen)
      : setNewOpen(false);
    setTaxId(id);
  }

  function handleAdd() {
    setTaxById({ paj_lok_id: cookies.lok_id, paj_id: -1 });
    setReadonly(false);
    settxtTitle("Tambah Pajak");
    setMode(3);
    cookies.role_create.length == 0 && cookies.role_dst.length == 0
      ? setOpen(!open)
      : cookies.role_dst.findIndex((a) => a == "ALL") >= 0
      ? setOpen(!open)
      : cookies.role_create.findIndex((a) => a == "TAX") >= 0
      ? setOpen(!open)
      : setOpen(false);
  }

  const handleChange = (evt, id) => {
    setTaxById({
      ...taxById,
      [id]: evt.target.value,
    });
  };

  const handleDelete = useCallback(async () => {
    setItemDisplay(null);
    const { data, error } = await deleteTax({ paj_id: taxId });
    if (error) {
      alert("Data tidak ditemukan");
    } else {
      setLoading(true);
      setNewOpen(false);
      setTaxs([]);
      setTaxId(-1);
      const { data, error } = await getTax({ lok_id: cookies.lok_id });
      if (error) {
        alert("Data tidak ditemukan");
      } else {
        setTaxs(data);
      }
      setLoading(false);
    }
  }, [taxId]);

  const saveData = useCallback(async () => {
    setItemDisplay(null);
    const { data, error } = await saveTax(taxById);
    if (error) {
      alert("Data tidak ditemukan");
    } else {
      setLoading(true);
      setOpen(false);
      setTaxs([]);
      const { data, error } = await getTax({ lok_id: cookies.lok_id });
      if (error) {
        alert("Data tidak ditemukan");
      } else {
        setTaxs(data);
      }
      setLoading(false);
    }
  }, [taxById]);

  useEffect(() => {
    if (!cookies.lok_id) {
      navigate(topic.login.route);
    }
    const handleResponse = ({ data, error }) => {
      if (error) {
        alert("Data tidak ditemukan");
      } else {
        setTaxs(data);
      }
    };
    const init = async () => {
      if (keyword && keyword.length > 1) {
        const orderSearch = setTimeout(async () => {
          setLoading(true);
          const { data, error } = await getTax({ lok_id: cookies.lok_id, key_val: keyword });
          handleResponse({ data, error });
          setLoading(false);
        }, TIME_SEARCH_DEBOUNCE);
        return () => {
          clearTimeout(orderSearch);
        };
      } else if (!keyword) {
        setLoading(true);
        setTaxs([]);
        const { data, error } = await getTax({ lok_id: cookies.lok_id });
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
  }, [taxs, navbarRef]);

  return (
    <Fragment>
      {!loading ? null : <LoadingOverlay white />}

      <div className="h-screen-adapt bg-gray-50 overflow-hidden relative">
        <div className="top-0 inset-x-0 fixed bg-gradient-to-b from-gray-50 h-20" />
        <div className="p-2 top-0 inset-x-0 fixed z-50 mx-auto desktop:max-w-[60%]">
          <Navbar ref={navbarRef} className={`pt-2 px-2 py-2 relative`} blurred={false}>
            <div className="flex gap-3 items-center">
              <IconButton variant="text" size="md" onClick={() => setMenuOpen(true)}>
                <Bars3Icon className="h-6 w-6 stroke-2" />
              </IconButton>
              <div className="text-base font-semibold text-[#606060]">Pajak</div>
            </div>
          </Navbar>
        </div>

        <div className="pb-20 overflow-auto h-full" style={{ paddingTop: listPadding }}>
          <List className="min-h-screen divide-y divide-dashed divide-gray-400">
            {taxs.map((i, index) => {
              return (
                <ListItem key={index} className="">
                  <div className="w-full pr-2" onClick={() => handleOpen(i, false, index)}>
                    <div></div>
                    <div className="flex items-center justify-between">
                      <Typography variant="small" color="gray" className="font-normal">
                        <b>{i.paj_nama}</b>
                      </Typography>
                      <Typography color="gray" className="font-normal">
                        {`${i.paj_value}%`}
                      </Typography>
                    </div>
                  </div>
                  <ListItemSuffix>
                    <IconButton variant="text" color="blue-gray" onClick={() => handleOpen(i, true, index)}>
                      <PencilSquareIcon className="h-6 w-6 text-black-500" />
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
          <DialogHeader>{txtTitle}</DialogHeader>
          <DialogBody>
            <div className="mb-4">
              <InputSimple
                value={taxById.paj_nama}
                label="Nama Pajak"
                onChange={(evt) => handleChange(evt, "paj_nama")}
                disabled={readonly}
              />
            </div>
            <div className="mb-4">
              <InputNumber
                value={taxById.paj_value}
                label="Nilai Pajak"
                onChange={(evt) => handleChange(evt, "paj_value")}
                disabled={readonly}
                icon="%"
              />
            </div>
          </DialogBody>
          <DialogFooter className="flex gap-3 justify-between">
            <Button variant="gradient" color="blue-gray" onClick={() => setOpen(false)} className="w-full flex-1">
              <span>Batal</span>
            </Button>
            <Button
              variant="gradient"
              color={mode <= 1 ? "red" : "green"}
              onClick={mode <= 1 ? () => handleNewOpen(taxById.paj_id) : saveData}
              className="w-full flex-1"
            >
              <span>{mode <= 1 ? "Hapus" : "Konfirmasi"}</span>
            </Button>
          </DialogFooter>
        </Dialog>

        <Dialog open={newOpen} handler={handleNewOpen}>
          <DialogBody>
            <div className="text-center my-6">
              Pajak <span className="font-semibold">{taxById.paj_nama}</span> akan dihapus. Apakah anda yakin?
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
