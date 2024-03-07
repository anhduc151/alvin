import { Box, Button, Typography } from '@mui/material';
import React, { useState } from 'react';
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import OrderStatus from './OrderStatus';

const Active: React.FC = () => {
  const [purchased, setPurchased] = useState(false);
  const [cancelRequested, setCancelRequested] = useState(false);
  const [orderStatus, setOrderStatus] = useState(OrderStatus.Ordering);

  const handlePurchase = () => {
    setPurchased(true);
    setOrderStatus(OrderStatus.Processing);
    setCancelRequested(false);
  };

  const handleCancelPlan = () => {
    setCancelRequested(true);
    setOrderStatus(OrderStatus.Cancel);
  };

  const handleRenewPlan = () => {
    setCancelRequested(false);
    setOrderStatus(OrderStatus.Ordering);
  };

  const styleActive = {
    border: "1px solid #383838",
    borderRadius: "20px",
    width: "600px",
    height: "250px",
    display: "flex",
    flexDirection: "column",
    padding: "20px",
    marginBottom: "20px",
  };

  return (
    <Box sx={styleActive}>
      <Typography sx={{ fontSize: "20px", fontWeight: "bold" }}>
        Alvin Pro
      </Typography>

      <Box
        sx={{
          paddingBottom: "17px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography
            sx={{ display: "flex", alignItems: "center", gap: "10px" }}
          >
            <AttachMoneyIcon
              sx={{
                backgroundColor: "#0B60B0",
                width: "25px",
                height: "25px",
                borderRadius: "50%",
                color: "#fff",
              }}
            />
            29 USDT <span style={{ color: "#9b9a9a" }}>/per month</span>
          </Typography>
        </Box>

        {purchased ? (
          <Box sx={{ display: "flex", gap: "10px" }}>
            {cancelRequested ? (
              <Button
                variant="contained"
                onClick={handleRenewPlan}
                sx={{
                  backgroundColor: "#9BCF53",
                  "&:hover": { backgroundColor: "#BFEA7C" },
                  borderRadius: "20px",
                }}
              >
                Renew Plan
              </Button>
            ) : (
              <>
                <Button
                  variant="contained"
                  onClick={handleCancelPlan}
                  sx={{
                    backgroundColor: "#fff",
                    color: "#000",
                    border: "1px solid #ccc",
                    "&:hover": { backgroundColor: "#FF0000", color: "#fff" },
                    borderRadius: "20px",
                  }}
                >
                  Cancel Plan
                </Button>

                <Button
                  variant="contained"
                  onClick={handleRenewPlan}
                  sx={{
                    backgroundColor: "#9BCF53",
                    "&:hover": { backgroundColor: "#BFEA7C" },
                    borderRadius: "20px",
                  }}
                >
                  Renew Plan
                </Button>
              </>
            )}
          </Box>
        ) : (
          <Button
            variant="contained"
            onClick={handlePurchase}
            sx={{
              backgroundColor: "#9BCF53",
              "&:hover": { backgroundColor: "#BFEA7C" },
              borderRadius: "20px",
            }}
          >
            Purchase Plan
          </Button>
        )}
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: "10px", paddingTop: "10px", paddingBottom: "20px", borderTop: "1px solid #383838" }}>
        <Typography sx={{ fontWeight: "500", color: "red" }}>
          Expire: <span style={{ fontWeight: "400" }}>8 September 2023</span>
        </Typography>

        <Typography sx={{ fontWeight: "500" }}>
          Payment: <span style={{ fontWeight: "400" }}>0x23453...B093</span>
        </Typography>

        <Typography sx={{ fontWeight: "500" }}>
          Order Status: {orderStatus}
          {purchased ? (
            <Typography sx={{ color: orderStatus === OrderStatus.Processing ? "green" : "red" }}>
              {orderStatus === OrderStatus.Processing ? "Active" : "Inactive"}
            </Typography>
          ) : null}
        </Typography>
      </Box>
    </Box>
  );
}

export { Active };
