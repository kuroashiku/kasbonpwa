import { useState, useEffect } from "react";
import { Button, Drawer, Option, Select, Typography } from "@material-tailwind/react";
import { AdjustmentsVerticalIcon } from "@heroicons/react/24/outline";

export default function FilterBox({ open = false, setOpenFilter, month, setMonth, year, setYear }) {
  const [defMonth, setdefMonth] = useState(month);
  const [defYear, setdefYear] = useState(year);

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
        <Select size="md" label="Pilih Bulan" value={defMonth} onChange={changeMonth}>
          <Option value="1">Januari</Option>
          <Option value="2">Februari</Option>
          <Option value="3">Maret</Option>
          <Option value="4">April</Option>
          <Option value="5">Mei</Option>
          <Option value="6">Juni</Option>
          <Option value="7">Juli</Option>
          <Option value="8">Agustus</Option>
          <Option value="9">September</Option>
          <Option value="10">Oktober</Option>
          <Option value="11">November</Option>
          <Option value="12">Desember</Option>
        </Select>

        <Select size="md" label="Pilih Tahun" value={defYear} onChange={changeYear}>
          <Option value="2020">2020</Option>
          <Option value="2021">2021</Option>
          <Option value="2022">2022</Option>
          <Option value="2023">2023</Option>
          <Option value="2024">2024</Option>
        </Select>
      </div>

      <Button color="teal" className="flex items-center justify-center w-full mt-5" onClick={handleFilter}>
        <AdjustmentsVerticalIcon className="w-5 h-5 mr-2" />
        Terapkan Filter
      </Button>
    </Drawer>
  );
}
