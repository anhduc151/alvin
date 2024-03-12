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

  // useEffect(() => {
  //   const getAccessTokenFromURL = () => {
  //     const hash = window.location.hash;
  //     const params = new URLSearchParams(hash.substring(1));
  //     const accessToken = params.get('access_token');

  //     if (accessToken) {
  //       console.log("Access Token:", accessToken);
  //       localStorage.setItem('accessToken', accessToken);

  //     }
  //   };

  //   getAccessTokenFromURL();
  // }, []);

  useLayoutEffect(() => {
    if (tokenHeader) {
      fetch(`${import.meta.env.VITE_DEVSERVER_URL}/auth/header`, {
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
