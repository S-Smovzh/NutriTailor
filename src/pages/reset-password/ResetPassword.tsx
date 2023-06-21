import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Button, Col, FormFeedback, FormGroup, Input, InputGroup, Label } from 'reactstrap';
import * as Yup from 'yup';
import { toastr } from 'react-redux-toastr';
import { handleApiError, apiRequest, handleError } from '../../utils';
import { EyeSlash } from '@styled-icons/bootstrap/EyeSlash';
import { EyeFill } from '@styled-icons/bootstrap/EyeFill';
import { Pages } from '../../enums';

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
  const [resetToken] = useSearchParams();
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [passwordRepeatVisibility, setPasswordRepeatVisibility] = useState(false);

  const handleSubmit = async (values: ResetPasswordFormValues) => {
    try {
      const response = await apiRequest(`/user/update-forgotten-password?resetToken=${resetToken.get('token')}`, {
        method: 'PATCH',
        data: values,
      });

      if (response.data.message) {
        return handleApiError(response.data);
      }

      toastr.success('Success', 'Password reset successfully! Now you can log in.');
      navigate(Pages.SIGN_IN);
    } catch (error) {
      handleError('RESET_PASSWORD', error);
      toastr.error('Error', 'Failed to reset password.');
    }
  };

  const handlePasswordInputType = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  const handlePasswordRepeatInputType = () => {
    setPasswordRepeatVisibility(!passwordRepeatVisibility);
  };

  return (
    <Col md={4} className="d-flex flex-column align-content-center justify-content-center gap-4">
      <h1>Reset Password</h1>
      <Formik initialValues={initialValues} validationSchema={ResetPasswordFormSchema} onSubmit={handleSubmit}>
        {({ errors, touched }) => (
          <Form>
            <FormGroup>
              <Label for="password">New Password</Label>
              <InputGroup>
                <Field
                  as={Input}
                  type={passwordVisibility ? 'text' : 'password'}
                  autoComplete="new-password"
                  name="password"
                  id="password"
                  invalid={touched.password && !!errors.password}
                />
                <Button color="dark" className="d-flex align-content-center justify-content-center" onClick={handlePasswordInputType}>
                  {passwordVisibility && <EyeSlash width={20} className="h-100" />}
                  {!passwordVisibility && <EyeFill width={20} className="h-100" />}
                </Button>
              </InputGroup>
              <ErrorMessage name="password" component={FormFeedback} />
            </FormGroup>
            <FormGroup>
              <Label for="password">Repeat Password</Label>
              <InputGroup>
                <Field
                  as={Input}
                  type={passwordRepeatVisibility ? 'text' : 'password'}
                  autoComplete="current-password"
                  name="passwordRepeat"
                  id="passwordRepeat"
                  invalid={touched.passwordRepeat && !!errors.passwordRepeat}
                />
                <Button color="dark" className="d-flex align-content-center justify-content-center" onClick={handlePasswordRepeatInputType}>
                  {passwordRepeatVisibility && <EyeSlash width={20} className="h-100" />}
                  {!passwordRepeatVisibility && <EyeFill width={20} className="h-100" />}
                </Button>
              </InputGroup>
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
