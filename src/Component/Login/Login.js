import React, { useContext } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';

const Login = () => {
  const [loggedIUser , setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };
    if(!firebase.apps.length){
        firebase.initializeApp(firebaseConfig);
    }
    

    const handleGoogleSignIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
    const credential = result.credential;
    const token = credential.accessToken;
    const {displayName , email} = result.user;
    const signedInUser = {name:displayName,email:email};
    setLoggedInUser(signedInUser);
    history.replace(from);
    console.log("Google=",result.user)
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.email;
    const credential = error.credential;
  });
    
    
       
    }

    const handleFacebookSignIn = () => {
      var fprovider = new firebase.auth.FacebookAuthProvider();
      firebase
  .auth()
  .signInWithPopup(fprovider)
  .then((result) => {
    var credential = result.credential;
    var accessToken = credential.accessToken;
    const {displayName , email} = result.user;
    const signedInUser = {name:displayName,email:email};
    setLoggedInUser(signedInUser);
    history.replace(from);
    console.log(result.user);
  })
  .catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;

    // ...
  });
    }
    return (
      <div style={{backgroundColor:'black',height:'1000px',display:'flex',justifyContent:'center',margin:"0px 5%"}}>
        <div style={{width:'350px',height:'200px',backgroundColor:'lightGray',color:'blue',marginTop:'200px',padding:'10px',borderRadius:'10px'}}>
             <h1 style={{display:'flex',justifyContent:'center'}}>Login form</h1>
             <button className="btn-primary" onClick={handleGoogleSignIn}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-google" viewBox="0 0 16 16">
  <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"/>
</svg> Google  Sign  in </button>
             
             <button style={{marginLeft:'12px'}} className="btn-primary" onClick={handleFacebookSignIn}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-facebook" viewBox="0 0 16 16">
  <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
</svg> Facebook Sign in</button>
        </div>
        </div>
    );
};

export default Login;