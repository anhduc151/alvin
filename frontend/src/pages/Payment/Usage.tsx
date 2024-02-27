import React, { useState } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const CustomLinearProgress = ({ value }: { value: number }) => {
  const [progress, setProgress] = useState(value);

  const tokenAmount = Math.min(Math.round((progress / 100) * 1000), 1000);

  const handleBuyToken = () => {
    const additionalTokens = 250;
    const newProgress = Math.min(progress + (additionalTokens / 1000) * 100, 100);
    setProgress(newProgress);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '100%', mr: 1 }}>
          <LinearProgress variant="determinate" value={progress} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" sx={{width: "145px", color: "red"}}>{tokenAmount} /1000 <span style={{color: "#fff"}}>Tokens</span></Typography>
        </Box>
      </Box>
      <Button onClick={handleBuyToken} variant="contained" sx={{color: "primary", "&:hover": { backgroundColor: "#9BCF53", color: "#fff" },}}>
        Add Tokens
      </Button>
    </Box>
  );
};

const Usesage: React.FC = () => {
  return (
    <Box sx={{ width: "400px" }}>
      <CustomLinearProgress value={0} />
    </Box>
  );
};

export { Usesage };
