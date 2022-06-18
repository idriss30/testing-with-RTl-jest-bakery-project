import React from "react";

export const App = () => {
  const [danishes, setDanishes] = React.useState(0);
  const clickButton = () => {
    setDanishes(danishes + 1);
  };
  return (
    <>
      <div>
        <h1>Inventory Contents</h1>
        <p>Danish, {danishes}</p>
        <button onClick={clickButton}>Increment danish</button>
      </div>
    </>
  );
};
