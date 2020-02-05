export const login = (username) => {
  return {
    type: 'LOGIN',
    username,
  };
}

export const logout = (username) => {
  return {
    type: 'LOGOUT',
  };
}

export const loginStateReducer = (loginState = {username: null}, action) => {
  switch (action.type) {
    case 'LOGIN':
      let { username }= action;
      return {username};
    case 'LOGOUT':
      return {username: null};
    default:
      return loginState;
  }
}