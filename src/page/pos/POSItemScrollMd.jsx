import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { ItemCheckoutModel, ItemNotaModel } from "../../model/item";
import { formatThousandSeparator, SetItemUnit } from "../../util/formatter";
import { CubeIcon, MinusCircleIcon } from "@heroicons/react/24/outline";
import InfiniteScroll from "../../lib/InfiniteScroll";
import { Fragment, useContext } from "react";
import { AppContext } from "../../AppContext";
import { IKImage } from "imagekitio-react";
import { IMAGEKIT_URL_ENDPOINT } from "../../constant/appCommon";
import { dictionary } from "../../constant/appDictionary";
export default function POSItemScrollMd({
  items = [ItemCheckoutModel()],
  itemsCheckout = [ItemCheckoutModel()],
  onAdd = () => {},
  onRemove = () => {},
  onHold = () => {},
  onOption = () => {},
  onLoad = () => {},
  infinite = false,
}) {
  const { currency, cookies, lang } = useContext(AppContext);
  const listItems = items.map((i, index) => {
    const unit = i.satuan0;
    const price = i.service_level && i.service_level.length > 0 && i.service_level != "[]" ? i.service_level[0].hrg : i.satuan0hrg;
    //const price = i.satuan0hrg;
    const image = i.itm_urlimage0;
    const selectedItem = itemsCheckout.find((ic) => ic.itm_id === i.itm_id && ic.satuan0 === i.satuan0 && ic.qty > 0);
    return (
      <Card key={index} className={`max-w-[24rem] overflow-hidden ${selectedItem ? "ring-2 ring-teal-500" : ""}`}>
        <CardHeader shadow={false} floated={false} className="m-0 rounded-none bg-gray-200 h-36">
          {!image ? (
            <div className="flex h-full">
              <CubeIcon className="h-14 w-14 m-auto" />
            </div>
          ) : (
            <IKImage
              urlEndpoint={IMAGEKIT_URL_ENDPOINT}
              path={image}
              transformation={[
                {
                  height: "230",
                  width: "300",
                },
              ]}
              className="object-cover h-full w-full"
              loading="lazy"
            />
          )}
        </CardHeader>
        <CardBody className="p-2">
          <Typography variant="h6" className="mb-1">
            {i.itm_nama}
          </Typography>

          <div className="flex flex-col gap-1 mb-2">
            <div className="flex gap-1">
              <div className="w-max py-[2px] px-2 text-[12px] font-semibold bg-orange-100 rounded-md">{i.kode}</div>
              <Typography
                color="gray"
                className="w-max py-[2px] px-2 text-[12px] font-semibold bg-green-100 rounded-md"
              >
                {selectedItem ? `${selectedItem.qty} x ` : ""} {currency} {formatThousandSeparator(price)}
              </Typography>
            </div>
            <div className="flex gap-1">
              <div className="w-max py-[2px] px-2 text-[12px] font-semibold bg-purple-100 rounded-md">
                {i.pakaistok == "1" ? Number(i.stok) : "available"}
              </div>
              <div className="w-max py-[2px] px-2 text-[12px] font-semibold bg-blue-100 rounded-md">
                {SetItemUnit(unit.toUpperCase())}
              </div>
            </div>
          </div>

          {selectedItem ? (
            <ButtonGroup size="sm" color="teal" fullWidth variant="gradient">
              <Button
                onClick={() => onAdd(i)}
                className="p-2"
                onContextMenu={(evt) => {
                  evt.preventDefault();
                  onHold(i);
                }}
              >
                <Typography>
                  ✕ {cookies.lok_type !== "laundry" ? selectedItem.qty : selectedItem.qty_service}
                </Typography>
              </Button>
              <Button
                onClick={() => onRemove(i)}
                className="w-14 p-1"
                onContextMenu={(evt) => {
                  evt.preventDefault();
                  onOption(selectedItem);
                }}
              >
                <MinusCircleIcon className="h-8 w-8" />
              </Button>
            </ButtonGroup>
          ) : (
            <Button
              size="sm"
              onClick={() => onAdd(i)}
              color="teal"
              fullWidth
              variant="gradient"
              disabled={Number(i.pakaistok) == 0 ? false : Number(i.stok) > 0 ? false : true}
            >
              <Typography>{Number(i.pakaistok) == 0 ? dictionary.cashier.pos.choose[lang] : Number(i.stok) > 0 ? dictionary.cashier.pos.choose[lang] : dictionary.cashier.pos.runout[lang]}</Typography>
            </Button>
          )}
        </CardBody>
      </Card>
    );
  });

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 p-2">
      {infinite ? (
        <InfiniteScroll listItems={listItems} lastRowHandler={onLoad} heightClass="h-[300px]" />
      ) : (
        <Fragment>{listItems}</Fragment>
      )}
    </div>
  );
}
