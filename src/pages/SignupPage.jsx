import {
  Container,
  Box,
  TextField,
  Paper,
  Typography,
  Button,
} from "@mui/material";
import Header from "../components/Header";
import { useState } from "react";
import { signup } from "../utils/api_auth";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import validator from "email-validator";
import { useCookies } from "react-cookie";

const SignupPage = () => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["currentuser"]);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = async () => {
    if (!name || !email || !password || !confirmPassword) {
      toast.error("Please fill in all the fields.");
    } else if (!validator.validate(email)) {
      // 2. make sure the email is valid
      toast.error("Please use a valid email address");
    } else if (password !== confirmPassword) {
      toast.error("Password and Confirm Password do not match.");
    } else {
      try {
        const userData = await signup(name, email, password);
        setCookie("currentuser", userData, {
          maxAge: 60 * 60 * 8, // cookie expires in 8 hours
        });
        toast("Successfully created a new account.");
        navigate("/");
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <>
      <Header title="Create a New Account" current="signup" />
      <Container maxWidth="sm">
        <Paper sx={{ padding: 3 }}>
          <Typography>Name</Typography>
          <Box mb={2}>
            <TextField
              placeholder="Name"
              fullWidth
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
          </Box>
          <Typography>Email</Typography>
          <Box mb={2}>
            <TextField
              placeholder="Email"
              fullWidth
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
          </Box>
          <Typography>Password</Typography>
          <Box mb={2}>
            <TextField
              placeholder="Password"
              type="password"
              fullWidth
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
          </Box>
          <Typography>Confirm Password</Typography>
          <Box mb={2}>
            <TextField
              placeholder="Confirm Password"
              type="password"
              fullWidth
              value={confirmPassword}
              onChange={(event) => {
                setConfirmPassword(event.target.value);
              }}
            />
          </Box>
          <Button
            color="primary"
            variant="contained"
            fullWidth
            onClick={handleSignUp}
          >
            Sign Up
          </Button>
        </Paper>
      </Container>
    </>
  );
};

export default SignupPage;
