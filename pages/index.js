import Head from "next/head";
import Router from "next/router";
import { firebase, auth } from "../config/firebase";

const LoginPage = () => {
  const user = firebase.auth().currentUser;
  return (
    <div>
      {user ? (
        <div>
          <div>{user.displayName}</div>
          <button
            onClick={() => {
              Router.push("/dashboard");
            }}
          >
            DashBoard
          </button>
          <button onClick={signout}>Signout</button>
        </div>
      ) : (
        <button onClick={signin}>Sign In</button>
      )}
    </div>
  );
};

const signin = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const token = result.credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // ...
      Router.push("/dashboard");
    })
    .catch(function (error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      const credential = error.credential;
      // ...
    });
};

const signout = () => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      Router.push("/");
    })
    .catch(function (error) {
      // An error happened.
    });
};

export default LoginPage;
