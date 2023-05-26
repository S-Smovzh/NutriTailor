import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Card, CardBody, CardFooter, CardHeader, CardImg, Col, Row } from 'reactstrap';
import { AppState } from '../../store/interfaces';
import { UserSlice } from '../../store';
import { DietPlan } from '../../enums';
import { BULKING_DETAILS, BULKING_NAME, CUTTING_DETAILS, CUTTING_NAME, HEALTH_MAINTENANCE_DETAILS, HEALTH_MAINTENANCE_NAME } from '../../utils';
import healthMaintenance from './img/health-maintenance.jpg';
import cutting from './img/cutting.jpg';
import bulking from './img/bulking.jpg';

const DietDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { setDietPlan } = UserSlice.actions;
  const { user } = useSelector(
    (state: AppState) => ({
      user: state.user,
    }),
    shallowEqual
  );

  const onPlanSelect = (dietPlan: DietPlan) => {
    dispatch(setDietPlan({ dietPlan }));
    navigate(-1);
  };

  return (
    <Row className="align-items-stretch">
      <Col className="d-flex flex-column">
        <Card className={`h-100 ${user.dietPlan === DietPlan.HEALTH_MAINTENANCE ? 'bg-secondary' : ''}`}>
          <CardHeader>{HEALTH_MAINTENANCE_NAME}</CardHeader>
          <CardBody className="d-flex flex-column gap-3">
            {HEALTH_MAINTENANCE_DETAILS}
            <CardImg src={healthMaintenance} alt={HEALTH_MAINTENANCE_NAME} />
            After selection you will receive meal suggestions based on this plan.
          </CardBody>
          <CardFooter>
            <Button color="primary" onClick={() => onPlanSelect(DietPlan.HEALTH_MAINTENANCE)}>
              Select plan
            </Button>
          </CardFooter>
        </Card>
      </Col>
      <Col className="d-flex flex-column">
        <Card className={`h-100 ${user.dietPlan === DietPlan.CUTTING ? 'bg-secondary' : ''}`}>
          <CardHeader>{CUTTING_NAME}</CardHeader>
          <CardBody className="d-flex flex-column gap-3">
            {CUTTING_DETAILS}
            <CardImg src={cutting} alt={CUTTING_NAME} />
            After selection you will receive meal suggestions based on this plan.
          </CardBody>
          <CardFooter>
            <Button color="primary" onClick={() => onPlanSelect(DietPlan.CUTTING)}>
              Select plan
            </Button>
          </CardFooter>
        </Card>
      </Col>
      <Col className="d-flex flex-column">
        <Card className={`h-100 ${user.dietPlan === DietPlan.BULKING ? 'bg-secondary' : ''}`}>
          <CardHeader>{BULKING_NAME}</CardHeader>
          <CardBody className="d-flex flex-column gap-3">
            {BULKING_DETAILS}
            <CardImg src={bulking} alt={BULKING_NAME} />
            After selection you will receive meal suggestions based on this plan.
          </CardBody>
          <CardFooter>
            <Button color="primary" onClick={() => onPlanSelect(DietPlan.BULKING)}>
              Select plan
            </Button>
          </CardFooter>
        </Card>
      </Col>
    </Row>
  );
};

export { DietDetails };
