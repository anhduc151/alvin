import { getFetch } from 'helpers/helpers';
import { OrderModel } from 'models/OrderModel';
import { PlanOrderPaymentBodyModel } from 'models/PlanModel';

export function usePlan() {
  const orderPlan = async (planId: string, volume: number) => {
    const body = { volume };
    const response = await getFetch(
      `v1/api/user/plans/${planId}/order`,
      'POST',
      body
    );
  
    if (!response?.ok) {
      console.log('ERROR: ', response);
      throw new Error('Failed to purchase plan');
    }
  
    return response.json() as Promise<{ data: OrderModel }>;
  };

  const planOrderPayment = async (
    order_id: string,
    body: PlanOrderPaymentBodyModel
  ) => {
    const response = await getFetch(
      `v1/api/user/my-plan-order/${order_id}/payment`,
      'POST',
      body
    );

    if (!response?.ok) {
      console.log('ERROR: ', response);
      throw new Error(`ERROR: ${response?.statusText}`);
    }

    return response.json() as Promise<string>;
  };

  return {
    orderPlan,
    planOrderPayment
  };
}
