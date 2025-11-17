import { UserType, WSRequest } from "../../../types/interfaces";
import { isUserListMessage } from "../../../utils/ws-guards";
import usersStore from "../../../store/users-store";

export default function userListHandler(response: WSRequest<unknown>) {
  if (response.payload && isUserListMessage(response)) {
    const users = response.payload.users as UserType[];
    usersStore.setUsers(users);
    console.log("User list:", users);
  } else {
    console.error("Invalid message format: no users in payload");
  }
}
