import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { TokenOrderPaymentBodyModel } from 'models/TokenOrderModel';

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

interface PriceInfo {
  price: number;
  discount: number;
}

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
  const [suggestedPrices, setSuggestedPrices] = useState<PriceInfo[]>([]);
  const { paymentCrypto } = usePayment();
  const { orderToken, paymentToken } = useTokenOrder();

  useEffect(() => {
    if (openDialog) {
      fetchSuggestedPrice();
    }
  }, [openDialog]);

  const fetchSuggestedPrice = async () => {
    try {
      const tokenGG = localStorage.getItem('token_gg');
      if (!tokenGG) {
        throw new Error('No token found in local storage');
      }

      const response = await fetch(`${import.meta.env.VITE_DEVSERVER_URL}/v1/api/user/crypto-currency-price`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${tokenGG}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch suggested price');
      }

      const data = await response.json();
      setSuggestedPrices(data);
    } catch (error) {
      console.error('Error fetching suggested price:', error);
      setSuggestedPrices([]);
    }
  };



  const handleBuyToken = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setErrorMessage('');
    setInputValue('');
    setSuggestedPrices([]);
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
      const paidCrypto = await paymentCrypto(parseInt(inputValue));

      if (paidCrypto?.hash && ordered?.id) {
        const body: TokenOrderPaymentBodyModel = {
          num_crypto_currency: 1,
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

  const handleSuggestedPriceClick = (price: number) => {
    setInputValue(String(price));
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

            {suggestedPrices.map((priceInfo, index) => (
              <Typography
                key={index}
                variant="body1"
                onClick={() => handleSuggestedPriceClick(priceInfo.price)}
                style={{ cursor: 'pointer', marginTop: '10px', border: "1px solid #fff", backgroundColor: "#fff", color: "#3fd18a", borderRadius: "5px", textAlign: "center" }}
              >
                {priceInfo.price} USDT ({priceInfo.discount}% discount)
              </Typography>
            ))}
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
