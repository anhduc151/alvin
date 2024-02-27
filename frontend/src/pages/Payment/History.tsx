import { Box } from '@mui/material';
import React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

const History:React.FC = () => {

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'date', headerName: 'Date', width: 130 },
    { field: 'amount', headerName: 'Amount', width: 130 },
    { field: 'paymentMethod', headerName: 'Payment Method', width: 130 },
  ];
  
  const rows = [
    { id: 1, date: '2024-02-27', amount: 100, paymentMethod: 'Credit Card' },
    { id: 2, date: '2024-02-26', amount: 150, paymentMethod: 'PayPal' },
    { id: 3, date: '2024-02-25', amount: 200, paymentMethod: 'Bank Transfer' },
    { id: 4, date: '2024-02-24', amount: 120, paymentMethod: 'Cash' },
    { id: 5, date: '2024-02-21', amount: 140, paymentMethod: 'Bank Transfer' },
  ];
  
  return (
    <Box>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </Box>
  );
}

export { History };
