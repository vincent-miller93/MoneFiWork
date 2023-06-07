import React, { useState, useEffect } from "react";
import debug from "sabio-debug";
import LenderCard from "./LenderCard";
import lendersService from "services/lenderService";
import MdiIcon from "@mdi/react";
import { mdiMagnify } from "@mdi/js";
import {
  CardGroup,
  Button,
  FormControl,
  InputGroup,
  Card,
  Container,
  Row,
  Col,
  Form,
  Tab,
} from "react-bootstrap";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import { useNavigate } from "react-router";
import toastr from "toastr";
import locale from "rc-pagination/lib/locale/en_US";
import lookUpService from "services/lookUpService";

function Lenders() {
  const _logger = debug.extend("Lenders");
  _logger("test");
  const [pageData, setPageData] = useState({ lenders: [] });
  const [pageValue, setPageValue] = useState({
    inputValue: "",
    pageIndex: 1,
    totalCount: 0,
    searchTerm: "",
    filterTerm: "",
    pageSize: 8,
  });
  const [lookUps, setLookUps] = useState({
    lenderTypes: [],
    loanTypes: [],
  });

  const navigate = useNavigate();
  const onAddClicked = function () {
    navigate("/lender/add");
  };

  const mapLender = (aLender) => {
    return (
      <LenderCard theLender={aLender} key={"listA" + aLender.id}></LenderCard>
    );
  };
  useEffect(() => {
    lendersService
      .getPageSearch(
        pageValue.pageIndex,
        pageValue.pageSize,
        pageValue.searchTerm,
        pageValue.filterTerm
      )
      .then(onGetLenderSuccess)
      .catch(onGetLenderError);
  }, [pageValue.pageIndex, pageValue.searchTerm, pageValue.filterTerm]);
  useEffect(() => {
    lookUpService
      .getTypes(["LenderTypes", "LoanTypes"])
      .then(onLookUpSuccess)
      .catch(onLookUpError);
  }, []);
  const onLookUpSuccess = (response) => {
    _logger(response.item, "lookup types");
    setLookUps({
      lenderTypes: response.item.lenderTypes,
      loanTypes: response.item.loanTypes,
    });
  };

  const onGetLenderSuccess = (response) => {
    let newLenders = response.data.item.pagedItems;
    setPageValue((prevState) => {
      return {
        ...prevState,
        totalCount: response.data.item.totalCount,
      };
    });
    setPageData((prevState) => {
      return {
        ...prevState,
        lenders: newLenders,
      };
    });
  };

  const onLookUpError = (response) => {
    _logger(response);
    toastr.error("Could Not Retrieve Form Data!", "Error");
  };

  const onGetLenderError = (response) => {
    _logger(response);
    toastr.error("Could Not Retreive Lenders!", "Error");
  };

  const handlePageChange = (page) => {
    setPageValue((prevState) => {
      return {
        ...prevState,
        pageIndex: page,
      };
    });
  };

  const handleSearch = () => {
    setPageValue((prevState) => {
      return {
        ...prevState,
        searchTerm: pageValue.inputValue,
        pageIndex: 1,
      };
    });
  };
  const handleDropdownChange = (event) => {
    const value = event.target.value;

    setPageValue((prevState) => {
      return {
        ...prevState,
        filterTerm: value,
        pageIndex: 1,
      };
    });
  };
  const mapTypes = (type) => (
    <option key={type.id} value={type.name}>
      {type.name}
    </option>
  );

  const handlSearchChange = (e) =>
    setPageValue((prevState) => {
      return {
        ...prevState,
        inputValue: e.target.value,
      };
    });
  return (
    <React.Fragment>
      <div className="pt-lg-8 pb-lg-16 pt-8 pb-12 bg-primary">
        <Container>
          <Row className="align-items-center">
            <Col xl={7} lg={7} md={12} sm={12}>
              <div>
                <h1 className="text-white display-4 fw-semi-bold">Lenders</h1>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <div className="py-6 row ">
        <Row>
          <Col lg={12} md={12} sm={12} className="mb-4">
            <Row className="d-lg-flex justify-content-between align-items-center">
              <Col md={6} lg={8} xl={9}>
                <h4 className="mb-3 mb-lg-0">
                  Displaying {pageValue.totalCount} Lenders
                </h4>
              </Col>
            </Row>
          </Col>
          <Col xl={3} lg={3} md={4} sm={12} className="mb-4 mb-lg-0">
            <Card>
              <Card.Header>
                <h4 className="mb-0">Filter</h4>
                <InputGroup className="mb-3">
                  <FormControl
                    type="text"
                    placeholder="Search"
                    value={pageValue.inputValue}
                    onChange={handlSearchChange}
                  />
                  <Button variant="outline-success" onClick={handleSearch}>
                    <MdiIcon
                      path={mdiMagnify}
                      size={1}
                      className="search-icon"
                    />
                  </Button>
                </InputGroup>
              </Card.Header>

              {/* Card body */}
              <Card.Body>
                <span className="dropdown-header px-0 mb-2"> Loan Type</span>
                <Form>
                  {/* Select for Courses */}
                  <Form.Select
                    aria-label="Loan Type"
                    onChange={handleDropdownChange}
                  >
                    <option value="">Select...</option>
                    {lookUps.loanTypes.map(mapTypes)}
                  </Form.Select>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          {/* Tab content */}
          <Col xl={9} lg={9} md={8} sm={12}>
            <div className="d-flex justify-content-between mb-3">
              <Pagination
                className="pb-3 pt-3"
                onChange={handlePageChange}
                current={pageValue.pageIndex}
                total={pageValue.totalCount}
                pageSize={pageValue.pageSize}
                locale={locale}
                showLessItems
              />
              <Button
                variant="primary"
                className="ml-auto"
                onClick={onAddClicked}
              >
                Add New Lender
              </Button>
            </div>
            <Tab.Content>
              <CardGroup className="col-md-12">
                {pageData.lenders.map(mapLender)}
              </CardGroup>
            </Tab.Content>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
}

export default Lenders;
