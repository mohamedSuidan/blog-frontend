import { Container } from "react-bootstrap";
import Navbars from "../components/Navbar/Navbar";
import Post from "../components/post/Post";
import "./home.css";
function Home() {
  return (
    <div className="home">
      <Navbars />
      <Container>
        <Post link="http://localhost:4000/posts" limit={3} />
      </Container>
    </div>
  );
}

export default Home;
