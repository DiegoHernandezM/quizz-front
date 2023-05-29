import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function SubjectCard({
  subjectName,
  subjectDescription,
  subjectId,
  numberOfQuestions,
}) {
  return (
    <Box sx={{ minWidth: 200 }}>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h5" component="div">
            {subjectName}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {subjectDescription}
          </Typography>
          <Typography variant="body2">
            {numberOfQuestions} preguntas.
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Comenzar Test</Button>
        </CardActions>
      </Card>
    </Box>
  );
}
