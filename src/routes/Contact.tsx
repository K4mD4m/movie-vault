import {
  Container,
  Typography,
  Paper,
  Avatar,
  IconButton,
  Stack,
} from "@mui/material";
import { GitHub, Email } from "@mui/icons-material";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-950 flex justify-center items-center px-6">
      <Container maxWidth="md">
        {/* Nagłówek */}
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ fontWeight: "bold", color: "white" }}
        >
          Built with ❤️ by Me
        </Typography>

        {/* Sekcja z informacjami */}
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            mt: 3,
            backgroundColor: "#1e1e1e",
            color: "white",
            borderRadius: 3,
            textAlign: "center",
          }}
          className="shadow-lg"
        >
          {/* Avatar */}
          <Avatar
            alt="Your Name"
            src="https://avatars.githubusercontent.com/u/175142138?v=4"
            sx={{
              width: 100,
              height: 100,
              margin: "0 auto",
              mb: 2,
              border: "3px solid white",
              transition: "0.3s",
              "&:hover": {
                transform: "scale(1.1)",
                boxShadow: "0px 0px 20px rgba(255, 255, 255, 0.2)",
              },
            }}
          />

          {/* Bio */}
          <Typography variant="h5" gutterBottom>
            Hi, I'm Damian!
          </Typography>
          <Typography variant="body1" sx={{ mb: 2, color: "gray" }}>
            Passionate about building modern web apps with React, TypeScript,
            and Tailwind. Feel free to reach out or check out my projects!
          </Typography>

          {/* Icons */}
          <Stack direction="row" justifyContent="center" spacing={3}>
            <IconButton
              component="a"
              href="https://github.com/K4mD4m"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: "white", "&:hover": { color: "#cfcfcf" } }}
            >
              <GitHub sx={{ fontSize: 40 }} />
            </IconButton>

            <IconButton
              component="a"
              href="mailto:kamyszekdamian@outlook.com"
              sx={{ color: "white", "&:hover": { color: "#cfcfcf" } }}
            >
              <Email sx={{ fontSize: 40 }} />
            </IconButton>
          </Stack>
        </Paper>
      </Container>
    </div>
  );
};

export default Contact;
