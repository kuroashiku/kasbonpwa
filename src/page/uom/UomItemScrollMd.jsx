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

export default function UomItemScrollMd({
    items=[ItemListModel()],
    onSelect=()=>{},
    onLoad=()=>{},
    infinite=false
}){
    const {lang} = useContext(AppContext);
    const listItems = items.map((i,index) => {
        const uoms = getAllUoms(i);
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
                    <Typography variant="small" color="gray">
                        #{i.itm_kode}
                    </Typography>
                    <Typography color="gray" className="font-normal">
                        {dictionary.stock.uom.unitList[lang]}: {uoms.join(", ")}
                    </Typography>
                    <Button size="sm" onClick={()=>onSelect(i)} color="teal" fullWidth variant="gradient" className="flex items-center px-2">
                        <Cog6ToothIcon className="h-6 w-6 mr-2"/><span className="text-xs">{dictionary.stock.uom.config[lang]}</span> 
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