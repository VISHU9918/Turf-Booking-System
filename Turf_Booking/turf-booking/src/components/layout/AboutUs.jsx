import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const AboutUs = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  const handleGetStarted = () => {
    navigate('/'); // Navigate to the homepage (or any other route)
  };

  return (
    <section className="py-5" style={{ backgroundColor: '#f8f9fa' }}>
      <Container className="text-center">
        <h2 className="display-4 mb-4" style={{ color: '#007bff' }}>About Us</h2>

        <Row className="mb-4">
          <Col md={8} className="mx-auto">
            <p className="lead mb-4">
              Welcome to <strong>SportsTurf Arena</strong>! We are dedicated to providing a seamless, convenient, and efficient way for you to book sports turfs for your matches, training sessions, or events.
            </p>

            <p className="mb-4">
              Our goal is simple: make sports more accessible to everyone, whether you're a weekend warrior, a casual player, or organizing a larger event. With our user-friendly platform, you can easily find and book the perfect turf for your needs with just a few clicks.
            </p>

            <h3 className="h4 mb-3">Why Choose Us?</h3>
            <ul className="list-unstyled mb-4">
              <li><strong>Wide Range of Turfs:</strong> Whether it’s football, cricket, or other sports, we have you covered with a variety of turf options.</li>
              <li><strong>Real-Time Availability:</strong> Know exactly when your preferred turf is available and secure your spot instantly.</li>
              <li><strong>Seamless Booking Process:</strong> Our platform is designed to make your booking experience as smooth as possible.</li>
              <li><strong>Flexible Payment Options:</strong> We provide easy and secure online payment methods.</li>
              <li><strong>24/7 Customer Support:</strong> Our dedicated support team is here to assist you anytime with any questions or concerns.</li>
            </ul>

            <h3 className="h4 mb-3">Our Mission</h3>
            <p className="mb-4">
              Our mission is to connect people with sports spaces and foster healthier communities. We believe that sports can help people lead better lives, and we want to make it easier for everyone to enjoy their favorite games.
            </p>

            <h3 className="h4 mb-3">Our Vision</h3>
            <p className="mb-4">
              We envision a future where booking a turf is as easy as clicking a button. Our vision is to be the go-to platform for anyone looking to book sports facilities, providing an enjoyable and straightforward experience.
            </p>

            <Button variant="primary" size="lg" className="mt-4" onClick={handleGetStarted}>
              Get Started
            </Button>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AboutUs;
