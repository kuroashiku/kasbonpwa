import { N as create$3, Q as create$6 } from "./index-CGEICd-f.js";
const GetStokOpnameReqBody = () => ({
  lok_id: 0
});
const StokOpnameListModel = () => ({
  itm_stok: 0,
  itm_stok_satuan2: 0,
  itm_stok_satuan3: 0,
  itm_id: 0,
  itm_pakaistok: 0,
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
  sop_status_satuan_3: "Auto"
});
const StokOpnameSchema = create$3().shape({
  sop_date: create$6().nullable(),
  sop_lok_id: create$6().nullable(),
  sop_id: create$6().nullable(),
  sop_itm_id: create$6().nullable(),
  sop_qty_satuan_1: create$6().nullable(),
  sop_qty_satuan_2: create$6().nullable(),
  sop_qty_satuan_3: create$6().nullable(),
  sop_ket_satuan_1: create$6().nullable(),
  sop_ket_satuan_2: create$6().nullable(),
  sop_ket_satuan_3: create$6().nullable(),
  sop_status_satuan_1: create$6().nullable(),
  sop_status_satuan_2: create$6().nullable(),
  sop_status_satuan_3: create$6().nullable(),
  itm_pakaistok: create$6().nullable()
});
export {
  GetStokOpnameReqBody as G,
  StokOpnameListModel as S,
  StokOpnameSchema as a
};
