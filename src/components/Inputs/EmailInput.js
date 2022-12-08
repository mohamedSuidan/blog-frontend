import React from "react";
import { Form } from "react-bootstrap";

function EmailInput(props) {
  return (
    <Form.Group className="mb-3">
      <Form.Label>Email</Form.Label>
      <Form.Control
        type="email"
        placeholder="Enter Email"
        onChange={(e) => props.email(e.target.value)}
      />
    </Form.Group>
  );
}

export default EmailInput;
