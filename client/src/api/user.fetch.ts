import {getToken, setToken} from '../utils/auth';


const urlUser = import.meta.env.VITE_API_URL_USER;

interface BodyDataI {
	userName: string;
	userEmail: string;
	userPassword: string;
}

interface UserDataI {
	userEmail: string;
	userPassword: string;
}

export const createUser = async (bodyData: BodyDataI) => {
	try {
		const response = await fetch(urlUser, {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(bodyData),
		});
		const data = await response.json();
		return data;
	} catch (error) {
		console.error(error);
	}
};

export const getUser = async (userData: UserDataI) => {
	try {
		const response = await fetch(`${urlUser}/login`, {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(userData),
		});
		const data = await response.json();
		if (data.token) {
			setToken(data.token);
		}
		return data;
	} catch (error) {
		console.error(error);
	}
};

export const updateUser = async (userId: string, formData: FormData, token: string | null) => {
	try {
        if (!token) {
            throw new Error('No token found');
        }
		const response = await fetch(`${urlUser}/${userId}`, {
			method: 'PATCH',
			mode: 'cors',
			headers: {
				authorization: `Bearer ${token}`,
			},
			body: formData,
		});
		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Error updating user:', error);
	}
};
