import translations from "../constants/interfaces";

import { ChatMessage, WSRequest } from "./interfaces";
import { MessageVariant } from "./enum";

export type ValidationType = { pattern: RegExp; message: string };

export type MessageHandler = (response: WSRequest) => void;
export type MessageHandlerType = Partial<
  Record<MessageVariant, MessageHandler>
>;
export type StatusKeys = keyof NonNullable<ChatMessage["status"]>;

export type Listener = () => void;

export type LanguageCode = keyof typeof translations;
