
const initialState = {
  selectedStateId: null,
  selectedStatistic: 'none',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'select-country':
      return Object.assign({}, state, { selectedStateId: action.data.id });
    case 'statistic-selected':
      return Object.assign({}, state, { selectedStatistic: action.data });
    default:
      return state;
  }
};

export default reducer;
