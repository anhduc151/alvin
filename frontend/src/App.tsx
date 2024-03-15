import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAuth } from 'api/auth';
import { configWagmi } from 'configs/wagmi';
import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { ToastContainer, Zoom } from 'react-toastify';
import { useRecoilValue } from 'recoil';
import { router } from 'router';
import { Toaster } from 'sonner';
import { WagmiProvider } from 'wagmi';

import { Box, GlobalStyles } from '@mui/material';
import { Theme, ThemeProvider } from '@mui/material/styles';

import { useChatSession } from '@chainlit/react-client';
import { makeTheme } from '@chainlit/react-components/theme';

import Hotkeys from 'components/Hotkeys';
import SettingsModal from 'components/molecules/settingsModal';
import ChatSettingsModal from 'components/organisms/chat/settings';
import PromptPlayground from 'components/organisms/playground';

import { apiClientState } from 'state/apiClient';
import { projectSettingsState } from 'state/project';
import { settingsState } from 'state/settings';
import { userEnvState } from 'state/user';

import 'react-toastify/dist/ReactToastify.css';
import './App.css';

type Primary = {
  dark?: string;
  light?: string;
  main?: string;
};

type ThemOverride = {
  primary?: Primary;
  background?: string;
  paper?: string;
};

declare global {
  interface Window {
    theme?: {
      light?: ThemOverride;
      dark?: ThemOverride;
    };
  }
}

export function overrideTheme(theme: Theme) {
  const variant = theme.palette.mode;
  const variantOverride = window?.theme?.[variant] as ThemOverride;
  if (variantOverride?.background) {
    theme.palette.background.default = variantOverride.background;
  }
  if (variantOverride?.paper) {
    theme.palette.background.paper = variantOverride.paper;
  }
  if (variantOverride?.primary?.main) {
    theme.palette.primary.main = variantOverride.primary.main;
  }
  if (variantOverride?.primary?.dark) {
    theme.palette.primary.dark = variantOverride.primary.dark;
  }
  if (variantOverride?.primary?.light) {
    theme.palette.primary.light = variantOverride.primary.light;
  }

  return theme;
}

function App() {
  const { theme: themeVariant } = useRecoilValue(settingsState);
  const pSettings = useRecoilValue(projectSettingsState);
  // @ts-expect-error custom property
  const fontFamily = window.theme?.font_family;
  // const theme = overrideTheme(makeTheme(themeVariant, fontFamily));
  const theme = overrideTheme(makeTheme('dark', fontFamily));
  const { isAuthenticated, accessToken } = useAuth();
  const userEnv = useRecoilValue(userEnvState);
  const { connect, chatProfile, setChatProfile } = useChatSession();
  const apiClient = useRecoilValue(apiClientState);
  const queryClient = new QueryClient();

  const pSettingsLoaded = !!pSettings;

  const chatProfileOk = pSettingsLoaded
    ? pSettings.chatProfiles.length
      ? !!chatProfile
      : true
    : false;

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    } else if (!chatProfileOk) {
      return;
    } else {
      connect({
        client: apiClient,
        userEnv,
        accessToken
      });
    }
  }, [userEnv, accessToken, isAuthenticated, connect, chatProfileOk]);

  if (pSettingsLoaded && pSettings.chatProfiles.length && !chatProfile) {
    // Autoselect the chat profile if there is only one
    setChatProfile(pSettings.chatProfiles[0].name);
  }

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles
        styles={{
          body: { backgroundColor: theme.palette.background.default }
        }}
      />
      <Toaster
        className="toast"
        position="top-right"
        toastOptions={{
          style: {
            fontFamily: theme.typography.fontFamily,
            background: theme.palette.background.paper,
            border: `1px solid ${theme.palette.divider}`,
            color: theme.palette.text.primary
          }
        }}
      />
      <WagmiProvider config={configWagmi}>
        <QueryClientProvider client={queryClient}>
          <Box
            display="flex"
            height="100vh"
            width="100vw"
            sx={{ overflowX: 'hidden' }}
          >
            <PromptPlayground />
            <ChatSettingsModal />
            <Hotkeys />
            <SettingsModal />
            <RouterProvider router={router} />
            <ToastContainer position="bottom-right" theme="colored" transition={Zoom}/>
          </Box>
        </QueryClientProvider>
      </WagmiProvider>
    </ThemeProvider>
  );
}

export default App;
