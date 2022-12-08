import React, { useState } from "react";
import { Alert, Button, Container } from "react-bootstrap";
import NameInput from "../components/Inputs/NameInput";
import EmailInput from "../components/Inputs/EmailInput";
import GanderInput from "../components/Inputs/GanderInput";
import PasswordInput from "../components/Inputs/PasswordInput";
import ImgInput from "../components/Inputs/ImgInput";
import "./auth.css";
import axios from "axios";
function Signup() {
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [gander, setGander] = useState("");
  let [img, setImg] = useState("");
  let [err, setErr] = useState("");
  let [loding, setLoding] = useState(false);
  let getName = (text) => {
    setName(text);
  };
  let getEmail = (text) => {
    setEmail(text);
  };
  let getGander = (text) => {
    setGander(text);
  };
  let getPassword = (text) => {
    setPassword(text);
  };
  let getImg = (text) => {
    setImg(text);
  };
  let signup = async () => {
    if (name === "") {
      setErr("Write Your Name");
    } else if (email === "") {
      setErr("Write Your Email");
    } else if (gander === "") {
      setErr("Select Your Gander");
    } else if (password === "") {
      setErr("Write Your password");
    } else if (password.length < 5) {
      setErr("You Should Write Strong Password");
    } else {
      try {
        let formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("gander", gander);
        formData.append("img", img);
        setLoding(true);
        let data = await axios.post("http://localhost:4000/signup", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setLoding(false);
        setErr(data.data === "data added" ? "" : data.data);
      } catch (error) {}
    }
  };
  return (
    <Container>
      <h1>Signup</h1>
      {err === "" ? "" : <Alert variant="danger">{err}</Alert>}
      {loding ? <Alert variant="primary">Loding</Alert> : ""}
      <div className="sign">
        <h3>Create Your Account</h3>
        <NameInput name={getName} />
        <EmailInput email={getEmail} />
        <GanderInput gander={getGander} />
        <PasswordInput password={getPassword} />
        <ImgInput img={getImg} />
        <Button variant="primary" className="mb-3 bt-3" onClick={signup}>
          Signup
        </Button>
      </div>
    </Container>
  );
}

export default Signup;
