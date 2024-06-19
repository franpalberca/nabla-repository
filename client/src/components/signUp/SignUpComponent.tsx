import {useState} from 'react';
import {Button, Form} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom'
import { createUser } from '../../api/user.fetch';
import styled from 'styled-components';
import { LOGIN } from '../../config/routes/paths';

const SignUpComponent = () => {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate()

	const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUsername(e.target.value);
	};

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};

	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const userData = {
			userName: username,
			userEmail: email,
			userPassword: password,
		};

		try {
			const response = await createUser(userData);

			if (response && response.success) {
				setUsername('');
				setEmail('');
				setPassword('');
			} else {
				console.error('Hubo un error al crear el usuario');
			}
		} catch (error) {
			console.error('Hubo un error en la solicitud:', error);
		}
	};

	return (
		<FormStyles>
			<Form className='form_global' onSubmit={handleSubmit}>
				<Form.Group controlId="username">
					<Form.Label>Username:</Form.Label>
					<Form.Control type="text" placeholder="Enter your username" value={username} onChange={handleUsernameChange} required />
				</Form.Group>

				<Form.Group className='group_form' controlId="email">
					<Form.Label>Email:</Form.Label>
					<Form.Control type="email" placeholder="Enter your email" value={email} onChange={handleEmailChange} required />
				</Form.Group>

				<Form.Group className='group_form' controlId="password">
					<Form.Label>Password:</Form.Label>
					<Form.Control type="password" placeholder="Enter your password" value={password} onChange={handlePasswordChange} required />
				</Form.Group>

				<Button className='form_button' type="submit">Sign Up</Button>
				<Button className='form_button' onClick={() => navigate(LOGIN)}>Back to Login</Button>
			</Form>
		</FormStyles>
	);
};

export default SignUpComponent;

const FormStyles = styled.div`
display: flex;
align-items: center;
justify-content: center;
margin-top: 25vh;
& .form_global{
	width: 70vh;
}
& .group_form{
	margin-top:3vh;
}
& .form_button{
	background-color: black;
	border: black;
	margin-top: 3vh;
	margin-left: 30%;
}
`