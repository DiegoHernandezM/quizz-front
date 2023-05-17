import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  Checkbox,
  Chip as MuiChip,
  Divider as MuiDivider,
  Grid,
  Link,
  Paper as MuiPaper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { DataGrid, esES } from "@mui/x-data-grid";
import { Add as AddIcon } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import {
  CheckOutlined,
  AccessTimeOutlined,
  CancelOutlined,
} from "@mui/icons-material";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { useDispatch, useSelector } from "react-redux";
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  restoreUser,
  clearDataUser,
} from "../../redux/slices/users";
import Page from "../components/Page";
// import { PATH_DASHBOARD } from "../../routes/paths";
// import HeaderBreadcrumbs from "../../components/HeaderBreadcrumbs";
// import useSettings from "../../hooks/useSettings";
import { QuickSearch } from "../components/tables";
import UserForm from "../components/user/UserForm";
//import PetitionForm from "../../components/petition/PetitionForm";
import useAuth from "../../hooks/useAuth";
import SnackAlert from "../components/general/SnackAlert";
import DialogConfirm from "../components/general/DialogConfirm";

const filters = {
  pinter: {
    cursor: "pointer",
    marginLeft: "5px",
    textAlign: "center",
  },
};

function escapeRegExp(value) {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

function Users() {
  const dispatch = useDispatch();
  const { users, user, error, loading } = useSelector((state) => state.users);
  const [openForm, setOpenForm] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [searchText, setSearchText] = useState("");
  const [openMessage, setOpenMessage] = useState(false);
  const [typeMessage, setTypeMessage] = useState("success");
  const [message, setMessage] = useState("");
  const [modeUpdate, setModeUpdate] = useState(false);
  const [rows, setRows] = useState([]);
  const { userAuth } = useAuth();
  const [userId, setUserId] = useState(0);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [modeRestore, setModeRestore] = useState(false);

  const columns = [
    {
      field: "name",
      headerName: "Nombre",
      width: 180,
      renderHeader: (p) => (
        <strong style={{ overflow: "visible" }}>{p.colDef.headerName}</strong>
      ),
    },
    {
      field: "email",
      headerName: "Email",
      width: 180,
      renderHeader: (p) => (
        <strong style={{ overflow: "visible" }}>{p.colDef.headerName}</strong>
      ),
    },
    {
      field: "school",
      headerName: "Escuela",
      width: 100,
      renderHeader: (p) => (
        <strong style={{ overflow: "visible" }}>{p.colDef.headerName}</strong>
      ),
    },
    {
      field: "type_id",
      headerName: "Tipo",
      width: 100,
      renderHeader: (p) => (
        <strong style={{ overflow: "visible" }}>{p.colDef.headerName}</strong>
      ),
      renderCell: (params) =>
        params.row.type_id === 1 ? "Admin" : "Estudiante",
    },
    {
      field: "expires_at",
      headerName: "Expira",
      width: 180,
      renderHeader: (p) => (
        <strong style={{ overflow: "visible" }}>{p.colDef.headerName}</strong>
      ),
    },
    {
      field: "action",
      headerName: "Acciones",
      sortable: false,
      disableExport: true,
      width: 90,
      renderCell: (params) => {
        const onClickDelete = (e) => {
          e.stopPropagation();
          setUserId(params.row.id);
          setOpenConfirm(true);
          setModeRestore(false);
        };
        const onClickRestore = (e) => {
          e.stopPropagation();
          setUserId(params.row.id);
          setOpenConfirm(true);
          setModeRestore(true);
        };
        return (
          <>
            <Tooltip key={`re-${params.row.id}`} title="Eliminar">
              <div>
                <IconButton
                  disabled={params.row.deleted_at !== null}
                  onClick={onClickDelete}
                  key={`re-${params.row.id}`}
                  type="button"
                  color="primary"
                  style={filters.pinter}
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            </Tooltip>
            <Tooltip key={`res-${params.row.id}`} title="Recuperar">
              <div>
                <IconButton
                  disabled={params.row.deleted_at === null}
                  color="primary"
                  onClick={onClickRestore}
                  key={`re-${params.row.id}`}
                  type="button"
                  style={filters.pinter}
                >
                  <RestoreFromTrashIcon />
                </IconButton>
              </div>
            </Tooltip>
          </>
        );
      },
    },
  ];

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const requestSearch = (searchValue) => {
    setSearchText(searchValue);
    console.log(searchValue);
    console.log(users);
    const searchRegex = new RegExp(escapeRegExp(searchValue), "i");
    const filteredRows = users.filter((row) =>
      Object.keys(row).some((field) => searchRegex.test(row[field]))
    );
    setRows(filteredRows);
  };

  const handleCloseForm = () => {
    dispatch(clearDataUser());
    setOpenForm(false);
  };

  const handleOpenForm = () => {
    setModeUpdate(false);
    setOpenForm(true);
  };

  const handleUpdate = (values) => {
    setOpenForm(false);
    dispatch(updateU(values));
  };

  const handleCloseConfirm = () => {
    if (modeRestore === false) {
      setModeUpdate(false);
      setOpenConfirm(false);
      setModeRestore(false);
    } else {
      setModeUpdate(false);
      setOpenConfirm(false);
      setModeRestore(true);
    }
  };

  const handleCloseAccept = () => {
    if (modeRestore === false) {
      setOpenConfirm(false);
      dispatch(deleteU());
    } else {
      setOpenConfirm(false);
      dispatch(restoreU());
    }
  };

  const handleCallbackForm = (values) => {
    dispatch(createU(values));
  };

  const handleCloseMessage = () => {
    setOpenMessage(false);
  };

  function createU(values) {
    return (dispatch) =>
      new Promise((resolve) => {
        resolve(dispatch(createUser(values)));
      })
        .then((response) => {
          setMessage(
            response.status === 200 ? "Usuario creado" : "Ocurro algun error"
          );
          setTypeMessage(response.status === 200 ? "success" : "error");
          dispatch(getUsers());
          setOpenMessage(true);
          setOpenForm(false);
        })
        .catch((error) => {
          setTypeMessage("error");
          setMessage(error.message);
          setOpenMessage(true);
          console.log(error);
        });
  }

  function updateU(values) {
    return (dispatch) =>
      new Promise((resolve) => {
        resolve(dispatch(updateUser(values)));
      })
        .then((response) => {
          dispatch(getUsers());
          setMessage(
            response.status === 200
              ? "Actualizacion realizada"
              : "Ocurrio algun error"
          );
          setTypeMessage(response.status === 200 ? "success" : "error");
          setOpenMessage(true);
        })
        .catch((error) => {
          setTypeMessage("error");
          setMessage(error.message);
          setOpenMessage(true);
          console.log(error);
        });
  }

  function deleteU() {
    return (dispatch) =>
      new Promise((resolve) => {
        resolve(dispatch(deleteUser(userId)));
      })
        .then((response) => {
          setMessage(
            response.status === 200
              ? "Usuario eliminado"
              : "Ocurrio algun error"
          );
          setTypeMessage(response.status === 200 ? "success" : "error");
          setOpenMessage(true);
          dispatch(getUsers());
          setUserId(0);
        })
        .catch((error) => {
          console.log(error);
        });
  }

  function restoreU() {
    return (dispatch) =>
      new Promise((resolve) => {
        resolve(dispatch(restoreUser(userId)));
      })
        .then((response) => {
          setMessage(
            response.status === 200
              ? "Usuario recuperado"
              : "Ocurrio algun error"
          );
          setTypeMessage(response.status === 200 ? "success" : "error");
          setOpenMessage(true);
          dispatch(getUsers());
          setUserId(0);
          setModeRestore(false);
        })
        .catch((error) => {
          console.log(error);
        });
  }

  // start <------->
  return (
    <Page title="Usuarios">
      <Grid justifyContent="space-between" container spacing={10}>
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            Usuarios
          </Typography>

          <Breadcrumbs aria-label="Breadcrumb" mt={2}>
            <Link component={NavLink} to="/dashboard">
              Dashboard
            </Link>
            <Typography>Usuarios</Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item>
          <div>
            <Button
              variant="contained"
              color="primary"
              onClick={handleOpenForm}
            >
              <AddIcon />
              Nuevo usuario
            </Button>
          </div>
        </Grid>
      </Grid>
      <SnackAlert
        message={message}
        type={typeMessage}
        open={openMessage}
        close={handleCloseMessage}
      />
      <Card>
        <div style={{ height: 600, width: "100%" }}>
          <div style={{ display: "flex", height: "100%" }}>
            <div style={{ flexGrow: 1 }}>
              <DataGrid
                components={{
                  Toolbar: QuickSearch,
                }}
                loading={loading}
                localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                rows={rows.length > 0 ? rows : users}
                columns={columns}
                rowHeight={40}
                componentsProps={{
                  hideFooterPagination: false,
                  toolbar: {
                    hideFooterPagination: false,
                    export: false,
                    columns: true,
                    density: true,
                    search: true,
                    customExport: false,
                    value: searchText,
                    onChange: (event) => requestSearch(event.target.value),
                    clearSearch: () => requestSearch(""),
                  },
                }}
                onRowDoubleClick={(params) => {
                  dispatch(getUser(params.row.id));
                  setModeUpdate(true);
                  setOpenForm(true);
                }}
                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => {
                  setPageSize(newPageSize);
                }}
                rowsPerPageOptions={[10, 20, 50, 100]}
              />
            </div>
          </div>
        </div>
      </Card>
      <UserForm
        open={openForm}
        close={handleCloseForm}
        parentCallback={handleCallbackForm}
        user={user}
        update={modeUpdate}
        updateUser={handleUpdate}
        loading={loading}
      />
      <DialogConfirm
        open={openConfirm}
        close={handleCloseConfirm}
        title={modeRestore === false ? "Eliminar Usuario" : "Recuperar Usuario"}
        body={
          modeRestore === false
            ? "Desea eliminar este usuario"
            : "Desea recuperar este usuario"
        }
        agree={handleCloseAccept}
      />
    </Page>
  );
}

export default Users;
