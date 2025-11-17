import { ChatMessage, WSRequest } from "../../../types/interfaces";
import { isChatMessage } from "../../../utils/ws-guards";
import messagesStore from "../../../store/messages-store";

export default function deleteMessageHandler(response: WSRequest<unknown>) {
  if (response.payload && isChatMessage(response)) {
    const message = response.payload.message as ChatMessage;
    if (message.status?.isDeleted) {
      console.log("Message has been deleted:", message);
      messagesStore.deleteMessage(message.id);
    }
  } else {
    console.error("Invalid message format: no message in payload");
  }
}
