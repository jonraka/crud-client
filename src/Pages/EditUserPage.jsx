import Heading from '../Components/Main/Heading';
import Container from '../Components/Main/Container';
// import AddEditUserForm from '../Components/Main/AddEditUserForm';
import { useParams } from 'react-router-dom';

export default function EditUserPage() {
    const { userId } = useParams();
    return (
        <Container>
            <Heading title="Keisti vartotojo duomenis" backPath="/users" />
            {/* <AddEditUserForm editUserId={userId} /> */}
        </Container>
    )
};
