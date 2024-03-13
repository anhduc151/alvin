import React, { useState } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";

const CustomLinearProgress = ({ value }: { value: number }) => {
  const [progress, setProgress] = useState(value);
  const [openDialog, setOpenDialog] = useState(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleBuyToken = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setErrorMessage("");
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value.trim());
  };



  const handleConfirmPurchase = () => {
    const tokenGG = localStorage.getItem('token_gg');
    if (!tokenGG) {
      console.error('No Google token found.');
      return;
    }

    if (parseInt(inputValue) < 50) {
      setErrorMessage("Minimum token amount is 50.");
    } else if (parseInt(inputValue) > 5000) {
      setErrorMessage("Maximum token amount is 5000.");
    } else {
      fetch(`${import.meta.env.VITE_DEVSERVER_URL}/v1/api/user/my-token-order`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${tokenGG}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ tokenAmount: parseInt(inputValue) })
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to purchase tokens');
          }
          return response.json(); // Parse response body as JSON
        })
        .then(data => {
          if (data.words !== null) {
            console.log("Server response:", data.words); // Log the server response
            setOpenDialog(false);
          } else {
            throw new Error('Server response is null');
          }
        })
        .catch(error => {
          console.error('Error purchasing tokens:', error);
        });
    }
  };


  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ width: "100%", mr: 1 }}>
          <LinearProgress variant="determinate" value={progress} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" sx={{ width: "145px", color: "red" }}>
            --- /1000 <span style={{ color: "#fff" }}>Tokens</span>
          </Typography>
        </Box>
      </Box>
      <Button
        onClick={handleBuyToken}
        variant="contained"
        sx={{
          color: "primary",
          "&:hover": { backgroundColor: "#9BCF53", color: "#fff" },
        }}
      >
        Add Tokens
      </Button>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Buy Tokens</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="token-amount"
            label="Token Amount"
            type="number"
            fullWidth
            value={inputValue}
            onChange={handleInputChange}
            inputProps={{
              inputMode: "numeric",
              pattern: "[0-9]*",
              min: 50,
              max: 5000,
            }}
            sx={{ mb: 2 }}
          />

          {errorMessage && (
            <Alert severity="error">{errorMessage}</Alert>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            onClick={handleConfirmPurchase}
            // disabled={!inputValue || errorMessage}
            color="primary"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

const Usage: React.FC = () => {
  return (
    <Box sx={{ width: "100%", border: "1px solid #383838", padding: "20px", borderRadius: "20px" }}>
      <CustomLinearProgress value={0} />
    </Box>
  );
};

export { Usage };
