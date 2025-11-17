export interface AppTranslation {
  title: string;
  nav: {
    signIn: string;
    chat: string;
    about: string;
    signOut: string;
  };
  login: {
    title: string;
    name: string;
    namePlaceholder: string;
    password: string;
    passwordPlaceholder: string;
    enterUsername: string;
    invalidUsername: string;
    enterPassword: string;
    invalidPassword: string;
    validateUsername: string;
    validatePassword: string;
    loginFailed: string;
    submit: string;
  };
  chat: {
    inputPlaceholder: string;
    saveButton: string;
    sendButton: string;
    cancelButton: string;
    chatNotice: string;
    chatStart: string;
    deleteMessage: string;
    editMessage: string;
    unreadMessages: string;
    search: string;
    noUsers: string;
    online: string;
    offline: string;
  };
  about: {
    title: string;
    text: string;
    link: string;
    tipsTitle: string;
    tips: string[];
  };
  errors: {
    anotherUserAuthorized: string;
    userConnected: string;
    incorrectLogin: string;
    authorization: string;
    invalidRecipient: string;
    internalServer: string;
    unknown: string;
  };
}
