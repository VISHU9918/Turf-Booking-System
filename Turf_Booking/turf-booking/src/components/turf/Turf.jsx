import React, { useEffect, useState } from "react";
import { getAllTurfs } from "../utils/ApiFunctions"; 
import TurfCard from "./TurfCard"; 
import { Col, Container, Row } from "react-bootstrap";
import TurfFilter from "../common/TurfFilter"; 
import TurfPaginator from "../common/TurfPaginator"; 

const Turf = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [turfsPerPage] = useState(6); 
  const [filteredData, setFilteredData] = useState([{ id: "" }]);

  useEffect(() => {
    setIsLoading(true);
    getAllTurfs() 
      .then((data) => {
        setData(data);
        setFilteredData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div>Loading turfs...</div>;
  }
  if (error) {
    return <div className="text-danger">Error: {error}</div>;
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(filteredData.length / turfsPerPage);

  const renderTurfs = () => {
    const startIndex = (currentPage - 1) * turfsPerPage;
    const endIndex = startIndex + turfsPerPage;
    return filteredData
      .slice(startIndex, endIndex)
      .map((turf) => <TurfCard key={turf.id} turf={turf} />); 
  };

  return (
    <Container>
      <Row>
        <Col md={6} className="mb-3 mb-md-0">
          <TurfFilter data={data} setFilteredData={setFilteredData} /> 
        </Col>

        <Col md={6} className="d-flex align-items-center justify-content-end">
          <TurfPaginator
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          /> 
        </Col>
      </Row>

      <Row>{renderTurfs()}</Row>

      <Row>
        <Col md={6} className="d-flex align-items-center justify-content-end">
          <TurfPaginator
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          /> 
        </Col>
      </Row>
    </Container>
  );
};

export default Turf;
