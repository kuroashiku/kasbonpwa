import * as Yup from 'yup';
import { YupNumber, YupNumberNonZero } from './yup';

export const GetStokOpnameReqBody = ()=>({
    lok_id: 0
})

export const StokOpnameListModel = () => ({
    itm_stok:0,
    itm_stok_satuan2:0,
    itm_stok_satuan3:0,
    itm_id:0,
    itm_pakaistok:0,
    sop_date: "",
    sop_lok_id: 0,
    sop_id: 0,
    sop_itm_id: "",
    sop_qty_satuan_1: 0,
    sop_qty_satuan_2: "",
    sop_qty_satuan_3: "",
    sop_ket_satuan_1: "",
    sop_ket_satuan_2: "",
    sop_ket_satuan_3: "",
    sop_status_satuan_1: "Auto",
    sop_status_satuan_2: "Auto",
    sop_status_satuan_3: "Auto",
});
export const StokOpnameSchema = Yup.object().shape({
    sop_date: Yup.string().nullable(),
    sop_lok_id: Yup.string().nullable(),
    sop_id: Yup.string().nullable(),
    sop_itm_id: Yup.string().nullable(),
    sop_qty_satuan_1: Yup.string().nullable(),
    sop_qty_satuan_2: Yup.string().nullable(),
    sop_qty_satuan_3: Yup.string().nullable(),
    sop_ket_satuan_1: Yup.string().nullable(),
    sop_ket_satuan_2: Yup.string().nullable(),
    sop_ket_satuan_3: Yup.string().nullable(),
    sop_status_satuan_1: Yup.string().nullable(),
    sop_status_satuan_2: Yup.string().nullable(),
    sop_status_satuan_3: Yup.string().nullable(),
    itm_pakaistok: Yup.string().nullable(),
});