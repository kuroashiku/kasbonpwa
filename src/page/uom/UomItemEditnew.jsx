import { useContext, useEffect, useState } from "react";
import { saveItem } from "../../api/Item";
import { ItemListModel, ItemUomSchema } from "../../model/item";
import { useFormik } from "formik";
import { Button, IconButton, Input, Spinner, Tab, TabPanel, Tabs, TabsBody, TabsHeader, Typography } from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { CheckIcon, CubeIcon } from "@heroicons/react/24/outline";
import { dictionary } from "../../constant/appDictionary";
import { AppContext } from "../../AppContext";
import InputMoney from "../../lib/InputMoney";
import InputSimple from "../../lib/InputSimple";
import { cloneDeep } from "lodash";
import ImageUpload from "../../lib/ImageUpload";
import { IKImage } from "imagekitio-react";
import { IMAGEKIT_URL_ENDPOINT } from "../../constant/appCommon";
import { AdjustmentsVerticalIcon, Bars3Icon, TrashIcon, PlusIcon, PlusCircleIcon} from "@heroicons/react/24/outline";
export default function UomItemEdit(props={item:ItemListModel(), onClose:()=>{}, onSubmit:()=>{}}){
    const {lang, currency, cookies} = useContext(AppContext);
    const [loading, setLoading] = useState(false);
    const[currentTab, setCurrentTab] = useState("unit-1");
    const [services_1, setServices_1] = useState([]);
    const [services_2, setServices_2] = useState([]);
    const [services_3, setServices_3] = useState([]);
    const [activeTab, setActiveTab] = useState("unit-1");
    const [data, setData] = useState([]);
    const formik = useFormik({
        initialValues:ItemListModel(),
        validationSchema: ItemUomSchema,
        onSubmit: async (_input) => {
            setLoading(true);
            let check=false;
            let i=1;
            let arr=[];
            while (check==false) {
                if(!_input['itm_satuan'+i]){
                    check=true;
                }
                else{
                    arr.push(_input['itm_satuan'+i]);
                }
                i=i+1;
            }
            _input.totalsatuan=arr
            _input.itm_service_level_satuan2=JSON.stringify(services_2)
            _input.itm_service_level_satuan3=JSON.stringify(services_3)
            if(_input.itm_id){
                await saveItem(_input);
            }
            setLoading(false);
            props.onSubmit();
        }
    });
    useEffect(()=>{
        const {item} = props;
        if(cookies.lok_type=="laundry"){
            setServices_1(JSON.parse(item.itm_service_level_satuan1));
            setServices_2(item.itm_service_level_satuan2?JSON.parse(item.itm_service_level_satuan2):[]);
            setServices_3(item.itm_service_level_satuan3?JSON.parse(item.itm_service_level_satuan3):[]);
        }
        formik.setValues({
            ...item,
            itm_satuan1hpp : typeof item.itm_satuan1hpp == "number" ? item.itm_satuan1hpp  : Number(item.itm_satuan1hpp),
            itm_satuan1hrg : typeof item.itm_satuan1hrg == "number" ? item.itm_satuan1hrg  : Number(item.itm_satuan1hrg),
            itm_satuan2hpp : typeof item.itm_satuan2hpp == "number" ? item.itm_satuan2hpp  : Number(item.itm_satuan2hpp),
            itm_satuan2hrg : typeof item.itm_satuan2hrg == "number" ? item.itm_satuan2hrg  : Number(item.itm_satuan2hrg),
            itm_satuan3hpp : typeof item.itm_satuan3hpp == "number" ? item.itm_satuan3hpp  : Number(item.itm_satuan3hpp),
            itm_satuan3hrg : typeof item.itm_satuan3hrg == "number" ? item.itm_satuan3hrg  : Number(item.itm_satuan3hrg) 
        });
        let dataarr=[];
        item.totalsatuan.map((_item,key) => {
            dataarr.push({"label":"Satuan "+(key+1),"value":"unit-"+(key+1),"id":key})
        });
        dataarr.push({"label":"Satuan "+(item.totalsatuan.length+1),"value":"unit-"+(item.totalsatuan.length+1),"id":item.totalsatuan.length})
        setData(dataarr);
    },[]);
    const handleCancleService = (service, indexservice, item) => {
		const temparray = services_1.filter(function (item) {
			return item.level !== service.level;
		});
		setServices(temparray);
	};
	const handleAddServices = (indextab) => {
		const _services =  cloneDeep(indextab==2?services_2:services_3);
		_services.push({ level: "", hrg: 0 });
		indextab==2?setServices_2(_services):setServices_3(_services);
	};

	const handleChangeService = (evt, id, item, index,indextab) => {
		const _services = cloneDeep(indextab==2?services_2:services_3);
		if (id == "hrg") _services[index] = { level: item.level, hrg: evt.target.value };
		if (id == "level") {
			_services[index] = { level: evt.target.value, hrg: item.hrg };
		}
		indextab==2?setServices_2(_services):setServices_3(_services);
	};
    const handleChangeNew = (evt, name, index,indextab) => {
        const {item} = props;
        console.log(evt.target)
        console.log(item['totalsatuan'][0])
		let value = evt.target.value;
        item.totalsatuan[index]=value;
        item.totalsatuanof1[index]=value;
        item.totalsatuanhrg[index]=value;
        item.totalsatuanhpp[index]=value;
        formik.setValues({
            ...item,
            totalsatuan:item.totalsatuan,
            totalsatuanof1:item.totalsatuanof1,
            totalsatuanhrg:item.totalsatuanhrg,
            totalsatuanhpp:item.totalsatuanhpp
        });
	};
    const {values, errors, touched} = formik;
    
//     const data = [
//     {
//       label: "HTML",
//       value: "html",
//       desc: `It really matters and then like it really doesn't matter.
//       What matters is the people who are sparked by it. And the people 
//       who are like offended by it, it doesn't matter.`,
//     },
//     {
//       label: "React",
//       value: "react",
//       desc: `Because it's about motivating the doers. Because I'm here
//       to follow my dreams and inspire other people to follow their dreams, too.`,
//     },
//     {
//       label: "Vue",
//       value: "vue",
//       desc: `We're not always in the position that we want to be at.
//       We're constantly growing. We're constantly making mistakes. We're
//       constantly trying to express ourselves and actualize our dreams.`,
//     },
//     {
//       label: "Angular",
//       value: "angular",
//       desc: `Because it's about motivating the doers. Because I'm here
//       to follow my dreams and inspire other people to follow their dreams, too.`,
//     },
//     {
//       label: "Svelte",
//       value: "svelte",
//       desc: `We're not always in the position that we want to be at.
//       We're constantly growing. We're constantly making mistakes. We're
//       constantly trying to express ourselves and actualize our dreams.`,
//     },
//   ];
    return(
        <div className="h-screen-adapt bg-teal-600 overflow-hidden relative">
            <form className="pt-2 overflow-auto h-full" onSubmit={formik.handleSubmit}>
                <div className="px-2">
                    <IconButton className="float-right" variant="text" size="md" onClick={props.onClose}>
                        <XMarkIcon className="h-6 w-6 stroke-2 text-white" />
                    </IconButton>
                    <div className="flex items-center py-4">
                        {
                            !values.itm_urlimage1?
                            <div className="rounded-full p-4 bg-gray-100 mr-3">
                                <CubeIcon className="h-8 w-8"/>
                            </div>:
                            <div className="rounded-full overflow-hidden mr-3">
                                <IKImage
                                    urlEndpoint={IMAGEKIT_URL_ENDPOINT}
                                    path={values.itm_urlimage1}
                                    transformation={[{
                                        "height": "64",
                                        "width": "64"
                                    }]}
                                    className="object-cover h-full w-full"
                                    loading="lazy"
                                />
                            </div>
                        }
                        <div>
                            <Typography variant="lead" color="white">{values.itm_nama}</Typography>
                            <Typography variant="small" color="light-green" className="font-normal">
                                {values.itm_kode}
                            </Typography>
                        </div>
                    </div>
                </div>
                <div className="px-3 pt-3 pb-20 rounded-t-3xl bg-gray-50 min-h-screen">
                    <Tabs value={activeTab}>
                        <TabsHeader
                            className="rounded-none border-b border-blue-gray-50 bg-transparent p-0"
                            indicatorProps={{
                            className:
                                "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
                            }}
                        >
                            {data.map(({ label, value }) => (
                            <Tab
                                key={value}
                                value={value}
                                onClick={() => setActiveTab(value)}
                                className={activeTab === value ? "text-gray-900" : ""}
                            >
                                {label}
                            </Tab>
                            ))}
                        </TabsHeader>
                        <TabsBody>
                            {data.map(({ value, id }) => (
                            <TabPanel key={value} value={value}>
                                <div className="mb-6">
                                    <ImageUpload image={values.totalurl[id]} 
                                        id="upl-image1"
                                        disabled={true}
                                        widthClass="w-img-upload"
                                    />
                                </div>
                                <div className="mb-6">
                                    {id==0?<InputSimple value={values['itm_satuan'+(id+1)]}
                                        label={dictionary.stock.uom.unitName[lang]}
                                        disabled
                                    />:<InputSimple value={values['itm_satuan'+(id+1)]}
                                        label={dictionary.stock.uom.unitName[lang]}
                                        name={`itm_satuan${id+1}`}
                                        onChange={formik.handleChange}
                                        error={errors['itm_satuan'+(id+1)]}
                                    />}
                                </div>
                                <div className="mb-10">
                                    {id==0?<InputSimple value={1}
                                        label={dictionary.stock.uom.coef[lang]}
                                        disabled
                                    />:<InputSimple value={values['itm_satuan'+(id+1)+'of1']}
                                        label={dictionary.stock.uom.coef[lang]}
                                        name={`itm_satuan${id+1}of1`}
                                        onChange={formik.handleChange}
                                        error={errors['itm_satuan'+(id+1)+'of1']}
                                    />}
                                </div>
                                <div className="mb-10">
                                    {id==0?<InputMoney value={values['itm_satuan'+(id+1)+'hpp']}
                                        currency={currency}
                                        label={dictionary.stock.uom.hpp[lang]}
                                        disabled
                                    />:<InputMoney value={values['itm_satuan'+(id+1)+'hpp']}
                                        currency={currency}
                                        label={dictionary.stock.uom.hpp[lang]}
                                        name={`itm_satuan${id+1}hpp`}
                                        onChange={formik.handleChange}
                                        error={errors['itm_satuan'+(id+1)+'hpp']}
                                    />}
                                </div>
                                <div className="mb-10">
                                    {id==0?<InputMoney value={values['itm_satuan'+(id+1)+'hrg']}
                                        currency={currency}
                                        label={dictionary.stock.uom.price[lang]}
                                        disabled
                                    />:<InputMoney value={values['itm_satuan'+(id+1)+'hrg']}
                                        currency={currency}
                                        label={dictionary.stock.uom.price[lang]}
                                        name={`itm_satuan${id+1}hrg`}
                                        onChange={formik.handleChange}
                                        error={errors['itm_satuan'+(id+1)+'hrg']}
                                    />}
                                </div>
                                {cookies.lok_type == "laundry"
                                    ? services_1?.map((i, index) => {
                                            return (
                                                <div className="setlevel-item flex flex-col gap-4 mb-4 p-3 pt-6 bg-blue-gray-50 rounded-md">
                                                    <InputMoney
                                                        currency={currency}
                                                        label={dictionary.dialog.item.cost[lang]}
                                                        onChange={(evt) => handleChangeService(evt, "hrg", i, index)}
                                                        value={i.hrg}
                                                        disabled={true}
                                                    />
                                                    <div className="flex gap-2 justify-between items-center">
                                                        <InputSimple
                                                            value={i.level}
                                                            label="Level"
                                                            onChange={(evt) => handleChangeService(evt, "level", i, index)}
                                                            disabled={true}
                                                        />
                                                    </div>
                                                </div>
                                            );
                                        })
                                    : null}
                            </TabPanel>
                            ))}
                        </TabsBody>
                    </Tabs>
                </div>
                <div className="fixed bottom-3 inset-x-4 z-20">
                    <Button
                        size="lg"
                        variant="gradient"
                        color="teal"
                        className="group w-full relative flex items-center gap-3 overflow-hidden pr-[72px] mx-auto desktop:max-w-[60%]"
                        type="submit"
                        disabled={loading}
                    >
                        <span className="flex-grow text-left">
                            {dictionary.stock.uom.save[lang]}
                        </span>
                        <span className="absolute right-0 grid h-full w-12 place-items-center bg-teal-500 transition-colors group-hover:bg-teal-600">
                            {
                                loading? <Spinner className="w-5 h-5" color="white"/>:
                                <CheckIcon className="w-5 h-5"/>
                            }
                        </span>
                    </Button>
                </div>
            </form>
        </div>
    )
}