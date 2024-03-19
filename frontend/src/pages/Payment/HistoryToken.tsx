import { getLinkScan } from 'helpers/helpers';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { bscTestnet } from 'viem/chains';

import CancelIcon from '@mui/icons-material/Cancel';
import { Box, Chip, CircularProgress, IconButton } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

import CopyButton from 'components/atoms/buttons/CoppyButton';

const HistoryToken = ({ reload }: { reload: boolean }) => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const tokenGG = localStorage.getItem('token_gg');

    if (tokenGG) {
      setLoading(true);
      fetch(
        `${import.meta.env.VITE_DEVSERVER_URL}/v1/api/user/my-token-order`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${tokenGG}`
          }
        }
      )
        .then((response) => response.json())
        .then((data) => {
          const extractedOrders = data.results.map((order: any) => ({
            id: order.id,
            price: order.price || 0,
            word: order.system_token || '',
            status: order.status,
            paid_at: order.paid_at
              ? new Date(order.paid_at).toLocaleString()
              : '',
            transaction_hash: order.transaction_hash || ''
          }));
          setOrders(extractedOrders);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching orders:', error);
          setLoading(false);
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
    return (
      <Chip
        label={status}
        style={{ backgroundColor: color, color: 'white', width: '100px' }}
      />
    );
  };

  const handleCancelTokenOrder = (orderId: string) => {
    const tokenGG = localStorage.getItem('token_gg');

    if (tokenGG) {
      const apiUrl = `${import.meta.env.VITE_DEVSERVER_URL}/v1/api/user/my-token-order/${orderId}`;
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
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to cancel token order');
          }
          console.log(
            `Token order with id ${orderId} has been successfully canceled.`
          );
          window.location.reload();
        })
        .catch((error) => {
          console.error('Error cancelling token order:', error);
        });
    }
  };

  const columns: GridColDef[] = [
    { field: 'paid_at', headerName: 'Date', width: 200 },
    {
      field: 'status',
      headerName: 'Status',
      width: 200,
      renderCell: (params) => getStatusChip(params.value)
    },
    { field: 'word', headerName: 'Tokens', width: 200 },
    { field: 'price', headerName: 'Price', width: 200 },
    {
      field: 'transaction_hash',
      headerName: 'Transaction Hash',
      width: 200,
      renderCell: (params) => (
        <>
          <CopyButton value={params.value} showText={false} />
          <Link
            to={`${getLinkScan(bscTestnet.id)}/${params.value}`} //TODO: change id
            target="_blank"
          >
            {params.value}
          </Link>
        </>
      )
    },
    {
      field: 'cancel_button',
      headerName: 'Cancel',
      width: 200,
      renderCell: (params) => {
        if (params.row.status === 'processing') {
          return (
            <IconButton
              color="error"
              onClick={() => handleCancelTokenOrder(params.row.id)}
            >
              <CancelIcon />
            </IconButton>
          );
        }
        return null;
      }
    }
  ];

  return (
    <Box>
      {loading ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '300px'
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <DataGrid
          rows={orders}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5
              }
            }
          }}
          pageSizeOptions={[5]}
          pagination
          sx={{
            borderRadius: '20px',
            border: '1px solid #383838',
            '@media (max-width: 768px)': {
              width: '100%'
            }
          }}
        />
      )}
    </Box>
  );
};

export { HistoryToken };

