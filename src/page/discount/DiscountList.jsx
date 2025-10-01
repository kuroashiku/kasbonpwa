import { Fragment, useCallback, useContext, useEffect, useRef, useState } from "react";
import { getDiscount, saveDiscount, deleteDiscount } from "../../api/Discount";
import { AppContext } from "../../AppContext";
import {
  Button,
  Card,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  IconButton,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Navbar,
  Spinner,
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
  Typography,
} from "@material-tailwind/react";
import SearchNavbar from "../../lib/SearchNavbar";
import { AdjustmentsVerticalIcon, Bars3Icon, PlusCircleIcon } from "@heroicons/react/24/outline";
import FilterChips from "../../lib/FilterChips";
import { DiscountListModel } from "../../model/discount";
import { dictionary } from "../../constant/appDictionary";
import { formatSentenceCase } from "../../util/formatter";
import { useNavigate } from "react-router-dom";
import LoadingOverlay from "../../lib/LoadingOverlay";
import { topic } from "../../constant/appTopics";
import { TIME_SEARCH_DEBOUNCE } from "../../constant/appCommon";
import InputSimple from "../../lib/InputSimple";
import InputNumber from "../../lib/InputNumber";
import { PencilSquareIcon } from "@heroicons/react/16/solid";

export default function discountList() {
  const { setMenuOpen, filters, currency, setFilters, lang, dataLogin, cookies } = useContext(AppContext);
  const [listPadding, setListPadding] = useState("20px");
  const [loading, setLoading] = useState(true);
  const [filterOpen, setFilterOpen] = useState(false);
  const [discounts, setDiscounts] = useState([DiscountListModel()]);
  const [discountsGlobal, setDiscountsGlobal] = useState([DiscountListModel()]);
  const [itemDisplay, setItemDisplay] = useState(DiscountListModel());
  const navbarRef = useRef();
  const [open, setOpen] = useState(false);
  const [newOpen, setNewOpen] = useState(false);
  const [readonly, setReadonly] = useState(false);
  const [itmindex, setitmindex] = useState(-1);
  const [discountById, setDiscountById] = useState({});
  const [discountId, setDiscountId] = useState(-1);
  const [discountGlobalById, setDiscountGlobalById] = useState({});
  const [discountGlobalId, setDiscountGlobalId] = useState(-1);
  const [txtTitle, settxtTitle] = useState("");
  const [mode, setMode] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [currentTab, setCurrentTab] = useState("peritem");
  const navigate = useNavigate();

  const handleFilter = (searchKey) => {
    setKeyword(searchKey);
  };

  function handleOpen(item, setedit, index) {
    setitmindex(index);
    setMode(setedit);

    if (setedit == 1) {
      setReadonly(true);
      setDiscountById(item);
      settxtTitle("Detail "+dictionary.setting.discount.sidebar[lang]);
      setOpen(!open);
    } else if (setedit == 2) {
      setReadonly(false);
      setDiscountById(item);
      settxtTitle("Edit "+dictionary.setting.discount.sidebar[lang]);
      cookies.role_update.length == 0 && cookies.role_dst.length == 0
        ? setOpen(!open)
        : cookies.role_dst.findIndex((a) => a == "ALL") >= 0
        ? setOpen(!open)
        : cookies.role_update.findIndex((a) => a == "DIS") >= 0
        ? setOpen(!open)
        : setOpen(false);
    } else if (setedit == 3) {
      setDiscountById({ dis_lok_id: cookies.lok_id, dis_id: -1 });
      setReadonly(false);
      settxtTitle(dictionary.universal.add[lang]+" "+dictionary.setting.discount.sidebar[lang]);
      cookies.role_create.length == 0 && cookies.role_dst.length == 0
        ? setOpen(!open)
        : cookies.role_dst.findIndex((a) => a == "ALL") >= 0
        ? setOpen(!open)
        : cookies.role_create.findIndex((a) => a == "DIS") >= 0
        ? setOpen(!open)
        : setOpen(false);
    } else if (setedit == 4) {
      setReadonly(true);
      setDiscountById(item);
      settxtTitle("Detail "+dictionary.universal.globaldiscount[lang]);
      setOpen(!open);
    } else if (setedit == 5) {
      setReadonly(false);
      setDiscountById(item);
      settxtTitle("Edit "+dictionary.universal.globaldiscount[lang]);
      cookies.role_update.length == 0 && cookies.role_dst.length == 0
        ? setOpen(!open)
        : cookies.role_dst.findIndex((a) => a == "ALL") >= 0
        ? setOpen(!open)
        : cookies.role_update.findIndex((a) => a == "DIS") >= 0
        ? setOpen(!open)
        : setOpen(false);
    } else if (setedit == 6) {
      setDiscountById({ dis_lok_id: cookies.lok_id, dis_id: -1, dis_global: "true" });
      setReadonly(false);
      settxtTitle(dictionary.universal.add[lang]+" "+dictionary.universal.globaldiscount[lang]);
      cookies.role_create.length == 0 && cookies.role_dst.length == 0
        ? setOpen(!open)
        : cookies.role_dst.findIndex((a) => a == "ALL") >= 0
        ? setOpen(!open)
        : cookies.role_create.findIndex((a) => a == "DIS") >= 0
        ? setOpen(!open)
        : setOpen(false);
    }
  }

  function handleNewOpen(id) {
    cookies.role_delete.length == 0 && cookies.role_dst.length == 0
      ? setNewOpen(!newOpen)
      : cookies.role_dst.findIndex((a) => a == "ALL") >= 0
      ? setNewOpen(!newOpen)
      : cookies.role_delete.findIndex((a) => a == "DIS") >= 0
      ? setNewOpen(!newOpen)
      : setOpen(false);
    setDiscountId(id);
  }

  const handleChange = (evt, id) => {
    setDiscountById({
      ...discountById,
      [id]: evt.target.value,
    });
  };

  const handleDelete = useCallback(async () => {
    setItemDisplay(null);
    const { data, error } = await deleteDiscount({ dis_id: discountId });
    if (error) {
      alert(dictionary.universal.notfound[lang]);
    } else {
      setLoading(true);
      setDiscounts([]);
      setDiscountId(-1);
      const { data, error } = await getDiscount({ lok_id: cookies.lok_id });
      if (error) {
        alert(dictionary.universal.notfound[lang]);
      } else {
        setDiscounts(data);
        setNewOpen(false);
        setOpen(false);
      }
      setLoading(false);
    }
  }, [discountId]);

  const saveData = useCallback(async () => {
    setItemDisplay(null);
    const { data, error } = await saveDiscount(discountById);
    if (error) {
      alert(dictionary.universal.notfound[lang]);
    } else {
      setLoading(true);
      setOpen(false);
      mode <= 3 ? setDiscounts([]) : setDiscountsGlobal([]);
      const { data, error } = await getDiscount({ lok_id: cookies.lok_id, dis_global: mode <= 3 ? null : "true" });
      if (error) {
        alert(dictionary.universal.notfound[lang]);
      } else {
        mode <= 3 ? setDiscounts(data) : setDiscountsGlobal(data);
      }
      setLoading(false);
    }
  }, [discountById]);

  useEffect(() => {
    if (!cookies.lok_id) {
      navigate(topic.login.route);
    }
    const handleResponse = ({ data, error }) => {
      if (error) {
        alert(dictionary.universal.notfound[lang]);
      } else {
        setDiscounts(data);
      }
    };
    const handleResponseGlobal = ({ data, error }) => {
      if (error) {
        alert(dictionary.universal.notfound[lang]);
      } else {
        setDiscountsGlobal(data);
      }
    };
    const init2 = async () => {
      if (keyword && keyword.length > 1) {
        const orderSearch = setTimeout(async () => {
          setLoading(true);
          const { data, error } = await getDiscount({ lok_id: cookies.lok_id, key_val: keyword, dis_global: "true" });
          handleResponseGlobal({ data, error });
          setLoading(false);
        }, TIME_SEARCH_DEBOUNCE);
        return () => {
          clearTimeout(orderSearch);
        };
      } else if (!keyword) {
        setLoading(true);
        setDiscountsGlobal([]);
        const { data, error } = await getDiscount({ lok_id: cookies.lok_id, dis_global: "true" });
        handleResponseGlobal({ data, error });
        setLoading(false);
      }
    };
    init2();
    const init = async () => {
      if (keyword && keyword.length > 1) {
        const orderSearch = setTimeout(async () => {
          setLoading(true);
          const { data, error } = await getDiscount({ lok_id: cookies.lok_id, key_val: keyword, dis_global: null });
          handleResponse({ data, error });
          setLoading(false);
        }, TIME_SEARCH_DEBOUNCE);
        return () => {
          clearTimeout(orderSearch);
        };
      } else if (!keyword) {
        setLoading(true);
        setDiscounts([]);
        const { data, error } = await getDiscount({ lok_id: cookies.lok_id, dis_global: null });
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
  }, [discounts, navbarRef]);
  return (
    <Fragment>
      {!loading ? null : <LoadingOverlay white />}
      <div className="h-screen-adapt bg-gray-50 overflow-hidden relative">
        <div className="p-2 top-0 inset-x-0 fixed z-50 mx-auto desktop:max-w-[60%]">
          <Navbar ref={navbarRef} className={`pt-2 px-2 py-2 relative`} blurred={false}>
            <div className="flex gap-3 items-center">
              <IconButton variant="text" size="md" onClick={() => setMenuOpen(true)}>
                <div className="justify-items-center lowercase">
                  <Bars3Icon className="h-6 w-6 stroke-2" />
                  <div style={{fontSize:"10px",padding:"0px"}}>
                    Menu
                  </div>
                </div>
              </IconButton>
              <div className="text-base font-semibold text-[#606060]">Diskon</div>
            </div>
          </Navbar>
        </div>

        <Tabs id="custom-animation" value="peritem" className="px-2" style={{ paddingTop: listPadding }}>
          <TabsHeader>
            {/* {data.map(({ label, value }) => (
                    <Tab key={value} value={value}>
                        {label}
                    </Tab>
                    ))} */}
            <Tab key={1} value="peritem">
              Per Item
            </Tab>
            <Tab key={2} value="global">
              Global
            </Tab>
          </TabsHeader>
          <TabsBody
            animate={{
              initial: { y: 250 },
              mount: { y: 0 },
              unmount: { y: 250 },
            }}
          >
            <TabPanel key={1} value="peritem" className="p-0 min-h-screen">
              <List className="divide-y divide-dashed divide-gray-400">
                {discounts?.map((i, index) => {
                  return (
                    <ListItem key={index} className="">
                      <div className="w-full pr-2" onClick={() => handleOpen(i, 1, index)}>
                        <div></div>
                        <div className="flex items-center justify-between">
                          <Typography variant="small" color="gray" className="font-normal">
                            <b>{formatSentenceCase(i.dis_nama)}</b>
                          </Typography>
                          <Typography color="gray" className="font-normal">
                            {`${i.dis_value}%`}
                          </Typography>
                        </div>
                      </div>
                      <ListItemSuffix>
                        <IconButton variant="text" color="blue-gray" onClick={() => handleOpen(i, 2, index)}>
                          <PencilSquareIcon className="h-6 w-6 text-black-500" />
                        </IconButton>
                      </ListItemSuffix>
                    </ListItem>
                  );
                })}
              </List>
              <div className="fixed bottom-4 right-4">
                <IconButton
                  variant="filled"
                  color="teal"
                  className="rounded-full"
                  size="lg"
                  onClick={() => handleOpen({}, 3, -1)}
                >
                  <PlusCircleIcon className="h-8 w-8 text-black-500" />
                </IconButton>
              </div>
            </TabPanel>
            <TabPanel key={2} value="global" className="p-0 min-h-screen">
              <List className="divide-y divide-dashed divide-gray-400">
                {discountsGlobal?.map((i, index) => {
                  return (
                    <ListItem key={index} className="">
                      <div className="w-full pr-2" onClick={() => handleOpen(i, 4, index)}>
                        <div></div>
                        <div className="flex items-center justify-between">
                          <Typography variant="small" color="gray" className="font-normal">
                            <b>{formatSentenceCase(i.dis_nama)}</b>
                          </Typography>
                          <Typography color="gray" className="font-normal">
                            {`${i.dis_value}%`}
                          </Typography>
                        </div>
                      </div>
                      <ListItemSuffix>
                        <IconButton variant="text" color="blue-gray" onClick={() => handleOpen(i, 5, index)}>
                          <PencilSquareIcon className="h-6 w-6 text-black-500" />
                        </IconButton>
                      </ListItemSuffix>
                    </ListItem>
                  );
                })}
              </List>
              <div className="fixed bottom-4 right-4">
                <IconButton
                  variant="filled"
                  color="teal"
                  className="rounded-full"
                  size="lg"
                  onClick={() => handleOpen({}, 6, -1)}
                >
                  <PlusCircleIcon className="h-8 w-8 text-black-500" />
                </IconButton>
              </div>
            </TabPanel>
            {/* {data.map(({ value, desc }) => (
              <TabPanel key={value} value={value}>
                {desc}
              </TabPanel>
            ))} */}
          </TabsBody>
        </Tabs>

        <Dialog open={open} handler={handleOpen}>
          <DialogHeader>{txtTitle}</DialogHeader>
          <DialogBody>
            <div className="mb-4">
              <InputSimple
                value={discountById.dis_nama}
                label={dictionary.dialog.discount.name[lang]}
                onChange={(evt) => handleChange(evt, "dis_nama")}
                disabled={readonly}
              />
            </div>
            <div className="mb-4">
              <InputNumber
                value={discountById.dis_value}
                label={dictionary.dialog.discount.value[lang]}
                onChange={(evt) => handleChange(evt, "dis_value")}
                disabled={readonly}
                icon="%"
              />
            </div>
          </DialogBody>
          <DialogFooter className="flex gap-3 justify-between">
            <Button variant="gradient" color="blue-gray" onClick={() => setOpen(false)} className="w-full flex-1">
              <span>{mode == 1 || mode == 4 ? "Kembali" : dictionary.universal.cancel[lang]}</span>
            </Button>
            <Button
              variant="gradient"
              color={mode == 1 ? "red" : "green"}
              onClick={mode == 1 ? () => handleNewOpen(discountById.dis_id) : saveData}
              className="w-full flex-1"
            >
              <span>{mode == 1 || mode == 4 ? dictionary.universal.delete[lang] : dictionary.universal.confirm[lang]}</span>
            </Button>
          </DialogFooter>
        </Dialog>

        <Dialog open={newOpen} handler={handleNewOpen}>
          <DialogBody>
            <div className="text-center my-6">
              {dictionary.setting.discount.sidebar[lang]} {dictionary.universal.withname[lang]} <span className="font-semibold">{discountById.dis_nama}</span> {dictionary.universal.deleteMessage[lang]}
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
