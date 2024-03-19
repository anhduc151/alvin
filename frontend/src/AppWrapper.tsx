import App from 'App';
import { useAuth } from 'api/auth';
import { useEffect, useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import { useApi } from '@chainlit/react-client';

import { apiClientState } from 'state/apiClient';
import { IProjectSettings, projectSettingsState } from 'state/project';
import { settingsState } from 'state/settings';
import { toast } from 'sonner';

export default function AppWrapper() {
  const apiClient = useRecoilValue(apiClientState);
  const [projectSettings, setProjectSettings] =
    useRecoilState(projectSettingsState);
  const setAppSettings = useSetRecoilState(settingsState);
  const { isAuthenticated, isReady, setAccessToken } = useAuth();

  const { i18n } = useTranslation();

  const languageInUse = navigator.language || 'en-US';

  useLayoutEffect(() => {
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.substring(1));
    const tokenGG = params.get('access_token');

    if (tokenGG) {
      fetch(`${import.meta.env.VITE_DEVSERVER_URL}/auth/header`, {
        method: 'POST',
        headers: {
          token: tokenGG
        }
      })
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          localStorage.setItem('token_gg', tokenGG);
          setAccessToken(response?.access_token);
          window.location.href = '/payment';
        })
        .catch((error) => {
          console.error('Failed to send access token to header:', error);
        });
    }
  }, []);

  function handleChangeLanguage(languageBundle: any): void {
    i18n.addResourceBundle(languageInUse, 'translation', languageBundle);
    i18n.changeLanguage(languageInUse);
  }

  const { data } = useApi<IProjectSettings>(
    apiClient,
    projectSettings === undefined && isAuthenticated
      ? `/project/settings?language=${languageInUse}`
      : null
  );

  if (
    isReady &&
    !isAuthenticated &&
    window.location.pathname !== '/login' &&
    window.location.pathname !== '/login/callback'
  ) {
    window.location.href = '/login';
  }

  useEffect(() => {
    if (!data) return;
    setProjectSettings(data);
    setAppSettings((prev) => ({
      ...prev,
      defaultCollapseContent: data.ui.default_collapse_content ?? true,
      expandAll: !!data.ui.default_expand_messages,
      hideCot: !!data.ui.hide_cot
    }));
    handleChangeLanguage(data.translation);
  }, [data, setProjectSettings, setAppSettings]);

  if (!isReady) {
    return null;
  }

  return <App />;
}
