import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import debug from "sabio-debug";
import {
  Card,
  Col,
  Container,
  Row,
  Tab,
  Nav,
  ListGroup,
  Breadcrumb,
} from "react-bootstrap";
import { Link } from "react-router-dom";
// import LenderEdit from "./LenderEdit";

const _logger = debug.extend("lenderInfo");

function LenderInfo(props) {
  _logger(props, "should be props");
  const [newLender, setNewLender] = useState({
    id: 0,
    lenderType: {},
    loanType: {},
    statusType: {},
    location: {},
    dateCreated: "",
    dateModified: "",
    name: "",
    logo: "",
    website: "",
    statusId: 0,
    createdBy: 0,
    modifiedBy: 0,
  });
  // const [isEditing, setIsEditing] = useState(false);
  const { state } = useLocation();

  useEffect(() => {
    if (state !== null) {
      setNewLender(state);
      _logger(state, "hydrated object");
    }
  }, [state]);

  return (
    <React.Fragment>
      <Col lg={12} md={12} sm={12}>
        <div className="border-bottom pb-4 mb-4 d-md-flex align-items-center justify-content-between">
          <div className="mb-3 mb-md-0">
            <Breadcrumb>
              <Breadcrumb.Item href="#">Dashboard</Breadcrumb.Item>
              <Breadcrumb.Item href="/lenders">Lenders</Breadcrumb.Item>
              <Breadcrumb.Item active>Lender Information</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div>
            <Link to="/lenders" className="btn btn-primary">
              Back To Lenders
            </Link>
          </div>
        </div>
      </Col>
      <div className="pt-lg-8 pb-lg-16 pt-8 pb-12 bg-primary">
        <Container>
          <Row className="align-items-center">
            <Col xl={7} lg={7} md={12} sm={12}>
              <div>
                <h1 className="text-white display-4 fw-semi-bold">
                  {newLender.name}
                </h1>
                <p className="text-white mb-6 lead">{newLender.description}</p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="pb-10">
        <Container>
          <Row>
            <Col lg={8} md={12} className="mt-n8 mb-4 mb-lg-0">
              <Tab.Container defaultActiveKey="contents">
                <Card>
                  <Nav className="nav-lb-tab">
                    {["Contents", "Description", "Reviews", "Location"].map(
                      (item, index) => (
                        <Nav.Item key={index}>
                          <Nav.Link
                            href={`#${item.toLowerCase()}`}
                            eventKey={item.toLowerCase()}
                            className="mb-sm-3 mb-md-0"
                          >
                            {item}
                          </Nav.Link>
                        </Nav.Item>
                      )
                    )}
                  </Nav>
                  <Card.Body className="p-0">
                    <Tab.Content>
                      <Tab.Pane eventKey="contents" className="pb-4 pt-3 px-4">
                        <h2>Lender Name: {newLender.name}</h2>
                        <h4>Status: {newLender.statusType.name}</h4>
                        <h4>Lender Type: {newLender.lenderType.name}</h4>
                        <h4>Loan Type: {newLender.loanType.name}</h4>
                      </Tab.Pane>
                      <Tab.Pane eventKey="description" className="pb-4 p-4">
                        {/* Description */}
                        <h4>{newLender.description}</h4>
                      </Tab.Pane>
                      <Tab.Pane eventKey="reviews" className="pb-4 p-4">
                        {/* Reviews */}
                        <h4>
                          Any future review component displaying lender company
                          reviews
                        </h4>
                      </Tab.Pane>
                      <Tab.Pane eventKey="location" className="pb-4 p-4">
                        {/* Location */}
                        <h4>Future location component.</h4>
                        <h4>Address: {newLender.location.lineOne}</h4>
                        <h4>AddressCont: {newLender.location.lineTwo}</h4>
                        <h4>City: {newLender.location.city}</h4>
                        <h4>State: {newLender.location.state}</h4>
                        <h4>Zip: {newLender.location.zip}</h4>
                      </Tab.Pane>
                    </Tab.Content>
                  </Card.Body>
                </Card>
              </Tab.Container>
            </Col>
            <Col lg={4} md={12} sm={12} className="mt-lg-n22">
              <Card className="mb-3 mb-4">
                <div className="p-1">
                  <img
                    src={newLender.logo}
                    className="img-thumbnail img-fluid"
                    alt="LenderLogo"
                  />
                </div>
                <Card.Body>
                  <div className="mb-3">
                    <span className="text-dark fw-bold h2 me-2">
                      {newLender.lenderType.name}
                    </span>
                  </div>
                  <div className="mb-3">
                    <span className="text-dark fw-bold h2 me-2">
                      {newLender.loanType.name}
                    </span>
                  </div>
                  <div className="d-grid">
                    <Link to="#" className="btn btn-primary mb-2  ">
                      Apply!
                    </Link>
                    <Link
                      to={{
                        pathname: `/lender/${newLender.id}/edit/`,
                      }}
                      state={newLender}
                      className="btn btn-primary mb-2  "
                    >
                      Edit
                    </Link>
                  </div>
                </Card.Body>
              </Card>
              <Card className="mb-4">
                {/* Card header */}
                <Card.Header>
                  <h4 className="mb-0">What’s included</h4>
                </Card.Header>
                {/* Card Body */}
                <Card.Body className="p-0">
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <i className="fe fe-award align-middle me-2 text-primary"></i>
                      Example perk
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <i className="fe fe-award me-2 align-middle text-success"></i>
                      Example perk
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <i className="fe fe-calendar align-middle me-2 text-info"></i>
                      Created: {newLender.dateCreated}
                    </ListGroup.Item>
                    <ListGroup.Item className="bg-transparent">
                      <i className="fe fe-clock align-middle me-2 text-warning"></i>
                      {newLender.statusType.name}
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
}

export default React.memo(LenderInfo);
