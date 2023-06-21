// import { useEffect, useState } from 'react';
import { Col, Row } from 'reactstrap';
// import { toastr } from 'react-redux-toastr';
import { ProductCreationForm } from '../../../components';
// import { apiRequest, handleApiError, handleError } from '../../../utils';
import { Product } from '../../../types';

const ProductList = ({ products, setProducts }: ProductListProps) => {
  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const response = await apiRequest('/user/products');
  //
  //       if (response.data) {
  //         const { message, products } = response.data;
  //         if (message) {
  //           return handleApiError(response.data);
  //         }
  //         setProducts(products);
  //       } else {
  //         toastr.error('Error', 'Failed to load your products.');
  //       }
  //     } catch (error) {
  //       handleError('RESET_PASSWORD', error);
  //       toastr.error('Error', 'Failed to reset password.');
  //     }
  //   })();
  // }, []);

  return (
    <Col className="d-flex flex-column gap-3">
      <Row>
        <h6>Add new product</h6>
        <ProductCreationForm onCreate={(newProduct) => setProducts([...products, newProduct])} setProducts={setProducts} products={products} />
      </Row>
      <Row>
        {products.map((product) => (
          <ProductCreationForm key={`${product.name} - ${product.amount} ${product.measurement}`} initialValues={product} onCreate={(newProduct) => setProducts([...products, newProduct])} setProducts={setProducts} products={products} />
        ))}
      </Row>
    </Col>
  );
};

type ProductListProps = {
  products: Product[];
  setProducts: (products: Product[]) => void;
};

export { ProductList };
