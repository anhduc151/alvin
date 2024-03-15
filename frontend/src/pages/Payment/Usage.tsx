import { TokenOrderPaymentBodyModel } from 'models/TokenOrderModel';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import LinearProgress from '@mui/material/LinearProgress';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { usePayment } from 'hooks/usePayment';
import { useTokenOrder } from 'hooks/useTokenOrder';

interface IUsage {
  value: number;
  setReloadUsage: any;
}

const Usage = ({ value, setReloadUsage }: IUsage) => {
  const [progress, setProgress] = useState(value);
  const [openDialog, setOpenDialog] = useState(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const { paymentCrypto } = usePayment();
  const { orderToken, paymentToken } = useTokenOrder();

  const handleBuyToken = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setErrorMessage('');
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value.trim());
  };

  const validateBeforePayment = () => {
    let isValid = false;
    if (parseInt(inputValue) < 50) {
      setErrorMessage('Minimum token amount is 50.');
    } else if (parseInt(inputValue) > 5000) {
      setErrorMessage('Maximum token amount is 5000.');
    } else {
      isValid = true;
    }
    return isValid;
  };

  const handleConfirmPurchase = async () => {
    const isValid = validateBeforePayment();
    if (!isValid) return;

    try {
      setIsProcessing(true);
      setErrorMessage("");
      const { data: ordered } = await orderToken(parseInt(inputValue));
      const paidCrypto = await paymentCrypto(parseInt(inputValue)); //TODO: waiting exchange rate

      if (paidCrypto?.hash && ordered?.id) {
        const body: TokenOrderPaymentBodyModel = {
          num_crypto_currency: 1, //TODO: waiting exchange rate
          crypto_currency_id: paidCrypto?.crypto?.id ?? '',
          transaction_hash: paidCrypto?.hash ?? '0x'
        };
        const planOrder = await paymentToken(ordered?.id, body);
        if (planOrder) {
          toast.success('Payment successful');
        }
      }
    } catch (err) {
      toast.error('Payment unsuccessful');
      console.log(err);
    } finally {
      setIsProcessing(false);
      setOpenDialog(false);
      setReloadUsage((prevState: any) => !prevState);
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        border: '1px solid #383838',
        padding: '20px',
        borderRadius: '20px'
      }}
    >
      <Box sx={{ width: '100%' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ width: '100%', mr: 1 }}>
            <LinearProgress variant="determinate" value={progress} />
          </Box>
          <Box sx={{ minWidth: 35 }}>
            <Typography variant="body2" sx={{ width: '145px', color: 'red' }}>
              --- /1000 <span style={{ color: '#fff' }}>Tokens</span>
            </Typography>
          </Box>
        </Box>
        <Button
          onClick={handleBuyToken}
          variant="contained"
          sx={{
            color: 'primary',
            '&:hover': { backgroundColor: '#9BCF53', color: '#fff' }
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
                inputMode: 'numeric',
                pattern: '[0-9]*',
                min: 50,
                max: 5000
              }}
              sx={{ mb: 2 }}
            />

            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
          </DialogContent>
          <DialogActions>
            <Button disabled={isProcessing} onClick={handleCloseDialog}>
              Cancel
            </Button>
            <Button
              onClick={handleConfirmPurchase}
              disabled={isProcessing}
              color="primary"
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export { Usage };

