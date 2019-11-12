import * as moment from "moment";

export const initialState = {
  items: []
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "GET_ITEMS":
      let getItems = localStorage.getItem("item");
      getItems = JSON.parse(getItems);
      if (!getItems) {
        return state;
      } else {
        getItems = getItems.sort((a, b) =>
          moment.utc(a.date).diff(moment.utc(b.date))
        );
      }
      return {
        ...state,
        items: getItems
      };
    case "ADD_ITEM":
      return {
        ...state,
        items: [action.item, ...state.items]
      };
    default:
      return state;
  }
};
