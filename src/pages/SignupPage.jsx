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

const SignupPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = async () => {
    if (!name || !email || !password || !confirmPassword) {
      toast.error("Please fill in all the fields.");
    } else if (password !== confirmPassword) {
      toast.error("Password and Confirm Password do not match.");
    } else {
      try {
        const newUserData = await signup(name, email, password);
        toast("Successfully signed up. Please log in.");
        console.log(newUserData);
        navigate("/login");
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
