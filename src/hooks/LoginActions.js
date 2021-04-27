import { NotificationManager } from "react-notifications";

const LOGIN_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : process.env.REACT_APP_BACK_TARGET;

export async function loginUser(dispatch, loginPayload) {
  const requestLoginOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(loginPayload),
  };

  try {
    dispatch({ type: "REQUEST_LOGIN" });
    const resAuthLogin = await fetch(
      `${LOGIN_URL}/auth/login`,
      requestLoginOptions
    );
    const loginData = await resAuthLogin.json();
    if (!loginData.data) {
      dispatch({ type: "LOGIN_ERROR", error: loginData.error });
      NotificationManager.error(loginData.error);
      return;
    }

    const { accessToken } = loginData.data[0];
    localStorage.setItem("accessToken", accessToken);
    const requestUserOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const resAuthMe = await fetch(
      `${LOGIN_URL}/api/auth/me`,
      requestUserOptions
    );
    let userData = await resAuthMe.json();
    if (!userData.data) {
      dispatch({ type: "LOGIN_ERROR", error: userData.error });
      NotificationManager.error(userData.error);
      return;
    }
    dispatch({ type: "LOGIN_SUCCESS", payload: userData.data[0] });
    localStorage.setItem("currentUser", JSON.stringify(userData.data[0]));
    return userData.data[0];
  } catch (error) {
    dispatch({ type: "LOGIN_ERROR", error: error.message });
    NotificationManager.error(error.message);
  }
}

export async function logout(dispatch) {
  dispatch({ type: "LOGOUT" });
  localStorage.removeItem("currentUser");
  localStorage.removeItem("role");
}
