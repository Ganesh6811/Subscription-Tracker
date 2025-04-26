import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HomePage } from './Pages/Home/HomePage.jsx';
import LoginPage from './Pages/Login/LoginPage.jsx';
import SignUpPage from "./Pages/Registration/SignUpPage.jsx";
import ProfilePage from "./Pages/Profile/ProfilePage.jsx";

import React, { useState, useEffect, createContext } from 'react';
import { AuthUser } from './Services/Auth.jsx';

export const store = createContext();

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuthStatus = async () => {
      const checkUser = await AuthUser();
      setIsAuthenticated(checkUser.check);
      setUser(checkUser.userId);
    };

    checkAuthStatus();
  }, []);

  if (isAuthenticated == null) {
    return <div>Loading......</div>;
  }

  return (
    <store.Provider value={[user, setUser]}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />} />
          <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <Navigate to="/" />} />
          <Route path="/signUp" element={!isAuthenticated ? <SignUpPage /> : <Navigate to="/" />} />
          <Route path="/profile" element={isAuthenticated ? <ProfilePage /> : <Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </store.Provider>
  );
}

export default App;
