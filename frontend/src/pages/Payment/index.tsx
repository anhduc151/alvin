import { Box, Typography } from "@mui/material";
import Page from "pages/Page";
import React, { useEffect, useState } from "react";
import { Active } from "./Active";
import { History } from "./History";
import { HistoryToken } from "./HistoryToken";
import { Usage } from "./Usage";

const Payment: React.FC = () => {
  const [planData, setPlanData] = useState<any>(null);
  const [reloadHistory, setReloadHistory] = useState(false);

  useEffect(() => {
    const tokenGG = localStorage.getItem('token_gg');

    if (tokenGG) {
      const fetchPlan = async () => {
        try {
          const response = await fetch(`${import.meta.env.VITE_DEVSERVER_URL}/v1/api/user/my-plan`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${tokenGG}`
            }
          });
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setPlanData(data);
        } catch (error) {
          console.error('Fetch operation failed:', error);
        }
      };
      fetchPlan();
    }

  }, []);


  const renderSubscriptionMessage = () => {
    if (!planData) return null;

    if (planData.plan.name === 'Free Trial') {
      return (
        <Typography sx={{ fontWeight: "700", fontFamily: "PT Sans" }}>
          Please upgrade to Pro version
        </Typography>
      );
    } else {
      return (
        <Typography sx={{ fontWeight: "700", fontFamily: "PT Sans" }}>
          Plan Standard of you Expires on date {new Date(planData.end_date).toLocaleDateString()}
        </Typography>
      );
    }
  };

  return (
    <Page>
      <Box sx={{ width: "100%", color: "text.primary", overflow: "auto", display: "flex", flexDirection: "column", justifyContent: "center", alignItem: "center" }}>
        <Box sx={{ backgroundColor: "#43e661", color: "#000", display: "flex", justifyContent: "center", alignItems: "center", height: "54px" }}>
          {renderSubscriptionMessage()}
        </Box>
        <Box sx={{
          width: "100%", color: "text.primary", padding: "20px", overflow: "auto", display: "flex", flexDirection: "column", justifyContent: "center", gap: "20px", alignItem: "center",
          '@media (max-width: 768px)': {
            width: '100vw',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }
        }}>
          <Box>
            <Typography sx={{
              paddingTop: "550px", fontWeight: "700", paddingBottom: "12px",
              '@media (max-width: 768px)': {
                paddingTop: "540px",
              }
            }}>
              Active Subscription
            </Typography>

            <Active setReloadHistory={setReloadHistory} />

            <Typography sx={{ fontWeight: "700", paddingBottom: "12px" }}>
              Payment History
            </Typography>

            <History reload={reloadHistory} />
          </Box>

          <Box sx={{ width: "100%" }}>
            <Typography sx={{ fontWeight: "700", paddingBottom: "12px" }}>
              Usage Limit
            </Typography>

            <Usage />

            <Typography sx={{ fontWeight: "700", paddingBottom: "12px", paddingTop: "20px" }}>
              Token Purchase History
            </Typography>

            <HistoryToken />
          </Box>
        </Box>
      </Box>
    </Page>
  );
};

export default Payment;
