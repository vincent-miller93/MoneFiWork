import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Col, Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";
import debug from "sabio-debug";
import LenderForm from "./LenderForm";

const _logger = debug.extend("lenderAddOrEdit");

function LenderAdd() {
  const [lender, setLender] = useState({});
  _logger(lender, "Props for edit");

  const { state } = useLocation();

  useEffect(() => {
    if (state !== null) {
      setLender(state);
      _logger(state, "hydrated object");
    }
  }, [state]);

  if (state) {
    return (
      <React.Fragment>
        <Col lg={12} md={12} sm={12}>
          <div className="border-bottom pb-4 mb-4 d-md-flex align-items-center justify-content-between">
            <div className="mb-3 mb-md-0">
              <h1 className="mb-1 h2 fw-bold">Edit Lender</h1>
              <Breadcrumb>
                <Breadcrumb.Item href="#">Dashboard</Breadcrumb.Item>
                <Breadcrumb.Item href="/lenders">Lenders</Breadcrumb.Item>
                <Breadcrumb.Item active>Edit Lender</Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <div>
              <Link to="/lenders" className="btn btn-primary">
                Back To Lenders
              </Link>
            </div>
          </div>
        </Col>
        <LenderForm state={lender}></LenderForm>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <Col lg={12} md={12} sm={12}>
          <div className="border-bottom pb-4 mb-4 d-md-flex align-items-center justify-content-between">
            <div className="mb-3 mb-md-0">
              <h1 className="mb-1 h2 fw-bold">Create New Lender</h1>
              <Breadcrumb>
                <Breadcrumb.Item href="#">Dashboard</Breadcrumb.Item>
                <Breadcrumb.Item href="/lenders">Lenders</Breadcrumb.Item>
                <Breadcrumb.Item active>Create Lender</Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <div>
              <Link to="/lenders" className="btn btn-primary">
                Back To Lenders
              </Link>
            </div>
          </div>
        </Col>
        <LenderForm state={lender}></LenderForm>
      </React.Fragment>
    );
  }
}

export default LenderAdd;
