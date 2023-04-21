import { useDispatch, useSelector } from "react-redux";
import Auth from "./auth/auth";
import { selectAuthState, setAuthState } from "shb/store/authSlice";
import { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import apolloClient from "shb/components/apollo-client";

const Home = () => {
  const authState = useSelector(selectAuthState);
  const dispatch = useDispatch();
  const [loggedIn, setLoggedIn] = useState(false);
  const [checkingUserAuth, setCheckingUserAuth] = useState(true);
  useEffect(() => {
    (async () => {
      const token = window.localStorage.getItem("_access_token");
      if (token) {
        const AUTH_TOKEN = gql`
          query AuthToken($token: String) {
            authToken(token: $token) {
              error
              success
              user {
                email
                id
                userAccessToken
                username
              }
            }
          }
        `;
        const { data, error } = await apolloClient.query({
          query: AUTH_TOKEN,
          variables: { token },
        });
        if (!error) {
          if (data && data.authToken.success) {
            dispatch(
              setAuthState({
                token: data.authToken.user.userAccessToken,
                id: data.authToken.user.id,
                email: data.authToken.user.email,
                username: data.authToken.user.username,
              })
            );
            setLoggedIn(true);
          }
        }
      }
      setCheckingUserAuth(false);
    })();
  }, []);

  useEffect(() => {
    if (authState.token === "") {
      setLoggedIn(false);
    } else {
      setLoggedIn(true);
    }
  }, [authState]);

  return (
    <div>
      {loggedIn ? (
        <>
          {authState.username ? <div>logged in</div> : <div>need username</div>}
        </>
      ) : (
        <>{checkingUserAuth ? <p>Chcking User</p> : <Auth />}</>
      )}
    </div>
  );
};

export default Home;
