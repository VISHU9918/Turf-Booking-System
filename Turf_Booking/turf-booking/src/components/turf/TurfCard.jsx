import React from "react";
import { Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const TurfCard = ({ turf }) => {
  return (
    <Col key={turf.id} className="mb-4" xs={12} md={6} lg={4}>
      <Card className="turf-card">
        <div className="turf-img">
          <Link to={`/book-turf/${turf.id}`}>
            <Card.Img
              variant="top"
              src={`data:image/png;base64, ${turf.photo}`} 
              alt="Turf Photo"
            />
          </Link>
        </div>
        <Card.Body className="turf-details">
          <Card.Title className="turf-location">{turf.turfLocation}</Card.Title> 
          <Card.Text className="turf-price">{turf.turfPrice} / hour</Card.Text> 
          <Card.Text className="turf-description">
            Some turf information goes here for the guest to read through
          </Card.Text>
          <Link to={`/book-turf/${turf.id}`} className="btn btn-primary btn-block">
            Book Now
          </Link>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default TurfCard;
