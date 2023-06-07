import * as React from "react";
import { useNavigate } from "react-router-dom";
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
  latestUserTest,
  color
}) {
  const navigate = useNavigate();

  const handleStartTest = (subjectId = null) => {
    if (subjectId == null) {
      navigate(`/dashboardapp/test`);
      return;
    } else {
      navigate(`/dashboardapp/test?subject_id=${subjectId}`);
      return;
    }
  };

  return (
    <Box sx={{ minHeight: 250, marginBottom: 5 }}>
      <Card
        sx={{ minHeight: 250, boxShadow: "2px 3px 9px #203764",  background: `${color}` }}
        variant="outlined"
      >
        <CardContent>
          <Typography variant="h5" component="div">
            {subjectName}
          </Typography>
          <Typography
            sx={{ mb: 1.5, height: "120px", overflow: "scroll" }}
            color="text.secondary"
          >
            {subjectDescription}
          </Typography>
          <Typography variant="body2">
            {numberOfQuestions} preguntas.{" "}
            {latestUserTest &&
              latestUserTest.percentage != null &&
              latestUserTest.percentage < 100 && (
                <font color="blue">Progreso: {latestUserTest.percentage}%</font>
              )}
            {latestUserTest &&
              latestUserTest.percentage != null &&
              latestUserTest.percentage == 100 && (
                <font color="green">Completado!</font>
              )}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            variant="outlined"
            onClick={() => handleStartTest(subjectId)}
          >
            Comenzar Test
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}
