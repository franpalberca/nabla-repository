import {useAuth0} from '@auth0/auth0-react';
import {Button} from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import styled from 'styled-components';

export const NavbarComponent = () => {
	const {loginWithRedirect, logout, user, isLoading} = useAuth0();

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<NavbarStyles>
			<Navbar>
				{user ? (
					<div className="navbar_data">
						<p className="log_text">Welcome, {user.given_name}</p>{' '}
						<Button className="log_button" onClick={() => logout()}>
							Logout
						</Button>
					</div>
				) : (
					<div className="navbar_data">
						<p className="log_text">Please, sign in</p>
						<Button className="log_button" onClick={() => loginWithRedirect()}>
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
		grid-template-columns: repeat(3, 1fr);
		grid-template-rows: 1fr;
		grid-column-gap: 0px;
		grid-row-gap: 0px;
	}
	& .log_text {
		grid-area: 1 / 2 / 2 / 3;
		font-size: 5vh;
	}
	& .log_button {
		grid-area: 1 / 3 / 2 / 4;
		width: 15vh;
		height: 8vh;
		display: flex;
		position: relative;
		left: 55vh;
	}
`;
