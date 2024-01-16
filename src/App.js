import logo from "./logo.svg";
import "./App.css";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Protected from "./Components/Protected";
import Home from "./Pages/Home";
import { AuthContextProvider } from "./Context/AuthContext";
function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <BrowserRouter>
          <ToastContainer />
          <Routes>
            <Route path="/login" element={<SignIn />}></Route>
            <Route path="/Signup" element={<SignUp />}></Route>
            {/* <Route path="/dashboard" element={<User />}></Route> */}
            <Route path="/" element={<Protected />}>
              <Route path="/" element={<Home />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthContextProvider>
    </div>
  );
}

export default App;
