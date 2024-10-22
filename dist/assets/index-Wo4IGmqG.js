import { r as reactExports, l as reactDomExports, j as jsxRuntimeExports, m as commonjsGlobal, n as getDefaultExportFromCjs, O as Oe$1, a as react, A as AppContext, L as LoadingOverlay } from "./index-CGEICd-f.js";
import { b as getStatistic } from "./Transaction-DU-UTb94.js";
import { g as formatNumber, m as monthConverter, h as formatRupiah } from "./formatter-DQiSfF1K.js";
import { A as AdjustmentsVerticalIcon } from "./AdjustmentsVerticalIcon-DBH-WKzU.js";
import { B as Bars3Icon } from "./Bars3Icon-BPkb_aHs.js";
var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var globals_exports = {};
__export(globals_exports, {
  assign: () => assign,
  colors: () => colors$1,
  createStringInterpolator: () => createStringInterpolator,
  skipAnimation: () => skipAnimation,
  to: () => to$1,
  willAdvance: () => willAdvance
});
var updateQueue = makeQueue();
var raf = (fn2) => schedule(fn2, updateQueue);
var writeQueue = makeQueue();
raf.write = (fn2) => schedule(fn2, writeQueue);
var onStartQueue = makeQueue();
raf.onStart = (fn2) => schedule(fn2, onStartQueue);
var onFrameQueue = makeQueue();
raf.onFrame = (fn2) => schedule(fn2, onFrameQueue);
var onFinishQueue = makeQueue();
raf.onFinish = (fn2) => schedule(fn2, onFinishQueue);
var timeouts = [];
raf.setTimeout = (handler, ms) => {
  const time2 = raf.now() + ms;
  const cancel = () => {
    const i2 = timeouts.findIndex((t2) => t2.cancel == cancel);
    if (~i2)
      timeouts.splice(i2, 1);
    pendingCount -= ~i2 ? 1 : 0;
  };
  const timeout = { time: time2, handler, cancel };
  timeouts.splice(findTimeout(time2), 0, timeout);
  pendingCount += 1;
  start();
  return timeout;
};
var findTimeout = (time2) => ~(~timeouts.findIndex((t2) => t2.time > time2) || ~timeouts.length);
raf.cancel = (fn2) => {
  onStartQueue.delete(fn2);
  onFrameQueue.delete(fn2);
  onFinishQueue.delete(fn2);
  updateQueue.delete(fn2);
  writeQueue.delete(fn2);
};
raf.sync = (fn2) => {
  sync = true;
  raf.batchedUpdates(fn2);
  sync = false;
};
raf.throttle = (fn2) => {
  let lastArgs;
  function queuedFn() {
    try {
      fn2(...lastArgs);
    } finally {
      lastArgs = null;
    }
  }
  function throttled(...args) {
    lastArgs = args;
    raf.onStart(queuedFn);
  }
  throttled.handler = fn2;
  throttled.cancel = () => {
    onStartQueue.delete(queuedFn);
    lastArgs = null;
  };
  return throttled;
};
var nativeRaf = typeof window != "undefined" ? window.requestAnimationFrame : (
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  () => {
  }
);
raf.use = (impl) => nativeRaf = impl;
raf.now = typeof performance != "undefined" ? () => performance.now() : Date.now;
raf.batchedUpdates = (fn2) => fn2();
raf.catch = console.error;
raf.frameLoop = "always";
raf.advance = () => {
  if (raf.frameLoop !== "demand") {
    console.warn(
      "Cannot call the manual advancement of rafz whilst frameLoop is not set as demand"
    );
  } else {
    update();
  }
};
var ts = -1;
var pendingCount = 0;
var sync = false;
function schedule(fn2, queue) {
  if (sync) {
    queue.delete(fn2);
    fn2(0);
  } else {
    queue.add(fn2);
    start();
  }
}
function start() {
  if (ts < 0) {
    ts = 0;
    if (raf.frameLoop !== "demand") {
      nativeRaf(loop);
    }
  }
}
function stop() {
  ts = -1;
}
function loop() {
  if (~ts) {
    nativeRaf(loop);
    raf.batchedUpdates(update);
  }
}
function update() {
  const prevTs = ts;
  ts = raf.now();
  const count = findTimeout(ts);
  if (count) {
    eachSafely(timeouts.splice(0, count), (t2) => t2.handler());
    pendingCount -= count;
  }
  if (!pendingCount) {
    stop();
    return;
  }
  onStartQueue.flush();
  updateQueue.flush(prevTs ? Math.min(64, ts - prevTs) : 16.667);
  onFrameQueue.flush();
  writeQueue.flush();
  onFinishQueue.flush();
}
function makeQueue() {
  let next = /* @__PURE__ */ new Set();
  let current = next;
  return {
    add(fn2) {
      pendingCount += current == next && !next.has(fn2) ? 1 : 0;
      next.add(fn2);
    },
    delete(fn2) {
      pendingCount -= current == next && next.has(fn2) ? 1 : 0;
      return next.delete(fn2);
    },
    flush(arg) {
      if (current.size) {
        next = /* @__PURE__ */ new Set();
        pendingCount -= current.size;
        eachSafely(current, (fn2) => fn2(arg) && next.add(fn2));
        pendingCount += next.size;
        current = next;
      }
    }
  };
}
function eachSafely(values, each2) {
  values.forEach((value) => {
    try {
      each2(value);
    } catch (e4) {
      raf.catch(e4);
    }
  });
}
function noop$3() {
}
var defineHidden = (obj, key, value) => Object.defineProperty(obj, key, { value, writable: true, configurable: true });
var is = {
  arr: Array.isArray,
  obj: (a2) => !!a2 && a2.constructor.name === "Object",
  fun: (a2) => typeof a2 === "function",
  str: (a2) => typeof a2 === "string",
  num: (a2) => typeof a2 === "number",
  und: (a2) => a2 === void 0
};
function isEqual$1(a2, b2) {
  if (is.arr(a2)) {
    if (!is.arr(b2) || a2.length !== b2.length)
      return false;
    for (let i2 = 0; i2 < a2.length; i2++) {
      if (a2[i2] !== b2[i2])
        return false;
    }
    return true;
  }
  return a2 === b2;
}
var each = (obj, fn2) => obj.forEach(fn2);
function eachProp(obj, fn2, ctx2) {
  if (is.arr(obj)) {
    for (let i2 = 0; i2 < obj.length; i2++) {
      fn2.call(ctx2, obj[i2], `${i2}`);
    }
    return;
  }
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      fn2.call(ctx2, obj[key], key);
    }
  }
}
var toArray = (a2) => is.und(a2) ? [] : is.arr(a2) ? a2 : [a2];
function flush(queue, iterator) {
  if (queue.size) {
    const items = Array.from(queue);
    queue.clear();
    each(items, iterator);
  }
}
var flushCalls = (queue, ...args) => flush(queue, (fn2) => fn2(...args));
var isSSR = () => typeof window === "undefined" || !window.navigator || /ServerSideRendering|^Deno\//.test(window.navigator.userAgent);
var createStringInterpolator;
var to$1;
var colors$1 = null;
var skipAnimation = false;
var willAdvance = noop$3;
var assign = (globals) => {
  if (globals.to)
    to$1 = globals.to;
  if (globals.now)
    raf.now = globals.now;
  if (globals.colors !== void 0)
    colors$1 = globals.colors;
  if (globals.skipAnimation != null)
    skipAnimation = globals.skipAnimation;
  if (globals.createStringInterpolator)
    createStringInterpolator = globals.createStringInterpolator;
  if (globals.requestAnimationFrame)
    raf.use(globals.requestAnimationFrame);
  if (globals.batchedUpdates)
    raf.batchedUpdates = globals.batchedUpdates;
  if (globals.willAdvance)
    willAdvance = globals.willAdvance;
  if (globals.frameLoop)
    raf.frameLoop = globals.frameLoop;
};
var startQueue = /* @__PURE__ */ new Set();
var currentFrame = [];
var prevFrame = [];
var priority = 0;
var frameLoop = {
  get idle() {
    return !startQueue.size && !currentFrame.length;
  },
  /** Advance the given animation on every frame until idle. */
  start(animation) {
    if (priority > animation.priority) {
      startQueue.add(animation);
      raf.onStart(flushStartQueue);
    } else {
      startSafely(animation);
      raf(advance);
    }
  },
  /** Advance all animations by the given time. */
  advance,
  /** Call this when an animation's priority changes. */
  sort(animation) {
    if (priority) {
      raf.onFrame(() => frameLoop.sort(animation));
    } else {
      const prevIndex = currentFrame.indexOf(animation);
      if (~prevIndex) {
        currentFrame.splice(prevIndex, 1);
        startUnsafely(animation);
      }
    }
  },
  /**
   * Clear all animations. For testing purposes.
   *
   * ☠️ Never call this from within the frameloop.
   */
  clear() {
    currentFrame = [];
    startQueue.clear();
  }
};
function flushStartQueue() {
  startQueue.forEach(startSafely);
  startQueue.clear();
  raf(advance);
}
function startSafely(animation) {
  if (!currentFrame.includes(animation))
    startUnsafely(animation);
}
function startUnsafely(animation) {
  currentFrame.splice(
    findIndex(currentFrame, (other) => other.priority > animation.priority),
    0,
    animation
  );
}
function advance(dt) {
  const nextFrame = prevFrame;
  for (let i2 = 0; i2 < currentFrame.length; i2++) {
    const animation = currentFrame[i2];
    priority = animation.priority;
    if (!animation.idle) {
      willAdvance(animation);
      animation.advance(dt);
      if (!animation.idle) {
        nextFrame.push(animation);
      }
    }
  }
  priority = 0;
  prevFrame = currentFrame;
  prevFrame.length = 0;
  currentFrame = nextFrame;
  return currentFrame.length > 0;
}
function findIndex(arr, test) {
  const index = arr.findIndex(test);
  return index < 0 ? arr.length : index;
}
var clamp = (min, max, v2) => Math.min(Math.max(v2, min), max);
var colors2 = {
  transparent: 0,
  aliceblue: 4042850303,
  antiquewhite: 4209760255,
  aqua: 16777215,
  aquamarine: 2147472639,
  azure: 4043309055,
  beige: 4126530815,
  bisque: 4293182719,
  black: 255,
  blanchedalmond: 4293643775,
  blue: 65535,
  blueviolet: 2318131967,
  brown: 2771004159,
  burlywood: 3736635391,
  burntsienna: 3934150143,
  cadetblue: 1604231423,
  chartreuse: 2147418367,
  chocolate: 3530104575,
  coral: 4286533887,
  cornflowerblue: 1687547391,
  cornsilk: 4294499583,
  crimson: 3692313855,
  cyan: 16777215,
  darkblue: 35839,
  darkcyan: 9145343,
  darkgoldenrod: 3095792639,
  darkgray: 2846468607,
  darkgreen: 6553855,
  darkgrey: 2846468607,
  darkkhaki: 3182914559,
  darkmagenta: 2332068863,
  darkolivegreen: 1433087999,
  darkorange: 4287365375,
  darkorchid: 2570243327,
  darkred: 2332033279,
  darksalmon: 3918953215,
  darkseagreen: 2411499519,
  darkslateblue: 1211993087,
  darkslategray: 793726975,
  darkslategrey: 793726975,
  darkturquoise: 13554175,
  darkviolet: 2483082239,
  deeppink: 4279538687,
  deepskyblue: 12582911,
  dimgray: 1768516095,
  dimgrey: 1768516095,
  dodgerblue: 512819199,
  firebrick: 2988581631,
  floralwhite: 4294635775,
  forestgreen: 579543807,
  fuchsia: 4278255615,
  gainsboro: 3705462015,
  ghostwhite: 4177068031,
  gold: 4292280575,
  goldenrod: 3668254975,
  gray: 2155905279,
  green: 8388863,
  greenyellow: 2919182335,
  grey: 2155905279,
  honeydew: 4043305215,
  hotpink: 4285117695,
  indianred: 3445382399,
  indigo: 1258324735,
  ivory: 4294963455,
  khaki: 4041641215,
  lavender: 3873897215,
  lavenderblush: 4293981695,
  lawngreen: 2096890111,
  lemonchiffon: 4294626815,
  lightblue: 2916673279,
  lightcoral: 4034953471,
  lightcyan: 3774873599,
  lightgoldenrodyellow: 4210742015,
  lightgray: 3553874943,
  lightgreen: 2431553791,
  lightgrey: 3553874943,
  lightpink: 4290167295,
  lightsalmon: 4288707327,
  lightseagreen: 548580095,
  lightskyblue: 2278488831,
  lightslategray: 2005441023,
  lightslategrey: 2005441023,
  lightsteelblue: 2965692159,
  lightyellow: 4294959359,
  lime: 16711935,
  limegreen: 852308735,
  linen: 4210091775,
  magenta: 4278255615,
  maroon: 2147483903,
  mediumaquamarine: 1724754687,
  mediumblue: 52735,
  mediumorchid: 3126187007,
  mediumpurple: 2473647103,
  mediumseagreen: 1018393087,
  mediumslateblue: 2070474495,
  mediumspringgreen: 16423679,
  mediumturquoise: 1221709055,
  mediumvioletred: 3340076543,
  midnightblue: 421097727,
  mintcream: 4127193855,
  mistyrose: 4293190143,
  moccasin: 4293178879,
  navajowhite: 4292783615,
  navy: 33023,
  oldlace: 4260751103,
  olive: 2155872511,
  olivedrab: 1804477439,
  orange: 4289003775,
  orangered: 4282712319,
  orchid: 3664828159,
  palegoldenrod: 4008225535,
  palegreen: 2566625535,
  paleturquoise: 2951671551,
  palevioletred: 3681588223,
  papayawhip: 4293907967,
  peachpuff: 4292524543,
  peru: 3448061951,
  pink: 4290825215,
  plum: 3718307327,
  powderblue: 2967529215,
  purple: 2147516671,
  rebeccapurple: 1714657791,
  red: 4278190335,
  rosybrown: 3163525119,
  royalblue: 1097458175,
  saddlebrown: 2336560127,
  salmon: 4202722047,
  sandybrown: 4104413439,
  seagreen: 780883967,
  seashell: 4294307583,
  sienna: 2689740287,
  silver: 3233857791,
  skyblue: 2278484991,
  slateblue: 1784335871,
  slategray: 1887473919,
  slategrey: 1887473919,
  snow: 4294638335,
  springgreen: 16744447,
  steelblue: 1182971135,
  tan: 3535047935,
  teal: 8421631,
  thistle: 3636451583,
  tomato: 4284696575,
  turquoise: 1088475391,
  violet: 4001558271,
  wheat: 4125012991,
  white: 4294967295,
  whitesmoke: 4126537215,
  yellow: 4294902015,
  yellowgreen: 2597139199
};
var NUMBER = "[-+]?\\d*\\.?\\d+";
var PERCENTAGE = NUMBER + "%";
function call(...parts) {
  return "\\(\\s*(" + parts.join(")\\s*,\\s*(") + ")\\s*\\)";
}
var rgb$2 = new RegExp("rgb" + call(NUMBER, NUMBER, NUMBER));
var rgba$1 = new RegExp("rgba" + call(NUMBER, NUMBER, NUMBER, NUMBER));
var hsl$1 = new RegExp("hsl" + call(NUMBER, PERCENTAGE, PERCENTAGE));
var hsla$1 = new RegExp(
  "hsla" + call(NUMBER, PERCENTAGE, PERCENTAGE, NUMBER)
);
var hex3 = /^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/;
var hex4 = /^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/;
var hex6 = /^#([0-9a-fA-F]{6})$/;
var hex8 = /^#([0-9a-fA-F]{8})$/;
function normalizeColor(color2) {
  let match;
  if (typeof color2 === "number") {
    return color2 >>> 0 === color2 && color2 >= 0 && color2 <= 4294967295 ? color2 : null;
  }
  if (match = hex6.exec(color2))
    return parseInt(match[1] + "ff", 16) >>> 0;
  if (colors$1 && colors$1[color2] !== void 0) {
    return colors$1[color2];
  }
  if (match = rgb$2.exec(color2)) {
    return (parse255(match[1]) << 24 | // r
    parse255(match[2]) << 16 | // g
    parse255(match[3]) << 8 | // b
    255) >>> // a
    0;
  }
  if (match = rgba$1.exec(color2)) {
    return (parse255(match[1]) << 24 | // r
    parse255(match[2]) << 16 | // g
    parse255(match[3]) << 8 | // b
    parse1(match[4])) >>> // a
    0;
  }
  if (match = hex3.exec(color2)) {
    return parseInt(
      match[1] + match[1] + // r
      match[2] + match[2] + // g
      match[3] + match[3] + // b
      "ff",
      // a
      16
    ) >>> 0;
  }
  if (match = hex8.exec(color2))
    return parseInt(match[1], 16) >>> 0;
  if (match = hex4.exec(color2)) {
    return parseInt(
      match[1] + match[1] + // r
      match[2] + match[2] + // g
      match[3] + match[3] + // b
      match[4] + match[4],
      // a
      16
    ) >>> 0;
  }
  if (match = hsl$1.exec(color2)) {
    return (hslToRgb(
      parse360(match[1]),
      // h
      parsePercentage(match[2]),
      // s
      parsePercentage(match[3])
      // l
    ) | 255) >>> // a
    0;
  }
  if (match = hsla$1.exec(color2)) {
    return (hslToRgb(
      parse360(match[1]),
      // h
      parsePercentage(match[2]),
      // s
      parsePercentage(match[3])
      // l
    ) | parse1(match[4])) >>> // a
    0;
  }
  return null;
}
function hue2rgb(p2, q2, t2) {
  if (t2 < 0)
    t2 += 1;
  if (t2 > 1)
    t2 -= 1;
  if (t2 < 1 / 6)
    return p2 + (q2 - p2) * 6 * t2;
  if (t2 < 1 / 2)
    return q2;
  if (t2 < 2 / 3)
    return p2 + (q2 - p2) * (2 / 3 - t2) * 6;
  return p2;
}
function hslToRgb(h, s, l2) {
  const q2 = l2 < 0.5 ? l2 * (1 + s) : l2 + s - l2 * s;
  const p2 = 2 * l2 - q2;
  const r2 = hue2rgb(p2, q2, h + 1 / 3);
  const g2 = hue2rgb(p2, q2, h);
  const b2 = hue2rgb(p2, q2, h - 1 / 3);
  return Math.round(r2 * 255) << 24 | Math.round(g2 * 255) << 16 | Math.round(b2 * 255) << 8;
}
function parse255(str) {
  const int = parseInt(str, 10);
  if (int < 0)
    return 0;
  if (int > 255)
    return 255;
  return int;
}
function parse360(str) {
  const int = parseFloat(str);
  return (int % 360 + 360) % 360 / 360;
}
function parse1(str) {
  const num = parseFloat(str);
  if (num < 0)
    return 0;
  if (num > 1)
    return 255;
  return Math.round(num * 255);
}
function parsePercentage(str) {
  const int = parseFloat(str);
  if (int < 0)
    return 0;
  if (int > 100)
    return 1;
  return int / 100;
}
function colorToRgba(input) {
  let int32Color = normalizeColor(input);
  if (int32Color === null)
    return input;
  int32Color = int32Color || 0;
  const r2 = (int32Color & 4278190080) >>> 24;
  const g2 = (int32Color & 16711680) >>> 16;
  const b2 = (int32Color & 65280) >>> 8;
  const a2 = (int32Color & 255) / 255;
  return `rgba(${r2}, ${g2}, ${b2}, ${a2})`;
}
var createInterpolator = (range2, output, extrapolate) => {
  if (is.fun(range2)) {
    return range2;
  }
  if (is.arr(range2)) {
    return createInterpolator({
      range: range2,
      output,
      extrapolate
    });
  }
  if (is.str(range2.output[0])) {
    return createStringInterpolator(range2);
  }
  const config2 = range2;
  const outputRange = config2.output;
  const inputRange = config2.range || [0, 1];
  const extrapolateLeft = config2.extrapolateLeft || config2.extrapolate || "extend";
  const extrapolateRight = config2.extrapolateRight || config2.extrapolate || "extend";
  const easing = config2.easing || ((t2) => t2);
  return (input) => {
    const range22 = findRange(input, inputRange);
    return interpolate$1(
      input,
      inputRange[range22],
      inputRange[range22 + 1],
      outputRange[range22],
      outputRange[range22 + 1],
      easing,
      extrapolateLeft,
      extrapolateRight,
      config2.map
    );
  };
};
function interpolate$1(input, inputMin, inputMax, outputMin, outputMax, easing, extrapolateLeft, extrapolateRight, map2) {
  let result = map2 ? map2(input) : input;
  if (result < inputMin) {
    if (extrapolateLeft === "identity")
      return result;
    else if (extrapolateLeft === "clamp")
      result = inputMin;
  }
  if (result > inputMax) {
    if (extrapolateRight === "identity")
      return result;
    else if (extrapolateRight === "clamp")
      result = inputMax;
  }
  if (outputMin === outputMax)
    return outputMin;
  if (inputMin === inputMax)
    return input <= inputMin ? outputMin : outputMax;
  if (inputMin === -Infinity)
    result = -result;
  else if (inputMax === Infinity)
    result = result - inputMin;
  else
    result = (result - inputMin) / (inputMax - inputMin);
  result = easing(result);
  if (outputMin === -Infinity)
    result = -result;
  else if (outputMax === Infinity)
    result = result + outputMin;
  else
    result = result * (outputMax - outputMin) + outputMin;
  return result;
}
function findRange(input, inputRange) {
  for (var i2 = 1; i2 < inputRange.length - 1; ++i2)
    if (inputRange[i2] >= input)
      break;
  return i2 - 1;
}
var steps = (steps2, direction = "end") => (progress2) => {
  progress2 = direction === "end" ? Math.min(progress2, 0.999) : Math.max(progress2, 1e-3);
  const expanded = progress2 * steps2;
  const rounded = direction === "end" ? Math.floor(expanded) : Math.ceil(expanded);
  return clamp(0, 1, rounded / steps2);
};
var c1 = 1.70158;
var c2 = c1 * 1.525;
var c3 = c1 + 1;
var c4 = 2 * Math.PI / 3;
var c5 = 2 * Math.PI / 4.5;
var bounceOut = (x2) => {
  const n1 = 7.5625;
  const d1 = 2.75;
  if (x2 < 1 / d1) {
    return n1 * x2 * x2;
  } else if (x2 < 2 / d1) {
    return n1 * (x2 -= 1.5 / d1) * x2 + 0.75;
  } else if (x2 < 2.5 / d1) {
    return n1 * (x2 -= 2.25 / d1) * x2 + 0.9375;
  } else {
    return n1 * (x2 -= 2.625 / d1) * x2 + 0.984375;
  }
};
var easings = {
  linear: (x2) => x2,
  easeInQuad: (x2) => x2 * x2,
  easeOutQuad: (x2) => 1 - (1 - x2) * (1 - x2),
  easeInOutQuad: (x2) => x2 < 0.5 ? 2 * x2 * x2 : 1 - Math.pow(-2 * x2 + 2, 2) / 2,
  easeInCubic: (x2) => x2 * x2 * x2,
  easeOutCubic: (x2) => 1 - Math.pow(1 - x2, 3),
  easeInOutCubic: (x2) => x2 < 0.5 ? 4 * x2 * x2 * x2 : 1 - Math.pow(-2 * x2 + 2, 3) / 2,
  easeInQuart: (x2) => x2 * x2 * x2 * x2,
  easeOutQuart: (x2) => 1 - Math.pow(1 - x2, 4),
  easeInOutQuart: (x2) => x2 < 0.5 ? 8 * x2 * x2 * x2 * x2 : 1 - Math.pow(-2 * x2 + 2, 4) / 2,
  easeInQuint: (x2) => x2 * x2 * x2 * x2 * x2,
  easeOutQuint: (x2) => 1 - Math.pow(1 - x2, 5),
  easeInOutQuint: (x2) => x2 < 0.5 ? 16 * x2 * x2 * x2 * x2 * x2 : 1 - Math.pow(-2 * x2 + 2, 5) / 2,
  easeInSine: (x2) => 1 - Math.cos(x2 * Math.PI / 2),
  easeOutSine: (x2) => Math.sin(x2 * Math.PI / 2),
  easeInOutSine: (x2) => -(Math.cos(Math.PI * x2) - 1) / 2,
  easeInExpo: (x2) => x2 === 0 ? 0 : Math.pow(2, 10 * x2 - 10),
  easeOutExpo: (x2) => x2 === 1 ? 1 : 1 - Math.pow(2, -10 * x2),
  easeInOutExpo: (x2) => x2 === 0 ? 0 : x2 === 1 ? 1 : x2 < 0.5 ? Math.pow(2, 20 * x2 - 10) / 2 : (2 - Math.pow(2, -20 * x2 + 10)) / 2,
  easeInCirc: (x2) => 1 - Math.sqrt(1 - Math.pow(x2, 2)),
  easeOutCirc: (x2) => Math.sqrt(1 - Math.pow(x2 - 1, 2)),
  easeInOutCirc: (x2) => x2 < 0.5 ? (1 - Math.sqrt(1 - Math.pow(2 * x2, 2))) / 2 : (Math.sqrt(1 - Math.pow(-2 * x2 + 2, 2)) + 1) / 2,
  easeInBack: (x2) => c3 * x2 * x2 * x2 - c1 * x2 * x2,
  easeOutBack: (x2) => 1 + c3 * Math.pow(x2 - 1, 3) + c1 * Math.pow(x2 - 1, 2),
  easeInOutBack: (x2) => x2 < 0.5 ? Math.pow(2 * x2, 2) * ((c2 + 1) * 2 * x2 - c2) / 2 : (Math.pow(2 * x2 - 2, 2) * ((c2 + 1) * (x2 * 2 - 2) + c2) + 2) / 2,
  easeInElastic: (x2) => x2 === 0 ? 0 : x2 === 1 ? 1 : -Math.pow(2, 10 * x2 - 10) * Math.sin((x2 * 10 - 10.75) * c4),
  easeOutElastic: (x2) => x2 === 0 ? 0 : x2 === 1 ? 1 : Math.pow(2, -10 * x2) * Math.sin((x2 * 10 - 0.75) * c4) + 1,
  easeInOutElastic: (x2) => x2 === 0 ? 0 : x2 === 1 ? 1 : x2 < 0.5 ? -(Math.pow(2, 20 * x2 - 10) * Math.sin((20 * x2 - 11.125) * c5)) / 2 : Math.pow(2, -20 * x2 + 10) * Math.sin((20 * x2 - 11.125) * c5) / 2 + 1,
  easeInBounce: (x2) => 1 - bounceOut(1 - x2),
  easeOutBounce: bounceOut,
  easeInOutBounce: (x2) => x2 < 0.5 ? (1 - bounceOut(1 - 2 * x2)) / 2 : (1 + bounceOut(2 * x2 - 1)) / 2,
  steps
};
var $get = Symbol.for("FluidValue.get");
var $observers = Symbol.for("FluidValue.observers");
var hasFluidValue = (arg) => Boolean(arg && arg[$get]);
var getFluidValue = (arg) => arg && arg[$get] ? arg[$get]() : arg;
var getFluidObservers = (target) => target[$observers] || null;
function callFluidObserver(observer2, event) {
  if (observer2.eventObserved) {
    observer2.eventObserved(event);
  } else {
    observer2(event);
  }
}
function callFluidObservers(target, event) {
  const observers = target[$observers];
  if (observers) {
    observers.forEach((observer2) => {
      callFluidObserver(observer2, event);
    });
  }
}
var FluidValue = class {
  constructor(get2) {
    if (!get2 && !(get2 = this.get)) {
      throw Error("Unknown getter");
    }
    setFluidGetter(this, get2);
  }
};
var setFluidGetter = (target, get2) => setHidden(target, $get, get2);
function addFluidObserver(target, observer2) {
  if (target[$get]) {
    let observers = target[$observers];
    if (!observers) {
      setHidden(target, $observers, observers = /* @__PURE__ */ new Set());
    }
    if (!observers.has(observer2)) {
      observers.add(observer2);
      if (target.observerAdded) {
        target.observerAdded(observers.size, observer2);
      }
    }
  }
  return observer2;
}
function removeFluidObserver(target, observer2) {
  const observers = target[$observers];
  if (observers && observers.has(observer2)) {
    const count = observers.size - 1;
    if (count) {
      observers.delete(observer2);
    } else {
      target[$observers] = null;
    }
    if (target.observerRemoved) {
      target.observerRemoved(count, observer2);
    }
  }
}
var setHidden = (target, key, value) => Object.defineProperty(target, key, {
  value,
  writable: true,
  configurable: true
});
var numberRegex = /[+\-]?(?:0|[1-9]\d*)(?:\.\d*)?(?:[eE][+\-]?\d+)?/g;
var colorRegex = /(#(?:[0-9a-f]{2}){2,4}|(#[0-9a-f]{3})|(rgb|hsl)a?\((-?\d+%?[,\s]+){2,3}\s*[\d\.]+%?\))/gi;
var unitRegex = new RegExp(`(${numberRegex.source})(%|[a-z]+)`, "i");
var rgbaRegex = /rgba\(([0-9\.-]+), ([0-9\.-]+), ([0-9\.-]+), ([0-9\.-]+)\)/gi;
var cssVariableRegex = /var\((--[a-zA-Z0-9-_]+),? ?([a-zA-Z0-9 ()%#.,-]+)?\)/;
var variableToRgba = (input) => {
  const [token, fallback] = parseCSSVariable(input);
  if (!token || isSSR()) {
    return input;
  }
  const value = window.getComputedStyle(document.documentElement).getPropertyValue(token);
  if (value) {
    return value.trim();
  } else if (fallback && fallback.startsWith("--")) {
    const value2 = window.getComputedStyle(document.documentElement).getPropertyValue(fallback);
    if (value2) {
      return value2;
    } else {
      return input;
    }
  } else if (fallback && cssVariableRegex.test(fallback)) {
    return variableToRgba(fallback);
  } else if (fallback) {
    return fallback;
  }
  return input;
};
var parseCSSVariable = (current) => {
  const match = cssVariableRegex.exec(current);
  if (!match)
    return [,];
  const [, token, fallback] = match;
  return [token, fallback];
};
var namedColorRegex;
var rgbaRound = (_2, p1, p2, p3, p4) => `rgba(${Math.round(p1)}, ${Math.round(p2)}, ${Math.round(p3)}, ${p4})`;
var createStringInterpolator2 = (config2) => {
  if (!namedColorRegex)
    namedColorRegex = colors$1 ? (
      // match color names, ignore partial matches
      new RegExp(`(${Object.keys(colors$1).join("|")})(?!\\w)`, "g")
    ) : (
      // never match
      /^\b$/
    );
  const output = config2.output.map((value) => {
    return getFluidValue(value).replace(cssVariableRegex, variableToRgba).replace(colorRegex, colorToRgba).replace(namedColorRegex, colorToRgba);
  });
  const keyframes = output.map((value) => value.match(numberRegex).map(Number));
  const outputRanges = keyframes[0].map(
    (_2, i2) => keyframes.map((values) => {
      if (!(i2 in values)) {
        throw Error('The arity of each "output" value must be equal');
      }
      return values[i2];
    })
  );
  const interpolators = outputRanges.map(
    (output2) => createInterpolator({ ...config2, output: output2 })
  );
  return (input) => {
    var _a;
    const missingUnit = !unitRegex.test(output[0]) && ((_a = output.find((value) => unitRegex.test(value))) == null ? void 0 : _a.replace(numberRegex, ""));
    let i2 = 0;
    return output[0].replace(
      numberRegex,
      () => `${interpolators[i2++](input)}${missingUnit || ""}`
    ).replace(rgbaRegex, rgbaRound);
  };
};
var prefix = "react-spring: ";
var once = (fn2) => {
  const func = fn2;
  let called = false;
  if (typeof func != "function") {
    throw new TypeError(`${prefix}once requires a function parameter`);
  }
  return (...args) => {
    if (!called) {
      func(...args);
      called = true;
    }
  };
};
var warnInterpolate = once(console.warn);
function deprecateInterpolate() {
  warnInterpolate(
    `${prefix}The "interpolate" function is deprecated in v9 (use "to" instead)`
  );
}
var warnDirectCall = once(console.warn);
function deprecateDirectCall() {
  warnDirectCall(
    `${prefix}Directly calling start instead of using the api object is deprecated in v9 (use ".start" instead), this will be removed in later 0.X.0 versions`
  );
}
function isAnimatedString(value) {
  return is.str(value) && (value[0] == "#" || /\d/.test(value) || // Do not identify a CSS variable as an AnimatedString if its SSR
  !isSSR() && cssVariableRegex.test(value) || value in (colors$1 || {}));
}
var useIsomorphicLayoutEffect = isSSR() ? reactExports.useEffect : reactExports.useLayoutEffect;
var useIsMounted = () => {
  const isMounted = reactExports.useRef(false);
  useIsomorphicLayoutEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);
  return isMounted;
};
function useForceUpdate() {
  const update2 = reactExports.useState()[1];
  const isMounted = useIsMounted();
  return () => {
    if (isMounted.current) {
      update2(Math.random());
    }
  };
}
function useMemoOne(getResult, inputs) {
  const [initial] = reactExports.useState(
    () => ({
      inputs,
      result: getResult()
    })
  );
  const committed = reactExports.useRef();
  const prevCache = committed.current;
  let cache = prevCache;
  if (cache) {
    const useCache = Boolean(
      inputs && cache.inputs && areInputsEqual(inputs, cache.inputs)
    );
    if (!useCache) {
      cache = {
        inputs,
        result: getResult()
      };
    }
  } else {
    cache = initial;
  }
  reactExports.useEffect(() => {
    committed.current = cache;
    if (prevCache == initial) {
      initial.inputs = initial.result = void 0;
    }
  }, [cache]);
  return cache.result;
}
function areInputsEqual(next, prev) {
  if (next.length !== prev.length) {
    return false;
  }
  for (let i2 = 0; i2 < next.length; i2++) {
    if (next[i2] !== prev[i2]) {
      return false;
    }
  }
  return true;
}
var useOnce = (effect) => reactExports.useEffect(effect, emptyDeps);
var emptyDeps = [];
function usePrev(value) {
  const prevRef = reactExports.useRef();
  reactExports.useEffect(() => {
    prevRef.current = value;
  });
  return prevRef.current;
}
var $node = Symbol.for("Animated:node");
var isAnimated = (value) => !!value && value[$node] === value;
var getAnimated = (owner) => owner && owner[$node];
var setAnimated = (owner, node) => defineHidden(owner, $node, node);
var getPayload = (owner) => owner && owner[$node] && owner[$node].getPayload();
var Animated = class {
  constructor() {
    setAnimated(this, this);
  }
  /** Get every `AnimatedValue` used by this node. */
  getPayload() {
    return this.payload || [];
  }
};
var AnimatedValue = class extends Animated {
  constructor(_value) {
    super();
    this._value = _value;
    this.done = true;
    this.durationProgress = 0;
    if (is.num(this._value)) {
      this.lastPosition = this._value;
    }
  }
  /** @internal */
  static create(value) {
    return new AnimatedValue(value);
  }
  getPayload() {
    return [this];
  }
  getValue() {
    return this._value;
  }
  setValue(value, step) {
    if (is.num(value)) {
      this.lastPosition = value;
      if (step) {
        value = Math.round(value / step) * step;
        if (this.done) {
          this.lastPosition = value;
        }
      }
    }
    if (this._value === value) {
      return false;
    }
    this._value = value;
    return true;
  }
  reset() {
    const { done } = this;
    this.done = false;
    if (is.num(this._value)) {
      this.elapsedTime = 0;
      this.durationProgress = 0;
      this.lastPosition = this._value;
      if (done)
        this.lastVelocity = null;
      this.v0 = null;
    }
  }
};
var AnimatedString = class extends AnimatedValue {
  constructor(value) {
    super(0);
    this._string = null;
    this._toString = createInterpolator({
      output: [value, value]
    });
  }
  /** @internal */
  static create(value) {
    return new AnimatedString(value);
  }
  getValue() {
    const value = this._string;
    return value == null ? this._string = this._toString(this._value) : value;
  }
  setValue(value) {
    if (is.str(value)) {
      if (value == this._string) {
        return false;
      }
      this._string = value;
      this._value = 1;
    } else if (super.setValue(value)) {
      this._string = null;
    } else {
      return false;
    }
    return true;
  }
  reset(goal) {
    if (goal) {
      this._toString = createInterpolator({
        output: [this.getValue(), goal]
      });
    }
    this._value = 0;
    super.reset();
  }
};
var TreeContext = { dependencies: null };
var AnimatedObject = class extends Animated {
  constructor(source) {
    super();
    this.source = source;
    this.setValue(source);
  }
  getValue(animated2) {
    const values = {};
    eachProp(this.source, (source, key) => {
      if (isAnimated(source)) {
        values[key] = source.getValue(animated2);
      } else if (hasFluidValue(source)) {
        values[key] = getFluidValue(source);
      } else if (!animated2) {
        values[key] = source;
      }
    });
    return values;
  }
  /** Replace the raw object data */
  setValue(source) {
    this.source = source;
    this.payload = this._makePayload(source);
  }
  reset() {
    if (this.payload) {
      each(this.payload, (node) => node.reset());
    }
  }
  /** Create a payload set. */
  _makePayload(source) {
    if (source) {
      const payload = /* @__PURE__ */ new Set();
      eachProp(source, this._addToPayload, payload);
      return Array.from(payload);
    }
  }
  /** Add to a payload set. */
  _addToPayload(source) {
    if (TreeContext.dependencies && hasFluidValue(source)) {
      TreeContext.dependencies.add(source);
    }
    const payload = getPayload(source);
    if (payload) {
      each(payload, (node) => this.add(node));
    }
  }
};
var AnimatedArray = class extends AnimatedObject {
  constructor(source) {
    super(source);
  }
  /** @internal */
  static create(source) {
    return new AnimatedArray(source);
  }
  getValue() {
    return this.source.map((node) => node.getValue());
  }
  setValue(source) {
    const payload = this.getPayload();
    if (source.length == payload.length) {
      return payload.map((node, i2) => node.setValue(source[i2])).some(Boolean);
    }
    super.setValue(source.map(makeAnimated));
    return true;
  }
};
function makeAnimated(value) {
  const nodeType = isAnimatedString(value) ? AnimatedString : AnimatedValue;
  return nodeType.create(value);
}
function getAnimatedType(value) {
  const parentNode = getAnimated(value);
  return parentNode ? parentNode.constructor : is.arr(value) ? AnimatedArray : isAnimatedString(value) ? AnimatedString : AnimatedValue;
}
var withAnimated = (Component, host2) => {
  const hasInstance = (
    // Function components must use "forwardRef" to avoid being
    // re-rendered on every animation frame.
    !is.fun(Component) || Component.prototype && Component.prototype.isReactComponent
  );
  return reactExports.forwardRef((givenProps, givenRef) => {
    const instanceRef = reactExports.useRef(null);
    const ref = hasInstance && // eslint-disable-next-line react-hooks/rules-of-hooks
    reactExports.useCallback(
      (value) => {
        instanceRef.current = updateRef(givenRef, value);
      },
      [givenRef]
    );
    const [props, deps] = getAnimatedState(givenProps, host2);
    const forceUpdate = useForceUpdate();
    const callback = () => {
      const instance = instanceRef.current;
      if (hasInstance && !instance) {
        return;
      }
      const didUpdate = instance ? host2.applyAnimatedValues(instance, props.getValue(true)) : false;
      if (didUpdate === false) {
        forceUpdate();
      }
    };
    const observer = new PropsObserver(callback, deps);
    const observerRef = reactExports.useRef();
    useIsomorphicLayoutEffect(() => {
      observerRef.current = observer;
      each(deps, (dep) => addFluidObserver(dep, observer));
      return () => {
        if (observerRef.current) {
          each(
            observerRef.current.deps,
            (dep) => removeFluidObserver(dep, observerRef.current)
          );
          raf.cancel(observerRef.current.update);
        }
      };
    });
    reactExports.useEffect(callback, []);
    useOnce(() => () => {
      const observer2 = observerRef.current;
      each(observer2.deps, (dep) => removeFluidObserver(dep, observer2));
    });
    const usedProps = host2.getComponentProps(props.getValue());
    return /* @__PURE__ */ reactExports.createElement(Component, { ...usedProps, ref });
  });
};
var PropsObserver = class {
  constructor(update2, deps) {
    this.update = update2;
    this.deps = deps;
  }
  eventObserved(event) {
    if (event.type == "change") {
      raf.write(this.update);
    }
  }
};
function getAnimatedState(props, host2) {
  const dependencies = /* @__PURE__ */ new Set();
  TreeContext.dependencies = dependencies;
  if (props.style)
    props = {
      ...props,
      style: host2.createAnimatedStyle(props.style)
    };
  props = new AnimatedObject(props);
  TreeContext.dependencies = null;
  return [props, dependencies];
}
function updateRef(ref, value) {
  if (ref) {
    if (is.fun(ref))
      ref(value);
    else
      ref.current = value;
  }
  return value;
}
var cacheKey = Symbol.for("AnimatedComponent");
var createHost = (components, {
  applyAnimatedValues: applyAnimatedValues2 = () => false,
  createAnimatedStyle = (style) => new AnimatedObject(style),
  getComponentProps = (props) => props
} = {}) => {
  const hostConfig = {
    applyAnimatedValues: applyAnimatedValues2,
    createAnimatedStyle,
    getComponentProps
  };
  const animated2 = (Component) => {
    const displayName = getDisplayName(Component) || "Anonymous";
    if (is.str(Component)) {
      Component = animated2[Component] || (animated2[Component] = withAnimated(Component, hostConfig));
    } else {
      Component = Component[cacheKey] || (Component[cacheKey] = withAnimated(Component, hostConfig));
    }
    Component.displayName = `Animated(${displayName})`;
    return Component;
  };
  eachProp(components, (Component, key) => {
    if (is.arr(components)) {
      key = getDisplayName(Component);
    }
    animated2[key] = animated2(Component);
  });
  return {
    animated: animated2
  };
};
var getDisplayName = (arg) => is.str(arg) ? arg : arg && is.str(arg.displayName) ? arg.displayName : is.fun(arg) && arg.name || null;
function callProp(value, ...args) {
  return is.fun(value) ? value(...args) : value;
}
var matchProp = (value, key) => value === true || !!(key && value && (is.fun(value) ? value(key) : toArray(value).includes(key)));
var resolveProp = (prop, key) => is.obj(prop) ? key && prop[key] : prop;
var getDefaultProp = (props, key) => props.default === true ? props[key] : props.default ? props.default[key] : void 0;
var noopTransform = (value) => value;
var getDefaultProps = (props, transform = noopTransform) => {
  let keys2 = DEFAULT_PROPS;
  if (props.default && props.default !== true) {
    props = props.default;
    keys2 = Object.keys(props);
  }
  const defaults2 = {};
  for (const key of keys2) {
    const value = transform(props[key], key);
    if (!is.und(value)) {
      defaults2[key] = value;
    }
  }
  return defaults2;
};
var DEFAULT_PROPS = [
  "config",
  "onProps",
  "onStart",
  "onChange",
  "onPause",
  "onResume",
  "onRest"
];
var RESERVED_PROPS = {
  config: 1,
  from: 1,
  to: 1,
  ref: 1,
  loop: 1,
  reset: 1,
  pause: 1,
  cancel: 1,
  reverse: 1,
  immediate: 1,
  default: 1,
  delay: 1,
  onProps: 1,
  onStart: 1,
  onChange: 1,
  onPause: 1,
  onResume: 1,
  onRest: 1,
  onResolve: 1,
  // Transition props
  items: 1,
  trail: 1,
  sort: 1,
  expires: 1,
  initial: 1,
  enter: 1,
  update: 1,
  leave: 1,
  children: 1,
  onDestroyed: 1,
  // Internal props
  keys: 1,
  callId: 1,
  parentId: 1
};
function getForwardProps(props) {
  const forward = {};
  let count = 0;
  eachProp(props, (value, prop) => {
    if (!RESERVED_PROPS[prop]) {
      forward[prop] = value;
      count++;
    }
  });
  if (count) {
    return forward;
  }
}
function inferTo(props) {
  const to2 = getForwardProps(props);
  if (to2) {
    const out = { to: to2 };
    eachProp(props, (val, key) => key in to2 || (out[key] = val));
    return out;
  }
  return { ...props };
}
function computeGoal(value) {
  value = getFluidValue(value);
  return is.arr(value) ? value.map(computeGoal) : isAnimatedString(value) ? globals_exports.createStringInterpolator({
    range: [0, 1],
    output: [value, value]
  })(1) : value;
}
function hasProps(props) {
  for (const _2 in props)
    return true;
  return false;
}
function isAsyncTo(to2) {
  return is.fun(to2) || is.arr(to2) && is.obj(to2[0]);
}
function detachRefs(ctrl, ref) {
  var _a;
  (_a = ctrl.ref) == null ? void 0 : _a.delete(ctrl);
  ref == null ? void 0 : ref.delete(ctrl);
}
function replaceRef(ctrl, ref) {
  var _a;
  if (ref && ctrl.ref !== ref) {
    (_a = ctrl.ref) == null ? void 0 : _a.delete(ctrl);
    ref.add(ctrl);
    ctrl.ref = ref;
  }
}
var config = {
  default: { tension: 170, friction: 26 },
  gentle: { tension: 120, friction: 14 },
  wobbly: { tension: 180, friction: 12 },
  stiff: { tension: 210, friction: 20 },
  slow: { tension: 280, friction: 60 },
  molasses: { tension: 280, friction: 120 }
};
var defaults = {
  ...config.default,
  mass: 1,
  damping: 1,
  easing: easings.linear,
  clamp: false
};
var AnimationConfig = class {
  constructor() {
    this.velocity = 0;
    Object.assign(this, defaults);
  }
};
function mergeConfig(config2, newConfig, defaultConfig) {
  if (defaultConfig) {
    defaultConfig = { ...defaultConfig };
    sanitizeConfig(defaultConfig, newConfig);
    newConfig = { ...defaultConfig, ...newConfig };
  }
  sanitizeConfig(config2, newConfig);
  Object.assign(config2, newConfig);
  for (const key in defaults) {
    if (config2[key] == null) {
      config2[key] = defaults[key];
    }
  }
  let { frequency, damping } = config2;
  const { mass } = config2;
  if (!is.und(frequency)) {
    if (frequency < 0.01)
      frequency = 0.01;
    if (damping < 0)
      damping = 0;
    config2.tension = Math.pow(2 * Math.PI / frequency, 2) * mass;
    config2.friction = 4 * Math.PI * damping * mass / frequency;
  }
  return config2;
}
function sanitizeConfig(config2, props) {
  if (!is.und(props.decay)) {
    config2.duration = void 0;
  } else {
    const isTensionConfig = !is.und(props.tension) || !is.und(props.friction);
    if (isTensionConfig || !is.und(props.frequency) || !is.und(props.damping) || !is.und(props.mass)) {
      config2.duration = void 0;
      config2.decay = void 0;
    }
    if (isTensionConfig) {
      config2.frequency = void 0;
    }
  }
}
var emptyArray = [];
var Animation = class {
  constructor() {
    this.changed = false;
    this.values = emptyArray;
    this.toValues = null;
    this.fromValues = emptyArray;
    this.config = new AnimationConfig();
    this.immediate = false;
  }
};
function scheduleProps(callId, { key, props, defaultProps, state, actions }) {
  return new Promise((resolve, reject) => {
    let delay;
    let timeout;
    let cancel = matchProp(props.cancel ?? (defaultProps == null ? void 0 : defaultProps.cancel), key);
    if (cancel) {
      onStart();
    } else {
      if (!is.und(props.pause)) {
        state.paused = matchProp(props.pause, key);
      }
      let pause = defaultProps == null ? void 0 : defaultProps.pause;
      if (pause !== true) {
        pause = state.paused || matchProp(pause, key);
      }
      delay = callProp(props.delay || 0, key);
      if (pause) {
        state.resumeQueue.add(onResume);
        actions.pause();
      } else {
        actions.resume();
        onResume();
      }
    }
    function onPause() {
      state.resumeQueue.add(onResume);
      state.timeouts.delete(timeout);
      timeout.cancel();
      delay = timeout.time - raf.now();
    }
    function onResume() {
      if (delay > 0 && !globals_exports.skipAnimation) {
        state.delayed = true;
        timeout = raf.setTimeout(onStart, delay);
        state.pauseQueue.add(onPause);
        state.timeouts.add(timeout);
      } else {
        onStart();
      }
    }
    function onStart() {
      if (state.delayed) {
        state.delayed = false;
      }
      state.pauseQueue.delete(onPause);
      state.timeouts.delete(timeout);
      if (callId <= (state.cancelId || 0)) {
        cancel = true;
      }
      try {
        actions.start({ ...props, callId, cancel }, resolve);
      } catch (err) {
        reject(err);
      }
    }
  });
}
var getCombinedResult = (target, results) => results.length == 1 ? results[0] : results.some((result) => result.cancelled) ? getCancelledResult(target.get()) : results.every((result) => result.noop) ? getNoopResult(target.get()) : getFinishedResult(
  target.get(),
  results.every((result) => result.finished)
);
var getNoopResult = (value) => ({
  value,
  noop: true,
  finished: true,
  cancelled: false
});
var getFinishedResult = (value, finished, cancelled = false) => ({
  value,
  finished,
  cancelled
});
var getCancelledResult = (value) => ({
  value,
  cancelled: true,
  finished: false
});
function runAsync(to2, props, state, target) {
  const { callId, parentId, onRest } = props;
  const { asyncTo: prevTo, promise: prevPromise } = state;
  if (!parentId && to2 === prevTo && !props.reset) {
    return prevPromise;
  }
  return state.promise = (async () => {
    state.asyncId = callId;
    state.asyncTo = to2;
    const defaultProps = getDefaultProps(
      props,
      (value, key) => (
        // The `onRest` prop is only called when the `runAsync` promise is resolved.
        key === "onRest" ? void 0 : value
      )
    );
    let preventBail;
    let bail;
    const bailPromise = new Promise(
      (resolve, reject) => (preventBail = resolve, bail = reject)
    );
    const bailIfEnded = (bailSignal) => {
      const bailResult = (
        // The `cancel` prop or `stop` method was used.
        callId <= (state.cancelId || 0) && getCancelledResult(target) || // The async `to` prop was replaced.
        callId !== state.asyncId && getFinishedResult(target, false)
      );
      if (bailResult) {
        bailSignal.result = bailResult;
        bail(bailSignal);
        throw bailSignal;
      }
    };
    const animate = (arg1, arg2) => {
      const bailSignal = new BailSignal();
      const skipAnimationSignal = new SkipAnimationSignal();
      return (async () => {
        if (globals_exports.skipAnimation) {
          stopAsync(state);
          skipAnimationSignal.result = getFinishedResult(target, false);
          bail(skipAnimationSignal);
          throw skipAnimationSignal;
        }
        bailIfEnded(bailSignal);
        const props2 = is.obj(arg1) ? { ...arg1 } : { ...arg2, to: arg1 };
        props2.parentId = callId;
        eachProp(defaultProps, (value, key) => {
          if (is.und(props2[key])) {
            props2[key] = value;
          }
        });
        const result2 = await target.start(props2);
        bailIfEnded(bailSignal);
        if (state.paused) {
          await new Promise((resume) => {
            state.resumeQueue.add(resume);
          });
        }
        return result2;
      })();
    };
    let result;
    if (globals_exports.skipAnimation) {
      stopAsync(state);
      return getFinishedResult(target, false);
    }
    try {
      let animating;
      if (is.arr(to2)) {
        animating = (async (queue) => {
          for (const props2 of queue) {
            await animate(props2);
          }
        })(to2);
      } else {
        animating = Promise.resolve(to2(animate, target.stop.bind(target)));
      }
      await Promise.all([animating.then(preventBail), bailPromise]);
      result = getFinishedResult(target.get(), true, false);
    } catch (err) {
      if (err instanceof BailSignal) {
        result = err.result;
      } else if (err instanceof SkipAnimationSignal) {
        result = err.result;
      } else {
        throw err;
      }
    } finally {
      if (callId == state.asyncId) {
        state.asyncId = parentId;
        state.asyncTo = parentId ? prevTo : void 0;
        state.promise = parentId ? prevPromise : void 0;
      }
    }
    if (is.fun(onRest)) {
      raf.batchedUpdates(() => {
        onRest(result, target, target.item);
      });
    }
    return result;
  })();
}
function stopAsync(state, cancelId) {
  flush(state.timeouts, (t2) => t2.cancel());
  state.pauseQueue.clear();
  state.resumeQueue.clear();
  state.asyncId = state.asyncTo = state.promise = void 0;
  if (cancelId)
    state.cancelId = cancelId;
}
var BailSignal = class extends Error {
  constructor() {
    super(
      "An async animation has been interrupted. You see this error because you forgot to use `await` or `.catch(...)` on its returned promise."
    );
  }
};
var SkipAnimationSignal = class extends Error {
  constructor() {
    super("SkipAnimationSignal");
  }
};
var isFrameValue = (value) => value instanceof FrameValue;
var nextId = 1;
var FrameValue = class extends FluidValue {
  constructor() {
    super(...arguments);
    this.id = nextId++;
    this._priority = 0;
  }
  get priority() {
    return this._priority;
  }
  set priority(priority2) {
    if (this._priority != priority2) {
      this._priority = priority2;
      this._onPriorityChange(priority2);
    }
  }
  /** Get the current value */
  get() {
    const node = getAnimated(this);
    return node && node.getValue();
  }
  /** Create a spring that maps our value to another value */
  to(...args) {
    return globals_exports.to(this, args);
  }
  /** @deprecated Use the `to` method instead. */
  interpolate(...args) {
    deprecateInterpolate();
    return globals_exports.to(this, args);
  }
  toJSON() {
    return this.get();
  }
  observerAdded(count) {
    if (count == 1)
      this._attach();
  }
  observerRemoved(count) {
    if (count == 0)
      this._detach();
  }
  /** Called when the first child is added. */
  _attach() {
  }
  /** Called when the last child is removed. */
  _detach() {
  }
  /** Tell our children about our new value */
  _onChange(value, idle = false) {
    callFluidObservers(this, {
      type: "change",
      parent: this,
      value,
      idle
    });
  }
  /** Tell our children about our new priority */
  _onPriorityChange(priority2) {
    if (!this.idle) {
      frameLoop.sort(this);
    }
    callFluidObservers(this, {
      type: "priority",
      parent: this,
      priority: priority2
    });
  }
};
var $P = Symbol.for("SpringPhase");
var HAS_ANIMATED = 1;
var IS_ANIMATING = 2;
var IS_PAUSED = 4;
var hasAnimated = (target) => (target[$P] & HAS_ANIMATED) > 0;
var isAnimating = (target) => (target[$P] & IS_ANIMATING) > 0;
var isPaused = (target) => (target[$P] & IS_PAUSED) > 0;
var setActiveBit = (target, active) => active ? target[$P] |= IS_ANIMATING | HAS_ANIMATED : target[$P] &= ~IS_ANIMATING;
var setPausedBit = (target, paused) => paused ? target[$P] |= IS_PAUSED : target[$P] &= ~IS_PAUSED;
var SpringValue = class extends FrameValue {
  constructor(arg1, arg2) {
    super();
    this.animation = new Animation();
    this.defaultProps = {};
    this._state = {
      paused: false,
      delayed: false,
      pauseQueue: /* @__PURE__ */ new Set(),
      resumeQueue: /* @__PURE__ */ new Set(),
      timeouts: /* @__PURE__ */ new Set()
    };
    this._pendingCalls = /* @__PURE__ */ new Set();
    this._lastCallId = 0;
    this._lastToId = 0;
    this._memoizedDuration = 0;
    if (!is.und(arg1) || !is.und(arg2)) {
      const props = is.obj(arg1) ? { ...arg1 } : { ...arg2, from: arg1 };
      if (is.und(props.default)) {
        props.default = true;
      }
      this.start(props);
    }
  }
  /** Equals true when not advancing on each frame. */
  get idle() {
    return !(isAnimating(this) || this._state.asyncTo) || isPaused(this);
  }
  get goal() {
    return getFluidValue(this.animation.to);
  }
  get velocity() {
    const node = getAnimated(this);
    return node instanceof AnimatedValue ? node.lastVelocity || 0 : node.getPayload().map((node2) => node2.lastVelocity || 0);
  }
  /**
   * When true, this value has been animated at least once.
   */
  get hasAnimated() {
    return hasAnimated(this);
  }
  /**
   * When true, this value has an unfinished animation,
   * which is either active or paused.
   */
  get isAnimating() {
    return isAnimating(this);
  }
  /**
   * When true, all current and future animations are paused.
   */
  get isPaused() {
    return isPaused(this);
  }
  /**
   *
   *
   */
  get isDelayed() {
    return this._state.delayed;
  }
  /** Advance the current animation by a number of milliseconds */
  advance(dt) {
    let idle = true;
    let changed = false;
    const anim = this.animation;
    let { toValues } = anim;
    const { config: config2 } = anim;
    const payload = getPayload(anim.to);
    if (!payload && hasFluidValue(anim.to)) {
      toValues = toArray(getFluidValue(anim.to));
    }
    anim.values.forEach((node2, i2) => {
      if (node2.done)
        return;
      const to2 = (
        // Animated strings always go from 0 to 1.
        node2.constructor == AnimatedString ? 1 : payload ? payload[i2].lastPosition : toValues[i2]
      );
      let finished = anim.immediate;
      let position = to2;
      if (!finished) {
        position = node2.lastPosition;
        if (config2.tension <= 0) {
          node2.done = true;
          return;
        }
        let elapsed = node2.elapsedTime += dt;
        const from = anim.fromValues[i2];
        const v0 = node2.v0 != null ? node2.v0 : node2.v0 = is.arr(config2.velocity) ? config2.velocity[i2] : config2.velocity;
        let velocity;
        const precision = config2.precision || (from == to2 ? 5e-3 : Math.min(1, Math.abs(to2 - from) * 1e-3));
        if (!is.und(config2.duration)) {
          let p2 = 1;
          if (config2.duration > 0) {
            if (this._memoizedDuration !== config2.duration) {
              this._memoizedDuration = config2.duration;
              if (node2.durationProgress > 0) {
                node2.elapsedTime = config2.duration * node2.durationProgress;
                elapsed = node2.elapsedTime += dt;
              }
            }
            p2 = (config2.progress || 0) + elapsed / this._memoizedDuration;
            p2 = p2 > 1 ? 1 : p2 < 0 ? 0 : p2;
            node2.durationProgress = p2;
          }
          position = from + config2.easing(p2) * (to2 - from);
          velocity = (position - node2.lastPosition) / dt;
          finished = p2 == 1;
        } else if (config2.decay) {
          const decay = config2.decay === true ? 0.998 : config2.decay;
          const e4 = Math.exp(-(1 - decay) * elapsed);
          position = from + v0 / (1 - decay) * (1 - e4);
          finished = Math.abs(node2.lastPosition - position) <= precision;
          velocity = v0 * e4;
        } else {
          velocity = node2.lastVelocity == null ? v0 : node2.lastVelocity;
          const restVelocity = config2.restVelocity || precision / 10;
          const bounceFactor = config2.clamp ? 0 : config2.bounce;
          const canBounce = !is.und(bounceFactor);
          const isGrowing = from == to2 ? node2.v0 > 0 : from < to2;
          let isMoving;
          let isBouncing = false;
          const step = 1;
          const numSteps = Math.ceil(dt / step);
          for (let n2 = 0; n2 < numSteps; ++n2) {
            isMoving = Math.abs(velocity) > restVelocity;
            if (!isMoving) {
              finished = Math.abs(to2 - position) <= precision;
              if (finished) {
                break;
              }
            }
            if (canBounce) {
              isBouncing = position == to2 || position > to2 == isGrowing;
              if (isBouncing) {
                velocity = -velocity * bounceFactor;
                position = to2;
              }
            }
            const springForce = -config2.tension * 1e-6 * (position - to2);
            const dampingForce = -config2.friction * 1e-3 * velocity;
            const acceleration = (springForce + dampingForce) / config2.mass;
            velocity = velocity + acceleration * step;
            position = position + velocity * step;
          }
        }
        node2.lastVelocity = velocity;
        if (Number.isNaN(position)) {
          console.warn(`Got NaN while animating:`, this);
          finished = true;
        }
      }
      if (payload && !payload[i2].done) {
        finished = false;
      }
      if (finished) {
        node2.done = true;
      } else {
        idle = false;
      }
      if (node2.setValue(position, config2.round)) {
        changed = true;
      }
    });
    const node = getAnimated(this);
    const currVal = node.getValue();
    if (idle) {
      const finalVal = getFluidValue(anim.to);
      if ((currVal !== finalVal || changed) && !config2.decay) {
        node.setValue(finalVal);
        this._onChange(finalVal);
      } else if (changed && config2.decay) {
        this._onChange(currVal);
      }
      this._stop();
    } else if (changed) {
      this._onChange(currVal);
    }
  }
  /** Set the current value, while stopping the current animation */
  set(value) {
    raf.batchedUpdates(() => {
      this._stop();
      this._focus(value);
      this._set(value);
    });
    return this;
  }
  /**
   * Freeze the active animation in time, as well as any updates merged
   * before `resume` is called.
   */
  pause() {
    this._update({ pause: true });
  }
  /** Resume the animation if paused. */
  resume() {
    this._update({ pause: false });
  }
  /** Skip to the end of the current animation. */
  finish() {
    if (isAnimating(this)) {
      const { to: to2, config: config2 } = this.animation;
      raf.batchedUpdates(() => {
        this._onStart();
        if (!config2.decay) {
          this._set(to2, false);
        }
        this._stop();
      });
    }
    return this;
  }
  /** Push props into the pending queue. */
  update(props) {
    const queue = this.queue || (this.queue = []);
    queue.push(props);
    return this;
  }
  start(to2, arg2) {
    let queue;
    if (!is.und(to2)) {
      queue = [is.obj(to2) ? to2 : { ...arg2, to: to2 }];
    } else {
      queue = this.queue || [];
      this.queue = [];
    }
    return Promise.all(
      queue.map((props) => {
        const up = this._update(props);
        return up;
      })
    ).then((results) => getCombinedResult(this, results));
  }
  /**
   * Stop the current animation, and cancel any delayed updates.
   *
   * Pass `true` to call `onRest` with `cancelled: true`.
   */
  stop(cancel) {
    const { to: to2 } = this.animation;
    this._focus(this.get());
    stopAsync(this._state, cancel && this._lastCallId);
    raf.batchedUpdates(() => this._stop(to2, cancel));
    return this;
  }
  /** Restart the animation. */
  reset() {
    this._update({ reset: true });
  }
  /** @internal */
  eventObserved(event) {
    if (event.type == "change") {
      this._start();
    } else if (event.type == "priority") {
      this.priority = event.priority + 1;
    }
  }
  /**
   * Parse the `to` and `from` range from the given `props` object.
   *
   * This also ensures the initial value is available to animated components
   * during the render phase.
   */
  _prepareNode(props) {
    const key = this.key || "";
    let { to: to2, from } = props;
    to2 = is.obj(to2) ? to2[key] : to2;
    if (to2 == null || isAsyncTo(to2)) {
      to2 = void 0;
    }
    from = is.obj(from) ? from[key] : from;
    if (from == null) {
      from = void 0;
    }
    const range2 = { to: to2, from };
    if (!hasAnimated(this)) {
      if (props.reverse)
        [to2, from] = [from, to2];
      from = getFluidValue(from);
      if (!is.und(from)) {
        this._set(from);
      } else if (!getAnimated(this)) {
        this._set(to2);
      }
    }
    return range2;
  }
  /** Every update is processed by this method before merging. */
  _update({ ...props }, isLoop) {
    const { key, defaultProps } = this;
    if (props.default)
      Object.assign(
        defaultProps,
        getDefaultProps(
          props,
          (value, prop) => /^on/.test(prop) ? resolveProp(value, key) : value
        )
      );
    mergeActiveFn(this, props, "onProps");
    sendEvent(this, "onProps", props, this);
    const range2 = this._prepareNode(props);
    if (Object.isFrozen(this)) {
      throw Error(
        "Cannot animate a `SpringValue` object that is frozen. Did you forget to pass your component to `animated(...)` before animating its props?"
      );
    }
    const state = this._state;
    return scheduleProps(++this._lastCallId, {
      key,
      props,
      defaultProps,
      state,
      actions: {
        pause: () => {
          if (!isPaused(this)) {
            setPausedBit(this, true);
            flushCalls(state.pauseQueue);
            sendEvent(
              this,
              "onPause",
              getFinishedResult(this, checkFinished(this, this.animation.to)),
              this
            );
          }
        },
        resume: () => {
          if (isPaused(this)) {
            setPausedBit(this, false);
            if (isAnimating(this)) {
              this._resume();
            }
            flushCalls(state.resumeQueue);
            sendEvent(
              this,
              "onResume",
              getFinishedResult(this, checkFinished(this, this.animation.to)),
              this
            );
          }
        },
        start: this._merge.bind(this, range2)
      }
    }).then((result) => {
      if (props.loop && result.finished && !(isLoop && result.noop)) {
        const nextProps = createLoopUpdate(props);
        if (nextProps) {
          return this._update(nextProps, true);
        }
      }
      return result;
    });
  }
  /** Merge props into the current animation */
  _merge(range2, props, resolve) {
    if (props.cancel) {
      this.stop(true);
      return resolve(getCancelledResult(this));
    }
    const hasToProp = !is.und(range2.to);
    const hasFromProp = !is.und(range2.from);
    if (hasToProp || hasFromProp) {
      if (props.callId > this._lastToId) {
        this._lastToId = props.callId;
      } else {
        return resolve(getCancelledResult(this));
      }
    }
    const { key, defaultProps, animation: anim } = this;
    const { to: prevTo, from: prevFrom } = anim;
    let { to: to2 = prevTo, from = prevFrom } = range2;
    if (hasFromProp && !hasToProp && (!props.default || is.und(to2))) {
      to2 = from;
    }
    if (props.reverse)
      [to2, from] = [from, to2];
    const hasFromChanged = !isEqual$1(from, prevFrom);
    if (hasFromChanged) {
      anim.from = from;
    }
    from = getFluidValue(from);
    const hasToChanged = !isEqual$1(to2, prevTo);
    if (hasToChanged) {
      this._focus(to2);
    }
    const hasAsyncTo = isAsyncTo(props.to);
    const { config: config2 } = anim;
    const { decay, velocity } = config2;
    if (hasToProp || hasFromProp) {
      config2.velocity = 0;
    }
    if (props.config && !hasAsyncTo) {
      mergeConfig(
        config2,
        callProp(props.config, key),
        // Avoid calling the same "config" prop twice.
        props.config !== defaultProps.config ? callProp(defaultProps.config, key) : void 0
      );
    }
    let node = getAnimated(this);
    if (!node || is.und(to2)) {
      return resolve(getFinishedResult(this, true));
    }
    const reset = (
      // When `reset` is undefined, the `from` prop implies `reset: true`,
      // except for declarative updates. When `reset` is defined, there
      // must exist a value to animate from.
      is.und(props.reset) ? hasFromProp && !props.default : !is.und(from) && matchProp(props.reset, key)
    );
    const value = reset ? from : this.get();
    const goal = computeGoal(to2);
    const isAnimatable = is.num(goal) || is.arr(goal) || isAnimatedString(goal);
    const immediate = !hasAsyncTo && (!isAnimatable || matchProp(defaultProps.immediate || props.immediate, key));
    if (hasToChanged) {
      const nodeType = getAnimatedType(to2);
      if (nodeType !== node.constructor) {
        if (immediate) {
          node = this._set(goal);
        } else
          throw Error(
            `Cannot animate between ${node.constructor.name} and ${nodeType.name}, as the "to" prop suggests`
          );
      }
    }
    const goalType = node.constructor;
    let started = hasFluidValue(to2);
    let finished = false;
    if (!started) {
      const hasValueChanged = reset || !hasAnimated(this) && hasFromChanged;
      if (hasToChanged || hasValueChanged) {
        finished = isEqual$1(computeGoal(value), goal);
        started = !finished;
      }
      if (!isEqual$1(anim.immediate, immediate) && !immediate || !isEqual$1(config2.decay, decay) || !isEqual$1(config2.velocity, velocity)) {
        started = true;
      }
    }
    if (finished && isAnimating(this)) {
      if (anim.changed && !reset) {
        started = true;
      } else if (!started) {
        this._stop(prevTo);
      }
    }
    if (!hasAsyncTo) {
      if (started || hasFluidValue(prevTo)) {
        anim.values = node.getPayload();
        anim.toValues = hasFluidValue(to2) ? null : goalType == AnimatedString ? [1] : toArray(goal);
      }
      if (anim.immediate != immediate) {
        anim.immediate = immediate;
        if (!immediate && !reset) {
          this._set(prevTo);
        }
      }
      if (started) {
        const { onRest } = anim;
        each(ACTIVE_EVENTS, (type) => mergeActiveFn(this, props, type));
        const result = getFinishedResult(this, checkFinished(this, prevTo));
        flushCalls(this._pendingCalls, result);
        this._pendingCalls.add(resolve);
        if (anim.changed)
          raf.batchedUpdates(() => {
            var _a;
            anim.changed = !reset;
            onRest == null ? void 0 : onRest(result, this);
            if (reset) {
              callProp(defaultProps.onRest, result);
            } else {
              (_a = anim.onStart) == null ? void 0 : _a.call(anim, result, this);
            }
          });
      }
    }
    if (reset) {
      this._set(value);
    }
    if (hasAsyncTo) {
      resolve(runAsync(props.to, props, this._state, this));
    } else if (started) {
      this._start();
    } else if (isAnimating(this) && !hasToChanged) {
      this._pendingCalls.add(resolve);
    } else {
      resolve(getNoopResult(value));
    }
  }
  /** Update the `animation.to` value, which might be a `FluidValue` */
  _focus(value) {
    const anim = this.animation;
    if (value !== anim.to) {
      if (getFluidObservers(this)) {
        this._detach();
      }
      anim.to = value;
      if (getFluidObservers(this)) {
        this._attach();
      }
    }
  }
  _attach() {
    let priority2 = 0;
    const { to: to2 } = this.animation;
    if (hasFluidValue(to2)) {
      addFluidObserver(to2, this);
      if (isFrameValue(to2)) {
        priority2 = to2.priority + 1;
      }
    }
    this.priority = priority2;
  }
  _detach() {
    const { to: to2 } = this.animation;
    if (hasFluidValue(to2)) {
      removeFluidObserver(to2, this);
    }
  }
  /**
   * Update the current value from outside the frameloop,
   * and return the `Animated` node.
   */
  _set(arg, idle = true) {
    const value = getFluidValue(arg);
    if (!is.und(value)) {
      const oldNode = getAnimated(this);
      if (!oldNode || !isEqual$1(value, oldNode.getValue())) {
        const nodeType = getAnimatedType(value);
        if (!oldNode || oldNode.constructor != nodeType) {
          setAnimated(this, nodeType.create(value));
        } else {
          oldNode.setValue(value);
        }
        if (oldNode) {
          raf.batchedUpdates(() => {
            this._onChange(value, idle);
          });
        }
      }
    }
    return getAnimated(this);
  }
  _onStart() {
    const anim = this.animation;
    if (!anim.changed) {
      anim.changed = true;
      sendEvent(
        this,
        "onStart",
        getFinishedResult(this, checkFinished(this, anim.to)),
        this
      );
    }
  }
  _onChange(value, idle) {
    if (!idle) {
      this._onStart();
      callProp(this.animation.onChange, value, this);
    }
    callProp(this.defaultProps.onChange, value, this);
    super._onChange(value, idle);
  }
  // This method resets the animation state (even if already animating) to
  // ensure the latest from/to range is used, and it also ensures this spring
  // is added to the frameloop.
  _start() {
    const anim = this.animation;
    getAnimated(this).reset(getFluidValue(anim.to));
    if (!anim.immediate) {
      anim.fromValues = anim.values.map((node) => node.lastPosition);
    }
    if (!isAnimating(this)) {
      setActiveBit(this, true);
      if (!isPaused(this)) {
        this._resume();
      }
    }
  }
  _resume() {
    if (globals_exports.skipAnimation) {
      this.finish();
    } else {
      frameLoop.start(this);
    }
  }
  /**
   * Exit the frameloop and notify `onRest` listeners.
   *
   * Always wrap `_stop` calls with `batchedUpdates`.
   */
  _stop(goal, cancel) {
    if (isAnimating(this)) {
      setActiveBit(this, false);
      const anim = this.animation;
      each(anim.values, (node) => {
        node.done = true;
      });
      if (anim.toValues) {
        anim.onChange = anim.onPause = anim.onResume = void 0;
      }
      callFluidObservers(this, {
        type: "idle",
        parent: this
      });
      const result = cancel ? getCancelledResult(this.get()) : getFinishedResult(this.get(), checkFinished(this, goal ?? anim.to));
      flushCalls(this._pendingCalls, result);
      if (anim.changed) {
        anim.changed = false;
        sendEvent(this, "onRest", result, this);
      }
    }
  }
};
function checkFinished(target, to2) {
  const goal = computeGoal(to2);
  const value = computeGoal(target.get());
  return isEqual$1(value, goal);
}
function createLoopUpdate(props, loop2 = props.loop, to2 = props.to) {
  const loopRet = callProp(loop2);
  if (loopRet) {
    const overrides = loopRet !== true && inferTo(loopRet);
    const reverse = (overrides || props).reverse;
    const reset = !overrides || overrides.reset;
    return createUpdate({
      ...props,
      loop: loop2,
      // Avoid updating default props when looping.
      default: false,
      // Never loop the `pause` prop.
      pause: void 0,
      // For the "reverse" prop to loop as expected, the "to" prop
      // must be undefined. The "reverse" prop is ignored when the
      // "to" prop is an array or function.
      to: !reverse || isAsyncTo(to2) ? to2 : void 0,
      // Ignore the "from" prop except on reset.
      from: reset ? props.from : void 0,
      reset,
      // The "loop" prop can return a "useSpring" props object to
      // override any of the original props.
      ...overrides
    });
  }
}
function createUpdate(props) {
  const { to: to2, from } = props = inferTo(props);
  const keys2 = /* @__PURE__ */ new Set();
  if (is.obj(to2))
    findDefined(to2, keys2);
  if (is.obj(from))
    findDefined(from, keys2);
  props.keys = keys2.size ? Array.from(keys2) : null;
  return props;
}
function declareUpdate(props) {
  const update2 = createUpdate(props);
  if (is.und(update2.default)) {
    update2.default = getDefaultProps(update2);
  }
  return update2;
}
function findDefined(values, keys2) {
  eachProp(values, (value, key) => value != null && keys2.add(key));
}
var ACTIVE_EVENTS = [
  "onStart",
  "onRest",
  "onChange",
  "onPause",
  "onResume"
];
function mergeActiveFn(target, props, type) {
  target.animation[type] = props[type] !== getDefaultProp(props, type) ? resolveProp(props[type], target.key) : void 0;
}
function sendEvent(target, type, ...args) {
  var _a, _b, _c, _d;
  (_b = (_a = target.animation)[type]) == null ? void 0 : _b.call(_a, ...args);
  (_d = (_c = target.defaultProps)[type]) == null ? void 0 : _d.call(_c, ...args);
}
var BATCHED_EVENTS = ["onStart", "onChange", "onRest"];
var nextId2 = 1;
var Controller = class {
  constructor(props, flush3) {
    this.id = nextId2++;
    this.springs = {};
    this.queue = [];
    this._lastAsyncId = 0;
    this._active = /* @__PURE__ */ new Set();
    this._changed = /* @__PURE__ */ new Set();
    this._started = false;
    this._state = {
      paused: false,
      pauseQueue: /* @__PURE__ */ new Set(),
      resumeQueue: /* @__PURE__ */ new Set(),
      timeouts: /* @__PURE__ */ new Set()
    };
    this._events = {
      onStart: /* @__PURE__ */ new Map(),
      onChange: /* @__PURE__ */ new Map(),
      onRest: /* @__PURE__ */ new Map()
    };
    this._onFrame = this._onFrame.bind(this);
    if (flush3) {
      this._flush = flush3;
    }
    if (props) {
      this.start({ default: true, ...props });
    }
  }
  /**
   * Equals `true` when no spring values are in the frameloop, and
   * no async animation is currently active.
   */
  get idle() {
    return !this._state.asyncTo && Object.values(this.springs).every((spring) => {
      return spring.idle && !spring.isDelayed && !spring.isPaused;
    });
  }
  get item() {
    return this._item;
  }
  set item(item) {
    this._item = item;
  }
  /** Get the current values of our springs */
  get() {
    const values = {};
    this.each((spring, key) => values[key] = spring.get());
    return values;
  }
  /** Set the current values without animating. */
  set(values) {
    for (const key in values) {
      const value = values[key];
      if (!is.und(value)) {
        this.springs[key].set(value);
      }
    }
  }
  /** Push an update onto the queue of each value. */
  update(props) {
    if (props) {
      this.queue.push(createUpdate(props));
    }
    return this;
  }
  /**
   * Start the queued animations for every spring, and resolve the returned
   * promise once all queued animations have finished or been cancelled.
   *
   * When you pass a queue (instead of nothing), that queue is used instead of
   * the queued animations added with the `update` method, which are left alone.
   */
  start(props) {
    let { queue } = this;
    if (props) {
      queue = toArray(props).map(createUpdate);
    } else {
      this.queue = [];
    }
    if (this._flush) {
      return this._flush(this, queue);
    }
    prepareKeys(this, queue);
    return flushUpdateQueue(this, queue);
  }
  /** @internal */
  stop(arg, keys2) {
    if (arg !== !!arg) {
      keys2 = arg;
    }
    if (keys2) {
      const springs = this.springs;
      each(toArray(keys2), (key) => springs[key].stop(!!arg));
    } else {
      stopAsync(this._state, this._lastAsyncId);
      this.each((spring) => spring.stop(!!arg));
    }
    return this;
  }
  /** Freeze the active animation in time */
  pause(keys2) {
    if (is.und(keys2)) {
      this.start({ pause: true });
    } else {
      const springs = this.springs;
      each(toArray(keys2), (key) => springs[key].pause());
    }
    return this;
  }
  /** Resume the animation if paused. */
  resume(keys2) {
    if (is.und(keys2)) {
      this.start({ pause: false });
    } else {
      const springs = this.springs;
      each(toArray(keys2), (key) => springs[key].resume());
    }
    return this;
  }
  /** Call a function once per spring value */
  each(iterator) {
    eachProp(this.springs, iterator);
  }
  /** @internal Called at the end of every animation frame */
  _onFrame() {
    const { onStart, onChange, onRest } = this._events;
    const active = this._active.size > 0;
    const changed = this._changed.size > 0;
    if (active && !this._started || changed && !this._started) {
      this._started = true;
      flush(onStart, ([onStart2, result]) => {
        result.value = this.get();
        onStart2(result, this, this._item);
      });
    }
    const idle = !active && this._started;
    const values = changed || idle && onRest.size ? this.get() : null;
    if (changed && onChange.size) {
      flush(onChange, ([onChange2, result]) => {
        result.value = values;
        onChange2(result, this, this._item);
      });
    }
    if (idle) {
      this._started = false;
      flush(onRest, ([onRest2, result]) => {
        result.value = values;
        onRest2(result, this, this._item);
      });
    }
  }
  /** @internal */
  eventObserved(event) {
    if (event.type == "change") {
      this._changed.add(event.parent);
      if (!event.idle) {
        this._active.add(event.parent);
      }
    } else if (event.type == "idle") {
      this._active.delete(event.parent);
    } else
      return;
    raf.onFrame(this._onFrame);
  }
};
function flushUpdateQueue(ctrl, queue) {
  return Promise.all(queue.map((props) => flushUpdate(ctrl, props))).then(
    (results) => getCombinedResult(ctrl, results)
  );
}
async function flushUpdate(ctrl, props, isLoop) {
  const { keys: keys2, to: to2, from, loop: loop2, onRest, onResolve } = props;
  const defaults2 = is.obj(props.default) && props.default;
  if (loop2) {
    props.loop = false;
  }
  if (to2 === false)
    props.to = null;
  if (from === false)
    props.from = null;
  const asyncTo = is.arr(to2) || is.fun(to2) ? to2 : void 0;
  if (asyncTo) {
    props.to = void 0;
    props.onRest = void 0;
    if (defaults2) {
      defaults2.onRest = void 0;
    }
  } else {
    each(BATCHED_EVENTS, (key) => {
      const handler = props[key];
      if (is.fun(handler)) {
        const queue = ctrl["_events"][key];
        props[key] = ({ finished, cancelled }) => {
          const result2 = queue.get(handler);
          if (result2) {
            if (!finished)
              result2.finished = false;
            if (cancelled)
              result2.cancelled = true;
          } else {
            queue.set(handler, {
              value: null,
              finished: finished || false,
              cancelled: cancelled || false
            });
          }
        };
        if (defaults2) {
          defaults2[key] = props[key];
        }
      }
    });
  }
  const state = ctrl["_state"];
  if (props.pause === !state.paused) {
    state.paused = props.pause;
    flushCalls(props.pause ? state.pauseQueue : state.resumeQueue);
  } else if (state.paused) {
    props.pause = true;
  }
  const promises = (keys2 || Object.keys(ctrl.springs)).map(
    (key) => ctrl.springs[key].start(props)
  );
  const cancel = props.cancel === true || getDefaultProp(props, "cancel") === true;
  if (asyncTo || cancel && state.asyncId) {
    promises.push(
      scheduleProps(++ctrl["_lastAsyncId"], {
        props,
        state,
        actions: {
          pause: noop$3,
          resume: noop$3,
          start(props2, resolve) {
            if (cancel) {
              stopAsync(state, ctrl["_lastAsyncId"]);
              resolve(getCancelledResult(ctrl));
            } else {
              props2.onRest = onRest;
              resolve(
                runAsync(
                  asyncTo,
                  props2,
                  state,
                  ctrl
                )
              );
            }
          }
        }
      })
    );
  }
  if (state.paused) {
    await new Promise((resume) => {
      state.resumeQueue.add(resume);
    });
  }
  const result = getCombinedResult(ctrl, await Promise.all(promises));
  if (loop2 && result.finished && !(isLoop && result.noop)) {
    const nextProps = createLoopUpdate(props, loop2, to2);
    if (nextProps) {
      prepareKeys(ctrl, [nextProps]);
      return flushUpdate(ctrl, nextProps, true);
    }
  }
  if (onResolve) {
    raf.batchedUpdates(() => onResolve(result, ctrl, ctrl.item));
  }
  return result;
}
function getSprings(ctrl, props) {
  const springs = { ...ctrl.springs };
  if (props) {
    each(toArray(props), (props2) => {
      if (is.und(props2.keys)) {
        props2 = createUpdate(props2);
      }
      if (!is.obj(props2.to)) {
        props2 = { ...props2, to: void 0 };
      }
      prepareSprings(springs, props2, (key) => {
        return createSpring(key);
      });
    });
  }
  setSprings(ctrl, springs);
  return springs;
}
function setSprings(ctrl, springs) {
  eachProp(springs, (spring, key) => {
    if (!ctrl.springs[key]) {
      ctrl.springs[key] = spring;
      addFluidObserver(spring, ctrl);
    }
  });
}
function createSpring(key, observer) {
  const spring = new SpringValue();
  spring.key = key;
  if (observer) {
    addFluidObserver(spring, observer);
  }
  return spring;
}
function prepareSprings(springs, props, create) {
  if (props.keys) {
    each(props.keys, (key) => {
      const spring = springs[key] || (springs[key] = create(key));
      spring["_prepareNode"](props);
    });
  }
}
function prepareKeys(ctrl, queue) {
  each(queue, (props) => {
    prepareSprings(ctrl.springs, props, (key) => {
      return createSpring(key, ctrl);
    });
  });
}
var SpringContext = ({
  children,
  ...props
}) => {
  const inherited = reactExports.useContext(ctx);
  const pause = props.pause || !!inherited.pause, immediate = props.immediate || !!inherited.immediate;
  props = useMemoOne(() => ({ pause, immediate }), [pause, immediate]);
  const { Provider } = ctx;
  return /* @__PURE__ */ reactExports.createElement(Provider, { value: props }, children);
};
var ctx = makeContext(SpringContext, {});
SpringContext.Provider = ctx.Provider;
SpringContext.Consumer = ctx.Consumer;
function makeContext(target, init) {
  Object.assign(target, reactExports.createContext(init));
  target.Provider._context = target;
  target.Consumer._context = target;
  return target;
}
var SpringRef = () => {
  const current = [];
  const SpringRef2 = function(props) {
    deprecateDirectCall();
    const results = [];
    each(current, (ctrl, i2) => {
      if (is.und(props)) {
        results.push(ctrl.start());
      } else {
        const update2 = _getProps(props, ctrl, i2);
        if (update2) {
          results.push(ctrl.start(update2));
        }
      }
    });
    return results;
  };
  SpringRef2.current = current;
  SpringRef2.add = function(ctrl) {
    if (!current.includes(ctrl)) {
      current.push(ctrl);
    }
  };
  SpringRef2.delete = function(ctrl) {
    const i2 = current.indexOf(ctrl);
    if (~i2)
      current.splice(i2, 1);
  };
  SpringRef2.pause = function() {
    each(current, (ctrl) => ctrl.pause(...arguments));
    return this;
  };
  SpringRef2.resume = function() {
    each(current, (ctrl) => ctrl.resume(...arguments));
    return this;
  };
  SpringRef2.set = function(values) {
    each(current, (ctrl, i2) => {
      const update2 = is.fun(values) ? values(i2, ctrl) : values;
      if (update2) {
        ctrl.set(update2);
      }
    });
  };
  SpringRef2.start = function(props) {
    const results = [];
    each(current, (ctrl, i2) => {
      if (is.und(props)) {
        results.push(ctrl.start());
      } else {
        const update2 = this._getProps(props, ctrl, i2);
        if (update2) {
          results.push(ctrl.start(update2));
        }
      }
    });
    return results;
  };
  SpringRef2.stop = function() {
    each(current, (ctrl) => ctrl.stop(...arguments));
    return this;
  };
  SpringRef2.update = function(props) {
    each(current, (ctrl, i2) => ctrl.update(this._getProps(props, ctrl, i2)));
    return this;
  };
  const _getProps = function(arg, ctrl, index) {
    return is.fun(arg) ? arg(index, ctrl) : arg;
  };
  SpringRef2._getProps = _getProps;
  return SpringRef2;
};
function useSprings(length, props, deps) {
  const propsFn = is.fun(props) && props;
  if (propsFn && !deps)
    deps = [];
  const ref = reactExports.useMemo(
    () => propsFn || arguments.length == 3 ? SpringRef() : void 0,
    []
  );
  const layoutId = reactExports.useRef(0);
  const forceUpdate = useForceUpdate();
  const state = reactExports.useMemo(
    () => ({
      ctrls: [],
      queue: [],
      flush(ctrl, updates2) {
        const springs2 = getSprings(ctrl, updates2);
        const canFlushSync = layoutId.current > 0 && !state.queue.length && !Object.keys(springs2).some((key) => !ctrl.springs[key]);
        return canFlushSync ? flushUpdateQueue(ctrl, updates2) : new Promise((resolve) => {
          setSprings(ctrl, springs2);
          state.queue.push(() => {
            resolve(flushUpdateQueue(ctrl, updates2));
          });
          forceUpdate();
        });
      }
    }),
    []
  );
  const ctrls = reactExports.useRef([...state.ctrls]);
  const updates = [];
  const prevLength = usePrev(length) || 0;
  reactExports.useMemo(() => {
    each(ctrls.current.slice(length, prevLength), (ctrl) => {
      detachRefs(ctrl, ref);
      ctrl.stop(true);
    });
    ctrls.current.length = length;
    declareUpdates(prevLength, length);
  }, [length]);
  reactExports.useMemo(() => {
    declareUpdates(0, Math.min(prevLength, length));
  }, deps);
  function declareUpdates(startIndex, endIndex) {
    for (let i2 = startIndex; i2 < endIndex; i2++) {
      const ctrl = ctrls.current[i2] || (ctrls.current[i2] = new Controller(null, state.flush));
      const update2 = propsFn ? propsFn(i2, ctrl) : props[i2];
      if (update2) {
        updates[i2] = declareUpdate(update2);
      }
    }
  }
  const springs = ctrls.current.map((ctrl, i2) => getSprings(ctrl, updates[i2]));
  const context = reactExports.useContext(SpringContext);
  const prevContext = usePrev(context);
  const hasContext = context !== prevContext && hasProps(context);
  useIsomorphicLayoutEffect(() => {
    layoutId.current++;
    state.ctrls = ctrls.current;
    const { queue } = state;
    if (queue.length) {
      state.queue = [];
      each(queue, (cb) => cb());
    }
    each(ctrls.current, (ctrl, i2) => {
      ref == null ? void 0 : ref.add(ctrl);
      if (hasContext) {
        ctrl.start({ default: context });
      }
      const update2 = updates[i2];
      if (update2) {
        replaceRef(ctrl, update2.ref);
        if (ctrl.ref) {
          ctrl.queue.push(update2);
        } else {
          ctrl.start(update2);
        }
      }
    });
  });
  useOnce(() => () => {
    each(state.ctrls, (ctrl) => ctrl.stop(true));
  });
  const values = springs.map((x2) => ({ ...x2 }));
  return ref ? [values, ref] : values;
}
function useSpring(props, deps) {
  const isFn = is.fun(props);
  const [[values], ref] = useSprings(
    1,
    isFn ? props : [props],
    isFn ? deps || [] : deps
  );
  return isFn || arguments.length == 2 ? [values, ref] : values;
}
function useTransition(data, props, deps) {
  const propsFn = is.fun(props) && props;
  const {
    reset,
    sort,
    trail = 0,
    expires = true,
    exitBeforeEnter = false,
    onDestroyed,
    ref: propsRef,
    config: propsConfig
  } = propsFn ? propsFn() : props;
  const ref = reactExports.useMemo(
    () => propsFn || arguments.length == 3 ? SpringRef() : void 0,
    []
  );
  const items = toArray(data);
  const transitions = [];
  const usedTransitions = reactExports.useRef(null);
  const prevTransitions = reset ? null : usedTransitions.current;
  useIsomorphicLayoutEffect(() => {
    usedTransitions.current = transitions;
  });
  useOnce(() => {
    each(transitions, (t2) => {
      ref == null ? void 0 : ref.add(t2.ctrl);
      t2.ctrl.ref = ref;
    });
    return () => {
      each(usedTransitions.current, (t2) => {
        if (t2.expired) {
          clearTimeout(t2.expirationId);
        }
        detachRefs(t2.ctrl, ref);
        t2.ctrl.stop(true);
      });
    };
  });
  const keys2 = getKeys(items, propsFn ? propsFn() : props, prevTransitions);
  const expired = reset && usedTransitions.current || [];
  useIsomorphicLayoutEffect(
    () => each(expired, ({ ctrl, item, key }) => {
      detachRefs(ctrl, ref);
      callProp(onDestroyed, item, key);
    })
  );
  const reused = [];
  if (prevTransitions)
    each(prevTransitions, (t2, i2) => {
      if (t2.expired) {
        clearTimeout(t2.expirationId);
        expired.push(t2);
      } else {
        i2 = reused[i2] = keys2.indexOf(t2.key);
        if (~i2)
          transitions[i2] = t2;
      }
    });
  each(items, (item, i2) => {
    if (!transitions[i2]) {
      transitions[i2] = {
        key: keys2[i2],
        item,
        phase: "mount",
        ctrl: new Controller()
      };
      transitions[i2].ctrl.item = item;
    }
  });
  if (reused.length) {
    let i2 = -1;
    const { leave } = propsFn ? propsFn() : props;
    each(reused, (keyIndex, prevIndex) => {
      const t2 = prevTransitions[prevIndex];
      if (~keyIndex) {
        i2 = transitions.indexOf(t2);
        transitions[i2] = { ...t2, item: items[keyIndex] };
      } else if (leave) {
        transitions.splice(++i2, 0, t2);
      }
    });
  }
  if (is.fun(sort)) {
    transitions.sort((a2, b2) => sort(a2.item, b2.item));
  }
  let delay = -trail;
  const forceUpdate = useForceUpdate();
  const defaultProps = getDefaultProps(props);
  const changes = /* @__PURE__ */ new Map();
  const exitingTransitions = reactExports.useRef(/* @__PURE__ */ new Map());
  const forceChange = reactExports.useRef(false);
  each(transitions, (t2, i2) => {
    const key = t2.key;
    const prevPhase = t2.phase;
    const p2 = propsFn ? propsFn() : props;
    let to2;
    let phase;
    const propsDelay = callProp(p2.delay || 0, key);
    if (prevPhase == "mount") {
      to2 = p2.enter;
      phase = "enter";
    } else {
      const isLeave = keys2.indexOf(key) < 0;
      if (prevPhase != "leave") {
        if (isLeave) {
          to2 = p2.leave;
          phase = "leave";
        } else if (to2 = p2.update) {
          phase = "update";
        } else
          return;
      } else if (!isLeave) {
        to2 = p2.enter;
        phase = "enter";
      } else
        return;
    }
    to2 = callProp(to2, t2.item, i2);
    to2 = is.obj(to2) ? inferTo(to2) : { to: to2 };
    if (!to2.config) {
      const config2 = propsConfig || defaultProps.config;
      to2.config = callProp(config2, t2.item, i2, phase);
    }
    delay += trail;
    const payload = {
      ...defaultProps,
      // we need to add our props.delay value you here.
      delay: propsDelay + delay,
      ref: propsRef,
      immediate: p2.immediate,
      // This prevents implied resets.
      reset: false,
      // Merge any phase-specific props.
      ...to2
    };
    if (phase == "enter" && is.und(payload.from)) {
      const p22 = propsFn ? propsFn() : props;
      const from = is.und(p22.initial) || prevTransitions ? p22.from : p22.initial;
      payload.from = callProp(from, t2.item, i2);
    }
    const { onResolve } = payload;
    payload.onResolve = (result) => {
      callProp(onResolve, result);
      const transitions2 = usedTransitions.current;
      const t22 = transitions2.find((t3) => t3.key === key);
      if (!t22)
        return;
      if (result.cancelled && t22.phase != "update") {
        return;
      }
      if (t22.ctrl.idle) {
        const idle = transitions2.every((t3) => t3.ctrl.idle);
        if (t22.phase == "leave") {
          const expiry = callProp(expires, t22.item);
          if (expiry !== false) {
            const expiryMs = expiry === true ? 0 : expiry;
            t22.expired = true;
            if (!idle && expiryMs > 0) {
              if (expiryMs <= 2147483647)
                t22.expirationId = setTimeout(forceUpdate, expiryMs);
              return;
            }
          }
        }
        if (idle && transitions2.some((t3) => t3.expired)) {
          exitingTransitions.current.delete(t22);
          if (exitBeforeEnter) {
            forceChange.current = true;
          }
          forceUpdate();
        }
      }
    };
    const springs = getSprings(t2.ctrl, payload);
    if (phase === "leave" && exitBeforeEnter) {
      exitingTransitions.current.set(t2, { phase, springs, payload });
    } else {
      changes.set(t2, { phase, springs, payload });
    }
  });
  const context = reactExports.useContext(SpringContext);
  const prevContext = usePrev(context);
  const hasContext = context !== prevContext && hasProps(context);
  useIsomorphicLayoutEffect(() => {
    if (hasContext) {
      each(transitions, (t2) => {
        t2.ctrl.start({ default: context });
      });
    }
  }, [context]);
  each(changes, (_2, t2) => {
    if (exitingTransitions.current.size) {
      const ind = transitions.findIndex((state) => state.key === t2.key);
      transitions.splice(ind, 1);
    }
  });
  useIsomorphicLayoutEffect(
    () => {
      each(
        exitingTransitions.current.size ? exitingTransitions.current : changes,
        ({ phase, payload }, t2) => {
          const { ctrl } = t2;
          t2.phase = phase;
          ref == null ? void 0 : ref.add(ctrl);
          if (hasContext && phase == "enter") {
            ctrl.start({ default: context });
          }
          if (payload) {
            replaceRef(ctrl, payload.ref);
            if ((ctrl.ref || ref) && !forceChange.current) {
              ctrl.update(payload);
            } else {
              ctrl.start(payload);
              if (forceChange.current) {
                forceChange.current = false;
              }
            }
          }
        }
      );
    },
    reset ? void 0 : deps
  );
  const renderTransitions = (render) => /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, transitions.map((t2, i2) => {
    const { springs } = changes.get(t2) || t2.ctrl;
    const elem = render({ ...springs }, t2.item, t2, i2);
    return elem && elem.type ? /* @__PURE__ */ reactExports.createElement(
      elem.type,
      {
        ...elem.props,
        key: is.str(t2.key) || is.num(t2.key) ? t2.key : t2.ctrl.id,
        ref: elem.ref
      }
    ) : elem;
  }));
  return ref ? [renderTransitions, ref] : renderTransitions;
}
var nextKey = 1;
function getKeys(items, { key, keys: keys2 = key }, prevTransitions) {
  if (keys2 === null) {
    const reused = /* @__PURE__ */ new Set();
    return items.map((item) => {
      const t2 = prevTransitions && prevTransitions.find(
        (t22) => t22.item === item && t22.phase !== "leave" && !reused.has(t22)
      );
      if (t2) {
        reused.add(t2);
        return t2.key;
      }
      return nextKey++;
    });
  }
  return is.und(keys2) ? items : is.fun(keys2) ? items.map(keys2) : toArray(keys2);
}
var Interpolation = class extends FrameValue {
  constructor(source, args) {
    super();
    this.source = source;
    this.idle = true;
    this._active = /* @__PURE__ */ new Set();
    this.calc = createInterpolator(...args);
    const value = this._get();
    const nodeType = getAnimatedType(value);
    setAnimated(this, nodeType.create(value));
  }
  advance(_dt) {
    const value = this._get();
    const oldValue = this.get();
    if (!isEqual$1(value, oldValue)) {
      getAnimated(this).setValue(value);
      this._onChange(value, this.idle);
    }
    if (!this.idle && checkIdle(this._active)) {
      becomeIdle(this);
    }
  }
  _get() {
    const inputs = is.arr(this.source) ? this.source.map(getFluidValue) : toArray(getFluidValue(this.source));
    return this.calc(...inputs);
  }
  _start() {
    if (this.idle && !checkIdle(this._active)) {
      this.idle = false;
      each(getPayload(this), (node) => {
        node.done = false;
      });
      if (globals_exports.skipAnimation) {
        raf.batchedUpdates(() => this.advance());
        becomeIdle(this);
      } else {
        frameLoop.start(this);
      }
    }
  }
  // Observe our sources only when we're observed.
  _attach() {
    let priority2 = 1;
    each(toArray(this.source), (source) => {
      if (hasFluidValue(source)) {
        addFluidObserver(source, this);
      }
      if (isFrameValue(source)) {
        if (!source.idle) {
          this._active.add(source);
        }
        priority2 = Math.max(priority2, source.priority + 1);
      }
    });
    this.priority = priority2;
    this._start();
  }
  // Stop observing our sources once we have no observers.
  _detach() {
    each(toArray(this.source), (source) => {
      if (hasFluidValue(source)) {
        removeFluidObserver(source, this);
      }
    });
    this._active.clear();
    becomeIdle(this);
  }
  /** @internal */
  eventObserved(event) {
    if (event.type == "change") {
      if (event.idle) {
        this.advance();
      } else {
        this._active.add(event.parent);
        this._start();
      }
    } else if (event.type == "idle") {
      this._active.delete(event.parent);
    } else if (event.type == "priority") {
      this.priority = toArray(this.source).reduce(
        (highest, parent2) => Math.max(highest, (isFrameValue(parent2) ? parent2.priority : 0) + 1),
        0
      );
    }
  }
};
function isIdle(source) {
  return source.idle !== false;
}
function checkIdle(active) {
  return !active.size || Array.from(active).every(isIdle);
}
function becomeIdle(self2) {
  if (!self2.idle) {
    self2.idle = true;
    each(getPayload(self2), (node) => {
      node.done = true;
    });
    callFluidObservers(self2, {
      type: "idle",
      parent: self2
    });
  }
}
var to = (source, ...args) => new Interpolation(source, args);
globals_exports.assign({
  createStringInterpolator: createStringInterpolator2,
  to: (source, args) => new Interpolation(source, args)
});
var isCustomPropRE$4 = /^--/;
function dangerousStyleValue$4(name, value) {
  if (value == null || typeof value === "boolean" || value === "")
    return "";
  if (typeof value === "number" && value !== 0 && !isCustomPropRE$4.test(name) && !(isUnitlessNumber$4.hasOwnProperty(name) && isUnitlessNumber$4[name]))
    return value + "px";
  return ("" + value).trim();
}
var attributeCache$4 = {};
function applyAnimatedValues$4(instance, props) {
  if (!instance.nodeType || !instance.setAttribute) {
    return false;
  }
  const isFilterElement = instance.nodeName === "filter" || instance.parentNode && instance.parentNode.nodeName === "filter";
  const { style, children, scrollTop, scrollLeft, viewBox, ...attributes } = props;
  const values = Object.values(attributes);
  const names = Object.keys(attributes).map(
    (name) => isFilterElement || instance.hasAttribute(name) ? name : attributeCache$4[name] || (attributeCache$4[name] = name.replace(
      /([A-Z])/g,
      // Attributes are written in dash case
      (n2) => "-" + n2.toLowerCase()
    ))
  );
  if (children !== void 0) {
    instance.textContent = children;
  }
  for (const name in style) {
    if (style.hasOwnProperty(name)) {
      const value = dangerousStyleValue$4(name, style[name]);
      if (isCustomPropRE$4.test(name)) {
        instance.style.setProperty(name, value);
      } else {
        instance.style[name] = value;
      }
    }
  }
  names.forEach((name, i2) => {
    instance.setAttribute(name, values[i2]);
  });
  if (scrollTop !== void 0) {
    instance.scrollTop = scrollTop;
  }
  if (scrollLeft !== void 0) {
    instance.scrollLeft = scrollLeft;
  }
  if (viewBox !== void 0) {
    instance.setAttribute("viewBox", viewBox);
  }
}
var isUnitlessNumber$4 = {
  animationIterationCount: true,
  borderImageOutset: true,
  borderImageSlice: true,
  borderImageWidth: true,
  boxFlex: true,
  boxFlexGroup: true,
  boxOrdinalGroup: true,
  columnCount: true,
  columns: true,
  flex: true,
  flexGrow: true,
  flexPositive: true,
  flexShrink: true,
  flexNegative: true,
  flexOrder: true,
  gridRow: true,
  gridRowEnd: true,
  gridRowSpan: true,
  gridRowStart: true,
  gridColumn: true,
  gridColumnEnd: true,
  gridColumnSpan: true,
  gridColumnStart: true,
  fontWeight: true,
  lineClamp: true,
  lineHeight: true,
  opacity: true,
  order: true,
  orphans: true,
  tabSize: true,
  widows: true,
  zIndex: true,
  zoom: true,
  // SVG-related properties
  fillOpacity: true,
  floodOpacity: true,
  stopOpacity: true,
  strokeDasharray: true,
  strokeDashoffset: true,
  strokeMiterlimit: true,
  strokeOpacity: true,
  strokeWidth: true
};
var prefixKey$4 = (prefix2, key) => prefix2 + key.charAt(0).toUpperCase() + key.substring(1);
var prefixes$5 = ["Webkit", "Ms", "Moz", "O"];
isUnitlessNumber$4 = Object.keys(isUnitlessNumber$4).reduce((acc, prop) => {
  prefixes$5.forEach((prefix2) => acc[prefixKey$4(prefix2, prop)] = acc[prop]);
  return acc;
}, isUnitlessNumber$4);
var domTransforms$4 = /^(matrix|translate|scale|rotate|skew)/;
var pxTransforms$4 = /^(translate)/;
var degTransforms$4 = /^(rotate|skew)/;
var addUnit$4 = (value, unit2) => is.num(value) && value !== 0 ? value + unit2 : value;
var isValueIdentity$4 = (value, id) => is.arr(value) ? value.every((v2) => isValueIdentity$4(v2, id)) : is.num(value) ? value === id : parseFloat(value) === id;
var AnimatedStyle$4 = class AnimatedStyle extends AnimatedObject {
  constructor({ x: x2, y, z: z2, ...style }) {
    const inputs = [];
    const transforms = [];
    if (x2 || y || z2) {
      inputs.push([x2 || 0, y || 0, z2 || 0]);
      transforms.push((xyz) => [
        `translate3d(${xyz.map((v2) => addUnit$4(v2, "px")).join(",")})`,
        // prettier-ignore
        isValueIdentity$4(xyz, 0)
      ]);
    }
    eachProp(style, (value, key) => {
      if (key === "transform") {
        inputs.push([value || ""]);
        transforms.push((transform) => [transform, transform === ""]);
      } else if (domTransforms$4.test(key)) {
        delete style[key];
        if (is.und(value))
          return;
        const unit2 = pxTransforms$4.test(key) ? "px" : degTransforms$4.test(key) ? "deg" : "";
        inputs.push(toArray(value));
        transforms.push(
          key === "rotate3d" ? ([x22, y2, z22, deg]) => [
            `rotate3d(${x22},${y2},${z22},${addUnit$4(deg, unit2)})`,
            isValueIdentity$4(deg, 0)
          ] : (input) => [
            `${key}(${input.map((v2) => addUnit$4(v2, unit2)).join(",")})`,
            isValueIdentity$4(input, key.startsWith("scale") ? 1 : 0)
          ]
        );
      }
    });
    if (inputs.length) {
      style.transform = new FluidTransform$4(inputs, transforms);
    }
    super(style);
  }
};
var FluidTransform$4 = class FluidTransform extends FluidValue {
  constructor(inputs, transforms) {
    super();
    this.inputs = inputs;
    this.transforms = transforms;
    this._value = null;
  }
  get() {
    return this._value || (this._value = this._get());
  }
  _get() {
    let transform = "";
    let identity2 = true;
    each(this.inputs, (input, i2) => {
      const arg1 = getFluidValue(input[0]);
      const [t2, id] = this.transforms[i2](
        is.arr(arg1) ? arg1 : input.map(getFluidValue)
      );
      transform += " " + t2;
      identity2 = identity2 && id;
    });
    return identity2 ? "none" : transform;
  }
  // Start observing our inputs once we have an observer.
  observerAdded(count) {
    if (count == 1)
      each(
        this.inputs,
        (input) => each(
          input,
          (value) => hasFluidValue(value) && addFluidObserver(value, this)
        )
      );
  }
  // Stop observing our inputs once we have no observers.
  observerRemoved(count) {
    if (count == 0)
      each(
        this.inputs,
        (input) => each(
          input,
          (value) => hasFluidValue(value) && removeFluidObserver(value, this)
        )
      );
  }
  eventObserved(event) {
    if (event.type == "change") {
      this._value = null;
    }
    callFluidObservers(this, event);
  }
};
var primitives$4 = [
  "a",
  "abbr",
  "address",
  "area",
  "article",
  "aside",
  "audio",
  "b",
  "base",
  "bdi",
  "bdo",
  "big",
  "blockquote",
  "body",
  "br",
  "button",
  "canvas",
  "caption",
  "cite",
  "code",
  "col",
  "colgroup",
  "data",
  "datalist",
  "dd",
  "del",
  "details",
  "dfn",
  "dialog",
  "div",
  "dl",
  "dt",
  "em",
  "embed",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "head",
  "header",
  "hgroup",
  "hr",
  "html",
  "i",
  "iframe",
  "img",
  "input",
  "ins",
  "kbd",
  "keygen",
  "label",
  "legend",
  "li",
  "link",
  "main",
  "map",
  "mark",
  "menu",
  "menuitem",
  "meta",
  "meter",
  "nav",
  "noscript",
  "object",
  "ol",
  "optgroup",
  "option",
  "output",
  "p",
  "param",
  "picture",
  "pre",
  "progress",
  "q",
  "rp",
  "rt",
  "ruby",
  "s",
  "samp",
  "script",
  "section",
  "select",
  "small",
  "source",
  "span",
  "strong",
  "style",
  "sub",
  "summary",
  "sup",
  "table",
  "tbody",
  "td",
  "textarea",
  "tfoot",
  "th",
  "thead",
  "time",
  "title",
  "tr",
  "track",
  "u",
  "ul",
  "var",
  "video",
  "wbr",
  // SVG
  "circle",
  "clipPath",
  "defs",
  "ellipse",
  "foreignObject",
  "g",
  "image",
  "line",
  "linearGradient",
  "mask",
  "path",
  "pattern",
  "polygon",
  "polyline",
  "radialGradient",
  "rect",
  "stop",
  "svg",
  "text",
  "tspan"
];
globals_exports.assign({
  batchedUpdates: reactDomExports.unstable_batchedUpdates,
  createStringInterpolator: createStringInterpolator2,
  colors: colors2
});
var host$4 = createHost(primitives$4, {
  applyAnimatedValues: applyAnimatedValues$4,
  createAnimatedStyle: (style) => new AnimatedStyle$4(style),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getComponentProps: ({ scrollTop, scrollLeft, ...props }) => props
});
var animated$4 = host$4.animated;
function v$4() {
  return v$4 = Object.assign ? Object.assign.bind() : function(t2) {
    for (var i2 = 1; i2 < arguments.length; i2++) {
      var o2 = arguments[i2];
      for (var n2 in o2)
        Object.prototype.hasOwnProperty.call(o2, n2) && (t2[n2] = o2[n2]);
    }
    return t2;
  }, v$4.apply(this, arguments);
}
var x$2 = { pointerEvents: "none", position: "absolute", zIndex: 10, top: 0, left: 0 }, m$2 = function(t2, i2) {
  return "translate(" + t2 + "px, " + i2 + "px)";
}, b$4 = reactExports.memo(function(t2) {
  var o2, n2 = t2.position, r2 = t2.anchor, e4 = t2.children, l2 = zt(), d = Ur(), y = d.animate, f2 = d.config, b2 = kt(), g2 = b2[0], w2 = b2[1], T2 = reactExports.useRef(false), C2 = void 0, E2 = false, P2 = w2.width > 0 && w2.height > 0, j2 = Math.round(n2[0]), N2 = Math.round(n2[1]);
  P2 && ("top" === r2 ? (j2 -= w2.width / 2, N2 -= w2.height + 14) : "right" === r2 ? (j2 += 14, N2 -= w2.height / 2) : "bottom" === r2 ? (j2 -= w2.width / 2, N2 += 14) : "left" === r2 ? (j2 -= w2.width + 14, N2 -= w2.height / 2) : "center" === r2 && (j2 -= w2.width / 2, N2 -= w2.height / 2), C2 = { transform: m$2(j2, N2) }, T2.current || (E2 = true), T2.current = [j2, N2]);
  var O2 = useSpring({ to: C2, config: f2, immediate: !y || E2 }), V2 = v$4({}, x$2, l2.tooltip.wrapper, { transform: null != (o2 = O2.transform) ? o2 : m$2(j2, N2), opacity: O2.transform ? 1 : 0 });
  return jsxRuntimeExports.jsx(animated$4.div, { ref: g2, style: V2, children: e4 });
});
b$4.displayName = "TooltipWrapper";
var g$2 = reactExports.memo(function(t2) {
  var i2 = t2.size, o2 = void 0 === i2 ? 12 : i2, n2 = t2.color, r2 = t2.style;
  return jsxRuntimeExports.jsx("span", { style: v$4({ display: "block", width: o2, height: o2, background: n2 }, void 0 === r2 ? {} : r2) });
}), w$4 = reactExports.memo(function(t2) {
  var i2, o2 = t2.id, n2 = t2.value, r2 = t2.format, e4 = t2.enableChip, l2 = void 0 !== e4 && e4, a2 = t2.color, c6 = t2.renderContent, h = zt(), u2 = Ot(r2);
  if ("function" == typeof c6)
    i2 = c6();
  else {
    var f2 = n2;
    void 0 !== u2 && void 0 !== f2 && (f2 = u2(f2)), i2 = jsxRuntimeExports.jsxs("div", { style: h.tooltip.basic, children: [l2 && jsxRuntimeExports.jsx(g$2, { color: a2, style: h.tooltip.chip }), void 0 !== f2 ? jsxRuntimeExports.jsxs("span", { children: [o2, ": ", jsxRuntimeExports.jsx("strong", { children: "" + f2 })] }) : o2] });
  }
  return jsxRuntimeExports.jsx("div", { style: h.tooltip.container, children: i2 });
}), T$3 = { width: "100%", borderCollapse: "collapse" }, C$3 = reactExports.memo(function(t2) {
  var i2, o2 = t2.title, n2 = t2.rows, r2 = void 0 === n2 ? [] : n2, e4 = t2.renderContent, l2 = zt();
  return r2.length ? (i2 = "function" == typeof e4 ? e4() : jsxRuntimeExports.jsxs("div", { children: [o2 && o2, jsxRuntimeExports.jsx("table", { style: v$4({}, T$3, l2.tooltip.table), children: jsxRuntimeExports.jsx("tbody", { children: r2.map(function(t3, i3) {
    return jsxRuntimeExports.jsx("tr", { children: t3.map(function(t4, i4) {
      return jsxRuntimeExports.jsx("td", { style: l2.tooltip.tableCell, children: t4 }, i4);
    }) }, i3);
  }) }) })] }), jsxRuntimeExports.jsx("div", { style: l2.tooltip.container, children: i2 })) : null;
});
C$3.displayName = "TableTooltip";
var E$3 = reactExports.memo(function(t2) {
  var i2 = t2.x0, n2 = t2.x1, r2 = t2.y0, e4 = t2.y1, l2 = zt(), u2 = Ur(), d = u2.animate, y = u2.config, f2 = reactExports.useMemo(function() {
    return v$4({}, l2.crosshair.line, { pointerEvents: "none" });
  }, [l2.crosshair.line]), x2 = useSpring({ x1: i2, x2: n2, y1: r2, y2: e4, config: y, immediate: !d });
  return jsxRuntimeExports.jsx(animated$4.line, v$4({}, x2, { fill: "none", style: f2 }));
});
E$3.displayName = "CrosshairLine";
var P$3 = reactExports.memo(function(t2) {
  var i2, o2, n2 = t2.width, r2 = t2.height, e4 = t2.type, l2 = t2.x, a2 = t2.y;
  return "cross" === e4 ? (i2 = { x0: l2, x1: l2, y0: 0, y1: r2 }, o2 = { x0: 0, x1: n2, y0: a2, y1: a2 }) : "top-left" === e4 ? (i2 = { x0: l2, x1: l2, y0: 0, y1: a2 }, o2 = { x0: 0, x1: l2, y0: a2, y1: a2 }) : "top" === e4 ? i2 = { x0: l2, x1: l2, y0: 0, y1: a2 } : "top-right" === e4 ? (i2 = { x0: l2, x1: l2, y0: 0, y1: a2 }, o2 = { x0: l2, x1: n2, y0: a2, y1: a2 }) : "right" === e4 ? o2 = { x0: l2, x1: n2, y0: a2, y1: a2 } : "bottom-right" === e4 ? (i2 = { x0: l2, x1: l2, y0: a2, y1: r2 }, o2 = { x0: l2, x1: n2, y0: a2, y1: a2 }) : "bottom" === e4 ? i2 = { x0: l2, x1: l2, y0: a2, y1: r2 } : "bottom-left" === e4 ? (i2 = { x0: l2, x1: l2, y0: a2, y1: r2 }, o2 = { x0: 0, x1: l2, y0: a2, y1: a2 }) : "left" === e4 ? o2 = { x0: 0, x1: l2, y0: a2, y1: a2 } : "x" === e4 ? i2 = { x0: l2, x1: l2, y0: 0, y1: r2 } : "y" === e4 && (o2 = { x0: 0, x1: n2, y0: a2, y1: a2 }), jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [i2 && jsxRuntimeExports.jsx(E$3, { x0: i2.x0, x1: i2.x1, y0: i2.y0, y1: i2.y1 }), o2 && jsxRuntimeExports.jsx(E$3, { x0: o2.x0, x1: o2.x1, y0: o2.y0, y1: o2.y1 })] });
});
P$3.displayName = "Crosshair";
var j$4 = reactExports.createContext({ showTooltipAt: function() {
}, showTooltipFromEvent: function() {
}, hideTooltip: function() {
} }), N$3 = { isVisible: false, position: [null, null], content: null, anchor: null }, O$5 = reactExports.createContext(N$3), V = function(t2) {
  var i2 = reactExports.useState(N$3), n2 = i2[0], l2 = i2[1], a2 = reactExports.useCallback(function(t3, i3, o2) {
    var n3 = i3[0], r2 = i3[1];
    void 0 === o2 && (o2 = "top"), l2({ isVisible: true, position: [n3, r2], anchor: o2, content: t3 });
  }, [l2]), c6 = reactExports.useCallback(function(i3, o2, n3) {
    void 0 === n3 && (n3 = "top");
    var r2 = t2.current.getBoundingClientRect(), e4 = t2.current.offsetWidth, a3 = e4 === r2.width ? 1 : e4 / r2.width, c7 = "touches" in o2 ? o2.touches[0] : o2, s2 = c7.clientX, h = c7.clientY, u2 = (s2 - r2.left) * a3, d = (h - r2.top) * a3;
    "left" !== n3 && "right" !== n3 || (n3 = u2 < r2.width / 2 ? "right" : "left"), l2({ isVisible: true, position: [u2, d], anchor: n3, content: i3 });
  }, [t2, l2]), s = reactExports.useCallback(function() {
    l2(N$3);
  }, [l2]);
  return { actions: reactExports.useMemo(function() {
    return { showTooltipAt: a2, showTooltipFromEvent: c6, hideTooltip: s };
  }, [a2, c6, s]), state: n2 };
}, k$4 = function() {
  var t2 = reactExports.useContext(j$4);
  if (void 0 === t2)
    throw new Error("useTooltip must be used within a TooltipProvider");
  return t2;
}, z$5 = function() {
  var t2 = reactExports.useContext(O$5);
  if (void 0 === t2)
    throw new Error("useTooltipState must be used within a TooltipProvider");
  return t2;
}, A$3 = function(t2) {
  return t2.isVisible;
}, F = function() {
  var t2 = z$5();
  return A$3(t2) ? jsxRuntimeExports.jsx(b$4, { position: t2.position, anchor: t2.anchor, children: t2.content }) : null;
}, M$1 = function(t2) {
  var i2 = t2.container, o2 = t2.children, n2 = V(i2), r2 = n2.actions, e4 = n2.state;
  return jsxRuntimeExports.jsx(j$4.Provider, { value: r2, children: jsxRuntimeExports.jsx(O$5.Provider, { value: e4, children: o2 }) });
};
function listCacheClear$1() {
  this.__data__ = [];
  this.size = 0;
}
var _listCacheClear = listCacheClear$1;
function eq$5(value, other) {
  return value === other || value !== value && other !== other;
}
var eq_1 = eq$5;
var eq$4 = eq_1;
function assocIndexOf$4(array2, key) {
  var length = array2.length;
  while (length--) {
    if (eq$4(array2[length][0], key)) {
      return length;
    }
  }
  return -1;
}
var _assocIndexOf = assocIndexOf$4;
var assocIndexOf$3 = _assocIndexOf;
var arrayProto = Array.prototype;
var splice = arrayProto.splice;
function listCacheDelete$1(key) {
  var data = this.__data__, index = assocIndexOf$3(data, key);
  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}
var _listCacheDelete = listCacheDelete$1;
var assocIndexOf$2 = _assocIndexOf;
function listCacheGet$1(key) {
  var data = this.__data__, index = assocIndexOf$2(data, key);
  return index < 0 ? void 0 : data[index][1];
}
var _listCacheGet = listCacheGet$1;
var assocIndexOf$1 = _assocIndexOf;
function listCacheHas$1(key) {
  return assocIndexOf$1(this.__data__, key) > -1;
}
var _listCacheHas = listCacheHas$1;
var assocIndexOf = _assocIndexOf;
function listCacheSet$1(key, value) {
  var data = this.__data__, index = assocIndexOf(data, key);
  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}
var _listCacheSet = listCacheSet$1;
var listCacheClear = _listCacheClear, listCacheDelete = _listCacheDelete, listCacheGet = _listCacheGet, listCacheHas = _listCacheHas, listCacheSet = _listCacheSet;
function ListCache$4(entries) {
  var index = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
ListCache$4.prototype.clear = listCacheClear;
ListCache$4.prototype["delete"] = listCacheDelete;
ListCache$4.prototype.get = listCacheGet;
ListCache$4.prototype.has = listCacheHas;
ListCache$4.prototype.set = listCacheSet;
var _ListCache = ListCache$4;
var ListCache$3 = _ListCache;
function stackClear$1() {
  this.__data__ = new ListCache$3();
  this.size = 0;
}
var _stackClear = stackClear$1;
function stackDelete$1(key) {
  var data = this.__data__, result = data["delete"](key);
  this.size = data.size;
  return result;
}
var _stackDelete = stackDelete$1;
function stackGet$1(key) {
  return this.__data__.get(key);
}
var _stackGet = stackGet$1;
function stackHas$1(key) {
  return this.__data__.has(key);
}
var _stackHas = stackHas$1;
var freeGlobal$1 = typeof commonjsGlobal == "object" && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;
var _freeGlobal = freeGlobal$1;
var freeGlobal = _freeGlobal;
var freeSelf = typeof self == "object" && self && self.Object === Object && self;
var root$8 = freeGlobal || freeSelf || Function("return this")();
var _root = root$8;
var root$7 = _root;
var Symbol$7 = root$7.Symbol;
var _Symbol = Symbol$7;
var Symbol$6 = _Symbol;
var objectProto$f = Object.prototype;
var hasOwnProperty$c = objectProto$f.hasOwnProperty;
var nativeObjectToString$1 = objectProto$f.toString;
var symToStringTag$1 = Symbol$6 ? Symbol$6.toStringTag : void 0;
function getRawTag$1(value) {
  var isOwn = hasOwnProperty$c.call(value, symToStringTag$1), tag = value[symToStringTag$1];
  try {
    value[symToStringTag$1] = void 0;
    var unmasked = true;
  } catch (e4) {
  }
  var result = nativeObjectToString$1.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag$1] = tag;
    } else {
      delete value[symToStringTag$1];
    }
  }
  return result;
}
var _getRawTag = getRawTag$1;
var objectProto$e = Object.prototype;
var nativeObjectToString = objectProto$e.toString;
function objectToString$1(value) {
  return nativeObjectToString.call(value);
}
var _objectToString = objectToString$1;
var Symbol$5 = _Symbol, getRawTag = _getRawTag, objectToString = _objectToString;
var nullTag = "[object Null]", undefinedTag = "[object Undefined]";
var symToStringTag = Symbol$5 ? Symbol$5.toStringTag : void 0;
function baseGetTag$8(value) {
  if (value == null) {
    return value === void 0 ? undefinedTag : nullTag;
  }
  return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
}
var _baseGetTag = baseGetTag$8;
function isObject$a(value) {
  var type = typeof value;
  return value != null && (type == "object" || type == "function");
}
var isObject_1 = isObject$a;
var baseGetTag$7 = _baseGetTag, isObject$9 = isObject_1;
var asyncTag = "[object AsyncFunction]", funcTag$2 = "[object Function]", genTag$1 = "[object GeneratorFunction]", proxyTag = "[object Proxy]";
function isFunction$3(value) {
  if (!isObject$9(value)) {
    return false;
  }
  var tag = baseGetTag$7(value);
  return tag == funcTag$2 || tag == genTag$1 || tag == asyncTag || tag == proxyTag;
}
var isFunction_1 = isFunction$3;
const Qe = /* @__PURE__ */ getDefaultExportFromCjs(isFunction_1);
var root$6 = _root;
var coreJsData$1 = root$6["__core-js_shared__"];
var _coreJsData = coreJsData$1;
var coreJsData = _coreJsData;
var maskSrcKey = function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
  return uid ? "Symbol(src)_1." + uid : "";
}();
function isMasked$1(func) {
  return !!maskSrcKey && maskSrcKey in func;
}
var _isMasked = isMasked$1;
var funcProto$2 = Function.prototype;
var funcToString$2 = funcProto$2.toString;
function toSource$2(func) {
  if (func != null) {
    try {
      return funcToString$2.call(func);
    } catch (e4) {
    }
    try {
      return func + "";
    } catch (e4) {
    }
  }
  return "";
}
var _toSource = toSource$2;
var isFunction$2 = isFunction_1, isMasked = _isMasked, isObject$8 = isObject_1, toSource$1 = _toSource;
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
var reIsHostCtor = /^\[object .+?Constructor\]$/;
var funcProto$1 = Function.prototype, objectProto$d = Object.prototype;
var funcToString$1 = funcProto$1.toString;
var hasOwnProperty$b = objectProto$d.hasOwnProperty;
var reIsNative = RegExp(
  "^" + funcToString$1.call(hasOwnProperty$b).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function baseIsNative$1(value) {
  if (!isObject$8(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction$2(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource$1(value));
}
var _baseIsNative = baseIsNative$1;
function getValue$1(object2, key) {
  return object2 == null ? void 0 : object2[key];
}
var _getValue = getValue$1;
var baseIsNative = _baseIsNative, getValue = _getValue;
function getNative$7(object2, key) {
  var value = getValue(object2, key);
  return baseIsNative(value) ? value : void 0;
}
var _getNative = getNative$7;
var getNative$6 = _getNative, root$5 = _root;
var Map$4 = getNative$6(root$5, "Map");
var _Map = Map$4;
var getNative$5 = _getNative;
var nativeCreate$4 = getNative$5(Object, "create");
var _nativeCreate = nativeCreate$4;
var nativeCreate$3 = _nativeCreate;
function hashClear$1() {
  this.__data__ = nativeCreate$3 ? nativeCreate$3(null) : {};
  this.size = 0;
}
var _hashClear = hashClear$1;
function hashDelete$1(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}
var _hashDelete = hashDelete$1;
var nativeCreate$2 = _nativeCreate;
var HASH_UNDEFINED$2 = "__lodash_hash_undefined__";
var objectProto$c = Object.prototype;
var hasOwnProperty$a = objectProto$c.hasOwnProperty;
function hashGet$1(key) {
  var data = this.__data__;
  if (nativeCreate$2) {
    var result = data[key];
    return result === HASH_UNDEFINED$2 ? void 0 : result;
  }
  return hasOwnProperty$a.call(data, key) ? data[key] : void 0;
}
var _hashGet = hashGet$1;
var nativeCreate$1 = _nativeCreate;
var objectProto$b = Object.prototype;
var hasOwnProperty$9 = objectProto$b.hasOwnProperty;
function hashHas$1(key) {
  var data = this.__data__;
  return nativeCreate$1 ? data[key] !== void 0 : hasOwnProperty$9.call(data, key);
}
var _hashHas = hashHas$1;
var nativeCreate = _nativeCreate;
var HASH_UNDEFINED$1 = "__lodash_hash_undefined__";
function hashSet$1(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = nativeCreate && value === void 0 ? HASH_UNDEFINED$1 : value;
  return this;
}
var _hashSet = hashSet$1;
var hashClear = _hashClear, hashDelete = _hashDelete, hashGet = _hashGet, hashHas = _hashHas, hashSet = _hashSet;
function Hash$1(entries) {
  var index = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
Hash$1.prototype.clear = hashClear;
Hash$1.prototype["delete"] = hashDelete;
Hash$1.prototype.get = hashGet;
Hash$1.prototype.has = hashHas;
Hash$1.prototype.set = hashSet;
var _Hash = Hash$1;
var Hash = _Hash, ListCache$2 = _ListCache, Map$3 = _Map;
function mapCacheClear$1() {
  this.size = 0;
  this.__data__ = {
    "hash": new Hash(),
    "map": new (Map$3 || ListCache$2)(),
    "string": new Hash()
  };
}
var _mapCacheClear = mapCacheClear$1;
function isKeyable$1(value) {
  var type = typeof value;
  return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
}
var _isKeyable = isKeyable$1;
var isKeyable = _isKeyable;
function getMapData$4(map2, key) {
  var data = map2.__data__;
  return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
}
var _getMapData = getMapData$4;
var getMapData$3 = _getMapData;
function mapCacheDelete$1(key) {
  var result = getMapData$3(this, key)["delete"](key);
  this.size -= result ? 1 : 0;
  return result;
}
var _mapCacheDelete = mapCacheDelete$1;
var getMapData$2 = _getMapData;
function mapCacheGet$1(key) {
  return getMapData$2(this, key).get(key);
}
var _mapCacheGet = mapCacheGet$1;
var getMapData$1 = _getMapData;
function mapCacheHas$1(key) {
  return getMapData$1(this, key).has(key);
}
var _mapCacheHas = mapCacheHas$1;
var getMapData = _getMapData;
function mapCacheSet$1(key, value) {
  var data = getMapData(this, key), size = data.size;
  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}
var _mapCacheSet = mapCacheSet$1;
var mapCacheClear = _mapCacheClear, mapCacheDelete = _mapCacheDelete, mapCacheGet = _mapCacheGet, mapCacheHas = _mapCacheHas, mapCacheSet = _mapCacheSet;
function MapCache$3(entries) {
  var index = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
MapCache$3.prototype.clear = mapCacheClear;
MapCache$3.prototype["delete"] = mapCacheDelete;
MapCache$3.prototype.get = mapCacheGet;
MapCache$3.prototype.has = mapCacheHas;
MapCache$3.prototype.set = mapCacheSet;
var _MapCache = MapCache$3;
var ListCache$1 = _ListCache, Map$2 = _Map, MapCache$2 = _MapCache;
var LARGE_ARRAY_SIZE$2 = 200;
function stackSet$1(key, value) {
  var data = this.__data__;
  if (data instanceof ListCache$1) {
    var pairs = data.__data__;
    if (!Map$2 || pairs.length < LARGE_ARRAY_SIZE$2 - 1) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new MapCache$2(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}
var _stackSet = stackSet$1;
var ListCache = _ListCache, stackClear = _stackClear, stackDelete = _stackDelete, stackGet = _stackGet, stackHas = _stackHas, stackSet = _stackSet;
function Stack$4(entries) {
  var data = this.__data__ = new ListCache(entries);
  this.size = data.size;
}
Stack$4.prototype.clear = stackClear;
Stack$4.prototype["delete"] = stackDelete;
Stack$4.prototype.get = stackGet;
Stack$4.prototype.has = stackHas;
Stack$4.prototype.set = stackSet;
var _Stack = Stack$4;
var getNative$4 = _getNative;
var defineProperty$2 = function() {
  try {
    var func = getNative$4(Object, "defineProperty");
    func({}, "", {});
    return func;
  } catch (e4) {
  }
}();
var _defineProperty = defineProperty$2;
var defineProperty$1 = _defineProperty;
function baseAssignValue$3(object2, key, value) {
  if (key == "__proto__" && defineProperty$1) {
    defineProperty$1(object2, key, {
      "configurable": true,
      "enumerable": true,
      "value": value,
      "writable": true
    });
  } else {
    object2[key] = value;
  }
}
var _baseAssignValue = baseAssignValue$3;
var baseAssignValue$2 = _baseAssignValue, eq$3 = eq_1;
function assignMergeValue$2(object2, key, value) {
  if (value !== void 0 && !eq$3(object2[key], value) || value === void 0 && !(key in object2)) {
    baseAssignValue$2(object2, key, value);
  }
}
var _assignMergeValue = assignMergeValue$2;
function createBaseFor$1(fromRight) {
  return function(object2, iteratee, keysFunc) {
    var index = -1, iterable = Object(object2), props = keysFunc(object2), length = props.length;
    while (length--) {
      var key = props[fromRight ? length : ++index];
      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }
    return object2;
  };
}
var _createBaseFor = createBaseFor$1;
var createBaseFor = _createBaseFor;
var baseFor$2 = createBaseFor();
var _baseFor = baseFor$2;
var _cloneBuffer = { exports: {} };
_cloneBuffer.exports;
(function(module, exports) {
  var root2 = _root;
  var freeExports = exports && !exports.nodeType && exports;
  var freeModule = freeExports && true && module && !module.nodeType && module;
  var moduleExports = freeModule && freeModule.exports === freeExports;
  var Buffer = moduleExports ? root2.Buffer : void 0, allocUnsafe = Buffer ? Buffer.allocUnsafe : void 0;
  function cloneBuffer2(buffer, isDeep) {
    if (isDeep) {
      return buffer.slice();
    }
    var length = buffer.length, result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);
    buffer.copy(result);
    return result;
  }
  module.exports = cloneBuffer2;
})(_cloneBuffer, _cloneBuffer.exports);
var _cloneBufferExports = _cloneBuffer.exports;
var root$4 = _root;
var Uint8Array$2 = root$4.Uint8Array;
var _Uint8Array = Uint8Array$2;
var Uint8Array$1 = _Uint8Array;
function cloneArrayBuffer$3(arrayBuffer) {
  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new Uint8Array$1(result).set(new Uint8Array$1(arrayBuffer));
  return result;
}
var _cloneArrayBuffer = cloneArrayBuffer$3;
var cloneArrayBuffer$2 = _cloneArrayBuffer;
function cloneTypedArray$2(typedArray, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer$2(typedArray.buffer) : typedArray.buffer;
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}
var _cloneTypedArray = cloneTypedArray$2;
function copyArray$2(source, array2) {
  var index = -1, length = source.length;
  array2 || (array2 = Array(length));
  while (++index < length) {
    array2[index] = source[index];
  }
  return array2;
}
var _copyArray = copyArray$2;
var isObject$7 = isObject_1;
var objectCreate = Object.create;
var baseCreate$1 = /* @__PURE__ */ function() {
  function object2() {
  }
  return function(proto) {
    if (!isObject$7(proto)) {
      return {};
    }
    if (objectCreate) {
      return objectCreate(proto);
    }
    object2.prototype = proto;
    var result = new object2();
    object2.prototype = void 0;
    return result;
  };
}();
var _baseCreate = baseCreate$1;
function overArg$2(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}
var _overArg = overArg$2;
var overArg$1 = _overArg;
var getPrototype$3 = overArg$1(Object.getPrototypeOf, Object);
var _getPrototype = getPrototype$3;
var objectProto$a = Object.prototype;
function isPrototype$3(value) {
  var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto$a;
  return value === proto;
}
var _isPrototype = isPrototype$3;
var baseCreate = _baseCreate, getPrototype$2 = _getPrototype, isPrototype$2 = _isPrototype;
function initCloneObject$2(object2) {
  return typeof object2.constructor == "function" && !isPrototype$2(object2) ? baseCreate(getPrototype$2(object2)) : {};
}
var _initCloneObject = initCloneObject$2;
function isObjectLike$b(value) {
  return value != null && typeof value == "object";
}
var isObjectLike_1 = isObjectLike$b;
var baseGetTag$6 = _baseGetTag, isObjectLike$a = isObjectLike_1;
var argsTag$3 = "[object Arguments]";
function baseIsArguments$1(value) {
  return isObjectLike$a(value) && baseGetTag$6(value) == argsTag$3;
}
var _baseIsArguments = baseIsArguments$1;
var baseIsArguments = _baseIsArguments, isObjectLike$9 = isObjectLike_1;
var objectProto$9 = Object.prototype;
var hasOwnProperty$8 = objectProto$9.hasOwnProperty;
var propertyIsEnumerable$1 = objectProto$9.propertyIsEnumerable;
var isArguments$4 = baseIsArguments(/* @__PURE__ */ function() {
  return arguments;
}()) ? baseIsArguments : function(value) {
  return isObjectLike$9(value) && hasOwnProperty$8.call(value, "callee") && !propertyIsEnumerable$1.call(value, "callee");
};
var isArguments_1 = isArguments$4;
var isArray$e = Array.isArray;
var isArray_1 = isArray$e;
var MAX_SAFE_INTEGER$1 = 9007199254740991;
function isLength$3(value) {
  return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER$1;
}
var isLength_1 = isLength$3;
var isFunction$1 = isFunction_1, isLength$2 = isLength_1;
function isArrayLike$6(value) {
  return value != null && isLength$2(value.length) && !isFunction$1(value);
}
var isArrayLike_1 = isArrayLike$6;
var isArrayLike$5 = isArrayLike_1, isObjectLike$8 = isObjectLike_1;
function isArrayLikeObject$2(value) {
  return isObjectLike$8(value) && isArrayLike$5(value);
}
var isArrayLikeObject_1 = isArrayLikeObject$2;
var isBuffer$4 = { exports: {} };
function stubFalse() {
  return false;
}
var stubFalse_1 = stubFalse;
isBuffer$4.exports;
(function(module, exports) {
  var root2 = _root, stubFalse2 = stubFalse_1;
  var freeExports = exports && !exports.nodeType && exports;
  var freeModule = freeExports && true && module && !module.nodeType && module;
  var moduleExports = freeModule && freeModule.exports === freeExports;
  var Buffer = moduleExports ? root2.Buffer : void 0;
  var nativeIsBuffer = Buffer ? Buffer.isBuffer : void 0;
  var isBuffer2 = nativeIsBuffer || stubFalse2;
  module.exports = isBuffer2;
})(isBuffer$4, isBuffer$4.exports);
var isBufferExports = isBuffer$4.exports;
var baseGetTag$5 = _baseGetTag, getPrototype$1 = _getPrototype, isObjectLike$7 = isObjectLike_1;
var objectTag$4 = "[object Object]";
var funcProto = Function.prototype, objectProto$8 = Object.prototype;
var funcToString = funcProto.toString;
var hasOwnProperty$7 = objectProto$8.hasOwnProperty;
var objectCtorString = funcToString.call(Object);
function isPlainObject$2(value) {
  if (!isObjectLike$7(value) || baseGetTag$5(value) != objectTag$4) {
    return false;
  }
  var proto = getPrototype$1(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty$7.call(proto, "constructor") && proto.constructor;
  return typeof Ctor == "function" && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
}
var isPlainObject_1 = isPlainObject$2;
const je = /* @__PURE__ */ getDefaultExportFromCjs(isPlainObject_1);
var baseGetTag$4 = _baseGetTag, isLength$1 = isLength_1, isObjectLike$6 = isObjectLike_1;
var argsTag$2 = "[object Arguments]", arrayTag$2 = "[object Array]", boolTag$3 = "[object Boolean]", dateTag$3 = "[object Date]", errorTag$2 = "[object Error]", funcTag$1 = "[object Function]", mapTag$5 = "[object Map]", numberTag$4 = "[object Number]", objectTag$3 = "[object Object]", regexpTag$3 = "[object RegExp]", setTag$5 = "[object Set]", stringTag$4 = "[object String]", weakMapTag$2 = "[object WeakMap]";
var arrayBufferTag$3 = "[object ArrayBuffer]", dataViewTag$4 = "[object DataView]", float32Tag$2 = "[object Float32Array]", float64Tag$2 = "[object Float64Array]", int8Tag$2 = "[object Int8Array]", int16Tag$2 = "[object Int16Array]", int32Tag$2 = "[object Int32Array]", uint8Tag$2 = "[object Uint8Array]", uint8ClampedTag$2 = "[object Uint8ClampedArray]", uint16Tag$2 = "[object Uint16Array]", uint32Tag$2 = "[object Uint32Array]";
var typedArrayTags = {};
typedArrayTags[float32Tag$2] = typedArrayTags[float64Tag$2] = typedArrayTags[int8Tag$2] = typedArrayTags[int16Tag$2] = typedArrayTags[int32Tag$2] = typedArrayTags[uint8Tag$2] = typedArrayTags[uint8ClampedTag$2] = typedArrayTags[uint16Tag$2] = typedArrayTags[uint32Tag$2] = true;
typedArrayTags[argsTag$2] = typedArrayTags[arrayTag$2] = typedArrayTags[arrayBufferTag$3] = typedArrayTags[boolTag$3] = typedArrayTags[dataViewTag$4] = typedArrayTags[dateTag$3] = typedArrayTags[errorTag$2] = typedArrayTags[funcTag$1] = typedArrayTags[mapTag$5] = typedArrayTags[numberTag$4] = typedArrayTags[objectTag$3] = typedArrayTags[regexpTag$3] = typedArrayTags[setTag$5] = typedArrayTags[stringTag$4] = typedArrayTags[weakMapTag$2] = false;
function baseIsTypedArray$1(value) {
  return isObjectLike$6(value) && isLength$1(value.length) && !!typedArrayTags[baseGetTag$4(value)];
}
var _baseIsTypedArray = baseIsTypedArray$1;
function baseUnary$5(func) {
  return function(value) {
    return func(value);
  };
}
var _baseUnary = baseUnary$5;
var _nodeUtil = { exports: {} };
_nodeUtil.exports;
(function(module, exports) {
  var freeGlobal2 = _freeGlobal;
  var freeExports = exports && !exports.nodeType && exports;
  var freeModule = freeExports && true && module && !module.nodeType && module;
  var moduleExports = freeModule && freeModule.exports === freeExports;
  var freeProcess = moduleExports && freeGlobal2.process;
  var nodeUtil2 = function() {
    try {
      var types = freeModule && freeModule.require && freeModule.require("util").types;
      if (types) {
        return types;
      }
      return freeProcess && freeProcess.binding && freeProcess.binding("util");
    } catch (e4) {
    }
  }();
  module.exports = nodeUtil2;
})(_nodeUtil, _nodeUtil.exports);
var _nodeUtilExports = _nodeUtil.exports;
var baseIsTypedArray = _baseIsTypedArray, baseUnary$4 = _baseUnary, nodeUtil$3 = _nodeUtilExports;
var nodeIsTypedArray = nodeUtil$3 && nodeUtil$3.isTypedArray;
var isTypedArray$3 = nodeIsTypedArray ? baseUnary$4(nodeIsTypedArray) : baseIsTypedArray;
var isTypedArray_1 = isTypedArray$3;
function safeGet$2(object2, key) {
  if (key === "constructor" && typeof object2[key] === "function") {
    return;
  }
  if (key == "__proto__") {
    return;
  }
  return object2[key];
}
var _safeGet = safeGet$2;
var baseAssignValue$1 = _baseAssignValue, eq$2 = eq_1;
var objectProto$7 = Object.prototype;
var hasOwnProperty$6 = objectProto$7.hasOwnProperty;
function assignValue$3(object2, key, value) {
  var objValue = object2[key];
  if (!(hasOwnProperty$6.call(object2, key) && eq$2(objValue, value)) || value === void 0 && !(key in object2)) {
    baseAssignValue$1(object2, key, value);
  }
}
var _assignValue = assignValue$3;
var assignValue$2 = _assignValue, baseAssignValue = _baseAssignValue;
function copyObject$6(source, props, object2, customizer) {
  var isNew = !object2;
  object2 || (object2 = {});
  var index = -1, length = props.length;
  while (++index < length) {
    var key = props[index];
    var newValue = customizer ? customizer(object2[key], source[key], key, object2, source) : void 0;
    if (newValue === void 0) {
      newValue = source[key];
    }
    if (isNew) {
      baseAssignValue(object2, key, newValue);
    } else {
      assignValue$2(object2, key, newValue);
    }
  }
  return object2;
}
var _copyObject = copyObject$6;
function baseTimes$1(n2, iteratee) {
  var index = -1, result = Array(n2);
  while (++index < n2) {
    result[index] = iteratee(index);
  }
  return result;
}
var _baseTimes = baseTimes$1;
var MAX_SAFE_INTEGER = 9007199254740991;
var reIsUint = /^(?:0|[1-9]\d*)$/;
function isIndex$4(value, length) {
  var type = typeof value;
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
}
var _isIndex = isIndex$4;
var baseTimes = _baseTimes, isArguments$3 = isArguments_1, isArray$d = isArray_1, isBuffer$3 = isBufferExports, isIndex$3 = _isIndex, isTypedArray$2 = isTypedArray_1;
var objectProto$6 = Object.prototype;
var hasOwnProperty$5 = objectProto$6.hasOwnProperty;
function arrayLikeKeys$2(value, inherited) {
  var isArr = isArray$d(value), isArg = !isArr && isArguments$3(value), isBuff = !isArr && !isArg && isBuffer$3(value), isType = !isArr && !isArg && !isBuff && isTypedArray$2(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes(value.length, String) : [], length = result.length;
  for (var key in value) {
    if ((inherited || hasOwnProperty$5.call(value, key)) && !(skipIndexes && // Safari 9 has enumerable `arguments.length` in strict mode.
    (key == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    isBuff && (key == "offset" || key == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || // Skip index properties.
    isIndex$3(key, length)))) {
      result.push(key);
    }
  }
  return result;
}
var _arrayLikeKeys = arrayLikeKeys$2;
function nativeKeysIn$1(object2) {
  var result = [];
  if (object2 != null) {
    for (var key in Object(object2)) {
      result.push(key);
    }
  }
  return result;
}
var _nativeKeysIn = nativeKeysIn$1;
var isObject$6 = isObject_1, isPrototype$1 = _isPrototype, nativeKeysIn = _nativeKeysIn;
var objectProto$5 = Object.prototype;
var hasOwnProperty$4 = objectProto$5.hasOwnProperty;
function baseKeysIn$1(object2) {
  if (!isObject$6(object2)) {
    return nativeKeysIn(object2);
  }
  var isProto = isPrototype$1(object2), result = [];
  for (var key in object2) {
    if (!(key == "constructor" && (isProto || !hasOwnProperty$4.call(object2, key)))) {
      result.push(key);
    }
  }
  return result;
}
var _baseKeysIn = baseKeysIn$1;
var arrayLikeKeys$1 = _arrayLikeKeys, baseKeysIn = _baseKeysIn, isArrayLike$4 = isArrayLike_1;
function keysIn$5(object2) {
  return isArrayLike$4(object2) ? arrayLikeKeys$1(object2, true) : baseKeysIn(object2);
}
var keysIn_1 = keysIn$5;
var copyObject$5 = _copyObject, keysIn$4 = keysIn_1;
function toPlainObject$1(value) {
  return copyObject$5(value, keysIn$4(value));
}
var toPlainObject_1 = toPlainObject$1;
var assignMergeValue$1 = _assignMergeValue, cloneBuffer$1 = _cloneBufferExports, cloneTypedArray$1 = _cloneTypedArray, copyArray$1 = _copyArray, initCloneObject$1 = _initCloneObject, isArguments$2 = isArguments_1, isArray$c = isArray_1, isArrayLikeObject$1 = isArrayLikeObject_1, isBuffer$2 = isBufferExports, isFunction = isFunction_1, isObject$5 = isObject_1, isPlainObject$1 = isPlainObject_1, isTypedArray$1 = isTypedArray_1, safeGet$1 = _safeGet, toPlainObject = toPlainObject_1;
function baseMergeDeep$1(object2, source, key, srcIndex, mergeFunc, customizer, stack) {
  var objValue = safeGet$1(object2, key), srcValue = safeGet$1(source, key), stacked = stack.get(srcValue);
  if (stacked) {
    assignMergeValue$1(object2, key, stacked);
    return;
  }
  var newValue = customizer ? customizer(objValue, srcValue, key + "", object2, source, stack) : void 0;
  var isCommon = newValue === void 0;
  if (isCommon) {
    var isArr = isArray$c(srcValue), isBuff = !isArr && isBuffer$2(srcValue), isTyped = !isArr && !isBuff && isTypedArray$1(srcValue);
    newValue = srcValue;
    if (isArr || isBuff || isTyped) {
      if (isArray$c(objValue)) {
        newValue = objValue;
      } else if (isArrayLikeObject$1(objValue)) {
        newValue = copyArray$1(objValue);
      } else if (isBuff) {
        isCommon = false;
        newValue = cloneBuffer$1(srcValue, true);
      } else if (isTyped) {
        isCommon = false;
        newValue = cloneTypedArray$1(srcValue, true);
      } else {
        newValue = [];
      }
    } else if (isPlainObject$1(srcValue) || isArguments$2(srcValue)) {
      newValue = objValue;
      if (isArguments$2(objValue)) {
        newValue = toPlainObject(objValue);
      } else if (!isObject$5(objValue) || isFunction(objValue)) {
        newValue = initCloneObject$1(srcValue);
      }
    } else {
      isCommon = false;
    }
  }
  if (isCommon) {
    stack.set(srcValue, newValue);
    mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
    stack["delete"](srcValue);
  }
  assignMergeValue$1(object2, key, newValue);
}
var _baseMergeDeep = baseMergeDeep$1;
var Stack$3 = _Stack, assignMergeValue = _assignMergeValue, baseFor$1 = _baseFor, baseMergeDeep = _baseMergeDeep, isObject$4 = isObject_1, keysIn$3 = keysIn_1, safeGet = _safeGet;
function baseMerge$1(object2, source, srcIndex, customizer, stack) {
  if (object2 === source) {
    return;
  }
  baseFor$1(source, function(srcValue, key) {
    stack || (stack = new Stack$3());
    if (isObject$4(srcValue)) {
      baseMergeDeep(object2, source, key, srcIndex, baseMerge$1, customizer, stack);
    } else {
      var newValue = customizer ? customizer(safeGet(object2, key), srcValue, key + "", object2, source, stack) : void 0;
      if (newValue === void 0) {
        newValue = srcValue;
      }
      assignMergeValue(object2, key, newValue);
    }
  }, keysIn$3);
}
var _baseMerge = baseMerge$1;
function identity$6(value) {
  return value;
}
var identity_1 = identity$6;
function apply$1(func, thisArg, args) {
  switch (args.length) {
    case 0:
      return func.call(thisArg);
    case 1:
      return func.call(thisArg, args[0]);
    case 2:
      return func.call(thisArg, args[0], args[1]);
    case 3:
      return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}
var _apply = apply$1;
var apply = _apply;
var nativeMax = Math.max;
function overRest$2(func, start2, transform) {
  start2 = nativeMax(start2 === void 0 ? func.length - 1 : start2, 0);
  return function() {
    var args = arguments, index = -1, length = nativeMax(args.length - start2, 0), array2 = Array(length);
    while (++index < length) {
      array2[index] = args[start2 + index];
    }
    index = -1;
    var otherArgs = Array(start2 + 1);
    while (++index < start2) {
      otherArgs[index] = args[index];
    }
    otherArgs[start2] = transform(array2);
    return apply(func, this, otherArgs);
  };
}
var _overRest = overRest$2;
function constant$3(value) {
  return function() {
    return value;
  };
}
var constant_1 = constant$3;
var constant$2 = constant_1, defineProperty = _defineProperty, identity$5 = identity_1;
var baseSetToString$1 = !defineProperty ? identity$5 : function(func, string) {
  return defineProperty(func, "toString", {
    "configurable": true,
    "enumerable": false,
    "value": constant$2(string),
    "writable": true
  });
};
var _baseSetToString = baseSetToString$1;
var HOT_COUNT = 800, HOT_SPAN = 16;
var nativeNow = Date.now;
function shortOut$1(func) {
  var count = 0, lastCalled = 0;
  return function() {
    var stamp = nativeNow(), remaining = HOT_SPAN - (stamp - lastCalled);
    lastCalled = stamp;
    if (remaining > 0) {
      if (++count >= HOT_COUNT) {
        return arguments[0];
      }
    } else {
      count = 0;
    }
    return func.apply(void 0, arguments);
  };
}
var _shortOut = shortOut$1;
var baseSetToString = _baseSetToString, shortOut = _shortOut;
var setToString$2 = shortOut(baseSetToString);
var _setToString = setToString$2;
var identity$4 = identity_1, overRest$1 = _overRest, setToString$1 = _setToString;
function baseRest$3(func, start2) {
  return setToString$1(overRest$1(func, start2, identity$4), func + "");
}
var _baseRest = baseRest$3;
var eq$1 = eq_1, isArrayLike$3 = isArrayLike_1, isIndex$2 = _isIndex, isObject$3 = isObject_1;
function isIterateeCall$2(value, index, object2) {
  if (!isObject$3(object2)) {
    return false;
  }
  var type = typeof index;
  if (type == "number" ? isArrayLike$3(object2) && isIndex$2(index, object2.length) : type == "string" && index in object2) {
    return eq$1(object2[index], value);
  }
  return false;
}
var _isIterateeCall = isIterateeCall$2;
var baseRest$2 = _baseRest, isIterateeCall$1 = _isIterateeCall;
function createAssigner$1(assigner) {
  return baseRest$2(function(object2, sources) {
    var index = -1, length = sources.length, customizer = length > 1 ? sources[length - 1] : void 0, guard = length > 2 ? sources[2] : void 0;
    customizer = assigner.length > 3 && typeof customizer == "function" ? (length--, customizer) : void 0;
    if (guard && isIterateeCall$1(sources[0], sources[1], guard)) {
      customizer = length < 3 ? void 0 : customizer;
      length = 1;
    }
    object2 = Object(object2);
    while (++index < length) {
      var source = sources[index];
      if (source) {
        assigner(object2, source, index, customizer);
      }
    }
    return object2;
  });
}
var _createAssigner = createAssigner$1;
var baseMerge = _baseMerge, createAssigner = _createAssigner;
var merge = createAssigner(function(object2, source, srcIndex) {
  baseMerge(object2, source, srcIndex);
});
var merge_1 = merge;
const m$1 = /* @__PURE__ */ getDefaultExportFromCjs(merge_1);
var baseGetTag$3 = _baseGetTag, isObjectLike$5 = isObjectLike_1;
var symbolTag$3 = "[object Symbol]";
function isSymbol$4(value) {
  return typeof value == "symbol" || isObjectLike$5(value) && baseGetTag$3(value) == symbolTag$3;
}
var isSymbol_1 = isSymbol$4;
var isArray$b = isArray_1, isSymbol$3 = isSymbol_1;
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, reIsPlainProp = /^\w*$/;
function isKey$3(value, object2) {
  if (isArray$b(value)) {
    return false;
  }
  var type = typeof value;
  if (type == "number" || type == "symbol" || type == "boolean" || value == null || isSymbol$3(value)) {
    return true;
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object2 != null && value in Object(object2);
}
var _isKey = isKey$3;
var MapCache$1 = _MapCache;
var FUNC_ERROR_TEXT = "Expected a function";
function memoize$1(func, resolver) {
  if (typeof func != "function" || resolver != null && typeof resolver != "function") {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var memoized = function() {
    var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache = memoized.cache;
    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result) || cache;
    return result;
  };
  memoized.cache = new (memoize$1.Cache || MapCache$1)();
  return memoized;
}
memoize$1.Cache = MapCache$1;
var memoize_1 = memoize$1;
var memoize = memoize_1;
var MAX_MEMOIZE_SIZE = 500;
function memoizeCapped$1(func) {
  var result = memoize(func, function(key) {
    if (cache.size === MAX_MEMOIZE_SIZE) {
      cache.clear();
    }
    return key;
  });
  var cache = result.cache;
  return result;
}
var _memoizeCapped = memoizeCapped$1;
var memoizeCapped = _memoizeCapped;
var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
var reEscapeChar = /\\(\\)?/g;
var stringToPath$1 = memoizeCapped(function(string) {
  var result = [];
  if (string.charCodeAt(0) === 46) {
    result.push("");
  }
  string.replace(rePropName, function(match, number2, quote, subString) {
    result.push(quote ? subString.replace(reEscapeChar, "$1") : number2 || match);
  });
  return result;
});
var _stringToPath = stringToPath$1;
function arrayMap$4(array2, iteratee) {
  var index = -1, length = array2 == null ? 0 : array2.length, result = Array(length);
  while (++index < length) {
    result[index] = iteratee(array2[index], index, array2);
  }
  return result;
}
var _arrayMap = arrayMap$4;
var Symbol$4 = _Symbol, arrayMap$3 = _arrayMap, isArray$a = isArray_1, isSymbol$2 = isSymbol_1;
var INFINITY$2 = 1 / 0;
var symbolProto$2 = Symbol$4 ? Symbol$4.prototype : void 0, symbolToString = symbolProto$2 ? symbolProto$2.toString : void 0;
function baseToString$1(value) {
  if (typeof value == "string") {
    return value;
  }
  if (isArray$a(value)) {
    return arrayMap$3(value, baseToString$1) + "";
  }
  if (isSymbol$2(value)) {
    return symbolToString ? symbolToString.call(value) : "";
  }
  var result = value + "";
  return result == "0" && 1 / value == -INFINITY$2 ? "-0" : result;
}
var _baseToString = baseToString$1;
var baseToString = _baseToString;
function toString$1(value) {
  return value == null ? "" : baseToString(value);
}
var toString_1 = toString$1;
var isArray$9 = isArray_1, isKey$2 = _isKey, stringToPath = _stringToPath, toString = toString_1;
function castPath$6(value, object2) {
  if (isArray$9(value)) {
    return value;
  }
  return isKey$2(value, object2) ? [value] : stringToPath(toString(value));
}
var _castPath = castPath$6;
var isSymbol$1 = isSymbol_1;
var INFINITY$1 = 1 / 0;
function toKey$6(value) {
  if (typeof value == "string" || isSymbol$1(value)) {
    return value;
  }
  var result = value + "";
  return result == "0" && 1 / value == -INFINITY$1 ? "-0" : result;
}
var _toKey = toKey$6;
var castPath$5 = _castPath, toKey$5 = _toKey;
function baseGet$5(object2, path) {
  path = castPath$5(path, object2);
  var index = 0, length = path.length;
  while (object2 != null && index < length) {
    object2 = object2[toKey$5(path[index++])];
  }
  return index && index == length ? object2 : void 0;
}
var _baseGet = baseGet$5;
var baseGet$4 = _baseGet;
function get$1(object2, path, defaultValue) {
  var result = object2 == null ? void 0 : baseGet$4(object2, path);
  return result === void 0 ? defaultValue : result;
}
var get_1 = get$1;
const ke$1 = /* @__PURE__ */ getDefaultExportFromCjs(get_1);
var assignValue$1 = _assignValue, castPath$4 = _castPath, isIndex$1 = _isIndex, isObject$2 = isObject_1, toKey$4 = _toKey;
function baseSet$2(object2, path, value, customizer) {
  if (!isObject$2(object2)) {
    return object2;
  }
  path = castPath$4(path, object2);
  var index = -1, length = path.length, lastIndex = length - 1, nested = object2;
  while (nested != null && ++index < length) {
    var key = toKey$4(path[index]), newValue = value;
    if (key === "__proto__" || key === "constructor" || key === "prototype") {
      return object2;
    }
    if (index != lastIndex) {
      var objValue = nested[key];
      newValue = customizer ? customizer(objValue, key, nested) : void 0;
      if (newValue === void 0) {
        newValue = isObject$2(objValue) ? objValue : isIndex$1(path[index + 1]) ? [] : {};
      }
    }
    assignValue$1(nested, key, newValue);
    nested = nested[key];
  }
  return object2;
}
var _baseSet = baseSet$2;
var baseSet$1 = _baseSet;
function set(object2, path, value) {
  return object2 == null ? object2 : baseSet$1(object2, path, value);
}
var set_1 = set;
const v$3 = /* @__PURE__ */ getDefaultExportFromCjs(set_1);
function define(constructor, factory, prototype) {
  constructor.prototype = factory.prototype = prototype;
  prototype.constructor = constructor;
}
function extend(parent2, definition) {
  var prototype = Object.create(parent2.prototype);
  for (var key in definition)
    prototype[key] = definition[key];
  return prototype;
}
function Color() {
}
var darker = 0.7;
var brighter = 1 / darker;
var reI = "\\s*([+-]?\\d+)\\s*", reN = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", reP = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", reHex = /^#([0-9a-f]{3,8})$/, reRgbInteger = new RegExp(`^rgb\\(${reI},${reI},${reI}\\)$`), reRgbPercent = new RegExp(`^rgb\\(${reP},${reP},${reP}\\)$`), reRgbaInteger = new RegExp(`^rgba\\(${reI},${reI},${reI},${reN}\\)$`), reRgbaPercent = new RegExp(`^rgba\\(${reP},${reP},${reP},${reN}\\)$`), reHslPercent = new RegExp(`^hsl\\(${reN},${reP},${reP}\\)$`), reHslaPercent = new RegExp(`^hsla\\(${reN},${reP},${reP},${reN}\\)$`);
var named = {
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  rebeccapurple: 6697881,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074
};
define(Color, color, {
  copy(channels) {
    return Object.assign(new this.constructor(), this, channels);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: color_formatHex,
  // Deprecated! Use color.formatHex.
  formatHex: color_formatHex,
  formatHex8: color_formatHex8,
  formatHsl: color_formatHsl,
  formatRgb: color_formatRgb,
  toString: color_formatRgb
});
function color_formatHex() {
  return this.rgb().formatHex();
}
function color_formatHex8() {
  return this.rgb().formatHex8();
}
function color_formatHsl() {
  return hslConvert(this).formatHsl();
}
function color_formatRgb() {
  return this.rgb().formatRgb();
}
function color(format2) {
  var m2, l2;
  format2 = (format2 + "").trim().toLowerCase();
  return (m2 = reHex.exec(format2)) ? (l2 = m2[1].length, m2 = parseInt(m2[1], 16), l2 === 6 ? rgbn(m2) : l2 === 3 ? new Rgb(m2 >> 8 & 15 | m2 >> 4 & 240, m2 >> 4 & 15 | m2 & 240, (m2 & 15) << 4 | m2 & 15, 1) : l2 === 8 ? rgba(m2 >> 24 & 255, m2 >> 16 & 255, m2 >> 8 & 255, (m2 & 255) / 255) : l2 === 4 ? rgba(m2 >> 12 & 15 | m2 >> 8 & 240, m2 >> 8 & 15 | m2 >> 4 & 240, m2 >> 4 & 15 | m2 & 240, ((m2 & 15) << 4 | m2 & 15) / 255) : null) : (m2 = reRgbInteger.exec(format2)) ? new Rgb(m2[1], m2[2], m2[3], 1) : (m2 = reRgbPercent.exec(format2)) ? new Rgb(m2[1] * 255 / 100, m2[2] * 255 / 100, m2[3] * 255 / 100, 1) : (m2 = reRgbaInteger.exec(format2)) ? rgba(m2[1], m2[2], m2[3], m2[4]) : (m2 = reRgbaPercent.exec(format2)) ? rgba(m2[1] * 255 / 100, m2[2] * 255 / 100, m2[3] * 255 / 100, m2[4]) : (m2 = reHslPercent.exec(format2)) ? hsla(m2[1], m2[2] / 100, m2[3] / 100, 1) : (m2 = reHslaPercent.exec(format2)) ? hsla(m2[1], m2[2] / 100, m2[3] / 100, m2[4]) : named.hasOwnProperty(format2) ? rgbn(named[format2]) : format2 === "transparent" ? new Rgb(NaN, NaN, NaN, 0) : null;
}
function rgbn(n2) {
  return new Rgb(n2 >> 16 & 255, n2 >> 8 & 255, n2 & 255, 1);
}
function rgba(r2, g2, b2, a2) {
  if (a2 <= 0)
    r2 = g2 = b2 = NaN;
  return new Rgb(r2, g2, b2, a2);
}
function rgbConvert(o2) {
  if (!(o2 instanceof Color))
    o2 = color(o2);
  if (!o2)
    return new Rgb();
  o2 = o2.rgb();
  return new Rgb(o2.r, o2.g, o2.b, o2.opacity);
}
function rgb$1(r2, g2, b2, opacity) {
  return arguments.length === 1 ? rgbConvert(r2) : new Rgb(r2, g2, b2, opacity == null ? 1 : opacity);
}
function Rgb(r2, g2, b2, opacity) {
  this.r = +r2;
  this.g = +g2;
  this.b = +b2;
  this.opacity = +opacity;
}
define(Rgb, rgb$1, extend(Color, {
  brighter(k2) {
    k2 = k2 == null ? brighter : Math.pow(brighter, k2);
    return new Rgb(this.r * k2, this.g * k2, this.b * k2, this.opacity);
  },
  darker(k2) {
    k2 = k2 == null ? darker : Math.pow(darker, k2);
    return new Rgb(this.r * k2, this.g * k2, this.b * k2, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new Rgb(clampi(this.r), clampi(this.g), clampi(this.b), clampa(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && (-0.5 <= this.g && this.g < 255.5) && (-0.5 <= this.b && this.b < 255.5) && (0 <= this.opacity && this.opacity <= 1);
  },
  hex: rgb_formatHex,
  // Deprecated! Use color.formatHex.
  formatHex: rgb_formatHex,
  formatHex8: rgb_formatHex8,
  formatRgb: rgb_formatRgb,
  toString: rgb_formatRgb
}));
function rgb_formatHex() {
  return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}`;
}
function rgb_formatHex8() {
  return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}${hex((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function rgb_formatRgb() {
  const a2 = clampa(this.opacity);
  return `${a2 === 1 ? "rgb(" : "rgba("}${clampi(this.r)}, ${clampi(this.g)}, ${clampi(this.b)}${a2 === 1 ? ")" : `, ${a2})`}`;
}
function clampa(opacity) {
  return isNaN(opacity) ? 1 : Math.max(0, Math.min(1, opacity));
}
function clampi(value) {
  return Math.max(0, Math.min(255, Math.round(value) || 0));
}
function hex(value) {
  value = clampi(value);
  return (value < 16 ? "0" : "") + value.toString(16);
}
function hsla(h, s, l2, a2) {
  if (a2 <= 0)
    h = s = l2 = NaN;
  else if (l2 <= 0 || l2 >= 1)
    h = s = NaN;
  else if (s <= 0)
    h = NaN;
  return new Hsl(h, s, l2, a2);
}
function hslConvert(o2) {
  if (o2 instanceof Hsl)
    return new Hsl(o2.h, o2.s, o2.l, o2.opacity);
  if (!(o2 instanceof Color))
    o2 = color(o2);
  if (!o2)
    return new Hsl();
  if (o2 instanceof Hsl)
    return o2;
  o2 = o2.rgb();
  var r2 = o2.r / 255, g2 = o2.g / 255, b2 = o2.b / 255, min = Math.min(r2, g2, b2), max = Math.max(r2, g2, b2), h = NaN, s = max - min, l2 = (max + min) / 2;
  if (s) {
    if (r2 === max)
      h = (g2 - b2) / s + (g2 < b2) * 6;
    else if (g2 === max)
      h = (b2 - r2) / s + 2;
    else
      h = (r2 - g2) / s + 4;
    s /= l2 < 0.5 ? max + min : 2 - max - min;
    h *= 60;
  } else {
    s = l2 > 0 && l2 < 1 ? 0 : h;
  }
  return new Hsl(h, s, l2, o2.opacity);
}
function hsl(h, s, l2, opacity) {
  return arguments.length === 1 ? hslConvert(h) : new Hsl(h, s, l2, opacity == null ? 1 : opacity);
}
function Hsl(h, s, l2, opacity) {
  this.h = +h;
  this.s = +s;
  this.l = +l2;
  this.opacity = +opacity;
}
define(Hsl, hsl, extend(Color, {
  brighter(k2) {
    k2 = k2 == null ? brighter : Math.pow(brighter, k2);
    return new Hsl(this.h, this.s, this.l * k2, this.opacity);
  },
  darker(k2) {
    k2 = k2 == null ? darker : Math.pow(darker, k2);
    return new Hsl(this.h, this.s, this.l * k2, this.opacity);
  },
  rgb() {
    var h = this.h % 360 + (this.h < 0) * 360, s = isNaN(h) || isNaN(this.s) ? 0 : this.s, l2 = this.l, m2 = l2 + (l2 < 0.5 ? l2 : 1 - l2) * s, m1 = 2 * l2 - m2;
    return new Rgb(
      hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2),
      hsl2rgb(h, m1, m2),
      hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2),
      this.opacity
    );
  },
  clamp() {
    return new Hsl(clamph(this.h), clampt(this.s), clampt(this.l), clampa(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && (0 <= this.l && this.l <= 1) && (0 <= this.opacity && this.opacity <= 1);
  },
  formatHsl() {
    const a2 = clampa(this.opacity);
    return `${a2 === 1 ? "hsl(" : "hsla("}${clamph(this.h)}, ${clampt(this.s) * 100}%, ${clampt(this.l) * 100}%${a2 === 1 ? ")" : `, ${a2})`}`;
  }
}));
function clamph(value) {
  value = (value || 0) % 360;
  return value < 0 ? value + 360 : value;
}
function clampt(value) {
  return Math.max(0, Math.min(1, value || 0));
}
function hsl2rgb(h, m1, m2) {
  return (h < 60 ? m1 + (m2 - m1) * h / 60 : h < 180 ? m2 : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60 : m1) * 255;
}
const radians = Math.PI / 180;
const degrees = 180 / Math.PI;
var A$2 = -0.14861, B$2 = 1.78277, C$2 = -0.29227, D$1 = -0.90649, E$2 = 1.97294, ED = E$2 * D$1, EB = E$2 * B$2, BC_DA = B$2 * C$2 - D$1 * A$2;
function cubehelixConvert(o2) {
  if (o2 instanceof Cubehelix)
    return new Cubehelix(o2.h, o2.s, o2.l, o2.opacity);
  if (!(o2 instanceof Rgb))
    o2 = rgbConvert(o2);
  var r2 = o2.r / 255, g2 = o2.g / 255, b2 = o2.b / 255, l2 = (BC_DA * b2 + ED * r2 - EB * g2) / (BC_DA + ED - EB), bl = b2 - l2, k2 = (E$2 * (g2 - l2) - C$2 * bl) / D$1, s = Math.sqrt(k2 * k2 + bl * bl) / (E$2 * l2 * (1 - l2)), h = s ? Math.atan2(k2, bl) * degrees - 120 : NaN;
  return new Cubehelix(h < 0 ? h + 360 : h, s, l2, o2.opacity);
}
function cubehelix$1(h, s, l2, opacity) {
  return arguments.length === 1 ? cubehelixConvert(h) : new Cubehelix(h, s, l2, opacity == null ? 1 : opacity);
}
function Cubehelix(h, s, l2, opacity) {
  this.h = +h;
  this.s = +s;
  this.l = +l2;
  this.opacity = +opacity;
}
define(Cubehelix, cubehelix$1, extend(Color, {
  brighter(k2) {
    k2 = k2 == null ? brighter : Math.pow(brighter, k2);
    return new Cubehelix(this.h, this.s, this.l * k2, this.opacity);
  },
  darker(k2) {
    k2 = k2 == null ? darker : Math.pow(darker, k2);
    return new Cubehelix(this.h, this.s, this.l * k2, this.opacity);
  },
  rgb() {
    var h = isNaN(this.h) ? 0 : (this.h + 120) * radians, l2 = +this.l, a2 = isNaN(this.s) ? 0 : this.s * l2 * (1 - l2), cosh = Math.cos(h), sinh = Math.sin(h);
    return new Rgb(
      255 * (l2 + a2 * (A$2 * cosh + B$2 * sinh)),
      255 * (l2 + a2 * (C$2 * cosh + D$1 * sinh)),
      255 * (l2 + a2 * (E$2 * cosh)),
      this.opacity
    );
  }
}));
function basis(t12, v0, v1, v2, v3) {
  var t2 = t12 * t12, t3 = t2 * t12;
  return ((1 - 3 * t12 + 3 * t2 - t3) * v0 + (4 - 6 * t2 + 3 * t3) * v1 + (1 + 3 * t12 + 3 * t2 - 3 * t3) * v2 + t3 * v3) / 6;
}
function basis$1(values) {
  var n2 = values.length - 1;
  return function(t2) {
    var i2 = t2 <= 0 ? t2 = 0 : t2 >= 1 ? (t2 = 1, n2 - 1) : Math.floor(t2 * n2), v1 = values[i2], v2 = values[i2 + 1], v0 = i2 > 0 ? values[i2 - 1] : 2 * v1 - v2, v3 = i2 < n2 - 1 ? values[i2 + 2] : 2 * v2 - v1;
    return basis((t2 - i2 / n2) * n2, v0, v1, v2, v3);
  };
}
const constant$1 = (x2) => () => x2;
function linear$1(a2, d) {
  return function(t2) {
    return a2 + t2 * d;
  };
}
function exponential(a2, b2, y) {
  return a2 = Math.pow(a2, y), b2 = Math.pow(b2, y) - a2, y = 1 / y, function(t2) {
    return Math.pow(a2 + t2 * b2, y);
  };
}
function hue(a2, b2) {
  var d = b2 - a2;
  return d ? linear$1(a2, d > 180 || d < -180 ? d - 360 * Math.round(d / 360) : d) : constant$1(isNaN(a2) ? b2 : a2);
}
function gamma(y) {
  return (y = +y) === 1 ? nogamma : function(a2, b2) {
    return b2 - a2 ? exponential(a2, b2, y) : constant$1(isNaN(a2) ? b2 : a2);
  };
}
function nogamma(a2, b2) {
  var d = b2 - a2;
  return d ? linear$1(a2, d) : constant$1(isNaN(a2) ? b2 : a2);
}
const rgb = function rgbGamma(y) {
  var color2 = gamma(y);
  function rgb2(start2, end) {
    var r2 = color2((start2 = rgb$1(start2)).r, (end = rgb$1(end)).r), g2 = color2(start2.g, end.g), b2 = color2(start2.b, end.b), opacity = nogamma(start2.opacity, end.opacity);
    return function(t2) {
      start2.r = r2(t2);
      start2.g = g2(t2);
      start2.b = b2(t2);
      start2.opacity = opacity(t2);
      return start2 + "";
    };
  }
  rgb2.gamma = rgbGamma;
  return rgb2;
}(1);
function rgbSpline(spline) {
  return function(colors3) {
    var n2 = colors3.length, r2 = new Array(n2), g2 = new Array(n2), b2 = new Array(n2), i2, color2;
    for (i2 = 0; i2 < n2; ++i2) {
      color2 = rgb$1(colors3[i2]);
      r2[i2] = color2.r || 0;
      g2[i2] = color2.g || 0;
      b2[i2] = color2.b || 0;
    }
    r2 = spline(r2);
    g2 = spline(g2);
    b2 = spline(b2);
    color2.opacity = 1;
    return function(t2) {
      color2.r = r2(t2);
      color2.g = g2(t2);
      color2.b = b2(t2);
      return color2 + "";
    };
  };
}
var rgbBasis = rgbSpline(basis$1);
function numberArray(a2, b2) {
  if (!b2)
    b2 = [];
  var n2 = a2 ? Math.min(b2.length, a2.length) : 0, c6 = b2.slice(), i2;
  return function(t2) {
    for (i2 = 0; i2 < n2; ++i2)
      c6[i2] = a2[i2] * (1 - t2) + b2[i2] * t2;
    return c6;
  };
}
function isNumberArray(x2) {
  return ArrayBuffer.isView(x2) && !(x2 instanceof DataView);
}
function genericArray(a2, b2) {
  var nb = b2 ? b2.length : 0, na = a2 ? Math.min(nb, a2.length) : 0, x2 = new Array(na), c6 = new Array(nb), i2;
  for (i2 = 0; i2 < na; ++i2)
    x2[i2] = interpolate(a2[i2], b2[i2]);
  for (; i2 < nb; ++i2)
    c6[i2] = b2[i2];
  return function(t2) {
    for (i2 = 0; i2 < na; ++i2)
      c6[i2] = x2[i2](t2);
    return c6;
  };
}
function date$1(a2, b2) {
  var d = /* @__PURE__ */ new Date();
  return a2 = +a2, b2 = +b2, function(t2) {
    return d.setTime(a2 * (1 - t2) + b2 * t2), d;
  };
}
function interpolateNumber(a2, b2) {
  return a2 = +a2, b2 = +b2, function(t2) {
    return a2 * (1 - t2) + b2 * t2;
  };
}
function object(a2, b2) {
  var i2 = {}, c6 = {}, k2;
  if (a2 === null || typeof a2 !== "object")
    a2 = {};
  if (b2 === null || typeof b2 !== "object")
    b2 = {};
  for (k2 in b2) {
    if (k2 in a2) {
      i2[k2] = interpolate(a2[k2], b2[k2]);
    } else {
      c6[k2] = b2[k2];
    }
  }
  return function(t2) {
    for (k2 in i2)
      c6[k2] = i2[k2](t2);
    return c6;
  };
}
var reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, reB = new RegExp(reA.source, "g");
function zero$1(b2) {
  return function() {
    return b2;
  };
}
function one(b2) {
  return function(t2) {
    return b2(t2) + "";
  };
}
function _$3(a2, b2) {
  var bi = reA.lastIndex = reB.lastIndex = 0, am, bm, bs, i2 = -1, s = [], q2 = [];
  a2 = a2 + "", b2 = b2 + "";
  while ((am = reA.exec(a2)) && (bm = reB.exec(b2))) {
    if ((bs = bm.index) > bi) {
      bs = b2.slice(bi, bs);
      if (s[i2])
        s[i2] += bs;
      else
        s[++i2] = bs;
    }
    if ((am = am[0]) === (bm = bm[0])) {
      if (s[i2])
        s[i2] += bm;
      else
        s[++i2] = bm;
    } else {
      s[++i2] = null;
      q2.push({ i: i2, x: interpolateNumber(am, bm) });
    }
    bi = reB.lastIndex;
  }
  if (bi < b2.length) {
    bs = b2.slice(bi);
    if (s[i2])
      s[i2] += bs;
    else
      s[++i2] = bs;
  }
  return s.length < 2 ? q2[0] ? one(q2[0].x) : zero$1(b2) : (b2 = q2.length, function(t2) {
    for (var i3 = 0, o2; i3 < b2; ++i3)
      s[(o2 = q2[i3]).i] = o2.x(t2);
    return s.join("");
  });
}
function interpolate(a2, b2) {
  var t2 = typeof b2, c6;
  return b2 == null || t2 === "boolean" ? constant$1(b2) : (t2 === "number" ? interpolateNumber : t2 === "string" ? (c6 = color(b2)) ? (b2 = c6, rgb) : _$3 : b2 instanceof color ? rgb : b2 instanceof Date ? date$1 : isNumberArray(b2) ? numberArray : Array.isArray(b2) ? genericArray : typeof b2.valueOf !== "function" && typeof b2.toString !== "function" || isNaN(b2) ? object : interpolateNumber)(a2, b2);
}
function interpolateRound(a2, b2) {
  return a2 = +a2, b2 = +b2, function(t2) {
    return Math.round(a2 * (1 - t2) + b2 * t2);
  };
}
function cubehelix(hue2) {
  return function cubehelixGamma(y) {
    y = +y;
    function cubehelix2(start2, end) {
      var h = hue2((start2 = cubehelix$1(start2)).h, (end = cubehelix$1(end)).h), s = nogamma(start2.s, end.s), l2 = nogamma(start2.l, end.l), opacity = nogamma(start2.opacity, end.opacity);
      return function(t2) {
        start2.h = h(t2);
        start2.s = s(t2);
        start2.l = l2(Math.pow(t2, y));
        start2.opacity = opacity(t2);
        return start2 + "";
      };
    }
    cubehelix2.gamma = cubehelixGamma;
    return cubehelix2;
  }(1);
}
cubehelix(hue);
var cubehelixLong = cubehelix(nogamma);
var isCustomPropRE$3 = /^--/;
function dangerousStyleValue$3(name, value) {
  if (value == null || typeof value === "boolean" || value === "")
    return "";
  if (typeof value === "number" && value !== 0 && !isCustomPropRE$3.test(name) && !(isUnitlessNumber$3.hasOwnProperty(name) && isUnitlessNumber$3[name]))
    return value + "px";
  return ("" + value).trim();
}
var attributeCache$3 = {};
function applyAnimatedValues$3(instance, props) {
  if (!instance.nodeType || !instance.setAttribute) {
    return false;
  }
  const isFilterElement = instance.nodeName === "filter" || instance.parentNode && instance.parentNode.nodeName === "filter";
  const { style, children, scrollTop, scrollLeft, viewBox, ...attributes } = props;
  const values = Object.values(attributes);
  const names = Object.keys(attributes).map(
    (name) => isFilterElement || instance.hasAttribute(name) ? name : attributeCache$3[name] || (attributeCache$3[name] = name.replace(
      /([A-Z])/g,
      // Attributes are written in dash case
      (n2) => "-" + n2.toLowerCase()
    ))
  );
  if (children !== void 0) {
    instance.textContent = children;
  }
  for (const name in style) {
    if (style.hasOwnProperty(name)) {
      const value = dangerousStyleValue$3(name, style[name]);
      if (isCustomPropRE$3.test(name)) {
        instance.style.setProperty(name, value);
      } else {
        instance.style[name] = value;
      }
    }
  }
  names.forEach((name, i2) => {
    instance.setAttribute(name, values[i2]);
  });
  if (scrollTop !== void 0) {
    instance.scrollTop = scrollTop;
  }
  if (scrollLeft !== void 0) {
    instance.scrollLeft = scrollLeft;
  }
  if (viewBox !== void 0) {
    instance.setAttribute("viewBox", viewBox);
  }
}
var isUnitlessNumber$3 = {
  animationIterationCount: true,
  borderImageOutset: true,
  borderImageSlice: true,
  borderImageWidth: true,
  boxFlex: true,
  boxFlexGroup: true,
  boxOrdinalGroup: true,
  columnCount: true,
  columns: true,
  flex: true,
  flexGrow: true,
  flexPositive: true,
  flexShrink: true,
  flexNegative: true,
  flexOrder: true,
  gridRow: true,
  gridRowEnd: true,
  gridRowSpan: true,
  gridRowStart: true,
  gridColumn: true,
  gridColumnEnd: true,
  gridColumnSpan: true,
  gridColumnStart: true,
  fontWeight: true,
  lineClamp: true,
  lineHeight: true,
  opacity: true,
  order: true,
  orphans: true,
  tabSize: true,
  widows: true,
  zIndex: true,
  zoom: true,
  // SVG-related properties
  fillOpacity: true,
  floodOpacity: true,
  stopOpacity: true,
  strokeDasharray: true,
  strokeDashoffset: true,
  strokeMiterlimit: true,
  strokeOpacity: true,
  strokeWidth: true
};
var prefixKey$3 = (prefix2, key) => prefix2 + key.charAt(0).toUpperCase() + key.substring(1);
var prefixes$4 = ["Webkit", "Ms", "Moz", "O"];
isUnitlessNumber$3 = Object.keys(isUnitlessNumber$3).reduce((acc, prop) => {
  prefixes$4.forEach((prefix2) => acc[prefixKey$3(prefix2, prop)] = acc[prop]);
  return acc;
}, isUnitlessNumber$3);
var domTransforms$3 = /^(matrix|translate|scale|rotate|skew)/;
var pxTransforms$3 = /^(translate)/;
var degTransforms$3 = /^(rotate|skew)/;
var addUnit$3 = (value, unit2) => is.num(value) && value !== 0 ? value + unit2 : value;
var isValueIdentity$3 = (value, id) => is.arr(value) ? value.every((v2) => isValueIdentity$3(v2, id)) : is.num(value) ? value === id : parseFloat(value) === id;
var AnimatedStyle$3 = class AnimatedStyle2 extends AnimatedObject {
  constructor({ x: x2, y, z: z2, ...style }) {
    const inputs = [];
    const transforms = [];
    if (x2 || y || z2) {
      inputs.push([x2 || 0, y || 0, z2 || 0]);
      transforms.push((xyz) => [
        `translate3d(${xyz.map((v2) => addUnit$3(v2, "px")).join(",")})`,
        // prettier-ignore
        isValueIdentity$3(xyz, 0)
      ]);
    }
    eachProp(style, (value, key) => {
      if (key === "transform") {
        inputs.push([value || ""]);
        transforms.push((transform) => [transform, transform === ""]);
      } else if (domTransforms$3.test(key)) {
        delete style[key];
        if (is.und(value))
          return;
        const unit2 = pxTransforms$3.test(key) ? "px" : degTransforms$3.test(key) ? "deg" : "";
        inputs.push(toArray(value));
        transforms.push(
          key === "rotate3d" ? ([x22, y2, z22, deg]) => [
            `rotate3d(${x22},${y2},${z22},${addUnit$3(deg, unit2)})`,
            isValueIdentity$3(deg, 0)
          ] : (input) => [
            `${key}(${input.map((v2) => addUnit$3(v2, unit2)).join(",")})`,
            isValueIdentity$3(input, key.startsWith("scale") ? 1 : 0)
          ]
        );
      }
    });
    if (inputs.length) {
      style.transform = new FluidTransform$3(inputs, transforms);
    }
    super(style);
  }
};
var FluidTransform$3 = class FluidTransform2 extends FluidValue {
  constructor(inputs, transforms) {
    super();
    this.inputs = inputs;
    this.transforms = transforms;
    this._value = null;
  }
  get() {
    return this._value || (this._value = this._get());
  }
  _get() {
    let transform = "";
    let identity2 = true;
    each(this.inputs, (input, i2) => {
      const arg1 = getFluidValue(input[0]);
      const [t2, id] = this.transforms[i2](
        is.arr(arg1) ? arg1 : input.map(getFluidValue)
      );
      transform += " " + t2;
      identity2 = identity2 && id;
    });
    return identity2 ? "none" : transform;
  }
  // Start observing our inputs once we have an observer.
  observerAdded(count) {
    if (count == 1)
      each(
        this.inputs,
        (input) => each(
          input,
          (value) => hasFluidValue(value) && addFluidObserver(value, this)
        )
      );
  }
  // Stop observing our inputs once we have no observers.
  observerRemoved(count) {
    if (count == 0)
      each(
        this.inputs,
        (input) => each(
          input,
          (value) => hasFluidValue(value) && removeFluidObserver(value, this)
        )
      );
  }
  eventObserved(event) {
    if (event.type == "change") {
      this._value = null;
    }
    callFluidObservers(this, event);
  }
};
var primitives$3 = [
  "a",
  "abbr",
  "address",
  "area",
  "article",
  "aside",
  "audio",
  "b",
  "base",
  "bdi",
  "bdo",
  "big",
  "blockquote",
  "body",
  "br",
  "button",
  "canvas",
  "caption",
  "cite",
  "code",
  "col",
  "colgroup",
  "data",
  "datalist",
  "dd",
  "del",
  "details",
  "dfn",
  "dialog",
  "div",
  "dl",
  "dt",
  "em",
  "embed",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "head",
  "header",
  "hgroup",
  "hr",
  "html",
  "i",
  "iframe",
  "img",
  "input",
  "ins",
  "kbd",
  "keygen",
  "label",
  "legend",
  "li",
  "link",
  "main",
  "map",
  "mark",
  "menu",
  "menuitem",
  "meta",
  "meter",
  "nav",
  "noscript",
  "object",
  "ol",
  "optgroup",
  "option",
  "output",
  "p",
  "param",
  "picture",
  "pre",
  "progress",
  "q",
  "rp",
  "rt",
  "ruby",
  "s",
  "samp",
  "script",
  "section",
  "select",
  "small",
  "source",
  "span",
  "strong",
  "style",
  "sub",
  "summary",
  "sup",
  "table",
  "tbody",
  "td",
  "textarea",
  "tfoot",
  "th",
  "thead",
  "time",
  "title",
  "tr",
  "track",
  "u",
  "ul",
  "var",
  "video",
  "wbr",
  // SVG
  "circle",
  "clipPath",
  "defs",
  "ellipse",
  "foreignObject",
  "g",
  "image",
  "line",
  "linearGradient",
  "mask",
  "path",
  "pattern",
  "polygon",
  "polyline",
  "radialGradient",
  "rect",
  "stop",
  "svg",
  "text",
  "tspan"
];
globals_exports.assign({
  batchedUpdates: reactDomExports.unstable_batchedUpdates,
  createStringInterpolator: createStringInterpolator2,
  colors: colors2
});
var host$3 = createHost(primitives$3, {
  applyAnimatedValues: applyAnimatedValues$3,
  createAnimatedStyle: (style) => new AnimatedStyle$3(style),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getComponentProps: ({ scrollTop, scrollLeft, ...props }) => props
});
var animated$3 = host$3.animated;
var baseGetTag$2 = _baseGetTag, isArray$8 = isArray_1, isObjectLike$4 = isObjectLike_1;
var stringTag$3 = "[object String]";
function isString(value) {
  return typeof value == "string" || !isArray$8(value) && isObjectLike$4(value) && baseGetTag$2(value) == stringTag$3;
}
var isString_1 = isString;
const O$4 = /* @__PURE__ */ getDefaultExportFromCjs(isString_1);
function last$1(array2) {
  var length = array2 == null ? 0 : array2.length;
  return length ? array2[length - 1] : void 0;
}
var last_1 = last$1;
const e$2 = /* @__PURE__ */ getDefaultExportFromCjs(last_1);
function ascending(a2, b2) {
  return a2 == null || b2 == null ? NaN : a2 < b2 ? -1 : a2 > b2 ? 1 : a2 >= b2 ? 0 : NaN;
}
function descending(a2, b2) {
  return a2 == null || b2 == null ? NaN : b2 < a2 ? -1 : b2 > a2 ? 1 : b2 >= a2 ? 0 : NaN;
}
function bisector(f2) {
  let compare1, compare2, delta;
  if (f2.length !== 2) {
    compare1 = ascending;
    compare2 = (d, x2) => ascending(f2(d), x2);
    delta = (d, x2) => f2(d) - x2;
  } else {
    compare1 = f2 === ascending || f2 === descending ? f2 : zero;
    compare2 = f2;
    delta = f2;
  }
  function left(a2, x2, lo = 0, hi = a2.length) {
    if (lo < hi) {
      if (compare1(x2, x2) !== 0)
        return hi;
      do {
        const mid = lo + hi >>> 1;
        if (compare2(a2[mid], x2) < 0)
          lo = mid + 1;
        else
          hi = mid;
      } while (lo < hi);
    }
    return lo;
  }
  function right(a2, x2, lo = 0, hi = a2.length) {
    if (lo < hi) {
      if (compare1(x2, x2) !== 0)
        return hi;
      do {
        const mid = lo + hi >>> 1;
        if (compare2(a2[mid], x2) <= 0)
          lo = mid + 1;
        else
          hi = mid;
      } while (lo < hi);
    }
    return lo;
  }
  function center(a2, x2, lo = 0, hi = a2.length) {
    const i2 = left(a2, x2, lo, hi - 1);
    return i2 > lo && delta(a2[i2 - 1], x2) > -delta(a2[i2], x2) ? i2 - 1 : i2;
  }
  return { left, center, right };
}
function zero() {
  return 0;
}
function number$2(x2) {
  return x2 === null ? NaN : +x2;
}
const ascendingBisect = bisector(ascending);
const bisectRight = ascendingBisect.right;
bisector(number$2).center;
class InternMap extends Map {
  constructor(entries, key = keyof) {
    super();
    Object.defineProperties(this, { _intern: { value: /* @__PURE__ */ new Map() }, _key: { value: key } });
    if (entries != null)
      for (const [key2, value] of entries)
        this.set(key2, value);
  }
  get(key) {
    return super.get(intern_get(this, key));
  }
  has(key) {
    return super.has(intern_get(this, key));
  }
  set(key, value) {
    return super.set(intern_set(this, key), value);
  }
  delete(key) {
    return super.delete(intern_delete(this, key));
  }
}
function intern_get({ _intern, _key }, value) {
  const key = _key(value);
  return _intern.has(key) ? _intern.get(key) : value;
}
function intern_set({ _intern, _key }, value) {
  const key = _key(value);
  if (_intern.has(key))
    return _intern.get(key);
  _intern.set(key, value);
  return value;
}
function intern_delete({ _intern, _key }, value) {
  const key = _key(value);
  if (_intern.has(key)) {
    value = _intern.get(key);
    _intern.delete(key);
  }
  return value;
}
function keyof(value) {
  return value !== null && typeof value === "object" ? value.valueOf() : value;
}
const e10 = Math.sqrt(50), e5 = Math.sqrt(10), e2 = Math.sqrt(2);
function tickSpec(start2, stop2, count) {
  const step = (stop2 - start2) / Math.max(0, count), power = Math.floor(Math.log10(step)), error = step / Math.pow(10, power), factor = error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1;
  let i1, i2, inc;
  if (power < 0) {
    inc = Math.pow(10, -power) / factor;
    i1 = Math.round(start2 * inc);
    i2 = Math.round(stop2 * inc);
    if (i1 / inc < start2)
      ++i1;
    if (i2 / inc > stop2)
      --i2;
    inc = -inc;
  } else {
    inc = Math.pow(10, power) * factor;
    i1 = Math.round(start2 / inc);
    i2 = Math.round(stop2 / inc);
    if (i1 * inc < start2)
      ++i1;
    if (i2 * inc > stop2)
      --i2;
  }
  if (i2 < i1 && 0.5 <= count && count < 2)
    return tickSpec(start2, stop2, count * 2);
  return [i1, i2, inc];
}
function ticks(start2, stop2, count) {
  stop2 = +stop2, start2 = +start2, count = +count;
  if (!(count > 0))
    return [];
  if (start2 === stop2)
    return [start2];
  const reverse = stop2 < start2, [i1, i2, inc] = reverse ? tickSpec(stop2, start2, count) : tickSpec(start2, stop2, count);
  if (!(i2 >= i1))
    return [];
  const n2 = i2 - i1 + 1, ticks2 = new Array(n2);
  if (reverse) {
    if (inc < 0)
      for (let i3 = 0; i3 < n2; ++i3)
        ticks2[i3] = (i2 - i3) / -inc;
    else
      for (let i3 = 0; i3 < n2; ++i3)
        ticks2[i3] = (i2 - i3) * inc;
  } else {
    if (inc < 0)
      for (let i3 = 0; i3 < n2; ++i3)
        ticks2[i3] = (i1 + i3) / -inc;
    else
      for (let i3 = 0; i3 < n2; ++i3)
        ticks2[i3] = (i1 + i3) * inc;
  }
  return ticks2;
}
function tickIncrement(start2, stop2, count) {
  stop2 = +stop2, start2 = +start2, count = +count;
  return tickSpec(start2, stop2, count)[2];
}
function tickStep(start2, stop2, count) {
  stop2 = +stop2, start2 = +start2, count = +count;
  const reverse = stop2 < start2, inc = reverse ? tickIncrement(stop2, start2, count) : tickIncrement(start2, stop2, count);
  return (reverse ? -1 : 1) * (inc < 0 ? 1 / -inc : inc);
}
function range(start2, stop2, step) {
  start2 = +start2, stop2 = +stop2, step = (n2 = arguments.length) < 2 ? (stop2 = start2, start2 = 0, 1) : n2 < 3 ? 1 : +step;
  var i2 = -1, n2 = Math.max(0, Math.ceil((stop2 - start2) / step)) | 0, range2 = new Array(n2);
  while (++i2 < n2) {
    range2[i2] = start2 + i2 * step;
  }
  return range2;
}
function initRange(domain, range2) {
  switch (arguments.length) {
    case 0:
      break;
    case 1:
      this.range(domain);
      break;
    default:
      this.range(range2).domain(domain);
      break;
  }
  return this;
}
const implicit = Symbol("implicit");
function ordinal() {
  var index = new InternMap(), domain = [], range2 = [], unknown = implicit;
  function scale(d) {
    let i2 = index.get(d);
    if (i2 === void 0) {
      if (unknown !== implicit)
        return unknown;
      index.set(d, i2 = domain.push(d) - 1);
    }
    return range2[i2 % range2.length];
  }
  scale.domain = function(_2) {
    if (!arguments.length)
      return domain.slice();
    domain = [], index = new InternMap();
    for (const value of _2) {
      if (index.has(value))
        continue;
      index.set(value, domain.push(value) - 1);
    }
    return scale;
  };
  scale.range = function(_2) {
    return arguments.length ? (range2 = Array.from(_2), scale) : range2.slice();
  };
  scale.unknown = function(_2) {
    return arguments.length ? (unknown = _2, scale) : unknown;
  };
  scale.copy = function() {
    return ordinal(domain, range2).unknown(unknown);
  };
  initRange.apply(scale, arguments);
  return scale;
}
function band() {
  var scale = ordinal().unknown(void 0), domain = scale.domain, ordinalRange = scale.range, r0 = 0, r1 = 1, step, bandwidth, round = false, paddingInner = 0, paddingOuter = 0, align = 0.5;
  delete scale.unknown;
  function rescale() {
    var n2 = domain().length, reverse = r1 < r0, start2 = reverse ? r1 : r0, stop2 = reverse ? r0 : r1;
    step = (stop2 - start2) / Math.max(1, n2 - paddingInner + paddingOuter * 2);
    if (round)
      step = Math.floor(step);
    start2 += (stop2 - start2 - step * (n2 - paddingInner)) * align;
    bandwidth = step * (1 - paddingInner);
    if (round)
      start2 = Math.round(start2), bandwidth = Math.round(bandwidth);
    var values = range(n2).map(function(i2) {
      return start2 + step * i2;
    });
    return ordinalRange(reverse ? values.reverse() : values);
  }
  scale.domain = function(_2) {
    return arguments.length ? (domain(_2), rescale()) : domain();
  };
  scale.range = function(_2) {
    return arguments.length ? ([r0, r1] = _2, r0 = +r0, r1 = +r1, rescale()) : [r0, r1];
  };
  scale.rangeRound = function(_2) {
    return [r0, r1] = _2, r0 = +r0, r1 = +r1, round = true, rescale();
  };
  scale.bandwidth = function() {
    return bandwidth;
  };
  scale.step = function() {
    return step;
  };
  scale.round = function(_2) {
    return arguments.length ? (round = !!_2, rescale()) : round;
  };
  scale.padding = function(_2) {
    return arguments.length ? (paddingInner = Math.min(1, paddingOuter = +_2), rescale()) : paddingInner;
  };
  scale.paddingInner = function(_2) {
    return arguments.length ? (paddingInner = Math.min(1, _2), rescale()) : paddingInner;
  };
  scale.paddingOuter = function(_2) {
    return arguments.length ? (paddingOuter = +_2, rescale()) : paddingOuter;
  };
  scale.align = function(_2) {
    return arguments.length ? (align = Math.max(0, Math.min(1, _2)), rescale()) : align;
  };
  scale.copy = function() {
    return band(domain(), [r0, r1]).round(round).paddingInner(paddingInner).paddingOuter(paddingOuter).align(align);
  };
  return initRange.apply(rescale(), arguments);
}
function pointish(scale) {
  var copy2 = scale.copy;
  scale.padding = scale.paddingOuter;
  delete scale.paddingInner;
  delete scale.paddingOuter;
  scale.copy = function() {
    return pointish(copy2());
  };
  return scale;
}
function point$4() {
  return pointish(band.apply(null, arguments).paddingInner(1));
}
function constants(x2) {
  return function() {
    return x2;
  };
}
function number$1(x2) {
  return +x2;
}
var unit = [0, 1];
function identity$3(x2) {
  return x2;
}
function normalize(a2, b2) {
  return (b2 -= a2 = +a2) ? function(x2) {
    return (x2 - a2) / b2;
  } : constants(isNaN(b2) ? NaN : 0.5);
}
function clamper(a2, b2) {
  var t2;
  if (a2 > b2)
    t2 = a2, a2 = b2, b2 = t2;
  return function(x2) {
    return Math.max(a2, Math.min(b2, x2));
  };
}
function bimap(domain, range2, interpolate2) {
  var d0 = domain[0], d1 = domain[1], r0 = range2[0], r1 = range2[1];
  if (d1 < d0)
    d0 = normalize(d1, d0), r0 = interpolate2(r1, r0);
  else
    d0 = normalize(d0, d1), r0 = interpolate2(r0, r1);
  return function(x2) {
    return r0(d0(x2));
  };
}
function polymap(domain, range2, interpolate2) {
  var j2 = Math.min(domain.length, range2.length) - 1, d = new Array(j2), r2 = new Array(j2), i2 = -1;
  if (domain[j2] < domain[0]) {
    domain = domain.slice().reverse();
    range2 = range2.slice().reverse();
  }
  while (++i2 < j2) {
    d[i2] = normalize(domain[i2], domain[i2 + 1]);
    r2[i2] = interpolate2(range2[i2], range2[i2 + 1]);
  }
  return function(x2) {
    var i3 = bisectRight(domain, x2, 1, j2) - 1;
    return r2[i3](d[i3](x2));
  };
}
function copy(source, target) {
  return target.domain(source.domain()).range(source.range()).interpolate(source.interpolate()).clamp(source.clamp()).unknown(source.unknown());
}
function transformer() {
  var domain = unit, range2 = unit, interpolate$12 = interpolate, transform, untransform, unknown, clamp2 = identity$3, piecewise, output, input;
  function rescale() {
    var n2 = Math.min(domain.length, range2.length);
    if (clamp2 !== identity$3)
      clamp2 = clamper(domain[0], domain[n2 - 1]);
    piecewise = n2 > 2 ? polymap : bimap;
    output = input = null;
    return scale;
  }
  function scale(x2) {
    return x2 == null || isNaN(x2 = +x2) ? unknown : (output || (output = piecewise(domain.map(transform), range2, interpolate$12)))(transform(clamp2(x2)));
  }
  scale.invert = function(y) {
    return clamp2(untransform((input || (input = piecewise(range2, domain.map(transform), interpolateNumber)))(y)));
  };
  scale.domain = function(_2) {
    return arguments.length ? (domain = Array.from(_2, number$1), rescale()) : domain.slice();
  };
  scale.range = function(_2) {
    return arguments.length ? (range2 = Array.from(_2), rescale()) : range2.slice();
  };
  scale.rangeRound = function(_2) {
    return range2 = Array.from(_2), interpolate$12 = interpolateRound, rescale();
  };
  scale.clamp = function(_2) {
    return arguments.length ? (clamp2 = _2 ? true : identity$3, rescale()) : clamp2 !== identity$3;
  };
  scale.interpolate = function(_2) {
    return arguments.length ? (interpolate$12 = _2, rescale()) : interpolate$12;
  };
  scale.unknown = function(_2) {
    return arguments.length ? (unknown = _2, scale) : unknown;
  };
  return function(t2, u2) {
    transform = t2, untransform = u2;
    return rescale();
  };
}
function continuous() {
  return transformer()(identity$3, identity$3);
}
function formatDecimal(x2) {
  return Math.abs(x2 = Math.round(x2)) >= 1e21 ? x2.toLocaleString("en").replace(/,/g, "") : x2.toString(10);
}
function formatDecimalParts(x2, p2) {
  if ((i2 = (x2 = p2 ? x2.toExponential(p2 - 1) : x2.toExponential()).indexOf("e")) < 0)
    return null;
  var i2, coefficient = x2.slice(0, i2);
  return [
    coefficient.length > 1 ? coefficient[0] + coefficient.slice(2) : coefficient,
    +x2.slice(i2 + 1)
  ];
}
function exponent(x2) {
  return x2 = formatDecimalParts(Math.abs(x2)), x2 ? x2[1] : NaN;
}
function formatGroup(grouping, thousands) {
  return function(value, width) {
    var i2 = value.length, t2 = [], j2 = 0, g2 = grouping[0], length = 0;
    while (i2 > 0 && g2 > 0) {
      if (length + g2 + 1 > width)
        g2 = Math.max(1, width - length);
      t2.push(value.substring(i2 -= g2, i2 + g2));
      if ((length += g2 + 1) > width)
        break;
      g2 = grouping[j2 = (j2 + 1) % grouping.length];
    }
    return t2.reverse().join(thousands);
  };
}
function formatNumerals(numerals) {
  return function(value) {
    return value.replace(/[0-9]/g, function(i2) {
      return numerals[+i2];
    });
  };
}
var re$1 = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
function formatSpecifier(specifier) {
  if (!(match = re$1.exec(specifier)))
    throw new Error("invalid format: " + specifier);
  var match;
  return new FormatSpecifier({
    fill: match[1],
    align: match[2],
    sign: match[3],
    symbol: match[4],
    zero: match[5],
    width: match[6],
    comma: match[7],
    precision: match[8] && match[8].slice(1),
    trim: match[9],
    type: match[10]
  });
}
formatSpecifier.prototype = FormatSpecifier.prototype;
function FormatSpecifier(specifier) {
  this.fill = specifier.fill === void 0 ? " " : specifier.fill + "";
  this.align = specifier.align === void 0 ? ">" : specifier.align + "";
  this.sign = specifier.sign === void 0 ? "-" : specifier.sign + "";
  this.symbol = specifier.symbol === void 0 ? "" : specifier.symbol + "";
  this.zero = !!specifier.zero;
  this.width = specifier.width === void 0 ? void 0 : +specifier.width;
  this.comma = !!specifier.comma;
  this.precision = specifier.precision === void 0 ? void 0 : +specifier.precision;
  this.trim = !!specifier.trim;
  this.type = specifier.type === void 0 ? "" : specifier.type + "";
}
FormatSpecifier.prototype.toString = function() {
  return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === void 0 ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision === void 0 ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type;
};
function formatTrim(s) {
  out:
    for (var n2 = s.length, i2 = 1, i0 = -1, i1; i2 < n2; ++i2) {
      switch (s[i2]) {
        case ".":
          i0 = i1 = i2;
          break;
        case "0":
          if (i0 === 0)
            i0 = i2;
          i1 = i2;
          break;
        default:
          if (!+s[i2])
            break out;
          if (i0 > 0)
            i0 = 0;
          break;
      }
    }
  return i0 > 0 ? s.slice(0, i0) + s.slice(i1 + 1) : s;
}
var prefixExponent;
function formatPrefixAuto(x2, p2) {
  var d = formatDecimalParts(x2, p2);
  if (!d)
    return x2 + "";
  var coefficient = d[0], exponent2 = d[1], i2 = exponent2 - (prefixExponent = Math.max(-8, Math.min(8, Math.floor(exponent2 / 3))) * 3) + 1, n2 = coefficient.length;
  return i2 === n2 ? coefficient : i2 > n2 ? coefficient + new Array(i2 - n2 + 1).join("0") : i2 > 0 ? coefficient.slice(0, i2) + "." + coefficient.slice(i2) : "0." + new Array(1 - i2).join("0") + formatDecimalParts(x2, Math.max(0, p2 + i2 - 1))[0];
}
function formatRounded(x2, p2) {
  var d = formatDecimalParts(x2, p2);
  if (!d)
    return x2 + "";
  var coefficient = d[0], exponent2 = d[1];
  return exponent2 < 0 ? "0." + new Array(-exponent2).join("0") + coefficient : coefficient.length > exponent2 + 1 ? coefficient.slice(0, exponent2 + 1) + "." + coefficient.slice(exponent2 + 1) : coefficient + new Array(exponent2 - coefficient.length + 2).join("0");
}
const formatTypes = {
  "%": function(x2, p2) {
    return (x2 * 100).toFixed(p2);
  },
  "b": function(x2) {
    return Math.round(x2).toString(2);
  },
  "c": function(x2) {
    return x2 + "";
  },
  "d": formatDecimal,
  "e": function(x2, p2) {
    return x2.toExponential(p2);
  },
  "f": function(x2, p2) {
    return x2.toFixed(p2);
  },
  "g": function(x2, p2) {
    return x2.toPrecision(p2);
  },
  "o": function(x2) {
    return Math.round(x2).toString(8);
  },
  "p": function(x2, p2) {
    return formatRounded(x2 * 100, p2);
  },
  "r": formatRounded,
  "s": formatPrefixAuto,
  "X": function(x2) {
    return Math.round(x2).toString(16).toUpperCase();
  },
  "x": function(x2) {
    return Math.round(x2).toString(16);
  }
};
function identity$2(x2) {
  return x2;
}
var map = Array.prototype.map, prefixes$3 = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];
function formatLocale$1(locale2) {
  var group = locale2.grouping === void 0 || locale2.thousands === void 0 ? identity$2 : formatGroup(map.call(locale2.grouping, Number), locale2.thousands + ""), currencyPrefix = locale2.currency === void 0 ? "" : locale2.currency[0] + "", currencySuffix = locale2.currency === void 0 ? "" : locale2.currency[1] + "", decimal = locale2.decimal === void 0 ? "." : locale2.decimal + "", numerals = locale2.numerals === void 0 ? identity$2 : formatNumerals(map.call(locale2.numerals, String)), percent = locale2.percent === void 0 ? "%" : locale2.percent + "", minus = locale2.minus === void 0 ? "-" : locale2.minus + "", nan = locale2.nan === void 0 ? "NaN" : locale2.nan + "";
  function newFormat(specifier) {
    specifier = formatSpecifier(specifier);
    var fill = specifier.fill, align = specifier.align, sign2 = specifier.sign, symbol = specifier.symbol, zero2 = specifier.zero, width = specifier.width, comma = specifier.comma, precision = specifier.precision, trim = specifier.trim, type = specifier.type;
    if (type === "n")
      comma = true, type = "g";
    else if (!formatTypes[type])
      precision === void 0 && (precision = 12), trim = true, type = "g";
    if (zero2 || fill === "0" && align === "=")
      zero2 = true, fill = "0", align = "=";
    var prefix2 = symbol === "$" ? currencyPrefix : symbol === "#" && /[boxX]/.test(type) ? "0" + type.toLowerCase() : "", suffix = symbol === "$" ? currencySuffix : /[%p]/.test(type) ? percent : "";
    var formatType = formatTypes[type], maybeSuffix = /[defgprs%]/.test(type);
    precision = precision === void 0 ? 6 : /[gprs]/.test(type) ? Math.max(1, Math.min(21, precision)) : Math.max(0, Math.min(20, precision));
    function format2(value) {
      var valuePrefix = prefix2, valueSuffix = suffix, i2, n2, c6;
      if (type === "c") {
        valueSuffix = formatType(value) + valueSuffix;
        value = "";
      } else {
        value = +value;
        var valueNegative = value < 0 || 1 / value < 0;
        value = isNaN(value) ? nan : formatType(Math.abs(value), precision);
        if (trim)
          value = formatTrim(value);
        if (valueNegative && +value === 0 && sign2 !== "+")
          valueNegative = false;
        valuePrefix = (valueNegative ? sign2 === "(" ? sign2 : minus : sign2 === "-" || sign2 === "(" ? "" : sign2) + valuePrefix;
        valueSuffix = (type === "s" ? prefixes$3[8 + prefixExponent / 3] : "") + valueSuffix + (valueNegative && sign2 === "(" ? ")" : "");
        if (maybeSuffix) {
          i2 = -1, n2 = value.length;
          while (++i2 < n2) {
            if (c6 = value.charCodeAt(i2), 48 > c6 || c6 > 57) {
              valueSuffix = (c6 === 46 ? decimal + value.slice(i2 + 1) : value.slice(i2)) + valueSuffix;
              value = value.slice(0, i2);
              break;
            }
          }
        }
      }
      if (comma && !zero2)
        value = group(value, Infinity);
      var length = valuePrefix.length + value.length + valueSuffix.length, padding = length < width ? new Array(width - length + 1).join(fill) : "";
      if (comma && zero2)
        value = group(padding + value, padding.length ? width - valueSuffix.length : Infinity), padding = "";
      switch (align) {
        case "<":
          value = valuePrefix + value + valueSuffix + padding;
          break;
        case "=":
          value = valuePrefix + padding + value + valueSuffix;
          break;
        case "^":
          value = padding.slice(0, length = padding.length >> 1) + valuePrefix + value + valueSuffix + padding.slice(length);
          break;
        default:
          value = padding + valuePrefix + value + valueSuffix;
          break;
      }
      return numerals(value);
    }
    format2.toString = function() {
      return specifier + "";
    };
    return format2;
  }
  function formatPrefix2(specifier, value) {
    var f2 = newFormat((specifier = formatSpecifier(specifier), specifier.type = "f", specifier)), e4 = Math.max(-8, Math.min(8, Math.floor(exponent(value) / 3))) * 3, k2 = Math.pow(10, -e4), prefix2 = prefixes$3[8 + e4 / 3];
    return function(value2) {
      return f2(k2 * value2) + prefix2;
    };
  }
  return {
    format: newFormat,
    formatPrefix: formatPrefix2
  };
}
var locale$1;
var format;
var formatPrefix;
defaultLocale$1({
  decimal: ".",
  thousands: ",",
  grouping: [3],
  currency: ["$", ""],
  minus: "-"
});
function defaultLocale$1(definition) {
  locale$1 = formatLocale$1(definition);
  format = locale$1.format;
  formatPrefix = locale$1.formatPrefix;
  return locale$1;
}
function precisionFixed(step) {
  return Math.max(0, -exponent(Math.abs(step)));
}
function precisionPrefix(step, value) {
  return Math.max(0, Math.max(-8, Math.min(8, Math.floor(exponent(value) / 3))) * 3 - exponent(Math.abs(step)));
}
function precisionRound(step, max) {
  step = Math.abs(step), max = Math.abs(max) - step;
  return Math.max(0, exponent(max) - exponent(step)) + 1;
}
function tickFormat(start2, stop2, count, specifier) {
  var step = tickStep(start2, stop2, count), precision;
  specifier = formatSpecifier(specifier == null ? ",f" : specifier);
  switch (specifier.type) {
    case "s": {
      var value = Math.max(Math.abs(start2), Math.abs(stop2));
      if (specifier.precision == null && !isNaN(precision = precisionPrefix(step, value)))
        specifier.precision = precision;
      return formatPrefix(specifier, value);
    }
    case "":
    case "e":
    case "g":
    case "p":
    case "r": {
      if (specifier.precision == null && !isNaN(precision = precisionRound(step, Math.max(Math.abs(start2), Math.abs(stop2)))))
        specifier.precision = precision - (specifier.type === "e");
      break;
    }
    case "f":
    case "%": {
      if (specifier.precision == null && !isNaN(precision = precisionFixed(step)))
        specifier.precision = precision - (specifier.type === "%") * 2;
      break;
    }
  }
  return format(specifier);
}
function linearish(scale) {
  var domain = scale.domain;
  scale.ticks = function(count) {
    var d = domain();
    return ticks(d[0], d[d.length - 1], count == null ? 10 : count);
  };
  scale.tickFormat = function(count, specifier) {
    var d = domain();
    return tickFormat(d[0], d[d.length - 1], count == null ? 10 : count, specifier);
  };
  scale.nice = function(count) {
    if (count == null)
      count = 10;
    var d = domain();
    var i0 = 0;
    var i1 = d.length - 1;
    var start2 = d[i0];
    var stop2 = d[i1];
    var prestep;
    var step;
    var maxIter = 10;
    if (stop2 < start2) {
      step = start2, start2 = stop2, stop2 = step;
      step = i0, i0 = i1, i1 = step;
    }
    while (maxIter-- > 0) {
      step = tickIncrement(start2, stop2, count);
      if (step === prestep) {
        d[i0] = start2;
        d[i1] = stop2;
        return domain(d);
      } else if (step > 0) {
        start2 = Math.floor(start2 / step) * step;
        stop2 = Math.ceil(stop2 / step) * step;
      } else if (step < 0) {
        start2 = Math.ceil(start2 * step) / step;
        stop2 = Math.floor(stop2 * step) / step;
      } else {
        break;
      }
      prestep = step;
    }
    return scale;
  };
  return scale;
}
function linear() {
  var scale = continuous();
  scale.copy = function() {
    return copy(scale, linear());
  };
  initRange.apply(scale, arguments);
  return linearish(scale);
}
function nice(domain, interval) {
  domain = domain.slice();
  var i0 = 0, i1 = domain.length - 1, x0 = domain[i0], x1 = domain[i1], t2;
  if (x1 < x0) {
    t2 = i0, i0 = i1, i1 = t2;
    t2 = x0, x0 = x1, x1 = t2;
  }
  domain[i0] = interval.floor(x0);
  domain[i1] = interval.ceil(x1);
  return domain;
}
function transformLog(x2) {
  return Math.log(x2);
}
function transformExp(x2) {
  return Math.exp(x2);
}
function transformLogn(x2) {
  return -Math.log(-x2);
}
function transformExpn(x2) {
  return -Math.exp(-x2);
}
function pow10(x2) {
  return isFinite(x2) ? +("1e" + x2) : x2 < 0 ? 0 : x2;
}
function powp(base) {
  return base === 10 ? pow10 : base === Math.E ? Math.exp : (x2) => Math.pow(base, x2);
}
function logp(base) {
  return base === Math.E ? Math.log : base === 10 && Math.log10 || base === 2 && Math.log2 || (base = Math.log(base), (x2) => Math.log(x2) / base);
}
function reflect(f2) {
  return (x2, k2) => -f2(-x2, k2);
}
function loggish(transform) {
  const scale = transform(transformLog, transformExp);
  const domain = scale.domain;
  let base = 10;
  let logs;
  let pows;
  function rescale() {
    logs = logp(base), pows = powp(base);
    if (domain()[0] < 0) {
      logs = reflect(logs), pows = reflect(pows);
      transform(transformLogn, transformExpn);
    } else {
      transform(transformLog, transformExp);
    }
    return scale;
  }
  scale.base = function(_2) {
    return arguments.length ? (base = +_2, rescale()) : base;
  };
  scale.domain = function(_2) {
    return arguments.length ? (domain(_2), rescale()) : domain();
  };
  scale.ticks = (count) => {
    const d = domain();
    let u2 = d[0];
    let v2 = d[d.length - 1];
    const r2 = v2 < u2;
    if (r2)
      [u2, v2] = [v2, u2];
    let i2 = logs(u2);
    let j2 = logs(v2);
    let k2;
    let t2;
    const n2 = count == null ? 10 : +count;
    let z2 = [];
    if (!(base % 1) && j2 - i2 < n2) {
      i2 = Math.floor(i2), j2 = Math.ceil(j2);
      if (u2 > 0)
        for (; i2 <= j2; ++i2) {
          for (k2 = 1; k2 < base; ++k2) {
            t2 = i2 < 0 ? k2 / pows(-i2) : k2 * pows(i2);
            if (t2 < u2)
              continue;
            if (t2 > v2)
              break;
            z2.push(t2);
          }
        }
      else
        for (; i2 <= j2; ++i2) {
          for (k2 = base - 1; k2 >= 1; --k2) {
            t2 = i2 > 0 ? k2 / pows(-i2) : k2 * pows(i2);
            if (t2 < u2)
              continue;
            if (t2 > v2)
              break;
            z2.push(t2);
          }
        }
      if (z2.length * 2 < n2)
        z2 = ticks(u2, v2, n2);
    } else {
      z2 = ticks(i2, j2, Math.min(j2 - i2, n2)).map(pows);
    }
    return r2 ? z2.reverse() : z2;
  };
  scale.tickFormat = (count, specifier) => {
    if (count == null)
      count = 10;
    if (specifier == null)
      specifier = base === 10 ? "s" : ",";
    if (typeof specifier !== "function") {
      if (!(base % 1) && (specifier = formatSpecifier(specifier)).precision == null)
        specifier.trim = true;
      specifier = format(specifier);
    }
    if (count === Infinity)
      return specifier;
    const k2 = Math.max(1, base * count / scale.ticks().length);
    return (d) => {
      let i2 = d / pows(Math.round(logs(d)));
      if (i2 * base < base - 0.5)
        i2 *= base;
      return i2 <= k2 ? specifier(d) : "";
    };
  };
  scale.nice = () => {
    return domain(nice(domain(), {
      floor: (x2) => pows(Math.floor(logs(x2))),
      ceil: (x2) => pows(Math.ceil(logs(x2)))
    }));
  };
  return scale;
}
function log() {
  const scale = loggish(transformer()).domain([1, 10]);
  scale.copy = () => copy(scale, log()).base(scale.base());
  initRange.apply(scale, arguments);
  return scale;
}
function transformSymlog(c6) {
  return function(x2) {
    return Math.sign(x2) * Math.log1p(Math.abs(x2 / c6));
  };
}
function transformSymexp(c6) {
  return function(x2) {
    return Math.sign(x2) * Math.expm1(Math.abs(x2)) * c6;
  };
}
function symlogish(transform) {
  var c6 = 1, scale = transform(transformSymlog(c6), transformSymexp(c6));
  scale.constant = function(_2) {
    return arguments.length ? transform(transformSymlog(c6 = +_2), transformSymexp(c6)) : c6;
  };
  return linearish(scale);
}
function symlog() {
  var scale = symlogish(transformer());
  scale.copy = function() {
    return copy(scale, symlog()).constant(scale.constant());
  };
  return initRange.apply(scale, arguments);
}
const t0$1 = /* @__PURE__ */ new Date(), t1$1 = /* @__PURE__ */ new Date();
function timeInterval(floori, offseti, count, field) {
  function interval(date2) {
    return floori(date2 = arguments.length === 0 ? /* @__PURE__ */ new Date() : /* @__PURE__ */ new Date(+date2)), date2;
  }
  interval.floor = (date2) => {
    return floori(date2 = /* @__PURE__ */ new Date(+date2)), date2;
  };
  interval.ceil = (date2) => {
    return floori(date2 = new Date(date2 - 1)), offseti(date2, 1), floori(date2), date2;
  };
  interval.round = (date2) => {
    const d0 = interval(date2), d1 = interval.ceil(date2);
    return date2 - d0 < d1 - date2 ? d0 : d1;
  };
  interval.offset = (date2, step) => {
    return offseti(date2 = /* @__PURE__ */ new Date(+date2), step == null ? 1 : Math.floor(step)), date2;
  };
  interval.range = (start2, stop2, step) => {
    const range2 = [];
    start2 = interval.ceil(start2);
    step = step == null ? 1 : Math.floor(step);
    if (!(start2 < stop2) || !(step > 0))
      return range2;
    let previous;
    do
      range2.push(previous = /* @__PURE__ */ new Date(+start2)), offseti(start2, step), floori(start2);
    while (previous < start2 && start2 < stop2);
    return range2;
  };
  interval.filter = (test) => {
    return timeInterval((date2) => {
      if (date2 >= date2)
        while (floori(date2), !test(date2))
          date2.setTime(date2 - 1);
    }, (date2, step) => {
      if (date2 >= date2) {
        if (step < 0)
          while (++step <= 0) {
            while (offseti(date2, -1), !test(date2)) {
            }
          }
        else
          while (--step >= 0) {
            while (offseti(date2, 1), !test(date2)) {
            }
          }
      }
    });
  };
  if (count) {
    interval.count = (start2, end) => {
      t0$1.setTime(+start2), t1$1.setTime(+end);
      floori(t0$1), floori(t1$1);
      return Math.floor(count(t0$1, t1$1));
    };
    interval.every = (step) => {
      step = Math.floor(step);
      return !isFinite(step) || !(step > 0) ? null : !(step > 1) ? interval : interval.filter(field ? (d) => field(d) % step === 0 : (d) => interval.count(0, d) % step === 0);
    };
  }
  return interval;
}
const millisecond$1 = timeInterval(() => {
}, (date2, step) => {
  date2.setTime(+date2 + step);
}, (start2, end) => {
  return end - start2;
});
millisecond$1.every = (k2) => {
  k2 = Math.floor(k2);
  if (!isFinite(k2) || !(k2 > 0))
    return null;
  if (!(k2 > 1))
    return millisecond$1;
  return timeInterval((date2) => {
    date2.setTime(Math.floor(date2 / k2) * k2);
  }, (date2, step) => {
    date2.setTime(+date2 + step * k2);
  }, (start2, end) => {
    return (end - start2) / k2;
  });
};
millisecond$1.range;
const durationSecond$1 = 1e3;
const durationMinute$1 = durationSecond$1 * 60;
const durationHour$1 = durationMinute$1 * 60;
const durationDay$1 = durationHour$1 * 24;
const durationWeek$1 = durationDay$1 * 7;
const durationMonth = durationDay$1 * 30;
const durationYear = durationDay$1 * 365;
const second$1 = timeInterval((date2) => {
  date2.setTime(date2 - date2.getMilliseconds());
}, (date2, step) => {
  date2.setTime(+date2 + step * durationSecond$1);
}, (start2, end) => {
  return (end - start2) / durationSecond$1;
}, (date2) => {
  return date2.getUTCSeconds();
});
second$1.range;
const timeMinute = timeInterval((date2) => {
  date2.setTime(date2 - date2.getMilliseconds() - date2.getSeconds() * durationSecond$1);
}, (date2, step) => {
  date2.setTime(+date2 + step * durationMinute$1);
}, (start2, end) => {
  return (end - start2) / durationMinute$1;
}, (date2) => {
  return date2.getMinutes();
});
timeMinute.range;
const utcMinute$1 = timeInterval((date2) => {
  date2.setUTCSeconds(0, 0);
}, (date2, step) => {
  date2.setTime(+date2 + step * durationMinute$1);
}, (start2, end) => {
  return (end - start2) / durationMinute$1;
}, (date2) => {
  return date2.getUTCMinutes();
});
utcMinute$1.range;
const timeHour = timeInterval((date2) => {
  date2.setTime(date2 - date2.getMilliseconds() - date2.getSeconds() * durationSecond$1 - date2.getMinutes() * durationMinute$1);
}, (date2, step) => {
  date2.setTime(+date2 + step * durationHour$1);
}, (start2, end) => {
  return (end - start2) / durationHour$1;
}, (date2) => {
  return date2.getHours();
});
timeHour.range;
const utcHour$1 = timeInterval((date2) => {
  date2.setUTCMinutes(0, 0, 0);
}, (date2, step) => {
  date2.setTime(+date2 + step * durationHour$1);
}, (start2, end) => {
  return (end - start2) / durationHour$1;
}, (date2) => {
  return date2.getUTCHours();
});
utcHour$1.range;
const timeDay = timeInterval(
  (date2) => date2.setHours(0, 0, 0, 0),
  (date2, step) => date2.setDate(date2.getDate() + step),
  (start2, end) => (end - start2 - (end.getTimezoneOffset() - start2.getTimezoneOffset()) * durationMinute$1) / durationDay$1,
  (date2) => date2.getDate() - 1
);
timeDay.range;
const utcDay$1 = timeInterval((date2) => {
  date2.setUTCHours(0, 0, 0, 0);
}, (date2, step) => {
  date2.setUTCDate(date2.getUTCDate() + step);
}, (start2, end) => {
  return (end - start2) / durationDay$1;
}, (date2) => {
  return date2.getUTCDate() - 1;
});
utcDay$1.range;
const unixDay = timeInterval((date2) => {
  date2.setUTCHours(0, 0, 0, 0);
}, (date2, step) => {
  date2.setUTCDate(date2.getUTCDate() + step);
}, (start2, end) => {
  return (end - start2) / durationDay$1;
}, (date2) => {
  return Math.floor(date2 / durationDay$1);
});
unixDay.range;
function timeWeekday(i2) {
  return timeInterval((date2) => {
    date2.setDate(date2.getDate() - (date2.getDay() + 7 - i2) % 7);
    date2.setHours(0, 0, 0, 0);
  }, (date2, step) => {
    date2.setDate(date2.getDate() + step * 7);
  }, (start2, end) => {
    return (end - start2 - (end.getTimezoneOffset() - start2.getTimezoneOffset()) * durationMinute$1) / durationWeek$1;
  });
}
const timeSunday = timeWeekday(0);
const timeMonday = timeWeekday(1);
const timeTuesday = timeWeekday(2);
const timeWednesday = timeWeekday(3);
const timeThursday = timeWeekday(4);
const timeFriday = timeWeekday(5);
const timeSaturday = timeWeekday(6);
timeSunday.range;
timeMonday.range;
timeTuesday.range;
timeWednesday.range;
timeThursday.range;
timeFriday.range;
timeSaturday.range;
function utcWeekday$1(i2) {
  return timeInterval((date2) => {
    date2.setUTCDate(date2.getUTCDate() - (date2.getUTCDay() + 7 - i2) % 7);
    date2.setUTCHours(0, 0, 0, 0);
  }, (date2, step) => {
    date2.setUTCDate(date2.getUTCDate() + step * 7);
  }, (start2, end) => {
    return (end - start2) / durationWeek$1;
  });
}
const utcSunday$1 = utcWeekday$1(0);
const utcMonday$1 = utcWeekday$1(1);
const utcTuesday$1 = utcWeekday$1(2);
const utcWednesday$1 = utcWeekday$1(3);
const utcThursday$1 = utcWeekday$1(4);
const utcFriday$1 = utcWeekday$1(5);
const utcSaturday$1 = utcWeekday$1(6);
utcSunday$1.range;
utcMonday$1.range;
utcTuesday$1.range;
utcWednesday$1.range;
utcThursday$1.range;
utcFriday$1.range;
utcSaturday$1.range;
const timeMonth = timeInterval((date2) => {
  date2.setDate(1);
  date2.setHours(0, 0, 0, 0);
}, (date2, step) => {
  date2.setMonth(date2.getMonth() + step);
}, (start2, end) => {
  return end.getMonth() - start2.getMonth() + (end.getFullYear() - start2.getFullYear()) * 12;
}, (date2) => {
  return date2.getMonth();
});
timeMonth.range;
const utcMonth$1 = timeInterval((date2) => {
  date2.setUTCDate(1);
  date2.setUTCHours(0, 0, 0, 0);
}, (date2, step) => {
  date2.setUTCMonth(date2.getUTCMonth() + step);
}, (start2, end) => {
  return end.getUTCMonth() - start2.getUTCMonth() + (end.getUTCFullYear() - start2.getUTCFullYear()) * 12;
}, (date2) => {
  return date2.getUTCMonth();
});
utcMonth$1.range;
const timeYear = timeInterval((date2) => {
  date2.setMonth(0, 1);
  date2.setHours(0, 0, 0, 0);
}, (date2, step) => {
  date2.setFullYear(date2.getFullYear() + step);
}, (start2, end) => {
  return end.getFullYear() - start2.getFullYear();
}, (date2) => {
  return date2.getFullYear();
});
timeYear.every = (k2) => {
  return !isFinite(k2 = Math.floor(k2)) || !(k2 > 0) ? null : timeInterval((date2) => {
    date2.setFullYear(Math.floor(date2.getFullYear() / k2) * k2);
    date2.setMonth(0, 1);
    date2.setHours(0, 0, 0, 0);
  }, (date2, step) => {
    date2.setFullYear(date2.getFullYear() + step * k2);
  });
};
timeYear.range;
const utcYear$1 = timeInterval((date2) => {
  date2.setUTCMonth(0, 1);
  date2.setUTCHours(0, 0, 0, 0);
}, (date2, step) => {
  date2.setUTCFullYear(date2.getUTCFullYear() + step);
}, (start2, end) => {
  return end.getUTCFullYear() - start2.getUTCFullYear();
}, (date2) => {
  return date2.getUTCFullYear();
});
utcYear$1.every = (k2) => {
  return !isFinite(k2 = Math.floor(k2)) || !(k2 > 0) ? null : timeInterval((date2) => {
    date2.setUTCFullYear(Math.floor(date2.getUTCFullYear() / k2) * k2);
    date2.setUTCMonth(0, 1);
    date2.setUTCHours(0, 0, 0, 0);
  }, (date2, step) => {
    date2.setUTCFullYear(date2.getUTCFullYear() + step * k2);
  });
};
utcYear$1.range;
function ticker(year2, month2, week, day2, hour2, minute2) {
  const tickIntervals = [
    [second$1, 1, durationSecond$1],
    [second$1, 5, 5 * durationSecond$1],
    [second$1, 15, 15 * durationSecond$1],
    [second$1, 30, 30 * durationSecond$1],
    [minute2, 1, durationMinute$1],
    [minute2, 5, 5 * durationMinute$1],
    [minute2, 15, 15 * durationMinute$1],
    [minute2, 30, 30 * durationMinute$1],
    [hour2, 1, durationHour$1],
    [hour2, 3, 3 * durationHour$1],
    [hour2, 6, 6 * durationHour$1],
    [hour2, 12, 12 * durationHour$1],
    [day2, 1, durationDay$1],
    [day2, 2, 2 * durationDay$1],
    [week, 1, durationWeek$1],
    [month2, 1, durationMonth],
    [month2, 3, 3 * durationMonth],
    [year2, 1, durationYear]
  ];
  function ticks2(start2, stop2, count) {
    const reverse = stop2 < start2;
    if (reverse)
      [start2, stop2] = [stop2, start2];
    const interval = count && typeof count.range === "function" ? count : tickInterval(start2, stop2, count);
    const ticks3 = interval ? interval.range(start2, +stop2 + 1) : [];
    return reverse ? ticks3.reverse() : ticks3;
  }
  function tickInterval(start2, stop2, count) {
    const target = Math.abs(stop2 - start2) / count;
    const i2 = bisector(([, , step2]) => step2).right(tickIntervals, target);
    if (i2 === tickIntervals.length)
      return year2.every(tickStep(start2 / durationYear, stop2 / durationYear, count));
    if (i2 === 0)
      return millisecond$1.every(Math.max(tickStep(start2, stop2, count), 1));
    const [t2, step] = tickIntervals[target / tickIntervals[i2 - 1][2] < tickIntervals[i2][2] / target ? i2 - 1 : i2];
    return t2.every(step);
  }
  return [ticks2, tickInterval];
}
const [utcTicks, utcTickInterval] = ticker(utcYear$1, utcMonth$1, utcSunday$1, unixDay, utcHour$1, utcMinute$1);
const [timeTicks, timeTickInterval] = ticker(timeYear, timeMonth, timeSunday, timeDay, timeHour, timeMinute);
var t0 = /* @__PURE__ */ new Date(), t1 = /* @__PURE__ */ new Date();
function newInterval(floori, offseti, count, field) {
  function interval(date2) {
    return floori(date2 = arguments.length === 0 ? /* @__PURE__ */ new Date() : /* @__PURE__ */ new Date(+date2)), date2;
  }
  interval.floor = function(date2) {
    return floori(date2 = /* @__PURE__ */ new Date(+date2)), date2;
  };
  interval.ceil = function(date2) {
    return floori(date2 = new Date(date2 - 1)), offseti(date2, 1), floori(date2), date2;
  };
  interval.round = function(date2) {
    var d0 = interval(date2), d1 = interval.ceil(date2);
    return date2 - d0 < d1 - date2 ? d0 : d1;
  };
  interval.offset = function(date2, step) {
    return offseti(date2 = /* @__PURE__ */ new Date(+date2), step == null ? 1 : Math.floor(step)), date2;
  };
  interval.range = function(start2, stop2, step) {
    var range2 = [], previous;
    start2 = interval.ceil(start2);
    step = step == null ? 1 : Math.floor(step);
    if (!(start2 < stop2) || !(step > 0))
      return range2;
    do
      range2.push(previous = /* @__PURE__ */ new Date(+start2)), offseti(start2, step), floori(start2);
    while (previous < start2 && start2 < stop2);
    return range2;
  };
  interval.filter = function(test) {
    return newInterval(function(date2) {
      if (date2 >= date2)
        while (floori(date2), !test(date2))
          date2.setTime(date2 - 1);
    }, function(date2, step) {
      if (date2 >= date2) {
        if (step < 0)
          while (++step <= 0) {
            while (offseti(date2, -1), !test(date2)) {
            }
          }
        else
          while (--step >= 0) {
            while (offseti(date2, 1), !test(date2)) {
            }
          }
      }
    });
  };
  if (count) {
    interval.count = function(start2, end) {
      t0.setTime(+start2), t1.setTime(+end);
      floori(t0), floori(t1);
      return Math.floor(count(t0, t1));
    };
    interval.every = function(step) {
      step = Math.floor(step);
      return !isFinite(step) || !(step > 0) ? null : !(step > 1) ? interval : interval.filter(field ? function(d) {
        return field(d) % step === 0;
      } : function(d) {
        return interval.count(0, d) % step === 0;
      });
    };
  }
  return interval;
}
var millisecond = newInterval(function() {
}, function(date2, step) {
  date2.setTime(+date2 + step);
}, function(start2, end) {
  return end - start2;
});
millisecond.every = function(k2) {
  k2 = Math.floor(k2);
  if (!isFinite(k2) || !(k2 > 0))
    return null;
  if (!(k2 > 1))
    return millisecond;
  return newInterval(function(date2) {
    date2.setTime(Math.floor(date2 / k2) * k2);
  }, function(date2, step) {
    date2.setTime(+date2 + step * k2);
  }, function(start2, end) {
    return (end - start2) / k2;
  });
};
const p$2 = millisecond;
millisecond.range;
var durationSecond = 1e3;
var durationMinute = 6e4;
var durationHour = 36e5;
var durationDay = 864e5;
var durationWeek = 6048e5;
var second = newInterval(function(date2) {
  date2.setTime(date2 - date2.getMilliseconds());
}, function(date2, step) {
  date2.setTime(+date2 + step * durationSecond);
}, function(start2, end) {
  return (end - start2) / durationSecond;
}, function(date2) {
  return date2.getUTCSeconds();
});
const g$1 = second;
second.range;
var minute = newInterval(function(date2) {
  date2.setTime(date2 - date2.getMilliseconds() - date2.getSeconds() * durationSecond);
}, function(date2, step) {
  date2.setTime(+date2 + step * durationMinute);
}, function(start2, end) {
  return (end - start2) / durationMinute;
}, function(date2) {
  return date2.getMinutes();
});
const x$1 = minute;
minute.range;
var hour = newInterval(function(date2) {
  date2.setTime(date2 - date2.getMilliseconds() - date2.getSeconds() * durationSecond - date2.getMinutes() * durationMinute);
}, function(date2, step) {
  date2.setTime(+date2 + step * durationHour);
}, function(start2, end) {
  return (end - start2) / durationHour;
}, function(date2) {
  return date2.getHours();
});
const T$2 = hour;
hour.range;
var day = newInterval(function(date2) {
  date2.setHours(0, 0, 0, 0);
}, function(date2, step) {
  date2.setDate(date2.getDate() + step);
}, function(start2, end) {
  return (end - start2 - (end.getTimezoneOffset() - start2.getTimezoneOffset()) * durationMinute) / durationDay;
}, function(date2) {
  return date2.getDate() - 1;
});
day.range;
function weekday(i2) {
  return newInterval(function(date2) {
    date2.setDate(date2.getDate() - (date2.getDay() + 7 - i2) % 7);
    date2.setHours(0, 0, 0, 0);
  }, function(date2, step) {
    date2.setDate(date2.getDate() + step * 7);
  }, function(start2, end) {
    return (end - start2 - (end.getTimezoneOffset() - start2.getTimezoneOffset()) * durationMinute) / durationWeek;
  });
}
var sunday = weekday(0);
var monday = weekday(1);
var tuesday = weekday(2);
var wednesday = weekday(3);
var thursday = weekday(4);
var friday = weekday(5);
var saturday = weekday(6);
sunday.range;
monday.range;
tuesday.range;
wednesday.range;
thursday.range;
friday.range;
saturday.range;
var month = newInterval(function(date2) {
  date2.setDate(1);
  date2.setHours(0, 0, 0, 0);
}, function(date2, step) {
  date2.setMonth(date2.getMonth() + step);
}, function(start2, end) {
  return end.getMonth() - start2.getMonth() + (end.getFullYear() - start2.getFullYear()) * 12;
}, function(date2) {
  return date2.getMonth();
});
const N$2 = month;
month.range;
var year = newInterval(function(date2) {
  date2.setMonth(0, 1);
  date2.setHours(0, 0, 0, 0);
}, function(date2, step) {
  date2.setFullYear(date2.getFullYear() + step);
}, function(start2, end) {
  return end.getFullYear() - start2.getFullYear();
}, function(date2) {
  return date2.getFullYear();
});
year.every = function(k2) {
  return !isFinite(k2 = Math.floor(k2)) || !(k2 > 0) ? null : newInterval(function(date2) {
    date2.setFullYear(Math.floor(date2.getFullYear() / k2) * k2);
    date2.setMonth(0, 1);
    date2.setHours(0, 0, 0, 0);
  }, function(date2, step) {
    date2.setFullYear(date2.getFullYear() + step * k2);
  });
};
const I$1 = year;
year.range;
var utcMinute = newInterval(function(date2) {
  date2.setUTCSeconds(0, 0);
}, function(date2, step) {
  date2.setTime(+date2 + step * durationMinute);
}, function(start2, end) {
  return (end - start2) / durationMinute;
}, function(date2) {
  return date2.getUTCMinutes();
});
const k$3 = utcMinute;
utcMinute.range;
var utcHour = newInterval(function(date2) {
  date2.setUTCMinutes(0, 0, 0);
}, function(date2, step) {
  date2.setTime(+date2 + step * durationHour);
}, function(start2, end) {
  return (end - start2) / durationHour;
}, function(date2) {
  return date2.getUTCHours();
});
const b$3 = utcHour;
utcHour.range;
var utcDay = newInterval(function(date2) {
  date2.setUTCHours(0, 0, 0, 0);
}, function(date2, step) {
  date2.setUTCDate(date2.getUTCDate() + step);
}, function(start2, end) {
  return (end - start2) / durationDay;
}, function(date2) {
  return date2.getUTCDate() - 1;
});
utcDay.range;
function utcWeekday(i2) {
  return newInterval(function(date2) {
    date2.setUTCDate(date2.getUTCDate() - (date2.getUTCDay() + 7 - i2) % 7);
    date2.setUTCHours(0, 0, 0, 0);
  }, function(date2, step) {
    date2.setUTCDate(date2.getUTCDate() + step * 7);
  }, function(start2, end) {
    return (end - start2) / durationWeek;
  });
}
var utcSunday = utcWeekday(0);
var utcMonday = utcWeekday(1);
var utcTuesday = utcWeekday(2);
var utcWednesday = utcWeekday(3);
var utcThursday = utcWeekday(4);
var utcFriday = utcWeekday(5);
var utcSaturday = utcWeekday(6);
utcSunday.range;
utcMonday.range;
utcTuesday.range;
utcWednesday.range;
utcThursday.range;
utcFriday.range;
utcSaturday.range;
var utcMonth = newInterval(function(date2) {
  date2.setUTCDate(1);
  date2.setUTCHours(0, 0, 0, 0);
}, function(date2, step) {
  date2.setUTCMonth(date2.getUTCMonth() + step);
}, function(start2, end) {
  return end.getUTCMonth() - start2.getUTCMonth() + (end.getUTCFullYear() - start2.getUTCFullYear()) * 12;
}, function(date2) {
  return date2.getUTCMonth();
});
const z$4 = utcMonth;
utcMonth.range;
var utcYear = newInterval(function(date2) {
  date2.setUTCMonth(0, 1);
  date2.setUTCHours(0, 0, 0, 0);
}, function(date2, step) {
  date2.setUTCFullYear(date2.getUTCFullYear() + step);
}, function(start2, end) {
  return end.getUTCFullYear() - start2.getUTCFullYear();
}, function(date2) {
  return date2.getUTCFullYear();
});
utcYear.every = function(k2) {
  return !isFinite(k2 = Math.floor(k2)) || !(k2 > 0) ? null : newInterval(function(date2) {
    date2.setUTCFullYear(Math.floor(date2.getUTCFullYear() / k2) * k2);
    date2.setUTCMonth(0, 1);
    date2.setUTCHours(0, 0, 0, 0);
  }, function(date2, step) {
    date2.setUTCFullYear(date2.getUTCFullYear() + step * k2);
  });
};
const P$2 = utcYear;
utcYear.range;
function localDate(d) {
  if (0 <= d.y && d.y < 100) {
    var date2 = new Date(-1, d.m, d.d, d.H, d.M, d.S, d.L);
    date2.setFullYear(d.y);
    return date2;
  }
  return new Date(d.y, d.m, d.d, d.H, d.M, d.S, d.L);
}
function utcDate(d) {
  if (0 <= d.y && d.y < 100) {
    var date2 = new Date(Date.UTC(-1, d.m, d.d, d.H, d.M, d.S, d.L));
    date2.setUTCFullYear(d.y);
    return date2;
  }
  return new Date(Date.UTC(d.y, d.m, d.d, d.H, d.M, d.S, d.L));
}
function newDate(y, m2, d) {
  return { y, m: m2, d, H: 0, M: 0, S: 0, L: 0 };
}
function formatLocale(locale2) {
  var locale_dateTime = locale2.dateTime, locale_date = locale2.date, locale_time = locale2.time, locale_periods = locale2.periods, locale_weekdays = locale2.days, locale_shortWeekdays = locale2.shortDays, locale_months = locale2.months, locale_shortMonths = locale2.shortMonths;
  var periodRe = formatRe(locale_periods), periodLookup = formatLookup(locale_periods), weekdayRe = formatRe(locale_weekdays), weekdayLookup = formatLookup(locale_weekdays), shortWeekdayRe = formatRe(locale_shortWeekdays), shortWeekdayLookup = formatLookup(locale_shortWeekdays), monthRe = formatRe(locale_months), monthLookup = formatLookup(locale_months), shortMonthRe = formatRe(locale_shortMonths), shortMonthLookup = formatLookup(locale_shortMonths);
  var formats = {
    "a": formatShortWeekday,
    "A": formatWeekday,
    "b": formatShortMonth,
    "B": formatMonth,
    "c": null,
    "d": formatDayOfMonth,
    "e": formatDayOfMonth,
    "f": formatMicroseconds,
    "g": formatYearISO,
    "G": formatFullYearISO,
    "H": formatHour24,
    "I": formatHour12,
    "j": formatDayOfYear,
    "L": formatMilliseconds,
    "m": formatMonthNumber,
    "M": formatMinutes,
    "p": formatPeriod,
    "q": formatQuarter,
    "Q": formatUnixTimestamp,
    "s": formatUnixTimestampSeconds,
    "S": formatSeconds,
    "u": formatWeekdayNumberMonday,
    "U": formatWeekNumberSunday,
    "V": formatWeekNumberISO,
    "w": formatWeekdayNumberSunday,
    "W": formatWeekNumberMonday,
    "x": null,
    "X": null,
    "y": formatYear,
    "Y": formatFullYear,
    "Z": formatZone,
    "%": formatLiteralPercent
  };
  var utcFormats = {
    "a": formatUTCShortWeekday,
    "A": formatUTCWeekday,
    "b": formatUTCShortMonth,
    "B": formatUTCMonth,
    "c": null,
    "d": formatUTCDayOfMonth,
    "e": formatUTCDayOfMonth,
    "f": formatUTCMicroseconds,
    "g": formatUTCYearISO,
    "G": formatUTCFullYearISO,
    "H": formatUTCHour24,
    "I": formatUTCHour12,
    "j": formatUTCDayOfYear,
    "L": formatUTCMilliseconds,
    "m": formatUTCMonthNumber,
    "M": formatUTCMinutes,
    "p": formatUTCPeriod,
    "q": formatUTCQuarter,
    "Q": formatUnixTimestamp,
    "s": formatUnixTimestampSeconds,
    "S": formatUTCSeconds,
    "u": formatUTCWeekdayNumberMonday,
    "U": formatUTCWeekNumberSunday,
    "V": formatUTCWeekNumberISO,
    "w": formatUTCWeekdayNumberSunday,
    "W": formatUTCWeekNumberMonday,
    "x": null,
    "X": null,
    "y": formatUTCYear,
    "Y": formatUTCFullYear,
    "Z": formatUTCZone,
    "%": formatLiteralPercent
  };
  var parses = {
    "a": parseShortWeekday,
    "A": parseWeekday,
    "b": parseShortMonth,
    "B": parseMonth,
    "c": parseLocaleDateTime,
    "d": parseDayOfMonth,
    "e": parseDayOfMonth,
    "f": parseMicroseconds,
    "g": parseYear,
    "G": parseFullYear,
    "H": parseHour24,
    "I": parseHour24,
    "j": parseDayOfYear,
    "L": parseMilliseconds,
    "m": parseMonthNumber,
    "M": parseMinutes,
    "p": parsePeriod,
    "q": parseQuarter,
    "Q": parseUnixTimestamp,
    "s": parseUnixTimestampSeconds,
    "S": parseSeconds,
    "u": parseWeekdayNumberMonday,
    "U": parseWeekNumberSunday,
    "V": parseWeekNumberISO,
    "w": parseWeekdayNumberSunday,
    "W": parseWeekNumberMonday,
    "x": parseLocaleDate,
    "X": parseLocaleTime,
    "y": parseYear,
    "Y": parseFullYear,
    "Z": parseZone,
    "%": parseLiteralPercent
  };
  formats.x = newFormat(locale_date, formats);
  formats.X = newFormat(locale_time, formats);
  formats.c = newFormat(locale_dateTime, formats);
  utcFormats.x = newFormat(locale_date, utcFormats);
  utcFormats.X = newFormat(locale_time, utcFormats);
  utcFormats.c = newFormat(locale_dateTime, utcFormats);
  function newFormat(specifier, formats2) {
    return function(date2) {
      var string = [], i2 = -1, j2 = 0, n2 = specifier.length, c6, pad2, format2;
      if (!(date2 instanceof Date))
        date2 = /* @__PURE__ */ new Date(+date2);
      while (++i2 < n2) {
        if (specifier.charCodeAt(i2) === 37) {
          string.push(specifier.slice(j2, i2));
          if ((pad2 = pads[c6 = specifier.charAt(++i2)]) != null)
            c6 = specifier.charAt(++i2);
          else
            pad2 = c6 === "e" ? " " : "0";
          if (format2 = formats2[c6])
            c6 = format2(date2, pad2);
          string.push(c6);
          j2 = i2 + 1;
        }
      }
      string.push(specifier.slice(j2, i2));
      return string.join("");
    };
  }
  function newParse(specifier, Z2) {
    return function(string) {
      var d = newDate(1900, void 0, 1), i2 = parseSpecifier(d, specifier, string += "", 0), week, day$1;
      if (i2 != string.length)
        return null;
      if ("Q" in d)
        return new Date(d.Q);
      if ("s" in d)
        return new Date(d.s * 1e3 + ("L" in d ? d.L : 0));
      if (Z2 && !("Z" in d))
        d.Z = 0;
      if ("p" in d)
        d.H = d.H % 12 + d.p * 12;
      if (d.m === void 0)
        d.m = "q" in d ? d.q : 0;
      if ("V" in d) {
        if (d.V < 1 || d.V > 53)
          return null;
        if (!("w" in d))
          d.w = 1;
        if ("Z" in d) {
          week = utcDate(newDate(d.y, 0, 1)), day$1 = week.getUTCDay();
          week = day$1 > 4 || day$1 === 0 ? utcMonday.ceil(week) : utcMonday(week);
          week = utcDay.offset(week, (d.V - 1) * 7);
          d.y = week.getUTCFullYear();
          d.m = week.getUTCMonth();
          d.d = week.getUTCDate() + (d.w + 6) % 7;
        } else {
          week = localDate(newDate(d.y, 0, 1)), day$1 = week.getDay();
          week = day$1 > 4 || day$1 === 0 ? monday.ceil(week) : monday(week);
          week = day.offset(week, (d.V - 1) * 7);
          d.y = week.getFullYear();
          d.m = week.getMonth();
          d.d = week.getDate() + (d.w + 6) % 7;
        }
      } else if ("W" in d || "U" in d) {
        if (!("w" in d))
          d.w = "u" in d ? d.u % 7 : "W" in d ? 1 : 0;
        day$1 = "Z" in d ? utcDate(newDate(d.y, 0, 1)).getUTCDay() : localDate(newDate(d.y, 0, 1)).getDay();
        d.m = 0;
        d.d = "W" in d ? (d.w + 6) % 7 + d.W * 7 - (day$1 + 5) % 7 : d.w + d.U * 7 - (day$1 + 6) % 7;
      }
      if ("Z" in d) {
        d.H += d.Z / 100 | 0;
        d.M += d.Z % 100;
        return utcDate(d);
      }
      return localDate(d);
    };
  }
  function parseSpecifier(d, specifier, string, j2) {
    var i2 = 0, n2 = specifier.length, m2 = string.length, c6, parse;
    while (i2 < n2) {
      if (j2 >= m2)
        return -1;
      c6 = specifier.charCodeAt(i2++);
      if (c6 === 37) {
        c6 = specifier.charAt(i2++);
        parse = parses[c6 in pads ? specifier.charAt(i2++) : c6];
        if (!parse || (j2 = parse(d, string, j2)) < 0)
          return -1;
      } else if (c6 != string.charCodeAt(j2++)) {
        return -1;
      }
    }
    return j2;
  }
  function parsePeriod(d, string, i2) {
    var n2 = periodRe.exec(string.slice(i2));
    return n2 ? (d.p = periodLookup.get(n2[0].toLowerCase()), i2 + n2[0].length) : -1;
  }
  function parseShortWeekday(d, string, i2) {
    var n2 = shortWeekdayRe.exec(string.slice(i2));
    return n2 ? (d.w = shortWeekdayLookup.get(n2[0].toLowerCase()), i2 + n2[0].length) : -1;
  }
  function parseWeekday(d, string, i2) {
    var n2 = weekdayRe.exec(string.slice(i2));
    return n2 ? (d.w = weekdayLookup.get(n2[0].toLowerCase()), i2 + n2[0].length) : -1;
  }
  function parseShortMonth(d, string, i2) {
    var n2 = shortMonthRe.exec(string.slice(i2));
    return n2 ? (d.m = shortMonthLookup.get(n2[0].toLowerCase()), i2 + n2[0].length) : -1;
  }
  function parseMonth(d, string, i2) {
    var n2 = monthRe.exec(string.slice(i2));
    return n2 ? (d.m = monthLookup.get(n2[0].toLowerCase()), i2 + n2[0].length) : -1;
  }
  function parseLocaleDateTime(d, string, i2) {
    return parseSpecifier(d, locale_dateTime, string, i2);
  }
  function parseLocaleDate(d, string, i2) {
    return parseSpecifier(d, locale_date, string, i2);
  }
  function parseLocaleTime(d, string, i2) {
    return parseSpecifier(d, locale_time, string, i2);
  }
  function formatShortWeekday(d) {
    return locale_shortWeekdays[d.getDay()];
  }
  function formatWeekday(d) {
    return locale_weekdays[d.getDay()];
  }
  function formatShortMonth(d) {
    return locale_shortMonths[d.getMonth()];
  }
  function formatMonth(d) {
    return locale_months[d.getMonth()];
  }
  function formatPeriod(d) {
    return locale_periods[+(d.getHours() >= 12)];
  }
  function formatQuarter(d) {
    return 1 + ~~(d.getMonth() / 3);
  }
  function formatUTCShortWeekday(d) {
    return locale_shortWeekdays[d.getUTCDay()];
  }
  function formatUTCWeekday(d) {
    return locale_weekdays[d.getUTCDay()];
  }
  function formatUTCShortMonth(d) {
    return locale_shortMonths[d.getUTCMonth()];
  }
  function formatUTCMonth(d) {
    return locale_months[d.getUTCMonth()];
  }
  function formatUTCPeriod(d) {
    return locale_periods[+(d.getUTCHours() >= 12)];
  }
  function formatUTCQuarter(d) {
    return 1 + ~~(d.getUTCMonth() / 3);
  }
  return {
    format: function(specifier) {
      var f2 = newFormat(specifier += "", formats);
      f2.toString = function() {
        return specifier;
      };
      return f2;
    },
    parse: function(specifier) {
      var p2 = newParse(specifier += "", false);
      p2.toString = function() {
        return specifier;
      };
      return p2;
    },
    utcFormat: function(specifier) {
      var f2 = newFormat(specifier += "", utcFormats);
      f2.toString = function() {
        return specifier;
      };
      return f2;
    },
    utcParse: function(specifier) {
      var p2 = newParse(specifier += "", true);
      p2.toString = function() {
        return specifier;
      };
      return p2;
    }
  };
}
var pads = { "-": "", "_": " ", "0": "0" }, numberRe = /^\s*\d+/, percentRe = /^%/, requoteRe = /[\\^$*+?|[\]().{}]/g;
function pad(value, fill, width) {
  var sign2 = value < 0 ? "-" : "", string = (sign2 ? -value : value) + "", length = string.length;
  return sign2 + (length < width ? new Array(width - length + 1).join(fill) + string : string);
}
function requote(s) {
  return s.replace(requoteRe, "\\$&");
}
function formatRe(names) {
  return new RegExp("^(?:" + names.map(requote).join("|") + ")", "i");
}
function formatLookup(names) {
  return new Map(names.map((name, i2) => [name.toLowerCase(), i2]));
}
function parseWeekdayNumberSunday(d, string, i2) {
  var n2 = numberRe.exec(string.slice(i2, i2 + 1));
  return n2 ? (d.w = +n2[0], i2 + n2[0].length) : -1;
}
function parseWeekdayNumberMonday(d, string, i2) {
  var n2 = numberRe.exec(string.slice(i2, i2 + 1));
  return n2 ? (d.u = +n2[0], i2 + n2[0].length) : -1;
}
function parseWeekNumberSunday(d, string, i2) {
  var n2 = numberRe.exec(string.slice(i2, i2 + 2));
  return n2 ? (d.U = +n2[0], i2 + n2[0].length) : -1;
}
function parseWeekNumberISO(d, string, i2) {
  var n2 = numberRe.exec(string.slice(i2, i2 + 2));
  return n2 ? (d.V = +n2[0], i2 + n2[0].length) : -1;
}
function parseWeekNumberMonday(d, string, i2) {
  var n2 = numberRe.exec(string.slice(i2, i2 + 2));
  return n2 ? (d.W = +n2[0], i2 + n2[0].length) : -1;
}
function parseFullYear(d, string, i2) {
  var n2 = numberRe.exec(string.slice(i2, i2 + 4));
  return n2 ? (d.y = +n2[0], i2 + n2[0].length) : -1;
}
function parseYear(d, string, i2) {
  var n2 = numberRe.exec(string.slice(i2, i2 + 2));
  return n2 ? (d.y = +n2[0] + (+n2[0] > 68 ? 1900 : 2e3), i2 + n2[0].length) : -1;
}
function parseZone(d, string, i2) {
  var n2 = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(string.slice(i2, i2 + 6));
  return n2 ? (d.Z = n2[1] ? 0 : -(n2[2] + (n2[3] || "00")), i2 + n2[0].length) : -1;
}
function parseQuarter(d, string, i2) {
  var n2 = numberRe.exec(string.slice(i2, i2 + 1));
  return n2 ? (d.q = n2[0] * 3 - 3, i2 + n2[0].length) : -1;
}
function parseMonthNumber(d, string, i2) {
  var n2 = numberRe.exec(string.slice(i2, i2 + 2));
  return n2 ? (d.m = n2[0] - 1, i2 + n2[0].length) : -1;
}
function parseDayOfMonth(d, string, i2) {
  var n2 = numberRe.exec(string.slice(i2, i2 + 2));
  return n2 ? (d.d = +n2[0], i2 + n2[0].length) : -1;
}
function parseDayOfYear(d, string, i2) {
  var n2 = numberRe.exec(string.slice(i2, i2 + 3));
  return n2 ? (d.m = 0, d.d = +n2[0], i2 + n2[0].length) : -1;
}
function parseHour24(d, string, i2) {
  var n2 = numberRe.exec(string.slice(i2, i2 + 2));
  return n2 ? (d.H = +n2[0], i2 + n2[0].length) : -1;
}
function parseMinutes(d, string, i2) {
  var n2 = numberRe.exec(string.slice(i2, i2 + 2));
  return n2 ? (d.M = +n2[0], i2 + n2[0].length) : -1;
}
function parseSeconds(d, string, i2) {
  var n2 = numberRe.exec(string.slice(i2, i2 + 2));
  return n2 ? (d.S = +n2[0], i2 + n2[0].length) : -1;
}
function parseMilliseconds(d, string, i2) {
  var n2 = numberRe.exec(string.slice(i2, i2 + 3));
  return n2 ? (d.L = +n2[0], i2 + n2[0].length) : -1;
}
function parseMicroseconds(d, string, i2) {
  var n2 = numberRe.exec(string.slice(i2, i2 + 6));
  return n2 ? (d.L = Math.floor(n2[0] / 1e3), i2 + n2[0].length) : -1;
}
function parseLiteralPercent(d, string, i2) {
  var n2 = percentRe.exec(string.slice(i2, i2 + 1));
  return n2 ? i2 + n2[0].length : -1;
}
function parseUnixTimestamp(d, string, i2) {
  var n2 = numberRe.exec(string.slice(i2));
  return n2 ? (d.Q = +n2[0], i2 + n2[0].length) : -1;
}
function parseUnixTimestampSeconds(d, string, i2) {
  var n2 = numberRe.exec(string.slice(i2));
  return n2 ? (d.s = +n2[0], i2 + n2[0].length) : -1;
}
function formatDayOfMonth(d, p2) {
  return pad(d.getDate(), p2, 2);
}
function formatHour24(d, p2) {
  return pad(d.getHours(), p2, 2);
}
function formatHour12(d, p2) {
  return pad(d.getHours() % 12 || 12, p2, 2);
}
function formatDayOfYear(d, p2) {
  return pad(1 + day.count(I$1(d), d), p2, 3);
}
function formatMilliseconds(d, p2) {
  return pad(d.getMilliseconds(), p2, 3);
}
function formatMicroseconds(d, p2) {
  return formatMilliseconds(d, p2) + "000";
}
function formatMonthNumber(d, p2) {
  return pad(d.getMonth() + 1, p2, 2);
}
function formatMinutes(d, p2) {
  return pad(d.getMinutes(), p2, 2);
}
function formatSeconds(d, p2) {
  return pad(d.getSeconds(), p2, 2);
}
function formatWeekdayNumberMonday(d) {
  var day2 = d.getDay();
  return day2 === 0 ? 7 : day2;
}
function formatWeekNumberSunday(d, p2) {
  return pad(sunday.count(I$1(d) - 1, d), p2, 2);
}
function dISO(d) {
  var day2 = d.getDay();
  return day2 >= 4 || day2 === 0 ? thursday(d) : thursday.ceil(d);
}
function formatWeekNumberISO(d, p2) {
  d = dISO(d);
  return pad(thursday.count(I$1(d), d) + (I$1(d).getDay() === 4), p2, 2);
}
function formatWeekdayNumberSunday(d) {
  return d.getDay();
}
function formatWeekNumberMonday(d, p2) {
  return pad(monday.count(I$1(d) - 1, d), p2, 2);
}
function formatYear(d, p2) {
  return pad(d.getFullYear() % 100, p2, 2);
}
function formatYearISO(d, p2) {
  d = dISO(d);
  return pad(d.getFullYear() % 100, p2, 2);
}
function formatFullYear(d, p2) {
  return pad(d.getFullYear() % 1e4, p2, 4);
}
function formatFullYearISO(d, p2) {
  var day2 = d.getDay();
  d = day2 >= 4 || day2 === 0 ? thursday(d) : thursday.ceil(d);
  return pad(d.getFullYear() % 1e4, p2, 4);
}
function formatZone(d) {
  var z2 = d.getTimezoneOffset();
  return (z2 > 0 ? "-" : (z2 *= -1, "+")) + pad(z2 / 60 | 0, "0", 2) + pad(z2 % 60, "0", 2);
}
function formatUTCDayOfMonth(d, p2) {
  return pad(d.getUTCDate(), p2, 2);
}
function formatUTCHour24(d, p2) {
  return pad(d.getUTCHours(), p2, 2);
}
function formatUTCHour12(d, p2) {
  return pad(d.getUTCHours() % 12 || 12, p2, 2);
}
function formatUTCDayOfYear(d, p2) {
  return pad(1 + utcDay.count(P$2(d), d), p2, 3);
}
function formatUTCMilliseconds(d, p2) {
  return pad(d.getUTCMilliseconds(), p2, 3);
}
function formatUTCMicroseconds(d, p2) {
  return formatUTCMilliseconds(d, p2) + "000";
}
function formatUTCMonthNumber(d, p2) {
  return pad(d.getUTCMonth() + 1, p2, 2);
}
function formatUTCMinutes(d, p2) {
  return pad(d.getUTCMinutes(), p2, 2);
}
function formatUTCSeconds(d, p2) {
  return pad(d.getUTCSeconds(), p2, 2);
}
function formatUTCWeekdayNumberMonday(d) {
  var dow = d.getUTCDay();
  return dow === 0 ? 7 : dow;
}
function formatUTCWeekNumberSunday(d, p2) {
  return pad(utcSunday.count(P$2(d) - 1, d), p2, 2);
}
function UTCdISO(d) {
  var day2 = d.getUTCDay();
  return day2 >= 4 || day2 === 0 ? utcThursday(d) : utcThursday.ceil(d);
}
function formatUTCWeekNumberISO(d, p2) {
  d = UTCdISO(d);
  return pad(utcThursday.count(P$2(d), d) + (P$2(d).getUTCDay() === 4), p2, 2);
}
function formatUTCWeekdayNumberSunday(d) {
  return d.getUTCDay();
}
function formatUTCWeekNumberMonday(d, p2) {
  return pad(utcMonday.count(P$2(d) - 1, d), p2, 2);
}
function formatUTCYear(d, p2) {
  return pad(d.getUTCFullYear() % 100, p2, 2);
}
function formatUTCYearISO(d, p2) {
  d = UTCdISO(d);
  return pad(d.getUTCFullYear() % 100, p2, 2);
}
function formatUTCFullYear(d, p2) {
  return pad(d.getUTCFullYear() % 1e4, p2, 4);
}
function formatUTCFullYearISO(d, p2) {
  var day2 = d.getUTCDay();
  d = day2 >= 4 || day2 === 0 ? utcThursday(d) : utcThursday.ceil(d);
  return pad(d.getUTCFullYear() % 1e4, p2, 4);
}
function formatUTCZone() {
  return "+0000";
}
function formatLiteralPercent() {
  return "%";
}
function formatUnixTimestamp(d) {
  return +d;
}
function formatUnixTimestampSeconds(d) {
  return Math.floor(+d / 1e3);
}
var locale;
var timeFormat;
var timeParse;
var utcFormat;
var utcParse;
defaultLocale({
  dateTime: "%x, %X",
  date: "%-m/%-d/%Y",
  time: "%-I:%M:%S %p",
  periods: ["AM", "PM"],
  days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
});
function defaultLocale(definition) {
  locale = formatLocale(definition);
  timeFormat = locale.format;
  timeParse = locale.parse;
  utcFormat = locale.utcFormat;
  utcParse = locale.utcParse;
  return locale;
}
function date(t2) {
  return new Date(t2);
}
function number(t2) {
  return t2 instanceof Date ? +t2 : +/* @__PURE__ */ new Date(+t2);
}
function calendar(ticks2, tickInterval, year2, month2, week, day2, hour2, minute2, second2, format2) {
  var scale = continuous(), invert = scale.invert, domain = scale.domain;
  var formatMillisecond = format2(".%L"), formatSecond = format2(":%S"), formatMinute = format2("%I:%M"), formatHour = format2("%I %p"), formatDay = format2("%a %d"), formatWeek = format2("%b %d"), formatMonth = format2("%B"), formatYear2 = format2("%Y");
  function tickFormat2(date2) {
    return (second2(date2) < date2 ? formatMillisecond : minute2(date2) < date2 ? formatSecond : hour2(date2) < date2 ? formatMinute : day2(date2) < date2 ? formatHour : month2(date2) < date2 ? week(date2) < date2 ? formatDay : formatWeek : year2(date2) < date2 ? formatMonth : formatYear2)(date2);
  }
  scale.invert = function(y) {
    return new Date(invert(y));
  };
  scale.domain = function(_2) {
    return arguments.length ? domain(Array.from(_2, number)) : domain().map(date);
  };
  scale.ticks = function(interval) {
    var d = domain();
    return ticks2(d[0], d[d.length - 1], interval == null ? 10 : interval);
  };
  scale.tickFormat = function(count, specifier) {
    return specifier == null ? tickFormat2 : format2(specifier);
  };
  scale.nice = function(interval) {
    var d = domain();
    if (!interval || typeof interval.range !== "function")
      interval = tickInterval(d[0], d[d.length - 1], interval == null ? 10 : interval);
    return interval ? domain(nice(d, interval)) : scale;
  };
  scale.copy = function() {
    return copy(scale, calendar(ticks2, tickInterval, year2, month2, week, day2, hour2, minute2, second2, format2));
  };
  return scale;
}
function time() {
  return initRange.apply(calendar(timeTicks, timeTickInterval, timeYear, timeMonth, timeSunday, timeDay, timeHour, timeMinute, second$1, timeFormat).domain([new Date(2e3, 0, 1), new Date(2e3, 0, 2)]), arguments);
}
function utcTime() {
  return initRange.apply(calendar(utcTicks, utcTickInterval, utcYear$1, utcMonth$1, utcSunday$1, utcDay$1, utcHour$1, utcMinute$1, second$1, utcFormat).domain([Date.UTC(2e3, 0, 1), Date.UTC(2e3, 0, 2)]), arguments);
}
function colors(specifier) {
  var n2 = specifier.length / 6 | 0, colors3 = new Array(n2), i2 = 0;
  while (i2 < n2)
    colors3[i2] = "#" + specifier.slice(i2 * 6, ++i2 * 6);
  return colors3;
}
const e$1 = colors("1f77b4ff7f0e2ca02cd627289467bd8c564be377c27f7f7fbcbd2217becf");
const r = colors("7fc97fbeaed4fdc086ffff99386cb0f0027fbf5b17666666");
const n = colors("1b9e77d95f027570b3e7298a66a61ee6ab02a6761d666666");
const t = colors("a6cee31f78b4b2df8a33a02cfb9a99e31a1cfdbf6fff7f00cab2d66a3d9affff99b15928");
const o$1 = colors("fbb4aeb3cde3ccebc5decbe4fed9a6ffffcce5d8bdfddaecf2f2f2");
const i = colors("b3e2cdfdcdaccbd5e8f4cae4e6f5c9fff2aef1e2cccccccc");
const u$1 = colors("e41a1c377eb84daf4a984ea3ff7f00ffff33a65628f781bf999999");
const a$1 = colors("66c2a5fc8d628da0cbe78ac3a6d854ffd92fe5c494b3b3b3");
const l = colors("8dd3c7ffffb3bebadafb807280b1d3fdb462b3de69fccde5d9d9d9bc80bdccebc5ffed6f");
const c$2 = colors("4e79a7f28e2ce1575976b7b259a14fedc949af7aa1ff9da79c755fbab0ab");
const ramp$1 = (scheme2) => rgbBasis(scheme2[scheme2.length - 1]);
var scheme$q = new Array(3).concat(
  "d8b365f5f5f55ab4ac",
  "a6611adfc27d80cdc1018571",
  "a6611adfc27df5f5f580cdc1018571",
  "8c510ad8b365f6e8c3c7eae55ab4ac01665e",
  "8c510ad8b365f6e8c3f5f5f5c7eae55ab4ac01665e",
  "8c510abf812ddfc27df6e8c3c7eae580cdc135978f01665e",
  "8c510abf812ddfc27df6e8c3f5f5f5c7eae580cdc135978f01665e",
  "5430058c510abf812ddfc27df6e8c3c7eae580cdc135978f01665e003c30",
  "5430058c510abf812ddfc27df6e8c3f5f5f5c7eae580cdc135978f01665e003c30"
).map(colors);
const v$2 = ramp$1(scheme$q);
var scheme$p = new Array(3).concat(
  "af8dc3f7f7f77fbf7b",
  "7b3294c2a5cfa6dba0008837",
  "7b3294c2a5cff7f7f7a6dba0008837",
  "762a83af8dc3e7d4e8d9f0d37fbf7b1b7837",
  "762a83af8dc3e7d4e8f7f7f7d9f0d37fbf7b1b7837",
  "762a839970abc2a5cfe7d4e8d9f0d3a6dba05aae611b7837",
  "762a839970abc2a5cfe7d4e8f7f7f7d9f0d3a6dba05aae611b7837",
  "40004b762a839970abc2a5cfe7d4e8d9f0d3a6dba05aae611b783700441b",
  "40004b762a839970abc2a5cfe7d4e8f7f7f7d9f0d3a6dba05aae611b783700441b"
).map(colors);
const _$2 = ramp$1(scheme$p);
var scheme$o = new Array(3).concat(
  "e9a3c9f7f7f7a1d76a",
  "d01c8bf1b6dab8e1864dac26",
  "d01c8bf1b6daf7f7f7b8e1864dac26",
  "c51b7de9a3c9fde0efe6f5d0a1d76a4d9221",
  "c51b7de9a3c9fde0eff7f7f7e6f5d0a1d76a4d9221",
  "c51b7dde77aef1b6dafde0efe6f5d0b8e1867fbc414d9221",
  "c51b7dde77aef1b6dafde0eff7f7f7e6f5d0b8e1867fbc414d9221",
  "8e0152c51b7dde77aef1b6dafde0efe6f5d0b8e1867fbc414d9221276419",
  "8e0152c51b7dde77aef1b6dafde0eff7f7f7e6f5d0b8e1867fbc414d9221276419"
).map(colors);
const w$3 = ramp$1(scheme$o);
var scheme$n = new Array(3).concat(
  "998ec3f7f7f7f1a340",
  "5e3c99b2abd2fdb863e66101",
  "5e3c99b2abd2f7f7f7fdb863e66101",
  "542788998ec3d8daebfee0b6f1a340b35806",
  "542788998ec3d8daebf7f7f7fee0b6f1a340b35806",
  "5427888073acb2abd2d8daebfee0b6fdb863e08214b35806",
  "5427888073acb2abd2d8daebf7f7f7fee0b6fdb863e08214b35806",
  "2d004b5427888073acb2abd2d8daebfee0b6fdb863e08214b358067f3b08",
  "2d004b5427888073acb2abd2d8daebf7f7f7fee0b6fdb863e08214b358067f3b08"
).map(colors);
const k$2 = ramp$1(scheme$n);
var scheme$m = new Array(3).concat(
  "ef8a62f7f7f767a9cf",
  "ca0020f4a58292c5de0571b0",
  "ca0020f4a582f7f7f792c5de0571b0",
  "b2182bef8a62fddbc7d1e5f067a9cf2166ac",
  "b2182bef8a62fddbc7f7f7f7d1e5f067a9cf2166ac",
  "b2182bd6604df4a582fddbc7d1e5f092c5de4393c32166ac",
  "b2182bd6604df4a582fddbc7f7f7f7d1e5f092c5de4393c32166ac",
  "67001fb2182bd6604df4a582fddbc7d1e5f092c5de4393c32166ac053061",
  "67001fb2182bd6604df4a582fddbc7f7f7f7d1e5f092c5de4393c32166ac053061"
).map(colors);
const j$3 = ramp$1(scheme$m);
var scheme$l = new Array(3).concat(
  "ef8a62ffffff999999",
  "ca0020f4a582bababa404040",
  "ca0020f4a582ffffffbababa404040",
  "b2182bef8a62fddbc7e0e0e09999994d4d4d",
  "b2182bef8a62fddbc7ffffffe0e0e09999994d4d4d",
  "b2182bd6604df4a582fddbc7e0e0e0bababa8787874d4d4d",
  "b2182bd6604df4a582fddbc7ffffffe0e0e0bababa8787874d4d4d",
  "67001fb2182bd6604df4a582fddbc7e0e0e0bababa8787874d4d4d1a1a1a",
  "67001fb2182bd6604df4a582fddbc7ffffffe0e0e0bababa8787874d4d4d1a1a1a"
).map(colors);
const A$1 = ramp$1(scheme$l);
var scheme$k = new Array(3).concat(
  "fc8d59ffffbf91bfdb",
  "d7191cfdae61abd9e92c7bb6",
  "d7191cfdae61ffffbfabd9e92c7bb6",
  "d73027fc8d59fee090e0f3f891bfdb4575b4",
  "d73027fc8d59fee090ffffbfe0f3f891bfdb4575b4",
  "d73027f46d43fdae61fee090e0f3f8abd9e974add14575b4",
  "d73027f46d43fdae61fee090ffffbfe0f3f8abd9e974add14575b4",
  "a50026d73027f46d43fdae61fee090e0f3f8abd9e974add14575b4313695",
  "a50026d73027f46d43fdae61fee090ffffbfe0f3f8abd9e974add14575b4313695"
).map(colors);
const O$3 = ramp$1(scheme$k);
var scheme$j = new Array(3).concat(
  "fc8d59ffffbf91cf60",
  "d7191cfdae61a6d96a1a9641",
  "d7191cfdae61ffffbfa6d96a1a9641",
  "d73027fc8d59fee08bd9ef8b91cf601a9850",
  "d73027fc8d59fee08bffffbfd9ef8b91cf601a9850",
  "d73027f46d43fdae61fee08bd9ef8ba6d96a66bd631a9850",
  "d73027f46d43fdae61fee08bffffbfd9ef8ba6d96a66bd631a9850",
  "a50026d73027f46d43fdae61fee08bd9ef8ba6d96a66bd631a9850006837",
  "a50026d73027f46d43fdae61fee08bffffbfd9ef8ba6d96a66bd631a9850006837"
).map(colors);
const z$3 = ramp$1(scheme$j);
var scheme$i = new Array(3).concat(
  "fc8d59ffffbf99d594",
  "d7191cfdae61abdda42b83ba",
  "d7191cfdae61ffffbfabdda42b83ba",
  "d53e4ffc8d59fee08be6f59899d5943288bd",
  "d53e4ffc8d59fee08bffffbfe6f59899d5943288bd",
  "d53e4ff46d43fdae61fee08be6f598abdda466c2a53288bd",
  "d53e4ff46d43fdae61fee08bffffbfe6f598abdda466c2a53288bd",
  "9e0142d53e4ff46d43fdae61fee08be6f598abdda466c2a53288bd5e4fa2",
  "9e0142d53e4ff46d43fdae61fee08bffffbfe6f598abdda466c2a53288bd5e4fa2"
).map(colors);
const E$1 = ramp$1(scheme$i);
var scheme$h = new Array(3).concat(
  "e5f5f999d8c92ca25f",
  "edf8fbb2e2e266c2a4238b45",
  "edf8fbb2e2e266c2a42ca25f006d2c",
  "edf8fbccece699d8c966c2a42ca25f006d2c",
  "edf8fbccece699d8c966c2a441ae76238b45005824",
  "f7fcfde5f5f9ccece699d8c966c2a441ae76238b45005824",
  "f7fcfde5f5f9ccece699d8c966c2a441ae76238b45006d2c00441b"
).map(colors);
const ae$1 = ramp$1(scheme$h);
var scheme$g = new Array(3).concat(
  "e0ecf49ebcda8856a7",
  "edf8fbb3cde38c96c688419d",
  "edf8fbb3cde38c96c68856a7810f7c",
  "edf8fbbfd3e69ebcda8c96c68856a7810f7c",
  "edf8fbbfd3e69ebcda8c96c68c6bb188419d6e016b",
  "f7fcfde0ecf4bfd3e69ebcda8c96c68c6bb188419d6e016b",
  "f7fcfde0ecf4bfd3e69ebcda8c96c68c6bb188419d810f7c4d004b"
).map(colors);
const le$1 = ramp$1(scheme$g);
var scheme$f = new Array(3).concat(
  "e0f3dba8ddb543a2ca",
  "f0f9e8bae4bc7bccc42b8cbe",
  "f0f9e8bae4bc7bccc443a2ca0868ac",
  "f0f9e8ccebc5a8ddb57bccc443a2ca0868ac",
  "f0f9e8ccebc5a8ddb57bccc44eb3d32b8cbe08589e",
  "f7fcf0e0f3dbccebc5a8ddb57bccc44eb3d32b8cbe08589e",
  "f7fcf0e0f3dbccebc5a8ddb57bccc44eb3d32b8cbe0868ac084081"
).map(colors);
const ce$1 = ramp$1(scheme$f);
var scheme$e = new Array(3).concat(
  "fee8c8fdbb84e34a33",
  "fef0d9fdcc8afc8d59d7301f",
  "fef0d9fdcc8afc8d59e34a33b30000",
  "fef0d9fdd49efdbb84fc8d59e34a33b30000",
  "fef0d9fdd49efdbb84fc8d59ef6548d7301f990000",
  "fff7ecfee8c8fdd49efdbb84fc8d59ef6548d7301f990000",
  "fff7ecfee8c8fdd49efdbb84fc8d59ef6548d7301fb300007f0000"
).map(colors);
const se$1 = ramp$1(scheme$e);
var scheme$d = new Array(3).concat(
  "ece2f0a6bddb1c9099",
  "f6eff7bdc9e167a9cf02818a",
  "f6eff7bdc9e167a9cf1c9099016c59",
  "f6eff7d0d1e6a6bddb67a9cf1c9099016c59",
  "f6eff7d0d1e6a6bddb67a9cf3690c002818a016450",
  "fff7fbece2f0d0d1e6a6bddb67a9cf3690c002818a016450",
  "fff7fbece2f0d0d1e6a6bddb67a9cf3690c002818a016c59014636"
).map(colors);
const fe$1 = ramp$1(scheme$d);
var scheme$c = new Array(3).concat(
  "ece7f2a6bddb2b8cbe",
  "f1eef6bdc9e174a9cf0570b0",
  "f1eef6bdc9e174a9cf2b8cbe045a8d",
  "f1eef6d0d1e6a6bddb74a9cf2b8cbe045a8d",
  "f1eef6d0d1e6a6bddb74a9cf3690c00570b0034e7b",
  "fff7fbece7f2d0d1e6a6bddb74a9cf3690c00570b0034e7b",
  "fff7fbece7f2d0d1e6a6bddb74a9cf3690c00570b0045a8d023858"
).map(colors);
const pe$1 = ramp$1(scheme$c);
var scheme$b = new Array(3).concat(
  "e7e1efc994c7dd1c77",
  "f1eef6d7b5d8df65b0ce1256",
  "f1eef6d7b5d8df65b0dd1c77980043",
  "f1eef6d4b9dac994c7df65b0dd1c77980043",
  "f1eef6d4b9dac994c7df65b0e7298ace125691003f",
  "f7f4f9e7e1efd4b9dac994c7df65b0e7298ace125691003f",
  "f7f4f9e7e1efd4b9dac994c7df65b0e7298ace125698004367001f"
).map(colors);
const de$1 = ramp$1(scheme$b);
var scheme$a = new Array(3).concat(
  "fde0ddfa9fb5c51b8a",
  "feebe2fbb4b9f768a1ae017e",
  "feebe2fbb4b9f768a1c51b8a7a0177",
  "feebe2fcc5c0fa9fb5f768a1c51b8a7a0177",
  "feebe2fcc5c0fa9fb5f768a1dd3497ae017e7a0177",
  "fff7f3fde0ddfcc5c0fa9fb5f768a1dd3497ae017e7a0177",
  "fff7f3fde0ddfcc5c0fa9fb5f768a1dd3497ae017e7a017749006a"
).map(colors);
const me$1 = ramp$1(scheme$a);
var scheme$9 = new Array(3).concat(
  "edf8b17fcdbb2c7fb8",
  "ffffcca1dab441b6c4225ea8",
  "ffffcca1dab441b6c42c7fb8253494",
  "ffffccc7e9b47fcdbb41b6c42c7fb8253494",
  "ffffccc7e9b47fcdbb41b6c41d91c0225ea80c2c84",
  "ffffd9edf8b1c7e9b47fcdbb41b6c41d91c0225ea80c2c84",
  "ffffd9edf8b1c7e9b47fcdbb41b6c41d91c0225ea8253494081d58"
).map(colors);
const he$1 = ramp$1(scheme$9);
var scheme$8 = new Array(3).concat(
  "f7fcb9addd8e31a354",
  "ffffccc2e69978c679238443",
  "ffffccc2e69978c67931a354006837",
  "ffffccd9f0a3addd8e78c67931a354006837",
  "ffffccd9f0a3addd8e78c67941ab5d238443005a32",
  "ffffe5f7fcb9d9f0a3addd8e78c67941ab5d238443005a32",
  "ffffe5f7fcb9d9f0a3addd8e78c67941ab5d238443006837004529"
).map(colors);
const ge$1 = ramp$1(scheme$8);
var scheme$7 = new Array(3).concat(
  "fff7bcfec44fd95f0e",
  "ffffd4fed98efe9929cc4c02",
  "ffffd4fed98efe9929d95f0e993404",
  "ffffd4fee391fec44ffe9929d95f0e993404",
  "ffffd4fee391fec44ffe9929ec7014cc4c028c2d04",
  "ffffe5fff7bcfee391fec44ffe9929ec7014cc4c028c2d04",
  "ffffe5fff7bcfee391fec44ffe9929ec7014cc4c02993404662506"
).map(colors);
const ye$1 = ramp$1(scheme$7);
var scheme$6 = new Array(3).concat(
  "ffeda0feb24cf03b20",
  "ffffb2fecc5cfd8d3ce31a1c",
  "ffffb2fecc5cfd8d3cf03b20bd0026",
  "ffffb2fed976feb24cfd8d3cf03b20bd0026",
  "ffffb2fed976feb24cfd8d3cfc4e2ae31a1cb10026",
  "ffffccffeda0fed976feb24cfd8d3cfc4e2ae31a1cb10026",
  "ffffccffeda0fed976feb24cfd8d3cfc4e2ae31a1cbd0026800026"
).map(colors);
const be$1 = ramp$1(scheme$6);
var scheme$5 = new Array(3).concat(
  "deebf79ecae13182bd",
  "eff3ffbdd7e76baed62171b5",
  "eff3ffbdd7e76baed63182bd08519c",
  "eff3ffc6dbef9ecae16baed63182bd08519c",
  "eff3ffc6dbef9ecae16baed64292c62171b5084594",
  "f7fbffdeebf7c6dbef9ecae16baed64292c62171b5084594",
  "f7fbffdeebf7c6dbef9ecae16baed64292c62171b508519c08306b"
).map(colors);
const K$2 = ramp$1(scheme$5);
var scheme$4 = new Array(3).concat(
  "e5f5e0a1d99b31a354",
  "edf8e9bae4b374c476238b45",
  "edf8e9bae4b374c47631a354006d2c",
  "edf8e9c7e9c0a1d99b74c47631a354006d2c",
  "edf8e9c7e9c0a1d99b74c47641ab5d238b45005a32",
  "f7fcf5e5f5e0c7e9c0a1d99b74c47641ab5d238b45005a32",
  "f7fcf5e5f5e0c7e9c0a1d99b74c47641ab5d238b45006d2c00441b"
).map(colors);
const L$2 = ramp$1(scheme$4);
var scheme$3 = new Array(3).concat(
  "f0f0f0bdbdbd636363",
  "f7f7f7cccccc969696525252",
  "f7f7f7cccccc969696636363252525",
  "f7f7f7d9d9d9bdbdbd969696636363252525",
  "f7f7f7d9d9d9bdbdbd969696737373525252252525",
  "fffffff0f0f0d9d9d9bdbdbd969696737373525252252525",
  "fffffff0f0f0d9d9d9bdbdbd969696737373525252252525000000"
).map(colors);
const N$1 = ramp$1(scheme$3);
var scheme$2 = new Array(3).concat(
  "efedf5bcbddc756bb1",
  "f2f0f7cbc9e29e9ac86a51a3",
  "f2f0f7cbc9e29e9ac8756bb154278f",
  "f2f0f7dadaebbcbddc9e9ac8756bb154278f",
  "f2f0f7dadaebbcbddc9e9ac8807dba6a51a34a1486",
  "fcfbfdefedf5dadaebbcbddc9e9ac8807dba6a51a34a1486",
  "fcfbfdefedf5dadaebbcbddc9e9ac8807dba6a51a354278f3f007d"
).map(colors);
const W$3 = ramp$1(scheme$2);
var scheme$1 = new Array(3).concat(
  "fee0d2fc9272de2d26",
  "fee5d9fcae91fb6a4acb181d",
  "fee5d9fcae91fb6a4ade2d26a50f15",
  "fee5d9fcbba1fc9272fb6a4ade2d26a50f15",
  "fee5d9fcbba1fc9272fb6a4aef3b2ccb181d99000d",
  "fff5f0fee0d2fcbba1fc9272fb6a4aef3b2ccb181d99000d",
  "fff5f0fee0d2fcbba1fc9272fb6a4aef3b2ccb181da50f1567000d"
).map(colors);
const X$3 = ramp$1(scheme$1);
var scheme = new Array(3).concat(
  "fee6cefdae6be6550d",
  "feeddefdbe85fd8d3cd94701",
  "feeddefdbe85fd8d3ce6550da63603",
  "feeddefdd0a2fdae6bfd8d3ce6550da63603",
  "feeddefdd0a2fdae6bfd8d3cf16913d948018c2d04",
  "fff5ebfee6cefdd0a2fdae6bfd8d3cf16913d948018c2d04",
  "fff5ebfee6cefdd0a2fdae6bfd8d3cf16913d94801a636037f2704"
).map(colors);
const Q$2 = ramp$1(scheme);
function te$1(t2) {
  t2 = Math.max(0, Math.min(1, t2));
  return "rgb(" + Math.max(0, Math.min(255, Math.round(-4.54 - t2 * (35.34 - t2 * (2381.73 - t2 * (6402.7 - t2 * (7024.72 - t2 * 2710.57))))))) + ", " + Math.max(0, Math.min(255, Math.round(32.49 + t2 * (170.73 + t2 * (52.82 - t2 * (131.46 - t2 * (176.58 - t2 * 67.37))))))) + ", " + Math.max(0, Math.min(255, Math.round(81.24 + t2 * (442.36 - t2 * (2482.43 - t2 * (6167.24 - t2 * (6614.94 - t2 * 2475.67))))))) + ")";
}
const ue$1 = cubehelixLong(cubehelix$1(300, 0.5, 0), cubehelix$1(-240, 0.5, 1));
var warm = cubehelixLong(cubehelix$1(-100, 0.75, 0.35), cubehelix$1(80, 1.5, 0.8));
var cool = cubehelixLong(cubehelix$1(260, 0.75, 0.35), cubehelix$1(80, 1.5, 0.8));
var c$1 = cubehelix$1();
function ve$1(t2) {
  if (t2 < 0 || t2 > 1)
    t2 -= Math.floor(t2);
  var ts2 = Math.abs(t2 - 0.5);
  c$1.h = 360 * t2 - 100;
  c$1.s = 1.5 - 1.5 * ts2;
  c$1.l = 0.8 - 0.9 * ts2;
  return c$1 + "";
}
var c = rgb$1(), pi_1_3 = Math.PI / 3, pi_2_3 = Math.PI * 2 / 3;
function _e(t2) {
  var x2;
  t2 = (0.5 - t2) * Math.PI;
  c.r = 255 * (x2 = Math.sin(t2)) * x2;
  c.g = 255 * (x2 = Math.sin(t2 + pi_1_3)) * x2;
  c.b = 255 * (x2 = Math.sin(t2 + pi_2_3)) * x2;
  return c + "";
}
function Y$3(t2) {
  t2 = Math.max(0, Math.min(1, t2));
  return "rgb(" + Math.max(0, Math.min(255, Math.round(34.61 + t2 * (1172.33 - t2 * (10793.56 - t2 * (33300.12 - t2 * (38394.49 - t2 * 14825.05))))))) + ", " + Math.max(0, Math.min(255, Math.round(23.31 + t2 * (557.33 + t2 * (1225.33 - t2 * (3574.96 - t2 * (1073.77 + t2 * 707.56))))))) + ", " + Math.max(0, Math.min(255, Math.round(27.2 + t2 * (3211.1 - t2 * (15327.97 - t2 * (27814 - t2 * (22569.18 - t2 * 6838.66))))))) + ")";
}
function ramp(range2) {
  var n2 = range2.length;
  return function(t2) {
    return range2[Math.max(0, Math.min(n2 - 1, Math.floor(t2 * n2)))];
  };
}
const Z$1 = ramp(colors("44015444025645045745055946075a46085c460a5d460b5e470d60470e6147106347116447136548146748166848176948186a481a6c481b6d481c6e481d6f481f70482071482173482374482475482576482677482878482979472a7a472c7a472d7b472e7c472f7d46307e46327e46337f463480453581453781453882443983443a83443b84433d84433e85423f854240864241864142874144874045884046883f47883f48893e49893e4a893e4c8a3d4d8a3d4e8a3c4f8a3c508b3b518b3b528b3a538b3a548c39558c39568c38588c38598c375a8c375b8d365c8d365d8d355e8d355f8d34608d34618d33628d33638d32648e32658e31668e31678e31688e30698e306a8e2f6b8e2f6c8e2e6d8e2e6e8e2e6f8e2d708e2d718e2c718e2c728e2c738e2b748e2b758e2a768e2a778e2a788e29798e297a8e297b8e287c8e287d8e277e8e277f8e27808e26818e26828e26828e25838e25848e25858e24868e24878e23888e23898e238a8d228b8d228c8d228d8d218e8d218f8d21908d21918c20928c20928c20938c1f948c1f958b1f968b1f978b1f988b1f998a1f9a8a1e9b8a1e9c891e9d891f9e891f9f881fa0881fa1881fa1871fa28720a38620a48621a58521a68522a78522a88423a98324aa8325ab8225ac8226ad8127ad8128ae8029af7f2ab07f2cb17e2db27d2eb37c2fb47c31b57b32b67a34b67935b77937b87838b9773aba763bbb753dbc743fbc7340bd7242be7144bf7046c06f48c16e4ac16d4cc26c4ec36b50c46a52c56954c56856c66758c7655ac8645cc8635ec96260ca6063cb5f65cb5e67cc5c69cd5b6ccd5a6ece5870cf5773d05675d05477d1537ad1517cd2507fd34e81d34d84d44b86d54989d5488bd6468ed64590d74393d74195d84098d83e9bd93c9dd93ba0da39a2da37a5db36a8db34aadc32addc30b0dd2fb2dd2db5de2bb8de29bade28bddf26c0df25c2df23c5e021c8e020cae11fcde11dd0e11cd2e21bd5e21ad8e219dae319dde318dfe318e2e418e5e419e7e419eae51aece51befe51cf1e51df4e61ef6e620f8e621fbe723fde725"));
var magma = ramp(colors("00000401000501010601010802010902020b02020d03030f03031204041405041606051806051a07061c08071e0907200a08220b09240c09260d0a290e0b2b100b2d110c2f120d31130d34140e36150e38160f3b180f3d19103f1a10421c10441d11471e114920114b21114e22115024125325125527125829115a2a115c2c115f2d11612f116331116533106734106936106b38106c390f6e3b0f703d0f713f0f72400f74420f75440f764510774710784910784a10794c117a4e117b4f127b51127c52137c54137d56147d57157e59157e5a167e5c167f5d177f5f187f601880621980641a80651a80671b80681c816a1c816b1d816d1d816e1e81701f81721f817320817521817621817822817922827b23827c23827e24828025828125818326818426818627818827818928818b29818c29818e2a81902a81912b81932b80942c80962c80982d80992d809b2e7f9c2e7f9e2f7fa02f7fa1307ea3307ea5317ea6317da8327daa337dab337cad347cae347bb0357bb2357bb3367ab5367ab73779b83779ba3878bc3978bd3977bf3a77c03a76c23b75c43c75c53c74c73d73c83e73ca3e72cc3f71cd4071cf4070d0416fd2426fd3436ed5446dd6456cd8456cd9466bdb476adc4869de4968df4a68e04c67e24d66e34e65e44f64e55064e75263e85362e95462ea5661eb5760ec5860ed5a5fee5b5eef5d5ef05f5ef1605df2625df2645cf3655cf4675cf4695cf56b5cf66c5cf66e5cf7705cf7725cf8745cf8765cf9785df9795df97b5dfa7d5efa7f5efa815ffb835ffb8560fb8761fc8961fc8a62fc8c63fc8e64fc9065fd9266fd9467fd9668fd9869fd9a6afd9b6bfe9d6cfe9f6dfea16efea36ffea571fea772fea973feaa74feac76feae77feb078feb27afeb47bfeb67cfeb77efeb97ffebb81febd82febf84fec185fec287fec488fec68afec88cfeca8dfecc8ffecd90fecf92fed194fed395fed597fed799fed89afdda9cfddc9efddea0fde0a1fde2a3fde3a5fde5a7fde7a9fde9aafdebacfcecaefceeb0fcf0b2fcf2b4fcf4b6fcf6b8fcf7b9fcf9bbfcfbbdfcfdbf"));
var inferno = ramp(colors("00000401000501010601010802010a02020c02020e03021004031204031405041706041907051b08051d09061f0a07220b07240c08260d08290e092b10092d110a30120a32140b34150b37160b39180c3c190c3e1b0c411c0c431e0c451f0c48210c4a230c4c240c4f260c51280b53290b552b0b572d0b592f0a5b310a5c320a5e340a5f3609613809623909633b09643d09653e0966400a67420a68440a68450a69470b6a490b6a4a0c6b4c0c6b4d0d6c4f0d6c510e6c520e6d540f6d550f6d57106e59106e5a116e5c126e5d126e5f136e61136e62146e64156e65156e67166e69166e6a176e6c186e6d186e6f196e71196e721a6e741a6e751b6e771c6d781c6d7a1d6d7c1d6d7d1e6d7f1e6c801f6c82206c84206b85216b87216b88226a8a226a8c23698d23698f24699025689225689326679526679727669827669a28659b29649d29649f2a63a02a63a22b62a32c61a52c60a62d60a82e5fa92e5eab2f5ead305dae305cb0315bb1325ab3325ab43359b63458b73557b93556ba3655bc3754bd3853bf3952c03a51c13a50c33b4fc43c4ec63d4dc73e4cc83f4bca404acb4149cc4248ce4347cf4446d04545d24644d34743d44842d54a41d74b3fd84c3ed94d3dda4e3cdb503bdd513ade5238df5337e05536e15635e25734e35933e45a31e55c30e65d2fe75e2ee8602de9612bea632aeb6429eb6628ec6726ed6925ee6a24ef6c23ef6e21f06f20f1711ff1731df2741cf3761bf37819f47918f57b17f57d15f67e14f68013f78212f78410f8850ff8870ef8890cf98b0bf98c0af98e09fa9008fa9207fa9407fb9606fb9706fb9906fb9b06fb9d07fc9f07fca108fca309fca50afca60cfca80dfcaa0ffcac11fcae12fcb014fcb216fcb418fbb61afbb81dfbba1ffbbc21fbbe23fac026fac228fac42afac62df9c72ff9c932f9cb35f8cd37f8cf3af7d13df7d340f6d543f6d746f5d949f5db4cf4dd4ff4df53f4e156f3e35af3e55df2e661f2e865f2ea69f1ec6df1ed71f1ef75f1f179f2f27df2f482f3f586f3f68af4f88ef5f992f6fa96f8fb9af9fc9dfafda1fcffa4"));
var plasma = ramp(colors("0d088710078813078916078a19068c1b068d1d068e20068f2206902406912605912805922a05932c05942e05952f059631059733059735049837049938049a3a049a3c049b3e049c3f049c41049d43039e44039e46039f48039f4903a04b03a14c02a14e02a25002a25102a35302a35502a45601a45801a45901a55b01a55c01a65e01a66001a66100a76300a76400a76600a76700a86900a86a00a86c00a86e00a86f00a87100a87201a87401a87501a87701a87801a87a02a87b02a87d03a87e03a88004a88104a78305a78405a78606a68707a68808a68a09a58b0aa58d0ba58e0ca48f0da4910ea3920fa39410a29511a19613a19814a099159f9a169f9c179e9d189d9e199da01a9ca11b9ba21d9aa31e9aa51f99a62098a72197a82296aa2395ab2494ac2694ad2793ae2892b02991b12a90b22b8fb32c8eb42e8db52f8cb6308bb7318ab83289ba3388bb3488bc3587bd3786be3885bf3984c03a83c13b82c23c81c33d80c43e7fc5407ec6417dc7427cc8437bc9447aca457acb4679cc4778cc4977cd4a76ce4b75cf4c74d04d73d14e72d24f71d35171d45270d5536fd5546ed6556dd7566cd8576bd9586ada5a6ada5b69db5c68dc5d67dd5e66de5f65de6164df6263e06363e16462e26561e26660e3685fe4695ee56a5de56b5de66c5ce76e5be76f5ae87059e97158e97257ea7457eb7556eb7655ec7754ed7953ed7a52ee7b51ef7c51ef7e50f07f4ff0804ef1814df1834cf2844bf3854bf3874af48849f48948f58b47f58c46f68d45f68f44f79044f79143f79342f89441f89540f9973ff9983ef99a3efa9b3dfa9c3cfa9e3bfb9f3afba139fba238fca338fca537fca636fca835fca934fdab33fdac33fdae32fdaf31fdb130fdb22ffdb42ffdb52efeb72dfeb82cfeba2cfebb2bfebd2afebe2afec029fdc229fdc328fdc527fdc627fdc827fdca26fdcb26fccd25fcce25fcd025fcd225fbd324fbd524fbd724fad824fada24f9dc24f9dd25f8df25f8e125f7e225f7e425f6e626f6e826f5e926f5eb27f4ed27f3ee27f3f027f2f227f1f426f1f525f0f724f0f921"));
var HASH_UNDEFINED = "__lodash_hash_undefined__";
function setCacheAdd$1(value) {
  this.__data__.set(value, HASH_UNDEFINED);
  return this;
}
var _setCacheAdd = setCacheAdd$1;
function setCacheHas$1(value) {
  return this.__data__.has(value);
}
var _setCacheHas = setCacheHas$1;
var MapCache = _MapCache, setCacheAdd = _setCacheAdd, setCacheHas = _setCacheHas;
function SetCache$3(values) {
  var index = -1, length = values == null ? 0 : values.length;
  this.__data__ = new MapCache();
  while (++index < length) {
    this.add(values[index]);
  }
}
SetCache$3.prototype.add = SetCache$3.prototype.push = setCacheAdd;
SetCache$3.prototype.has = setCacheHas;
var _SetCache = SetCache$3;
function baseFindIndex$1(array2, predicate, fromIndex, fromRight) {
  var length = array2.length, index = fromIndex + (fromRight ? 1 : -1);
  while (fromRight ? index-- : ++index < length) {
    if (predicate(array2[index], index, array2)) {
      return index;
    }
  }
  return -1;
}
var _baseFindIndex = baseFindIndex$1;
function baseIsNaN$1(value) {
  return value !== value;
}
var _baseIsNaN = baseIsNaN$1;
function strictIndexOf$1(array2, value, fromIndex) {
  var index = fromIndex - 1, length = array2.length;
  while (++index < length) {
    if (array2[index] === value) {
      return index;
    }
  }
  return -1;
}
var _strictIndexOf = strictIndexOf$1;
var baseFindIndex = _baseFindIndex, baseIsNaN = _baseIsNaN, strictIndexOf = _strictIndexOf;
function baseIndexOf$1(array2, value, fromIndex) {
  return value === value ? strictIndexOf(array2, value, fromIndex) : baseFindIndex(array2, baseIsNaN, fromIndex);
}
var _baseIndexOf = baseIndexOf$1;
var baseIndexOf = _baseIndexOf;
function arrayIncludes$2(array2, value) {
  var length = array2 == null ? 0 : array2.length;
  return !!length && baseIndexOf(array2, value, 0) > -1;
}
var _arrayIncludes = arrayIncludes$2;
function arrayIncludesWith$2(array2, value, comparator) {
  var index = -1, length = array2 == null ? 0 : array2.length;
  while (++index < length) {
    if (comparator(value, array2[index])) {
      return true;
    }
  }
  return false;
}
var _arrayIncludesWith = arrayIncludesWith$2;
function cacheHas$3(cache, key) {
  return cache.has(key);
}
var _cacheHas = cacheHas$3;
var SetCache$2 = _SetCache, arrayIncludes$1 = _arrayIncludes, arrayIncludesWith$1 = _arrayIncludesWith, arrayMap$2 = _arrayMap, baseUnary$3 = _baseUnary, cacheHas$2 = _cacheHas;
var LARGE_ARRAY_SIZE$1 = 200;
function baseDifference$1(array2, values, iteratee, comparator) {
  var index = -1, includes = arrayIncludes$1, isCommon = true, length = array2.length, result = [], valuesLength = values.length;
  if (!length) {
    return result;
  }
  if (iteratee) {
    values = arrayMap$2(values, baseUnary$3(iteratee));
  }
  if (comparator) {
    includes = arrayIncludesWith$1;
    isCommon = false;
  } else if (values.length >= LARGE_ARRAY_SIZE$1) {
    includes = cacheHas$2;
    isCommon = false;
    values = new SetCache$2(values);
  }
  outer:
    while (++index < length) {
      var value = array2[index], computed = iteratee == null ? value : iteratee(value);
      value = comparator || value !== 0 ? value : 0;
      if (isCommon && computed === computed) {
        var valuesIndex = valuesLength;
        while (valuesIndex--) {
          if (values[valuesIndex] === computed) {
            continue outer;
          }
        }
        result.push(value);
      } else if (!includes(values, computed, comparator)) {
        result.push(value);
      }
    }
  return result;
}
var _baseDifference = baseDifference$1;
var baseDifference = _baseDifference, baseRest$1 = _baseRest, isArrayLikeObject = isArrayLikeObject_1;
var without = baseRest$1(function(array2, values) {
  return isArrayLikeObject(array2) ? baseDifference(array2, values) : [];
});
var without_1 = without;
const Ze = /* @__PURE__ */ getDefaultExportFromCjs(without_1);
function constant(x2) {
  return function constant2() {
    return x2;
  };
}
const epsilon = 1e-12;
function array(x2) {
  return typeof x2 === "object" && "length" in x2 ? x2 : Array.from(x2);
}
function Linear(context) {
  this._context = context;
}
Linear.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    if (this._line || this._line !== 0 && this._point === 1)
      this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x2, y) {
    x2 = +x2, y = +y;
    switch (this._point) {
      case 0:
        this._point = 1;
        this._line ? this._context.lineTo(x2, y) : this._context.moveTo(x2, y);
        break;
      case 1:
        this._point = 2;
      default:
        this._context.lineTo(x2, y);
        break;
    }
  }
};
function sr(context) {
  return new Linear(context);
}
function noop$2() {
}
function point$3(that, x2, y) {
  that._context.bezierCurveTo(
    (2 * that._x0 + that._x1) / 3,
    (2 * that._y0 + that._y1) / 3,
    (that._x0 + 2 * that._x1) / 3,
    (that._y0 + 2 * that._y1) / 3,
    (that._x0 + 4 * that._x1 + x2) / 6,
    (that._y0 + 4 * that._y1 + y) / 6
  );
}
function Basis(context) {
  this._context = context;
}
Basis.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._y0 = this._y1 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 3:
        point$3(this, this._x1, this._y1);
      case 2:
        this._context.lineTo(this._x1, this._y1);
        break;
    }
    if (this._line || this._line !== 0 && this._point === 1)
      this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x2, y) {
    x2 = +x2, y = +y;
    switch (this._point) {
      case 0:
        this._point = 1;
        this._line ? this._context.lineTo(x2, y) : this._context.moveTo(x2, y);
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3;
        this._context.lineTo((5 * this._x0 + this._x1) / 6, (5 * this._y0 + this._y1) / 6);
      default:
        point$3(this, x2, y);
        break;
    }
    this._x0 = this._x1, this._x1 = x2;
    this._y0 = this._y1, this._y1 = y;
  }
};
function $e$1(context) {
  return new Basis(context);
}
function BasisClosed(context) {
  this._context = context;
}
BasisClosed.prototype = {
  areaStart: noop$2,
  areaEnd: noop$2,
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 1: {
        this._context.moveTo(this._x2, this._y2);
        this._context.closePath();
        break;
      }
      case 2: {
        this._context.moveTo((this._x2 + 2 * this._x3) / 3, (this._y2 + 2 * this._y3) / 3);
        this._context.lineTo((this._x3 + 2 * this._x2) / 3, (this._y3 + 2 * this._y2) / 3);
        this._context.closePath();
        break;
      }
      case 3: {
        this.point(this._x2, this._y2);
        this.point(this._x3, this._y3);
        this.point(this._x4, this._y4);
        break;
      }
    }
  },
  point: function(x2, y) {
    x2 = +x2, y = +y;
    switch (this._point) {
      case 0:
        this._point = 1;
        this._x2 = x2, this._y2 = y;
        break;
      case 1:
        this._point = 2;
        this._x3 = x2, this._y3 = y;
        break;
      case 2:
        this._point = 3;
        this._x4 = x2, this._y4 = y;
        this._context.moveTo((this._x0 + 4 * this._x1 + x2) / 6, (this._y0 + 4 * this._y1 + y) / 6);
        break;
      default:
        point$3(this, x2, y);
        break;
    }
    this._x0 = this._x1, this._x1 = x2;
    this._y0 = this._y1, this._y1 = y;
  }
};
function er(context) {
  return new BasisClosed(context);
}
function BasisOpen(context) {
  this._context = context;
}
BasisOpen.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._y0 = this._y1 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    if (this._line || this._line !== 0 && this._point === 3)
      this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x2, y) {
    x2 = +x2, y = +y;
    switch (this._point) {
      case 0:
        this._point = 1;
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3;
        var x0 = (this._x0 + 4 * this._x1 + x2) / 6, y0 = (this._y0 + 4 * this._y1 + y) / 6;
        this._line ? this._context.lineTo(x0, y0) : this._context.moveTo(x0, y0);
        break;
      case 3:
        this._point = 4;
      default:
        point$3(this, x2, y);
        break;
    }
    this._x0 = this._x1, this._x1 = x2;
    this._y0 = this._y1, this._y1 = y;
  }
};
function rr(context) {
  return new BasisOpen(context);
}
function Bundle(context, beta) {
  this._basis = new Basis(context);
  this._beta = beta;
}
Bundle.prototype = {
  lineStart: function() {
    this._x = [];
    this._y = [];
    this._basis.lineStart();
  },
  lineEnd: function() {
    var x2 = this._x, y = this._y, j2 = x2.length - 1;
    if (j2 > 0) {
      var x0 = x2[0], y0 = y[0], dx = x2[j2] - x0, dy = y[j2] - y0, i2 = -1, t2;
      while (++i2 <= j2) {
        t2 = i2 / j2;
        this._basis.point(
          this._beta * x2[i2] + (1 - this._beta) * (x0 + t2 * dx),
          this._beta * y[i2] + (1 - this._beta) * (y0 + t2 * dy)
        );
      }
    }
    this._x = this._y = null;
    this._basis.lineEnd();
  },
  point: function(x2, y) {
    this._x.push(+x2);
    this._y.push(+y);
  }
};
const tr = function custom(beta) {
  function bundle(context) {
    return beta === 1 ? new Basis(context) : new Bundle(context, beta);
  }
  bundle.beta = function(beta2) {
    return custom(+beta2);
  };
  return bundle;
}(0.85);
function point$2(that, x2, y) {
  that._context.bezierCurveTo(
    that._x1 + that._k * (that._x2 - that._x0),
    that._y1 + that._k * (that._y2 - that._y0),
    that._x2 + that._k * (that._x1 - x2),
    that._y2 + that._k * (that._y1 - y),
    that._x2,
    that._y2
  );
}
function Cardinal(context, tension) {
  this._context = context;
  this._k = (1 - tension) / 6;
}
Cardinal.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 2:
        this._context.lineTo(this._x2, this._y2);
        break;
      case 3:
        point$2(this, this._x1, this._y1);
        break;
    }
    if (this._line || this._line !== 0 && this._point === 1)
      this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x2, y) {
    x2 = +x2, y = +y;
    switch (this._point) {
      case 0:
        this._point = 1;
        this._line ? this._context.lineTo(x2, y) : this._context.moveTo(x2, y);
        break;
      case 1:
        this._point = 2;
        this._x1 = x2, this._y1 = y;
        break;
      case 2:
        this._point = 3;
      default:
        point$2(this, x2, y);
        break;
    }
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x2;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
  }
};
const nr = function custom2(tension) {
  function cardinal(context) {
    return new Cardinal(context, tension);
  }
  cardinal.tension = function(tension2) {
    return custom2(+tension2);
  };
  return cardinal;
}(0);
function CardinalClosed(context, tension) {
  this._context = context;
  this._k = (1 - tension) / 6;
}
CardinalClosed.prototype = {
  areaStart: noop$2,
  areaEnd: noop$2,
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 1: {
        this._context.moveTo(this._x3, this._y3);
        this._context.closePath();
        break;
      }
      case 2: {
        this._context.lineTo(this._x3, this._y3);
        this._context.closePath();
        break;
      }
      case 3: {
        this.point(this._x3, this._y3);
        this.point(this._x4, this._y4);
        this.point(this._x5, this._y5);
        break;
      }
    }
  },
  point: function(x2, y) {
    x2 = +x2, y = +y;
    switch (this._point) {
      case 0:
        this._point = 1;
        this._x3 = x2, this._y3 = y;
        break;
      case 1:
        this._point = 2;
        this._context.moveTo(this._x4 = x2, this._y4 = y);
        break;
      case 2:
        this._point = 3;
        this._x5 = x2, this._y5 = y;
        break;
      default:
        point$2(this, x2, y);
        break;
    }
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x2;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
  }
};
const ir = function custom3(tension) {
  function cardinal(context) {
    return new CardinalClosed(context, tension);
  }
  cardinal.tension = function(tension2) {
    return custom3(+tension2);
  };
  return cardinal;
}(0);
function CardinalOpen(context, tension) {
  this._context = context;
  this._k = (1 - tension) / 6;
}
CardinalOpen.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    if (this._line || this._line !== 0 && this._point === 3)
      this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x2, y) {
    x2 = +x2, y = +y;
    switch (this._point) {
      case 0:
        this._point = 1;
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3;
        this._line ? this._context.lineTo(this._x2, this._y2) : this._context.moveTo(this._x2, this._y2);
        break;
      case 3:
        this._point = 4;
      default:
        point$2(this, x2, y);
        break;
    }
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x2;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
  }
};
const or = function custom4(tension) {
  function cardinal(context) {
    return new CardinalOpen(context, tension);
  }
  cardinal.tension = function(tension2) {
    return custom4(+tension2);
  };
  return cardinal;
}(0);
function point$1(that, x2, y) {
  var x1 = that._x1, y1 = that._y1, x22 = that._x2, y2 = that._y2;
  if (that._l01_a > epsilon) {
    var a2 = 2 * that._l01_2a + 3 * that._l01_a * that._l12_a + that._l12_2a, n2 = 3 * that._l01_a * (that._l01_a + that._l12_a);
    x1 = (x1 * a2 - that._x0 * that._l12_2a + that._x2 * that._l01_2a) / n2;
    y1 = (y1 * a2 - that._y0 * that._l12_2a + that._y2 * that._l01_2a) / n2;
  }
  if (that._l23_a > epsilon) {
    var b2 = 2 * that._l23_2a + 3 * that._l23_a * that._l12_a + that._l12_2a, m2 = 3 * that._l23_a * (that._l23_a + that._l12_a);
    x22 = (x22 * b2 + that._x1 * that._l23_2a - x2 * that._l12_2a) / m2;
    y2 = (y2 * b2 + that._y1 * that._l23_2a - y * that._l12_2a) / m2;
  }
  that._context.bezierCurveTo(x1, y1, x22, y2, that._x2, that._y2);
}
function CatmullRom(context, alpha) {
  this._context = context;
  this._alpha = alpha;
}
CatmullRom.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN;
    this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 2:
        this._context.lineTo(this._x2, this._y2);
        break;
      case 3:
        this.point(this._x2, this._y2);
        break;
    }
    if (this._line || this._line !== 0 && this._point === 1)
      this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x2, y) {
    x2 = +x2, y = +y;
    if (this._point) {
      var x23 = this._x2 - x2, y23 = this._y2 - y;
      this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
    }
    switch (this._point) {
      case 0:
        this._point = 1;
        this._line ? this._context.lineTo(x2, y) : this._context.moveTo(x2, y);
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3;
      default:
        point$1(this, x2, y);
        break;
    }
    this._l01_a = this._l12_a, this._l12_a = this._l23_a;
    this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x2;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
  }
};
const lr = function custom5(alpha) {
  function catmullRom(context) {
    return alpha ? new CatmullRom(context, alpha) : new Cardinal(context, 0);
  }
  catmullRom.alpha = function(alpha2) {
    return custom5(+alpha2);
  };
  return catmullRom;
}(0.5);
function CatmullRomClosed(context, alpha) {
  this._context = context;
  this._alpha = alpha;
}
CatmullRomClosed.prototype = {
  areaStart: noop$2,
  areaEnd: noop$2,
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN;
    this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 1: {
        this._context.moveTo(this._x3, this._y3);
        this._context.closePath();
        break;
      }
      case 2: {
        this._context.lineTo(this._x3, this._y3);
        this._context.closePath();
        break;
      }
      case 3: {
        this.point(this._x3, this._y3);
        this.point(this._x4, this._y4);
        this.point(this._x5, this._y5);
        break;
      }
    }
  },
  point: function(x2, y) {
    x2 = +x2, y = +y;
    if (this._point) {
      var x23 = this._x2 - x2, y23 = this._y2 - y;
      this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
    }
    switch (this._point) {
      case 0:
        this._point = 1;
        this._x3 = x2, this._y3 = y;
        break;
      case 1:
        this._point = 2;
        this._context.moveTo(this._x4 = x2, this._y4 = y);
        break;
      case 2:
        this._point = 3;
        this._x5 = x2, this._y5 = y;
        break;
      default:
        point$1(this, x2, y);
        break;
    }
    this._l01_a = this._l12_a, this._l12_a = this._l23_a;
    this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x2;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
  }
};
const ar = function custom6(alpha) {
  function catmullRom(context) {
    return alpha ? new CatmullRomClosed(context, alpha) : new CardinalClosed(context, 0);
  }
  catmullRom.alpha = function(alpha2) {
    return custom6(+alpha2);
  };
  return catmullRom;
}(0.5);
function CatmullRomOpen(context, alpha) {
  this._context = context;
  this._alpha = alpha;
}
CatmullRomOpen.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN;
    this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0;
  },
  lineEnd: function() {
    if (this._line || this._line !== 0 && this._point === 3)
      this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x2, y) {
    x2 = +x2, y = +y;
    if (this._point) {
      var x23 = this._x2 - x2, y23 = this._y2 - y;
      this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
    }
    switch (this._point) {
      case 0:
        this._point = 1;
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3;
        this._line ? this._context.lineTo(this._x2, this._y2) : this._context.moveTo(this._x2, this._y2);
        break;
      case 3:
        this._point = 4;
      default:
        point$1(this, x2, y);
        break;
    }
    this._l01_a = this._l12_a, this._l12_a = this._l23_a;
    this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x2;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
  }
};
const dr = function custom7(alpha) {
  function catmullRom(context) {
    return alpha ? new CatmullRomOpen(context, alpha) : new CardinalOpen(context, 0);
  }
  catmullRom.alpha = function(alpha2) {
    return custom7(+alpha2);
  };
  return catmullRom;
}(0.5);
function LinearClosed(context) {
  this._context = context;
}
LinearClosed.prototype = {
  areaStart: noop$2,
  areaEnd: noop$2,
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    if (this._point)
      this._context.closePath();
  },
  point: function(x2, y) {
    x2 = +x2, y = +y;
    if (this._point)
      this._context.lineTo(x2, y);
    else
      this._point = 1, this._context.moveTo(x2, y);
  }
};
function ur(context) {
  return new LinearClosed(context);
}
function sign(x2) {
  return x2 < 0 ? -1 : 1;
}
function slope3(that, x2, y2) {
  var h0 = that._x1 - that._x0, h1 = x2 - that._x1, s0 = (that._y1 - that._y0) / (h0 || h1 < 0 && -0), s1 = (y2 - that._y1) / (h1 || h0 < 0 && -0), p2 = (s0 * h1 + s1 * h0) / (h0 + h1);
  return (sign(s0) + sign(s1)) * Math.min(Math.abs(s0), Math.abs(s1), 0.5 * Math.abs(p2)) || 0;
}
function slope2(that, t2) {
  var h = that._x1 - that._x0;
  return h ? (3 * (that._y1 - that._y0) / h - t2) / 2 : t2;
}
function point(that, t02, t12) {
  var x0 = that._x0, y0 = that._y0, x1 = that._x1, y1 = that._y1, dx = (x1 - x0) / 3;
  that._context.bezierCurveTo(x0 + dx, y0 + dx * t02, x1 - dx, y1 - dx * t12, x1, y1);
}
function MonotoneX(context) {
  this._context = context;
}
MonotoneX.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._y0 = this._y1 = this._t0 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 2:
        this._context.lineTo(this._x1, this._y1);
        break;
      case 3:
        point(this, this._t0, slope2(this, this._t0));
        break;
    }
    if (this._line || this._line !== 0 && this._point === 1)
      this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x2, y) {
    var t12 = NaN;
    x2 = +x2, y = +y;
    if (x2 === this._x1 && y === this._y1)
      return;
    switch (this._point) {
      case 0:
        this._point = 1;
        this._line ? this._context.lineTo(x2, y) : this._context.moveTo(x2, y);
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3;
        point(this, slope2(this, t12 = slope3(this, x2, y)), t12);
        break;
      default:
        point(this, this._t0, t12 = slope3(this, x2, y));
        break;
    }
    this._x0 = this._x1, this._x1 = x2;
    this._y0 = this._y1, this._y1 = y;
    this._t0 = t12;
  }
};
function MonotoneY(context) {
  this._context = new ReflectContext(context);
}
(MonotoneY.prototype = Object.create(MonotoneX.prototype)).point = function(x2, y) {
  MonotoneX.prototype.point.call(this, y, x2);
};
function ReflectContext(context) {
  this._context = context;
}
ReflectContext.prototype = {
  moveTo: function(x2, y) {
    this._context.moveTo(y, x2);
  },
  closePath: function() {
    this._context.closePath();
  },
  lineTo: function(x2, y) {
    this._context.lineTo(y, x2);
  },
  bezierCurveTo: function(x1, y1, x2, y2, x3, y) {
    this._context.bezierCurveTo(y1, x1, y2, x2, y, x3);
  }
};
function monotoneX(context) {
  return new MonotoneX(context);
}
function monotoneY(context) {
  return new MonotoneY(context);
}
function Natural(context) {
  this._context = context;
}
Natural.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x = [];
    this._y = [];
  },
  lineEnd: function() {
    var x2 = this._x, y = this._y, n2 = x2.length;
    if (n2) {
      this._line ? this._context.lineTo(x2[0], y[0]) : this._context.moveTo(x2[0], y[0]);
      if (n2 === 2) {
        this._context.lineTo(x2[1], y[1]);
      } else {
        var px = controlPoints(x2), py = controlPoints(y);
        for (var i0 = 0, i1 = 1; i1 < n2; ++i0, ++i1) {
          this._context.bezierCurveTo(px[0][i0], py[0][i0], px[1][i0], py[1][i0], x2[i1], y[i1]);
        }
      }
    }
    if (this._line || this._line !== 0 && n2 === 1)
      this._context.closePath();
    this._line = 1 - this._line;
    this._x = this._y = null;
  },
  point: function(x2, y) {
    this._x.push(+x2);
    this._y.push(+y);
  }
};
function controlPoints(x2) {
  var i2, n2 = x2.length - 1, m2, a2 = new Array(n2), b2 = new Array(n2), r2 = new Array(n2);
  a2[0] = 0, b2[0] = 2, r2[0] = x2[0] + 2 * x2[1];
  for (i2 = 1; i2 < n2 - 1; ++i2)
    a2[i2] = 1, b2[i2] = 4, r2[i2] = 4 * x2[i2] + 2 * x2[i2 + 1];
  a2[n2 - 1] = 2, b2[n2 - 1] = 7, r2[n2 - 1] = 8 * x2[n2 - 1] + x2[n2];
  for (i2 = 1; i2 < n2; ++i2)
    m2 = a2[i2] / b2[i2 - 1], b2[i2] -= m2, r2[i2] -= m2 * r2[i2 - 1];
  a2[n2 - 1] = r2[n2 - 1] / b2[n2 - 1];
  for (i2 = n2 - 2; i2 >= 0; --i2)
    a2[i2] = (r2[i2] - a2[i2 + 1]) / b2[i2];
  b2[n2 - 1] = (x2[n2] + a2[n2 - 1]) / 2;
  for (i2 = 0; i2 < n2 - 1; ++i2)
    b2[i2] = 2 * x2[i2 + 1] - a2[i2 + 1];
  return [a2, b2];
}
function pr$1(context) {
  return new Natural(context);
}
function Step(context, t2) {
  this._context = context;
  this._t = t2;
}
Step.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x = this._y = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    if (0 < this._t && this._t < 1 && this._point === 2)
      this._context.lineTo(this._x, this._y);
    if (this._line || this._line !== 0 && this._point === 1)
      this._context.closePath();
    if (this._line >= 0)
      this._t = 1 - this._t, this._line = 1 - this._line;
  },
  point: function(x2, y) {
    x2 = +x2, y = +y;
    switch (this._point) {
      case 0:
        this._point = 1;
        this._line ? this._context.lineTo(x2, y) : this._context.moveTo(x2, y);
        break;
      case 1:
        this._point = 2;
      default: {
        if (this._t <= 0) {
          this._context.lineTo(this._x, y);
          this._context.lineTo(x2, y);
        } else {
          var x1 = this._x * (1 - this._t) + x2 * this._t;
          this._context.lineTo(x1, this._y);
          this._context.lineTo(x1, y);
        }
        break;
      }
    }
    this._x = x2, this._y = y;
  }
};
function hr(context) {
  return new Step(context, 0.5);
}
function stepBefore(context) {
  return new Step(context, 0);
}
function stepAfter(context) {
  return new Step(context, 1);
}
function xr(series, order) {
  if (!((n2 = series.length) > 1))
    return;
  for (var i2 = 1, j2, s0, s1 = series[order[0]], n2, m2 = s1.length; i2 < n2; ++i2) {
    s0 = s1, s1 = series[order[i2]];
    for (j2 = 0; j2 < m2; ++j2) {
      s1[j2][1] += s1[j2][0] = isNaN(s0[j2][1]) ? s0[j2][0] : s0[j2][1];
    }
  }
}
function _r(series) {
  var n2 = series.length, o2 = new Array(n2);
  while (--n2 >= 0)
    o2[n2] = n2;
  return o2;
}
function stackValue(d, key) {
  return d[key];
}
function stackSeries(key) {
  const series = [];
  series.key = key;
  return series;
}
function G() {
  var keys2 = constant([]), order = _r, offset = xr, value = stackValue;
  function stack(data) {
    var sz = Array.from(keys2.apply(this, arguments), stackSeries), i2, n2 = sz.length, j2 = -1, oz;
    for (const d of data) {
      for (i2 = 0, ++j2; i2 < n2; ++i2) {
        (sz[i2][j2] = [0, +value(d, sz[i2].key, j2, data)]).data = d;
      }
    }
    for (i2 = 0, oz = array(order(sz)); i2 < n2; ++i2) {
      sz[oz[i2]].index = i2;
    }
    offset(sz, oz);
    return sz;
  }
  stack.keys = function(_2) {
    return arguments.length ? (keys2 = typeof _2 === "function" ? _2 : constant(Array.from(_2)), stack) : keys2;
  };
  stack.value = function(_2) {
    return arguments.length ? (value = typeof _2 === "function" ? _2 : constant(+_2), stack) : value;
  };
  stack.order = function(_2) {
    return arguments.length ? (order = _2 == null ? _r : typeof _2 === "function" ? _2 : constant(Array.from(_2)), stack) : order;
  };
  stack.offset = function(_2) {
    return arguments.length ? (offset = _2 == null ? xr : _2, stack) : offset;
  };
  return stack;
}
function z$2(series, order) {
  if (!((n2 = series.length) > 0))
    return;
  for (var i2, j2 = 0, d, dy, yp, yn2, n2, m2 = series[order[0]].length; j2 < m2; ++j2) {
    for (yp = yn2 = 0, i2 = 0; i2 < n2; ++i2) {
      if ((dy = (d = series[order[i2]][j2])[1] - d[0]) > 0) {
        d[0] = yp, d[1] = yp += dy;
      } else if (dy < 0) {
        d[1] = yn2, d[0] = yn2 += dy;
      } else {
        d[0] = 0, d[1] = dy;
      }
    }
  }
}
var baseGet$3 = _baseGet, baseSet = _baseSet, castPath$3 = _castPath;
function basePickBy$1(object2, paths, predicate) {
  var index = -1, length = paths.length, result = {};
  while (++index < length) {
    var path = paths[index], value = baseGet$3(object2, path);
    if (predicate(value, path)) {
      baseSet(result, castPath$3(path, object2), value);
    }
  }
  return result;
}
var _basePickBy = basePickBy$1;
function baseHasIn$1(object2, key) {
  return object2 != null && key in Object(object2);
}
var _baseHasIn = baseHasIn$1;
var castPath$2 = _castPath, isArguments$1 = isArguments_1, isArray$7 = isArray_1, isIndex = _isIndex, isLength = isLength_1, toKey$3 = _toKey;
function hasPath$1(object2, path, hasFunc) {
  path = castPath$2(path, object2);
  var index = -1, length = path.length, result = false;
  while (++index < length) {
    var key = toKey$3(path[index]);
    if (!(result = object2 != null && hasFunc(object2, key))) {
      break;
    }
    object2 = object2[key];
  }
  if (result || ++index != length) {
    return result;
  }
  length = object2 == null ? 0 : object2.length;
  return !!length && isLength(length) && isIndex(key, length) && (isArray$7(object2) || isArguments$1(object2));
}
var _hasPath = hasPath$1;
var baseHasIn = _baseHasIn, hasPath = _hasPath;
function hasIn$2(object2, path) {
  return object2 != null && hasPath(object2, path, baseHasIn);
}
var hasIn_1 = hasIn$2;
var basePickBy = _basePickBy, hasIn$1 = hasIn_1;
function basePick$1(object2, paths) {
  return basePickBy(object2, paths, function(value, path) {
    return hasIn$1(object2, path);
  });
}
var _basePick = basePick$1;
function arrayPush$3(array2, values) {
  var index = -1, length = values.length, offset = array2.length;
  while (++index < length) {
    array2[offset + index] = values[index];
  }
  return array2;
}
var _arrayPush = arrayPush$3;
var Symbol$3 = _Symbol, isArguments = isArguments_1, isArray$6 = isArray_1;
var spreadableSymbol = Symbol$3 ? Symbol$3.isConcatSpreadable : void 0;
function isFlattenable$1(value) {
  return isArray$6(value) || isArguments(value) || !!(spreadableSymbol && value && value[spreadableSymbol]);
}
var _isFlattenable = isFlattenable$1;
var arrayPush$2 = _arrayPush, isFlattenable = _isFlattenable;
function baseFlatten$2(array2, depth, predicate, isStrict, result) {
  var index = -1, length = array2.length;
  predicate || (predicate = isFlattenable);
  result || (result = []);
  while (++index < length) {
    var value = array2[index];
    if (depth > 0 && predicate(value)) {
      if (depth > 1) {
        baseFlatten$2(value, depth - 1, predicate, isStrict, result);
      } else {
        arrayPush$2(result, value);
      }
    } else if (!isStrict) {
      result[result.length] = value;
    }
  }
  return result;
}
var _baseFlatten = baseFlatten$2;
var baseFlatten$1 = _baseFlatten;
function flatten$1(array2) {
  var length = array2 == null ? 0 : array2.length;
  return length ? baseFlatten$1(array2, 1) : [];
}
var flatten_1 = flatten$1;
var flatten = flatten_1, overRest = _overRest, setToString = _setToString;
function flatRest$2(func) {
  return setToString(overRest(func, void 0, flatten), func + "");
}
var _flatRest = flatRest$2;
var basePick = _basePick, flatRest$1 = _flatRest;
var pick = flatRest$1(function(object2, paths) {
  return object2 == null ? {} : basePick(object2, paths);
});
var pick_1 = pick;
const Tr = /* @__PURE__ */ getDefaultExportFromCjs(pick_1);
function arraySome$1(array2, predicate) {
  var index = -1, length = array2 == null ? 0 : array2.length;
  while (++index < length) {
    if (predicate(array2[index], index, array2)) {
      return true;
    }
  }
  return false;
}
var _arraySome = arraySome$1;
var SetCache$1 = _SetCache, arraySome = _arraySome, cacheHas$1 = _cacheHas;
var COMPARE_PARTIAL_FLAG$5 = 1, COMPARE_UNORDERED_FLAG$3 = 2;
function equalArrays$2(array2, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG$5, arrLength = array2.length, othLength = other.length;
  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  }
  var arrStacked = stack.get(array2);
  var othStacked = stack.get(other);
  if (arrStacked && othStacked) {
    return arrStacked == other && othStacked == array2;
  }
  var index = -1, result = true, seen = bitmask & COMPARE_UNORDERED_FLAG$3 ? new SetCache$1() : void 0;
  stack.set(array2, other);
  stack.set(other, array2);
  while (++index < arrLength) {
    var arrValue = array2[index], othValue = other[index];
    if (customizer) {
      var compared = isPartial ? customizer(othValue, arrValue, index, other, array2, stack) : customizer(arrValue, othValue, index, array2, other, stack);
    }
    if (compared !== void 0) {
      if (compared) {
        continue;
      }
      result = false;
      break;
    }
    if (seen) {
      if (!arraySome(other, function(othValue2, othIndex) {
        if (!cacheHas$1(seen, othIndex) && (arrValue === othValue2 || equalFunc(arrValue, othValue2, bitmask, customizer, stack))) {
          return seen.push(othIndex);
        }
      })) {
        result = false;
        break;
      }
    } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
      result = false;
      break;
    }
  }
  stack["delete"](array2);
  stack["delete"](other);
  return result;
}
var _equalArrays = equalArrays$2;
function mapToArray$1(map2) {
  var index = -1, result = Array(map2.size);
  map2.forEach(function(value, key) {
    result[++index] = [key, value];
  });
  return result;
}
var _mapToArray = mapToArray$1;
function setToArray$3(set2) {
  var index = -1, result = Array(set2.size);
  set2.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}
var _setToArray = setToArray$3;
var Symbol$2 = _Symbol, Uint8Array = _Uint8Array, eq = eq_1, equalArrays$1 = _equalArrays, mapToArray = _mapToArray, setToArray$2 = _setToArray;
var COMPARE_PARTIAL_FLAG$4 = 1, COMPARE_UNORDERED_FLAG$2 = 2;
var boolTag$2 = "[object Boolean]", dateTag$2 = "[object Date]", errorTag$1 = "[object Error]", mapTag$4 = "[object Map]", numberTag$3 = "[object Number]", regexpTag$2 = "[object RegExp]", setTag$4 = "[object Set]", stringTag$2 = "[object String]", symbolTag$2 = "[object Symbol]";
var arrayBufferTag$2 = "[object ArrayBuffer]", dataViewTag$3 = "[object DataView]";
var symbolProto$1 = Symbol$2 ? Symbol$2.prototype : void 0, symbolValueOf$1 = symbolProto$1 ? symbolProto$1.valueOf : void 0;
function equalByTag$1(object2, other, tag, bitmask, customizer, equalFunc, stack) {
  switch (tag) {
    case dataViewTag$3:
      if (object2.byteLength != other.byteLength || object2.byteOffset != other.byteOffset) {
        return false;
      }
      object2 = object2.buffer;
      other = other.buffer;
    case arrayBufferTag$2:
      if (object2.byteLength != other.byteLength || !equalFunc(new Uint8Array(object2), new Uint8Array(other))) {
        return false;
      }
      return true;
    case boolTag$2:
    case dateTag$2:
    case numberTag$3:
      return eq(+object2, +other);
    case errorTag$1:
      return object2.name == other.name && object2.message == other.message;
    case regexpTag$2:
    case stringTag$2:
      return object2 == other + "";
    case mapTag$4:
      var convert = mapToArray;
    case setTag$4:
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG$4;
      convert || (convert = setToArray$2);
      if (object2.size != other.size && !isPartial) {
        return false;
      }
      var stacked = stack.get(object2);
      if (stacked) {
        return stacked == other;
      }
      bitmask |= COMPARE_UNORDERED_FLAG$2;
      stack.set(object2, other);
      var result = equalArrays$1(convert(object2), convert(other), bitmask, customizer, equalFunc, stack);
      stack["delete"](object2);
      return result;
    case symbolTag$2:
      if (symbolValueOf$1) {
        return symbolValueOf$1.call(object2) == symbolValueOf$1.call(other);
      }
  }
  return false;
}
var _equalByTag = equalByTag$1;
var arrayPush$1 = _arrayPush, isArray$5 = isArray_1;
function baseGetAllKeys$2(object2, keysFunc, symbolsFunc) {
  var result = keysFunc(object2);
  return isArray$5(object2) ? result : arrayPush$1(result, symbolsFunc(object2));
}
var _baseGetAllKeys = baseGetAllKeys$2;
function arrayFilter$2(array2, predicate) {
  var index = -1, length = array2 == null ? 0 : array2.length, resIndex = 0, result = [];
  while (++index < length) {
    var value = array2[index];
    if (predicate(value, index, array2)) {
      result[resIndex++] = value;
    }
  }
  return result;
}
var _arrayFilter = arrayFilter$2;
function stubArray$2() {
  return [];
}
var stubArray_1 = stubArray$2;
var arrayFilter$1 = _arrayFilter, stubArray$1 = stubArray_1;
var objectProto$4 = Object.prototype;
var propertyIsEnumerable = objectProto$4.propertyIsEnumerable;
var nativeGetSymbols$1 = Object.getOwnPropertySymbols;
var getSymbols$3 = !nativeGetSymbols$1 ? stubArray$1 : function(object2) {
  if (object2 == null) {
    return [];
  }
  object2 = Object(object2);
  return arrayFilter$1(nativeGetSymbols$1(object2), function(symbol) {
    return propertyIsEnumerable.call(object2, symbol);
  });
};
var _getSymbols = getSymbols$3;
var overArg = _overArg;
var nativeKeys$1 = overArg(Object.keys, Object);
var _nativeKeys = nativeKeys$1;
var isPrototype = _isPrototype, nativeKeys = _nativeKeys;
var objectProto$3 = Object.prototype;
var hasOwnProperty$3 = objectProto$3.hasOwnProperty;
function baseKeys$1(object2) {
  if (!isPrototype(object2)) {
    return nativeKeys(object2);
  }
  var result = [];
  for (var key in Object(object2)) {
    if (hasOwnProperty$3.call(object2, key) && key != "constructor") {
      result.push(key);
    }
  }
  return result;
}
var _baseKeys = baseKeys$1;
var arrayLikeKeys = _arrayLikeKeys, baseKeys = _baseKeys, isArrayLike$2 = isArrayLike_1;
function keys$5(object2) {
  return isArrayLike$2(object2) ? arrayLikeKeys(object2) : baseKeys(object2);
}
var keys_1 = keys$5;
var baseGetAllKeys$1 = _baseGetAllKeys, getSymbols$2 = _getSymbols, keys$4 = keys_1;
function getAllKeys$2(object2) {
  return baseGetAllKeys$1(object2, keys$4, getSymbols$2);
}
var _getAllKeys = getAllKeys$2;
var getAllKeys$1 = _getAllKeys;
var COMPARE_PARTIAL_FLAG$3 = 1;
var objectProto$2 = Object.prototype;
var hasOwnProperty$2 = objectProto$2.hasOwnProperty;
function equalObjects$1(object2, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG$3, objProps = getAllKeys$1(object2), objLength = objProps.length, othProps = getAllKeys$1(other), othLength = othProps.length;
  if (objLength != othLength && !isPartial) {
    return false;
  }
  var index = objLength;
  while (index--) {
    var key = objProps[index];
    if (!(isPartial ? key in other : hasOwnProperty$2.call(other, key))) {
      return false;
    }
  }
  var objStacked = stack.get(object2);
  var othStacked = stack.get(other);
  if (objStacked && othStacked) {
    return objStacked == other && othStacked == object2;
  }
  var result = true;
  stack.set(object2, other);
  stack.set(other, object2);
  var skipCtor = isPartial;
  while (++index < objLength) {
    key = objProps[index];
    var objValue = object2[key], othValue = other[key];
    if (customizer) {
      var compared = isPartial ? customizer(othValue, objValue, key, other, object2, stack) : customizer(objValue, othValue, key, object2, other, stack);
    }
    if (!(compared === void 0 ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
      result = false;
      break;
    }
    skipCtor || (skipCtor = key == "constructor");
  }
  if (result && !skipCtor) {
    var objCtor = object2.constructor, othCtor = other.constructor;
    if (objCtor != othCtor && ("constructor" in object2 && "constructor" in other) && !(typeof objCtor == "function" && objCtor instanceof objCtor && typeof othCtor == "function" && othCtor instanceof othCtor)) {
      result = false;
    }
  }
  stack["delete"](object2);
  stack["delete"](other);
  return result;
}
var _equalObjects = equalObjects$1;
var getNative$3 = _getNative, root$3 = _root;
var DataView$2 = getNative$3(root$3, "DataView");
var _DataView = DataView$2;
var getNative$2 = _getNative, root$2 = _root;
var Promise$2 = getNative$2(root$2, "Promise");
var _Promise = Promise$2;
var getNative$1 = _getNative, root$1 = _root;
var Set$3 = getNative$1(root$1, "Set");
var _Set = Set$3;
var getNative = _getNative, root = _root;
var WeakMap$2 = getNative(root, "WeakMap");
var _WeakMap = WeakMap$2;
var DataView$1 = _DataView, Map$1 = _Map, Promise$1 = _Promise, Set$2 = _Set, WeakMap$1 = _WeakMap, baseGetTag$1 = _baseGetTag, toSource = _toSource;
var mapTag$3 = "[object Map]", objectTag$2 = "[object Object]", promiseTag = "[object Promise]", setTag$3 = "[object Set]", weakMapTag$1 = "[object WeakMap]";
var dataViewTag$2 = "[object DataView]";
var dataViewCtorString = toSource(DataView$1), mapCtorString = toSource(Map$1), promiseCtorString = toSource(Promise$1), setCtorString = toSource(Set$2), weakMapCtorString = toSource(WeakMap$1);
var getTag$4 = baseGetTag$1;
if (DataView$1 && getTag$4(new DataView$1(new ArrayBuffer(1))) != dataViewTag$2 || Map$1 && getTag$4(new Map$1()) != mapTag$3 || Promise$1 && getTag$4(Promise$1.resolve()) != promiseTag || Set$2 && getTag$4(new Set$2()) != setTag$3 || WeakMap$1 && getTag$4(new WeakMap$1()) != weakMapTag$1) {
  getTag$4 = function(value) {
    var result = baseGetTag$1(value), Ctor = result == objectTag$2 ? value.constructor : void 0, ctorString = Ctor ? toSource(Ctor) : "";
    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString:
          return dataViewTag$2;
        case mapCtorString:
          return mapTag$3;
        case promiseCtorString:
          return promiseTag;
        case setCtorString:
          return setTag$3;
        case weakMapCtorString:
          return weakMapTag$1;
      }
    }
    return result;
  };
}
var _getTag = getTag$4;
var Stack$2 = _Stack, equalArrays = _equalArrays, equalByTag = _equalByTag, equalObjects = _equalObjects, getTag$3 = _getTag, isArray$4 = isArray_1, isBuffer$1 = isBufferExports, isTypedArray = isTypedArray_1;
var COMPARE_PARTIAL_FLAG$2 = 1;
var argsTag$1 = "[object Arguments]", arrayTag$1 = "[object Array]", objectTag$1 = "[object Object]";
var objectProto$1 = Object.prototype;
var hasOwnProperty$1 = objectProto$1.hasOwnProperty;
function baseIsEqualDeep$1(object2, other, bitmask, customizer, equalFunc, stack) {
  var objIsArr = isArray$4(object2), othIsArr = isArray$4(other), objTag = objIsArr ? arrayTag$1 : getTag$3(object2), othTag = othIsArr ? arrayTag$1 : getTag$3(other);
  objTag = objTag == argsTag$1 ? objectTag$1 : objTag;
  othTag = othTag == argsTag$1 ? objectTag$1 : othTag;
  var objIsObj = objTag == objectTag$1, othIsObj = othTag == objectTag$1, isSameTag = objTag == othTag;
  if (isSameTag && isBuffer$1(object2)) {
    if (!isBuffer$1(other)) {
      return false;
    }
    objIsArr = true;
    objIsObj = false;
  }
  if (isSameTag && !objIsObj) {
    stack || (stack = new Stack$2());
    return objIsArr || isTypedArray(object2) ? equalArrays(object2, other, bitmask, customizer, equalFunc, stack) : equalByTag(object2, other, objTag, bitmask, customizer, equalFunc, stack);
  }
  if (!(bitmask & COMPARE_PARTIAL_FLAG$2)) {
    var objIsWrapped = objIsObj && hasOwnProperty$1.call(object2, "__wrapped__"), othIsWrapped = othIsObj && hasOwnProperty$1.call(other, "__wrapped__");
    if (objIsWrapped || othIsWrapped) {
      var objUnwrapped = objIsWrapped ? object2.value() : object2, othUnwrapped = othIsWrapped ? other.value() : other;
      stack || (stack = new Stack$2());
      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
    }
  }
  if (!isSameTag) {
    return false;
  }
  stack || (stack = new Stack$2());
  return equalObjects(object2, other, bitmask, customizer, equalFunc, stack);
}
var _baseIsEqualDeep = baseIsEqualDeep$1;
var baseIsEqualDeep = _baseIsEqualDeep, isObjectLike$3 = isObjectLike_1;
function baseIsEqual$3(value, other, bitmask, customizer, stack) {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || !isObjectLike$3(value) && !isObjectLike$3(other)) {
    return value !== value && other !== other;
  }
  return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual$3, stack);
}
var _baseIsEqual = baseIsEqual$3;
var baseIsEqual$2 = _baseIsEqual;
function isEqual(value, other) {
  return baseIsEqual$2(value, other);
}
var isEqual_1 = isEqual;
const Mr = /* @__PURE__ */ getDefaultExportFromCjs(isEqual_1);
var Pr = { background: "transparent", text: { fontFamily: "sans-serif", fontSize: 11, fill: "#333333", outlineWidth: 0, outlineColor: "transparent", outlineOpacity: 1 }, axis: { domain: { line: { stroke: "transparent", strokeWidth: 1 } }, ticks: { line: { stroke: "#777777", strokeWidth: 1 }, text: {} }, legend: { text: { fontSize: 12 } } }, grid: { line: { stroke: "#dddddd", strokeWidth: 1 } }, legends: { hidden: { symbol: { fill: "#333333", opacity: 0.6 }, text: { fill: "#333333", opacity: 0.6 } }, text: {}, ticks: { line: { stroke: "#777777", strokeWidth: 1 }, text: { fontSize: 10 } }, title: { text: {} } }, labels: { text: {} }, markers: { lineColor: "#000000", lineStrokeWidth: 1, text: {} }, dots: { text: {} }, tooltip: { container: { background: "white", color: "inherit", fontSize: "inherit", borderRadius: "2px", boxShadow: "0 1px 2px rgba(0, 0, 0, 0.25)", padding: "5px 9px" }, basic: { whiteSpace: "pre", display: "flex", alignItems: "center" }, chip: { marginRight: 7 }, table: {}, tableCell: { padding: "3px 5px" }, tableCellValue: { fontWeight: "bold" } }, crosshair: { line: { stroke: "#000000", strokeWidth: 1, strokeOpacity: 0.75, strokeDasharray: "6 6" } }, annotations: { text: { fontSize: 13, outlineWidth: 2, outlineColor: "#ffffff", outlineOpacity: 1 }, link: { stroke: "#000000", strokeWidth: 1, outlineWidth: 2, outlineColor: "#ffffff", outlineOpacity: 1 }, outline: { fill: "none", stroke: "#000000", strokeWidth: 2, outlineWidth: 2, outlineColor: "#ffffff", outlineOpacity: 1 }, symbol: { fill: "#000000", outlineWidth: 2, outlineColor: "#ffffff", outlineOpacity: 1 } } };
function jr() {
  return jr = Object.assign ? Object.assign.bind() : function(e4) {
    for (var r2 = 1; r2 < arguments.length; r2++) {
      var t2 = arguments[r2];
      for (var n2 in t2)
        Object.prototype.hasOwnProperty.call(t2, n2) && (e4[n2] = t2[n2]);
    }
    return e4;
  }, jr.apply(this, arguments);
}
function Br(e4, r2) {
  if (null == e4)
    return {};
  var t2, n2, i2 = {}, o2 = Object.keys(e4);
  for (n2 = 0; n2 < o2.length; n2++)
    t2 = o2[n2], r2.indexOf(t2) >= 0 || (i2[t2] = e4[t2]);
  return i2;
}
var Gr = ["axis.ticks.text", "axis.legend.text", "legends.title.text", "legends.text", "legends.ticks.text", "legends.title.text", "labels.text", "dots.text", "markers.text", "annotations.text"], Lr = function(e4, r2) {
  return jr({}, r2, e4);
}, Ir = function(e4, r2) {
  var t2 = m$1({}, e4, r2);
  return Gr.forEach(function(e6) {
    v$3(t2, e6, Lr(ke$1(t2, e6), t2.text));
  }), t2;
}, Yr = reactExports.createContext(), Ar = function(e4) {
  var t2 = e4.children, n2 = e4.animate, i2 = void 0 === n2 || n2, o2 = e4.config, l2 = void 0 === o2 ? "default" : o2, a2 = reactExports.useMemo(function() {
    var e6 = O$4(l2) ? config[l2] : l2;
    return { animate: i2, config: e6 };
  }, [i2, l2]);
  return jsxRuntimeExports.jsx(Yr.Provider, { value: a2, children: t2 });
}, Er = { animate: Oe$1.bool, motionConfig: Oe$1.oneOfType([Oe$1.oneOf(Object.keys(config)), Oe$1.shape({ mass: Oe$1.number, tension: Oe$1.number, friction: Oe$1.number, clamp: Oe$1.bool, precision: Oe$1.number, velocity: Oe$1.number, duration: Oe$1.number, easing: Oe$1.func })]) };
Ar.propTypes = { children: Oe$1.node.isRequired, animate: Er.animate, config: Er.motionConfig };
var Ur = function() {
  return reactExports.useContext(Yr);
}, Fr = function(e4) {
  var t2 = Ur(), o2 = t2.animate, l2 = t2.config, a2 = function(e6) {
    var r2 = reactExports.useRef();
    return reactExports.useEffect(function() {
      r2.current = e6;
    }, [e6]), r2.current;
  }(e4), d = reactExports.useMemo(function() {
    return _$3(a2, e4);
  }, [a2, e4]), s = useSpring({ from: { value: 0 }, to: { value: 1 }, reset: true, config: l2, immediate: !o2 }).value;
  return to(s, d);
}, Xr = { nivo: ["#d76445", "#f47560", "#e8c1a0", "#97e3d5", "#61cdbb", "#00b0a7"], BrBG: e$2(scheme$q), PRGn: e$2(scheme$p), PiYG: e$2(scheme$o), PuOr: e$2(scheme$n), RdBu: e$2(scheme$m), RdGy: e$2(scheme$l), RdYlBu: e$2(scheme$k), RdYlGn: e$2(scheme$j), spectral: e$2(scheme$i), blues: e$2(scheme$5), greens: e$2(scheme$4), greys: e$2(scheme$3), oranges: e$2(scheme), purples: e$2(scheme$2), reds: e$2(scheme$1), BuGn: e$2(scheme$h), BuPu: e$2(scheme$g), GnBu: e$2(scheme$f), OrRd: e$2(scheme$e), PuBuGn: e$2(scheme$d), PuBu: e$2(scheme$c), PuRd: e$2(scheme$b), RdPu: e$2(scheme$a), YlGnBu: e$2(scheme$9), YlGn: e$2(scheme$8), YlOrBr: e$2(scheme$7), YlOrRd: e$2(scheme$6) }, Hr = Object.keys(Xr);
({ nivo: ["#e8c1a0", "#f47560", "#f1e15b", "#e8a838", "#61cdbb", "#97e3d5"], category10: e$1, accent: r, dark2: n, paired: t, pastel1: o$1, pastel2: i, set1: u$1, set2: a$1, set3: l, brown_blueGreen: e$2(scheme$q), purpleRed_green: e$2(scheme$p), pink_yellowGreen: e$2(scheme$o), purple_orange: e$2(scheme$n), red_blue: e$2(scheme$m), red_grey: e$2(scheme$l), red_yellow_blue: e$2(scheme$k), red_yellow_green: e$2(scheme$j), spectral: e$2(scheme$i), blues: e$2(scheme$5), greens: e$2(scheme$4), greys: e$2(scheme$3), oranges: e$2(scheme), purples: e$2(scheme$2), reds: e$2(scheme$1), blue_green: e$2(scheme$h), blue_purple: e$2(scheme$g), green_blue: e$2(scheme$f), orange_red: e$2(scheme$e), purple_blue_green: e$2(scheme$d), purple_blue: e$2(scheme$c), purple_red: e$2(scheme$b), red_purple: e$2(scheme$a), yellow_green_blue: e$2(scheme$9), yellow_green: e$2(scheme$8), yellow_orange_brown: e$2(scheme$7), yellow_orange_red: e$2(scheme$6) });
Oe$1.oneOfType([Oe$1.oneOf(Hr), Oe$1.func, Oe$1.arrayOf(Oe$1.string)]);
var rt = { basis: $e$1, basisClosed: er, basisOpen: rr, bundle: tr, cardinal: nr, cardinalClosed: ir, cardinalOpen: or, catmullRom: lr, catmullRomClosed: ar, catmullRomOpen: dr, linear: sr, linearClosed: ur, monotoneX, monotoneY, natural: pr$1, step: hr, stepAfter, stepBefore }, tt = Object.keys(rt);
tt.filter(function(e4) {
  return e4.endsWith("Closed");
});
Ze(tt, "bundle", "basisClosed", "basisOpen", "cardinalClosed", "cardinalOpen", "catmullRomClosed", "catmullRomOpen", "linearClosed");
Ze(tt, "bundle", "basisClosed", "basisOpen", "cardinalClosed", "cardinalOpen", "catmullRomClosed", "catmullRomOpen", "linearClosed");
Oe$1.shape({ top: Oe$1.number, right: Oe$1.number, bottom: Oe$1.number, left: Oe$1.number }).isRequired;
var ht = ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"];
Oe$1.oneOf(ht);
ordinal(l);
var _t = { top: 0, right: 0, bottom: 0, left: 0 }, wt = function(e4, t2, n2) {
  return void 0 === n2 && (n2 = {}), reactExports.useMemo(function() {
    var r2 = jr({}, _t, n2);
    return { margin: r2, innerWidth: e4 - r2.left - r2.right, innerHeight: t2 - r2.top - r2.bottom, outerWidth: e4, outerHeight: t2 };
  }, [e4, t2, n2.top, n2.right, n2.bottom, n2.left]);
}, kt = function() {
  var e4 = reactExports.useRef(null), r2 = reactExports.useState({ left: 0, top: 0, width: 0, height: 0 }), t2 = r2[0], l2 = r2[1], a2 = reactExports.useState(function() {
    return "undefined" == typeof ResizeObserver ? null : new ResizeObserver(function(e6) {
      var r3 = e6[0];
      return l2(r3.contentRect);
    });
  })[0];
  return reactExports.useEffect(function() {
    return e4.current && null !== a2 && a2.observe(e4.current), function() {
      null !== a2 && a2.disconnect();
    };
  }, []), [e4, t2];
}, Rt = function(e4) {
  return reactExports.useMemo(function() {
    return Ir(Pr, e4);
  }, [e4]);
}, xt = function(e4) {
  return "function" == typeof e4 ? e4 : "string" == typeof e4 ? 0 === e4.indexOf("time:") ? timeFormat(e4.slice("5")) : format(e4) : function(e6) {
    return "" + e6;
  };
}, Ot = function(e4) {
  return reactExports.useMemo(function() {
    return xt(e4);
  }, [e4]);
}, qt = reactExports.createContext(), Ct = {}, Wt = function(e4) {
  var r2 = e4.theme, t2 = void 0 === r2 ? Ct : r2, n2 = e4.children, i2 = Rt(t2);
  return jsxRuntimeExports.jsx(qt.Provider, { value: i2, children: n2 });
};
Wt.propTypes = { children: Oe$1.node.isRequired, theme: Oe$1.object };
var zt = function() {
  return reactExports.useContext(qt);
}, Tt = ["outlineWidth", "outlineColor", "outlineOpacity"], Mt = function(e4) {
  return e4.outlineWidth, e4.outlineColor, e4.outlineOpacity, Br(e4, Tt);
}, Pt = function(e4) {
  var r2 = e4.children, t2 = e4.condition, n2 = e4.wrapper;
  return t2 ? reactExports.cloneElement(n2, {}, r2) : r2;
};
Pt.propTypes = { children: Oe$1.node.isRequired, condition: Oe$1.bool.isRequired, wrapper: Oe$1.element.isRequired };
var jt = { position: "relative" }, St = function(e4) {
  var r2 = e4.children, t2 = e4.theme, i2 = e4.renderWrapper, o2 = void 0 === i2 || i2, l2 = e4.isInteractive, a2 = void 0 === l2 || l2, d = e4.animate, s = e4.motionConfig, u2 = reactExports.useRef(null);
  return jsxRuntimeExports.jsx(Wt, { theme: t2, children: jsxRuntimeExports.jsx(Ar, { animate: d, config: s, children: jsxRuntimeExports.jsx(M$1, { container: u2, children: jsxRuntimeExports.jsxs(Pt, { condition: o2, wrapper: jsxRuntimeExports.jsx("div", { style: jt, ref: u2 }), children: [r2, a2 && jsxRuntimeExports.jsx(F, {})] }) }) }) });
};
St.propTypes = { children: Oe$1.element.isRequired, isInteractive: Oe$1.bool, renderWrapper: Oe$1.bool, theme: Oe$1.object, animate: Oe$1.bool, motionConfig: Oe$1.string };
({ children: Oe$1.func.isRequired, isInteractive: Oe$1.bool, renderWrapper: Oe$1.bool, theme: Oe$1.object.isRequired, animate: Oe$1.bool.isRequired, motionConfig: Oe$1.string });
var It = function(e4) {
  var r2 = e4.children, t2 = kt(), n2 = t2[0], i2 = t2[1], o2 = i2.width > 0 && i2.height > 0;
  return jsxRuntimeExports.jsx("div", { ref: n2, style: { width: "100%", height: "100%" }, children: o2 && r2({ width: i2.width, height: i2.height }) });
};
It.propTypes = { children: Oe$1.func.isRequired };
var Yt = ["id", "colors"], Dt = function(e4) {
  var r2 = e4.id, t2 = e4.colors, n2 = Br(e4, Yt);
  return jsxRuntimeExports.jsx("linearGradient", jr({ id: r2, x1: 0, x2: 0, y1: 0, y2: 1 }, n2, { children: t2.map(function(e6) {
    var r3 = e6.offset, t3 = e6.color, n3 = e6.opacity;
    return jsxRuntimeExports.jsx("stop", { offset: r3 + "%", stopColor: t3, stopOpacity: void 0 !== n3 ? n3 : 1 }, r3);
  }) }));
};
Dt.propTypes = { id: Oe$1.string.isRequired, colors: Oe$1.arrayOf(Oe$1.shape({ offset: Oe$1.number.isRequired, color: Oe$1.string.isRequired, opacity: Oe$1.number })).isRequired, gradientTransform: Oe$1.string };
var Et = { linearGradient: Dt }, Ut = { color: "#000000", background: "#ffffff", size: 4, padding: 4, stagger: false }, Ft = reactExports.memo(function(e4) {
  var r2 = e4.id, t2 = e4.background, n2 = void 0 === t2 ? Ut.background : t2, i2 = e4.color, o2 = void 0 === i2 ? Ut.color : i2, l2 = e4.size, a2 = void 0 === l2 ? Ut.size : l2, d = e4.padding, s = void 0 === d ? Ut.padding : d, u2 = e4.stagger, c6 = void 0 === u2 ? Ut.stagger : u2, f2 = a2 + s, p2 = a2 / 2, h = s / 2;
  return true === c6 && (f2 = 2 * a2 + 2 * s), jsxRuntimeExports.jsxs("pattern", { id: r2, width: f2, height: f2, patternUnits: "userSpaceOnUse", children: [jsxRuntimeExports.jsx("rect", { width: f2, height: f2, fill: n2 }), jsxRuntimeExports.jsx("circle", { cx: h + p2, cy: h + p2, r: p2, fill: o2 }), c6 && jsxRuntimeExports.jsx("circle", { cx: 1.5 * s + a2 + p2, cy: 1.5 * s + a2 + p2, r: p2, fill: o2 })] });
});
Ft.displayName = "PatternDots", Ft.propTypes = { id: Oe$1.string.isRequired, color: Oe$1.string.isRequired, background: Oe$1.string.isRequired, size: Oe$1.number.isRequired, padding: Oe$1.number.isRequired, stagger: Oe$1.bool.isRequired };
var Kt = function(e4) {
  return e4 * Math.PI / 180;
}, Nt = function(e4) {
  return 180 * e4 / Math.PI;
}, Jt = function(e4, r2) {
  return { x: Math.cos(e4) * r2, y: Math.sin(e4) * r2 };
}, Qt = function(e4) {
  var r2 = e4 % 360;
  return r2 < 0 && (r2 += 360), r2;
}, rn$1 = { svg: { align: { left: "start", center: "middle", right: "end", start: "start", middle: "middle", end: "end" }, baseline: { top: "text-before-edge", center: "central", bottom: "alphabetic" } }, canvas: { align: { left: "left", center: "center", right: "right", start: "left", middle: "center", end: "right" }, baseline: { top: "top", center: "middle", bottom: "bottom" } } }, nn$1 = { spacing: 5, rotation: 0, background: "#000000", color: "#ffffff", lineWidth: 2 }, on = reactExports.memo(function(e4) {
  var r2 = e4.id, t2 = e4.spacing, n2 = void 0 === t2 ? nn$1.spacing : t2, i2 = e4.rotation, o2 = void 0 === i2 ? nn$1.rotation : i2, l2 = e4.background, a2 = void 0 === l2 ? nn$1.background : l2, d = e4.color, s = void 0 === d ? nn$1.color : d, u2 = e4.lineWidth, c6 = void 0 === u2 ? nn$1.lineWidth : u2, f2 = Math.round(o2) % 360, p2 = Math.abs(n2);
  f2 > 180 ? f2 -= 360 : f2 > 90 ? f2 -= 180 : f2 < -180 ? f2 += 360 : f2 < -90 && (f2 += 180);
  var h, g2 = p2, b2 = p2;
  return 0 === f2 ? h = "\n                M 0 0 L " + g2 + " 0\n                M 0 " + b2 + " L " + g2 + " " + b2 + "\n            " : 90 === f2 ? h = "\n                M 0 0 L 0 " + b2 + "\n                M " + g2 + " 0 L " + g2 + " " + b2 + "\n            " : (g2 = Math.abs(p2 / Math.sin(Kt(f2))), b2 = p2 / Math.sin(Kt(90 - f2)), h = f2 > 0 ? "\n                    M 0 " + -b2 + " L " + 2 * g2 + " " + b2 + "\n                    M " + -g2 + " " + -b2 + " L " + g2 + " " + b2 + "\n                    M " + -g2 + " 0 L " + g2 + " " + 2 * b2 + "\n                " : "\n                    M " + -g2 + " " + b2 + " L " + g2 + " " + -b2 + "\n                    M " + -g2 + " " + 2 * b2 + " L " + 2 * g2 + " " + -b2 + "\n                    M 0 " + 2 * b2 + " L " + 2 * g2 + " 0\n                "), jsxRuntimeExports.jsxs("pattern", { id: r2, width: g2, height: b2, patternUnits: "userSpaceOnUse", children: [jsxRuntimeExports.jsx("rect", { width: g2, height: b2, fill: a2, stroke: "rgba(255, 0, 0, 0.1)", strokeWidth: 0 }), jsxRuntimeExports.jsx("path", { d: h, strokeWidth: c6, stroke: s, strokeLinecap: "square" })] });
});
on.displayName = "PatternLines", on.propTypes = { id: Oe$1.string.isRequired, spacing: Oe$1.number.isRequired, rotation: Oe$1.number.isRequired, background: Oe$1.string.isRequired, color: Oe$1.string.isRequired, lineWidth: Oe$1.number.isRequired };
var an = { color: "#000000", background: "#ffffff", size: 4, padding: 4, stagger: false }, dn = reactExports.memo(function(e4) {
  var r2 = e4.id, t2 = e4.color, n2 = void 0 === t2 ? an.color : t2, i2 = e4.background, o2 = void 0 === i2 ? an.background : i2, l2 = e4.size, a2 = void 0 === l2 ? an.size : l2, d = e4.padding, s = void 0 === d ? an.padding : d, u2 = e4.stagger, c6 = void 0 === u2 ? an.stagger : u2, f2 = a2 + s, p2 = s / 2;
  return true === c6 && (f2 = 2 * a2 + 2 * s), jsxRuntimeExports.jsxs("pattern", { id: r2, width: f2, height: f2, patternUnits: "userSpaceOnUse", children: [jsxRuntimeExports.jsx("rect", { width: f2, height: f2, fill: o2 }), jsxRuntimeExports.jsx("rect", { x: p2, y: p2, width: a2, height: a2, fill: n2 }), c6 && jsxRuntimeExports.jsx("rect", { x: 1.5 * s + a2, y: 1.5 * s + a2, width: a2, height: a2, fill: n2 })] });
});
dn.displayName = "PatternSquares", dn.propTypes = { id: Oe$1.string.isRequired, color: Oe$1.string.isRequired, background: Oe$1.string.isRequired, size: Oe$1.number.isRequired, padding: Oe$1.number.isRequired, stagger: Oe$1.bool.isRequired };
var un = { patternDots: Ft, patternLines: on, patternSquares: dn }, cn$1 = ["type"], fn = jr({}, Et, un), pn$1 = function(e4) {
  var r2 = e4.defs;
  return !r2 || r2.length < 1 ? null : jsxRuntimeExports.jsx("defs", { "aria-hidden": true, children: r2.map(function(e6) {
    var r3 = e6.type, t2 = Br(e6, cn$1);
    return fn[r3] ? reactExports.createElement(fn[r3], jr({ key: t2.id }, t2)) : null;
  }) });
};
pn$1.propTypes = { defs: Oe$1.arrayOf(Oe$1.shape({ type: Oe$1.oneOf(Object.keys(fn)).isRequired, id: Oe$1.string.isRequired })) };
var hn$1 = reactExports.memo(pn$1), gn$1 = function(e4) {
  var r2 = e4.width, t2 = e4.height, n2 = e4.margin, i2 = e4.defs, o2 = e4.children, l2 = e4.role, a2 = e4.ariaLabel, d = e4.ariaLabelledBy, s = e4.ariaDescribedBy, u2 = e4.isFocusable, c6 = zt();
  return jsxRuntimeExports.jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: r2, height: t2, role: l2, "aria-label": a2, "aria-labelledby": d, "aria-describedby": s, focusable: u2, tabIndex: u2 ? 0 : void 0, children: [jsxRuntimeExports.jsx(hn$1, { defs: i2 }), jsxRuntimeExports.jsx("rect", { width: r2, height: t2, fill: c6.background }), jsxRuntimeExports.jsx("g", { transform: "translate(" + n2.left + "," + n2.top + ")", children: o2 })] });
};
gn$1.propTypes = { width: Oe$1.number.isRequired, height: Oe$1.number.isRequired, margin: Oe$1.shape({ top: Oe$1.number.isRequired, left: Oe$1.number.isRequired }).isRequired, defs: Oe$1.array, children: Oe$1.oneOfType([Oe$1.arrayOf(Oe$1.node), Oe$1.node]).isRequired, role: Oe$1.string, isFocusable: Oe$1.bool, ariaLabel: Oe$1.string, ariaLabelledBy: Oe$1.string, ariaDescribedBy: Oe$1.string };
var bn = function(e4) {
  var r2 = e4.size, t2 = e4.color, n2 = e4.borderWidth, i2 = e4.borderColor;
  return jsxRuntimeExports.jsx("circle", { r: r2 / 2, fill: t2, stroke: i2, strokeWidth: n2, style: { pointerEvents: "none" } });
};
bn.propTypes = { size: Oe$1.number.isRequired, color: Oe$1.string.isRequired, borderWidth: Oe$1.number.isRequired, borderColor: Oe$1.string.isRequired };
var mn = reactExports.memo(bn), yn = function(e4) {
  var r2 = e4.x, t2 = e4.y, n2 = e4.symbol, i2 = void 0 === n2 ? mn : n2, o2 = e4.size, l2 = e4.datum, a2 = e4.color, d = e4.borderWidth, u2 = e4.borderColor, c6 = e4.label, f2 = e4.labelTextAnchor, p2 = void 0 === f2 ? "middle" : f2, h = e4.labelYOffset, g2 = void 0 === h ? -12 : h, b2 = zt(), m2 = Ur(), y = m2.animate, v2 = m2.config, _2 = useSpring({ transform: "translate(" + r2 + ", " + t2 + ")", config: v2, immediate: !y });
  return jsxRuntimeExports.jsxs(animated$3.g, { transform: _2.transform, style: { pointerEvents: "none" }, children: [reactExports.createElement(i2, { size: o2, color: a2, datum: l2, borderWidth: d, borderColor: u2 }), c6 && jsxRuntimeExports.jsx("text", { textAnchor: p2, y: g2, style: Mt(b2.dots.text), children: c6 })] });
};
yn.propTypes = { x: Oe$1.number.isRequired, y: Oe$1.number.isRequired, datum: Oe$1.object.isRequired, size: Oe$1.number.isRequired, color: Oe$1.string.isRequired, borderWidth: Oe$1.number.isRequired, borderColor: Oe$1.string.isRequired, symbol: Oe$1.oneOfType([Oe$1.func, Oe$1.object]), label: Oe$1.oneOfType([Oe$1.string, Oe$1.number]), labelTextAnchor: Oe$1.oneOf(["start", "middle", "end"]), labelYOffset: Oe$1.number };
reactExports.memo(yn);
var _n = function(e4) {
  var r2 = e4.width, t2 = e4.height, n2 = e4.axis, i2 = e4.scale, o2 = e4.value, l2 = e4.lineStyle, a2 = e4.textStyle, d = e4.legend, s = e4.legendPosition, u2 = void 0 === s ? "top-right" : s, c6 = e4.legendOffsetX, f2 = void 0 === c6 ? 14 : c6, p2 = e4.legendOffsetY, h = void 0 === p2 ? 14 : p2, g2 = e4.legendOrientation, b2 = void 0 === g2 ? "horizontal" : g2, m2 = zt(), y = 0, v2 = 0, _2 = 0, w2 = 0;
  "y" === n2 ? (_2 = i2(o2), v2 = r2) : (y = i2(o2), w2 = t2);
  var k2 = null;
  if (d) {
    var R2 = function(e6) {
      var r3 = e6.axis, t3 = e6.width, n3 = e6.height, i3 = e6.position, o3 = e6.offsetX, l3 = e6.offsetY, a3 = e6.orientation, d2 = 0, s2 = 0, u3 = "vertical" === a3 ? -90 : 0, c7 = "start";
      if ("x" === r3)
        switch (i3) {
          case "top-left":
            d2 = -o3, s2 = l3, c7 = "end";
            break;
          case "top":
            s2 = -l3, c7 = "horizontal" === a3 ? "middle" : "start";
            break;
          case "top-right":
            d2 = o3, s2 = l3, c7 = "horizontal" === a3 ? "start" : "end";
            break;
          case "right":
            d2 = o3, s2 = n3 / 2, c7 = "horizontal" === a3 ? "start" : "middle";
            break;
          case "bottom-right":
            d2 = o3, s2 = n3 - l3, c7 = "start";
            break;
          case "bottom":
            s2 = n3 + l3, c7 = "horizontal" === a3 ? "middle" : "end";
            break;
          case "bottom-left":
            s2 = n3 - l3, d2 = -o3, c7 = "horizontal" === a3 ? "end" : "start";
            break;
          case "left":
            d2 = -o3, s2 = n3 / 2, c7 = "horizontal" === a3 ? "end" : "middle";
        }
      else
        switch (i3) {
          case "top-left":
            d2 = o3, s2 = -l3, c7 = "start";
            break;
          case "top":
            d2 = t3 / 2, s2 = -l3, c7 = "horizontal" === a3 ? "middle" : "start";
            break;
          case "top-right":
            d2 = t3 - o3, s2 = -l3, c7 = "horizontal" === a3 ? "end" : "start";
            break;
          case "right":
            d2 = t3 + o3, c7 = "horizontal" === a3 ? "start" : "middle";
            break;
          case "bottom-right":
            d2 = t3 - o3, s2 = l3, c7 = "end";
            break;
          case "bottom":
            d2 = t3 / 2, s2 = l3, c7 = "horizontal" === a3 ? "middle" : "end";
            break;
          case "bottom-left":
            d2 = o3, s2 = l3, c7 = "horizontal" === a3 ? "start" : "end";
            break;
          case "left":
            d2 = -o3, c7 = "horizontal" === a3 ? "end" : "middle";
        }
      return { x: d2, y: s2, rotation: u3, textAnchor: c7 };
    }({ axis: n2, width: r2, height: t2, position: u2, offsetX: f2, offsetY: h, orientation: b2 });
    k2 = jsxRuntimeExports.jsx("text", { transform: "translate(" + R2.x + ", " + R2.y + ") rotate(" + R2.rotation + ")", textAnchor: R2.textAnchor, dominantBaseline: "central", style: a2, children: d });
  }
  return jsxRuntimeExports.jsxs("g", { transform: "translate(" + y + ", " + _2 + ")", children: [jsxRuntimeExports.jsx("line", { x1: 0, x2: v2, y1: 0, y2: w2, stroke: m2.markers.lineColor, strokeWidth: m2.markers.lineStrokeWidth, style: l2 }), k2] });
};
_n.propTypes = { width: Oe$1.number.isRequired, height: Oe$1.number.isRequired, axis: Oe$1.oneOf(["x", "y"]).isRequired, scale: Oe$1.func.isRequired, value: Oe$1.oneOfType([Oe$1.number, Oe$1.string, Oe$1.instanceOf(Date)]).isRequired, lineStyle: Oe$1.object, textStyle: Oe$1.object, legend: Oe$1.string, legendPosition: Oe$1.oneOf(["top-left", "top", "top-right", "right", "bottom-right", "bottom", "bottom-left", "left"]), legendOffsetX: Oe$1.number.isRequired, legendOffsetY: Oe$1.number.isRequired, legendOrientation: Oe$1.oneOf(["horizontal", "vertical"]).isRequired };
var wn = reactExports.memo(_n), kn$1 = function(e4) {
  var r2 = e4.markers, t2 = e4.width, n2 = e4.height, i2 = e4.xScale, o2 = e4.yScale;
  return r2 && 0 !== r2.length ? r2.map(function(e6, r3) {
    return jsxRuntimeExports.jsx(wn, jr({}, e6, { width: t2, height: n2, scale: "y" === e6.axis ? o2 : i2 }), r3);
  }) : null;
};
kn$1.propTypes = { width: Oe$1.number.isRequired, height: Oe$1.number.isRequired, xScale: Oe$1.func.isRequired, yScale: Oe$1.func.isRequired, markers: Oe$1.arrayOf(Oe$1.shape({ axis: Oe$1.oneOf(["x", "y"]).isRequired, value: Oe$1.oneOfType([Oe$1.number, Oe$1.string, Oe$1.instanceOf(Date)]).isRequired, lineStyle: Oe$1.object, textStyle: Oe$1.object })) };
var Rn = reactExports.memo(kn$1), Cn = function(e4) {
  return Qe(e4) ? e4 : function(r2) {
    return ke$1(r2, e4);
  };
}, Wn = function(e4) {
  return reactExports.useMemo(function() {
    return Cn(e4);
  }, [e4]);
}, jn = function(e4, r2, t2, n2, i2, o2) {
  return e4 <= i2 && i2 <= e4 + t2 && r2 <= o2 && o2 <= r2 + n2;
}, Sn = function(e4, r2) {
  var t2, n2 = "touches" in r2 ? r2.touches[0] : r2, i2 = n2.clientX, o2 = n2.clientY, l2 = e4.getBoundingClientRect(), a2 = (t2 = void 0 !== e4.getBBox ? e4.getBBox() : { width: e4.offsetWidth || 0, height: e4.offsetHeight || 0 }).width === l2.width ? 1 : t2.width / l2.width;
  return [(i2 - l2.left) * a2, (o2 - l2.top) * a2];
}, Bn = Object.keys(Et), Gn = Object.keys(un), Ln = function(e4, r2, t2) {
  if ("*" === e4)
    return true;
  if (Qe(e4))
    return e4(r2);
  if (je(e4)) {
    var n2 = t2 ? ke$1(r2, t2) : r2;
    return Mr(Tr(n2, Object.keys(e4)), e4);
  }
  return false;
}, In = function(e4, r2, t2, n2) {
  var i2 = void 0 === n2 ? {} : n2, o2 = i2.dataKey, l2 = i2.colorKey, a2 = void 0 === l2 ? "color" : l2, d = i2.targetKey, s = void 0 === d ? "fill" : d, u2 = [], c6 = {};
  return e4.length && r2.length && (u2 = [].concat(e4), r2.forEach(function(r3) {
    for (var n3 = function() {
      var n4 = t2[i3], l3 = n4.id, d2 = n4.match;
      if (Ln(d2, r3, o2)) {
        var f2 = e4.find(function(e6) {
          return e6.id === l3;
        });
        if (f2) {
          if (Gn.includes(f2.type))
            if ("inherit" === f2.background || "inherit" === f2.color) {
              var p2 = ke$1(r3, a2), h = f2.background, g2 = f2.color, b2 = l3;
              "inherit" === f2.background && (b2 = b2 + ".bg." + p2, h = p2), "inherit" === f2.color && (b2 = b2 + ".fg." + p2, g2 = p2), v$3(r3, s, "url(#" + b2 + ")"), c6[b2] || (u2.push(jr({}, f2, { id: b2, background: h, color: g2 })), c6[b2] = 1);
            } else
              v$3(r3, s, "url(#" + l3 + ")");
          else if (Bn.includes(f2.type)) {
            if (f2.colors.map(function(e6) {
              return e6.color;
            }).includes("inherit")) {
              var m2 = ke$1(r3, a2), _2 = l3, w2 = jr({}, f2, { colors: f2.colors.map(function(e6, r4) {
                return "inherit" !== e6.color ? e6 : (_2 = _2 + "." + r4 + "." + m2, jr({}, e6, { color: "inherit" === e6.color ? m2 : e6.color }));
              }) });
              w2.id = _2, v$3(r3, s, "url(#" + _2 + ")"), c6[_2] || (u2.push(w2), c6[_2] = 1);
            } else
              v$3(r3, s, "url(#" + l3 + ")");
          }
        }
        return "break";
      }
    }, i3 = 0; i3 < t2.length; i3++) {
      if ("break" === n3())
        break;
    }
  })), u2;
};
var isCustomPropRE$2 = /^--/;
function dangerousStyleValue$2(name, value) {
  if (value == null || typeof value === "boolean" || value === "")
    return "";
  if (typeof value === "number" && value !== 0 && !isCustomPropRE$2.test(name) && !(isUnitlessNumber$2.hasOwnProperty(name) && isUnitlessNumber$2[name]))
    return value + "px";
  return ("" + value).trim();
}
var attributeCache$2 = {};
function applyAnimatedValues$2(instance, props) {
  if (!instance.nodeType || !instance.setAttribute) {
    return false;
  }
  const isFilterElement = instance.nodeName === "filter" || instance.parentNode && instance.parentNode.nodeName === "filter";
  const { style, children, scrollTop, scrollLeft, viewBox, ...attributes } = props;
  const values = Object.values(attributes);
  const names = Object.keys(attributes).map(
    (name) => isFilterElement || instance.hasAttribute(name) ? name : attributeCache$2[name] || (attributeCache$2[name] = name.replace(
      /([A-Z])/g,
      // Attributes are written in dash case
      (n2) => "-" + n2.toLowerCase()
    ))
  );
  if (children !== void 0) {
    instance.textContent = children;
  }
  for (const name in style) {
    if (style.hasOwnProperty(name)) {
      const value = dangerousStyleValue$2(name, style[name]);
      if (isCustomPropRE$2.test(name)) {
        instance.style.setProperty(name, value);
      } else {
        instance.style[name] = value;
      }
    }
  }
  names.forEach((name, i2) => {
    instance.setAttribute(name, values[i2]);
  });
  if (scrollTop !== void 0) {
    instance.scrollTop = scrollTop;
  }
  if (scrollLeft !== void 0) {
    instance.scrollLeft = scrollLeft;
  }
  if (viewBox !== void 0) {
    instance.setAttribute("viewBox", viewBox);
  }
}
var isUnitlessNumber$2 = {
  animationIterationCount: true,
  borderImageOutset: true,
  borderImageSlice: true,
  borderImageWidth: true,
  boxFlex: true,
  boxFlexGroup: true,
  boxOrdinalGroup: true,
  columnCount: true,
  columns: true,
  flex: true,
  flexGrow: true,
  flexPositive: true,
  flexShrink: true,
  flexNegative: true,
  flexOrder: true,
  gridRow: true,
  gridRowEnd: true,
  gridRowSpan: true,
  gridRowStart: true,
  gridColumn: true,
  gridColumnEnd: true,
  gridColumnSpan: true,
  gridColumnStart: true,
  fontWeight: true,
  lineClamp: true,
  lineHeight: true,
  opacity: true,
  order: true,
  orphans: true,
  tabSize: true,
  widows: true,
  zIndex: true,
  zoom: true,
  // SVG-related properties
  fillOpacity: true,
  floodOpacity: true,
  stopOpacity: true,
  strokeDasharray: true,
  strokeDashoffset: true,
  strokeMiterlimit: true,
  strokeOpacity: true,
  strokeWidth: true
};
var prefixKey$2 = (prefix2, key) => prefix2 + key.charAt(0).toUpperCase() + key.substring(1);
var prefixes$2 = ["Webkit", "Ms", "Moz", "O"];
isUnitlessNumber$2 = Object.keys(isUnitlessNumber$2).reduce((acc, prop) => {
  prefixes$2.forEach((prefix2) => acc[prefixKey$2(prefix2, prop)] = acc[prop]);
  return acc;
}, isUnitlessNumber$2);
var domTransforms$2 = /^(matrix|translate|scale|rotate|skew)/;
var pxTransforms$2 = /^(translate)/;
var degTransforms$2 = /^(rotate|skew)/;
var addUnit$2 = (value, unit2) => is.num(value) && value !== 0 ? value + unit2 : value;
var isValueIdentity$2 = (value, id) => is.arr(value) ? value.every((v2) => isValueIdentity$2(v2, id)) : is.num(value) ? value === id : parseFloat(value) === id;
var AnimatedStyle$2 = class AnimatedStyle3 extends AnimatedObject {
  constructor({ x: x2, y, z: z2, ...style }) {
    const inputs = [];
    const transforms = [];
    if (x2 || y || z2) {
      inputs.push([x2 || 0, y || 0, z2 || 0]);
      transforms.push((xyz) => [
        `translate3d(${xyz.map((v2) => addUnit$2(v2, "px")).join(",")})`,
        // prettier-ignore
        isValueIdentity$2(xyz, 0)
      ]);
    }
    eachProp(style, (value, key) => {
      if (key === "transform") {
        inputs.push([value || ""]);
        transforms.push((transform) => [transform, transform === ""]);
      } else if (domTransforms$2.test(key)) {
        delete style[key];
        if (is.und(value))
          return;
        const unit2 = pxTransforms$2.test(key) ? "px" : degTransforms$2.test(key) ? "deg" : "";
        inputs.push(toArray(value));
        transforms.push(
          key === "rotate3d" ? ([x22, y2, z22, deg]) => [
            `rotate3d(${x22},${y2},${z22},${addUnit$2(deg, unit2)})`,
            isValueIdentity$2(deg, 0)
          ] : (input) => [
            `${key}(${input.map((v2) => addUnit$2(v2, unit2)).join(",")})`,
            isValueIdentity$2(input, key.startsWith("scale") ? 1 : 0)
          ]
        );
      }
    });
    if (inputs.length) {
      style.transform = new FluidTransform$2(inputs, transforms);
    }
    super(style);
  }
};
var FluidTransform$2 = class FluidTransform3 extends FluidValue {
  constructor(inputs, transforms) {
    super();
    this.inputs = inputs;
    this.transforms = transforms;
    this._value = null;
  }
  get() {
    return this._value || (this._value = this._get());
  }
  _get() {
    let transform = "";
    let identity2 = true;
    each(this.inputs, (input, i2) => {
      const arg1 = getFluidValue(input[0]);
      const [t2, id] = this.transforms[i2](
        is.arr(arg1) ? arg1 : input.map(getFluidValue)
      );
      transform += " " + t2;
      identity2 = identity2 && id;
    });
    return identity2 ? "none" : transform;
  }
  // Start observing our inputs once we have an observer.
  observerAdded(count) {
    if (count == 1)
      each(
        this.inputs,
        (input) => each(
          input,
          (value) => hasFluidValue(value) && addFluidObserver(value, this)
        )
      );
  }
  // Stop observing our inputs once we have no observers.
  observerRemoved(count) {
    if (count == 0)
      each(
        this.inputs,
        (input) => each(
          input,
          (value) => hasFluidValue(value) && removeFluidObserver(value, this)
        )
      );
  }
  eventObserved(event) {
    if (event.type == "change") {
      this._value = null;
    }
    callFluidObservers(this, event);
  }
};
var primitives$2 = [
  "a",
  "abbr",
  "address",
  "area",
  "article",
  "aside",
  "audio",
  "b",
  "base",
  "bdi",
  "bdo",
  "big",
  "blockquote",
  "body",
  "br",
  "button",
  "canvas",
  "caption",
  "cite",
  "code",
  "col",
  "colgroup",
  "data",
  "datalist",
  "dd",
  "del",
  "details",
  "dfn",
  "dialog",
  "div",
  "dl",
  "dt",
  "em",
  "embed",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "head",
  "header",
  "hgroup",
  "hr",
  "html",
  "i",
  "iframe",
  "img",
  "input",
  "ins",
  "kbd",
  "keygen",
  "label",
  "legend",
  "li",
  "link",
  "main",
  "map",
  "mark",
  "menu",
  "menuitem",
  "meta",
  "meter",
  "nav",
  "noscript",
  "object",
  "ol",
  "optgroup",
  "option",
  "output",
  "p",
  "param",
  "picture",
  "pre",
  "progress",
  "q",
  "rp",
  "rt",
  "ruby",
  "s",
  "samp",
  "script",
  "section",
  "select",
  "small",
  "source",
  "span",
  "strong",
  "style",
  "sub",
  "summary",
  "sup",
  "table",
  "tbody",
  "td",
  "textarea",
  "tfoot",
  "th",
  "thead",
  "time",
  "title",
  "tr",
  "track",
  "u",
  "ul",
  "var",
  "video",
  "wbr",
  // SVG
  "circle",
  "clipPath",
  "defs",
  "ellipse",
  "foreignObject",
  "g",
  "image",
  "line",
  "linearGradient",
  "mask",
  "path",
  "pattern",
  "polygon",
  "polyline",
  "radialGradient",
  "rect",
  "stop",
  "svg",
  "text",
  "tspan"
];
globals_exports.assign({
  batchedUpdates: reactDomExports.unstable_batchedUpdates,
  createStringInterpolator: createStringInterpolator2,
  colors: colors2
});
var host$2 = createHost(primitives$2, {
  applyAnimatedValues: applyAnimatedValues$2,
  createAnimatedStyle: (style) => new AnimatedStyle$2(style),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getComponentProps: ({ scrollTop, scrollLeft, ...props }) => props
});
var animated$2 = host$2.animated;
function noop$1() {
}
var noop_1 = noop$1;
var Set$1 = _Set, noop = noop_1, setToArray$1 = _setToArray;
var INFINITY = 1 / 0;
var createSet$1 = !(Set$1 && 1 / setToArray$1(new Set$1([, -0]))[1] == INFINITY) ? noop : function(values) {
  return new Set$1(values);
};
var _createSet = createSet$1;
var SetCache = _SetCache, arrayIncludes = _arrayIncludes, arrayIncludesWith = _arrayIncludesWith, cacheHas = _cacheHas, createSet = _createSet, setToArray = _setToArray;
var LARGE_ARRAY_SIZE = 200;
function baseUniq$1(array2, iteratee, comparator) {
  var index = -1, includes = arrayIncludes, length = array2.length, isCommon = true, result = [], seen = result;
  if (comparator) {
    isCommon = false;
    includes = arrayIncludesWith;
  } else if (length >= LARGE_ARRAY_SIZE) {
    var set2 = iteratee ? null : createSet(array2);
    if (set2) {
      return setToArray(set2);
    }
    isCommon = false;
    includes = cacheHas;
    seen = new SetCache();
  } else {
    seen = iteratee ? [] : result;
  }
  outer:
    while (++index < length) {
      var value = array2[index], computed = iteratee ? iteratee(value) : value;
      value = comparator || value !== 0 ? value : 0;
      if (isCommon && computed === computed) {
        var seenIndex = seen.length;
        while (seenIndex--) {
          if (seen[seenIndex] === computed) {
            continue outer;
          }
        }
        if (iteratee) {
          seen.push(computed);
        }
        result.push(value);
      } else if (!includes(seen, computed, comparator)) {
        if (seen !== result) {
          seen.push(computed);
        }
        result.push(value);
      }
    }
  return result;
}
var _baseUniq = baseUniq$1;
var Stack$1 = _Stack, baseIsEqual$1 = _baseIsEqual;
var COMPARE_PARTIAL_FLAG$1 = 1, COMPARE_UNORDERED_FLAG$1 = 2;
function baseIsMatch$1(object2, source, matchData, customizer) {
  var index = matchData.length, length = index, noCustomizer = !customizer;
  if (object2 == null) {
    return !length;
  }
  object2 = Object(object2);
  while (index--) {
    var data = matchData[index];
    if (noCustomizer && data[2] ? data[1] !== object2[data[0]] : !(data[0] in object2)) {
      return false;
    }
  }
  while (++index < length) {
    data = matchData[index];
    var key = data[0], objValue = object2[key], srcValue = data[1];
    if (noCustomizer && data[2]) {
      if (objValue === void 0 && !(key in object2)) {
        return false;
      }
    } else {
      var stack = new Stack$1();
      if (customizer) {
        var result = customizer(objValue, srcValue, key, object2, source, stack);
      }
      if (!(result === void 0 ? baseIsEqual$1(srcValue, objValue, COMPARE_PARTIAL_FLAG$1 | COMPARE_UNORDERED_FLAG$1, customizer, stack) : result)) {
        return false;
      }
    }
  }
  return true;
}
var _baseIsMatch = baseIsMatch$1;
var isObject$1 = isObject_1;
function isStrictComparable$2(value) {
  return value === value && !isObject$1(value);
}
var _isStrictComparable = isStrictComparable$2;
var isStrictComparable$1 = _isStrictComparable, keys$3 = keys_1;
function getMatchData$1(object2) {
  var result = keys$3(object2), length = result.length;
  while (length--) {
    var key = result[length], value = object2[key];
    result[length] = [key, value, isStrictComparable$1(value)];
  }
  return result;
}
var _getMatchData = getMatchData$1;
function matchesStrictComparable$2(key, srcValue) {
  return function(object2) {
    if (object2 == null) {
      return false;
    }
    return object2[key] === srcValue && (srcValue !== void 0 || key in Object(object2));
  };
}
var _matchesStrictComparable = matchesStrictComparable$2;
var baseIsMatch = _baseIsMatch, getMatchData = _getMatchData, matchesStrictComparable$1 = _matchesStrictComparable;
function baseMatches$1(source) {
  var matchData = getMatchData(source);
  if (matchData.length == 1 && matchData[0][2]) {
    return matchesStrictComparable$1(matchData[0][0], matchData[0][1]);
  }
  return function(object2) {
    return object2 === source || baseIsMatch(object2, source, matchData);
  };
}
var _baseMatches = baseMatches$1;
var baseIsEqual = _baseIsEqual, get = get_1, hasIn = hasIn_1, isKey$1 = _isKey, isStrictComparable = _isStrictComparable, matchesStrictComparable = _matchesStrictComparable, toKey$2 = _toKey;
var COMPARE_PARTIAL_FLAG = 1, COMPARE_UNORDERED_FLAG = 2;
function baseMatchesProperty$1(path, srcValue) {
  if (isKey$1(path) && isStrictComparable(srcValue)) {
    return matchesStrictComparable(toKey$2(path), srcValue);
  }
  return function(object2) {
    var objValue = get(object2, path);
    return objValue === void 0 && objValue === srcValue ? hasIn(object2, path) : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
  };
}
var _baseMatchesProperty = baseMatchesProperty$1;
function baseProperty$1(key) {
  return function(object2) {
    return object2 == null ? void 0 : object2[key];
  };
}
var _baseProperty = baseProperty$1;
var baseGet$2 = _baseGet;
function basePropertyDeep$1(path) {
  return function(object2) {
    return baseGet$2(object2, path);
  };
}
var _basePropertyDeep = basePropertyDeep$1;
var baseProperty = _baseProperty, basePropertyDeep = _basePropertyDeep, isKey = _isKey, toKey$1 = _toKey;
function property$1(path) {
  return isKey(path) ? baseProperty(toKey$1(path)) : basePropertyDeep(path);
}
var property_1 = property$1;
var baseMatches = _baseMatches, baseMatchesProperty = _baseMatchesProperty, identity$1 = identity_1, isArray$3 = isArray_1, property = property_1;
function baseIteratee$3(value) {
  if (typeof value == "function") {
    return value;
  }
  if (value == null) {
    return identity$1;
  }
  if (typeof value == "object") {
    return isArray$3(value) ? baseMatchesProperty(value[0], value[1]) : baseMatches(value);
  }
  return property(value);
}
var _baseIteratee = baseIteratee$3;
var baseIteratee$2 = _baseIteratee, baseUniq = _baseUniq;
function uniqBy(array2, iteratee) {
  return array2 && array2.length ? baseUniq(array2, baseIteratee$2(iteratee)) : [];
}
var uniqBy_1 = uniqBy;
const N = /* @__PURE__ */ getDefaultExportFromCjs(uniqBy_1);
var baseFor = _baseFor, keys$2 = keys_1;
function baseForOwn$1(object2, iteratee) {
  return object2 && baseFor(object2, iteratee, keys$2);
}
var _baseForOwn = baseForOwn$1;
var isArrayLike$1 = isArrayLike_1;
function createBaseEach$1(eachFunc, fromRight) {
  return function(collection, iteratee) {
    if (collection == null) {
      return collection;
    }
    if (!isArrayLike$1(collection)) {
      return eachFunc(collection, iteratee);
    }
    var length = collection.length, index = fromRight ? length : -1, iterable = Object(collection);
    while (fromRight ? index-- : ++index < length) {
      if (iteratee(iterable[index], index, iterable) === false) {
        break;
      }
    }
    return collection;
  };
}
var _createBaseEach = createBaseEach$1;
var baseForOwn = _baseForOwn, createBaseEach = _createBaseEach;
var baseEach$2 = createBaseEach(baseForOwn);
var _baseEach = baseEach$2;
var baseEach$1 = _baseEach, isArrayLike = isArrayLike_1;
function baseMap$1(collection, iteratee) {
  var index = -1, result = isArrayLike(collection) ? Array(collection.length) : [];
  baseEach$1(collection, function(value, key, collection2) {
    result[++index] = iteratee(value, key, collection2);
  });
  return result;
}
var _baseMap = baseMap$1;
function baseSortBy$1(array2, comparer) {
  var length = array2.length;
  array2.sort(comparer);
  while (length--) {
    array2[length] = array2[length].value;
  }
  return array2;
}
var _baseSortBy = baseSortBy$1;
var isSymbol = isSymbol_1;
function compareAscending$1(value, other) {
  if (value !== other) {
    var valIsDefined = value !== void 0, valIsNull = value === null, valIsReflexive = value === value, valIsSymbol = isSymbol(value);
    var othIsDefined = other !== void 0, othIsNull = other === null, othIsReflexive = other === other, othIsSymbol = isSymbol(other);
    if (!othIsNull && !othIsSymbol && !valIsSymbol && value > other || valIsSymbol && othIsDefined && othIsReflexive && !othIsNull && !othIsSymbol || valIsNull && othIsDefined && othIsReflexive || !valIsDefined && othIsReflexive || !valIsReflexive) {
      return 1;
    }
    if (!valIsNull && !valIsSymbol && !othIsSymbol && value < other || othIsSymbol && valIsDefined && valIsReflexive && !valIsNull && !valIsSymbol || othIsNull && valIsDefined && valIsReflexive || !othIsDefined && valIsReflexive || !othIsReflexive) {
      return -1;
    }
  }
  return 0;
}
var _compareAscending = compareAscending$1;
var compareAscending = _compareAscending;
function compareMultiple$1(object2, other, orders) {
  var index = -1, objCriteria = object2.criteria, othCriteria = other.criteria, length = objCriteria.length, ordersLength = orders.length;
  while (++index < length) {
    var result = compareAscending(objCriteria[index], othCriteria[index]);
    if (result) {
      if (index >= ordersLength) {
        return result;
      }
      var order = orders[index];
      return result * (order == "desc" ? -1 : 1);
    }
  }
  return object2.index - other.index;
}
var _compareMultiple = compareMultiple$1;
var arrayMap$1 = _arrayMap, baseGet$1 = _baseGet, baseIteratee$1 = _baseIteratee, baseMap = _baseMap, baseSortBy = _baseSortBy, baseUnary$2 = _baseUnary, compareMultiple = _compareMultiple, identity = identity_1, isArray$2 = isArray_1;
function baseOrderBy$1(collection, iteratees, orders) {
  if (iteratees.length) {
    iteratees = arrayMap$1(iteratees, function(iteratee) {
      if (isArray$2(iteratee)) {
        return function(value) {
          return baseGet$1(value, iteratee.length === 1 ? iteratee[0] : iteratee);
        };
      }
      return iteratee;
    });
  } else {
    iteratees = [identity];
  }
  var index = -1;
  iteratees = arrayMap$1(iteratees, baseUnary$2(baseIteratee$1));
  var result = baseMap(collection, function(value, key, collection2) {
    var criteria = arrayMap$1(iteratees, function(iteratee) {
      return iteratee(value);
    });
    return { "criteria": criteria, "index": ++index, "value": value };
  });
  return baseSortBy(result, function(object2, other) {
    return compareMultiple(object2, other, orders);
  });
}
var _baseOrderBy = baseOrderBy$1;
var baseFlatten = _baseFlatten, baseOrderBy = _baseOrderBy, baseRest = _baseRest, isIterateeCall = _isIterateeCall;
baseRest(function(collection, iteratees) {
  if (collection == null) {
    return [];
  }
  var length = iteratees.length;
  if (length > 1 && isIterateeCall(collection, iteratees[0], iteratees[1])) {
    iteratees = [];
  } else if (length > 2 && isIterateeCall(iteratees[0], iteratees[1], iteratees[2])) {
    iteratees = [iteratees[0]];
  }
  return baseOrderBy(collection, baseFlatten(iteratees, 1), []);
});
var nodeUtil$2 = _nodeUtilExports;
nodeUtil$2 && nodeUtil$2.isDate;
var J$2 = [function(n2) {
  return n2.setMilliseconds(0);
}, function(n2) {
  return n2.setSeconds(0);
}, function(n2) {
  return n2.setMinutes(0);
}, function(n2) {
  return n2.setHours(0);
}, function(n2) {
  return n2.setDate(1);
}, function(n2) {
  return n2.setMonth(0);
}], K$1 = { millisecond: [], second: J$2.slice(0, 1), minute: J$2.slice(0, 2), hour: J$2.slice(0, 3), day: J$2.slice(0, 4), month: J$2.slice(0, 5), year: J$2.slice(0, 6) }, L$1 = function(n2) {
  return function(t2) {
    return K$1[n2].forEach(function(n3) {
      n3(t2);
    }), t2;
  };
}, Q$1 = function(n2) {
  var t2 = n2.format, r2 = void 0 === t2 ? "native" : t2, e4 = n2.precision, a2 = void 0 === e4 ? "millisecond" : e4, u2 = n2.useUTC, c6 = void 0 === u2 || u2, s = L$1(a2);
  return function(n3) {
    if (void 0 === n3)
      return n3;
    if ("native" === r2 || n3 instanceof Date)
      return s(n3);
    var t3 = c6 ? utcParse(r2) : timeParse(r2);
    return s(t3(n3));
  };
}, W$2 = function(n2, t2, r2, e4) {
  var a2, i2, o2, c6, s = n2.min, d = void 0 === s ? 0 : s, f2 = n2.max, l2 = void 0 === f2 ? "auto" : f2, m2 = n2.stacked, v2 = void 0 !== m2 && m2, y = n2.reverse, p2 = void 0 !== y && y, h = n2.clamp, g2 = void 0 !== h && h, x2 = n2.nice, k2 = void 0 !== x2 && x2;
  "auto" === d ? a2 = true === v2 ? null != (i2 = t2.minStacked) ? i2 : 0 : t2.min : a2 = d;
  "auto" === l2 ? o2 = true === v2 ? null != (c6 = t2.maxStacked) ? c6 : 0 : t2.max : o2 = l2;
  var T2 = linear().rangeRound("x" === e4 ? [0, r2] : [r2, 0]).domain(p2 ? [o2, a2] : [a2, o2]).clamp(g2);
  return true === k2 ? T2.nice() : "number" == typeof k2 && T2.nice(k2), X$2(T2, v2);
}, X$2 = function(n2, t2) {
  void 0 === t2 && (t2 = false);
  var r2 = n2;
  return r2.type = "linear", r2.stacked = t2, r2;
}, Y$2 = function(n2, t2, r2) {
  var e4 = point$4().range([0, r2]).domain(t2.all);
  return e4.type = "point", e4;
}, _$1 = function(n2, t2, r2, e4) {
  var a2 = n2.round, i2 = void 0 === a2 || a2, o2 = band().range("x" === e4 ? [0, r2] : [r2, 0]).domain(t2.all).round(i2);
  return nn(o2);
}, nn = function(n2) {
  var t2 = n2;
  return t2.type = "band", t2;
}, tn = function(n2, t2, r2) {
  var e4, a2, i2 = n2.format, o2 = void 0 === i2 ? "native" : i2, u2 = n2.precision, c6 = void 0 === u2 ? "millisecond" : u2, s = n2.min, l2 = void 0 === s ? "auto" : s, m2 = n2.max, v2 = void 0 === m2 ? "auto" : m2, y = n2.useUTC, p2 = void 0 === y || y, h = n2.nice, g2 = void 0 !== h && h, x2 = Q$1({ format: o2, precision: c6, useUTC: p2 });
  e4 = "auto" === l2 ? x2(t2.min) : "native" !== o2 ? x2(l2) : l2, a2 = "auto" === v2 ? x2(t2.max) : "native" !== o2 ? x2(v2) : v2;
  var k2 = p2 ? utcTime() : time();
  k2.range([0, r2]), e4 && a2 && k2.domain([e4, a2]), true === g2 ? k2.nice() : "object" != typeof g2 && "number" != typeof g2 || k2.nice(g2);
  var T2 = k2;
  return T2.type = "time", T2.useUTC = p2, T2;
}, rn = function(n2, t2, r2, e4) {
  var a2, i2 = n2.base, o2 = void 0 === i2 ? 10 : i2, u2 = n2.min, c6 = void 0 === u2 ? "auto" : u2, s = n2.max, d = void 0 === s ? "auto" : s;
  if (t2.all.some(function(n3) {
    return 0 === n3;
  }))
    throw new Error("a log scale domain must not include or cross zero");
  var f2, m2, v2 = false;
  if (t2.all.filter(function(n3) {
    return null != n3;
  }).forEach(function(n3) {
    v2 || (void 0 === a2 ? a2 = Math.sign(n3) : Math.sign(n3) !== a2 && (v2 = true));
  }), v2)
    throw new Error("a log scale domain must be strictly-positive or strictly-negative");
  f2 = "auto" === c6 ? t2.min : c6, m2 = "auto" === d ? t2.max : d;
  var y = log().domain([f2, m2]).rangeRound("x" === e4 ? [0, r2] : [r2, 0]).base(o2).nice();
  return y.type = "log", y;
}, en = function(n2, t2, r2, e4) {
  var a2, i2, o2 = n2.constant, u2 = void 0 === o2 ? 1 : o2, c6 = n2.min, s = void 0 === c6 ? "auto" : c6, d = n2.max, f2 = void 0 === d ? "auto" : d, l2 = n2.reverse, v2 = void 0 !== l2 && l2;
  a2 = "auto" === s ? t2.min : s, i2 = "auto" === f2 ? t2.max : f2;
  var y = symlog().constant(u2).rangeRound("x" === e4 ? [0, r2] : [r2, 0]).nice();
  true === v2 ? y.domain([i2, a2]) : y.domain([a2, i2]);
  var p2 = y;
  return p2.type = "symlog", p2;
};
function cn(n2, t2, r2, e4) {
  switch (n2.type) {
    case "linear":
      return W$2(n2, t2, r2, e4);
    case "point":
      return Y$2(n2, t2, r2);
    case "band":
      return _$1(n2, t2, r2, e4);
    case "time":
      return tn(n2, t2, r2);
    case "log":
      return rn(n2, t2, r2, e4);
    case "symlog":
      return en(n2, t2, r2, e4);
    default:
      throw new Error("invalid scale spec");
  }
}
var pn = function(n2) {
  var t2 = n2.bandwidth();
  if (0 === t2)
    return n2;
  var r2 = t2 / 2;
  return n2.round() && (r2 = Math.round(r2)), function(t3) {
    var e4;
    return (null != (e4 = n2(t3)) ? e4 : 0) + r2;
  };
}, hn = { millisecond: [p$2, p$2], second: [g$1, g$1], minute: [x$1, k$3], hour: [T$2, b$3], day: [newInterval(function(n2) {
  return n2.setHours(0, 0, 0, 0);
}, function(n2, t2) {
  return n2.setDate(n2.getDate() + t2);
}, function(n2, t2) {
  return (t2.getTime() - n2.getTime()) / 864e5;
}, function(n2) {
  return Math.floor(n2.getTime() / 864e5);
}), newInterval(function(n2) {
  return n2.setUTCHours(0, 0, 0, 0);
}, function(n2, t2) {
  return n2.setUTCDate(n2.getUTCDate() + t2);
}, function(n2, t2) {
  return (t2.getTime() - n2.getTime()) / 864e5;
}, function(n2) {
  return Math.floor(n2.getTime() / 864e5);
})], week: [sunday, utcSunday], sunday: [sunday, utcSunday], monday: [monday, utcMonday], tuesday: [tuesday, utcTuesday], wednesday: [wednesday, utcWednesday], thursday: [thursday, utcThursday], friday: [friday, utcFriday], saturday: [saturday, utcSaturday], month: [N$2, z$4], year: [I$1, P$2] }, gn = Object.keys(hn), xn = new RegExp("^every\\s*(\\d+)?\\s*(" + gn.join("|") + ")s?$", "i"), kn = function(n2, t2) {
  if (Array.isArray(t2))
    return t2;
  if ("string" == typeof t2 && "useUTC" in n2) {
    var r2 = t2.match(xn);
    if (r2) {
      var e4 = r2[1], a2 = r2[2], i2 = hn[a2][n2.useUTC ? 1 : 0];
      if ("day" === a2) {
        var o2, u2, c6 = n2.domain(), s = c6[0], d = c6[1], f2 = new Date(d);
        return f2.setDate(f2.getDate() + 1), null != (o2 = null == (u2 = i2.every(Number(null != e4 ? e4 : 1))) ? void 0 : u2.range(s, f2)) ? o2 : [];
      }
      if (void 0 === e4)
        return n2.ticks(i2);
      var l2 = i2.every(Number(e4));
      if (l2)
        return n2.ticks(l2);
    }
    throw new Error("Invalid tickValues: " + t2);
  }
  if ("ticks" in n2) {
    if (void 0 === t2)
      return n2.ticks();
    if ("number" == typeof (m2 = t2) && isFinite(m2) && Math.floor(m2) === m2)
      return n2.ticks(t2);
  }
  var m2;
  return n2.domain();
};
function p$1() {
  return p$1 = Object.assign ? Object.assign.bind() : function(t2) {
    for (var e4 = 1; e4 < arguments.length; e4++) {
      var i2 = arguments[e4];
      for (var n2 in i2)
        Object.prototype.hasOwnProperty.call(i2, n2) && (t2[n2] = i2[n2]);
    }
    return t2;
  }, p$1.apply(this, arguments);
}
var b$2 = function(t2) {
  var e4, i2 = t2.axis, n2 = t2.scale, r2 = t2.ticksPosition, o2 = t2.tickValues, l2 = t2.tickSize, s = t2.tickPadding, c6 = t2.tickRotation, f2 = t2.truncateTickAt, u2 = t2.engine, d = void 0 === u2 ? "svg" : u2, x2 = kn(n2, o2), m2 = rn$1[d], k2 = "bandwidth" in n2 ? pn(n2) : n2, g2 = { lineX: 0, lineY: 0 }, v2 = { textX: 0, textY: 0 }, b2 = "object" == typeof document && "rtl" === document.dir, P2 = m2.align.center, T2 = m2.baseline.center;
  "x" === i2 ? (e4 = function(t3) {
    var e6;
    return { x: null != (e6 = k2(t3)) ? e6 : 0, y: 0 };
  }, g2.lineY = l2 * ("after" === r2 ? 1 : -1), v2.textY = (l2 + s) * ("after" === r2 ? 1 : -1), T2 = "after" === r2 ? m2.baseline.top : m2.baseline.bottom, 0 === c6 ? P2 = m2.align.center : "after" === r2 && c6 < 0 || "before" === r2 && c6 > 0 ? (P2 = m2.align[b2 ? "left" : "right"], T2 = m2.baseline.center) : ("after" === r2 && c6 > 0 || "before" === r2 && c6 < 0) && (P2 = m2.align[b2 ? "right" : "left"], T2 = m2.baseline.center)) : (e4 = function(t3) {
    var e6;
    return { x: 0, y: null != (e6 = k2(t3)) ? e6 : 0 };
  }, g2.lineX = l2 * ("after" === r2 ? 1 : -1), v2.textX = (l2 + s) * ("after" === r2 ? 1 : -1), P2 = "after" === r2 ? m2.align.left : m2.align.right);
  return { ticks: x2.map(function(t3) {
    var i3 = "string" == typeof t3 ? function(t4) {
      var e6 = String(t4).length;
      return f2 && f2 > 0 && e6 > f2 ? "" + String(t4).slice(0, f2).concat("...") : "" + t4;
    }(t3) : t3;
    return p$1({ key: t3 instanceof Date ? "" + t3.valueOf() : "" + t3, value: i3 }, e4(t3), g2, v2);
  }), textAlign: P2, textBaseline: T2 };
}, P$1 = function(t2, e4) {
  if (void 0 === t2 || "function" == typeof t2)
    return t2;
  if ("time" === e4.type) {
    var i2 = timeFormat(t2);
    return function(t3) {
      return i2(t3 instanceof Date ? t3 : new Date(t3));
    };
  }
  return format(t2);
}, T$1 = function(t2) {
  var e4, i2 = t2.width, n2 = t2.height, r2 = t2.scale, a2 = t2.axis, o2 = t2.values, l2 = (e4 = o2, Array.isArray(e4) ? o2 : void 0) || kn(r2, o2), s = "bandwidth" in r2 ? pn(r2) : r2, c6 = "x" === a2 ? l2.map(function(t3) {
    var e6, i3;
    return { key: t3 instanceof Date ? "" + t3.valueOf() : "" + t3, x1: null != (e6 = s(t3)) ? e6 : 0, x2: null != (i3 = s(t3)) ? i3 : 0, y1: 0, y2: n2 };
  }) : l2.map(function(t3) {
    var e6, n3;
    return { key: t3 instanceof Date ? "" + t3.valueOf() : "" + t3, x1: 0, x2: i2, y1: null != (e6 = s(t3)) ? e6 : 0, y2: null != (n3 = s(t3)) ? n3 : 0 };
  });
  return c6;
}, A = reactExports.memo(function(t2) {
  var e4, n2 = t2.value, r2 = t2.format, a2 = t2.lineX, s = t2.lineY, c6 = t2.onClick, u2 = t2.textBaseline, d = t2.textAnchor, x2 = t2.animatedProps, m2 = zt(), y = m2.axis.ticks.line, h = m2.axis.ticks.text, v2 = null != (e4 = null == r2 ? void 0 : r2(n2)) ? e4 : n2, b2 = reactExports.useMemo(function() {
    var t3 = { opacity: x2.opacity };
    return c6 ? { style: p$1({}, t3, { cursor: "pointer" }), onClick: function(t4) {
      return c6(t4, v2);
    } } : { style: t3 };
  }, [x2.opacity, c6, v2]);
  return jsxRuntimeExports.jsxs(animated$2.g, p$1({ transform: x2.transform }, b2, { children: [jsxRuntimeExports.jsx("line", { x1: 0, x2: a2, y1: 0, y2: s, style: y }), h.outlineWidth > 0 && jsxRuntimeExports.jsx(animated$2.text, { dominantBaseline: u2, textAnchor: d, transform: x2.textTransform, style: h, strokeWidth: 2 * h.outlineWidth, stroke: h.outlineColor, strokeLinejoin: "round", children: "" + v2 }), jsxRuntimeExports.jsx(animated$2.text, { dominantBaseline: u2, textAnchor: d, transform: x2.textTransform, style: Mt(h), children: "" + v2 })] }));
}), S$2 = function(e4) {
  var r2 = e4.axis, a2 = e4.scale, l2 = e4.x, c6 = void 0 === l2 ? 0 : l2, x2 = e4.y, m2 = void 0 === x2 ? 0 : x2, y = e4.length, h = e4.ticksPosition, T2 = e4.tickValues, S2 = e4.tickSize, W2 = void 0 === S2 ? 5 : S2, w2 = e4.tickPadding, B2 = void 0 === w2 ? 5 : w2, X2 = e4.tickRotation, Y2 = void 0 === X2 ? 0 : X2, C2 = e4.format, O2 = e4.renderTick, j2 = void 0 === O2 ? A : O2, z2 = e4.truncateTickAt, V2 = e4.legend, D2 = e4.legendPosition, R2 = void 0 === D2 ? "end" : D2, E2 = e4.legendOffset, q2 = void 0 === E2 ? 0 : E2, F2 = e4.onClick, L2 = e4.ariaHidden, N2 = zt(), H2 = N2.axis.legend.text, I2 = reactExports.useMemo(function() {
    return P$1(C2, a2);
  }, [C2, a2]), J2 = b$2({ axis: r2, scale: a2, ticksPosition: h, tickValues: T2, tickSize: W2, tickPadding: B2, tickRotation: Y2, truncateTickAt: z2 }), G2 = J2.ticks, K2 = J2.textAlign, M2 = J2.textBaseline, Q2 = null;
  if (void 0 !== V2) {
    var U2, Z2 = 0, $2 = 0, _2 = 0;
    "y" === r2 ? (_2 = -90, Z2 = q2, "start" === R2 ? (U2 = "start", $2 = y) : "middle" === R2 ? (U2 = "middle", $2 = y / 2) : "end" === R2 && (U2 = "end")) : ($2 = q2, "start" === R2 ? U2 = "start" : "middle" === R2 ? (U2 = "middle", Z2 = y / 2) : "end" === R2 && (U2 = "end", Z2 = y)), Q2 = jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [H2.outlineWidth > 0 && jsxRuntimeExports.jsx("text", { transform: "translate(" + Z2 + ", " + $2 + ") rotate(" + _2 + ")", textAnchor: U2, style: p$1({ dominantBaseline: "central" }, H2), strokeWidth: 2 * H2.outlineWidth, stroke: H2.outlineColor, strokeLinejoin: "round", children: V2 }), jsxRuntimeExports.jsx("text", { transform: "translate(" + Z2 + ", " + $2 + ") rotate(" + _2 + ")", textAnchor: U2, style: p$1({ dominantBaseline: "central" }, H2), children: V2 })] });
  }
  var tt2 = Ur(), et = tt2.animate, it = tt2.config, nt = useSpring({ transform: "translate(" + c6 + "," + m2 + ")", lineX2: "x" === r2 ? y : 0, lineY2: "x" === r2 ? 0 : y, config: it, immediate: !et }), rt2 = reactExports.useCallback(function(t2) {
    return { opacity: 1, transform: "translate(" + t2.x + "," + t2.y + ")", textTransform: "translate(" + t2.textX + "," + t2.textY + ") rotate(" + Y2 + ")" };
  }, [Y2]), at = reactExports.useCallback(function(t2) {
    return { opacity: 0, transform: "translate(" + t2.x + "," + t2.y + ")", textTransform: "translate(" + t2.textX + "," + t2.textY + ") rotate(" + Y2 + ")" };
  }, [Y2]), ot = useTransition(G2, { keys: function(t2) {
    return t2.key;
  }, initial: rt2, from: at, enter: rt2, update: rt2, leave: { opacity: 0 }, config: it, immediate: !et });
  return jsxRuntimeExports.jsxs(animated$2.g, { transform: nt.transform, "aria-hidden": L2, children: [ot(function(e6, i2, n2, r3) {
    return reactExports.createElement(j2, p$1({ tickIndex: r3, format: I2, rotate: Y2, textBaseline: M2, textAnchor: K2, truncateTickAt: z2, animatedProps: e6 }, i2, F2 ? { onClick: F2 } : {}));
  }), jsxRuntimeExports.jsx(animated$2.line, { style: N2.axis.domain.line, x1: 0, x2: nt.lineX2, y1: 0, y2: nt.lineY2 }), Q2] });
}, W$1 = reactExports.memo(S$2), w$2 = ["top", "right", "bottom", "left"], B$1 = reactExports.memo(function(t2) {
  var e4 = t2.xScale, i2 = t2.yScale, n2 = t2.width, r2 = t2.height, a2 = { top: t2.top, right: t2.right, bottom: t2.bottom, left: t2.left };
  return jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: w$2.map(function(t3) {
    var o2 = a2[t3];
    if (!o2)
      return null;
    var l2 = "top" === t3 || "bottom" === t3;
    return jsxRuntimeExports.jsx(W$1, p$1({}, o2, { axis: l2 ? "x" : "y", x: "right" === t3 ? n2 : 0, y: "bottom" === t3 ? r2 : 0, scale: l2 ? e4 : i2, length: l2 ? n2 : r2, ticksPosition: "top" === t3 || "left" === t3 ? "before" : "after", truncateTickAt: o2.truncateTickAt }), t3);
  }) });
}), X$1 = reactExports.memo(function(t2) {
  var e4 = t2.animatedProps, i2 = zt();
  return jsxRuntimeExports.jsx(animated$2.line, p$1({}, e4, i2.grid.line));
}), Y$1 = reactExports.memo(function(t2) {
  var e4 = t2.lines, i2 = Ur(), n2 = i2.animate, a2 = i2.config, o2 = useTransition(e4, { keys: function(t3) {
    return t3.key;
  }, initial: function(t3) {
    return { opacity: 1, x1: t3.x1, x2: t3.x2, y1: t3.y1, y2: t3.y2 };
  }, from: function(t3) {
    return { opacity: 0, x1: t3.x1, x2: t3.x2, y1: t3.y1, y2: t3.y2 };
  }, enter: function(t3) {
    return { opacity: 1, x1: t3.x1, x2: t3.x2, y1: t3.y1, y2: t3.y2 };
  }, update: function(t3) {
    return { opacity: 1, x1: t3.x1, x2: t3.x2, y1: t3.y1, y2: t3.y2 };
  }, leave: { opacity: 0 }, config: a2, immediate: !n2 });
  return jsxRuntimeExports.jsx("g", { children: o2(function(t3, e6) {
    return reactExports.createElement(X$1, p$1({}, e6, { key: e6.key, animatedProps: t3 }));
  }) });
}), C$1 = reactExports.memo(function(t2) {
  var e4 = t2.width, n2 = t2.height, r2 = t2.xScale, a2 = t2.yScale, o2 = t2.xValues, l2 = t2.yValues, s = reactExports.useMemo(function() {
    return !!r2 && T$1({ width: e4, height: n2, scale: r2, axis: "x", values: o2 });
  }, [r2, o2, e4, n2]), c6 = reactExports.useMemo(function() {
    return !!a2 && T$1({ width: e4, height: n2, scale: a2, axis: "y", values: l2 });
  }, [n2, e4, a2, l2]);
  return jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [s && jsxRuntimeExports.jsx(Y$1, { lines: s }), c6 && jsxRuntimeExports.jsx(Y$1, { lines: c6 })] });
}), O$2 = function(t2, e4) {
  var i2, n2 = e4.axis, r2 = e4.scale, a2 = e4.x, o2 = void 0 === a2 ? 0 : a2, l2 = e4.y, s = void 0 === l2 ? 0 : l2, f2 = e4.length, u2 = e4.ticksPosition, d = e4.tickValues, x2 = e4.tickSize, m2 = void 0 === x2 ? 5 : x2, y = e4.tickPadding, h = void 0 === y ? 5 : y, k2 = e4.tickRotation, g2 = void 0 === k2 ? 0 : k2, v2 = e4.format, p2 = e4.legend, P2 = e4.legendPosition, T2 = void 0 === P2 ? "end" : P2, A2 = e4.legendOffset, S2 = void 0 === A2 ? 0 : A2, W2 = e4.theme, w2 = b$2({ axis: n2, scale: r2, ticksPosition: u2, tickValues: d, tickSize: m2, tickPadding: h, tickRotation: g2, engine: "canvas" }), B2 = w2.ticks, X2 = w2.textAlign, Y2 = w2.textBaseline;
  t2.save(), t2.translate(o2, s), t2.textAlign = X2, t2.textBaseline = Y2;
  var C2 = W2.axis.ticks.text;
  t2.font = (C2.fontWeight ? C2.fontWeight + " " : "") + C2.fontSize + "px " + C2.fontFamily, (null != (i2 = W2.axis.domain.line.strokeWidth) ? i2 : 0) > 0 && (t2.lineWidth = Number(W2.axis.domain.line.strokeWidth), t2.lineCap = "square", W2.axis.domain.line.stroke && (t2.strokeStyle = W2.axis.domain.line.stroke), t2.beginPath(), t2.moveTo(0, 0), t2.lineTo("x" === n2 ? f2 : 0, "x" === n2 ? 0 : f2), t2.stroke());
  var O2 = "function" == typeof v2 ? v2 : function(t3) {
    return "" + t3;
  };
  if (B2.forEach(function(e6) {
    var i3;
    (null != (i3 = W2.axis.ticks.line.strokeWidth) ? i3 : 0) > 0 && (t2.lineWidth = Number(W2.axis.ticks.line.strokeWidth), t2.lineCap = "square", W2.axis.ticks.line.stroke && (t2.strokeStyle = W2.axis.ticks.line.stroke), t2.beginPath(), t2.moveTo(e6.x, e6.y), t2.lineTo(e6.x + e6.lineX, e6.y + e6.lineY), t2.stroke());
    var n3 = O2(e6.value);
    t2.save(), t2.translate(e6.x + e6.textX, e6.y + e6.textY), t2.rotate(Kt(g2)), C2.outlineWidth > 0 && (t2.strokeStyle = C2.outlineColor, t2.lineWidth = 2 * C2.outlineWidth, t2.lineJoin = "round", t2.strokeText("" + n3, 0, 0)), W2.axis.ticks.text.fill && (t2.fillStyle = C2.fill), t2.fillText("" + n3, 0, 0), t2.restore();
  }), void 0 !== p2) {
    var j2 = 0, z2 = 0, V2 = 0, D2 = "center";
    "y" === n2 ? (V2 = -90, j2 = S2, "start" === T2 ? (D2 = "start", z2 = f2) : "middle" === T2 ? (D2 = "center", z2 = f2 / 2) : "end" === T2 && (D2 = "end")) : (z2 = S2, "start" === T2 ? D2 = "start" : "middle" === T2 ? (D2 = "center", j2 = f2 / 2) : "end" === T2 && (D2 = "end", j2 = f2)), t2.translate(j2, z2), t2.rotate(Kt(V2)), t2.font = (W2.axis.legend.text.fontWeight ? W2.axis.legend.text.fontWeight + " " : "") + W2.axis.legend.text.fontSize + "px " + W2.axis.legend.text.fontFamily, W2.axis.legend.text.fill && (t2.fillStyle = W2.axis.legend.text.fill), t2.textAlign = D2, t2.textBaseline = "middle", t2.fillText(p2, 0, 0);
  }
  t2.restore();
}, j$2 = function(t2, e4) {
  var i2 = e4.xScale, n2 = e4.yScale, r2 = e4.width, a2 = e4.height, o2 = e4.top, l2 = e4.right, s = e4.bottom, c6 = e4.left, f2 = e4.theme, u2 = { top: o2, right: l2, bottom: s, left: c6 };
  w$2.forEach(function(e6) {
    var o3 = u2[e6];
    if (!o3)
      return null;
    var l3 = "top" === e6 || "bottom" === e6, s2 = "top" === e6 || "left" === e6 ? "before" : "after", c7 = l3 ? i2 : n2, d = P$1(o3.format, c7);
    O$2(t2, p$1({}, o3, { axis: l3 ? "x" : "y", x: "right" === e6 ? r2 : 0, y: "bottom" === e6 ? a2 : 0, scale: c7, format: d, length: l3 ? r2 : a2, ticksPosition: s2, theme: f2 }));
  });
}, z$1 = function(t2, e4) {
  var i2 = e4.width, n2 = e4.height, r2 = e4.scale, a2 = e4.axis, o2 = e4.values;
  T$1({ width: i2, height: n2, scale: r2, axis: a2, values: o2 }).forEach(function(e6) {
    t2.beginPath(), t2.moveTo(e6.x1, e6.y1), t2.lineTo(e6.x2, e6.y2), t2.stroke();
  });
};
var isCustomPropRE$1 = /^--/;
function dangerousStyleValue$1(name, value) {
  if (value == null || typeof value === "boolean" || value === "")
    return "";
  if (typeof value === "number" && value !== 0 && !isCustomPropRE$1.test(name) && !(isUnitlessNumber$1.hasOwnProperty(name) && isUnitlessNumber$1[name]))
    return value + "px";
  return ("" + value).trim();
}
var attributeCache$1 = {};
function applyAnimatedValues$1(instance, props) {
  if (!instance.nodeType || !instance.setAttribute) {
    return false;
  }
  const isFilterElement = instance.nodeName === "filter" || instance.parentNode && instance.parentNode.nodeName === "filter";
  const { style, children, scrollTop, scrollLeft, viewBox, ...attributes } = props;
  const values = Object.values(attributes);
  const names = Object.keys(attributes).map(
    (name) => isFilterElement || instance.hasAttribute(name) ? name : attributeCache$1[name] || (attributeCache$1[name] = name.replace(
      /([A-Z])/g,
      // Attributes are written in dash case
      (n2) => "-" + n2.toLowerCase()
    ))
  );
  if (children !== void 0) {
    instance.textContent = children;
  }
  for (const name in style) {
    if (style.hasOwnProperty(name)) {
      const value = dangerousStyleValue$1(name, style[name]);
      if (isCustomPropRE$1.test(name)) {
        instance.style.setProperty(name, value);
      } else {
        instance.style[name] = value;
      }
    }
  }
  names.forEach((name, i2) => {
    instance.setAttribute(name, values[i2]);
  });
  if (scrollTop !== void 0) {
    instance.scrollTop = scrollTop;
  }
  if (scrollLeft !== void 0) {
    instance.scrollLeft = scrollLeft;
  }
  if (viewBox !== void 0) {
    instance.setAttribute("viewBox", viewBox);
  }
}
var isUnitlessNumber$1 = {
  animationIterationCount: true,
  borderImageOutset: true,
  borderImageSlice: true,
  borderImageWidth: true,
  boxFlex: true,
  boxFlexGroup: true,
  boxOrdinalGroup: true,
  columnCount: true,
  columns: true,
  flex: true,
  flexGrow: true,
  flexPositive: true,
  flexShrink: true,
  flexNegative: true,
  flexOrder: true,
  gridRow: true,
  gridRowEnd: true,
  gridRowSpan: true,
  gridRowStart: true,
  gridColumn: true,
  gridColumnEnd: true,
  gridColumnSpan: true,
  gridColumnStart: true,
  fontWeight: true,
  lineClamp: true,
  lineHeight: true,
  opacity: true,
  order: true,
  orphans: true,
  tabSize: true,
  widows: true,
  zIndex: true,
  zoom: true,
  // SVG-related properties
  fillOpacity: true,
  floodOpacity: true,
  stopOpacity: true,
  strokeDasharray: true,
  strokeDashoffset: true,
  strokeMiterlimit: true,
  strokeOpacity: true,
  strokeWidth: true
};
var prefixKey$1 = (prefix2, key) => prefix2 + key.charAt(0).toUpperCase() + key.substring(1);
var prefixes$1 = ["Webkit", "Ms", "Moz", "O"];
isUnitlessNumber$1 = Object.keys(isUnitlessNumber$1).reduce((acc, prop) => {
  prefixes$1.forEach((prefix2) => acc[prefixKey$1(prefix2, prop)] = acc[prop]);
  return acc;
}, isUnitlessNumber$1);
var domTransforms$1 = /^(matrix|translate|scale|rotate|skew)/;
var pxTransforms$1 = /^(translate)/;
var degTransforms$1 = /^(rotate|skew)/;
var addUnit$1 = (value, unit2) => is.num(value) && value !== 0 ? value + unit2 : value;
var isValueIdentity$1 = (value, id) => is.arr(value) ? value.every((v2) => isValueIdentity$1(v2, id)) : is.num(value) ? value === id : parseFloat(value) === id;
var AnimatedStyle$1 = class AnimatedStyle4 extends AnimatedObject {
  constructor({ x: x2, y, z: z2, ...style }) {
    const inputs = [];
    const transforms = [];
    if (x2 || y || z2) {
      inputs.push([x2 || 0, y || 0, z2 || 0]);
      transforms.push((xyz) => [
        `translate3d(${xyz.map((v2) => addUnit$1(v2, "px")).join(",")})`,
        // prettier-ignore
        isValueIdentity$1(xyz, 0)
      ]);
    }
    eachProp(style, (value, key) => {
      if (key === "transform") {
        inputs.push([value || ""]);
        transforms.push((transform) => [transform, transform === ""]);
      } else if (domTransforms$1.test(key)) {
        delete style[key];
        if (is.und(value))
          return;
        const unit2 = pxTransforms$1.test(key) ? "px" : degTransforms$1.test(key) ? "deg" : "";
        inputs.push(toArray(value));
        transforms.push(
          key === "rotate3d" ? ([x22, y2, z22, deg]) => [
            `rotate3d(${x22},${y2},${z22},${addUnit$1(deg, unit2)})`,
            isValueIdentity$1(deg, 0)
          ] : (input) => [
            `${key}(${input.map((v2) => addUnit$1(v2, unit2)).join(",")})`,
            isValueIdentity$1(input, key.startsWith("scale") ? 1 : 0)
          ]
        );
      }
    });
    if (inputs.length) {
      style.transform = new FluidTransform$1(inputs, transforms);
    }
    super(style);
  }
};
var FluidTransform$1 = class FluidTransform4 extends FluidValue {
  constructor(inputs, transforms) {
    super();
    this.inputs = inputs;
    this.transforms = transforms;
    this._value = null;
  }
  get() {
    return this._value || (this._value = this._get());
  }
  _get() {
    let transform = "";
    let identity2 = true;
    each(this.inputs, (input, i2) => {
      const arg1 = getFluidValue(input[0]);
      const [t2, id] = this.transforms[i2](
        is.arr(arg1) ? arg1 : input.map(getFluidValue)
      );
      transform += " " + t2;
      identity2 = identity2 && id;
    });
    return identity2 ? "none" : transform;
  }
  // Start observing our inputs once we have an observer.
  observerAdded(count) {
    if (count == 1)
      each(
        this.inputs,
        (input) => each(
          input,
          (value) => hasFluidValue(value) && addFluidObserver(value, this)
        )
      );
  }
  // Stop observing our inputs once we have no observers.
  observerRemoved(count) {
    if (count == 0)
      each(
        this.inputs,
        (input) => each(
          input,
          (value) => hasFluidValue(value) && removeFluidObserver(value, this)
        )
      );
  }
  eventObserved(event) {
    if (event.type == "change") {
      this._value = null;
    }
    callFluidObservers(this, event);
  }
};
var primitives$1 = [
  "a",
  "abbr",
  "address",
  "area",
  "article",
  "aside",
  "audio",
  "b",
  "base",
  "bdi",
  "bdo",
  "big",
  "blockquote",
  "body",
  "br",
  "button",
  "canvas",
  "caption",
  "cite",
  "code",
  "col",
  "colgroup",
  "data",
  "datalist",
  "dd",
  "del",
  "details",
  "dfn",
  "dialog",
  "div",
  "dl",
  "dt",
  "em",
  "embed",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "head",
  "header",
  "hgroup",
  "hr",
  "html",
  "i",
  "iframe",
  "img",
  "input",
  "ins",
  "kbd",
  "keygen",
  "label",
  "legend",
  "li",
  "link",
  "main",
  "map",
  "mark",
  "menu",
  "menuitem",
  "meta",
  "meter",
  "nav",
  "noscript",
  "object",
  "ol",
  "optgroup",
  "option",
  "output",
  "p",
  "param",
  "picture",
  "pre",
  "progress",
  "q",
  "rp",
  "rt",
  "ruby",
  "s",
  "samp",
  "script",
  "section",
  "select",
  "small",
  "source",
  "span",
  "strong",
  "style",
  "sub",
  "summary",
  "sup",
  "table",
  "tbody",
  "td",
  "textarea",
  "tfoot",
  "th",
  "thead",
  "time",
  "title",
  "tr",
  "track",
  "u",
  "ul",
  "var",
  "video",
  "wbr",
  // SVG
  "circle",
  "clipPath",
  "defs",
  "ellipse",
  "foreignObject",
  "g",
  "image",
  "line",
  "linearGradient",
  "mask",
  "path",
  "pattern",
  "polygon",
  "polyline",
  "radialGradient",
  "rect",
  "stop",
  "svg",
  "text",
  "tspan"
];
globals_exports.assign({
  batchedUpdates: reactDomExports.unstable_batchedUpdates,
  createStringInterpolator: createStringInterpolator2,
  colors: colors2
});
var host$1 = createHost(primitives$1, {
  applyAnimatedValues: applyAnimatedValues$1,
  createAnimatedStyle: (style) => new AnimatedStyle$1(style),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getComponentProps: ({ scrollTop, scrollLeft, ...props }) => props
});
var animated$1 = host$1.animated;
var baseEach = _baseEach;
function baseFilter$1(collection, predicate) {
  var result = [];
  baseEach(collection, function(value, index, collection2) {
    if (predicate(value, index, collection2)) {
      result.push(value);
    }
  });
  return result;
}
var _baseFilter = baseFilter$1;
var arrayFilter = _arrayFilter, baseFilter = _baseFilter, baseIteratee = _baseIteratee, isArray$1 = isArray_1;
function filter(collection, predicate) {
  var func = isArray$1(collection) ? arrayFilter : baseFilter;
  return func(collection, baseIteratee(predicate));
}
var filter_1 = filter;
const o = /* @__PURE__ */ getDefaultExportFromCjs(filter_1);
var baseGetTag = _baseGetTag, isObjectLike$2 = isObjectLike_1;
var numberTag$2 = "[object Number]";
function isNumber(value) {
  return typeof value == "number" || isObjectLike$2(value) && baseGetTag(value) == numberTag$2;
}
var isNumber_1 = isNumber;
const e = /* @__PURE__ */ getDefaultExportFromCjs(isNumber_1);
function arrayEach$1(array2, iteratee) {
  var index = -1, length = array2 == null ? 0 : array2.length;
  while (++index < length) {
    if (iteratee(array2[index], index, array2) === false) {
      break;
    }
  }
  return array2;
}
var _arrayEach = arrayEach$1;
var copyObject$4 = _copyObject, keys$1 = keys_1;
function baseAssign$1(object2, source) {
  return object2 && copyObject$4(source, keys$1(source), object2);
}
var _baseAssign = baseAssign$1;
var copyObject$3 = _copyObject, keysIn$2 = keysIn_1;
function baseAssignIn$1(object2, source) {
  return object2 && copyObject$3(source, keysIn$2(source), object2);
}
var _baseAssignIn = baseAssignIn$1;
var copyObject$2 = _copyObject, getSymbols$1 = _getSymbols;
function copySymbols$1(source, object2) {
  return copyObject$2(source, getSymbols$1(source), object2);
}
var _copySymbols = copySymbols$1;
var arrayPush = _arrayPush, getPrototype = _getPrototype, getSymbols = _getSymbols, stubArray = stubArray_1;
var nativeGetSymbols = Object.getOwnPropertySymbols;
var getSymbolsIn$2 = !nativeGetSymbols ? stubArray : function(object2) {
  var result = [];
  while (object2) {
    arrayPush(result, getSymbols(object2));
    object2 = getPrototype(object2);
  }
  return result;
};
var _getSymbolsIn = getSymbolsIn$2;
var copyObject$1 = _copyObject, getSymbolsIn$1 = _getSymbolsIn;
function copySymbolsIn$1(source, object2) {
  return copyObject$1(source, getSymbolsIn$1(source), object2);
}
var _copySymbolsIn = copySymbolsIn$1;
var baseGetAllKeys = _baseGetAllKeys, getSymbolsIn = _getSymbolsIn, keysIn$1 = keysIn_1;
function getAllKeysIn$2(object2) {
  return baseGetAllKeys(object2, keysIn$1, getSymbolsIn);
}
var _getAllKeysIn = getAllKeysIn$2;
var objectProto = Object.prototype;
var hasOwnProperty = objectProto.hasOwnProperty;
function initCloneArray$1(array2) {
  var length = array2.length, result = new array2.constructor(length);
  if (length && typeof array2[0] == "string" && hasOwnProperty.call(array2, "index")) {
    result.index = array2.index;
    result.input = array2.input;
  }
  return result;
}
var _initCloneArray = initCloneArray$1;
var cloneArrayBuffer$1 = _cloneArrayBuffer;
function cloneDataView$1(dataView, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer$1(dataView.buffer) : dataView.buffer;
  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
}
var _cloneDataView = cloneDataView$1;
var reFlags = /\w*$/;
function cloneRegExp$1(regexp) {
  var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
  result.lastIndex = regexp.lastIndex;
  return result;
}
var _cloneRegExp = cloneRegExp$1;
var Symbol$1 = _Symbol;
var symbolProto = Symbol$1 ? Symbol$1.prototype : void 0, symbolValueOf = symbolProto ? symbolProto.valueOf : void 0;
function cloneSymbol$1(symbol) {
  return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
}
var _cloneSymbol = cloneSymbol$1;
var cloneArrayBuffer = _cloneArrayBuffer, cloneDataView = _cloneDataView, cloneRegExp = _cloneRegExp, cloneSymbol = _cloneSymbol, cloneTypedArray = _cloneTypedArray;
var boolTag$1 = "[object Boolean]", dateTag$1 = "[object Date]", mapTag$2 = "[object Map]", numberTag$1 = "[object Number]", regexpTag$1 = "[object RegExp]", setTag$2 = "[object Set]", stringTag$1 = "[object String]", symbolTag$1 = "[object Symbol]";
var arrayBufferTag$1 = "[object ArrayBuffer]", dataViewTag$1 = "[object DataView]", float32Tag$1 = "[object Float32Array]", float64Tag$1 = "[object Float64Array]", int8Tag$1 = "[object Int8Array]", int16Tag$1 = "[object Int16Array]", int32Tag$1 = "[object Int32Array]", uint8Tag$1 = "[object Uint8Array]", uint8ClampedTag$1 = "[object Uint8ClampedArray]", uint16Tag$1 = "[object Uint16Array]", uint32Tag$1 = "[object Uint32Array]";
function initCloneByTag$1(object2, tag, isDeep) {
  var Ctor = object2.constructor;
  switch (tag) {
    case arrayBufferTag$1:
      return cloneArrayBuffer(object2);
    case boolTag$1:
    case dateTag$1:
      return new Ctor(+object2);
    case dataViewTag$1:
      return cloneDataView(object2, isDeep);
    case float32Tag$1:
    case float64Tag$1:
    case int8Tag$1:
    case int16Tag$1:
    case int32Tag$1:
    case uint8Tag$1:
    case uint8ClampedTag$1:
    case uint16Tag$1:
    case uint32Tag$1:
      return cloneTypedArray(object2, isDeep);
    case mapTag$2:
      return new Ctor();
    case numberTag$1:
    case stringTag$1:
      return new Ctor(object2);
    case regexpTag$1:
      return cloneRegExp(object2);
    case setTag$2:
      return new Ctor();
    case symbolTag$1:
      return cloneSymbol(object2);
  }
}
var _initCloneByTag = initCloneByTag$1;
var getTag$2 = _getTag, isObjectLike$1 = isObjectLike_1;
var mapTag$1 = "[object Map]";
function baseIsMap$1(value) {
  return isObjectLike$1(value) && getTag$2(value) == mapTag$1;
}
var _baseIsMap = baseIsMap$1;
var baseIsMap = _baseIsMap, baseUnary$1 = _baseUnary, nodeUtil$1 = _nodeUtilExports;
var nodeIsMap = nodeUtil$1 && nodeUtil$1.isMap;
var isMap$1 = nodeIsMap ? baseUnary$1(nodeIsMap) : baseIsMap;
var isMap_1 = isMap$1;
var getTag$1 = _getTag, isObjectLike = isObjectLike_1;
var setTag$1 = "[object Set]";
function baseIsSet$1(value) {
  return isObjectLike(value) && getTag$1(value) == setTag$1;
}
var _baseIsSet = baseIsSet$1;
var baseIsSet = _baseIsSet, baseUnary = _baseUnary, nodeUtil = _nodeUtilExports;
var nodeIsSet = nodeUtil && nodeUtil.isSet;
var isSet$1 = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;
var isSet_1 = isSet$1;
var Stack = _Stack, arrayEach = _arrayEach, assignValue = _assignValue, baseAssign = _baseAssign, baseAssignIn = _baseAssignIn, cloneBuffer = _cloneBufferExports, copyArray = _copyArray, copySymbols = _copySymbols, copySymbolsIn = _copySymbolsIn, getAllKeys = _getAllKeys, getAllKeysIn$1 = _getAllKeysIn, getTag = _getTag, initCloneArray = _initCloneArray, initCloneByTag = _initCloneByTag, initCloneObject = _initCloneObject, isArray = isArray_1, isBuffer = isBufferExports, isMap = isMap_1, isObject = isObject_1, isSet = isSet_1, keys = keys_1, keysIn = keysIn_1;
var CLONE_DEEP_FLAG$1 = 1, CLONE_FLAT_FLAG$1 = 2, CLONE_SYMBOLS_FLAG$1 = 4;
var argsTag = "[object Arguments]", arrayTag = "[object Array]", boolTag = "[object Boolean]", dateTag = "[object Date]", errorTag = "[object Error]", funcTag = "[object Function]", genTag = "[object GeneratorFunction]", mapTag = "[object Map]", numberTag = "[object Number]", objectTag = "[object Object]", regexpTag = "[object RegExp]", setTag = "[object Set]", stringTag = "[object String]", symbolTag = "[object Symbol]", weakMapTag = "[object WeakMap]";
var arrayBufferTag = "[object ArrayBuffer]", dataViewTag = "[object DataView]", float32Tag = "[object Float32Array]", float64Tag = "[object Float64Array]", int8Tag = "[object Int8Array]", int16Tag = "[object Int16Array]", int32Tag = "[object Int32Array]", uint8Tag = "[object Uint8Array]", uint8ClampedTag = "[object Uint8ClampedArray]", uint16Tag = "[object Uint16Array]", uint32Tag = "[object Uint32Array]";
var cloneableTags = {};
cloneableTags[argsTag] = cloneableTags[arrayTag] = cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] = cloneableTags[boolTag] = cloneableTags[dateTag] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[mapTag] = cloneableTags[numberTag] = cloneableTags[objectTag] = cloneableTags[regexpTag] = cloneableTags[setTag] = cloneableTags[stringTag] = cloneableTags[symbolTag] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
cloneableTags[errorTag] = cloneableTags[funcTag] = cloneableTags[weakMapTag] = false;
function baseClone$1(value, bitmask, customizer, key, object2, stack) {
  var result, isDeep = bitmask & CLONE_DEEP_FLAG$1, isFlat = bitmask & CLONE_FLAT_FLAG$1, isFull = bitmask & CLONE_SYMBOLS_FLAG$1;
  if (customizer) {
    result = object2 ? customizer(value, key, object2, stack) : customizer(value);
  }
  if (result !== void 0) {
    return result;
  }
  if (!isObject(value)) {
    return value;
  }
  var isArr = isArray(value);
  if (isArr) {
    result = initCloneArray(value);
    if (!isDeep) {
      return copyArray(value, result);
    }
  } else {
    var tag = getTag(value), isFunc = tag == funcTag || tag == genTag;
    if (isBuffer(value)) {
      return cloneBuffer(value, isDeep);
    }
    if (tag == objectTag || tag == argsTag || isFunc && !object2) {
      result = isFlat || isFunc ? {} : initCloneObject(value);
      if (!isDeep) {
        return isFlat ? copySymbolsIn(value, baseAssignIn(result, value)) : copySymbols(value, baseAssign(result, value));
      }
    } else {
      if (!cloneableTags[tag]) {
        return object2 ? value : {};
      }
      result = initCloneByTag(value, tag, isDeep);
    }
  }
  stack || (stack = new Stack());
  var stacked = stack.get(value);
  if (stacked) {
    return stacked;
  }
  stack.set(value, result);
  if (isSet(value)) {
    value.forEach(function(subValue) {
      result.add(baseClone$1(subValue, bitmask, customizer, subValue, value, stack));
    });
  } else if (isMap(value)) {
    value.forEach(function(subValue, key2) {
      result.set(key2, baseClone$1(subValue, bitmask, customizer, key2, value, stack));
    });
  }
  var keysFunc = isFull ? isFlat ? getAllKeysIn$1 : getAllKeys : isFlat ? keysIn : keys;
  var props = isArr ? void 0 : keysFunc(value);
  arrayEach(props || value, function(subValue, key2) {
    if (props) {
      key2 = subValue;
      subValue = value[key2];
    }
    assignValue(result, key2, baseClone$1(subValue, bitmask, customizer, key2, value, stack));
  });
  return result;
}
var _baseClone = baseClone$1;
function baseSlice$1(array2, start2, end) {
  var index = -1, length = array2.length;
  if (start2 < 0) {
    start2 = -start2 > length ? 0 : length + start2;
  }
  end = end > length ? length : end;
  if (end < 0) {
    end += length;
  }
  length = start2 > end ? 0 : end - start2 >>> 0;
  start2 >>>= 0;
  var result = Array(length);
  while (++index < length) {
    result[index] = array2[index + start2];
  }
  return result;
}
var _baseSlice = baseSlice$1;
var baseGet = _baseGet, baseSlice = _baseSlice;
function parent$1(object2, path) {
  return path.length < 2 ? object2 : baseGet(object2, baseSlice(path, 0, -1));
}
var _parent = parent$1;
var castPath$1 = _castPath, last = last_1, parent = _parent, toKey = _toKey;
function baseUnset$1(object2, path) {
  path = castPath$1(path, object2);
  object2 = parent(object2, path);
  return object2 == null || delete object2[toKey(last(path))];
}
var _baseUnset = baseUnset$1;
var isPlainObject = isPlainObject_1;
function customOmitClone$1(value) {
  return isPlainObject(value) ? void 0 : value;
}
var _customOmitClone = customOmitClone$1;
var arrayMap = _arrayMap, baseClone = _baseClone, baseUnset = _baseUnset, castPath = _castPath, copyObject = _copyObject, customOmitClone = _customOmitClone, flatRest = _flatRest, getAllKeysIn = _getAllKeysIn;
var CLONE_DEEP_FLAG = 1, CLONE_FLAT_FLAG = 2, CLONE_SYMBOLS_FLAG = 4;
var omit = flatRest(function(object2, paths) {
  var result = {};
  if (object2 == null) {
    return result;
  }
  var isDeep = false;
  paths = arrayMap(paths, function(path) {
    path = castPath(path, object2);
    isDeep || (isDeep = path.length > 1);
    return path;
  });
  copyObject(object2, getAllKeysIn(object2), result);
  if (isDeep) {
    result = baseClone(result, CLONE_DEEP_FLAG | CLONE_FLAT_FLAG | CLONE_SYMBOLS_FLAG, customOmitClone);
  }
  var length = paths.length;
  while (length--) {
    baseUnset(result, paths[length]);
  }
  return result;
});
var omit_1 = omit;
const a = /* @__PURE__ */ getDefaultExportFromCjs(omit_1);
var isCustomPropRE = /^--/;
function dangerousStyleValue(name, value) {
  if (value == null || typeof value === "boolean" || value === "")
    return "";
  if (typeof value === "number" && value !== 0 && !isCustomPropRE.test(name) && !(isUnitlessNumber.hasOwnProperty(name) && isUnitlessNumber[name]))
    return value + "px";
  return ("" + value).trim();
}
var attributeCache = {};
function applyAnimatedValues(instance, props) {
  if (!instance.nodeType || !instance.setAttribute) {
    return false;
  }
  const isFilterElement = instance.nodeName === "filter" || instance.parentNode && instance.parentNode.nodeName === "filter";
  const { style, children, scrollTop, scrollLeft, viewBox, ...attributes } = props;
  const values = Object.values(attributes);
  const names = Object.keys(attributes).map(
    (name) => isFilterElement || instance.hasAttribute(name) ? name : attributeCache[name] || (attributeCache[name] = name.replace(
      /([A-Z])/g,
      // Attributes are written in dash case
      (n2) => "-" + n2.toLowerCase()
    ))
  );
  if (children !== void 0) {
    instance.textContent = children;
  }
  for (const name in style) {
    if (style.hasOwnProperty(name)) {
      const value = dangerousStyleValue(name, style[name]);
      if (isCustomPropRE.test(name)) {
        instance.style.setProperty(name, value);
      } else {
        instance.style[name] = value;
      }
    }
  }
  names.forEach((name, i2) => {
    instance.setAttribute(name, values[i2]);
  });
  if (scrollTop !== void 0) {
    instance.scrollTop = scrollTop;
  }
  if (scrollLeft !== void 0) {
    instance.scrollLeft = scrollLeft;
  }
  if (viewBox !== void 0) {
    instance.setAttribute("viewBox", viewBox);
  }
}
var isUnitlessNumber = {
  animationIterationCount: true,
  borderImageOutset: true,
  borderImageSlice: true,
  borderImageWidth: true,
  boxFlex: true,
  boxFlexGroup: true,
  boxOrdinalGroup: true,
  columnCount: true,
  columns: true,
  flex: true,
  flexGrow: true,
  flexPositive: true,
  flexShrink: true,
  flexNegative: true,
  flexOrder: true,
  gridRow: true,
  gridRowEnd: true,
  gridRowSpan: true,
  gridRowStart: true,
  gridColumn: true,
  gridColumnEnd: true,
  gridColumnSpan: true,
  gridColumnStart: true,
  fontWeight: true,
  lineClamp: true,
  lineHeight: true,
  opacity: true,
  order: true,
  orphans: true,
  tabSize: true,
  widows: true,
  zIndex: true,
  zoom: true,
  // SVG-related properties
  fillOpacity: true,
  floodOpacity: true,
  stopOpacity: true,
  strokeDasharray: true,
  strokeDashoffset: true,
  strokeMiterlimit: true,
  strokeOpacity: true,
  strokeWidth: true
};
var prefixKey = (prefix2, key) => prefix2 + key.charAt(0).toUpperCase() + key.substring(1);
var prefixes = ["Webkit", "Ms", "Moz", "O"];
isUnitlessNumber = Object.keys(isUnitlessNumber).reduce((acc, prop) => {
  prefixes.forEach((prefix2) => acc[prefixKey(prefix2, prop)] = acc[prop]);
  return acc;
}, isUnitlessNumber);
var domTransforms = /^(matrix|translate|scale|rotate|skew)/;
var pxTransforms = /^(translate)/;
var degTransforms = /^(rotate|skew)/;
var addUnit = (value, unit2) => is.num(value) && value !== 0 ? value + unit2 : value;
var isValueIdentity = (value, id) => is.arr(value) ? value.every((v2) => isValueIdentity(v2, id)) : is.num(value) ? value === id : parseFloat(value) === id;
var AnimatedStyle5 = class extends AnimatedObject {
  constructor({ x: x2, y, z: z2, ...style }) {
    const inputs = [];
    const transforms = [];
    if (x2 || y || z2) {
      inputs.push([x2 || 0, y || 0, z2 || 0]);
      transforms.push((xyz) => [
        `translate3d(${xyz.map((v2) => addUnit(v2, "px")).join(",")})`,
        // prettier-ignore
        isValueIdentity(xyz, 0)
      ]);
    }
    eachProp(style, (value, key) => {
      if (key === "transform") {
        inputs.push([value || ""]);
        transforms.push((transform) => [transform, transform === ""]);
      } else if (domTransforms.test(key)) {
        delete style[key];
        if (is.und(value))
          return;
        const unit2 = pxTransforms.test(key) ? "px" : degTransforms.test(key) ? "deg" : "";
        inputs.push(toArray(value));
        transforms.push(
          key === "rotate3d" ? ([x22, y2, z22, deg]) => [
            `rotate3d(${x22},${y2},${z22},${addUnit(deg, unit2)})`,
            isValueIdentity(deg, 0)
          ] : (input) => [
            `${key}(${input.map((v2) => addUnit(v2, unit2)).join(",")})`,
            isValueIdentity(input, key.startsWith("scale") ? 1 : 0)
          ]
        );
      }
    });
    if (inputs.length) {
      style.transform = new FluidTransform5(inputs, transforms);
    }
    super(style);
  }
};
var FluidTransform5 = class extends FluidValue {
  constructor(inputs, transforms) {
    super();
    this.inputs = inputs;
    this.transforms = transforms;
    this._value = null;
  }
  get() {
    return this._value || (this._value = this._get());
  }
  _get() {
    let transform = "";
    let identity2 = true;
    each(this.inputs, (input, i2) => {
      const arg1 = getFluidValue(input[0]);
      const [t2, id] = this.transforms[i2](
        is.arr(arg1) ? arg1 : input.map(getFluidValue)
      );
      transform += " " + t2;
      identity2 = identity2 && id;
    });
    return identity2 ? "none" : transform;
  }
  // Start observing our inputs once we have an observer.
  observerAdded(count) {
    if (count == 1)
      each(
        this.inputs,
        (input) => each(
          input,
          (value) => hasFluidValue(value) && addFluidObserver(value, this)
        )
      );
  }
  // Stop observing our inputs once we have no observers.
  observerRemoved(count) {
    if (count == 0)
      each(
        this.inputs,
        (input) => each(
          input,
          (value) => hasFluidValue(value) && removeFluidObserver(value, this)
        )
      );
  }
  eventObserved(event) {
    if (event.type == "change") {
      this._value = null;
    }
    callFluidObservers(this, event);
  }
};
var primitives = [
  "a",
  "abbr",
  "address",
  "area",
  "article",
  "aside",
  "audio",
  "b",
  "base",
  "bdi",
  "bdo",
  "big",
  "blockquote",
  "body",
  "br",
  "button",
  "canvas",
  "caption",
  "cite",
  "code",
  "col",
  "colgroup",
  "data",
  "datalist",
  "dd",
  "del",
  "details",
  "dfn",
  "dialog",
  "div",
  "dl",
  "dt",
  "em",
  "embed",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "head",
  "header",
  "hgroup",
  "hr",
  "html",
  "i",
  "iframe",
  "img",
  "input",
  "ins",
  "kbd",
  "keygen",
  "label",
  "legend",
  "li",
  "link",
  "main",
  "map",
  "mark",
  "menu",
  "menuitem",
  "meta",
  "meter",
  "nav",
  "noscript",
  "object",
  "ol",
  "optgroup",
  "option",
  "output",
  "p",
  "param",
  "picture",
  "pre",
  "progress",
  "q",
  "rp",
  "rt",
  "ruby",
  "s",
  "samp",
  "script",
  "section",
  "select",
  "small",
  "source",
  "span",
  "strong",
  "style",
  "sub",
  "summary",
  "sup",
  "table",
  "tbody",
  "td",
  "textarea",
  "tfoot",
  "th",
  "thead",
  "time",
  "title",
  "tr",
  "track",
  "u",
  "ul",
  "var",
  "video",
  "wbr",
  // SVG
  "circle",
  "clipPath",
  "defs",
  "ellipse",
  "foreignObject",
  "g",
  "image",
  "line",
  "linearGradient",
  "mask",
  "path",
  "pattern",
  "polygon",
  "polyline",
  "radialGradient",
  "rect",
  "stop",
  "svg",
  "text",
  "tspan"
];
globals_exports.assign({
  batchedUpdates: reactDomExports.unstable_batchedUpdates,
  createStringInterpolator: createStringInterpolator2,
  colors: colors2
});
var host = createHost(primitives, {
  applyAnimatedValues,
  createAnimatedStyle: (style) => new AnimatedStyle5(style),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getComponentProps: ({ scrollTop, scrollLeft, ...props }) => props
});
var animated = host.animated;
function g() {
  return g = Object.assign ? Object.assign.bind() : function(t2) {
    for (var n2 = 1; n2 < arguments.length; n2++) {
      var i2 = arguments[n2];
      for (var o2 in i2)
        Object.prototype.hasOwnProperty.call(i2, o2) && (t2[o2] = i2[o2]);
    }
    return t2;
  }, g.apply(this, arguments);
}
var k$1 = { dotSize: 4, noteWidth: 120, noteTextOffset: 8, animate: true }, W = function(n2) {
  var i2 = typeof n2;
  return reactExports.isValidElement(n2) || "string" === i2 || "function" === i2 || "object" === i2;
}, v$1 = function(t2) {
  var n2 = typeof t2;
  return "string" === n2 || "function" === n2;
}, b$1 = function(t2) {
  return "circle" === t2.type;
}, w$1 = function(t2) {
  return "dot" === t2.type;
}, z = function(t2) {
  return "rect" === t2.type;
}, P = function(t2) {
  var n2 = t2.data, i2 = t2.annotations, e4 = t2.getPosition, r2 = t2.getDimensions;
  return i2.reduce(function(t3, i3) {
    var s = i3.offset || 0;
    return [].concat(t3, o(n2, i3.match).map(function(t4) {
      var n3 = e4(t4), o2 = r2(t4);
      return (b$1(i3) || z(i3)) && (o2.size = o2.size + 2 * s, o2.width = o2.width + 2 * s, o2.height = o2.height + 2 * s), g({}, a(i3, ["match", "offset"]), n3, o2, { size: i3.size || o2.size, datum: t4 });
    }));
  }, []);
}, C = function(t2, n2, i2, o2) {
  var e4 = Math.atan2(o2 - n2, i2 - t2);
  return Qt(Nt(e4));
}, O$1 = function(t2) {
  var n2, i2, o2 = t2.x, a2 = t2.y, r2 = t2.noteX, s = t2.noteY, h = t2.noteWidth, d = void 0 === h ? k$1.noteWidth : h, c6 = t2.noteTextOffset, f2 = void 0 === c6 ? k$1.noteTextOffset : c6;
  if (e(r2))
    n2 = o2 + r2;
  else {
    if (void 0 === r2.abs)
      throw new Error("noteX should be either a number or an object containing an 'abs' property");
    n2 = r2.abs;
  }
  if (e(s))
    i2 = a2 + s;
  else {
    if (void 0 === s.abs)
      throw new Error("noteY should be either a number or an object containing an 'abs' property");
    i2 = s.abs;
  }
  var y = o2, x2 = a2, m2 = C(o2, a2, n2, i2);
  if (b$1(t2)) {
    var p2 = Jt(Kt(m2), t2.size / 2);
    y += p2.x, x2 += p2.y;
  }
  if (z(t2)) {
    var g2 = Math.round((m2 + 90) / 45) % 8;
    0 === g2 && (x2 -= t2.height / 2), 1 === g2 && (y += t2.width / 2, x2 -= t2.height / 2), 2 === g2 && (y += t2.width / 2), 3 === g2 && (y += t2.width / 2, x2 += t2.height / 2), 4 === g2 && (x2 += t2.height / 2), 5 === g2 && (y -= t2.width / 2, x2 += t2.height / 2), 6 === g2 && (y -= t2.width / 2), 7 === g2 && (y -= t2.width / 2, x2 -= t2.height / 2);
  }
  var W2 = n2, v2 = n2;
  return (m2 + 90) % 360 > 180 ? (W2 -= d, v2 -= d) : v2 += d, { points: [[y, x2], [n2, i2], [v2, i2]], text: [W2, i2 - f2], angle: m2 + 90 };
}, S$1 = function(t2) {
  var i2 = t2.data, o2 = t2.annotations, e4 = t2.getPosition, a2 = t2.getDimensions;
  return reactExports.useMemo(function() {
    return P({ data: i2, annotations: o2, getPosition: e4, getDimensions: a2 });
  }, [i2, o2, e4, a2]);
}, j$1 = function(t2) {
  var i2 = t2.annotations;
  return reactExports.useMemo(function() {
    return i2.map(function(t3) {
      return g({}, t3, { computed: O$1(g({}, t3)) });
    });
  }, [i2]);
}, M = function(t2) {
  return reactExports.useMemo(function() {
    return O$1(t2);
  }, [t2]);
}, T = function(t2) {
  var n2 = t2.datum, o2 = t2.x, e4 = t2.y, r2 = t2.note, s = zt(), l2 = Ur(), u2 = l2.animate, c6 = l2.config, k2 = useSpring({ x: o2, y: e4, config: c6, immediate: !u2 });
  return "function" == typeof r2 ? reactExports.createElement(r2, { x: o2, y: e4, datum: n2 }) : jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [s.annotations.text.outlineWidth > 0 && jsxRuntimeExports.jsx(animated.text, { x: k2.x, y: k2.y, style: g({}, s.annotations.text, { strokeLinejoin: "round", strokeWidth: 2 * s.annotations.text.outlineWidth, stroke: s.annotations.text.outlineColor }), children: r2 }), jsxRuntimeExports.jsx(animated.text, { x: k2.x, y: k2.y, style: a(s.annotations.text, ["outlineWidth", "outlineColor"]), children: r2 })] });
}, E = function(t2) {
  var i2 = t2.points, o2 = t2.isOutline, e4 = void 0 !== o2 && o2, a2 = zt(), r2 = reactExports.useMemo(function() {
    var t3 = i2[0];
    return i2.slice(1).reduce(function(t4, n2) {
      return t4 + " L" + n2[0] + "," + n2[1];
    }, "M" + t3[0] + "," + t3[1]);
  }, [i2]), s = Fr(r2);
  if (e4 && a2.annotations.link.outlineWidth <= 0)
    return null;
  var l2 = g({}, a2.annotations.link);
  return e4 && (l2.strokeLinecap = "square", l2.strokeWidth = a2.annotations.link.strokeWidth + 2 * a2.annotations.link.outlineWidth, l2.stroke = a2.annotations.link.outlineColor, l2.opacity = a2.annotations.link.outlineOpacity), jsxRuntimeExports.jsx(animated.path, { fill: "none", d: s, style: l2 });
}, I = function(t2) {
  var n2 = t2.x, i2 = t2.y, o2 = t2.size, e4 = zt(), a2 = Ur(), r2 = a2.animate, s = a2.config, l2 = useSpring({ x: n2, y: i2, radius: o2 / 2, config: s, immediate: !r2 });
  return jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [e4.annotations.outline.outlineWidth > 0 && jsxRuntimeExports.jsx(animated.circle, { cx: l2.x, cy: l2.y, r: l2.radius, style: g({}, e4.annotations.outline, { fill: "none", strokeWidth: e4.annotations.outline.strokeWidth + 2 * e4.annotations.outline.outlineWidth, stroke: e4.annotations.outline.outlineColor, opacity: e4.annotations.outline.outlineOpacity }) }), jsxRuntimeExports.jsx(animated.circle, { cx: l2.x, cy: l2.y, r: l2.radius, style: e4.annotations.outline })] });
}, D = function(t2) {
  var n2 = t2.x, i2 = t2.y, o2 = t2.size, e4 = void 0 === o2 ? k$1.dotSize : o2, a2 = zt(), r2 = Ur(), s = r2.animate, l2 = r2.config, u2 = useSpring({ x: n2, y: i2, radius: e4 / 2, config: l2, immediate: !s });
  return jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [a2.annotations.outline.outlineWidth > 0 && jsxRuntimeExports.jsx(animated.circle, { cx: u2.x, cy: u2.y, r: u2.radius, style: g({}, a2.annotations.outline, { fill: "none", strokeWidth: 2 * a2.annotations.outline.outlineWidth, stroke: a2.annotations.outline.outlineColor, opacity: a2.annotations.outline.outlineOpacity }) }), jsxRuntimeExports.jsx(animated.circle, { cx: u2.x, cy: u2.y, r: u2.radius, style: a2.annotations.symbol })] });
}, L = function(t2) {
  var n2 = t2.x, i2 = t2.y, o2 = t2.width, e4 = t2.height, a2 = t2.borderRadius, r2 = void 0 === a2 ? 6 : a2, s = zt(), l2 = Ur(), u2 = l2.animate, c6 = l2.config, k2 = useSpring({ x: n2 - o2 / 2, y: i2 - e4 / 2, width: o2, height: e4, config: c6, immediate: !u2 });
  return jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [s.annotations.outline.outlineWidth > 0 && jsxRuntimeExports.jsx(animated.rect, { x: k2.x, y: k2.y, rx: r2, ry: r2, width: k2.width, height: k2.height, style: g({}, s.annotations.outline, { fill: "none", strokeWidth: s.annotations.outline.strokeWidth + 2 * s.annotations.outline.outlineWidth, stroke: s.annotations.outline.outlineColor, opacity: s.annotations.outline.outlineOpacity }) }), jsxRuntimeExports.jsx(animated.rect, { x: k2.x, y: k2.y, rx: r2, ry: r2, width: k2.width, height: k2.height, style: s.annotations.outline })] });
}, R = function(t2) {
  var n2 = t2.datum, i2 = t2.x, o2 = t2.y, e4 = t2.note, a2 = M(t2);
  if (!W(e4))
    throw new Error("note should be a valid react element");
  return jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsx(E, { points: a2.points, isOutline: true }), b$1(t2) && jsxRuntimeExports.jsx(I, { x: i2, y: o2, size: t2.size }), w$1(t2) && jsxRuntimeExports.jsx(D, { x: i2, y: o2, size: t2.size }), z(t2) && jsxRuntimeExports.jsx(L, { x: i2, y: o2, width: t2.width, height: t2.height, borderRadius: t2.borderRadius }), jsxRuntimeExports.jsx(E, { points: a2.points }), jsxRuntimeExports.jsx(T, { datum: n2, x: a2.text[0], y: a2.text[1], note: e4 })] });
}, q$1 = function(t2, n2) {
  n2.forEach(function(n3, i2) {
    var o2 = n3[0], e4 = n3[1];
    0 === i2 ? t2.moveTo(o2, e4) : t2.lineTo(o2, e4);
  });
}, J$1 = function(t2, n2) {
  var i2 = n2.annotations, o2 = n2.theme;
  0 !== i2.length && (t2.save(), i2.forEach(function(n3) {
    if (!v$1(n3.note))
      throw new Error("note is invalid for canvas implementation");
    o2.annotations.link.outlineWidth > 0 && (t2.lineCap = "square", t2.strokeStyle = o2.annotations.link.outlineColor, t2.lineWidth = o2.annotations.link.strokeWidth + 2 * o2.annotations.link.outlineWidth, t2.beginPath(), q$1(t2, n3.computed.points), t2.stroke(), t2.lineCap = "butt"), b$1(n3) && o2.annotations.outline.outlineWidth > 0 && (t2.strokeStyle = o2.annotations.outline.outlineColor, t2.lineWidth = o2.annotations.outline.strokeWidth + 2 * o2.annotations.outline.outlineWidth, t2.beginPath(), t2.arc(n3.x, n3.y, n3.size / 2, 0, 2 * Math.PI), t2.stroke()), w$1(n3) && o2.annotations.symbol.outlineWidth > 0 && (t2.strokeStyle = o2.annotations.symbol.outlineColor, t2.lineWidth = 2 * o2.annotations.symbol.outlineWidth, t2.beginPath(), t2.arc(n3.x, n3.y, n3.size / 2, 0, 2 * Math.PI), t2.stroke()), z(n3) && o2.annotations.outline.outlineWidth > 0 && (t2.strokeStyle = o2.annotations.outline.outlineColor, t2.lineWidth = o2.annotations.outline.strokeWidth + 2 * o2.annotations.outline.outlineWidth, t2.beginPath(), t2.rect(n3.x - n3.width / 2, n3.y - n3.height / 2, n3.width, n3.height), t2.stroke()), t2.strokeStyle = o2.annotations.link.stroke, t2.lineWidth = o2.annotations.link.strokeWidth, t2.beginPath(), q$1(t2, n3.computed.points), t2.stroke(), b$1(n3) && (t2.strokeStyle = o2.annotations.outline.stroke, t2.lineWidth = o2.annotations.outline.strokeWidth, t2.beginPath(), t2.arc(n3.x, n3.y, n3.size / 2, 0, 2 * Math.PI), t2.stroke()), w$1(n3) && (t2.fillStyle = o2.annotations.symbol.fill, t2.beginPath(), t2.arc(n3.x, n3.y, n3.size / 2, 0, 2 * Math.PI), t2.fill()), z(n3) && (t2.strokeStyle = o2.annotations.outline.stroke, t2.lineWidth = o2.annotations.outline.strokeWidth, t2.beginPath(), t2.rect(n3.x - n3.width / 2, n3.y - n3.height / 2, n3.width, n3.height), t2.stroke()), "function" == typeof n3.note ? n3.note(t2, { datum: n3.datum, x: n3.computed.text[0], y: n3.computed.text[1], theme: o2 }) : (t2.font = o2.annotations.text.fontSize + "px " + o2.annotations.text.fontFamily, t2.textAlign = "left", t2.textBaseline = "alphabetic", t2.fillStyle = o2.annotations.text.fill, t2.strokeStyle = o2.annotations.text.outlineColor, t2.lineWidth = 2 * o2.annotations.text.outlineWidth, o2.annotations.text.outlineWidth > 0 && (t2.lineJoin = "round", t2.strokeText(n3.note, n3.computed.text[0], n3.computed.text[1]), t2.lineJoin = "miter"), t2.fillText(n3.note, n3.computed.text[0], n3.computed.text[1]));
  }), t2.restore());
};
function qe() {
  return qe = Object.assign ? Object.assign.bind() : function(e4) {
    for (var r2 = 1; r2 < arguments.length; r2++) {
      var n2 = arguments[r2];
      for (var t2 in n2)
        Object.prototype.hasOwnProperty.call(n2, t2) && (e4[t2] = n2[t2]);
    }
    return e4;
  }, qe.apply(this, arguments);
}
function Ce$1(e4, r2) {
  (null == r2 || r2 > e4.length) && (r2 = e4.length);
  for (var n2 = 0, t2 = new Array(r2); n2 < r2; n2++)
    t2[n2] = e4[n2];
  return t2;
}
function Ge(e4, r2) {
  var n2 = "undefined" != typeof Symbol && e4[Symbol.iterator] || e4["@@iterator"];
  if (n2)
    return (n2 = n2.call(e4)).next.bind(n2);
  if (Array.isArray(e4) || (n2 = function(e6, r3) {
    if (e6) {
      if ("string" == typeof e6)
        return Ce$1(e6, r3);
      var n3 = Object.prototype.toString.call(e6).slice(8, -1);
      return "Object" === n3 && e6.constructor && (n3 = e6.constructor.name), "Map" === n3 || "Set" === n3 ? Array.from(e6) : "Arguments" === n3 || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n3) ? Ce$1(e6, r3) : void 0;
    }
  }(e4)) || r2 && e4 && "number" == typeof e4.length) {
    n2 && (e4 = n2);
    var t2 = 0;
    return function() {
      return t2 >= e4.length ? { done: true } : { done: false, value: e4[t2++] };
    };
  }
  throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
var Re$1 = { nivo: ["#e8c1a0", "#f47560", "#f1e15b", "#e8a838", "#61cdbb", "#97e3d5"], category10: e$1, accent: r, dark2: n, paired: t, pastel1: o$1, pastel2: i, set1: u$1, set2: a$1, set3: l, tableau10: c$2 }, Ve$1 = Object.keys(Re$1), Pe = { brown_blueGreen: scheme$q, purpleRed_green: scheme$p, pink_yellowGreen: scheme$o, purple_orange: scheme$n, red_blue: scheme$m, red_grey: scheme$l, red_yellow_blue: scheme$k, red_yellow_green: scheme$j, spectral: scheme$i }, Te$1 = Object.keys(Pe), Ue = { brown_blueGreen: v$2, purpleRed_green: _$2, pink_yellowGreen: w$3, purple_orange: k$2, red_blue: j$3, red_grey: A$1, red_yellow_blue: O$3, red_yellow_green: z$3, spectral: E$1 }, De = { blues: scheme$5, greens: scheme$4, greys: scheme$3, oranges: scheme, purples: scheme$2, reds: scheme$1, blue_green: scheme$h, blue_purple: scheme$g, green_blue: scheme$f, orange_red: scheme$e, purple_blue_green: scheme$d, purple_blue: scheme$c, purple_red: scheme$b, red_purple: scheme$a, yellow_green_blue: scheme$9, yellow_green: scheme$8, yellow_orange_brown: scheme$7, yellow_orange_red: scheme$6 }, Me$1 = Object.keys(De), $e = { blues: K$2, greens: L$2, greys: N$1, oranges: Q$2, purples: W$3, reds: X$3, turbo: Y$3, viridis: Z$1, inferno, magma, plasma, cividis: te$1, warm, cool, cubehelixDefault: ue$1, blue_green: ae$1, blue_purple: le$1, green_blue: ce$1, orange_red: se$1, purple_blue_green: fe$1, purple_blue: pe$1, purple_red: de$1, red_purple: me$1, yellow_green_blue: he$1, yellow_green: ge$1, yellow_orange_brown: ye$1, yellow_orange_red: be$1 }, Be$1 = qe({}, Re$1, Pe, De), He = function(e4) {
  return Ve$1.includes(e4);
}, Je = function(e4) {
  return Te$1.includes(e4);
}, Ke = function(e4) {
  return Me$1.includes(e4);
}, Le$1 = { rainbow: ve$1, sinebow: _e };
qe({}, Ue, $e, Le$1);
var We$1 = function(e4, r2) {
  if ("function" == typeof e4)
    return e4;
  if (je(e4)) {
    if (function(e6) {
      return void 0 !== e6.theme;
    }(e4)) {
      if (void 0 === r2)
        throw new Error("Unable to use color from theme as no theme was provided");
      var n2 = ke$1(r2, e4.theme);
      if (void 0 === n2)
        throw new Error("Color from theme is undefined at path: '" + e4.theme + "'");
      return function() {
        return n2;
      };
    }
    if (function(e6) {
      return void 0 !== e6.from;
    }(e4)) {
      var t2 = function(r3) {
        return ke$1(r3, e4.from);
      };
      if (Array.isArray(e4.modifiers)) {
        for (var o2, i2 = [], u2 = function() {
          var e6 = o2.value, r3 = e6[0], n3 = e6[1];
          if ("brighter" === r3)
            i2.push(function(e7) {
              return e7.brighter(n3);
            });
          else if ("darker" === r3)
            i2.push(function(e7) {
              return e7.darker(n3);
            });
          else {
            if ("opacity" !== r3)
              throw new Error("Invalid color modifier: '" + r3 + "', must be one of: 'brighter', 'darker', 'opacity'");
            i2.push(function(e7) {
              return e7.opacity = n3, e7;
            });
          }
        }, a2 = Ge(e4.modifiers); !(o2 = a2()).done; )
          u2();
        return 0 === i2.length ? t2 : function(e6) {
          return i2.reduce(function(e7, r3) {
            return r3(e7);
          }, rgb$1(t2(e6))).toString();
        };
      }
      return t2;
    }
    throw new Error("Invalid color spec, you should either specify 'theme' or 'from' when using a config object");
  }
  return function() {
    return e4;
  };
}, Xe = function(e4, r2) {
  return reactExports.useMemo(function() {
    return We$1(e4, r2);
  }, [e4, r2]);
};
Oe$1.oneOfType([Oe$1.string, Oe$1.func, Oe$1.shape({ theme: Oe$1.string.isRequired }), Oe$1.shape({ from: Oe$1.string.isRequired, modifiers: Oe$1.arrayOf(Oe$1.array) })]);
var fr = function(e4, r2) {
  if ("function" == typeof e4)
    return e4;
  var n2 = "function" == typeof r2 ? r2 : function(e6) {
    return ke$1(e6, r2);
  };
  if (Array.isArray(e4)) {
    var t2 = ordinal(e4), o2 = function(e6) {
      return t2(n2(e6));
    };
    return o2.scale = t2, o2;
  }
  if (je(e4)) {
    if (function(e6) {
      return void 0 !== e6.datum;
    }(e4))
      return function(r3) {
        return ke$1(r3, e4.datum);
      };
    if (function(e6) {
      return void 0 !== e6.scheme;
    }(e4)) {
      if (He(e4.scheme)) {
        var i2 = ordinal(Be$1[e4.scheme]), u2 = function(e6) {
          return i2(n2(e6));
        };
        return u2.scale = i2, u2;
      }
      if (Je(e4.scheme)) {
        if (void 0 !== e4.size && (e4.size < 3 || e4.size > 11))
          throw new Error("Invalid size '" + e4.size + "' for diverging color scheme '" + e4.scheme + "', must be between 3~11");
        var a2 = ordinal(Be$1[e4.scheme][e4.size || 11]), l2 = function(e6) {
          return a2(n2(e6));
        };
        return l2.scale = a2, l2;
      }
      if (Ke(e4.scheme)) {
        if (void 0 !== e4.size && (e4.size < 3 || e4.size > 9))
          throw new Error("Invalid size '" + e4.size + "' for sequential color scheme '" + e4.scheme + "', must be between 3~9");
        var c6 = ordinal(Be$1[e4.scheme][e4.size || 9]), s = function(e6) {
          return c6(n2(e6));
        };
        return s.scale = c6, s;
      }
    }
    throw new Error("Invalid colors, when using an object, you should either pass a 'datum' or a 'scheme' property");
  }
  return function() {
    return e4;
  };
}, pr = function(e4, r2) {
  return reactExports.useMemo(function() {
    return fr(e4, r2);
  }, [e4, r2]);
};
var f = function(e4) {
  var i2 = e4.x, n2 = e4.y, o2 = e4.size, r2 = e4.fill, l2 = e4.opacity, a2 = void 0 === l2 ? 1 : l2, c6 = e4.borderWidth, d = void 0 === c6 ? 0 : c6, s = e4.borderColor;
  return jsxRuntimeExports.jsx("circle", { r: o2 / 2, cx: i2 + o2 / 2, cy: n2 + o2 / 2, fill: r2, opacity: a2, strokeWidth: d, stroke: void 0 === s ? "transparent" : s, style: { pointerEvents: "none" } });
}, m = function(e4) {
  var i2 = e4.x, n2 = e4.y, o2 = e4.size, r2 = e4.fill, l2 = e4.opacity, a2 = void 0 === l2 ? 1 : l2, c6 = e4.borderWidth, d = void 0 === c6 ? 0 : c6, s = e4.borderColor;
  return jsxRuntimeExports.jsx("g", { transform: "translate(" + i2 + "," + n2 + ")", children: jsxRuntimeExports.jsx("path", { d: "\n                    M" + o2 / 2 + " 0\n                    L" + 0.8 * o2 + " " + o2 / 2 + "\n                    L" + o2 / 2 + " " + o2 + "\n                    L" + 0.2 * o2 + " " + o2 / 2 + "\n                    L" + o2 / 2 + " 0\n                ", fill: r2, opacity: a2, strokeWidth: d, stroke: void 0 === s ? "transparent" : s, style: { pointerEvents: "none" } }) });
}, v = function(e4) {
  var i2 = e4.x, n2 = e4.y, o2 = e4.size, r2 = e4.fill, l2 = e4.opacity, a2 = void 0 === l2 ? 1 : l2, c6 = e4.borderWidth, d = void 0 === c6 ? 0 : c6, s = e4.borderColor;
  return jsxRuntimeExports.jsx("rect", { x: i2, y: n2, fill: r2, opacity: a2, strokeWidth: d, stroke: void 0 === s ? "transparent" : s, width: o2, height: o2, style: { pointerEvents: "none" } });
}, u = function(e4) {
  var i2 = e4.x, n2 = e4.y, o2 = e4.size, r2 = e4.fill, l2 = e4.opacity, a2 = void 0 === l2 ? 1 : l2, c6 = e4.borderWidth, d = void 0 === c6 ? 0 : c6, s = e4.borderColor;
  return jsxRuntimeExports.jsx("g", { transform: "translate(" + i2 + "," + n2 + ")", children: jsxRuntimeExports.jsx("path", { d: "\n                M" + o2 / 2 + " 0\n                L" + o2 + " " + o2 + "\n                L0 " + o2 + "\n                L" + o2 / 2 + " 0\n            ", fill: r2, opacity: a2, strokeWidth: d, stroke: void 0 === s ? "transparent" : s, style: { pointerEvents: "none" } }) });
};
function p() {
  return p = Object.assign ? Object.assign.bind() : function(t2) {
    for (var e4 = 1; e4 < arguments.length; e4++) {
      var i2 = arguments[e4];
      for (var n2 in i2)
        Object.prototype.hasOwnProperty.call(i2, n2) && (t2[n2] = i2[n2]);
    }
    return t2;
  }, p.apply(this, arguments);
}
var k = { top: 0, right: 0, bottom: 0, left: 0 }, x = function(t2) {
  var e4, i2 = t2.direction, n2 = t2.itemsSpacing, o2 = t2.padding, r2 = t2.itemCount, l2 = t2.itemWidth, a2 = t2.itemHeight;
  if ("number" != typeof o2 && ("object" != typeof (e4 = o2) || Array.isArray(e4) || null === e4))
    throw new Error("Invalid property padding, must be one of: number, object");
  var c6 = "number" == typeof o2 ? { top: o2, right: o2, bottom: o2, left: o2 } : p({}, k, o2), d = c6.left + c6.right, s = c6.top + c6.bottom, h = l2 + d, g2 = a2 + s, f2 = (r2 - 1) * n2;
  return "row" === i2 ? h = l2 * r2 + f2 + d : "column" === i2 && (g2 = a2 * r2 + f2 + s), { width: h, height: g2, padding: c6 };
}, b = function(t2) {
  var e4 = t2.anchor, i2 = t2.translateX, n2 = t2.translateY, o2 = t2.containerWidth, r2 = t2.containerHeight, l2 = t2.width, a2 = t2.height, c6 = i2, d = n2;
  switch (e4) {
    case "top":
      c6 += (o2 - l2) / 2;
      break;
    case "top-right":
      c6 += o2 - l2;
      break;
    case "right":
      c6 += o2 - l2, d += (r2 - a2) / 2;
      break;
    case "bottom-right":
      c6 += o2 - l2, d += r2 - a2;
      break;
    case "bottom":
      c6 += (o2 - l2) / 2, d += r2 - a2;
      break;
    case "bottom-left":
      d += r2 - a2;
      break;
    case "left":
      d += (r2 - a2) / 2;
      break;
    case "center":
      c6 += (o2 - l2) / 2, d += (r2 - a2) / 2;
  }
  return { x: c6, y: d };
}, S = function(t2) {
  var e4, i2, n2, o2, r2, l2, a2 = t2.direction, c6 = t2.justify, d = t2.symbolSize, s = t2.symbolSpacing, h = t2.width, g2 = t2.height;
  switch (a2) {
    case "left-to-right":
      e4 = 0, i2 = (g2 - d) / 2, o2 = g2 / 2, l2 = "central", c6 ? (n2 = h, r2 = "end") : (n2 = d + s, r2 = "start");
      break;
    case "right-to-left":
      e4 = h - d, i2 = (g2 - d) / 2, o2 = g2 / 2, l2 = "central", c6 ? (n2 = 0, r2 = "start") : (n2 = h - d - s, r2 = "end");
      break;
    case "top-to-bottom":
      e4 = (h - d) / 2, i2 = 0, n2 = h / 2, r2 = "middle", c6 ? (o2 = g2, l2 = "alphabetic") : (o2 = d + s, l2 = "text-before-edge");
      break;
    case "bottom-to-top":
      e4 = (h - d) / 2, i2 = g2 - d, n2 = h / 2, r2 = "middle", c6 ? (o2 = 0, l2 = "text-before-edge") : (o2 = g2 - d - s, l2 = "alphabetic");
  }
  return { symbolX: e4, symbolY: i2, labelX: n2, labelY: o2, labelAnchor: r2, labelAlignment: l2 };
}, w = { circle: f, diamond: m, square: v, triangle: u }, X = function(i2) {
  var n2, l2, a2, d, g2, f2, m2, v2, u2, y, k2, x2 = i2.x, b2 = i2.y, A2 = i2.width, W2 = i2.height, z2 = i2.data, C2 = i2.direction, X2 = void 0 === C2 ? "left-to-right" : C2, Y2 = i2.justify, O2 = void 0 !== Y2 && Y2, B2 = i2.textColor, H2 = i2.background, E2 = void 0 === H2 ? "transparent" : H2, j2 = i2.opacity, L2 = void 0 === j2 ? 1 : j2, M2 = i2.symbolShape, F2 = void 0 === M2 ? "square" : M2, T2 = i2.symbolSize, P2 = void 0 === T2 ? 16 : T2, V2 = i2.symbolSpacing, R2 = void 0 === V2 ? 8 : V2, D2 = i2.symbolBorderWidth, q2 = void 0 === D2 ? 0 : D2, G2 = i2.symbolBorderColor, I2 = void 0 === G2 ? "transparent" : G2, N2 = i2.onClick, _2 = i2.onMouseEnter, J2 = i2.onMouseLeave, K2 = i2.toggleSerie, Q2 = i2.effects, U2 = reactExports.useState({}), Z2 = U2[0], $2 = U2[1], tt2 = zt(), et = reactExports.useCallback(function(t2) {
    if (Q2) {
      var e4 = Q2.filter(function(t3) {
        return "hover" === t3.on;
      }).reduce(function(t3, e6) {
        return p({}, t3, e6.style);
      }, {});
      $2(e4);
    }
    null == _2 || _2(z2, t2);
  }, [_2, z2, Q2]), it = reactExports.useCallback(function(t2) {
    if (Q2) {
      var e4 = Q2.filter(function(t3) {
        return "hover" !== t3.on;
      }).reduce(function(t3, e6) {
        return p({}, t3, e6.style);
      }, {});
      $2(e4);
    }
    null == J2 || J2(z2, t2);
  }, [J2, z2, Q2]), nt = S({ direction: X2, justify: O2, symbolSize: null != (n2 = Z2.symbolSize) ? n2 : P2, symbolSpacing: R2, width: A2, height: W2 }), ot = nt.symbolX, rt2 = nt.symbolY, lt = nt.labelX, at = nt.labelY, ct = nt.labelAnchor, dt = nt.labelAlignment, st = [N2, _2, J2, K2].some(function(t2) {
    return void 0 !== t2;
  }), ht2 = "function" == typeof F2 ? F2 : w[F2];
  return jsxRuntimeExports.jsxs("g", { transform: "translate(" + x2 + "," + b2 + ")", style: { opacity: null != (l2 = Z2.itemOpacity) ? l2 : L2 }, children: [jsxRuntimeExports.jsx("rect", { width: A2, height: W2, fill: null != (a2 = Z2.itemBackground) ? a2 : E2, style: { cursor: st ? "pointer" : "auto" }, onClick: function(t2) {
    null == N2 || N2(z2, t2), null == K2 || K2(z2.id);
  }, onMouseEnter: et, onMouseLeave: it }), reactExports.createElement(ht2, p({ id: z2.id, x: ot, y: rt2, size: null != (d = Z2.symbolSize) ? d : P2, fill: null != (g2 = null != (f2 = z2.fill) ? f2 : z2.color) ? g2 : "black", borderWidth: null != (m2 = Z2.symbolBorderWidth) ? m2 : q2, borderColor: null != (v2 = Z2.symbolBorderColor) ? v2 : I2 }, z2.hidden ? tt2.legends.hidden.symbol : void 0)), jsxRuntimeExports.jsx("text", { textAnchor: ct, style: p({}, Mt(tt2.legends.text), { fill: null != (u2 = null != (y = null != (k2 = Z2.itemTextColor) ? k2 : B2) ? y : tt2.legends.text.fill) ? u2 : "black", dominantBaseline: dt, pointerEvents: "none", userSelect: "none" }, z2.hidden ? tt2.legends.hidden.text : void 0), x: lt, y: at, children: z2.label })] });
}, Y = function(e4) {
  var i2 = e4.data, n2 = e4.x, o2 = e4.y, r2 = e4.direction, l2 = e4.padding, a2 = void 0 === l2 ? 0 : l2, c6 = e4.justify, d = e4.effects, s = e4.itemWidth, h = e4.itemHeight, g2 = e4.itemDirection, f2 = void 0 === g2 ? "left-to-right" : g2, m2 = e4.itemsSpacing, v2 = void 0 === m2 ? 0 : m2, u2 = e4.itemTextColor, p2 = e4.itemBackground, y = void 0 === p2 ? "transparent" : p2, k2 = e4.itemOpacity, b2 = void 0 === k2 ? 1 : k2, S2 = e4.symbolShape, A2 = e4.symbolSize, W2 = e4.symbolSpacing, z2 = e4.symbolBorderWidth, C2 = e4.symbolBorderColor, w2 = e4.onClick, Y2 = e4.onMouseEnter, O2 = e4.onMouseLeave, B2 = e4.toggleSerie, H2 = x({ itemCount: i2.length, itemWidth: s, itemHeight: h, itemsSpacing: v2, direction: r2, padding: a2 }).padding, E2 = "row" === r2 ? s + v2 : 0, j2 = "column" === r2 ? h + v2 : 0;
  return jsxRuntimeExports.jsx("g", { transform: "translate(" + n2 + "," + o2 + ")", children: i2.map(function(e6, i3) {
    return jsxRuntimeExports.jsx(X, { data: e6, x: i3 * E2 + H2.left, y: i3 * j2 + H2.top, width: s, height: h, direction: f2, justify: c6, effects: d, textColor: u2, background: y, opacity: b2, symbolShape: S2, symbolSize: A2, symbolSpacing: W2, symbolBorderWidth: z2, symbolBorderColor: C2, onClick: w2, onMouseEnter: Y2, onMouseLeave: O2, toggleSerie: B2 }, i3);
  }) });
}, O = function(e4) {
  var i2 = e4.data, n2 = e4.containerWidth, o2 = e4.containerHeight, r2 = e4.translateX, l2 = void 0 === r2 ? 0 : r2, a2 = e4.translateY, c6 = void 0 === a2 ? 0 : a2, d = e4.anchor, s = e4.direction, h = e4.padding, g2 = void 0 === h ? 0 : h, f2 = e4.justify, m2 = e4.itemsSpacing, v2 = void 0 === m2 ? 0 : m2, u2 = e4.itemWidth, p2 = e4.itemHeight, y = e4.itemDirection, k2 = e4.itemTextColor, S2 = e4.itemBackground, A2 = e4.itemOpacity, W2 = e4.symbolShape, z2 = e4.symbolSize, C2 = e4.symbolSpacing, w2 = e4.symbolBorderWidth, X2 = e4.symbolBorderColor, O2 = e4.onClick, B2 = e4.onMouseEnter, H2 = e4.onMouseLeave, E2 = e4.toggleSerie, j2 = e4.effects, L2 = x({ itemCount: i2.length, itemsSpacing: v2, itemWidth: u2, itemHeight: p2, direction: s, padding: g2 }), M2 = L2.width, F2 = L2.height, T2 = b({ anchor: d, translateX: l2, translateY: c6, containerWidth: n2, containerHeight: o2, width: M2, height: F2 }), P2 = T2.x, V2 = T2.y;
  return jsxRuntimeExports.jsx(Y, { data: i2, x: P2, y: V2, direction: s, padding: g2, justify: f2, effects: j2, itemsSpacing: v2, itemWidth: u2, itemHeight: p2, itemDirection: y, itemTextColor: k2, itemBackground: S2, itemOpacity: A2, symbolShape: W2, symbolSize: z2, symbolSpacing: C2, symbolBorderWidth: w2, symbolBorderColor: X2, onClick: O2, onMouseEnter: B2, onMouseLeave: H2, toggleSerie: "boolean" == typeof E2 ? void 0 : E2 });
}, B = { start: "left", middle: "center", end: "right" }, H = function(t2, e4) {
  var i2 = e4.data, n2 = e4.containerWidth, o2 = e4.containerHeight, r2 = e4.translateX, l2 = void 0 === r2 ? 0 : r2, a2 = e4.translateY, c6 = void 0 === a2 ? 0 : a2, d = e4.anchor, s = e4.direction, h = e4.padding, g2 = void 0 === h ? 0 : h, f2 = e4.justify, m2 = void 0 !== f2 && f2, v2 = e4.itemsSpacing, u2 = void 0 === v2 ? 0 : v2, p2 = e4.itemWidth, y = e4.itemHeight, k2 = e4.itemDirection, A2 = void 0 === k2 ? "left-to-right" : k2, W2 = e4.itemTextColor, z2 = e4.symbolSize, C2 = void 0 === z2 ? 16 : z2, w2 = e4.symbolSpacing, X2 = void 0 === w2 ? 8 : w2, Y2 = e4.theme, O2 = x({ itemCount: i2.length, itemWidth: p2, itemHeight: y, itemsSpacing: u2, direction: s, padding: g2 }), H2 = O2.width, E2 = O2.height, j2 = O2.padding, L2 = b({ anchor: d, translateX: l2, translateY: c6, containerWidth: n2, containerHeight: o2, width: H2, height: E2 }), M2 = L2.x, F2 = L2.y, T2 = "row" === s ? p2 + u2 : 0, P2 = "column" === s ? y + u2 : 0;
  t2.save(), t2.translate(M2, F2), t2.font = Y2.legends.text.fontSize + "px " + (Y2.legends.text.fontFamily || "sans-serif"), i2.forEach(function(e6, i3) {
    var n3, o3, r3 = i3 * T2 + j2.left, l3 = i3 * P2 + j2.top, a3 = S({ direction: A2, justify: m2, symbolSize: C2, symbolSpacing: X2, width: p2, height: y }), c7 = a3.symbolX, d2 = a3.symbolY, s2 = a3.labelX, h2 = a3.labelY, g3 = a3.labelAnchor, f3 = a3.labelAlignment;
    t2.fillStyle = null != (n3 = e6.color) ? n3 : "black", t2.fillRect(r3 + c7, l3 + d2, C2, C2), t2.textAlign = B[g3], "central" === f3 && (t2.textBaseline = "middle"), t2.fillStyle = null != (o3 = null != W2 ? W2 : Y2.legends.text.fill) ? o3 : "black", t2.fillText(String(e6.label), r3 + s2, l3 + h2);
  }), t2.restore();
};
function j() {
  return j = Object.assign ? Object.assign.bind() : function(e4) {
    for (var t2 = 1; t2 < arguments.length; t2++) {
      var a2 = arguments[t2];
      for (var i2 in a2)
        Object.prototype.hasOwnProperty.call(a2, i2) && (e4[i2] = a2[i2]);
    }
    return e4;
  }, j.apply(this, arguments);
}
function q(e4, t2) {
  if (null == e4)
    return {};
  var a2, i2, n2 = {}, l2 = Object.keys(e4);
  for (i2 = 0; i2 < l2.length; i2++)
    a2 = l2[i2], t2.indexOf(a2) >= 0 || (n2[a2] = e4[a2]);
  return n2;
}
var K, _ = function(e4) {
  var t2 = e4.bars, a2 = e4.annotations, i2 = S$1({ data: t2, annotations: a2, getPosition: function(e6) {
    return { x: e6.x + e6.width / 2, y: e6.y + e6.height / 2 };
  }, getDimensions: function(e6) {
    var t3 = e6.height, a3 = e6.width;
    return { width: a3, height: t3, size: Math.max(a3, t3) };
  } });
  return jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: i2.map(function(e6, t3) {
    return jsxRuntimeExports.jsx(R, j({}, e6), t3);
  }) });
}, J = function(e4) {
  var t2 = e4.width, a2 = e4.height, i2 = e4.legends, n2 = e4.toggleSerie;
  return jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: i2.map(function(e6, i3) {
    var l2, r2 = e6[0], o2 = e6[1];
    return jsxRuntimeExports.jsx(O, j({}, r2, { containerWidth: t2, containerHeight: a2, data: null != (l2 = r2.data) ? l2 : o2, toggleSerie: r2.toggleSerie && "keys" === r2.dataFrom ? n2 : void 0 }), i3);
  }) });
}, Q = ["data"], U = function(e4) {
  var t2, a2 = e4.bar, i2 = a2.data, l2 = q(a2, Q), r2 = e4.style, o2 = r2.borderColor, d = r2.color, u2 = r2.height, c6 = r2.labelColor, s = r2.labelOpacity, h = r2.labelX, f2 = r2.labelY, b2 = r2.transform, v2 = r2.width, g2 = e4.borderRadius, y = e4.borderWidth, w2 = e4.label, L2 = e4.shouldRenderLabel, C2 = e4.isInteractive, V2 = e4.onClick, M2 = e4.onMouseEnter, W2 = e4.onMouseLeave, T2 = e4.tooltip, B2 = e4.isFocusable, I2 = e4.ariaLabel, E2 = e4.ariaLabelledBy, H2 = e4.ariaDescribedBy, P2 = zt(), F2 = k$4(), X2 = F2.showTooltipFromEvent, D2 = F2.showTooltipAt, A2 = F2.hideTooltip, G2 = reactExports.useMemo(function() {
    return function() {
      return reactExports.createElement(T2, j({}, l2, i2));
    };
  }, [T2, l2, i2]), z2 = reactExports.useCallback(function(e6) {
    null == V2 || V2(j({ color: l2.color }, i2), e6);
  }, [l2, i2, V2]), N2 = reactExports.useCallback(function(e6) {
    return X2(G2(), e6);
  }, [X2, G2]), K2 = reactExports.useCallback(function(e6) {
    null == M2 || M2(i2, e6), X2(G2(), e6);
  }, [i2, M2, X2, G2]), _2 = reactExports.useCallback(function(e6) {
    null == W2 || W2(i2, e6), A2();
  }, [i2, A2, W2]), J2 = reactExports.useCallback(function() {
    D2(G2(), [l2.absX + l2.width / 2, l2.absY]);
  }, [D2, G2, l2]), U2 = reactExports.useCallback(function() {
    A2();
  }, [A2]);
  return jsxRuntimeExports.jsxs(animated$1.g, { transform: b2, children: [jsxRuntimeExports.jsx(animated$1.rect, { width: to(v2, function(e6) {
    return Math.max(e6, 0);
  }), height: to(u2, function(e6) {
    return Math.max(e6, 0);
  }), rx: g2, ry: g2, fill: null != (t2 = i2.fill) ? t2 : d, strokeWidth: y, stroke: o2, focusable: B2, tabIndex: B2 ? 0 : void 0, "aria-label": I2 ? I2(i2) : void 0, "aria-labelledby": E2 ? E2(i2) : void 0, "aria-describedby": H2 ? H2(i2) : void 0, onMouseEnter: C2 ? K2 : void 0, onMouseMove: C2 ? N2 : void 0, onMouseLeave: C2 ? _2 : void 0, onClick: C2 ? z2 : void 0, onFocus: C2 && B2 ? J2 : void 0, onBlur: C2 && B2 ? U2 : void 0 }), L2 && jsxRuntimeExports.jsx(animated$1.text, { x: h, y: f2, textAnchor: "middle", dominantBaseline: "central", fillOpacity: s, style: j({}, P2.labels.text, { pointerEvents: "none", fill: c6 }), children: w2 })] });
}, Z = ["color", "label"], $ = function(e4) {
  var t2 = e4.color, a2 = e4.label, i2 = q(e4, Z);
  return jsxRuntimeExports.jsx(w$4, { id: a2, value: i2.formattedValue, enableChip: true, color: t2 });
}, ee = { indexBy: "id", keys: ["value"], groupMode: "stacked", layout: "vertical", reverse: false, minValue: "auto", maxValue: "auto", valueScale: { type: "linear" }, indexScale: { type: "band", round: true }, padding: 0.1, innerPadding: 0, axisBottom: {}, axisLeft: {}, enableGridX: false, enableGridY: true, enableLabel: true, label: "formattedValue", labelSkipWidth: 0, labelSkipHeight: 0, labelTextColor: { from: "theme", theme: "labels.text.fill" }, colorBy: "id", colors: { scheme: "nivo" }, borderRadius: 0, borderWidth: 0, borderColor: { from: "color" }, isInteractive: true, tooltip: $, tooltipLabel: function(e4) {
  return e4.id + " - " + e4.indexValue;
}, legends: [], initialHiddenIds: [], annotations: [], markers: [], enableTotals: false, totalsOffset: 10 }, te = j({}, ee, { layers: ["grid", "axes", "bars", "totals", "markers", "legends", "annotations"], barComponent: U, defs: [], fill: [], animate: true, motionConfig: "default", role: "img", isFocusable: false }), ae = j({}, ee, { layers: ["grid", "axes", "bars", "totals", "legends", "annotations"], pixelRatio: "undefined" != typeof window && null != (K = window.devicePixelRatio) ? K : 1 }), ie = function(e4, t2, a2, i2, n2, l2) {
  return cn(i2, { all: e4.map(t2), min: 0, max: 0 }, n2, l2).padding(a2);
}, ne = function(e4, t2) {
  return e4.map(function(e6) {
    return j({}, t2.reduce(function(e7, t3) {
      return e7[t3] = null, e7;
    }, {}), e6);
  });
}, le = function(e4) {
  return Object.keys(e4).reduce(function(t2, a2) {
    return e4[a2] && (t2[a2] = e4[a2]), t2;
  }, {});
}, re = function(e4) {
  return [e4, Number(e4)];
}, oe = ["layout", "minValue", "maxValue", "reverse", "width", "height", "padding", "innerPadding", "valueScale", "indexScale", "hiddenIds"], de = function(e4, t2) {
  return e4 > t2;
}, ue = function(e4, t2) {
  return e4 < t2;
}, ce = function(e4, t2) {
  return Array.from(" ".repeat(t2 - e4), function(t3, a2) {
    return e4 + a2;
  });
}, se = function(e4) {
  return de(e4, 0) ? 0 : e4;
}, he = function(e4, t2, a2, i2) {
  var n2 = e4.data, l2 = e4.formatValue, r2 = e4.getColor, o2 = e4.getIndex, d = e4.getTooltipLabel, u2 = e4.innerPadding, c6 = void 0 === u2 ? 0 : u2, s = e4.keys, h = e4.xScale, f2 = e4.yScale, b2 = e4.margin, v2 = a2 ? ue : de, g2 = n2.map(le), m2 = [];
  return s.forEach(function(e6, a3) {
    return ce(0, h.domain().length).forEach(function(u3) {
      var s2, p2, y, x2 = re(n2[u3][e6]), S2 = x2[0], k2 = x2[1], w2 = o2(n2[u3]), L2 = (null != (s2 = h(w2)) ? s2 : 0) + t2 * a3 + c6 * a3, C2 = v2(p2 = k2, 0) ? null != (y = f2(p2)) ? y : 0 : i2, V2 = function(e7, t3) {
        var a4;
        return v2(e7, 0) ? i2 - t3 : (null != (a4 = f2(e7)) ? a4 : 0) - i2;
      }(k2, C2), M2 = { id: e6, value: null === S2 ? S2 : k2, formattedValue: l2(k2), hidden: false, index: u3, indexValue: w2, data: g2[u3] };
      m2.push({ key: e6 + "." + M2.indexValue, index: m2.length, data: M2, x: L2, y: C2, absX: b2.left + L2, absY: b2.top + C2, width: t2, height: V2, color: r2(M2), label: d(M2) });
    });
  }), m2;
}, fe = function(e4, t2, a2, i2) {
  var n2 = e4.data, l2 = e4.formatValue, r2 = e4.getIndex, o2 = e4.getColor, d = e4.getTooltipLabel, u2 = e4.keys, c6 = e4.innerPadding, s = void 0 === c6 ? 0 : c6, h = e4.xScale, f2 = e4.yScale, b2 = e4.margin, v2 = a2 ? ue : de, g2 = n2.map(le), m2 = [];
  return u2.forEach(function(e6, a3) {
    return ce(0, f2.domain().length).forEach(function(u3) {
      var c7, p2, y, x2 = re(n2[u3][e6]), S2 = x2[0], k2 = x2[1], w2 = r2(n2[u3]), L2 = v2(p2 = k2, 0) ? i2 : null != (y = h(p2)) ? y : 0, C2 = (null != (c7 = f2(w2)) ? c7 : 0) + t2 * a3 + s * a3, V2 = function(e7, t3) {
        var a4;
        return v2(e7, 0) ? (null != (a4 = h(e7)) ? a4 : 0) - i2 : i2 - t3;
      }(k2, L2), M2 = { id: e6, value: null === S2 ? S2 : k2, formattedValue: l2(k2), hidden: false, index: u3, indexValue: w2, data: g2[u3] };
      m2.push({ key: e6 + "." + M2.indexValue, index: m2.length, data: M2, x: L2, y: C2, absX: b2.left + L2, absY: b2.top + C2, width: V2, height: t2, color: o2(M2), label: d(M2) });
    });
  }), m2;
}, be = function(e4) {
  var t2, a2, i2 = e4.layout, n2 = e4.minValue, l2 = e4.maxValue, r2 = e4.reverse, o2 = e4.width, d = e4.height, u2 = e4.padding, c6 = void 0 === u2 ? 0 : u2, s = e4.innerPadding, h = void 0 === s ? 0 : s, f2 = e4.valueScale, b2 = e4.indexScale, v2 = e4.hiddenIds, g2 = void 0 === v2 ? [] : v2, m2 = q(e4, oe), p2 = m2.keys.filter(function(e6) {
    return !g2.includes(e6);
  }), y = ne(m2.data, p2), x2 = "vertical" === i2 ? ["y", "x", o2] : ["x", "y", d], S2 = x2[0], k2 = x2[1], w2 = x2[2], L2 = ie(y, m2.getIndex, c6, b2, w2, k2), C2 = j({ max: l2, min: n2, reverse: r2 }, f2), V2 = "auto" === C2.min ? se : function(e6) {
    return e6;
  }, M2 = y.reduce(function(e6, t3) {
    return [].concat(e6, p2.map(function(e7) {
      return t3[e7];
    }));
  }, []).filter(Boolean), W2 = V2(Math.min.apply(Math, M2)), T2 = (a2 = Math.max.apply(Math, M2), isFinite(a2) ? a2 : 0), B2 = cn(C2, { all: M2, min: W2, max: T2 }, "x" === S2 ? o2 : d, S2), I2 = "vertical" === i2 ? [L2, B2] : [B2, L2], O2 = I2[0], E2 = I2[1], R2 = (L2.bandwidth() - h * (p2.length - 1)) / p2.length, H2 = [j({}, m2, { data: y, keys: p2, innerPadding: h, xScale: O2, yScale: E2 }), R2, C2.reverse, null != (t2 = B2(0)) ? t2 : 0];
  return { xScale: O2, yScale: E2, bars: R2 > 0 ? "vertical" === i2 ? he.apply(void 0, H2) : fe.apply(void 0, H2) : [] };
}, ve = ["data", "layout", "minValue", "maxValue", "reverse", "width", "height", "padding", "valueScale", "indexScale", "hiddenIds"], ge = function e3(t2) {
  var a2;
  return t2.some(Array.isArray) ? e3((a2 = []).concat.apply(a2, t2)) : t2;
}, me = function(e4, t2, a2) {
  var i2 = e4.formatValue, n2 = e4.getColor, l2 = e4.getIndex, r2 = e4.getTooltipLabel, o2 = e4.innerPadding, d = e4.stackedData, u2 = e4.xScale, c6 = e4.yScale, s = e4.margin, h = [];
  return d.forEach(function(e6) {
    return u2.domain().forEach(function(d2, f2) {
      var b2, v2, g2 = e6[f2], m2 = null != (b2 = u2(l2(g2.data))) ? b2 : 0, p2 = (null != (v2 = function(e7) {
        return c6(e7[a2 ? 0 : 1]);
      }(g2)) ? v2 : 0) + 0.5 * o2, y = function(e7, t3) {
        var i3;
        return (null != (i3 = c6(e7[a2 ? 1 : 0])) ? i3 : 0) - t3;
      }(g2, p2) - o2, x2 = re(g2.data[e6.key]), S2 = x2[0], k2 = x2[1], w2 = { id: e6.key, value: null === S2 ? S2 : k2, formattedValue: i2(k2), hidden: false, index: f2, indexValue: d2, data: le(g2.data) };
      h.push({ key: e6.key + "." + d2, index: h.length, data: w2, x: m2, y: p2, absX: s.left + m2, absY: s.top + p2, width: t2, height: y, color: n2(w2), label: r2(w2) });
    });
  }), h;
}, pe = function(e4, t2, a2) {
  var i2 = e4.formatValue, n2 = e4.getColor, l2 = e4.getIndex, r2 = e4.getTooltipLabel, o2 = e4.innerPadding, d = e4.stackedData, u2 = e4.xScale, c6 = e4.yScale, s = e4.margin, h = [];
  return d.forEach(function(e6) {
    return c6.domain().forEach(function(d2, f2) {
      var b2, v2, g2 = e6[f2], m2 = null != (b2 = c6(l2(g2.data))) ? b2 : 0, p2 = (null != (v2 = function(e7) {
        return u2(e7[a2 ? 1 : 0]);
      }(g2)) ? v2 : 0) + 0.5 * o2, y = function(e7, t3) {
        var i3;
        return (null != (i3 = u2(e7[a2 ? 0 : 1])) ? i3 : 0) - t3;
      }(g2, p2) - o2, x2 = re(g2.data[e6.key]), S2 = x2[0], k2 = x2[1], w2 = { id: e6.key, value: null === S2 ? S2 : k2, formattedValue: i2(k2), hidden: false, index: f2, indexValue: d2, data: le(g2.data) };
      h.push({ key: e6.key + "." + d2, index: h.length, data: w2, x: p2, y: m2, absX: s.left + p2, absY: s.top + m2, width: y, height: t2, color: n2(w2), label: r2(w2) });
    });
  }), h;
}, ye = function(e4) {
  var t2, a2 = e4.data, i2 = e4.layout, n2 = e4.minValue, l2 = e4.maxValue, r2 = e4.reverse, o2 = e4.width, d = e4.height, u2 = e4.padding, c6 = void 0 === u2 ? 0 : u2, s = e4.valueScale, h = e4.indexScale, f2 = e4.hiddenIds, b2 = void 0 === f2 ? [] : f2, v2 = q(e4, ve), g2 = v2.keys.filter(function(e6) {
    return !b2.includes(e6);
  }), m2 = G().keys(g2).offset(z$2)(ne(a2, g2)), p2 = "vertical" === i2 ? ["y", "x", o2] : ["x", "y", d], y = p2[0], x2 = p2[1], S2 = p2[2], k2 = ie(a2, v2.getIndex, c6, h, S2, x2), w2 = j({ max: l2, min: n2, reverse: r2 }, s), L2 = (t2 = ge(m2), "log" === s.type ? t2.filter(function(e6) {
    return 0 !== e6;
  }) : t2), C2 = Math.min.apply(Math, L2), V2 = Math.max.apply(Math, L2), M2 = cn(w2, { all: L2, min: C2, max: V2 }, "x" === y ? o2 : d, y), W2 = "vertical" === i2 ? [k2, M2] : [M2, k2], T2 = W2[0], B2 = W2[1], I2 = v2.innerPadding > 0 ? v2.innerPadding : 0, O2 = k2.bandwidth(), E2 = [j({}, v2, { innerPadding: I2, stackedData: m2, xScale: T2, yScale: B2 }), O2, w2.reverse];
  return { xScale: T2, yScale: B2, bars: O2 > 0 ? "vertical" === i2 ? me.apply(void 0, E2) : pe.apply(void 0, E2) : [] };
}, xe = function(e4) {
  var t2 = e4.bars, a2 = e4.direction, i2 = e4.from, n2 = e4.groupMode, r2 = e4.layout, o2 = e4.legendLabel, d = e4.reverse, u2 = Cn(null != o2 ? o2 : "indexes" === i2 ? "indexValue" : "id");
  return "indexes" === i2 ? function(e6, t3, a3) {
    var i3 = N(e6.map(function(e7) {
      var t4, i4;
      return { id: null != (t4 = e7.data.indexValue) ? t4 : "", label: a3(e7.data), hidden: e7.data.hidden, color: null != (i4 = e7.color) ? i4 : "#000" };
    }), function(e7) {
      return e7.id;
    });
    return "horizontal" === t3 && i3.reverse(), i3;
  }(t2, r2, u2) : function(e6, t3, a3, i3, n3, l2) {
    var r3 = N(e6.map(function(e7) {
      var t4;
      return { id: e7.data.id, label: l2(e7.data), hidden: e7.data.hidden, color: null != (t4 = e7.color) ? t4 : "#000" };
    }), function(e7) {
      return e7.id;
    });
    return ("vertical" === t3 && "stacked" === i3 && "column" === a3 && true !== n3 || "horizontal" === t3 && "stacked" === i3 && true === n3) && r3.reverse(), r3;
  }(t2, r2, a2, n2, d, u2);
}, Se = function(e4, t2, a2) {
  var i2 = e4.get(t2) || 0;
  e4.set(t2, i2 + a2);
}, ke = function(e4, t2, a2) {
  var i2 = e4.get(t2) || 0;
  e4.set(t2, i2 + (a2 > 0 ? a2 : 0));
}, we = function(e4, t2, a2) {
  var i2 = e4.get(t2) || 0;
  e4.set(t2, Math.max(i2, Number(a2)));
}, Le = function(e4, t2) {
  var a2 = e4.get(t2) || 0;
  e4.set(t2, a2 + 1);
}, Ce = function(e4) {
  var t2 = e4.indexBy, a2 = void 0 === t2 ? ee.indexBy : t2, i2 = e4.keys, l2 = void 0 === i2 ? ee.keys : i2, d = e4.label, u2 = void 0 === d ? ee.label : d, c6 = e4.tooltipLabel, s = void 0 === c6 ? ee.tooltipLabel : c6, h = e4.valueFormat, f2 = e4.colors, b2 = void 0 === f2 ? ee.colors : f2, v2 = e4.colorBy, g2 = void 0 === v2 ? ee.colorBy : v2, m2 = e4.borderColor, p2 = void 0 === m2 ? ee.borderColor : m2, y = e4.labelTextColor, S2 = void 0 === y ? ee.labelTextColor : y, L2 = e4.groupMode, C2 = void 0 === L2 ? ee.groupMode : L2, V2 = e4.layout, M2 = void 0 === V2 ? ee.layout : V2, W2 = e4.reverse, T2 = void 0 === W2 ? ee.reverse : W2, B2 = e4.data, I2 = e4.minValue, O2 = void 0 === I2 ? ee.minValue : I2, E2 = e4.maxValue, R2 = void 0 === E2 ? ee.maxValue : E2, H2 = e4.margin, P2 = e4.width, Y2 = e4.height, D2 = e4.padding, A2 = void 0 === D2 ? ee.padding : D2, G2 = e4.innerPadding, z2 = void 0 === G2 ? ee.innerPadding : G2, N2 = e4.valueScale, q2 = void 0 === N2 ? ee.valueScale : N2, K2 = e4.indexScale, _2 = void 0 === K2 ? ee.indexScale : K2, J2 = e4.initialHiddenIds, Q2 = void 0 === J2 ? ee.initialHiddenIds : J2, U2 = e4.enableLabel, Z2 = void 0 === U2 ? ee.enableLabel : U2, $2 = e4.labelSkipWidth, te2 = void 0 === $2 ? ee.labelSkipWidth : $2, ae2 = e4.labelSkipHeight, ie2 = void 0 === ae2 ? ee.labelSkipHeight : ae2, ne2 = e4.legends, le2 = void 0 === ne2 ? ee.legends : ne2, re2 = e4.legendLabel, oe2 = e4.totalsOffset, de2 = void 0 === oe2 ? ee.totalsOffset : oe2, ue2 = reactExports.useState(null != Q2 ? Q2 : []), ce2 = ue2[0], se2 = ue2[1], he2 = reactExports.useCallback(function(e6) {
    se2(function(t3) {
      return t3.indexOf(e6) > -1 ? t3.filter(function(t4) {
        return t4 !== e6;
      }) : [].concat(t3, [e6]);
    });
  }, []), fe2 = Wn(a2), ve2 = Wn(u2), ge2 = Wn(s), me2 = Ot(h), pe2 = zt(), Ce2 = pr(b2, g2), Ve2 = Xe(p2, pe2), Me2 = Xe(S2, pe2), We2 = ("grouped" === C2 ? be : ye)({ layout: M2, reverse: T2, data: B2, getIndex: fe2, keys: l2, minValue: O2, maxValue: R2, width: P2, height: Y2, getColor: Ce2, padding: A2, innerPadding: z2, valueScale: q2, indexScale: _2, hiddenIds: ce2, formatValue: me2, getTooltipLabel: ge2, margin: H2 }), Te2 = We2.bars, Be2 = We2.xScale, Ie2 = We2.yScale, Oe2 = reactExports.useMemo(function() {
    return Te2.filter(function(e6) {
      return null !== e6.data.value;
    }).map(function(e6, t3) {
      return j({}, e6, { index: t3 });
    });
  }, [Te2]), Ee2 = reactExports.useCallback(function(e6) {
    var t3 = e6.width, a3 = e6.height;
    return !!Z2 && (!(te2 > 0 && t3 < te2) && !(ie2 > 0 && a3 < ie2));
  }, [Z2, te2, ie2]), Re2 = reactExports.useMemo(function() {
    return l2.map(function(e6) {
      var t3 = Te2.find(function(t4) {
        return t4.data.id === e6;
      });
      return j({}, t3, { data: j({ id: e6 }, null == t3 ? void 0 : t3.data, { hidden: ce2.includes(e6) }) });
    });
  }, [ce2, l2, Te2]), He2 = reactExports.useMemo(function() {
    return le2.map(function(e6) {
      return [e6, xe({ bars: "keys" === e6.dataFrom ? Re2 : Te2, direction: e6.direction, from: e6.dataFrom, groupMode: C2, layout: M2, legendLabel: re2, reverse: T2 })];
    });
  }, [le2, Re2, Te2, C2, M2, re2, T2]), Pe2 = reactExports.useMemo(function() {
    return function(e6, t3, a3, i3, n2, l3, r2) {
      void 0 === i3 && (i3 = ee.layout), void 0 === n2 && (n2 = ee.groupMode);
      var o2 = [];
      if (0 === e6.length)
        return o2;
      var d2 = /* @__PURE__ */ new Map(), u3 = e6[0].width, c7 = e6[0].height;
      if ("stacked" === n2) {
        var s2 = /* @__PURE__ */ new Map();
        e6.forEach(function(e7) {
          var t4 = e7.data, a4 = t4.indexValue, i4 = t4.value;
          Se(d2, a4, Number(i4)), ke(s2, a4, Number(i4));
        }), s2.forEach(function(e7, n3) {
          var s3, h3, f4, b3 = d2.get(n3) || 0;
          "vertical" === i3 ? (s3 = t3(n3), h3 = a3(e7), f4 = a3(e7 / 2)) : (s3 = t3(e7), h3 = a3(n3), f4 = t3(e7 / 2)), s3 += "vertical" === i3 ? u3 / 2 : l3, h3 += "vertical" === i3 ? -l3 : c7 / 2, o2.push({ key: "total_" + n3, x: s3, y: h3, value: b3, formattedValue: r2(b3), animationOffset: f4 });
        });
      } else if ("grouped" === n2) {
        var h2 = /* @__PURE__ */ new Map(), f3 = /* @__PURE__ */ new Map();
        e6.forEach(function(e7) {
          var t4 = e7.data, a4 = t4.indexValue, i4 = t4.value;
          Se(d2, a4, Number(i4)), we(h2, a4, Number(i4)), Le(f3, a4);
        }), h2.forEach(function(e7, n3) {
          var s3, h3, b3, v3 = d2.get(n3) || 0, g3 = f3.get(n3);
          "vertical" === i3 ? (s3 = t3(n3), h3 = a3(e7), b3 = a3(e7 / 2)) : (s3 = t3(e7), h3 = a3(n3), b3 = t3(e7 / 2)), s3 += "vertical" === i3 ? g3 * u3 / 2 : l3, h3 += "vertical" === i3 ? -l3 : g3 * c7 / 2, o2.push({ key: "total_" + n3, x: s3, y: h3, value: v3, formattedValue: r2(v3), animationOffset: b3 });
        });
      }
      return o2;
    }(Te2, Be2, Ie2, M2, C2, de2, me2);
  }, [Te2, Be2, Ie2, M2, C2, de2, me2]);
  return { bars: Te2, barsWithValue: Oe2, xScale: Be2, yScale: Ie2, getIndex: fe2, getLabel: ve2, getTooltipLabel: ge2, formatValue: me2, getColor: Ce2, getBorderColor: Ve2, getLabelColor: Me2, shouldRenderBarLabel: Ee2, hiddenIds: ce2, toggleSerie: he2, legendsWithData: He2, barTotals: Pe2 };
}, Ve = function(e4) {
  var t2 = e4.data, a2 = e4.springConfig, i2 = e4.animate, l2 = e4.layout, r2 = void 0 === l2 ? te.layout : l2, o2 = zt();
  return useTransition(t2, { keys: function(e6) {
    return e6.key;
  }, from: function(e6) {
    return { x: "vertical" === r2 ? e6.x : e6.animationOffset, y: "vertical" === r2 ? e6.animationOffset : e6.y, labelOpacity: 0 };
  }, enter: function(e6) {
    return { x: e6.x, y: e6.y, labelOpacity: 1 };
  }, update: function(e6) {
    return { x: e6.x, y: e6.y, labelOpacity: 1 };
  }, leave: function(e6) {
    return { x: "vertical" === r2 ? e6.x : e6.animationOffset, y: "vertical" === r2 ? e6.animationOffset : e6.y, labelOpacity: 0 };
  }, config: a2, immediate: !i2, initial: i2 ? void 0 : null })(function(e6, t3) {
    return jsxRuntimeExports.jsx(animated$1.text, { x: e6.x, y: e6.y, fillOpacity: e6.labelOpacity, style: j({}, o2.labels.text, { pointerEvents: "none", fill: o2.text.fill }), fontWeight: "bold", fontSize: o2.labels.text.fontSize, fontFamily: o2.labels.text.fontFamily, textAnchor: "vertical" === r2 ? "middle" : "start", alignmentBaseline: "vertical" === r2 ? "alphabetic" : "middle", children: t3.formattedValue }, t3.key);
  });
}, Me = ["isInteractive", "animate", "motionConfig", "theme", "renderWrapper"], We = function(a2) {
  var i2 = a2.data, n2 = a2.indexBy, l2 = a2.keys, r2 = a2.margin, o2 = a2.width, d = a2.height, b2 = a2.groupMode, v2 = a2.layout, g2 = a2.reverse, m2 = a2.minValue, p2 = a2.maxValue, k2 = a2.valueScale, w2 = a2.indexScale, C2 = a2.padding, V2 = a2.innerPadding, M2 = a2.axisTop, W2 = a2.axisRight, T2 = a2.axisBottom, B2 = void 0 === T2 ? te.axisBottom : T2, I2 = a2.axisLeft, E2 = void 0 === I2 ? te.axisLeft : I2, R2 = a2.enableGridX, H2 = void 0 === R2 ? te.enableGridX : R2, P2 = a2.enableGridY, F2 = void 0 === P2 ? te.enableGridY : P2, X2 = a2.gridXValues, Y2 = a2.gridYValues, D2 = a2.layers, A2 = void 0 === D2 ? te.layers : D2, G2 = a2.barComponent, z2 = void 0 === G2 ? te.barComponent : G2, N2 = a2.enableLabel, q2 = void 0 === N2 ? te.enableLabel : N2, K2 = a2.label, Q2 = a2.labelSkipWidth, U2 = void 0 === Q2 ? te.labelSkipWidth : Q2, Z2 = a2.labelSkipHeight, $2 = void 0 === Z2 ? te.labelSkipHeight : Z2, ee2 = a2.labelTextColor, ae2 = a2.markers, ie2 = void 0 === ae2 ? te.markers : ae2, ne2 = a2.colorBy, le2 = a2.colors, re2 = a2.defs, oe2 = void 0 === re2 ? te.defs : re2, de2 = a2.fill, ue2 = void 0 === de2 ? te.fill : de2, ce2 = a2.borderRadius, se2 = void 0 === ce2 ? te.borderRadius : ce2, he2 = a2.borderWidth, fe2 = void 0 === he2 ? te.borderWidth : he2, be2 = a2.borderColor, ve2 = a2.annotations, ge2 = void 0 === ve2 ? te.annotations : ve2, me2 = a2.legendLabel, pe2 = a2.tooltipLabel, ye2 = a2.valueFormat, xe2 = a2.isInteractive, Se2 = void 0 === xe2 ? te.isInteractive : xe2, ke2 = a2.tooltip, we2 = void 0 === ke2 ? te.tooltip : ke2, Le2 = a2.onClick, Me2 = a2.onMouseEnter, We2 = a2.onMouseLeave, Te2 = a2.legends, Be2 = a2.role, Ie2 = void 0 === Be2 ? te.role : Be2, Oe2 = a2.ariaLabel, Ee2 = a2.ariaLabelledBy, Re2 = a2.ariaDescribedBy, He2 = a2.isFocusable, Pe2 = void 0 === He2 ? te.isFocusable : He2, Fe = a2.barAriaLabel, Xe2 = a2.barAriaLabelledBy, Ye = a2.barAriaDescribedBy, De2 = a2.initialHiddenIds, Ae = a2.enableTotals, Ge2 = void 0 === Ae ? te.enableTotals : Ae, ze = a2.totalsOffset, Ne = void 0 === ze ? te.totalsOffset : ze, je2 = Ur(), qe2 = je2.animate, Ke2 = je2.config, _e2 = wt(o2, d, r2), Je2 = _e2.outerWidth, Qe2 = _e2.outerHeight, Ue2 = _e2.margin, Ze2 = _e2.innerWidth, $e2 = _e2.innerHeight, et = Ce({ indexBy: n2, label: K2, tooltipLabel: pe2, valueFormat: ye2, colors: le2, colorBy: ne2, borderColor: be2, labelTextColor: ee2, groupMode: b2, layout: v2, reverse: g2, data: i2, keys: l2, minValue: m2, maxValue: p2, margin: Ue2, width: Ze2, height: $e2, padding: C2, innerPadding: V2, valueScale: k2, indexScale: w2, enableLabel: q2, labelSkipWidth: U2, labelSkipHeight: $2, legends: Te2, legendLabel: me2, initialHiddenIds: De2, totalsOffset: Ne }), tt2 = et.bars, at = et.barsWithValue, it = et.xScale, nt = et.yScale, lt = et.getLabel, rt2 = et.getTooltipLabel, ot = et.getBorderColor, dt = et.getLabelColor, ut = et.shouldRenderBarLabel, ct = et.toggleSerie, st = et.legendsWithData, ht2 = et.barTotals, ft = useTransition(at, { keys: function(e4) {
    return e4.key;
  }, from: function(e4) {
    return j({ borderColor: ot(e4), color: e4.color, height: 0, labelColor: dt(e4), labelOpacity: 0, labelX: e4.width / 2, labelY: e4.height / 2, transform: "translate(" + e4.x + ", " + (e4.y + e4.height) + ")", width: e4.width }, "vertical" === v2 ? {} : { height: e4.height, transform: "translate(" + e4.x + ", " + e4.y + ")", width: 0 });
  }, enter: function(e4) {
    return { borderColor: ot(e4), color: e4.color, height: e4.height, labelColor: dt(e4), labelOpacity: 1, labelX: e4.width / 2, labelY: e4.height / 2, transform: "translate(" + e4.x + ", " + e4.y + ")", width: e4.width };
  }, update: function(e4) {
    return { borderColor: ot(e4), color: e4.color, height: e4.height, labelColor: dt(e4), labelOpacity: 1, labelX: e4.width / 2, labelY: e4.height / 2, transform: "translate(" + e4.x + ", " + e4.y + ")", width: e4.width };
  }, leave: function(e4) {
    return j({ borderColor: ot(e4), color: e4.color, height: 0, labelColor: dt(e4), labelOpacity: 0, labelX: e4.width / 2, labelY: 0, transform: "translate(" + e4.x + ", " + (e4.y + e4.height) + ")", width: e4.width }, "vertical" === v2 ? {} : { labelX: 0, labelY: e4.height / 2, height: e4.height, transform: "translate(" + e4.x + ", " + e4.y + ")", width: 0 });
  }, config: Ke2, immediate: !qe2, initial: qe2 ? void 0 : null }), bt = reactExports.useMemo(function() {
    return { borderRadius: se2, borderWidth: fe2, enableLabel: q2, isInteractive: Se2, labelSkipWidth: U2, labelSkipHeight: $2, onClick: Le2, onMouseEnter: Me2, onMouseLeave: We2, getTooltipLabel: rt2, tooltip: we2, isFocusable: Pe2, ariaLabel: Fe, ariaLabelledBy: Xe2, ariaDescribedBy: Ye };
  }, [se2, fe2, q2, rt2, Se2, $2, U2, Le2, Me2, We2, we2, Pe2, Fe, Xe2, Ye]), vt = In(oe2, tt2, ue2, { dataKey: "data", targetKey: "data.fill" }), gt = { annotations: null, axes: null, bars: null, grid: null, legends: null, markers: null, totals: null };
  A2.includes("annotations") && (gt.annotations = jsxRuntimeExports.jsx(_, { bars: tt2, annotations: ge2 }, "annotations")), A2.includes("axes") && (gt.axes = jsxRuntimeExports.jsx(B$1, { xScale: it, yScale: nt, width: Ze2, height: $e2, top: M2, right: W2, bottom: B2, left: E2 }, "axes")), A2.includes("bars") && (gt.bars = jsxRuntimeExports.jsx(reactExports.Fragment, { children: ft(function(e4, t2) {
    return reactExports.createElement(z2, j({}, bt, { bar: t2, style: e4, shouldRenderLabel: ut(t2), label: lt(t2.data) }));
  }) }, "bars")), A2.includes("grid") && (gt.grid = jsxRuntimeExports.jsx(C$1, { width: Ze2, height: $e2, xScale: H2 ? it : null, yScale: F2 ? nt : null, xValues: X2, yValues: Y2 }, "grid")), A2.includes("legends") && (gt.legends = jsxRuntimeExports.jsx(J, { width: Ze2, height: $e2, legends: st, toggleSerie: ct }, "legends")), A2.includes("markers") && (gt.markers = jsxRuntimeExports.jsx(Rn, { markers: ie2, width: Ze2, height: $e2, xScale: it, yScale: nt }, "markers")), A2.includes("totals") && Ge2 && (gt.totals = jsxRuntimeExports.jsx(Ve, { data: ht2, springConfig: Ke2, animate: qe2, layout: v2 }, "totals"));
  var mt = reactExports.useMemo(function() {
    return j({}, bt, { margin: Ue2, width: o2, height: d, innerWidth: Ze2, innerHeight: $e2, bars: tt2, legendData: st, enableLabel: q2, xScale: it, yScale: nt, tooltip: we2, getTooltipLabel: rt2, onClick: Le2, onMouseEnter: Me2, onMouseLeave: We2 });
  }, [bt, Ue2, o2, d, Ze2, $e2, tt2, st, q2, it, nt, we2, rt2, Le2, Me2, We2]);
  return jsxRuntimeExports.jsx(gn$1, { width: Je2, height: Qe2, margin: Ue2, defs: vt, role: Ie2, ariaLabel: Oe2, ariaLabelledBy: Ee2, ariaDescribedBy: Re2, isFocusable: Pe2, children: A2.map(function(e4, t2) {
    var a3;
    return "function" == typeof e4 ? jsxRuntimeExports.jsx(reactExports.Fragment, { children: reactExports.createElement(e4, mt) }, t2) : null != (a3 = null == gt ? void 0 : gt[e4]) ? a3 : null;
  }) });
}, Te = function(e4) {
  var t2 = e4.isInteractive, a2 = void 0 === t2 ? te.isInteractive : t2, i2 = e4.animate, n2 = void 0 === i2 ? te.animate : i2, l2 = e4.motionConfig, r2 = void 0 === l2 ? te.motionConfig : l2, o2 = e4.theme, u2 = e4.renderWrapper, c6 = q(e4, Me);
  return jsxRuntimeExports.jsx(St, { animate: n2, isInteractive: a2, motionConfig: r2, renderWrapper: u2, theme: o2, children: jsxRuntimeExports.jsx(We, j({ isInteractive: a2 }, c6)) });
}, Be = ["isInteractive", "renderWrapper", "theme"], Ie = function(e4, t2, a2, i2) {
  return e4.find(function(e6) {
    return jn(e6.x + t2.left, e6.y + t2.top, e6.width, e6.height, a2, i2);
  });
};
var Oe = function(e4) {
  var t2 = e4.data, l2 = e4.indexBy, r2 = e4.keys, d = e4.margin, u2 = e4.width, s = e4.height, h = e4.groupMode, f2 = e4.layout, v2 = e4.reverse, g2 = e4.minValue, m2 = e4.maxValue, p2 = e4.valueScale, y = e4.indexScale, w2 = e4.padding, L2 = e4.innerPadding, C2 = e4.axisTop, T2 = e4.axisRight, E2 = e4.axisBottom, R2 = void 0 === E2 ? ae.axisBottom : E2, H$1 = e4.axisLeft, F2 = void 0 === H$1 ? ae.axisLeft : H$1, X2 = e4.enableGridX, D2 = void 0 === X2 ? ae.enableGridX : X2, A2 = e4.enableGridY, G2 = void 0 === A2 ? ae.enableGridY : A2, z2 = e4.gridXValues, N2 = e4.gridYValues, q2 = e4.layers, K2 = void 0 === q2 ? ae.layers : q2, _2 = e4.renderBar, J2 = void 0 === _2 ? function(e6, t3) {
    var a2 = t3.bar, i2 = a2.color, n2 = a2.height, l3 = a2.width, r3 = a2.x, o2 = a2.y, d2 = t3.borderColor, u3 = t3.borderRadius, c6 = t3.borderWidth, s2 = t3.label, h2 = t3.labelColor, f3 = t3.shouldRenderLabel;
    if (e6.fillStyle = i2, c6 > 0 && (e6.strokeStyle = d2, e6.lineWidth = c6), e6.beginPath(), u3 > 0) {
      var b2 = Math.min(u3, n2);
      e6.moveTo(r3 + b2, o2), e6.lineTo(r3 + l3 - b2, o2), e6.quadraticCurveTo(r3 + l3, o2, r3 + l3, o2 + b2), e6.lineTo(r3 + l3, o2 + n2 - b2), e6.quadraticCurveTo(r3 + l3, o2 + n2, r3 + l3 - b2, o2 + n2), e6.lineTo(r3 + b2, o2 + n2), e6.quadraticCurveTo(r3, o2 + n2, r3, o2 + n2 - b2), e6.lineTo(r3, o2 + b2), e6.quadraticCurveTo(r3, o2, r3 + b2, o2), e6.closePath();
    } else
      e6.rect(r3, o2, l3, n2);
    e6.fill(), c6 > 0 && e6.stroke(), f3 && (e6.textBaseline = "middle", e6.textAlign = "center", e6.fillStyle = h2, e6.fillText(s2, r3 + l3 / 2, o2 + n2 / 2));
  } : _2, Q2 = e4.enableLabel, U2 = void 0 === Q2 ? ae.enableLabel : Q2, Z2 = e4.label, $2 = e4.labelSkipWidth, ee2 = void 0 === $2 ? ae.labelSkipWidth : $2, te2 = e4.labelSkipHeight, ie2 = void 0 === te2 ? ae.labelSkipHeight : te2, ne2 = e4.labelTextColor, le2 = e4.colorBy, re2 = e4.colors, oe2 = e4.borderRadius, de2 = void 0 === oe2 ? ae.borderRadius : oe2, ue2 = e4.borderWidth, ce2 = void 0 === ue2 ? ae.borderWidth : ue2, se2 = e4.borderColor, he2 = e4.annotations, fe2 = void 0 === he2 ? ae.annotations : he2, be2 = e4.legendLabel, ve2 = e4.tooltipLabel, ge2 = e4.valueFormat, me2 = e4.isInteractive, pe2 = void 0 === me2 ? ae.isInteractive : me2, ye2 = e4.tooltip, xe2 = void 0 === ye2 ? ae.tooltip : ye2, Se2 = e4.onClick, ke2 = e4.onMouseEnter, we2 = e4.onMouseLeave, Le2 = e4.legends, Ve2 = e4.pixelRatio, Me2 = void 0 === Ve2 ? ae.pixelRatio : Ve2, We2 = e4.canvasRef, Te2 = e4.enableTotals, Be2 = void 0 === Te2 ? ae.enableTotals : Te2, Oe2 = e4.totalsOffset, Ee2 = void 0 === Oe2 ? ae.totalsOffset : Oe2, Re2 = reactExports.useRef(null), He2 = zt(), Pe2 = wt(u2, s, d), Fe = Pe2.margin, Xe2 = Pe2.innerWidth, Ye = Pe2.innerHeight, De2 = Pe2.outerWidth, Ae = Pe2.outerHeight, Ge2 = Ce({ indexBy: l2, label: Z2, tooltipLabel: ve2, valueFormat: ge2, colors: re2, colorBy: le2, borderColor: se2, labelTextColor: ne2, groupMode: h, layout: f2, reverse: v2, data: t2, keys: r2, minValue: g2, maxValue: m2, margin: Fe, width: Xe2, height: Ye, padding: w2, innerPadding: L2, valueScale: p2, indexScale: y, enableLabel: U2, labelSkipWidth: ee2, labelSkipHeight: ie2, legends: Le2, legendLabel: be2, totalsOffset: Ee2 }), ze = Ge2.bars, Ne = Ge2.barsWithValue, je2 = Ge2.xScale, qe2 = Ge2.yScale, Ke2 = Ge2.getLabel, _e2 = Ge2.getTooltipLabel, Je2 = Ge2.getBorderColor, Qe2 = Ge2.getLabelColor, Ue2 = Ge2.shouldRenderBarLabel, Ze2 = Ge2.legendsWithData, $e2 = Ge2.barTotals, et = k$4(), tt2 = et.showTooltipFromEvent, at = et.hideTooltip, it = j$1({ annotations: S$1({ data: ze, annotations: fe2, getPosition: function(e6) {
    return { x: e6.x, y: e6.y };
  }, getDimensions: function(e6) {
    var t3 = e6.width, a2 = e6.height;
    return { width: t3, height: a2, size: Math.max(t3, a2) };
  } }) }), nt = reactExports.useMemo(function() {
    return { borderRadius: de2, borderWidth: ce2, isInteractive: pe2, isFocusable: false, labelSkipWidth: ee2, labelSkipHeight: ie2, margin: Fe, width: u2, height: s, innerWidth: Xe2, innerHeight: Ye, bars: ze, legendData: Ze2, enableLabel: U2, xScale: je2, yScale: qe2, tooltip: xe2, getTooltipLabel: _e2, onClick: Se2, onMouseEnter: ke2, onMouseLeave: we2 };
  }, [de2, ce2, pe2, ee2, ie2, Fe, u2, s, Xe2, Ye, ze, Ze2, U2, je2, qe2, xe2, _e2, Se2, ke2, we2]), lt = Ot(ge2);
  reactExports.useEffect(function() {
    var e6, t3 = null == (e6 = Re2.current) ? void 0 : e6.getContext("2d");
    Re2.current && t3 && (Re2.current.width = De2 * Me2, Re2.current.height = Ae * Me2, t3.scale(Me2, Me2), t3.fillStyle = He2.background, t3.fillRect(0, 0, De2, Ae), t3.translate(Fe.left, Fe.top), K2.forEach(function(e7) {
      "grid" === e7 ? "number" == typeof He2.grid.line.strokeWidth && He2.grid.line.strokeWidth > 0 && (t3.lineWidth = He2.grid.line.strokeWidth, t3.strokeStyle = He2.grid.line.stroke, D2 && z$1(t3, { width: Xe2, height: Ye, scale: je2, axis: "x", values: z2 }), G2 && z$1(t3, { width: Xe2, height: Ye, scale: qe2, axis: "y", values: N2 })) : "axes" === e7 ? j$2(t3, { xScale: je2, yScale: qe2, width: Xe2, height: Ye, top: C2, right: T2, bottom: R2, left: F2, theme: He2 }) : "bars" === e7 ? Ne.forEach(function(e8) {
        J2(t3, { bar: e8, borderColor: Je2(e8), borderRadius: de2, borderWidth: ce2, label: Ke2(e8.data), labelColor: Qe2(e8), shouldRenderLabel: Ue2(e8) });
      }) : "legends" === e7 ? Ze2.forEach(function(e8) {
        var a2 = e8[0], i2 = e8[1];
        H(t3, j({}, a2, { data: i2, containerWidth: Xe2, containerHeight: Ye, theme: He2 }));
      }) : "annotations" === e7 ? J$1(t3, { annotations: it, theme: He2 }) : "totals" === e7 && Be2 ? function(e8, t4, a2, i2) {
        void 0 === i2 && (i2 = ae.layout), e8.fillStyle = a2.text.fill, e8.font = "bold " + a2.labels.text.fontSize + "px " + a2.labels.text.fontFamily, e8.textBaseline = "vertical" === i2 ? "alphabetic" : "middle", e8.textAlign = "vertical" === i2 ? "center" : "start", t4.forEach(function(t5) {
          e8.fillText(t5.formattedValue, t5.x, t5.y);
        });
      }(t3, $e2, He2, f2) : "function" == typeof e7 && e7(t3, nt);
    }), t3.save());
  }, [R2, F2, T2, C2, Ne, de2, ce2, it, D2, G2, Je2, Ke2, Qe2, z2, N2, h, s, Ye, Xe2, nt, K2, f2, Ze2, Fe.left, Fe.top, Ae, De2, Me2, J2, je2, qe2, v2, Ue2, He2, u2, $e2, Be2, lt]);
  var rt2 = reactExports.useCallback(function(e6) {
    if (ze && Re2.current) {
      var t3 = Sn(Re2.current, e6), a2 = t3[0], i2 = t3[1], n2 = Ie(ze, Fe, a2, i2);
      void 0 !== n2 ? (tt2(reactExports.createElement(xe2, j({}, n2.data, { color: n2.color, label: n2.label, value: Number(n2.data.value) })), e6), "mouseenter" === e6.type && (null == ke2 || ke2(n2.data, e6))) : at();
    }
  }, [at, Fe, ke2, ze, tt2, xe2]), ot = reactExports.useCallback(function(e6) {
    if (ze && Re2.current) {
      at();
      var t3 = Sn(Re2.current, e6), a2 = t3[0], i2 = t3[1], n2 = Ie(ze, Fe, a2, i2);
      n2 && (null == we2 || we2(n2.data, e6));
    }
  }, [at, Fe, we2, ze]), dt = reactExports.useCallback(function(e6) {
    if (ze && Re2.current) {
      var t3 = Sn(Re2.current, e6), a2 = t3[0], i2 = t3[1], n2 = Ie(ze, Fe, a2, i2);
      void 0 !== n2 && (null == Se2 || Se2(j({}, n2.data, { color: n2.color }), e6));
    }
  }, [Fe, Se2, ze]);
  return jsxRuntimeExports.jsx("canvas", { ref: function(e6) {
    Re2.current = e6, We2 && "current" in We2 && (We2.current = e6);
  }, width: De2 * Me2, height: Ae * Me2, style: { width: De2, height: Ae, cursor: pe2 ? "auto" : "normal" }, onMouseEnter: pe2 ? rt2 : void 0, onMouseMove: pe2 ? rt2 : void 0, onMouseLeave: pe2 ? ot : void 0, onClick: pe2 ? dt : void 0 });
}, Ee = reactExports.forwardRef(function(e4, t2) {
  var a2 = e4.isInteractive, i2 = e4.renderWrapper, n2 = e4.theme, l2 = q(e4, Be);
  return jsxRuntimeExports.jsx(St, { isInteractive: a2, renderWrapper: i2, theme: n2, animate: false, children: jsxRuntimeExports.jsx(Oe, j({}, l2, { canvasRef: t2 })) });
}), Re = function(e4) {
  return jsxRuntimeExports.jsx(It, { children: function(t2) {
    var a2 = t2.width, i2 = t2.height;
    return jsxRuntimeExports.jsx(Te, j({ width: a2, height: i2 }, e4));
  } });
};
reactExports.forwardRef(function(e4, t2) {
  return jsxRuntimeExports.jsx(It, { children: function(a2) {
    var i2 = a2.width, n2 = a2.height;
    return jsxRuntimeExports.jsx(Ee, j({ width: i2, height: n2 }, e4, { ref: t2 }));
  } });
});
const ReenChart = ({ type, data, x_label = "X Label" }) => {
  const isMobile = window.innerWidth < 600;
  const datakeys = ["total"];
  const legend = [
    {
      dataFrom: "keys",
      anchor: "bottom",
      direction: "row",
      justify: false,
      translateX: 0,
      translateY: 80,
      itemsSpacing: 0,
      itemWidth: 100,
      itemHeight: 20,
      itemDirection: "left-to-right",
      itemOpacity: 0.85,
      symbolSize: 16,
      effects: [
        {
          on: "hover",
          style: {
            itemOpacity: 1
          }
        }
      ]
    }
  ];
  const CustomTooltip = ({ value, color: color2 }) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `font-semibold text-sm text-white px-2 py-1 rounded-md`, style: { backgroundColor: color2 }, children: formatNumber(value) });
  };
  const tickValuesFromData = () => {
    let existingData = [];
    const filteredData = data.filter((el) => el.total > 0);
    filteredData.forEach((el) => existingData.push(el.total));
    existingData.sort((a2, b2) => a2 - b2);
    const first = existingData[0];
    const last2 = existingData[existingData.length - 1];
    const middle = last2 / 2;
    if (existingData.length > 2) {
      return [first, middle, last2];
    } else {
      return [first, last2];
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Re,
    {
      data,
      keys: datakeys,
      indexBy: type === "monthly" ? "bulan" : "perhari",
      margin: { top: 0, right: isMobile ? 0 : 24, bottom: 110, left: 42 },
      padding: 0.3,
      groupMode: "grouped",
      layout: "horizontal",
      valueScale: { type: "linear" },
      indexScale: { type: "band", round: true },
      colors: { scheme: "accent" },
      defs: [
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "red",
          size: 4,
          padding: 1,
          stagger: true
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "green",
          rotation: -45,
          lineWidth: 6,
          spacing: 10
        }
      ],
      borderColor: {
        from: "color",
        modifiers: [["darker", 1.6]]
      },
      axisTop: null,
      axisRight: null,
      axisBottom: {
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        tickValues: tickValuesFromData(),
        legend: x_label,
        legendPosition: "middle",
        legendOffset: 42,
        truncateTickAt: 0,
        format: formatNumber
      },
      axisLeft: {
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legendPosition: "middle",
        legendOffset: -60,
        truncateTickAt: 0,
        format: formatNumber
      },
      labelSkipWidth: 100,
      labelSkipHeight: 50,
      valueFormat: formatNumber,
      labelTextColor: {
        from: "color",
        modifiers: [["darker", 1.6]]
      },
      tooltip: CustomTooltip,
      legends: datakeys.length > 1 ? legend : [],
      role: "application",
      ariaLabel: "statistik penjualan"
    }
  );
};
function FilterBox({ open = false, setOpenFilter, month: month2, setMonth, year: year2, setYear }) {
  const [defMonth, setdefMonth] = reactExports.useState(month2);
  const [defYear, setdefYear] = reactExports.useState(year2);
  reactExports.useEffect(() => {
    if (month2 && year2) {
      if (typeof month2 === "number") {
        setdefMonth(month2.toString());
      }
      if (typeof year2 === "number") {
        setdefYear(year2.toString());
      }
    }
  }, [open, month2, year2]);
  const changeMonth = (month22) => {
    setdefMonth(month22);
    localStorage.setItem(
      "month_stat",
      JSON.stringify({
        key: "month",
        value: Number(month22)
      })
    );
  };
  const changeYear = (year22) => {
    setdefYear(year22);
    localStorage.setItem(
      "year_stat",
      JSON.stringify({
        key: "year",
        value: Number(year22)
      })
    );
  };
  const handleFilter = () => {
    setMonth(Number(defMonth) || month2);
    setYear(defYear || year2);
    setOpenFilter(false);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Drawer, { placement: "right", open, onClose: () => setOpenFilter(false), className: "p-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-6 flex items-center justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h5", color: "blue-gray", children: "Filter" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Select, { size: "md", label: "Pilih Bulan", value: defMonth, onChange: changeMonth, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "1", children: "Januari" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "2", children: "Februari" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "3", children: "Maret" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "4", children: "April" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "5", children: "Mei" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "6", children: "Juni" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "7", children: "Juli" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "8", children: "Agustus" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "9", children: "September" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "10", children: "Oktober" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "11", children: "November" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "12", children: "Desember" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Select, { size: "md", label: "Pilih Tahun", value: defYear, onChange: changeYear, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "2020", children: "2020" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "2021", children: "2021" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "2022", children: "2022" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "2023", children: "2023" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "2024", children: "2024" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Button, { color: "teal", className: "flex items-center justify-center w-full mt-5", onClick: handleFilter, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(AdjustmentsVerticalIcon, { className: "w-5 h-5 mr-2" }),
      "Terapkan Filter"
    ] })
  ] });
}
function Statistic() {
  const { isMenuOpen, setMenuOpen, cookies } = reactExports.useContext(AppContext);
  const navbarRef = reactExports.useRef();
  const currentdate = /* @__PURE__ */ new Date();
  const currentMonth = currentdate.getMonth() + 1;
  const currentYear = currentdate.getFullYear();
  const [openFilter, setOpenFilter] = reactExports.useState(false);
  const [loading, setLoading] = reactExports.useState(true);
  const [monthlyStatistics, setMonthlyStatistics] = reactExports.useState([]);
  const [dailyStatistics, setDailyStatistics] = reactExports.useState([]);
  const [year2, setYear] = reactExports.useState();
  const [month2, setMonth] = reactExports.useState();
  reactExports.useEffect(() => {
    initDate();
    return () => {
      localStorage.removeItem("month_stat");
      localStorage.removeItem("year_stat");
    };
  }, []);
  reactExports.useEffect(() => {
    if (month2 && year2) {
      getStatistics();
    }
  }, [year2, month2]);
  const initDate = () => {
    if (localStorage.getItem("month_stat")) {
      setMonth(JSON.parse(localStorage.getItem("month_stat")).value);
    } else {
      setMonth(currentMonth);
    }
    if (localStorage.getItem("year_stat")) {
      setYear(JSON.parse(localStorage.getItem("year_stat")).value);
    } else {
      setYear(currentYear);
    }
  };
  const getStatistics = async () => {
    try {
      setLoading(true);
      await Promise.all([getMonthlyStatistic(), getDailyStatistic()]);
      setTimeout(() => setLoading(false), 1500);
    } catch (error) {
      console.error("Error fetching statistics", error);
      setLoading(false);
    }
  };
  const handleData = (data, type) => {
    if (type === "monthly") {
      const bulanMapping = {
        1: "Jan",
        2: "Feb",
        3: "Mar",
        4: "Apr",
        5: "Mei",
        6: "Jun",
        7: "Jul",
        8: "Agu",
        9: "Sep",
        10: "Okt",
        11: "Nov",
        12: "Des"
      };
      const existingData = data.reduce((acc, item) => {
        acc[item.perbulan] = item;
        return acc;
      }, {});
      const formattedData = Object.keys(bulanMapping).map((bulan) => {
        if (existingData[bulan]) {
          return {
            ...existingData[bulan],
            bulan: bulanMapping[bulan],
            label_total: formatRupiah(existingData[bulan].total)
          };
        } else {
          return {
            bulan: bulanMapping[bulan],
            perbulan: bulan,
            total: 0,
            label_total: "0"
          };
        }
      });
      const noTransaction = formattedData.every((item) => item.total === 0);
      if (noTransaction) {
        setMonthlyStatistics([]);
      } else {
        setMonthlyStatistics(formattedData);
      }
    } else {
      const daysInMonth = new Date(year2, 6, 0).getDate();
      const dataMap = data.reduce((acc, curr) => {
        acc[`${curr.perhari}-${curr.perbulan}-${curr.pertahun}`] = curr.total;
        return acc;
      }, {});
      const resultdata = [];
      for (let day2 = 1; day2 <= daysInMonth; day2++) {
        const key = `${day2}-${month2}-${year2}`;
        resultdata.push({
          perhari: day2.toString(),
          perbulan: month2.toString(),
          pertahun: year2.toString(),
          total: dataMap[key] || 0
        });
      }
      const noTransaction = resultdata.every((item) => item.total === 0);
      if (noTransaction) {
        setDailyStatistics([]);
      } else {
        setDailyStatistics(resultdata);
      }
    }
  };
  const handleResponse = ({ type, data, error }) => {
    if (error) {
      alert("Terjadi Kesalahan");
    } else {
      handleData(data, type);
    }
  };
  const getMonthlyStatistic = async () => {
    const { data, error } = await getStatistic({
      lok_id: cookies.lok_id,
      thn: year2,
      monthly: "yes"
    });
    handleResponse({ type: "monthly", data, error });
  };
  const getDailyStatistic = async () => {
    const { data, error } = await getStatistic({
      lok_id: cookies.lok_id,
      bln: month2,
      thn: year2,
      dayly: "yes"
    });
    handleResponse({ type: "daily", data, error });
  };
  const ShowContent = () => {
    if (loading) {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingOverlay, { white: true });
    } else {
      if (dailyStatistics.length > 0 || monthlyStatistics.length > 0) {
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `container-area ${(openFilter || isMenuOpen) && "filter blur-2xl"} h-[100%] w-full px-4 pt-[80px] pb-8`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "content-area lg:flex lg:flex-row lg:gap-3 overflow-y-auto h-full", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: `chartbox border border-solid border-gray-300 rounded-lg mb-4 pr-4 lg:px-0 ${dailyStatistics.length > 0 ? "h-[900px] lg:h-[800px]" : "h-[200px]"} w-full text-center`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "label font-semibold text-gray-700 mt-3", children: monthConverter(month2) }),
                    dailyStatistics.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(ReenChart, { type: "daily", data: dailyStatistics, x_label: "Penjualan (dalam Rupiah)" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "blank", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fa-solid fa-ghost text-[72px] text-gray-500 mt-8 my-4" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[16px] text-gray-500", children: "Tidak Ada Transaksi Penjualan" })
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "chartbox border border-solid border-gray-300 rounded-lg pr-4 lg:px-0 h-[500px] w-full text-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "label font-semibold text-gray-700 mt-3", children: year2 }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(ReenChart, { type: "monthly", data: monthlyStatistics, x_label: "Penjualan (dalam Rupiah)" })
              ] })
            ] })
          }
        );
      } else {
        return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `content-area px-4 pt-[100px] h-[90%] text-center`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "blank h-full flex flex-col justify-center align-middle gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fa-solid fa-ghost text-[100px] text-gray-500" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[16px] text-gray-500", children: "Tidak Ada Transaksi Penjualan" })
        ] }) });
      }
    }
  };
  const ShowNavbarTitle = () => {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-black font-semibold", children: [
      "Statistik - ",
      monthConverter(month2),
      " ",
      year2
    ] });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-screen-adapt bg-gray-50 overflow-hidden relative", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 top-0 inset-x-0 fixed z-10 mx-auto desktop:max-w-[60%]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Navbar, { ref: navbarRef, className: `max-w-full py-2 px-2 relative`, blurred: false, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(react.IconButton, { variant: "text", size: "md", onClick: () => setMenuOpen(true), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bars3Icon, { className: "h-6 w-6 stroke-2" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ShowNavbarTitle, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(react.IconButton, { size: "md", variant: "text", onClick: () => setOpenFilter(true), children: /* @__PURE__ */ jsxRuntimeExports.jsx(AdjustmentsVerticalIcon, { className: "h-6 w-6 stroke-2" }) })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ShowContent, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      FilterBox,
      {
        open: openFilter,
        month: month2,
        setMonth,
        year: year2,
        setYear,
        setOpenFilter
      }
    )
  ] });
}
export {
  Statistic as default
};
