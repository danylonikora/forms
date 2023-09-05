import React from "react";
import { Routes, Route} from "react-router-dom";

import Layout from "./components/layout/Layout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import CreateFormPage from "./pages/CreateFormPage";
import SignupPage from "./pages/SignupPage";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="form" element={<div>Form</div>} />
          <Route path="form/create" element={<CreateFormPage />} />
        </Route>
      </Routes>
    </div>
  );
}
