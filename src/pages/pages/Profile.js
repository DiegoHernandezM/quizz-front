import React from "react";
import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import {
  Breadcrumbs as MuiBreadcrumbs,
  Button as MuiButton,
  Card as MuiCard,
  CardContent,
  Divider as MuiDivider,
  FormControl as MuiFormControl,
  Grid,
  Link,
  TextField as MuiTextField,
  Typography,
} from "@mui/material";
import { spacing } from "@mui/system";

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Card = styled(MuiCard)(spacing);

const Divider = styled(MuiDivider)(spacing);

const FormControl = styled(MuiFormControl)(spacing);

const TextField = styled(MuiTextField)(spacing);

const Button = styled(MuiButton)(spacing);

function Public() {
  return (
    <Card mb={6}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Información personal
        </Typography>

        <Grid container spacing={6}>
          <Grid item md={6}>
            <FormControl fullWidth my={2} variant="outlined">
              <TextField
                id="first-name"
                label="Nombre"
                variant="outlined"
                defaultValue="Lucy"
                fullWidth
                my={2}
              />
            </FormControl>
          </Grid>
          <Grid item md={6}>
            <FormControl fullWidth my={2} variant="outlined">
              <TextField
                id="last-name"
                label="Apellidos"
                variant="outlined"
                defaultValue="Lavender"
                fullWidth
                my={2}
              />
            </FormControl>
          </Grid>
        </Grid>

        <Grid container spacing={6}>
          <Grid item md={6}>
            <FormControl fullWidth my={2} variant="outlined">
              <TextField
                id="email"
                label="Email"
                variant="outlined"
                type="email"
                defaultValue="lucylavender@gmail.com"
                fullWidth
                my={2}
              />
            </FormControl>
          </Grid>
          <Grid item md={6}>
            <FormControl fullWidth my={2} variant="outlined">
              <TextField
                id="address"
                label="Address"
                variant="outlined"
                fullWidth
                my={2}
              />
            </FormControl>
          </Grid>
        </Grid>

        <Grid container spacing={6}>
          <Grid item md={6}>
            <TextField
              id="city"
              label="City"
              variant="outlined"
              fullWidth
              my={2}
            />
          </Grid>
          <Grid item md={4}>
            <TextField
              id="state"
              label="State"
              variant="outlined"
              fullWidth
              my={2}
            />
          </Grid>
          <Grid item md={2}>
            <TextField
              id="zip"
              label="Zip"
              variant="outlined"
              fullWidth
              my={2}
            />
          </Grid>
        </Grid>

        <Button variant="contained" color="primary" mt={3}>
          Guardar
        </Button>
      </CardContent>
    </Card>
  );
}

function Profile() {
  return (
    <React.Fragment>
      <Helmet title="Perfil" />

      <Typography variant="h3" gutterBottom display="inline">
        Perfil
      </Typography>

      <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        <Link component={NavLink} to="/dashboard">
          Dashboard
        </Link>
        <Typography>Perfil</Typography>
      </Breadcrumbs>

      <Divider my={6} />

      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Public />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Profile;
