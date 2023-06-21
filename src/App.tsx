import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { Container, Row, Spinner } from 'reactstrap';
import { useDispatch } from 'react-redux';
import Cookies from 'universal-cookie';
import {
  SuggestedMealsListPage,
  Attribution,
  DietDetails,
  ForgotPassword,
  MealListPage,
  MealPage,
  Profile,
  ResetPassword,
  SignIn,
  SignUp,
  Welcome,
} from './pages';
import { CustomNavbar, GuardedRoute, NotFoundRoute, PublicRoute } from './components';
import { UserSlice } from './store';
import { Pages } from './enums';
import './App.scss';
import { apiRequest, handleApiError, handleError } from './utils';
import { toastr } from 'react-redux-toastr';

const cookies = new Cookies();

const App = () => {
  const location = useLocation();
  const [search] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const { reloadUser } = UserSlice.actions;

  useEffect(() => {
    window.scrollTo(0, 0);
    try {
      const user = JSON.parse(window.atob(cookies.get('user')));
      dispatch(reloadUser(user));
    } catch (err) {
      console.error("Couldn't parse cookie");
      cookies.remove('user');
    } finally {
      setIsLoading(false);
    }
  }, [cookies]);

  useEffect(() => {
    (async () => {
      if (location.pathname.includes('verify-email')) {
        try {
          const response = await apiRequest(
            `/user/activate-account?isEmailVerification=true&activationToken=${search.get('token')}`,
            {
              method: 'PATCH',
            },
            true
          );

          if (!response.data.success) {
            return handleApiError(response.data);
          }
          toastr.success('Success', 'Account activated! Now you can log in.');
          navigate('/sign-in');
        } catch (error) {
          handleError('ACCOUNT_ACTIVATION', error);
          toastr.error('Error', 'Failed to activate account. Use the link from email one more time.');
        }
      }
    })();
  }, [location]);

  return (
    <div className="d-flex flex-column flex-nowrap h-100 w-100">
      <CustomNavbar />
      <Container className="pt-2 content d-flex align-content-center justify-content-center">
        {isLoading && (
          <Row className="my-5 w-100 align-items-center justify-content-center">
            <Spinner color="primary" />
          </Row>
        )}
        {!isLoading && (
          <Routes>
            <Route
              path={Pages.DIET_DETAILS}
              element={
                <GuardedRoute>
                  <DietDetails />
                </GuardedRoute>
              }
            />
            <Route
              path={Pages.DIET_PLANNING}
              element={
                <GuardedRoute>
                  <SuggestedMealsListPage />
                </GuardedRoute>
              }
            />
            <Route
              path={Pages.ATTRIBUTION}
              element={
                <PublicRoute>
                  <Attribution />
                </PublicRoute>
              }
            />
            <Route
              path={Pages.FORGOT_PASSWORD}
              element={
                <PublicRoute>
                  <ForgotPassword />
                </PublicRoute>
              }
            />
            <Route
              path={Pages.MEAL}
              element={
                <PublicRoute>
                  <MealPage />
                </PublicRoute>
              }
            />
            <Route
              path={Pages.MEALS_LIST}
              element={
                <PublicRoute>
                  <MealListPage />
                </PublicRoute>
              }
            />
            <Route
              path={Pages.RESET_PASSWORD}
              element={
                <PublicRoute>
                  <ResetPassword />
                </PublicRoute>
              }
            />
            <Route
              path={Pages.WELCOME}
              element={
                <PublicRoute>
                  <Welcome />
                </PublicRoute>
              }
            />
            <Route
              path={Pages.SIGN_UP}
              element={
                <PublicRoute>
                  <SignUp />
                </PublicRoute>
              }
            />
            <Route
              path={Pages.SIGN_IN}
              element={
                <PublicRoute>
                  <SignIn />
                </PublicRoute>
              }
            />
            <Route
              path={Pages.PROFILE}
              element={
                <GuardedRoute>
                  <Profile />
                </GuardedRoute>
              }
            />
            <Route path="*" element={<NotFoundRoute />} />
          </Routes>
        )}
      </Container>
    </div>
  );
};

export default App;
