import React, { useState } from 'react';
import { Col, Nav, NavItem, NavLink, Row, TabContent, TabPane } from 'reactstrap';
import { Link } from 'react-router-dom';
import { PasswordChangeForm, ProductList, RegistrationInfoForm } from './components';
import { Pages } from '../../enums';
import { Product } from '../../types';
import { SuggestedMealsListPage } from '../suggested-meals';

enum ProfileTabs {
  REGISTRATION_DATA = 'REGISTRATION_DATA',
  PRODUCTS_LIST = 'PRODUCTS_LIST',
  SUGGESTED_MEALS = 'SUGGESTED_MEALS',
}

const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ProfileTabs>(ProfileTabs.REGISTRATION_DATA);
  const [products, setProducts] = useState<Product[]>([]);

  const toggleTab = (tab: ProfileTabs) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  return (
    <Row className="w-100">
      <Col>
        <Nav tabs>
          <NavItem>
            <NavLink className={activeTab === ProfileTabs.REGISTRATION_DATA ? 'active' : ''} onClick={() => toggleTab(ProfileTabs.REGISTRATION_DATA)}>
              Registration Info
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className={activeTab === ProfileTabs.PRODUCTS_LIST ? 'active' : ''} onClick={() => toggleTab(ProfileTabs.PRODUCTS_LIST)}>
              Products
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className={activeTab === ProfileTabs.SUGGESTED_MEALS ? 'active' : ''} onClick={() => toggleTab(ProfileTabs.SUGGESTED_MEALS)}>
              Suggested Meals
            </NavLink>
          </NavItem>
        </Nav>

        <TabContent activeTab={activeTab} className="py-3">
          <TabPane tabId={ProfileTabs.REGISTRATION_DATA} className="d-flex align-items-center justify-content-center">
            <Col className="w-50 d-flex flex-column align-items-center justify-content-center gap-5">
              <RegistrationInfoForm />
              <PasswordChangeForm />
              <Row>
                <Link to={Pages.DIET_DETAILS}>Change your Diet Plan</Link>
              </Row>
            </Col>
          </TabPane>
          <TabPane tabId={ProfileTabs.PRODUCTS_LIST}>
            <ProductList products={products} setProducts={setProducts} />
          </TabPane>
          <TabPane tabId={ProfileTabs.SUGGESTED_MEALS}>
            <SuggestedMealsListPage />
          </TabPane>
        </TabContent>
      </Col>
    </Row>
  );
};

export { Profile };
