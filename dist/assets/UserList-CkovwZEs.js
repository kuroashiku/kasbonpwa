import { R as React, B as ReactDOM, r as reactExports, A as AppContext, D as funCodes, u as useNavigate, t as topic, j as jsxRuntimeExports, L as LoadingOverlay, a as react, E as roleName, T as TIME_SEARCH_DEBOUNCE } from "./index-CGEICd-f.js";
import { T as TableListModel, g as getTable } from "./Table-HzM5Y3VM.js";
import { r as readRoleNew, d as deleteRole, g as getLokcom, s as saveRole, a as savePassword, b as saveUser, e as addUser } from "./Login-BX-Mfbo_.js";
import { S as SearchNavbar } from "./SearchNavbar-BwHVnItL.js";
import { F as FilterChips } from "./FilterChips-Bif-hhPS.js";
import { I as InputSimple } from "./InputSimple-DmjIpoRq.js";
import { b as formatSentenceCase } from "./formatter-DQiSfF1K.js";
import { l as lodashExports } from "./lodash-C34_XwDM.js";
import { _ as _setPrototypeOf, a as _objectWithoutPropertiesLoose, b as _assertThisInitialized, c as _extends, m as memoizeOne, d as defaultComponents, e as _objectWithoutProperties, f as _objectSpread2, g as _slicedToArray, h as cleanValue, i as _toConsumableArray, v as valueTernary, j as getOptionValue$1, k as getOptionLabel$1, u as useStateManager, l as Select, S as StateManagedSelect$1 } from "./react-select.esm-BtDncE64.js";
import { B as Bars3Icon } from "./Bars3Icon-BPkb_aHs.js";
import { A as AdjustmentsVerticalIcon } from "./AdjustmentsVerticalIcon-DBH-WKzU.js";
import { P as PencilSquareIcon } from "./PencilSquareIcon-BJtlfiFf.js";
import { P as PlusCircleIcon } from "./PlusCircleIcon-CFdoe21X.js";
import "./filter-DY4hzksJ.js";
import "./hoist-non-react-statics.cjs-BxdQBvuA.js";
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  _setPrototypeOf(subClass, superClass);
}
const config = {
  disabled: false
};
const TransitionGroupContext = React.createContext(null);
var forceReflow = function forceReflow2(node) {
  return node.scrollTop;
};
var UNMOUNTED = "unmounted";
var EXITED = "exited";
var ENTERING = "entering";
var ENTERED = "entered";
var EXITING = "exiting";
var Transition = /* @__PURE__ */ function(_React$Component) {
  _inheritsLoose(Transition2, _React$Component);
  function Transition2(props, context) {
    var _this;
    _this = _React$Component.call(this, props, context) || this;
    var parentGroup = context;
    var appear = parentGroup && !parentGroup.isMounting ? props.enter : props.appear;
    var initialStatus;
    _this.appearStatus = null;
    if (props.in) {
      if (appear) {
        initialStatus = EXITED;
        _this.appearStatus = ENTERING;
      } else {
        initialStatus = ENTERED;
      }
    } else {
      if (props.unmountOnExit || props.mountOnEnter) {
        initialStatus = UNMOUNTED;
      } else {
        initialStatus = EXITED;
      }
    }
    _this.state = {
      status: initialStatus
    };
    _this.nextCallback = null;
    return _this;
  }
  Transition2.getDerivedStateFromProps = function getDerivedStateFromProps(_ref, prevState) {
    var nextIn = _ref.in;
    if (nextIn && prevState.status === UNMOUNTED) {
      return {
        status: EXITED
      };
    }
    return null;
  };
  var _proto = Transition2.prototype;
  _proto.componentDidMount = function componentDidMount() {
    this.updateStatus(true, this.appearStatus);
  };
  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    var nextStatus = null;
    if (prevProps !== this.props) {
      var status = this.state.status;
      if (this.props.in) {
        if (status !== ENTERING && status !== ENTERED) {
          nextStatus = ENTERING;
        }
      } else {
        if (status === ENTERING || status === ENTERED) {
          nextStatus = EXITING;
        }
      }
    }
    this.updateStatus(false, nextStatus);
  };
  _proto.componentWillUnmount = function componentWillUnmount() {
    this.cancelNextCallback();
  };
  _proto.getTimeouts = function getTimeouts() {
    var timeout2 = this.props.timeout;
    var exit, enter, appear;
    exit = enter = appear = timeout2;
    if (timeout2 != null && typeof timeout2 !== "number") {
      exit = timeout2.exit;
      enter = timeout2.enter;
      appear = timeout2.appear !== void 0 ? timeout2.appear : enter;
    }
    return {
      exit,
      enter,
      appear
    };
  };
  _proto.updateStatus = function updateStatus(mounting, nextStatus) {
    if (mounting === void 0) {
      mounting = false;
    }
    if (nextStatus !== null) {
      this.cancelNextCallback();
      if (nextStatus === ENTERING) {
        if (this.props.unmountOnExit || this.props.mountOnEnter) {
          var node = this.props.nodeRef ? this.props.nodeRef.current : ReactDOM.findDOMNode(this);
          if (node)
            forceReflow(node);
        }
        this.performEnter(mounting);
      } else {
        this.performExit();
      }
    } else if (this.props.unmountOnExit && this.state.status === EXITED) {
      this.setState({
        status: UNMOUNTED
      });
    }
  };
  _proto.performEnter = function performEnter(mounting) {
    var _this2 = this;
    var enter = this.props.enter;
    var appearing = this.context ? this.context.isMounting : mounting;
    var _ref2 = this.props.nodeRef ? [appearing] : [ReactDOM.findDOMNode(this), appearing], maybeNode = _ref2[0], maybeAppearing = _ref2[1];
    var timeouts = this.getTimeouts();
    var enterTimeout = appearing ? timeouts.appear : timeouts.enter;
    if (!mounting && !enter || config.disabled) {
      this.safeSetState({
        status: ENTERED
      }, function() {
        _this2.props.onEntered(maybeNode);
      });
      return;
    }
    this.props.onEnter(maybeNode, maybeAppearing);
    this.safeSetState({
      status: ENTERING
    }, function() {
      _this2.props.onEntering(maybeNode, maybeAppearing);
      _this2.onTransitionEnd(enterTimeout, function() {
        _this2.safeSetState({
          status: ENTERED
        }, function() {
          _this2.props.onEntered(maybeNode, maybeAppearing);
        });
      });
    });
  };
  _proto.performExit = function performExit() {
    var _this3 = this;
    var exit = this.props.exit;
    var timeouts = this.getTimeouts();
    var maybeNode = this.props.nodeRef ? void 0 : ReactDOM.findDOMNode(this);
    if (!exit || config.disabled) {
      this.safeSetState({
        status: EXITED
      }, function() {
        _this3.props.onExited(maybeNode);
      });
      return;
    }
    this.props.onExit(maybeNode);
    this.safeSetState({
      status: EXITING
    }, function() {
      _this3.props.onExiting(maybeNode);
      _this3.onTransitionEnd(timeouts.exit, function() {
        _this3.safeSetState({
          status: EXITED
        }, function() {
          _this3.props.onExited(maybeNode);
        });
      });
    });
  };
  _proto.cancelNextCallback = function cancelNextCallback() {
    if (this.nextCallback !== null) {
      this.nextCallback.cancel();
      this.nextCallback = null;
    }
  };
  _proto.safeSetState = function safeSetState(nextState, callback) {
    callback = this.setNextCallback(callback);
    this.setState(nextState, callback);
  };
  _proto.setNextCallback = function setNextCallback(callback) {
    var _this4 = this;
    var active = true;
    this.nextCallback = function(event) {
      if (active) {
        active = false;
        _this4.nextCallback = null;
        callback(event);
      }
    };
    this.nextCallback.cancel = function() {
      active = false;
    };
    return this.nextCallback;
  };
  _proto.onTransitionEnd = function onTransitionEnd(timeout2, handler) {
    this.setNextCallback(handler);
    var node = this.props.nodeRef ? this.props.nodeRef.current : ReactDOM.findDOMNode(this);
    var doesNotHaveTimeoutOrListener = timeout2 == null && !this.props.addEndListener;
    if (!node || doesNotHaveTimeoutOrListener) {
      setTimeout(this.nextCallback, 0);
      return;
    }
    if (this.props.addEndListener) {
      var _ref3 = this.props.nodeRef ? [this.nextCallback] : [node, this.nextCallback], maybeNode = _ref3[0], maybeNextCallback = _ref3[1];
      this.props.addEndListener(maybeNode, maybeNextCallback);
    }
    if (timeout2 != null) {
      setTimeout(this.nextCallback, timeout2);
    }
  };
  _proto.render = function render() {
    var status = this.state.status;
    if (status === UNMOUNTED) {
      return null;
    }
    var _this$props = this.props, children = _this$props.children;
    _this$props.in;
    _this$props.mountOnEnter;
    _this$props.unmountOnExit;
    _this$props.appear;
    _this$props.enter;
    _this$props.exit;
    _this$props.timeout;
    _this$props.addEndListener;
    _this$props.onEnter;
    _this$props.onEntering;
    _this$props.onEntered;
    _this$props.onExit;
    _this$props.onExiting;
    _this$props.onExited;
    _this$props.nodeRef;
    var childProps = _objectWithoutPropertiesLoose(_this$props, ["children", "in", "mountOnEnter", "unmountOnExit", "appear", "enter", "exit", "timeout", "addEndListener", "onEnter", "onEntering", "onEntered", "onExit", "onExiting", "onExited", "nodeRef"]);
    return (
      // allows for nested Transitions
      /* @__PURE__ */ React.createElement(TransitionGroupContext.Provider, {
        value: null
      }, typeof children === "function" ? children(status, childProps) : React.cloneElement(React.Children.only(children), childProps))
    );
  };
  return Transition2;
}(React.Component);
Transition.contextType = TransitionGroupContext;
Transition.propTypes = {};
function noop() {
}
Transition.defaultProps = {
  in: false,
  mountOnEnter: false,
  unmountOnExit: false,
  appear: false,
  enter: true,
  exit: true,
  onEnter: noop,
  onEntering: noop,
  onEntered: noop,
  onExit: noop,
  onExiting: noop,
  onExited: noop
};
Transition.UNMOUNTED = UNMOUNTED;
Transition.EXITED = EXITED;
Transition.ENTERING = ENTERING;
Transition.ENTERED = ENTERED;
Transition.EXITING = EXITING;
const Transition$1 = Transition;
function getChildMapping(children, mapFn) {
  var mapper = function mapper2(child) {
    return mapFn && reactExports.isValidElement(child) ? mapFn(child) : child;
  };
  var result = /* @__PURE__ */ Object.create(null);
  if (children)
    reactExports.Children.map(children, function(c) {
      return c;
    }).forEach(function(child) {
      result[child.key] = mapper(child);
    });
  return result;
}
function mergeChildMappings(prev, next) {
  prev = prev || {};
  next = next || {};
  function getValueForKey(key) {
    return key in next ? next[key] : prev[key];
  }
  var nextKeysPending = /* @__PURE__ */ Object.create(null);
  var pendingKeys = [];
  for (var prevKey in prev) {
    if (prevKey in next) {
      if (pendingKeys.length) {
        nextKeysPending[prevKey] = pendingKeys;
        pendingKeys = [];
      }
    } else {
      pendingKeys.push(prevKey);
    }
  }
  var i;
  var childMapping = {};
  for (var nextKey in next) {
    if (nextKeysPending[nextKey]) {
      for (i = 0; i < nextKeysPending[nextKey].length; i++) {
        var pendingNextKey = nextKeysPending[nextKey][i];
        childMapping[nextKeysPending[nextKey][i]] = getValueForKey(pendingNextKey);
      }
    }
    childMapping[nextKey] = getValueForKey(nextKey);
  }
  for (i = 0; i < pendingKeys.length; i++) {
    childMapping[pendingKeys[i]] = getValueForKey(pendingKeys[i]);
  }
  return childMapping;
}
function getProp(child, prop, props) {
  return props[prop] != null ? props[prop] : child.props[prop];
}
function getInitialChildMapping(props, onExited) {
  return getChildMapping(props.children, function(child) {
    return reactExports.cloneElement(child, {
      onExited: onExited.bind(null, child),
      in: true,
      appear: getProp(child, "appear", props),
      enter: getProp(child, "enter", props),
      exit: getProp(child, "exit", props)
    });
  });
}
function getNextChildMapping(nextProps, prevChildMapping, onExited) {
  var nextChildMapping = getChildMapping(nextProps.children);
  var children = mergeChildMappings(prevChildMapping, nextChildMapping);
  Object.keys(children).forEach(function(key) {
    var child = children[key];
    if (!reactExports.isValidElement(child))
      return;
    var hasPrev = key in prevChildMapping;
    var hasNext = key in nextChildMapping;
    var prevChild = prevChildMapping[key];
    var isLeaving = reactExports.isValidElement(prevChild) && !prevChild.props.in;
    if (hasNext && (!hasPrev || isLeaving)) {
      children[key] = reactExports.cloneElement(child, {
        onExited: onExited.bind(null, child),
        in: true,
        exit: getProp(child, "exit", nextProps),
        enter: getProp(child, "enter", nextProps)
      });
    } else if (!hasNext && hasPrev && !isLeaving) {
      children[key] = reactExports.cloneElement(child, {
        in: false
      });
    } else if (hasNext && hasPrev && reactExports.isValidElement(prevChild)) {
      children[key] = reactExports.cloneElement(child, {
        onExited: onExited.bind(null, child),
        in: prevChild.props.in,
        exit: getProp(child, "exit", nextProps),
        enter: getProp(child, "enter", nextProps)
      });
    }
  });
  return children;
}
var values = Object.values || function(obj) {
  return Object.keys(obj).map(function(k) {
    return obj[k];
  });
};
var defaultProps = {
  component: "div",
  childFactory: function childFactory(child) {
    return child;
  }
};
var TransitionGroup = /* @__PURE__ */ function(_React$Component) {
  _inheritsLoose(TransitionGroup2, _React$Component);
  function TransitionGroup2(props, context) {
    var _this;
    _this = _React$Component.call(this, props, context) || this;
    var handleExited = _this.handleExited.bind(_assertThisInitialized(_this));
    _this.state = {
      contextValue: {
        isMounting: true
      },
      handleExited,
      firstRender: true
    };
    return _this;
  }
  var _proto = TransitionGroup2.prototype;
  _proto.componentDidMount = function componentDidMount() {
    this.mounted = true;
    this.setState({
      contextValue: {
        isMounting: false
      }
    });
  };
  _proto.componentWillUnmount = function componentWillUnmount() {
    this.mounted = false;
  };
  TransitionGroup2.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, _ref) {
    var prevChildMapping = _ref.children, handleExited = _ref.handleExited, firstRender = _ref.firstRender;
    return {
      children: firstRender ? getInitialChildMapping(nextProps, handleExited) : getNextChildMapping(nextProps, prevChildMapping, handleExited),
      firstRender: false
    };
  };
  _proto.handleExited = function handleExited(child, node) {
    var currentChildMapping = getChildMapping(this.props.children);
    if (child.key in currentChildMapping)
      return;
    if (child.props.onExited) {
      child.props.onExited(node);
    }
    if (this.mounted) {
      this.setState(function(state) {
        var children = _extends({}, state.children);
        delete children[child.key];
        return {
          children
        };
      });
    }
  };
  _proto.render = function render() {
    var _this$props = this.props, Component = _this$props.component, childFactory2 = _this$props.childFactory, props = _objectWithoutPropertiesLoose(_this$props, ["component", "childFactory"]);
    var contextValue = this.state.contextValue;
    var children = values(this.state.children).map(childFactory2);
    delete props.appear;
    delete props.enter;
    delete props.exit;
    if (Component === null) {
      return /* @__PURE__ */ React.createElement(TransitionGroupContext.Provider, {
        value: contextValue
      }, children);
    }
    return /* @__PURE__ */ React.createElement(TransitionGroupContext.Provider, {
      value: contextValue
    }, /* @__PURE__ */ React.createElement(Component, props, children));
  };
  return TransitionGroup2;
}(React.Component);
TransitionGroup.propTypes = {};
TransitionGroup.defaultProps = defaultProps;
const TransitionGroup$1 = TransitionGroup;
var _excluded$4 = ["in", "onExited", "appear", "enter", "exit"];
var AnimatedInput = function AnimatedInput2(WrappedComponent) {
  return function(_ref) {
    _ref.in;
    _ref.onExited;
    _ref.appear;
    _ref.enter;
    _ref.exit;
    var props = _objectWithoutProperties(_ref, _excluded$4);
    return /* @__PURE__ */ reactExports.createElement(WrappedComponent, props);
  };
};
var AnimatedInput$1 = AnimatedInput;
var _excluded$3 = ["component", "duration", "in", "onExited"];
var Fade = function Fade2(_ref) {
  var Tag = _ref.component, _ref$duration = _ref.duration, duration = _ref$duration === void 0 ? 1 : _ref$duration, inProp = _ref.in;
  _ref.onExited;
  var props = _objectWithoutProperties(_ref, _excluded$3);
  var nodeRef = reactExports.useRef(null);
  var transition = {
    entering: {
      opacity: 0
    },
    entered: {
      opacity: 1,
      transition: "opacity ".concat(duration, "ms")
    },
    exiting: {
      opacity: 0
    },
    exited: {
      opacity: 0
    }
  };
  return /* @__PURE__ */ reactExports.createElement(Transition$1, {
    mountOnEnter: true,
    unmountOnExit: true,
    in: inProp,
    timeout: duration,
    nodeRef
  }, function(state) {
    var innerProps = {
      style: _objectSpread2({}, transition[state]),
      ref: nodeRef
    };
    return /* @__PURE__ */ reactExports.createElement(Tag, _extends({
      innerProps
    }, props));
  });
};
var collapseDuration = 260;
var Collapse = function Collapse2(_ref2) {
  var children = _ref2.children, _in = _ref2.in, _onExited = _ref2.onExited;
  var ref = reactExports.useRef(null);
  var _useState = reactExports.useState("auto"), _useState2 = _slicedToArray(_useState, 2), width = _useState2[0], setWidth = _useState2[1];
  reactExports.useEffect(function() {
    var el = ref.current;
    if (!el)
      return;
    var rafId = window.requestAnimationFrame(function() {
      return setWidth(el.getBoundingClientRect().width);
    });
    return function() {
      return window.cancelAnimationFrame(rafId);
    };
  }, []);
  var getStyleFromStatus = function getStyleFromStatus2(status) {
    switch (status) {
      default:
        return {
          width
        };
      case "exiting":
        return {
          width: 0,
          transition: "width ".concat(collapseDuration, "ms ease-out")
        };
      case "exited":
        return {
          width: 0
        };
    }
  };
  return /* @__PURE__ */ reactExports.createElement(Transition$1, {
    enter: false,
    mountOnEnter: true,
    unmountOnExit: true,
    in: _in,
    onExited: function onExited() {
      var el = ref.current;
      if (!el)
        return;
      _onExited === null || _onExited === void 0 ? void 0 : _onExited(el);
    },
    timeout: collapseDuration,
    nodeRef: ref
  }, function(status) {
    return /* @__PURE__ */ reactExports.createElement("div", {
      ref,
      style: _objectSpread2({
        overflow: "hidden",
        whiteSpace: "nowrap"
      }, getStyleFromStatus(status))
    }, children);
  });
};
var _excluded$2 = ["in", "onExited"];
var AnimatedMultiValue = function AnimatedMultiValue2(WrappedComponent) {
  return function(_ref) {
    var inProp = _ref.in, onExited = _ref.onExited, props = _objectWithoutProperties(_ref, _excluded$2);
    return /* @__PURE__ */ reactExports.createElement(Collapse, {
      in: inProp,
      onExited
    }, /* @__PURE__ */ reactExports.createElement(WrappedComponent, _extends({
      cropWithEllipsis: inProp
    }, props)));
  };
};
var AnimatedMultiValue$1 = AnimatedMultiValue;
var AnimatedPlaceholder = function AnimatedPlaceholder2(WrappedComponent) {
  return function(props) {
    return /* @__PURE__ */ reactExports.createElement(Fade, _extends({
      component: WrappedComponent,
      duration: props.isMulti ? collapseDuration : 1
    }, props));
  };
};
var AnimatedPlaceholder$1 = AnimatedPlaceholder;
var AnimatedSingleValue = function AnimatedSingleValue2(WrappedComponent) {
  return function(props) {
    return /* @__PURE__ */ reactExports.createElement(Fade, _extends({
      component: WrappedComponent
    }, props));
  };
};
var AnimatedSingleValue$1 = AnimatedSingleValue;
var _excluded$1 = ["component"], _excluded2 = ["children"];
var AnimatedValueContainer = function AnimatedValueContainer2(WrappedComponent) {
  return function(props) {
    return props.isMulti ? /* @__PURE__ */ reactExports.createElement(IsMultiValueContainer, _extends({
      component: WrappedComponent
    }, props)) : /* @__PURE__ */ reactExports.createElement(TransitionGroup$1, _extends({
      component: WrappedComponent
    }, props));
  };
};
var IsMultiValueContainer = function IsMultiValueContainer2(_ref) {
  var component = _ref.component, restProps = _objectWithoutProperties(_ref, _excluded$1);
  var multiProps = useIsMultiValueContainer(restProps);
  return /* @__PURE__ */ reactExports.createElement(TransitionGroup$1, _extends({
    component
  }, multiProps));
};
var useIsMultiValueContainer = function useIsMultiValueContainer2(_ref2) {
  var children = _ref2.children, props = _objectWithoutProperties(_ref2, _excluded2);
  var isMulti = props.isMulti, hasValue = props.hasValue, innerProps = props.innerProps, _props$selectProps = props.selectProps, components = _props$selectProps.components, controlShouldRenderValue = _props$selectProps.controlShouldRenderValue;
  var _useState = reactExports.useState(isMulti && controlShouldRenderValue && hasValue), _useState2 = _slicedToArray(_useState, 2), cssDisplayFlex = _useState2[0], setCssDisplayFlex = _useState2[1];
  var _useState3 = reactExports.useState(false), _useState4 = _slicedToArray(_useState3, 2), removingValue = _useState4[0], setRemovingValue = _useState4[1];
  reactExports.useEffect(function() {
    if (hasValue && !cssDisplayFlex) {
      setCssDisplayFlex(true);
    }
  }, [hasValue, cssDisplayFlex]);
  reactExports.useEffect(function() {
    if (removingValue && !hasValue && cssDisplayFlex) {
      setCssDisplayFlex(false);
    }
    setRemovingValue(false);
  }, [removingValue, hasValue, cssDisplayFlex]);
  var onExited = function onExited2() {
    return setRemovingValue(true);
  };
  var childMapper = function childMapper2(child) {
    if (isMulti && /* @__PURE__ */ reactExports.isValidElement(child)) {
      if (child.type === components.MultiValue) {
        return /* @__PURE__ */ reactExports.cloneElement(child, {
          onExited
        });
      }
      if (child.type === components.Placeholder && cssDisplayFlex) {
        return null;
      }
    }
    return child;
  };
  var newInnerProps = _objectSpread2(_objectSpread2({}, innerProps), {}, {
    style: _objectSpread2(_objectSpread2({}, innerProps === null || innerProps === void 0 ? void 0 : innerProps.style), {}, {
      display: isMulti && hasValue || cssDisplayFlex ? "flex" : "grid"
    })
  });
  var newProps = _objectSpread2(_objectSpread2({}, props), {}, {
    innerProps: newInnerProps,
    children: reactExports.Children.toArray(children).map(childMapper)
  });
  return newProps;
};
var AnimatedValueContainer$1 = AnimatedValueContainer;
var _excluded$5 = ["Input", "MultiValue", "Placeholder", "SingleValue", "ValueContainer"];
var makeAnimated = function makeAnimated2() {
  var externalComponents = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  var components = defaultComponents({
    components: externalComponents
  });
  var Input = components.Input, MultiValue = components.MultiValue, Placeholder = components.Placeholder, SingleValue = components.SingleValue, ValueContainer = components.ValueContainer, rest = _objectWithoutProperties(components, _excluded$5);
  return _objectSpread2({
    Input: AnimatedInput$1(Input),
    MultiValue: AnimatedMultiValue$1(MultiValue),
    Placeholder: AnimatedPlaceholder$1(Placeholder),
    SingleValue: AnimatedSingleValue$1(SingleValue),
    ValueContainer: AnimatedValueContainer$1(ValueContainer)
  }, rest);
};
var AnimatedComponents = makeAnimated();
AnimatedComponents.Input;
AnimatedComponents.MultiValue;
AnimatedComponents.Placeholder;
AnimatedComponents.SingleValue;
AnimatedComponents.ValueContainer;
var index = memoizeOne(makeAnimated);
var _excluded = ["allowCreateWhileLoading", "createOptionPosition", "formatCreateLabel", "isValidNewOption", "getNewOptionData", "onCreateOption", "options", "onChange"];
var compareOption = function compareOption2() {
  var inputValue = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
  var option = arguments.length > 1 ? arguments[1] : void 0;
  var accessors = arguments.length > 2 ? arguments[2] : void 0;
  var candidate = String(inputValue).toLowerCase();
  var optionValue = String(accessors.getOptionValue(option)).toLowerCase();
  var optionLabel = String(accessors.getOptionLabel(option)).toLowerCase();
  return optionValue === candidate || optionLabel === candidate;
};
var builtins = {
  formatCreateLabel: function formatCreateLabel(inputValue) {
    return 'Create "'.concat(inputValue, '"');
  },
  isValidNewOption: function isValidNewOption(inputValue, selectValue, selectOptions, accessors) {
    return !(!inputValue || selectValue.some(function(option) {
      return compareOption(inputValue, option, accessors);
    }) || selectOptions.some(function(option) {
      return compareOption(inputValue, option, accessors);
    }));
  },
  getNewOptionData: function getNewOptionData(inputValue, optionLabel) {
    return {
      label: optionLabel,
      value: inputValue,
      __isNew__: true
    };
  }
};
function useCreatable(_ref) {
  var _ref$allowCreateWhile = _ref.allowCreateWhileLoading, allowCreateWhileLoading = _ref$allowCreateWhile === void 0 ? false : _ref$allowCreateWhile, _ref$createOptionPosi = _ref.createOptionPosition, createOptionPosition = _ref$createOptionPosi === void 0 ? "last" : _ref$createOptionPosi, _ref$formatCreateLabe = _ref.formatCreateLabel, formatCreateLabel2 = _ref$formatCreateLabe === void 0 ? builtins.formatCreateLabel : _ref$formatCreateLabe, _ref$isValidNewOption = _ref.isValidNewOption, isValidNewOption2 = _ref$isValidNewOption === void 0 ? builtins.isValidNewOption : _ref$isValidNewOption, _ref$getNewOptionData = _ref.getNewOptionData, getNewOptionData2 = _ref$getNewOptionData === void 0 ? builtins.getNewOptionData : _ref$getNewOptionData, onCreateOption = _ref.onCreateOption, _ref$options = _ref.options, propsOptions = _ref$options === void 0 ? [] : _ref$options, propsOnChange = _ref.onChange, restSelectProps = _objectWithoutProperties(_ref, _excluded);
  var _restSelectProps$getO = restSelectProps.getOptionValue, getOptionValue$1$1 = _restSelectProps$getO === void 0 ? getOptionValue$1 : _restSelectProps$getO, _restSelectProps$getO2 = restSelectProps.getOptionLabel, getOptionLabel$1$1 = _restSelectProps$getO2 === void 0 ? getOptionLabel$1 : _restSelectProps$getO2, inputValue = restSelectProps.inputValue, isLoading = restSelectProps.isLoading, isMulti = restSelectProps.isMulti, value = restSelectProps.value, name = restSelectProps.name;
  var newOption = reactExports.useMemo(function() {
    return isValidNewOption2(inputValue, cleanValue(value), propsOptions, {
      getOptionValue: getOptionValue$1$1,
      getOptionLabel: getOptionLabel$1$1
    }) ? getNewOptionData2(inputValue, formatCreateLabel2(inputValue)) : void 0;
  }, [formatCreateLabel2, getNewOptionData2, getOptionLabel$1$1, getOptionValue$1$1, inputValue, isValidNewOption2, propsOptions, value]);
  var options = reactExports.useMemo(function() {
    return (allowCreateWhileLoading || !isLoading) && newOption ? createOptionPosition === "first" ? [newOption].concat(_toConsumableArray(propsOptions)) : [].concat(_toConsumableArray(propsOptions), [newOption]) : propsOptions;
  }, [allowCreateWhileLoading, createOptionPosition, isLoading, newOption, propsOptions]);
  var onChange = reactExports.useCallback(function(newValue, actionMeta) {
    if (actionMeta.action !== "select-option") {
      return propsOnChange(newValue, actionMeta);
    }
    var valueArray = Array.isArray(newValue) ? newValue : [newValue];
    if (valueArray[valueArray.length - 1] === newOption) {
      if (onCreateOption)
        onCreateOption(inputValue);
      else {
        var newOptionData = getNewOptionData2(inputValue, inputValue);
        var newActionMeta = {
          action: "create-option",
          name,
          option: newOptionData
        };
        propsOnChange(valueTernary(isMulti, [].concat(_toConsumableArray(cleanValue(value)), [newOptionData]), newOptionData), newActionMeta);
      }
      return;
    }
    propsOnChange(newValue, actionMeta);
  }, [getNewOptionData2, inputValue, isMulti, name, newOption, onCreateOption, propsOnChange, value]);
  return _objectSpread2(_objectSpread2({}, restSelectProps), {}, {
    options,
    onChange
  });
}
var CreatableSelect = /* @__PURE__ */ reactExports.forwardRef(function(props, ref) {
  var creatableProps = useStateManager(props);
  var selectProps = useCreatable(creatableProps);
  return /* @__PURE__ */ reactExports.createElement(Select, _extends({
    ref
  }, selectProps));
});
var CreatableSelect$1 = CreatableSelect;
const LokcomListModel = () => ({
  kas_id: 0,
  kas_nama: "",
  kas_lok_id: 0,
  kas_com_id: 0,
  kas_role: "",
  kas_nick: "",
  lok_id: 0,
  lok_com_id: 0,
  com_id: 0,
  lok_nama: "",
  com_nama: ""
});
function tableList() {
  const { setMenuOpen, filters, setFilters, lang, cookies, setCookies } = reactExports.useContext(AppContext);
  const [listPadding, setListPadding] = reactExports.useState("20px");
  const [loading, setLoading] = reactExports.useState(true);
  const [newLoading, setNewLoading] = reactExports.useState(false);
  const [lokcoms, setLokcoms] = reactExports.useState([LokcomListModel()]);
  const [itemDisplay, setItemDisplay] = reactExports.useState(TableListModel());
  const navbarRef = reactExports.useRef();
  const [open, setOpen] = reactExports.useState(false);
  const [openAdd, setOpenAdd] = reactExports.useState(false);
  const [newOpen, setNewOpen] = reactExports.useState(false);
  const [readonly, setReadonly] = reactExports.useState(false);
  const [userById, setUserById] = reactExports.useState({});
  const [txtTitle, settxtTitle] = reactExports.useState("");
  const [mode, setMode] = reactExports.useState(0);
  const [keyword, setKeyword] = reactExports.useState("");
  const [funCodeData, setFunCodeData] = reactExports.useState(funCodes);
  const navigate = useNavigate();
  const animatedComponents = index();
  const [valueFunCode, setValueFunCode] = reactExports.useState([]);
  const [valueFunCodeName, setValueFunCodeName] = reactExports.useState([]);
  const [categoryCode, setCategoryCode] = reactExports.useState([]);
  const [dataValueFunCode, setDataValueFunCode] = reactExports.useState([]);
  const [roleNama, setRoleNama] = reactExports.useState("");
  const [isPasswordVisible, setIsPasswordVisible] = reactExports.useState(false);
  const [roleread, setRoleread] = reactExports.useState([]);
  reactExports.useState([]);
  reactExports.useState([]);
  reactExports.useState([]);
  reactExports.useState([]);
  const [rolenama, setRolenama] = reactExports.useState("");
  const [refreshCookies, setRefreshCookies] = reactExports.useState(0);
  function togglePasswordVisibility() {
    setIsPasswordVisible((prevState) => !prevState);
  }
  const handleFilter = (searchKey) => {
    setKeyword(searchKey);
  };
  const handleOpen = reactExports.useCallback(async (item, setedit, index2) => {
    if (setedit == true) {
      setReadonly(false);
      setOpen(true);
      setUserById(item);
      settxtTitle("Edit User");
      setMode(2);
      setValueFunCode([]);
      setValueFunCodeName({ "code": formatSentenceCase(item.kas_role), "desc": formatSentenceCase(item.kas_role) });
      const rolearr = [];
      const { data, error } = await readRoleNew({ kas_id: item.kas_id });
      if (error) {
        alert("Data tidak ditemukan");
      } else {
        data.map((i, index22) => {
          let pisah_priviledge = i.rol_priviledge.split("");
          pisah_priviledge.map((j, index3) => {
            let desc_role = funCodes.filter(function(object) {
              return object.code === i.rol_fun_code + "-" + j;
            });
            rolearr.push({ "code": i.rol_fun_code + "-" + j, "desc": desc_role[0].desc, "category": i.rol_fun_code });
          });
        });
        setRoleNama(item.kas_role);
        setValueFunCode(rolearr);
      }
    } else {
      setReadonly(true);
      setOpen(!open);
      setUserById(item);
      settxtTitle("Detail User");
      setMode(1);
    }
  }, [userById]);
  function handleNewOpen(id) {
    setNewOpen(!newOpen);
  }
  function handleAdd() {
    console.log(cookies);
  }
  const handleChange = (evt, id) => {
    setUserById({
      ...userById,
      [id]: evt.target.value
    });
  };
  const handleDelete = reactExports.useCallback(async () => {
    setItemDisplay(null);
    const { data, error } = await deleteRole({ kas_id: Number(userById.kas_id) });
    if (error) {
      alert("Data tidak ditemukan");
    } else {
      setLoading(true);
      const { data: data2, error: error2 } = await getLokcom({ com_id: cookies.com_id });
      if (error2) {
        alert("Data tidak ditemukan");
      } else {
        setLokcoms(data2);
      }
      setLoading(false);
    }
  }, [userById]);
  reactExports.useEffect(() => {
    let newCategory = [...categoryCode];
    funCodes.map((i, index2) => {
      newCategory.push(i.category);
    });
    let findDuplicates = newCategory.reduce(function(a, b) {
      if (a.indexOf(b) < 0)
        a.push(b);
      return a;
    }, []);
    setCategoryCode(findDuplicates);
  }, []);
  reactExports.useEffect(() => {
    const indexOfId = valueFunCode.findIndex((a) => a.code == "ALL-0");
    if (indexOfId >= 0) {
      if (funCodeData.length > 0)
        setFunCodeData([]);
      if (valueFunCode[0].category != "ALL" && valueFunCode.length > 0)
        setValueFunCode([{
          "code": "ALL-0",
          "desc": "Akses Semua",
          "category": "ALL"
        }]);
    } else {
      setFunCodeData(funCodes);
      const category_r = [];
      const category_notr = [];
      const category_all = [];
      categoryCode.map((i, index2) => {
        let datafilter = valueFunCode.filter(
          function(data) {
            return data.category == i;
          }
        );
        if (datafilter.length > 0) {
          let checkr = datafilter.filter(
            function(data) {
              return data.code.substr(data.code.length - 1) == "R" && data.category !== "PRN";
            }
          );
          let checknotr = datafilter.filter(
            function(data) {
              return data.code.substr(data.code.length - 1) !== "R" && data.category !== "PRN";
            }
          );
          if (checkr.length > 0)
            category_r.push(checkr[0].category);
          if (checknotr.length > 0)
            category_notr.push(checknotr[0].category);
          category_all.push(datafilter[0].category);
        }
      });
      const category_not_r = category_all.filter((n) => !category_r.includes(n));
      const _dataValueFunCode = lodashExports.cloneDeep(valueFunCode);
      category_not_r.map((i, index2) => {
        let datafilter = funCodeData.filter(
          function(data) {
            return data.code == i + "-R";
          }
        );
        _dataValueFunCode.push(datafilter[0]);
      });
      setDataValueFunCode(_dataValueFunCode);
    }
  }, [valueFunCode, valueFunCodeName]);
  reactExports.useEffect(() => {
    if (dataValueFunCode.length > 0) {
      setValueFunCode(dataValueFunCode);
    }
  }, [JSON.stringify(dataValueFunCode)]);
  const saveData = reactExports.useCallback(async () => {
    const uniqueData = [];
    categoryCode.map((i, index2) => {
      let datafilter = valueFunCode.filter(
        function(data) {
          return data.category == i;
        }
      );
      let newstrinside = "";
      datafilter.map((ii, indexi) => {
        newstrinside = newstrinside + ii.code.substr(ii.code.length - 1);
      });
      if (newstrinside != "")
        uniqueData.push({ "rol_id": -1, "rol_name": valueFunCodeName.code.replace(/\s/g, ""), "lok_id": cookies.lok_id, "com_id": cookies.com_id, "rol_fun_code": i, "rol_priviledge": newstrinside, "kas_id": userById.kas_id });
    });
    await deleteRole({ kas_id: Number(userById.kas_id) });
    let tasks = [];
    let k = 0;
    for (let i = 0; i < uniqueData.length; i++) {
      const delay = 1500 * i;
      tasks.push(new Promise(async function(resolve) {
        await new Promise((res) => setTimeout(res, delay));
        let result = await new Promise((r) => {
          saveRole(uniqueData[k]);
          r(delay);
        });
        resolve(result);
        k++;
      }));
    }
    setNewLoading(true);
    Promise.all(tasks).then((results) => {
      setValueFunCode([]);
      setOpen(false);
      setNewLoading(false);
      setRefreshCookies(refreshCookies + 1);
    });
  }, [userById, valueFunCode, categoryCode, roleNama, lokcoms, valueFunCodeName]);
  reactExports.useEffect(() => {
    if (refreshCookies > 0) {
      var role_read = [];
      var role_create = [];
      var role_update = [];
      var role_delete = [];
      var role_dst = [];
      setRoleread([]);
      setTimeout(function() {
        const initsetting = async () => {
          const { data, error } = await readRoleNew({
            kas_id: cookies.kas_id
          });
          if (data) {
            console.log(data[0].rol_name);
            setRoleNama(data[0].rol_name);
            refreshroles(data[0].rol_name, "role_nama");
            data.map((i, index2) => {
              var pisah_priviledge = i.rol_priviledge.split("");
              pisah_priviledge.map((ii, indexi) => {
                if (ii == "R")
                  role_read.push(i.rol_fun_code);
                if (ii == "C")
                  role_create.push(i.rol_fun_code);
                if (ii == "U")
                  role_update.push(i.rol_fun_code);
                if (ii == "D")
                  role_delete.push(i.rol_fun_code);
                if (ii == "0")
                  role_dst.push(i.rol_fun_code);
              });
            });
          }
        };
        initsetting();
        console.log(role_read);
      }, 1e3);
      setRoleread(role_read);
      refreshroles(role_read, "role_read");
    }
  }, [refreshCookies, userById]);
  const refreshroles = reactExports.useCallback((value, incookies) => {
    setCookies(incookies, value);
    console.log(roleread);
  }, [rolenama, roleread]);
  const saveNewPassword = reactExports.useCallback(async (password) => {
    const { data, error } = await savePassword(password);
    if (error) {
      alert(error.message);
    } else {
      setLokcoms(data);
    }
  }, [userById]);
  const saveNewData = reactExports.useCallback(async (users) => {
    const { data, error } = await saveUser(users);
    if (error) {
      alert(error.message);
    } else {
      saveNewPassword(users);
      let tasks = [];
      let k = 0;
      for (let i = 0; i < users.role.length; i++) {
        const delay = 1500 * i;
        tasks.push(new Promise(async function(resolve) {
          await new Promise((res) => setTimeout(res, delay));
          let result = await new Promise((r) => {
            saveRole(users.role[k]);
            r(delay);
          });
          resolve(result);
          k++;
        }));
      }
      setNewLoading(true);
      Promise.all(tasks).then((results) => {
        setValueFunCode([]);
        setOpenAdd(false);
      });
    }
  }, [userById]);
  const saveDataAdd = reactExports.useCallback(async () => {
    const _userById = lodashExports.cloneDeep(userById);
    const uniqueData = [];
    _userById.kas_role = valueFunCodeName.code;
    setItemDisplay(null);
    const { data, error } = await addUser(_userById);
    if (error) {
      alert(error.message);
    } else {
      _userById.kas_id = data[data.length - 1].kas_id;
      categoryCode.map((i, index2) => {
        let datafilter = valueFunCode.filter(
          function(data2) {
            return data2.category == i;
          }
        );
        let newstrinside = "";
        datafilter.map((ii, indexi) => {
          newstrinside = newstrinside + ii.code.substr(ii.code.length - 1);
        });
        if (newstrinside != "")
          uniqueData.push({ "rol_id": -1, "rol_name": valueFunCodeName.code.replace(/\s/g, ""), "lok_id": cookies.lok_id, "com_id": cookies.com_id, "rol_fun_code": i, "rol_priviledge": newstrinside, "kas_id": data[data.length - 1].kas_id });
      });
      _userById.role = uniqueData;
      saveNewData(_userById);
    }
  }, [userById, valueFunCodeName, valueFunCode]);
  reactExports.useEffect(() => {
    if (!cookies.lok_id) {
      navigate(topic.login.route);
    }
    const handleResponse = ({ data, error }) => {
      if (error) {
        alert("Data tidak ditemukan");
      } else {
        setLokcoms(data);
      }
    };
    const init = async () => {
      if (keyword && keyword.length > 1) {
        const orderSearch = setTimeout(async () => {
          setLoading(true);
          const { data, error } = await getTable({ lok_id: cookies.lok_id, key_val: keyword });
          handleResponse({ data, error });
          setLoading(false);
        }, TIME_SEARCH_DEBOUNCE);
        return () => {
          clearTimeout(orderSearch);
        };
      } else if (!keyword) {
        setLoading(true);
        setLokcoms([]);
        const { data, error } = await getLokcom({ com_id: cookies.com_id });
        handleResponse({ data, error });
        setLoading(false);
      }
    };
    init();
  }, [keyword]);
  reactExports.useEffect(() => {
    if (navbarRef.current) {
      setListPadding(`${navbarRef.current.offsetHeight + 20}px`);
    }
  }, [lokcoms, navbarRef]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(reactExports.Fragment, { children: [
    !loading ? null : /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingOverlay, { white: true }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-screen-adapt bg-gray-50 overflow-hidden relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "top-0 inset-x-0 fixed bg-gradient-to-b from-gray-50 h-20" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 top-0 inset-x-0 fixed z-50 mx-auto desktop:max-w-[60%]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Navbar, { ref: navbarRef, className: `pt-2 px-2 ${!filters.length ? "pb-6" : "pb-4"} relative`, blurred: false, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.IconButton, { variant: "text", size: "md", onClick: () => setMenuOpen(true), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bars3Icon, { className: "h-6 w-6 stroke-2" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-2 flex-grow", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SearchNavbar, { onSearch: handleFilter, value: keyword, label: "Cari User" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.IconButton, { size: "md", variant: "text", onClick: () => setFilters(true), children: /* @__PURE__ */ jsxRuntimeExports.jsx(AdjustmentsVerticalIcon, { className: "h-6 w-6 stroke-2" }) })
        ] }),
        !filters.length ? /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "gray", className: "absolute right-14 bottom-1 text-xs italic", children: "Semua Kategori" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-2 pt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FilterChips, { filters, onSetFilters: setFilters }) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pb-20 overflow-auto h-full", style: { paddingTop: listPadding }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.List, { className: "divide-y divide-dashed divide-gray-400", children: lokcoms.map((i, index2) => {
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(react.ListItem, { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full  flex flex-col gap-1", onClick: () => handleOpen(i, false, index2), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-[90%] whitespace-nowrap overflow-hidden text-ellipsis font-semibold", children: [
              i.kas_nama,
              " ",
              ` (${i.kas_nick})`
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "action-area flex items-center absolute top-1 right-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.IconButton, { variant: "text", color: "blue-gray", onClick: () => handleOpen(i, true, index2), children: /* @__PURE__ */ jsxRuntimeExports.jsx(PencilSquareIcon, { className: "h-6 w-6 text-black-500" }) }) })
          ] }, index2);
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed bottom-4 right-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.IconButton, { variant: "filled", color: "teal", className: "rounded-full", size: "lg", onClick: () => handleAdd(), children: /* @__PURE__ */ jsxRuntimeExports.jsx(PlusCircleIcon, { className: "h-8 w-8 text-black-500" }) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Dialog, { open, handler: handleOpen, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.DialogHeader, { children: txtTitle }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(react.DialogBody, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "flex items-center mt-2", children: " Nama Role" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            CreatableSelect$1,
            {
              isClearable: true,
              options: roleName,
              value: valueFunCodeName,
              onChange: setValueFunCodeName,
              getOptionLabel: (roleName2) => roleName2.desc,
              getOptionValue: (roleName2) => roleName2.code
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "flex items-center", children: " Kode Fungsi" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StateManagedSelect$1,
            {
              closeMenuOnSelect: false,
              components: animatedComponents,
              isMulti: true,
              options: funCodeData,
              value: valueFunCode,
              onChange: setValueFunCode,
              isDisabled: readonly,
              getOptionLabel: (funCodes2) => funCodes2.desc,
              getOptionValue: (funCodes2) => funCodes2.code
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(react.DialogFooter, { className: "flex gap-3 justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Button, { variant: "gradient", color: "blue-gray", onClick: () => setOpen(false), className: "w-full flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: mode <= 1 ? "Kembali" : "Batal" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            react.Button,
            {
              variant: "gradient",
              color: mode <= 1 ? "red" : "green",
              onClick: mode <= 1 ? () => handleNewOpen(userById.mej_id) : saveData,
              className: "w-full flex-1",
              children: newLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(react.Spinner, { className: "h-4 w-4 ml-32 text-white", color: "light-green" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: mode <= 1 ? "Hapus" : "Simpan" })
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Dialog, { open: openAdd, handler: handleAdd, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.DialogHeader, { children: "Tambah User" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(react.DialogBody, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            InputSimple,
            {
              label: "Nama Kasir",
              onChange: (evt) => handleChange(evt, "kas_nama"),
              disabled: readonly
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            InputSimple,
            {
              label: "Username",
              onChange: (evt) => handleChange(evt, "kas_nick"),
              disabled: readonly
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              react.Input,
              {
                label: "Password",
                color: "teal",
                onChange: (evt) => handleChange(evt, "kas_password"),
                type: isPasswordVisible ? "text" : "password"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center mt-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "checkbox",
                  className: "mr-2 w-4 h-4",
                  checked: isPasswordVisible,
                  onChange: togglePasswordVisibility
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-gray-600", children: "Show password" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "flex items-center mt-2", children: " Nama Role" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            CreatableSelect$1,
            {
              isClearable: true,
              options: roleName,
              value: valueFunCodeName,
              onChange: setValueFunCodeName,
              getOptionLabel: (roleName2) => roleName2.desc,
              getOptionValue: (roleName2) => roleName2.code
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "flex items-center", children: " Kode Fungsi" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StateManagedSelect$1,
            {
              closeMenuOnSelect: false,
              components: animatedComponents,
              isMulti: true,
              options: funCodeData,
              value: valueFunCode,
              onChange: setValueFunCode,
              isDisabled: readonly,
              getOptionLabel: (funCodes2) => funCodes2.desc,
              getOptionValue: (funCodes2) => funCodes2.code
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(react.DialogFooter, { className: "flex gap-3 justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Button, { variant: "gradient", color: "blue-gray", onClick: () => setOpenAdd(false), className: "w-full flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: mode <= 1 ? "Kembali" : "Batal" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            react.Button,
            {
              variant: "gradient",
              color: "green",
              onClick: saveDataAdd,
              className: "w-full flex-1",
              children: newLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(react.Spinner, { className: "h-4 w-4 ml-32 text-white", color: "light-green" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Simpan" })
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Dialog, { open: newOpen, handler: handleNewOpen, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.DialogBody, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center my-6", children: [
          "User ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: userById.mej_nama }),
          " akan dihapus. Apakah anda yakin?"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(react.DialogFooter, { className: "flex gap-3 justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Button, { variant: "gradient", color: "blue-gray", onClick: () => setNewOpen(false), className: "w-full flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Batal" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Button, { variant: "gradient", color: "red", onClick: handleDelete, className: "w-full flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Hapus" }) })
        ] })
      ] })
    ] })
  ] });
}
export {
  tableList as default
};
