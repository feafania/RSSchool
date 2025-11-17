import authStore from "../../../../store/auth-store";

export default function renderHeaderUsername() {
  const username = document.querySelector(".header-username");
  if (username) {
    username.textContent = authStore.user?.login || "";
  }
}
