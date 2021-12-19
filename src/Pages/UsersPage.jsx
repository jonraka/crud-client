import Container from '../Components/Main/Container';
import UsersTable from '../Components/Main/UsersTable';
import Button from '../Components/UI/Button';
import Heading from '../Components/Main/Heading';
import { Link } from "react-router-dom";

export default function UsersPage() {
    return (
        <Container>
            <Heading title="Vartotojai">
                <Link to="/users/add">
                    <Button>Pridėti naują vartotoją</Button>
                </Link>
            </Heading>
            <UsersTable />
        </Container>
    )
};
