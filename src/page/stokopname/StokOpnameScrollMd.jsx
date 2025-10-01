import { Button, Card, CardBody, CardHeader, ListItem, ListItemPrefix, Typography } from "@material-tailwind/react";
import { ItemListModel } from "../../model/item";
import { Cog6ToothIcon, CogIcon, CubeIcon} from "@heroicons/react/24/outline";
import InfiniteScroll from "../../lib/InfiniteScroll";
import { Fragment, useContext} from "react";
import { getAllUoms } from "../../util/itemConversion";
import { dictionary } from "../../constant/appDictionary";
import { AppContext } from "../../AppContext";
import { IKImage } from "imagekitio-react";
import { IMAGEKIT_URL_ENDPOINT } from "../../constant/appCommon";
import { formatThousandSeparator, SetItemUnit } from "../../util/formatter";
export default function UomItemScrollMd({
    items=[ItemListModel()],
    onSelect=()=>{},
    onLoad=()=>{},
    infinite=false
}){
    const {lang} = useContext(AppContext);
    const listItems = items.map((i,index) => {
        const uoms = getAllUoms(i);
        let uomstring = '';
        uoms.map((uom, i) => (
            uomstring=uomstring+parseFloat(uom.stok)+' '+uom.satuan+", "
        ))
        const image = i.itm_urlimage1;
        return(
            <Card key={index} className="max-w-[24rem] overflow-hidden">
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
                    <div><b>{i.itm_nama}</b></div>
                    <div className="flex flex-col gap-1 mb-2">
                        <div className="flex gap-1">
                            <div className="w-max py-[2px] px-2 text-[12px] font-semibold bg-orange-100 rounded-md">{i.itm_kode}</div>
                        </div>
                        <div className="flex gap-1">
                            <div className="w-max py-[2px] px-2 text-[12px] font-semibold bg-purple-100 rounded-md">
                                {i.itm_pakaistok == "1" ? Number(i.itm_stok) : "available"}
                            </div>
                            <div className="w-max py-[2px] px-2 text-[12px] font-semibold bg-blue-100 rounded-md">
                                {SetItemUnit(i.itm_satuan1?i.itm_satuan1.toUpperCase():null)}
                            </div>
                            {
                                (i.itm_satuan2!=null&&i.itm_satuan2!='')?
                                <div className="w-max py-[2px] px-2 text-[12px] font-semibold bg-purple-100 rounded-md">
                                    {i.itm_pakaistok == "1" ? Number(i.itm_stok_satuan2) : "available"}
                                </div>:null
                            }
                            {
                                (i.itm_satuan2!=null&&i.itm_satuan2!='')?
                                <div className="w-max py-[2px] px-2 text-[12px] font-semibold bg-blue-100 rounded-md">
                                    {SetItemUnit(i.itm_satuan2?i.itm_satuan2.toUpperCase():null)}
                                </div>:null
                            }
                            {
                                (i.itm_satuan3!=null&&i.itm_satuan3!='')?
                                <div className="w-max py-[2px] px-2 text-[12px] font-semibold bg-purple-100 rounded-md">
                                    {i.itm_pakaistok == "1" ? Number(i.itm_stok_satuan3) : "available"}
                                </div>:null
                            }
                            {
                                (i.itm_satuan3!=null&&i.itm_satuan3!='')?
                                <div className="w-max py-[2px] px-2 text-[12px] font-semibold bg-blue-100 rounded-md">
                                    {SetItemUnit(i.itm_satuan3?i.itm_satuan3.toUpperCase():null)}
                                </div>:null
                            }
                        </div>
                    </div>
                    <Button size="sm" onClick={()=>onSelect(i)} color="teal" fullWidth variant="gradient" className="flex items-center px-2">
                        <span className="text-xs">{dictionary.stock.uom.stockopnamesetting[lang]}</span> 
                    </Button>
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