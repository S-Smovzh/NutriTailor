import { Component, ErrorInfo, ReactElement, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
import { Pages } from '../../enums';

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: '', errorInfo: '' };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      hasError: true,
      error: JSON.stringify(error.message),
      errorInfo: JSON.stringify(errorInfo.componentStack),
    });
  }

  render() {
    const { hasError, error, errorInfo } = this.state;

    if (hasError) {
      return (
        <Row className="align-items-center justify-content-center align-self-center">
          <Col md={8} className="d-flex flex-column align-items-center">
            {error && <h1 className="mb-5 text-danger text-wrap">Error: {error}</h1>}
            {errorInfo && (
              <p className="mb-5 text-wrap">
                <span className="h6">Error Info:</span> {errorInfo}
              </p>
            )}
            <Col md={4}>
              <Link color="secondary" to={Pages.MEALS_LIST} className="btn-md btn btn-secondary p-2">
                Back to the Main page
              </Link>
            </Col>
          </Col>
        </Row>
      );
    }

    return this.props.children;
  }
}

type ErrorBoundaryProps = {
  children?: ReactNode | ReactElement;
};

type ErrorBoundaryState = {
  hasError: boolean;
  error: string;
  errorInfo: string;
};

export { ErrorBoundary };
