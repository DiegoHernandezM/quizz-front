import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { getUserTests } from "../../redux/slices/usertests";
import { DataGrid, esES } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import Navigation from "./Navigation";
import moment from "moment";

export default function Results() {
  const dispatch = useDispatch();
  const { userTests } = useSelector((state) => state.usertests);
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    dispatch(getUserTests());
  }, []);


  const ProgressDiv = styled("div")({
    width: "100%",
    border: "1px solid rgba(140, 140, 140, 0.5)",
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
      field: "id",
      headerName: "ID",
      width: 50,
      renderHeader: (p) => (
        <strong style={{ overflow: "visible" }}>{p.colDef.headerName}</strong>
      ),
      hide: true,
    },
    {
      field: "created_at",
      headerName: "fecha",
      width: 120,
      renderHeader: (p) => (
        <strong style={{ overflow: "visible" }}>{p.colDef.headerName}</strong>
      ),
      valueFormatter: (params) => {
        return new Date(params.value).toLocaleDateString();
      },
    },
    {
      field: "subject_name",
      headerName: "Materia",
      width: 120,
      renderHeader: (p) => (
        <strong style={{ overflow: "visible" }}>{p.colDef.headerName}</strong>
      ),
      valueFormatter: (params) => {
        return params.value ? params.value : "Simulacro";
      },
    },
    {
      field: "points",
      headerName: "Puntos",
      width: 120,
    },
    {
      field: "progress",
      headerName: "Progreso",
      width: 250,
      renderHeader: (p) => (
        <strong style={{ overflow: "visible" }}>{p.colDef.headerName}</strong>
      ),
      renderCell: (params) => {
        return params.value !== null ? (
          <ProgressDiv>
            <ProgressContainer>
              {((params.row.grade * 100) / params.row.points).toFixed(2)}%
            </ProgressContainer>
            <div
              style={{
                height: "100%",
                maxWidth: `${(
                  (params.row.grade * 100) /
                  params.row.points
                ).toFixed(2)}%`,
                backgroundColor:
                  theme.palette.mode === "light"
                    ? theme.palette.primary.light
                    : theme.palette.primary.dark,
              }}
            />
          </ProgressDiv>
        ) : (
          ""
        );
      },
    },
    {
      field: "total",
      headerName: "Total",
      width: 100,
      renderHeader: (p) => (
        <strong style={{ overflow: "visible" }}>{p.colDef.headerName}</strong>
      ),
      renderCell: (params) => {
        const total = params.row.grade + "/" + params.row.points;
        return total;
      },
    },
    {
      field: "duration",
      headerName: "Tiempo",
      width: 220,
      renderHeader: (p) => (
        <strong style={{ overflow: "visible" }}>{p.colDef.headerName}</strong>
      ),
      valueFormatter: (params) => {
        return params.value !== null
          ? moment(params.value).format("HH:mm:ss")
          : "Sin datos";
      },
    },
  ];

  return (
    <React.Fragment>
      <Box sx={{ minWidth: 200 }}>
        <div style={{ height: 720, width: "100%" }}>
          <DataGrid
            initialState={{
              pagination: { paginationModel: { page: 0, pageSize: 10 } },
            }}
            localeText={esES.components.MuiDataGrid.defaultProps.localeText}
            pageSizeOptions={[10, 20, 50]}
            rows={userTests ?? []}
            rowHeight={50}
            columns={columns}
          />
          <Navigation />
        </div>
      </Box>
    </React.Fragment>
  );
}
