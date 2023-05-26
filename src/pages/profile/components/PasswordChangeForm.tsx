import React from 'react';
import { Button, FormFeedback, FormGroup, Input, Label, Row } from 'reactstrap';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { toastr } from 'react-redux-toastr';
import * as Yup from 'yup';
import { apiRequest, handleApiError, handleError } from '../../../utils';

interface PasswordChangeFormValues {
  oldPassword: string;
  newPassword: string;
}

const PasswordChangeFormSchema = Yup.object().shape({
  oldPassword: Yup.string().min(12, 'Minimum 12 characters').required('Required'),
  newPassword: Yup.string().min(12, 'Minimum 12 characters').required('Required'),
});

const initialValues: PasswordChangeFormValues = {
  oldPassword: '',
  newPassword: '',
};

const PasswordChangeForm = () => {
  const handleSubmit = async (values: PasswordChangeFormValues) => {
    try {
      const response = await apiRequest('/user/password', { method: 'PATCH', data: values });

      if (response.data.message) {
        return handleApiError(response.data);
      }
      toastr.success('Success', 'Account password updated!');
    } catch (error) {
      handleError('UPDATE_PASSWORD', error);
      toastr.error('Error', 'Failed to update password.');
    }
  };

  return (
    <Row>
      <Formik initialValues={initialValues} validationSchema={PasswordChangeFormSchema} onSubmit={handleSubmit}>
        {({ errors, touched }) => (
          <Form>
            <Row>
              <FormGroup>
                <Label for="oldPassword">Old Password</Label>
                <Field
                  as={Input}
                  type="password"
                  autoComplete="current-password"
                  name="oldPassword"
                  id="oldPassword"
                  invalid={touched.oldPassword && !!errors.oldPassword}
                />
                <ErrorMessage name="oldPassword" component={FormFeedback} />
              </FormGroup>
            </Row>
            <Row>
              <FormGroup>
                <Label for="newPassword">New Password</Label>
                <Field
                  as={Input}
                  type="password"
                  autoComplete="new-password"
                  name="newPassword"
                  id="newPassword"
                  invalid={touched.newPassword && !!errors.newPassword}
                />
                <ErrorMessage name="newPassword" component={FormFeedback} />
              </FormGroup>
            </Row>
            <Button type="submit" color="primary">
              Sign Up
            </Button>
          </Form>
        )}
      </Formik>
    </Row>
  );
};

export { PasswordChangeForm };
