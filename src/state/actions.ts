import { action } from "typesafe-actions";

export const SELECT_COUNTRY = 'SELECT_COUNTRY';
export const selectCountry = (id: string) => action(SELECT_COUNTRY, id);
export const SELECT_STATISTIC = 'SELECT_STATISTIC';
export const selectStatistic = (id: string) => action(SELECT_STATISTIC, id);