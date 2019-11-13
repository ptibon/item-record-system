import React, { useContext } from "react";
import { Container } from "reactstrap";
import ItemRecordLists from "./ItemRecordLists";
import AddItem from "./forms/AddItem";
import { ItemRecordContext } from "../context/ItemRecordContext";

const AppHomepage = () => {
  const { state } = useContext(ItemRecordContext);

  return (
    <Container>
      {state.items.length === 0 ? <AddItem /> : <ItemRecordLists />}
    </Container>
  );
};

export default AppHomepage;
