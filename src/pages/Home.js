import { Container } from "react-bootstrap";
import Navbars from "../components/Navbar/Navbar";
import Post from "../components/post/Post";
import "./home.css";
function Home() {
  return (
    <div className="home">
      <Navbars />
      <Container>
        <Post
          link="https://blog-api-ufp5.onrender.com/posts"
          limit={3}
          noPagination={false}
        />
      </Container>
    </div>
  );
}

export default Home;
