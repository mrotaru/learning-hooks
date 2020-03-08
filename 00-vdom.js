"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var React = {
  createElement: function createElement(tag, props) {
    for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      children[_key - 2] = arguments[_key];
    }

    if (typeof tag === "function") {
      return tag(_objectSpread({}, props, {
        children: children
      }));
    }

    var element = {
      tag: tag,
      props: props,
      children: children
    };
    return element;
  }
};

var App = function App(_ref) {
  var children = _ref.children;
  return React.createElement("div", {
    className: "container"
  }, React.createElement("h1", null, "Building React"), React.createElement("p", null, "2020 edition"), children);
};

var WithChildren = React.createElement(App, null, React.createElement("div", null, React.createElement("p", null, "I'm a child")));

var log = function log(component) {
  console.log(JSON.stringify(component, null, 2));
};

log(WithChildren);
