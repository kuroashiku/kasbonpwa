import { Button, ButtonGroup, Card, CardBody, CardFooter, CardHeader, IconButton, ListItem, ListItemPrefix, ListItemSuffix, Typography } from "@material-tailwind/react";
import { ItemCheckoutModel, ItemNotaModel } from "../../model/item";
import { formatThousandSeparator } from "../../util/formatter";
import { CubeIcon, MinusCircleIcon } from "@heroicons/react/24/outline";
import InfiniteScroll from "../../lib/InfiniteScroll";
import { Fragment, useContext } from "react";
import { AppContext } from "../../AppContext";
import { IKImage } from "imagekitio-react";
import { IMAGEKIT_URL_ENDPOINT } from "../../constant/appCommon";

export default function POSItemScrollMd({
    items=[ItemCheckoutModel()],
    itemsCheckout=[ItemCheckoutModel()],
    onAdd=()=>{},
    onRemove=()=>{},
    onHold=()=>{},
    onOption=()=>{},
    onLoad=()=>{},
    infinite=false
}){
    const {currency,cookies} = useContext(AppContext);
    const listItems = items.map((i,index) => {
        const unit = i.satuan0;
        const price = i.service_level&&i.service_level.length>0?i.service_level[0].hrg:i.satuan0hrg;
        //const price = i.satuan0hrg;
        const image = i.itm_urlimage0;
        const selectedItem = itemsCheckout.find(ic => (ic.itm_id === i.itm_id && ic.konvidx === i.konvidx && ic.qty>0));
        return(
            <Card key={index} className={`max-w-[24rem] overflow-hidden ${selectedItem? "ring-2 ring-teal-500" : ""}`}>
                <CardHeader
                    shadow={false}
                    floated={false}
                    className="m-0 rounded-none bg-gray-200 h-36"
                >
                    {
                        !image?  <div className="flex h-full">
                            <CubeIcon className="h-14 w-14 m-auto"/>
                        </div>:
                        <IKImage
                            urlEndpoint={IMAGEKIT_URL_ENDPOINT}
                            path={image}
                            transformation={[{
                                "height": "230",
                                "width": "300"
                            }]}
                            className="object-cover h-full w-full"
                            loading="lazy"
                        />
                    }
                   
                </CardHeader>
                <CardBody className="p-2">
                    <Typography variant="h6" className="mb-1">{i.itm_nama}</Typography>
                    <Typography variant="small" color="gray" className="font-normal">
                        #{i.kode}
                    </Typography>
                    <div className="mt-1">
                        <Typography variant="small" className="float-left">
                            per {unit}
                        </Typography>
                        <Typography variant="h6" className="text-right">
                            {currency} {formatThousandSeparator(price)}
                        </Typography>
                    </div>
                    {
                        selectedItem? 
                        <ButtonGroup size="sm" color="teal" fullWidth variant="gradient">
                            <Button onClick={()=>onAdd(i)} className="p-2" onContextMenu={(evt)=>{
                                evt.preventDefault();
                                onHold(i);
                            }}>
                                <Typography>✕ {cookies.lok_type!=="laundry"?selectedItem.qty:selectedItem.qty_service}</Typography> 
                            </Button>
                            <Button onClick={()=>onRemove(i)} className="w-14 p-1"
                                onContextMenu={(evt)=>{
                                    evt.preventDefault();
                                    onOption(selectedItem);
                                }}
                            >
                                <MinusCircleIcon className="h-8 w-8"/>
                            </Button>
                        </ButtonGroup>
                        :
                        <Button size="sm" onClick={()=>onAdd(i)} color="teal" fullWidth variant="gradient" disabled={Number(i.pakaistok)==0?false:(Number(i.stok)>0?false:true)}>
                            <Typography>{Number(i.pakaistok)==0?"Pilih":(Number(i.stok)>0?"Pilih":"Habis")}</Typography> 
                        </Button>
                    }
                </CardBody>
            </Card>
        )
    });
    return(
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 p-2">
            {
                infinite?
                <InfiniteScroll listItems={listItems} lastRowHandler={onLoad} heightClass="h-[300px]"/>:
                <Fragment>
                    {listItems}
                </Fragment>
            }
        </div>
    )
}