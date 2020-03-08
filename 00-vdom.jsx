const React = {
    createElement: (tag, props, ...children) => {
        const element = {
            tag,
            props,
            children,
        };
        return element;
    }
}

const App = <div className="container">
    <h1>Building React</h1>
    <p>2020 edition</p>
</div>;

console.log(JSON.stringify(<App/>, null, 2));