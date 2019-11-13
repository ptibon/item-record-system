import React from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Item from "./Item";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      <Box p={3}>{value === index && children}</Box>
    </Typography>
  );
}

const ItemList = ({ value, details }) => {
  return (
    <>
      {details.map((item, index) => (
        <TabPanel key={item.id} value={value} index={index}>
          <Item item={item} />
        </TabPanel>
      ))}
    </>
  );
};

export default ItemList;
