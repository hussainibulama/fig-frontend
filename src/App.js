import Home from "./components/pages/home";
import Event from "./components/pages/event";
import Login from "./components/pages/login";
import Signup from "./components/pages/signup";
import AddEvent from "./components/pages/addevent";
import { Routes, Route } from "react-router-dom";
import store from "./components/redux/store";
import { Provider } from "react-redux";
function App() {
  return (
    <>
      <Provider store={store}>
        <Routes>
          <Route index element={<Login />} />
          <Route path="/index" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/events" element={<Event />} />
          <Route path="/addevent" element={<AddEvent />} />
        </Routes>
      </Provider>
    </>
  );
}

export default App;
