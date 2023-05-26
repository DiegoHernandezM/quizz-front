import React from "react";

import { Paper } from "@mui/material";

const columns = [
  { field: "id", headerName: "ID", width: 150 },
  {
    field: "name",
    headerName: "Materia",
    width: 400,
    editable: false,
  },
];

const Subjects = () => {
  return (
    <Card mb={6}>
      <Paper>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            localeText={esES.components.MuiDataGrid.defaultProps.localeText}
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
                clearSearch: () => requestSearch(""),
              },
            }}
            pageSize={10}
          />
        </div>
      </Paper>
    </Card>
  );
};

export default Subjects;
