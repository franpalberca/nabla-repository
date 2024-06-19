import { useContext} from 'react';
import {Button} from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { LANDING, LOGIN, USERPAGE } from '../../config/routes/paths';
import { AuthContext } from '../../config/context/AuthContext';

export const NavbarComponent = () => {

	const { user, logout } = useContext(AuthContext)
	const navigate = useNavigate()
    console.log(user)

	const handleLogout = () => {
        logout();
        navigate(LANDING);
    };

	return (
		<NavbarStyles>
			<Navbar>
				{user ? (
					<div className="navbar_data">
						<Button className="profile_button" onClick={() => navigate(USERPAGE)}>
							My Profile
						</Button>
						<p className="log_text">Welcome, {user.userName}</p>
						<Button className="log_button" onClick={handleLogout}>
							Logout
						</Button>
					</div>
				) : (
					<div className="navbar_data">
						<p className="log_text">Please, sign in</p>
						<Button className="log_button" onClick={() => navigate(LOGIN)}>
							Login
						</Button>
					</div>
				)}
			</Navbar>
		</NavbarStyles>
	);
};

const NavbarStyles = styled.div`
	& .navbar_data {
		width: 100%;
		display: grid;
		grid-template-columns: 5vh 1fr repeat(2, 8vh);
		grid-template-rows: 1fr;
		grid-column-gap: 0px;
		grid-row-gap: 0px;
	}
	& .logo_brandfy {
		width: 14vh;
	}
	& .log_text {
		grid-area: 1 / 2 / 2 / 3;
		font-size: 8vh;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	& .log_button {
		grid-area: 1 / 3 / 2 / 4;
		width: 15vh;
		height: 12vh;
		display: flex;
		position: relative;
		left: 0vh;
		background-color: black;
		border-color: black;
	}
	& .profile_button{
		grid-area: 1 / 4 / 2 / 5;
		width: 15vh;
		height: 12vh;
		display: flex;
		position: relative;
		left: -30vh;
		background-color: black;
		border-color: black;
	}
`;