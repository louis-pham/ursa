import tokenService from "./tokenService";

const BASE_URL = "/api/polls/";

export default {
  create,
  getAllPolls,
  deletePoll
};

function create(poll) {
  return fetch(BASE_URL + "create", {
    method: "POST",
    headers: new Headers({
      "Content-Type": "application/json",
      "Authorization": "Bearer " + tokenService.getToken()
    }),
    body: JSON.stringify(poll)
  }).then(res => {
    if (res.ok) return res.json();
    throw new Error("error creating poll!");
  });
}

function getAllPolls() {
  return fetch(BASE_URL + "polls", {
    method: "GET",
    headers: new Headers({
      "Content-Type": "application/json",
      "Authorization": "Bearer " + tokenService.getToken()
    })
  }).then(res => {
    if (res.ok) return res.json();
    throw new Error("error getting polls!");
  });
}

function deletePoll(poll) {
  return fetch(BASE_URL + `polls/${poll.id}/delete`, {
    method: "DELETE",
    headers: new Headers({
      "Content-Type": "application/json",
      "Authorization": "Bearer " + tokenService.getToken()
    })
  }).then(res => {
    if (res.ok) return res.json();
    throw new Error("error deleting poll!");
  });
}
