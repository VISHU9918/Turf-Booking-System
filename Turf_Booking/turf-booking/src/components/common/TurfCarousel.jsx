import React, { useEffect, useState } from "react";
import { getAllTurfs } from "../utils/ApiFunctions"; 
import { Link } from "react-router-dom";
import { Card, Carousel, Col, Container, Row } from "react-bootstrap";

const TurfCarousel = () => { 
  const [turfs, setTurfs] = useState([{ id: "", turfLocation: "", turfPrice: "", photo: "" }]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getAllTurfs() 
      .then((data) => {
        setTurfs(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setErrorMessage(error.message);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div className="mt-5">Loading turfs....</div>;
  }
  if (errorMessage) {
    return <div className=" text-danger mb-5 mt-5">Error: {errorMessage}</div>;
  }

  return (
    <section className="bg-light mb-5 mt-5 shadow">
      <Link to={"/browse-all-turfs"} className="hotel-color text-center">
        Browse all turfs
      </Link>

      <Container>
        <Carousel indicators={false}>
          {[...Array(Math.ceil(turfs.length / 4))].map((_, index) => (
            <Carousel.Item key={index}>
              <Row>
                {turfs.slice(index * 4, index * 4 + 4).map((turf) => (
                  <Col key={turf.id} className="mb-4" xs={12} md={6} lg={3}>
                    <Card>
                      <Link to={`/book-turf/${turf.id}`}>
                        <Card.Img
                          variant="top"
                          src={`data:image/png;base64, ${turf.photo}`}
                          alt="Turf Photo"
                          className="w-100"
                          style={{ height: "200px" }}
                        />
                      </Link>
                      <Card.Body>
                        <Card.Title className="hotel-color">{turf.turfLocation}</Card.Title>
                        <Card.Title className="room-price">${turf.turfPrice}/hour</Card.Title>
                        <div className="flex-shrink-0">
                          <Link to={`/book-turf/${turf.id}`} className="btn btn-hotel btn-sm">
                            Book Now
                          </Link>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Carousel.Item>
          ))}
        </Carousel>
      </Container>
    </section>
  );
};

export default TurfCarousel;
