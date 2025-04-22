import React from "react";
import { useAuthContext } from "../hooks/useAuth";
import { logout } from "../firebase/auth";
import { useNavigate } from "react-router-dom";
import { Container, Box, Typography, Button } from "@mui/material";

const Dashboard: React.FC = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center">
      <Container maxWidth="sm">
        <Box
          sx={{
            backgroundColor: "#1f1f2e",
            p: 4,
            borderRadius: 4,
            boxShadow: 5,
            textAlign: "center",
            color: "white",
          }}
        >
          <Typography variant="h4" gutterBottom>
            Welcome to the Dashboard
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Logged in as: {user?.email}
          </Typography>
          <Button
            variant="contained"
            onClick={handleLogout}
            sx={{
              backgroundColor: "rgb(97, 95, 255)",
              "&:hover": { backgroundColor: "rgba(75, 0, 130, 0.8)" },
            }}
          >
            Logout
          </Button>
        </Box>
      </Container>
    </div>
  );
};

export default Dashboard;
