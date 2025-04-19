import { HTTP_STATUSES } from "../constants";

import { CarType, WinnerType } from "./interfaces";

export type CarCreateUpdateModel = Omit<CarType, "id">;
export type WinnerUpdateModel = Omit<WinnerType, "id">;
export type GetItems<T> = { items: T[]; totalCount: number };

type HttpStatusKeys = keyof typeof HTTP_STATUSES;
export type HttpStatusType = (typeof HTTP_STATUSES)[HttpStatusKeys];
