import React, { Suspense } from 'react';
import { Navigate } from 'react-router';
import { Row, Spinner } from 'reactstrap';
import { ErrorBoundary } from '../error-boundary';
import { Pages } from '../../enums';

const NotFoundRoute = () => {
  return (
    <ErrorBoundary>
      <Suspense
        fallback={
          <Row className="my-5 w-100 align-items-center justify-content-center">
            <Spinner color="primary" />
          </Row>
        }
      >
        <Navigate to={Pages.WELCOME} />
      </Suspense>
    </ErrorBoundary>
  );
};

export { NotFoundRoute };
