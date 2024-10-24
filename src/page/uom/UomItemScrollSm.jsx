import { ListItem, ListItemPrefix } from "@material-tailwind/react";
import { ItemListModel } from "../../model/item";
import { CubeIcon } from "@heroicons/react/24/outline";
import InfiniteScroll from "../../lib/InfiniteScroll";
import { Fragment } from "react";
import { getAllUoms } from "../../util/itemConversion";
import { IKImage } from "imagekitio-react";
import { IMAGEKIT_URL_ENDPOINT } from "../../constant/appCommon";
import { SetItemUnit } from "../../util/formatter";

export default function UOMItemScrollSm({
  items = [ItemListModel()],
  onSelect = () => {},
  onLoad = () => {},
  infinite = false,
}) {
  const listItems = items.map((i, index) => {
    const uoms = getAllUoms(i);
    const image = i.itm_urlimage1;

    return (
      <ListItem key={index} className="">
        <ListItemPrefix className="mr-2">
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

        <div className="w-full flex flex-col gap-[5px]" onClick={() => onSelect(i)}>
          <div className="w-[90%] whitespace-nowrap overflow-hidden text-ellipsis font-semibold">{i.itm_nama}</div>
          <div className="w-max py-[2px] px-2 text-[12px] font-semibold bg-orange-100 rounded-md">{i.itm_kode}</div>
          <div className="flex items-center gap-1">
            {uoms.length > 0 &&
              uoms.map((uom, i) => (
                <div key={i} className="w-max py-[2px] px-2 text-[12px] font-semibold bg-blue-100 rounded-md">
                  {SetItemUnit(uom.toUpperCase())}
                </div>
              ))}
          </div>
        </div>
      </ListItem>
    );
  });

  if (infinite) {
    return <InfiniteScroll listItems={listItems} lastRowHandler={onLoad} heightClass="h-[90px]" />;
  }

  return <Fragment>{listItems}</Fragment>;
}
