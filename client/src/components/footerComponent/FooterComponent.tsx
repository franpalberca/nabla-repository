import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

export const Footer = () => {
  return (
    <FooterStyles>
    <a href="https://www.linkedin.com/in/fran-p-alberca/" target="_blank" rel="noopener noreferrer">
    <FontAwesomeIcon style={{ fontSize: '50px', color: 'black' }} icon={faLinkedin} />
    </a>
    <a href="https://github.com/franpalberca" target="_blank" rel="noopener noreferrer">
    <FontAwesomeIcon style={{ fontSize: '50px', color: 'black' }} icon={faGithub} />
    </a>
    </FooterStyles>
  )
}

const FooterStyles = styled.div`
width: 100%;
display: flex;
align-items: center;
justify-content: space-around;
position: absolute;
bottom: 0;
`