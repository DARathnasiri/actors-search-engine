import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ActorsList from "./components/ActorsList";
import React from "react";
import Home from "./components/Home";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

function App() {
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h4" component="div" sx={{ mx: "auto", fontWeight: 'bold' }}>
              නලුවන්ගේ විස්තර සොයමු
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>

      <Router>
        <Switch>
          <Route exact path="/">
            <div
              style={{
                marginLeft: 200,
                marginRight: 200,
              }}
            >
              <Home />
            </div>
          </Route>
          <Route exact path="/basic">
            <div
              style={{
                marginTop: 40,
                marginLeft: 200,
                marginRight: 200,
                padding:20,
                backgroundColor: "#bbdefb",
              }}
            >
              <ActorsList isBasic={true} />
            </div>
          </Route>
          <Route exact path="/advanced">
            <div
              style={{
                marginTop: 40,
                marginLeft: 200,
                marginRight: 200,
                padding:20,
                backgroundColor: "#bbdefb",
              }}
            >
              <ActorsList isBasic={false} />
            </div>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;