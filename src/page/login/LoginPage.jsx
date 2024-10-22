import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { login } from "../../api/Login";
import { checkIn } from "../../api/Shift";
import { AppContext } from "../../AppContext";
import { Button, Card, Spinner, IconButton } from "@material-tailwind/react";
import { UserIcon, KeyIcon, ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { topic } from "../../constant/appTopics";
import { useNavigate } from "react-router-dom";
import kasbon_logo from "../../assets/favicon.ico";
import cashier from "../../assets/image/cashier.svg";
import InstallPWA from "../../lib/ButtonPwa.jsx";

export default function LoginPage() {
  const { setDataLogin, setCookies, cookies } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [supportsPWA, setSupportsPWA] = useState(false);
  const [promptInstall, setPromptInstall] = useState(null);
  const handleLogin = useCallback(
    async (event) => {
      if (event.key === "Enter" && username != "") {
        setLoading(true);
        const { data, error } = await login({
          username: username,
          password: password,
        });
        if (error) {
          alert("Gagal login");
          setLoading(false);
        } else {
          console.log(data)
          setDataLogin(data);
          setCookies("lok_id", data.kas_lok_id);
          setCookies("com_id", data.kas_com_id);
          setCookies("kas_id", data.kas_id);
          setCookies("kas_nama", data.kas_nama);
          var now = new Date();
          var year = now.getFullYear();
          var month = now.getMonth();
          var day = now.getDate();
          var hour = now.getHours();
          var minute = now.getMinutes();
          var dateTime = year + "," + month + "," + day + "," + hour + "," + minute + ",0";
          setCookies("time_now", dateTime);
          let role_read = [];
          let role_create = [];
          let role_update = [];
          let role_delete = [];
          let role_dst = [];
          let role_admin="admin";
          if (data.role) {
            data.role.map((i, index) => {
              let pisah_priviledge = i.rol_priviledge.split("");
              pisah_priviledge.map((j, index) => {
                if (j == "R") role_read.push(i.rol_fun_code);
                if (j == "C") role_create.push(i.rol_fun_code);
                if (j == "U") role_update.push(i.rol_fun_code);
                if (j == "D") role_delete.push(i.rol_fun_code);
                if (j == "0") role_dst.push(i.rol_fun_code);
              });
            });
          }
          console.log(role_admin)
          setCookies("role_read", role_read);
          setCookies("role_create", role_create);
          setCookies("role_update", role_update);
          setCookies("role_delete", role_delete);
          setCookies("role_dst", role_dst);
          setCookies("role_nama", role_admin);
          if(data.general_setting){
            setCookies("max_draft", data.general_setting.gen_set_max_draft);
            setCookies("scan_mode", data.general_setting.gen_set_scan_mode);
            setCookies("max_piutang", data.general_setting.gen_set_max_piutang);
            setCookies("auto_logout", data.general_setting.gen_set_auto_logout);
            setCookies("lok_type", data.general_setting.gen_set_lok_type);
            setCookies("dp_0", data.general_setting.gen_set_dp_0);
            setCookies("resto_type", data.general_setting.gen_set_resto_type);
            setCookies("split_bill", data.general_setting.gen_set_split_bill);
            setCookies("join_bill", data.general_setting.gen_set_join_bill);
            setCookies("always_print", data.general_setting.gen_set_always_print);
            setCookies("gen_id", data.general_setting.gen_id);
          }
          localStorage.clear();
          setLoading(false);
          navigate(topic.cashier.route);
        }
      }
    },
    [username, password]
  );
  
  // if (!supportsPWA) {
  //   return null;
  // }
  if (loading) {
    return (
      <div className="h-screen-adapt flex flex-col justify-center">
        <Spinner color="teal" className="h-12 w-12 mx-auto" />
      </div>
    );
  } else
    return (
      <div className="relative h-screen-adapt lg:!h-screen flex flex-col justify-center items-center text-center w-full p-5">
        <InstallPWA>
        </InstallPWA>
        <img src={cashier} alt="cashier" className="absolute left-2 mobile:bottom-0 lg:bottom-[5%] w-[85%] " />

        <Card className="relative content-box lg:mr-[5%] lg:ml-auto mb-[20%] lg:mb-[10%] p-4 mobile:px-0 lg:w-[350px] flex flex-col justify-center items-center gap-6">
          <img src={kasbon_logo} alt="logo" className="w-[150px] lg:w-[250px] mx-auto" />

          <div className="content w-full p-4">
            <div className="input-item mb-3">
              <UserIcon className="pointer-events-none w-5 h-5 absolute mt-3 ml-3 text-gray-500" />
              <input
                type="text"
                id="input-group-1"
                className="border pl-10 border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:outline-none focus:bg-light-blue-50"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
              />
            </div>
            <div className="input-item mb-3">
              <KeyIcon className="pointer-events-none w-5 h-5 absolute mt-3 ml-3 text-gray-500" />
              <input
                type="password"
                id="input-group-2"
                className="border pl-10 border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:outline-none focus:bg-light-blue-50"
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleLogin}
                value={password}
              />
            </div>
            <div className="action-area">
              <Button
                className="w-full bg-[#5197C8] py-2 px-4 h-[42px] text-sm"
                onClick={() => handleLogin({ key: "Enter" })}
              >
                Login
              </Button>
            </div>
          </div>
          <div className="footer text-center text-sm text-gray-400 py-4">
            By <b>ReenDoo</b> {new Date().getFullYear()}
          </div>
        </Card>
        
        
          
      </div>
      
    );
}
