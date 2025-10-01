import { Fragment, useCallback, useContext, useEffect, useRef, useState } from "react";
import { getTable, saveTable, deleteTable } from "../../api/Table";
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
  Navbar,
  Option,
  Select,
  Typography,
} from "@material-tailwind/react";
import SearchNavbar from "../../lib/SearchNavbar";
import { AdjustmentsVerticalIcon, Bars3Icon, PlusCircleIcon } from "@heroicons/react/24/outline";
import FilterChips from "../../lib/FilterChips";
import { TableListModel } from "../../model/table";
import { dictionary } from "../../constant/appDictionary";
import { useNavigate } from "react-router-dom";
import LoadingOverlay from "../../lib/LoadingOverlay";
import { topic } from "../../constant/appTopics";
import { TIME_SEARCH_DEBOUNCE } from "../../constant/appCommon";
import InputSimple from "../../lib/InputSimple";
import { cloneDeep } from "lodash";
import { CheckCircleIcon, PencilSquareIcon, XCircleIcon } from "@heroicons/react/16/solid";
import { database } from '../../lib/FirebaseConfig';
import { ref, onValue, push } from "firebase/database";

export default function tableList() {
  const { setMenuOpen, filters, setFilters, lang, cookies } = useContext(AppContext);
  const [listPadding, setListPadding] = useState("20px");
  const [loading, setLoading] = useState(true);
  const [tables, setTables] = useState([TableListModel()]);
  const [itemDisplay, setItemDisplay] = useState(TableListModel());
  const navbarRef = useRef();
  const [open, setOpen] = useState(false);
  const [newOpen, setNewOpen] = useState(false);
  const [readonly, setReadonly] = useState(false);
  const [tableById, setTableById] = useState({});
  const [tableId, setTableId] = useState(-1);
  const [txtTitle, settxtTitle] = useState("");
  const [mode, setMode] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [statusSelect, setStatusSelect] = useState("");
  const navigate = useNavigate();

  const handleFilter = (searchKey) => {
    setKeyword(searchKey);
  };
  useEffect(() => {
    const usersRef = ref(database, "pos_table"); // reference to the "users" node

    const unsubscribe = onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const usersArray = Object.entries(data).map(([key, value]) => ({
          id: key,
          ...value,
        }));
        const handleResponse = ({ data, error }) => {
          if (error) {
            alert(dictionary.universal.notfound[lang]);
          } else {
            let stringdata = JSON.stringify(data).replaceAll('"Terisi"', "true").replaceAll('"Kosong"', "false");
            setTables(JSON.parse(stringdata));
          }
        };
    
        const init = async () => {
          setLoading(true);
          setTables([]);
          const { data, error } = await getTable({ lok_id: cookies.lok_id });
          handleResponse({ data, error });
          setLoading(false);
        };
        init();
        //setUsers(usersArray);
      } else {
        alert('error update table')
        //setUsers([]);
      }
    });

    // Cleanup the listener
    return () => unsubscribe();
  }, []);

  // const sendTableToFirebase = async () => {
  //   const usersRef = ref(database, 'users'); // "users" is your "table"
  //   try {
  //     await push(usersRef, {"name":"faiz","email":"faiz@yahoo.com"});
  //     alert('Data sent successfully!');
  //   } catch (error) {
  //     console.error('Error sending data:', error);
  //   }
  // };
  useEffect(() => {
    const _tablebyid = cloneDeep(tableById);
    _tablebyid.mej_status = statusSelect == "1" ? true : false;
    setTableById(_tablebyid);
  }, [statusSelect]);

  function handleOpen(item, setedit, index) {
    console.log(item);
    if (setedit == true) {
      setReadonly(false);
      cookies.role_update.length == 0 && cookies.role_dst.length == 0
        ? setOpen(!open)
        : cookies.role_dst.findIndex((a) => a == "ALL") >= 0
        ? setOpen(!open)
        : cookies.role_update.findIndex((a) => a == "TBL") >= 0
        ? setOpen(!open)
        : setOpen(false);
      setTableById(item);
      setStatusSelect(item.mej_status ? "true" : "false");
      settxtTitle("Edit "+dictionary.table.sidebar[lang]);
      setMode(2);
    } else {
      setReadonly(true);
      setOpen(!open);
      setTableById(item);
      settxtTitle("Detail "+dictionary.table.sidebar[lang]);
      setMode(1);
    }
  }

  const handleUpdate = useCallback(
    async (item) => {
      const _tables = cloneDeep(tables);
      const indexOfId = _tables.findIndex((obj) => obj.mej_id == item.mej_id);
      _tables[indexOfId].mej_status = !item.mej_status;
      let stringdata = JSON.stringify(_tables[indexOfId])
        .replaceAll("true", '"Terisi"')
        .replaceAll("false", '"Kosong"');
      setTables(_tables);
      const usersRef = ref(database, 'pos_table'); // "users" is your "table"
      try {
        await push(usersRef, JSON.parse(stringdata));
        const init = async () => {
          const { data, error } = await saveTable(JSON.parse(stringdata));
          if (error) {
            alert(dictionary.universal.notfound[lang]);
          } else {
            setLoading(true);
            setOpen(false);
            setTables([]);
            const { data, error } = await getTable({ lok_id: cookies.lok_id });
            if (error) {
              alert(dictionary.universal.notfound[lang]);
            } else {
              let stringdata = JSON.stringify(data).replaceAll('"Terisi"', "true").replaceAll('"Kosong"', "false");
              setTables(JSON.parse(stringdata));
            }
            setLoading(false);
          }
        };
        init();
      } catch (error) {
        console.error('Error sending data:', error);
      }
      
    },
    [tables]
  );

  function handleNewOpen(id) {
    cookies.role_delete.length == 0 && cookies.role_dst.length == 0
      ? setNewOpen(!newOpen)
      : cookies.role_dst.findIndex((a) => a == "ALL") >= 0
      ? setNewOpen(!newOpen)
      : cookies.role_delete.findIndex((a) => a == "TBL") >= 0
      ? setNewOpen(!newOpen)
      : setNewOpen(false);
    setTableId(id);
  }

  function handleAdd() {
    setTableById({ mej_lok_id: cookies.lok_id, mej_id: -1 });
    setReadonly(false);
    settxtTitle(dictionary.universal.add[lang]+" "+dictionary.table.sidebar[lang]);
    setMode(3);
    cookies.role_create.length == 0 && cookies.role_dst.length == 0
      ? setOpen(!open)
      : cookies.role_dst.findIndex((a) => a == "ALL") >= 0
      ? setOpen(!open)
      : cookies.role_create.findIndex((a) => a == "TBL") >= 0
      ? setOpen(!open)
      : setOpen(false);
  }

  function handleChange(evt) {
    const value = evt.target.type === "checkbox" ? evt.target.checked : evt.target.value;
    setTableById({
      ...tableById,
      [evt.target.name]: value,
    });
  }

  const handleDelete = useCallback(async () => {
    setItemDisplay(null);
    const { data, error } = await deleteTable({ mej_id: tableId });
    if (error) {
      alert(dictionary.universal.notfound[lang]);
    } else {
      setLoading(true);
      setNewOpen(false);
      setTables([]);
      setTableId(-1);
      const { data, error } = await getTable({ lok_id: cookies.lok_id });
      if (error) {
        alert(dictionary.universal.notfound[lang]);
      } else {
        setTables(data);
      }
      setLoading(false);
    }
  }, [tableId]);

  const saveData = useCallback(async () => {
    let stringdata = JSON.stringify(tableById).replaceAll("true", '"Terisi"').replaceAll("false", '"Kosong"');
    setItemDisplay(null);
    const { data, error } = await saveTable(JSON.parse(stringdata));
    if (error) {
      alert(dictionary.universal.notfound[lang]);
    } else {
      setLoading(true);
      setOpen(false);
      setTables([]);
      const { data, error } = await getTable({ lok_id: cookies.lok_id });
      if (error) {
        alert(dictionary.universal.notfound[lang]);
      } else {
        let stringdata = JSON.stringify(data).replaceAll('"Terisi"', "true").replaceAll('"Kosong"', "false");
        setTables(JSON.parse(stringdata));
      }
      setLoading(false);
    }
  }, [tableById]);

  useEffect(() => {
    if (!cookies.lok_id) {
      navigate(topic.login.route);
    }

    const handleResponse = ({ data, error }) => {
      if (error) {
        alert(dictionary.universal.notfound[lang]);
      } else {
        let stringdata = JSON.stringify(data).replaceAll('"Terisi"', "true").replaceAll('"Kosong"', "false");
        setTables(JSON.parse(stringdata));
      }
    };

    const init = async () => {
      if (keyword && keyword.length > 1) {
        const orderSearch = setTimeout(async () => {
          setLoading(true);
          const { data, error } = await getTable({ lok_id: cookies.lok_id, key_val: keyword });
          handleResponse({ data, error });
          setLoading(false);
        }, TIME_SEARCH_DEBOUNCE);
        return () => {
          clearTimeout(orderSearch);
        };
      } else if (!keyword) {
        setLoading(true);
        setTables([]);
        const { data, error } = await getTable({ lok_id: cookies.lok_id });
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
  }, [tables, navbarRef]);

  return (
    <Fragment>
      {!loading ? null : <LoadingOverlay white />}
      <div className="h-screen-adapt bg-gray-50 overflow-hidden relative">
        <div className="top-0 inset-x-0 fixed bg-gradient-to-b from-gray-50 h-20" />
        <div className="p-2 top-0 inset-x-0 fixed z-50 mx-auto desktop:max-w-[60%]">
          <Navbar ref={navbarRef} className={`pt-2 px-2 ${!filters.length ? "pb-6" : "pb-4"} relative`} blurred={false}>
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
                <SearchNavbar onSearch={handleFilter} value={keyword} label={dictionary.search.table[lang]} />
              </div>
              <IconButton size="md" variant="text" onClick={() => setFilters(true)}>
                <AdjustmentsVerticalIcon className="h-6 w-6 stroke-2" />
              </IconButton>
            </div>
            {!filters.length ? (
              <Typography variant="small" color="gray" className="absolute right-14 bottom-1 text-xs italic">
                {dictionary.filter.itemCategory.all[lang]}
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
            {tables.map((i, index) => {
              return (
                <ListItem key={index} className="relative">
                  <div className="w-full  flex flex-col gap-1" onClick={() => handleOpen(i, false, index)}>
                    <div className="w-[90%] whitespace-nowrap overflow-hidden text-ellipsis font-semibold">
                      {i.mej_nama}
                    </div>
                    <div
                      className={`w-max py-[2px] px-2 text-[12px] font-semibold rounded-md ${
                        i.mej_status ? "bg-orange-100" : "bg-green-100"
                      }`}
                    >
                      {i.mej_status ? "Terisi" : "Kosong"}
                    </div>
                    <div className="w-max py-[2px] px-2 text-[12px] font-semibold bg-blue-100 rounded-md">
                      {i.mej_kapasitas} orang
                    </div>
                  </div>

                  <div className="action-area flex items-center absolute top-1 right-0">
                    <IconButton variant="text" color="blue-gray" onClick={() => handleOpen(i, true, index)}>
                      <PencilSquareIcon className="h-6 w-6 text-black-500" />
                    </IconButton>
                    <IconButton variant="text" color="blue-gray" onClick={() => handleUpdate(i, true, index)}>
                      {i.mej_status ? (
                        <XCircleIcon className="h-6 w-6 text-red-500" />
                      ) : (
                        <CheckCircleIcon className="h-6 w-6 text-green-500" />
                      )}
                    </IconButton>
                  </div>
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
                value={tableById.mej_nama}
                label={dictionary.dialog.table.name[lang]}
                name="mej_nama"
                onChange={handleChange}
                disabled={readonly}
              />
            </div>
            <div className="mb-4">
              <InputSimple
                value={tableById.mej_kapasitas}
                label={dictionary.dialog.table.capacity[lang]}
                name="mej_kapasitas"
                onChange={handleChange}
                disabled={readonly}
              />
            </div>
            <div className="mb-4">
              <Select
                id="select_status"
                value={statusSelect}
                onChange={setStatusSelect}
                color="teal"
                label={dictionary.dialog.table.categories[lang]}
                disabled={readonly}
              >
                <Option value="true">Kosong</Option>
                <Option value="false">Terisi</Option>
              </Select>
            </div>
          </DialogBody>

          <DialogFooter className="flex gap-3 justify-between">
            <Button variant="gradient" color="blue-gray" onClick={() => setOpen(false)} className="w-full flex-1">
              <span>{mode <= 1 ? "Kembali" : dictionary.universal.cancel[lang]}</span>
            </Button>
            <Button
              variant="gradient"
              color={mode <= 1 ? "red" : "green"}
              onClick={mode <= 1 ? () => handleNewOpen(tableById.mej_id) : saveData}
              className="w-full flex-1"
            >
              <span>{mode <= 1 ? dictionary.universal.delete[lang] : dictionary.universal.change[lang]}</span>
            </Button>
          </DialogFooter>
        </Dialog>

        <Dialog open={newOpen} handler={handleNewOpen}>
          <DialogBody>
            <div className="text-center my-6">
              {dictionary.table.sidebar[lang]} {dictionary.universal.withname[lang]} <span className="font-semibold">{tableById.mej_nama}</span> {dictionary.universal.deleteMessage[lang]}
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
