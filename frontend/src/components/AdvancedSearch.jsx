import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Button } from "@mui/material";
import { namesList } from "./autocomplete/Names";
import { countriesList } from "./autocomplete/Countrie";
import { monthsList } from "./autocomplete/Months";
import { relegionsList } from "./autocomplete/Relegions";
import { nationalityList } from "./autocomplete/Nationilities";
import { schoolsList } from "./autocomplete/Schools";

function AdvancedSearch({ execAdvancedSearch }) {
  const [name, setName] = useState("");
  const [bday, setBday] = useState("");
  const [country, setCountry] = useState("");
  const [relegion, setRelegion] = useState("");
  const [school, setschool] = useState("");
  const [nationality, setnationality] = useState("");

  const onSearch = () => {
    const data = {
      name,
      bday,
      country,
      relegion,
      nationality,
      school,
    };
    execAdvancedSearch(data);
  };

  return (
    <div style={{ marginTop: 20 }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      <Grid
          item
          xs={6}
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={namesList}
              sx={{ width: 300, backgroundColor: "white" }}
              onSelect={(e) => setName(e.target.value)}
              value={name}
              renderInput={(params) => (
                <TextField
                  {...params}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  label="නම"
                />
              )}
            />
          </Grid>
        </Grid>

        <Grid
          item
          xs={6}
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              sx={{ width: 300, backgroundColor: "white" }}
              options={nationalityList}
              onSelect={(e) => setnationality(e.target.value)}
              value={nationality}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="ජාතිය"
                  value={nationality}
                  onChange={(e) => setnationality(e.target.value)}
                />
              )}
            />
          </Grid>
        </Grid>

        <Grid
          item
          xs={6}
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              sx={{ width: 300, backgroundColor: "white" }}
              options={relegionsList}
              onSelect={(e) => setRelegion(e.target.value)}
              value={relegion}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="ආගම"
                  value={relegion}
                  onChange={(e) => setRelegion(e.target.value)}
                />
              )}
            />
          </Grid>
        </Grid>

        <Grid
          item
          xs={6}
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              sx={{ width: 300, backgroundColor: "white" }}
              onSelect={(e) => setBday(e.target.value)}
              options={monthsList}
              value={bday}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="උපන් දිනය"
                  value={bday}
                  onChange={(e) => setBday(e.target.value)}
                />
              )}
            />
          </Grid>
        </Grid>

        <Grid
          item
          xs={6}
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={countriesList}
              sx={{ width: 300, backgroundColor: "white" }}
              onSelect={(e) => setCountry(e.target.value)}
              value={country}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="උපන් ස්ථානය"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
              )}
            />
          </Grid>
        </Grid>

        <Grid
          item
          xs={6}
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              sx={{ width: 300, backgroundColor: "white" }}
              options={schoolsList}
              onSelect={(e) => setschool(e.target.value)}
              value={school}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="අධ්‍යාපන ආයතනය"
                  value={school}
                  onChange={(e) => setschool(e.target.value)}
                />
              )}
            />
          </Grid>
        </Grid>
      </Grid>
      <br />
      <center>
        <Button variant="contained" color="success" onClick={() => onSearch()}>
          සොයමු
        </Button>
      </center>
    </div>
  );
}

export default AdvancedSearch;
