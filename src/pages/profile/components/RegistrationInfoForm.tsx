import React from 'react';
import { Button, Col, FormFeedback, FormGroup, Input, Label, Row } from 'reactstrap';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { toastr } from 'react-redux-toastr';
import * as Yup from 'yup';
import { apiRequest, handleApiError, handleError } from '../../../utils';

interface RegistrationInfoFormValues {
  firstName: string;
  lastName: string;
  age: number;
  weight: number;
  height: number;
  email: string;
}

const RegistrationInfoFormSchema = Yup.object().shape({
  firstName: Yup.string().required('Required'),
  lastName: Yup.string().required('Required'),
  age: Yup.number().integer('Must be an integer').min(18, 'Must be at least 18').required('Required'),
  weight: Yup.number().min(1, 'Must be at least 1').required('Required'),
  height: Yup.number().min(1, 'Must be at least 1').required('Required'),
  email: Yup.string().email('Invalid email address').required('Required'),
});

const initialValues: RegistrationInfoFormValues = {
  firstName: '',
  lastName: '',
  age: 18,
  weight: 0,
  height: 0,
  email: '',
};

const RegistrationInfoForm = () => {
  const handleSubmit = async (values: RegistrationInfoFormValues) => {
    try {
      const response = await apiRequest('/user', { method: 'PATCH', data: values });

      if (response.data.message) {
        return handleApiError(response.data);
      }
      toastr.success('Success', 'Account u[dated!');
    } catch (error) {
      handleError('USER_DATA_UPDATE', error);
      toastr.error('Error', 'Failed to update the data.');
    }
  };

  return (
    <Row>
      <Formik initialValues={initialValues} validationSchema={RegistrationInfoFormSchema} onSubmit={handleSubmit}>
        {({ errors, touched }) => (
          <Form>
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
            <Button type="submit" color="primary">
              Update
            </Button>
          </Form>
        )}
      </Formik>
    </Row>
  );
};

export { RegistrationInfoForm };
