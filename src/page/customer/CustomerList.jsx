import { Fragment, useCallback, useContext, useEffect, useRef, useState } from "react";
import { getCustomers, saveCustomer, deleteCustomer } from "../../api/Customer";
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
  Chip,
} from "@material-tailwind/react";
import SearchNavbar from "../../lib/SearchNavbar";
import { Bars3Icon, TrashIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import { PencilSquareIcon, PhoneIcon } from "@heroicons/react/24/solid";
import { CustomerListModel } from "../../model/customer";
import { dictionary } from "../../constant/appDictionary";
import LoadingOverlay from "../../lib/LoadingOverlay";
import { TIME_SEARCH_DEBOUNCE } from "../../constant/appCommon";
import InputSimple from "../../lib/InputSimple";

export default function CustomerList() {
  const { setMenuOpen, lang, cookies } = useContext(AppContext);
  const [listPadding, setListPadding] = useState("20px");
  const [loading, setLoading] = useState(true);
  const [customers, setCustomers] = useState([CustomerListModel()]);
  const [itemDisplay, setItemDisplay] = useState(CustomerListModel());
  const navbarRef = useRef();
  const [open, setOpen] = useState(false);
  const [newOpen, setNewOpen] = useState(false);
  const [readonly, setReadonly] = useState(false);
  const [customerById, setCustomerById] = useState({});
  const [customerId, setCustomerId] = useState(-1);
  const [txtTitle, settxtTitle] = useState("");
  const [mode, setMode] = useState(0);
  const [keyword, setKeyword] = useState("");

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
        : cookies.role_update.findIndex((a) => a == "CUST") >= 0
        ? setOpen(!open)
        : setOpen(false);
      setCustomerById(item);
      settxtTitle("Edit "+dictionary.customer.sidebar[lang]);
      setMode(2);
    } else {
      setReadonly(true);
      setOpen(!open);
      setCustomerById(item);
      settxtTitle("Detail "+dictionary.customer.sidebar[lang]);
      setMode(1);
    }
  }
  function handleNewOpen(id) {
    cookies.role_delete.length == 0 && cookies.role_dst.length == 0
      ? setNewOpen(!newOpen)
      : cookies.role_dst.findIndex((a) => a == "ALL") >= 0
      ? setNewOpen(!newOpen)
      : cookies.role_delete.findIndex((a) => a == "CUST") >= 0
      ? setNewOpen(!newOpen)
      : setOpen(false);
    setCustomerId(id);
  }
  function handleAdd() {
    setCustomerById({ cus_com_id: cookies.com_id, cus_id: -1 });
    setReadonly(false);
    settxtTitle(dictionary.universal.add[lang]+" "+dictionary.customer.sidebar[lang]);
    setMode(3);
    cookies.role_create.length == 0 && cookies.role_dst.length == 0
      ? setOpen(!open)
      : cookies.role_dst.findIndex((a) => a == "ALL") >= 0
      ? setOpen(!open)
      : cookies.role_create.findIndex((a) => a == "CUST") >= 0
      ? setOpen(!open)
      : setOpen(false);
  }

  function handleChange(evt) {
    const value = evt.target.type === "checkbox" ? evt.target.checked : evt.target.value;
    setCustomerById({
      ...customerById,
      [evt.target.name]: value,
    });
  }

  const handleDelete = useCallback(async () => {
    setItemDisplay(null);
    const { data, error } = await deleteCustomer({ cus_id: customerId });
    if (error) {
      alert(dictionary.universal.notfound[lang]);
    } else {
      setLoading(true);
      setNewOpen(false);
      setCustomers([]);
      setCustomerId(-1);
      const { data, error } = await getCustomers({ com_id: cookies.com_id });
      if (error) {
        alert(dictionary.universal.notfound[lang]);
      } else {
        setCustomers(data);
      }
      setLoading(false);
    }
  }, [customerId]);

  const saveData = useCallback(async () => {
    setItemDisplay(null);
    const { data, error } = await saveCustomer(customerById);
    if (error) {
      alert(dictionary.universal.notfound[lang]);
    } else {
      setLoading(true);
      setOpen(false);
      setCustomers([]);
      const { data, error } = await getCustomers({ com_id: cookies.com_id });
      if (error) {
        alert(dictionary.universal.notfound[lang]);
      } else {
        setCustomers(data);
      }
      setLoading(false);
    }
  }, [customerById]);

  useEffect(() => {
    const handleResponse = ({ data, error }) => {
      if (error) {
        alert(dictionary.universal.notfound[lang]);
      } else {
        setCustomers(data);
      }
    };
    const init = async () => {
      if (keyword && keyword.length > 1) {
        const orderSearch = setTimeout(async () => {
          setLoading(true);
          const { data, error } = await getCustomers({ com_id: cookies.com_id, key_val: keyword });
          handleResponse({ data, error });
          setLoading(false);
        }, TIME_SEARCH_DEBOUNCE);
        return () => {
          clearTimeout(orderSearch);
        };
      } else if (!keyword) {
        setLoading(true);
        setCustomers([]);
        const { data, error } = await getCustomers({ com_id: cookies.com_id });
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
  }, [customers, navbarRef]);

  return (
    <Fragment>
      {!loading ? null : <LoadingOverlay white />}
      <div className="h-screen-adapt bg-gray-50 overflow-hidden relative">
        <div className="top-0 inset-x-0 fixed bg-gradient-to-b from-gray-50 h-20" />
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
                <SearchNavbar onSearch={handleFilter} value={keyword} label={dictionary.search.customer[lang]} />
              </div>
            </div>
          </Navbar>
        </div>

        <div className="pb-20 overflow-auto h-full" style={{ paddingTop: listPadding }}>
          <List className="divide-y divide-dashed divide-gray-400">
            {customers.map((i, index) => {
              return (
                <ListItem key={index} className="flex items-center justify-between px-[3px]">
                  <div className="w-full pr-2" onClick={() => handleOpen(i, false, index)}>
                    <div className="info">
                      <Typography variant="small" color="gray" className="text-[14px] font-medium mb-1">
                        <b>{i.cus_nama}</b>
                      </Typography>
                      {i.cus_wa && (
                        <div className="w-max flex gap-1 items-center align-middle px-2 py-[2px] bg-[#cff1cf] rounded-md">
                          <PhoneIcon className="h-[12px] w-[12px]" />
                          <span className=" text-[13px] font-semibold">{i.cus_wa || ""}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <ListItemSuffix>
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
                value={customerById.cus_nama}
                label={dictionary.dialog.customer.name[lang]}
                name="cus_nama"
                onChange={handleChange}
                disabled={readonly}
                maxlength={30}
              />
            </div>
            <div className="mb-4">
              <InputSimple
                value={customerById.cus_wa}
                label={dictionary.dialog.customer.wa[lang]}
                name="cus_wa"
                onChange={handleChange}
                disabled={readonly}
                maxlength={16}
              />
            </div>
          </DialogBody>
          <DialogFooter className="flex gap-3 justify-between">
            <Button variant="gradient" color="blue-gray" onClick={() => setOpen(false)} className="w-full flex-1">
              {dictionary.universal.cancel[lang]}
            </Button>
            <Button
              variant="gradient"
              color={mode <= 1 ? "orange" : "green"}
              onClick={mode <= 1 ? () => handleNewOpen(customerById.cus_id) : saveData}
              className="w-full flex-1"
            >
              <span>{mode <= 1 ? dictionary.universal.delete[lang] : dictionary.universal.confirm[lang]}</span>
            </Button>
          </DialogFooter>
        </Dialog>

        <Dialog open={newOpen} handler={handleNewOpen}>
          <DialogBody>
            <div className="text-center my-6">
              {dictionary.customer.sidebar[lang]} {dictionary.universal.withname[lang]} <span className="font-semibold">{customerById.cus_nama}</span> {dictionary.universal.deleteMessage[lang]}
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
      </div>
    </Fragment>
  );
}
