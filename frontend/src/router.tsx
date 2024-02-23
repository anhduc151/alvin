import { Navigate, createBrowserRouter } from 'react-router-dom';

import AuthCallback from 'pages/AuthCallback';
import Element from 'pages/Element';
import Env from 'pages/Env';
import Login from 'pages/Login';
import Readme from 'pages/Readme';
import Thread from 'pages/Thread';
import Message from 'pages/Message';
import Home from 'pages/Home';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/message',
    element: <Message />
  },
  {
    path: '/readme',
    element: <Readme />
  },
  {
    path: '/env',
    element: <Env />
  },
  {
    path: '/thread/:id?',
    element: <Thread />
  },
  {
    path: '/element/:id',
    element: <Element />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/login/callback',
    element: <AuthCallback />
  },
  {
    path: '*',
    element: <Navigate replace to="/" />
  }
]);
