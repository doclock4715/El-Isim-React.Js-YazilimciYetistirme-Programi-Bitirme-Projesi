import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import { Button } from 'react-bootstrap'
import { Container } from 'react-bootstrap';
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import '../../pages/cart/Cart.css'
import { BsTrash } from 'react-icons/bs';

const Cart = () => {

  const { cart } = useContext(CartContext)
  
  const { dispatch } = useContext(CartContext)

  let total = 0

  const handleTotal = (a, b) => {
    total += a * b
  }

  let renderCart = cart ? cart.map((cartItem, index) => {
    return (
      <ListGroup.Item
        key={index}
        as="li"
        className="d-flex justify-content-between align-items-start"
      >
        <img className='cart-img' src={cartItem.product.img} alt={cartItem.product.title} />
        <div className="ms-2 me-auto">
          <div className="fw-bold">{cartItem.product.title}</div>
          {cartItem.product.details}
        </div>

        <div>
          <div className='right' >
            <Badge bg="primary" pill>
              {cartItem.quantity}
            </Badge>
          </div>
          {cartItem.quantity}*{cartItem.product.price}={cartItem.quantity * cartItem.product.price}$
          {handleTotal(cartItem.quantity, cartItem.product.price)}
        </div>

      </ListGroup.Item>
    );
  }) : null

  const handleDeleteAll = () => {
    dispatch({ type: "DELETEALL" })
  }

  return (
    <div>
      <Container>
        <div className='cart-top'>
          <h1>My Cart</h1>
          <Button className="mb-1 mt-1" onClick={handleDeleteAll} variant="danger"><BsTrash /></Button>
        </div>
        <ListGroup as="ul" >
          {renderCart}
        </ListGroup>
        <hr />
        <div className='total'>
          <div className="fw-bold">Amount to be paid:</div> 
           &nbsp; {/* to give 1 space */}
          <div>{total}$</div>
        </div>
      </Container>

    </div>


  )
}

export default Cart