import {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../../config/context/AuthContext';
import {getAllUsers} from '../../api/user.fetch';
import styled from 'styled-components';

interface UserI {
	userId: string;
	userEmail: string;
	userName?: string | null;
	userImage?: string | null;
	userCreatedAt: string;
	userUpdatedAt?: string;
	isAdmin: boolean;
}

export const AdminComponent = () => {
	const {tokenState} = useContext(AuthContext);
	const [users, setUsers] = useState<UserI[]>([]);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				if (!tokenState) {
					throw new Error('No token found');
				}
				const response = await getAllUsers(tokenState);
				if (response) {
					const data = await response.json();
					if (response.ok) {
						setUsers(data.user);
					} else {
						setError(data.error);
					}
				}
			} catch (error) {
				setError('Error fetching users');
			}
		};

		fetchUsers();
	}, [tokenState]);

	if (error) {
		return <div>Error: {error}</div>;
	}

	return (
		<AdminComponentStyles>
			<h1 className="titleAdmin">All Users</h1>
			<ul className="listAdmin">
				{users.map((user) => (
					<li key={user.userId}>
						<p>ID: {user.userId}</p>
						<p>Email: {user.userEmail}</p>
						<p>Name: {user.userName}</p>
						<p>Created At: {user.userCreatedAt}</p>
					</li>
				))}
			</ul>
		</AdminComponentStyles>
	);
};

const AdminComponentStyles = styled.div`
	& .titleAdmin {
		display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 2vh;
	}
	& .listAdmin {
		display: grid;
		grid-template-columns: auto auto auto;
	}
`;
