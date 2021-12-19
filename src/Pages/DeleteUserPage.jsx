import Heading from '../Components/UI/Heading';
import Container from '../Components/UI/Container';
import DeleteUserBox from '../Components/Main/DeleteUserBox';
import { useParams } from 'react-router-dom';

export default function DeleteUserPage() {
  const { userId } = useParams();
  return (
    <Container>
      <Heading title="Ištrinti vartotoją" backPath="/users" />
      <DeleteUserBox userId={userId}/>
    </Container>
  );
}
