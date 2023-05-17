/* eslint-disable no-nested-ternary */
import { useEffect } from "react";
import PropTypes from "prop-types";
import moment from "moment";
// material
import {
  Box,
  Button,
  Drawer,
  FormControl,
  MenuItem,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { DatePicker } from "@mui/lab";

import * as yup from "yup";
import { useFormik } from "formik";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import esLocale from "date-fns/locale/es";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

// ----------------------------------------------------------------------

UserForm.propTypes = {
  open: PropTypes.bool,
  close: PropTypes.func,
  parentCallback: PropTypes.any,
  user: PropTypes.object,
  update: PropTypes.bool,
  updateUser: PropTypes.func,
  loading: PropTypes.bool,
};

const validationSchema = yup.object({
  name: yup.string("Name").required("El nombre es requerido"),
  email: yup.string("Email").required("El email es requerido"),
  school: yup.string("Fecha").required("La escuela es requerida"),
  expires_at: yup.string("Expira").required("El campo expira es requerido"),
});

const TYPE = [
  { value: "", label: "SELECCIONE" },
  { value: "admin", label: "Administrador" },
  { value: "student", label: "Estudiante" },
];

export default function UserForm({
  open,
  close,
  parentCallback,
  user,
  update,
  updateUser,
  loading,
}) {

  const formik = useFormik({
    initialValues: {
      id: 0,
      name: "",
      email: "",
      school: "",
      type: 0,
      expires_at: moment().format("YYYY-MM-DD"),
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      if (!update) {
        parentCallback(values);
      } else {
        updateUser(values);
      }
      resetForm(formik.initialValues);
    },
  });

  useEffect(() => {
    formik.setFieldValue("id", user.id ?? formik.initialValues.id);
    formik.setFieldValue("name", user.name ?? formik.initialValues.name);
    formik.setFieldValue("email", user.email ?? formik.initialValues.email);
    formik.setFieldValue("school", user.school ?? formik.initialValues.school);
    formik.setFieldValue(
      "type_id",
      user.type_id ?? formik.initialValues.type_id
    );
    formik.setFieldValue(
      "expires_at",
      user.expires_at ?? formik.initialValues.expires_at
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [update, user]);

  const handleOnClose = () => {
    close();
  };

  return (
    <Drawer anchor="right" open={open} onClose={handleOnClose}>
      <LocalizationProvider dateAdapter={AdapterDateFns} locale={esLocale}>
        <Box sx={{ width: { xs: "100%", md: "500px", xl: "600px" } }}>
          <form noValidate autoComplete="off" onSubmit={formik.handleSubmit}>
            <Box
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "nowrap",
                justifyContent: "space-between",
              }}
            >
              <Typography
                variant="h4"
                style={{
                  marginTop: "10px",
                  marginLeft: "10px",
                  marginBottom: "30px",
                }}
              >
                {update ? "Detalle" : "Editar"}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{
                  borderRadius: 30,
                  height: "30px",
                  marginTop: "20px",
                  marginRight: "10px",
                }}
                size="small"
              >
                {update ? "Actualizar Usuario" : "Guardar"}
              </Button>
              <IconButton
                aria-label="close"
                onClick={handleOnClose}
                sx={{
                  color: (theme) => theme.palette.grey[500],
                }}
                style={{
                  marginTop: "10px",
                  marginLeft: "10px",
                  marginBottom: "30px",
                }}
              >
                <Close />
              </IconButton>
            </Box>
            <FormControl
              style={{ marginLeft: "10px", marginTop: "10px", width: "95%" }}
            >
              <TextField
                id="name"
                name="name"
                label="Nombre"
                value={formik.values.name || ""}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                fullWidth
                helperText={formik.touched.name && formik.errors.name}
                size="small"
              />
            </FormControl>
            <FormControl
              style={{ marginLeft: "10px", marginTop: "10px", width: "95%" }}
            >
              <TextField
                id="email"
                name="email"
                label="Email"
                value={formik.values.email || ""}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                fullWidth
                helperText={formik.touched.email && formik.errors.email}
                size="small"
              />
            </FormControl>
            <FormControl
              style={{ marginLeft: "10px", marginTop: "10px", width: "95%" }}
            >
              <TextField
                id="school"
                name="school"
                label="Escuela"
                value={formik.values.school || ""}
                onChange={formik.handleChange}
                error={formik.touched.school && Boolean(formik.errors.school)}
                fullWidth
                helperText={formik.touched.school && formik.errors.school}
                size="small"
              />
            </FormControl>
            <FormControl
              style={{ marginLeft: "10px", marginTop: "10px", width: "95%" }}
            >
              <TextField
                id="type_id"
                name="type_id"
                label="Tipo de usuario"
                onChange={(e, value) => {
                  formik.setFieldValue("type_id", value.props.value);
                }}
                value={formik.values.type_id || ""}
                error={formik.touched.type_id && Boolean(formik.errors.type_id)}
                helperText={formik.touched.type_id && formik.errors.type_id}
                select
                fullWidth
                size="small"
              >
                {TYPE.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>
            <FormControl
              style={{ marginLeft: "10px", marginTop: "10px", width: "95%" }}
            >
              <DatePicker
                label="Expira"
                minDate={new Date(moment().subtract(1, "days"))}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    size="small"
                    helperText={formik.touched.expires_at && formik.errors.expires_at}
                    error={formik.touched.expires_at && Boolean(formik.errors.expires_at)}
                  />
                )}
                id="expires_at"
                name="expires_at"
                value={moment(formik.values.expires_at)}
                onChange={(value) => {
                  formik.setFieldValue("expires_at", value);
                }}
              />
            </FormControl>
          </form>
        </Box>
      </LocalizationProvider>
    </Drawer>
  );
}
