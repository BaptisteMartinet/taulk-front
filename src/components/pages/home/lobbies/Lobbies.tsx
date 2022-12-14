import React, { FunctionComponent } from 'react';
import * as datefns from 'date-fns';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import { LobbyRestricted } from 'core/api/types';
import { GetLobbies } from 'core/api/queries';

const Lobbies: FunctionComponent = () => {
  const { t } = useTranslation();
  const [pageSize, setPageSize] = React.useState(10);
  const { loading, error, data } = useQuery(GetLobbies);
  if (loading || error != null) {
    return (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    );
  }
  const lobbies: LobbyRestricted[] = data.public.lobbies;
  const rows: GridRowsProp = lobbies.map((lobby) => {
    const { id, title, description, createdAt } = lobby;
    return { id, title, description, createdAt: datefns.format(createdAt, t('misc.date-format')) };
  });
  const columns: GridColDef[] = [
    {
      field: 'title',
      headerName: t('pages.home.lobbies.title-header'),
      flex: 1,
      renderCell: (params) => (<Link to={`/join-lobby/${params.row.id as string}`} style={{ color: 'blue' }}>{params.value}</Link>),
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
      rowsPerPageOptions={[10, 20, 30, 50, 100]}
      isRowSelectable={() => false}
    />
  );
};

export default Lobbies;
