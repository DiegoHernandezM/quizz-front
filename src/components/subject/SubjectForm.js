import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// material
import { Box, Button, Drawer, FormControl, TextField, Typography, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
import * as yup from 'yup';
import { useFormik } from 'formik';
// ----------------------------------------------------------------------

SubjectForm.propTypes = {
  open: PropTypes.bool,
  close: PropTypes.func,
  parentCallback: PropTypes.any,
  subject: PropTypes.object,
  update: PropTypes.bool,
  updateRegister: PropTypes.func
};

export default function SubjectForm({
  open,
  close,
  parentCallback,
  subject,
  update,
  updateRegister
}) {
  const validationSchema = yup.object({
    name: yup.string('Nombre').required('El nombre es requerido'),
  });
  const formik = useFormik({
    initialValues: {
      name: ''
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      if (!update) {
        parentCallback(values);
      } else {
        updateRegister(values);
      }
      resetForm(formik.initialValues);
    }
  });

  useEffect(() => {  
    formik.setFieldValue('name', update ? subject.name : formik.initialValues.name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [update, subject]);

  return (
    <Drawer anchor="right" open={open} onClose={close}>
      <Box sx={{ width: { xs: '100%', md: '500px', xl: '600px' }, padding: "10px" }}>
        <form noValidate autoComplete="off" onSubmit={formik.handleSubmit}>
          <Box
            style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'nowrap',
              justifyContent: 'space-between'
            }}
          >
            <Typography variant="h4" style={{ marginTop: '10px', marginBottom: '30px' }}>
              {update ? 'Actualizar' : 'Nuevo'}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              style={{
                borderRadius: 30,
                height: '30px',
                marginTop: '10px',
                marginLeft: '10px',
                marginBottom: '30px'
              }}
              size="small"
            >
              {update ? 'Actualizar' : 'Guardar'}
            </Button>
            <IconButton
              aria-label="close"
              onClick={close}
              sx={{
                color: (theme) => theme.palette.grey[500]
              }}
              style={{ marginTop: '10px', marginBottom: '30px' }}
            >
              <Close />
            </IconButton>
          </Box>
          <FormControl style={{ marginTop: '8px', width: '100%' }}>
            <TextField
              id="name"
              name="name"
              label="Nombre"
              value={formik.values.name || ''}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              fullWidth
              helperText={formik.touched.name && formik.errors.name}
              size="small"
            />
          </FormControl>
        </form>
      </Box>
    </Drawer>
  );
}
