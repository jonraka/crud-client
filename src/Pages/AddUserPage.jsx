import Heading from '../Components/UI/Heading';
import Container from '../Components/UI/Container';
import AddUserForm from '../Components/Main/AddUserForm';

export default function AddUserPage() {
  return (
    <Container>
      <Heading title="Pridėti naują vartotoją" backPath="/users" />
      <AddUserForm />
    </Container>
  );
}
