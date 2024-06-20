import styled from 'styled-components';

export const UnauthorizedComponent = () => {
	return (
		<AdminComponentStyles>
			<h1>Unauthorized</h1>
			<p>You do not have permission to view this page.</p>
		</AdminComponentStyles>
	);
};

const AdminComponentStyles = styled.div`
		display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 2vh;
`;