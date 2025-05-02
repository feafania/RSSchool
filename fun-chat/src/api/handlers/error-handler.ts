import { WSRequest } from "../../types/interfaces";
import { isErrorMessage } from "../../utils/ws-guards";
import { wsClient } from "../websocket";
import showModalMessage from "../../views/common/elements/modal-window/modal-window";
import authStore from "../../store/auth-store";

const incorrectLoginErrors = new Set([
  "incorrect password",
  "there is no user with this login",
]);
const loginErrors = new Set([
  "the user was not authorized",
  "user not registered or not logged",
]);
const invalidRecipientErrors = new Set([
  "sender and recipient logins are the same",
  "the user with the specified login does not exist",
]);
const messageProcessingErrors = new Set([
  "incorrect message id",
  "user not recipient cannot be executed",
  "user not sender cannot be executed",
]);
const requestStructureErrors = new Set([
  "incorrect request structure",
  "incorrect type parameters",
  "incorrect payload parameters",
]);

export default function errorHandler(response: WSRequest<unknown>) {
  if (response.payload && isErrorMessage(response)) {
    const error = response.payload.error as string;
    // console.error("Error:", error);

    if (error === "another user is already authorized in this connection") {
      showModalMessage("Another user is already authorized.");
      wsClient.close();
    } else if (error === "a user with this login is already authorized") {
      if (wsClient.isLoggingOut || !authStore.user) {
        showModalMessage("A user with this login is already connected.");
        wsClient.close();
      }
    } else if (incorrectLoginErrors.has(error)) {
      showModalMessage("Incorrect login or password.");
      wsClient.close();
    } else if (loginErrors.has(error)) {
      showModalMessage("Authorization error. Please log in again.");
      wsClient.close();
    } else if (invalidRecipientErrors.has(error)) {
      showModalMessage("Invalid recipient user.");
    } else if (messageProcessingErrors.has(error)) {
      console.warn("Message processing error. Possibly outdated.");
    } else if (requestStructureErrors.has(error)) {
      console.error("Request structure error. Possible bug.");
    } else if (error === "internal server error") {
      showModalMessage("Internal server error. Please try again later.");
    } else {
      showModalMessage(`Unknown error: ${error}`);
    }
  } else {
    console.error("Invalid message format: no error in payload");
  }
}
