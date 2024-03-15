import { AddressCrypto, OrderStatus } from 'models/CommonModels';
import { CryptoCurrencyModel } from 'models/CryptoCurrencyModel';
import { PlanOrderPaymentBodyModel } from 'models/UserPlanModel';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { Box, Button, Typography } from '@mui/material';

import { usePayment } from 'hooks/usePayment';
import { usePlan } from 'hooks/usePlan';

const styleActive = {
  border: '1px solid #383838',
  borderRadius: '20px',
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  padding: '20px',
  marginBottom: '20px'
};

interface Plan {
  id: string;
  name: string;
  price: number | null;
  numWord: number | null;
  numWordBonus: number | null;
  description: string | null;
  used_in: number | null;
  can_register: boolean;
}

const Active = ({ setReloadHistory }: { setReloadHistory: any }) => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [purchased, setPurchased] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderStatus, setOrderStatus] = useState(OrderStatus.Processing);
  const { paymentCrypto, error: errPayment } = usePayment();
  const { orderPlan, paymentPlan } = usePlan();

  useEffect(() => {
    const tokenGG = localStorage.getItem('token_gg');

    if (tokenGG) {
      fetch(`${import.meta.env.VITE_DEVSERVER_URL}/v1/api/user/plans`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${tokenGG}`
        }
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to fetch plans');
          }
          return response.json();
        })
        .then((data) => {
          const convertedPlans = data.results.map((result: any) => ({
            id: result.id,
            name: result.name,
            price: result.price,
            numWord: result.num_token,
            numWordBonus: result.num_token_bonus,
            description: result.description,
            used_in: result.used_in !== null ? result.used_in * 30 : null,
            can_register: result.can_register
          }));

          setPlans(convertedPlans);
        })
        .catch((error) => {
          console.error('Error fetching plans:', error);
        });
    }
  }, []);

  const handlePurchase = async (plan: Plan) => {
    try {
      setIsProcessing(true);
      setOrderStatus(OrderStatus.Processing);

      const { data: ordered } = await orderPlan(plan.id, 1);
      const paidCrypto = await paymentCrypto(plan?.price ?? 0);

      if (paidCrypto?.hash && ordered?.id) {
        const body: PlanOrderPaymentBodyModel = {
          num_crypto_currency: 1, //TODO: waiting exchange rate
          crypto_currency_id: paidCrypto?.crypto?.id ?? '',
          transaction_hash: paidCrypto?.hash ?? '0x',
          volume: 1
        };
        const planOrder = await paymentPlan(ordered?.id, body);
        if (planOrder) {
          setPurchased(true);
          toast.success('Payment successful');
        }
      }
    } catch (err) {
      setOrderStatus(OrderStatus.Processing);
      toast.error('Payment unsuccessful');
      console.log(err);
    } finally {
      setIsProcessing(false);
      setReloadHistory((prevState: any) => !prevState);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        gap: '20px',
        alignItems: 'center',
        '@media (max-width: 768px)': {
          display: 'flex',
          flexDirection: 'column'
        }
      }}
    >
      {plans.map((plan, index) => (
        <Box
          key={index}
          sx={{
            ...styleActive,
            ...(plan.name === 'Pro' || plan.name === 'Standard'
              ? { borderColor: plan.can_register ? '#3fd18a' : 'yellow' }
              : {})
          }}
        >
          <Typography
            sx={{
              fontSize: '20px',
              fontWeight: 'bold',
              color:
                plan.name === 'Pro' || plan.name === 'Standard'
                  ? plan.can_register
                    ? '#3fd18a'
                    : 'yellow'
                  : 'inherit'
            }}
          >
            {plan.name}
          </Typography>
          <Box
            sx={{
              paddingBottom: '17px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <Box>
              <Typography
                sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}
              >
                <AttachMoneyIcon
                  sx={{
                    backgroundColor: '#0B60B0',
                    width: '25px',
                    height: '25px',
                    borderRadius: '50%',
                    color: '#fff'
                  }}
                />
                {plan.price !== null ? `${plan.price} USDT` : '0 USDT'}{' '}
                <span style={{ color: '#9b9a9a' }}>/per month</span>
              </Typography>
            </Box>
            {plan.can_register ? (
              <Box sx={{ display: 'flex', gap: '10px' }}>
                {purchased ? (
                  <Button
                    variant="contained"
                    onClick={() => handlePurchase(plan)}
                    disabled={isProcessing}
                    sx={{
                      backgroundColor: '#9BCF53',
                      '&:hover': { backgroundColor: '#BFEA7C' },
                      borderRadius: '20px'
                    }}
                  >
                    Renew Plan
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    onClick={() => handlePurchase(plan)}
                    disabled={isProcessing}
                    sx={{
                      backgroundColor: '#9BCF53',
                      '&:hover': { backgroundColor: '#BFEA7C' },
                      borderRadius: '20px'
                    }}
                  >
                    {isProcessing ? 'Processing...' : 'Purchase Plan'}
                  </Button>
                )}
              </Box>
            ) : null}
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              paddingTop: '10px',
              paddingBottom: '20px',
              borderTop: `1px solid ${plan.name === 'Pro' || plan.name === 'Standard' ? (plan.can_register ? '#3fd18a' : 'yellow') : '#383838'}`
            }}
          >
            <Typography sx={{ fontWeight: '500' }}>
              Description:{' '}
              {plan.description !== null ? plan.description : 'null'}
            </Typography>
            <Typography sx={{ fontWeight: '500' }}>
              Expiry:{' '}
              <span style={{ fontWeight: '400' }}>
                {plan.used_in !== null ? plan.used_in : 'Not available'} days
              </span>
            </Typography>
            <Typography sx={{ fontWeight: '500' }}>
              Number Of Tokens:{' '}
              <span style={{ fontWeight: '400' }}>
                {plan.numWord !== null ? plan.numWord : '0'}
              </span>
            </Typography>
            <Typography sx={{ fontWeight: '500' }}>
              Number Of Tokens Bonus:{' '}
              <span style={{ fontWeight: '400' }}>
                {plan.numWordBonus !== null ? plan.numWordBonus : '0'}
              </span>
            </Typography>
            {/* {plan.name === 'Free Trial' ? (
                <Alert severity="info">
                  If you are on the Free Trial version, buy the Standard or Pro version for a
                  better experience
                </Alert>
              ) : null} */}
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export { Active };

