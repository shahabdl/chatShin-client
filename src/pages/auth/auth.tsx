import { useSelector } from "react-redux";
import Login from "./components/login";
import { selectAuthState } from "shb/store/authSlice";
import { useEffect, useState } from "react";
import SetUsername from "./components/set-details";

const Auth = () => {
  const authState = useSelector(selectAuthState);
  const [needUsername, setNeedUsername] = useState(false);
  useEffect(() => {
    if (authState.username === "") {
      setNeedUsername(true);
    } else {
      setNeedUsername(false);
    }
  }, [authState]);
  if (!authState.id) {
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
