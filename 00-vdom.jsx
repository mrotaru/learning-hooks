const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const dom = new JSDOM(`<!DOCTYPE html><div id="root"></div>`);
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

const render = (reactElement, domContainer) => {
    if (Array.isArray(reactElement)) {
        reactElement.forEach(element => {
            render(element, domContainer);
        })
    } else if (typeof reactElement === "string") {
        domContainer.textContent = reactElement;
    } else {
        const { tag, props } = reactElement;
        const { children } = props;
        let domElement = document.createElement(tag);
        Object.keys(props).filter(key => key !== "children").forEach(key => {
            domElement[key] = props[key];
        })
        if (children) {
            children.forEach(child => {
                render(child, domElement);
            })
        }
        domContainer.appendChild(domElement);
    }
}

const App = ({ children }) => (
    <div className="container">
        <h1>Building React</h1>
        <p>2020 edition</p>
        {children}
    </div>
)

const WithChildren = <App>
    <div>
        <p>I'm a child</p>
    </div>
</App>

logVdom(WithChildren);

render(WithChildren, document.querySelector("#root"));

console.log(document.documentElement.outerHTML);

// utilities

function logVdom(component) {
    console.log(JSON.stringify(component, null, 2));
}
