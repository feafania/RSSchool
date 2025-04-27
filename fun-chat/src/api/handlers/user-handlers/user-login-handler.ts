import { UserType, WSRequest } from "../../../types/interfaces";
import { isUserMessage } from "../../../utils/ws-guards";
import authStore, { AuthStore } from "../../../store/auth-store";
import PageRouter from "../../../router/page-router";
import { PageType } from "../../../types/enum";
import usersStore from "../../../store/users-store";
import showModalMessage from "../../../views/common/elements/modal-window/modal-window";

export default function userLoginHandler(response: WSRequest<unknown>) {
  if (response.payload && isUserMessage(response)) {
    const user = response.payload.user as UserType;

    if (response.id === null) {
      console.log("Another user logged in:", user.login);
      usersStore.addUser(user);
    } else {
      if (user.isLogined) {
        authStore.setUser(AuthStore.restoreUser());
        console.info("User successfully logged in:", user.login);
        PageRouter.navigateTo(PageType.chat);
      } else {
        authStore.setUser(undefined);
        console.error("Login failed. User not authorized.");
        showModalMessage("Login failed. Please check your credentials.");
        PageRouter.navigateTo(PageType.login);
      }
    }
  } else {
    console.error("Invalid message format: no user in payload");
  }
}
