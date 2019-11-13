import { useField } from "formik";
import { TextField } from "@material-ui/core/";
import React from "react";

export const MyTextField = ({ multiline, rows, ...props }) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : "";
  return (
    <TextField
      {...field}
      helperText={errorText}
      error={!!errorText}
      fullWidth
      variant="outlined"
      label={field.name}
      multiline={multiline}
      rows={rows}
      margin="normal"
    />
  );
};
