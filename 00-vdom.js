"use strict";

var React = {
  createElement: function createElement(tag, props) {
    for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      children[_key - 2] = arguments[_key];
    }

    var element = {
      tag: tag,
      props: props,
      children: children
    };
    return element;
  }
};
var App = React.createElement("div", {
  className: "container"
}, React.createElement("h1", null, "Building React"), React.createElement("p", null, "2020 edition"));
console.log(JSON.stringify(React.createElement(App, null), null, 2));
