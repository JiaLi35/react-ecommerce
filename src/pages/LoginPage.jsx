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
import { login } from "../utils/api_auth";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import validator from "email-validator";
import { useCookies } from "react-cookie";

const LoginPage = () => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["currentuser"]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Please fill in all the fields.");
    } else if (!validator.validate(email)) {
      // 2. make sure the email is valid
      toast.error("Please use a valid email address");
    } else {
      try {
        const userData = await login(email, password);
        // set cookies
        setCookie("currentuser", userData, {
          maxAge: 60 * 60 * 8, // cookie expires in 8 hours
        });
        toast("Successfully logged in.");
        navigate("/");
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <>
      <Header title="Login to Your Account" current="login" />
      <Container maxWidth="sm">
        <Paper sx={{ padding: 3 }}>
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
          <Button
            color="primary"
            variant="contained"
            fullWidth
            onClick={handleLogin}
          >
            Login
          </Button>
        </Paper>
      </Container>
    </>
  );
};

export default LoginPage;
