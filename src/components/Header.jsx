import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router";

const Header = ({ title, current }) => {
  return (
    <Box
      sx={{ textAlign: "center", py: 4, mb: 3, borderBottom: "1px solid #ddd" }}
    >
      <Typography variant="h3" sx={{ fontWeight: "bold" }}>
        {title}
      </Typography>
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
      </Box>
    </Box>
  );
};

export default Header;
