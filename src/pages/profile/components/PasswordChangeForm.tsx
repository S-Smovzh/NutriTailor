import React, { useState } from 'react';
import { Button, FormFeedback, FormGroup, Input, InputGroup, Label, Row } from 'reactstrap';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { toastr } from 'react-redux-toastr';
import * as Yup from 'yup';
import { apiRequest, handleApiError, handleError } from '../../../utils';
import { EyeSlash } from '@styled-icons/bootstrap/EyeSlash';
import { EyeFill } from '@styled-icons/bootstrap/EyeFill';

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
  const [oldPasswordVisibility, setOldPasswordVisibility] = useState(false);
  const [newPasswordVisibility, setNewPasswordVisibility] = useState(false);

  const handleSubmit = async (values: PasswordChangeFormValues) => {
    try {
      const response = await apiRequest('/user/update-password', { method: 'PATCH', data: values }, true);

      if (response.data.message) {
        return handleApiError(response.data);
      }
      toastr.success('Success', 'Account password updated!');
    } catch (error) {
      handleError('UPDATE_PASSWORD', error);
      toastr.error('Error', 'Failed to update password.');
    }
  };

  const handleOldPasswordInputType = () => {
    setOldPasswordVisibility(!oldPasswordVisibility);
  };

  const handleNewPasswordInputType = () => {
    setNewPasswordVisibility(!newPasswordVisibility);
  };

  return (
    <Row className="w-50">
      <h2 className="mb-3">Update Password</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={PasswordChangeFormSchema}
        onSubmit={async (values, formikHelpers) => {
          await handleSubmit(values);
          formikHelpers.setValues(initialValues);
          formikHelpers.setErrors({});
          formikHelpers.setTouched({});
        }}
        enableReinitialize
      >
        {({ errors, touched }) => (
          <Form>
            <Row>
              <FormGroup>
                <Label for="oldPassword">Old Password</Label>
                <InputGroup>
                  <Field
                    as={Input}
                    type={oldPasswordVisibility ? 'text' : 'password'}
                    autoComplete="current-password"
                    name="oldPassword"
                    id="oldPassword"
                    invalid={touched.oldPassword && !!errors.oldPassword}
                  />
                  <Button color="dark" className="d-flex align-content-center justify-content-center" onClick={handleOldPasswordInputType}>
                    {oldPasswordVisibility && <EyeSlash width={20} className="h-100" />}
                    {!oldPasswordVisibility && <EyeFill width={20} className="h-100" />}
                  </Button>
                </InputGroup>
                <ErrorMessage name="oldPassword" component={FormFeedback} />
              </FormGroup>
            </Row>
            <Row>
              <FormGroup>
                <Label for="newPassword">New Password</Label>
                <InputGroup>
                  <Field
                    as={Input}
                    type={newPasswordVisibility ? 'text' : 'password'}
                    autoComplete="new-password"
                    name="newPassword"
                    id="newPassword"
                    invalid={touched.newPassword && !!errors.newPassword}
                  />
                  <Button color="dark" className="d-flex align-content-center justify-content-center" onClick={handleNewPasswordInputType}>
                    {newPasswordVisibility && <EyeSlash width={20} className="h-100" />}
                    {!newPasswordVisibility && <EyeFill width={20} className="h-100" />}
                  </Button>
                </InputGroup>
                <ErrorMessage name="newPassword" component={FormFeedback} />
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

export { PasswordChangeForm };
