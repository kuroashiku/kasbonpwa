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
import { API_HOST } from "../../api/Global";
import FacebookLogin from '@greatsumini/react-facebook-login';
import { auth, provider, fbprovider, signInWithPopup, signOut} from '../../lib/FirebaseAuthConfig';
export default function LoginPage() {
  const { setDataLogin, setCookies, cookies } = useContext(AppContext);
  const [testing, settesting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  function togglePasswordVisibility() {
      setIsPasswordVisible((prevState) => !prevState);
  }
  const navigate = useNavigate();
  const [supportsPWA, setSupportsPWA] = useState(false);
  const [promptInstall, setPromptInstall] = useState(null);
  function togglePasswordVisibility() {
      setIsPasswordVisible((prevState) => !prevState);
  }
  function loginWithGoogle() {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      const initcustomer = async () => {
        const { data, error } = await login({ email: user.email });
        if (error) {
          alert("Gagal login");
          setLoading(false);
        } 
        else {
          enterApp(data);
          navigate(topic.cashier.route);
        }
      };
      initcustomer();
      console.log(user);
      console.log("User signed in:", user.displayName, user.email);
    })
    .catch((error) => {
      console.error("Error saat melakukan sign-in:", error.message);
    });
  }
  function loginWithFacebook() {
    alert("Maaf fitur ini belum berfungsi")
  // signInWithPopup(auth, fbprovider)
  //   .then((result) => {
  //     const user = result.user;
  //     console.log(user)
  //     // const initcustomer = async () => {
  //     //   const { data, error } = await login({ email: user.email });
  //     //   if (error) {
  //     //     alert("Gagal login");
  //     //     setLoading(false);
  //     //   } 
  //     //   else {
  //     //     enterApp()
  //     //   }
  //     // };
  //     // initcustomer();
  //     // console.log(user);
  //     // console.log("User signed in:", user.displayName, user.email);
  //   })
  //   .catch((error) => {
  //     console.error("Error saat melakukan sign-in:", error.message);
  //   });
  }
  function enterApp(data){
    setDataLogin(data);
    setCookies("lok_id", data.kas_lok_id, {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 60)
    });
    setCookies("com_id", data.kas_com_id, {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 60)
    });
    setCookies("kas_id", data.kas_id, {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 60)
    });
    setCookies("kas_nama", data.kas_nama, {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 60)
    });
    setCookies("kas_owner", data.kas_owner, {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 60)
    });
    setCookies("kas_nick", username, {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 60)
    });
    setCookies("kas_password", password, {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 60)
    });
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
    console.log(data)
    if (data.role) {
      data.role.map((i, index) => {
        let pisah_priviledge = i.rol_priviledge.split("");
        console.log(i)
        pisah_priviledge.map((j, index) => {
          console.log(j)
          if (j == "R") role_read.push(i.rol_fun_code);
          if (j == "C") role_create.push(i.rol_fun_code);
          if (j == "U") role_update.push(i.rol_fun_code);
          if (j == "D") role_delete.push(i.rol_fun_code);
          if (j == "0") role_dst.push(i.rol_fun_code);
        });
      });
    }
    setCookies("role_read", role_read, {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 60)
    });
    setCookies("role_create", role_create, {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 60)
    });
    setCookies("role_update", role_update, {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 60)
    });
    setCookies("role_delete", role_delete, {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 60)
    });
    setCookies("role_dst", role_dst, {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 60)
    });
    setCookies("role_nama", data.kas_role, {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 60)
    });
    setCookies("nama_lokasi", data.nama, {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 60)
    });
    setCookies("alamat_lokasi", data.alamat, {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 60)
    });
    setCookies("footer1", data.footer1, {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 60)
    });
    setCookies("footer2", data.footer2, {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 60)
    });
    setCookies("telpon", data.telpon, {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 60)
    });
    setCookies("paket", data.paket, {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 60)
    });
    setCookies("qris", data.qris, {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 60)
    });
    if(data.general_setting){
      setCookies("max_draft", data.general_setting.gen_set_max_draft, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 60)
      });
      setCookies("scan_mode", data.general_setting.gen_set_scan_mode, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 60)
      });
      setCookies("max_piutang", data.general_setting.gen_set_max_piutang, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 60)
      });
      setCookies("auto_logout", data.general_setting.gen_set_auto_logout, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 60)
      });
      setCookies("lok_type", data.general_setting.gen_set_lok_type, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 60)
      });
      setCookies("dp_0", data.general_setting.gen_set_dp_0, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 60)
      });
      setCookies("resto_type", data.general_setting.gen_set_resto_type, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 60)
      });
      setCookies("split_bill", data.general_setting.gen_set_split_bill, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 60)
      });
      setCookies("join_bill", data.general_setting.gen_set_join_bill, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 60)
      });
      setCookies("always_print", data.general_setting.gen_set_always_print, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 60)
      });
      setCookies("income_outcome", data.general_setting.gen_json_income_outcome, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 60)
      });
      setCookies("stokitem", data.general_setting.gen_set_stokitem, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 60)
      });
      setCookies("gen_id", data.general_setting.gen_id, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 60)
      });
    }
    localStorage.clear();
    setLoading(false);
    
  }
  function logoutWithGoogle() {
    
    signOut(auth).then(() => {
      console.log("User signed out");
    });
  }
  const [loginUrl, setLoginUrl] = useState(null);
  // useEffect(() => {
  //   fetch(`${API_HOST}/auth`, {
  //       headers : {
  //           'Content-Type': 'application/json',
  //           'Accept': 'application/json'
  //       }
  //   })
  //   .then((response) => {
  //       if (response.ok) {
  //           return response.json();
  //       }
  //       throw new Error('Auth gagal');
  //   })
  //   .then((data) => setLoginUrl( data.url ))
  // }, []);
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
          enterApp(data);
          navigate(topic.masterprojects.route);
        }
      }
    },
    [username, password]
  );
  const handleSuccess = (response) => {
    console.log("Login Success:", response);
    // response contains accessToken, userID, etc.
  };

  const handleFail = (error) => {
    console.log("Login Failed:", error);
  };
  // if (!supportsPWA) {
  //   return null;
  // }
  useEffect(() => {
    // Load the SDK
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: "711728321654379", // Replace with your App ID
        cookie: true,
        xfbml: true,
        version: "v20.0", // Use latest version
      });
    };

    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  }, []);

  const handleLogin2 = () => {
    window.FB.login(
      function (response) {
        if (response.status === "connected") {
          console.log("Access Token:", response.authResponse.accessToken);
          console.log("User ID:", response.authResponse.userID);
        } else {
          console.log("Login cancelled or failed:", response);
        }
      },
      { scope: "public_profile,email" }
    );
  };
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

        <Card className="relative content-box lg:mr-[5%] lg:ml-auto mb-[20%] lg:mb-[10%] p-4 mobile:px-0 lg:w-[350px] flex flex-col justify-center items-center">
          <img src={kasbon_logo} alt="logo" className="w-[150px] lg:w-[250px] mx-auto" />
          {testing?
          <span className="mb-4 w-32 text-center border-blue-gray-500 ml-24 align-top font-bold -rotate-6 border-solid border-2">Testing</span>
          :null}
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
                type={isPasswordVisible ? "text" : "password"}
                id="input-group-2"
                className="border pl-10 border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:outline-none focus:bg-light-blue-50"
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleLogin}
                value={password}
              />
            </div>
            <label className="flex items-center mt-2">
              <input
                type="checkbox"
                className="mr-2 w-4 h-4 border-gray-300"
                checked={isPasswordVisible}
                onChange={togglePasswordVisibility}
              />
              <span className="text-sm text-gray-600">Show password</span>
            </label>
            <div className="action-area">
              <Button
                className={`${testing ? "bg-[#51c879]" : "bg-[#5197C8]"} w-full py-2 mt-2 px-4 h-[42px] text-sm`}
                onClick={() => handleLogin({ key: "Enter" })}
              >
                Login
              </Button>
            </div>
            <div>
              or
            </div>
            <div className="action-area">
              <Button
                className={`bg-[#ececec] text-black w-full py-2 px-4 h-[42px] text-sm`}
                onClick={() => loginWithGoogle()}
              >
                Sign in with Google
              </Button>
              {/* <Button
                className={`bg-[#515dc8] w-full mt-3 py-2 px-4 h-[42px] text-sm`}
                onClick={() => loginWithFacebook()}
              >
                Sign in with Facebook
              </Button> */}
              <FacebookLogin
                appId="711728321654379"
                style={{
                  backgroundColor: '#4267b2',
                  color: '#fff',
                  fontSize: '16px',
                  padding: '12px 24px',
                  border: 'none',
                  borderRadius: '0.5rem',
                  width: '100%',
                  marginTop:'15px'
                }}
                onSuccess={handleSuccess}
                onFail={handleFail}
                onProfileSuccess={(profile) => {
                  console.log("Profile Info:", profile);
                }}
                
              >
                Sign in with Facebook
              </FacebookLogin>
              {/* <button
      onClick={handleLogin2}
      style={{
        backgroundColor: "#4267b2",
        color: "#fff",
        padding: "10px 20px",
        borderRadius: "5px",
        border: "none",
      }}
    >
      Login with Facebook
    </button> */}
            </div>
          </div>
          <div className="footer text-center text-sm text-gray-400 pb-4 pt-10">
            By <b>ReenDoo</b> {new Date().getFullYear()}
          </div>
          <div className="grid grid-cols-2 mb-4">
            <a className={`bg-transparent w-full mt-3 py-2 px-4 h-[42px] text-sm text-blue-500 cursor-pointer`} target="_blank" href="https://kasbon.reendoo.com/#/privasi">Kebijakan Privasi</a>
            <a className={`bg-transparent w-full mt-3 py-2 px-4 h-[42px] text-sm text-blue-500 cursor-pointer`} target="_blank" href="https://kasbon.reendoo.com/#/termservice">Term Of Service</a>
          </div>
        </Card>
        
        
          
      </div>
      
    );
}
