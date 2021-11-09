import { RootState } from "./reducer";

export const getSelectedCountryId = (state: RootState) => state.countryId;
export const getSelectedStatistic = (state: RootState) => state.statistic;