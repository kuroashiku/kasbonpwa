import * as Yup from 'yup';
import { YupNumber, YupNumberNonZero } from './yup';

// export const GetItemsReqBody = ()=>({
//     lok_id: 0
// })

export const ProjectListModel = () => ({
    mp_project_id : "",
    mp_project_code : "",
    mp_project_name : "",
    mp_jenis_project : "",
    mp_nilai_plan : "",
    mp_tanggal_mulai : "",
    mp_target_selesai : "",
    mp_status : "",
    mp_customer_id : "",
    mp_created_at : "",
    mp_updated_at : ""    
});
