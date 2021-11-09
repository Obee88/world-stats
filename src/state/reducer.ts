import { createReducer, PayloadAction } from 'typesafe-actions';
import { SELECT_COUNTRY, SELECT_STATISTIC } from './actions';

export interface RootState {
  countryId: string | null,
  statistic: string,
}

const initialState = {
  countryId: null,
  statistic: 'average temperature',
};

const reducer = createReducer<RootState>(initialState)
  .handleType(SELECT_COUNTRY, (state: RootState, action: PayloadAction<string, string>) => ({
    ...state,
    countryId: action.payload,
  }))
  .handleType(SELECT_STATISTIC, (state: RootState, action: PayloadAction<string, string>) => ({
    ...state,
    statistic: action.payload,
  }));

export default reducer;
