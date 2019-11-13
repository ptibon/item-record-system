import React, { useContext, useEffect } from "react";
import { Button } from "@material-ui/core/";
import { Formik, Form, ErrorMessage } from "formik";
import { AddItemSchema } from "../../schema/AddItemSchema";
import { ItemRecordContext } from "../../context/ItemRecordContext";
import uuid from "uuid";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import { MyTextField } from "../custom/customMaterialJSX";

const AddItem = () => {
  const { dispatch } = useContext(ItemRecordContext);

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <>
      <h1>Add Item</h1>
      <div className="form-holder">
        <Formik
          initialValues={{
            id: uuid(),
            name: "",
            description: "",
            image: "",
            startDate: new Date()
          }}
          enableReinitialize
          validationSchema={AddItemSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            setTimeout(() => {
              setSubmitting(false);
              dispatch({ type: "ADD_ITEM", payload: values });
              resetForm({});
            }, 100);
          }}
        >
          {({ values, isSubmitting, setFieldValue }) => (
            <Form>
              <MyTextField name="name" />
              <MyTextField name="description" multiline rows="4" />
              <input
                accept="image/*"
                style={{ display: "none" }}
                id="raised-button-file"
                type="file"
                name="image"
                onChange={event => {
                  let reader = new FileReader();
                  let file = event.target.files[0];

                  reader.onloadend = () => {
                    setFieldValue("image", reader.result);
                  };
                  reader.readAsDataURL(file);
                }}
              />
              <label htmlFor="raised-button-file">
                <Button variant="contained" component="span">
                  Upload
                </Button>
              </label>
              <ErrorMessage name="image">
                {err => (
                  <p className="MuiFormHelperText-root MuiFormHelperText-contained Mui-error">
                    {err}
                  </p>
                )}
              </ErrorMessage>
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <KeyboardDatePicker
                  fullWidth
                  style={{ margin: "2em 0" }}
                  id="date-picker-dialog"
                  label="Date picker dialog"
                  format="MM/D/YYYY"
                  value={values.startDate}
                  name="startDate"
                  onChange={date => setFieldValue("startDate", date)}
                  KeyboardButtonProps={{
                    "aria-label": "change date"
                  }}
                />
              </MuiPickersUtilsProvider>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                disabled={isSubmitting}
                type="submit"
              >
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default AddItem;
