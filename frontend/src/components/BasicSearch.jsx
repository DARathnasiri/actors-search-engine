import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

function BasicSearch({ execQuery }) {
  const [search_value, setSearch_value] = useState("");

  const searchTerm = (e) => {
    e.preventDefault();
    execQuery(search_value);
  };

  return (
    <div style={{ marginTop: 10 }}>
      <Paper
        component="form"
        sx={{ p: "2px 4px", display: "flex", alignItems: "center" }}
        style={{ backgroundColor: "white" }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="මෙතනින් සොයමු...."
          fullWidth
          value={search_value}
          onChange={(e) => setSearch_value(e.target.value)}
        />
        <IconButton
          type="submit"
          sx={{ p: "10px", color: "white", backgroundColor: "#4caf50", }}
          aria-label="search"
          onClick={searchTerm}
        >
          <SearchIcon />
        </IconButton>
      </Paper>
    </div>
  );
}

export default BasicSearch;
