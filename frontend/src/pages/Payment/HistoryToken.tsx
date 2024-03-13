import React, { useEffect, useState } from 'react';
import { Box, Chip } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

const HistoryToken: React.FC = () => {
    const [orders, setOrders] = useState<any[]>([]);

    useEffect(() => {
        const tokenGG = localStorage.getItem('token_gg');

        if (tokenGG) {
            fetch(`${import.meta.env.VITE_DEVSERVER_URL}/v1/api/user/my-token-order`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${tokenGG}`
                }
            })
                .then((response) => response.json())
                .then((data) => {
                    const extractedOrders = data.results.map((order: any) => ({
                        id: order.id,
                        status: order.status,
                        paid_at: order.paid_at,
                        word: order.word,
                        price: order.price,
                        transaction_hash: order.transaction_hash
                    }));
                    setOrders(extractedOrders);
                })
                .catch((error) => {
                    console.error('Error fetching orders:', error);
                });
        }
    }, []);

    const getStatusChip = (status: string) => {
        let color = '';
        switch (status) {
            case 'ordering':
                color = '#2196f3';
                break;
            case 'processing':
                color = '#ff9800';
                break;
            case 'success':
                color = '#4caf50';
                break;
            case 'cancel':
                color = '#f44336';
                break;
            default:
                color = '#e0e0e0';
        }
        return <Chip label={status} style={{ backgroundColor: color, color: 'white' }} />;
    };

    const columns: GridColDef[] = [
        { field: 'status', headerName: 'Status', width: 100, renderCell: (params) => getStatusChip(params.value) },
        { field: 'paid_at', headerName: 'Paid At', width: 100 },
        { field: 'word', headerName: 'Tokens', width: 100 },
        { field: 'price', headerName: 'Price', width: 150 },
        { field: 'transaction_hash', headerName: 'Transaction Hash', width: 200 }
    ];

    return (
        <Box>
            <DataGrid rows={orders} columns={columns} pagination sx={{
                borderRadius: "20px", border: "1px solid #383838",
                '@media (max-width: 768px)': {
                    width: '100%',
                }
            }} />
        </Box>
    );
};

export { HistoryToken };
