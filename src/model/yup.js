import * as Yup from 'yup';
export const YupNumberNonZero=()=>{
    return Yup.number().required("Required").min(0.001,"Tidak boleh 0").typeError('Tidak boleh kosong');
}

export const YupNumber=()=>{
    return Yup.number().required("Required").typeError('Tidak boleh kosong');
}