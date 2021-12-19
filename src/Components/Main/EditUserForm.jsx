import { Formik, Form, Field, ErrorMessage } from 'formik';
import Button from '../UI/Button';
import styled from 'styled-components';
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

// const mongodbIdRegex = /^[0-9a-fA-F]{24}$/;

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

const EditUserSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Vardas per trumpas')
    .max(100, 'Vardas per ilgas'),
  age: Yup.number()
    .min(1, 'Netinkamas amžius')
    .max(120, 'Netinkamas amžius'),
  email: Yup.string()
    .email('Netinkamas el. paštas'),
  password: Yup.string()
    .min(5, 'Slaptažodis per trumpas')
    .max(100, 'Slaptažodis per ilgas'),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Slaptažodiai nesutampa')
});

export default function EditUserForm() {
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{
        name: '',
        age: '',
        email: '',
        password: '',
        passwordConfirmation: '',
        mainErrors: ''
      }}
      validationSchema={EditUserSchema}
      onSubmit={({ name, age, email, password }, { setSubmitting, setFieldError }) => {
        if(![name, age, email, password].some(val => val !== '')){
            setFieldError('mainErrors', `Bent vienas laukas turi būti pakeistas`);
            setSubmitting(false);
        }else{
            fetch(process.env.REACT_APP_API_ENDPOINT + '/users', {
                method: 'PUT',
                headers: {
                  'content-type': 'application/json'
                },
                body: JSON.stringify({ name, age, email, password })
              }).then(res => {
                if (res.status === 404) throw new Error('Šiuo metu serveris neveikia');
                return res.json()
              }).then(res => {
                if (res.success) {
                  toast.success('Vartotojas sukūrtas');
                  navigate('/users');
                } else {
                  setFieldError('mainErrors', res.error || 'Vidinė klaida');
                }
                setSubmitting(false);
              }).catch(err => {
                setFieldError('mainErrors', `Vidinė klaida (${err.message})`);
                setSubmitting(false);
              })
        }
      }}
    >
      {({ isSubmitting }) => (
        <StyledForm>
          <div>
            <label htmlFor="name">Vardas</label>
            <Field type="name" name="name" placeholder="Įveskite vartotojo vardą..." />
            <ErrorMessage name="name" component="div" className='error-message' />
          </div>

          <div>
            <label htmlFor="age">Amžius</label>
            <Field type="number" name="age" placeholder="Įveskite vartotojo amžių..." />
            <ErrorMessage name="age" component="div" className='error-message' />
          </div>

          <div>
            <label htmlFor="email">El. paštas</label>
            <Field type="email" name="email" placeholder="Įveskite vartotojo el. paštą..." />
            <ErrorMessage name="email" component="div" className='error-message' />
          </div>

          <div>
            <label htmlFor="password">Slaptažodis</label>
            <Field type="password" name="password" placeholder="Įveskite vartotojo slaptažodį..." />
            <ErrorMessage name="password" component="div" className='error-message' />
          </div>

          <div>
            <label htmlFor="password">Slaptažodžio patvirtinimas</label>
            <Field type="password" name="passwordConfirmation" placeholder="Pakartokite slaptažodį..." />
            <ErrorMessage name="passwordConfirmation" component="div" className='error-message' />
          </div>

          <div>
            <ErrorMessage name="mainErrors" component="div" className='error-message' />
          </div>

          <Button type="submit" disabled={isSubmitting}>
            Pridėti vartotoją
          </Button>
        </StyledForm>
      )}
    </Formik>
  )
};


