import UsersTable from '../Components/Main/UsersTable';
import Container from '../Components/UI/Container';
import Heading from '../Components/UI/Heading';
import Button from '../Components/UI/Button';
import { Link } from 'react-router-dom';

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
  );
}
