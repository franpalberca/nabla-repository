import {NavbarComponent} from '../components/navbar/Navbar';
import {useContext, useEffect, useState} from 'react';
import {getUser, updateUser} from '../api/user.fetch';
import {AuthContext} from '../config/context/AuthContext';
import {Image} from 'react-bootstrap';
import styled from 'styled-components';

export const UserPage = () => {
	const {user, tokenState} = useContext(AuthContext);
	const [userData, setUserData] = useState<any>(null);
	const [selectedFile, setSelectedFile] = useState<File | null>(null);

	useEffect(() => {
		const fetchUser = async () => {
			try {
				if (user?.userId) {
					const fetchedUserData = await getUser(userData);
					setUserData(fetchedUserData);
				}
			} catch (error) {
				console.error('Error fetching user data:', error);
			}
		};

		fetchUser();
	}, [user]);

	const handlePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0] || null;
		setSelectedFile(file);
	};

	const handleSubmit = async () => {
		if (user && selectedFile) {
			const formData = new FormData();
			formData.append('userImage', selectedFile);
			formData.append('userName', user.userName || '');
			formData.append('userEmail', user.userEmail);

			try {
				const updatedUser = await updateUser(user.userId, formData, tokenState);
				setUserData(updatedUser);
			} catch (error) {
				console.error('Error updating user data:', error);
			}
		}
	};

	return (
		<>
			<NavbarComponent />
			<UserComponentStyles>
				<div className="userComponent">
					<h1>User Page</h1>
					{user && (
						<div>
							<p>User ID: {user.userId}</p>
							<p>Email: {user.userEmail}</p>
							<p>Name: {user.userName}</p>
							<Image src={user.userImage} rounded />
							<p>Add picture:</p>
							<input type="file" accept="image/*" onChange={handlePictureChange} />
							<button onClick={handleSubmit}>Update Profile</button>
						</div>
					)}
				</div>
			</UserComponentStyles>
		</>
	);
};

const UserComponentStyles = styled.div`
	margin-top: 10vh;
	border: 3px solid black;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 50%;
	& .userComponent {
	}
`;
