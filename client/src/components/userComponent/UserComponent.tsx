import {useContext, useEffect, useState} from 'react';
import {Button, Image} from 'react-bootstrap';
import styled from 'styled-components';
import { AuthContext } from '../../config/context/AuthContext';
import { deleteUser, getUser, updateUser } from '../../api/user.fetch';
import {  useNavigate } from 'react-router-dom';
import DeleteModal from '../modalComponent/ModalComponent';


export const UserComponent = () => {
	const {user, tokenState} = useContext(AuthContext);
	const [userData, setUserData] = useState<any>(null);
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate()

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

    const handleDelete = async () => {
		if (user) {
			try {
				await deleteUser(user.userId, tokenState);
				navigate('./signup')
			} catch (error) {
				console.error('Error deleting user:', error);
			}
		}
	};
    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);
    const handleConfirmDelete = () => {
        handleDelete();
        handleCloseModal();
    };


	return (
		<>
			<UserComponentStyles>
				<div className="userComponent">
					<h1>User Page</h1>
					{user && (
						<div>
							<p>User ID: {user.userId}</p>
							<p>Email: {user.userEmail}</p>
							<p>Name: {user.userName}</p>
							<Image className='image' src={user.userImage ?? undefined} rounded />
							<div className='userButtons'>
                            <p>Add picture:</p>
							<input type="file" accept="image/*" onChange={handlePictureChange} />
							<Button className='buttonUpdate' onClick={handleSubmit}>Update Profile</Button>
                            <Button className="buttonDelete" onClick={handleShowModal}>Delete Account</Button>
                            </div>
						</div>
					)}
				</div>
			</UserComponentStyles>
            <DeleteModal show={showModal} handleClose={handleCloseModal} handleConfirm={handleConfirmDelete} />
		</>
	);
};

const UserComponentStyles = styled.div`
	margin-top: 0;
	border: 3px solid black;
    border-radius: 20px;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 50%;
    margin-left: 60vh;
    margin-bottom: 12vh;
	& .userComponent {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
	}
    & .userButtons {
    margin-bottom: 5vh;
    display: flex;
    flex-direction: column;
    }
    & .buttonUpdate {
    margin-top: 2vh;
    }
    & .image{
    max-width: 60vh;
    }`;
