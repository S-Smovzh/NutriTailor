import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Button, Col, FormFeedback, FormGroup, Input, Label } from 'reactstrap';
import * as Yup from 'yup';
import { toastr } from 'react-redux-toastr';
import { useParams } from 'react-router';
import { handleApiError, apiRequest, handleError } from '../../utils';

interface ResetPasswordFormValues {
  password: string;
  passwordRepeat: string;
}

const ResetPasswordFormSchema = Yup.object().shape({
  password: Yup.string().required('Required'),
  passwordRepeat: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Required'),
});

const initialValues: ResetPasswordFormValues = { password: '', passwordRepeat: '' };

const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const { resetToken } = useParams();

  const handleSubmit = async (values: ResetPasswordFormValues) => {
    try {
      const response = await apiRequest(`/user/reset-password?resetToken=${resetToken}`, {
        method: 'PATCH',
        data: values,
      });

      if (response.data.message) {
        return handleApiError(response.data);
      }

      toastr.success('Success', 'Password reset successfully!');
      navigate('/sign-in');
    } catch (error) {
      handleError('RESET_PASSWORD', error);
      toastr.error('Error', 'Failed to reset password.');
    }
  };

  return (
    <Col md={4} className="d-flex flex-column align-content-center justify-content-center gap-4">
      <h1>Reset Password</h1>
      <Formik initialValues={initialValues} validationSchema={ResetPasswordFormSchema} onSubmit={handleSubmit}>
        {({ errors, touched }) => (
          <Form>
            <FormGroup>
              <Label for="password">New Password</Label>
              <Field as={Input} type="password" autoComplete="new-password" name="password" id="password" invalid={touched.password && !!errors.password} />
              <ErrorMessage name="password" component={FormFeedback} />
            </FormGroup>
            <FormGroup>
              <Label for="passwordRepeat">Repeat Password</Label>
              <Field
                as={Input}
                type="password"
                autoComplete="current-password"
                name="passwordRepeat"
                id="passwordRepeat"
                invalid={touched.passwordRepeat && !!errors.passwordRepeat}
              />
              <ErrorMessage name="passwordRepeat" component={FormFeedback} />
            </FormGroup>
            <Button type="submit" color="primary">
              Reset Password
            </Button>
          </Form>
        )}
      </Formik>
    </Col>
  );
};

export { ResetPassword };
