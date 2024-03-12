import { Box } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

const History: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const tokenPay = "eyJhbGciOiJIUzI1NiIsImtpZCI6IlR2WUJ5d1BJZ0lua0V4RXQiLCJ0eXAiOiJKV1QifQ.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzEwMTY2MTQ2LCJpYXQiOjE3MTAxMzAxNDYsImlzcyI6Imh0dHBzOi8vcWR2dGdyamdnbG96dGpic2RyanAuc3VwYWJhc2UuY28vYXV0aC92MSIsInN1YiI6IjFlMGUwZTIwLTEwMWQtNDI0NC1iMzlmLTUwYWM5YzliODJiZiIsImVtYWlsIjoibGVhbmhkdWMxNTEwQGdtYWlsLmNvbSIsInBob25lIjoiIiwiYXBwX21ldGFkYXRhIjp7InByb3ZpZGVyIjoiZ29vZ2xlIiwicHJvdmlkZXJzIjpbImdvb2dsZSJdfSwidXNlcl9tZXRhZGF0YSI6eyJhdmF0YXJfdXJsIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUNnOG9jSXFKVXYtNlgzYUNrUWpiSHVocWlPSVFvTzZFS2JQVVA4ZDNZdFZjc2ZzdXg4PXM5Ni1jIiwiZW1haWwiOiJsZWFuaGR1YzE1MTBAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZ1bGxfbmFtZSI6IsSQ4bupYyIsImlzcyI6Imh0dHBzOi8vYWNjb3VudHMuZ29vZ2xlLmNvbSIsIm5hbWUiOiLEkOG7qWMiLCJwaG9uZV92ZXJpZmllZCI6ZmFsc2UsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NJcUpVdi02WDNhQ2tRamJIdWhxaU9JUW9PNkVLYlBVUDhkM1l0VmNzZnN1eDg9czk2LWMiLCJwcm92aWRlcl9pZCI6IjEwMDU1OTg5Mzc0NjMwMjc1MzcxMSIsInN1YiI6IjEwMDU1OTg5Mzc0NjMwMjc1MzcxMSJ9LCJyb2xlIjoiYXV0aGVudGljYXRlZCIsImFhbCI6ImFhbDEiLCJhbXIiOlt7Im1ldGhvZCI6Im9hdXRoIiwidGltZXN0YW1wIjoxNzEwMTMwMTQ2fV0sInNlc3Npb25faWQiOiJjY2MyZjMyMC1kMmQ0LTRlYjYtYjVjNy0xMmQwYWE4YjUxMTMifQ.a5Gj0dYgYaLcn4QrRsQF6OVHVzLJyFICOvpunHeRX2M";

  useEffect(() => {
    if (tokenPay) {
      fetch(`${import.meta.env.VITE_DEVSERVER_URL}/v1/api/user/my-plan-order`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${tokenPay}`
        }
      })
        .then(response => response.json())
        .then(data => {
          const extractedOrders = data.results.map((order: any) => ({
            id: order.id,
            name: order.plan.name,
            price: order.plan.price,
            status: order.status,
            transaction_hash: order.transaction_hash
          }));
          setOrders(extractedOrders);
        })
        .catch(error => {
          console.error('Error fetching orders:', error);
        });
    }
  }, []);

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'price', headerName: 'Price', width: 150 },
    { field: 'status', headerName: 'Status', width: 150 },
    { field: 'transaction_hash', headerName: 'Transaction Hash', width: 200 },
  ];

  return (
    <Box>
      <DataGrid
        rows={orders}
        columns={columns}
        pagination
      />
    </Box>
  );
};

export { History }