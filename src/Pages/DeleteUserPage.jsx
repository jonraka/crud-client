import Heading from '../Components/Main/Heading';
import Container from '../Components/Main/Container';
import { useParams } from 'react-router-dom';
import DeleteUserBox from '../Components/Main/DeleteUserBox';

export default function DeleteUserPage() {
  const { userId } = useParams();
  return (
    <Container>
      <Heading title="Ištrinti vartotoją" backPath="/users" />
      <DeleteUserBox userId={userId}/>
    </Container>
  );
}
