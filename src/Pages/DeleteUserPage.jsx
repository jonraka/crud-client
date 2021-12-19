import Heading from '../Components/Main/Heading';
import Container from '../Components/Main/Container';
// import AddEditUserForm from '../Components/Main/AddEditUserForm';
import { useParams } from 'react-router-dom';

export default function DeleteUserPage() {
    const { userId } = useParams();
    return (
        <Container>
            <Heading title="Ištrinti vartotoją" backPath="/users" />
            {/* <AddEditUserForm editUserId={userId} /> */}
            <h1>Ar tikrai norite ištrinti vartotojo {userId}</h1>
        </Container>
    )
};
