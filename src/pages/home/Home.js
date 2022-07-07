import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import "../home/Home.css"
//
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase"
//
import Header from "../../components/header/Header"
//
import Card from "react-bootstrap/Card"
//
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
//
import { CartContext } from '../../context/CartContext';
//
import { toast } from 'react-toastify';

const Home = () => {


    const [data, setData] = useState([])

    const { currentUser } = useContext(AuthContext)

    const { cart } = useContext(CartContext)

    const { dispatch } = useContext(CartContext)

    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            let list = []
            try {
                const querySnapshot = await getDocs(collection(db, "products"));
                querySnapshot.forEach((doc) => {
                    list.push({ id: doc.id, ...doc.data() });
                });
                setData(list)
                setIsLoading(false)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [])



    const handleBuy = (product) => {
        const list = cart ? cart : []
        var addedItem = list.find(c => c.product.id === product.id)
        if (addedItem) {
            addedItem.quantity += 1
            toast.success(`${product.title} increased to ${addedItem.quantity} items successfully`, {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });

        } else {
            list.push({ product: product, quantity: 1 })
            toast.success(`${product.title} added to the cart successfully`, {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
        }
        dispatch({ type: "ADD", payload: list })
    }

    let renderProducts = data.map((product, index) => {
        return (
            <Card key={index} style={{ width: '16rem', margin: 8 }}>
                <Card.Img style={{ height: '12rem', width: '16rem', marginLeft: 'auto', marginRight: 'auto', padding: 5 }} variant="top" src={product.img} alt={product.title} />
                <Card.Body>
                    <Card.Title> {product.title}</Card.Title>
                    <Card.Text>
                        {product.details}
                    </Card.Text>
                    <Card.Text>
                        {product.price}$
                    </Card.Text>
                    <Card.Text>
                        Seller: {product.seller}
                    </Card.Text>
                    <div className='cart-bottom'>
                        {currentUser ?
                            <Button onClick={() => handleBuy(product)} variant="primary">Buy</Button>
                            : <Button onClick={() => toast.error('In order to buy, you must first log in', {
                                position: "top-center",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: false,
                                draggable: true,
                                progress: undefined,
                            })} variant="primary" >Buy</Button>}
                    </div>

                </Card.Body>
            </Card>
        );
    })



    return (
        <div className='homeBody'>
            <Header></Header>
            <div className='home'>
                {isLoading ?<div className="loading">Loading...</div> : renderProducts}
            </div>
        </div>

    );
}

export default Home