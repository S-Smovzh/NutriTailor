import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FormGroup, Label, Input, Button, FormFeedback, Col } from 'reactstrap';
// import { toastr } from 'react-redux-toastr';
import * as Yup from 'yup';
// import { handleApiError, apiRequest, handleError } from '../../utils';
import { Product } from '../../types';
import './ProductForm.scss';
import { Measurement } from '../../enums';

interface ProductCreationFormProps {
  initialValues?: Product;
  products: Product[];
  onCreate: (newProduct: Product) => void;
  setProducts: (products: Product[]) => void;
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

const ProductCreationForm: React.FC<ProductCreationFormProps> = ({ initialValues, onCreate, setProducts, products }) => {
  const handleSubmit = async (values: ProductCreationFormValues) => {
    // try {
    //   const response = await apiRequest('/user/products', { method: 'PATCH', data: values });
    //
    //   if (response.data.message) {
    //     return handleApiError(response.data);
    //   }
    //
    //   toastr.success('Success', 'Product created successfully!');
    // } catch (error) {
    //   handleError('PRODUCT_FORM', error);
    //   toastr.error('Error', 'Failed to create product.');
    // }
    onCreate(values as Product);
  };

  const getStep = (measurment: Measurement) => {
    switch (measurment) {
      case Measurement.GRAMS:
        return 100;
      case Measurement.MILLILITERS:
        return 100;
      case Measurement.UNITS:
      default:
        return 1;
    }
  };

  const onDelete = (values: any) => {
    setProducts(products.filter((product) => product.name !== values.name && product.measurement !== values.measurement && product.amount !== values.amount));
  };

  return (
    <Formik
      initialValues={initialValues ?? { name: '', measurement: '', amount: 1 }}
      validationSchema={ProductCreationFormSchema}
      onSubmit={async (values, formikHelpers) => {
        await handleSubmit(values);
        formikHelpers.setValues(initialValues ?? { name: '', measurement: '', amount: 1 });
        formikHelpers.setErrors({});
        formikHelpers.setTouched({});
      }}
    >
      {({ errors, touched, values, setFieldValue }) => (
        <Form>
          <div className="d-flex align-items-end gap-3">
            <Col className="d-flex flex-column justify-content-end">
              <FormGroup>
                <Label for="name">Product Name</Label>
                <Field as={Input} type="text" name="name" id="name" invalid={touched.name && !!errors.name} />
                <ErrorMessage name="name" component={FormFeedback} />
              </FormGroup>
            </Col>
            <Col className="d-flex flex-column justify-content-end">
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
            <Col className="d-flex flex-column justify-content-end">
              <FormGroup>
                <Label for="amount">Quantity</Label>
                <div className="d-flex align-items-center justify-content-center gap-3">
                  <div>
                    <Button
                      type="button"
                      color="secondary"
                      disabled={values.amount <= 1}
                      onClick={() => setFieldValue('amount', values.amount - getStep(values.measurement as Measurement))}
                    >
                      -
                    </Button>
                  </div>
                  <div>
                    <Field
                      as={Input}
                      type="number"
                      name="amount"
                      id="amount"
                      min={0}
                      step={getStep(values.measurement as Measurement)}
                      max={undefined}
                      invalid={touched.amount && !!errors.amount}
                      className="w-100 text-center number-input"
                    />
                  </div>
                  <div>
                    <Button type="button" color="secondary" onClick={() => setFieldValue('amount', values.amount + getStep(values.measurement as Measurement))}>
                      +
                    </Button>
                  </div>
                </div>
                <ErrorMessage name="amount" component={FormFeedback} />
              </FormGroup>
            </Col>
            <Col className="d-flex flex-column justify-content-end">
              <Button type="submit" color="primary" className="mb-3">
                {initialValues ? 'Update' : 'Create'} Product
              </Button>
            </Col>
            <Col>
              <Button onClick={() => onDelete(values)} color="danger" className="mb-3">
                Delete
              </Button>
            </Col>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export { ProductCreationForm };
