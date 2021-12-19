import { Formik, Form, Field, ErrorMessage } from 'formik';
import Button from '../UI/Button';
import styled from 'styled-components';
import * as Yup from 'yup'

const StyledForm = styled(Form)`
  width: 100%;
  max-width: 600px;
  margin: 20px auto;
  text-align: center;

  & > div {
    margin: 0 5px;
  }

  & label {
    text-align: left;
  }

  & input:not([type="button"]) {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
    border: none;
    background-color: #ffffff13;
    border: 1px solid white;
    outline: none;
    color: white;
  }

  & input:not([type="button"])::placeholder {
    color: #ffffff94;
  }

  & .error-message {
      margin-top: -6px;
      background-color: red;
      border-radius: 5px;
      margin-bottom: 10px;
  }
`;

const NewUserSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Vardas per trumpas')
    .max(100, 'Vardas per ilgas')
    .required('Vardas negali būti tuščias'),
  age: Yup.number()
    .min(1, 'Netinkamas amžius')
    .max(120, 'Netinkamas amžius')
    .required('Amžius negali būti tuščias'),
  email: Yup.string()
    .email('Netinkamas el. paštas')
    .required('El. paštas negali būti tuščias'),
  password: Yup.string()
    .min(5, 'Slaptažodis per trumpas')
    .max(100, 'Slaptažodis per ilgas')
    .required('Slapažodis negali būti tuščias'),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Slaptažodiai nesutampa')
});

export default function AddUserForm() {
  return (
    <Formik
      initialValues={{
        name: '',
        age: '',
        email: '',
        password: '',
        passwordConfirmation: ''
      }}
      validationSchema={NewUserSchema}
      onSubmit={(values, { setSubmitting }) => {
        console.log(values)

        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <StyledForm>
          <div>
            <label htmlFor="name">Vardas</label>
            <Field type="name" name="name" placeholder="Įveskite vartotojo vardą..." required min="1" />
            <ErrorMessage name="name" component="div" className='error-message' />
          </div>

          <div>
            <label htmlFor="age">Amžius</label>
            <Field type="number" name="age" placeholder="Įveskite vartotojo amžių..." required min="1" max="120" />
            <ErrorMessage name="age" component="div" className='error-message' />
          </div>

          <div>
            <label htmlFor="email">El. paštas</label>
            <Field type="email" name="email" placeholder="Įveskite vartotojo el. paštą..." required min="1" />
            <ErrorMessage name="email" component="div" className='error-message' />
          </div>

          <div>
            <label htmlFor="password">Slaptažodis</label>
            <Field type="password" name="password" placeholder="Įveskite vartotojo slaptažodį..." required min="5" />
            <ErrorMessage name="password" component="div" className='error-message' />
          </div>

          <div>
            <label htmlFor="password">Slaptažodžio patvirtinimas</label>
            <Field type="password" name="passwordConfirmation" placeholder="Pakartokite slaptažodį..." required min="5" />
            <ErrorMessage name="passwordConfirmation" component="div" className='error-message' />
          </div>

          <Button type="submit" disabled={isSubmitting}>
            Submit
          </Button>
        </StyledForm>
      )}

    </Formik>
  )
};


