import { useDispatch, useSelector } from "react-redux";
import Auth from "./auth";
import { logoutUser, selectAuthState, setAuthState } from "shb/store/authSlice";
import { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import apolloClient from "shb/components/apollo-client";
import Loading from "shb/components/ui/loading";

const Home = () => {
  const authState = useSelector(selectAuthState);
  const dispatch = useDispatch();
  const [loggedIn, setLoggedIn] = useState(false);
  const [checkingUserAuth, setCheckingUserAuth] = useState(true);

  /**
   * checking token authentication
   */
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
          fetchPolicy: "network-only",
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
    if (authState.token === "" || authState.username === "") {
      setLoggedIn(false);
    } else {
      setLoggedIn(true);
    }
  }, [authState]);

  const logoutHandler = () =>{
    dispatch(logoutUser());    
  }  

  return (
    <div className="grid items-center justify-center h-[100vh] content-center">
      {loggedIn ? (
        <>
          {authState.username !== "" && authState.username !== undefined ? (
            <div className="flex gap-4">
              <div>
                logged in as <span>{authState.username}</span>
              </div>
              <button
                onClick={logoutHandler}
                className="bg-zinc-700 py-2 px-4 w-full rounded-lg"
              >
                Logout
              </button>
            </div>
          ) : (
            <div>need username</div>
          )}
        </>
      ) : (
        <>{checkingUserAuth ? <Loading /> : <Auth />}</>
      )}
    </div>
  );
};

export default Home;
