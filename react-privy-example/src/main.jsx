import React from 'react';
import ReactDOM from 'react-dom/client';
import { PrivyProvider } from '@privy-io/react-auth';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PrivyProvider
      appId={import.meta.env.VITE_PRIVY_APP_ID || 'cmobamqkp00220clbbikzbyl8'}
      config={{
        loginMethods: ['discord'],
        appearance: {
          theme: 'dark',
          accentColor: '#10b981'
        },
        embeddedWallets: {
          createOnLogin: 'users-without-wallets'
        }
      }}
    >
      <App />
    </PrivyProvider>
  </React.StrictMode>
);
