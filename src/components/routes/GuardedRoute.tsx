import React, { Suspense } from 'react';
import { Navigate } from 'react-router';
import { Row, Spinner } from 'reactstrap';
import { shallowEqual, useSelector } from 'react-redux';
import { ErrorBoundary } from '../error-boundary';
import { Pages } from '../../enums';
import { AppState } from '../../store/interfaces';

const GuardedRoute = ({ children }: { children: any }) => {
  const { user } = useSelector(
    (state: AppState) => ({
      user: state.user,
    }),
    shallowEqual
  );

  if (!user._id) {
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
  }

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

export { GuardedRoute };
