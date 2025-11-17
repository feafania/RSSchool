import { ChatMessage, UserType, WSRequest } from "../types/interfaces";

export function isUserMessage(
  response: WSRequest<unknown>,
): response is WSRequest<{ user: UserType }> {
  if (!response.payload || typeof response.payload !== "object") {
    return false;
  }
  return "user" in response.payload;
}

export function isUserListMessage(
  response: WSRequest<unknown>,
): response is WSRequest<{ users: UserType[] }> {
  return (
    typeof response.payload === "object" &&
    response.payload !== null &&
    "users" in response.payload &&
    Array.isArray(response.payload.users)
  );
}

export function isChatMessage(
  response: WSRequest<unknown>,
): response is WSRequest<{ message: ChatMessage }> {
  if (!response.payload || typeof response.payload !== "object") {
    return false;
  }
  return "message" in response.payload;
}

export function isChatListMessage(
  response: WSRequest<unknown>,
): response is WSRequest<{ messages: ChatMessage[] }> {
  return (
    typeof response.payload === "object" &&
    response.payload !== null &&
    "messages" in response.payload &&
    Array.isArray(response.payload.messages)
  );
}

export function isErrorMessage(
  response: WSRequest<unknown>,
): response is WSRequest<{ error: string }> {
  if (!response.payload || typeof response.payload !== "object") {
    return false;
  }
  return "error" in response.payload;
}
