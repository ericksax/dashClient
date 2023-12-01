"use client";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

const IsAuthenticated = ({ children }: { children: ReactNode }) => {
  const { push } = useRouter();

  const isUserAuthenticated = () => {
    return localStorage.getItem("@tokenClient") ? true : false;
  };

  console.log(isUserAuthenticated());

  const isAuth = isUserAuthenticated();
  useEffect(() => {
    if (!isAuth) {
      push("/");
    }
  }, [isAuth, push]);

  return (
    <>
      {!isAuth && null}
      {isAuth && children}
    </>
  );
};
export default IsAuthenticated;
