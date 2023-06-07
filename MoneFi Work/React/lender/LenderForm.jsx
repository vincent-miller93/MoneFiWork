import React, { useEffect, useState } from "react";
import { Form, Col, Row, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router";
import { Formik, Field, ErrorMessage } from "formik";
import lendersService from "services/lenderService";
import debug from "sabio-debug";
import UploadFile from "components/files/UploadFile";
import toastr from "toastr";
import lenderValidationSchema from "schemas/lenderFormSchema";
import lookUpService from "services/lookUpService";
import PropTypes from "prop-types";

const LenderForm = ({ state }) => {
  const _logger = debug.extend("AddLender");
  const [initialValues, setInitialValues] = useState({
    id: 0,
    name: "",
    description: "",
    lenderTypeId: 0,
    loanTypeId: 0,
    logo: "",
    website: "",
    locationId: 0,
    statusId: 3,
  });
  const [lookUps, setLookUps] = useState({
    lenderTypes: [],
    loanTypes: [],
    statusTypes: [],
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (state !== null) {
      _logger(state, "hydrated object");
      setInitialValues((prevValues) => ({
        ...prevValues,
        id: state.id || 0,
        name: state.name || "",
        description: state.description || "",
        lenderTypeId: state.lenderType ? state.lenderType.id : 0,
        loanTypeId: state.loanType ? state.loanType.id : 0,
        logo: state.logo || "",
        website: state.website || "",
        locationId: state.location ? state.location.id : 0,
        statusId: state.statusType ? state.statusType.id : 3,
      }));
    }
  }, [state]);
  _logger(initialValues, "Props for form");

  const handleSubmit = (values, { setSubmitting }) => {
    _logger(values, "post submit");
    setInitialValues(values);
    const setSubmit = setSubmitting(false);

    if (state && state.id) {
      lendersService
        .lenderUpdate(state.id, values)
        .then(onUpdateSuccess)
        .catch(onAddError)
        .finally(setSubmit);
    } else {
      lendersService
        .lenderInsert(values)
        .then(onAddSuccess)
        .catch(onAddError)
        .finally(setSubmit);
    }
  };

  const onUpdateSuccess = (response) => {
    _logger(response);

    toastr.success("Successfully updated the Lender", "Success");
  };

  const onAddSuccess = (response) => {
    _logger(response);

    toastr.success("Successfully added a Lender", "Success");

    navigate("/lenders");
  };

  const onAddError = (response) => {
    _logger(response);
    toastr.error("Could not add/update the Lender!", "Error");
  };

  useEffect(() => {
    lookUpService
      .getTypes(["LenderTypes", "LoanTypes", "StatusTypes"])
      .then(onLookUpSuccess)
      .catch(onLookUpError);
  }, []);

  const onLookUpSuccess = (response) => {
    _logger(response.item, "lookup types");
    setLookUps({
      lenderTypes: response.item.lenderTypes,
      loanTypes: response.item.loanTypes,
      statusTypes: response.item.statusTypes,
    });
  };

  const onLookUpError = (response) => {
    _logger(response);
    toastr.error("Could not retrieve form data!", "Error");
  };

  const mapTypes = (type) => (
    <option key={type.id} value={type.id}>
      {type.name}
    </option>
  );
  const gettingFile = (arr) => {
    let fileUrl = arr[0].url;
    setInitialValues((prevValues) => ({
      ...prevValues,
      logo: fileUrl,
    }));
  };

  return (
    <React.Fragment>
      <div className="py-6">
        <Row>
          <Col xl={{ offset: 3, span: 6 }} md={12} xs={12}>
            <Card>
              <Card.Body className="p-lg-6">
                <Formik
                  initialValues={initialValues}
                  validationSchema={lenderValidationSchema}
                  onSubmit={handleSubmit}
                  enableReinitialize={true}
                >
                  {({ handleSubmit, isSubmitting, errors }) => (
                    <Form>
                      <Row>
                        <Col xs={12} className="mb-3">
                          <Form.Group className="my-4" controlId="formLogo">
                            <Form.Label>Lender Image</Form.Label>
                            <UploadFile
                              getResponseFile={gettingFile}
                            ></UploadFile>
                          </Form.Group>
                          <Form.Group controlId="formGridName">
                            <Form.Label>Lender Name</Form.Label>
                            <Field
                              type="text"
                              name="name"
                              as={Form.Control}
                              isInvalid={!!errors.name}
                            />
                            <ErrorMessage
                              name="name"
                              component={Form.Control.Feedback}
                              type="invalid"
                            />
                          </Form.Group>
                        </Col>

                        <Col xs={12} className="mb-3">
                          <Form.Group controlId="formGridDescription">
                            <Form.Label>Lender Description</Form.Label>
                            <Field
                              type="text"
                              name="description"
                              as="textarea"
                              className="form-control "
                              isInvalid={!!errors.name}
                            />
                            <ErrorMessage
                              name="description"
                              component={Form.Control.Feedback}
                              type="invalid"
                            />
                          </Form.Group>
                        </Col>

                        <Col xs={12} className="mb-3">
                          <Form.Group
                            className="my-4"
                            controlId="formLenderType"
                          >
                            <Form.Label>Lender Type</Form.Label>
                            <Field
                              as={Form.Select}
                              name="lenderTypeId"
                              isInvalid={!!errors.lenderTypeId}
                            >
                              <option value={0}>Select...</option>
                              {lookUps.lenderTypes.map(mapTypes)}
                            </Field>
                            <ErrorMessage
                              name="lenderTypeId"
                              component={Form.Control.Feedback}
                              type="invalid"
                            />
                          </Form.Group>

                          <Form.Group className="pt-2" controlId="formLoanType">
                            <Form.Label>Loan Type</Form.Label>
                            <Field
                              as={Form.Select}
                              name="loanTypeId"
                              isInvalid={!!errors.loanTypeId}
                            >
                              <option value={0}>Select...</option>
                              {lookUps.loanTypes.map(mapTypes)}
                            </Field>
                            <ErrorMessage
                              name="loanTypeId"
                              component={Form.Control.Feedback}
                              type="invalid"
                            />
                          </Form.Group>
                        </Col>

                        <Col xs={12} className="mb-3">
                          <Row>
                            <Form.Group controlId="formWebsite">
                              <Form.Label>Website</Form.Label>
                              <Field
                                type="text"
                                name="website"
                                as={Form.Control}
                                isInvalid={!!errors.website}
                              />
                              <ErrorMessage
                                name="website"
                                component={Form.Control.Feedback}
                                type="invalid"
                              />
                            </Form.Group>
                          </Row>
                        </Col>

                        <Col xs={12} className="mb-3">
                          <Row>
                            <Form.Group controlId="formLocationId">
                              <Form.Label>Location</Form.Label>
                              <Field
                                as={Form.Select}
                                name="locationId"
                                isInvalid={!!errors.locationId}
                              >
                                <option value={0}>Select...</option>
                                <option value={1}>Location 1</option>
                                <option value={2}>Location 2</option>
                                <option value={3}>Location 3</option>
                              </Field>
                              <ErrorMessage
                                name="locationId"
                                component={Form.Control.Feedback}
                                type="invalid"
                              />
                            </Form.Group>
                          </Row>
                        </Col>

                        <Col xs={12}>
                          <Button
                            variant="primary"
                            type="button"
                            disabled={isSubmitting}
                            onClick={handleSubmit}
                          >
                            Submit
                          </Button>
                        </Col>
                      </Row>
                    </Form>
                  )}
                </Formik>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
};

LenderForm.propTypes = {
  state: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    logo: PropTypes.string,
    website: PropTypes.string.isRequired,
    lenderType: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }),
    loanType: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }),
    location: PropTypes.shape({
      id: PropTypes.number.isRequired,
      city: PropTypes.string.isRequired,
    }),
    statusType: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default LenderForm;
