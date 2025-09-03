import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";

const Header = ({ title, current }) => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["currentuser"]);
  const { currentuser } = cookies;

  return (
    <Box
      sx={{ textAlign: "center", py: 4, mb: 3, borderBottom: "1px solid #ddd" }}
    >
      <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2 }}>
        {title}
      </Typography>
      {currentuser && (
        <Typography variant="body1" align="center">
          Current Logged In User: {currentuser.name} ({currentuser.email})
        </Typography>
      )}
      <Box>
        <Button
          variant={current === "home" ? "contained" : "outlined"}
          color="primary"
          to="/"
          component={Link}
          sx={{ m: 1 }}
        >
          Home
        </Button>
        <Button
          variant={current === "cart" ? "contained" : "outlined"}
          color="primary"
          to="/cart"
          component={Link}
          sx={{ m: 1 }}
        >
          Cart
        </Button>
        <Button
          variant={current === "orders" ? "contained" : "outlined"}
          color="primary"
          to="/orders"
          component={Link}
          sx={{ m: 1 }}
        >
          My Orders
        </Button>
        <Button
          variant={current === "categories" ? "contained" : "outlined"}
          color="primary"
          to="/categories"
          component={Link}
          sx={{ m: 1 }}
        >
          Categories
        </Button>
        {currentuser ? (
          <Button
            variant="outlined"
            onClick={() => {
              // remove the cookie
              removeCookie("currentuser");
              // redirect back to home page
              navigate("/login");
            }}
          >
            Logout
          </Button>
        ) : (
          <>
            <Button
              variant={current === "login" ? "contained" : "outlined"}
              color="primary"
              to="/login"
              component={Link}
              sx={{ m: 1 }}
            >
              Login
            </Button>
            <Button
              variant={current === "signup" ? "contained" : "outlined"}
              color="primary"
              to="/signup"
              component={Link}
              sx={{ m: 1 }}
            >
              Sign Up
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
};

export default Header;
