import React from "react";
import { useState } from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
} from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import axios from "axios";

function Register({ login, setLogin }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
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

        <FormLabel>Email</FormLabel>
        <Input
          placeholder="First name"
          style={{ marginBottom: "15px" }}
          value={email}
          onChange={(e) => {
            console.log(e.target.value);
            setEmail(e.target.value);
          }}
        />

        <FormLabel>Password</FormLabel>
        <Input
          placeholder="First name"
          style={{ marginBottom: "15px" }}
          value={password}
          onChange={(e) => {
            console.log(e.target.value);
            setPassword(e.target.value);
          }}
        />
        <Button
          colorScheme="whatsapp"
          type="submit"
          onClick={() => {
            setLogin(true);
            let obj = {
              name: username,
              email: email,
              password: password,
            };
            setUsername("");
            setEmail("");
            setPassword("");
            axios.post(
              "https://655619fa84b36e3a431f0abd.mockapi.io/users",
              obj
            );
          }}
        >
          Register
        </Button>
      </FormControl>
    </>
  );
}

export default Register;
