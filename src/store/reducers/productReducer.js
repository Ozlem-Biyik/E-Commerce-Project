// Initial state
const initialState = {
  categories: [],
  productList: [],
  total: 0,
  limit: 25,
  offset: 0,
  filter: '',
  fetchState: 'NOT_FETCHED', // One of "NOT_FETCHED", "FETCHING", "FETCHED", "FAILED"
  reviews: {}, // Reviews by product ID: { productId: [reviewObjects] }
};

// Action types
export const SET_CATEGORIES = 'SET_CATEGORIES';
export const SET_PRODUCT_LIST = 'SET_PRODUCT_LIST';
export const SET_TOTAL = 'SET_TOTAL';
export const SET_FETCH_STATE = 'SET_FETCH_STATE';
export const SET_LIMIT = 'SET_LIMIT';
export const SET_OFFSET = 'SET_OFFSET';
export const SET_FILTER = 'SET_FILTER';
export const ADD_REVIEW = 'ADD_REVIEW';
export const SET_REVIEWS = 'SET_REVIEWS';

// Action creators
export const setCategories = (categories) => ({
  type: SET_CATEGORIES,
  payload: categories
});

export const setProductList = (productList) => ({
  type: SET_PRODUCT_LIST,
  payload: productList
});

export const setTotal = (total) => ({
  type: SET_TOTAL,
  payload: total
});

export const setFetchState = (fetchState) => ({
  type: SET_FETCH_STATE,
  payload: fetchState
});

export const setLimit = (limit) => ({
  type: SET_LIMIT,
  payload: limit
});

export const setOffset = (offset) => ({
  type: SET_OFFSET,
  payload: offset
});

export const setFilter = (filter) => ({
  type: SET_FILTER,
  payload: filter
});

export const addReview = (productId, review) => ({
  type: ADD_REVIEW,
  payload: { productId, review }
});

export const setReviews = (productId, reviews) => ({
  type: SET_REVIEWS,
  payload: { productId, reviews }
});

// Reducer
const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CATEGORIES:
      return {
        ...state,
        categories: action.payload
      };
    case SET_PRODUCT_LIST:
      return {
        ...state,
        productList: action.payload
      };
    case SET_TOTAL:
      return {
        ...state,
        total: action.payload
      };
    case SET_FETCH_STATE:
      return {
        ...state,
        fetchState: action.payload
      };
    case SET_LIMIT:
      return {
        ...state,
        limit: action.payload
      };
    case SET_OFFSET:
      return {
        ...state,
        offset: action.payload
      };
    case SET_FILTER:
      return {
        ...state,
        filter: action.payload
      };
    case ADD_REVIEW:
      return {
        ...state,
        reviews: {
          ...state.reviews,
          [action.payload.productId]: [
            ...(state.reviews[action.payload.productId] || []),
            action.payload.review
          ]
        }
      };
    case SET_REVIEWS:
      return {
        ...state,
        reviews: {
          ...state.reviews,
          [action.payload.productId]: action.payload.reviews
        }
      };
    default:
      return state;
  }
};

export default productReducer; 