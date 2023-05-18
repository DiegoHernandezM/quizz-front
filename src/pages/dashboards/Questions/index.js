import React, { useState, useEffect, useCallback } from "react";
import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import {
  getQuestionsCatalogue,
  massLoad,
} from "../../../redux/slices/questions";
import { UploadSingleFile } from "../../../components/UploadSingleFile";

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
import { DataGrid, esES } from "@mui/x-data-grid";
import { spacing } from "@mui/system";

const Card = styled(MuiCard)(spacing);

const CardContent = styled(MuiCardContent)(spacing);

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Paper = styled(MuiPaper)(spacing);

const columns = [
  { field: "id", headerName: "ID", width: 50 },
  {
    field: "question",
    headerName: "Pregunta",
    width: 250,
    editable: true,
  },
  {
    field: "points",
    headerName: "Puntos",
    width: 50,
    editable: true,
  },
  {
    field: "a",
    headerName: "Respuesta A",
    width: 100,
    editable: true,
  },
  {
    field: "b",
    headerName: "Respuesta B",
    width: 100,
    editable: true,
  },
  {
    field: "c",
    headerName: "Respuesta C",
    width: 100,
    editable: true,
  },
  {
    field: "answer",
    headerName: "Respuesta",
    width: 100,
    editable: true,
  },
  {
    field: "explanation",
    headerName: "Justificación",
    width: 100,
    editable: true,
  },
];

function QuestionsContent() {
  const dispatch = useDispatch();
  const { questionsCatalogue } = useSelector((state) => state.questions);

  useEffect(() => {
    dispatch(getQuestionsCatalogue());
  }, []);

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
              pagination: { paginationModel: { page: 0, pageSize: 50 } },
            }}
            localeText={esES.components.MuiDataGrid.defaultProps.localeText}
            pageSizeOptions={[50, 100, 200]}
            rows={questionsCatalogue ?? []}
            columns={columns}
            checkboxSelection
          />
        </div>
      </Paper>
    </Card>
  );
}

function QuestionsPage() {
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);

  const handleDropSingleFile = useCallback((acceptedFiles) => {
    const filex = acceptedFiles[0];
    if (filex) {
      setFile(filex);
    }
  }, []);
  useEffect(() => {
    if (file) {
      dispatch(massLoad(file)).then(() => {
        setFile(null);
        dispatch(getQuestionsCatalogue());
      });
    }
  }, [file]);
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
      <Card sx={{ marginTop: "20px" }}>
        <CardHeader title="Cargar desde plantilla..." />
        <CardContent>
          <UploadSingleFile
            file={file}
            onDrop={handleDropSingleFile}
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            requirements="Recuerda que debes incluir en los nombres de las columnas ID, MATERIA/CATEGORIA, PUNTOS, PREGUNTA, RESPUESTA, ANSWER A, ANSWER B, ANSWER C y JUSTIFICACION en la primer hoja"
          />
        </CardContent>
      </Card>
    </React.Fragment>
  );
}

export default QuestionsPage;
