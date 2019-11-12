import React, { useEffect, useReducer } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AppNavbar from "./components/AppNavbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AddItemForm from "./components/AddItemForm";
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
            <Route path="/item/add" component={AddItemForm} exact></Route>
          </Switch>
          <Switch>
            <Route path="/" component={AppHomepage} exact></Route>
          </Switch>
        </div>
      </Router>
    </ItemRecordContext.Provider>
  );
}

export default App;
