import { IconButton, List, Navbar, Typography } from "@material-tailwind/react";
import { Fragment, useContext, useEffect, useRef, useState, useCallback } from "react";
import SearchNavbar from "../../lib/SearchNavbar";
import { AdjustmentsVerticalIcon, Bars3Icon } from "@heroicons/react/24/outline";
import FilterChips from "../../lib/FilterChips";
import { AppContext } from "../../AppContext";
import { getItems } from "../../api/Item";
import { ItemListModel } from "../../model/item";
import { dictionary } from "../../constant/appDictionary";
import { useNavigate } from "react-router-dom";
import UomItemEdit from "./UomItemEdit";
import LoadingOverlay from "../../lib/LoadingOverlay";
import { TIME_SEARCH_DEBOUNCE } from "../../constant/appCommon";
import UOMItemScrollSm from "./UomItemScrollSm";
import UomItemScrollMd from "./UomItemScrollMd";
import ItemFilter from "../item/ItemFilter";
import { cloneDeep, filter } from "lodash";
import { FilterItemModel } from "../../model/filter";

export default function UomItemList() {
  const { setMenuOpen, filters, setFilters, lang, rowsPerPage, cookies, semiDesktopMode } = useContext(AppContext);
  const [listPadding, setListPadding] = useState("20px");
  const [loading, setLoading] = useState(true);
  const [filterOpen, setFilterOpen] = useState(false);
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const [items, setItems] = useState([ItemListModel()]);
  const [selectedItem, setSelectedItem] = useState(ItemListModel());
  const [submitCount, setSubmitCount] = useState(0);
  const navbarRef = useRef();
  const [page, setPage] = useState(1);
  const [openFilter, setOpenFilter] = useState(false);
  const [clearFilter, setClearFilter] = useState(false);
  const handleFilter = (searchKey) => {
    setKeyword(searchKey);
  };
  const openDrawerRight = () => setOpenFilter(true);

  useEffect(() => {
    setItems([]);
    setPage(1);
    setTimeout(() => initData(), 100);
  }, [keyword, filters]);

  useEffect(() => {
    if (page > 1) initData();
  }, [page]);

  const handleResponse = ({ data, error }) => {
    if (error) {
      alert("Terjadi Kesalahan");
    } else {
      setItems(data);
    }
  };

  const handleAppendResponse = ({ data, error }) => {
    if (error) {
      alert("Terjadi Kesalahan");
    } else {
      setItems([...items, ...data]);
    }
  };

  const handleCheckFilter = useCallback(
    (item) => {
      setPage(1);
      setItems([]);
      const oldArray = [...filters];
      const indexOfId = oldArray.findIndex((a) => a.value == item);
      if (indexOfId >= 0) {
        oldArray.splice(indexOfId, 1);
        setFilters(oldArray);
      } else {
        const newFilter = FilterItemModel();
        newFilter.key = "category";
        newFilter.value = item;
        setFilters([...oldArray, newFilter]);
      }
    },
    [filters]
  );

  useEffect(() => {
    const _filters = cloneDeep(filters);
    let _newfilter = _filters.filter(function (object) {
      return object.key !== "category";
    });
    setFilters(_newfilter);
  }, [clearFilter]);

  const setFilterChips = (filterChips) => {
    setPage(1);
    setItems([]);
    setFilters(filterChips);
  };

  // useEffect(()=>{
  //     setSelectedItem(null);
  //     if(keyword && keyword.length > 1){
  //         const orderSearch = setTimeout(async()=>{
  //             setPage(1);
  //             setLoading(true);
  //             const {data, error} = await getItems({
  //                 lok_id:cookies.lok_id,
  //                 key_val:keyword,
  //                 page: 1,
  //                 rows: rowsPerPage
  //             });
  //             handleResponse({data, error});
  //             setLoading(false);
  //         },TIME_SEARCH_DEBOUNCE);
  //         return ()=>{
  //             clearTimeout(orderSearch);
  //         }
  //     }else if(!keyword){
  //         const init= async()=> {
  //             setItems([]);
  //             setLoading(true);
  //             setPage(1);
  //             const {data, error} = await getItems({
  //                 lok_id:cookies.lok_id,
  //                 page: 1,
  //                 rows: rowsPerPage
  //             });
  //             handleResponse({data, error});
  //             setLoading(false);
  //         }
  //         init();
  //     }
  // },[keyword, submitCount]);

  const initData = useCallback(() => {
    const _categoryFilter = filters.find((f) => f.key === "category");
    const _categories = [];
    const _filters = cloneDeep(filters);
    let _newfilter = _filters.filter(function (object) {
      return object.key === "category";
    });
    let filterProps = {};
    let strcategory = "";
    _newfilter.map((i, index) => {
      strcategory =
        strcategory + (i.value == "TANPA KATEGORI" ? " itm_kategori IS NULL OR" : ' itm_kategori="' + i.value + '" OR');
    });
    if (_categoryFilter) {
      filterProps = {
        category: strcategory.slice(0, -2),
      };
    }
    if (keyword && keyword.length > 1) {
      const orderSearch = setTimeout(async () => {
        // setPage(1);
        setLoading(true);
        const { data, error } = await getItems({
          lok_id: cookies.lok_id,
          key_val: keyword,
          page: page,
          rows: rowsPerPage,
          ...filterProps,
        });
        if (page <= 1) handleResponse({ data, error });
        else handleAppendResponse({ data, error });
        setLoading(false);
      }, TIME_SEARCH_DEBOUNCE);
      return () => {
        clearTimeout(orderSearch);
      };
    } else if (!keyword) {
      const init = async () => {
        // setItems([]);
        setLoading(true);
        // setPage(1);
        const { data, error } = await getItems({
          lok_id: cookies.lok_id,
          page: page,
          rows: rowsPerPage,
          ...filterProps,
        });
        if (page <= 1) handleResponse({ data, error });
        else handleAppendResponse({ data, error });
        setLoading(false);
      };
      init();
    }
  }, [keyword, filters, page, submitCount]);

  useEffect(() => {
    //dihandle jika sebelumnya items sudah ada di list
    if (items[0] && items[0].itm_id && !filters[0]) {
      const init = async () => {
        const { data, error } = await getItems({
          lok_id: cookies.lok_id,
          page: page,
          rows: rowsPerPage,
        });
        handleAppendResponse({ data, error });
      };
      init();
    }
  }, [page, filters]);

  useEffect(() => {
    if (navbarRef.current) {
      setListPadding(`${navbarRef.current.offsetHeight + 20}px`);
    }
  }, [items, navbarRef]);

  const handleSelect = (item = ItemListModel()) => {
    cookies.role_update.length == 0 && cookies.role_dst.length == 0
      ? setSelectedItem(item)
      : cookies.role_dst.findIndex((a) => a == "ALL") >= 0
      ? setSelectedItem(item)
      : cookies.role_update.findIndex((a) => a == "CONV") >= 0
      ? setSelectedItem(item)
      : null;
  };
  console.log(selectedItem)
  if (selectedItem && selectedItem.itm_id>0) {
    return (
      <UomItemEdit
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        onSubmit={() => setSubmitCount(submitCount + 1)}
      />
    );
  }
  return (
    <Fragment>
      {!loading ? null : <LoadingOverlay white />}
      <div className="h-screen-adapt bg-gray-50 overflow-hidden relative">
        <div className="pb-20 overflow-auto h-full" style={{ paddingTop: listPadding }}>
          {!items.length && !loading ? (
            <div className="mx-auto py-20 w-fit">{dictionary.stock.item.noItems[lang]}</div>
          ) : semiDesktopMode ? (
            <UomItemScrollMd
              onSelect={handleSelect}
              items={items}
              onLoad={() => setPage(page + 1)}
              infinite={!keyword}
            />
          ) : (
            <List className="divide-y divide-dashed divide-gray-400">
              <UOMItemScrollSm
                onSelect={handleSelect}
                items={items}
                onLoad={() => setPage(page + 1)}
                infinite={!keyword}
              />
            </List>
          )}
        </div>
        <div className="top-0 inset-x-0 fixed bg-gradient-to-b from-gray-50 h-20" />
        <div className="p-2 top-0 inset-x-0 fixed z-50 mx-auto desktop:max-w-[60%]">
          <Navbar ref={navbarRef} className={`pt-2 px-2 ${!filters.length ? "pb-6" : "pb-4"} relative`} blurred={false}>
            <div className="flex items-center">
              <IconButton variant="text" size="md" onClick={() => setMenuOpen(true)}>
                <Bars3Icon className="h-6 w-6 stroke-2" />
              </IconButton>
              <div className="mx-2 flex-grow">
                <SearchNavbar onSearch={setKeyword} label={"Satuan & Konversi"} />
              </div>
              <IconButton size="md" variant="text" onClick={openDrawerRight}>
                <AdjustmentsVerticalIcon className="h-6 w-6 stroke-2" />
              </IconButton>
            </div>
            {!filters.length ? (
              <Typography variant="small" color="gray" className="absolute right-14 bottom-1 text-xs italic">
                Semua Kategori
              </Typography>
            ) : (
              <div className="px-2 pt-4">
                <FilterChips filters={filters} onSetFilters={setFilterChips} />
              </div>
            )}
          </Navbar>
        </div>
      </div>
      <ItemFilter
        open={openFilter}
        onClose={() => setOpenFilter(false)}
        onCheck={handleCheckFilter}
        onClear={() => setClearFilter(!clearFilter)}
        checkedIds={filters.map((i, index) => i.value)}
      />
    </Fragment>
  );
}
