import React from "react";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import { Outlet } from "react-router-dom";
import TextContextProvider from "../Context/NoteBookContext";
function RootPage() {
  return (
    <>
      <Header />
      <main>
        <TextContextProvider>
          <SideBar />
          <Outlet />
        </TextContextProvider>
      </main>
    </>
  );
}

export default RootPage;
