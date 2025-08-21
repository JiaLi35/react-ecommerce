import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router";

const Header = ({ title }) => {
  return (
    <Box
      sx={{ textAlign: "center", py: 4, mb: 3, borderBottom: "1px solid #ddd" }}
    >
      <Typography variant="h3" sx={{ fontWeight: "bold" }}>
        {title}
      </Typography>
      <Box>
        <Button
          variant="contained"
          color="primary"
          to="/"
          component={Link}
          sx={{ m: 1 }}
        >
          Home
        </Button>
        <Button
          variant="contained"
          color="primary"
          to="/cart"
          component={Link}
          sx={{ m: 1 }}
        >
          Cart
        </Button>
      </Box>
    </Box>
  );
};

export default Header;
