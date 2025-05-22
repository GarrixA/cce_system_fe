"use client";
import { store } from "@/store";
import { Provider } from "react-redux";
import LoginForm from "./_components/LoginForm";

const Login = () => {
  return (
    <Provider store={store}>
      <LoginForm />
    </Provider>
  );
};

export default Login;
