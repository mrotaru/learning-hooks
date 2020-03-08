const React = {
    createElement: (tag, props, ...children) => {
        if (typeof tag === "function") {
            return tag({ ...props, children })
        }
        const element = {
            tag,
            props,
            children,
        };
        return element;
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

log(WithChildren);

// utilities

function log(component) {
    console.log(JSON.stringify(component, null, 2));
}
