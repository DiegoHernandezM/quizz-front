import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "@emotion/styled";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router";
import { getDataStudent } from "../../redux/slices/dashboard";
import {
  Grid,
  Divider as MuiDivider,
  Typography as MuiTypography,
  Button,
  Box,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  AppBar,
  Toolbar,
  IconButton,
  DialogActions
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import backgroundJpe from "../../vendor/avatar.gif";
import installAndroid from "../../vendor/android-install.gif";
import installIos from "../../vendor/ios-install.gif";
import checkImage from "../../vendor/checklist.png";
import workingImage from "../../vendor/working.png";
import subjectImage from "../../vendor/subject.png";
import useAuth from "../../hooks/useAuth";
import { spacing } from "@mui/system";
import Stats from "../dashboards/Administrators/Stats";
import BarChart from "../dashboards/Administrators/BarChart";

const Divider = styled(MuiDivider)(spacing);

const Typography = styled(MuiTypography)(spacing);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Image = styled.img`
  max-width: 40%;
  height: auto;
  min-height: 10px;
  display: block;
  border-radius: 10px;
  z-index: 0;
  position: relative;
  image-rendering: optimizequality;
  image-rendering: -webkit-optimize-contrast;
  margin-bottom: 10px;
  margin-top: 5px;
  ${(props) => props.theme.breakpoints.up("md")} {
    margin-top: 10px;
  }
`;

const ImageInstall = styled.img`
  max-width: 80%;
  height: auto;
  min-height: 10px;
  display: block;
  border-radius: 10px;
  z-index: 0;
  position: relative;
  image-rendering: optimizequality;
  image-rendering: -webkit-optimize-contrast;
  margin-bottom: 10px;
  margin-top: 5px;
  ${(props) => props.theme.breakpoints.up("md")} {
    margin-top: 10px;
  }
`;

function DashboardApp() {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const { dataStudent } = useSelector((state) => state.dashboard);
  const navigate = useNavigate();
  const name = localStorage.getItem("user");
  const [open, setOpen] = useState(localStorage.getItem("dashone") === "true");
  const [openIos, setOpenIos] = useState(false);
  const [openAndroid, setOpenAndroid] = useState(false);

  useEffect(() => {
    dispatch(getDataStudent());
  }, [dispatch]);

  return (
    <React.Fragment>
      <Helmet title="Dashboard" />
      <Grid justifyContent="space-between" container spacing={6}>
        <Grid item>
          <Typography variant="h3" gutterBottom>
            {"Bienvenido Capitán:"} {name}
          </Typography>
        </Grid>
      </Grid>
      <Divider my={6} />
      <Grid container spacing={6} style={{ marginBottom: '45px' }}>
        <Grid item xs={12} sm={12} md={7} lg={7} xl={7}>
          <BarChart
            labels={dataStudent?.aSubjects}
            info={dataStudent?.aReps}
            title="Conteo de test por materia"
            label="Repeticiones"
          />
        </Grid>
        <Grid item xs={12} sm={12} md={5} lg={5} xl={5}>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <Stats
                title="Materias en curso"
                amount={dataStudent?.subjectsActives}
                illustration={subjectImage}
                additionalText="&nbsp;"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <Stats
                title="Test simulacro"
                amount={dataStudent?.test}
                illustration={workingImage}
                additionalText="&nbsp;"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <Stats
                title="Materias terminadas"
                amount={dataStudent?.subjects}
                illustration={checkImage}
                additionalText="&nbsp;"
              />
            </Grid>
          </Grid>
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
        fullScreen
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => setOpen(false)}
              aria-label="close"
            ></IconButton>
            <Typography
              sx={{ ml: 2, flex: 1 }}
              variant="h3"
              component="div"
              onClick={() => {
                setOpen(false);
                localStorage.setItem("dashone", false);
              }}
            >
              Aviation In Sight
            </Typography>
            <Button
              autoFocus
              color="inherit"
              onClick={() => {
                setOpen(false);
                localStorage.setItem("dashone", false);
              }}
            >
              Comenzar
            </Button>
          </Toolbar>
        </AppBar>
        <DialogTitle>
          <Box display="flex" justifyContent="center" alignItems="center" style={{ marginTop: '10px' }}>
            <Typography variant="h2">
              {"Hola Capitán"}
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <Box display="flex" justifyContent="center" alignItems="center" style={{ marginTop: '10px' }}>
              <Typography variant="h2">
                Bienvenido a
              </Typography>
            </Box>
            <Box display="flex" justifyContent="center" alignItems="center">
              <Image alt="App de aviacion" src={backgroundJpe} />
            </Box>
            <Box display="flex" justifyContent="center" alignItems="center">
              <Typography variant="h2">{"Aviation In Sight"}</Typography>
            </Box>
          </DialogContentText>

          <Box display="flex" justifyContent="center" alignItems="center" style={{ marginTop: '70px' }}>
            <Typography variant="subtitle1" justifyContent="center">
              ¿Que desea hacer hoy capitán
            </Typography>
          </Box>
          <Box display="flex" justifyContent="center" alignItems="center" style={{ marginTop: '10px' }}>
            <Typography variant="subtitle1" justifyContent="center">
              {name}?
            </Typography>
          </Box>
          <Box display="flex" justifyContent="center" alignItems="center" style={{ marginTop: '10px' }}>
            <Typography variant="subtitle1" justifyContent="center">
              Tutorial de instalación
            </Typography>
          </Box>
          <Box display="flex" justifyContent="center" alignItems="center" style={{ marginTop: '10px' }}>
            <Button variant="contained" autoFocus onClick={() => setOpenAndroid(true)} size="large">
              ANDROID
            </Button>
          </Box>
          <Box display="flex" justifyContent="center" alignItems="center" style={{ marginTop: '10px' }}>
            <Button variant="contained" autoFocus onClick={() => setOpenIos(true)} size="large">
              IOS
            </Button>
          </Box>
          <Box display="flex" justifyContent="center" alignItems="center" style={{ marginTop: '10px' }}>
            <Button variant="contained" autoFocus onClick={() => setOpen(false)} size="large">
              Comenzar
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
      <Dialog
        open={openAndroid}
        onClose={() => { setOpenAndroid(false) }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Instalación en dispositivos Android"}
        </DialogTitle>
        <DialogContent>
          <Box display="flex" justifyContent="center" alignItems="center">
            <ImageInstall alt="App de aviacion" src={installAndroid} />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { setOpenAndroid(false) }} autoFocus>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openIos}
        onClose={() => setOpenIos(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Instalación en dispositivos IOS"}
        </DialogTitle>
        <DialogContent>
          <Box display="flex" justifyContent="center" alignItems="center">
            <ImageInstall alt="App de aviacion" src={installIos} />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenIos(false)} autoFocus>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default DashboardApp;
