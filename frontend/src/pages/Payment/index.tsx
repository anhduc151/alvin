import { Box, Typography } from "@mui/material";
import Page from "pages/Page";
import React, { useEffect, useState } from "react";
import { Active } from "./Active";
import { History } from "./History";
import { Usesage } from "./Usage";

const Payment: React.FC = () => {
  //  const [coins, setCoins] = useState<any[]>([]);

  //  useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false');
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       const data = await response.json();
  //       setCoins(data);
  //       console.log(data);
  //     } catch (error) {
  //       console.error('Fetch operation failed:', error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <Page>
      <Box sx={{
        width: "100%", padding: "30px", color: "text.primary", overflow: "auto", display: "flex", justifyContent: "center", gap: "20px", alignItem: "center",
        '@media (max-width: 768px)': {
          width: '100vw',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }
      }}>
        <Box>
          <Typography sx={{ fontWeight: "700", paddingBottom: "12px" }}>
            Active Subscription
          </Typography>

          <Active />

          <Typography sx={{ fontWeight: "700", paddingBottom: "12px" }}>
            Payment History
          </Typography>

          <History />
        </Box>

        <Box sx={{ width: "100%" }}>
          <Typography sx={{ fontWeight: "700", paddingBottom: "12px" }}>
            Usage Limit
          </Typography>

          <Usesage />
        </Box>
      </Box>
    </Page>
  );
};

export default Payment;
