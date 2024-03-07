import Page from 'pages/Page';


import Chat from 'components/organisms/chat/index';
import { useEffect, useLayoutEffect } from 'react';
import { Navigate, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from 'api/auth';

export default function Message() {
  const location = useLocation()
  const [searchParams] = useSearchParams();
  // const tokenHeader = searchParams.get('access_token');
  const navigate = useNavigate()
  const { user, setAccessToken } = useAuth();
  const hash = location.hash
  const params = new URLSearchParams(hash.substring(1));
  const tokenHeader = params.get('access_token');

  useLayoutEffect(() => {
    if (tokenHeader) {
      fetch('http://192.168.0.110:5050/auth/header', {
        method: 'POST',
        headers: {
          'token': tokenHeader
        }
      })
        .then(response => {
          console.log("response:", response)
          return response.json();

        }).then(response => {
          console.log('responseresponse', response);
          setAccessToken(response?.access_token)
          window.location.href = '/message';
        })
        .catch(error => {
          console.error('Failed to send access token to header:', error);
        });
    }
  }, [])

  return (
    <Page>
      <Chat />
    </Page>
  );
}
