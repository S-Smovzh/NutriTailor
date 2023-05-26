import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FormGroup, Label, Input, Button, FormFeedback, Row, Col } from 'reactstrap';
import { toastr } from 'react-redux-toastr';
import * as Yup from 'yup';
import { handleApiError, apiRequest, handleError } from '../../utils';
import { Product } from '../../types';

interface ProductCreationFormProps {
  initialValues?: Product;
}

interface ProductCreationFormValues {
  name: string;
  measurement: string;
  amount: number;
}

const ProductCreationFormSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  measurement: Yup.string().required('Required'),
  amount: Yup.number().integer('Must be an integer').min(1, 'Must be at least 1').required('Required'),
});

const productCreationFormMeasureOptions = [
  { value: 'grams', label: 'Grams' },
  { value: 'milliliters', label: 'Milliliters' },
  { value: 'units', label: 'Units' },
];

const ProductCreationForm: React.FC<ProductCreationFormProps> = ({ initialValues }) => {
  const handleSubmit = async (values: ProductCreationFormValues) => {
    try {
      const response = await apiRequest('/user/products', { method: 'PATCH', data: values });

      if (response.data.message) {
        return handleApiError(response.data);
      }

      toastr.success('Success', 'Product created successfully!');
    } catch (error) {
      handleError('PRODUCT_FORM', error);
      toastr.error('Error', 'Failed to create product.');
    }
  };

  return (
    <Formik initialValues={initialValues || { name: '', measurement: '', amount: 1 }} validationSchema={ProductCreationFormSchema} onSubmit={handleSubmit}>
      {({ errors, touched, values, setFieldValue }) => (
        <Form>
          <Row>
            <Col>
              <FormGroup>
                <Label for="name">Product Name</Label>
                <Field as={Input} type="text" name="name" id="name" invalid={touched.name && !!errors.name} />
                <ErrorMessage name="name" component={FormFeedback} />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="measurement">Measure</Label>
                <Field as={Input} type="select" name="measurement" id="measurement" invalid={touched.measurement && !!errors.measurement}>
                  <option value="">Select a measurement</option>
                  {productCreationFormMeasureOptions.map(({ value, label }) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </Field>
                <ErrorMessage name="measurement" component={FormFeedback} />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="amount">Quantity</Label>
                <Row>
                  <Col>
                    <Button type="button" color="secondary" disabled={values.amount <= 1} onClick={() => setFieldValue('amount', values.amount - 1)}>
                      -
                    </Button>
                  </Col>
                  <Col>
                    <Field
                      as={Input}
                      type="number"
                      name="amount"
                      id="amount"
                      min={1}
                      invalid={touched.amount && !!errors.amount}
                      className="mx-3 w-100 text-center"
                    />
                  </Col>
                  <Col>
                    <Button type="button" color="secondary" onClick={() => setFieldValue('amount', values.amount + 1)}>
                      +
                    </Button>
                  </Col>
                </Row>
                <ErrorMessage name="amount" component={FormFeedback} />
              </FormGroup>
            </Col>
            <Button type="submit" color="primary">
              {initialValues ? 'Update' : 'Create'} Product
            </Button>
          </Row>
        </Form>
      )}
    </Formik>
  );
};

export { ProductCreationForm };
