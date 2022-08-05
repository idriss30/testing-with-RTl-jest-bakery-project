import React from "react";
import { Form } from "./Form";

export default {
  title: "ItemForm",
  component: Form,
  includeStories: ["itemForm"],
};

export const itemForm = () => {
  return (
    <Form
      onItemAdded={(...data) => {
        alert(JSON.stringify(data));
      }}
    />
  );
};
