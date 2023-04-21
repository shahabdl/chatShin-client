import { gql } from "@apollo/client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import apolloClient from "shb/components/apollo-client";
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
  const dispatch = useDispatch();
  const authState = useSelector(selectAuthState);
  const saveUsernameHandler = async () => {
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
  };
  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.currentTarget.value);
  };

  return (
    <div>
      <p>Set Username:</p>
      <input
        name="username"
        placeholder="Username"
        onChange={inputChangeHandler}
      />
      <button onClick={saveUsernameHandler}>Save</button>
    </div>
  );
};

export default SetUsername;
