import { useState } from "react";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState<string>(""); // Stan do przechowywania wartości wpisanej w polu wyszukiwania

  // Funkcja obsługująca wysłanie formularza
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", justifyContent: "center", margin: "16px 0" }}
    >
      <TextField
        variant="outlined"
        placeholder="Search for a movie..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={(e) => (e.target.placeholder = "")}
        onBlur={(e) => (e.target.placeholder = "Search for a movie...")}
        sx={{
          width: { xs: "100%", sm: "60%", md: "40%" },
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          borderRadius: 1,
          "& .MuiInputBase-input": {
            color: "white",
          },
          "& .MuiInputBase-input::placeholder": {
            color: "white",
            opacity: 1,
          },
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton type="submit" color="secondary">
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </form>
  );
};

export default SearchBar;
