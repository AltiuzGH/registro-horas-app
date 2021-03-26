import {
	NotificationManager
} from "react-notifications";
import "react-notifications/lib/notifications.css";

const LOGIN_URL = 'https://registro-horas-back-dev.herokuapp.com';

export async function loginUser(dispatch, loginPayload) {
	const requestLoginOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(loginPayload),
	};

	

	try {
		dispatch({ type: 'REQUEST_LOGIN' });
		let response = await fetch(`${LOGIN_URL}/api/auth/login`, requestLoginOptions);
		let data = await response.json();
		console.log(data)
		if (!data.data) {
		 dispatch({ type: 'LOGIN_ERROR', error: data.error});
		 NotificationManager.error(data.error);
		 return;
		}
        const token = data.data[0].accessToken;
		const requestUserOptions = {
			method: 'GET',
			headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
		}
		
		let responseUser = await fetch(`${LOGIN_URL}/api/users/profile`, requestUserOptions);
		let userData = await responseUser.json();

		if (!userData.full_name) {
			dispatch({ type: 'LOGIN_ERROR', error: userData.message});
			NotificationManager.error(userData.message);
			return;
		}

		if (userData.full_name) {
		 	dispatch({ type: 'LOGIN_SUCCESS', payload: userData });
		 	localStorage.setItem('currentUser', JSON.stringify(userData));
			return userData;
		}

	} catch (error) {
		dispatch({ type: 'LOGIN_ERROR', error: error });
		NotificationManager.error(error);
	}
}

export async function logout(dispatch) {
	dispatch({ type: 'LOGOUT' });
	localStorage.removeItem('currentUser');
	localStorage.removeItem('role');
}
