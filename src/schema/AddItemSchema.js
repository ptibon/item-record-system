import * as Yup from "yup";

export const AddItemSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(10, "Too Long!")
    .required("This field is required"),
  image: Yup.string()
    // .url("Please enter a valid URL")
    .required("This field is required")
});
