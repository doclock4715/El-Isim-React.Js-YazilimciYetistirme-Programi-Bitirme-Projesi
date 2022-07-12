import React from 'react'
import "../signUp/SignUp.css"
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { auth } from '../../firebase.js'
import { useState } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
//
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase"
//
import { useContext } from "react";
import { AuthContext } from '../../context/AuthContext';

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [data, setData] = useState({});
    const { dispatch } = useContext(AuthContext)

    const navigate = useNavigate()

    const handleInput = (e) => {
        const id = e.target.id;
        const value = e.target.value;
        setData({ ...data, [id]: value });
    }

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const res = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            )
            const user = res.user;
            dispatch({ type: "LOGIN", payload: user })
            navigate("/") 
            await setDoc(doc(db, "users", res.user.uid), {
                ...data,
                timeStamp: serverTimestamp(),
            });

        } catch (err) {
            console.log(err);
        }
    };
    return (
        <div className='signup'>
            <Form>
                <h2>Signup Screen</h2>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="name" >
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Name" onChange={handleInput} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="surname">
                        <Form.Label>Surname</Form.Label>
                        <Form.Control type="text" placeholder="Surname" onChange={handleInput} />
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" onChange={e => setEmail(e.target.value)} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                    </Form.Group>
                </Row>

                <Form.Group className="mb-3" controlId="address">
                    <Form.Label>Address</Form.Label>
                    <Form.Control placeholder="1234 Main St" onChange={handleInput} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="address2">
                    <Form.Label>Address 2</Form.Label>
                    <Form.Control placeholder="Apartment, studio, or floor" onChange={handleInput} />
                </Form.Group>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="city">
                        <Form.Label>City</Form.Label>
                        <Form.Control onChange={handleInput} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="zipCode">
                        <Form.Label>Zip</Form.Label>
                        <Form.Control onChange={handleInput} />
                    </Form.Group>
                </Row>

                <Button variant="primary" type="submit" onClick={handleSignUp}>
                    Submit
                </Button>
            </Form>
        </div>

    );
}

export default SignUp;