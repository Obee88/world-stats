
const initialState = {
  selectedStateId: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'select-country':
      return Object.assign({}, state, { selectedStateId: action.data.id });
    default:
      return state;
  }
};

export default reducer;
