import { Formik, Form, Field, ErrorMessage } from 'formik';
import Button from '../UI/Button';
import styled from 'styled-components';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useRef, useEffect } from 'react';

const mongodbIdRegex = /^[0-9a-fA-F]{24}$/;

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
  }
`;

const EditUserSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Vardas per trumpas')
    .max(100, 'Vardas per ilgas')
    .matches(/^[a-z]+$/i, 'Netinkamas vardas'),
  age: Yup.number().min(1, 'Netinkamas amžius').max(120, 'Netinkamas amžius'),
  email: Yup.string().email('Netinkamas el. paštas'),
  password: Yup.string()
    .min(5, 'Slaptažodis per trumpas')
    .max(100, 'Slaptažodis per ilgas'),
  passwordConfirmation: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'Slaptažodiai nesutampa'
  ),
});

export default function EditUserForm({ userId }) {
  const navigate = useNavigate();
  const ref = useRef();
  const dataFromDatabase = useRef();
  const isValidUserId = mongodbIdRegex.test(userId);

  useEffect(() => {
    let isSubscribed = true;
    if (isValidUserId) {
      fetch(`${process.env.REACT_APP_API_ENDPOINT}/users/${userId}`)
        .then((res) => res.json())
        .then((res) => {
          if (!isSubscribed) return;

          if (ref.current) {
            if (res.error) {
              if (res.error === 'Vartotojas nerastas') {
                toast.error(res.error);
                navigate('/users', { replace: true });
              } else {
                ref.current.setFieldError('mainErrors', res.error);
              }
            } else if (res.data) {
              const { setFieldValue } = ref.current;
              dataFromDatabase.current = res.data;
              setFieldValue('name', res.data.name);
              setFieldValue('age', res.data.age);
              setFieldValue('email', res.data.email);
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }

    return () => {
      isSubscribed = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isValidUserId) {
    return <h1>Netinkamas vartotojo identifikatorius</h1>;
  }

  return (
    <Formik
      innerRef={ref}
      initialValues={{
        name: '',
        age: '',
        email: '',
        password: '',
        passwordConfirmation: '',
        mainErrors: '',
      }}
      validationSchema={EditUserSchema}
      onSubmit={(
        { name, age, email, password, passwordConfirmation },
        { setSubmitting, setFieldError }
      ) => {
        if (password !== passwordConfirmation) {
          setFieldError('passwordConfirmation', 'Slaptažodžiai turi sutapti');
          setSubmitting(false);
          return;
        }

        const requestBody = {
          userId,
          name,
          age,
          email,
          password,
        };

        for (const key in requestBody) {
          if (
            requestBody[key] === '' ||
            dataFromDatabase.current?.[key] === requestBody[key]
          )
            delete requestBody[key];
        }

        if (Object.keys(requestBody).length === 1) {
          setFieldError('mainErrors', 'Duomenys nėra pasikeite');
          setSubmitting(false);
          return;
        }

        fetch(process.env.REACT_APP_API_ENDPOINT + '/users', {
          method: 'PUT',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        })
          .then((res) => {
            if (res.status === 404)
              throw new Error('Šiuo metu serveris neveikia');
            return res.json();
          })
          .then((res) => {
            if (res.success) {
              toast.success('Duomenys atnaujinti');
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
      {({ isSubmitting }) => (
        <StyledForm>
          <div>
            <label htmlFor="name">Vardas</label>
            <Field
              type="name"
              name="name"
              placeholder="Įveskite vartotojo vardą..."
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
            Keisti duomenis
          </Button>
        </StyledForm>
      )}
    </Formik>
  );
}
