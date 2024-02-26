import { Box, Stack, Typography } from '@mui/material';
import { Logo } from 'components/atoms/logo';
import Page from 'pages/Page';
import React from 'react';

const Payment:React.FC = () => {

  const styleStack = {
    with: "100%",
    padding: '30px 5%',
    color: 'text.primary', 
  }

  const styleActive = {
    border: "1px solid #ccc",
    borderRadius: "20px",
    width: "500px",
    height: "200px",
  }

  return (
    <Page>
       <Stack sx={styleStack}>
           <Typography sx={{ fontWeight: "700", paddingBottom: "20px", fontSize: "25px", display: "flex", alignItems: "center", gap: "10px" }}>
           <Logo style={{ width: "30px", height: "30px", borderRadius: "50%" }}/> Alvin AI
         </Typography>

         <Typography sx={{ fontWeight: "700", paddingBottom: "20px"}}>
           Active Supscription
         </Typography>

         <Box sx={styleActive}>
            
         </Box>
       </Stack>
    </Page>
  );
}

export default Payment;
