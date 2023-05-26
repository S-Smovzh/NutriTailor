import { useEffect, useState } from 'react';
import { Col, Row } from 'reactstrap';
import { toastr } from 'react-redux-toastr';
import { ProductCreationForm } from '../../../components';
import { apiRequest, handleApiError, handleError } from '../../../utils';
import { Product } from '../../../types';

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await apiRequest('/user/products');

        if (response.data) {
          const { message, products } = response.data;
          if (message) {
            return handleApiError(response.data);
          }
          setProducts(products);
        } else {
          toastr.error('Error', 'Failed to load your products.');
        }
      } catch (error) {
        handleError('RESET_PASSWORD', error);
        toastr.error('Error', 'Failed to reset password.');
      }
    })();
  }, []);

  return (
    <Col>
      <Row>
        <h2>Your Products</h2>
      </Row>
      <Row>
        <h4>Add new product</h4>
        <ProductCreationForm />
      </Row>
      <Row>
        {products.map((product) => (
          <ProductCreationForm key={`${product.name} - ${product.amount} ${product.measurement}`} initialValues={product} />
        ))}
      </Row>
    </Col>
  );
};

export { ProductList };
