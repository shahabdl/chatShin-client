import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthState, setAuthState } from "shb/store/authSlice";

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
// if (!error && data) {
//     if (data.signIn.user.userAccessToken) {
//       dispatch(
//         setAuthState({
//           token: data.signIn.user.userAccessToken,
//           id: data.signIn.user.id,
//           email: data.signIn.user.email,
//           username: data.signIn.user.username,
//         })
//       );
//     }
//   }
const Auth = () => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const { loading, error, data } = useQuery(LOGIN, {
    variables: { email: loginData.email, password: loginData.password },
  });


  return (
    <div>
        
      
    </div>
  );
};

export default Auth;
