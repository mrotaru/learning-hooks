const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const dom = new JSDOM(`<!DOCTYPE html><div id="root"></div>`, { runScripts: "dangerously" });
const window = dom.window;
const document = window.document;

const React = {
    createElement: (tag, props, ...children) => {
        if (typeof tag === "function") {
            return tag({ ...props, children })
        }
        const element = {
            tag,
            props: {...props, children}
        };
        return element;
    }
}

let useStateStates = [];
let useStateInitialStates = [];
let useStateIndex = 0;

const render = (reactElement, domContainer) => {
    if (Array.isArray(reactElement)) {
        reactElement.forEach(element => {
            render(element, domContainer);
        })
    } else if (typeof reactElement == "string" || typeof reactElement == "number") {
        domContainer.textContent += String(reactElement);
    } else {
        const { tag, props } = reactElement;
        const { children } = props;
        let domElement = document.createElement(tag);
        Object.keys(props).filter(key => key !== "children").forEach(key => {
            let domPropName = key === "onClick" ? "onclick" : key;
            domElement[domPropName] = props[key];
        })
        if (children) {
            children.forEach(child => {
                render(child, domElement);
            })
        }
        domContainer.appendChild(domElement);
    }
}

const useState = initialState => {
    const myIndex = useStateIndex;
    useStateInitialStates[myIndex] = initialState;
    useStateIndex += 1;
    let state = useStateStates.hasOwnProperty(myIndex)
        ? useStateStates[myIndex]
        : useStateInitialStates[myIndex]
    const setState = newState => {
        useStateStates[myIndex] = newState;
    }
    return [state, setState];
}

const App = ({ children }) => {
    const [count, setCount] = useState(0);
    const [lastClickTimestamp, setLastClickTimestamp] = useState("never");
    return (
        <div className="container">
            <p>You clicked {count} times; last click: {lastClickTimestamp}</p>
            <button onClick={() => {
                setCount(count + 1);
                setLastClickTimestamp(Date.now());
            } }>
                Click me
            </button>
            {children}
        </div>
    )
}

let renderCount = 0;

const rerender = () => {
    useStateIndex = 0;
    renderCount++;
    document.querySelector("#root").textContent = "";
    const reactElement = <App />;
    render(reactElement, document.querySelector("#root"));
    return [reactElement, document.documentElement.outerHTML];
}

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

// utilities

function getVdom(component) {
    return JSON.stringify(component, null, 2);
}
