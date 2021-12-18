import Container from '../Componenets/Container';
import UsersTable from '../Componenets/UsersTable';
import styled from 'styled-components';
import Button from '../Componenets/Button';

const StyledHeading = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    align-items: center;

    & .name {
        font-size: 2rem;
    }
`;


export default function UsersPage() {
    return (
        <Container>
            <StyledHeading>
                <div className='name'>Vartotojai</div>
                <div className='buttons'>
                    <Button>Pridėti naują vartotoją</Button>
                </div>
            </StyledHeading>
            <UsersTable />
        </Container>
    )
};
