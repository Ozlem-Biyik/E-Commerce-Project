// Initial state
const initialState = {
  user: null,
  addressList: [],
  creditCards: [],
  roles: [],
  theme: 'light',
  language: 'tr',
  wishlist: [], // Array of product IDs
};

// Action types
export const SET_USER = 'SET_USER';
export const SET_ROLES = 'SET_ROLES';
export const SET_THEME = 'SET_THEME';
export const SET_LANGUAGE = 'SET_LANGUAGE';
export const ADD_TO_WISHLIST = 'ADD_TO_WISHLIST';
export const REMOVE_FROM_WISHLIST = 'REMOVE_FROM_WISHLIST';
export const SET_WISHLIST = 'SET_WISHLIST';

// Action creators
export const setUser = (user) => ({
  type: SET_USER,
  payload: user
});

export const setRoles = (roles) => ({
  type: SET_ROLES,
  payload: roles
});

export const setTheme = (theme) => ({
  type: SET_THEME,
  payload: theme
});

export const setLanguage = (language) => ({
  type: SET_LANGUAGE,
  payload: language
});

export const addToWishlist = (productId) => ({
  type: ADD_TO_WISHLIST,
  payload: productId
});

export const removeFromWishlist = (productId) => ({
  type: REMOVE_FROM_WISHLIST,
  payload: productId
});

export const setWishlist = (wishlist) => ({
  type: SET_WISHLIST,
  payload: wishlist
});

// Reducer
const clientReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload
      };
    case SET_ROLES:
      return {
        ...state,
        roles: action.payload
      };
    case SET_THEME:
      return {
        ...state,
        theme: action.payload
      };
    case SET_LANGUAGE:
      return {
        ...state,
        language: action.payload
      };
    case ADD_TO_WISHLIST:
      if (state.wishlist.includes(action.payload)) {
        return state; // Already in wishlist
      }
      return {
        ...state,
        wishlist: [...state.wishlist, action.payload]
      };
    case REMOVE_FROM_WISHLIST:
      return {
        ...state,
        wishlist: state.wishlist.filter(id => id !== action.payload)
      };
    case SET_WISHLIST:
      return {
        ...state,
        wishlist: action.payload
      };
    default:
      return state;
  }
};

export default clientReducer;