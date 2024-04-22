import React from "react";
import { useRecoilValue } from "recoil";
import SignupCard from "../components/SignupCard.jsx";
import LoginCard from "../components/LoginCard.jsx";
import authScreenAtom from "../atoms/authAtom.js";

const AuthPage = () => {
  const authScreenState = useRecoilValue(authScreenAtom);
  console.log(authScreenState);
  return (
    <>
    {authScreenState === "login" ? <LoginCard /> : <SignupCard />}
      
    </>
  );
};

export default AuthPage;
