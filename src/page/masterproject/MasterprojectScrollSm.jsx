import { Checkbox, IconButton, ListItem, ListItemPrefix, ListItemSuffix, Typography } from "@material-tailwind/react";
import { ItemListModel } from "../../model/item";
import InfiniteScroll from "../../lib/InfiniteScroll";
import { Fragment, useContext } from "react";
import { SetItemUnit } from "../../util/formatter";
import { PencilSquareIcon, InboxArrowDownIcon } from "@heroicons/react/16/solid";
import { AppContext } from "../../AppContext";
export default function ItemScrollSm({
  items = [ItemListModel()],
  onCheck = () => {},
  checkedIds = () => {},
  onOpen = () => {},
  onEdit = () => {},
  onLoad = () => {},
  onBom = () => {},
  infinite = false,
}) {
  const listItems = items.map((i, index) => {
    // console.log(i?.itm_nama, i?.itm_pakaistok);
  const { cookies } = useContext(AppContext);
    return (
      <ListItem key={index} className="px-1">
        {/* <ListItemPrefix className="mr-2">
          <Checkbox color="teal" onChange={() => onCheck(i)} checked={checkedIds.includes(i.itm_id)} />
        </ListItemPrefix> */}

        <div className="w-full max-w-[70%] overflow-x-auto flex flex-col gap-[5px]" onClick={() => onOpen(i, index)}>
          <div className="w-[90%] whitespace-nowrap overflow-hidden text-ellipsis font-semibold">{i.itm_nama}</div>
          <div className="w-max py-[2px] px-2 text-[12px] font-semibold bg-orange-100 rounded-md">{i.itm_kode}</div>
          {/* <div className="flex items-center gap-1">
            <div className="w-max py-[2px] px-2 text-[12px] font-semibold bg-green-100 rounded-md">
              {i.itm_pakaistok == "1" ? Number(i.itm_stok) : "available"}
            </div>
            <div className="w-max py-[2px] px-2 text-[12px] font-semibold bg-blue-100 rounded-md">
              {SetItemUnit(i.itm_satuan1.toUpperCase())}
            </div>
            {i.itm_satuan2 && (
              <div className="flex gap-1">
                <div className="w-max py-[2px] px-2 text-[12px] font-semibold bg-green-100 rounded-md">
                  {Number(i.itm_stok_satuan2)}
                </div>
                <div className="w-max py-[2px] px-2 text-[12px] font-semibold bg-blue-100 rounded-md">
                  {SetItemUnit(i.itm_satuan2.toUpperCase())}
                </div>
              </div>
            )}
            {i.itm_satuan3 && (
              <div className="flex gap-1">
                <div className="w-max py-[2px] px-2 text-[12px] font-semibold bg-green-100 rounded-md">
                  {Number(i.itm_stok_satuan3)}
                </div>
                <div className="w-max py-[2px] px-2 text-[12px] font-semibold bg-blue-100 rounded-md">
                  {SetItemUnit(i.itm_satuan3.toUpperCase())}
                </div>
              </div>
            )}
          </div> */}
          {/* {
            i["itm_service_level_satuan"+(index+1)]!="[]"&&i.satuan1hpp==0 ?<div className="flex gap-1 overflow-y-auto"></div>: */}
            <div className="flex gap-1 overflow-y-auto">
              {i.totalsatuan.map((j, index) => {
                  return(
                  <div className="flex">
                  {
                  i.itm_service_level_satuan1=="[]"&&i.itm_pakaistok1=="0"&&cookies.lok_type=="laundry" ?<div className="w-max py-[2px] px-2 text-[12px] font-semibold bg-green-100 rounded-md">Jasa Tanpa Servis</div>:
                                    i.itm_service_level_satuan1!="[]"&&cookies.lok_type=="laundry"?<div className="w-max py-[2px] px-2 text-[12px] font-semibold bg-green-100 rounded-md">Jasa Pakai Servis</div>:
                  <div className="flex">
                      <div className="w-max py-[2px] px-2 text-[12px] font-semibold bg-green-100 rounded-md">
                          {i["itm_pakaistok"+(index+1)] == "1" ? (index==0?Number(i.itm_stok):Number(i["itm_stok_satuan"+(index+1)])) : "available"}
                      </div>
                      <div className="w-max py-[2px] px-2 text-[12px] font-semibold bg-blue-100 rounded-md">
                          {SetItemUnit(j.toUpperCase())}
                      </div>
                  </div>
                  }      
                  </div>
                  )
              })}
          </div>
          
        </div>
        {cookies.lok_type !== "laundry" ? 
        <ListItemSuffix>
          <IconButton size="sm" variant="text" color="green" onClick={() => onBom(i, index)}>
            <InboxArrowDownIcon className={`h-6 w-6 ${i.bom_id_pembentuk ? "text-yellow-500" : "text-green-500"}`} />
          </IconButton>
        </ListItemSuffix>
        : null}
        <ListItemSuffix>
          <IconButton size="sm" variant="text" color="blue-gray" onClick={() => onEdit(i, index)}>
            <PencilSquareIcon className="h-6 w-6 text-blue-500" />
          </IconButton>
        </ListItemSuffix>
      </ListItem>
    );
  });

  if (infinite) {
    return <InfiniteScroll listItems={listItems} lastRowHandler={onLoad} heightClass="h-[90px]" />;
  }

  return <Fragment>{listItems}</Fragment>;
}
