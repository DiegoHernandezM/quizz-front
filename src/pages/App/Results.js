import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { getUserTests } from "../../redux/slices/usertests";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import Navigation from "./Navigation";

export default function Results() {
  const dispatch = useDispatch();
  const { userTests } = useSelector((state) => state.usertests);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUserTests());
  }, []);

  useEffect(() => {
    console.log(userTests);
  }, [userTests]);

  const handleGetTest = (testId = null) => {};

  const columns = [
    { field: "id", headerName: "ID", width: 50, hide: true },
    {
      field: "created_at",
      headerName: "fecha",
      width: 120,
      valueFormatter: (params) => {
        return new Date(params.value).toLocaleDateString();
      },
    },
    {
      field: "subject_name",
      headerName: "Materia",
      width: 120,
      valueFormatter: (params) => {
        return params.value ? params.value : "Simulacro";
      },
    },
    {
      field: "points",
      headerName: "Puntos",
      width: 120,
    },
  ];

  return (
    <Box sx={{ minWidth: 200 }}>
      <DataGrid
        rows={userTests}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10, 20, 50]}
      />
      <Navigation />
    </Box>
  );
}
