import React, { useContext, Suspense } from "react";
import { Tabs, Tab, makeStyles, Button } from "@material-ui/core/";
import { ItemRecordContext } from "../context/ItemRecordContext";
import moment from "moment";

const ItemList = React.lazy(() => import("./ItemList"));

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    height: 350
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`
  }
}));

const ItemRecordLists = () => {
  const { state, dispatch } = useContext(ItemRecordContext);

  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const sortItemByName = () => {
    dispatch({ type: "SORT_ITEMS" });
  };

  return (
    <>
      {state.items.length > 0 ? (
        <div className="item-list-holder">
          <h1>Item Record Lists</h1>
          <Button
            onClick={sortItemByName}
            style={{ marginBottom: "10px" }}
            size="small"
            color="primary"
          >
            Filter By Name
          </Button>
          <div className="tab-holder">
            <div className={classes.root}>
              <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                className={classes.tabs}
              >
                {state.items.map(item => {
                  const date = moment(item.startDate).format("MM-D-YYYY");
                  return (
                    <Tab
                      key={item.id}
                      label={
                        <React.Fragment>
                          {item.name}
                          <br />
                          <span
                            style={{
                              fontSize: "x-small",
                              color: "rgb(160, 158, 158)"
                            }}
                          >
                            {date}
                          </span>
                        </React.Fragment>
                      }
                      {...a11yProps(item.id)}
                    />
                  );
                })}
              </Tabs>
              <Suspense fallback={<div>Loading...</div>}>
                <ItemList value={value} details={state.items} />
              </Suspense>
            </div>
          </div>
        </div>
      ) : (
        <div>Loading.....</div>
      )}
    </>
  );
};

export default ItemRecordLists;
