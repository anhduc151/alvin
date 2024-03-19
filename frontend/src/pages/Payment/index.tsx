import { Box, Tab, Tabs, Typography } from "@mui/material";
import Page from "pages/Page";
import React, { useEffect, useState } from "react";
import { Active } from "./Active";
import { History } from "./History";
import { HistoryToken } from "./HistoryToken";
import { Usage } from "./Usage";

const Payment: React.FC = () => {
  const [planData, setPlanData] = useState<any>(null);
  const [reloadHistory, setReloadHistory] = useState(false);
  const [selectedTab, setSelectedTab] = useState("active");
  const [reloadUsage, setReloadUsage] = useState(false);

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

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setSelectedTab(newValue);
  };

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
          Expired: {new Date(planData.end_date).toLocaleDateString()}
        </Typography>
      );
    }
  };

  return (
    <Page>
      <Box sx={{ width: "100%", color: "text.primary", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Box sx={{ backgroundColor: "#43e661", color: "#000", display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "30px" }}>
          {renderSubscriptionMessage()}
        </Box>
        <Box sx={{
          width: "100%", color: "text.primary", padding: "20px", overflow: "auto", display: "flex", flexDirection: "column", gap: "20px",
          '@media (max-width: 768px)': {
            width: '100vw',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
          }
        }}>
          <Tabs value={selectedTab} onChange={handleTabChange}>
            <Tab value="active" label="Subscription" />
            <Tab value="usage" label="Usage Limit" />
          </Tabs>
          <Box>
            {selectedTab === "active" && (
              <>
                <Typography sx={{ fontWeight: "700", paddingBottom: "12px" }}>
                  Active Subscription
                </Typography>

                <Active setReloadHistory={setReloadHistory} />

                <Typography sx={{ fontWeight: "700", paddingBottom: "12px" }}>
                  Payment History
                </Typography>

                <History reload={reloadHistory} />
              </>
            )}

            {selectedTab === "usage" && (
              <>
                <Typography sx={{ fontWeight: "700", paddingBottom: "12px" }}>
                  Usage Limit
                </Typography>

                <Usage value={0} setReloadUsage={setReloadUsage}/>

                <Box sx={{ width: "100%" }}>
                  <Typography sx={{ fontWeight: "700", paddingBottom: "12px", paddingTop: "20px" }}>
                    Token Purchase History
                  </Typography>
                  <HistoryToken reload={reloadUsage}/>
                </Box>
              </>
            )}
          </Box>
        </Box>
      </Box>
    </Page>
  );
};

export default Payment;
