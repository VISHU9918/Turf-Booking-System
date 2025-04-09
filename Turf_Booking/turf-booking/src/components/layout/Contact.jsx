import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";  // Import React-Bootstrap components

const Contact = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("jwtToken");

    const response = await fetch("https://formspree.io/f/mvgpawne", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        username,
        email,
        message,
      }),
    });

    if (response.ok) {
      // Handle successful form submission
      alert("Message sent successfully!");
    } else {
      // Handle form submission error
      alert("Error sending message.");
    }
  };

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Contact Us</h2>

      {/* Google Maps iframe */}
      <Row>
        <Col>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d51267.317329291545!2d78.45885030254588!3d17.244668025994066!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcba57e67a2bc25%3A0xc0d5031672bc95cd!2sCentre%20for%20Development%20of%20Advanced%20Computing!5e0!3m2!1sen!2sin!4v1738303672062!5m2!1sen!2sin"
             width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade" >
          </iframe>
        </Col>
      </Row>

      {/* Contact Form */}
      <Row className="justify-content-center mt-5">
        <Col md={6}>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formMessage">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                placeholder="Enter your message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" block>
              Send Message
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Contact;
