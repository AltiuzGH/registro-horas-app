export const fetchWrapper = {
  get,
  post,
};

const HOST =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000/api"
    : process.env.REACT_APP_BACK_TARGET;

function get(url) {
  const accessToken = localStorage.getItem("accessToken");
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };
  return fetch(HOST + url, requestOptions).then(handleResponse);
}

function post(url, body) {
  const accessToken = localStorage.getItem("accessToken");
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(body),
  };
  return fetch(url, requestOptions).then(handleResponse);
}

function handleResponse(response) {
  
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (data.statusCode === 401) {
      // Add your logic to
      //  1. Redirect user to LOGIN
      //  2. Reset authentication from localstorage/sessionstorage
    }
    if (!response.ok) {
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }
    return data;
  });
}
