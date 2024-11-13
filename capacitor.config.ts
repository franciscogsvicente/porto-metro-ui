import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.portometro.app',
  appName: 'Porto Metro',
  webDir: 'www/browser',
  server: {
    cleartext: true, // Permite requisições HTTP
  },
};

export default config;
