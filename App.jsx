import React, { useEffect, useState } from "react";
import { Form } from "./Form.jsx";
import { API_ADDR } from "./apiaddress.js";
import { ItemList } from "./itemList.jsx";
import { ActionLog } from "./ActionLog.jsx";

export const App = () => {
  const [items, setItems] = useState({});
  const [actions, setActions] = useState([]);

  const updatedItems = (itemName, quantity) => {
    const newArr = Object.values(items);
    let isPresent = false;
    newArr.forEach((product, index) => {
      if (Object.values(product).indexOf(itemName) > -1) {
        isPresent = true;
        items[index].productQty = items[index].productQty + parseInt(quantity);
        setItems({ ...items });
      }
    });
    if (isPresent === false) {
      newArr.push({ productName: itemName, productQty: parseInt(quantity) });
      setItems({ ...newArr });
    }
  };

  useEffect(() => {
    let isMounted = true;
    const fetchItems = async () => {
      const getItems = await fetch(`${API_ADDR}/inventory/`);
      const data = await getItems.json();

      if (isMounted) {
        setItems(data);
        setActions(
          actions.concat({
            time: new Date().toISOString(),
            message: "inventory loaded from server",
            data: { status: getItems.status, body: data },
          })
        );
      }
    };
    fetchItems();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <div>
        <h1>Inventory Content</h1>
        <h2>Add item through the Form</h2>
        <Form onItemAdded={updatedItems} />
        <ItemList items={items} />
        <ActionLog actions={actions} />
      </div>
    </>
  );
};
