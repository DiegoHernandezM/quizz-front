import React from "react";
import styled from "@emotion/styled";
import { useTheme } from "@mui/material/styles";
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import { DataGrid, esES } from "@mui/x-data-grid";

const UserProgress = ({ open, close, progress }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const theme = useTheme();
  const ProgressDiv = styled("div")({
    width: "100%",
    border: "1px solid rgba(255, 255, 255, 0.12)",
    height: "26px",
    overflow: "hidden",
    position: "relative",
    borderRadius: "2px",
  });

  const ProgressContainer = styled("div")({
    width: "100%",
    display: "flex",
    position: "absolute",
    lineHeight: "24px",
    justifyContent: "center",
    color: theme.palette.mode === "light" ? "black" : "white",
  });

  const columns = [
    {
      field: "name",
      headerName: "Materia",
      width: 250,
      renderHeader: (p) => (
        <strong style={{ overflow: "visible" }}>{p.colDef.headerName}</strong>
      ),
    },
    {
      field: "completed",
      headerName: "status",
      width: 200,
      renderHeader: (p) => (
        <strong style={{ overflow: "visible" }}>{p.colDef.headerName}</strong>
      ),
      renderCell: (params) =>
        params.row.completed === 0 ? "En progreso" : "Completado",
    },
    {
      field: "progress",
      headerName: "Progreso",
      width: 250,
      renderHeader: (p) => (
        <strong style={{ overflow: "visible" }}>{p.colDef.headerName}</strong>
      ),
      renderCell: (params) => {
        return (
          <ProgressDiv>
            <ProgressContainer>{params.row.percentage}%</ProgressContainer>
            <div
              style={{
                height: "100%",
                maxWidth: `${params.row.percentage}%`,
                backgroundColor: theme.palette.mode === 'light' ? theme.palette.primary.light : theme.palette.primary.dark
              }}
            />
          </ProgressDiv>
        );
      },
    },
  ];
  return (
    <Dialog open={open} fullWidth maxWidth="lg" onClose={close}>
      <DialogTitle>Progreso del usuario</DialogTitle>
      <div style={{ height: 360, width: "100%" }}>
        <DataGrid
          initialState={{
            pagination: { paginationModel: { page: 0, pageSize: 10 } },
          }}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          pageSizeOptions={[5, 10, 25]}
          rows={progress ?? []}
          rowHeight={40}
          columns={columns}
        />
      </div>
      <DialogActions>
        <Button onClick={close}>Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserProgress;
