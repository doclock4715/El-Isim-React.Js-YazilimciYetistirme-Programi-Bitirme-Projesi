import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../login/Login.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from 'C:/Users/doclo/el-isim/src/firebase.js';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Stack } from 'react-bootstrap';
import { useContext } from "react";
import { AuthContext } from '../../context/AuthContext';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import GoogleButton from 'react-google-button'

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate()

    const { dispatch } = useContext(AuthContext)

    const handleLogin = (e) => {
        e.preventDefault();

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                dispatch({ type: "LOGIN", payload: user })
                navigate("/")
            })
            .catch((error) => {
                const errorMessage = error.message;
                console.log(errorMessage)
            });
    }

    const handleGoogleLogin = () => {
        const provider = new GoogleAuthProvider();
        const auth = getAuth();
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                /* const credential = GoogleAuthProvider.credentialFromResult(result); */
                /*  const token = credential.accessToken; */
                // The signed-in user info.
                const user = result.user;
                // ...
                dispatch({ type: "LOGIN", payload: user })
                navigate("/")
            }).catch((error) => {
                // Handle Errors here.
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
                console.log(errorMessage)
                console.log(email)
                console.log(credential)
            });
    }

    return (
        <div className='login'>
            <Form >
                <h2>Login Screen</h2>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" onChange={e => setEmail(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                </Form.Group>
                <Stack direction="horizontal" gap={3}>
                    <Button variant="primary" type="submit" onClick={handleLogin}>
                        Submit
                    </Button>
                    <Form.Text className="text-muted ">
                        Don't have an account?
                    </Form.Text>
                    <Button href="/signup" variant="link">Sign Up</Button>
                </Stack>
                <hr />
                <GoogleButton
                    onClick={handleGoogleLogin}
                />
            </Form>
        </div>
    )
}

export default Login