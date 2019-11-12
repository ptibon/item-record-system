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
          moment.utc(b.startDate).diff(moment.utc(a.startDate))
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
