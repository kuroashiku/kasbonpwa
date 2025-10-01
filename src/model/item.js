import * as Yup from 'yup';
import { YupNumber, YupNumberNonZero } from './yup';

export const GetItemsReqBody = ()=>({
    lok_id: 0
})

export const ItemCheckoutModel = ()=>({
    itm_id: 0,
    itm_nama: "",
    total: 0,
    qty: 0,
    diskon: 0,
    disnom: 0,
    kode:"",
    konvidx: 0,
    tipe: 0,
    id: 0,
    nama: "",

    satuan1hrg: 0,
    satuan1: "",
    satuan1hpp: 0,
    itm_urlimage1: "",

    satuan2hrg: 0,
    satuan2: "",
    satuan2hpp: 0,
    satuan2of1: 1,
    itm_urlimage2: "",

    satuan3hrg: 0,
    satuan3: "",
    satuan3hpp: 0,
    satuan3of1: 1,
    itm_urlimage3: "",

    satuan0hrg: 0,
    satuan0: "",
    satuan0hpp: 0,
    satuan0of1: 1,
    itm_urlimage0: "",
    itm_flag:false,
    pakaistok:0,
    stok:0,
    service_itm_id:0,
    service_level_satuan1:[],
    service_level_satuan2:[],
    service_level_satuan3:[],
    service_level:[],
    service_level_satuan0:[],
    service_level_satuan0_str:'[]',

    totalsatuan:[]
})

export const ItemListModel = () => ({
    itm_buyable: 1,
    itm_durasi: "",
    itm_gallery: "",
    itm_kode: "",
    itm_lok_id:"",
    itm_nama:"",
    itm_pakaistok: 0,
    itm_gallery: 0,
    itm_stoknew: 0,
    itm_satuan: null,
    
    itm_satuan1: "",
    itm_satuan1hpp: 0,
    itm_satuan1hrg: 0,
    itm_urlimage1: "",
    itm_pakaistok1:"1",
    
    itm_satuan2: "",
    itm_satuan2hpp:0,
    itm_satuan2hrg: 0,
    itm_satuan2of1: 1,
    itm_urlimage2: "",
    
    itm_satuan3: "",
    itm_satuan3hpp: 0,
    itm_satuan3hrg: 0,
    itm_satuan3of1: 1,
    itm_urlimage3: "",
    
    itm_satuandurasi: "",
    itm_sellable: 1,
    itm_stok: 0,
    itm_stok_satuan2: 0,
    itm_stok_satuan3: 0,
    itm_stokaman: 0,
    itm_tgstokopnam: "",

    totalsatuan:[]
});

export const ItemNotaModel = () => ({
    diskon: "",
    disnom: "",
    itm_id: "",
    itm_nama: "",
    konvidx: "",
    qty: "",
    pakaistok:"",
    satuan1:"",
    satuan1hpp:"",
    satuan1hrg:"",
    satuan2:"",
    satuan2hpp:"",
    satuan2hrg:"",
    satuan2of1:"",
    satuan3:"",
    satuan3hpp:"",
    satuan3hrg:"",
    satuan3of1:"1",
    total:""
});

export const ItemUomSchema = Yup.object().shape({
    itm_buyable: Yup.string().nullable(),
    itm_durasi: Yup.string().nullable(),
    itm_gallery: Yup.string().nullable(),
    itm_id: Yup.string().required(),
    itm_kode: Yup.string().required(),
    itm_lok_id:Yup.string().required(),
    itm_nama:Yup.string().required(),
    itm_pakaistok: Yup.string().nullable(),
    itm_satuan: Yup.string().nullable(),
    
    itm_satuan1: Yup.string().required("Required"),
    itm_satuan1hpp: Yup.number(),
    itm_satuan1hrg: Yup.number(),
    
    itm_satuan2: Yup.string().nullable(),
    itm_satuan2hpp:Yup.number().when("itm_satuan2",{
        is:  (val) => val && val.length>0,
        then: ()=>YupNumberNonZero(),
        otherwise: ()=>Yup.number().notRequired().typeError(null)
    }),
    itm_satuan2hrg: Yup.number().when("itm_satuan2",{
        is:  (val) => val && val.length>0,
        then:  ()=>YupNumberNonZero(),
        otherwise: ()=>Yup.number().notRequired().typeError(null)
    }),
    itm_satuan2of1: Yup.number().when("itm_satuan2",{
        is:  (val) => val && val.length>0,
        then:  ()=>YupNumberNonZero(),
        otherwise: ()=>Yup.number().notRequired().typeError(null)
    }),
    
    itm_satuan3: Yup.string().nullable(),
    itm_satuan3hpp:Yup.number().when("itm_satuan3",{
        is:  (val) => val && val.length>0,
        then:  ()=>YupNumberNonZero(),
        otherwise: ()=>Yup.number().notRequired().typeError(null)
    }),
    itm_satuan3hrg: Yup.number().when("itm_satuan3",{
        is:  (val) => val && val.length>0,
        then:  ()=>YupNumberNonZero(),
        otherwise: ()=>Yup.number().notRequired().typeError(null)
    }),
    itm_satuan3of1: Yup.number().when("itm_satuan3",{
        is:  (val) => val && val.length>0,
        then:  ()=>YupNumberNonZero(),
        otherwise: ()=>Yup.number().notRequired().typeError(null)
    }),
    
    itm_satuandurasi: Yup.string().nullable(),
    itm_sellable: Yup.string().nullable(),
    itm_buyable: Yup.string().nullable(),
    itm_stok: YupNumber(),
    itm_stokaman: YupNumber().nullable(),
    itm_tgstokopnam: Yup.string().nullable(),
    service_level_satuan1:Yup.string().notRequired().nullable(),
    service_level_satuan2:Yup.string().notRequired().nullable(),
    service_level_satuan3:Yup.string().notRequired().nullable(),
});

export const convertItemListToCheckout = (itemList=[ItemListModel()]) => {
    const checkouts = [];
    let price = 0;
    let hpp=0;
    itemList.forEach(i =>{
        const chekout = ItemCheckoutModel();
        chekout.itm_id = i.itm_id;
        chekout.itm_nama = i.itm_nama;
        chekout.total= 0;
        chekout.qty= 0;
        chekout.diskon= 0;
        chekout.disnom= 0;
        chekout.tipe= 1;
        chekout.id= i.itm_id;
        chekout.nama= i.itm_nama;
        chekout.kode = i.itm_kode;
        chekout.pakaistok = i.itm_pakaistok
        chekout.konvidx= 0;
        hpp = typeof i.itm_satuan1hpp === "number" ? i.itm_satuan1hpp : Number(i.itm_satuan1hpp) ;
        price = typeof i.itm_satuan1hrg === "number" ? i.itm_satuan1hrg : Number(i.itm_satuan1hrg) ;
        chekout.satuan1 = i.itm_satuan1;
        chekout.satuan1hpp = hpp;
        chekout.satuan1hrg = price;
        chekout.satuan0 = i.itm_satuan1;
        chekout.satuan0hpp = hpp;
        chekout.satuan0hrg = price;
        chekout.itm_urlimage0 = i.itm_urlimage1;
        chekout.total = price;
        chekout.pakaistok = i.itm_pakaistok;
        chekout.stok = i.itm_stok;
        chekout.service_level = JSON.parse(i.itm_service_level_satuan1);
        chekout.qty_service = 0;
        chekout.service_level_satuan0 = [];
        chekout.service_level_satuan0_str = "[]";
        checkouts.push({...chekout});
        if(i.itm_satuan2){
            hpp = typeof i.itm_satuan2hpp === "number" ? i.itm_satuan2hpp : Number(i.itm_satuan2hpp) ;
            price = typeof i.itm_satuan2hrg === "number" ? i.itm_satuan2hrg : Number(i.itm_satuan2hrg) ;
            chekout.konvidx = 1;
            chekout.satuan2 = i.itm_satuan2;
            chekout.satuan2hpp = hpp;
            chekout.satuan2hrg = price;
            chekout.satuan0 = i.itm_satuan2;
            chekout.satuan0hpp = hpp;
            chekout.satuan0hrg = price;
            chekout.itm_urlimage0 = i.itm_urlimage2;
            chekout.total = price;
            chekout.stok = i.itm_stok_satuan2;
            chekout.service_level = JSON.parse(i.itm_service_level_satuan2);
            checkouts.push({...chekout});
        }
        if(i.itm_satuan3){
            hpp = typeof i.itm_satuan3hpp === "number" ? i.itm_satuan3hpp : Number(i.itm_satuan3hpp) ;
            price = typeof i.itm_satuan3hrg === "number" ? i.itm_satuan3hrg : Number(i.itm_satuan3hrg) ;
            chekout.konvidx = 2;
            chekout.satuan3 = i.itm_satuan3;
            chekout.satuan3hpp = hpp;
            chekout.satuan3hrg = price;
            chekout.satuan0 = i.itm_satuan3;
            chekout.satuan0hpp = hpp;
            chekout.satuan0hrg = price;
            chekout.itm_urlimage0 = i.itm_urlimage3;
            chekout.total = price;
            chekout.stok = i.itm_stok_satuan3;
            chekout.service_level = JSON.parse(i.itm_service_level_satuan3);
            checkouts.push({...chekout});
        }
    });
    return checkouts;
}

export const convertItemListToCheckoutNew = (itemList=[ItemListModel()]) => {
    const checkouts = [];
    let price = 0;
    let hpp=0;
    itemList.forEach(i =>{
        const chekout = ItemCheckoutModel();
        chekout.itm_id = i.itm_id;
        chekout.itm_nama = i.itm_nama;
        chekout.total= 0;
        chekout.qty= 0;
        chekout.diskon= 0;
        chekout.disnom= 0;
        chekout.tipe= 1;
        chekout.id= i.itm_id;
        chekout.nama= i.itm_nama;
        chekout.kode = i.itm_kode;
        chekout.konvidx= 0;
        hpp = typeof i.itm_satuan1hpp === "number" ? i.itm_satuan1hpp : Number(i.itm_satuan1hpp) ;
        price = typeof i.itm_satuan1hrg === "number" ? i.itm_satuan1hrg : Number(i.itm_satuan1hrg) ;
        chekout.satuan1 = i.itm_satuan1;
        chekout.satuan1hpp = hpp;
        chekout.satuan1hrg = price;
        chekout.satuan0 = i.itm_satuan1;
        chekout.satuan0hpp = hpp;
        chekout.satuan0hrg = price;
        chekout.pakaistok = i["itm_pakaistok1"];
        chekout.itm_urlimage0 = i["itm_urlimage1"];
        chekout.stok = i.itm_stok;
        chekout.service_level = JSON.parse(i.itm_service_level_satuan1);
        checkouts.push({...chekout});
        i.totalsatuan.forEach((j, index) => {
            if(index>=1){
                hpp = typeof i["itm_satuan"+(index+1)+"hpp"] === "number" ? i["itm_satuan"+(index+1)+"hpp"] : Number(i["itm_satuan"+(index+1)+"hpp"]) ;
                price = typeof i["itm_satuan"+(index+1)+"hrg"] === "number" ? i["itm_satuan"+(index+1)+"hrg"] : Number(i["itm_satuan"+(index+1)+"hrg"]) ;
                chekout["satuan"+(index+1)] = i["itm_satuan"+(index+1)];
                chekout["satuan"+(index+1)+"hpp"] = hpp;
                chekout["itm_satuan"+(index+1)+"hrg"] = price;
                chekout.satuan0 = i["itm_satuan"+(index+1)];
                chekout.satuan0hpp = hpp;
                chekout.satuan0hrg = price;
                chekout.itm_urlimage0 = i["itm_urlimage"+(index+1)];
                chekout.total = price;
                chekout.pakaistok = i["itm_pakaistok"+(index+1)];
                chekout.stok = index==0?i.itm_stok:i["itm_stok_satuan"+(index+1)];
                chekout.service_level = JSON.parse(i["itm_service_level_satuan"+(index+1)]);
                chekout.qty_service = 0;
                chekout.service_level_satuan0 = [];
                chekout.service_level_satuan0_str = "[]";
                checkouts.push({...chekout});
            }
        });
    });
    return checkouts;
}

export const convertDraftListToCheckoutOld = (notaItemList=[ItemNotaModel()]) => {
    const checkouts = [];
    let price = 0;
    let hpp=0;
    notaItemList.forEach(i =>{
        const chekout = ItemCheckoutModel();
        chekout.itm_id = i.itm_id;
        chekout.itm_nama = i.itm_nama;
        chekout.total= 0;
        chekout.qty= Number(i.qty);
        chekout.diskon= i.diskon;
        chekout.disnom= 0;
        chekout.tipe= 1;
        chekout.id= i.itm_id;
        chekout.pakaistok=i.itm_pakaistok;
        chekout.nama= i.itm_nama;
        chekout.kode= i.itm_kode;
        chekout.stok = i.itm_stok;
        chekout.service_level_satuan0 = JSON.parse(i.service_level_satuan0);
        chekout.service_level = JSON.parse(i.service_level);
        chekout.qty_service = 1;
        chekout.split_bill=i.split_bill;
        chekout.service_level_satuan0_str = "[]";
        if(i.satuan1){
            hpp = typeof i.satuan1hpp === "number" ? i.satuan1hpp : Number(i.satuan1hpp) ;
            price = typeof i.satuan1hrg === "number" ? i.satuan1hrg : Number(i.satuan1hrg) ;
            chekout.konvidx = 0;
            chekout.satuan1 = i.satuan1;
            chekout.satuan1hpp = hpp;
            chekout.satuan1hrg = price;
            chekout.satuan0 = i.satuan1;
            chekout.satuan0hpp = hpp;
            chekout.satuan0hrg = price;
            checkouts.push({...chekout});
        }
        else if(i.satuan2){
            hpp = typeof i.satuan2hpp === "number" ? i.satuan2hpp : Number(i.satuan2hpp) ;
            price = typeof i.satuan2hrg === "number" ? i.satuan2hrg : Number(i.satuan2hrg) ;
            chekout.konvidx = 1;
            chekout.satuan2 = i.satuan2;
            chekout.satuan2hpp = hpp;
            chekout.satuan2hrg = price;
            chekout.satuan0 = i.satuan2;
            chekout.satuan0hpp = hpp;
            chekout.satuan0hrg = price;
            checkouts.push({...chekout});
        }
        else if(i.satuan3){
            hpp = typeof i.satuan3hpp === "number" ? i.satuan3hpp : Number(i.satuan3hpp) ;
            price = typeof i.satuan3hrg === "number" ? i.satuan3hrg : Number(i.satuan3hrg) ;
            chekout.konvidx = 2;
            chekout.satuan3 = i.satuan3;
            chekout.satuan3hpp = hpp;
            chekout.satuan3hrg = price;
            chekout.satuan0 = i.satuan3;
            chekout.satuan0hpp = hpp;
            chekout.satuan0hrg = price;
            checkouts.push({...chekout});
        }
    });
    return checkouts;
}

export const convertDraftListToCheckout = (notaItemList=[ItemNotaModel()]) => {
    const checkouts = [];
    let price = 0;
    let hpp=0;
    notaItemList.forEach(i =>{
        const chekout = ItemCheckoutModel();
        chekout.qty= Number(i.qty);
        chekout.satuan1 = i.satuan1;
        chekout.satuan1hpp = Number(i.satuan1hpp);
        chekout.satuan1hrg = Number(i.satuan1hrg);
        chekout.satuan0 = i.satuan0;
        chekout.satuan0hpp = Number(i.satuan0hpp);
        chekout.satuan0hrg = Number(i.satuan0hrg);
        chekout.total= Number(i.total);
        chekout.satuan0of1= Number(i.satuan0of1);
        chekout.itm_id = i.itm_id;
        chekout.itm_nama = i.itm_nama;
        chekout.itm_kode = i.itm_kode;
        chekout.diskon= i.diskon;
        chekout.disnom= 0;
        chekout.tipe= 1;
        chekout.service_level_satuan0 = JSON.parse(i.service_level_satuan0);
        chekout.service_level = JSON.parse(i.service_level);
        chekout.qty_service = 1;
        chekout.split_bill=i.split_bill;
        chekout.service_level_satuan0_str = "[]";
        checkouts.push({...chekout});
    });
    return checkouts;
}