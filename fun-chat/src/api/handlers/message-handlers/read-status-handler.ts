import { isChatMessage } from "../../../utils/ws-guards";
import { ChatMessage, WSRequest } from "../../../types/interfaces";
import messagesStore from "../../../store/messages-store";

export default function readStatusHandler(response: WSRequest<unknown>) {
  if (response.payload && isChatMessage(response)) {
    const message = response.payload.message as ChatMessage;
    if (message.status?.isReaded) {
      console.log("Message has been read:", message);
      messagesStore.setStatus(message.id, "isReaded");
    }
  } else {
    console.error("Invalid message format: no message in payload");
  }
}
