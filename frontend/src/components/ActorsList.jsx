import {  LinearProgress, Typography, Alert, Grid} from "@mui/material";
import React, { useState } from "react";
import ActorDetail from "./ActorDetail";
import { basic_search, advanced_search } from "./Functions";
import BasicSearch from "./BasicSearch";
import AdvancedSearch from "./AdvancedSearch";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Link } from "react-router-dom";
import OneResult from "./OneResult";
import AggregateResults from "./AggregateResults";

function ActorsList({ isBasic }) {
  const [actors, setActors] = useState([]);
  const [dataFetched, setDataFetched] = useState(true);
  const [fetchingTime, setFetchingTime] = useState(0);
  const [resultCount, setResultCount] = useState(0);
  const [result, setresult] = useState([]);
  const [aggrList, setaggrList] = useState([]);
  const [noResultAlert, setnoResultAlert] = useState(false);

  const execute_query = async (term) => {
    setDataFetched(false);
    setnoResultAlert(true);
    const result = await basic_search(term);
    setresult(result);
    setaggrList([result.aggregations]);
    setActors(result.hits.hits);
    setFetchingTime(result.took);
    setResultCount(result.hits.total.value);
    setDataFetched(true);
  };

  const execute_advanced_search = async (data) => {
    setDataFetched(false);
    setnoResultAlert(true);
    const result = await advanced_search(data);

    console.log("Response : ", result.took);
    setActors(result.hits.hits);
    setFetchingTime(result.took);
    setResultCount(result.hits.total.value);
    setDataFetched(true);
  };

  return (
    <div style={{backgroundColor: "#bbdefb"}}>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          "& > :not(style)": {
            m: 1,
            width: "100%",
            height: 50,
          },
        }}
        style={{ backgroundColor: "#bbdefb" }}
      >
        <Paper
          elevation={3}
          style={{ backgroundColor: "#1976d2", color: "white" }}
        >
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <IconButton
              aria-label="upload picture"
              style={{
                color: "#1976d2",
                backgroundColor: "white",
                marginLeft: -30,
                marginRight: 15,
              }}
              component={Link}
              to="/"
            >
              <ArrowBackIosNewIcon />
            </IconButton>
            <Grid item>
              <Typography
                variant="h5"
                gutterBottom
                component="div"
                style={{ marginTop: 8 }}
              >
                {isBasic && "මූලික සෙවීම"}
                {!isBasic && "උසස් සෙවීම"}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Box>
      {isBasic && <BasicSearch execQuery={execute_query} />}
      <br />

      {!isBasic && <AdvancedSearch execAdvancedSearch={execute_advanced_search} />}
      {!dataFetched && <LinearProgress />}
      {actors.length === 0 && noResultAlert &&(
        <div style={{ marginTop: 50}}>
          <Alert severity="error">ගැලපෙන ප්‍රතිඵල නැත!</Alert>
        </div>
      )}
      {actors.length > 0 && (
        <div style={{ marginTop: 10 }}>
          <Alert severity="success">
            {!result.single && resultCount} Results in {fetchingTime / 1000}
            seconds
          </Alert>
        </div>
      )}
      {!result.single && (
        <div>
          <br />
          {actors.length > 0 && isBasic && (
            <AggregateResults
              birthFilter={aggrList[0].birth_filter}
              relegionFilter={aggrList[0].relegion_filter}
              nationFilter={aggrList[0].nation_filter}
            />
          )}
          {actors.map((actor) => {
            return (
              <div>
                <ActorDetail
                  name={actor._source["නම"]}
                  birthday={actor._source["උපන් දිනය"]}
                  nationality={actor._source["ජාතිය"]}
                  relegion={actor._source["ආගම"]}
                  birthplace={actor._source["උපන් ස්ථානය"]}
                  personalLife={actor._source["පෞද්ගලික ජීවිතය"]}
                  careerLife={actor._source["වෘත්තිය ජීවිතය"]}
                  school={actor._source["අධ්‍යාපනය"]}
                />
              </div>
            );
          })}
        </div>
      )}
      {result.single && <OneResult result={result.single_result} />}
    </div>
  );
}

export default ActorsList;
