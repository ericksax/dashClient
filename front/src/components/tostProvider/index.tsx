"use client";

import { ToastContainer } from "react-toastify";

type ToastProviderProps = {
  children: React.ReactNode;
};
export const ToastProvider = ({ children }: ToastProviderProps) => {
  return (
    <>
      <ToastContainer />
      {children}
    </>
  );
};
