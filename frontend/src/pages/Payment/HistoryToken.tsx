import { Box, Chip, CircularProgress } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import CopyButton from 'components/atoms/buttons/CoppyButton';
import React, { useEffect, useState } from 'react';

const HistoryToken = ({ reload }: { reload: boolean }) => {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);


    useEffect(() => {
        const tokenGG = localStorage.getItem('token_gg');

        if (tokenGG) {
            setLoading(true);
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
                        price: order.price || 0,
                        word: order.system_token || '',
                        status: order.status,
                        paid_at: order.paid_at ? new Date(order.paid_at).toLocaleString() : '',
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
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
                    <CircularProgress />
                </Box>
            ) : (
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
                    pageSizeOptions={[5]}
                    pagination
                    sx={{
                        borderRadius: "20px", border: "1px solid #383838",
                        '@media (max-width: 768px)': {
                            width: '100%',
                        }
                    }} />
            )}
        </Box>
    );
};

export { HistoryToken };

