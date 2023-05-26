import React, { Suspense } from 'react';
import { Row, Spinner } from 'reactstrap';
import { ErrorBoundary } from '../error-boundary';

const PublicRoute = ({ children }: { children: any }) => {
  return (
    <ErrorBoundary>
      <Suspense
        fallback={
          <Row className="my-5 w-100 align-items-center justify-content-center">
            <Spinner color="primary" />
          </Row>
        }
      >
        {children}
      </Suspense>
    </ErrorBoundary>
  );
};

export { PublicRoute };
