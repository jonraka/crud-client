import { Formik, Form, Field, ErrorMessage } from 'formik';
import Button from '../UI/Button';
import styled from 'styled-components';

const StyledForm = styled(Form)`
  width: 100%;
  max-width: 600px;
  margin: 20px auto;
  text-align: center;

  & label {
    text-align: left;
  }

  & input:not([type="button"]) {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
    border: none;
  }

  & .error-message {
      margin-top: -10px;
      background-color: red;
      border-radius: 5px;
      margin-bottom: 10px;
  }
`;

export default function AddUserForm() {
    return (
        <Formik
            initialValues={{
                name: '',
                email: '',
                password: ''
            }}
            validate={values => {
                const errors = {};
                if (!values.email) {
                    errors.email = 'El. pašto laukas yra privalomas';
                } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                    errors.email = 'Netinkamas el. paštas';
                }
                return errors;
            }}

            onSubmit={(values, { setSubmitting }) => {
                console.log(values)
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
                        <label htmlFor="email">El. paštas</label>
                        <Field type="email" name="email" placeholder="Įveskite vartotojo el. paštą..." required min="1"/>
                        <ErrorMessage name="email" component="div" className='error-message' />
                    </div>

                    <div>
                        <label htmlFor="password">Slaptažodis</label>
                        <Field type="password" name="password" placeholder="Įveskite vartotojo slaptažodį..." required min="5"/>
                        <ErrorMessage name="password" component="div" className='error-message' />
                    </div>

                    <Button type="submit" disabled={isSubmitting}>
                        Submit
                    </Button>
                </StyledForm>
            )}

        </Formik>
    )
};


