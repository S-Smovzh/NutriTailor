import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Button, Col, FormFeedback, FormGroup, Input, InputGroup, Label, Row } from 'reactstrap';
import * as Yup from 'yup';
import { toastr } from 'react-redux-toastr';
import { apiRequest, handleError, handleApiError } from '../../utils';
import { UserSlice } from '../../store';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../store/interfaces';
import { Pages } from '../../enums';
import { EyeSlash } from '@styled-icons/bootstrap/EyeSlash';
import { EyeFill } from '@styled-icons/bootstrap/EyeFill';

const SignInSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const initialValues = { email: '', password: '' };

const SignIn: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loginReducer } = UserSlice.actions;
  const { user } = useSelector(
    (state: AppState) => ({
      user: state.user,
    }),
    shallowEqual
  );
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  useEffect(() => {
    if (user._id) navigate(Pages.MEALS_LIST);
  }, [user]);

  const handleSubmit = async (
    values: typeof initialValues,
    {
      setSubmitting,
    }: {
      setSubmitting: (isSubmitting: boolean) => void;
    }
  ) => {
    try {
      const response = await apiRequest('/user/sign-in', { method: 'POST', data: values });

      if (response.data) {
        const { data } = response;
        if (data.message) {
          return handleApiError(data);
        } else {
          dispatch(loginReducer(data));
        }
      }

      navigate('/profile');
    } catch (error) {
      handleError('SIGN_IN', error);
      toastr.error('Error', 'Failed to sign in.');
    } finally {
      setSubmitting(false);
    }
  };

  const onSignUpNavigation = () => navigate(Pages.WELCOME);

  const handlePasswordInputType = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  return (
    <Col md={4} className="d-flex flex-column align-content-center justify-content-center gap-4">
      <h1>Sign In</h1>
      <Formik initialValues={initialValues} validationSchema={SignInSchema} onSubmit={handleSubmit}>
        {({ isSubmitting, touched, errors }) => (
          <Form className="d-flex flex-column gap-2">
            <Row>
              <FormGroup>
                <Label htmlFor="email">Email</Label>
                <Field as={Input} type="email" autoComplete="email" name="email" id="email" invalid={!!(touched.email && errors.email)} />
                <ErrorMessage name="email" component={FormFeedback} />
              </FormGroup>
            </Row>
            <Row>
              <FormGroup>
                <Label htmlFor="password">Password</Label>
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
            </Row>
            <Row className="gx-0">
              <Button color="primary" disabled={isSubmitting}>
                {isSubmitting ? 'Loading...' : 'Sign In'}
              </Button>
            </Row>
          </Form>
        )}
      </Formik>
      <Button color="dark" onClick={onSignUpNavigation}>
        Or create a new account
      </Button>
      <Link to={Pages.FORGOT_PASSWORD}>Forgot Password?</Link>
    </Col>
  );
};

export { SignIn };
