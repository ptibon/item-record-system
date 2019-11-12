import React, { useContext } from "react";
import { Container } from "reactstrap";
import ItemRecordLists from "./ItemRecordLists";
import AddItemForm from "./AddItemForm";
import { ItemRecordContext } from "../context/ItemRecordContext";

const AppHomepage = () => {
  const { state } = useContext(ItemRecordContext);

  return (
    <Container>
      {state.items.length <= 0 ? <AddItemForm /> : <ItemRecordLists />}
    </Container>
  );
};

export default AppHomepage;
