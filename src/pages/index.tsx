import { useDispatch, useSelector } from "react-redux";
import Auth from "./auth";
import { selectAuthState, setAuthState } from "shb/store/authSlice";
import { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import apolloClient from "shb/components/apollo-client";
import Loading from "shb/components/ui/loading";

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
            fetchPolicy: 'network-only'
          });
          console.log(data);
          
          if (!error) {
            if (data && data.authToken.success) {
              console.log(data);
              
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

  return (
    <div className="grid items-center justify-center h-[100vh] content-center">
      {loggedIn ? (
        <>
          {authState.username !== "" && authState.username !== undefined ? (
            <div>logged in</div>
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
