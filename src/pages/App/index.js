import React, { useEffect } from "react";
import Navigation from "./Navigation";
import UserProgress from "./UserProgress";
import Subjects from "./Subjects";
import { useDispatch, useSelector } from "react-redux";
import { getSubjects } from "../../redux/slices/subjects";
import { Grid, Paper } from "@mui/material";
import SubjectOffLine from "../../components/check-offline/SubjectOffLine";

function App() {
  const dispatch = useDispatch();
  const { allSubjects } = useSelector((state) => state.subjects);
  const colors = [
    "#F2F3F4",
    "#D1F2EB",
    "#E3DFFD",
    "#ECE8DD",
    "#FADBD8",
    "#E8DAEF",
    "#ECF0F1",
    "#D6EAF8",
    "#E5E7E9",
    "#EAECEE",
    "#F4ECF7",
    "#FEF9E7",
    "#E5E8E8",
  ];

  useEffect(() => {
    dispatch(getSubjects(false));
  }, []);

  return (
    <React.Fragment>
      <Paper sx={{ padding: { xs: "10px", md: "15px", lg: "20px" } }}>
        <Grid container spacing={2}>
          {allSubjects.map((subject, i) => (
            <Grid key={subject.id} item xs={6} sm={6} md={4} lg={3}>
              <SubjectOffLine
                subjectName={subject.name}
                // subjectDescription={subject.description}
                subjectImage={subject.image}
                subjectId={subject.id}
                numberOfQuestions={subject.questions_count}
                latestUserTest={subject.latest_user_test}
                color={colors[i]}
              >
                <Subjects
                  subjectName={subject.name}
                  // subjectDescription={subject.description}
                  subjectImage={subject.image}
                  subjectId={subject.id}
                  numberOfQuestions={subject.questions_count}
                  latestUserTest={subject.latest_user_test}
                  color={colors[i]}
                />
              </SubjectOffLine>
            </Grid>
          ))}
        </Grid>
      </Paper>
      <Navigation />
    </React.Fragment>
  );
}

export default App;
