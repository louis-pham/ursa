import tokenService from "./tokenService";

const BASE_URL = "/api/users/";

function signup(user) {
  return fetch(BASE_URL + "signup", {
    method: "POST",
    headers: new Headers({"Content-Type": "application/json"}),
    body: JSON.stringify(user)
  }).then(res => {
    if (res.ok) return res.json();
    throw new Error("Email already taken!");
  })
  // Parameter destructuring!
  .then(({token}) => {
    tokenService.setToken(token);
  });
}

function getUser() {
  return tokenService.getUserFromToken();
}

function getAllUsers() {
  return fetch(BASE_URL + `users`, {
    method: 'GET',
    headers: new Headers({
      "Authorization": "Bearer " + tokenService.getToken()
    }),
  })
  .then(res => {
    // Valid login if we have a status of 2xx (res.ok)
    if (res.ok) return res.json();
    throw new Error('Bad Credentials!');
  });
}

function getRequestedUser(username) {
  return fetch(BASE_URL + `users/${username}`, {
    method: 'GET',
    headers: new Headers({
      "Authorization": "Bearer " + tokenService.getToken()
    }),
  })
  .then(res => {
    // Valid login if we have a status of 2xx (res.ok)
    if (res.ok) return res.json();
    throw new Error('Bad Credentials!');
  });
}

function login(creds) {
  return fetch(BASE_URL + 'login', {
    method: 'POST',
    headers: new Headers({'Content-Type': 'application/json'}),
    body: JSON.stringify(creds)
  })
  .then(res => {
    // Valid login if we have a status of 2xx (res.ok)
    if (res.ok) return res.json();
    throw new Error('Bad Credentials!');
  })
  .then(({token}) => tokenService.setToken(token));
}

function logout() {
  tokenService.setToken();
}

function update(user) {
  return fetch(BASE_URL + "update", {
    method: "PUT",
    headers: new Headers({
      "Content-Type": "application/json",
      "Authorization": "Bearer " + tokenService.getToken()
    }),
    body: JSON.stringify(user)
  }).then(res => {
    if (res.ok) return res.json();
    throw new Error("Error trying to update user!");
  })
  // Parameter destructuring!
  .then(({token}) => {
    tokenService.setToken(token);
  });
}

function deleteUser() {
  return fetch(BASE_URL + "delete", {
    method: "DELETE",
    headers: new Headers({
      "Authorization": "Bearer " + tokenService.getToken()
    })
  }).then(res => {
    if (res.ok) return res.json();
    throw new Error("Error trying to delete user!");
  });
}

export default {
  signup,
  getUser,
  getAllUsers,
  getRequestedUser,
  login,
  logout,
  update,
  deleteUser
};
