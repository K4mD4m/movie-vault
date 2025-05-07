import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, loginWithGoogle } from "../firebase/auth";
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  Alert,
} from "@mui/material";
import Particles from "../blocks/Backgrounds/Particles/Particles";
import { AuthContext } from "../context/AuthContext";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      setLoading(true);
      await loginUser(email, password);
      navigate("/dashboard");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Login failed.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError(null);
    try {
      setLoading(true);
      await loginWithGoogle();
      navigate("/dashboard");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Google login failed.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative bg-gray-950 min-h-screen flex items-center justify-center">
      <div className="absolute inset-0 z-0">
        <Particles
          particleColors={["#ffffff", "#ffffff"]}
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={false}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>

      <Container maxWidth="xs" className="relative z-10">
        <Box
          sx={{
            backgroundColor: "#1f1f2e",
            p: 4,
            borderRadius: 4,
            boxShadow: 5,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography
            variant="h4"
            sx={{ color: "white", fontWeight: "bold", mb: 1 }}
            align="center"
          >
            Welcome Back
          </Typography>

          {error && <Alert severity="error">{error}</Alert>}

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <TextField
              label="Email"
              variant="outlined"
              type="email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ input: { color: "white" }, label: { color: "#bbb" } }}
            />

            <TextField
              label="Password"
              variant="outlined"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ input: { color: "white" }, label: { color: "#bbb" } }}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
              sx={{
                mt: 1,
                py: 1.5,
                fontWeight: "bold",
                backgroundColor: "rgb(97, 95, 255)",
                "&:hover": {
                  backgroundColor: "rgba(75, 0, 130, 0.8)",
                },
              }}
            >
              {loading ? "Logging in..." : "Log In"}
            </Button>
          </form>

          <Button
            onClick={handleGoogleLogin}
            variant="outlined"
            disabled={loading}
            startIcon={
              <img
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                alt="Google icon"
                style={{ width: 20, height: 20 }}
              />
            }
            sx={{
              fontWeight: "bold",
              color: "white",
              borderColor: "white",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              },
              textTransform: "none",
              py: 1.2,
            }}
          >
            {loading ? "Loading..." : "Log in with Google"}
          </Button>

          <Typography
            variant="body2"
            sx={{ color: "#aaa", textAlign: "center", mt: 2 }}
          >
            Don't have an account?{" "}
            <a href="/register" className="text-indigo-400 hover:underline">
              Sign up
            </a>
          </Typography>
        </Box>
      </Container>
    </div>
  );
};

export default Login;
