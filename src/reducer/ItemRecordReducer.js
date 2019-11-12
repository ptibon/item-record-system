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
      const storedItem = JSON.parse(localStorage.getItem("item") || "[]");
      storedItem.push(action.payload);
      localStorage.setItem("item", JSON.stringify(storedItem));
      return {
        ...state,
        items: [action.payload, ...state.items]
      };

    case "DELETE_ITEM":
      // remove item from localstorage
      var items = JSON.parse(localStorage["item"]);
      for (var i = 0; i < items.length; i++) {
        if (items[i].id === action.payload) {
          items.splice(i, 1);
          break;
        }
      }

      items = JSON.stringify(items);
      localStorage.setItem("item", items);

      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };

    default:
      return state;
  }
};
