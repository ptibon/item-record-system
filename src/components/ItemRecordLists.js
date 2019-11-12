import React, { useContext } from "react";
import {
  Col,
  Card,
  CardHeader,
  Container,
  Row,
  CardBody,
  CardTitle,
  CardSubtitle
} from "reactstrap";
import { ItemRecordContext } from "../context/ItemRecordContext";
import moment from "moment";

const ItemRecordLists = () => {
  const { state } = useContext(ItemRecordContext);

  return (
    <>
      <h1>Item Record Lists</h1>
      <Container style={{ marginTop: "3em" }}>
        <Row>
          <Col sm={4}>
            <Card>
              <CardHeader>Item Lists</CardHeader>
              {state.items.map(item => {
                const date = moment(item.startDate).format("MMMM D, YYYY");
                return (
                  <CardBody key={item.id}>
                    <CardTitle>{item.name}</CardTitle>
                    <CardSubtitle>{date}</CardSubtitle>
                  </CardBody>
                );
              })}
            </Card>
          </Col>
          <Col sm={8}>
            <Card>
              <CardHeader>Item Description</CardHeader>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ItemRecordLists;
