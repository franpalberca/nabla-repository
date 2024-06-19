import { getToken } from "../utils/auth";

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
        const token = getToken()
		const response = await fetch(`${urlUser}/login`, {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
			},
			body: JSON.stringify(userData),
		});
		const data = await response.json();
		return data;
	} catch (error) {
		console.error(error);
	}
}

export const getUserById = async (userId: string) => {
    try {
        const token = getToken();
        if (!token) {
            throw new Error('No token found');
        }
        console.log('Token:', token);
        const response = await fetch(`${urlUser}/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
            throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        throw error;
    }
};