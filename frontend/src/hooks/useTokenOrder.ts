import { fetchPost } from 'helpers/helpers';
import { TokenOrderModel, TokenOrderPaymentBodyModel } from 'models/TokenOrderModel';

export function useTokenOrder() {
  // fetch(`${import.meta.env.VITE_DEVSERVER_URL}/v1/api/user/my-token-order`, {
  //   method: 'POST',
  //   headers: {
  //     Authorization: `Bearer ${tokenGG}`,
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify({ tokenAmount: parseInt(inputValue) })
  // })
  //   .then(response => {
  //     if (!response.ok) {
  //       throw new Error('Failed to purchase tokens');
  //     }
  //     return response.json(); // Parse response body as JSON
  //   })
  //   .then(data => {
  //     if (data.words !== null) {
  //       console.log("Server response:", data.words); // Log the server response
  //       setOpenDialog(false);
  //     } else {
  //       throw new Error('Server response is null');
  //     }
  //   })
  //   .catch(error => {
  //     console.error('Error purchasing tokens:', error);
  //   });
  const orderToken = async (tokenAmount: number) => {
    const body = { tokenAmount };
    const response = await fetchPost(`v1/api/user/my-token-order`, body);

    if (!response?.ok) {
      console.log('ERROR: ', response);
      throw new Error('Failed to purchase plan');
    }

    return response.json() as Promise<{data: TokenOrderModel}>;
  };

  const paymentToken = async (
    orderId: string,
    body: TokenOrderPaymentBodyModel
  ) => {
    const response = await fetchPost(
      `v1/api/user/my-token-order/${orderId}/payment`,
      body
    );

    if (!response?.ok) {
      console.log('ERROR: ', response);
      throw new Error(`ERROR: ${response?.statusText}`);
    }

    return response.json() as Promise<string>;
  };

  return {
    orderToken,
    paymentToken
  };
}
