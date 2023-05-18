import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { getSubjects, getDeleteSubject, getRestoreSubject, getSubject, update, create } from "../../../redux/slices/subjects";

import {
  Button,
  Link,
  Breadcrumbs as MuiBreadcrumbs,
  Card as MuiCard,
  CardContent as MuiCardContent,
  Divider as MuiDivider,
  Paper as MuiPaper,
  Typography,
  Tooltip,
  IconButton
} from "@mui/material";
import { Delete, RestoreFromTrash } from '@mui/icons-material';
import { red } from '@mui/material/colors';
import { DataGrid, esES } from "@mui/x-data-grid";
import { spacing } from "@mui/system";
import QuickSearch from '../../tables/QuickSearch';
import Confirm from "../../../components/general/Confirm";
import SubjectForm from "../../../components/subject/SubjectForm";

const Card = styled(MuiCard)(spacing);

const CardContent = styled(MuiCardContent)(spacing);

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Paper = styled(MuiPaper)(spacing);

const filters = {
    pinter: {
      cursor: 'pointer',
      marginLeft: '5px',
      textAlign: 'center'
    }
};

function escapeRegExp(value) {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

function Subjects() {
  const dispatch = useDispatch();
  const { allSubjects, subject } = useSelector((state) => state.subjects);
  const [searchText, setSearchText] = useState('');
  const [rows, setRows] = useState([]);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [titleDialog, setTitleDialog] = useState('');
  const [bodyDialog, setBodyDialog] = useState('');
  const [restore, setRestore] = useState(false);
  const [id, setId] = useState(0);
  const [openForm, setOpenForm] = useState(false);
  const [modeUpdate, setModeUpdate] = useState(false);

  useEffect(() => {
    dispatch(getSubjects());
  }, []);

  const handleRestore = (id) => {
    // dispatch(restoreU(id));
    console.log(id);
  };

  const handleDelete = (id) => {
    
    console.log(id);
  };

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const requestSearch = (searchValue) => {
    setSearchText(searchValue);
    const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');
    const filteredRows = allSubjects.filter((row) => Object.keys(row).some((field) => searchRegex.test(row[field])));
    setRows(filteredRows);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 150 },
    {
      field: "name",
      headerName: "Materia",
      width: 400,
      editable: false,
    },
    {
      field: 'action',
      headerName: 'Acciones',
      sortable: false,
      disableExport: true,
      width: 300,
      renderCell: (params) => {
        const onClickDelete = (e) => {
          console.log("ok");
          e.stopPropagation();
          setRestore(false);
          handleOpenConfirm();
          setTitleDialog('Eliminar Materia');
          setBodyDialog('¿Desea eliminar el registro?');
          setId(params.row.id);
        };
        const onClickRestore = (e) => {
          e.stopPropagation();
          handleOpenConfirm();
          setRestore(true);
          setTitleDialog('Recuperar Materia');
          setBodyDialog('¿Desea recuperar el registro?');
          setId(params.row.id);
        };
        return (
          <>
            <Tooltip key={`re-${params.row.id}`} title="Eliminar">
              <div>
                <IconButton
                  disabled={params.row.deleted_at !== null}
                  onClick={onClickDelete}
                  key={`delete-${params.row.id}`}
                  type="button"
                  color="danger"
                  style={filters.pinter}
                  sx={{ color: red[500] }}
                >
                  <Delete />
                </IconButton>
              </div>
            </Tooltip>
            <Tooltip key={`res-${params.row.id}`} title="Recuperar">
              <div>
                <IconButton
                  disabled={params.row.deleted_at === null}
                  color="primary"
                  onClick={onClickRestore}
                  key={`restore-${params.row.id}`}
                  type="button"
                  style={filters.pinter}
                >
                  <RestoreFromTrash />
                </IconButton>
              </div>
            </Tooltip>
          </>
        );
      }
    }
  ];
  function deleteS(id) {
    return (dispatch) =>
      new Promise((resolve) => {
        resolve(dispatch(getDeleteSubject(id)));
      })
        .then(() => {
          dispatch(getSubjects());
        })
        .catch((error) => {
          console.log(error);
        });
  }

  function restoreS(id) {
    return (dispatch) =>
      new Promise((resolve) => {
        resolve(dispatch(getRestoreSubject(id)));
      })
        .then(() => {
          dispatch(getSubjects());
        })
        .catch((error) => {
          console.log(error);
        });
  }

  const handleCloseAccept = () => {
    if (restore) {
      dispatch(restoreS(id));
    } else {
      dispatch(deleteS(id));
    }
    setOpenConfirm(false);
  };

  const handleCallback = (values) => {
    dispatch(createSubject(values));
  };

  function updateSubject(values) {
    return (dispatch) =>
      new Promise((resolve) => {
        resolve(dispatch(update(id, values)));
      })
        .then((response) => {
          dispatch(getSubjects());
          setOpenForm(false);
          setModeUpdate(false);
        })
        .catch((error) => {
          console.log(error);
        });
  }

  function createSubject(values) {
    return (dispatch) =>
      new Promise((resolve) => {
        resolve(dispatch(create(values)));
      })
        .then((response) => {
          dispatch(getSubjects());
          setOpenForm(false);
          setModeUpdate(false);
        })
        .catch((error) => {
          console.log(error);
        });
  }

  const handleUpdate = (values) => {
    dispatch(updateSubject(values));
  };

  return (
    <>
      <Card mb={6}>
        <CardContent pb={1}>
          <Button variant="contained" sx={{ marginBottom: "10px" }} onClick={()=> {
              setOpenForm(true);
              setModeUpdate(false);
            }}>
            Nueva materia
          </Button>
        </CardContent>
        <Paper>
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              components={{
                Toolbar: QuickSearch
              }}
              initialState={{
                pagination: { paginationModel: { page: 0, pageSize: 5 } },
              }}
              localeText={esES.components.MuiDataGrid.defaultProps.localeText}
              pageSizeOptions={[5, 10, 25]}
              rows={rows.length > 0 ? rows : allSubjects}
              rowHeight={40}
              columns={columns}
              onRowDoubleClick={(params) => {
                setId(params.row.id);
                dispatch(getSubject(params.row.id));
                setModeUpdate(true);
                setOpenForm(true);
              }}
              componentsProps={{
                hideFooterPagination: false,
                toolbar: {
                  export: false,
                  columns: true,
                  density: true,
                  search: true,
                  value: searchText,
                  onChange: (event) => requestSearch(event.target.value),
                  clearSearch: () => requestSearch('')
                }
              }}
              pageSize={10}
            />
          </div>
        </Paper>
      </Card>
      <Confirm
        open={openConfirm}
        close={handleCloseConfirm}
        title={titleDialog}
        body={bodyDialog}
        agree={handleCloseAccept}
      />
      <SubjectForm
        open={openForm}
        close={() => setOpenForm(false)}
        parentCallback={handleCallback}
        subject={subject}
        update={modeUpdate}
        updateRegister={handleUpdate}
      />
    </>
  );
}

function SubjectsPage() {
  return (
    <React.Fragment>
      <Helmet title="Data Grid" />
      <Typography variant="h3" gutterBottom display="inline">
        Lista de Materias
      </Typography>

      <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        <Link component={NavLink} to="/">
          Dashboard
        </Link>
        <Typography>Materias</Typography>
      </Breadcrumbs>

      <Divider my={6} />

      <Subjects />
    </React.Fragment>
  );
}

export default SubjectsPage;
