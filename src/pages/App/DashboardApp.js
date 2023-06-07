import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router";
import {
  Grid,
  Divider as MuiDivider,
  Typography as MuiTypography,
  Card,
  CardActions,
  Button,
  Box,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide
} from "@mui/material";
import BarChart from "../dashboards/Administrators/BarChart";
import LinearChartDemo from "../dashboards/Administrators/LinearChartDemo";
import backgroundJpe from "../../vendor/avatar.png";
import useAuth from "../../hooks/useAuth";
import { spacing } from "@mui/system";

const Divider = styled(MuiDivider)(spacing);

const Typography = styled(MuiTypography)(spacing);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Image = styled.img`
  max-width: 100%;
  height: auto;
  min-height: 30vh;
  display: block;
  border-radius: 10px;
  z-index: 0;
  position: relative;
  image-rendering: optimizequality;
  image-rendering: -webkit-optimize-contrast;
  margin-bottom: -100px;
  margin-top: -35px;
  ${(props) => props.theme.breakpoints.up("md")} {
    margin-top: -40px;
  }
`;

function DashboardApp() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const name = localStorage.getItem("user");
  const [open, setOpen] = useState(localStorage.getItem("dashone") === "true");
  const labels = [1,2,3,4];
  const info = [10,5,3,3];
  return (
    <React.Fragment>
      <Helmet title="Dashboard" />
      <Grid justifyContent="space-between" container spacing={6}>
        <Grid item>
          <Typography variant="h3" gutterBottom>
            {("Bienvenido Capitan:")} {name}
          </Typography>
        </Grid>
      </Grid>
      <Divider my={6} />
      <Grid justifyContent="space-between" container>
        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="10vh">
            <Card sx={{ maxWidth: 345 }}>
              <BarChart parentCallback={() => null} labels={labels} info={info} />
              <CardActions>
                <Button 
                  variant="contained"
                  size="small"
                  onClick={() => navigate("/dashboardapp/results")}
                >
                  Ver mi progreso
                </Button>
              </CardActions>
            </Card>
          </Box>
        </Grid>    
        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="10vh">
            <Card sx={{ maxWidth: 345 }}>
              <LinearChartDemo labels={labels} info={info} />
              <CardActions>
                <Button 
                  variant="contained"
                  size="small"
                  onClick={() => navigate("/dashboardapp/results")}
                >
                  Ver mis resultados
                </Button>
              </CardActions>
            </Card>
          </Box>
        </Grid>
      </Grid>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => {
          setOpen(false);
          localStorage.setItem("dashone", false);
        }}
        aria-describedby="alert-dialog-slide-description"
        style={{ background: "white" }}
      >
        <DialogTitle style={{ background: "white" }}>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Typography variant="h1">
              {"Hola Capitán"}
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent style={{ background: "white" }}>
          <DialogContentText id="alert-dialog-slide-description">
            <Box display="flex" justifyContent="center" alignItems="center">
              <Typography variant="h2">
                Bienvenido a
              </Typography>
            </Box>
            <Box display="flex" justifyContent="center" alignItems="center">
              <Typography variant="h1">
                {"Aviation InSight"}
              </Typography>
            </Box>
          </DialogContentText>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Image alt="App de aviacion" src={backgroundJpe} />
          </Box>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Typography variant="subtitle1">
                ¿Que desea hacer hoy capitán {name} ?
            </Typography>
          </Box>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}

export default DashboardApp;
