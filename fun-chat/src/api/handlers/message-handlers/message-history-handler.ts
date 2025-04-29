import { ChatMessage, WSRequest } from "../../../types/interfaces";
import { isChatListMessage } from "../../../utils/ws-guards";
import MessagesStore from "../../../store/messages-store";

export default function messageHistoryHandler(response: WSRequest<unknown>) {
  if (response.payload && isChatListMessage(response)) {
    const messages = response.payload.messages as ChatMessage[];
    MessagesStore.setHistoryMessages(messages);
    console.log("Message history:", messages);
  } else {
    console.error("Invalid message format: no messages in payload");
  }
}
