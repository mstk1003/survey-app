import "./App.css";
import { Route, Routes } from "react-router-dom";
import SignUp from "./pages/signUp";
import Home from "./pages/home.jsx";
import React, { useState } from "react";
import CustomDrawer from "./components/common/CustomDrawer";
import Surveys from "./pages/surveys";
import SurveyCreate from "./pages/surveys/create";
import DefaultLayout from "./layouts/default";

const drawerMaxWidth = 270;
const drawerMinWidth = 50;

function App() {
  const [drawerOpened, setOpenDrawer] = useState(true);
  const [drawerWidth, setDrawerWidth] = useState(drawerMaxWidth);

  function openDrawer() {
    setOpenDrawer(true);
    setDrawerWidth(drawerMaxWidth);
    console.log("open");
  }

  function closeDrawer() {
    setOpenDrawer(false);
    setDrawerWidth(drawerMinWidth);
    console.log("close");
  }
  return (
    <div className="App">
      <CustomDrawer
        drawerWidth={drawerWidth}
        drawerOpened={drawerOpened}
        openDrawer={openDrawer}
        closeDrawer={closeDrawer}
      ></CustomDrawer>
      <DefaultLayout drawerWidth={drawerWidth}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/surveys" element={<Surveys />} />
          <Route path="/surveys/create" element={<SurveyCreate />} />
        </Routes>
      </DefaultLayout>
    </div>
  );
}

export default App;
