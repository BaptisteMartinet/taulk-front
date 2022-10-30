import React, { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import { LobbyRestricted } from 'api/types';

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

const Lobbies: FunctionComponent = () => {
  const { t } = useTranslation();
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
  const columns: GridColDef[] = [
    {
      field: 'title',
      headerName: t('pages.home.lobbies.title-header'),
      flex: 1,
      renderCell: (params) => (<Link to={'/login'} style={{ color: 'blue' }}>{params.value}</Link>),
    },
    { field: 'description', headerName: t('pages.home.lobbies.description-header'), flex: 1 },
    { field: 'createdAt', headerName: t('pages.home.lobbies.createdAt-header'), flex: 0.5 },
  ];
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
