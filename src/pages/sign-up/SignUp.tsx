import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormGroup, Label, Input, Button, FormFeedback, Row, Col, InputGroup } from 'reactstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { shallowEqual, useSelector } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import * as Yup from 'yup';
import { EyeSlash } from '@styled-icons/bootstrap/EyeSlash';
import { EyeFill } from '@styled-icons/bootstrap/EyeFill';
import { handleApiError, apiRequest, handleError } from '../../utils';
import { Pages, SupportedLanguages } from '../../enums';
import { AppState } from '../../store/interfaces';

interface SignUpFormValues {
  firstName: string;
  lastName: string;
  age: number;
  weight: number;
  height: number;
  email: string;
  password: string;
  passwordRepeat: string;
}

const SignUpFormSchema = Yup.object().shape({
  firstName: Yup.string().required('Required'),
  lastName: Yup.string().required('Required'),
  age: Yup.number().integer('Must be an integer').min(18, 'Must be at least 18').required('Required'),
  weight: Yup.number().min(1, 'Must be at least 1').required('Required'),
  height: Yup.number().min(1, 'Must be at least 1').required('Required'),
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().min(12, 'Minimum 12 characters').required('Required'),
  passwordRepeat: Yup.string()
    .min(12, 'Minimum 12 characters')
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Required'),
});

const initialValues: SignUpFormValues = {
  firstName: '',
  lastName: '',
  age: 18,
  weight: 0,
  height: 0,
  email: '',
  password: '',
  passwordRepeat: '',
};

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useSelector(
    (state: AppState) => ({
      user: state.user,
    }),
    shallowEqual
  );
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [passwordRepeatVisibility, setPasswordRepeatVisibility] = useState(false);

  useEffect(() => {
    if (user._id) navigate(Pages.PROFILE);
  }, [user]);

  const handleSubmit = async (values: SignUpFormValues) => {
    try {
      const response = await apiRequest('/user/sign-up', {
        method: 'POST',
        data: { ...values, preferredLanguage: SupportedLanguages.EN, dietPlan: user.dietPlan },
      });

      if (response.data.message) {
        return handleApiError(response.data);
      }
      toastr.success('Success', 'Account created! Check your email for verification message.');
      navigate('/sign-in');
    } catch (error) {
      handleError('SIGN_UP', error);
      toastr.error('Error', 'Failed to sign up.');
    }
  };

  const onLoginNavigation = () => navigate(Pages.SIGN_IN);

  const handlePasswordInputType = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  const handlePasswordRepeatInputType = () => {
    setPasswordRepeatVisibility(!passwordRepeatVisibility);
  };

  return (
    <Col md={4} className="d-flex flex-column align-content-center justify-content-center gap-4">
      <h1 className="text-center">Sign Up</h1>
      <Formik initialValues={initialValues} validationSchema={SignUpFormSchema} onSubmit={handleSubmit}>
        {({ errors, touched }) => (
          <Form className="d-flex flex-column">
            <Row>
              <Col>
                <FormGroup>
                  <Label for="firstName">First name</Label>
                  <Field as={Input} type="text" name="firstName" id="firstName" invalid={touched.firstName && !!errors.firstName} />
                  <ErrorMessage name="firstName" component={FormFeedback} />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="lastName">Last name</Label>
                  <Field as={Input} type="text" name="lastName" id="lastName" invalid={touched.lastName && !!errors.lastName} />
                  <ErrorMessage name="lastName" component={FormFeedback} />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup>
                  <Label for="age">Age</Label>
                  <Field as={Input} type="number" name="age" id="age" min={18} invalid={touched.age && !!errors.age} />
                  <ErrorMessage name="age" component={FormFeedback} />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="height">Height (cm)</Label>
                  <Field as={Input} type="number" name="height" id="height" min={1} invalid={touched.height && !!errors.height} />
                  <ErrorMessage name="height" component={FormFeedback} />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="weight">Weight (kg)</Label>
                  <Field as={Input} type="number" name="weight" id="weight" min={1} invalid={touched.weight && !!errors.weight} />
                  <ErrorMessage name="weight" component={FormFeedback} />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <FormGroup>
                <Label for="email">Email</Label>
                <Field as={Input} type="email" autoComplete="email" name="email" id="email" invalid={touched.email && !!errors.email} />
                <ErrorMessage name="email" component={FormFeedback} />
              </FormGroup>
            </Row>
            <Row>
              <FormGroup>
                <Label for="password">Password</Label>
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
            <Row>
              <FormGroup>
                <Label for="passwordRepeat">Repeat Password</Label>
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
            </Row>
            <Button color="primary" className="fw-semibold">
              Sign Up
            </Button>
          </Form>
        )}
      </Formik>
      <Button color="dark" onClick={onLoginNavigation}>
        Or log in
      </Button>
    </Col>
  );
};

export { SignUp };
