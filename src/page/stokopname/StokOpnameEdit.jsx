import { useCallback, useContext, useEffect, useState } from "react";
import { saveStokOpname } from "../../api/StokOpname";
import { ItemListModel, ItemUomSchema } from "../../model/item";
import { StokOpnameListModel, StokOpnameSchema } from "../../model/stokopname";
import { useFormik } from "formik";
import {
  Button,
  IconButton,
  Input,
  Option,
  Select,
  Spinner,
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
  Typography,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { CheckIcon, CubeIcon } from "@heroicons/react/24/outline";
import { dictionary } from "../../constant/appDictionary";
import { AppContext } from "../../AppContext";
import InputMoney from "../../lib/InputMoney";
import InputSimple from "../../lib/InputSimple";
import InputNumber from "../../lib/InputNumber";
import { cloneDeep } from "lodash";
import ImageUpload from "../../lib/ImageUpload";
import { IKImage } from "imagekitio-react";
import { IMAGEKIT_URL_ENDPOINT } from "../../constant/appCommon";

export default function StokOpnameEdit(
  props = { item: StokOpnameListModel(), onClose: () => {}, onSubmit: () => {}, pakaistoklist: 0 }
) {
  const { lang, currency } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [currentTab, setCurrentTab] = useState("unit-1");
  const formik = useFormik({
    initialValues: StokOpnameListModel(),
    validationSchema: StokOpnameSchema,
    onSubmit: async (_input) => {
      setLoading(true);
      if (_input.itm_id) {
        await saveStokOpname(_input);
      }
      setLoading(false);
      props.onSubmit(_input);
    },
  });
  const [pakaistok, setPakaistok] = useState([
    { pak_id: 1, pak_nama: "Pakai Stok", pak_value: 1 },
    { pak_id: 2, pak_nama: "Tidak Pakai Stok", pak_value: 0 },
  ]);
  const [pakaistoknew, setpakaistoknew] = useState(null);

  useEffect(() => {
    const { item } = props;
    formik.setValues({
      ...item,
      itm_stok: typeof item.itm_stok == "number" ? item.itm_stok : Number(item.itm_stok),
      itm_stok_satuan2:
        typeof item.itm_stok_satuan2 == "number" ? item.itm_stok_satuan2 : Number(item.itm_stok_satuan2),
      itm_stok_satuan3:
        typeof item.itm_stok_satuan3 == "number" ? item.itm_stok_satuan3 : Number(item.itm_stok_satuan3),
    });
    const { pakaistoklist } = props;
    setpakaistoknew(pakaistoklist);
    console.log(pakaistoklist);
  }, []);

  const handlePakaiStok = useCallback(
    (value) => {

      formik.setValues({
        ...formik.values,
        itm_pakaistok: value == 0 ? 0 : 1,
      });
    },
    [formik.values]
  );
  const setStok = useCallback(
    (e) => {
      formik.setValues({
        ...formik.values,
        itm_stok: e.target.value,
        sop_qty_satuan_1: e.target.value,
      });
    },
    [formik.values]
  );
  const setStokSatuan2 = useCallback(
    (e) => {
      formik.setValues({
        ...formik.values,
        itm_stok_satuan2: e.target.value,
        sop_qty_satuan_2: e.target.value,
      });
    },
    [formik.values]
  );
  const setStokSatuan3 = useCallback(
    (e) => {
      formik.setValues({
        ...formik.values,
        itm_stok_satuan3: e.target.value,
        sop_qty_satuan_3: e.target.value,
      });
    },
    [formik.values]
  );

  // const handlePakaiStok = (value) => {
  //     console.log(value)
  // };
  // useEffect(()=>{
  //     const {item} = props;
  //     formik.setValues({
  //         ...item,
  //         sop_qty_satuan_1 : parseInt(formik.values.sop_qty_satuan_1),
  //         itm_stok : parseInt(formik.values.sop_qty_satuan_1),
  //     });
  // },[formik.values.sop_qty_satuan_1]);

  const { values, errors, touched } = formik;

  return (
    <div className="h-screen-adapt bg-slate-100 overflow-hidden relative">
      <form className="pt-2 overflow-auto h-full" onSubmit={formik.handleSubmit}>
        <div className="header px-2">
          <div className="flex justify-between items-center">
            <Typography variant="lead" color="black">
              {values.itm_nama}
              {` (${values.itm_kode})`}
            </Typography>
            <IconButton className="float-right" variant="text" size="md" onClick={props.onClose}>
              <XMarkIcon className="h-6 w-6 stroke-2 text-black" />
            </IconButton>
          </div>

          <Typography variant="small" className="w-full font-normal mt-3">
            <Select
              className="h-10 bg-teal-50"
              Name="itm_pakaistok"
              value={pakaistoknew}
              onChange={handlePakaiStok}
              label="Pakai Stok"
            >
              {pakaistok.map((p) => (
                <Option value={p.pak_value} key={p.pak_id}>
                  {p.pak_nama}
                </Option>
              ))}
            </Select>
          </Typography>
        </div>

        <div className="content px-3 pt-3 pb-20 rounded-t-3xl bg-gray-50 min-h-screen">
          <Tabs value={currentTab}>
            <TabsHeader className="bg-teal-500">
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
              <TabPanel key={1} value="unit-1" className="px-0">
                <div className="mb-6">
                  <InputSimple value={values.itm_satuan1} label={dictionary.stock.uom.unitName[lang]} disabled />
                </div>
                <div className="mb-10">
                  <InputSimple value={1} label={dictionary.stock.uom.coef[lang]} disabled />
                </div>
                <div className="mb-10">
                  <InputNumber value={parseFloat(values.itm_stok)} label={dictionary.stock.uom.stock[lang]} disabled />
                </div>
                <div className="mb-10">
                  <InputNumber
                    value={values.sop_qty_satuan_1}
                    label={dictionary.stock.uom.stockopname[lang]}
                    name="sop_qty_satuan_1"
                    onChange={setStok}
                    error={errors.sop_qty_satuan_1}
                  />
                </div>
                <div className="mb-10">
                  <InputSimple
                    value={values.sop_ket_satuan_1}
                    label={dictionary.stock.uom.note[lang]}
                    name="sop_ket_satuan_1"
                    onChange={formik.handleChange}
                    error={errors.sop_ket_satuan_1}
                  />
                </div>
              </TabPanel>
              <TabPanel key={2} value="unit-2" className="px-0" disabled={true}>
                <div className="mb-6">
                  <InputSimple value={values.itm_satuan2} label={dictionary.stock.uom.unitName[lang]} disabled />
                </div>
                <div className="mb-10">
                  <InputSimple value={values.itm_satuan2of1} label={dictionary.stock.uom.unitName[lang]} disabled />
                </div>
                <div className="mb-10">
                  <InputNumber
                    value={parseFloat(values.itm_stok_satuan2)}
                    label={dictionary.stock.uom.stock[lang]}
                    disabled
                  />
                </div>
                <div className="mb-10">
                  <InputNumber
                    value={values.sop_qty_satuan_2}
                    label={dictionary.stock.uom.stockopname[lang]}
                    name="sop_qty_satuan_2"
                    onChange={setStokSatuan2}
                    error={errors.sop_qty_satuan_2}
                  />
                </div>
                <div className="mb-10">
                  <InputSimple
                    value={values.sop_ket_satuan_2}
                    label={dictionary.stock.uom.note[lang]}
                    name="sop_ket_satuan_2"
                    onChange={formik.handleChange}
                    error={errors.sop_ket_satuan_2}
                  />
                </div>
              </TabPanel>
              <TabPanel key={3} value="unit-3" className="px-0">
                <div className="mb-6">
                  <InputSimple value={values.itm_satuan3} label={dictionary.stock.uom.unitName[lang]} disabled />
                </div>
                <div className="mb-10">
                  <InputSimple value={values.itm_satuan3of1} label={dictionary.stock.uom.coef[lang]} disabled />
                </div>
                <div className="mb-10">
                  <InputNumber
                    value={parseFloat(values.itm_stok_satuan3)}
                    label={dictionary.stock.uom.stock[lang]}
                    disabled
                  />
                </div>
                <div className="mb-10">
                  <InputNumber
                    value={values.sop_qty_satuan_3}
                    label={dictionary.stock.uom.stockopname[lang]}
                    name="sop_qty_satuan_3"
                    onChange={setStokSatuan3}
                    error={errors.sop_qty_satuan_3}
                  />
                </div>
                <div className="mb-10">
                  <InputSimple
                    value={values.sop_ket_satuan_3}
                    label={dictionary.stock.uom.note[lang]}
                    name="sop_ket_satuan_3"
                    onChange={formik.handleChange}
                    error={errors.sop_ket_satuan_3}
                  />
                </div>
              </TabPanel>
            </TabsBody>
          </Tabs>
        </div>

        <div className="action-area fixed bottom-3 inset-x-4 z-20">
          <Button
            size="lg"
            variant="gradient"
            color="teal"
            className="group w-full relative flex items-center gap-3 overflow-hidden pr-[72px] mx-auto desktop:max-w-[60%]"
            type="submit"
            disabled={loading}
          >
            <span className="flex-grow text-left">{dictionary.stock.uom.save[lang]}</span>
            <span className="absolute right-0 grid h-full w-12 place-items-center bg-teal-500 transition-colors group-hover:bg-teal-600">
              {loading ? <Spinner className="w-5 h-5" color="white" /> : <CheckIcon className="w-5 h-5" />}
            </span>
          </Button>
        </div>
      </form>
    </div>
  );
}
