import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { Alert, Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Navbars from "../components/Navbar/Navbar";
import "./post-detales.css";
function PostDetales() {
  let { id } = useParams();
  let [post, setPost] = useState([]);
  let [loding, setLoding] = useState(true);
  useEffect(() => {
    let postById = async () => {
      setPost(
        await (
          await axios.get(`http://localhost:4000/post/${id}`)
        ).data.post
      );
      setLoding(false);
    };
    postById();
  }, [id]);
  return (
    <div className="post-detales">
      <Navbars />
      <Container>
        {!loding ? (
          <>
            <h1 className="the-post">{post.title}</h1>
            <Row>
              <Col lg={12}>
                <div className="det-img">
                  <img src={`http://localhost:4000/${post.img}`} />
                </div>
              </Col>
              <Col lg={12}>
                <div className="det-text">
                  <p>{post.detales}</p>
                </div>
              </Col>
            </Row>
          </>
        ) : (
          <Alert variant="primary">Loding...</Alert>
        )}
      </Container>
    </div>
  );
}

export default PostDetales;
