import { CryptoCurrencyModel } from 'models/CryptoCurrencyModel';
import { OrderStatus } from 'models/OrderModel';
import { PlanOrderPaymentBodyModel } from 'models/PlanModel';
import { AddressCrypto } from 'models/SystemModel';
import React, { useEffect, useState } from 'react';

import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { Alert, Box, Button, Typography } from '@mui/material';

import { useCryptoCurrency } from 'hooks/useCryptoCurrency';
import { usePayment } from 'hooks/usePayment';
import { usePlan } from 'hooks/usePlan';

interface Plan {
  id: string;
  name: string;
  price: number | null;
  numWord: number | null;
  numWordBonus: number | null;
  description: string | null;
  used_in: number | null;
}

const Active: React.FC = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [purchased, setPurchased] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [orderStatus, setOrderStatus] = useState(OrderStatus.Ordering);
  const { isLoading: isLoadingCrypto, error: errorCrypto } =
    useCryptoCurrency();
  const { payment, hash } = usePayment();
  const { orderPlan, planOrderPayment } = usePlan();
  console.log('hash', hash);
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
            numWord: result.num_word,
            numWordBonus: result.num_word_bonus,
            description: result.description,
            used_in: result.used_in
          }));
          setPlans(convertedPlans);
        })
        .catch((error) => {
          console.error('Error fetching plans:', error);
        });
    }
  }, []);

  const handlePurchase = async () => {
    setIsConfirming(true);
    setOrderStatus(OrderStatus.Processing);

    try {
      const proPlan = plans.find((plan) => plan.name === 'Pro');
      if (proPlan) {
        let paidCrypto:
          | { crypto: CryptoCurrencyModel; data: AddressCrypto }
          | undefined;
        const order = await orderPlan(proPlan.id);
        if (proPlan.price !== null && proPlan.price > 0 && !isLoadingCrypto) {
          paidCrypto = await payment(proPlan.price);
        }
        console.log('hash', hash, 'order', order, 'paidCrypto', paidCrypto);
        // if (order?.data) {
        if (paidCrypto?.data && order?.data) {
          const body: PlanOrderPaymentBodyModel = {
            num_crypto_currency: 2,
            crypto_currency_id: paidCrypto?.crypto?.id ?? '',
            transaction_hash: paidCrypto?.data ?? '0x'
          };
          const plan = await planOrderPayment(order.data.id, body);
          console.log('plan', plan);
          setPurchased(true);
        }
      }
    } catch {
      setOrderStatus(OrderStatus.Ordering);
    } finally {
      setIsConfirming(false);
    }
  };

  const renderPlans = () => {
    return plans.map((plan, index) => (
      <Box
        key={index}
        sx={{
          ...styleActive,
          ...(plan.name === 'Pro' ? { borderColor: 'green' } : {})
        }}
      >
        <Typography
          sx={{
            fontSize: '20px',
            fontWeight: 'bold',
            color: plan.name === 'Pro' ? 'green' : 'inherit'
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
          {plan.name !== 'Standard' ? (
            <Box sx={{ display: 'flex', gap: '10px' }}>
              {purchased ? (
                <Button
                  variant="contained"
                  onClick={handlePurchase}
                  disabled={isLoadingCrypto || errorCrypto !== undefined}
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
                  onClick={handlePurchase}
                  disabled={
                    isLoadingCrypto || errorCrypto !== undefined || isConfirming
                  }
                  sx={{
                    backgroundColor: '#9BCF53',
                    '&:hover': { backgroundColor: '#BFEA7C' },
                    borderRadius: '20px'
                  }}
                >
                  {isConfirming ? 'Confirming...' : 'Purchase Plan'}
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
            borderTop: `1px solid ${plan.name === 'Pro' ? 'green' : '#383838'}`
          }}
        >
          <Typography sx={{ fontWeight: '500' }}>
            Description: {plan.description !== null ? plan.description : 'null'}
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
          {/* {plan.name !== 'Standard' ? (
            <>
              <Typography sx={{ fontWeight: "500" }}>
                Order Status: {orderStatus}
                {purchased ? (
                  <Typography sx={{ color: orderStatus === OrderStatus.Processing ? "green" : "red" }}>
                    {orderStatus === OrderStatus.Processing ? "Active" : "Inactive"}
                  </Typography>
                ) : null}
              </Typography>
            </>
          ) : null} */}
          {plan.name === 'Standard' ? (
            <Alert severity="info">
              If you are on the standard version, buy the Pro version for a
              better experience
            </Alert>
          ) : null}
        </Box>
      </Box>
    ));
  };

  return <div>{renderPlans()}</div>;
};

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

export { Active };

