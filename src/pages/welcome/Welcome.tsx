import React, { useEffect } from 'react';
import { Button, Card, CardBody, CardGroup, CardTitle, Col, Row } from 'reactstrap';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { UserSlice } from '../../store';
import { DietPlan, Pages } from '../../enums';
import { AppState } from '../../store/interfaces';

const Welcome = () => {
  const { user } = useSelector(
    (state: AppState) => ({
      user: state.user,
    }),
    shallowEqual
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { setDietPlan } = UserSlice.actions;

  useEffect(() => {
    if (user._id) navigate(Pages.PROFILE);
  }, [user]);

  const handleCardClick = (dietPlan: DietPlan) => {
    dispatch(setDietPlan({ dietPlan }));
    navigate('/sign-up');
  };

  return (
    <Col className="p-5 d-flex align-items-center gap-5 flex-column">
      <h1>Welcome! Select a Diet Plan</h1>
      <Row className="d-flex align-items-center flex-nowrap">
        <Col>
          <Card onClick={() => handleCardClick(DietPlan.HEALTH_MAINTENANCE)} className="welcome-card cursor-pointer">
            <CardBody className="d-flex justify-content-between flex-column">
              <CardTitle tag="h5">Healthy Lifestyle</CardTitle>
              <p>A diet plan that focuses on maintaining a healthy lifestyle with a balanced mix of nutrients and exercise.</p>
              <Button color="primary" className="fw-semibold">
                Try it!
              </Button>
            </CardBody>
          </Card>
        </Col>
        <Col>
          <Card onClick={() => handleCardClick(DietPlan.BULKING)} className="welcome-card cursor-pointer">
            <CardBody className="d-flex justify-content-between flex-column">
              <CardTitle tag="h5">Bulking Diet</CardTitle>
              <p>A diet plan designed to help you gain muscle mass and increase body weight.</p>
              <Button color="primary" className="fw-semibold">
                Try it!
              </Button>
            </CardBody>
          </Card>
        </Col>
        <Col>
          <Card onClick={() => handleCardClick(DietPlan.CUTTING)} className="welcome-card cursor-pointer">
            <CardBody className="d-flex justify-content-between flex-column">
              <CardTitle tag="h5">Cutting Diet</CardTitle>
              <p>A diet plan designed to help you lose body fat and achieve a leaner physique.</p>
              <Button color="primary" className="fw-semibold">
                Try it!
              </Button>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Col>
  );
};

export { Welcome };
