import { gql } from "@apollo/client";
import Link from "next/link";
import { ChangeEvent, useEffect, useState } from "react";
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
  const [disableSubmitButton, setDisableSubmitButton] = useState(true);
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

  const changeHandler = (name: "email" | "password", value: string) => {
    if (name === "email") {
      setLoginData({ email: value, password: loginData.password });
    } else {
      setLoginData({ email: loginData.email, password: value });
    }
  };

  useEffect(() => {
    if (loginData.email === "" || loginData.password === "") {
      setDisableSubmitButton(true);
    } else {
      setDisableSubmitButton(false);
    }
  }, [loginData]);

  return (
    <div className="bg-zinc-700 p-4 rounded-lg ">
      <h1 className="mb-3 border-b-[1px] border-b-zinc-500 pb-2">Login</h1>
      <div>
        <input
          className="text-white border-[1px] bg-transparent h-[35px] px-2 rounded-lg border-zinc-500 focus-visible:outline-none focus-visible:bg-zinc-900 transition-colors"
          name="email"
          type="email"
          placeholder="Email"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            changeHandler("email", e.currentTarget.value)
          }
        />
      </div>
      <div className="mt-3">
        <input
          className="text-white border-[1px] bg-transparent h-[35px] px-2 rounded-lg border-zinc-500 focus-visible:outline-none focus-visible:bg-zinc-900 transition-colors"
          name="password"
          type="password"
          placeholder="Password"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            changeHandler("password", e.currentTarget.value)
          }
        />
      </div>

      <button
        className="mt-3 bg-zinc-900 px-4 py-2 rounded-lg w-full hover:bg-zinc-950 transition-colors grid items-center justify-center h-[45px] disabled:bg-zinc-600 disabled:text-zinc-700"
        onClick={submitHandler}
        disabled={loading || disableSubmitButton}
      >
        {loading ? <Loading /> : "Login"}
      </button>
      <div className="text-sm font-light mt-3">
        Dont have an account?{" "}
        <Link
          href="./?t=signup"
          className="text-blue-500 hover:text-blue-400 transition-colors"
        >
          Signup
        </Link>
      </div>
    </div>
  );
};

export default Login;
