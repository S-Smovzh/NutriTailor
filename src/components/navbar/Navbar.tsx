import React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, Button } from 'reactstrap';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Pages } from '../../enums';
import { AppState } from '../../store/interfaces';
import { UserSlice } from '../../store';
import { useNavigate } from 'react-router-dom';

const CustomNavbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { logoutReducer } = UserSlice.actions;
  const { user } = useSelector(
    (state: AppState) => ({
      user: state.user,
    }),
    shallowEqual
  );

  const logout = () => {
    dispatch(logoutReducer);
    navigate(Pages.SIGN_IN);
  };

  return (
    <Navbar color="light" light expand="md">
      <NavbarBrand href="/">
        <div className="d-flex justify-content-center align-items-center gap-2">
          <img
            alt="logo"
            src="/logo.svg"
            style={{
              height: 40,
              width: 40,
            }}
          />
          NutriTailor
        </div>
      </NavbarBrand>
      <Nav className="mr-auto" navbar>
        <NavItem>
          <NavLink href={Pages.MEALS_LIST}>Meals</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href={Pages.ATTRIBUTION}>Attribution</NavLink>
        </NavItem>
        {user._id && (
          <>
            <NavItem>
              <NavLink href={Pages.DIET_DETAILS}>Diets</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href={Pages.DIET_PLANNING}>AI Suggestions</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href={Pages.PROFILE}>Profile</NavLink>
            </NavItem>
            <NavItem>
              <Button onClick={logout}>Sign out</Button>
            </NavItem>
          </>
        )}
        {!user._id && (
          <NavItem>
            <NavLink href={Pages.MEALS_LIST}>Sign In</NavLink>
          </NavItem>
        )}
      </Nav>
    </Navbar>
  );
};

export { CustomNavbar };
