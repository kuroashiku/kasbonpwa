import { Button, ButtonGroup, Card, CardBody, CardHeader, Checkbox, Tooltip, Typography } from "@material-tailwind/react";
import { ItemListModel } from "../../model/item";
// import { ProjectsListModel } from "../../model/masterproject";
import InfiniteScroll from "../../lib/InfiniteScroll";
import { Fragment, useContext } from "react";
import { CubeIcon, EyeIcon, PencilIcon, InboxArrowDownIcon } from "@heroicons/react/24/outline";
import { IMAGEKIT_URL_ENDPOINT } from "../../constant/appCommon";
import { IKImage } from "imagekitio-react";
import { formatThousandSeparator, SetItemUnit } from "../../util/formatter";
import { AppContext } from "../../AppContext";
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
    const { cookies } = useContext(AppContext);
    const listItems = items.map((i,index) => {
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
                    {cookies.lok_type !== "laundry" ? 
                    <div className={`absolute top-3 right-3 ${i.bom_id_pembentuk ? "bg-yellow-400":"bg-teal-400"} rounded-full cursor-pointer`}>
                        <Tooltip content="Bill of Material" placement="right" className="border border-teal-500 bg-white text-teal-500">
                            <InboxArrowDownIcon color="white" className="h-4 w-4 m-1" onClick={()=>onBom(i, index)} />
                        </Tooltip>
                    </div>
                    : null}
                    
                </CardHeader>
                <CardBody className="p-2">
                    <div><b>{i.itm_nama}</b></div>
                    <div className="flex flex-col gap-1 mb-2">
                        <div className="flex gap-1">
                            <div className="w-max py-[2px] px-2 text-[12px] font-semibold bg-orange-100 rounded-md">{i.itm_kode}</div>
                        </div>
                        <div className="flex gap-1 overflow-y-auto">
                            {i.totalsatuan.map((j, index) => {
                                return(
                                <div className="flex">
                                    {
                                    i.itm_service_level_satuan1=="[]"&&i.itm_pakaistok1=="0"&&cookies.lok_type=="laundry" ?<div className="w-max py-[2px] px-2 text-[12px] font-semibold bg-green-100 rounded-md">Jasa Tanpa Servis</div>:
                                    i.itm_service_level_satuan1!="[]"&&cookies.lok_type=="laundry"?<div className="w-max py-[2px] px-2 text-[12px] font-semibold bg-green-100 rounded-md">Jasa Pakai Servis</div>:
                                    <div className="flex">
                                    <div className="w-max py-[2px] px-2 text-[12px] font-semibold bg-purple-100 rounded-md">
                                        {i["itm_pakaistok"+(index+1)] == "1" ? Number(i["itm_stok_satuan"+(index+1)]) : "available"}
                                    </div>
                                    <div className="w-max py-[2px] px-2 text-[12px] font-semibold bg-blue-100 rounded-md">
                                        {SetItemUnit(j.toUpperCase())}
                                    </div>
                                    </div>
                                    }
                                </div>      
                                )
                            })}
                            {/* {
                                (i.itm_satuan2!=null&&i.itm_satuan2!='')?
                                <div className="w-max py-[2px] px-2 text-[12px] font-semibold bg-purple-100 rounded-md">
                                    {i.itm_pakaistok == "1" ? Number(i.itm_stok_satuan2) : "available"}
                                </div>:null
                            }
                            {
                                (i.itm_satuan2!=null&&i.itm_satuan2!='')?
                                <div className="w-max py-[2px] px-2 text-[12px] font-semibold bg-blue-100 rounded-md">
                                    {SetItemUnit(i.itm_satuan2.toUpperCase())}
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
                                    {SetItemUnit(i.itm_satuan3.toUpperCase())}
                                </div>:null
                            } */}
                        </div>
                    </div>
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