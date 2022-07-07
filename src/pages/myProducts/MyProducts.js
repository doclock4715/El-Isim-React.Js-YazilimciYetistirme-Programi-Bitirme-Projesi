import React, { useState, useEffect, useContext } from 'react'
import Header from "../../components/header/Header"
//
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase"
//
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"

import { doc, deleteDoc } from "firebase/firestore";
//
import { AuthContext } from "../../context/AuthContext";
//
import "../myProducts/MyProducts.css"
//
import { toast } from 'react-toastify';

const MyProducts = () => {



    const [myProducts, setMyProducts] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const { currentUser } = useContext(AuthContext)


    useEffect(() => {
        const fetchData = async () => {
            let list = []
            try {
                const querySnapshot = await getDocs(collection(db, "products"));
                querySnapshot.forEach((doc) => {
                    list.push({ id: doc.id, ...doc.data() });
                });
                setMyProducts(list.filter((item) => item.userId === currentUser.uid));
                setIsLoading(false)
            } catch (error) {
                console.log(error)
            }
        }

        fetchData()
    }, [])

    const handleDelete = async (product) => {
        await deleteDoc(doc(db, "products", product.id));
        setMyProducts(myProducts.filter((item) => item.id !== product.id));
        toast.success(`${product.title} deleted successfully`, {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
        });
    }

    let renderProducts = myProducts.map((product, index) => {
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
                        <Button onClick={() => handleDelete(product)} variant="danger" >Delete</Button>
                    </div>
                </Card.Body>
            </Card>
        );
    })

    return (
        <div> <Header></Header>
        <div className='my-products'>
        {isLoading ? <div className="loading">Loading...</div> : renderProducts}

        </div>
        </div>
    )
}

export default MyProducts