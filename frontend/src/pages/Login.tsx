import { useAuth } from 'api/auth';
import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { Box, Stack, Typography } from '@mui/material';

// import { AuthLogin } from '@chainlit/react-components';

import { Logo } from 'components/atoms/logo';

import google from '../assets/google.png';
import abc from '../assets/crypto.png';
import twitter from '../assets/twitter.png';

// import { Logo } from 'components/atoms/logo';
import { useQuery } from 'hooks/query';

import { apiClientState } from 'state/apiClient';

import './login.css';

export default function Login() {
  const query = useQuery();
  const { data: config, setAccessToken, user } = useAuth();
  const [error, setError] = useState('');
  const apiClient = useRecoilValue(apiClientState);
  const params = useParams();

  const navigate = useNavigate();
  // const json = await apiClient.headerAuth();
  // console.log('apiClient', json);

  // const handleHeaderAuth = async () => {
  //   try {
  //     const json = await apiClient.headerAuth();
  //     setAccessToken(json.access_token);
  //     navigate("/message");
  //   } catch (error: any) {
  //     setError(error.message);
  //   }
  // };

  // const handlePasswordLogin = async (
  //   email: string,
  //   password: string
  //   // callbackUrl: string
  // ) => {
  //   const formData = new FormData();
  //   formData.append("username", email);
  //   formData.append("password", password);

  //   try {
  //     const json = await apiClient.passwordAuth(formData);
  //     setAccessToken(json.access_token);
  //     // navigate(callbackUrl);
  //     navigate("/message");
  //   } catch (error: any) {
  //     setError(error.message);
  //   }
  // };

  // const handlePasswordLogin = async () => {
  //   const email = "leanhduc1510@gmail.com";
  //   const password = "111111";

  //   try {
  //     if (email === "leanhduc1510@gmail.com" && password === "111111") {
  //       setAccessToken("cvdvdgdfgdgg");
  //       navigate("/message");
  //     } else {
  //       setError("Invalid email or password");
  //     }
  //   } catch (error: any) {
  //     setError(error.message);
  //   }
  // };

  const handleGoogleSignIn = () => {
    const authUrl: string =
      'https://qdvtgrjggloztjbsdrjp.supabase.co/auth/v1/authorize?provider=google&redirect_to=http://localhost:3000/login';
    window.location.href = authUrl;
  };

  return (
    <Stack>
      <Link to="/" className="login_name decoration" style={{ zIndex: 100 }}>
        <Logo
          style={{
            width: '38px',
            height: '38px',
            borderRadius: '50%',
          }}
        />

        <Typography
          sx={{
            color: '#fff',
            fontWeight: '700',
            fontSize: '20px'
          }}
        >
          Alvin AI
        </Typography>
      </Link>

      <div className='login_box'>
        <Box
          sx={{
            padding: '2rem',
            borderRadius: '20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '20px',
            '@media (max-width: 768px)': {
              padding: "3rem"
            }
          }}
        >


          <h1 className="login_h1">Do <br />Your <br /> Own <br /> Research</h1>

          <Box className="sign_in_google" onClick={handleGoogleSignIn}>
            <img src={google} alt="" className="sign_in_google_imgs" />

            <Typography
              sx={{
                // color: "text.primary",
                color: '#000',
                padding: '10px 20px',
                fontWeight: '700',
                fontSize: '17px'
              }}
            >
              Sign in with Google
            </Typography>
          </Box>

          {/* <div className="sign_in_or">
            <Typography
              className="or"
              sx={{
                // color: "text.primary",
                color: '#fff',
                fontSize: '17px'
              }}
            >
              Or
            </Typography>
          </div>

          <Box className="sign_in_google">
            <img src={twitter} alt="" className="sign_in_google_imgs" />

            <Typography
              sx={{
                // color: "text.primary",
                color: '#000',
                padding: '10px 20px',
                fontWeight: '700',
                fontSize: '17px'
              }}
            >
              Sign in with Twitter
            </Typography>
          </Box> */}
        </Box>
      </div>

      {/* <AuthLogin
          title="Sign In"
          error={error}
          callbackUrl="/message"
          providers={config?.oauthProviders || []}
          onPasswordSignIn={
            config?.passwordAuth ? handlePasswordLogin : undefined
          }
          onOAuthSignIn={async (provider: string) => {
            window.location.href = apiClient.getOAuthEndpoint(provider);
          }}
          renderLogo={
            <Logo
              style={{
                maxWidth: "60%",
                maxHeight: "90px",
                borderRadius: "50%",
              }}
            />
          }
          renderElementBottom={
          <div>
          hahahaha
          </div>
          }
        /> */}
    </Stack>
  );
}
