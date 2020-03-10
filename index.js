const jsdom = require("jsdom");

const {
  JSDOM
} = jsdom;
const dom = new JSDOM(`<!DOCTYPE html><div id="root"></div>`, {
  runScripts: "dangerously",
  includeNodeLocations: true
});
const window = dom.window;
const document = window.document; // create react element from function or HTML tag

const React = {
  createElement: (tag, props, ...children) => {
    if (typeof tag === "function") {
      return tag({ ...props,
        children
      });
    }

    const element = {
      tag,
      props: { ...props,
        children
      }
    };
    return element;
  }
}; // useState hook

let useStateStates = [];
let useStateInitialStates = [];
let useStateIndex = 0;

const useState = initialState => {
  const myIndex = useStateIndex;
  useStateInitialStates[myIndex] = initialState;
  let state = useStateStates.hasOwnProperty(myIndex) ? useStateStates[myIndex] : useStateInitialStates[myIndex];

  const setState = newState => {
    useStateStates[myIndex] = newState;
  };

  useStateIndex++;
  return [state, setState];
}; // useRef hook


let useRefObjects = [];
let useRefObjectsIndexMap = new Map();
let useRefIndex = 0;

const useRef = initialObject => {
  const myIndex = useRefIndex;
  let returnObject;

  if (useRefObjects.hasOwnProperty(myIndex)) {
    returnObject = useRefObjects[myIndex];
  } else {
    const useRefObject = {
      current: initialObject
    };
    returnObject = useRefObject;
    useRefObjects[myIndex] = useRefObject;
  }

  useRefObjectsIndexMap.set(returnObject, returnObject);
  useRefIndex++;
  return returnObject;
}; // render function


const render = (reactElement, domContainer) => {
  if (Array.isArray(reactElement)) {
    reactElement.forEach(element => {
      render(element, domContainer);
    });
  } else if (typeof reactElement == "string" || typeof reactElement == "number") {
    domContainer.textContent += String(reactElement);
  } else {
    const {
      tag,
      props
    } = reactElement;
    const {
      children,
      ref
    } = props;
    const specialProps = ["children", "ref"];
    let domElement = document.createElement(tag);
    Object.keys(props).filter(key => !specialProps.includes(key)).forEach(key => {
      let domPropName = key === "onClick" ? "onclick" : key;
      domElement[domPropName] = props[key];
    });

    if (ref) {
      console.log('domElement:', domElement, domElement.textContent);
      useRefObjectsIndexMap.get(ref).current = domElement;
    }

    if (children) {
      children.forEach(child => {
        render(child, domElement);
      });
    }

    domContainer.appendChild(domElement);
  }
}; // simple component


let obj = {
  text: "my object"
};

const App = ({
  children
}) => {
  const [count, setCount] = useState(0);
  const [lastClickTimestamp, setLastClickTimestamp] = useState("never");
  const btnRef = useRef(null); // const objRef = useRef({ text: "my object ref" });

  const objRef = useRef(obj);
  return React.createElement("div", {
    className: "container"
  }, React.createElement("p", null, "You clicked ", count, " times; last click: ", lastClickTimestamp), React.createElement("button", {
    ref: btnRef,
    onClick: () => {
      setCount(count + 1);
      setLastClickTimestamp(Date.now());
      objRef.current.clickCount = count + 1;
    }
  }, "Click me"), children);
};

let renderCount = 0;

const rerender = () => {
  useStateIndex = 0;
  useRefIndex = 0;
  renderCount++;
  document.querySelector("#root").textContent = "";
  const reactElement = React.createElement(App, null);
  render(reactElement, document.querySelector("#root"));
  return [reactElement, document.documentElement.outerHTML];
};

let [reactElement, html] = rerender();
console.log(`Render ${renderCount}`);
console.log(html);
console.log("Clicking...");
document.querySelector("button").click();
[reactElement, html] = rerender();
console.log(`Render ${renderCount}`);
console.log(html);
console.log("Clicking...");
document.querySelector("button").click();
[reactElement, html] = rerender();
console.log(`Render ${renderCount}`);
console.log(html);
console.log(JSON.stringify(Array.from(useRefObjects)[0].current.textContent, null, 2)); // utilities

function getVdom(component) {
  return JSON.stringify(component, null, 2);
}
