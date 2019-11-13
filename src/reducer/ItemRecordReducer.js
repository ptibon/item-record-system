import * as moment from "moment";

export const initialState = {
  items: [],
  item: []
};

const showItems = state => {
  let getItems = localStorage.getItem("item");
  getItems = JSON.parse(getItems);
  if (!getItems) {
    return state;
  } else {
    return (getItems = getItems.sort((a, b) =>
      moment.utc(b.startDate).diff(moment.utc(a.startDate))
    ));
  }
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

    case "GET_ITEM":
      return {
        ...state,
        item: showItems(state).filter(item => item.id === action.payload)
      };

    case "SORT_ITEMS":
      state.items.sort(function(a, b) {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });

      return {
        ...state,
        items: state.items
      };

    case "EDIT_ITEM":
      // update item from localstorage
      var updateItems = JSON.parse(localStorage["item"]);
      for (let i = 0; i < updateItems.length; i++) {
        if (updateItems[i].id === action.payload.id) {
          updateItems[i].name = action.payload.name;
          updateItems[i].description = action.payload.description;
          updateItems[i].image = action.payload.image;
          updateItems[i].startDate = action.payload.startDate;
          break;
        }
      }
      updateItems = JSON.stringify(updateItems);
      localStorage.setItem("item", updateItems);

      var updateStateItems = showItems(state);
      for (let i = 0; i < updateStateItems.length; i++) {
        if (updateStateItems[i].id === action.payload.id) {
          updateStateItems[i].name = action.payload.name;
          updateStateItems[i].description = action.payload.description;
          updateStateItems[i].image = action.payload.image;
          updateStateItems[i].startDate = action.payload.startDate;
          break;
        }
      }

      console.log(updateStateItems);
      return {
        ...state,
        items: updateStateItems
      };

    default:
      return state;
  }
};
