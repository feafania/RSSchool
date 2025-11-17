import Car from "../entities/car";

import { SortOrder, WinnerSortFields } from "./enum";

export interface CarType {
  id: number;
  name: string;
  color: string;
}

export interface WinnerType {
  id: number;
  wins: number;
  time: number;
}

export interface WinnerRow extends WinnerType {
  num: number;
}

export interface GetWinnersOptions {
  page?: number;
  sort?: WinnerSortFields;
  order?: SortOrder;
}

export interface EngineStartResponse {
  velocity: number;
  distance: number;
}

export interface EngineDriveResponse {
  success: boolean;
  broke: boolean;
  drive: boolean;
}

export interface RaceResponse {
  car: Car;
  time: number;
}

export interface ControlConfig {
  name?: string;
  id?: string;
  class?: string;
  disabled?: boolean;
}

export interface PaginationState {
  currentPage: number;
  totalCount: number;
  page: string;
  totalPages(): number;
  incrementPage(): void;
  decrementPage(): void;
  refreshTotalCount(): void;
}

export interface StorageItem {
  key: string;
  value: string;
}
