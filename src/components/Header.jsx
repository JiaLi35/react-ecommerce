import { Box, Typography } from "@mui/material";

const Header = () => {
  return (
    <Box
      sx={{ textAlign: "center", py: 4, mb: 3, borderBottom: "1px solid #ddd" }}
    >
      <Typography variant="h3" sx={{ fontWeight: "bold" }}>
        Welcome to My Store
      </Typography>
    </Box>
  );
};

export default Header;
