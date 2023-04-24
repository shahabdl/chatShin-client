import { useSelector } from "react-redux";
import Login from "./components/login";
import { selectAuthState } from "shb/store/authSlice";
import { useEffect, useState } from "react";
import SetUsername from "./components/set-details";
import { useRouter } from "next/router";
import Signup from "./components/signup";

const Auth = () => {
  const authState = useSelector(selectAuthState);
  const router = useRouter();
  const { t } = router.query;
  useEffect(() => {
    console.log(t);
  }, [t]);

  if (!authState.id) {
    if(t === "signup"){
      return(
        <div><Signup /></div>
      )
    }
    return (
      <div>
        <Login />
      </div>
    );
  }
  if (authState.id && !authState.username) {
    return (
      <div>
        <SetUsername />
      </div>
    );
  }
  return <div>you should not be here</div>;
};

export default Auth;
