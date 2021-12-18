import Container from '../Components/Container';
import UsersTable from '../Components/UsersTable';
import Button from '../Components/Button';
import { Link } from "react-router-dom";
import Heading from '../Components/Heading';

export default function UsersPage() {
    return (
        <Container>
            <Heading title="Vartotojai">
                <Link to="/add-user">
                    <Button>Pridėti naują vartotoją</Button>
                </Link>
            </Heading>
            <UsersTable />
        </Container>
    )
};
