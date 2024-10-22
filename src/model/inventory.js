export const GetInventoryReqBody = ()=>({
    com_id: 0,
    lok_id: 0
})

export const POListModel = () => ({
    po_sup_id: "",
    po_total: 0,
    po_kas_id: 0,
    po_lok_id: 0,
    po_catatan: "",
    po_status: "",
    po_id: 0,
    po_tgapprove:""
})

export const RcvListModel = () => ({
    rcv_po_id: "",
    rcv_total: 0,
    rcv_diskon: 0,
    rcv_kas_id: 0,
    rcv_lok_id: "",
    rcv_catatan: "",
    rcv_status: 0,
    rcv_id: 0
})