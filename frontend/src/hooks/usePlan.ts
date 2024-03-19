import { fetchPost } from 'helpers/helpers';
import {
  PlanOrderModel,
  PlanOrderPaymentBodyModel
} from 'models/UserPlanModel';

export function usePlan() {
  const orderPlan = async (planId: string, volume: number) => {
    const body = { volume };
    const response = await fetchPost(`v1/api/user/plans/${planId}/order`, body);

    if (!response?.ok) {
      console.log('ERROR: ', response);
      throw new Error('Failed to purchase plan');
    }

    return response.json() as Promise<{ data: PlanOrderModel }>;
  };

  const paymentPlan = async (
    orderId: string,
    body: PlanOrderPaymentBodyModel
  ) => {
    const response = await fetchPost(
      `v1/api/user/my-plan-order/${orderId}/payment`,
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
    paymentPlan
  };
}
