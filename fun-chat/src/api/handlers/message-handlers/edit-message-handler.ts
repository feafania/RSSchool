import { ChatMessage, WSRequest } from "../../../types/interfaces";
import { isChatMessage } from "../../../utils/ws-guards";
import messagesStore from "../../../store/messages-store";

export default function editMessageHandler(response: WSRequest<unknown>) {
  if (response.payload && isChatMessage(response)) {
    const message = response.payload.message as ChatMessage;
    console.log("Message has been edited:", message);

    if (message.status?.isEdited) {
      messagesStore.editMessage(message.id, message.text || "");
    }
  } else {
    console.error("Invalid message format: no message in payload");
  }
}
