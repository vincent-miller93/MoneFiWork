import React from "react";
import PropTypes from "prop-types";
import debug from "sabio-debug";
import { Card, Image, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./lendersCard.css";

const _logger = debug.extend("lender");

function LenderCard(props) {
  _logger(props, "lenderObj");
  const alender = props.theLender;

  return (
    <React.Fragment>
      <Col xl={3} lg={4} md={6} sm={8}>
        <Card className="mb-4  border border-dark">
          <Card.Body>
            <div className="text-center">
              <Image
                src={alender.logo}
                className="rounded-circle avatar-xl mb-3"
                alt="logo"
              />
              <h4 className="mb-1">{alender.name}</h4>
              <p className="mb-0 fs-6">
                <i className="fe fe-map-pin me-1"></i>
                {alender.location.city}
              </p>
              <Link
                to={{
                  pathname: `/lender/${alender.id}`,
                }}
                state={alender}
                className="btn btn-sm btn-outline-white mt-3"
              >
                View More
              </Link>
            </div>
            <div className="d-flex justify-content-between border-bottom py-2 mt-4 fs-6">
              <span className="text-dark">{alender.lenderType.name}</span>
            </div>
            <div className="d-flex justify-content-between pt-2 fs-6">
              <span className="text-dark">{alender.loanType.name}</span>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </React.Fragment>
  );
}

LenderCard.propTypes = {
  theLender: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    logo: PropTypes.string,
    website: PropTypes.string.isRequired,
    lenderType: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
    loanType: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
    location: PropTypes.shape({
      city: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default LenderCard;
