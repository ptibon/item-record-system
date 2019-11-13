import React, { useReducer, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AppNavbar from "./components/layout/AppNavbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AddItemForm from "./components/forms/AddItem";
import EditItemForm from "./components/forms/EditItem";
import AppHomepage from "./components/AppHomepage";
import { ItemRecordContext } from "./context/ItemRecordContext";
import { reducer, initialState } from "./reducer/ItemRecordReducer";

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: "GET_ITEMS" });
  }, []);

  return (
    <ItemRecordContext.Provider value={{ state, dispatch }}>
      <Router>
        <AppNavbar />
        <div className="App">
          <Switch>
            <Route path="/item/new" component={AddItemForm}></Route>
          </Switch>
          <Switch>
            <Route path="/" component={AppHomepage} exact></Route>
          </Switch>
          <Switch>
            <Route path="/item/:id/edit" component={EditItemForm} exact></Route>
          </Switch>
        </div>
      </Router>
    </ItemRecordContext.Provider>
  );
}

export default App;
