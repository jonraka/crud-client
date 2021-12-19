import styled from 'styled-components';

const Button = styled.button`
    border: none;
    background-color: red;
    padding: 5px 10px;
    font-size: 0.9rem;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
    margin: 2px;
    transition: background ease-out 0.3s;

    &:hover {
        background-color: white;
    }

    &:active {
        background-color: black;
        color: white;
    }
`;

export default Button;