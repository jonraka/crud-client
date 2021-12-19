import { Formik, Form, Field, ErrorMessage } from 'formik';
import Button from '../UI/Button';
import styled from 'styled-components';
import * as Yup from 'yup';
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

  & input:not([type='button']) {
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

  & input:not([type='button'])::placeholder {
    color: #ffffff94;
  }

  & .error-message {
    margin-top: -6px;
    background-color: red;
    border-radius: 5px;
    margin-bottom: 10px;
    color: white;
    text-shadow: 1px 1px black, 1px 1px black, 2px 2px black, 1px 1px 5px black;
    font-weight: bold;
  }

  & .error-border {
    border-color: red !important;
  }
`;

const NewUserSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Vardas per trumpas')
    .max(100, 'Vardas per ilgas')
    .required('Vardas negali būti tuščias')
    .matches(/^[a-z]+$/i, 'Netinkamas vardas'),
  age: Yup.number()
    .min(1, 'Netinkamas amžius, turi būti nuo 1-o meto.')
    .max(120, 'Netinkamas amžius, turi būti iki 120-ties metų')
    .required('Amžius negali būti tuščias'),
  email: Yup.string()
    .email('Netinkamas el. paštas')
    .required('El. paštas negali būti tuščias'),
  password: Yup.string()
    .min(5, 'Slaptažodis per trumpas')
    .max(100, 'Slaptažodis per ilgas')
    .required('Slapažodis negali būti tuščias'),
  passwordConfirmation: Yup.string()
    .required('Slaptažodžio pakartojimas negali būti tuščias')
    .oneOf([Yup.ref('password'), null], 'Slaptažodiai nesutampa'),
});

export default function AddEditUserForm() {
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{
        name: '',
        age: '',
        email: '',
        password: '',
        passwordConfirmation: '',
        mainErrors: '',
      }}
      validationSchema={NewUserSchema}
      onSubmit={(
        { name, age, email, password },
        { setSubmitting, setFieldError }
      ) => {
        fetch(process.env.REACT_APP_API_ENDPOINT + '/users', {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify({ name, age, email, password }),
        })
          .then((res) => {
            if (res.status === 404)
              throw new Error('Šiuo metu serveris neveikia');
            return res.json();
          })
          .then((res) => {
            if (res.success) {
              toast.success('Vartotojas sukūrtas');
              navigate('/users');
            } else {
              if (typeof res.error === 'object') {
                (res.error || []).forEach(([key, error]) => {
                  setFieldError(key, error);
                });
              } else {
                setFieldError('mainErrors', res.error || 'Vidinė klaida');
              }
            }
            setSubmitting(false);
          })
          .catch((err) => {
            setFieldError('mainErrors', `Vidinė klaida (${err.message})`);
            setSubmitting(false);
          });
      }}
    >
      {({ errors, touched, isSubmitting }) => (
        <StyledForm>
          <div>
            <label htmlFor="name">Vardas</label>
            <Field
              type="name"
              name="name"
              placeholder="Įveskite vartotojo vardą..."
              className={errors.name && touched.name ? 'error-border' : null}
            />
            <ErrorMessage
              name="name"
              component="div"
              className="error-message"
            />
          </div>

          <div>
            <label htmlFor="age">Amžius</label>
            <Field
              type="number"
              name="age"
              placeholder="Įveskite vartotojo amžių..."
              className={errors.age && touched.age ? 'error-border' : null}
            />
            <ErrorMessage
              name="age"
              component="div"
              className="error-message"
            />
          </div>

          <div>
            <label htmlFor="email">El. paštas</label>
            <Field
              type="email"
              name="email"
              placeholder="Įveskite vartotojo el. paštą..."
              className={errors.email && touched.email ? 'error-border' : null}
            />
            <ErrorMessage
              name="email"
              component="div"
              className="error-message"
            />
          </div>

          <div>
            <label htmlFor="password">Slaptažodis</label>
            <Field
              type="password"
              name="password"
              placeholder="Įveskite vartotojo slaptažodį..."
              className={errors.password && touched.password ? 'error-border' : null}
            />
            <ErrorMessage
              name="password"
              component="div"
              className="error-message"
            />
          </div>

          <div>
            <label htmlFor="password">Slaptažodžio patvirtinimas</label>
            <Field
              type="password"
              name="passwordConfirmation"
              placeholder="Pakartokite slaptažodį..."
              className={errors.passwordConfirmation && touched.passwordConfirmation ? 'error-border' : null}
            />
            <ErrorMessage
              name="passwordConfirmation"
              component="div"
              className="error-message"
            />
          </div>

          <div>
            <ErrorMessage
              name="mainErrors"
              component="div"
              className="error-message"
            />
          </div>

          <Button type="submit" disabled={isSubmitting}>
            Pridėti vartotoją
          </Button>
        </StyledForm>
      )}
    </Formik>
  );
}
