import React, { useContext, useEffect } from "react";
import { Button } from "@material-ui/core/";
import { Formik, Form, ErrorMessage } from "formik";
import { AddItemSchema } from "../../schema/AddItemSchema";
import { ItemRecordContext } from "../../context/ItemRecordContext";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import { MyTextField } from "../custom/customMaterialJSX";

const EditItemForm = ({ match }) => {
  const { state, dispatch } = useContext(ItemRecordContext);

  useEffect(() => {
    const { id } = match.params;
    dispatch({ type: "GET_ITEM", payload: id });
  }, [match.params.id, state.items]);

  return (
    <>
      {state.item.length > 0 ? (
        <>
          <h1>Edit {state.item[0].name}</h1>
          <div className="form-holder">
            <Formik
              initialValues={{
                id: state.item[0].id,
                name: state.item[0].name,
                description: state.item[0].description,
                image: state.item[0].image,
                startDate: state.item[0].startDate
              }}
              enableReinitialize
              validationSchema={AddItemSchema}
              onSubmit={(values, { setSubmitting, resetForm }) => {
                setTimeout(() => {
                  setSubmitting(false);
                  dispatch({ type: "EDIT_ITEM", payload: values });
                  resetForm({});
                }, 400);
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
                    Edit Item
                  </Button>
                  {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
                </Form>
              )}
            </Formik>
          </div>
        </>
      ) : (
        <div>Loading.....</div>
      )}
    </>
  );
};

export default EditItemForm;
