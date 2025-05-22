"use client";

import { Provider } from "react-redux";
import RegistrationForm from "./_components/RegistrationForm";
import { store } from "@/store";

const Register = () => {
  return (
    <Provider store={store}>
      <RegistrationForm />
    </Provider>
  );
};

export default Register;
