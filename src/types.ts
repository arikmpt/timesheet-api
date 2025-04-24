export type Nullable<T> = T | null;

export type DateDayFormat = `${number}${number}` | `${number}`;
export type DateMonthFormat = `${number}${number}` | `${number}`;
export type DateYearFormat = `${number}${number}${number}${number}`;

export type DateISOFormat = `${DateYearFormat}-${DateMonthFormat}-${DateDayFormat}`;
