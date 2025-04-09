import React, { useEffect, useState } from "react";
import { deleteTurf, getAllTurfs } from "../utils/ApiFunctions";  // Change API calls to turfs
import { Col, Row } from "react-bootstrap";
import TurfFilter from "../common/TurfFilter";  // Change filter component for turfs
import TurfPaginator from "../common/TurfPaginator";  // Change paginator component for turfs
import { FaEdit, FaEye, FaPlus, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const ExistingTurfs = () => {
  const [turfs, setTurfs] = useState([{ id: "", turfType: "", turfPrice: "" }]);
  const [currentPage, setCurrentPage] = useState(1);
  const [turfsPerPage] = useState(8);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredTurfs, setFilteredTurfs] = useState([{ id: "", turfType: "", turfPrice: "" }]);
  const [selectedTurfType, setSelectedTurfType] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetchTurfs();
  }, []);

  const fetchTurfs = async () => {
    setIsLoading(true);
    try {
      const result = await getAllTurfs();
      setTurfs(result);
      setIsLoading(false);
    } catch (error) {
      setErrorMessage(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (selectedTurfType === "") {
      setFilteredTurfs(turfs);
    } else {
      const filteredTurfs = turfs.filter((turf) => turf.turfType === selectedTurfType);
      setFilteredTurfs(filteredTurfs);
    }
    setCurrentPage(1);
  }, [turfs, selectedTurfType]);

  const handlePaginationClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDelete = async (turfId) => {
    try {
      const result = await deleteTurf(turfId);
      if (result === "") {
        setSuccessMessage(`Turf No ${turfId} was deleted`);
        fetchTurfs();
      } else {
        console.error(`Error deleting turf: ${result.message}`);
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
    setTimeout(() => {
      setSuccessMessage("");
      setErrorMessage("");
    }, 3000);
  };

  const calculateTotalPages = (filteredTurfs, turfsPerPage, turfs) => {
    const totalTurfs = filteredTurfs.length > 0 ? filteredTurfs.length : turfs.length;
    return Math.ceil(totalTurfs / turfsPerPage);
  };

  const indexOfLastTurf = currentPage * turfsPerPage;
  const indexOfFirstTurf = indexOfLastTurf - turfsPerPage;
  const currentTurfs = filteredTurfs.slice(indexOfFirstTurf, indexOfLastTurf);

  return (
    <>
      <div className="container col-md-8 col-lg-6">
        {successMessage && <p className="alert alert-success mt-5">{successMessage}</p>}
        {errorMessage && <p className="alert alert-danger mt-5">{errorMessage}</p>}
      </div>

      {isLoading ? (
        <p>Loading existing turfs...</p>
      ) : (
        <>
          <section className="mt-5 mb-5 container">
            <div className="d-flex justify-content-between mb-3 mt-5">
              <h2>Existing Turfs</h2>
            </div>

            <Row>
              <Col md={6} className="mb-2 md-mb-0">
                <TurfFilter data={turfs} setFilteredData={setFilteredTurfs} />
              </Col>

              <Col md={6} className="d-flex justify-content-md-end justify-content-center mb-3">
                <Link
                  to={"/add-turf"}
                  className="btn btn-primary"
                  style={{
                    backgroundColor: "#007bff",
                    borderColor: "#007bff",
                    color: "#fff",
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    padding: "0.5rem 1rem",
                    borderRadius: "0.25rem",
                  }}
                >
                  <FaPlus style={{ marginRight: "0.5rem" }} /> Add Turf
                </Link>
              </Col>
            </Row>

            <table className="table table-bordered table-hover">
              <thead>
                <tr className="text-center">
                  <th>ID</th>
                  <th>Turf Type</th>
                  <th>Turf Price</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {currentTurfs.map((turf) => (
                  <tr key={turf.id} className="text-center">
                    <td>{turf.id}</td>
                    <td>{turf.turfType}</td>
                    <td>{turf.turfPrice}</td>
                    <td className="gap-2">
                      <Link to={`/edit-turf/${turf.id}`} className="gap-2">
                        <span className="btn btn-info btn-sm">
                          <FaEye />
                        </span>
                        <span className="btn btn-warning btn-sm ml-5">
                          <FaEdit />
                        </span>
                      </Link>
                      <button
                        className="btn btn-danger btn-sm ml-5"
                        onClick={() => handleDelete(turf.id)}
                      >
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <TurfPaginator
              currentPage={currentPage}
              totalPages={calculateTotalPages(filteredTurfs, turfsPerPage, turfs)}
              onPageChange={handlePaginationClick}
            />
          </section>
        </>
      )}
    </>
  );
};

export default ExistingTurfs;
