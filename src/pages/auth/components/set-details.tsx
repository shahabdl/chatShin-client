import { gql } from "@apollo/client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import apolloClient from "shb/components/apollo-client";
import Loading from "shb/components/ui/loading";
import { selectAuthState, setAuthState } from "shb/store/authSlice";

const SET_USERNAME = gql`
  mutation CreateUsername($username: String) {
    createUsername(username: $username) {
      error
      success
      user {
        username
        userAccessToken
        id
        email
      }
    }
  }
`;

const SetUsername = () => {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const authState = useSelector(selectAuthState);
  const saveUsernameHandler = async () => {
    setLoading(true);
    if (username !== "") {
      const { data } = await apolloClient.mutate({
        mutation: SET_USERNAME,
        variables: { username },
        fetchPolicy: "network-only",
      });
      console.log(data);
      if (data.createUsername.success) {
        dispatch(
          setAuthState({
            id: data.createUsername.user.id,
            username: data.createUsername.user.username,
            email: data.createUsername.user.email,
            token: data.createUsername.user.userAccessToken,
          })
        );
      }
    }
    setLoading(false);
  };
  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.currentTarget.value);
  };

  return (
    <div className="bg-zinc-700 p-4 rounded-lg">
      <h1 className="mb-4 border-b-[1px] pb-4 font-light text-lg border-zinc-500">
        Set Username:
      </h1>
      <div className="block">
        <input
          className="w-full h-[35px] px-2 rounded-lg bg-transparent border-[1px] border-zinc-600 mb-3 focus-visible:outline-none focus-visible:bg-zinc-900 transition-colors font-light text-sm"
          name="username"
          placeholder="Username"
          onChange={inputChangeHandler}
        />
        <button
          className="w-full px-3 py-2 bg-zinc-900 rounded-lg hover:bg-zinc-950 transition-colors font-light text-sm grid items-center justify-center h-[45px] disabled:bg-zinc-600 disabled:text-zinc-700"
          onClick={saveUsernameHandler}
          disabled={loading}
        >
          {loading ? (
            <Loading />
          ) : (
            <span className="justify-center text-center">
              Save
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default SetUsername;
