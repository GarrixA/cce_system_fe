"use client";

import React from "react";
import { Provider } from "react-redux";
import User2FAPage from "./_components/TwoFa";
import { store } from "@/store";

const Two = () => {
  return (
    <div>
      <Provider store={store}>
        <User2FAPage />
      </Provider>
    </div>
  );
};

export default Two;
