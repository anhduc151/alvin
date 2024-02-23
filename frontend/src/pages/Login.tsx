import { useAuth } from 'api/auth';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { AuthLogin } from '@chainlit/react-components';

import { Logo } from 'components/atoms/logo';

import { useQuery } from 'hooks/query';

import { apiClientState } from 'state/apiClient';
import './login.css'
import chatbot from '../assets/chatbot.png'

export default function Login() {
  const query = useQuery();
  const { data: config, setAccessToken, user } = useAuth();
  const [error, setError] = useState('');
  const apiClient = useRecoilValue(apiClientState);

  const navigate = useNavigate();

  const handleHeaderAuth = async () => {
    try {
      const json = await apiClient.headerAuth();
      setAccessToken(json.access_token);
      navigate('/message');
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handlePasswordLogin = async (
    email: string,
    password: string,
    // callbackUrl: string
  ) => {
    const formData = new FormData();
    formData.append('username', email);
    formData.append('password', password);

    try {
      const json = await apiClient.passwordAuth(formData);
      setAccessToken(json.access_token);
      // navigate(callbackUrl);
      navigate("/message");
    } catch (error: any) {
      setError(error.message);
    }
  };

  useEffect(() => {
    setError(query.get('error') || '');
  }, [query]);

  useEffect(() => {
    if (!config) {
      return;
    }
    
    if (user) {
      navigate('/message'); 
      return;
    }
    if (!config.requireLogin) {
      navigate('/');
    }
    if (config.headerAuth) {
      handleHeaderAuth();
    }
    // if (user) {
    //   navigate('/message');
    // }
  }, [config, user]);

  return (
    <div className='login_form'>
     {/* <div className="login_form_left">
      <img src={chatbot} alt="" />
     </div> */}

     <div className="login_form_right">
     <AuthLogin
      title="Sign In"
      error={error}
      callbackUrl="/"
      providers={config?.oauthProviders || []}
      onPasswordSignIn={config?.passwordAuth ? handlePasswordLogin : undefined}
      onOAuthSignIn={async (provider: string) => {
        window.location.href = apiClient.getOAuthEndpoint(provider);
      }}
      // renderLogo={<Logo style={{ maxWidth: '60%', maxHeight: '90px' }} />}
    />
     </div>
    </div>
  );
}
