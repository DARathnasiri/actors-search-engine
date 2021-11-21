import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { Grid, Typography} from "@mui/material";
import { useHistory } from "react-router-dom";

function Home() {
  const history = useHistory();

  function go_basic() {
    history.push("/basic");
  }

  function go_advanced() {
    history.push("/advanced");
  }

  return (
    <div>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        style={{ marginTop: 20 }}
      >
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            flexDirection: 'column',
            "& > :not(style)": {
              m: 1,
              width: 300,
              height: 128,
            },
          }}
        >
          <Paper
            elevation={3}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#448aff",
              cursor: "pointer",
            }}
            onClick={() => go_basic()}
          >
            <Typography variant="h" component="h2" style={{ color: "white" }}>
              මූලික සෙවීම
            </Typography>
          </Paper>
          <Paper
            elevation={3}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#0288d1",
              cursor: "pointer",
            }}
            onClick={() => go_advanced()}
          >
            <Typography variant="h" component="h2" style={{ color: "white" }}>
              උසස් සෙවීම
            </Typography>
          </Paper>
        </Box>
      </Grid>
    </div>
  );
}

export default Home;
