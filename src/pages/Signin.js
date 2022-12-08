import "./auth.css";
import axios from "axios";
import { Alert, Button, Container } from "react-bootstrap";
import PasswordInput from "../components/Inputs/PasswordInput";
import { useState } from "react";
import EmailInput from "../components/Inputs/EmailInput";
import { useNavigate } from "react-router-dom";
function Signin() {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [err, setErr] = useState("");
  let [loding, setLoding] = useState(false);
  let navigate = useNavigate();
  let getPassword = (text) => {
    setPassword(text);
  };
  let getEmail = (text) => {
    setEmail(text);
  };
  let signin = async () => {
    let data = await axios.post("https://blog-api-ufp5.onrender.com/signin", {
      email: email,
      password: password,
    });

    if (typeof data.data === "string") {
      setErr(data.data);
    } else {
      console.log(data.data);
      localStorage.setItem("user", JSON.stringify(data.data));
      navigate("/");
    }
  };
  return (
    <Container>
      <h1>Signin</h1>
      {err === "" ? "" : <Alert variant="danger">{err}</Alert>}
      <div className="sign">
        <EmailInput email={getEmail} />
        <PasswordInput password={getPassword} />
        <Button variant="primary" onClick={signin}>
          signin
        </Button>
      </div>
    </Container>
  );
}

export default Signin;
