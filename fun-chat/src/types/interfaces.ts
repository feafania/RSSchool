import { MessageVariant, PageType } from "./enum";
import { ValidationType } from "./types";

type ControlBase = {
  type: string;
  label: string;
  name: string;
  placeholder: string;
  id: string;
  class: string;
  disabled: boolean;
  required: boolean;
  validation: ValidationType;
};

export type ControlConfig = Partial<ControlBase>;

export interface StorageItem {
  key: string;
  value: string;
}

export interface NavType {
  label: string;
  page: PageType;
  visible: boolean;
}

export interface ModalOptions {
  onOk?: () => void;
  onCancel?: () => void;
  showCancel?: boolean;
}

export interface WSRequest<T = undefined> {
  id: string | null;
  type: MessageVariant;
  payload?: T;
}

export interface UserType {
  login: string;
  password?: string;
  isLogined?: boolean;
}

export interface ChatMessage {
  id: string;
  from?: string;
  to?: string;
  text?: string;
  datetime?: number;
  status?: {
    isDelivered?: boolean;
    isReaded?: boolean;
    isEdited?: boolean;
    isDeleted?: boolean;
  };
}
