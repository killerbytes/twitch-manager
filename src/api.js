import axios from "axios";
const apiUrl = "https://api.twitch.tv/kraken";

function headers() {
  const token = localStorage.getItem("TWITCH_APP");
  return {
    headers: {
      "Client-ID": "abe73ozfqy326zt1asikhewymrk43f",
      Accept: "application/vnd.twitchtv.v5+json",
      Authorization: `OAuth ${token}`
    }
  };
}

export function getUser() {
  const config = Object.assign(headers(), {});
  return axios.get(`${apiUrl}/user`, config);
}

export function getUserFollows({ id, limit = 100, offset = 0 }) {
  const config = Object.assign(headers(), {
    params: { limit, offset: limit * offset }
  });
  return axios.get(`${apiUrl}/users/${id}/follows/channels`, config);
}

export function removeUserFollows({ id, channel_id }) {
  const config = Object.assign(headers(), {});
  return axios.delete(
    `${apiUrl}/users/${id}/follows/channels/${channel_id}`,
    config
  );
}
