"use client";
import { store } from "@/store";
import React from "react";
import { Provider } from "react-redux";
import LandingPage from "./_components/LandingPage";

const page = () => {
  return (
    <div>
      <Provider store={store}>
        <LandingPage />
      </Provider>
    </div>
  );
};

export default page;
