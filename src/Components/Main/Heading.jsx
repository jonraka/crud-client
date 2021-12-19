import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Button from '../UI/Button';

const StyledHeading = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    align-items: center;

    & .heading-left {
        font-size: 2rem;
    }
`;

export default function Heading({ title, children }) {
    return (
        <StyledHeading>
            <div className='heading-left'>{title}</div>
            <div className='heading-right'>
                {children ? children : <Link to="/">
                    <Button>Grįžti atgal</Button>
                </Link>}
            </div>
        </StyledHeading>
    )
};
