import { useState } from "react";
import ImageUpload from "../../lib/ImageUpload";
import { Navbar } from "@material-tailwind/react";
import { IconButton } from "@material-tailwind/react";
import { AppContext } from "../../AppContext";
import { useContext } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { useRef } from "react";
import { updateLokasi } from "../../api/Login";

export default function Qris(){
    const { setMenuOpen, lang, cookies, setCookies } = useContext(AppContext);
    const [image, setImage] = useState("");
    const navbarRef = useRef();
    const onError = ()=>{
        alert("Gagal Mengupload QRIS")
    }
    const onRemove = () => {
        setImage("");
    }
    const onSuccess = (url) => {
        const save = async () => {
			const { data, error } = await updateLokasi({ lok_prop:"lok_qris",lok_value:url, lok_id:cookies.lok_id });
			if (error) {
				alert(dictionary.universal.notfound[lang]);
			} else {
                setCookies("qris", data);
			}
		};
		save();
        //call api
        //update location where loc id == ini values (loc_qris = url)
    }

    return(
        <div className="h-screen-adapt bg-gray-50 overflow-hidden relative">
            <div className="top-0 inset-x-0 fixed bg-gradient-to-b from-gray-50 h-20" />
            <div className="p-2 top-0 inset-x-0 fixed z-50 mx-auto desktop:max-w-[60%]">
                <Navbar ref={navbarRef} className={`pt-2 px-2 py-2 relative`} blurred={false}>
                    <div className="flex items-center">
                    <IconButton variant="text" size="md" onClick={() => setMenuOpen(true)}>
                        <div className="justify-items-center lowercase">
                  <Bars3Icon className="h-6 w-6 stroke-2" />
                  <div style={{fontSize:"10px",padding:"0px"}}>
                    Menu
                  </div>
                </div>
                    </IconButton>
                    <div className="mx-2 flex-grow text-black font-semibold">
                    QRIS Saya
                    </div>
                    </div>
                </Navbar>
            </div>
            <div className="pt-20">
            <ImageUpload image={cookies.qris} 
                id="upl-qris"
                widthClass="w-img-upload"
                onSuccess={onSuccess}
                onRemove={onRemove}
                onError={onError}
            />
            </div>
        </div>
    )
}