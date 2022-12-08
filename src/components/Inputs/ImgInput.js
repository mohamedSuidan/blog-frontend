import React from "react";
import { Form } from "react-bootstrap";

function ImgInput(props) {
  return (
    <Form.Group controlId="formFile" className="mb-3">
      <Form.Label>Photo</Form.Label>
      <Form.Control
        type="file"
        onChange={(e) => props.img(e.target.files[0])}
      />
    </Form.Group>
  );
}

export default ImgInput;
