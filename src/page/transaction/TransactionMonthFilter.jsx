import { Button, Card, CardBody, Checkbox, Collapse, Drawer, Input, Switch, Typography } from "@material-tailwind/react";
import { useState } from "react";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { formatDate, formatRangeDate } from "../../util/formatter";
import { DayPicker } from "react-day-picker";
import { MonthPicker, MonthInput } from 'react-lite-month-picker';
import { cloneDeep, filter } from "lodash";
import { FilterItemModel } from "../../model/filter";
import { useCallback } from "react";
import { useRef } from "react";
import { AdjustmentsVerticalIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";
import { useContext } from "react";
import { AppContext } from "../../AppContext";
import { Calendar } from "react-multi-date-picker";
import { dictionary } from "../../constant/appDictionary";
export default function TransactionMonthFilter({ open = false, onClose = () => {}, onApply = () => {} }) {
  const { filters,lang } = useContext(AppContext);
  const [showCalendar, setShowCalendar] = useState(false);
  const [isDateRange, setIsDateRange] = useState(false);
  const [filtersTemp, setFiltersTemp] = useState([]);
  const [checkedIds, setCheckedIds] = useState([]);
  const calendarRef = useRef(null);
  const arrayfilter=["semua","lunas","belum","tidak"];
  const [arrayfill, setArrayfill] = useState([]);
  const [selectedMonthData, setSelectedMonthData] = useState({
    month: 9,
    year: 2023,
  });
  const [value, setValue] = useState();
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false);
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [calendarRef]);

  useEffect(() => {
    setFiltersTemp(filters);
  }, [filters]);

  const onDateRangeChange = useCallback(
    (dateRange = { from: 0, to: 0 }) => {
      const _filters = cloneDeep(filtersTemp);
      const dateIndex = _filters.findIndex((f) => f.key === "date");
      var dateawal= new Date(dateRange[0].month.number+"/01/"+dateRange[0].year)
      
      if(dateRange[1])
      var dateakhir= new Date(dateRange[1].month.number+"/"+dateRange[1].month.length+"/"+dateRange[1].year)
      else
      var dateakhir= new Date(dateRange[0].month.number+"/"+dateRange[0].month.length+"/"+dateRange[0].year)
      var dateawalnew = new Date(dateawal.getTime() - (dateawal.getTimezoneOffset() * 60000 ))
                    .toISOString()
                    .split("T")[0];
      var dateakhirnew = new Date(dateakhir.getTime() - (dateakhir.getTimezoneOffset() * 60000 ))
                    .toISOString()
                    .split("T")[0];
      if (dateRange[0] || dateRange[1]) {
        const newFilter = FilterItemModel();
        newFilter.key = "date";
        //if(dateRange[1]){
          newFilter.valueMin = dateawalnew;
          newFilter.valueMax = dateakhirnew;
        // }
        // else
        //   newFilter.value = dateawal;

        if (dateIndex >= 0) {
          _filters[dateIndex] = newFilter;
        } else {
          _filters.push(newFilter);
        }
      } else {
        if (dateIndex >= 0) {
          _filters.splice(dateIndex, 1);
        }
      }
      setFiltersTemp(_filters);
    },
    [filtersTemp]
  );

  const onDateChange = useCallback(
    (date = new Date()) => {
      console.log(date[0])
      // const _filters = cloneDeep(filtersTemp);
      // const dateIndex = _filters.findIndex((f) => f.key === "date");
      // if (date) {
      //   const newFilter = FilterItemModel();
      //   newFilter.key = "date";
      //   newFilter.value = date;
      //   if (dateIndex >= 0) {
      //     _filters[dateIndex] = newFilter;
      //   } else {
      //     _filters.push(newFilter);
      //   }
      // } else {
      //   if (dateIndex >= 0) {
      //     _filters.splice(dateIndex, 1);
      //   }
      // }
      // setFiltersTemp(_filters);
    },
    [filtersTemp]
  );
  const handleCheckChange = useCallback(
      (item) => {
        const _filters = cloneDeep(filtersTemp);
        const oldArray = [...checkedIds];
        const piutIndex = _filters.findIndex((f) => f.key === "categoryPiutang");
        const indexOfId = oldArray.indexOf(item);
        let _newfilter = _filters.filter(function (object) {
          return object.key !== "categoryPiutang";
        });
        let dataarr=[];
        if (indexOfId >= 0) {
          oldArray.splice(indexOfId, 1);
          dataarr=oldArray;
          setCheckedIds(oldArray);
        } else {
          dataarr=[...oldArray, item];
          setCheckedIds([...oldArray, item]);
        }
        dataarr.forEach((_item, index) => {
          const newFilter = FilterItemModel();
          newFilter.key = "categoryPiutang";
          newFilter.value = _item;
          _newfilter.push(newFilter);
        });
        setFiltersTemp(_newfilter);
      },
      [checkedIds,filtersTemp]
    );
    // const handleCheckChangeNew = useCallback(
    //     (item) => {
    //       const _filters = cloneDeep(filtersTemp);
    //       const oldArray = [...checkedIds];
    //       const piutIndex = _filters.findIndex((f) => f.key === "category");
    //       //const indexOfId = oldArray.indexOf(item.itm_id);
    //       if (piutIndex >= 0) {
    //         oldArray.splice(indexOfId, 1);
    //         newOldArray.splice(indexOfId, 1);
    //         setItemCheckId(oldArray);
    //         setItemCheckName(newOldArray);
    //       } else {
    //         setItemCheckId([...oldArray, item.itm_id]);
    //         setItemCheckName([...newOldArray, formatSentenceCase(item.itm_nama)]);
    //       }
    //     },
    //     [itemCheckId]
    //   );
  // const handleCheckFilter = useCallback(
  //   (item) => {
  //     const oldArray = [...filters];
  //     const indexOfId = oldArray.findIndex((a) => a.value == item);
  //     if (indexOfId >= 0) {
  //       oldArray.splice(indexOfId, 1);
  //       setFiltersTemp(oldArray);
  //     } else {
  //       const newFilter = FilterItemModel();
  //       newFilter.key = "category";
  //       newFilter.value = item;
  //       setFiltersTemp([...oldArray, newFilter]);
  //     }
  //     console.log(filters)
  //   },
  //   [filters]
  // );
  const dateFilter = filtersTemp.find((f) => f.key === "date");

  return (
    <Drawer placement="right" open={open} onClose={onClose} className="p-3">
      <Calendar
      value={value}
      onlyMonthPicker
      range
      onChange={onDateRangeChange}
    />
  <Button
         color="teal"
         className="flex items-center justify-center w-full mt-5"
         onClick={() => {onApply(filtersTemp);setCheckedIds([])}}
       >
         <AdjustmentsVerticalIcon className="w-5 h-5 mr-2" />
         {dictionary.universal.apply[lang]} Filter
       </Button>
    </Drawer>
  )
  // return (
  //   <Drawer placement="right" open={open} onClose={onClose} className="p-3">
  //     <div className="mb-6 flex items-center justify-between">
  //       <Typography variant="h5" color="blue-gray">
  //         Filter
  //       </Typography>
  //     </div>
  //     {/* //<Button onClick={toggleOpen}>Open Collapse</Button> */}
  //     <div className="grid grid-cols-5 gap-6 p-2">
  //       <div className="col-span-3 w-10">
  //         <Input
  //           color="teal"
  //           label={dictionary.universal.choosedate[lang]}
  //           onChange={() => {}}
  //           onClick={() => setShowCalendar(true)}
  //           value={
  //             !dateFilter
  //               ? ""
  //               : isDateRange
  //               ? formatRangeDate(dateFilter.valueMin, dateFilter.valueMax)
  //               : formatDate(dateFilter.value)
  //           }
  //         />
  //       </div>
  //       <div className="col-span-2">
  //         <div className="text-xs ml-2">Dengan Range</div>
  //         <div className="flex justify-center">
  //           <Switch color="teal" onChange={() => setIsDateRange(!isDateRange)} />
  //         </div>
  //       </div>
  //     </div>

  //     <Collapse open={showCalendar}>
  //       <Card className="mx-auto w-5/6" ref={calendarRef}>
  //         <CardBody className="!p-0 ">
  //           <div style={{ transform: "scale(0.8) translate(-40px, -10px)" }}>
  //             {isDateRange ? (
  //               <div>
  //                 <DayPicker
  //                   mode="range"
  //                   selected={dateFilter ? { from: dateFilter.valueMin, to: dateFilter.valueMax } : {}}
  //                   onSelect={(range) => onDateRangeChange(range ?? {})}
  //                   captionLayout="dropdown"
  //                   fromYear={2010}
  //                   toYear={new Date().getFullYear()}
  //                 />
  //               </div>
  //             ) : (
  //               <div>
  //                 <DayPicker
  //                   mode="single"
  //                   selected={dateFilter ? dateFilter.value : null}
  //                   onSelect={onDateChange}
  //                   captionLayout="dropdown"
  //                   fromYear={2010}
  //                   toYear={new Date().getFullYear()}
  //                 />
  //               </div>
  //             )}
  //           </div>
  //         </CardBody>
  //       </Card>
  //     </Collapse>
  //     <div className="flex flex-col gap-1 mb-2">
  //         <div className="flex gap-1">
  //           <div className="flex text-sm">
  //             Piutang Lunas
  //             <Checkbox size={4} color="teal" checked={checkedIds.includes('Cicilan lunas')} onChange={()=>handleCheckChange('Cicilan lunas')}  />
  //             Piutang Belum Lunas
  //             <Checkbox size={4} color="teal" checked={checkedIds.includes('Cicilan belum lunas')} onChange={()=>handleCheckChange('Cicilan belum lunas')}  />
  //             Tidak Punya piutang
  //             <Checkbox size={4} color="teal" checked={checkedIds.includes('Tidak pernah mencicil')} onChange={()=>handleCheckChange('Tidak pernah mencicil')}  />
  //           </div>
  //         </div>
  //     </div>
  //     <Button
  //       color="teal"
  //       className="flex items-center justify-center w-full mt-5"
  //       onClick={() => {onApply(filtersTemp);setCheckedIds([])}}
  //     >
  //       <AdjustmentsVerticalIcon className="w-5 h-5 mr-2" />
  //       {dictionary.universal.apply[lang]} Filter
  //     </Button>
  //   </Drawer>
  // );
}
