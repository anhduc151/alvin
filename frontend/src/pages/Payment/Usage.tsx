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
  const [tokenAmount, setTokenAmount] = useState<number | "">(50);
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
    const value = event.target.value.trim();
    setInputValue(value);
    if (
      value === "" ||
      (!isNaN(parseInt(value)) &&
        parseInt(value) >= 50 &&
        parseInt(value) <= 5000)
    ) {
      setTokenAmount(value !== "" ? parseInt(value) : "");
      if (value !== "" && (parseInt(value) < 50 || parseInt(value) > 5000)) {
        setErrorMessage("Please enter a value between 50 and 5000 tokens.");
      } else {
        setErrorMessage("");
      }
    } else {
      setErrorMessage("Please enter a valid number between 50 and 5000.");
    }
  };

  const handleOptionClick = (amount: number) => {
    setInputValue(amount.toString());
  };

  const handleConfirmPurchase = () => {
    if (parseInt(inputValue) < 50) {
      setErrorMessage("Minimum token amount is 50.");
    } else if (parseInt(inputValue) > 5000) {
      setErrorMessage("Maximum token amount is 5000.");
    } else {
      const newProgress = Math.min(
        progress + (parseInt(inputValue) / 1000) * 100,
        100
      );
      setProgress(newProgress);
      setOpenDialog(false);
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
            {tokenAmount === "" ? "---" : tokenAmount} /1000{" "}
            <span style={{ color: "#fff" }}>Tokens</span>
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
              min: 100,
              max: 10000,
            }}
            sx={{ mb: 2 }}
          />
          <Box sx={{ display: "flex", gap: "10px", mb: 2 }}>
            <Button onClick={() => handleOptionClick(10)}>10</Button>
            <Button onClick={() => handleOptionClick(20)}>20</Button>
            <Button onClick={() => handleOptionClick(100)}>100</Button>
            <Button onClick={() => handleOptionClick(200)}>200</Button>
          </Box>

          {errorMessage ? (
            <Alert severity="error">{errorMessage}</Alert>
          ) : (
            <Alert severity="info">
              Please enter a token value from 10 USDT.
            </Alert>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            onClick={handleConfirmPurchase}
            disabled={errorMessage !== ""}
            color="primary"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

const Usesage: React.FC = () => {
  return (
    <Box sx={{ width: "100%", border: "1px solid #383838", padding: "20px", borderRadius: "20px" }}>
      <CustomLinearProgress value={0} />
    </Box>
  );
};

export { Usesage };
