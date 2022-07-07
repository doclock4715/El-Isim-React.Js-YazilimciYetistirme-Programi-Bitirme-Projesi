const CartReducer = (state, action) => {
    switch (action.type) {
      case "ADD": {
        return {
          cart: action.payload,
        };
      }
      case "DELETEALL": {
        return {
          cart: null,
        };
      }
      default:
        return state;
    }
  };
  
  export default CartReducer;