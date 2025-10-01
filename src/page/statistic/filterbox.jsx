import { useState, useEffect, useContext } from "react";
import { Button, Drawer, Option, Select, Typography } from "@material-tailwind/react";
import { AdjustmentsVerticalIcon } from "@heroicons/react/24/outline";
import { dictionary } from "../../constant/appDictionary";
import { AppContext } from "../../AppContext";
import { cloneDeep } from "lodash";
export default function FilterBox({ open = false, setOpenFilter, month, setMonth, year, setYear }) {
  const [defMonth, setdefMonth] = useState(month);
  const [defYear, setdefYear] = useState(year);
  const [intyear, setintyear] = useState(new Date().getFullYear());
  const {lang } = useContext(AppContext);
  const [constyear, setconstyear] = useState(dictionary.yearcalender[lang]);
 
  useEffect(() => {
    if (month && year) {
      // console.log(month, year);
      if (typeof month === "number") {
        setdefMonth(month.toString());
      }
      if (typeof year === "number") {
        setdefYear(year.toString());
      }
    }
  }, [open, month, year]);

  useEffect(() => {
    const _data = cloneDeep(constyear);
    const _datar=[];
    _data.map((p, index) => {
      if(p<=intyear)
        _datar.push(p)
    })
    setconstyear(_datar)
  }, [intyear]);

  const changeMonth = (month) => {
    // console.log("month:", month);
    setdefMonth(month);
    localStorage.setItem(
      "month_stat",
      JSON.stringify({
        key: "month",
        value: Number(month),
      })
    );
  };

  const changeYear = (year) => {
    // console.log("year:", year);
    setdefYear(year);
    localStorage.setItem(
      "year_stat",
      JSON.stringify({
        key: "year",
        value: Number(year),
      })
    );
  };

  const handleFilter = () => {
    setMonth(Number(defMonth) || month);
    setYear(defYear || year);
    // console.log(Number(defMonth) || month, defYear || year);
    setOpenFilter(false);
  };

  return (
    <Drawer placement="right" open={open} onClose={() => setOpenFilter(false)} className="p-3">
      <div className="mb-6 flex items-center justify-between">
        <Typography variant="h5" color="blue-gray">
          Filter
        </Typography>
      </div>

      <div className="flex flex-col gap-4">
        <Select
          size="md"
          value={defMonth}
          onChange={changeMonth}
          color="teal"
          label={dictionary.universal.choosemonth[lang]}
        >
          {dictionary.monthcalender[lang].map((p, index) => (
            <Option value={String(index+1)}>
              {p}
            </Option>
          ))}
        </Select>
        
        <Select
          size="md"
          value={defYear}
          onChange={changeYear}
          color="teal"
          label={dictionary.universal.chooseyear[lang]}
        >
          {constyear.map((q) => (
            <Option value={String(q)}>
              {q}
            </Option>
          ))}
        </Select>
      </div>

      <Button color="teal" className="flex items-center justify-center w-full mt-5" onClick={handleFilter}>
        <AdjustmentsVerticalIcon className="w-5 h-5 mr-2" />
        {dictionary.universal.apply[lang]} Filter
      </Button>
    </Drawer>
  );
}
