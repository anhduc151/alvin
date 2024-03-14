import React, { useEffect, useState } from 'react';
import { Box, Chip, Button, IconButton } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import CopyButton from 'components/atoms/buttons/CoppyButton';
import CancelIcon from '@mui/icons-material/Cancel';

const History = ({ reload }: { reload: boolean }) => {
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
            transaction_hash: order.transaction_hash,
            paid_at: order.paid_at,
            current_price: order.current_price,
            volume: order.volume,
            price_discount_percent: order.plan.price_discount_percent
          }));
          setOrders(extractedOrders);
        })
        .catch((error) => {
          console.error('Error fetching orders:', error);
        });
    }
  }, [reload]);

  const getStatusChip = (status: string) => {
    let color = '';
    switch (status) {
      case 'processing':
        color = '#ff9800';
        break;
      case 'successful':
        color = '#4caf50';
        break;
      case 'cancel':
        color = '#f44336';
        break;
      default:
        color = '#4c4848';
    }
    return <Chip label={status} style={{ backgroundColor: color, color: 'white', width: "100px" }} />;
  };

  const handleCancelOrder = (orderId: string) => {
    const tokenGG = localStorage.getItem('token_gg');

    if (tokenGG) {
      const apiUrl = `${import.meta.env.VITE_DEVSERVER_URL}/v1/api/user/my-plan-order/${orderId}`;
      const requestBody = {
        status: 'cancel'
      };

      fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${tokenGG}`
        },
        body: JSON.stringify(requestBody)
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to cancel order');
          }
          console.log(`Order with id ${orderId} has been successfully canceled.`);
          window.location.reload();
        })
        .catch(error => {
          console.error('Error cancelling order:', error);
        });
    }
  };


  const formatPriceWithCurrency = (price: number | null) => {
    if (price !== null) {
      return `${price} USDT`;
    }
    return '';
  };
  
  const columns: GridColDef[] = [
    { field: 'paid_at', headerName: 'Date', width: 200 },
    { field: 'name', headerName: 'Plan', width: 200 },
    { field: 'current_price', headerName: 'Unit Price', width: 200, renderCell: (params) => formatPriceWithCurrency(params.value) },
    { field: 'volume', headerName: 'Volume', width: 200 },
    { field: 'price', headerName: 'Amount', width: 200, renderCell: (params) => formatPriceWithCurrency(params.value) },
    { field: 'price_discount_percent', headerName: 'Price Discount (%)', width: 200 },
    { field: 'status', headerName: 'Status', width: 200, renderCell: (params) => getStatusChip(params.value) },
    {
      field: 'transaction_hash',
      headerName: 'Transaction Hash',
      width: 200,
      renderCell: (params) => (
        <CopyButton value={params.value} />
      )
    },
    {
      field: 'cancel_button',
      headerName: 'Cancel',
      width: 100,
      renderCell: (params) => {
        if (params.row.status === 'processing') {
          return (
            <IconButton color="error" onClick={() => handleCancelOrder(params.row.id)}>
              <CancelIcon />
            </IconButton>
          );
        }
        return null;
      }
    },
  ];

  return (
    <Box>
      <DataGrid
        rows={orders}
        columns={columns}
        pagination
        sx={{
          borderRadius: '20px',
          border: '1px solid #383838',
          '@media (max-width: 768px)': {
            width: '100%'
          }
        }}
      />
    </Box>
  );
};

export { History };
