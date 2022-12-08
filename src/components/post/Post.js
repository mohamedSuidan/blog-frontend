import axios from "axios";
import { useEffect, useState } from "react";
import { Alert, Col, Row, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./post.css";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { Pagination } from "react-bootstrap";

function Post(props) {
  let bool = localStorage.getItem("user") ? true : false;

  let [post, setPost] = useState([]);
  let [loding, setLoding] = useState(false);
  let limit = props.limit;

  let [len, setLen] = useState(0);
  let getPost = async () => {
    setLoding(true);
    let data = await axios.get(props.link, { params: { limit: limit } });
    setPost(data.data.posts);
    setLen(data.data.len);
    setLoding(false);
  };
  useEffect(() => {
    getPost();
  }, []);
  let like = async (e) => {
    if (bool) {
      let id = e.target.parentElement.id;
      if (e.target.parentElement.dataset.bool === "true") {
        let arr = post.map((ele) => {
          if (ele._id === id) {
            let filter = ele.likes.filter((ele) => {
              return ele.userId !== JSON.parse(localStorage.getItem("user")).id;
            });
            console.log(filter);
            ele.likes = filter;
          }
          return ele;
        });
        setPost(arr);
        await axios.post(
          "https://blog-api-ufp5.onrender.com/add-like",
          {
            postId: id,
            userId: JSON.parse(localStorage.getItem("user")).id,
            name: JSON.parse(localStorage.getItem("user")).name,
          },
          {
            headers: {
              Authorization: JSON.parse(localStorage.getItem("user")).token,
            },
          }
        );
      } else {
        let arr = post.map((ele) => {
          if (ele._id === id) {
            ele.likes.push({
              userId: JSON.parse(localStorage.getItem("user")).id,
              postId: id,
            });
          }
          return ele;
        });
        setPost(arr);
        await axios.post(
          "https://blog-api-ufp5.onrender.com/add-like",
          {
            postId: id,
            userId: JSON.parse(localStorage.getItem("user")).id,
            name: JSON.parse(localStorage.getItem("user")).name,
          },
          {
            headers: {
              Authorization: JSON.parse(localStorage.getItem("user")).token,
            },
          }
        );
      }
    }
  };

  let [active, setActive] = useState(0);
  let items = [];
  for (let i = 0; i < len; i++) {
    items.push(
      <Pagination.Item key={i} active={i === active} data-page={i}>
        {i + 1}
      </Pagination.Item>
    );
  }
  let pagination = async (e) => {
    let page = +e.target.dataset.page + 1;
    setActive(+e.target.dataset.page);
    let post = await axios.get("https://blog-api-ufp5.onrender.com/posts", {
      params: {
        limit: limit,
        page: page,
      },
    });
    setPost(post.data.posts);
  };
  return (
    <>
      <Row>
        {!loding ? (
          post.map((ele) => {
            return (
              <Col lg={limit === 3 ? 4 : 6} key={ele._id}>
                <div className="the-card">
                  <div className="img">
                    <img
                      src={`https://blog-api-ufp5.onrender.com/${ele.img}`}
                    />
                  </div>
                  <div className="text">
                    <div className="category">{ele.category}</div>
                    <h2 className="title">
                      <Link to={`/post/${ele._id}`}>{ele.title}</Link>
                    </h2>
                    <p className="detales">{ele.detales.slice(0, 120)} ..</p>
                  </div>
                  <hr />
                  <div
                    className="end"
                    data-bool={
                      ele.likes.find((ele) =>
                        ele.userId === bool
                          ? JSON.parse(localStorage.getItem("user")).id
                          : ""
                      )
                        ? "true"
                        : "false"
                    }
                    id={ele._id}
                  >
                    <div className="end-1">
                      <div className="auther">
                        <div className="name">
                          <Link to={`/profile/${ele.autherId}`}>
                            {ele.autherName}
                          </Link>
                        </div>
                      </div>
                    </div>
                    {bool ? (
                      <div
                        className="end-2"
                        onClick={like}
                        data-bool={
                          ele.likes.find(
                            (ele) =>
                              ele.userId ===
                              JSON.parse(localStorage.getItem("user")).id
                          )
                            ? "true"
                            : "false"
                        }
                        id={ele._id}
                      >
                        {ele.likes.find(
                          (ele) =>
                            ele.userId ===
                            JSON.parse(localStorage.getItem("user")).id
                        ) ? (
                          <AiFillLike
                            data-bool={
                              ele.likes.find(
                                (ele) =>
                                  ele.userId ===
                                  JSON.parse(localStorage.getItem("user")).id
                              )
                                ? "true"
                                : "false"
                            }
                            id={ele._id}
                          />
                        ) : (
                          <AiOutlineLike
                            data-bool={
                              ele.likes.find(
                                (ele) =>
                                  ele.userId ===
                                  JSON.parse(localStorage.getItem("user")).id
                              )
                                ? "true"
                                : "false"
                            }
                            id={ele._id}
                          />
                        )}
                        <p
                          className="likes"
                          data-bool={
                            ele.likes.find(
                              (ele) =>
                                ele.userId ===
                                JSON.parse(localStorage.getItem("user")).id
                            )
                              ? "true"
                              : "false"
                          }
                          id={ele._id}
                        >
                          {ele.likes.length}
                        </p>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </Col>
            );
          })
        ) : (
          <div className="loding">
            <Alert variant="primary">loding</Alert>
          </div>
        )}
      </Row>
      <Pagination onClick={pagination}>{items}</Pagination>
    </>
  );
}

export default Post;
