import { ItemCheckoutModel, ItemListModel } from "../model/item";

export const getMatchUnitAndPrice = (item=ItemCheckoutModel()) =>{
    let satuan,harga;
    switch(item.konvidx){
        case 0:
            satuan=item.satuan1;
            harga=item.satuan1hrg;
            break;
        case 1:
            satuan=item.satuan2;
            harga=item.satuan2hrg;
            break;
        case 2: 
            satuan=item.satuan3;
            harga=item.satuan3hrg;
            break;
        case 3:
            satuan=item.satuan0;
            harga=item.satuan0hrg;
            break;
    }
    return {
        unit: satuan,
        price: typeof harga === "number" ? harga : Number(harga)
    }
}


export const getAllUoms = (item=ItemListModel()) =>{
    let uoms=[];
    if(item.itm_satuan1){
        uoms.push(item.itm_satuan1);
    }
    if(item.itm_satuan2){
        uoms.push(item.itm_satuan2);
    }
    if(item.itm_satuan3){
        uoms.push(item.itm_satuan3);
    }
    return uoms;
}