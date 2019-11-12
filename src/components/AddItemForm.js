import React, { useContext } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Input, FormGroup, Label, Button, Alert, Card } from "reactstrap";
import { AddItemSchema } from "../schema/AddItemSchema";
import { ItemRecordContext } from "../context/ItemRecordContext";
import uuid from "uuid";

const AddItemForm = () => {
  const { dispatch } = useContext(ItemRecordContext);

  return (
    <>
      <h1>Add Item</h1>
      <Card className="form-holder">
        <Formik
          initialValues={{
            id: uuid(),
            name: "",
            description: "",
            image: "",
            startDate: new Date()
          }}
          validationSchema={AddItemSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            setTimeout(() => {
              dispatch({ type: "ADD_ITEM", payload: values });
              setSubmitting(false);
              resetForm({});
            }, 400);
          }}
        >
          {({ values, isSubmitting, setFieldValue }) => (
            <Form>
              <FormGroup>
                <Label>Name</Label>
                <Field type="text" name="name" as={Input} />
              </FormGroup>
              <ErrorMessage name="name">
                {err => <Alert color="danger">{err}</Alert>}
              </ErrorMessage>
              <FormGroup>
                <Label>Description</Label>
                <Field type="textarea" name="description" as={Input} />
              </FormGroup>
              <ErrorMessage name="description">
                {err => <Alert color="danger">{err}</Alert>}
              </ErrorMessage>
              <FormGroup>
                <Label>Upload Item Image</Label>
                <Field
                  type="file"
                  name="image"
                  as={Input}
                  accept=".jpg, .png, .jpeg"
                />
              </FormGroup>
              <ErrorMessage name="image">
                {err => <Alert color="danger">{err}</Alert>}
              </ErrorMessage>
              <FormGroup>
                <Label>Enter Item Date: </Label>
                <div>
                  <DatePicker
                    selected={values.startDate}
                    dateFormat="MMMM d, yyyy"
                    className="form-control"
                    name="startDate"
                    onChange={date => setFieldValue("startDate", date)}
                  />
                </div>
              </FormGroup>
              <ErrorMessage name="startDate">
                {err => <Alert color="danger">{err}</Alert>}
              </ErrorMessage>
              <Button color="primary" type="submit" disabled={isSubmitting}>
                Submit
              </Button>
              <pre>{JSON.stringify(values, 2, null)}</pre>
            </Form>
          )}
        </Formik>
      </Card>
    </>
  );
};

export default AddItemForm;
