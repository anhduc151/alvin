import React, { useEffect, useState } from 'react';
import { Box, Chip } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import CopyButton from 'components/atoms/buttons/CoppyButton';

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
                        paid_at: order.paid_at ? new Date(order.paid_at).toLocaleString() : '',
                        word: order.word || '',
                        price: order.price || 0,
                        transaction_hash: order.transaction_hash || ''
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

    const columns: GridColDef[] = [
        { field: 'paid_at', headerName: 'Date', width: 200 },
        { field: 'status', headerName: 'Status', width: 200, renderCell: (params) => getStatusChip(params.value) },
        { field: 'word', headerName: 'Tokens', width: 200 },
        { field: 'price', headerName: 'Price', width: 200 },
        {
            field: 'transaction_hash', headerName: 'Transaction Hash', width: 200, renderCell: (params) => (
                <CopyButton value={params.value} />
            )
        },
    ];

    return (
        <Box>
            <DataGrid
                rows={orders}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 5,
                        },
                    },
                }}
                pageSizeOptions={[5]} pagination sx={{
                    borderRadius: "20px", border: "1px solid #383838",
                    '@media (max-width: 768px)': {
                        width: '100%',
                    }
                }} />
        </Box>
    );
};

export { HistoryToken };
