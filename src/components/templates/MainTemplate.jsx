import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Banner from "../Banner";

export default function MainTemplate() {
  return (
    <div className="App">
      <Header />
      <main className="container">
        <div className="row">
          <div className="col">
            <Banner />
            <Outlet/>
          </div>
        </div>
      </main>
      <Footer/>
    </div>
  );
}