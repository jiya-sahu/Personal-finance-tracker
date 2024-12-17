import React, {useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import Input from "../Input/index.js";
import Button from "../Button/index.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db ,provider} from "../../Firebase.js";
import { toast } from "react-toastify";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

function SignupSigninComponent() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginform, setLoginform] = useState(false);
  const navigate = useNavigate();



  async function createDoc(user) {
    //make sure that doc with uid doesnt
    setLoading(true);
    if (!user) return;

    const userRef = doc(db, "users", user.uid);
    const userdata = await getDoc(userRef);
    if (!userdata.exists()) {

      const { displayName, email, photoURL } = user;
      try {
        await setDoc(userRef, {
          name: displayName ? displayName : name,
          email,
          photoURL: photoURL ? photoURL : "",
          createdAt: new Date(),
        });

        toast.success("Account created");
        setLoading(false);
      } catch (e) {
        toast.error(e.message);
        setLoading(false);
      }
    }
  }


  function signupUsingEmail() {
    setLoading(true);
    console.log(`Name : ${name} Email :${email} Password:${password} `);
    if (name != "" && email != "" && password != "" && confirmPassword != "") {
      if (password == confirmPassword) {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed up
            const user = userCredential.user;
            console.log("User>>", user);
            toast.success("SignedUp Successfully");
            setLoading(false);
            setName("");
            setPassword("");
            setPassword("");
            setEmail("");
            setconfirmPassword("");
            //create a doc with user id as the following id
            createDoc(user);
            navigate("/dashboard");
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            toast.error(errorMessage);
            setLoading(false);
            // ..
          });
      } else {
        toast.error("passwords dont match");
      }
    } else {
      toast.error("All fields are mandatory");
      setLoading(false);
    }
  }
  function signupUsingGoogle() {
    setLoading(true);
    try {
      signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log("User>>", user);
        // IdP data available using getAdditionalUserInfo(result)
        toast.success("Signed Up Successfully");
        setLoading(false);
        createDoc(user);
        
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        setLoading(false);
        
      });
    } catch (e) {
      toast.error(e);
      setLoading(false);
    }
    console.log(`Name : ${name} Email :${email} Password:${password} `);

    
  }

  
  function loginUsingEmail() {
    setLoading(true);
    if (email != "" && password != "") {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          toast.success("Logged In Successfully");
          setLoading(false);
          console.log("User Logged in ", user);
          navigate("/dashboard");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          toast.error(errorMessage);
          setLoading(false);
        });
    } else {
      toast.error("All fields are mandatory");
      setLoading(false);
    }
  }

  async function loginUsingGoogle() {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      await createDoc(user);
      toast.success("User Authenticated Successfully!");
      setLoading(false);
      navigate("/dashboard");
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
      console.error("Error signing in with Google: ", error.message);
    }
  }
  return (
    <>
      {loginform ? (
        <>
          <div className="signup-wrapper">
            <h2 className="title">
              Login Up on{" "}
              <span style={{ color: "var(--theme)" }}>Financely</span>
            </h2>
            <form>
              <Input
                label={"Email"}
                type={"email"}
                state={email}
                setState={setEmail}
                placeholder={"johndoe@gmail.com"}
              />
              <Input
                label={"Password"}
                type={"password"}
                state={password}
                setState={setPassword}
                placeholder={"example123"}
              />
              <Button
                disabled={loading}
                text={loading ? "Loading..." : "Login using email and password"}
                onClick={loginUsingEmail}
              />
              <p className="p-login">or</p>
              <Button
                text={loading ? "Loading..." : "Login using google"}
                blue={true}
                onClick={loginUsingGoogle}
              />
              <p className="p-login" onClick={() => setLoginform(!loginform)}>
                Or Don't have an account ? Click here
              </p>
            </form>
          </div>
        </>
      ) : (
        <>
          <div className="signup-wrapper">
            <h2 className="title">
              Sign Up on{" "}
              <span style={{ color: "var(--theme)" }}>Financely</span>
            </h2>
            <form>
              <Input
                label={"Full Name"}
                type={"text"}
                state={name}
                setState={setName}
                placeholder={"John Doe"}
              />

              <Input
                label={"Email"}
                type={"email"}
                state={email}
                setState={setEmail}
                placeholder={"johndoe@gmail.com"}
              />
              <Input
                label={"Password"}
                type={"password"}
                state={password}
                setState={setPassword}
                placeholder={"example123"}
              />
              <Input
                label={"Confirm Password"}
                type={"password"}
                state={confirmPassword}
                setState={setconfirmPassword}
                placeholder={"example123"}
              />
              <Button
                disabled={loading}
                text={
                  loading ? "Loading..." : "SignUp using email and password"
                }
                onClick={signupUsingEmail}
              />
              <p className="p-login">or</p>
              <Button
                text={loading ? "Loading..." : "SignUp using google"}
                blue={true}
                onClick={signupUsingGoogle}
              />
              <p className="p-login" onClick={() => setLoginform(!loginform)}>
                Or Have an account already? Click Here
              </p>
            </form>
          </div>
        </>
      )}
    </>
  );
}

export default SignupSigninComponent;
