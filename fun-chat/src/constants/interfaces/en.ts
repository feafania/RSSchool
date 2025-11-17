import { AppTranslation } from "../../types/translation";

const en: AppTranslation = {
  title: "Fun Chat",
  nav: {
    signIn: "Sign In",
    chat: "Chat",
    about: "About Us",
    signOut: "Sign Out",
  },
  login: {
    title: "Authentication",
    name: "Login",
    namePlaceholder: "Enter your name...",
    password: "Password",
    passwordPlaceholder: "Enter your password...",
    enterUsername: "Please enter your username.",
    invalidUsername: "Username is invalid. Please follow the rules.",
    enterPassword: "Please enter your password.",
    invalidPassword: "Password is invalid. Please follow the rules.",
    validateUsername:
      "Username must be between 4 and 30 characters long " +
      "and contain only letters of Latin alphabet and numbers.",
    validatePassword:
      "Password must be at least 6 characters long " +
      "and include at least one number and one uppercase letter.",
    loginFailed: "Login failed. Please check your credentials.",
    submit: "Submit",
  },
  chat: {
    inputPlaceholder: "Type your message...",
    saveButton: "Save",
    sendButton: "Send",
    cancelButton: "Cancel editing",
    chatNotice: "Please select a user to start a conversation",
    chatStart: "This is the beginning of the conversation",
    deleteMessage: "Delete this message?",
    editMessage: "You are editing this message",
    unreadMessages: "Unread messages",
    search: "Search user...",
    noUsers: "No users found",
    online: "online",
    offline: "offline",
  },
  about: {
    title: "About",
    text: "About Us",
    link: "Author: Tatsiana Kashko",
    tipsTitle: "Tips:",
    tips: [
      "hover over a message to edit or delete it;",
      "press Ctrl (Cmd) + Enter to add a new line;",
      "press Esc to cancel editing.",
    ],
  },
  errors: {
    anotherUserAuthorized: "Another user is already authorized.",
    userConnected: "A user with this login is already connected.",
    incorrectLogin: "Incorrect login or password.",
    authorization: "Authorization error. Please log in again.",
    invalidRecipient: "Invalid recipient user.",
    internalServer: "Internal server error. Please try again later.",
    unknown: "Unknown error",
  },
};

export default en;
