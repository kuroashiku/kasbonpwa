import { Checkbox, IconButton, ListItem, ListItemPrefix, ListItemSuffix, Popover, PopoverHandler, PopoverContent, Typography } from "@material-tailwind/react";
import { TransactionListModel } from "../../model/transaction";
import { formatThousandSeparator } from "../../util/formatter";
import InfiniteScroll from "../../lib/InfiniteScroll";
import { Fragment, useContext } from "react";
import { AppContext } from "../../AppContext";
import { BanknotesIcon, InformationCircleIcon, TrashIcon, PrinterIcon } from "@heroicons/react/16/solid";

export default function TransactionScroll({
  transactions = [TransactionListModel()],
  checkedIds = () => {},
  onCheck = () => {},
  onRemove = () => {},
  onLoad = () => {},
  onOpen = () => {},
  onPrint = () => {},
  infinite = false,
}) {
  const { currency, cookies } = useContext(AppContext);
  const listItems = transactions.map((i, index) => {
    const namacustomerdraft = i.cus_nama ? i.cus_nama : "Tanpa Nama";
    return (
      <ListItem key={index} className="px-1">
        <ListItemPrefix className="mr-2">
          <Checkbox color="teal" onChange={() => onCheck(i)} checked={checkedIds.includes(i.id)} />
        </ListItemPrefix>

        <div className="w-full flex flex-col gap-[5px]" >
          <div className="w-[90%] whitespace-nowrap overflow-hidden text-ellipsis font-semibold">{i.nomor}</div>
          <div className="w-max py-[2px] px-2 text-[12px] font-semibold bg-blue-100 rounded-md">{namacustomerdraft}</div>
          <div className="flex items-center gap-1 text-sm">
            <div className="w-max py-[2px] px-2 font-semibold bg-green-100 rounded-md">
              {currency} {formatThousandSeparator(parseFloat(i.total))}
            </div>
            {i.not_dicicil == 1 && i.piutlunas == 0 ? (
              <span className="w-max py-[2px] px-2 font-semibold bg-orange-100 rounded-md">Belum Lunas {"("+(i.cil_sisaa?formatThousandSeparator(parseFloat(i.cil_sisaa)):formatThousandSeparator(parseFloat(i.total-i.dibayar)))+")"}</span>
            ) : i.not_dicicil == 1 && i.piutlunas == 1 ? (
              <span className="w-max py-[2px] px-2 font-semibold bg-lime-200 rounded-md">Lunas</span>
            ) : (
              ""
            )}
          </div>
        </div>
        <ListItemSuffix>
          <Popover placement="bottom-start">
            <PopoverHandler>
              <IconButton variant="text" color="blue-gray">
                <InformationCircleIcon
                  className={`text-light-blue-500 h-7 w-7`}
                />
              </IconButton>
            </PopoverHandler>
            {!i.notaitems ? null : (
              <PopoverContent className="w-11/12 max-w-[700px]">
                
                {i.notaitems.map((ii, indexi) => {
                  return cookies.lok_type == "laundry" ? (
                    ii.service_level_satuan0?.map((iii, indexii) => {
                      return (
                        <div key={indexi + indexii}>
                          <div className="w-full">
                            {" "}
                            {ii.itm_nama} {iii.service_nama ? "(" : ""}
                            {iii.service_nama}
                            {iii.service_nama ? ")" : ""}
                          </div>
                          <div className="!h-fit flex items-center justify-between mb-2">
                            <Typography variant="small" color="gray" className="font-normal">
                              {`${iii.service_qty} `}
                              {ii.satuan0}
                            </Typography>
                            <Typography color="gray" className="font-normal" variant="small">
                              {currency} {formatThousandSeparator(parseFloat(iii.service_total))}
                            </Typography>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div key={indexi}>
                      <div className="w-full"> {ii.itm_nama} </div>
                      <div className="!h-fit flex items-center justify-between mb-2">
                        <Typography variant="small" color="gray" className="font-normal">
                          {`${ii.qty} `}
                          {ii.satuan0}
                        </Typography>
                        <Typography color="gray" className="font-normal" variant="small">
                          {currency} {formatThousandSeparator(parseFloat(ii.total))}
                        </Typography>
                      </div>
                    </div>
                  );
                })}
              </PopoverContent>
            )}
          </Popover>
        </ListItemSuffix>
        <ListItemSuffix>
          <IconButton
            disabled={i.not_dicicil == 1 && i.piutlunas == 0 ? false : true}
            variant="text"
            color="blue-gray"
            onClick={() => onOpen(i, index)}
          >
            <BanknotesIcon className="h-6 w-6 text-purple-500" />
          </IconButton>
        </ListItemSuffix>
        <ListItemSuffix>
          <IconButton variant="text" color="blue-gray" onClick={() => onPrint(i, index)}>
            <PrinterIcon className="h-6 w-6 text-purple-500" />
          </IconButton>
        </ListItemSuffix>
        {
          (cookies.role_nama).toLowerCase()=='admin'?
          <ListItemSuffix>
            <IconButton variant="text" color="blue-gray" onClick={() => onRemove(i)}>
              <TrashIcon className="h-6 w-6 text-red-500" />
            </IconButton>
          </ListItemSuffix>:
          null
        }
      </ListItem>
    );
  });

  if (infinite) {
    return <InfiniteScroll listItems={listItems} lastRowHandler={onLoad} heightClass="h-[100px]" />;
  }

  return <Fragment>{listItems}</Fragment>;
}
