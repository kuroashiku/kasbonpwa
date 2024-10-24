import { O as Oe, R as React, r as reactExports } from "./index-CGEICd-f.js";
function _typeof$1(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof$1 = function(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof$1 = function(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof$1(obj);
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties(Constructor, staticProps);
  return Constructor;
}
function _defineProperty$1(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function ownKeys$1(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly)
      symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread2$1(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys$1(Object(source), true).forEach(function(key) {
        _defineProperty$1(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys$1(Object(source)).forEach(function(key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }
  return target;
}
function _unsupportedIterableToArray$1(o, minLen) {
  if (!o)
    return;
  if (typeof o === "string")
    return _arrayLikeToArray$1(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor)
    n = o.constructor.name;
  if (n === "Map" || n === "Set")
    return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray$1(o, minLen);
}
function _arrayLikeToArray$1(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function _createForOfIteratorHelper(o, allowArrayLike) {
  var it;
  if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray$1(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it)
        o = it;
      var i = 0;
      var F = function() {
      };
      return {
        s: F,
        n: function() {
          if (i >= o.length)
            return {
              done: true
            };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function(e) {
          throw e;
        },
        f: F
      };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var normalCompletion = true, didErr = false, err;
  return {
    s: function() {
      it = o[Symbol.iterator]();
    },
    n: function() {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function(e) {
      didErr = true;
      err = e;
    },
    f: function() {
      try {
        if (!normalCompletion && it.return != null)
          it.return();
      } finally {
        if (didErr)
          throw err;
      }
    }
  };
}
var version = "3.0.0";
var errorMessages = {
  MANDATORY_INITIALIZATION_MISSING: {
    message: "Missing urlEndpoint during SDK initialization",
    help: ""
  },
  INVALID_TRANSFORMATION_POSITION: {
    message: "Invalid transformationPosition parameter",
    help: ""
  },
  PRIVATE_KEY_CLIENT_SIDE: {
    message: "privateKey should not be passed on the client side",
    help: ""
  },
  MISSING_UPLOAD_DATA: {
    message: "Missing data for upload",
    help: ""
  },
  MISSING_UPLOAD_FILE_PARAMETER: {
    message: "Missing file parameter for upload",
    help: ""
  },
  MISSING_UPLOAD_FILENAME_PARAMETER: {
    message: "Missing fileName parameter for upload",
    help: ""
  },
  MISSING_AUTHENTICATION_ENDPOINT: {
    message: "Missing authentication endpoint for upload",
    help: ""
  },
  MISSING_PUBLIC_KEY: {
    message: "Missing public key for upload",
    help: ""
  },
  AUTH_ENDPOINT_TIMEOUT: {
    message: "The authenticationEndpoint you provided timed out in 60 seconds",
    help: ""
  },
  AUTH_ENDPOINT_NETWORK_ERROR: {
    message: "Request to authenticationEndpoint failed due to network error",
    help: ""
  },
  AUTH_INVALID_RESPONSE: {
    message: "Invalid response from authenticationEndpoint. The SDK expects a JSON response with three fields i.e. signature, token and expire.",
    help: ""
  },
  UPLOAD_ENDPOINT_NETWORK_ERROR: {
    message: "Request to ImageKit upload endpoint failed due to network error",
    help: ""
  },
  INVALID_UPLOAD_OPTIONS: {
    message: "Invalid uploadOptions parameter",
    help: ""
  },
  MISSING_SIGNATURE: {
    message: "Missing signature for upload. The SDK expects token, sginature and expire for authentication.",
    help: ""
  },
  MISSING_TOKEN: {
    message: "Missing token for upload. The SDK expects token, sginature and expire for authentication.",
    help: ""
  },
  MISSING_EXPIRE: {
    message: "Missing expire for upload. The SDK expects token, sginature and expire for authentication.",
    help: ""
  },
  INVALID_TRANSFORMATION: {
    message: "Invalid transformation parameter. Please include at least pre, post, or both.",
    help: ""
  },
  INVALID_PRE_TRANSFORMATION: {
    message: "Invalid pre transformation parameter.",
    help: ""
  },
  INVALID_POST_TRANSFORMATION: {
    message: "Invalid post transformation parameter.",
    help: ""
  }
};
function respond(isError, response, callback) {
  if (typeof callback == "function") {
    if (isError) {
      callback(response, null);
    } else {
      callback(null, response);
    }
  }
}
function getResponseHeaderMap(xhr) {
  var headers = {};
  var responseHeaders = xhr.getAllResponseHeaders();
  if (Object.keys(responseHeaders).length) {
    responseHeaders.trim().split(/[\r\n]+/).map(function(value) {
      return value.split(/: /);
    }).forEach(function(keyValue) {
      headers[keyValue[0].trim()] = keyValue[1].trim();
    });
  }
  return headers;
}
var addResponseHeadersAndBody = function addResponseHeadersAndBody2(body, xhr) {
  var response = _objectSpread2$1({}, body);
  var responseMetadata = {
    statusCode: xhr.status,
    headers: getResponseHeaderMap(xhr)
  };
  Object.defineProperty(response, "$ResponseMetadata", {
    value: responseMetadata,
    enumerable: false,
    writable: false
  });
  return response;
};
var request = function request2(uploadFileXHR, formData, callback) {
  uploadFile(uploadFileXHR, formData).then(function(result) {
    return respond(false, result, callback);
  }, function(ex) {
    return respond(true, ex, callback);
  });
};
var uploadFile = function uploadFile2(uploadFileXHR, formData) {
  return new Promise(function(resolve, reject) {
    uploadFileXHR.open("POST", "https://upload.imagekit.io/api/v1/files/upload");
    uploadFileXHR.onerror = function(e) {
      return reject(errorMessages.UPLOAD_ENDPOINT_NETWORK_ERROR);
    };
    uploadFileXHR.onload = function() {
      if (uploadFileXHR.status === 200) {
        try {
          var body = JSON.parse(uploadFileXHR.responseText);
          var uploadResponse = addResponseHeadersAndBody(body, uploadFileXHR);
          return resolve(uploadResponse);
        } catch (ex) {
          return reject(ex);
        }
      } else {
        try {
          var body = JSON.parse(uploadFileXHR.responseText);
          var uploadError = addResponseHeadersAndBody(body, uploadFileXHR);
          return reject(uploadError);
        } catch (ex) {
          return reject(ex);
        }
      }
    };
    uploadFileXHR.send(formData);
  });
};
var upload = function upload2(xhr, uploadOptions, options, callback) {
  if (!uploadOptions.file) {
    respond(true, errorMessages.MISSING_UPLOAD_FILE_PARAMETER, callback);
    return;
  }
  if (!uploadOptions.fileName) {
    respond(true, errorMessages.MISSING_UPLOAD_FILENAME_PARAMETER, callback);
    return;
  }
  if (!options.publicKey) {
    respond(true, errorMessages.MISSING_PUBLIC_KEY, callback);
    return;
  }
  if (!uploadOptions.token) {
    respond(true, errorMessages.MISSING_TOKEN, callback);
    return;
  }
  if (!uploadOptions.signature) {
    respond(true, errorMessages.MISSING_SIGNATURE, callback);
    return;
  }
  if (!uploadOptions.expire) {
    respond(true, errorMessages.MISSING_EXPIRE, callback);
    return;
  }
  if (uploadOptions.transformation) {
    if (!(Object.keys(uploadOptions.transformation).includes("pre") || Object.keys(uploadOptions.transformation).includes("post"))) {
      respond(true, errorMessages.INVALID_TRANSFORMATION, callback);
      return;
    }
    if (Object.keys(uploadOptions.transformation).includes("pre") && !uploadOptions.transformation.pre) {
      respond(true, errorMessages.INVALID_PRE_TRANSFORMATION, callback);
      return;
    }
    if (Object.keys(uploadOptions.transformation).includes("post")) {
      if (Array.isArray(uploadOptions.transformation.post)) {
        var _iterator = _createForOfIteratorHelper(uploadOptions.transformation.post), _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done; ) {
            var transformation = _step.value;
            if (transformation.type === "abs" && !(transformation.protocol || transformation.value)) {
              respond(true, errorMessages.INVALID_POST_TRANSFORMATION, callback);
              return;
            } else if (transformation.type === "transformation" && !transformation.value) {
              respond(true, errorMessages.INVALID_POST_TRANSFORMATION, callback);
              return;
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      } else {
        respond(true, errorMessages.INVALID_POST_TRANSFORMATION, callback);
        return;
      }
    }
  }
  var formData = new FormData();
  var key;
  for (key in uploadOptions) {
    if (key) {
      if (key === "file" && typeof uploadOptions.file != "string") {
        formData.append("file", uploadOptions.file, String(uploadOptions.fileName));
      } else if (key === "tags" && Array.isArray(uploadOptions.tags)) {
        formData.append("tags", uploadOptions.tags.join(","));
      } else if (key === "signature") {
        formData.append("signature", uploadOptions.signature);
      } else if (key === "expire") {
        formData.append("expire", String(uploadOptions.expire));
      } else if (key === "token") {
        formData.append("token", uploadOptions.token);
      } else if (key === "responseFields" && Array.isArray(uploadOptions.responseFields)) {
        formData.append("responseFields", uploadOptions.responseFields.join(","));
      } else if (key === "extensions" && Array.isArray(uploadOptions.extensions)) {
        formData.append("extensions", JSON.stringify(uploadOptions.extensions));
      } else if (key === "customMetadata" && _typeof$1(uploadOptions.customMetadata) === "object" && !Array.isArray(uploadOptions.customMetadata) && uploadOptions.customMetadata !== null) {
        formData.append("customMetadata", JSON.stringify(uploadOptions.customMetadata));
      } else if (key === "transformation" && _typeof$1(uploadOptions.transformation) === "object" && uploadOptions.transformation !== null) {
        formData.append(key, JSON.stringify(uploadOptions.transformation));
      } else if (uploadOptions[key] !== void 0) {
        formData.append(key, String(uploadOptions[key]));
      }
    }
  }
  formData.append("publicKey", options.publicKey);
  request(xhr, formData, callback);
};
var supportedTransforms = {
  width: "w",
  height: "h",
  aspectRatio: "ar",
  quality: "q",
  crop: "c",
  cropMode: "cm",
  focus: "fo",
  x: "x",
  y: "y",
  format: "f",
  radius: "r",
  background: "bg",
  border: "b",
  rotation: "rt",
  rotate: "rt",
  blur: "bl",
  named: "n",
  progressive: "pr",
  lossless: "lo",
  trim: "t",
  metadata: "md",
  colorProfile: "cp",
  defaultImage: "di",
  dpr: "dpr",
  effectSharpen: "e-sharpen",
  effectUSM: "e-usm",
  effectContrast: "e-contrast",
  effectGray: "e-grayscale",
  original: "orig",
  effectShadow: "e-shadow",
  effectGradient: "e-gradient",
  raw: "raw"
};
var DEFAULT_TRANSFORMATION_POSITION = "path";
var QUERY_TRANSFORMATION_POSITION = "query";
var VALID_TRANSFORMATION_POSITIONS = [DEFAULT_TRANSFORMATION_POSITION, QUERY_TRANSFORMATION_POSITION];
var CHAIN_TRANSFORM_DELIMITER = ":";
var TRANSFORM_DELIMITER = ",";
var TRANSFORM_KEY_VALUE_DELIMITER = "-";
var transformationUtils = {
  getDefault: function getDefault() {
    return DEFAULT_TRANSFORMATION_POSITION;
  },
  addAsQueryParameter: function addAsQueryParameter(options) {
    return options.transformationPosition === QUERY_TRANSFORMATION_POSITION;
  },
  validParameters: function validParameters(options) {
    if (typeof options.transformationPosition == "undefined")
      return false;
    return VALID_TRANSFORMATION_POSITIONS.indexOf(options.transformationPosition) != -1;
  },
  getTransformKey: function getTransformKey(transform) {
    if (!transform) {
      return "";
    }
    return supportedTransforms[transform] || supportedTransforms[transform.toLowerCase()] || "";
  },
  getChainTransformDelimiter: function getChainTransformDelimiter() {
    return CHAIN_TRANSFORM_DELIMITER;
  },
  getTransformDelimiter: function getTransformDelimiter() {
    return TRANSFORM_DELIMITER;
  },
  getTransformKeyValueDelimiter: function getTransformKeyValueDelimiter() {
    return TRANSFORM_KEY_VALUE_DELIMITER;
  }
};
var TRANSFORMATION_PARAMETER = "tr";
function removeTrailingSlash(str) {
  if (typeof str == "string" && str[str.length - 1] == "/") {
    str = str.substring(0, str.length - 1);
  }
  return str;
}
function removeLeadingSlash(str) {
  if (typeof str == "string" && str[0] == "/") {
    str = str.slice(1);
  }
  return str;
}
function pathJoin(parts, sep) {
  var separator = sep || "/";
  var replace = new RegExp(separator + "{1,}", "g");
  return parts.join(separator).replace(replace, separator);
}
var buildURL = function buildURL2(opts) {
  if (!opts.path && !opts.src) {
    return "";
  }
  var urlObj, isSrcParameterUsedForURL, urlEndpointPattern;
  try {
    if (opts.path) {
      urlEndpointPattern = new URL(opts.urlEndpoint).pathname;
      urlObj = new URL(pathJoin([opts.urlEndpoint.replace(urlEndpointPattern, ""), opts.path]));
    } else {
      urlObj = new URL(opts.src);
      isSrcParameterUsedForURL = true;
    }
  } catch (e) {
    console.error(e);
    return "";
  }
  for (var i in opts.queryParameters) {
    urlObj.searchParams.append(i, String(opts.queryParameters[i]));
  }
  var transformationString = constructTransformationString(opts.transformation);
  if (transformationString && transformationString.length) {
    if (transformationUtils.addAsQueryParameter(opts) || isSrcParameterUsedForURL) {
      urlObj.searchParams.append(TRANSFORMATION_PARAMETER, transformationString);
    } else {
      urlObj.pathname = pathJoin([TRANSFORMATION_PARAMETER + transformationUtils.getChainTransformDelimiter() + transformationString, urlObj.pathname]);
    }
  }
  if (urlEndpointPattern) {
    urlObj.pathname = pathJoin([urlEndpointPattern, urlObj.pathname]);
  } else {
    urlObj.pathname = pathJoin([urlObj.pathname]);
  }
  return urlObj.href;
};
function constructTransformationString(transformation) {
  if (!Array.isArray(transformation)) {
    return "";
  }
  var parsedTransforms = [];
  for (var i = 0, l = transformation.length; i < l; i++) {
    var parsedTransformStep = [];
    for (var key in transformation[i]) {
      if (transformation[i][key] === void 0 || transformation[i][key] === null)
        continue;
      var transformKey = transformationUtils.getTransformKey(key);
      if (!transformKey) {
        transformKey = key;
      }
      if (transformation[i][key] === "-") {
        parsedTransformStep.push(transformKey);
      } else if (key === "raw") {
        parsedTransformStep.push(transformation[i][key]);
      } else {
        var value = transformation[i][key];
        if (transformKey === "di") {
          value = removeTrailingSlash(removeLeadingSlash(value || ""));
          value = value.replace(/\//g, "@@");
        }
        parsedTransformStep.push([transformKey, value].join(transformationUtils.getTransformKeyValueDelimiter()));
      }
    }
    parsedTransforms.push(parsedTransformStep.join(transformationUtils.getTransformDelimiter()));
  }
  return parsedTransforms.join(transformationUtils.getChainTransformDelimiter());
}
var url = function url2(urlOpts, defaultOptions) {
  return buildURL(_objectSpread2$1(_objectSpread2$1({}, defaultOptions), urlOpts));
};
function mandatoryParametersAvailable(options) {
  return options.urlEndpoint;
}
var promisify = function promisify2(thisContext, fn) {
  return function() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    if (args.length === fn.length && typeof args[args.length - 1] !== "undefined") {
      if (typeof args[args.length - 1] !== "function") {
        throw new Error("Callback must be a function.");
      }
      fn.call.apply(fn, [thisContext].concat(args));
    } else {
      return new Promise(function(resolve, reject) {
        var callback = function callback2(err) {
          if (err) {
            return reject(err);
          } else {
            for (var _len2 = arguments.length, results = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
              results[_key2 - 1] = arguments[_key2];
            }
            resolve(results.length > 1 ? results : results[0]);
          }
        };
        args.pop();
        args.push(callback);
        fn.call.apply(fn, [thisContext].concat(args));
      });
    }
  };
};
var ImageKit = function() {
  function ImageKit2(opts) {
    _classCallCheck(this, ImageKit2);
    _defineProperty$1(this, "options", {
      sdkVersion: "javascript-".concat(version),
      publicKey: "",
      urlEndpoint: "",
      transformationPosition: transformationUtils.getDefault()
    });
    this.options = _objectSpread2$1(_objectSpread2$1({}, this.options), opts || {});
    if (!mandatoryParametersAvailable(this.options)) {
      throw errorMessages.MANDATORY_INITIALIZATION_MISSING;
    }
    if (!transformationUtils.validParameters(this.options)) {
      throw errorMessages.INVALID_TRANSFORMATION_POSITION;
    }
  }
  _createClass(ImageKit2, [{
    key: "url",
    value: function url$1(urlOptions) {
      return url(urlOptions, this.options);
    }
  }, {
    key: "upload",
    value: function upload$1(uploadOptions, callbackOrOptions, options) {
      var callback;
      if (typeof callbackOrOptions === "function") {
        callback = callbackOrOptions;
      } else {
        options = callbackOrOptions || {};
      }
      if (!uploadOptions || _typeof$1(uploadOptions) !== "object") {
        return respond(true, errorMessages.INVALID_UPLOAD_OPTIONS, callback);
      }
      var mergedOptions = _objectSpread2$1(_objectSpread2$1({}, this.options), options);
      var _ref = uploadOptions || {}, userProvidedXHR = _ref.xhr;
      delete uploadOptions.xhr;
      var xhr = userProvidedXHR || new XMLHttpRequest();
      return promisify(this, upload)(xhr, uploadOptions, mergedOptions, callback);
    }
  }]);
  return ImageKit2;
}();
function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e, n, i, u, a = [], f = true, o = false;
    try {
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t)
          return;
        f = false;
      } else
        for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = true)
          ;
    } catch (r2) {
      o = true, n = r2;
    } finally {
      try {
        if (!f && null != t.return && (u = t.return(), Object(u) !== u))
          return;
      } finally {
        if (o)
          throw n;
      }
    }
    return a;
  }
}
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread2(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), true).forEach(function(r2) {
      _defineProperty(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _regeneratorRuntime() {
  _regeneratorRuntime = function() {
    return e;
  };
  var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function(t2, e2, r2) {
    t2[e2] = r2.value;
  }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag";
  function define(t2, e2, r2) {
    return Object.defineProperty(t2, e2, {
      value: r2,
      enumerable: true,
      configurable: true,
      writable: true
    }), t2[e2];
  }
  try {
    define({}, "");
  } catch (t2) {
    define = function(t3, e2, r2) {
      return t3[e2] = r2;
    };
  }
  function wrap(t2, e2, r2, n2) {
    var i2 = e2 && e2.prototype instanceof Generator ? e2 : Generator, a2 = Object.create(i2.prototype), c2 = new Context(n2 || []);
    return o(a2, "_invoke", {
      value: makeInvokeMethod(t2, r2, c2)
    }), a2;
  }
  function tryCatch(t2, e2, r2) {
    try {
      return {
        type: "normal",
        arg: t2.call(e2, r2)
      };
    } catch (t3) {
      return {
        type: "throw",
        arg: t3
      };
    }
  }
  e.wrap = wrap;
  var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {};
  function Generator() {
  }
  function GeneratorFunction() {
  }
  function GeneratorFunctionPrototype() {
  }
  var p = {};
  define(p, a, function() {
    return this;
  });
  var d = Object.getPrototypeOf, v = d && d(d(values([])));
  v && v !== r && n.call(v, a) && (p = v);
  var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p);
  function defineIteratorMethods(t2) {
    ["next", "throw", "return"].forEach(function(e2) {
      define(t2, e2, function(t3) {
        return this._invoke(e2, t3);
      });
    });
  }
  function AsyncIterator(t2, e2) {
    function invoke(r3, o2, i2, a2) {
      var c2 = tryCatch(t2[r3], t2, o2);
      if ("throw" !== c2.type) {
        var u2 = c2.arg, h2 = u2.value;
        return h2 && "object" == typeof h2 && n.call(h2, "__await") ? e2.resolve(h2.__await).then(function(t3) {
          invoke("next", t3, i2, a2);
        }, function(t3) {
          invoke("throw", t3, i2, a2);
        }) : e2.resolve(h2).then(function(t3) {
          u2.value = t3, i2(u2);
        }, function(t3) {
          return invoke("throw", t3, i2, a2);
        });
      }
      a2(c2.arg);
    }
    var r2;
    o(this, "_invoke", {
      value: function(t3, n2) {
        function callInvokeWithMethodAndArg() {
          return new e2(function(e3, r3) {
            invoke(t3, n2, e3, r3);
          });
        }
        return r2 = r2 ? r2.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      }
    });
  }
  function makeInvokeMethod(e2, r2, n2) {
    var o2 = h;
    return function(i2, a2) {
      if (o2 === f)
        throw new Error("Generator is already running");
      if (o2 === s) {
        if ("throw" === i2)
          throw a2;
        return {
          value: t,
          done: true
        };
      }
      for (n2.method = i2, n2.arg = a2; ; ) {
        var c2 = n2.delegate;
        if (c2) {
          var u2 = maybeInvokeDelegate(c2, n2);
          if (u2) {
            if (u2 === y)
              continue;
            return u2;
          }
        }
        if ("next" === n2.method)
          n2.sent = n2._sent = n2.arg;
        else if ("throw" === n2.method) {
          if (o2 === h)
            throw o2 = s, n2.arg;
          n2.dispatchException(n2.arg);
        } else
          "return" === n2.method && n2.abrupt("return", n2.arg);
        o2 = f;
        var p2 = tryCatch(e2, r2, n2);
        if ("normal" === p2.type) {
          if (o2 = n2.done ? s : l, p2.arg === y)
            continue;
          return {
            value: p2.arg,
            done: n2.done
          };
        }
        "throw" === p2.type && (o2 = s, n2.method = "throw", n2.arg = p2.arg);
      }
    };
  }
  function maybeInvokeDelegate(e2, r2) {
    var n2 = r2.method, o2 = e2.iterator[n2];
    if (o2 === t)
      return r2.delegate = null, "throw" === n2 && e2.iterator.return && (r2.method = "return", r2.arg = t, maybeInvokeDelegate(e2, r2), "throw" === r2.method) || "return" !== n2 && (r2.method = "throw", r2.arg = new TypeError("The iterator does not provide a '" + n2 + "' method")), y;
    var i2 = tryCatch(o2, e2.iterator, r2.arg);
    if ("throw" === i2.type)
      return r2.method = "throw", r2.arg = i2.arg, r2.delegate = null, y;
    var a2 = i2.arg;
    return a2 ? a2.done ? (r2[e2.resultName] = a2.value, r2.next = e2.nextLoc, "return" !== r2.method && (r2.method = "next", r2.arg = t), r2.delegate = null, y) : a2 : (r2.method = "throw", r2.arg = new TypeError("iterator result is not an object"), r2.delegate = null, y);
  }
  function pushTryEntry(t2) {
    var e2 = {
      tryLoc: t2[0]
    };
    1 in t2 && (e2.catchLoc = t2[1]), 2 in t2 && (e2.finallyLoc = t2[2], e2.afterLoc = t2[3]), this.tryEntries.push(e2);
  }
  function resetTryEntry(t2) {
    var e2 = t2.completion || {};
    e2.type = "normal", delete e2.arg, t2.completion = e2;
  }
  function Context(t2) {
    this.tryEntries = [{
      tryLoc: "root"
    }], t2.forEach(pushTryEntry, this), this.reset(true);
  }
  function values(e2) {
    if (e2 || "" === e2) {
      var r2 = e2[a];
      if (r2)
        return r2.call(e2);
      if ("function" == typeof e2.next)
        return e2;
      if (!isNaN(e2.length)) {
        var o2 = -1, i2 = function next() {
          for (; ++o2 < e2.length; )
            if (n.call(e2, o2))
              return next.value = e2[o2], next.done = false, next;
          return next.value = t, next.done = true, next;
        };
        return i2.next = i2;
      }
    }
    throw new TypeError(typeof e2 + " is not iterable");
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", {
    value: GeneratorFunctionPrototype,
    configurable: true
  }), o(GeneratorFunctionPrototype, "constructor", {
    value: GeneratorFunction,
    configurable: true
  }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function(t2) {
    var e2 = "function" == typeof t2 && t2.constructor;
    return !!e2 && (e2 === GeneratorFunction || "GeneratorFunction" === (e2.displayName || e2.name));
  }, e.mark = function(t2) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(t2, GeneratorFunctionPrototype) : (t2.__proto__ = GeneratorFunctionPrototype, define(t2, u, "GeneratorFunction")), t2.prototype = Object.create(g), t2;
  }, e.awrap = function(t2) {
    return {
      __await: t2
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function() {
    return this;
  }), e.AsyncIterator = AsyncIterator, e.async = function(t2, r2, n2, o2, i2) {
    void 0 === i2 && (i2 = Promise);
    var a2 = new AsyncIterator(wrap(t2, r2, n2, o2), i2);
    return e.isGeneratorFunction(r2) ? a2 : a2.next().then(function(t3) {
      return t3.done ? t3.value : a2.next();
    });
  }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function() {
    return this;
  }), define(g, "toString", function() {
    return "[object Generator]";
  }), e.keys = function(t2) {
    var e2 = Object(t2), r2 = [];
    for (var n2 in e2)
      r2.push(n2);
    return r2.reverse(), function next() {
      for (; r2.length; ) {
        var t3 = r2.pop();
        if (t3 in e2)
          return next.value = t3, next.done = false, next;
      }
      return next.done = true, next;
    };
  }, e.values = values, Context.prototype = {
    constructor: Context,
    reset: function(e2) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = false, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e2)
        for (var r2 in this)
          "t" === r2.charAt(0) && n.call(this, r2) && !isNaN(+r2.slice(1)) && (this[r2] = t);
    },
    stop: function() {
      this.done = true;
      var t2 = this.tryEntries[0].completion;
      if ("throw" === t2.type)
        throw t2.arg;
      return this.rval;
    },
    dispatchException: function(e2) {
      if (this.done)
        throw e2;
      var r2 = this;
      function handle(n2, o3) {
        return a2.type = "throw", a2.arg = e2, r2.next = n2, o3 && (r2.method = "next", r2.arg = t), !!o3;
      }
      for (var o2 = this.tryEntries.length - 1; o2 >= 0; --o2) {
        var i2 = this.tryEntries[o2], a2 = i2.completion;
        if ("root" === i2.tryLoc)
          return handle("end");
        if (i2.tryLoc <= this.prev) {
          var c2 = n.call(i2, "catchLoc"), u2 = n.call(i2, "finallyLoc");
          if (c2 && u2) {
            if (this.prev < i2.catchLoc)
              return handle(i2.catchLoc, true);
            if (this.prev < i2.finallyLoc)
              return handle(i2.finallyLoc);
          } else if (c2) {
            if (this.prev < i2.catchLoc)
              return handle(i2.catchLoc, true);
          } else {
            if (!u2)
              throw new Error("try statement without catch or finally");
            if (this.prev < i2.finallyLoc)
              return handle(i2.finallyLoc);
          }
        }
      }
    },
    abrupt: function(t2, e2) {
      for (var r2 = this.tryEntries.length - 1; r2 >= 0; --r2) {
        var o2 = this.tryEntries[r2];
        if (o2.tryLoc <= this.prev && n.call(o2, "finallyLoc") && this.prev < o2.finallyLoc) {
          var i2 = o2;
          break;
        }
      }
      i2 && ("break" === t2 || "continue" === t2) && i2.tryLoc <= e2 && e2 <= i2.finallyLoc && (i2 = null);
      var a2 = i2 ? i2.completion : {};
      return a2.type = t2, a2.arg = e2, i2 ? (this.method = "next", this.next = i2.finallyLoc, y) : this.complete(a2);
    },
    complete: function(t2, e2) {
      if ("throw" === t2.type)
        throw t2.arg;
      return "break" === t2.type || "continue" === t2.type ? this.next = t2.arg : "return" === t2.type ? (this.rval = this.arg = t2.arg, this.method = "return", this.next = "end") : "normal" === t2.type && e2 && (this.next = e2), y;
    },
    finish: function(t2) {
      for (var e2 = this.tryEntries.length - 1; e2 >= 0; --e2) {
        var r2 = this.tryEntries[e2];
        if (r2.finallyLoc === t2)
          return this.complete(r2.completion, r2.afterLoc), resetTryEntry(r2), y;
      }
    },
    catch: function(t2) {
      for (var e2 = this.tryEntries.length - 1; e2 >= 0; --e2) {
        var r2 = this.tryEntries[e2];
        if (r2.tryLoc === t2) {
          var n2 = r2.completion;
          if ("throw" === n2.type) {
            var o2 = n2.arg;
            resetTryEntry(r2);
          }
          return o2;
        }
      }
      throw new Error("illegal catch attempt");
    },
    delegateYield: function(e2, r2, n2) {
      return this.delegate = {
        iterator: values(e2),
        resultName: r2,
        nextLoc: n2
      }, "next" === this.method && (this.arg = t), y;
    }
  }, e;
}
function _toPrimitive(t, r) {
  if ("object" != typeof t || !t)
    return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != typeof i)
      return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == typeof i ? i : String(i);
}
function _typeof(o) {
  "@babel/helpers - typeof";
  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof(o);
}
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}
function _asyncToGenerator(fn) {
  return function() {
    var self = this, args = arguments;
    return new Promise(function(resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(void 0);
    });
  };
}
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null)
    return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0)
      continue;
    target[key] = source[key];
  }
  return target;
}
function _objectWithoutProperties(source, excluded) {
  if (source == null)
    return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0)
        continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key))
        continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr))
    return _arrayLikeToArray(arr);
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr))
    return arr;
}
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
    return Array.from(iter);
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o)
    return;
  if (typeof o === "string")
    return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor)
    n = o.constructor.name;
  if (n === "Map" || n === "Set")
    return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
var Props$2 = {
  publicKey: Oe.string,
  urlEndpoint: Oe.string,
  authenticator: Oe.func
};
var IKContextProps = _objectSpread2(_objectSpread2({}, Props$2), {}, {
  transformationPosition: Oe.oneOf(["path", "query"])
});
var IKContextExtractedProps = _objectSpread2(_objectSpread2({}, IKContextProps), {}, {
  ikClient: Oe.instanceOf(ImageKit)
});
var ImageKitContext = /* @__PURE__ */ reactExports.createContext({});
var IKContext = function IKContext2(props) {
  var extractContextOptions = function extractContextOptions2(mergedOptions2) {
    var result = {};
    var propKeys = Object.keys(IKContextExtractedProps);
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var value = mergedOptions2[key];
      if (value) {
        result[key] = value;
      }
    }
    return result;
  };
  var mergedOptions = _objectSpread2({}, props);
  var contextOptionsExtracted = extractContextOptions(mergedOptions);
  if (contextOptionsExtracted.urlEndpoint && contextOptionsExtracted.urlEndpoint.trim() !== "") {
    contextOptionsExtracted.ikClient = new ImageKit({
      urlEndpoint: contextOptionsExtracted.urlEndpoint,
      // @ts-ignore
      sdkVersion: ""
    });
  }
  return /* @__PURE__ */ React.createElement(ImageKitContext.Provider, {
    value: contextOptionsExtracted
  }, props.children);
};
var Props$1 = {
  loading: Oe.oneOf(["lazy"]),
  lqip: Oe.shape({
    active: Oe.bool,
    quality: Oe.number,
    threshold: Oe.number,
    blur: Oe.number,
    raw: Oe.string
  }),
  path: Oe.string,
  src: Oe.string,
  queryParameters: Oe.objectOf(Oe.oneOfType([Oe.string, Oe.number]).isRequired),
  transformation: Oe.arrayOf(Oe.object.isRequired),
  transformationPosition: Oe.oneOf(["path", "query"])
};
var COMBINED_IMAGE_PROP_TYPES$1 = _objectSpread2(_objectSpread2({}, Props$2), Props$1);
var fetchEffectiveConnection = function fetchEffectiveConnection2() {
  try {
    return navigator.connection.effectiveType;
  } catch (ex) {
    return "4g";
  }
};
var getSrc = function getSrc2(_ref, ikClient, contextOptions) {
  var urlEndpoint = _ref.urlEndpoint, lqip = _ref.lqip, src = _ref.src, path = _ref.path, transformation = _ref.transformation, transformationPosition = _ref.transformationPosition, queryParameters = _ref.queryParameters;
  var options;
  if (src) {
    options = {
      urlEndpoint: urlEndpoint || contextOptions.urlEndpoint,
      src,
      transformation: transformation || void 0,
      transformationPosition: transformationPosition || contextOptions.transformationPosition || void 0,
      queryParameters: queryParameters || {}
    };
  } else if (path) {
    options = {
      urlEndpoint: urlEndpoint || contextOptions.urlEndpoint,
      path,
      transformation: transformation || void 0,
      transformationPosition: transformationPosition || contextOptions.transformationPosition || void 0,
      queryParameters: queryParameters || {}
    };
  } else
    return {
      originalSrc: ""
    };
  var result = {
    originalSrc: ikClient.url(options)
  };
  if (lqip && lqip.active) {
    var quality = Math.round(lqip.quality || lqip.threshold || 20);
    var blur = Math.round(lqip.blur || 6);
    var newTransformation = options.transformation ? _toConsumableArray(options.transformation) : [];
    if (lqip.raw && typeof lqip.raw === "string" && lqip.raw.trim() !== "") {
      newTransformation.push({
        raw: lqip.raw.trim()
      });
    } else {
      newTransformation.push({
        quality: String(quality),
        blur: String(blur)
      });
    }
    result.lqipSrc = ikClient.url(_objectSpread2(_objectSpread2({}, options), {}, {
      transformation: newTransformation
    }));
  }
  return result;
};
var getIKElementsUrl = function getIKElementsUrl2(_ref2, _ref3) {
  var _ref2$lqip = _ref2.lqip, lqip = _ref2$lqip === void 0 ? null : _ref2$lqip, loading = _ref2.loading;
  var intersected = _ref3.intersected, originalSrcLoaded = _ref3.originalSrcLoaded, originalSrc = _ref3.originalSrc, lqipSrc = _ref3.lqipSrc;
  var isLqipActive = function isLqipActive2(lqip2) {
    return lqip2 && lqip2.active;
  };
  if (loading !== "lazy" && !isLqipActive(lqip)) {
    return originalSrc;
  } else if (loading !== "lazy" && isLqipActive(lqip)) {
    if (originalSrcLoaded) {
      return originalSrc;
    } else {
      return lqipSrc;
    }
  } else if (loading === "lazy" && !isLqipActive(lqip)) {
    if (intersected) {
      return originalSrc;
    } else {
      return "";
    }
  } else {
    if (intersected && originalSrcLoaded) {
      return originalSrc;
    } else {
      return lqipSrc;
    }
  }
};
var useImageKitComponent = function useImageKitComponent2(props) {
  var contextOptions = reactExports.useContext(ImageKitContext);
  var getIKClient = function getIKClient2() {
    if (contextOptions && contextOptions.ikClient) {
      return contextOptions.ikClient;
    }
    var urlEndpoint = props.urlEndpoint;
    urlEndpoint = urlEndpoint || contextOptions && contextOptions.urlEndpoint;
    if (!urlEndpoint || urlEndpoint.trim() === "") {
      throw new Error("Missing urlEndpoint during initialization");
    }
    var ikClient = new ImageKit({
      urlEndpoint,
      // @ts-ignore
      sdkVersion: ""
    });
    return ikClient;
  };
  return {
    getIKClient
  };
};
var _excluded$2 = ["urlEndpoint", "authenticator", "publicKey", "loading", "lqip", "path", "src", "transformation", "transformationPosition", "queryParameters"];
var IKImage = function IKImage2(props) {
  var imageRef = reactExports.useRef(null);
  var _useImageKitComponent = useImageKitComponent(_objectSpread2({}, props)), getIKClient = _useImageKitComponent.getIKClient;
  var contextOptions = reactExports.useContext(ImageKitContext);
  var _useState = reactExports.useState(void 0), _useState2 = _slicedToArray(_useState, 2), currentUrl = _useState2[0], setCurrentUrl = _useState2[1];
  var _useState3 = reactExports.useState(""), _useState4 = _slicedToArray(_useState3, 2), originalSrc = _useState4[0], setOriginalSrc = _useState4[1];
  var _useState5 = reactExports.useState(""), _useState6 = _slicedToArray(_useState5, 2), lqipSrc = _useState6[0], setLqipSrc = _useState6[1];
  var _useState7 = reactExports.useState(false), _useState8 = _slicedToArray(_useState7, 2), originalSrcLoaded = _useState8[0], setOriginalSrcLoaded = _useState8[1];
  var _useState9 = reactExports.useState(void 0), _useState10 = _slicedToArray(_useState9, 2), observe = _useState10[0], setObserve = _useState10[1];
  var _useState11 = reactExports.useState(false), _useState12 = _slicedToArray(_useState11, 2), initialized = _useState12[0], setInitialized = _useState12[1];
  var _useState13 = reactExports.useState(false), _useState14 = _slicedToArray(_useState13, 2), intersected = _useState14[0], setIntersected = _useState14[1];
  reactExports.useEffect(function() {
    var _getSrc = getSrc(props, getIKClient(), contextOptions), newOriginalSrc = _getSrc.originalSrc, newLqipSrc = _getSrc.lqipSrc;
    setOriginalSrc(newOriginalSrc);
    setLqipSrc(newLqipSrc ? newLqipSrc : "");
    setInitialized(true);
  }, [contextOptions, props]);
  var updateImageUrl = /* @__PURE__ */ function() {
    var _ref = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee() {
      var url3;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1)
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return getIKElementsUrl(props, {
                originalSrc,
                lqipSrc,
                intersected,
                contextOptions,
                initialzeState: initialized,
                originalSrcLoaded,
                observe
              });
            case 2:
              url3 = _context.sent;
              if (url3) {
                setCurrentUrl(url3);
              }
            case 4:
            case "end":
              return _context.stop();
          }
      }, _callee);
    }));
    return function updateImageUrl2() {
      return _ref.apply(this, arguments);
    };
  }();
  var triggerOriginalImageLoad = function triggerOriginalImageLoad2() {
    var img = new Image();
    img.onload = function() {
      setOriginalSrcLoaded(true);
    };
    img.src = originalSrc;
  };
  reactExports.useEffect(function() {
    if (originalSrcLoaded)
      updateImageUrl();
  }, [originalSrcLoaded]);
  reactExports.useEffect(function() {
    var image = imageRef.current;
    var loading = props.loading;
    if (initialized) {
      if (window && "IntersectionObserver" in window && loading === "lazy") {
        var connectionType = fetchEffectiveConnection();
        var rootMargin = "1250px";
        if (connectionType !== "4g")
          rootMargin = "2500px";
        var imageObserver = new IntersectionObserver(function(entries) {
          var el = entries[0];
          if (el && el.isIntersecting && !intersected) {
            setIntersected(true);
            setObserve(function(prevObserver) {
              if (prevObserver) {
                prevObserver.disconnect();
              }
              return void 0;
            });
            triggerOriginalImageLoad();
            updateImageUrl();
          }
        }, {
          rootMargin: "".concat(rootMargin, " 0px ").concat(rootMargin, " 0px")
        });
        if (image) {
          imageObserver.observe(image);
          setObserve(imageObserver);
        }
      } else {
        setIntersected(true);
        triggerOriginalImageLoad();
        updateImageUrl();
      }
    }
    return function() {
      if (observe) {
        observe.disconnect();
      }
    };
  }, [props, originalSrc, lqipSrc]);
  props.urlEndpoint;
  props.authenticator;
  props.publicKey;
  props.loading;
  props.lqip;
  props.path;
  props.src;
  props.transformation;
  props.transformationPosition;
  props.queryParameters;
  var restProps = _objectWithoutProperties(props, _excluded$2);
  return /* @__PURE__ */ React.createElement("img", _extends({
    alt: props.alt || "",
    src: currentUrl ? currentUrl : "",
    ref: imageRef
  }, restProps));
};
IKImage.propTypes = COMBINED_IMAGE_PROP_TYPES$1;
var Props = {
  path: Oe.string,
  src: Oe.string,
  queryParameters: Oe.objectOf(Oe.oneOfType([Oe.string, Oe.number]).isRequired),
  transformation: Oe.arrayOf(Oe.object.isRequired),
  transformationPosition: Oe.oneOf(["path", "query"])
};
_objectSpread2(_objectSpread2({}, Props$2), Props);
var _excluded = ["publicKey", "urlEndpoint", "authenticator", "fileName", "useUniqueFileName", "tags", "folder", "isPrivateFile", "customCoordinates", "responseFields", "onError", "onSuccess", "onUploadStart", "onUploadProgress", "validateFile", "webhookUrl", "overwriteFile", "overwriteAITags", "overwriteTags", "overwriteCustomMetadata", "extensions", "customMetadata", "transformation", "overrideParameters"];
var IKUpload = /* @__PURE__ */ reactExports.forwardRef(function(props, ref) {
  var _useState = reactExports.useState({}), _useState2 = _slicedToArray(_useState, 2), state = _useState2[0], setState = _useState2[1];
  var contextOptions = reactExports.useContext(ImageKitContext);
  var _useImageKitComponent = useImageKitComponent(_objectSpread2({}, props)), getIKClient = _useImageKitComponent.getIKClient;
  reactExports.useEffect(function() {
    var abort = function abort2() {
      if (state.xhr) {
        state.xhr.abort();
      }
    };
    if (ref && _typeof(ref) === "object" && ref.hasOwnProperty("current")) {
      var refObject = ref;
      refObject.current.abort = abort;
    }
  }, [state.xhr, ref]);
  props.publicKey;
  props.urlEndpoint;
  props.authenticator;
  var fileName = props.fileName, useUniqueFileName = props.useUniqueFileName, tags = props.tags, folder = props.folder, isPrivateFile = props.isPrivateFile, customCoordinates = props.customCoordinates, responseFields = props.responseFields, onError = props.onError, onSuccess = props.onSuccess;
  props.onUploadStart;
  props.onUploadProgress;
  props.validateFile;
  var webhookUrl = props.webhookUrl, overwriteFile = props.overwriteFile, overwriteAITags = props.overwriteAITags, overwriteTags = props.overwriteTags, overwriteCustomMetadata = props.overwriteCustomMetadata, extensions = props.extensions, customMetadata = props.customMetadata, transformation = props.transformation;
  props.overrideParameters;
  var restProps = _objectWithoutProperties(props, _excluded);
  var uploadFile3 = function uploadFile4(e) {
    var _e$target$files;
    var publicKey = props.publicKey || contextOptions.publicKey;
    var authenticator = props.authenticator || contextOptions.authenticator;
    var urlEndpoint = props.urlEndpoint || contextOptions.urlEndpoint;
    if (!publicKey || publicKey.trim() === "") {
      console.error("Missing publicKey");
      if (onError && typeof onError === "function") {
        onError({
          message: "Missing publicKey"
        });
      }
      return;
    }
    if (!authenticator) {
      console.error("The authenticator function is not provided.");
      if (onError && typeof onError === "function") {
        onError({
          message: "The authenticator function is not provided."
        });
      }
      return;
    }
    if (typeof authenticator !== "function") {
      console.error("The provided authenticator is not a function.");
      if (onError && typeof onError === "function") {
        onError({
          message: "The provided authenticator is not a function."
        });
      }
      return;
    }
    if (!urlEndpoint || urlEndpoint.trim() === "") {
      console.error("Missing urlEndpoint");
      if (onError && typeof onError === "function") {
        onError({
          message: "Missing urlEndpoint"
        });
      }
      return;
    }
    var ikClient = getIKClient();
    var file = (_e$target$files = e.target.files) === null || _e$target$files === void 0 ? void 0 : _e$target$files[0];
    if (!file) {
      return;
    }
    if (props.validateFile && !props.validateFile(file)) {
      return;
    }
    if (props.onUploadStart && typeof props.onUploadStart === "function") {
      props.onUploadStart(e);
    }
    var overrideValues = {};
    if (props.overrideParameters && typeof props.overrideParameters === "function") {
      overrideValues = props.overrideParameters(file) || {};
    }
    var xhr = new XMLHttpRequest();
    var progressCb = function progressCb2(e2) {
      if (props.onUploadProgress && typeof props.onUploadProgress === "function") {
        props.onUploadProgress(e2);
      }
    };
    xhr.upload.addEventListener("progress", progressCb);
    var params = {
      file,
      fileName: overrideValues.fileName || fileName || file.name,
      useUniqueFileName: overrideValues.useUniqueFileName || useUniqueFileName,
      tags: overrideValues.tags || tags,
      folder: overrideValues.folder || folder,
      isPrivateFile: overrideValues.isPrivateFile || isPrivateFile,
      customCoordinates: overrideValues.customCoordinates || customCoordinates,
      responseFields,
      extensions: overrideValues.extensions || extensions,
      webhookUrl: overrideValues.webhookUrl || webhookUrl,
      overwriteFile: overrideValues.overwriteFile || overwriteFile,
      overwriteAITags: overrideValues.overwriteAITags || overwriteAITags,
      overwriteTags: overrideValues.overwriteTags || overwriteTags,
      overwriteCustomMetadata: overrideValues.overwriteCustomMetadata || overwriteCustomMetadata,
      customMetadata: overrideValues.customMetadata || customMetadata,
      signature: "",
      expire: 0,
      token: "",
      xhr,
      transformation: overrideValues.transformation || transformation
    };
    var authPromise = authenticator();
    if (!(authPromise instanceof Promise)) {
      if (onError && typeof onError === "function") {
        onError({
          message: "The authenticator function is expected to return a Promise instance."
        });
      }
      return;
    }
    authPromise.then(function(_ref) {
      var signature = _ref.signature, token = _ref.token, expire = _ref.expire;
      params["signature"] = signature;
      params["expire"] = expire;
      params["token"] = token;
      ikClient.upload(params, function(err, result) {
        if (err) {
          if (onError && typeof onError === "function") {
            console.log(err);
            onError(err);
          }
        } else {
          if (onSuccess && typeof onSuccess === "function") {
            onSuccess(result);
          }
        }
        xhr.upload.removeEventListener("progress", progressCb);
      }, {
        publicKey
      });
      setState({
        xhr
      });
    })["catch"](function(data) {
      var error;
      if (data instanceof Array) {
        error = data[0];
      } else {
        error = data;
      }
      if (onError && typeof onError === "function") {
        onError({
          message: String(error)
        });
      }
      return;
    });
  };
  return /* @__PURE__ */ React.createElement("input", _extends({}, restProps, {
    ref,
    type: "file",
    onChange: function onChange(e) {
      if (props.onChange && typeof props.onChange === "function") {
        props.onChange(e);
      }
      uploadFile3(e);
    }
  }));
});
export {
  IKImage as I,
  IKContext as a,
  IKUpload as b
};
