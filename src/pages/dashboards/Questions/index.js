import React from "react";
import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet-async";
// import { UploadSingleFile } from "../../../components/UploadSingleFile";

import {
  Button,
  CardHeader,
  Link,
  Breadcrumbs as MuiBreadcrumbs,
  Card as MuiCard,
  CardContent as MuiCardContent,
  Divider as MuiDivider,
  Paper as MuiPaper,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { spacing } from "@mui/system";

const Card = styled(MuiCard)(spacing);

const CardContent = styled(MuiCardContent)(spacing);

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Paper = styled(MuiPaper)(spacing);

const columns = [
  { field: "id", headerName: "ID", width: 150 },
  {
    field: "firstName",
    headerName: "First name",
    width: 200,
    editable: true,
  },
  {
    field: "lastName",
    headerName: "Last name",
    width: 200,
    editable: true,
  },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 150,
    editable: true,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 250,
    valueGetter: (params) =>
      `${params.row.firstName || ""} ${params.row.id || ""}`,
  },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

function QuestionsContent() {
  return (
    <Card mb={6}>
      <CardContent pb={1}>
        <Button variant="contained" sx={{ marginBottom: "10px" }}>
          Nueva pregunta
        </Button>
        <Typography variant="body2" gutterBottom>
          Esta es la lista de preguntas que se muestran en la sección de
          cuestionarios, puedes editarlas o eliminarlas.
        </Typography>
      </CardContent>
      <Paper>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            initialState={{
              pagination: { paginationModel: { page: 0, pageSize: 5 } },
            }}
            pageSizeOptions={[5, 10, 25]}
            rows={rows}
            columns={columns}
            checkboxSelection
          />
        </div>
      </Paper>
    </Card>
  );
}

function QuestionsPage() {
  return (
    <React.Fragment>
      <Helmet title="Data Grid" />
      <Typography variant="h3" gutterBottom display="inline">
        Lista de Preguntas
      </Typography>

      <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        <Link component={NavLink} to="/">
          Dashboard
        </Link>
        <Typography>Preguntas</Typography>
      </Breadcrumbs>

      <Divider my={6} />

      <QuestionsContent />
      {/* <Card sx={{ marginTop: "20px" }}>
        <CardHeader title="Cargar desde layout..." />
        <CardContent>
          <UploadSingleFile
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            requirements="Recuerda que debes incluir LOCAL, TIENDA, SKU, PIEZAS y PPK en la primer hoja"
          />
        </CardContent>
      </Card> */}
    </React.Fragment>
  );
}

export default QuestionsPage;
