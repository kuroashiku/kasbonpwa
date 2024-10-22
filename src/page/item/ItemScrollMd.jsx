import { Button, ButtonGroup, Card, CardBody, CardHeader, Checkbox, Tooltip, Typography } from "@material-tailwind/react";
import { ItemListModel } from "../../model/item";
import InfiniteScroll from "../../lib/InfiniteScroll";
import { Fragment} from "react";
import { CubeIcon, EyeIcon, PencilIcon, InboxArrowDownIcon } from "@heroicons/react/24/outline";
import { IMAGEKIT_URL_ENDPOINT } from "../../constant/appCommon";
import { IKImage } from "imagekitio-react";

export default function ItemScrollMd({
    items=[ItemListModel()],
    onCheck=()=>{},
    checkedIds=[],
    onOpen=()=>{},
    onEdit=()=>{},
    infinite=false,
    onLoad=()=>{},
    onBom=()=>{},
}){
    const listItems = items.map((i,index) => {
        let satuannew='Satuan: '+i.itm_satuan1;
        if(i.itm_satuan2!=null&&i.itm_satuan2!='')
        satuannew=satuannew+', '+i.itm_satuan2;
        if(i.itm_satuan3!=null&&i.itm_satuan3!='')
        satuannew=satuannew+', '+i.itm_satuan3;
        const image = i.itm_urlimage1;
        return(
            <Card key={index} className="max-w-[24rem] overflow-hidden">
                <CardHeader
                    shadow={false}
                    floated={false}
                    className="m-0 rounded-none bg-gray-200 h-36 relative"
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
                    <div className="absolute top-0 left-0">
                        <Tooltip content="Checkbox multi delete" placement="left" className="border border-teal-500 bg-white text-teal-500">
                            <Checkbox size={4} color="teal" checked={checkedIds.includes(i.itm_id)} onChange={()=>onCheck(i)}/>
                        </Tooltip>
                    </div>
                    <div className={`absolute top-3 right-3 ${i.bom_id_pembentuk ? "bg-yellow-400":"bg-teal-400"} rounded-full cursor-pointer`}>
                        <Tooltip content="Bill of Material" placement="right" className="border border-teal-500 bg-white text-teal-500">
                            <InboxArrowDownIcon color="white" className="h-4 w-4 m-1" onClick={()=>onBom(i, index)} />
                        </Tooltip>
                    </div>
                </CardHeader>
                <CardBody className="p-2">
                    <div><b>{i.itm_nama}</b></div>
                    <Typography variant="small" color="gray">
                        #{i.itm_kode}
                    </Typography>
                
                    <Typography color="gray" variant="small">
                        {satuannew}
                    </Typography>
                    <ButtonGroup size="sm" color="teal" fullWidth variant="gradient" className="mt-2">
                        <Button onClick={()=>onOpen(i, index)} className="p-2 flex">
                            <EyeIcon className="h-4 w-4 mr-2"/> Lihat
                        </Button>
                        <Button onClick={()=>onEdit(i,index)} className="p-2 flex">
                            <PencilIcon className="h-4 w-4 mr-2"/> Edit
                        </Button>
                    </ButtonGroup>
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