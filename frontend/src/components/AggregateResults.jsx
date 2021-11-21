import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import { Grid } from "@mui/material";

function AggregateResults({ birthFilter, relegionFilter, nationFilter }) {
  return (
    <div>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Stack direction="row" spacing={1}>
          <Stack direction="column" spacing={1}>
            <Chip label="ජාතිය අනුව" color="primary" />
            {nationFilter.buckets.map((item) => (
              <Chip
                label={item.key + " - " + item.doc_count}
                style={{ color: "black", backgroundColor: "white" }}
                variant="outlined"
                color="primary"
              />
            ))}
          </Stack>

          <Divider orientation="vertical" variant="middle" flexItem />

          <Stack direction="column" spacing={1}>
            <Chip label="ආගම අනුව" color="primary" />
            {relegionFilter.buckets.map((item) => (
              <Chip
                label={item.key + " - " + item.doc_count}
                style={{ color: "black", backgroundColor: "white" }}
                variant="outlined"
                color="primary"
              />
            ))}
          </Stack>
          
          <Divider orientation="vertical" variant="middle" flexItem />
          <Stack direction="column" spacing={1}>
            <Chip label="උපන් ස්ථානය අනුව" color="primary" />
            {birthFilter.buckets.map((item) => (
              <Chip
                label={item.key + " - " + item.doc_count}
                style={{ color: "black", backgroundColor: "white" }}
                variant="outlined"
                color="primary"
              />
            ))}
          </Stack>
        </Stack>
      </Grid>
    </div>
  );
}

export default AggregateResults;
