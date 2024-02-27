import { Stack, Typography } from "@mui/material";
import { Logo } from "components/atoms/logo";
import Page from "pages/Page";
import React from "react";
import { Active } from "./Active";
import { History} from "./History";

const Payment: React.FC = () => {
  
  return (
    <Page>
      <Stack sx={{ with: "100%", padding: "30px 5%", color: "text.primary", overflow: "auto"}}>
        {/* <Typography
          sx={{
            fontWeight: "700",
            paddingBottom: "20px",
            fontSize: "20px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <Logo
            style={{ width: "30px", height: "30px", borderRadius: "50%" }}
          />
          Alvin AI
        </Typography> */}

        <Typography sx={{ fontWeight: "700", paddingBottom: "12px" }}>
          Active Supscription
        </Typography>

        <Active />

        <Typography sx={{ fontWeight: "700", paddingBottom: "12px" }}>
          Payment History
        </Typography>

        <History />
      </Stack>
    </Page>
  );
};

export default Payment;
