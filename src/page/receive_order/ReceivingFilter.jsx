import { Button, Card, CardBody, Collapse, Drawer, Input, Switch, Typography } from "@material-tailwind/react";
import { useState } from "react";
import { formatDate, formatRangeDate } from "../../util/formatter";
import { DayPicker } from "react-day-picker";
import { cloneDeep, filter } from "lodash";
import { FilterItemModel } from "../../model/filter";
import { useCallback } from "react";
import { useRef } from "react";
import { AdjustmentsVerticalIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";
import { useContext } from "react";
import { AppContext } from "../../AppContext";

export default function ReceivingFilter({ open = false, onClose = () => {}, onApply = () => {} }) {
  const { filters } = useContext(AppContext);
  const [showCalendar, setShowCalendar] = useState(false);
  const [isDateRange, setIsDateRange] = useState(false);
  const [filtersTemp, setFiltersTemp] = useState([]);
  const calendarRef = useRef(null);
  
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
      if (dateRange.from || dateRange.to) {
        const newFilter = FilterItemModel();
        newFilter.key = "date";
        newFilter.valueMin = dateRange.from;
        newFilter.valueMax = dateRange.to;
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
      const _filters = cloneDeep(filtersTemp);
      const dateIndex = _filters.findIndex((f) => f.key === "date");
      if (date) {
        const newFilter = FilterItemModel();
        newFilter.key = "date";
        newFilter.value = date;
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

  const dateFilter = filtersTemp.find((f) => f.key === "date");

  return (
    <Drawer placement="right" open={open} onClose={onClose} className="p-3">
      <div className="mb-6 flex items-center justify-between">
        <Typography variant="h5" color="blue-gray">
          Filter
        </Typography>
      </div>
      {/* //<Button onClick={toggleOpen}>Open Collapse</Button> */}
      <div className="grid grid-cols-5 gap-6 p-2">
        <div className="col-span-3 w-10">
          <Input
            color="teal"
            label="Pilih Tanggal"
            onChange={() => {}}
            onClick={() => setShowCalendar(true)}
            value={
              !dateFilter
                ? ""
                : isDateRange
                ? formatRangeDate(dateFilter.valueMin, dateFilter.valueMax)
                : formatDate(dateFilter.value)
            }
          />
        </div>
        <div className="col-span-2">
          <div className="text-xs ml-2">Dengan Range</div>
          <div className="flex justify-center">
            <Switch color="teal" onChange={() => setIsDateRange(!isDateRange)} />
          </div>
        </div>
      </div>

      <Collapse open={showCalendar}>
        <Card className="mx-auto w-5/6" ref={calendarRef}>
          <CardBody className="!p-0 ">
            <div style={{ transform: "scale(0.8) translate(-40px, -10px)" }}>
              {isDateRange ? (
                <div>
                  <DayPicker
                    mode="range"
                    selected={dateFilter ? { from: dateFilter.valueMin, to: dateFilter.valueMax } : {}}
                    onSelect={(range) => onDateRangeChange(range ?? {})}
                    captionLayout="dropdown"
                    fromYear={2010}
                    toYear={new Date().getFullYear()}
                  />
                </div>
              ) : (
                <div>
                  <DayPicker
                    mode="single"
                    selected={dateFilter ? dateFilter.value : null}
                    onSelect={onDateChange}
                    captionLayout="dropdown"
                    fromYear={2010}
                    toYear={new Date().getFullYear()}
                  />
                </div>
              )}
            </div>
          </CardBody>
        </Card>
      </Collapse>
      <Button
        color="teal"
        className="flex items-center justify-center w-full mt-5"
        onClick={() => onApply(filtersTemp)}
      >
        <AdjustmentsVerticalIcon className="w-5 h-5 mr-2" />
        Terapkan Filter
      </Button>
    </Drawer>
  );
}
