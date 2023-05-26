import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Col, FormFeedback, FormGroup, Input, Label } from 'reactstrap';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { toastr } from 'react-redux-toastr';
import { handleApiError, handleError, apiRequest } from '../../utils';

interface ForgotPasswordFormValues {
  email: string;
}

const ForgotPasswordFormSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Required'),
});

const initialValues: ForgotPasswordFormValues = { email: '' };

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values: ForgotPasswordFormValues) => {
    try {
      const response = await apiRequest('/user/forgot-password', { method: 'PATCH', data: values });

      if (response.data.message) {
        return handleApiError(response.data);
      }
      toastr.success('Success', 'Password reset link sent to your email!');
      navigate('/sign-in');
    } catch (error) {
      handleError('FORGOT_PASSWORD', error);
      toastr.error('Error', 'Failed to send password reset link.');
    }
  };

  return (
    <Col md={4} className="d-flex flex-column align-content-center justify-content-center gap-4">
      <h1>Forgot password?</h1>
      <Formik initialValues={initialValues} validationSchema={ForgotPasswordFormSchema} onSubmit={handleSubmit}>
        {({ errors, touched }) => (
          <Form>
            <FormGroup>
              <Label for="email">Email</Label>
              <Field as={Input} type="email" autoComplete="email" name="email" id="email" invalid={touched.email && !!errors.email} />
              <ErrorMessage name="email" component={FormFeedback} />
            </FormGroup>
            <Button type="submit" color="primary">
              Send Reset Link
            </Button>
          </Form>
        )}
      </Formik>
    </Col>
  );
};

export { ForgotPassword };
