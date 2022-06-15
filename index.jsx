const ReactDom = require("react-dom/client");
const React = require("react");

const App = () => {
  return (
    <>
      <div>
        <h1>Inventory Contents</h1>
      </div>
    </>
  );
};

const root = ReactDom.createRoot(document.getElementById("app"));
root.render(App);
