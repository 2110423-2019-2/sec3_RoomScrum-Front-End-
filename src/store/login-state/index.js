import { decorate, computed, observable } from "mobx";

class LoginState {
  username = null;
  userId = null;
  get isLoggedIn() {
    return this.username !== null;
  }
}

decorate(LoginState, {
  username: observable,
  userId: observable,
  userType: observable,
  isLoggedIn: computed
});

export const globalLoginState = new LoginState();
