export const initialState = {
  page: 1,
  results: [],
};

const LIST_SUCCESS = "LIST_SUCCESS";
const LIST_ERROR = "LIST_SUCCESS";
const LIST_NEXT = "LIST_NEXT";

const reducer = (state, action) => {
  switch (action.type) {
    case LIST_SUCCESS:
      // console.log("success");
      return { ...state, ...action.payload };
    case LIST_NEXT:
      // console.log("next>>>", action.payload);
      return { ...state, ...action.payload };
    case LIST_ERROR:
      return console.log(action.payload);
    default:
      return state;
  }
};

export default reducer;
