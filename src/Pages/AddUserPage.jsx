import { Formik, Form, Field, ErrorMessage } from 'formik';
import Heading from '../Components/Heading';
import Container from '../Components/Container';

export default function AddUserPage() {
  return (
    <Container>
      <Heading title="Pridėti naują vartotoją"/>
      <Formik
        initialValues={{ email: '', password: '' }}
        validate={values => {
          const errors = {};
          if (!values.email) {
            errors.email = 'Required';
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = 'Invalid email address';
          }
          return errors;
        }}

        onSubmit={(values, { setSubmitting }) => {
          console.log(values)
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field type="email" name="email" />
            <ErrorMessage name="email" component="div" />
            <Field type="password" name="password" />
            <ErrorMessage name="password" component="div" />
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}

      </Formik>
    </Container>
  )
};
