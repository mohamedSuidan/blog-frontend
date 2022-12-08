import React from "react";
import { Form } from "react-bootstrap";

function GanderInput(props) {
  return (
    <Form.Group className="mb-3">
      <Form.Label>Gander</Form.Label>
      <Form.Check
        type="radio"
        id="male"
        label="male"
        value="male"
        name="gander"
        onChange={(e) => props.gander(e.target.value)}
      />
      <Form.Check
        type="radio"
        id="female"
        label="female"
        value="female"
        name="gander"
        onChange={(e) => props.gander(e.target.value)}
      />
    </Form.Group>
  );
}

export default GanderInput;
