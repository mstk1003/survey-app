import "./App.css";
import { Route, Routes } from "react-router-dom";
import SignUp from "./pages/signUp";
import Home from "./pages/home.jsx";
import React, { useState } from "react";
import CustomDrawer from "./components/common/CustomDrawer";
import Surveys from "./pages/surveys";
import SurveyCreate from "./pages/surveys/create";
import DefaultLayout from "./layouts/default";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <DefaultLayout>
              <Home />
            </DefaultLayout>
          }
        />
        <Route path="/sign-up" element={<SignUp />} />
        <Route
          path="/surveys"
          element={
            <DefaultLayout>
              <Surveys />
            </DefaultLayout>
          }
        />
        <Route
          path="/surveys/create"
          element={
            <DefaultLayout>
              <SurveyCreate />
            </DefaultLayout>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
