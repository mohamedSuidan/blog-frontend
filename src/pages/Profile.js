import axios from "axios";
import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import Navbars from "../components/Navbar/Navbar";
import Post from "../components/post/Post";
import "./profile.css";
function Profile() {
  let bool = localStorage.getItem("user") ? true : false;

  let { id } = useParams();
  let [user, setUser] = useState([]);
  let [post, setPost] = useState();
  let [loding, setLoding] = useState(true);
  let [inThe, setIn] = useState(false);
  useEffect(() => {
    let getAll = async () => {
      setLoding(true);
      let data = await axios.get(
        `https://blog-api-ufp5.onrender.com/profile/${id}`
      );
      setLoding(false);
      setUser(data.data.user);
      // setPost(data.data.posts);
    };
    getAll();
  }, [id]);
  let addFollow = async () => {
    if (bool) {
      if (user.followers.length === 0) {
        user.followers.push(JSON.parse(localStorage.getItem("user")).id);
      } else {
        let filter = user.followers.filter((ele) => {
          return ele !== JSON.parse(localStorage.getItem("user")).id;
        });
        user.followers = filter;
      }
      let arr = user.followers.map((ele) => {
        return ele;
      });
      console.log(arr);
      let userStr = JSON.stringify(user);

      setUser(JSON.parse(userStr));
      await axios.post(
        "https://blog-api-ufp5.onrender.com/add-follow",
        {
          followAdded: JSON.parse(localStorage.getItem("user")).id,
          takeFollow: id,
        },
        {
          headers: {
            Authorization: JSON.parse(localStorage.getItem("user")).token,
          },
        }
      );
    }
  };
  return (
    <div>
      <Navbars />
      <Container>
        {loding ? (
          <Alert variant="primary">Loding ...</Alert>
        ) : (
          <Row className="mt-5">
            <Col lg={4}>
              <div className="user">
                <div className="profile-img">
                  <img src={`https://blog-api-ufp5.onrender.com/${user.img}`} />
                </div>
                <div className="profile-name">
                  <h3 className="name">{user.name}</h3>
                </div>
                <div className="follow-detal">
                  <p>
                    Followers{" "}
                    <span className="font-weight-bold">
                      {user.followers.length}
                    </span>
                    , Following{" "}
                    <span className="font-weight-bold">
                      {user.following.length}
                    </span>
                  </p>
                </div>
                {localStorage.getItem("user") ? (
                  JSON.parse(localStorage.getItem("user")).id === user._id ? (
                    ""
                  ) : (
                    <div className="follow-btn">
                      <Button
                        onClick={addFollow}
                        variant={
                          user.followers.includes(
                            JSON.parse(localStorage.getItem("user")).id
                          )
                            ? "secondary"
                            : "primary"
                        }
                      >
                        Follow
                      </Button>
                    </div>
                  )
                ) : (
                  ""
                )}

                <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon1">Email</InputGroup.Text>
                  <Form.Control
                    value={user.email}
                    aria-label="email"
                    disabled
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon1">Gander</InputGroup.Text>
                  <Form.Control
                    value={user.gander}
                    aria-label="gander"
                    disabled
                  />
                </InputGroup>
              </div>
            </Col>
            <Col lg={8}>
              <Row className="mt-5">
                <Post
                  link={`https://blog-api-ufp5.onrender.com/profile/${id}`}
                  limit={2}
                />
              </Row>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
}

export default Profile;
