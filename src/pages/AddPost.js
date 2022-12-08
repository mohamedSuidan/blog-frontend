import axios from "axios";
import { useState } from "react";
import { Alert, Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Navbars from "../components/Navbar/Navbar";
import "./add-post.css";
function AddPost() {
  let bool = localStorage.getItem("user") ? true : false;
  let [title, setTitle] = useState("");
  let [category, setCategory] = useState("");
  let [text, setText] = useState("");
  let [img, setImg] = useState("");
  let [err, setErr] = useState("");
  let [msg, setMsg] = useState("");
  let navigate = useNavigate();
  let addPost = async () => {
    if (title === "") {
      setErr("Add Title");
    } else if (category === "") {
      setErr("Add Category");
    } else if (text === "") {
      setErr("Add Talk");
    } else if (text.length < 10) {
      setErr("You Should Write In Talk Input 10 letter or More");
    } else {
      let formData = new FormData();

      formData.append("title", title);
      formData.append("category", category);
      formData.append("text", text);
      formData.append(
        "autherId",
        bool ? JSON.parse(localStorage.getItem("user")).id : ""
      );
      formData.append(
        "autherName",
        bool ? JSON.parse(localStorage.getItem("user")).name : ""
      );
      formData.append("img", img);
      setMsg("Please Wait The Post is Uploading");
      await axios.post(
        "https://blog-api-ufp5.onrender.com/add-post",
        formData,
        {
          headers: {
            Authorization: bool
              ? JSON.parse(localStorage.getItem("user")).token
              : "",
          },
        }
      );
      navigate("/");
    }
  };
  return (
    <>
      <Navbars />
      {msg === "" ? "" : <Alert variant="primary">{msg}</Alert>}
      <Form>
        <Container className="mt-5">
          <h2 className="mb-2 text-center">Add Post</h2>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              placeholder="Category"
              onChange={(e) => setCategory(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Topic Talkig</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Topic Talkig"
              onChange={(e) => setText(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Add Photo</Form.Label>
            <Form.Control
              type="file"
              onChange={(e) => setImg(e.target.files[0])}
            />
          </Form.Group>
          <Button variant="primary" onClick={addPost}>
            Add Post
          </Button>
        </Container>
      </Form>
    </>
  );
}

export default AddPost;
