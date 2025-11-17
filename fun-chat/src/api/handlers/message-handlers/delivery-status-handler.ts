import { ChatMessage, WSRequest } from "../../../types/interfaces";
import { isChatMessage } from "../../../utils/ws-guards";
import messagesStore from "../../../store/messages-store";

export default function deliveryStatusHandler(response: WSRequest<unknown>) {
  if (response.payload && isChatMessage(response)) {
    const message = response.payload.message as ChatMessage;
    if (message.status?.isDelivered) {
      console.log("Message has been delivered:", message);
      messagesStore.setStatus(message.id, "isDelivered");
    }
  } else {
    console.error("Invalid message format: no message in payload");
  }
}
