import { r as reactExports, j as jsxRuntimeExports, a as react, A as AppContext, u as useNavigate, t as topic, U as UserIcon } from "./index-CGEICd-f.js";
import { l as login } from "./Login-BX-Mfbo_.js";
function KeyIcon({
  title,
  titleId,
  ...props
}, svgRef) {
  return /* @__PURE__ */ reactExports.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: svgRef,
    "aria-labelledby": titleId
  }, props), title ? /* @__PURE__ */ reactExports.createElement("title", {
    id: titleId
  }, title) : null, /* @__PURE__ */ reactExports.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z"
  }));
}
const ForwardRef = reactExports.forwardRef(KeyIcon);
const KeyIcon$1 = ForwardRef;
const kasbon_logo = "/assets/favicon-CF4slY_J.ico";
const cashier = "/assets/cashier-CpYohqAl.svg";
const InstallPWA = () => {
  const [supportsPWA, setSupportsPWA] = reactExports.useState(false);
  const [promptInstall, setPromptInstall] = reactExports.useState(null);
  const [open, setOpen] = reactExports.useState(true);
  reactExports.useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setSupportsPWA(true);
      setPromptInstall(e);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("transitionend", handler);
  }, []);
  const onClick = (evt) => {
    evt.preventDefault();
    if (!promptInstall) {
      return;
    }
    promptInstall.prompt();
  };
  if (!supportsPWA) {
    return null;
  }
  return (
    // <button
    //   className="link-button fixed top-24 left-4 p-4 bg-gray-500"
    //   id="setup_button"
    //   aria-label="Install app"
    //   title="Install app"
    //   onClick={onClick}
    // >
    //   Install
    // </button>
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      react.Dialog,
      {
        open,
        handler: () => setOpen(false),
        size: "sm",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.DialogHeader, { children: "Install PWA" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(react.DialogBody, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-3", children: "Terdeteksi device yang support PWA" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Button, { className: "mb-2", fullWidth: true, variant: "gradient", color: "teal", onClick, children: "Install PWA" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Button, { className: "mb-2", fullWidth: true, variant: "gradient", color: "teal", onClick: () => setOpen(false), children: "Lanjutkan ke aplikasi" })
          ] })
        ]
      }
    )
  );
};
const InstallPWA$1 = InstallPWA;
function LoginPage() {
  const { setDataLogin, setCookies, cookies } = reactExports.useContext(AppContext);
  const [loading, setLoading] = reactExports.useState(false);
  const [username, setUsername] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const navigate = useNavigate();
  reactExports.useState(false);
  reactExports.useState(null);
  const handleLogin = reactExports.useCallback(
    async (event) => {
      if (event.key === "Enter" && username != "") {
        setLoading(true);
        const { data, error } = await login({
          username,
          password
        });
        if (error) {
          alert("Gagal login");
          setLoading(false);
        } else {
          console.log(data);
          setDataLogin(data);
          setCookies("lok_id", data.kas_lok_id);
          setCookies("com_id", data.kas_com_id);
          setCookies("kas_id", data.kas_id);
          setCookies("kas_nama", data.kas_nama);
          var now = /* @__PURE__ */ new Date();
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
          let role_admin = "admin";
          if (data.role) {
            data.role.map((i, index) => {
              let pisah_priviledge = i.rol_priviledge.split("");
              pisah_priviledge.map((j, index2) => {
                if (j == "R")
                  role_read.push(i.rol_fun_code);
                if (j == "C")
                  role_create.push(i.rol_fun_code);
                if (j == "U")
                  role_update.push(i.rol_fun_code);
                if (j == "D")
                  role_delete.push(i.rol_fun_code);
                if (j == "0")
                  role_dst.push(i.rol_fun_code);
              });
            });
          }
          console.log(role_admin);
          setCookies("role_read", role_read);
          setCookies("role_create", role_create);
          setCookies("role_update", role_update);
          setCookies("role_delete", role_delete);
          setCookies("role_dst", role_dst);
          setCookies("role_nama", role_admin);
          if (data.general_setting) {
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
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-screen-adapt flex flex-col justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Spinner, { color: "teal", className: "h-12 w-12 mx-auto" }) });
  } else
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-screen-adapt lg:!h-screen flex flex-col justify-center items-center text-center w-full p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(InstallPWA$1, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: cashier, alt: "cashier", className: "absolute left-2 mobile:bottom-0 lg:bottom-[5%] w-[85%] " }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Card, { className: "relative content-box lg:mr-[5%] lg:ml-auto mb-[20%] lg:mb-[10%] p-4 mobile:px-0 lg:w-[350px] flex flex-col justify-center items-center gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: kasbon_logo, alt: "logo", className: "w-[150px] lg:w-[250px] mx-auto" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "content w-full p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "input-item mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(UserIcon, { className: "pointer-events-none w-5 h-5 absolute mt-3 ml-3 text-gray-500" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "text",
                id: "input-group-1",
                className: "border pl-10 border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:outline-none focus:bg-light-blue-50",
                onChange: (e) => setUsername(e.target.value),
                value: username
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "input-item mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(KeyIcon$1, { className: "pointer-events-none w-5 h-5 absolute mt-3 ml-3 text-gray-500" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "password",
                id: "input-group-2",
                className: "border pl-10 border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:outline-none focus:bg-light-blue-50",
                onChange: (e) => setPassword(e.target.value),
                onKeyDown: handleLogin,
                value: password
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "action-area", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            react.Button,
            {
              className: "w-full bg-[#5197C8] py-2 px-4 h-[42px] text-sm",
              onClick: () => handleLogin({ key: "Enter" }),
              children: "Login"
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "footer text-center text-sm text-gray-400 py-4", children: [
          "By ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: "ReenDoo" }),
          " ",
          (/* @__PURE__ */ new Date()).getFullYear()
        ] })
      ] })
    ] });
}
export {
  LoginPage as default
};
