import { Box } from '@mui/material';
import React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

const History:React.FC = () => {

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'transactionId', headerName: 'Transaction ID', width: 130 },
    { field: 'date', headerName: 'Date', width: 130 },
    { field: 'amount', headerName: 'Amount', width: 130 },
    { field: 'paymentMethod', headerName: 'Payment Method', width: 130 },
  ];
  
  const rows = [
    { id: 1, transactionId: 'h374rwguwe8d', date: '2024-02-27', amount: 100, paymentMethod: 'Credit Card' },
    { id: 2, transactionId: '45tery56yrth', date: '2024-02-26', amount: 150, paymentMethod: 'PayPal' },
    { id: 3, transactionId: 'fuig848gg9e4', date: '2024-02-25', amount: 200, paymentMethod: 'Bank Transfer' },
    { id: 4, transactionId: 'js9ejfg4ffy4', date: '2024-02-24', amount: 120, paymentMethod: 'Cash' },
    { id: 5, transactionId: '8sfhejrt34ts', date: '2024-02-21', amount: 140, paymentMethod: 'Bank Transfer' },
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
        // checkboxSelection
      />
    </Box>
  );
}

export { History };
