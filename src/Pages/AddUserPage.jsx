import Heading from '../Components/Main/Heading';
import Container from '../Components/Main/Container';
import AddUserForm from '../Components/Main/AddUserForm';

export default function AddUserPage() {
  return (
    <Container>
      <Heading title="Pridėti naują vartotoją" backPath="/users" />
      <AddUserForm />
    </Container>
  )
};
