import { Box, Typography } from "@mui/material";
import Page from "pages/Page";
import React from "react";
import { Active } from "./Active";
import { History} from "./History";
import { Usesage } from "./Usage";

const Payment: React.FC = () => {
  
  return (
    <Page>
      <Box sx={{ width: "100%", padding: "30px", color: "text.primary", overflow: "auto", display: "flex", gap: "20px", alignItem: "center"}}>
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

        <Box>
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
