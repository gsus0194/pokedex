export const initialState = {
  page: 1,
  generation: {
    gen: "ALL",
    offset: 0,
    total: 898,
    pages: 75,
  },
  results: [],
  error: null,
};

const LIST_SUCCESS = "LIST_SUCCESS";
const LIST_ERROR = "LIST_SUCCESS";
const LIST_NEXT = "LIST_NEXT";
const SET_GEN = "SET_GEN";

export const getOffset = (page, offset) => page * 12 - 12 + offset;

const reducer = (state, action) => {
  switch (action.type) {
    case LIST_SUCCESS:
      return { ...state, ...action.payload };
    case LIST_NEXT:
      return { ...state, ...action.payload };
    case SET_GEN:
      return { ...state, ...action.payload };
    case LIST_ERROR:
      return {
        ...state,
        page: 1,
        generation: {
          gen: "ALL",
          offset: 0,
          total: 898,
          pages: 75,
        },
        results: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
