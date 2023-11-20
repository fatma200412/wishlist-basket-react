import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
} from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import axios from "axios";
function Login({ login, setLogin, setCheckProduct }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <FormControl
        isRequired
        style={{
          padding: "35px",
          boxShadow:
            " rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
          margin: "50px auto",
          width: "350px",
        }}
      >
        <FormLabel>Username</FormLabel>
        <Input
          placeholder="First name"
          style={{ marginBottom: "15px" }}
          value={username}
          onChange={(e) => {
            console.log(e.target.value);
            setUsername(e.target.value);
          }}
        />

        <FormLabel>Password</FormLabel>
        <Input
          placeholder="First password"
          required
          style={{ marginBottom: "15px" }}
          value={password}
          onChange={(e) => {
            console.log(e.target.value);
            setPassword(e.target.value);
          }}
        />
        <Button
          colorScheme="blue"
          style={{ marginRight: "10px" }}
          type="submit"
          onClick={() => {
            axios("https://655619fa84b36e3a431f0abd.mockapi.io/users").then(
              (res) => {
                console.log(res.data);
                console.log(username);
                console.log(password);
                let findUsername = res.data.find(
                  (elem) => elem.name == username
                );
                let findPassword = res.data.find(
                  (elem) => elem.password == password
                );
                console.log(findUsername);
                console.log(findPassword);
                findUsername && findPassword
                  ? setCheckProduct(true)
                  : setCheckProduct(false);
              }
            );
            setPassword("");
            setUsername("");
          }}
        >
          LogIn
        </Button>
        <Button
          colorScheme="whatsapp"
          type="submit"
          onClick={() => {
            setLogin(false);
          }}
        >
          Register
        </Button>
      </FormControl>
    </>
  );
}

export default Login;
