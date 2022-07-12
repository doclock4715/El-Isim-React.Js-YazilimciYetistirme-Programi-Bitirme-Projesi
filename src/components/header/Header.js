import {
    Navbar,
    Container,
    Nav,
    Form,
    Button,
    ButtonGroup,
    NavDropdown,
    Badge
} from 'react-bootstrap';
import React from 'react'
import logo from "../../assets/images/header.png"
import "../../components/header/Header.css"
//
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from 'react-router-dom'
//
import { signOut } from "firebase/auth";
import { auth } from '../../firebase.js'
//
import { CartContext } from '../../context/CartContext';
//
import { toast } from 'react-toastify';
//
import { useNavigate } from 'react-router-dom';

const Header = () => {

    const { currentUser } = useContext(AuthContext)
    const { dispatch } = useContext(AuthContext)


    const { cart } = useContext(CartContext)


    const navigate = useNavigate()

    //logout function
    const handleLogout = (e) => {
        e.preventDefault();
        signOut(auth).then(() => {
            dispatch({ type: "LOGOUT", payload: null })
            navigate("/")
            // Sign-out successful. Local Storage cleared
        }).catch((error) => {
            // An error happened.
            console.log(error)
        });
    }

    let renderCart = cart ? cart.map((cartItem, index) => {
        return (
            <NavDropdown.Item
                key={index}
                className="d-flex justify-content-between align-items-start"
            >
                <div className="fw-bold">{cartItem.product.title}</div>
                <Badge bg="primary" pill>
                    {cartItem.quantity}
                </Badge>
            </NavDropdown.Item>
        )
    }) : null




    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container fluid>
                <Navbar.Brand href="/">
                    <img
                        alt="header-img"
                        src={logo}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                        style={{ marginRight: '13px' }}
                    />
                    El İşim
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Form className="mx-3">
                            {currentUser ?
                                <ButtonGroup>
                                    <Button variant="secondary" onClick={handleLogout}>Log out</Button>
                                    <Button variant="secondary" as={Link} to="/myProducts">My Products</Button>
                                </ButtonGroup>
                                :
                                <ButtonGroup>
                                    <Button variant="secondary" as={Link} to="/login">Log in</Button>
                                    <Button variant="secondary" as={Link} to="/signup">Sign up</Button>
                                </ButtonGroup>
                            }
                        </Form>
                        <Navbar.Text>
                            {currentUser ? " Signed in as: " + currentUser.email : null}
                        </Navbar.Text>
                    </Nav>

                    <NavDropdown title={"Cart " + cart.length} id="collasible-nav-dropdown" >
                        {renderCart}
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="cart">Go to cart</NavDropdown.Item>
                    </NavDropdown>
                    {currentUser
                        ? <Button href='/addProduct' color="success"> Add Product</Button>
                        : <Button onClick={() => toast.error('You must first log in', {
                            position: "top-center",
                            autoClose: 4000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: false,
                            draggable: true,
                            progress: undefined,
                        })} color="success">Add Product</Button>
                    }
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header
