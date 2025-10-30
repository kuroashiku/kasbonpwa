import { Button, Checkbox, Drawer, Spinner, Typography } from "@material-tailwind/react";
import { useState } from "react";
import { AdjustmentsVerticalIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";
import { useContext } from "react";
import { AppContext } from "../../AppContext";
import { dictionary } from "../../constant/appDictionary";
export default function ItemFilter({
  open = false,
  categories = [{}],
  onClose = () => {},
  onCheck = () => {},
  onClear = () => {},
  checkedIds = [],
}) {
  const { lang } = useContext(AppContext);
  return (
    <Drawer placement="right" open={open} onClose={onClose}>
      <div className="flex items-center justify-between p-3 border-b">
        <Typography variant="h5" color="blue-gray">
          Filter
        </Typography>
      </div>
      <div className="p-3">
        <Typography variant="h6" color="blue-gray">
          Kategori
        </Typography>
      </div>

      <div className="h-item-filter">
        {!categories ? (
          <Spinner className="h-10 w-10 mx-auto pt-10" color="teal" />
        ) : (
          <div className="h-full overflow-y-auto px-3">
            {categories.map((i, index) => {
              return (
                <div className="grid grid-cols-2 mb-2" key={index}>
                  <div key={"cgl" + index} className="flex items-center">
                    <Checkbox
                      size={4}
                      color="teal"
                      checked={checkedIds.includes(i.nama_ganjil)}
                      onChange={() => onCheck(i.nama_ganjil)}
                    />
                    <div className="text-xs">{i.nama_ganjil}</div>
                  </div>
                  {i.nama_genap == "" ? null : (
                    <div key={"cgp" + index} className="flex items-center">
                      <Checkbox
                        size={4}
                        color="teal"
                        checked={checkedIds.includes(i.nama_genap)}
                        onChange={() => onCheck(i.nama_genap)}
                      />
                      <div className="text-xs">{i.nama_genap}</div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="w-full flex flex-col gap-2 px-3">
        <Button color="teal" className="flex items-center justify-center w-full mt-5" onClick={() => onClose()}>
          <AdjustmentsVerticalIcon className="w-5 h-5 mr-2" />
          {dictionary.universal.apply[lang]} Filter
        </Button>
        <Button variant="gradient" color="red" onClick={onClear} disabled={checkedIds.length <= 0}>
          Hapus Filter
        </Button>
      </div>
    </Drawer>
  );
}
