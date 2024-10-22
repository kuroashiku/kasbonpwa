import { Checkbox, IconButton, ListItem, ListItemPrefix, ListItemSuffix, Typography } from "@material-tailwind/react";
import { ItemListModel } from "../../model/item";
import InfiniteScroll from "../../lib/InfiniteScroll";
import { Fragment } from "react";
import { SetItemUnit } from "../../util/formatter";
import { PencilSquareIcon, InboxArrowDownIcon } from "@heroicons/react/16/solid";

export default function ItemScrollSm({
  items = [ItemListModel()],
  onCheck = () => {},
  checkedIds = () => {},
  onOpen = () => {},
  onEdit = () => {},
  onLoad = () => {},
  onBom=()=>{},
  infinite = false,
}) {
  const listItems = items.map((i, index) => {
    return (
      <ListItem key={index} className="px-1">
        <ListItemPrefix className="mr-2">
          <Checkbox color="teal" onChange={() => onCheck(i)} checked={checkedIds.includes(i.itm_id)} />
        </ListItemPrefix>

        <div className="w-full flex flex-col gap-[5px]" onClick={() => onOpen(i, index)}>
          <div className="w-[90%] whitespace-nowrap overflow-hidden text-ellipsis font-semibold">{i.itm_nama}</div>
          <div className="w-max py-[2px] px-2 text-[12px] font-semibold bg-orange-100 rounded-md">{i.itm_kode}</div>
          <div className="flex items-center gap-1">
            <div className="w-max py-[2px] px-2 text-[12px] font-semibold bg-green-100 rounded-md">
              {i.itm_stok}
            </div>
            <div className="w-max py-[2px] px-2 text-[12px] font-semibold bg-blue-100 rounded-md">
              {SetItemUnit(i.itm_satuan1.toUpperCase())}
            </div>
            {i.itm_satuan2 && (
              <div className="flex">
                <div className="w-max py-[2px] px-2 text-[12px] font-semibold bg-green-100 rounded-md">
                  {i.itm_stok_satuan2}
                </div>
                <div className="w-max py-[2px] px-2 text-[12px] font-semibold bg-blue-100 rounded-md">
                  {SetItemUnit(i.itm_satuan2.toUpperCase())}
                </div>
              </div>
            )}
            {i.itm_satuan3 && (
              <div className="flex">
                <div className="w-max py-[2px] px-2 text-[12px] font-semibold bg-green-100 rounded-md">
                  {i.itm_stok_satuan3}
                </div>
                <div className="w-max py-[2px] px-2 text-[12px] font-semibold bg-blue-100 rounded-md">
                  {SetItemUnit(i.itm_satuan3.toUpperCase())}
                </div>
              </div>
            )}
          </div>
        </div>
        <ListItemSuffix>
          <IconButton size="sm" variant="text" color="green" onClick={() => onBom(i, index)}>
            <InboxArrowDownIcon className={`h-6 w-6 ${i.bom_id_pembentuk ?"text-yellow-500":"text-green-500"}`} />
          </IconButton>
        </ListItemSuffix>
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
