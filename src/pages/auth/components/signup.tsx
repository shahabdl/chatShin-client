import { gql } from "@apollo/client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import apolloClient from "shb/components/apollo-client";
import Loading from "shb/components/ui/loading";
import { setAuthState } from "shb/store/authSlice";
const SIGN_UP = gql`
  mutation SignUp($email: String, $password: String) {
    signUp(email: $email, password: $password) {
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
const Signup = () => {
  const [userData, setUserData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const inputChangeHandler = (value: string, type: "email" | "password") => {
    if (type === "email") {
      setUserData({ email: value, password: userData.password });
    } else {
      setUserData({ email: userData.email, password: value });
    }
  };
  const submitHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (userData.email !== "" && userData.password !== "") {
      setLoading(true);
      const { data } = await apolloClient.mutate({
        mutation: SIGN_UP,
        variables: { email: userData.email, password: userData.password },
      });
      if (data.signUp.success) {
        dispatch(
          setAuthState({
            token: data.signUp.user.userAccessToken,
            email: data.signUp.user.email,
            id: data.signUp.user.id,
            username: data.signUp.user.username,
          })
        );
      }
      setLoading(false);
    }
  };
  return (
    <div className="bg-zinc-800 p-4 rounded-lg">
      <h1 className="mb-3 border-b-[1px] border-b-zinc-500 pb-2">Sign up</h1>
      <div>
        <input
          className="text-white border-[1px] bg-transparent h-[35px] px-2 rounded-lg border-zinc-500 focus-visible:outline-none focus-visible:bg-zinc-900 transition-colors"
          name="email"
          type="email"
          placeholder="Email"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            inputChangeHandler(e.currentTarget.value, "email")
          }
        />
      </div>
      <div className="mt-3">
        <input
          className="text-white border-[1px] bg-transparent h-[35px] px-2 rounded-lg border-zinc-500 focus-visible:outline-none focus-visible:bg-zinc-900 transition-colors"
          name="password"
          type="password"
          placeholder="Password"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            inputChangeHandler(e.currentTarget.value, "password")
          }
        />
      </div>
      <button
        className="mt-3 bg-zinc-900 px-4 py-2 rounded-lg w-full hover:bg-zinc-950 transition-colors grid grid-cols-5 h-[45px]"
        onClick={submitHandler}
      >
        {loading ? (
          <div className="col-span-1">
            <Loading />
          </div>
        ) : (
          ""
        )}
        <span className="col-span-3 col-start-2">Sign up</span>
      </button>
    </div>
  );
};

export default Signup;
