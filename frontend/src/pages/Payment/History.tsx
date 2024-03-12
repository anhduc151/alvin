import React, { useEffect, useState } from 'react';

import { Box } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

const History: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const tokenGG = localStorage.getItem('token_gg');

    if (tokenGG) {
      fetch(`${import.meta.env.VITE_DEVSERVER_URL}/v1/api/user/my-plan-order`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${tokenGG}`
        }
      })
        .then((response) => response.json())
        .then((data) => {
          const extractedOrders = data.results.map((order: any) => ({
            id: order.id,
            name: order.plan.name,
            price: order.plan.price,
            status: order.status,
            transaction_hash: order.transaction_hash
          }));
          setOrders(extractedOrders);
        })
        .catch((error) => {
          console.error('Error fetching orders:', error);
        });
    }
  }, []);

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'price', headerName: 'Price', width: 150 },
    { field: 'status', headerName: 'Status', width: 150 },
    { field: 'transaction_hash', headerName: 'Transaction Hash', width: 200 }
  ];

  return (
    <Box>
      <DataGrid rows={orders} columns={columns} pagination />
    </Box>
  );
};

export { History };
