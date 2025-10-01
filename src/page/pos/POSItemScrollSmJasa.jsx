import { IconButton, ListItem, ListItemPrefix, ListItemSuffix, Typography } from "@material-tailwind/react";
import { ItemCheckoutModel } from "../../model/item";
import { SetItemUnit, formatThousandSeparator } from "../../util/formatter";
import { CubeIcon, MinusCircleIcon } from "@heroicons/react/24/outline";
import InfiniteScroll from "../../lib/InfiniteScroll";
import { Fragment, useContext } from "react";
import { AppContext } from "../../AppContext";
import { IKImage } from "imagekitio-react";
import { IMAGEKIT_URL_ENDPOINT } from "../../constant/appCommon";

export default function POSItemScrollSmJasa({
  items = [ItemCheckoutModel()],
  itemsCheckout = [ItemCheckoutModel()],
  onAdd = () => {},
  onRemove = () => {},
  onHold = () => {},
  onOption = () => {},
  onLoad = () => {},
  infinite = false,
}) {
  const { currency,cookies } = useContext(AppContext);
  const listItems = items.map((i, index) => {
    const unit = i.satuan0;
    //const price = i.satuan0hrg;
    const price = i.service_level && i.service_level.length > 0 && i.service_level != "[]" ? i.service_level[0].hrg : i.satuan0hrg;
    const image = i.itm_urlimage0;
    const selectedItem = itemsCheckout.find((ic) => ic.itm_id === i.itm_id && ic.satuan0 === i.satuan0 && ic.qty > 0);
    // console.log(itemsCheckout)
    // console.log(i)
    return (
      <ListItem key={index} className="px-2">
        <ListItemPrefix className="mr-3">
          <div className="rounded-full bg-gray-50 w-12 h-12 overflow-hidden">
            {!image ? (
              <CubeIcon className="h-7 w-7 mx-auto my-2.5" />
            ) : (
              <IKImage
                urlEndpoint={IMAGEKIT_URL_ENDPOINT}
                path={image}
                transformation={[
                  {
                    height: "100",
                    width: "100",
                  },
                ]}
                className="object-contain"
                loading="lazy"
              />
            )}
          </div>
        </ListItemPrefix>

        <div
          className={`${selectedItem ? "w-[60%]" : "w-[100%]"} flex flex-col gap-1 ${
            i.service_level[0]||i.satuan1hpp==0 ? false : Number(i.pakaistok) == 0 ? false : Number(i.stok) > 0 ? false : "pointer-events-none opacity-50"
          }`}
          onClick={() => onAdd(i)}
          onContextMenu={() => onHold(i)}
        >
          <div className="w-[90%] whitespace-nowrap overflow-hidden text-ellipsis font-semibold">
            {i.itm_nama} {i.service_level[0]||i.satuan1hpp==0 ? null : Number(i.pakaistok) == 0 ? null : Number(i.stok) > 0 ? null : " (Habis)"}
          </div>
          <div className="flex gap-1 items-start">
            <div className="w-max py-[2px] px-2 text-[12px] font-semibold bg-orange-100 rounded-md">{i.kode}</div>
            <div className="flex gap-2">
              <div className="w-max py-[2px] px-2 text-[12px] font-semibold bg-blue-100 rounded-md">
                {SetItemUnit(unit.toUpperCase())}
              </div>
            </div>
          </div>
          {i.service_level[0]||i.satuan1hpp==0?
            <Typography color="gray" className="w-max py-[2px] text-[15px] font-semibold rounded-md">
              <div className="flex gap-1 overflow-y-auto">
                {selectedItem?selectedItem.service_level_satuan0.map((j, indexj) => {
                  return(
                  <div className="flex" key={indexj}>
                      <div className="w-max py-[2px] px-2 text-[12px] font-semibold bg-green-100 rounded-md">
                          {j.service_qty}{"("}{j.service_nama.charAt(0).toUpperCase()}{")"} x {j.service_hrg}
                      </div>
                  </div>      
                  )
              }):<div className="py-[7px]"></div>}
              </div>
            </Typography>:
            <div className="flex gap-1">
              <Typography
                color="gray"
                className="w-max py-[2px] px-2 text-[12px] font-semibold bg-green-100 rounded-md"
              >
                {selectedItem ? `${selectedItem.qty} x ` : ""} {currency} {formatThousandSeparator(price)}
              </Typography>
            </div>
          }
        </div>

        {!selectedItem ? null : (
          <ListItemSuffix>
            <IconButton
              variant="text"
              color="blue-gray"
              onClick={() => onRemove(i)}
              onContextMenu={() => onOption(selectedItem)}
            >
              <MinusCircleIcon className="h-8 w-8 text-red-500" />
            </IconButton>
          </ListItemSuffix>
        )}
      </ListItem>
    );
  });

  if (infinite) {
    return <InfiniteScroll listItems={listItems} lastRowHandler={onLoad} heightClass="h-[90px]" />;
  }
  return <Fragment>{listItems}</Fragment>;
}
