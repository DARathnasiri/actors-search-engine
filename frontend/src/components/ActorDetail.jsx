import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function ActorDetail({
  name,
  birthday,
  birthplace,
  nationality,
  relegion,
  personalLife,
  careerLife,
  school,
}) {
  return (
    <React.Fragment>
      <Card sx={{ marginTop: 5 }}>
        <CardHeader
          style={{ backgroundColor: "#1976d2", color: "white", textAlign: 'center' }}
          title={<Typography variant="h5" sx={{fontWeight: 'bold'}}>{name}</Typography>}
        />

        <CardContent style={{ backgroundColor: "white" }}>
          <Typography variant="subtitle1" component="h6" sx={{fontWeight: 'bold'}} >
            <span variant="h6" style={{ color: "#1976d2"}}>ජාතිය -</span> {nationality}
          </Typography>
          <br />
          
          <Typography variant="subtitle1" component="h6" sx={{fontWeight: 'bold'}}>
            <span variant="h6" style={{ color: "#1976d2"}}>උපන් දිනය -</span> {birthday}
          </Typography>
          <br />

          <Typography variant="subtitle1" component="h6" sx={{fontWeight: 'bold'}}>
            <span variant="h6" style={{ color: "#1976d2"}}>ආගම -</span> {relegion}
          </Typography>
          <br />
          
          <Typography variant="subtitle1" component="h6" sx={{fontWeight: 'bold'}}>
            <span variant="h6" style={{ color: "#1976d2"}}>උපන් ස්ථානය -</span> {birthplace}
          </Typography>
          <br />
          
          <Typography variant="subtitle1" component="h6" sx={{fontWeight: 'bold'}}>
            <span variant="h6" style={{ color: "#1976d2"}}>අධ්‍යාපන ආයතනය -</span> {school}
          </Typography>
          <br />
          <Typography variant="subtitle1" component="h6" sx={{fontWeight: 'bold'}}>
            <span variant="h6" style={{ color: "#1976d2"}}>පෞද්ගලික ජීවිතය -</span>
            <br/>
            {personalLife}
          </Typography>
          <br />
          <Typography variant="subtitle1" component="h6" sx={{fontWeight: 'bold'}}>
            <span variant="h6" style={{ color: "#1976d2"}}>වෘත්තිිය ජීවිතය -</span>
            <br/>
            {careerLife}
          </Typography>
        </CardContent>
      </Card>
    </React.Fragment>
  );
}
