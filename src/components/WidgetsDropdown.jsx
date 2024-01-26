import { Col, Container, Dropdown, Row } from "react-bootstrap";

const WidgetsDropdown = () => {
  const randomData = () => {
    return Math.floor(Math.random() * (100 - 1 + 1)) + 1;
  };

  // Set a fixed width and height for the cards
  const cardStyle = { width: '250px', height: '180px' };

  return (
    <Container>
      <Row className="row">
      {/* Card 1 */}
      <Col className="col-3 col-md-3 col-lg-3 mb-4">
        <div className="card text-white bg-primary" style={cardStyle}>
          <div className="card-body pb-0 d-flex justify-content-between align-items-start">
            <div>
              <h4 className="mb-0">{randomData()}K</h4>
              <span className="text-white-50"><h4>New Order</h4></span>
            </div>
            <Dropdown>
              <Dropdown.Toggle as="a" href="#" className="text-white-50">
                {/* <CIcon icon={cilOptions} /> */}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>Action</Dropdown.Item>
                <Dropdown.Item>Another action</Dropdown.Item>
                <Dropdown.Item>Something else here...</Dropdown.Item>
                <Dropdown.Item disabled>Disabled action</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className="chart-wrapper mt-3 mx-3" style={{ height: "70px" }}>
            <div className="chart" />
          </div>
        </div>
      </Col>
      <Col className="col-3 col-md-3 col-lg-3 mb-4">
        <div className="card text-white bg-success" style={cardStyle}>
          <div className="card-body pb-0 d-flex justify-content-between align-items-start">
            <div>
              <h4 className="mb-0">{randomData()} %</h4>
              <span className="text-white-50"><h4>Bounce Rate</h4></span>
            </div>
            <Dropdown>
              <Dropdown.Toggle as="a" href="#" className="text-white-50">
                {/* <CIcon icon={cilOptions} /> */}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>Action</Dropdown.Item>
                <Dropdown.Item>Another action</Dropdown.Item>
                <Dropdown.Item>Something else here...</Dropdown.Item>
                <Dropdown.Item disabled>Disabled action</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className="chart-wrapper mt-3 mx-3" style={{ height: "70px" }}>
            <div className="chart" />
          </div>
        </div>
      </Col>
      <Col className="col-3 col-md-3 col-lg-3 mb-4">
        <div className="card text-white bg-warning" style={cardStyle}>
          <div className="card-body pb-0 d-flex justify-content-between align-items-start">
            <div>
              <h4 className="mb-0">{randomData()}K</h4>
              <span className="text-white-50"><h4>User Registration</h4></span>
            </div>
            <Dropdown>
              <Dropdown.Toggle as="a" href="#" className="text-white-50">
                {/* <CIcon icon={cilOptions} /> */}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>Action</Dropdown.Item>
                <Dropdown.Item>Another action</Dropdown.Item>
                <Dropdown.Item>Something else here...</Dropdown.Item>
                <Dropdown.Item disabled>Disabled action</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className="chart-wrapper mt-3 mx-3" style={{ height: "70px" }}>
            <div className="chart" />
          </div>
        </div>
      </Col>
      <Col className="col-3 col-md-3 col-lg-3 mb-4">
        <div className="card text-white bg-danger" style={cardStyle}>
          <div className="card-body pb-0 d-flex justify-content-between align-items-start">
            <div>
              <h4 className="mb-0">{randomData()}K</h4>
              <span className="text-white-50"><h4>Unique Visitor</h4></span>
            </div>
            <Dropdown>
              <Dropdown.Toggle as="a" href="#" className="text-white-50">
                {/* <CIcon icon={cilOptions} /> */}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>Action</Dropdown.Item>
                <Dropdown.Item>Another action</Dropdown.Item>
                <Dropdown.Item>Something else here...</Dropdown.Item>
                <Dropdown.Item disabled>Disabled action</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className="chart-wrapper mt-3 mx-3" style={{ height: "70px" }}>
            <div className="chart" />
          </div>
        </div>
      </Col>

    </Row>
    </Container>
  );
};

export default WidgetsDropdown;
