import { r as reactExports, z as API_HOST, I as IMAGEKIT_URL_ENDPOINT, j as jsxRuntimeExports, a as react, M as IMAGEKIT_PUBLIC_KEY } from "./index-CGEICd-f.js";
import { I as IKImage, a as IKContext, b as IKUpload } from "./imagekitio-react.esm-Dkgu7ZiT.js";
function CameraIcon({
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
    d: "M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
  }), /* @__PURE__ */ reactExports.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
  }));
}
const ForwardRef = reactExports.forwardRef(CameraIcon);
const CameraIcon$1 = ForwardRef;
const imageKitAuth = async () => {
  try {
    const response = await fetch(`${API_HOST}/images/auth`, {
      method: "POST"
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Request failed with status ${response.status}: ${errorText}`);
    }
    const data = await response.json();
    const { signature, expire, token } = data;
    return { signature, expire, token };
  } catch (error) {
    throw new Error(`Authentication request failed: ${error.message}`);
  }
};
const formatImgKitUrl = (filePath) => {
  return `${IMAGEKIT_URL_ENDPOINT}${filePath}`;
};
function ImageUpload({
  image = "",
  fileName = "",
  onSuccess = () => {
  },
  onError = () => {
  },
  onRemove = () => {
  },
  id = "",
  disabled = false,
  widthClass = "w-[calc(100vw-2rem)]"
}) {
  const [loading, setLoading] = reactExports.useState(false);
  const [imageOptions, setImageOptions] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const uploader = document.getElementById(id);
    if (uploader) {
      uploader.addEventListener("change", () => {
        setLoading(true);
      });
    }
  }, [image]);
  const handleClickPlaceholder = () => {
    if (loading || disabled) {
      return;
    }
    const uploader = document.getElementById(id);
    if (uploader) {
      uploader.click();
    }
  };
  const onDone = (result) => {
    setLoading(false);
    setImageOptions(false);
    if (result) {
      onSuccess(result.filePath);
    } else {
      onError();
    }
  };
  const hendleError = (err) => {
    alert(JSON.stringify(err));
    setLoading(false);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "cursor-pointer rounded-lg mx-auto w-fit relative", children: image ? /* @__PURE__ */ jsxRuntimeExports.jsxs(reactExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-72 ${widthClass} lg:w-72 rounded-lg overflow-hidden`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      IKImage,
      {
        urlEndpoint: IMAGEKIT_URL_ENDPOINT,
        path: image,
        transformation: [{
          "height": "400",
          "width": "600"
        }],
        className: "object-cover h-full w-full",
        loading: "lazy"
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute top-2 right-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.IconButton, { variant: "text", className: "rounded-full bg-white bg-opacity-70", onClick: () => setImageOptions(true), children: /* @__PURE__ */ jsxRuntimeExports.jsx(CameraIcon$1, { className: "w-6 h-6 text-gray-800" }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(react.Dialog, { open: imageOptions, handler: () => setImageOptions(false), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "cursor-pointer p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: formatImgKitUrl(image), target: "_blank", rel: "noreferrer", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-b py-2 hover:font-bold", children: "Lihat gambar" }) }),
      disabled ? null : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-2 hover:font-bold", onClick: onRemove, children: "Hapus gambar" })
    ] }) })
  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
    IKContext,
    {
      publicKey: IMAGEKIT_PUBLIC_KEY,
      urlEndpoint: IMAGEKIT_URL_ENDPOINT,
      authenticator: imageKitAuth,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: `cursor-pointer p-1 text-sm rounded-lg h-72 ${widthClass} lg:w-72 border-2 border-dashed border-slate-300 flex flex-col justify-center hover:bg-slate-200`,
          onClick: handleClickPlaceholder,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CameraIcon$1, { className: "w-14 h-14 text-gray-300 mx-auto" }),
            loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center mx-auto", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Mengupload" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Spinner, { className: "h-5 w-5 ml-3", color: "teal" })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-xs", children: "Upload Gambar" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              IKUpload,
              {
                fileName,
                onError: hendleError,
                onSuccess: onDone,
                id,
                className: "hidden"
              }
            )
          ]
        }
      )
    }
  ) });
}
export {
  ImageUpload as I
};
