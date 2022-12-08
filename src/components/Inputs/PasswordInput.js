import React from "react";
import { Form } from "react-bootstrap";

function PasswordInput(props) {
  return (
    <Form.Group className="mb-3">
      <Form.Label>Password</Form.Label>
      <Form.Control
        type="password"
        placeholder="Enter password"
        onChange={(e) => props.password(e.target.value)}
      />
    </Form.Group>
  );
}

export default PasswordInput;
