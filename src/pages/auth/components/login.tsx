import { gql } from "@apollo/client";
import { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import apolloClient from "shb/components/apollo-client";
import Loading from "shb/components/ui/loading";
import { setAuthState } from "shb/store/authSlice";

const LOGIN = gql`
  query Login($email: String, $password: String) {
    signIn(email: $email, password: $password) {
      user {
        id
        email
        username
        userAccessToken
      }
      success
      error
    }
  }
`;

const Login = () => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const submitHandler = async () => {
    if (loginData.email && loginData.password) {
      setLoading(true);
      const { error, data } = await apolloClient.query({
        query: LOGIN,
        variables: { email: loginData.email, password: loginData.password },
      });
      if (!error && data) {
        if (data.signIn.user.userAccessToken) {
          dispatch(
            setAuthState({
              token: data.signIn.user.userAccessToken,
              id: data.signIn.user.id,
              email: data.signIn.user.email,
              username: data.signIn.user.username,
            })
          );
        }
      }
      setLoading(false);
    }
  };

  const changeHandler = (name: string, value: string) => {
    if (name === "email") {
      setLoginData({ email: value, password: loginData.password });
    } else {
      setLoginData({ email: loginData.email, password: value });
    }
  };

  return (
    <div>
      <div>
        <input
          name="email"
          type="email"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            changeHandler("email", e.currentTarget.value)
          }
        />
      </div>
      <div>
        <input
          name="password"
          type="password"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            changeHandler("password", e.currentTarget.value)
          }
        />
      </div>
      <button onClick={submitHandler}>Login</button>
      {loading ? <Loading /> : ""}
    </div>
  );
};

export default Login;
