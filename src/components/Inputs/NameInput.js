import React, { useState } from "react";
import { Form } from "react-bootstrap";

function NameInput(props) {
  return (
    <Form.Group className="mb-3 mt-5">
      <Form.Label>Name</Form.Label>
      <Form.Control
        type="text"
        placeholder="Enter Name"
        onChange={(e) => props.name(e.target.value)}
      />
    </Form.Group>
  );
}

export default NameInput;
