import { decorate, computed, observable } from "mobx";

class LoginState {
  username = null;
  get isLoggedIn() {
    return this.username !== null;
  }
}

decorate(LoginState, {
  username: observable,
  isLoggedIn: computed
});

export const globalLoginState = new LoginState();
