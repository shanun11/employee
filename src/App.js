import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import Employee from "./pages/employee/employee";

import Home from "./pages/home/home";
import Login from "./pages/login/login";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* public routes */}
            <Route path="/">
              <Route index element={<Home />} />
              <Route element={<Login />} path="login" />
              {/* <Route element={<Employee />} path="employees" /> */}
            </Route>
            {/* protected routes */}
            <Route path="/employees">
              
                <Route index element={<Employee />} />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
