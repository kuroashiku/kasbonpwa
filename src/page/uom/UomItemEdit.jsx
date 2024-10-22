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
    const formik = useFormik({
        initialValues:ItemListModel(),
        validationSchema: ItemUomSchema,
        onSubmit: async (_input) => {
            setLoading(true);
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
    const {values, errors, touched} = formik;
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
                    <Tabs value={currentTab}>
                        <TabsHeader>
                            <Tab key={1} value="unit-1">
                                {dictionary.stock.uom.unitList[lang]} 1
                            </Tab>
                            <Tab key={2} value="unit-2">
                                {dictionary.stock.uom.unitList[lang]} 2
                            </Tab>
                            <Tab key={3} value="unit-3">
                                {dictionary.stock.uom.unitList[lang]} 3
                            </Tab>
                        </TabsHeader>
                        <TabsBody
                            animate={{
                            initial: { y: -250 },
                            mount: { y: 0 },
                            unmount: { y: -250 },
                            }}
                        >
                            <TabPanel key={1} value="unit-1">
                                <div className="mb-6">
                                    <ImageUpload image={values.itm_urlimage1} 
                                        id="upl-image1"
                                        disabled={true}
                                        widthClass="w-img-upload"
                                    />
                                </div>
                                <div className="mb-6">
                                    <InputSimple value={values.itm_satuan1}
                                        label={dictionary.stock.uom.unitName[lang]}
                                        disabled
                                    />
                                </div>
                                <div className="mb-10">
                                    <InputSimple value={1}
                                        label={dictionary.stock.uom.coef[lang]}
                                        disabled
                                    />
                                </div>
                                <div className="mb-10">
                                    <InputMoney label={dictionary.stock.uom.hpp[lang]}
                                        currency={currency}
                                        value={values.itm_satuan1hpp}
                                        disabled
                                    />
                                </div>
                                <div className="mb-10">
                                    <InputMoney label={dictionary.stock.uom.price[lang]}
                                        currency={currency}
                                        value={values.itm_satuan1hrg}
                                        disabled
                                    />
                                </div>
                                {cookies.lok_type == "laundry"
                                    ? services_1?.map((i, index) => {
                                            return (
                                                <div className="setlevel-item flex flex-col gap-4 mb-4 p-3 pt-6 bg-blue-gray-50 rounded-md">
                                                    <InputMoney
                                                        currency={currency}
                                                        label="Biaya"
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
                            <TabPanel key={2} value="unit-2">
                                <div className="mb-6">
                                    <ImageUpload image={values.itm_urlimage2} 
                                        onSuccess={(url)=>formik.setFieldValue("itm_urlimage2", url)}
                                        onRemove={()=>formik.setFieldValue("itm_urlimage2", null)}
                                        id="upl-image2"
                                        widthClass="w-img-upload"
                                    />
                                </div>
                                <div className="mb-6">
                                    <InputSimple value={values.itm_satuan2}
                                        label={dictionary.stock.uom.unitName[lang]}
                                        name="itm_satuan2"
                                        onChange={formik.handleChange}
                                        error={errors.itm_satuan2}
                                    />
                                </div>
                                <div className="mb-10">
                                    <InputSimple value={values.itm_satuan2of1}
                                        label={dictionary.stock.uom.coef[lang]}
                                        name="itm_satuan2of1"
                                        onChange={formik.handleChange}
                                        error={errors.itm_satuan2of1}
                                    />
                                </div>
                                <div className="mb-10">
                                    <InputMoney label={dictionary.stock.uom.hpp[lang]}
                                        currency={currency}
                                        name="itm_satuan2hpp"
                                        value={values.itm_satuan2hpp}
                                        onChange={formik.handleChange}
                                        error={errors.itm_satuan2hpp}
                                    />
                                </div>
                                <div className="mb-10">
                                    <InputMoney label={dictionary.stock.uom.price[lang]}
                                        currency={currency}
                                        name="itm_satuan2hrg"
                                        value={values.itm_satuan2hrg}
                                        onChange={formik.handleChange}
                                        error={errors.itm_satuan2hrg}
                                    />
                                </div>
                                {cookies.lok_type == "laundry"
                                    ? services_2?.map((i, index) => {
                                            return (
                                                <div className="setlevel-item flex flex-col gap-4 mb-4 p-3 pt-6 bg-blue-gray-50 rounded-md">
                                                    <InputMoney
                                                        currency={currency}
                                                        label="Biaya"
                                                        onChange={(evt) => handleChangeService(evt, "hrg", i, index,2)}
                                                        value={i.hrg}
                                                    />
                                                    <div className="flex gap-2 justify-between items-center">
                                                        <InputSimple
                                                            value={i.level}
                                                            label="Level"
                                                            onChange={(evt) => handleChangeService(evt, "level", i, index,2)}
                                                        />
                                                        <IconButton
                                                            variant="text"
                                                            className="bg-orange-500 w-12 h-10"
                                                            onClick={() => handleCancleService(i, index, itemById,2)}
                                                        >
                                                            <TrashIcon className="h-4 w-4 text-white" />
                                                        </IconButton>
                                                    </div>
                                                </div>
                                            );
                                        })
                                    : null}
                                {cookies.lok_type == "laundry" ? (
                                    <Button variant="gradient" color="light-blue" onClick={() => handleAddServices(2)} className="w-full">
                                        <span>Tambah Services</span>
                                    </Button>
                                ) : null}
                            </TabPanel>
                            <TabPanel key={3} value="unit-3">
                                <div className="mb-6">
                                    <ImageUpload image={values.itm_urlimage3} 
                                        onSuccess={(url)=>formik.setFieldValue("itm_urlimage3", url)}
                                        onRemove={()=>formik.setFieldValue("itm_urlimage3", null)}
                                        id="upl-image3"
                                        widthClass="w-img-upload"
                                    />
                                </div>
                                <div className="mb-6">
                                    <InputSimple value={values.itm_satuan3}
                                        label={dictionary.stock.uom.unitName[lang]}
                                        name="itm_satuan3"
                                        onChange={formik.handleChange}
                                        error={errors.itm_satuan3}
                                    />
                                </div>
                                <div className="mb-10">
                                    <InputSimple value={values.itm_satuan3of1}
                                        label={dictionary.stock.uom.coef[lang]}
                                        name="itm_satuan3of1"
                                        onChange={formik.handleChange}
                                        error={errors.itm_satuan3of1}
                                    />
                                </div>
                                <div className="mb-10">
                                    <InputMoney label={dictionary.stock.uom.hpp[lang]}
                                        currency={currency}
                                        name="itm_satuan3hpp"
                                        value={values.itm_satuan3hpp}
                                        onChange={formik.handleChange}
                                        error={errors.itm_satuan3hpp}
                                    />
                                </div>
                                <div className="mb-10">
                                    <InputMoney label={dictionary.stock.uom.price[lang]}
                                        currency={currency}
                                        name="itm_satuan3hrg"
                                        value={values.itm_satuan3hrg}
                                        onChange={formik.handleChange}
                                        error={errors.itm_satuan3hrg}
                                    />
                                </div>
                                {cookies.lok_type == "laundry"
                                    ? services_3?.map((i, index) => {
                                            return (
                                                <div className="setlevel-item flex flex-col gap-4 mb-4 p-3 pt-6 bg-blue-gray-50 rounded-md">
                                                    <InputMoney
                                                        currency={currency}
                                                        label="Biaya"
                                                        onChange={(evt) => handleChangeService(evt, "hrg", i, index,3)}
                                                        value={i.hrg}
                                                    />
                                                    <div className="flex gap-2 justify-between items-center">
                                                        <InputSimple
                                                            value={i.level}
                                                            label="Level"
                                                            onChange={(evt) => handleChangeService(evt, "level", i, index,3)}
                                                        />
                                                        <IconButton
                                                            variant="text"
                                                            className="bg-orange-500 w-12 h-10"
                                                            onClick={() => handleCancleService(i, index, itemById,3)}
                                                        >
                                                            <TrashIcon className="h-4 w-4 text-white" />
                                                        </IconButton>
                                                    </div>
                                                </div>
                                            );
                                        })
                                    : null}
                                {cookies.lok_type == "laundry" ? (
                                    <Button variant="gradient" color="light-blue" onClick={() => handleAddServices(3)} className="w-full">
                                        <span>Tambah Services</span>
                                    </Button>
                                ) : null}
                            </TabPanel>
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