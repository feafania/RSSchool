import { ChatMessage, WSRequest } from "../../../types/interfaces";
import { isChatMessage } from "../../../utils/ws-guards";
import authStore from "../../../store/auth-store";
import messagesStore from "../../../store/messages-store";

export default function receiveMessageHandler(response: WSRequest<unknown>) {
  if (response.payload && isChatMessage(response)) {
    const message = response.payload.message as ChatMessage;
    console.log("Message received from server:", message);

    const currentUser = authStore.user;
    if (!currentUser) return;

    const login =
      message.from === currentUser.login ? message.to! : message.from!;

    messagesStore.addMessage(login, message);
    if (
      document.hidden &&
      Notification.permission === "granted" &&
      message.id === null
    ) {
      new Notification(`${message.from}: ${message.text ?? ""}`);
    }
  } else {
    console.error("Invalid message format: no message in payload");
  }
}
