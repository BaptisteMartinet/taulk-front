import React, { FunctionComponent } from 'react';
import { useQuery, gql } from '@apollo/client';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import { LobbyRestricted } from 'api/types';
import { Link } from 'react-router-dom';

const GetLobbies = gql`
query Lobbies {
  public {
    lobbies {
      id
      title
      description
      createdAt
      updatedAt
    }
  }
}
`;

const columns: GridColDef[] = [
  { field: 'title', headerName: 'Title', flex: 1, renderCell: (params) => (<Link to={'/login'} style={{ color: 'blue' }}>{params.value}</Link>) },
  { field: 'description', headerName: 'Description', flex: 1 },
  { field: 'createdAt', headerName: 'Creation date', flex: 0.5 },
];

const Lobbies: FunctionComponent = () => {
  const [pageSize, setPageSize] = React.useState(5);
  const { loading, error, data } = useQuery(GetLobbies);
  if (loading || error != null) {
    return null; // TODO display loading spinner
  }
  const lobbies: LobbyRestricted[] = data.public.lobbies;
  const rows: GridRowsProp = lobbies.map((lobby) => {
    const { id, title, description, createdAt } = lobby;
    return { id, title, description, createdAt: new Date(createdAt).toDateString() };
  });
  return (
    <DataGrid
      rows={rows}
      columns={columns}
      autoHeight
      pageSize={pageSize}
      onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
      rowsPerPageOptions={[5, 10]}
      isRowSelectable={() => false}
    />
  );
};

export default Lobbies;
