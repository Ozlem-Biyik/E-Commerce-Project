// Initial state
const initialState = {
  cart: [], // [{count: Number, checked: Boolean, product: Object}]
  payment: null,
  address: null
};

// Action types
export const SET_CART = 'SET_CART';
export const SET_PAYMENT = 'SET_PAYMENT';
export const SET_ADDRESS = 'SET_ADDRESS';

// Action creators
export const setCart = (cart) => ({
  type: SET_CART,
  payload: cart
});

export const setPayment = (payment) => ({
  type: SET_PAYMENT,
  payload: payment
});

export const setAddress = (address) => ({
  type: SET_ADDRESS,
  payload: address
});

// Reducer
const shoppingCartReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CART:
      return {
        ...state,
        cart: action.payload
      };
    case SET_PAYMENT:
      return {
        ...state,
        payment: action.payload
      };
    case SET_ADDRESS:
      return {
        ...state,
        address: action.payload
      };
    default:
      return state;
  }
};

export default shoppingCartReducer; 