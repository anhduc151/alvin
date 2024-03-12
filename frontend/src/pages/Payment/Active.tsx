import React, { useState, useEffect } from 'react';
import { Alert, Box, Button, Typography } from '@mui/material';
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import OrderStatus from './OrderStatus';

interface Plan {
  id: string;
  name: string;
  price: number | null;
  numWord: number | null;
  numWordBonus: number | null;
  description: string | null;
  used_in: number | null;
}

const Active: React.FC = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [purchased, setPurchased] = useState(false);
  const [cancelRequested, setCancelRequested] = useState(false);
  const [orderStatus, setOrderStatus] = useState(OrderStatus.Ordering);
  const tokenPay = "eyJhbGciOiJIUzI1NiIsImtpZCI6IlR2WUJ5d1BJZ0lua0V4RXQiLCJ0eXAiOiJKV1QifQ.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzEwMTY2MTQ2LCJpYXQiOjE3MTAxMzAxNDYsImlzcyI6Imh0dHBzOi8vcWR2dGdyamdnbG96dGpic2RyanAuc3VwYWJhc2UuY28vYXV0aC92MSIsInN1YiI6IjFlMGUwZTIwLTEwMWQtNDI0NC1iMzlmLTUwYWM5YzliODJiZiIsImVtYWlsIjoibGVhbmhkdWMxNTEwQGdtYWlsLmNvbSIsInBob25lIjoiIiwiYXBwX21ldGFkYXRhIjp7InByb3ZpZGVyIjoiZ29vZ2xlIiwicHJvdmlkZXJzIjpbImdvb2dsZSJdfSwidXNlcl9tZXRhZGF0YSI6eyJhdmF0YXJfdXJsIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUNnOG9jSXFKVXYtNlgzYUNrUWpiSHVocWlPSVFvTzZFS2JQVVA4ZDNZdFZjc2ZzdXg4PXM5Ni1jIiwiZW1haWwiOiJsZWFuaGR1YzE1MTBAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZ1bGxfbmFtZSI6IsSQ4bupYyIsImlzcyI6Imh0dHBzOi8vYWNjb3VudHMuZ29vZ2xlLmNvbSIsIm5hbWUiOiLEkOG7qWMiLCJwaG9uZV92ZXJpZmllZCI6ZmFsc2UsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NJcUpVdi02WDNhQ2tRamJIdWhxaU9JUW9PNkVLYlBVUDhkM1l0VmNzZnN1eDg9czk2LWMiLCJwcm92aWRlcl9pZCI6IjEwMDU1OTg5Mzc0NjMwMjc1MzcxMSIsInN1YiI6IjEwMDU1OTg5Mzc0NjMwMjc1MzcxMSJ9LCJyb2xlIjoiYXV0aGVudGljYXRlZCIsImFhbCI6ImFhbDEiLCJhbXIiOlt7Im1ldGhvZCI6Im9hdXRoIiwidGltZXN0YW1wIjoxNzEwMTMwMTQ2fV0sInNlc3Npb25faWQiOiJjY2MyZjMyMC1kMmQ0LTRlYjYtYjVjNy0xMmQwYWE4YjUxMTMifQ.a5Gj0dYgYaLcn4QrRsQF6OVHVzLJyFICOvpunHeRX2M";

  useEffect(() => {
    if (tokenPay) {
      fetch(`${import.meta.env.VITE_DEVSERVER_URL}/v1/api/user/plans`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${tokenPay}`
        }
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch plans');
          }
          return response.json();
        })
        .then(data => {
          const convertedPlans = data.results.map((result: any) => ({
            id: result.id,
            name: result.name,
            price: result.price,
            numWord: result.num_word,
            numWordBonus: result.num_word_bonus,
            description: result.description,
            used_in: result.used_in
          }));
          setPlans(convertedPlans);
        })
        .catch(error => {
          console.error('Error fetching plans:', error);
        });
    }
  }, [tokenPay]);



  const handlePurchase = () => {
    setPurchased(true);
    setOrderStatus(OrderStatus.Processing);
    setCancelRequested(false);

    const proPlan = plans.find(plan => plan.name === 'Pro');
    if (proPlan) {
      const { id: planId } = proPlan;
      fetch(`${import.meta.env.VITE_DEVSERVER_URL}/v1/api/user/plans/${planId}/order`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${tokenPay}`
        }
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to purchase plan');
          }
        })
        .catch(error => {
          console.error('Error purchasing plan:', error);
        });
    }
  }

  const handleCancelPlan = () => {
    setCancelRequested(true);
    setOrderStatus(OrderStatus.Cancel);
  };

  const handleRenewPlan = () => {
    setCancelRequested(false);
    setOrderStatus(OrderStatus.Ordering);
  };

  const renderPlans = () => {
    return plans.map((plan, index) => (
      <Box key={index} sx={{ ...styleActive, ...(plan.name === 'Pro' ? { borderColor: 'green' } : {}) }}>
        <Typography sx={{ fontSize: "20px", fontWeight: "bold", color: plan.name === 'Pro' ? 'green' : 'inherit' }}>
          {plan.name}
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
              {plan.price !== null ? `${plan.price} USDT` : '0 USDT'} <span style={{ color: "#9b9a9a" }}>/per month</span>
            </Typography>
          </Box>
          {plan.name !== 'Standard' ? (
            <Box sx={{ display: "flex", gap: "10px" }}>
              {purchased ? (
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
          ) : null}
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "10px", paddingTop: "10px", paddingBottom: "20px", borderTop: `1px solid ${plan.name === 'Pro' ? 'green' : '#383838'}`, }}>
          <Typography sx={{ fontWeight: "500" }}>
            Description: {plan.description !== null ? plan.description : 'null'}
          </Typography>
          <Typography sx={{ fontWeight: "500" }}>
            Num Word: <span style={{ fontWeight: "400" }}>{plan.numWord !== null ? plan.numWord : '0'}</span>
          </Typography>
          <Typography sx={{ fontWeight: "500" }}>
            Expiry: <span style={{ fontWeight: "400" }}>{plan.used_in !== null ? plan.used_in : 'Not available'} days</span>
          </Typography>
          <Typography sx={{ fontWeight: "500" }}>
            Num Word Bonus: <span style={{ fontWeight: "400" }}>{plan.numWordBonus !== null ? plan.numWordBonus : '0'}</span>
          </Typography>
          {/* {plan.name !== 'Standard' ? (
            <>
              <Typography sx={{ fontWeight: "500" }}>
                Order Status: {orderStatus}
                {purchased ? (
                  <Typography sx={{ color: orderStatus === OrderStatus.Processing ? "green" : "red" }}>
                    {orderStatus === OrderStatus.Processing ? "Active" : "Inactive"}
                  </Typography>
                ) : null}
              </Typography>
            </>
          ) : null} */}
          {plan.name === 'Standard' ? (
            <Alert severity='info'>If you are on the standard version, buy the Pro version for a better experience</Alert>
          ) : null}
        </Box>
      </Box>
    ));
  };

  return (
    <div>
      {renderPlans()}
    </div>
  );
}

const styleActive = {
  border: "1px solid #383838",
  borderRadius: "20px",
  width: "600px",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  padding: "20px",
  marginBottom: "20px",
};

export { Active };
